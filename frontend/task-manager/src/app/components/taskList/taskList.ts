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
    this.loadTasks();
  }

  loadTasks() {
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
    if (taskTitle.trim() !== '') {
      const task = { title: taskTitle };
      this.taskService.addTask(task).subscribe({
        next: () => {
          this.taskToAdd = '';
          this.loadTasks();
        },
        error: (error) => {
          alert('Error:' + error);
        },
      });
    }
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error) => {
        alert('Error: ' + error);
      },
    });
  }
}
