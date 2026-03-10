import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LivroModel } from '../models/livro';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private http = inject(HttpClient);
  private api = environment.apiUrl;

  obterTodosOsLivros(): Observable<LivroModel[]> {
    if (!this.api) {
      return of([]);
    }

    return this.http.get<LivroModel[]>(this.api);
  }

  obterLivroPorId(id: number | string): Observable<LivroModel> {
    if (!this.api) {
      return of({} as LivroModel);
    }

    return this.http.get<LivroModel>(`${this.api}/${id}`);
  }

  criar(livro: LivroModel): Observable<LivroModel> {
    if (!this.api) {
      return of(livro);
    }

    return this.http.post<LivroModel>(this.api, livro);
  }

  alterar(id: number | string, livro: LivroModel): Observable<LivroModel> {
    if (!this.api) {
      return of(livro);
    }

    return this.http.put<LivroModel>(`${this.api}/${id}`, livro);
  }

  deletar(id: number | string): Observable<void> {
    if (!this.api) {
      return of(void 0);
    }

    return this.http.delete<void>(`${this.api}/${id}`);
  }
}