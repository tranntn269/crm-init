import { AfterContentInit, ContentChild, Directive, input, model } from '@angular/core';
import { COL_TYPE } from '../models/types.model';
import { Header } from './header';
import { Cell } from './cell';
import { ALIGN_FROZEN, SORT_ORDER } from '../enums/table.enum';

@Directive({
  selector: 'table-column',
})
export class Column implements AfterContentInit {
  header = input<string>('');
  key = input<string>('');
  renderKey = input<string>('');
  dataType = input<COL_TYPE>(COL_TYPE.TEXT);

  //Sort
  sortable = input<boolean>(false);
  sortOrder = model<SORT_ORDER>(SORT_ORDER.NONE);

  //Freezing
  frozen = input<boolean>(false);
  alignFrozen = input<ALIGN_FROZEN>(ALIGN_FROZEN.LEFT);

  @ContentChild(Cell, { static: true }) cellTmpl?: Cell;
  @ContentChild(Header, { static: true }) headerTmpl?: Header;

  ngAfterContentInit(): void {}
}
