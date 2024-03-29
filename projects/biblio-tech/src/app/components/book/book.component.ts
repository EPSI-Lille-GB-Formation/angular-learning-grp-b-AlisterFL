import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BelongService } from '../../services/belong.service';
import { Belong } from '../../models/belong';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'book',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <a *ngIf="book" [routerLink]="['/books', createSlug(book.title), book.id]">
      <div class="article" *ngIf="book" border-highlight>
        <img [src]="book.image" alt="{{ book.title }}" />
        <div class="book-info" [class.long-title]="book.title.length > 30">
          <div class="titleAuthor">
            <h2>{{ book.title }}</h2>
            <h3>de {{ authorFirstName }} {{ authorLastName }}</h3>
          </div>
          <div class="categories">
            <div *ngFor="let bookCategoryLabel of bookCategoryLabels">
              <h4>{{ bookCategoryLabel }}</h4>
            </div>
          </div>
        </div>
      </div>
    </a>
  `,
  styleUrls: ['./book-style.css'],
})
export class BookComponent implements OnInit {
  createSlug(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-');
  }

  @Input('value')
  book: Book | undefined;

  @Input()
  categoryInfo: { id: number; label: string }[] = [];

  categoryLabels: string[] = [];
  belongs: Belong[] = [];
  // Catégories spécifiques du livre
  bookCategories: { id: number; label: string }[] = [];
  bookCategoryLabels: string[] = [];

  authorFirstName: string = '';
  authorLastName: string = '';

  constructor(private belongService: BelongService, private userService: UserService) {}

  ngOnInit(): void {
    if (this.book && this.book.id) {
      this.belongService.getBelongsByBookId(this.book.id).subscribe(
        (belongs: Belong[]) => {
          // Mapping des belongs aux libellés correspondants
          const categoryIds = belongs.map((belong) => belong.categoryId);
          const bookCategories = this.getCategoryLabels(categoryIds);

          this.bookCategoryLabels = bookCategories.map((category) => category.label);
        },
        (error: any) => {
          console.error(
            `Error loading belongs for book ${this.book?.id}:`,
            error
          );
        }
      );
      // Récupérez les informations sur l'utilisateur (auteur) en utilisant l'ID de l'utilisateur
      this.userService.getUserByID(this.book.userId).subscribe(
        (user: User) => {
          // Utilisez le nom de l'utilisateur comme nom de l'auteur
          this.authorFirstName = user.firstname;
          this.authorLastName = user.lastname;
        },
        (error: any) => {
          console.error(
            `Error loading user data for book ${this.book?.id}:`,
            error
          );
        }
      );

    }
  }

  getCategoryLabels(categoryIds: number[]): { id: number; label: string }[] {
    return categoryIds
      .map((categoryId) => this.categoryInfo.find((c) => c.id === categoryId))
      .filter((category): category is { id: number; label: string } => !!category);
  }




}
