# TODO Frontend - Desafio Angular

Aplicação frontend Angular para consumir a API de tarefas (TO-DO), desenvolvida como parte de um desafio técnico.

---

## 📄 Tecnologias Utilizadas

- Angular 19 (standalone components + functional routing)
- RxJS
- HttpClientModule
- CSS Básico
- Docker (para execução containerizada)

---

## 🔄 Instalação Local

```bash
git clone https://github.com/seu-usuario/todo-frontend.git
cd todo-frontend
npm install
ng serve
```

Acesse: [http://localhost:4200](http://localhost:4200)

---

## 🚀 Execução com Docker

Este projeto já inclui um `Dockerfile` e `nginx.conf` prontos para produção.

```bash
docker build -t todo-frontend .
docker run -p 4200:80 todo-frontend
```

A aplicação estará acessível em:

```
http://localhost:4200
```

O `Dockerfile` realiza o build Angular com `--configuration production` e serve os arquivos finais via NGINX.

---

## ☁️ Publicação Simples na AWS

1. Construa a aplicação com:

```bash
npm run build -- --configuration production
```

2. Crie a imagem Docker (já incluída neste repositório)
3. Suba a imagem para um container registry (ex: Amazon ECR)
4. Configure um ambiente no AWS Elastic Beanstalk ou ECS/Fargate para rodar a imagem
5. O container deve expor a porta 80 para acesso via Load Balancer ou diretamente via DNS

> Alternativamente, você pode publicar os arquivos de `dist/viceri-todo-frontend` em um bucket S3 com hospedagem estática ativada.

---

## 📘 Funcionalidades

- Tela de Cadastro com validação de nome, e-mail e senha
- Tela de Login com autenticação via JWT
- Tela de Listagem de Tarefas pendentes
- Criação de Tarefas (com prioridade)
- Marcar tarefas como concluídas (persistente)
- Roteamento protegido com AuthGuard
- Interceptor para envio automático do token JWT

---

## 📂 Estrutura do Projeto

```
src/app/
├── auth/
│   ├── login/
│   ├── register/
├── task/
│   ├── task-list/
│   ├── task-form/
├── services/
├── models/
├── guards/
├── interceptors/
├── app.routes.ts
```

---

## 🙌 Autor

Thiago Kemp

---
