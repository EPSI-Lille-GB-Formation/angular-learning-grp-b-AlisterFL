import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {BookList_Component} from './components/book/book-list.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,  BookList_Component],
  template: `
  <book-list/>
  `,
  styles: []
})

export class AppComponent {
  constructor(){ }

}
