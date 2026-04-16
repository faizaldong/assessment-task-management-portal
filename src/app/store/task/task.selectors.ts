import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectTasks = createSelector(
  selectTaskState,
  state => state.tasks
);

export const selectTaskLoading = createSelector(
  selectTaskState,
  state => state.loading
);