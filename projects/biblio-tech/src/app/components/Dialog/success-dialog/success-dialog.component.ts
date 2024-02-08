import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports: [MatDialogModule],
  template: `
    <h2>Succès</h2>
    <p>Les informations ont été mises à jour avec succès.</p>
    <button class="contrast" mat-button mat-dialog-close>OK</button>
  `,
  styleUrl: './success-dialog.component.css'
})
export class SuccessDialogComponent {

}
