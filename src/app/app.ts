import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HasPermission } from './directives/has-permission';
import { UserDepartment, UserRole } from './enums/user.enum';
import { PermissionService } from './services/permission';
import { UserService } from './services/user';
import { CommonModule } from '@angular/common';
import { HasDepartment } from './directives/has-department';
import { HasRole } from './directives/has-role';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HasPermission, CommonModule, HasDepartment, HasRole],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('crm-init');
  staffRole = UserRole.STAFF;
  managerRole = UserRole.MANAGER;
  techDepartment = UserDepartment.TECH;
  officeDepartment = UserDepartment.OFFICE;
  testerRole = UserRole.TESTER;

  public userService = inject(UserService);
  public permissionService = inject(PermissionService);

  ngOnInit(): void {}
}
