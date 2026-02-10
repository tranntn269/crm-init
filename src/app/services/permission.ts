import { computed, inject, Injectable } from '@angular/core';
import { UserService } from './user';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private userService = inject(UserService);

  currentUser = computed(() => this.userService.currentUser());

  hasRole(requiredRoles: string[], matchAll = true): boolean {
    const currentUser = this.currentUser();
    if (!currentUser) {
      return false;
    }

    if (matchAll) {
      return requiredRoles.every((role) => currentUser.roles?.includes(role));
    }

    return requiredRoles.some((role) => currentUser.roles?.includes(role));
  }

  hasDepartment(requiredDepartments: string[], matchAll = true): boolean {
    const currentUser = this.currentUser();
    if (!currentUser) {
      return false;
    }

    if (matchAll) {
      return requiredDepartments.every((department) =>
        currentUser.departments?.includes(department),
      );
    }
    return requiredDepartments.some((department) => currentUser.departments?.includes(department));
  }

  hasPermission(requiredPermissions: string[], matchAll = true): boolean {
    const currentUser = this.currentUser();
    if (!currentUser) {
      return false;
    }

    if (matchAll) {
      return requiredPermissions.every((permission) =>
        currentUser.permissions?.includes(permission),
      );
    }
    return requiredPermissions.every((permission) => currentUser.permissions?.includes(permission));
  }
}
