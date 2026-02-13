import { AfterContentInit, Component, ContentChild, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserService } from '../../services/user';
import { User } from '../../models/user.model';
import { Table } from '../../shared/components/table/table';
import { Column } from '../../directives/column';
import { COL_TYPE } from '../../models/types.model';
import { Cell } from '../../directives/cell';
import { Header } from '../../directives/header';

@Component({
  selector: 'app-client-management',
  imports: [CommonModule, Table, Column, DatePipe, Cell, Header],
  templateUrl: './client-management.html',
  styleUrl: './client-management.scss',
})
export class ClientManagement implements AfterContentInit {
  @ContentChild(Cell) cellTmpl!: Cell;

  private userService = inject(UserService);
  users = this.userService.users.value() as User[];
  COL_TYPE = COL_TYPE;

  ngAfterContentInit(): void {
    console.log('cellTmpl', this.cellTmpl);
  }
}
