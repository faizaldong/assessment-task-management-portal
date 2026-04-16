import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from '../../core/guards/auth.guard';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: Dashboard,
    canActivate: [authGuard]
  }
];