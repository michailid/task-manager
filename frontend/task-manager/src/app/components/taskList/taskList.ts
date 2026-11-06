import { Component, inject, OnInit, signal } from '@angular/core';
import { Task } from '../../model/task.model';
import { TaskService } from '../../services/task-service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-task-list',
  styleUrl: './taskList.css',
  templateUrl: './taskList.html',
})
export class TaskList implements OnInit {
  tasks = signal<Task[]>([]);
  taskToAdd = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (res: any) => {
        this.tasks.set(res);
      },
      error: (error) => {
        alert('Error:' + error);
      },
    });
  }

  addTask(taskTitle: string) {
    this.taskToAdd = '';
    this.taskService.addNewTask(taskTitle).subscribe({
      next: () => {},
      error: (error) => {
        alert('Error:' + error);
      },
    });
    this.getAllTasks();
  }
}
