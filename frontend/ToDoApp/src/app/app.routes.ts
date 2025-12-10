import { Routes } from '@angular/router';
import { TodoComponent } from './Components/todo-component/todo-component';
import { TodoFormComponent } from './Components/todo-form-component/todo-form-component';

export const routes: Routes = [

    { path: "tasks", component:TodoComponent },
    {path:"", redirectTo:"tasks",pathMatch:"full"},
    { path: "addTask", component:TodoFormComponent },
    { path: "editTask/:id", component: TodoFormComponent }
];
