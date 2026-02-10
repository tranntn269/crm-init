import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '../services/permission';

@Directive({
  selector: '[hasPermission]',
})
export class HasPermission {
  hasPermission = input<string[]>();
  templateRef = inject(TemplateRef);
  viewContainer = inject(ViewContainerRef);
  private permissionService = inject(PermissionService);

  constructor() {
    effect(() => {
      const requiredPermission = this.hasPermission() ?? [];
      const hasPermission = this.permissionService.hasPermission(requiredPermission, false);

      if (hasPermission) {
        console.debug('User has permission, rendering template');
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
