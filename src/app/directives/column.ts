import { AfterContentInit, ContentChild, Directive, input } from '@angular/core';
import { COL_TYPE } from '../models/types.model';
import { Header } from './header';
import { Cell } from './cell';

@Directive({
  selector: 'table-column',
})
export class Column implements AfterContentInit {
  header = input<string>('');
  key = input<string>('');
  dataType = input<COL_TYPE>(COL_TYPE.TEXT);
  renderKey = input<string>('');

  @ContentChild(Cell, { static: true }) cellTmpl!: Cell;
  @ContentChild(Header, { static: true }) headerTmpl!: Header;

  ngAfterContentInit(): void {
    console.log(this.cellTmpl);
  }
}
