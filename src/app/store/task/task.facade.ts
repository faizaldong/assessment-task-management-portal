import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TaskActions from './task.actions';
import * as TaskSelectors from './task.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppState } from '../app.state';
import { Task } from '../../core/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskFacade {
  readonly #store = inject(Store<AppState>);

  readonly tasks = toSignal(this.#store.select(TaskSelectors.selectTasks));
  readonly loading = toSignal(this.#store.select(TaskSelectors.selectTaskLoading));

  loadTasks(): void {
    this.#store.dispatch(TaskActions.loadTasks());
  }

  createTask(task: Task): void {
    this.#store.dispatch(TaskActions.createTask({ task }));
  }
}