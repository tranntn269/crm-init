import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { PermissionService } from '../services/permission';
import { UserDepartment, UserRole } from '../enums/user.enum';

@Injectable({
  providedIn: 'root',
})
export class Authen implements CanActivate {
  permissionService = inject(PermissionService);
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Implement your authentication logic here

    const authorities = route.data['authorities'] as {
      roles?: UserRole[];
      departments?: UserDepartment[];
    };

    if (!authorities) {
      return true;
    }

    const { roles = [], departments = [] } = authorities;

    if (!this.permissionService.hasPermission(roles, departments)) {
      console.log('Permission guard: Access denied');
      return false;
    }
    return true;
  }
}
