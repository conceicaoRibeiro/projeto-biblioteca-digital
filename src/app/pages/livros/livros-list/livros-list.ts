import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LivroService } from '../../../services/livro.service';
import { LivroModel } from '../../../models/livro';

@Component({
  selector: 'app-livros-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './livros-list.html',
  styleUrls: ['./livros-list.css'],
})
export class LivrosList implements OnInit {
  private livroService = inject(LivroService);

  livros = signal<LivroModel[]>([]);
  todosOsLivros = signal<LivroModel[]>([]);

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros(): void {
    this.livroService.obterTodosOsLivros().subscribe({
      next: (lista) => {
        this.todosOsLivros.set(lista);
        this.livros.set(lista);
      },
       error: (erro) => {
       console.error('Erro ao carregar livros:', erro);
       this.livros.set([]);
  }
    
    });
  }

  buscar(event: Event): void {
    const termo = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    if (!termo) {
      this.livros.set(this.todosOsLivros());
      return;
    }

    const filtrados = this.todosOsLivros().filter((livro) =>
      livro.titulo.toLowerCase().includes(termo)
    );

    this.livros.set(filtrados);
  }

  excluir(id: number | string): void {
    if (!confirm('Excluir este livro?')) return;

    this.livroService.deletar(id).subscribe({
      next: () => this.carregarLivros(),
      error: (erro) => console.error('Erro ao excluir livro:', erro)
    });
  }
}