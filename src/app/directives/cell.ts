import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appCell]',
})
export class Cell {
  templateRef = inject(TemplateRef<any>);
}
