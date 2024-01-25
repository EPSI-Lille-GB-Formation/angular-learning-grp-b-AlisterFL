import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
  <main class="container">
    <article class="grid">
      <div>
        <hgroup>
          <h1>Se connecter</h1>
          <p>Connectez-vous pour découvrir tous les livres !</p>
        </hgroup>
        <form (ngSubmit)="onSubmit()">
          <input
            type="text"
            name="mail"
            placeholder="E-mail"
            aria-label="Mail"
            required
            [(ngModel)]="mail"
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            aria-label="Password"
            required
            [(ngModel)]="password"
          />
          <button type="submit" class="contrast">Connexion</button>
          <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
        </form>
      </div>
    </article>
  </main>
  `,
  styleUrl: './auth-style.css'
})
export class LoginComponent {
  mail: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) { }
  

  onSubmit(): void {

    this.userService.authenticateUser(this.mail, this.password).subscribe(
      (user) => {
        if (user) {
          this.router.navigate(['']);
          console.log(user);
        } else {
          this.errorMessage = 'Authentification échouée. Veuillez vérifier vos informations.';
        }
      }
    );
  }
}
