import { CanActivateFn } from '@angular/router';
import { PermissionService } from '../services/permission';
import { inject } from '@angular/core';
import { UserPermission } from '../models/user.model';

export const permissionGuard: CanActivateFn = (route, state) => {
  const permissionService = inject(PermissionService);

  const authorities = route.data['authorities'] as UserPermission;

  if (!authorities) {
    return true;
  }

  const { roles = [], departments = [] } = authorities;

  return permissionService.hasPermission(roles, departments);
};
