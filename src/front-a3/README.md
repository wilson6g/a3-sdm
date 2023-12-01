<h1 align="center">
     🏪 <a href="#" alt="site do ecoleta"> Dominus Pro </a>
</h1>

<h3 align="center">
   🏪 Um sistema para captação de dados de venda de uma rede de lojas.
</h3>

<h4 align="center">
	🚧   Concluído ✔️ 🚧
</h4>

# Tabela de conteúdos

<!--ts-->

- [Sobre o projeto](#-sobre-o-projeto)
- [Regras de negócio](#-regras-de-negocio)
- [Funcionalidades](#-funcionalidades)
- [Como executar o projeto](#-como-executar-o-projeto)
  - [Pré-requisitos](#pré-requisitos)
  - [Rodando o Backend (servidor)](#user-content--rodando-o-backend-servidor)
  - [Rodando a aplicação web (Frontend)](#user-content--rodando-a-aplicação-web-frontend)
- [Tecnologias](#-tecnologias)
_ [Website](#user-content-website--react----typescript)
_ [Server](#user-content-server--nodejs----typescript)
<!--te-->

## 💻 Sobre o projeto

🏫 O trabalho proposto para A3, foi a criação de uma aplicação que simule a captação de dados de venda de uma rede de lojas. Como resolução para esse desafio, foi desenvolvido uma plataforma WEB com as tecnologias **React.js** e **Node.js**.

Projeto desenvolvido durante a **UC SISTEMAS DISTRIBUIDOS E MOBILE** oferecido pela [UNIFACS](https://www.unifacs.br/).

---

## 🖥️ Regras de negócio

#### 🖥️ A aplicação deve redirecionar o usuário para uma calculadora de acordo com sua escolaridade;

#### 🖥️ A aplicação deve retornar uma mensagem para cada erro no sistema;

#### 🧍 O usuário não pode cadastrar o mesmo e-mail mais de um vez;

#### 🧍 O usuário deve ter um e-mail válido;

#### 🧍 O usuário deve ter uma senha com mais de 6 caracteres e menos de 13 caracteres;

#### 🧍 Todos os campos do registro e login do usuário deve fazer a verificação de tipo, se o campo é nulo e/ou se é obrigatório;

#### 🖩 A calculadora só deve mostrar determinadas operações matemáticas, de acordo com seu nível de escolaridade;

#### 🖩 A calculadora só deve aceitar caracteres numerais [0 a 9] e sinais aritimeticos [+ - * / . % √];

#### 🖩 A calculadora não deve fazer operações matemáticas, caso envie o campo nulo;

#### 🖩 A calculadora deve retornar "NaN", "0" ou uma mensagem de erro caso seja enviado só com a operação matemática e sem nenhum número;

---

## ⚙️ Funcionalidades

- [x] Gerenciar cliente:

  - [x] CRUD cliente;

- [x] Gerenciar venda:

  - [x] CRUD estoque;
  - [x] Receber pedido de compra;

- [x] Geração de relatórios estatísticos:
  - [x] Geração de relatório de produtos mais vendido;
  - [x] Geração de relatório de produto por cliente;
  - [x] Geração de relatório de consumo médio do cliente;
  - [x] Geração de relatório de produto com baixo estoque;

## 🚀 Como executar o projeto

Este projeto é divido em duas partes:

1. Backend
2. Frontend

💡 O Frontend precisa que o Backend esteja sendo executado para funcionar.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). [Mysql](https://dev.mysql.com/downloads/installer/), Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/) e uma ferramenta para banco de dados como [DBeaver](https://dbeaver.io/download/)

#### 🎲 Rodando o Backend (servidor)

```bash
# Versão v16.15.0 do Node
# Verifique que você já possui os pré-requisitos instalados
# Clone este repositório
$ git clone link-repositorio-aqui
# Acesse a pasta do projeto no terminal/cmd
$ cd repositorio
# Instale as dependências
$ npm install ou yarn install
# Crie um arquivo .env na raiz do projeto
$ touch .env ou crie um arquivo pela IDE
# Vá para o arquivo .env.example e copie os dados do .env.example e cole no .env
# Altere os dados do .env e mude para os dados do seu ambiente
# APP_PORT= insira a porta que deseja rodar o servidor, geralmente usa-se a "3000".
# DATABASE_HOST= aqui geralmente usa-se "localhost".
# DATABASE_NAME= insira o nome do banco de dados que você quer criar, ele vai gerar o banco
pelo nome dessa variável.
# DATABASE_USERNAME= insira o usuário do banco de dados, geralmente é "root".
# DATABASE_PASSWORD= insira a senha do seu banco de dados.
# DATABASE_PORT= insira a porta, geralmente é: "3306".
# DATABASE_SYNCHRONIZE= insira true na primeira vez que for rodar o projeto para criar o banco e a tabela e depois coloque como false.

# Execute a aplicação em modo de desenvolvimento
$ npm run dev ou yarn dev
# O servidor iniciará na porta:4000 por padrão - acesse http://localhost:4000
# Observações:
# Essa porta é referente ao APP_PORT presente no .env, se você alterar, terá que mudar a porta "3333" para a que você definiu.
```

#### 🧭 Rodando a aplicação web (Frontend)

```bash
# Clone este repositório
$ git clone git@github.com:tgmarinho/README-ecoleta.git
# Acesse a pasta do projeto no terminal/cmd
$ cd iblue-school-front
# Instale as dependências
$ npm install ou yarn install
# Crie um arquivo .env na raiz do projeto
$ touch .env ou crie um arquivo pela IDE
# Vá para o arquivo .env.example
$ copie os dados do .env.example e cole no .env
# Altere os dados do .env
$ Altere a porta ex: http://localhost:SUAPORTADOBACK
# Execute a aplicação em modo de desenvolvimento
$ npm run serve ou yarn serve
# O servidor iniciará na porta:8080 por padrão - acesse http://localhost:8080
# Observação: Essa aplicação só vai funcionar perfeitamente com o backend em node rodando em paralelo, ou seja, ao mesmo tempo.
```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Website** ([React.js](https://pt-br.react.dev/blog/2023/03/16/introducing-react-dev))

- **[vite](https://vitejs.dev/guide/)**
- **[axios](https://github.com/axios/axios)**
- **[react-toastify](https://www.npmjs.com/package/react-toastify)**
- **[react-bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction)**
- **[prop-types](https://www.npmjs.com/package/prop-types)**
- **[@mui/material](https://mui.com/material-ui/getting-started/installation/)**
- **[@mui/icons-material](https://mui.com/material-ui/material-icons/)**
- **[react-router-dom](https://v5.reactrouter.com/web/guides/quick-start)**

#### **Server** ([NodeJS](https://nodejs.orgen/))

- **[Express](https://expressjs.com/)**
- **[CORS](https://www.npmjs.com/package/cors)**
- **[mysql2](https://www.npmjs.com/package/mysql2)**
- **[nodemon](https://www.npmjs.com/package/nodemon)**
- **[dotENV](https://github.com/motdotla/dotenv)**
- **[excel4node](https://www.npmjs.com/package/excel4node)**
- **[momentjs](https://momentjs.com/)**

#### **Utilitários**

- Editor: **[Visual Studio Code](https://code.visualstudio.com/)**
- Ferramenta de banco de dados: **[DBeaver](https://dbeaver.io/)**
- Teste de API: **[Insomnia](https://insomnia.rest/)**

## 🦸 Autor

<a href="https://blog.rocketseat.com.br/author/thiago/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/87429689?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Wilson Pinheiro</b></sub></a>
 <br />

[![Linkedin Badge](https://img.shields.io/twitter/url?label=LINKEDIN&logo=linkedin&style=social&url=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fwilsonpinh%2F)](https://www.linkedin.com/in/wilsonpinh/)

Feito por Wilson Pinheiro, com o objetivo de realizar o desafio final para vaga de estágio. 😀 [Entre em contato!](https://www.linkedin.com/in/wilsonpinh/)
