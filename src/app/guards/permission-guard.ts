import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { PermissionService } from '../services/permission';

export const permissionGuard: CanActivateFn = (route, state) => {
  const permissionService = inject(PermissionService);

  const requiredRoles = route.data['authorities']?.roles ?? [];
  const requiredDepartments = route.data['authorities']?.departments ?? [];
  const requiredPermissions = route.data['authorities']?.permissions ?? [];

  if (!requiredRoles.length && !requiredDepartments.length && !requiredPermissions.length) {
    return true;
  }

  return (
    permissionService.hasRole(requiredRoles) &&
    permissionService.hasDepartment(requiredDepartments) &&
    permissionService.hasPermission(requiredPermissions)
  );
};
