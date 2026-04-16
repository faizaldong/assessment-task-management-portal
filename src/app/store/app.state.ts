import { AuthState } from './auth/auth.reducer';
import { TaskState } from './task/task.reducer';

export interface AppState {
  auth: AuthState;
  tasks: TaskState;
}