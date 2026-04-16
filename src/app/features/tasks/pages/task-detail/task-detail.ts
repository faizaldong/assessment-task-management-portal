import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

import { Navbar } from '../../../../shared/components/navbar/navbar';
import { TaskService } from '../../../../core/services/task.service';
import { Task } from '../../../../core/models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    MatExpansionModule,
    MatCardModule
  ],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetail {
  readonly #route = inject(ActivatedRoute);
  readonly #taskService = inject(TaskService);
  readonly #destroyRef = inject(DestroyRef);

  readonly task = signal<Task | null>(null);

  constructor() {
    this.#loadTask();
  }

  #loadTask(): void {
    this.#route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.#taskService.getTaskById(id)),
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe(task => {
      this.task.set(task ?? null);
    });
  }
}