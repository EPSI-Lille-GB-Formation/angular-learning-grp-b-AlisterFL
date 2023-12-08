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
  `,
  styles: []
})

export class AppComponent {
  todoList = TODOS;

  constructor(){
    `<p>test<p>`
  }
}
