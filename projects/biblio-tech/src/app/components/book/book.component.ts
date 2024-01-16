import { Component, Input } from '@angular/core';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'book',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article *ngIf="book" border-highlight>
      <div class="grid">
        <label for="book-{{book.id}}">
          <input type="checkbox" [checked]="book.isCompleted" id="book-{{book.id}}" (click)="onCheck()" >{{book.title}}
        </label>
        <div class="action">
          <a href="#">Edit</a>
          <a href="#">Delete</a>
        </div>
      </div>
    </article>
    `,
  styles: [
    `
    .action {
      display: flex;
      flex-direction: row;
      justify-content:flex-end;
    }

    .action a{
      margin-left: 8px;
    }`
  ]
})
export class BookComponent {

  @Input("value")
  book: Book | undefined;

  onCheck() {
    if(this.book) {
      this.book.isCompleted = !this.book?.isCompleted
      console.table(this.book)
    }
  }
}
