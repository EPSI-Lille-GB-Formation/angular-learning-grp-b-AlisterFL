import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  template: `
    <main class="container">
      <article class="grid">
        <div>
          <hgroup>
            <h1>S'inscrire</h1>
            <p>Inscrivez-vous pour découvrir tous les livres !</p>
          </hgroup>
          <form (ngSubmit)="onSubmit()">
            <input
              type="text"
              name="firstname"
              placeholder="Prénom"
              aria-label="firstname"
              required
              [(ngModel)]="user.firstname"
            />
            <input
              type="text"
              name="lastname"
              placeholder="Nom"
              aria-label="Lastname"
              required
              [(ngModel)]="user.lastname"
            />
            <input
              type="text"
              name="mail"
              placeholder="E-mail"
              aria-label="mail"
              required
              [(ngModel)]="user.mail"
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              aria-label="Password"
              required
              [(ngModel)]="user.password"
            />
            <label>
              Rôle:
              <input
                  type="checkbox"
                  name="adminRole"
                  [(ngModel)]="user.role"
                  (change)="onRoleChange($event)"
              />
              Admin
            </label>
            <button type="submit" class="contrast">Inscription</button>

          </form>
        </div>
      </article>
    </main>
  `,
  styleUrls: ['./auth-style.css']
})
export class SignUpComponent {
  user: User = new User('', '', '', '', '', '');
  isAdmin: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {

    // Vérification de l'e-mail avec une expression régulière
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.user.mail)) {
        alert("L'adresse e-mail n'est pas valide.");
        return;
    }


    // Vérifiez que le mot de passe est valide
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;;
      if (!regex.test(this.user.password)) {
      alert("Le mot de passe n'est pas valide. Il doit comporter 8 caractères, une majuscule, une minuscule, un nombre et un caractère spécial.");
      return;
      }

    // Appel de la méthode du service pour ajouter un nouvel utilisateur
    this.userService.addUser(this.user).subscribe(
      (newUser) => {
        console.log('Utilisateur ajouté avec succès:', newUser);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
      }
    );
    this.userService.getUsers().subscribe(
      (users) => {
        console.log(users)
      }

    )

  }

  onRoleChange(event: any): void {
    this.isAdmin = event.target.checked;
    this.user.role = this.isAdmin ? 'admin' : 'user';
  }

}
