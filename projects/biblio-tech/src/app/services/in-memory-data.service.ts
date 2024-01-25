import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api'
import { BOOKS } from '../mocks/mock-book';
import { USERS } from '../mocks/mock-user';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const books = BOOKS
    const users = USERS
    return {books, users}
  }
}
