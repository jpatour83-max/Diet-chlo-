# Diét'Chloé — Cabinet Diététique en ligne

Plateforme complète pour **Chloé Constantin, diététicienne libérale** : landing page professionnelle, prise de rendez-vous en ligne (téléphone / visio), CRM patients et tableau de bord marketing (Facebook, Instagram, Google, Retargeting).

---

## Prérequis

| Outil | Version minimale |
|-------|-----------------|
| [Node.js](https://nodejs.org/) | **18** ou supérieure |
| npm | inclus avec Node.js |

> **Windows** : ouvrez PowerShell ou l'invite de commandes *en tant qu'administrateur* si vous rencontrez des erreurs de permissions.

---

## Installation (première fois)

### Étape 1 — Installer les dépendances

```bash
npm install
```

> ⚠️ **Cette étape est indispensable.** Sans elle, la commande `next` n'est pas disponible et vous obtenez l'erreur `'next' n'est pas reconnu`.

---

### Étape 2 — Créer le fichier de variables d'environnement

Copiez le fichier modèle :

```bash
# Linux / macOS / Git Bash
cp .env.example .env.local

# Windows PowerShell
Copy-Item .env.example .env.local

# Windows Invite de commandes (cmd)
copy .env.example .env.local
```

Puis ouvrez `.env.local` et remplacez `NEXTAUTH_SECRET` par une clé aléatoire :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copiez la valeur affichée dans `.env.local` :

```
NEXTAUTH_SECRET="la-valeur-generee-ici"
```

---

### Étape 3 — Créer la base de données

```bash
npx prisma db push
```

Cette commande crée le fichier `dev.db` (SQLite local).

---

### Étape 4 — Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

### Étape 5 — (Optionnel) Charger les données de démonstration

Une fois le serveur démarré, ouvrez un **second terminal** et exécutez :

```bash
curl -X POST http://localhost:3000/api/seed
```

Ou depuis **Windows PowerShell** :

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/seed" -Method POST
```

Cela crée 6 patients, 5 campagnes publicitaires et des rendez-vous de démonstration.

---

## Récapitulatif des commandes

```bash
npm install                # 1. Installer les dépendances (OBLIGATOIRE)
cp .env.example .env.local # 2. Créer le fichier d'environnement
npx prisma db push         # 3. Créer la base de données
npm run dev                # 4. Démarrer en développement
npm run build              # Construire pour la production
npm run start              # Démarrer le serveur de production
```

---

## Pages de l'application

| URL | Description |
|-----|-------------|
| `/` | Landing page publique |
| `/rendez-vous` | Prise de rendez-vous en ligne |
| `/admin` | Tableau de bord CRM (protégé) |
| `/admin/patients` | Liste des patients |
| `/admin/rendez-vous` | Calendrier des rendez-vous |
| `/admin/marketing` | Tableau de bord campagnes publicitaires |

**Identifiants administrateur (démo) :**
- Email : `admin@dietchloe.fr`
- Mot de passe : `Admin123!`

---

## Variables d'environnement

Voir `.env.example` pour la liste complète. Les variables obligatoires sont :

| Variable | Description | Valeur par défaut |
|----------|-------------|-------------------|
| `DATABASE_URL` | Chemin vers la base SQLite | `file:./dev.db` |
| `NEXTAUTH_SECRET` | Clé secrète JWT (auth) | *(obligatoire)* |
| `NEXTAUTH_URL` | URL de l'application | `http://localhost:3000` |

---

## Stack technique

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS**
- **Prisma 7** + SQLite
- **NextAuth.js** (authentification JWT)
- **Recharts** (graphiques)
- **React Hook Form** + Zod (formulaires)
- **Lucide React** (icônes)

