import React, { useState } from 'react';
import { X, Copy, Check, Smartphone, Download, Code, Sparkles, Layers, Terminal } from 'lucide-react';

interface FlutterExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlutterExportModal: React.FC<FlutterExportModalProps> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeFileTab, setActiveFileTab] = useState<'main' | 'theme' | 'models' | 'pubspec'>('main');

  if (!isOpen) return null;

  const FLUTTER_DART_MAIN = `import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
  runApp(const EspEatsApp());
}

/// ESP EATS - Official Campus Resto Mobile Client (Flutter Material 3)
class EspEatsApp extends StatelessWidget {
  const EspEatsApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ESP Eats - Resto Campus Dakar',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFF97316), // ESP Orange Primary
          primary: const Color(0xFFF97316),
          secondary: const Color(0xFF1E293B), // Slate 800
          background: const Color(0xFFFFFBEB), // Warm light canvas
        ),
        fontFamily: 'Roboto',
      ),
      home: const MainHomeScreen(),
    );
  }
}

class MainHomeScreen extends StatefulWidget {
  const MainHomeScreen({super.key});

  @override
  State<MainHomeScreen> createState() => _MainHomeScreenState();
}

class _MainHomeScreenState extends State<MainHomeScreen> {
  int _currentIndex = 0;
  int _cartItemCount = 2;
  final int _maxQuota = 3;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFFF97316),
        elevation: 2,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Text(
                'E',
                style: TextStyle(
                  color: Color(0xFFF97316),
                  fontWeight: FontWeight.bold,
                  fontSize: 20,
                ),
              ),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text(
                  'ESP EATS',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.black,
                    fontSize: 18,
                  ),
                ),
                Text(
                  'Campus Resto Dakar (Pass 100% Offert)',
                  style: TextStyle(
                    color: Colors.white70,
                    fontSize: 10,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: Badge(
              label: Text('\$_cartItemCount/\$_maxQuota'),
              child: const Icon(Icons.shopping_bag_outlined, color: Colors.white),
            ),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Ouverture du panier mobile...')),
              );
            },
          ),
        ],
      ),
      body: IndexedStack(
        index: _currentIndex,
        children: const [
          MenuTabScreen(),
          ReceiptsTabScreen(),
          PassTabScreen(),
          AdminTabScreen(),
        ],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (idx) {
          setState(() {
            _currentIndex = idx;
          });
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.restaurant_menu),
            label: 'Menu ESP',
          ),
          NavigationDestination(
            icon: Icon(Icons.receipt_long),
            label: 'Mes Reçus',
          ),
          NavigationDestination(
            icon: Icon(Icons.card_membership),
            label: 'Pass ESP',
          ),
          NavigationDestination(
            icon: Icon(Icons.admin_panel_settings),
            label: 'Resto BDE',
          ),
        ],
      ),
    );
  }
}

class MenuTabScreen extends StatelessWidget {
  const MenuTabScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          color: const Color(0xFF1E293B),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text(
                  '🌟 Pass Étudiant ESP Actif',
                  style: TextStyle(color: Color(0xFFF97316), fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 6),
                Text(
                  '3 articles gratuits offerts aujourd\'hui sur tout le menu du campus !',
                  style: TextStyle(color: Colors.white, fontSize: 13),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        const Text(
          'Plats du Jour',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 10),
        _buildFoodCard('Thieboudienne Penda Mbaye', 'Riz au poisson rouge thièbe', '0 FCFA'),
        _buildFoodCard('Yassa Poulet Rôti', 'Poulet mariné aux oignons & citron', '0 FCFA'),
        _buildFoodCard('Jus de Bissap Glacé', 'Boisson traditionnelle 100% naturelle', '0 FCFA'),
      ],
    );
  }

  Widget _buildFoodCard(String name, String desc, String price) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: ListTile(
        contentPadding: const EdgeInsets.all(12),
        leading: Container(
          width: 50,
          height: 50,
          decoration: BoxDecoration(
            color: Colors.orange.shade100,
            borderRadius: BorderRadius.circular(12),
          ),
          child: const Icon(Icons.fastfood, color: Color(0xFFF97316)),
        ),
        title: Text(name, style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(desc, style: const TextStyle(fontSize: 12)),
        trailing: ElevatedButton(
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFFF97316),
            foregroundColor: Colors.white,
          ),
          onPressed: () {},
          child: const Text('Ajouter'),
        ),
      ),
    );
  }
}

class ReceiptsTabScreen extends StatelessWidget {
  const ReceiptsTabScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: const [
          Icon(Icons.qr_code_2, size: 80, color: Color(0xFFF97316)),
          SizedBox(height: 10),
          Text('Commande #ESP-2026-8831', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
          Text('Statut : En livraison vers Pavillon B, Chambre 22G', style: TextStyle(color: Colors.grey)),
        ],
      ),
    );
  }
}

class PassTabScreen extends StatelessWidget {
  const PassTabScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(child: Text('Carte Étudiant Digitale ESP'));
  }
}

class AdminTabScreen extends StatelessWidget {
  const AdminTabScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(child: Text('Gestion Cuisine & Livraisons Resto ESP'));
  }
}
`;

  const FLUTTER_PUBSPEC = `name: esp_eats_mobile
description: "Application Mobile Native Flutter - Resto Campus ESP Dakar"
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.6
  google_fonts: ^6.1.0
  qr_flutter: ^4.1.0
  provider: ^6.1.1
  shared_preferences: ^2.2.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
`;

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const getActiveCode = () => {
    switch (activeFileTab) {
      case 'main':
        return FLUTTER_DART_MAIN;
      case 'pubspec':
        return FLUTTER_PUBSPEC;
      case 'theme':
        return `// Flutter Theme Configuration
import 'package:flutter/material.dart';

class EspTheme {
  static const Color primaryOrange = Color(0xFFF97316);
  static const Color darkSlate = Color(0xFF0F172A);
  static const Color accentGold = Color(0xFFF59E0B);

  static ThemeData get lightTheme => ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: primaryOrange,
      primary: primaryOrange,
      surfaceTint: Colors.white,
    ),
  );
}`;
      case 'models':
        return `// Order & Student Flutter Data Models
class EspStudent {
  final String fullName;
  final String email;
  final String studentId;
  final String department;
  final String level;
  final String phone;
  final String deliveryLocation;
  final String roomNumberOrDetails;

  EspStudent({
    required this.fullName,
    required this.email,
    required this.studentId,
    required this.department,
    required this.level,
    required this.phone,
    required this.deliveryLocation,
    required this.roomNumberOrDetails,
  });
}`;
      default:
        return FLUTTER_DART_MAIN;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border-2 border-cyan-500/40 text-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 p-5 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-inner">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white tracking-tight">
                  Flutter App Mobile (iOS & Android)
                </h2>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-cyan-500/40 uppercase">
                  Flutter 3.x
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                Code Dart natif prêt pour compilation APK Android & Xcode iOS
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-cyan-950/50 px-5 py-3 border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-cyan-200">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              Interface optimisée Flutter Material 3 avec navigation bottom bar, suivi en direct et pass étudiant.
            </span>
          </div>

          <button
            onClick={() => copyToClipboard(getActiveCode(), activeFileTab)}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-4 py-1.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shrink-0"
          >
            {copiedSection === activeFileTab ? (
              <>
                <Check className="w-4 h-4 text-slate-950" />
                <span>Copié !</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copier le Code Dart</span>
              </>
            )}
          </button>
        </div>

        {/* Code View Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* File Selector Sidebar */}
          <div className="w-full md:w-56 bg-slate-950 border-r border-slate-800 p-3 space-y-1.5 shrink-0">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 py-1">
              Fichiers Flutter
            </div>

            <button
              onClick={() => setActiveFileTab('main')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                activeFileTab === 'main'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span>lib/main.dart</span>
            </button>

            <button
              onClick={() => setActiveFileTab('theme')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                activeFileTab === 'theme'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>lib/theme.dart</span>
            </button>

            <button
              onClick={() => setActiveFileTab('models')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                activeFileTab === 'models'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>lib/models.dart</span>
            </button>

            <button
              onClick={() => setActiveFileTab('pubspec')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                activeFileTab === 'pubspec'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>pubspec.yaml</span>
            </button>
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 bg-slate-950 p-4 overflow-auto font-mono text-xs text-cyan-200/90 select-all leading-relaxed">
            <pre className="whitespace-pre-wrap">{getActiveCode()}</pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <span>Exécutez <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">flutter run</code> dans Android Studio ou VS Code.</span>
          </div>

          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
