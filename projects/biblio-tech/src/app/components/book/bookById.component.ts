import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookComponent } from './book.component';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'book-list',
  standalone: true,
  imports: [CommonModule, BookComponent],
  template: `
    <ng-container *ngIf="book">
      <h1>{{book.title}}</h1>
      <!-- Ajoutez ici le reste des informations sur le livre selon vos besoins -->
    </ng-container>

  `,
  styleUrls: ['./book-style.css']
})

export class BookById_Component {
  book: Book | undefined;

  constructor(private route: ActivatedRoute, private bookService: BookService) {}

  ngOnInit(): void {
    // Récupérer l'id de l'URL
    const id = this.route.snapshot.paramMap.get('id');

    // Utiliser l'id pour récupérer le livre
    if (id) {
      this.bookService.getBookById(parseInt(id, 10)).subscribe(book => this.book = book);
    }
  }

}
