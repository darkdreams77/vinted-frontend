# Vinted Frontend

Ce projet est un exercice frontend inspiré de Vinted, construit avec React, TypeScript et Vite.

## Description

L'application consomme une API pour afficher des annonces de produits et proposer une navigation entre :

- une page d'accueil qui liste les offres
- une page de détail d'annonce (`/offer/:id`)

La structure utilise un layout commun, un `Hero`, des `Card` pour les offres, et un système de chargement avec des squelettes.

## Fonctionnalités

- Affichage des offres sur la page d'accueil
- Navigation vers les détails d'une offre via React Router
- Requêtes HTTP avec `axios`
- Gestion du chargement via un hook personnalisé `useAsyncEffect`
- Mise en forme avec Tailwind CSS

## Structure du projet

- `src/pages/Home.tsx` : page principale avec liste d'annonces
- `src/pages/Offer.tsx` : page de détail d'une offre
- `src/components/` : composants réutilisables (`Card`, `Hero`, `Layout`, `Header`, etc.)
- `src/services/` : accès aux API (`getOffers`, `getOffer`)
- `src/types/` : types TypeScript pour les données
- `src/helpers/` : utilitaires comme `formatCurrency`

## Installation

```bash
pnpm install
```

## Commandes utiles

```bash
pnpm dev       # démarre le serveur de développement
pnpm build     # compile et build l'application
pnpm preview   # prévisualise le build de production
pnpm lint      # lance ESLint sur le projet
```

## Dépendances principales

- `react` / `react-dom`
- `react-router-dom`
- `axios`
- `tailwindcss`
- `@tailwindcss/vite`
- `react-icons`
- `clsx`

## Notes

- Le projet est configuré avec TypeScript et Vite.
- La page d'accueil utilise un hook personnalisé pour charger les données côté client.
- L'application est prête à être enrichie avec un vrai design Vinted et une gestion complète des filtres / recherches.
