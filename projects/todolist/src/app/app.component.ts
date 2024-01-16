import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {TodoList_Component} from './components/book/todo-list.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,  TodoList_Component],
  template: `
  <todo-list/>
  `,
  styles: []
})

export class AppComponent {
  constructor(){ }

}
