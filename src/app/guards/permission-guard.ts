import { CanActivateFn } from '@angular/router';
import { Permission } from '../services/permission';
import { inject } from '@angular/core';
import { UserDepartment, UserRole } from '../enums/user.enum';

export const permissionGuard: CanActivateFn = (route, state) => {
  const permissionService = inject(Permission);

  const authorities = route.data['authorities'] as {
    roles?: UserRole[];
    departments?: UserDepartment[];
  };

  if (!authorities) {
    return true;
  }

  const { roles = [], departments = [] } = authorities;

  

  if (!permissionService.hasPermission(roles, departments)) {
    console.log('Permission guard: Access denied');
    return false;
  }
  return true;
};
