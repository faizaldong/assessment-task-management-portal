import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { Router } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { AuthFacade } from '../../../store/auth/auth.facade';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navbar {
  readonly #authFacade = inject(AuthFacade);
  readonly #router = inject(Router);

  readonly user = this.#authFacade.user;

  logout(): void {
    this.#authFacade.logout();
    this.#router.navigate(['/auth']);
  }
}