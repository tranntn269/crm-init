import { Component, inject } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-dashboard',
  imports: [
    HlmButtonImports,
    HlmCardImports,
    ReactiveFormsModule,
    HlmFieldImports,
    HlmInputImports,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly _fb = inject(FormBuilder);

  public form = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  public login() {
    if (this.form.valid) {
      // login logic here
      console.log(this.form.value);
    }
  }
}
