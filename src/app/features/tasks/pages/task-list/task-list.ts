import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
  inject
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';

import { Task } from '../../../../core/models/task.model';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { TaskFacade } from '../../../../store/task/task.facade';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    Navbar,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSelectModule
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskList implements OnInit, AfterViewInit {
  readonly #taskFacade = inject(TaskFacade);
  readonly #router = inject(Router);

  readonly tasks = this.#taskFacade.tasks;
  readonly loading = this.#taskFacade.loading;

readonly displayedColumns: readonly string[] = [
  'name',
  'priority',
  'status',
  'assignedTo',
  'actions'
];

  readonly dataSource = new MatTableDataSource<Task>([]);

  @ViewChild(MatSort) sort!: MatSort;

  ngafterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.#taskFacade.loadTasks();
    const tasks = this.#taskFacade.tasks();
    if (tasks) {
      this.dataSource.data = tasks;
    }

    this.dataSource.filterPredicate = (task, filter) => {
      return !filter || task.priority === filter;
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  filterByPriority(priority: string): void {
    this.dataSource.filter = priority.trim();
  }

  viewTask(task: Task): void {
    this.#router.navigate(['/tasks', task.id]);
  }

  editTask(task: Task): void {
    this.#router.navigate(['/tasks/edit', task.id]);
  }
}