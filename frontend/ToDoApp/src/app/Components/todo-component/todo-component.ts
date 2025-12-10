import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TodoInterface } from '../../Interfaces/todo-interface';
import { TodoService } from '../../Services/todo-service';
import { CommonModule } from '@angular/common';
import { TodoCardComponent } from '../todo-card-component/todo-card-component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-component',
  imports: [RouterLink, CommonModule, TodoCardComponent,FormsModule],
  templateUrl: './todo-component.html',
  styleUrl: './todo-component.scss'
})
export class TodoComponent implements OnInit {

  tasks: TodoInterface[] = [];
  taskService = inject(TodoService);
  route = inject(ActivatedRoute);
  cdr = inject(ChangeDetectorRef);
  filteredTasks: TodoInterface[] = [];
  //filteredTasks: TodoInterface[] = this.tasks;

  selectedStatus: string = '';
  selectedPriority: string = '';
  searchText: string = '';

  ngOnInit() {

    this.loadTasks();
    
   /* this.taskService.getTasks().subscribe(result=>{
      this.tasks=result;
      console.log(result);
      this.cdr.detectChanges();
    })*/
  }

  loadTasks() {
    console.log('Component initialized');
    this.taskService.getTasks().subscribe(result => {
        this.tasks = result;
        this.filteredTasks = result; 
        console.log(result);
      this.cdr.detectChanges();
        this.applyFilters();
      });
  }

  applyFilters() {
  this.filteredTasks = this.tasks.filter(task => {
    // Check status filter
    if (this.selectedStatus && task.status !== this.selectedStatus) {
      return false;
    }
    
    // Check priority filter
    if (this.selectedPriority && task.priority !== this.selectedPriority) {
      return false;
    }
    
    // Check search filter
    if (this.searchText) {
      const search = this.searchText.toLowerCase();
      const titleMatch = task.title.toLowerCase().includes(search);
      const descMatch = task.description?.toLowerCase().includes(search);
      
      if (!titleMatch && !descMatch) {
        return false;
      }
    }
    
    return true;
  });
}

onStatusChange() {
    this.applyFilters();
  }

  onPriorityChange() {
    this.applyFilters();
  }

  onSearchChange() {
    this.applyFilters();
  }

  
}