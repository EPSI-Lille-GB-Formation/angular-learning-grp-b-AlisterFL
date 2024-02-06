import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {BookList_Component} from './components/book/book-list.component'
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,  BookList_Component, HeaderComponent],
  template: `
  <div class="body">
    <app-header></app-header>
    <router-outlet></router-outlet>
  </div>
  `,
  styles: []
})

export class AppComponent {

}
