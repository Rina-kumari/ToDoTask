import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TodoInterface } from '../Interfaces/todo-interface';
//import { environment } from '../../environments/environment.development';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private http = inject(HttpClient);
  constructor(){}

  getTasks(){
    return this.http.get<TodoInterface[]>(environment.apiUrl+'/tasks')
  }

  getTaskById(id:string){
    return this.http.get<TodoInterface>(environment.apiUrl+'/tasks/' + id);
  }

  addTask(model:TodoInterface){
    return this.http.post(environment.apiUrl+'/tasks',model)
  }

  updateTask(id:string,model:TodoInterface){
    return this.http.put(environment.apiUrl+'/tasks/'+id, model)
  }

  deleteTaskById(id: string){
    return this.http.delete(environment.apiUrl + '/tasks/' + id);
  }
  
}
