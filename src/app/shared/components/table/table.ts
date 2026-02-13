import { AfterContentInit, Component, ContentChildren, input, QueryList } from '@angular/core';
import { Dictionary } from '../../../models/types.model';
import { Column } from '../../../directives/column';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { CommonModule } from '@angular/common';
import { COL_TYPE } from '../../../models/types.model';
import { HlmSkeletonImports } from '@spartan-ng/helm/skeleton';

@Component({
  selector: 'app-table',
  imports: [HlmTableImports, CommonModule, HlmSkeletonImports],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table implements AfterContentInit {
  rows = input<Dictionary<any>[]>([]);
  page = input<number>(1);
  pageSize = input<number>(10); //pageSizes
  totalRows = input<number>(0); //totalItems
  COL_TYPE = COL_TYPE;
  isLoading = input<boolean>(false);
  loadingItems = new Array(this.pageSize());

  @ContentChildren(Column) columns!: QueryList<Column>;

  ngAfterContentInit(): void {
    console.log(this.columns);
  }
}
