// bookById.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book';

@Component({
  selector: 'app-book-by-id',
  template: `
    <main class="container">
        <article class="grid">
            <div class="book-details">
            <div class="image-container">
                <img [src]="book?.image" alt="{{ book?.title }}" />
            </div>
            <div class="info-container">
                <h1>{{ book?.title }}</h1>
                <p>{{ book?.resume }}</p>
            </div>
            </div>
        </article>
    </main>
  `,
  styleUrls: ['./book-read-style.css']
})

export class BookById_Component implements OnInit {
  book: Book | undefined;

  constructor(private route: ActivatedRoute, private bookService: BookService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const bookId = Number(params.get('id'));
      this.bookService.getBookById(bookId).subscribe(
        (book) => {
          this.book = book;
        },
        (error) => {
          console.error('Erreur lors de la récupération du livre par ID:', error);
        }
      );
    });
  }
}
