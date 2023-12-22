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

    <ng-container *ngFor="let todo of todoList"> 
      <todo *ngIf="todo.isCompleted === completedFilter" [value]="todo"/>
    </ng-container>
  `,
  styles: []
})

export class TodoList_Component {
  todoList = TODOS;

  completedFilter = false

  onClickTodo() {
    this.completedFilter = false;
  }
  onClickTodoCompleted() {
    this.completedFilter = true;
  }

}
