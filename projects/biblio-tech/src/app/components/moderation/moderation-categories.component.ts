import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../Dialog/success-dialog/success-dialog.component';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { ConfirmDialogComponent } from '../Dialog/confirmDialog/confirm-dialog.component';

@Component({
  selector: 'app-moderation-categories',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  template: `
    <div class="container-button">
      <button class="contrast" routerLink="/moderation/users">
        Modération des utilisateurs
      </button>
      <button class="contrast" routerLink="/moderation/categories">
        Modération des catégories
      </button>
    </div>
    <div class="container">
      <h2>Modération des catégories</h2>

      <h3>Ajouter une nouvelle catégorie</h3>
      <input
        class="newCategoryInput"
        type="text"
        [(ngModel)]="newCategoryLabel"
        placeholder="Nouvelle catégorie"
      />
      <button class="contrast" (click)="addCategory()">Ajouter</button>

      <!-- Affichage des catégories existantes -->
      <form #categoryForm="ngForm">
        <div class="category-card" *ngFor="let category of categories">
          <div class="category-info">
            <div class="info-item">
              <strong style="width: 50px;">ID :</strong>
              {{ category.id }}
            </div>
            <div class="info-item">
              <strong style="width: 50px;">Nom :</strong>
              <input
                type="text"
                [(ngModel)]="category.label"
                name="categoryName"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
          </div>

          <div class="category-actions">
            <button class="contrast"(click)="updateCategory(category)">Enregistrer</button>
            <button class="secondary"(click)="deleteCategory(category.id)">Supprimer</button>
          </div>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./style.css'],
})
export class CategoryModerationComponent implements OnInit {
  categories: Category[] = [];
  newCategoryLabel: string = '';

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  updateCategory(category: Category): void {
    this.categoryService.updateCategory(category).subscribe(
      () => {
        console.log('Category updated successfully.');
      },
      (error) => {
        console.error('Error updating category:', error);
      }
    );
  }

  deleteCategory(categoryId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Êtes-vous sûr de vouloir supprimer cette catégorie ?'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Si l'utilisateur confirme, supprimer la catégorie
        this.categoryService.deleteCategory(categoryId).subscribe(
          () => {
            this.categories = this.categories.filter(
              (cat) => cat.id !== categoryId
            );
            console.log('Category deleted successfully.');
          },
          (error) => {
            console.error('Error deleting category:', error);
          }
        );
      }
    });
  }

  addCategory(): void {
    if (this.newCategoryLabel.trim() !== '') {
      const newCategory = new Category(0, this.newCategoryLabel.trim());
      this.categoryService.addCategory(newCategory).subscribe(
        (createdCategory) => {
          this.categories.push(createdCategory);
          this.newCategoryLabel = '';
          console.log('Category added successfully.');
          this.openSuccessDialog('Category added successfully.');
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    }
  }

  openSuccessDialog(message: string): void {
    this.dialog.open(SuccessDialogComponent, { data: { message: message } });
  }
}
