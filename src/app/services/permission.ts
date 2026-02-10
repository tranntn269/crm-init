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

  // hasPermissionTest(requiredRoles: string[] = [], requiredDepartments: string[] = []): boolean {
  //   if (!this.currentUser()) {
  //     console.debug('No current user found');
  //     return false;
  //   }

  //   const userRoles = this.currentUser()!.roles ?? [];
  //   const userDepartments = this.currentUser()!.departments ?? [];

  //   const hasRole = requiredRoles.every((requiredRole) => userRoles.includes(requiredRole));
  //   const hasDepartment = requiredDepartments.every((requiredDepartment) =>
  //     userDepartments.includes(requiredDepartment),
  //   );

  //   return hasRole && hasDepartment;
  // }
}
