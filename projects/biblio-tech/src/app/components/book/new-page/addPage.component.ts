import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageService } from '../../../services/page.service';
import { Page } from '../../../models/page'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
  <div class="add-page-container">
    <h2>Ajouter une nouvelle page</h2>
    <form [formGroup]="addPageForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
        <label for="title">Titre de la page</label>
        <input type="text" id="title" formControlName="title">
        <div *ngIf="addPageForm.get('title')?.invalid && addPageForm.get('title')?.touched" class="error-message">
            Le titre de la page est requis.
        </div>
        </div>
        <div class="form-group">
        <label for="content">Contenu de la page</label>
        <textarea id="content" formControlName="content"></textarea>
        <div *ngIf="addPageForm.get('content')?.invalid && addPageForm.get('content')?.touched" class="error-message">
            Le contenu de la page est requis.
        </div>
        </div>
        <div class="button-group">
        <button type="submit" [disabled]="addPageForm.invalid">Ajouter la page</button>
        <button type="button" (click)="onCancel()">Annuler</button>
        </div>
    </form>
    </div>
  `,
  styleUrls: ['./style.css']
})
export class AddPageComponent {

  addPageForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddPageComponent>,
    private pageService: PageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Créer le formulaire d'ajout de page avec des validations
    this.addPageForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSubmit(): void {
    // Vérifier si le formulaire est valide
    if (this.addPageForm.valid) {
        const newPageData = {
          bookId: this.data.bookId,
          title: this.addPageForm.value.title,
          content: this.addPageForm.value.content
        };
        
        // Créer une instance de la classe Page avec les données
        const newPage = new Page(
          0, // ID peut être temporairement mis à 0 car il sera généré côté serveur
          newPageData.bookId,
          newPageData.title,
          newPageData.content,
          new Date(), // createdAt
          new Date(), // updatedAt
          false // isEditing
        );
      
      // Appeler le service pour ajouter la nouvelle page
      this.pageService.addPage(newPage).subscribe(
        () => {
          // Fermer le pop-up et transmettre un signal de succès à la page principale
          this.dialogRef.close(true);
        },
        error => {
          console.error('Erreur lors de l\'ajout de la page:', error);
          // Gérer l'erreur ou afficher un message à l'utilisateur
        }
      );
    }
  }

  // Fonction pour fermer le pop-up sans ajouter de page
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
