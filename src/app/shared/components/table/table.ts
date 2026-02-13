import {
  AfterContentInit,
  Component,
  computed,
  ContentChildren,
  input,
  model,
  output,
  QueryList,
  Signal,
  signal,
} from '@angular/core';
import { Dictionary } from '../../../models/types.model';
import { Column } from '../../../directives/column';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { CommonModule, DatePipe } from '@angular/common';
import { COL_TYPE } from '../../../models/types.model';
import { HlmSkeletonImports } from '@spartan-ng/helm/skeleton';
import { ColonialPagination } from '../colonial-pagination/colonial-pagination';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideChevronDown, lucideChevronUp, lucideChevronsUpDown } from '@ng-icons/lucide';
import { SORT_DIRECTION } from '../../../enums/table.enum';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-table',
  imports: [
    HlmTableImports,
    CommonModule,
    HlmSkeletonImports,
    ColonialPagination,
    DatePipe,
    NgIcon,
    HlmIcon,
    HlmButtonImports,
  ],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  providers: [provideIcons({ lucideChevronDown, lucideChevronUp, lucideChevronsUpDown })],
})
export class Table implements AfterContentInit {
  public readonly pages = signal(1);

  rows = input<Dictionary<any>[]>([]);
  /** Current page (two-way bindable for pagination). */
  page = model<number>(1);
  /** Items per page (two-way bindable for pagination). */
  pageSize = model<number>(10);
  totalItems = input<number>(0); //totalItems
  COL_TYPE = COL_TYPE;
  isLoading = input<boolean>(false);
  // loadingItems = new Array(this.pageSize());
  loadingItems: Signal<number[]> = computed(() => new Array(this.pageSize()));
  SORT_DIRECTION = SORT_DIRECTION;
  sortChange = output<{ key: string; direction: SORT_DIRECTION }>();

  @ContentChildren(Column) columns!: QueryList<Column>;

  ngAfterContentInit(): void {}

  onSortChange(column: Column): void {
    if (!column.sortable()) {
      return;
    }

    switch (column.sortDirection()) {
      case SORT_DIRECTION.NONE:
        column.sortDirection.set(SORT_DIRECTION.ASC);
        break;
      case SORT_DIRECTION.ASC:
        column.sortDirection.set(SORT_DIRECTION.DESC);
        break;
      case SORT_DIRECTION.DESC:
      default:
        column.sortDirection.set(SORT_DIRECTION.NONE);
        break;
    }

    this.columns.forEach((c) => {
      if (c.key() !== column.key()) {
        c.sortDirection.set(SORT_DIRECTION.NONE);
      }
    });

    this.sortChange.emit({ key: column.key(), direction: column.sortDirection() });
  }
}
