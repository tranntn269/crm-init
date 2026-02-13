import {
  AfterContentInit,
  Component,
  computed,
  ContentChildren,
  input,
  model,
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

@Component({
  selector: 'app-table',
  imports: [HlmTableImports, CommonModule, HlmSkeletonImports, ColonialPagination, DatePipe],
  templateUrl: './table.html',
  styleUrl: './table.scss',
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

  @ContentChildren(Column) columns!: QueryList<Column>;

  ngAfterContentInit(): void {}
}
