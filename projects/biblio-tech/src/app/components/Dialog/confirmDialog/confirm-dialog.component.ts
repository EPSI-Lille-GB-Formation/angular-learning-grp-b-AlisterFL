import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule],
  template: `
    <div class="confirm-dialog">
      <h2 mat-dialog-title>Confirmation</h2>
      <mat-dialog-content>
        {{ data }}
      </mat-dialog-content>
      <mat-dialog-actions >
        <button mat-button (click)="onNoClick()">Annuler</button>
        <button mat-button class="delete-button" (click)="onYesClick()">Supprimer</button>
      </mat-dialog-actions>
    </div>
  `,
  styleUrls: ['./style.css']
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
