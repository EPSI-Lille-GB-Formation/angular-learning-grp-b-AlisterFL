import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TODOS} from './mock-todo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
  <h1>Liste des choses à faire :</h1>

  <ul>
    <ng-container *ngFor="let todo of todoList">
      <li *ngIf="!todo.isCompleted">{{todo.title}}</li>
    </ng-container>
  </ul>
  `,
  styles: []
})

export class AppComponent {
  todoList = TODOS;

  constructor(){
    console.table(this.todoList)
  }

  selectTodo(id: number) {
    return this.todoList[id]
  }
}
