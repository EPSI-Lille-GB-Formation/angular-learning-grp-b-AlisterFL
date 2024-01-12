import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient
  ) { }

  getTodoList() {
    return this.http.get<Todo[]>('api/todos').toPromise().then(todos => todos)
  }
}
