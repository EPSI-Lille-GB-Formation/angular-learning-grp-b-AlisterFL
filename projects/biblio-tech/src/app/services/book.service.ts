import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, of} from 'rxjs';

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

}
