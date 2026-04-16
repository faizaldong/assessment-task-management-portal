import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class AuthEffects {
  readonly #actions$ = inject(Actions);
  readonly #authService = inject(AuthService);

  login$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ username, password }) =>
        this.#authService.login(username, password).pipe(
          map(user =>
            user
              ? AuthActions.loginSuccess({ user })
              : AuthActions.loginFailure({ error: 'Invalid credentials' })
          ),
          catchError(() =>
            of(AuthActions.loginFailure({ error: 'Login failed' }))
          )
        )
      )
    )
  );
}