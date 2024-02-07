import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, of} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  booksUrl: string = 'api/books'

  constructor(
    private http: HttpClient
  ) { }

  getBookList(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl).pipe(
      tap(bookList => console.log(bookList)),
      catchError(error => {
        console.log(error);
        return of([])
      })
    )
  }

  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.booksUrl}/${bookId}`).pipe(
      catchError(error => {
        console.log(error);
        return of ()
      })
    )
  }

  // ID le plus haut existant dans les livres
  private getHighestBookId(): Observable<number> {
    return this.getBookList().pipe(
      map(books => {
        const highestId = Math.max(...books.map(book => book.id), 0);
        return highestId;
      })
    );
  }

  // Ajout d'un nouveau livre
  addBook(book: Book): Observable<Book> {
    return this.getHighestBookId().pipe(
      map(highestId => {
        const bookWithUniqueId = { ...book, id: highestId + 1 }; // Ajout d'un ID unique
        return bookWithUniqueId;
      }),
      tap(bookWithUniqueId => {
        this.http.post<Book>(this.booksUrl, bookWithUniqueId).subscribe(
          (newBook) => {
            console.log('Livre ajouté avec succès:', newBook);
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du livre:', error);
          }
        );
      }),
      catchError(error => {
        console.log(error);
        return of();
      })
    );
  }

  deleteBook(bookId: number): Observable<void> {
    const url = `${this.booksUrl}/${bookId}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        console.log(`Livre avec ID ${bookId} supprimé avec succès`);
      }),
      catchError(error => {
        console.error(`Erreur lors de la suppression du livre avec ID ${bookId}:`, error);
        return of();
      })
    );
  }

}
