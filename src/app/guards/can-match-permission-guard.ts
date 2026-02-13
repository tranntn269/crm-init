import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { PermissionService } from '../services/permission';
import { UserPermission } from '../models/user.model';

export const canMatchPermissionGuard: CanMatchFn = (route, segments) => {
  const permissionService = inject(PermissionService);
  if (!route.data || !route.data['authorities']) {
    return true;
  }

  const authorities = route.data['authorities'] as UserPermission;

  const { roles, departments, permissions } = authorities;

  if (!roles && !departments && !permissions) {
    return true;
  }

  return (
    permissionService.hasRole(roles ?? []) &&
    permissionService.hasDepartment(departments ?? []) &&
    permissionService.hasPermission(permissions ?? [])
  );
};
