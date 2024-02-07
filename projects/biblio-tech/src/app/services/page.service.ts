import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private pagesUrl: string = 'api/pages';

  constructor(private http: HttpClient) {}

  getPages(): Observable<Page[]> {
    return this.http.get<Page[]>(this.pagesUrl);
  }

  getPageById(pageId: number): Observable<Page> {
    return this.http.get<Page>(`${this.pagesUrl}/${pageId}`);
  }

  addPage(page: Page): Observable<Page> {
    return this.getHighestPageId().pipe(
      switchMap(highestId => {
        page.id = highestId + 1; // Incrémenter l'ID
        return this.http.post<Page>(this.pagesUrl, page);
      })
    );
  }

  updatePage(page: Page): Observable<Page> {
    return this.http.put<Page>(`${this.pagesUrl}/${page.id}`, page);
  }

  deletePage(pageId: number): Observable<void> {
    return this.http.delete<void>(`${this.pagesUrl}/${pageId}`);
  }

  getPagesByBookId(bookId: number): Observable<Page[]> {
    const url = `${this.pagesUrl}?bookId=${bookId}`;
    return this.http.get<Page[]>(url);
  }

  private getHighestPageId(): Observable<number> {
    return this.getPages().pipe(
      map(pages => {
        const highestId = Math.max(...pages.map(page => page.id), 0);
        return highestId;
      })
    );
  }
}
