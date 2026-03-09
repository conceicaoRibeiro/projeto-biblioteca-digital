import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { LivroService } from '../../../services/livro.service';
import { LivroModel } from '../../../models/livro';

@Component({
  selector: 'app-livro-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './livro-form.html',
  styleUrls: ['./livro-form.css']
})
export class LivroForm implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private livroService = inject(LivroService);

  editando = false;
  id: string | number | null = null;

  mostrarModalErro = false;
  mensagensErro: string[] = [];

  anoAtual = new Date().getFullYear();

  form = this.fb.nonNullable.group({
    titulo: ['', Validators.required],
    autor: ['', Validators.required],
    genero: ['', Validators.required],
    ano: [
      0,
      [
        Validators.required,
        Validators.min(1901),
        Validators.max(this.anoAtual)
      ]
    ]
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.editando = true;

      this.livroService.obterLivroPorId(this.id).subscribe(livro => {
        this.form.patchValue({
          titulo: livro.titulo,
          autor: livro.autor,
          genero: livro.genero,
          ano: Number(livro.ano)
        });
      });
    }
  }

  private abrirModalErros(): void {
    this.mensagensErro = [];

    const titulo = this.form.get('titulo');
    const autor = this.form.get('autor');
    const genero = this.form.get('genero');
    const ano = this.form.get('ano');

    if (titulo?.hasError('required')) {
      this.mensagensErro.push('Título é obrigatório.');
    }

    if (autor?.hasError('required')) {
      this.mensagensErro.push('Autor é obrigatório.');
    }

    if (genero?.hasError('required')) {
      this.mensagensErro.push('Gênero é obrigatório.');
    }

    if (ano?.hasError('required')) {
      this.mensagensErro.push('Ano é obrigatório.');
    }

    if (ano?.hasError('min')) {
      this.mensagensErro.push('Ano deve ser maior que 1900.');
    }

    if (ano?.hasError('max')) {
      this.mensagensErro.push('Ano não pode ser maior que o ano atual.');
    }

    this.mostrarModalErro = true;
  }

  fecharModalErro(): void {
    this.mostrarModalErro = false;
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.abrirModalErros();
      return;
    }

    const livro: LivroModel = {
      id: this.editando ? this.id ?? undefined : undefined,
      titulo: this.form.value.titulo ?? '',
      autor: this.form.value.autor ?? '',
      genero: this.form.value.genero ?? '',
      ano: this.form.value.ano ?? 0
    };

    if (this.editando && this.id) {
      this.livroService.alterar(this.id, livro).subscribe(() => {
        this.router.navigate(['/livros']);
      });
    } else {
      this.livroService.criar(livro).subscribe(() => {
        this.router.navigate(['/livros']);
      });
    }
  }
}