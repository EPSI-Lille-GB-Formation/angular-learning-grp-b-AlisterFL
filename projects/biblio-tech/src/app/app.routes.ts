import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login.component'
import { BookList_Component } from './components/book/book-list.component';
import { SignUpComponent } from './components/auth/signup.component';
import { BookById_Component } from './components/book/bookById.component';

export const routes: Routes = [
    {path: '', component: BookList_Component},
    {path: 'signup', component:SignUpComponent},
    {path: 'login', component:LoginComponent},
    {path: 'books/:slug/:id', component:BookById_Component },
];
