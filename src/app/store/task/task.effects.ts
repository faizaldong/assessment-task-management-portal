import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from '../../core/services/task.service';
import * as TaskActions from './task.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class TaskEffects {
  readonly #actions$ = inject(Actions);
  readonly #taskService = inject(TaskService);

  loadTasks$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() =>
        this.#taskService.getTasks().pipe(
          map(tasks => TaskActions.loadTasksSuccess({ tasks })),
          catchError(() =>
            of(TaskActions.loadTasksFailure({ error: 'Failed to load tasks' }))
          )
        )
      )
    )
  );
}