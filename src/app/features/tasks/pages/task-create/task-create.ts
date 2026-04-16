import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { Navbar } from '../../../../shared/components/navbar/navbar';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { CommonModule } from '@angular/common';
import { TaskFacade } from '../../../../store/task/task.facade';
import { Task } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './task-create.html',
  styleUrl: './task-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCreate {
  readonly #fb = inject(FormBuilder);
  readonly #toast = inject(ToastService);
  readonly #router = inject(Router);
  readonly #taskFacade = inject(TaskFacade);

  // Step 1
  readonly taskInfoForm = this.#fb.nonNullable.group({
    taskName: ['', [Validators.required, Validators.minLength(3)]],
    priority: ['', Validators.required]
  });

  // Step 2
  readonly assignmentForm = this.#fb.nonNullable.group({
    assignedTo: ['', Validators.required]
  });

  submit(): void {
    if (this.taskInfoForm.invalid || this.assignmentForm.invalid) {
      this.#toast.showError('Please fix validation errors');
      return;
    }

    const newTask: Task = {
      id: Date.now(), // simple mock ID
      name: this.taskInfoForm.value.taskName!,
      status: 'In Progress',
      assignedTo: this.assignmentForm.value.assignedTo!,
      priority: this.taskInfoForm.value.priority!,
      description: 'Newly created task',
      imageUrl: 'https://picsum.photos/300/200?random=1',
      details: {
        createdDate: new Date().toISOString(),
        dueDate: new Date().toISOString(),
        notes: ''
      },
    };

    // ✅ UPDATE STORE
    this.#taskFacade.createTask(newTask);

    this.#toast.showSuccess('Task created successfully');
    this.#router.navigate(['/tasks']);
  }
}