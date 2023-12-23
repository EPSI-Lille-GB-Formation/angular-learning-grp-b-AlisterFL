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

    <a href="#" role="button" (click)="onClickTodo()"> A faire</a>
    <a href="#" role="button" (click)="onClickTodoCompleted()"> Terminée</a>
    <a href="#" role="button" (click)="onClickTodoAll()"> Tout afficher</a>

    <ng-container *ngFor="let todo of todoList"> 
      <todo *ngIf="todo.isCompleted === completedFilter || allList"  [value]="todo"/>
    </ng-container>
  `,
  styles: []
})

export class TodoList_Component {
  todoList = TODOS;

  completedFilter = false

  allList = false

  onClickTodo() {
    this.completedFilter = false;
    this.allList = false;
  }
  onClickTodoCompleted() {
    this.completedFilter = true;
    this.allList = false;
  }
  onClickTodoAll() {
    this.allList = true;
  }

}
