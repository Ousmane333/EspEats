export type Category = 'all' | 'plats' | 'fastfood' | 'boissons' | 'desserts';

export interface CustomOption {
  name: string;
  choices: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  description: string;
  normalPrice: number; // in FCFA (e.g. 2500)
  isFreeForNewStudents: boolean;
  image: string;
  prepTime: string;
  calories?: string;
  spicyLevel?: 'none' | 'mild' | 'spicy';
  tags: string[];
  options?: CustomOption[];
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: Record<string, string>;
  specialInstructions?: string;
}

export interface StudentInfo {
  fullName: string;
  email: string; // e.g. etudiant@esp.sn
  studentId: string; // e.g. ESP-2026-4821
  department: string; // e.g. Génie Informatique
  level: string; // e.g. DUT 1er Année
  phone: string; // e.g. +221 77 123 45 67
  deliveryLocation: string; // e.g. Pavillon A
  roomNumberOrDetails: string; // e.g. Chambre 104, 1er Étage
}

export type DeliveryStatus = 'confirmed' | 'preparing' | 'delivering' | 'delivered';

export interface DeliveryAgent {
  name: string;
  phone: string;
  role: string;
  avatar: string;
  transport: string; // e.g. Vélo Express Campus / À Pied
}

export interface Order {
  id: string;
  orderNumber: string;
  student: StudentInfo;
  items: CartItem[];
  status: DeliveryStatus;
  createdAt: string;
  estimatedDeliveryTime?: string;
  totalSaved: number;
  qrCodeData: string;
  deliveryAgent: DeliveryAgent;
}

export interface CampusLocation {
  id: string;
  name: string;
  type: 'pavillon' | 'departement' | 'amphi' | 'service';
  description: string;
}
