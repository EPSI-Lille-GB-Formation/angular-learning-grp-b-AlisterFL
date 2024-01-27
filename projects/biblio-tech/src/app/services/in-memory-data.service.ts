import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api'
import { BOOKS } from '../mocks/mock-book';
import { USERS } from '../mocks/mock-user';
import { CATEGORIES } from '../mocks/mock-category';
import { BELONGS } from '../mocks/mock-belong';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const books = BOOKS
    const users = USERS
    const categories = CATEGORIES
    const belongs = BELONGS
    return {books, users, categories, belongs}
  }
}
