import { Injectable, inject, computed, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppState } from '../app.state';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  readonly #store = inject(Store<AppState>);

  // Signals (modern Angular)
  readonly user = toSignal(this.#store.select(AuthSelectors.selectUser));
  readonly loading = toSignal(this.#store.select(AuthSelectors.selectAuthLoading));
  readonly error = toSignal(this.#store.select(AuthSelectors.selectAuthError));

  readonly isAuthenticated = computed(() => !!this.user());

  login(username: string, password: string): void {
    this.#store.dispatch(AuthActions.login({ username, password }));
  }

  logout(): void {
    this.#store.dispatch(AuthActions.logout());
  }
}