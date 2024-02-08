import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


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
        <li><a *ngIf="!isAuthenticated()" (click)="navigateToSignup()">S'inscrire</a></li>
        <li><a *ngIf="!isAuthenticated()" (click)="navigateToLogin()">Se connecter</a></li>
        <li *ngIf="isAuthenticated()">
          <details role="list" dir="rtl">
            <summary class="contrast" aria-haspopup="listbox" role="link">{{ userFirstName ? userFirstName : 'Profil' }}</summary>
            <ul role="listbox">
              <li><a (click)="navigateToProfile()">Profil</a></li>
              <li><a (click)="navigateToModeration()">Modération</a></li>
              <li><a (click)="logout()">Se déconnecter</a></li>
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

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.userFirstName = localStorage.getItem('userFirstName');
    console.log(this.userFirstName)
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
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
  }



  
}