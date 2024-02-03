import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BelongService } from '../../services/belong.service';
import { Belong } from '../../models/belong';

@Component({
  selector: 'book',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <a *ngIf="book" [routerLink]="['/books', createSlug(book.title), book.id]">
      <div class="article" *ngIf="book" border-highlight>
        <img [src]="book.image" alt="{{ book.title }}" />
        <div class="book-info" [class.long-title]="book.title.length > 30">
          <h2>{{ book.title }}</h2>
          <h4>de Pierre Jacques</h4>
          <div *ngFor="let categoryLabel of categoryLabels">
            <h3>{{ categoryLabel }}</h3>
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

  constructor(private belongService: BelongService) {}

  ngOnInit(): void {
    if (this.book && this.book.id) {
      this.belongService.getBelongsByBookId(this.book.id).subscribe(
        (belongs: Belong[]) => {
          // Mapping des belongs aux libellés correspondants
          const categoryIds = belongs.map((belong) => belong.categoryId);
          this.categoryLabels = this.getCategoryLabels(categoryIds);

          console.log(
            `Category labels for book ${this.book?.id}:`,
            this.categoryLabels
          );
        },
        (error: any) => {
          console.error(
            `Error loading belongs for book ${this.book?.id}:`,
            error
          );
        }
      );
    }
  }

  getCategoryLabels(categoryIds: number[]): string[] {
    return categoryIds.map((categoryId) => {
      const category = this.categoryInfo.find((c) => c.id === categoryId);
      return category ? category.label : 'N/A';
    });
  }
}
