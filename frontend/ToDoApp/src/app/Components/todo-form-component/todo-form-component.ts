import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TodoService } from '../../Services/todo-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-form-component',
  imports: [MatFormFieldModule,MatInputModule,MatSelectModule,
    MatDatepickerModule,MatButtonModule,MatIconModule,MatCardModule,
    ReactiveFormsModule,CommonModule,RouterModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './todo-form-component.html',
  styleUrl: './todo-form-component.scss'
})
export class TodoFormComponent implements OnInit {

 
  formBuilder = inject(FormBuilder);

  taskForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.maxLength(500)]],
    status: ['', [Validators.required]],
    priority: ['', [Validators.required]],
    due_date: new FormControl<Date | string | null>(null)
  });

  taskService = inject(TodoService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  id!: string;

  statusOptions = [
    { value: 'To Do', label: 'To Do' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Cancelled', label: 'Cancelled' }
  ];

  priorityOptions = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
    { value: 'Urgent', label: 'Urgent' }
  ];

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    console.log(this.id);
    if (this.id) {
      this.taskService.getTaskById(this.id).subscribe(result => {
        this.taskForm.patchValue(result as any);
      });
    }
  }
  addTask() {
    let value = this.taskForm.value;
    console.log(value);
    this.taskService.addTask(value as any).subscribe((result) => {
      alert('Task added');
      this.router.navigateByUrl("/tasks");
    });
  }

   updateTask() {
    let value = this.taskForm.value;
    console.log(value);
    this.taskService.updateTask(this.id, value as any).subscribe((result) => {
      alert('Task updated');
      this.router.navigateByUrl("/tasks");
    });
  }


/*ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    console.log('Task ID:', this.id);
    
    if (this.id) {
      this.taskService.getTaskById(this.id).subscribe({
        next: (result) => {
          console.log('Loaded task:', result);
          this.taskForm.patchValue({
            title: result.title,
            description: result.description,
            status: result.status,
            priority: result.priority,
            due_date: result.due_date
          });
        },
        error: (error) => {
          console.error('Error loading task:', error);
          alert('Failed to load task');
          this.router.navigateByUrl("/tasks");
        }
      });
    }
  }

  addTask() {
    if (this.taskForm.invalid) {
      return;
    }

    const value = this.taskForm.value;
    console.log('Adding task:', value);
    
    this.taskService.addTask(value as any).subscribe({
      next: (result) => {
        console.log('Task added:', result);
        alert('Task added successfully');
        this.router.navigateByUrl("/tasks");
      },
      error: (error) => {
        console.error('Error adding task:', error);
        alert('Failed to add task');
      }
    });
  }
  updateTask() {
    if (this.taskForm.invalid) {
      return;
    }

    const value = this.taskForm.value;
    console.log('Updating task:', value);
    
    this.taskService.updateTask(this.id, value as any).subscribe({
      next: (result) => {
        console.log('Task updated:', result);
        alert('Task updated successfully');
        this.router.navigateByUrl("/tasks");
      },
      error: (error) => {
        console.error('Error updating task:', error);
        alert('Failed to update task');
      }
    });
  }*/

  
}
