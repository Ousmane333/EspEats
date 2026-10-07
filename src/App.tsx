import React, { useState, useEffect } from 'react';
import { MenuItem, CartItem, Category, Order, StudentInfo, DeliveryStatus } from './types';
import { MENU_ITEMS } from './data/menu';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { MenuCard } from './components/MenuCard';
import { MenuItemModal } from './components/MenuItemModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ReceiptView } from './components/ReceiptView';
import { AdminPanel } from './components/AdminPanel';
import { QuotaNoticeModal } from './components/QuotaNoticeModal';
import { StudentRegistrationModal } from './components/StudentRegistrationModal';
import { ActiveOrderNoticeModal } from './components/ActiveOrderNoticeModal';
import { ThreeBackground } from './components/ThreeBackground';
import { OrderHistoryView } from './components/OrderHistoryView';
import { FlutterExportModal } from './components/FlutterExportModal';
import { MenuGridSkeleton } from './components/MenuCardSkeleton';
import { FormulaStepper } from './components/FormulaStepper';
import { FormulaCompletionModal } from './components/FormulaCompletionModal';
import { Search, Utensils, GlassWater, Pizza, IceCream, Sparkles, CheckCircle2, Lock, RotateCcw, AlertTriangle, History, Receipt, Smartphone, Truck, ArrowRight, Check } from 'lucide-react';

const MAX_FREE_ITEMS = 3;

// Initial sample order for demo purposes
const SAMPLE_ORDER: Order = {
  id: 'order-demo-1',
  orderNumber: '#ESP-2026-8912',
  student: {
    fullName: 'Mamadou Ndiaye',
    email: 'm.ndiaye@esp.sn',
    studentId: 'ESP-2026-9812',
    department: 'Génie Informatique (DGI)',
    level: 'DUT 1ère Année (Nouvel Étudiant)',
    phone: '+221 77 812 34 56',
    deliveryLocation: 'Pavillon A (Résidence Étudiante)',
    roomNumberOrDetails: 'Chambre 104, 1er Étage'
  },
  items: [
    {
      id: 'c1',
      menuItem: MENU_ITEMS[0], // Thiebou Jen
      quantity: 1,
      selectedOptions: { 'Niveau de piment': 'Piment doux' },
      specialInstructions: 'Servir chaud S.V.P'
    },
    {
      id: 'c2',
      menuItem: MENU_ITEMS[7], // Jus de Bissap
      quantity: 1,
      selectedOptions: { 'Glaçons': 'Bien Glacé' }
    },
    {
      id: 'c3',
      menuItem: MENU_ITEMS[10], // Thiakry / Degue
      quantity: 1,
      selectedOptions: {}
    }
  ],
  status: 'delivering',
  createdAt: '09/08/2026 à 12:15',
  estimatedDeliveryTime: 'En cours',
  totalSaved: 4100,
  qrCodeData: 'ESP-VALIDATED-2026-8912',
  deliveryAgent: {
    name: 'Moussa Diop',
    phone: '+221 77 654 32 10',
    role: 'Livreur Étudiant ESP (DIC2)',
    avatar: '🚲',
    transport: 'Vélo Express Campus'
  }
};

const SAMPLE_ARCHIVED_ORDER_1: Order = {
  id: 'order-demo-archived-1',
  orderNumber: '#ESP-2026-4022',
  student: {
    fullName: 'Mamadou Ndiaye',
    email: 'm.ndiaye@esp.sn',
    studentId: 'ESP-2026-9812',
    department: 'Génie Informatique (DGI)',
    level: 'DUT 1ère Année (Nouvel Étudiant)',
    phone: '+221 77 812 34 56',
    deliveryLocation: 'Pavillon B',
    roomNumberOrDetails: 'Chambre 22G'
  },
  items: [
    {
      id: 'arch-1',
      menuItem: MENU_ITEMS[1], // Yassa Poulet
      quantity: 1,
      selectedOptions: { 'Part de poulet': 'Cuisse' }
    },
    {
      id: 'arch-2',
      menuItem: MENU_ITEMS[7], // Jus de Bissap
      quantity: 1,
      selectedOptions: {}
    }
  ],
  status: 'delivered',
  createdAt: '08/08/2026 à 19:45',
  estimatedDeliveryTime: 'Livrée',
  totalSaved: 3000,
  qrCodeData: 'ESP-VALIDATED-2026-4022',
  deliveryAgent: {
    name: 'Awa Faye',
    phone: '+221 77 111 22 33',
    role: 'Livreuse BDE ESP',
    avatar: '🛵',
    transport: 'Scooter Campus'
  }
};

const SAMPLE_ARCHIVED_ORDER_2: Order = {
  id: 'order-demo-archived-2',
  orderNumber: '#ESP-2026-3109',
  student: {
    fullName: 'Mamadou Ndiaye',
    email: 'm.ndiaye@esp.sn',
    studentId: 'ESP-2026-9812',
    department: 'Génie Informatique (DGI)',
    level: 'DUT 1ère Année (Nouvel Étudiant)',
    phone: '+221 77 812 34 56',
    deliveryLocation: 'Pavillon A',
    roomNumberOrDetails: 'Chambre 104'
  },
  items: [
    {
      id: 'arch-3',
      menuItem: MENU_ITEMS[3], // Dibi Poulet
      quantity: 1,
      selectedOptions: {}
    },
    {
      id: 'arch-4',
      menuItem: MENU_ITEMS[8], // Jus de Bouye
      quantity: 1,
      selectedOptions: {}
    }
  ],
  status: 'delivered',
  createdAt: '07/08/2026 à 13:10',
  estimatedDeliveryTime: 'Livrée',
  totalSaved: 3300,
  qrCodeData: 'ESP-VALIDATED-2026-3109',
  deliveryAgent: {
    name: 'Ousmane Sarr',
    phone: '+221 78 456 78 90',
    role: 'Livreur Étudiant ESP',
    avatar: '🚲',
    transport: 'Livraison Vélo Express'
  }
};

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState<'menu' | 'receipts' | 'admin'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<Category>('fastfood');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuLoading, setIsMenuLoading] = useState(false);
  const [isFormulaCompleteModalOpen, setIsFormulaCompleteModalOpen] = useState(false);
  const [stepFeedback, setStepFeedback] = useState<{ message: string; type: string } | null>(null);

  // Derived 3 formula slot items (1 Fast Food, 1 Accompagnant, 1 Dessert)
  const fastFoodItem = cartItems.find(i => i.menuItem.category === 'fastfood');
  const accompagnantItem = cartItems.find(i => i.menuItem.category === 'accompagnants');
  const dessertItem = cartItems.find(i => i.menuItem.category === 'desserts');
  const isFormulaComplete = !!(fastFoodItem && accompagnantItem && dessertItem);

  // Auto-clear step toast notification
  useEffect(() => {
    if (stepFeedback) {
      const timer = setTimeout(() => setStepFeedback(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [stepFeedback]);

  // Trigger subtle skeleton loading state when category or search changes
  useEffect(() => {
    setIsMenuLoading(true);
    const timer = setTimeout(() => {
      setIsMenuLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  // One-time auto-reset to fresh new user requested by user
  const FRESH_USER_RESET_KEY = 'esp_fresh_user_reset_v9';
  if (typeof window !== 'undefined' && !localStorage.getItem(FRESH_USER_RESET_KEY)) {
    localStorage.removeItem('esp_student_profile');
    localStorage.removeItem('esp_student_orders');
    localStorage.setItem(FRESH_USER_RESET_KEY, 'true');
  }

  // Student Profile State (Onboarding mandatory before app access)
  const [studentProfile, setStudentProfile] = useState<StudentInfo | null>(() => {
    const saved = localStorage.getItem('esp_student_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean>(() => {
    return !localStorage.getItem('esp_student_profile');
  });

  // Storage for student orders (Empty by default for new users so they can order immediately)
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('esp_student_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error('Failed to parse saved orders', e);
      }
    }
    return [];
  });

  const [activeOrder, setActiveOrder] = useState<Order | null>(() => {
    const saved = localStorage.getItem('esp_student_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
      } catch (e) {}
    }
    return null;
  });

  const [receiptsSubTab, setReceiptsSubTab] = useState<'current' | 'history'>('current');

  // Reset all session & profile state to act as a brand new student user
  const handleResetAsNewUser = () => {
    localStorage.removeItem('esp_student_profile');
    localStorage.removeItem('esp_student_orders');
    setStudentProfile(null);
    setOrders([]);
    setActiveOrder(null);
    setCartItems([]);
    setSelectedCategory('fastfood');
    setSearchQuery('');
    setActiveTab('menu');
    setIsRegistrationOpen(true);
    setStepFeedback({
      message: '✨ Session réinitialisée ! Bienvenue nouvel étudiant ESP.',
      type: 'info'
    });
  };

  // Derive active pending order (non-delivered)
  const activePendingOrder = orders.find(o => o.status !== 'delivered') || null;

  // Load sample demo orders for testing
  const handleLoadDemoOrders = () => {
    const demoOrders = [SAMPLE_ORDER, SAMPLE_ARCHIVED_ORDER_1, SAMPLE_ARCHIVED_ORDER_2];
    setOrders(demoOrders);
    setActiveOrder(SAMPLE_ORDER);
  };

  // Edit a pending order before final validation/delivery
  const handleEditPendingOrder = (orderToEdit: Order) => {
    const editCartItems: CartItem[] = orderToEdit.items.map((item, idx) => ({
      id: `cart-edit-${Date.now()}-${idx}`,
      menuItem: item.menuItem,
      quantity: item.quantity,
      selectedOptions: { ...item.selectedOptions },
      specialInstructions: item.specialInstructions || ''
    }));

    setOrders(prev => prev.filter(o => o.id !== orderToEdit.id));
    if (activeOrder?.id === orderToEdit.id) {
      setActiveOrder(null);
    }
    setCartItems(editCartItems);
    setActiveTab('menu');
    setIsCartOpen(true);
  };

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQuotaNoticeOpen, setIsQuotaNoticeOpen] = useState(false);
  const [isActiveOrderNoticeOpen, setIsActiveOrderNoticeOpen] = useState(false);
  const [isFlutterModalOpen, setIsFlutterModalOpen] = useState(false);

  // Handle Reordering past archived orders
  const handleReorder = (pastOrder: Order) => {
    if (activePendingOrder) {
      setIsActiveOrderNoticeOpen(true);
      return;
    }

    const newCartItems: CartItem[] = pastOrder.items.map((item, idx) => ({
      id: `cart-reorder-${Date.now()}-${idx}`,
      menuItem: item.menuItem,
      quantity: item.quantity,
      selectedOptions: { ...item.selectedOptions },
      specialInstructions: item.specialInstructions
    }));

    setCartItems(newCartItems);
    setActiveTab('menu');
    setIsCartOpen(true);
  };

  useEffect(() => {
    localStorage.setItem('esp_student_orders', JSON.stringify(orders));
  }, [orders]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Save student profile
  const handleSaveStudentProfile = (profile: StudentInfo) => {
    setStudentProfile(profile);
    localStorage.setItem('esp_student_profile', JSON.stringify(profile));

    // Sync student profile information (including phone number) to active & past orders
    setOrders(prev => prev.map(o => ({
      ...o,
      student: {
        ...o.student,
        ...profile
      }
    })));

    if (activeOrder) {
      setActiveOrder(prev => prev ? {
        ...prev,
        student: {
          ...prev.student,
          ...profile
        }
      } : null);
    }

    setIsRegistrationOpen(false);
  };

  // Reset active order to allow making a new one
  const handleResetOrder = (orderId?: string) => {
    const targetId = orderId || activePendingOrder?.id || activeOrder?.id;
    if (!targetId) return;

    if (window.confirm('Voulez-vous vraiment réinitialiser votre commande en cours ? La commande sera annulée et vous pourrez composer un nouveau menu.')) {
      setOrders(prev => prev.filter(o => o.id !== targetId));
      if (activeOrder?.id === targetId) {
        setActiveOrder(null);
      }
      setCartItems([]);
      setIsActiveOrderNoticeOpen(false);
      setIsCartOpen(false);
      setIsCheckoutOpen(false);
    }
  };

  // Filter items by category & search query
  const filteredMenuItems = MENU_ITEMS.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Handle Add To Cart with sequential formula flow: Fast-Food -> Accompagnants -> Desserts -> Propose Direct Order
  const handleAddToCart = (item: MenuItem, selectedOptions: Record<string, string>, specialInstructions: string) => {
    // Force registration if new user hasn't provided coordinates yet
    if (!studentProfile) {
      setIsRegistrationOpen(true);
      return;
    }

    // Check if user has already placed an order (cannot re-order)
    if (orders.length > 0 || activePendingOrder) {
      setIsActiveOrderNoticeOpen(true);
      return;
    }

    const newItem: CartItem = {
      id: `cart-${Date.now()}-${item.id}`,
      menuItem: item,
      quantity: 1,
      selectedOptions,
      specialInstructions
    };

    // Replace any existing item of the same category (1 Fast-Food, 1 Accompagnant, 1 Dessert only!)
    const remainingItems = cartItems.filter(i => i.menuItem.category !== item.category);
    const updatedCart = [...remainingItems, newItem];
    setCartItems(updatedCart);

    const hasFastFood = updatedCart.some(i => i.menuItem.category === 'fastfood');
    const hasAccompagnant = updatedCart.some(i => i.menuItem.category === 'accompagnants');
    const hasDessert = updatedCart.some(i => i.menuItem.category === 'desserts');
    const formulaFinished = hasFastFood && hasAccompagnant && hasDessert;

    // Sequential transitions requested by user:
    // Fast-food -> Accompagnants -> Desserts -> Proposer de commander directement
    if (item.category === 'fastfood') {
      setSelectedCategory('accompagnants');
      setStepFeedback({
        message: `🍔 Fast-Food « ${item.name} » validé ! Étape 2 : Choisissez maintenant votre accompagnant.`,
        type: 'fastfood'
      });
      setTimeout(() => {
        const el = document.getElementById('menu-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (item.category === 'accompagnants') {
      setSelectedCategory('desserts');
      setStepFeedback({
        message: `🍟 Accompagnant « ${item.name} » validé ! Étape 3 : Choisissez maintenant votre dessert.`,
        type: 'accompagnants'
      });
      setTimeout(() => {
        const el = document.getElementById('menu-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (item.category === 'desserts') {
      if (formulaFinished) {
        setStepFeedback({
          message: `🎉 Formule complète validée (3/3) ! Vous pouvez commander directement.`,
          type: 'complete'
        });
        // Proposer directement de commander
        setTimeout(() => {
          setIsFormulaCompleteModalOpen(true);
        }, 350);
      } else if (!hasFastFood) {
        setSelectedCategory('fastfood');
        setStepFeedback({
          message: `🥤 Dessert « ${item.name} » choisi ! Choisissez maintenant votre Fast-Food (Étape 1).`,
          type: 'desserts'
        });
        setTimeout(() => {
          const el = document.getElementById('menu-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (!hasAccompagnant) {
        setSelectedCategory('accompagnants');
        setStepFeedback({
          message: `🥤 Dessert « ${item.name} » choisi ! Choisissez maintenant votre Accompagnant (Étape 2).`,
          type: 'desserts'
        });
        setTimeout(() => {
          const el = document.getElementById('menu-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Handle Order Confirmation
  const handleConfirmOrder = (studentInfo: StudentInfo) => {
    // Save/update profile
    setStudentProfile(studentInfo);
    localStorage.setItem('esp_student_profile', JSON.stringify(studentInfo));

    const newOrderNumber = `#ESP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const totalSaved = cartItems.reduce((sum, item) => sum + item.menuItem.normalPrice * item.quantity, 0);
    
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('fr-FR')} à ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNumber,
      student: studentInfo,
      items: [...cartItems],
      status: 'confirmed',
      createdAt: formattedDate,
      estimatedDeliveryTime: 'En cours',
      totalSaved,
      qrCodeData: `ESP-VALIDATED-${newOrderNumber}`,
      deliveryAgent: {
        name: 'Ousmane Sarr',
        phone: '+221 78 456 78 90',
        role: 'Livreur Étudiant ESP',
        avatar: '🚲',
        transport: 'Livraison Vélo Express'
      }
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    setCartItems([]);
    setIsCheckoutOpen(false);
    
    // Redirection immédiate vers le reçu officiel avec QR code
    setActiveTab('receipts');
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: DeliveryStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const categories: { id: Category; label: string; icon: any }[] = [
    { id: 'fastfood', label: '1. Fast-Food', icon: Pizza },
    { id: 'accompagnants', label: '2. Accompagnants', icon: Utensils },
    { id: 'desserts', label: '3. Desserts', icon: IceCream },
    { id: 'all', label: 'Tout le Menu', icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-orange-50/80 text-slate-900 font-sans antialiased selection:bg-orange-500 selection:text-white flex flex-col relative overflow-x-hidden">
      {/* 3D Floating Hamburgers and Juices Canvas Background */}
      <ThreeBackground />

      {/* Top Header Navigation */}
      <Header
        cartItemCount={totalCartCount}
        maxAllowed={MAX_FREE_ITEMS}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCart={() => {
          if (activePendingOrder) {
            setIsActiveOrderNoticeOpen(true);
          } else {
            setIsCartOpen(true);
          }
        }}
        hasActiveOrder={!!activePendingOrder}
        studentProfile={studentProfile}
        onOpenProfile={() => setIsRegistrationOpen(true)}
        onResetAsNewUser={handleResetAsNewUser}
      />

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-2.5 sm:px-6 lg:px-8 py-3 sm:py-6 pb-10 sm:pb-14">
        
        {/* VIEW 1: MENU & DISHES */}
        {activeTab === 'menu' && (
          <div className="space-y-4 sm:space-y-8 animate-fade-in">
            {/* Hero Welcome Banner */}
            <HeroBanner
              onExploreMenu={() => {
                const el = document.getElementById('menu-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              cartCount={totalCartCount}
              studentProfile={studentProfile}
              onOpenFlutterModal={() => setIsFlutterModalOpen(true)}
            />

            {/* Active Order Lock Banner */}
            {activePendingOrder && (
              <div className="bg-orange-500 text-white p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl shadow-md border-2 border-orange-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white text-orange-600 font-black flex items-center justify-center shrink-0 shadow-sm">
                    <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] text-yellow-300 font-black uppercase tracking-widest flex items-center gap-1 mb-0.5">
                      <AlertTriangle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Commande Active : {activePendingOrder.orderNumber}</span>
                    </div>
                    <h3 className="font-black text-xs sm:text-base text-white">
                      Vous avez déjà une commande en cours de livraison !
                    </h3>
                    <p className="text-[11px] sm:text-xs text-orange-100 font-medium mt-0.5">
                      Veuillez attendre la livraison ou réinitialiser.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                  <button
                    onClick={() => {
                      setActiveOrder(activePendingOrder);
                      setActiveTab('receipts');
                    }}
                    className="w-full md:w-auto bg-white text-orange-600 hover:bg-orange-50 font-black px-4 py-2.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    Consulter mon reçu officiel →
                  </button>
                </div>
              </div>
            )}

            {/* MOBILE ONLY: Sticky Search & Horizontal Category Pills Bar */}
            <div className="block lg:hidden space-y-2.5 bg-orange-50/95 backdrop-blur-md p-3 rounded-2xl border-2 border-orange-200/80 shadow-xs sticky top-14 z-20">
              {/* Search Bar Mobile */}
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Chercher Tacos, Dibi, Bissap..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-orange-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 font-medium"
                />
              </div>

              {/* Horizontal Scroll Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 -mx-1 px-1">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  const catCount = MENU_ITEMS.filter(item => cat.id === 'all' || item.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider shrink-0 transition-all ${
                        isSelected
                          ? 'bg-orange-500 text-white shadow-xs'
                          : 'bg-white text-slate-700 border border-orange-100 hover:bg-orange-100/50'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-orange-500'}`} />
                      <span>{cat.label}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {catCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* INTERACTIVE 3-STEP FORMULA STEPPER */}
            <FormulaStepper
              currentCategory={selectedCategory}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
              fastFoodItem={fastFoodItem}
              accompagnantItem={accompagnantItem}
              dessertItem={dessertItem}
              onOrderDirectly={() => setIsCheckoutOpen(true)}
              hasActiveOrder={!!activePendingOrder}
            />

            {/* Step Feedback Toast Banner */}
            {stepFeedback && (
              <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-lg border border-orange-400 flex items-center justify-between gap-3 animate-fade-in">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-black">
                  <Sparkles className="w-4 h-4 text-yellow-300 shrink-0" />
                  <span>{stepFeedback.message}</span>
                </div>
                <button
                  onClick={() => setStepFeedback(null)}
                  className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 shrink-0"
                  aria-label="Fermer"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            )}

            {/* Menu Section with Vertical Left Sidebar on Desktop */}
            <div id="menu-section" className="flex flex-col lg:flex-row items-start gap-6">
              
              {/* DESKTOP ONLY: VERTICAL LEFT SIDEBAR */}
              <div className="hidden lg:block w-72 xl:w-80 shrink-0 bg-white p-5 rounded-3xl border-2 border-orange-100 shadow-sm space-y-5 sticky top-20">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-800 flex items-center justify-between">
                    <span>Navigation Menu</span>
                    <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold">
                      {MENU_ITEMS.length} Articles
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">
                    Sélectionnez une catégorie pour filtrer vos 3 articles offerts.
                  </p>
                </div>

                {/* Search Bar Desktop */}
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Chercher Tacos, Dibi, Bissap..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-orange-50/60 border-2 border-orange-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors font-medium"
                  />
                </div>

                {/* Vertical Category List Desktop */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                    Catégories
                  </div>
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.id;
                    const catCount = MENU_ITEMS.filter(item => cat.id === 'all' || item.category === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-black tracking-wide uppercase transition-all ${
                          isSelected
                            ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 translate-x-1'
                            : 'bg-orange-50/60 hover:bg-orange-100/80 text-slate-700 hover:text-slate-900 border border-orange-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-orange-500'}`} />
                          <span>{cat.label}</span>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-orange-200/60 text-orange-800'
                        }`}>
                          {catCount}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Quota Progress & Cart Trigger Widget Desktop */}
                <div className="p-4 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 rounded-2xl text-white space-y-3 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-black text-xs uppercase tracking-wider text-yellow-200">
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                      <span>Formule ESP (3/3)</span>
                    </div>
                    <span className="font-mono font-black text-xs bg-white/20 px-2 py-0.5 rounded-lg text-white">
                      {totalCartCount} / 3
                    </span>
                  </div>

                  {/* 3 Formula Items Status List */}
                  <div className="space-y-1.5 text-[11px] pt-1">
                    <div className="flex items-center justify-between bg-white/10 px-2.5 py-1.5 rounded-xl">
                      <span className="text-orange-100 flex items-center gap-1.5 font-bold">
                        <span>🍔</span>
                        <span>1. Fast-Food</span>
                      </span>
                      <span className="font-bold truncate max-w-[120px] text-yellow-200">
                        {fastFoodItem ? `✓ ${fastFoodItem.menuItem.name}` : 'À choisir'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-white/10 px-2.5 py-1.5 rounded-xl">
                      <span className="text-orange-100 flex items-center gap-1.5 font-bold">
                        <span>🍟</span>
                        <span>2. Accompagnant</span>
                      </span>
                      <span className="font-bold truncate max-w-[120px] text-yellow-200">
                        {accompagnantItem ? `✓ ${accompagnantItem.menuItem.name}` : 'À choisir'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-white/10 px-2.5 py-1.5 rounded-xl">
                      <span className="text-orange-100 flex items-center gap-1.5 font-bold">
                        <span>🥤</span>
                        <span>3. Dessert</span>
                      </span>
                      <span className="font-bold truncate max-w-[120px] text-yellow-200">
                        {dessertItem ? `✓ ${dessertItem.menuItem.name}` : 'À choisir'}
                      </span>
                    </div>
                  </div>

                  {isFormulaComplete ? (
                    <button
                      onClick={() => {
                        if (activePendingOrder) {
                          setIsActiveOrderNoticeOpen(true);
                        } else {
                          setIsCheckoutOpen(true);
                        }
                      }}
                      className="w-full bg-white hover:bg-orange-50 text-orange-600 text-xs font-black py-2.5 px-3 rounded-xl uppercase tracking-wider flex items-center justify-between transition-all active:scale-95 shadow-md"
                    >
                      <span>Commander directement</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : totalCartCount > 0 ? (
                    <button
                      onClick={() => {
                        if (activePendingOrder) {
                          setIsActiveOrderNoticeOpen(true);
                        } else {
                          setIsCartOpen(true);
                        }
                      }}
                      className="w-full bg-slate-900 hover:bg-black text-white text-xs font-black py-2.5 px-3 rounded-xl uppercase tracking-wider flex items-center justify-between transition-all active:scale-95 shadow-sm"
                    >
                      <span>Voir mon panier</span>
                      <span className="text-orange-400 font-bold">0 FCFA →</span>
                    </button>
                  ) : null}
                </div>

                {/* Active Pending Order Widget in Sidebar (if active order exists) */}
                {activePendingOrder && (
                  <div className="p-3.5 bg-amber-50 border-2 border-amber-300 rounded-2xl space-y-2.5 animate-fade-in shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-amber-900 tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                        <span>Livraison en cours</span>
                      </div>
                      <span className="font-mono text-[10px] font-black text-amber-800 bg-white px-2 py-0.5 rounded-md border border-amber-200">
                        {activePendingOrder.orderNumber}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-700 flex items-center justify-between">
                      <span>Livreur : <strong>{activePendingOrder.deliveryAgent.name}</strong></span>
                      <span className="text-base">{activePendingOrder.deliveryAgent.avatar}</span>
                    </div>

                    <button
                      onClick={() => {
                        setActiveOrder(activePendingOrder);
                        setActiveTab('receipts');
                      }}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white text-[11px] font-black py-2 rounded-xl uppercase tracking-wider flex items-center justify-center gap-1 transition-colors"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>Consulter mon reçu officiel →</span>
                    </button>
                  </div>
                )}

                {/* Student Mini Profile in Sidebar */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-orange-500 text-white font-black flex items-center justify-center text-xs shrink-0 shadow-xs">
                      {studentProfile?.fullName ? studentProfile.fullName.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() : 'ESP'}
                    </div>
                    <div className="min-w-0">
                      <div className="font-extrabold text-slate-900 text-xs truncate">
                        {studentProfile?.fullName || 'Étudiant ESP'}
                      </div>
                      <div className="font-mono text-[10px] text-slate-500 truncate">
                        {studentProfile?.studentId || 'ESP-2026'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsRegistrationOpen(true)}
                    className="text-[10px] font-black text-orange-600 hover:text-orange-700 uppercase tracking-wider bg-orange-100/70 hover:bg-orange-100 px-2.5 py-1.5 rounded-lg transition-colors shrink-0"
                  >
                    Profil
                  </button>
                </div>
              </div>

              {/* RIGHT MAIN CONTENT: Grid & Banners */}
              <div className="flex-1 w-full space-y-4 sm:space-y-6">

                {/* Locked Order / Free Limit Callout Bar */}
                {orders.length > 0 || activePendingOrder ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-amber-50 border-2 border-amber-300 p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl text-xs shadow-xs gap-3">
                    <div className="flex items-center gap-2.5 text-amber-950 font-bold">
                      <div className="p-2 rounded-xl bg-amber-200 text-amber-800 shrink-0">
                        <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="text-[11px] sm:text-xs">
                        <span className="font-black text-amber-900 uppercase tracking-wider block text-[11px] sm:text-xs">
                          Commande Validée & Verrouillée
                        </span>
                        Vous avez déjà effectué votre commande unique ({activePendingOrder?.orderNumber || orders[0]?.orderNumber}).
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (activePendingOrder) setActiveOrder(activePendingOrder);
                        setActiveTab('receipts');
                      }}
                      className="bg-orange-600 hover:bg-orange-700 text-white font-black px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl uppercase tracking-wider text-[10px] sm:text-[11px] shrink-0 transition-all shadow-xs active:scale-95 flex items-center gap-1.5"
                    >
                      <Receipt className="w-3.5 h-3.5 text-white" />
                      <span>Consulter Mon Reçu</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-orange-100/90 border-2 border-orange-300 p-3 sm:p-4 rounded-2xl sm:rounded-3xl text-[11px] sm:text-xs shadow-xs">
                    <div className="flex items-center gap-2 text-slate-900 font-extrabold">
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600 shrink-0" />
                      <span>
                        Composez votre menu offert : Choisissez jusqu'à <strong className="text-orange-600 underline">3 articles</strong> au total.
                      </span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 font-mono font-black text-orange-700 bg-white px-3 py-1.5 rounded-2xl border-2 border-orange-200 shadow-xs">
                      <CheckCircle2 className="w-4 h-4 text-orange-500" />
                      <span>Quota : {totalCartCount}/3</span>
                    </div>
                  </div>
                )}

                {/* Filter Results Info Header */}
                <div className="flex items-center justify-between px-1">
                  <h4 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <span>{categories.find(c => c.id === selectedCategory)?.label}</span>
                    <span className="text-[10px] sm:text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                      {filteredMenuItems.length} plat{filteredMenuItems.length > 1 ? 's' : ''}
                    </span>
                  </h4>
                </div>

                {/* Menu Cards Grid */}
                {isMenuLoading ? (
                  <MenuGridSkeleton count={6} />
                ) : filteredMenuItems.length === 0 ? (
                  <div className="text-center py-12 sm:py-16 bg-white rounded-2xl sm:rounded-3xl border-2 border-orange-100 p-6 sm:p-8 shadow-xs">
                    <Utensils className="w-10 h-10 sm:w-12 sm:h-12 text-orange-300 mx-auto mb-3" />
                    <h3 className="text-sm sm:text-base font-black text-slate-800">Aucun plat trouvé</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Essayez de modifier votre recherche ou de changer de catégorie.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-5 lg:gap-6">
                    {filteredMenuItems.map((item) => {
                      const isInCart = cartItems.some(i => i.menuItem.id === item.id);
                      const isCategorySlotFilled = cartItems.some(i => i.menuItem.category === item.category);
                      return (
                        <MenuCard
                          key={item.id}
                          item={item}
                          onSelectItem={(it) => {
                            if (orders.length > 0 || activePendingOrder) {
                              setIsActiveOrderNoticeOpen(true);
                            } else {
                              setModalItem(it);
                            }
                          }}
                          isInCart={isInCart}
                          isCategorySlotFilled={isCategorySlotFilled}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: RECEIPTS & LIVE TRACKING & HISTORY */}
        {activeTab === 'receipts' && (
          <div className="space-y-6 animate-fade-in">
            {/* Navigation Bar inside Receipts Section */}
            <div className="bg-white p-2.5 rounded-3xl border-2 border-orange-100 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setReceiptsSubTab('current')}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                    receiptsSubTab === 'current'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-orange-50/70 text-slate-700 hover:bg-orange-100'
                  }`}
                >
                  <Receipt className="w-4 h-4" />
                  <span>Reçu de la commande en cours</span>
                </button>

                <button
                  onClick={() => setReceiptsSubTab('history')}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                    receiptsSubTab === 'history'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-orange-50/70 text-slate-700 hover:bg-orange-100'
                  }`}
                >
                  <History className="w-4 h-4" />
                  <span>Historique des commandes ({orders.length})</span>
                </button>
              </div>

              {/* Quick selector pill for recent orders */}
              {orders.length > 1 && receiptsSubTab === 'current' && (
                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider hidden sm:inline">
                    Sélecteur :
                  </span>
                  {orders.slice(0, 4).map((ord) => (
                    <button
                      key={ord.id}
                      onClick={() => setActiveOrder(ord)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold transition-all shrink-0 ${
                        activeOrder?.id === ord.id
                          ? 'bg-slate-900 text-orange-400 font-extrabold'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {ord.orderNumber}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* SUB-VIEW 1: ORDER HISTORY VIEW */}
            {receiptsSubTab === 'history' ? (
              <OrderHistoryView
                orders={orders}
                activeOrder={activeOrder}
                onSelectOrder={(selectedOrd) => {
                  setActiveOrder(selectedOrd);
                  setReceiptsSubTab('current');
                }}
                onReorder={handleReorder}
                onBackToMenu={() => setActiveTab('menu')}
                onShowActiveReceipt={() => setReceiptsSubTab('current')}
                onLoadDemoOrders={handleLoadDemoOrders}
              />
            ) : (
              /* SUB-VIEW 2: CURRENT SELECTED RECEIPT */
              activeOrder ? (
                <ReceiptView
                  order={activeOrder}
                  onBackToMenu={() => setActiveTab('menu')}
                  onResetOrder={handleResetOrder}
                  onEditOrder={handleEditPendingOrder}
                  onViewHistory={() => setReceiptsSubTab('history')}
                  studentProfile={studentProfile}
                />
              ) : (
                <div className="text-center py-16 bg-white rounded-3xl border-2 border-orange-100 p-8 shadow-sm">
                  <h3 className="text-base font-black text-slate-800">Aucun reçu disponible</h3>
                  <p className="text-xs text-slate-500 mt-1 mb-4">
                    Passez votre 1ère commande gratuite dans le menu pour obtenir votre reçu numéroté.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => setActiveTab('menu')}
                      className="bg-orange-500 text-white font-black px-5 py-2.5 rounded-2xl text-xs uppercase shadow-md hover:bg-orange-600 transition-colors"
                    >
                      Découvrir le Menu (3 articles gratuits)
                    </button>
                    <button
                      onClick={() => setReceiptsSubTab('history')}
                      className="bg-slate-100 text-slate-800 font-black px-5 py-2.5 rounded-2xl text-xs uppercase hover:bg-slate-200 transition-colors"
                    >
                      Voir l'Historique
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* VIEW 4: ADMIN RESTO & KITCHEN PANEL */}
        {activeTab === 'admin' && (
          <AdminPanel
            orders={orders}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        )}
      </main>

      {/* MODALS & DRAWERS */}
      <StudentRegistrationModal
        isOpen={isRegistrationOpen}
        onSaveProfile={handleSaveStudentProfile}
        currentProfile={studentProfile}
        isEditing={!!studentProfile}
        onCloseEdit={() => setIsRegistrationOpen(false)}
        onResetAsNewUser={handleResetAsNewUser}
      />

      <ActiveOrderNoticeModal
        isOpen={isActiveOrderNoticeOpen}
        onClose={() => setIsActiveOrderNoticeOpen(false)}
        activeOrder={activePendingOrder}
        onViewOrder={() => {
          if (activePendingOrder) {
            setActiveOrder(activePendingOrder);
            setActiveTab('receipts');
          }
        }}
        onResetOrder={handleResetOrder}
      />

      <MenuItemModal
        item={modalItem}
        onClose={() => setModalItem(null)}
        onAddToCart={handleAddToCart}
        isInCart={modalItem ? cartItems.some(i => i.menuItem.id === modalItem.id) : false}
        cartCount={totalCartCount}
        maxAllowed={MAX_FREE_ITEMS}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        maxAllowed={MAX_FREE_ITEMS}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* Formula Completion Propose Direct Order Modal */}
      <FormulaCompletionModal
        isOpen={isFormulaCompleteModalOpen}
        onClose={() => setIsFormulaCompleteModalOpen(false)}
        fastFood={fastFoodItem}
        accompagnant={accompagnantItem}
        dessert={dessertItem}
        onProceedToCheckout={() => {
          setIsFormulaCompleteModalOpen(false);
          setIsCheckoutOpen(true);
        }}
        onModifyChoices={() => {
          setIsFormulaCompleteModalOpen(false);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onConfirmOrder={handleConfirmOrder}
        studentProfile={studentProfile}
        onEditCart={() => {
          setIsCheckoutOpen(false);
          setIsCartOpen(true);
        }}
      />

      <QuotaNoticeModal
        isOpen={isQuotaNoticeOpen}
        onClose={() => setIsQuotaNoticeOpen(false)}
        onOpenCart={() => setIsCartOpen(true)}
        maxAllowed={MAX_FREE_ITEMS}
      />

      {/* Flutter Mobile Export Modal */}
      <FlutterExportModal
        isOpen={isFlutterModalOpen}
        onClose={() => setIsFlutterModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t-2 border-orange-200/60 bg-orange-100/50 py-8 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-orange-200/60 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-black text-orange-600 text-sm italic">ESP EATS</span>
              <span>• École Supérieure Polytechnique de Dakar (UCAD)</span>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-700">
              <button
                onClick={() => setIsRegistrationOpen(true)}
                className="hover:text-orange-600 transition-colors flex items-center gap-1"
              >
                <span>👤 Profil Étudiant</span>
              </button>
              <button
                onClick={() => setActiveTab('menu')}
                className="hover:text-orange-600 transition-colors flex items-center gap-1"
              >
                <span>🍽️ Menu Campus</span>
              </button>
              <button
                onClick={() => setActiveTab('receipts')}
                className="hover:text-orange-600 transition-colors flex items-center gap-1"
              >
                <span>🧾 Mes Reçus</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500">
            <div>
              Livraison assurée dans tous les pavillons (A, B, C), Fann Résidence & départements de l'ESP.
            </div>
            <div className="font-bold uppercase tracking-widest text-slate-400">
              © 2026 Ecole Supérieure Polytechnique — Service de Restauration
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

