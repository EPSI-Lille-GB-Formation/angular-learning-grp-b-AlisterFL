import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login.component'
import { BookList_Component } from './components/book/book-list.component';
import { SignUpComponent } from './components/auth/signup.component';
import { BookById_Component } from './components/book/read-book/bookById.component';
import { NewBookComponent } from './components/book/new-book/new-book.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ModerationUsersComponent } from './components/moderation/moderation-users.component';
import { CategoryModerationComponent } from './components/moderation/moderation-categories.component';
import { AdminGuard } from './components/guard/admin.guard';
import { AuthGuard } from './components/guard/auth.guard';

export const routes: Routes = [
    {path: '', component: BookList_Component},
    {path: 'signup', component:SignUpComponent},
    {path: 'login', component:LoginComponent},
    { path: 'books/:slug/:id', component: BookById_Component, canActivate: [AuthGuard] }, 
    { path: 'newbook', component: NewBookComponent, canActivate: [AuthGuard] },
    {path: 'profile/:id', component:ProfileComponent},
    { path: 'moderation/users', component: ModerationUsersComponent, canActivate: [AdminGuard] },
    { path: 'moderation/categories', component: CategoryModerationComponent, canActivate: [AdminGuard] },
];
