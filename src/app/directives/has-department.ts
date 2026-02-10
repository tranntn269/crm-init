import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '../services/permission';

@Directive({
  selector: '[hasDepartment]',
})
export class HasDepartment {
  hasDepartment = input<string[]>();
  templateRef = inject(TemplateRef);
  viewContainer = inject(ViewContainerRef);
  private permissionService = inject(PermissionService);

  constructor() {
    effect(() => {
      const requiredDepartments = this.hasDepartment() ?? [];

      const hasDepartment = this.permissionService.hasDepartment(requiredDepartments);

      if (hasDepartment) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
