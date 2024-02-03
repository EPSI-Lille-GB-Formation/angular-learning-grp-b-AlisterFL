import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookComponent } from './book.component';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'book-list',
  standalone: true,
  imports: [CommonModule, BookComponent],
  template: `
    <div class="booklist">
      <ng-container *ngFor="let book of bookList"> 
        <book [value]="book" [categoryInfo]="categoryInfo"/>
      </ng-container>
    </div>
  `,
  styleUrls: ['./book-style.css']
})

export class BookList_Component {
  bookList: Book[] = [];
  categoryInfo: { id: number, label: string }[] = [];

  constructor(private bookService: BookService, private categoryService: CategoryService) {}

  

  ngOnInit(): void {
    this.bookService.getBookList().subscribe(books => this.bookList = books)
    this.loadCategoryInfo();
  }

  loadCategoryInfo(): void {
    this.categoryService.getCategories().subscribe(
      (categories: Category[]) => {    
        this.categoryInfo = categories.map(category => ({ id: category.id, label: category.label }));
        console.log(this.categoryInfo)
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    );
  }

}
