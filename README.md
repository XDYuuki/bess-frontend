# 🔋 ReliaBESS - Battery Energy Storage System

<div align="center">
  <img src="public/placeholder-logo.svg" alt="ReliaBESS Logo" width="200" height="200">
  
  **Sistema Avançado de Gerenciamento e Análise de Confiabilidade para Bancos de Baterias**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
</div>

## 📋 Sobre o Projeto

O **ReliaBESS** é uma plataforma avançada de gerenciamento e análise de confiabilidade para sistemas de armazenamento de energia em baterias (Battery Energy Storage Systems - BESS). A plataforma oferece ferramentas especializadas para dimensionamento, análise de vida útil e monitoramento contínuo de bancos de baterias, com foco em maximizar a confiabilidade e eficiência operacional.

### 🎯 Principais Funcionalidades

- **🔧 Dimensionamento de Baterias**: Cálculo preciso da quantidade necessária de baterias baseado em perfis de carga e tensão
- **⏱️ Análise de Vida Útil**: Avaliação de degradação, corrosão e envelhecimento das baterias
- **📊 Monitoramento Contínuo**: Acompanhamento em tempo real do desempenho e estado das baterias
- **📈 Análise de Confiabilidade**: Métricas avançadas para otimização da confiabilidade do sistema
- **🔍 Ferramentas de Análise**: Suíte completa de ferramentas para análise técnica e otimização

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 15.2.4** - Framework React com App Router
- **TypeScript** - Tipagem estática para maior confiabilidade
- **Tailwind CSS** - Framework CSS utilitário
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Zustand** - Gerenciamento de estado
- **Lucide React** - Ícones modernos

### Backend & Infraestrutura
- **Node.js 22** - Runtime JavaScript
- **Docker** - Containerização
- **Yarn** - Gerenciador de pacotes

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- Yarn ou npm
- Docker (opcional)

### Instalação Local

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/ReliaBESS.git
   cd ReliaBESS/frontendBess
   ```

2. **Instale as dependências**
   ```bash
   yarn install
   # ou
   npm install
   ```

3. **Execute o projeto em modo de desenvolvimento**
   ```bash
   yarn dev
   # ou
   npm run dev
   ```

4. **Acesse a aplicação**
   ```
   http://localhost:3000
   ```

### Instalação com Docker

1. **Build da imagem**
   ```bash
   docker build -t reliabess .
   ```

2. **Execute o container**
   ```bash
   docker run -p 3000:3000 reliabess
   ```

## 📁 Estrutura do Projeto

```
frontendBess/
├── app/                          # App Router do Next.js
│   ├── (auth)/                   # Páginas de autenticação
│   ├── dashboard/                # Dashboard principal
│   │   ├── baterySizing/        # Dimensionamento de baterias
│   │   ├── tools/               # Ferramentas de análise
│   │   └── layout.tsx           # Layout do dashboard
│   └── globals.css              # Estilos globais
├── components/                   # Componentes reutilizáveis
│   ├── auth/                    # Componentes de autenticação
│   ├── dashboard/               # Componentes do dashboard
│   │   ├── forms/              # Formulários especializados
│   │   ├── header.tsx          # Cabeçalho
│   │   └── sidebar.tsx         # Barra lateral
│   └── ui/                     # Componentes de interface
├── lib/                        # Utilitários e configurações
│   ├── contexts/               # Contextos React
│   ├── schemas/                # Schemas de validação Zod
│   └── types/                  # Definições de tipos TypeScript
├── hooks/                      # Hooks personalizados
└── styles/                     # Estilos CSS
```

## 🔧 Funcionalidades Principais

### 1. Dimensionamento de Baterias
- Upload de perfis de potência e tensão (.mat, .xls, .xlsx)
- Configuração de parâmetros elétricos (resistência interna, Cn, taxa Cr)
- Seleção de tipo de bateria e química
- Cálculo automático de quantidade necessária

### 2. Análise de Vida Útil
- Avaliação de degradação por corrosão
- Análise de envelhecimento térmico
- Cálculo de ciclos de vida
- Previsão de falhas

### 3. Monitoramento e Dashboard
- Interface responsiva para desktop e mobile
- Visualização em tempo real de métricas
- Relatórios de confiabilidade
- Histórico de análises

## 🎨 Interface do Usuário

### Design Responsivo
- **Desktop**: Sidebar fixa com navegação completa
- **Mobile**: Sidebar retrátil com botão hambúrguer
- **Tema**: Suporte a modo claro e escuro

### Componentes Principais
- Formulários com validação em tempo real
- Upload de arquivos com preview
- Gráficos e visualizações interativas
- Tabelas de dados com paginação

## 🔐 Autenticação

O sistema inclui um sistema de autenticação mock com:
- Login com email e senha
- Login com Google (simulado)
- Registro de usuários
- Middleware de proteção de rotas

## 📊 Tipos de Análise Suportados

### Baterias Suportadas
- **Li-ion** (Íon de Lítio)
- **LiFePO4** (Fosfato de Ferro e Lítio)
- **Lead-Acid** (Chumbo-Ácido)
- **NiMH** (Hidreto de Níquel-Metal)
- **NiCd** (Níquel-Cádmio)

### Químicas Suportadas
- **Lithium** - Tecnologias baseadas em lítio
- **Lead-Acid** - Tecnologias de chumbo-ácido
- **Nickel** - Tecnologias baseadas em níquel

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
yarn dev          # Inicia servidor de desenvolvimento
yarn build        # Build para produção
yarn start        # Inicia servidor de produção
yarn lint         # Executa linter
yarn type-check   # Verifica tipos TypeScript

# Docker
docker build -t reliabess .     # Build da imagem
docker run -p 3000:3000 reliabess  # Executa container
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Desenvolvimento**: Equipe GESEP-MG
- **Instituição**: CEFET-MG
- **Projeto**: ReliaBESS - Sistema de Confiabilidade para BESS

## 📞 Contato

Para dúvidas ou sugestões sobre o projeto, entre em contato através dos canais oficiais do CEFET-MG.

---

<div align="center">
  <p>Desenvolvido com ❤️ pela equipe GESEP-MG</p>
  <p>CEFET-MG - Centro Federal de Educação Tecnológica de Minas Gerais</p>
</div>
