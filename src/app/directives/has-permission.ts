import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '../services/permission';
import { UserPermission } from '../models/user.model';

@Directive({
  selector: '[appHasPermission]',
})
export class HasPermission {
  appHasPermission = input<UserPermission>();
  templateRef = inject(TemplateRef);
  viewContainer = inject(ViewContainerRef);
  private permissionService = inject(PermissionService);

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
