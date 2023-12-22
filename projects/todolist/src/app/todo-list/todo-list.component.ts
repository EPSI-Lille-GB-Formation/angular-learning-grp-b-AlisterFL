import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TODOS} from '../mock-todo';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  template: `
    <h1>Liste des choses à faire :</h1>
    <ng-container *ngFor="let todo of todoList"> 
      <todo [value]="todo"/>
    </ng-container>
  `,
  styles: []
})

export class TodoList_Component {
  todoList = TODOS;

}
