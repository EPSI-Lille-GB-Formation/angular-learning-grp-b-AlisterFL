import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, map, of} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'api/users';
  private authToken: string | null = null;

  constructor(private http: HttpClient) {
    // Récupérer le token du local storage lors de l'initialisation du service
    this.authToken = localStorage.getItem('authToken');
  }


  // méthode pour récupérer la liste des users
  getUsers(): Observable<User[]> {
    const users = this.http.get<User[]>(this.apiUrl);
    return users;
  }

  isAuthenticated(): boolean {
    // Vérifie si l'authToken est présent dans le localStorage
    return localStorage.getItem('authToken') !== null;
  }



  // Vérification du user dans la base de données (login) avec hashage du mot de passe
  authenticateUser(mail: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((users: User[]) => {
        const user = users.find(u => u.mail === mail);

        if (user) {
          const isPasswordValid = bcrypt.compareSync(password, user.password);

          if (isPasswordValid) {
            // Simulation d'un token d'authentification
            this.authToken = uuidv4();
            localStorage.setItem('authToken', this.authToken);
            localStorage.setItem('userFirstName', user.firstname);
            localStorage.setItem('userId', user.id);

            return user;
          }
        }

        return null;  // Renvoie null si l'utilisateur n'est pas trouvé ou si le mot de passe n'est pas valide
      })
    );
  }

  // AJout d'un nouveau user (signup)
  addUser(user: User): Observable<User> {
    const hashedPassword = bcrypt.hashSync(user.password, 10); // Utilisation de bcryptjs pour le hashage
    const userWithHashedPassword = { ...user, id: uuidv4(), password: hashedPassword };
    return this.http.post<User>(this.apiUrl, userWithHashedPassword)
      .pipe(
        tap((user: User) => {
          console.log('Utilisateur ajouté avec succès:', user);
        })
      );
  }

  deleteUser(userId: string): Observable<void> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        throw new Error('Error deleting user: ' + error);
      })
    );
  }

  updateUser(userId: string, updatedUser: User): Observable<User> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put<User>(url, updatedUser).pipe(
      catchError((error) => {
        throw new Error('Error updating user: ' + error);
      })
    );
  }

  getUserByID(userId: string): Observable<User> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<User>(url);
  }

  isAdmin(): Observable<boolean> {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        // Si l'ID utilisateur n'est pas disponible dans le localStorage
        console.error('L\'ID utilisateur n\'est pas disponible dans le localStorage.');
        return of(false);
    } else {
        return this.getUserByID(userId).pipe(
            map((user: User) => {
                const isAdmin = user.role === 'admin';
                if (isAdmin) {
                }
                return isAdmin;
            }),
            catchError((error) => {
                console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
                return of(false);
            })
        );
    }
  }

}
