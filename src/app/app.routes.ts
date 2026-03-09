import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LivroForm } from './pages/livros/livro-form/livro-form';
import { LivrosList } from './pages/livros/livros-list/livros-list';

export const routes: Routes = [
  { path: '', component: Home },
{ path: 'livros', component: LivrosList },
  { path: 'livros/novo', component: LivroForm },
  { path: 'livros/editar/:id', component: LivroForm },
  { path: '**', redirectTo: '' }
];
