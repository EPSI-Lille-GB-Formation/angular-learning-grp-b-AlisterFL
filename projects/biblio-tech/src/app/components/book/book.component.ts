import { Component, Input } from '@angular/core';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'book',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <a *ngIf="book" [routerLink]="['/books', createSlug(book.title), book.id]">
      <div class="article" *ngIf="book" border-highlight>
          <img [src]="book.image" alt="{{book.title}}" />
          <div class="book-info" [class.long-title]="book.title.length > 30">
            <h2>{{book.title}}</h2>
            <h4> de Pierre Jacques</h4>
          </div>
        </div>
    </a>
    `,
  styleUrls: ['./book-style.css']
})
export class BookComponent {

  createSlug(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-');
  }

  @Input("value")
  book: Book | undefined;


  

}
