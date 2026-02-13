import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '../services/permission';

@Directive({
  selector: '[hasRole]',
})
export class HasRole {
  hasRole = input<string[]>();
  templateRef = inject(TemplateRef);
  viewContainer = inject(ViewContainerRef);
  private permissionService = inject(PermissionService);

  constructor() {
    effect(() => {
      const requiredRoles = this.hasRole() ?? [];

      const hasRole = this.permissionService.hasRole(requiredRoles, false);

      if (hasRole) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
