import { AfterContentInit, Component, ContentChild, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserService } from '../../services/user';
import { Table } from '../../shared/components/table/table';
import { Column } from '../../directives/column';
import { COL_TYPE } from '../../models/types.model';
import { Cell } from '../../directives/cell';
import { Header } from '../../directives/header';
import { HlmSkeletonImports } from '@spartan-ng/helm/skeleton';
import { ALIGN_FROZEN, SORT_ORDER } from '../../enums/table.enum';

@Component({
  selector: 'app-client-management',
  imports: [CommonModule, Table, Column, DatePipe, Cell, Header, HlmSkeletonImports],
  templateUrl: './client-management.html',
  styleUrl: './client-management.scss',
})
export class ClientManagement implements AfterContentInit {
  private userService = inject(UserService);
  @ContentChild(Cell) cellTmpl!: Cell;
  page = signal(1);
  pageSize = signal(5);
  sort = signal<string>('');
  COL_TYPE = COL_TYPE;
  mockXTotalCount = 100; //due to mockapi.io does not support this header response
  usersResource = this.userService.getUsersList(this.page, this.pageSize, this.sort);
  ALIGN_FROZEN = ALIGN_FROZEN;

  ngAfterContentInit(): void {}

  handleSortChange(event: { key: string; direction: SORT_ORDER }): void {
    this.sort.set(`${event.key},${event.direction}`);
  }
}
