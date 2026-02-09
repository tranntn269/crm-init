import { CanActivateFn } from '@angular/router';
import { PermissionService } from '../services/permission';
import { inject } from '@angular/core';
import { UserDepartment, UserRole } from '../enums/user.enum';

export const permissionGuard: CanActivateFn = (route, state) => {
  const permissionService = inject(PermissionService);

  const authorities = route.data['authorities'] as {
    roles?: UserRole[];
    departments?: UserDepartment[];
  };

  if (!authorities) {
    return true;
  }

  const { roles = [], departments = [] } = authorities;

  return permissionService.hasPermission(roles, departments);
};
