import { Routes } from '@angular/router';
import { TaskList } from './pages/task-list/task-list';
import { TaskDetail } from './pages/task-detail/task-detail';
import { TaskCreate } from './pages/task-create/task-create';
import { authGuard } from '../../core/guards/auth.guard';

export const TASKS_ROUTES: Routes = [
  {
    path: '',
    component: TaskList,
    canActivate: [authGuard]
  },
  {
    path: 'create',
    component: TaskCreate,
    canActivate: [authGuard]
  },
  {
    path: 'edit/:id',
    component: TaskCreate, // reuse form
    canActivate: [authGuard]
  },
  {
    path: ':id',
    component: TaskDetail,
    canActivate: [authGuard]
  }
];