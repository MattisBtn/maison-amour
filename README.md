# Maison Amour - Monorepo

Ce monorepo contient les sites web du groupe Maison Amour :
- Site principal Maison Amour
- Site Banquet & Traiteur

## Structure du projet

```
apps/
  ├── site-maison-amour/     # Site principal du groupe
  └── site-banquet-traiteur/ # Site dédié au service traiteur
```

## Prérequis

- Node.js 18+
- npm 8+
- Un compte Strapi Cloud (cloud.strapi.io)

## Installation

1. Cloner le repository :
```bash
git clone [url-du-repo]
cd maison-amour
```

2. Installer les dépendances :
```bash
npm install
```

3. Copier le fichier d'environnement :
```bash
cp .env.example .env
```

4. Configurer les variables d'environnement dans le fichier `.env`

## Configuration Strapi Cloud

1. Créer un projet sur [Strapi Cloud](https://cloud.strapi.io)
2. Dans les paramètres du projet Strapi Cloud :
   - Noter l'URL de l'API et le token d'API
   - Configurer les variables d'environnement dans Strapi Cloud
   - Créer les types de contenu nécessaires dans l'interface d'administration

3. Mettre à jour le fichier `.env` avec les informations de Strapi Cloud :
```
STRAPI_URL=votre-url-strapi-cloud
```

## Développement

Pour lancer le site Maison Amour en développement :
```bash
npm run dev:maison-amour
```

Pour lancer le site Banquet & Traiteur en développement :
```bash
npm run dev:banquet
```

## Build

Pour construire le site Maison Amour :
```bash
npm run build:maison-amour
```

Pour construire le site Banquet & Traiteur :
```bash
npm run build:banquet
```

## Gestion du contenu

Tout le contenu est géré via l'interface d'administration Strapi Cloud accessible à l'adresse :
```
https://cloud.strapi.io/projects/votre-projet
``` 