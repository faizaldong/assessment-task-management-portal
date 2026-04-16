import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject
} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthFacade } from '../../../../store/auth/auth.facade';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  readonly #fb = inject(FormBuilder);
  readonly #authFacade = inject(AuthFacade);
  readonly #toast = inject(ToastService);
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);

  readonly form = this.#fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor() {
    this.#listenLoginResult();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.#toast.showError('Please fill all required fields');
      return;
    }

    const { username, password } = this.form.getRawValue();
    this.#authFacade.login(username, password);
  }

  #listenLoginResult(): void {
  effect(() => {
    const user = this.#authFacade.user();
    if (user) {
      this.#toast.showSuccess('Login successful');
      this.#router.navigate(['/dashboard']);
    }
  });

  effect(() => {
    const error = this.#authFacade.error();
    if (error) {
      this.#toast.showError(error);
    }
  });
}
}