import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav>
      <ul>
      <li><a class="contrast"[routerLink]="['/']"><strong>Biblio'Tech</strong></a></li>
      </ul>
      <ul>
        <li><button class="contrast" (click)="redirectToNewBook()">Ecrire un livre</button></li>
        <li><a class="contrast" *ngIf="!isAuthenticated()" (click)="navigateToSignup()">S'inscrire</a></li>
        <li><a class="contrast" *ngIf="!isAuthenticated()" (click)="navigateToLogin()">Se connecter</a></li>
        <li *ngIf="isAuthenticated()">
          <details role="list" dir="rtl">
            <summary class="contrast" aria-haspopup="listbox" role="link">{{ userFirstName ? userFirstName : 'Profil' }}</summary>
            <ul role="listbox">
              <li><a class="contrast" (click)="navigateToProfile()">Profil</a></li>
              <li *ngIf="isAdmin"><a class="contrast" (click)="navigateToModeration()">Modération</a></li>
              <li><a class="contrast" (click)="logout()">Se déconnecter</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  `,
  styleUrls: ['./style.css']
})
export class HeaderComponent implements OnInit{

  userFirstName: string | null = '';
  isAdmin: boolean | undefined;

  constructor(private router: Router, private userService: UserService) {}


  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Vérifier si l'utilisateur est authentifié et accède à une page autre que la page de connexion
        if (this.userService.isAuthenticated() && event.url !== '/login') {
          this.checkAdminStatus();
        }

      }
    });

    this.userFirstName = localStorage.getItem('userFirstName');
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.userService.getUserByID(userId).subscribe(
        (user) => {
          console.log('Informations utilisateur récupérées avec succès:', user);
          // Vous pouvez mettre à jour les informations utilisateur dans votre composant si nécessaire
        },
        (error) => {
          console.error('Erreur lors de la récupération des informations utilisateur:', error);
          // En cas d'erreur, supprimer les informations de l'utilisateur du localStorage et rediriger vers la page d'accueil
          localStorage.removeItem('authToken');
          localStorage.removeItem('userId');
          localStorage.removeItem('userFirstName');
          this.router.navigate(['/']);
        }
      );
    }
  }


  redirectToNewBook() {
    this.router.navigate(['/newbook']);
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToModeration() {
    this.router.navigate(['/moderation/users']);
  }

  navigateToProfile() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.router.navigate(['/profile', userId]);
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userFirstName');
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  checkAdminStatus(): void {
    this.userService.isAdmin().subscribe(isAdmin => {
        this.isAdmin = isAdmin;

        console.log(this.isAdmin, "admin testé");
    });
  }
}
