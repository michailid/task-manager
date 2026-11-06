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

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.API_URL, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
