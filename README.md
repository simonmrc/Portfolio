# Portfolio — Simon MARC

Portfolio réalisé avec **React + Vite**.  
Objectif : une vitrine claire, responsive, avec une **galerie de projets hybride** (GitHub + projets manuels), une page **Contact** (Formspree) et un **QR code vCard**.

## Aperçu

- **Home**: présentation + CTA
- **Projets**: galerie filtrable (recherche, filtre, tri) + données fusionnées
- **À propos**: parcours & compétences
- **Contact**: formulaire Formspree + QR vCard
- **404**: page personnalisée

## Fonctionnalités clés

- **Galerie hybride (GitHub + JSON)**:
  - récupération de dépôts publics via GitHub API
  - ajout de projets “manuels” via `src/data/projects.json`
  - **anti-doublon**: si un projet JSON a le même titre qu’un repo GitHub, le JSON est prioritaire
  - **recherche** en temps réel (nom + technos)
  - **filtre** par catégorie + **tri** (récents / alphabétique)
  - états UX: **loading**, **erreur + retry**, **liste vide**
- **Contact**:
  - validation côté client (sans bibliothèque externe)
  - feedback: succès / erreur + retry
  - envoi via **Formspree** (URL stockée dans une variable d’environnement)
- **vCard + QR code**:
  - fichier `public/contact.vcf`
  - QR code affiché dans le **footer** et sur la page **Contact**S
  - bouton de téléchargement de la vCard
- **Navigation**:
  - `react-router-dom` v6
  - scroll en haut à chaque changement de route

## Stack

- **React 19**
- **Vite**
- **react-router-dom v6**
- **framer-motion**
- **Tailwind CSS**
- **qrcode.react**

## Routes

- `/` — Accueil
- `/projects` — Galerie de projets
- `/about` — À propos
- `/contact` — Contact
- `*` — 404

## Démarrer en local

Dans le dossier `portfolio/` :

```bash
npm install
npm run dev
```

Puis ouvre l’URL affichée (souvent `http://localhost:5173`).

## Variables d’environnement

Crée/complète `portfolio/.env` :

```bash
VITE_FORMSPREE_URL=https://formspree.io/f/xxxxxxx
```


## Données projets manuels

Fichier : `portfolio/src/data/projects.json`

Champs utilisés :
- `id`, `title`, `description`
- `techs` (tableau)
- `type` (ex: Stage, Personnel, Professionnel)
- `category` (ex: web, mobile, design, devops, cloud, backend)
- `liveUrl`, `imageUrl` (optionnels)

## vCard

Fichier : `portfolio/public/contact.vcf`

Après déploiement, l’URL est :
- `https://<ton-domaine>/contact.vcf`

Le QR code pointe vers cette URL.

