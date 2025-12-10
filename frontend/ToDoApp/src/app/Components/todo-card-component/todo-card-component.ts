import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TodoInterface } from '../../Interfaces/todo-interface';
import { TodoService } from '../../Services/todo-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-card-component',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './todo-card-component.html',
  styleUrl: './todo-card-component.scss'
})
export class TodoCardComponent {
  @Input() task!: TodoInterface;

  router = inject(Router);
  taskService = inject(TodoService);

  isCompleted(): boolean {
    return this.task.completed_at !== null && this.task.completed_at !== undefined;
  }

   editTask() {
    this.router.navigate(['/editTask', this.task.task_id]);
  }

  deleteTask() {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTaskById(this.task.task_id.toString()).subscribe({
        next: () => {
          alert('Task deleted successfully');
          window.location.reload();
        },
        error: (error) => {
          console.error('Error deleting task:', error);
          alert('Failed to delete task');
        }
      });
    }
  }

  
}