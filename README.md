# ESP Campus Food 🎓🍽️

Plateforme de commande et de réservation de repas pour les étudiants de l'ESP Dakar.

## 🚀 Fonctionnalités
- Sélection et personnalisation des repas (menu du jour, boissons, options).
- Gestion des commandes en temps réel avec numéro de reçu et statut.
- Génération et téléchargement de reçus officiels haute définition en PDF (avec QR code de contrôle, filière, niveau d'études et numéro de téléphone).
- Espace profil étudiant complet.
- Interface moderne, réactive et intuitive pour mobile et ordinateur.

## 📦 Déploiement sur GitHub & GitHub Pages

Ce projet est prêt pour être hébergé directement sur **GitHub Pages**. Un workflow GitHub Actions automatique (`.github/workflows/deploy.yml`) est inclus.

### Étapes pour publier sur GitHub :

1. **Créer un nouveau dépôt sur GitHub** :
   - Rendez-vous sur [github.com/new](https://github.com/new).
   - Nommez le dépôt (ex: `esp-campus-food`).
   - Laissez le dépôt public ou privé, sans initialiser de README.

2. **Lier et pousser votre code local** :
   ```bash
   git remote add origin https://github.com/<VOTRE-NOM-UTILISATEUR>/esp-campus-food.git
   git branch -M main
   git push -u origin main
   ```

3. **Activer GitHub Pages** :
   - Rendez-vous dans **Settings** > **Pages** de votre dépôt GitHub.
   - Sous **Build and deployment > Source**, choisissez **GitHub Actions**.
   - Le site se déploiera automatiquement à chaque commit et sera accessible sur :
     `https://<VOTRE-NOM-UTILISATEUR>.github.io/esp-campus-food/`

---

## 🛠️ Développement local

```bash
npm install
npm run dev
```

Pour créer le build de production :
```bash
npm run build
```
