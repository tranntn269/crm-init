import { computed, inject, Injectable } from '@angular/core';
import { UserService } from './user';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private userService = inject(UserService);

  currentUser = computed(() => this.userService.currentUser());

  hasRole(requiredRoles: string[] = []): boolean {
    if (!this.currentUser()) {
      return false;
    }

    return requiredRoles.every((role) => this.currentUser()!.roles?.includes(role));
  }

  hasDepartment(requiredDepartments: string[] = []): boolean {
    if (!this.currentUser()) {
      return false;
    }

    return requiredDepartments.every((department) =>
      this.currentUser()!.departments?.includes(department),
    );
  }

  hasPermission(requiredPermissions: string[] = []): boolean {
    if (!this.currentUser()) {
      return false;
    }
    return requiredPermissions.every((permission) =>
      this.currentUser()!.permissions?.includes(permission),
    );
  }
}
