// belong.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Belong } from '../models/belong';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BelongService {
  private belongsUrl: string = 'api/belongs';

  constructor(private http: HttpClient) {}

  // Ajout d'une relation entre un livre et une catégorie
  addBelong(belong: Belong): Observable<Belong> {
    return this.http.post<Belong>(this.belongsUrl, belong).pipe(
      catchError((error) => {
        console.log(error);
        return new Observable<Belong>();
      })
    );
  }

  // Fonction pour récupérer le plus haut ID existant dans la table Belong
  getHighestBelongId(): Observable<number> {
    return this.http.get<number>(`${this.belongsUrl}/highestId`);
  }
  

  // Suppression d'une relation entre un livre et une catégorie
  removeBelong(belongId: number): Observable<void> {
    const url = `${this.belongsUrl}/${belongId}`;
    return this.http.delete<void>(url);
  }

  // Obtention de la liste des relations entre les livres et les catégories
  getBelongs(): Observable<Belong[]> {
    return this.http.get<Belong[]>(this.belongsUrl).pipe(
      catchError((error) => {
        console.log(error);
        return new Observable<Belong[]>();
      })
    );
  }
}
