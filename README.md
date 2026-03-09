# Projeto Biblioteca Digital

## Como rodar

1. Instale as dependências:

```bash
npm install
```

2. Em um terminal, suba o JSON Server:

```bash
npx json-server --watch db.json --port 3000
```

3. Em outro terminal, rode a aplicação Angular:

```bash
npm start
```

Se você tiver Angular CLI global instalado, também pode usar:

```bash
ng serve
```

## Funcionalidades

- Home
- Navbar
- Listagem de livros
- Busca por título
- Cadastro de livro
- Edição de livro
- Exclusão de livro
- Validação com modal de erro
