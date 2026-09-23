# GSB AppliFrais

Projet AP2 BTS SIO SLAM : application web de gestion des frais pour le laboratoire GSB (Galaxy Swiss Bourdin).

L'application permet aux visiteurs médicaux de saisir leurs frais mensuels. Les comptables pourront ensuite consulter, contrôler, valider et mettre en paiement les fiches de frais.

## Stack technique

- Frontend : React avec Vite
- Backend : Node.js avec Express
- Base de données : MongoDB
- Accès à MongoDB : Mongoose
- Conteneurs : Docker et Docker Compose
- Versionnement : Git et GitHub

## Architecture

L'application utilise une architecture à trois tiers :

- React/Vite : interface utilisateur sur le port 5173
- Express : API et logique métier sur le port 3000
- MongoDB : base de données sur le port 27017

## Lancer le projet

### 1. Démarrer MongoDB

Depuis la racine du projet :

```bash
docker compose up -d
```

mongo-express est accessible à l'adresse :

```text
http://localhost:8081
```

### 2. Démarrer le backend

Dans un terminal :

```bash
cd backend
npm install
npm run dev
```

L'API est accessible à l'adresse :

```text
http://localhost:3000/api/v1/health
```

### 3. Démarrer le frontend

Dans un deuxième terminal :

```bash
cd frontend
npm install
npm run dev
```

L'application est accessible à l'adresse :

```text
http://localhost:5173
```

## Vérification

Lorsque le backend et le frontend sont démarrés, la page React doit afficher :

```text
AppliFrais API ok
```

## Sécurité Git

Les fichiers `.env` et les dossiers `node_modules` ne sont pas versionnés. Ils sont ignorés grâce au fichier `.gitignore`.