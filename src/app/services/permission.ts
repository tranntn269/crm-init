import { computed, inject, Injectable } from '@angular/core';
import { UserService } from './user';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private userService = inject(UserService);

  currentUser = computed(() => this.userService.currentUser());

  hasRole(requiredRoles: string[] = [], matchAll = true): boolean {
    if (!this.currentUser()) {
      return false;
    }

    if (matchAll) {
      return requiredRoles.every((role) => this.currentUser()!.roles?.includes(role));
    }

    return requiredRoles.some((role) => this.currentUser()!.roles?.includes(role));
  }

  hasDepartment(requiredDepartments: string[] = [], matchAll = true): boolean {
    if (!this.currentUser()) {
      return false;
    }

    if (matchAll) {
      return requiredDepartments.every((department) =>
        this.currentUser()!.departments?.includes(department),
      );
    }
    return requiredDepartments.some((department) =>
      this.currentUser()!.departments?.includes(department),
    );
  }

  hasPermission(requiredPermissions: string[] = [], matchAll = true): boolean {
    if (!this.currentUser()) {
      return false;
    }

    if (matchAll) {
      return requiredPermissions.every((permission) =>
        this.currentUser()!.permissions?.includes(permission),
      );
    }
    return requiredPermissions.every((permission) =>
      this.currentUser()!.permissions?.includes(permission),
    );
  }
}
