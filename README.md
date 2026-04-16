# Runnity — Website

Landing page oficial do [Runnity](https://runnity.run), app mobile para descoberta e organização de atividades esportivas ao ar livre em comunidade.

## Stack

- **React 19** + **Vite** + **TypeScript**
- **Tailwind CSS** — estilização sem UI libraries externas
- **React Router DOM** — roteamento client-side
- **react-i18next** — internacionalização (PT / EN)
- **Vercel** — deploy

## Páginas

| Rota | Descrição |
|------|-----------|
| `/` | Landing page principal |
| `/terms` | Termos de Uso |
| `/privacy` | Política de Privacidade |

## Estrutura

```
src/
  assets/              # Ícones e imagens estáticas
  components/
    layout/            # Navbar, Footer
    sections/          # Hero, About, Features, HowItWorks, Download, Faq
    ui/                # Button, LanguageSwitcher
  i18n/
    locales/           # pt.ts, en.ts
  pages/               # HomePage, TermsPage, PrivacyPage
```

## Rodando localmente

```bash
yarn install
yarn dev
```

## Build

```bash
yarn build
```
