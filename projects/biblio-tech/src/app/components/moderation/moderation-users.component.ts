import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../Dialog/success-dialog/success-dialog.component';

@Component({
  selector: 'app-moderation-users',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  template: `
    <div class="container-button">
      <button routerLink="/moderation/users">
        Modération des utilisateurs
      </button>
      <button routerLink="/moderation/categories">
        Modération des catégories
      </button>
    </div>
    <div class="container">
      <h2>Modération des utilisateurs</h2>
      <div class="user-card" *ngFor="let user of allUsers">
        <div class="user-info">
          <div class="info-item">
            <strong>Prénom :</strong>
            <input type="text" [(ngModel)]="user.firstname" />
          </div>
          <div class="info-item">
            <strong>Nom :</strong>
            <input type="text" [(ngModel)]="user.lastname" />
          </div>
          <div class="info-item"><strong>Email :</strong> {{ user.mail }}</div>
          <div class="info-item"><strong>Rôle :</strong> {{ user.role }}</div>
        </div>
        <div class="user-actions">
          <button (click)="deleteUser(user.id)">Supprimer</button>
          <button (click)="toggleUserRole(user)">Changer de rôle</button>
          <button (click)="updateUser(user)">Enregistrer</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./style.css'],
})
export class ModerationUsersComponent implements OnInit {
  allUsers: User[] = [];

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.allUsers = users;
    });
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.allUsers = this.allUsers.filter((user) => user.id !== userId);
        this.openSuccessDialog('Utilisateur supprimé avec succès.');
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  toggleUserRole(user: User): void {
    user.role = user.role === 'user' ? 'admin' : 'user';
    this.userService.updateUser(user.id, user).subscribe(
      () => {
        this.openSuccessDialog("Rôle de l'utilisateur mis à jour avec succès.");
      },
      (error) => {
        console.error('Error updating user role:', error);
      }
    );
  }

  updateUser(user: User): void {
    this.userService.updateUser(user.id, user).subscribe(
      () => {
        this.openSuccessDialog(
          'Informations utilisateur mises à jour avec succès.'
        );
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

  openSuccessDialog(message: string): void {
    this.dialog.open(SuccessDialogComponent, { data: { message: message } });
  }
}
