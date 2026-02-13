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
import { ALIGN_FROZEN, SORT_ORDER } from '../../../enums/table.enum';
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
  data = input<Dictionary<any>[]>([]);
  page = model<number>(1);
  pageSize = model<number>(10);
  totalItems = input<number>(0);
  COL_TYPE = COL_TYPE;
  SORT_ORDER = SORT_ORDER;
  sortChange = output<{ key: string; direction: SORT_ORDER }>();
  isLoading = input<boolean>(false);
  loadingItems: Signal<number[]> = computed(() => new Array(this.pageSize()));
  ALIGN_FROZEN = ALIGN_FROZEN;

  @ContentChildren(Column) columns!: QueryList<Column>;

  ngAfterContentInit(): void {}

  onSortChange(column: Column): void {
    if (!column.sortable()) {
      return;
    }

    switch (column.sortOrder()) {
      case SORT_ORDER.NONE:
        column.sortOrder.set(SORT_ORDER.ASC);
        break;
      case SORT_ORDER.ASC:
        column.sortOrder.set(SORT_ORDER.DESC);
        break;
      case SORT_ORDER.DESC:
      default:
        column.sortOrder.set(SORT_ORDER.NONE);
        break;
    }

    this.resetSort(column);

    this.sortChange.emit({ key: column.key(), direction: column.sortOrder() });
  }

  resetSort(currentColumn: Column): void {
    this.columns.forEach((c) => {
      if (c.key() !== currentColumn.key()) {
        c.sortOrder.set(SORT_ORDER.NONE);
      }
    });
  }
}
