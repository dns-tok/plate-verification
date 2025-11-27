# 🚗 Placa Verificada

Uma aplicação React moderna para verificação de placas veiculares, oferecendo relatórios completos sobre histórico, restrições e dados dos veículos.

## 🚀 Tecnologias Utilizadas

- **React** 19.1.1 - Framework frontend
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first
- **React Router** - Roteamento SPA
- **Axios** - Cliente HTTP
- **Chart.js** - Gráficos e visualizações
- **React Hook Form** + **Zod** - Gerenciamento de formulários
- **jsPDF** - Geração de relatórios em PDF

## ⚡ Funcionalidades

- 🔐 Sistema completo de autenticação
- 📊 Dashboard com histórico de consultas
- 💳 Sistema de planos e pagamentos
- 📄 Geração de relatórios detalhados em PDF
- 📱 Interface totalmente responsiva
- 🛒 Carrinho de compras integrado
- 💰 Sistema de carteira virtual

## 🛠 Configuração do Ambiente

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=https://sua-api.com
```

### Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📦 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório GitHub no [Vercel](https://vercel.com)
2. Configure a variável `VITE_API_BASE_URL` no dashboard
3. Deploy automático a cada push

### Outros Serviços

- **Netlify**: Deploy automático via Git
- **GitHub Pages**: Para projetos estáticos
- **Railway/Render**: Para projetos full-stack

## 🏗 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── auth/           # Componentes de autenticação
│   ├── common/         # Componentes comuns
│   ├── dashboard/      # Componentes do dashboard
│   ├── layout/         # Componentes de layout
│   └── public/         # Componentes públicos
├── context/            # Contextos React
├── hooks/              # Custom hooks
├── pages/              # Páginas da aplicação
├── routing/            # Configurações de rota
├── services/           # Serviços de API
└── utils/              # Utilitários
```

## 📋 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview da build
- `npm run lint` - Executa ESLint

## 🔗 Links

- **Repositório**: https://github.com/alexsouzabh/placaverificada_page
- **Deploy**: [Link será atualizado após deploy no Vercel]

## 📄 Licença

Este projeto é privado e proprietário.

---

Desenvolvido com ❤️ para verificação segura de veículos.