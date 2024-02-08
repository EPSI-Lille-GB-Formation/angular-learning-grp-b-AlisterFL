import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesUrl: string = 'api/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  getCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`${this.categoriesUrl}/${categoryId}`);
  }

  // Obtenir l'ID le plus élevé des catégories existantes
  private getHighestCategoryId(): Observable<number> {
    return this.getCategories().pipe(
      map((categories) => {
        const highestId = Math.max(
          ...categories.map((category) => category.id),
          0
        );
        return highestId;
      })
    );
  }

  // Ajouter une nouvelle catégorie avec un ID unique
  addCategory(category: Category): Observable<Category> {
    return this.getHighestCategoryId().pipe(
      map((highestId) => {
        const categoryWithUniqueId = { ...category, id: highestId + 1 }; // Ajout d'un ID unique
        return categoryWithUniqueId;
      }),
      tap((categoryWithUniqueId) => {
        this.http
          .post<Category>(this.categoriesUrl, categoryWithUniqueId)
          .subscribe(
            (newCategory) => {
              console.log('Catégorie ajoutée avec succès:', newCategory);
            },
            (error) => {
              console.error("Erreur lors de l'ajout de la catégorie:", error);
            }
          );
      }),
      catchError((error) => {
        console.log(error);
        return of();
      })
    );
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(
      `${this.categoriesUrl}/${category.id}`,
      category
    );
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.categoriesUrl}/${categoryId}`);
  }
}
