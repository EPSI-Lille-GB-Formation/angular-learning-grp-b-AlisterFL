import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookComponent } from './book.component';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'book-list',
  standalone: true,
  imports: [CommonModule, BookComponent],
  template: `
    <h1>Liste des choses à faire :</h1>

    <a href="#" role="button"
    [class.secondary]="!completedFilter && !allList" 
    (click)="onClickBook()"> A faire</a>
    <a href="#" role="button" 
    [class.secondary]="completedFilter && !allList"
    (click)="onClickBookCompleted()"> Terminée</a>
    <a href="#" role="button" 
    [class.secondary]="allList"
    (click)="onClickBookAll()"> Tout afficher</a>

    <ng-container *ngFor="let book of bookList"> 
      <book *ngIf="book.isCompleted === completedFilter || allList" [value]="book"/>
    </ng-container>
  `,
  styles: []
})

export class BookList_Component {
  bookList: Book[] = [];

  completedFilter: boolean = false

  allList: boolean = false

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBookList().subscribe(books => this.bookList = books)
    this.bookService.getBookById(5).subscribe(book => console.log(book))
  }

  onClickBook(): void {
    this.completedFilter = false;
    this.allList = false;
  }
  onClickBookCompleted(): void {
    this.completedFilter = true;
    this.allList = false;
  }
  onClickBookAll(): void {
    this.allList = true;
  }

}
