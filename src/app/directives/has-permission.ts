import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from '../services/permission';
import { UserDepartment, UserRole } from '../enums/user.enum';

@Directive({
  selector: '[appHasPermission]',
})
export class HasPermission {
  appHasPermission = input<{ roles?: UserRole[]; departments?: UserDepartment[] }>();
  templateRef = inject(TemplateRef);
  viewContainer = inject(ViewContainerRef);
  private permissionService = inject(Permission);

  constructor() {
    effect(() => {
      const { roles, departments } = this.appHasPermission() ?? { roles: [], departments: [] };

      const isAuthorize = this.permissionService.hasPermission(roles, departments);

      // If the user has permission, render the template, otherwise clear it
      if (isAuthorize) {
        console.debug('User has permission, rendering template');
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
