# B-inov — Boutique Mode Femme 🇨🇲

> Site e-commerce moderne pour femme au Cameroun  
> Sacs · Chaussures · Vêtements | Commandes WhatsApp | Livraison Yaoundé & Douala

![B-inov](https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80&auto=format&fit=crop)

---

## ✨ Aperçu

B-inov est une boutique en ligne 100% statique (HTML/CSS/JS pur), sans serveur, sans base de données distante. Tout fonctionne dans le navigateur via `localStorage`. Le site est pensé pour être rapide, élégant et facile à gérer.

---

## 🎯 Fonctionnalités

### Pour les clientes
- 🖼️ **Hero cinématique** — slideshow automatique avec effet Ken Burns
- 🗂️ **3 catégories** — Sacs, Chaussures, Vêtements
- 🔍 **Recherche en temps réel** + filtres + tri
- 🛒 **Panier dynamique** avec calcul automatique du total
- 💬 **Commande WhatsApp** — message pré-rempli envoyé au 675 075 871
- ❤️ **Favoris** persistants
- 📱 **100% responsive** — mobile & desktop

### Pour l'administratrice
- 🔐 **Panneau admin protégé par mot de passe**
- ➕ **Ajouter** un article avec photo (upload direct)
- ✏️ **Modifier** n'importe quel article
- 🗑️ **Supprimer** un article
- 📸 **Photos en base64** — aucun serveur requis

---

## 📁 Structure du projet

```
binov-shop/
├── index.html          # Page principale
├── manifest.json       # PWA manifest
├── README.md
├── css/
│   └── style.css       # Design complet (3000+ lignes)
└── js/
    └── app.js          # Logique & base de données localStorage
```

---

## 🚀 Lancer en local

```bash
# Cloner le repo
git clone https://github.com/kamado-237/binov-shop.git
cd binov-shop

# Lancer un serveur local
python3 -m http.server 8080
```

Ouvre `http://localhost:8080` dans ton navigateur.

---

## 🔐 Accès Admin

Clique sur le bouton **⚙️** en haut à droite du site.

**Mot de passe par défaut :** `Binov2026!`

> Pour changer le mot de passe, ouvre `js/app.js` et modifie la ligne :
> ```js
> if (hash === correctHash || password === 'Binov2026!')
> ```

---

## 🎨 Stack technique

| Technologie | Usage |
|-------------|-------|
| HTML5 | Structure sémantique |
| CSS3 | Animations, grid, responsive |
| JavaScript ES6 | Logique, localStorage, slideshow |
| Google Fonts | Playfair Display + DM Sans |
| Unsplash | Photos libres de droits |
| localStorage | Base de données côté client |

---

## 🌐 Déploiement

Le site est hébergé sur **Vercel** :

🔗 [https://binov-shop.vercel.app](https://binov-shop.vercel.app)

Pour redéployer après modification :

```bash
git add .
git commit -m "mise à jour"
git push
```

Vercel redéploie automatiquement en moins d'une minute.

---

## ⚠️ Limites connues

- La base de données (localStorage) est **locale à chaque navigateur** — les articles ajoutés par l'admin ne sont pas visibles par les autres visiteurs sans partager le fichier JS
- Photos limitées à **~3 Mo** par image en base64
- Pour une vraie base de données partagée → migration vers **Firebase** ou **Supabase** recommandée

---

## 📱 Contact & Commandes

**WhatsApp : +237 675 075 871**  
Lundi – Samedi : 8h – 20h  
Livraison Yaoundé, Douala & grandes villes 🇨🇲

---

© 2026 B-inov | Cameroun — Tous droits réservés
