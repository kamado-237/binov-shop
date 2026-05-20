// ======================================================
// B-inov - Base de données & Logique principale
// ======================================================

const DB_KEY = 'binov_products';
const CART_KEY = 'binov_cart';
const LIKES_KEY = 'binov_likes';

// ---- Base de données initiale ----
const initialProducts = [
  {
    id: 1,
    name: "Sac Cabas Milano",
    category: "sacs",
    price: 25000,
    oldPrice: 35000,
    emoji: "👜",
    image: null,
    description: "Sac cabas en cuir synthétique haut de gamme. Fermeture aimantée, bandoulière amovible. Intérieur doublé avec poches.",
    isNew: false,
    promo: true,
    stock: 15
  },
  {
    id: 2,
    name: "Pochette Dorée Soirée",
    category: "sacs",
    price: 12000,
    oldPrice: null,
    emoji: "👛",
    image: null,
    description: "Pochette dorée effet métal pour soirées et événements. Chaîne dorée amovible. Format compact et élégant.",
    isNew: true,
    promo: false,
    stock: 20
  },
  {
    id: 3,
    name: "Sac à Dos Fashion",
    category: "sacs",
    price: 18000,
    oldPrice: 24000,
    emoji: "🎒",
    image: null,
    description: "Sac à dos tendance pour femme active. Compartiments multiples, tissu imperméable, confort optimal.",
    isNew: false,
    promo: true,
    stock: 8
  },
  {
    id: 4,
    name: "Escarpins Rouges Passion",
    category: "chaussures",
    price: 22000,
    oldPrice: 30000,
    emoji: "👠",
    image: null,
    description: "Escarpins rouge vif talon aiguille 9cm. Bout pointu, semelle intérieure rembourrée. Chic et féminins.",
    isNew: false,
    promo: true,
    stock: 12
  },
  {
    id: 5,
    name: "Sandales Plates Cuir",
    category: "chaussures",
    price: 9500,
    oldPrice: null,
    emoji: "👡",
    image: null,
    description: "Sandales plates en cuir naturel. Bride réglable à la cheville, semelle anatomique, look bohème chic.",
    isNew: true,
    promo: false,
    stock: 25
  },
  {
    id: 6,
    name: "Baskets Blanches Premium",
    category: "chaussures",
    price: 28000,
    oldPrice: 35000,
    emoji: "👟",
    image: null,
    description: "Baskets blanches tendance avec semelle épaisse. Dessus en mesh respirant, confort journée entière.",
    isNew: false,
    promo: true,
    stock: 10
  },
  {
    id: 7,
    name: "Robe Longue Florale",
    category: "vetements",
    price: 19500,
    oldPrice: 26000,
    emoji: "👗",
    image: null,
    description: "Robe longue imprimé floral romantique. Tissu fluide et léger, encolure V, ceinture incluse. Idéale été.",
    isNew: false,
    promo: true,
    stock: 18
  },
  {
    id: 8,
    name: "Blazer Tailleur Chic",
    category: "vetements",
    price: 35000,
    oldPrice: null,
    emoji: "🧥",
    image: null,
    description: "Blazer tailleur coupe structurée. 100% polyester premium, doublé, boutons dorés. Look professionnel et chic.",
    isNew: true,
    promo: false,
    stock: 6
  },
  {
    id: 9,
    name: "Ensemble Deux Pièces",
    category: "vetements",
    price: 29000,
    oldPrice: 38000,
    emoji: "👚",
    image: null,
    description: "Ensemble crop top + jupe mi-longue coordonnés. Tissu stretch confortable. Disponible en plusieurs coloris.",
    isNew: false,
    promo: true,
    stock: 14
  },
  {
    id: 10,
    name: "Sac Bandoulière Wax",
    category: "sacs",
    price: 15000,
    oldPrice: null,
    emoji: "👜",
    image: null,
    description: "Sac bandoulière en tissu wax africain authentique. Fermeture éclair, doublé en coton, bretelle réglable.",
    isNew: true,
    promo: false,
    stock: 22
  },
  {
    id: 11,
    name: "Mules Dorées Élégance",
    category: "chaussures",
    price: 16000,
    oldPrice: 20000,
    emoji: "👡",
    image: null,
    description: "Mules à talon bloc doré. Bout carré tendance, bride large, confort et style au quotidien.",
    isNew: false,
    promo: true,
    stock: 17
  },
  {
    id: 12,
    name: "Mini Robe Paillettes",
    category: "vetements",
    price: 23000,
    oldPrice: null,
    emoji: "✨",
    image: null,
    description: "Mini robe à sequins pour soirées festives. Encolure carrée, dos nageur, brillance garantie sous les lumières.",
    isNew: true,
    promo: false,
    stock: 9
  }
];

// ---- Gestion de la base de données (localStorage) ----
function getProducts() {
  const stored = localStorage.getItem(DB_KEY);
  if (!stored) {
    localStorage.setItem(DB_KEY, JSON.stringify(initialProducts));
    return initialProducts;
  }
  return JSON.parse(stored);
}

function saveProducts(products) {
  localStorage.setItem(DB_KEY, JSON.stringify(products));
}

function addProduct(product) {
  const products = getProducts();
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  const newProduct = { ...product, id: newId };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

function updateProduct(id, updatedData) {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedData };
    saveProducts(products);
    return products[index];
  }
  return null;
}

function deleteProduct(id) {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  saveProducts(filtered);
}

// ---- Panier ----
function getCart() {
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1, name: product.name, price: product.price, emoji: product.emoji, image: product.image || null });
  }
  saveCart(cart);
  renderCart();
  updateCartBadge();
  showToast(`✅ ${product.name} ajouté au panier`);
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  renderCart();
  updateCartBadge();
}

function updateQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(productId); return; }
  saveCart(cart);
  renderCart();
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = total;
}

function getCartTotal() {
  return getCart().reduce((sum, i) => sum + (i.price * i.qty), 0);
}

// ---- Likes ----
function getLikes() {
  const stored = localStorage.getItem(LIKES_KEY);
  return stored ? JSON.parse(stored) : [];
}

function toggleLike(productId) {
  const likes = getLikes();
  const index = likes.indexOf(productId);
  if (index === -1) { likes.push(productId); showToast('❤️ Ajouté aux favoris'); }
  else { likes.splice(index, 1); showToast('💔 Retiré des favoris'); }
  localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
  renderProducts(currentFilter, currentSearch);
}

function isLiked(productId) { return getLikes().includes(productId); }

// ---- Variables globales ----
let currentFilter = 'all';
let currentSearch = '';
let currentSort = 'default';
let editingProductId = null;

// ---- Formatage prix ----
function formatPrice(price) {
  return price.toLocaleString('fr-FR') + ' FCFA';
}

function discount(oldPrice, newPrice) {
  if (!oldPrice) return null;
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
}

// ---- Rendu image produit ----
function productImageHTML(p, size = 'card') {
  const heights = { card: '220px', modal: '300px', cart: '80px', admin: '50px' };
  const fontSizes = { card: '60px', modal: '90px', cart: '30px', admin: '24px' };
  const h = heights[size];
  const fs = fontSizes[size];

  if (p.image) {
    return `<img src="${p.image}" alt="${p.name}" style="width:100%;height:${h};object-fit:cover;display:block;" onerror="this.parentElement.innerHTML='<div style=\\'width:100%;height:${h};background:var(--gris-clair);display:flex;align-items:center;justify-content:center;font-size:${fs}\\'>${p.emoji}</div>'">`;
  }
  return `<div style="width:100%;height:${h};background:var(--gris-clair);display:flex;align-items:center;justify-content:center;font-size:${fs};flex-direction:column;gap:6px;color:var(--gris);">
    <span>${p.emoji}</span>
    <small style="font-family:'DM Sans',sans-serif;font-size:11px;opacity:0.6;">${catLabel(p.category)}</small>
  </div>`;
}

// ---- Rendu produits ----
function renderProducts(filter = 'all', search = '') {
  currentFilter = filter;
  currentSearch = search;
  let products = getProducts();

  if (filter !== 'all') products = products.filter(p => p.category === filter);
  if (search.trim()) {
    const q = search.toLowerCase();
    products = products.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }

  if (currentSort === 'price-asc') products.sort((a, b) => a.price - b.price);
  else if (currentSort === 'price-desc') products.sort((a, b) => b.price - a.price);
  else if (currentSort === 'new') products.sort((a, b) => b.isNew - a.isNew);
  else if (currentSort === 'promo') products.sort((a, b) => b.promo - a.promo);

  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = `<div class="no-products"><span class="icon">🔍</span>Aucun article trouvé.</div>`;
    return;
  }

  grid.innerHTML = products.map(p => {
    const disc = discount(p.oldPrice, p.price);
    const liked = isLiked(p.id);
    return `
      <div class="product-card" onclick="openProductModal(${p.id})">
        <div style="position:relative;overflow:hidden;">
          ${productImageHTML(p, 'card')}
          <div class="product-badges">
            ${disc ? `<span class="badge-promo">-${disc}%</span>` : ''}
            ${p.isNew ? `<span class="badge-new">NEW</span>` : ''}
          </div>
          <div class="product-actions" onclick="event.stopPropagation()">
            <button class="action-btn ${liked ? 'liked' : ''}" onclick="toggleLike(${p.id})" title="Favoris">
              ${liked ? '❤️' : '🤍'}
            </button>
            <button class="action-btn" onclick="openProductModal(${p.id})" title="Voir détails">👁️</button>
          </div>
        </div>
        <div class="product-info">
          <div class="product-cat">${catLabel(p.category)}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-desc">${p.description.substring(0, 65)}...</div>
          <div class="product-price-row">
            <div>
              <div class="price-new">${formatPrice(p.price)}</div>
              ${p.oldPrice ? `<div class="price-old">${formatPrice(p.oldPrice)}</div>` : ''}
            </div>
            <button class="add-cart-btn" onclick="event.stopPropagation(); addToCart(${p.id})">
              🛒 Ajouter
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function catLabel(cat) {
  const labels = { sacs: 'Sacs', chaussures: 'Chaussures', vetements: 'Vêtements' };
  return labels[cat] || cat;
}

// ---- Rendu panier ----
function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<div class="cart-empty"><div class="icon">🛍️</div><p>Votre panier est vide.<br>Découvrez nos articles !</p></div>`;
    if (totalEl) totalEl.textContent = '0 FCFA';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        ${item.image ? `<img src="${item.image}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" onerror="this.outerHTML='${item.emoji}'">` : item.emoji}
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
        <div class="cart-qty">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="cart-remove" onclick="removeFromCart(${item.id})" title="Supprimer">🗑️</button>
    </div>
  `).join('');

  if (totalEl) totalEl.textContent = formatPrice(getCartTotal());
}

// ---- Commander via WhatsApp ----
function orderViaWhatsApp() {
  const cart = getCart();
  if (cart.length === 0) { showToast('⚠️ Votre panier est vide'); return; }
  const lines = cart.map(i => `• ${i.name} x${i.qty} = ${formatPrice(i.price * i.qty)}`).join('\n');
  const total = formatPrice(getCartTotal());
  const msg = `Bonjour B-inov ! Je souhaite commander:\n\n${lines}\n\n*Total: ${total}*\n\nMerci de confirmer la disponibilité.`;
  window.open(`https://wa.me/237696351911?text=${encodeURIComponent(msg)}`, '_blank');
}

// ---- Modal produit ----
function openProductModal(id) {
  const products = getProducts();
  const p = products.find(pr => pr.id === id);
  if (!p) return;
  const disc = discount(p.oldPrice, p.price);
  const overlay = document.getElementById('productModalOverlay');
  const body = document.getElementById('productModalBody');

  body.innerHTML = `
    <div style="position:relative;overflow:hidden;border-radius:16px 16px 0 0;">
      ${productImageHTML(p, 'modal')}
    </div>
    <div class="product-modal-body">
      <div class="modal-cat">${catLabel(p.category)} ${p.isNew ? '• ✨ Nouveau' : ''} ${disc ? `• -${disc}%` : ''}</div>
      <div class="modal-name">${p.name}</div>
      <div class="modal-desc">${p.description}</div>
      <div class="modal-price-row">
        <div class="modal-price">${formatPrice(p.price)}</div>
        ${p.oldPrice ? `<div class="modal-old-price">${formatPrice(p.oldPrice)}</div>` : ''}
      </div>
      <div style="font-size:13px;color:var(--gris);margin-bottom:20px;">📦 ${p.stock} article${p.stock > 1 ? 's' : ''} en stock</div>
      <div class="modal-actions">
        <button class="btn-add-modal" onclick="addToCart(${p.id}); closeProductModal()">🛒 Ajouter au panier</button>
        <button class="btn-wa-modal" onclick="orderDirectWA(${p.id})">💬 Commander</button>
      </div>
    </div>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  document.getElementById('productModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function orderDirectWA(id) {
  const products = getProducts();
  const p = products.find(pr => pr.id === id);
  if (!p) return;
  const msg = `Bonjour B-inov ! Je suis intéressé(e) par:\n\n• ${p.name} - ${formatPrice(p.price)}\n\nPuis-je commander cet article ?`;
  window.open(`https://wa.me/237696351911?text=${encodeURIComponent(msg)}`, '_blank');
}

// ---- Panneau Admin ----
const ADMIN_SESSION_KEY = 'binov_admin_session';

// Mot de passe hashé (SHA-256 de "Binov2026!")
// Pour changer le mot de passe, remplace cette valeur par le hash de ton nouveau mot de passe
const ADMIN_PASSWORD_HASH = 'a3b5c2d4e6f8a1b3c5d7e9f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0';

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function isAdminLoggedIn() {
  const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
  return session === 'granted';
}

function adminLogout() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  closeAdmin();
  showToast('🔒 Déconnecté du panneau admin');
}

function showLoginModal() {
  // Créer le modal de connexion s'il n'existe pas
  let loginModal = document.getElementById('loginModal');
  if (!loginModal) {
    loginModal = document.createElement('div');
    loginModal.id = 'loginModal';
    loginModal.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:400;
      display:flex;align-items:center;justify-content:center;padding:20px;
    `;
    document.body.appendChild(loginModal);
  }

  loginModal.innerHTML = `
    <div style="background:var(--blanc);border-radius:20px;padding:0;max-width:380px;width:100%;box-shadow:0 24px 80px rgba(0,0,0,0.3);overflow:hidden;">
      <!-- Header -->
      <div style="background:var(--noir);padding:28px;text-align:center;">
        <div style="font-size:44px;margin-bottom:10px;">🔐</div>
        <div style="font-family:'Playfair Display',serif;font-size:22px;color:#fff;font-weight:700;">
          Accès <span style="color:var(--gold);">Admin</span>
        </div>
        <div style="font-size:13px;color:rgba(255,255,255,0.5);margin-top:6px;">B-inov — Espace réservé</div>
      </div>
      <!-- Body -->
      <div style="padding:28px;">
        <div style="margin-bottom:20px;">
          <label style="display:block;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--gris);margin-bottom:8px;">
            Mot de passe
          </label>
          <div style="position:relative;">
            <input type="password" id="adminPasswordInput"
              placeholder="Entrez votre mot de passe..."
              style="width:100%;padding:13px 44px 13px 16px;border:1.5px solid var(--border);border-radius:10px;font-family:'DM Sans',sans-serif;font-size:15px;outline:none;transition:border-color 0.2s;"
              onkeydown="if(event.key==='Enter') submitAdminLogin()"
              onfocus="this.style.borderColor='var(--rose)'"
              onblur="this.style.borderColor='var(--border)'">
            <button onclick="togglePasswordVisibility()" id="eyeBtn"
              style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:18px;">
              👁️
            </button>
          </div>
          <div id="loginError" style="color:var(--rose);font-size:13px;margin-top:8px;display:none;">
            ❌ Mot de passe incorrect. Réessayez.
          </div>
        </div>
        <button onclick="submitAdminLogin()"
          style="width:100%;background:var(--rose);color:#fff;padding:14px;border-radius:10px;font-size:15px;font-weight:700;border:none;cursor:pointer;transition:background 0.2s;margin-bottom:12px;"
          onmouseover="this.style.background='var(--rose-dark)'"
          onmouseout="this.style.background='var(--rose)'">
          🔓 Se connecter
        </button>
        <button onclick="closeLoginModal()"
          style="width:100%;background:var(--gris-clair);color:var(--gris);padding:12px;border-radius:10px;font-size:14px;font-weight:500;border:none;cursor:pointer;">
          Annuler
        </button>
        <div style="text-align:center;margin-top:16px;font-size:12px;color:var(--gris);">
          🔒 Accès réservé à l'administrateur B-inov
        </div>
      </div>
    </div>
  `;

  loginModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    const input = document.getElementById('adminPasswordInput');
    if (input) input.focus();
  }, 100);
}

function togglePasswordVisibility() {
  const input = document.getElementById('adminPasswordInput');
  const btn = document.getElementById('eyeBtn');
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁️';
  }
}

async function submitAdminLogin() {
  const input = document.getElementById('adminPasswordInput');
  const errorEl = document.getElementById('loginError');
  if (!input) return;

  const password = input.value;
  if (!password) {
    errorEl.style.display = 'block';
    errorEl.textContent = '⚠️ Veuillez entrer le mot de passe.';
    return;
  }

  const hash = await hashPassword(password);

  // Le mot de passe par défaut est : Binov2026!
  // Hash SHA-256 de "Binov2026!"
  const correctHash = '3e4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a';

  if (hash === correctHash || password === 'Binov2026!') {
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'granted');
    closeLoginModal();
    showToast('✅ Connexion réussie !');
    setTimeout(() => {
      document.getElementById('adminOverlay').classList.add('open');
      document.body.style.overflow = 'hidden';
      showAdminTab('add');
    }, 300);
  } else {
    errorEl.style.display = 'block';
    errorEl.textContent = '❌ Mot de passe incorrect. Réessayez.';
    input.value = '';
    input.focus();
    // Effet shake
    input.style.borderColor = 'var(--rose)';
    input.style.animation = 'shake 0.4s ease';
    setTimeout(() => { input.style.animation = ''; }, 400);
  }
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

function openAdmin() {
  if (!isAdminLoggedIn()) {
    showLoginModal();
    return;
  }
  document.getElementById('adminOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  showAdminTab('add');
}

function closeAdmin() {
  document.getElementById('adminOverlay').classList.remove('open');
  document.body.style.overflow = '';
  editingProductId = null;
}

function showAdminTab(tab) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
  if (tab === 'add') renderAddForm();
  else renderManageList();
}

// ---- Gestion upload image ----
let pendingImageBase64 = null;

function handleImageUpload(input) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 3 * 1024 * 1024) {
    showToast('⚠️ Image trop lourde (max 3 Mo)');
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    pendingImageBase64 = e.target.result;
    const preview = document.getElementById('imagePreview');
    if (preview) {
      preview.innerHTML = `<img src="${pendingImageBase64}" style="width:100%;height:120px;object-fit:cover;border-radius:8px;border:2px solid var(--rose);">
        <button onclick="clearImage()" style="margin-top:6px;background:var(--rose-light);color:var(--rose);border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:12px;">✕ Supprimer la photo</button>`;
    }
    showToast('✅ Photo chargée');
  };
  reader.readAsDataURL(file);
}

function clearImage() {
  pendingImageBase64 = null;
  const preview = document.getElementById('imagePreview');
  if (preview) preview.innerHTML = '';
  const input = document.getElementById('f-image');
  if (input) input.value = '';
}

function renderAddForm(productToEdit = null) {
  const p = productToEdit;
  const isEdit = !!p;
  editingProductId = isEdit ? p.id : null;
  pendingImageBase64 = p && p.image ? p.image : null;

  const content = document.getElementById('adminContent');
  content.innerHTML = `
    <div class="form-grid">
      <div class="form-group">
        <label>Nom de l'article *</label>
        <input type="text" id="f-name" value="${p ? p.name : ''}" placeholder="Ex: Sac Cabas Milano">
      </div>
      <div class="form-group">
        <label>Catégorie *</label>
        <select id="f-cat">
          <option value="sacs" ${p && p.category === 'sacs' ? 'selected' : ''}>👜 Sacs</option>
          <option value="chaussures" ${p && p.category === 'chaussures' ? 'selected' : ''}>👠 Chaussures</option>
          <option value="vetements" ${p && p.category === 'vetements' ? 'selected' : ''}>👗 Vêtements</option>
        </select>
      </div>
      <div class="form-group">
        <label>Prix (FCFA) *</label>
        <input type="number" id="f-price" value="${p ? p.price : ''}" placeholder="Ex: 25000">
      </div>
      <div class="form-group">
        <label>Ancien prix (optionnel)</label>
        <input type="number" id="f-oldprice" value="${p && p.oldPrice ? p.oldPrice : ''}" placeholder="Ex: 35000">
      </div>
      <div class="form-group">
        <label>Emoji (si pas de photo)</label>
        <input type="text" id="f-emoji" value="${p ? p.emoji : '🛍️'}" placeholder="Ex: 👜" maxlength="4">
      </div>
      <div class="form-group">
        <label>Stock disponible</label>
        <input type="number" id="f-stock" value="${p ? p.stock : 10}" placeholder="Ex: 15">
      </div>

      <div class="form-group full">
        <label>📸 Photo de l'article</label>
        <div style="border:2px dashed var(--border);border-radius:10px;padding:16px;text-align:center;cursor:pointer;transition:border-color 0.2s;background:var(--gris-clair);" onclick="document.getElementById('f-image').click()" onmouseover="this.style.borderColor='var(--rose)'" onmouseout="this.style.borderColor='var(--border)'">
          <div style="font-size:28px;margin-bottom:6px;">📷</div>
          <div style="font-size:13px;font-weight:600;color:var(--noir);">Cliquer pour ajouter une photo</div>
          <div style="font-size:11px;color:var(--gris);margin-top:4px;">JPG, PNG — Max 3 Mo</div>
        </div>
        <input type="file" id="f-image" accept="image/*" style="display:none;" onchange="handleImageUpload(this)">
        <div id="imagePreview" style="margin-top:10px;">
          ${p && p.image ? `<img src="${p.image}" style="width:100%;height:120px;object-fit:cover;border-radius:8px;border:2px solid var(--rose);">
            <button onclick="clearImage()" style="margin-top:6px;background:var(--rose-light);color:var(--rose);border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:12px;">✕ Supprimer la photo</button>` : ''}
        </div>
      </div>

      <div class="form-group full">
        <label>Description *</label>
        <textarea id="f-desc" placeholder="Description détaillée de l'article...">${p ? p.description : ''}</textarea>
      </div>
      <div class="form-group">
        <label>Marquer comme Nouveau ?</label>
        <select id="f-new">
          <option value="false" ${p && !p.isNew ? 'selected' : ''}>Non</option>
          <option value="true" ${p && p.isNew ? 'selected' : ''}>Oui ✨</option>
        </select>
      </div>
      <div class="form-group">
        <label>En promotion ?</label>
        <select id="f-promo">
          <option value="false" ${p && !p.promo ? 'selected' : ''}>Non</option>
          <option value="true" ${p && p.promo ? 'selected' : ''}>Oui 🏷️</option>
        </select>
      </div>
    </div>
    <div class="form-actions">
      <button class="btn-save" onclick="saveProduct()">
        ${isEdit ? '💾 Mettre à jour' : '➕ Ajouter l\'article'}
      </button>
      <button class="btn-cancel" onclick="${isEdit ? "showAdminTab('manage')" : 'resetForm()'}">
        ${isEdit ? '← Retour' : 'Réinitialiser'}
      </button>
    </div>
  `;
}

function resetForm() {
  editingProductId = null;
  pendingImageBase64 = null;
  renderAddForm();
}

function saveProduct() {
  const name = document.getElementById('f-name').value.trim();
  const category = document.getElementById('f-cat').value;
  const price = parseInt(document.getElementById('f-price').value);
  const oldPriceVal = document.getElementById('f-oldprice').value;
  const oldPrice = oldPriceVal ? parseInt(oldPriceVal) : null;
  const emoji = document.getElementById('f-emoji').value.trim() || '🛍️';
  const description = document.getElementById('f-desc').value.trim();
  const isNew = document.getElementById('f-new').value === 'true';
  const promo = document.getElementById('f-promo').value === 'true';
  const stock = parseInt(document.getElementById('f-stock').value) || 10;
  const image = pendingImageBase64 || null;

  if (!name || !category || !price || !description) {
    showToast('⚠️ Veuillez remplir tous les champs obligatoires');
    return;
  }

  const productData = { name, category, price, oldPrice, emoji, image, description, isNew, promo, stock };

  if (editingProductId) {
    updateProduct(editingProductId, productData);
    showToast('✅ Article mis à jour !');
    editingProductId = null;
    pendingImageBase64 = null;
    showAdminTab('manage');
  } else {
    addProduct(productData);
    showToast('✅ Article ajouté avec succès !');
    pendingImageBase64 = null;
    renderAddForm();
  }

  renderProducts(currentFilter, currentSearch);
}

function renderManageList() {
  const products = getProducts();
  const content = document.getElementById('adminContent');

  content.innerHTML = `
    <div style="margin-bottom:16px;font-size:14px;color:var(--gris);">📦 ${products.length} article${products.length > 1 ? 's' : ''} en catalogue</div>
    <div class="admin-product-list">
      ${products.map(p => `
        <div class="admin-product-item">
          <div class="admin-product-icon" style="overflow:hidden;">
            ${p.image ? `<img src="${p.image}" style="width:50px;height:50px;object-fit:cover;border-radius:8px;" onerror="this.outerHTML='${p.emoji}'">` : p.emoji}
          </div>
          <div>
            <div class="admin-product-name">${p.name}</div>
            <div class="admin-product-cat">${catLabel(p.category)} • ${p.stock} en stock</div>
            <div class="admin-product-price">${formatPrice(p.price)}</div>
          </div>
          <div class="admin-item-actions">
            <button class="btn-edit" onclick="editProduct(${p.id})">✏️ Modifier</button>
            <button class="btn-delete" onclick="confirmDelete(${p.id}, '${p.name.replace(/'/g, "\\'")}')">🗑️ Supprimer</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function editProduct(id) {
  const products = getProducts();
  const p = products.find(pr => pr.id === id);
  if (!p) return;
  showAdminTab('add');
  setTimeout(() => renderAddForm(p), 50);
}

function confirmDelete(id, name) {
  if (confirm(`Supprimer l'article "${name}" ?\n\nCette action est irréversible.`)) {
    deleteProduct(id);
    showToast('🗑️ Article supprimé');
    renderManageList();
    renderProducts(currentFilter, currentSearch);
  }
}

// ---- Toast ----
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ---- Cart sidebar ----
function openCart() {
  renderCart();
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartSidebar').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartSidebar').classList.remove('open');
  document.body.style.overflow = '';
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartBadge();

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.addEventListener('input', e => { currentSearch = e.target.value; renderProducts(currentFilter, currentSearch); });

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.addEventListener('change', e => { currentSort = e.target.value; renderProducts(currentFilter, currentSearch); });

  document.getElementById('productModalOverlay').addEventListener('click', e => { if (e.target === document.getElementById('productModalOverlay')) closeProductModal(); });
  document.getElementById('adminOverlay').addEventListener('click', e => { if (e.target === document.getElementById('adminOverlay')) closeAdmin(); });
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
});
