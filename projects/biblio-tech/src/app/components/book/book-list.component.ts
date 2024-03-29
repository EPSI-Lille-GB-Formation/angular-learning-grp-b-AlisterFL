import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookComponent } from './book.component';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Belong } from '../../models/belong';
import { BelongService } from '../../services/belong.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'book-list',
  standalone: true,
  imports: [CommonModule, BookComponent, FormsModule],
  template: `
    <div class="filter-controls">
      <button class="secondary" *ngFor="let category of categoryInfo" (click)="applyCategoryFilter(category.id)">
        {{ category.label }}
      </button>
      <button class="secondary" (click)="clearCategoryFilter()">Toutes les catégories</button>
    </div>
    <div class="booklist">
      <ng-container *ngFor="let book of filteredBookList"> 
        <book [value]="book" [categoryInfo]="categoryInfo"/>
      </ng-container>
    </div>
  `,
  styleUrls: ['./book-style.css']
})

export class BookList_Component {
  bookList: Book[] = [];
  filteredBookList: Book[] = [];
  belongList: Belong[] = [];
  categoryInfo: { id: number, label: string }[] = [];
  selectedCategoryId: number | null = null;

  constructor(private userService: UserService, private bookService: BookService, private categoryService: CategoryService, private belongService: BelongService) {}

  

  ngOnInit(): void {
    this.bookService.getBookList().subscribe(books => {
      this.bookList = books;
      this.filteredBookList = books; // Initialisation de la liste filtrée
    });

    this.loadCategoryInfo();
    this.belongService.getBelongs().subscribe(
      (belongs: Belong[]) => {
        this.belongList = belongs;
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
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    );

  }

  filterBooks(): void {

    if (typeof this.selectedCategoryId !== 'number') {
      console.error('Selected category ID is not a number.');
      return;
    }
      
    if (this.selectedCategoryId !== null) {
      this.filteredBookList = this.bookList.filter(book => {
        // Vérifie si le livre appartient à la catégorie sélectionnée
        return this.belongList.some(belong => {
          return belong.bookId === book.id && belong.categoryId === this.selectedCategoryId;
        });
      });
    } else {
      this.filteredBookList = this.bookList;
    }
  
  }

  applyCategoryFilter(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.filterBooks();
  }
  
  clearCategoryFilter(): void {
    this.selectedCategoryId = null;
    this.filteredBookList = this.bookList; 
  }
  

}
