import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private readonly httpService: HttpService) {}

  getTasks(): Observable<Task[]> {
    return this.httpService.getData().pipe(
      map(data => data.tasks)
    );
  }

  getTaskById(id: number): Observable<Task | undefined> {
    return this.getTasks().pipe(
      map(tasks => tasks.find(t => t.id === id))
    );
  }
}