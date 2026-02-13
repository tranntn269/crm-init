import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appHeader]',
})
export class Header {
  templateRef = inject(TemplateRef<any>);
}
