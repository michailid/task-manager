import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Task } from '../model/task.model';
import { Observable } from 'rxjs';

@Service()
export class TaskService {
  http = inject(HttpClient);
  API_URL = 'http://localhost:8080/tasks';

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API_URL);
  }

  addNewTask(taskTitle: string): Observable<Task> {
    return this.http.post<Task>(this.API_URL, { title: taskTitle });
  }
}
