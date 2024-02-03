import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookComponent } from './book.component';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Belong } from '../../models/belong';
import { BelongService } from '../../services/belong.service';

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
  belongList: Belong[] = [];
  categoryInfo: { id: number, label: string }[] = [];

  constructor(private bookService: BookService, private categoryService: CategoryService, private belongService: BelongService) {}

  

  ngOnInit(): void {
    this.bookService.getBookList().subscribe(books => this.bookList = books)
    this.loadCategoryInfo();
    this.belongService.getBelongs().subscribe(
      (belongs: Belong[]) => {
        this.belongList = belongs;
        console.log("belong : ", this.belongList);
      },
      (error) => {
        console.error('Erreur lors du chargement des belongs:', error);
      }
    );
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
