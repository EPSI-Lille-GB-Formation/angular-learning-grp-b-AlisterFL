import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../Dialog/success-dialog/success-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  template: `
    <div class="container">
        <div class="card">
            <h2>Profil utilisateur</h2>
            <div class="user-info">
            <form (submit)="updateUser()">
                <label for="firstname">Prénom:</label>
                <input type="text" id="firstname" [(ngModel)]="user.firstname" name="firstname">

                <label for="lastname">Nom:</label>
                <input type="text" id="lastname" [(ngModel)]="user.lastname" name="lastname">

                <label for="email">Email:</label>
                <input type="email" id="email" [(ngModel)]="user.mail" name="email">

                <button class="contrast" type="submit">Mettre à jour</button>
            </form>
            </div>
        </div>
    </div>
  `,
  styleUrls: ['./style.css'],
})
export class ProfileComponent implements OnInit {
  userId: string;
  user: User;
  allUsers: User[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService, private dialog: MatDialog) {
    this.userId = '';
    this.user = new User('', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      console.log('userid', this.userId)
      this.getUserById(this.userId);
    });
  }

  getUserById(userId: string): void {
    this.userService.getUserByID(userId).subscribe((user) => {
      this.user = user;
    });
  }

  updateUser(): void {
    this.userService.updateUser(this.userId, this.user).subscribe(() => {
      // Ouvrir la modale de succès
      this.dialog.open(SuccessDialogComponent);
    }, (error) => {
      console.error('Error updating user:', error);
    });
  }
}
