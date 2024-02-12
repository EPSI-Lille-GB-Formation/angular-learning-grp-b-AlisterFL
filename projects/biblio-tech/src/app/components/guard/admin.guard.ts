// admin.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.userService.getUserByID(userId).subscribe(
          (user) => {
            if (user && user.role === 'admin') {
              resolve(true); // Autoriser l'accès à la route
            } else {
              this.router.navigate(['/']);
              resolve(false);
            }
          },
          (error) => {
            console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
            this.router.navigate(['/']);
            resolve(false);
          }
        );
      } else {
        console.error('User ID not found in localStorage.');
        this.router.navigate(['/']);
        resolve(false);
      }
    });
  }
}
