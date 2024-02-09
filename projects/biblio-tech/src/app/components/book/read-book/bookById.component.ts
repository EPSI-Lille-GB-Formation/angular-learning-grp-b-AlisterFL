import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book';
import { PageService } from '../../../services/page.service';
import { Page } from '../../../models/page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../Dialog/confirmDialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { AddPageComponent } from '../new-page/addPage.component';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-by-id',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
                  <div class="crud-button">
                    <button *ngIf="(isAdmin | async) || isAuthor" (click)="openAddPageDialog()">Ajouter une page</button>
                    <button class="delete-button" *ngIf="(isAdmin | async) || isAuthor" (click)="deleteBook()">Supprimer le livre</button>
                  </div>
              </div>
            </div>
        </article>

        <section *ngIf="pages && pages.length > 0" class="pages-section">
          <h2>Pages du livre</h2>
          <ul>
            <li *ngFor="let page of pages">
              <h3 *ngIf="!page.isEditing">{{ page.title }}</h3>
              <textarea *ngIf="page.isEditing" [(ngModel)]="editedContent">{{ page.content }}</textarea>
              <p *ngIf="!page.isEditing">{{ page.content }}</p>
              <div class="wrapper-crud">
                <div class="crud-button">
                  <button *ngIf="(!page.isEditing && (isAdmin | async)) || isAuthor" (click)="toggleEdit(page)">Modifier</button>
                  <button *ngIf="(page.isEditing && (isAdmin | async)) || isAuthor" (click)="saveEdit(page)">Enregistrer</button>
                  <button *ngIf="(isAdmin | async) || isAuthor" class="delete-button" (click)="deletePage(page)">Supprimer</button>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <p *ngIf="!pages || pages.length === 0">Aucune page pour le moment.</p>
    </main>
  `,
  styleUrls: ['./book-read-style.css']
})

export class BookById_Component implements OnInit {
  book: Book | undefined;
  pages: Page[] = [];
  editedContent: string = '';
  userId: string | null = null;
  isAdmin!: Observable<boolean>;
  isAuthor = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private pageService: PageService,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.userId = localStorage.getItem('userId');
    this.isAdmin = this.userService.isAdmin();


    this.pageService.getPages().subscribe(
      (page) => {
        console.log(page)
      },
      (error) => {
        console.error("erreur pages ")
      }
    )
    this.route.paramMap.subscribe(params => {
      const bookId = Number(params.get('id'));
      this.bookService.getBookById(bookId).subscribe(
        (book) => {
          this.book = book;

          // Vérifier si l'utilisateur est l'auteur du livre
          if (this.userId && book.userId === this.userId) {
            this.isAuthor = true;
          }

          // Récupérer les pages du livre
          this.pageService.getPagesByBookId(bookId).subscribe(
            (pages) => {
              this.pages = pages;
              console.log(pages)
            },
            (error) => {
              console.error('Erreur lors de la récupération des pages:', error);
            }
          );
        },
        (error) => {
          console.error('Erreur lors de la récupération du livre par ID:', error);
        }
      );
    });
  }

  toggleEdit(page: Page): void {
    page.isEditing = !page.isEditing;
    if (page.isEditing) {
      this.editedContent = page.content;
    }
  }

  saveEdit(page: Page): void {
    page.isEditing = false;
    page.content = this.editedContent;

    this.pageService.updatePage(page).subscribe(
      updatedPage => {
        console.log('Page mise à jour avec succès:', updatedPage);
        // Vous pouvez effectuer d'autres actions après la mise à jour, comme recharger la liste des pages
        // this.loadPages();
      },
      error => {
        console.error('Erreur lors de la mise à jour de la page:', error);
      }
    );
  }

  openAddPageDialog(): void {
    const dialogRef = this.dialog.open(AddPageComponent, {
      width: '500px',
      disableClose: true, // Empêcher la fermeture de la fenêtre modale en dehors du bouton "Annuler"
      data: { bookId: this.book?.id }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Rafraîchir la liste des pages ou effectuer d'autres actions si nécessaire
      if (result) {
        this.pageService.getPagesByBookId(this.book?.id || 0).subscribe(
          (pages) => {
            this.pages = pages;
            console.log('Pages mises à jour:', pages);
          },
          (error) => {
            console.error('Erreur lors de la récupération des pages:', error);
          }
        );
      }
    });
  }
  

  deletePage(page: Page): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Êtes-vous sûr de vouloir supprimer cette page ?'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) { //Si utilisateur confirme, alors deletePage
        this.pageService.deletePage(page.id).subscribe(
          () => {
            console.log('Page supprimée avec succès');
            this.pages = this.pages.filter(p => p !== page);
          },
          error => {
            console.error('Erreur lors de la suppression de la page:', error);
          }
        );
      }
    });

  }

  deleteBook(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Êtes-vous sûr de vouloir supprimer ce livre ?'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Si l'utilisateur confirme, supprimer le livre
        this.route.paramMap.subscribe(params => {
          const bookId = Number(params.get('id'));
          this.bookService.deleteBook(bookId).subscribe(
            () => {
              console.log('livre supprimée avec succès');
              this.router.navigate(['/']);
            },
            error => {
              console.error('Erreur lors de la suppression de lu livre:', error);
            }
          );
        })
      }
    });
  }

}
