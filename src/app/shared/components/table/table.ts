import {
  Component,
  computed,
  ContentChildren,
  input,
  model,
  output,
  QueryList,
  signal,
  Signal,
  WritableSignal,
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

import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';

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
    HlmCheckboxImports,
  ],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  providers: [provideIcons({ lucideChevronDown, lucideChevronUp, lucideChevronsUpDown })],
})
export class Table {
  COL_TYPE = COL_TYPE;
  SORT_ORDER = SORT_ORDER;
  ALIGN_FROZEN = ALIGN_FROZEN;

  data = input<Dictionary<any>[]>([]);
  page = model<number>(1);
  pageSize = model<number>(10);
  totalItems = input<number>(0);
  dataIdKey = input<string>('id');
  isLoading = input<boolean>(false);
  enableRowSelection = input<boolean>(true);

  sortChange = output<{ key: string; direction: SORT_ORDER }>();

  loadingItems: Signal<number[]> = computed(() => new Array(this.pageSize()));

  @ContentChildren(Column) columns!: QueryList<Column>;

  rowSelection: WritableSignal<Record<string, boolean>> = signal({});

  isAllPageRowsSelected = computed(() => {
    if (this.data().length === 0) return false;
    return this.data().every((row) => !!this.rowSelection()[row[this.dataIdKey()]]);
  });

  isSomePageRowsSelected = computed(() => {
    return (
      Object.values(this.rowSelection()).some((value) => value === true) &&
      !this.isAllPageRowsSelected()
    );
  });

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

  getToggleSelectedHandler(index: number, selected: boolean): void {
    const dataIdKey = this.dataIdKey();
    const id = this.data()[index][dataIdKey];

    this.rowSelection.update((originalSelection) => {
      const modifiedSelection = JSON.parse(JSON.stringify(originalSelection));
      if (selected) {
        modifiedSelection[id] = true;
      } else {
        delete modifiedSelection[id];
      }
      return modifiedSelection;
    });
  }

  getIsAllPageRowsSelected(): boolean {
    if (this.data().length === 0) return false;

    return this.data().every((row) => this.rowSelection()[row[this.dataIdKey()]] === true);
  }

  getIsSomePageRowsSelected(): boolean {
    return (
      Object.values(this.rowSelection()).some((value) => value === true) &&
      !this.getIsAllPageRowsSelected()
    );
  }

  toggleAllPageRowsSelected(): void {
    const isAllSelected = this.getIsAllPageRowsSelected();

    this.rowSelection.update((previousePageSelection) => {
      const nextPageSelection = JSON.parse(JSON.stringify(previousePageSelection));
      this.data().forEach((row) => {
        const id = row[this.dataIdKey()];
        if (!isAllSelected) {
          nextPageSelection[id] = true;
        } else {
          delete nextPageSelection[id];
        }
      });
      return nextPageSelection;
    });
  }

  private resetSort(currentColumn: Column): void {
    this.columns.forEach((c) => {
      if (c.key() !== currentColumn.key()) {
        c.sortOrder.set(SORT_ORDER.NONE);
      }
    });
  }
}
