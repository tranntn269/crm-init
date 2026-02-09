import { effect, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { UserService } from './user';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class Permission {
  private userService = inject(UserService);

  currentUser: WritableSignal<User | null> = signal(null);

  constructor() {
    effect(() => {
      const currentUser = this.userService.currentUser();
      if (currentUser) {
        this.currentUser.set(this.userService.currentUser()!);
      }
    });
  }

  hasPermission(requiredRoles: string[] = [], requiredDepartments: string[] = []): boolean {
    if (!this.currentUser()) {
      console.debug('No current user found');
      return false;
    }

    const userRoles = this.currentUser()!.roles ?? [];
    const userDepartments = this.currentUser()!.departments ?? [];

    const hasRole = requiredRoles.every((requiredRole) => userRoles.includes(requiredRole));
    const hasDepartment = requiredDepartments.every((requiredDepartment) =>
      userDepartments.includes(requiredDepartment),
    );

    return hasRole && hasDepartment;
  }
}
