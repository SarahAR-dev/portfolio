# Sarah Aribi Portfolio — copie locale

Cette archive contient une copie locale du portfolio actuellement visible sur l'adresse de développement fournie, avec sa structure React/Vite et ses composants source récupérables depuis le serveur de développement.

## Installation

```bash
npm install
npm run dev
```

Puis ouvre l'adresse affichée par Vite, généralement `http://localhost:5173`.

## Où ajouter les démos des projets

Le contenu des projets se trouve dans `src/App.tsx`, dans le tableau `projects`. Les liens GitHub et les liens de démo peuvent être ajoutés aux propriétés `url` et `urlLabel`. Les captures peuvent être placées dans `src/assets/` puis importées dans le composant.

Ne partage jamais un fichier `.env`, un token ou une clé API. Cette version a été adaptée pour fonctionner hors de Replit : les dépendances `catalog:`, les plugins Replit et les variables `PORT`/`BASE_PATH` ont été retirés.
