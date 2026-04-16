import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';

import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { authReducer } from './store/auth/auth.reducer';
import { taskReducer } from './store/task/task.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { TaskEffects } from './store/task/task.effects';

export const appConfig: ApplicationConfig = {
providers: [
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(withFetch()),
  provideAnimations(),

  provideStore({
    auth: authReducer,
    tasks: taskReducer
  }),
  provideEffects([AuthEffects, TaskEffects]),

  provideStoreDevtools({
    maxAge: 25,
    logOnly: false
  }),

  importProvidersFrom(MatSnackBarModule)
]
};