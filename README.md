# 🦝 Guaxinema - App de Avaliação de Filmes

[![Status do Projeto](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)]()
[![IFSC](https://img.shields.io/badge/IFSC-Chapec%C3%B3-blue)]()
[![Expo](https://img.shields.io/badge/Expo-51.x-black)]()
[![React Native](https://img.shields.io/badge/React_Native-0.74-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

---

## 📋 Sobre o Projeto

O **Guaxinema** é um aplicativo mobile desenvolvido em **React Native** com **Expo** para avaliação de filmes, inspirado no estilo do **Rotten Tomatoes** e do **Letterboxd**. O nome é uma brincadeira com a palavra "guaxinim" (raccoon) + "cinema" 🦝🎬.

O app permite que os usuários:
- Pesquisem filmes e vejam informações detalhadas.
- Avaliem filmes com notas e críticas.
- Criem listas personalizadas (assistidos, favoritos, quero assistir).
- Visualizem estatísticas e recomendações.

O projeto foi desenvolvido como parte da disciplina de **Desenvolvimento de Aplicações Web** no **IFSC - Câmpus Chapecó**, aplicando conceitos de **React Native**, **Expo**, **Navegação**, **Consumo de APIs** e **Armazenamento Local**.

---

## 🚀 Funcionalidades Principais

### 🎬 Catálogo de Filmes
- Listagem de filmes em alta, lançamentos e por gênero.
- Busca por nome ou ator.
- Página de detalhes com sinopse, elenco, duração e ano.

### ⭐ Avaliações
- Sistema de notas (0 a 5 estrelas).
- Críticas escritas pelo usuário.
- Média de avaliações da comunidade.

### 📋 Listas Personalizadas
- Filmes assistidos.
- Favoritos.
- Quero assistir (watchlist).
- Criação de listas customizadas (ex: "Melhores de 2024").

### 👤 Perfil do Usuário
- Cadastro e login (com autenticação).
- Histórico de avaliações.
- Estatísticas: total de filmes avaliados, média geral, etc.

### 🖥️ Administração (opcional)
- Painel administrativo para gerenciar filmes, categorias e usuários.

---

## 🛠️ Tecnologias Utilizadas

### Front-end (Mobile)
- **React Native 0.74+**
- **Expo 51.x**
- **Expo Router** (navegação baseada em arquivos)
- **React Native Paper** / **NativeBase** (componentes UI)
- **Axios** (consumo de API)

### Back-end / API (dados dos filmes)
- **API externa:** [The Movie Database (TMDB)](https://www.themoviedb.org/) ou similar.
- **Armazenamento local:** AsyncStorage / SQLite (para histórico offline).
- **Backend próprio (opcional):** Laravel API para gerenciamento de usuários e avaliações.

### Ferramentas
- **Expo Go** (teste rápido no celular)
- **VS Code** (editor)
- **Git & GitHub** (controle de versão)
- **Snack Expo** (ambiente de desenvolvimento online)

---

## 📥 Como Executar o Projeto Localmente

### Pré-requisitos

| Ferramenta | Finalidade |
| :--- | :--- |
| **Node.js** | Ambiente de execução JavaScript |
| **Expo CLI** | `npm install -g expo-cli` |
| **Expo Go** | Aplicativo no celular para testar |
| **VS Code** | Editor de código |

### Passo a Passo

#### 1️⃣ Clone o repositório
```bash
git clone https://github.com/Ravemuon/guaxinema-app.git
cd guaxinema-app
