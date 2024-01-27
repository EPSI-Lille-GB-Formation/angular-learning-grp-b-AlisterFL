import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { CategoryService } from '../../../services/category.service';
import { Book } from '../../../models/book';
import { Category } from '../../../models/category';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BelongService } from '../../../services/belong.service';
import { Belong } from '../../../models/belong';

@Component({
  selector: 'book-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
 <main class="container">
  <article class="grid">
    <div>
      <hgroup>
        <h1>Créer un livre</h1>
        <p>Remplissez les informations pour créer un nouveau livre !</p>
      </hgroup>
      <form (ngSubmit)="onSubmit()">
        <input
          type="text"
          name="title"
          placeholder="Titre"
          aria-label="title"
          required
          [(ngModel)]="book.title"
        />
        <textarea
          name="resume"
          placeholder="Résumé"
          aria-label="resume"
          required
          [(ngModel)]="book.resume"
        ></textarea>
        <input
          type="text"
          name="image"
          placeholder="URL de l'image"
          aria-label="image"
          required
          [(ngModel)]="book.image"
        />
        <!-- Menu déroulant pour les catégories -->
        <label for="categories">Catégories :</label>
        <select name="categories" id="categories" [(ngModel)]="selectedCategories" multiple (click)="loadCategories()">
          <option *ngFor="let category of categories" [value]="category.id">{{ category.label }}</option>
        </select>
        <button type="submit" class="contrast">Créer le livre</button>
      </form>
    </div>
  </article>
</main>


  `,
  styleUrls: ['./new-book.css']
})

export class NewBookComponent implements OnInit{

  bookList: Book[] = [];
  book: Book = new Book(0, '', '', '',new Date(),new Date());
  categories: Category[] = [];
  selectedCategories: number[] = [];

  constructor(
    private bookService: BookService,
    private router: Router,
    private categoryService: CategoryService,
    private belongService: BelongService
  ) {}
  
  ngOnInit(): void {
    this.loadCategories();
  }

  onSubmit(): void {


    this.book.createdAt = new Date();
    this.book.updatedAt = new Date();

    // Vérifier si l'URL de l'image est vide
    if (!this.book.image) {
      // Utiliser l'image par défaut si aucune URL n'est fournie
      this.book.image = '/assets/covers/no_image.png';
    }

   // Appel de la méthode du service pour ajouter un nouveau livre
   this.bookService.addBook(this.book).subscribe(
    (newBook) => {
      console.log('Livre ajouté avec succès:', newBook);

      // Enregistrer les catégories dans la table Belong
      this.selectedCategories.forEach(categoryId => {
        const belong: Belong = { bookId: newBook.id, categoryId};
        this.belongService.addBelong(belong).subscribe(
          (newBelong) => {
            console.log('Relation ajoutée avec succès:', newBelong);
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de la relation:', error);
          }
        );
      });

      // Rediriger vers une page appropriée après l'ajout du livre
      // this.router.navigate(['/books', this.createSlug(newBook.title), newBook.id]);
    },
    // ... (le reste de la méthode reste inchangé) ...
  );


  }

  loadCategories(): void {
    if (this.categories.length === 0) {
      this.categoryService.getCategories().subscribe(
        (categories) => {
          this.categories = categories;
        },
        (error) => {
          console.error('Erreur lors du chargement des catégories:', error);
        }
      );
    }
  }

  createSlug(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-');
  }
}