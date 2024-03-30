import { Routes } from '@angular/router';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { HomeComponent } from './components/home/home.component';
import ConactUsComponent from './components/conact-us/conact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TodosDetailsComponent } from './components/todos-details/todos-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  {
    path: 'contact-us',
    component: ConactUsComponent,
    title: 'Contact Us',
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    title: 'About Us',
  },
  { path: 'todo', component: TodosListComponent, title: 'ToDo' },
  {
    path: 'todo/:id',
    component: TodosDetailsComponent,
    title: 'ToDo Details',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found',
  },
];
