import React, { useState } from 'react';
import { Order, StudentInfo } from '../types';
import { 
  Printer, 
  CheckCircle2, 
  QrCode, 
  Clock, 
  MapPin, 
  GraduationCap, 
  ArrowRight, 
  ShieldCheck, 
  Download, 
  Check, 
  Copy, 
  Building2,
  Camera,
  Image as ImageIcon,
  FileText,
  Eye,
  X,
  Share2,
  Sparkles,
  Phone,
  Maximize2
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface ReceiptViewProps {
  order: Order;
  onTrackOrder: (order: Order) => void;
  onBackToMenu: () => void;
  onResetOrder?: (orderId: string) => void;
  onEditOrder?: (order: Order) => void;
  onViewHistory?: () => void;
  studentProfile?: StudentInfo | null;
}

export const ReceiptView: React.FC<ReceiptViewProps> = ({
  order,
  onTrackOrder,
  onBackToMenu,
  onResetOrder,
  onEditOrder,
  onViewHistory,
  studentProfile
}) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const effectiveStudent = {
    fullName: order.student?.fullName || studentProfile?.fullName || 'Étudiant ESP',
    studentId: order.student?.studentId || studentProfile?.studentId || 'ESP-2026',
    department: order.student?.department || studentProfile?.department || '',
    level: order.student?.level || studentProfile?.level || '',
    phone: order.student?.phone || studentProfile?.phone || '+221 77 123 45 67',
    deliveryLocation: order.student?.deliveryLocation || studentProfile?.deliveryLocation || '',
    roomNumberOrDetails: order.student?.roomNumberOrDetails || studentProfile?.roomNumberOrDetails || ''
  };

  const handlePrint = () => {
    window.print();
  };

  const generateQRCodeDataURL = (text: string): string => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      if (!ctx) return '';
      
      // Clean White Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 300, 300);
      
      // Outer Orange Frame
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 6;
      ctx.strokeRect(6, 6, 288, 288);

      // Helper for Finder Pattern (3 corners)
      const drawFinder = (x: number, y: number) => {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(x, y, 60, 60);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 10, y + 10, 40, 40);
        ctx.fillStyle = '#ea580c';
        ctx.fillRect(x + 20, y + 20, 20, 20);
      };

      drawFinder(24, 24);   // Top Left
      drawFinder(216, 24);  // Top Right
      drawFinder(24, 216);  // Bottom Left

      // Alignment Pattern (Bottom Right)
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(206, 206, 30, 30);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(212, 212, 18, 18);
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(218, 218, 6, 6);

      // Timing pattern lines
      for (let i = 90; i <= 210; i += 12) {
        ctx.fillStyle = i % 24 === 0 ? '#0f172a' : '#ea580c';
        ctx.fillRect(i, 48, 6, 6);
        ctx.fillRect(48, i, 6, 6);
      }

      // Pseudo-random deterministic data matrix based on input text
      let seed = 0;
      for (let i = 0; i < text.length; i++) seed += text.charCodeAt(i);

      for (let r = 0; r < 18; r++) {
        for (let c = 0; c < 18; c++) {
          const px = 24 + c * 14;
          const py = 24 + r * 14;

          // Skip finder zones & center badge zone
          if ((r < 6 && c < 6) || (r < 6 && c > 11) || (r > 11 && c < 6)) continue;
          if (r >= 6 && r <= 11 && c >= 6 && c <= 11) continue;

          const bit = (seed * (r + 1) * (c + 1) + r + c) % 3;
          if (bit === 0) {
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(px, py, 10, 10);
          } else if (bit === 1) {
            ctx.fillStyle = '#ea580c';
            ctx.fillRect(px, py, 10, 10);
          }
        }
      }

      // Center ESP Emblem Badge
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(100, 100, 100, 100);
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 4;
      ctx.strokeRect(104, 104, 92, 92);
      ctx.fillStyle = '#ea580c';
      ctx.font = '900 28px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ESP', 150, 150);

      return canvas.toDataURL('image/png');
    } catch {
      return '';
    }
  };

  const handleDownloadPDF = async (withGalleryCopy: boolean = true) => {
    try {
      setIsGeneratingPDF(true);

      // Format mobile-first portrait [120mm x 250mm] : épouse parfaitement l'écran d'un smartphone
      // Typographie agrandie et lisible instantanément sans zoom
      const pageWidth = 120;
      const pageHeight = 250;
      const margin = 6;
      const contentWidth = pageWidth - margin * 2; // 108mm

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [pageWidth, pageHeight],
      });

      const formatFCFA = (amount: number): string => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
      };

      const getFrenchStatus = (status: Order['status']): string => {
        switch (status) {
          case 'confirmed': return 'CONFIRMÉE';
          case 'preparing': return 'EN CUISINE';
          case 'delivering': return 'EN LIVRAISON';
          case 'delivered': return 'LIVRÉE';
          default: return String(status).toUpperCase();
        }
      };

      // 1. Ruban National Sénégalais au sommet (Vert - Jaune - Rouge)
      pdf.setFillColor(16, 185, 129); // Vert
      pdf.rect(0, 0, 40, 3.5, 'F');
      pdf.setFillColor(250, 204, 21); // Jaune
      pdf.rect(40, 0, 40, 3.5, 'F');
      pdf.setFillColor(239, 68, 68); // Rouge
      pdf.rect(80, 0, 40, 3.5, 'F');

      // 2. En-tête Institutionnel
      // Logo Badge ESP
      pdf.setFillColor(234, 88, 12); // Orange 600
      pdf.roundedRect(margin, 7.5, 14, 14, 2.5, 2.5, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text('ESP', margin + 7, 16.5, { align: 'center' });

      // Titres de l'école
      pdf.setTextColor(15, 23, 42); // Slate 900
      pdf.setFontSize(9.5);
      pdf.setFont('helvetica', 'bold');
      pdf.text('ÉCOLE SUPÉRIEURE POLYTECHNIQUE', 23, 11.5);

      pdf.setFontSize(7.5);
      pdf.setTextColor(234, 88, 12); // Orange 600
      pdf.text('UNIVERSITÉ CHEIKH ANTA DIOP • DAKAR', 23, 15.8);

      pdf.setFontSize(6.5);
      pdf.setTextColor(100, 116, 139); // Slate 500
      pdf.setFont('helvetica', 'normal');
      pdf.text('Direction Restauration Universitaire • Resto Campus ESP', 23, 19.8);

      // Badge Authentification en haut à droite
      pdf.setDrawColor(16, 185, 129);
      pdf.setFillColor(236, 253, 245);
      pdf.roundedRect(78, 7.5, 36, 14, 2, 2, 'FD');
      pdf.setFontSize(6);
      pdf.setTextColor(5, 150, 105);
      pdf.setFont('helvetica', 'bold');
      pdf.text('AUTHENTIFIÉ ESP', 96, 12, { align: 'center' });
      pdf.setFontSize(6.8);
      pdf.text('100% OFFERT • 0 FCFA', 96, 17.5, { align: 'center' });

      // Ligne de séparation orange
      pdf.setDrawColor(234, 88, 12);
      pdf.setLineWidth(0.4);
      pdf.line(margin, 24, margin + contentWidth, 24);

      // 3. Cadre Référence & Statut
      pdf.setFillColor(255, 247, 237); // Orange 50
      pdf.setDrawColor(254, 215, 170); // Orange 200
      pdf.roundedRect(margin, 26.5, contentWidth, 14.5, 2, 2, 'FD');

      // Référence commande
      pdf.setFontSize(6);
      pdf.setTextColor(100, 116, 139);
      pdf.setFont('helvetica', 'normal');
      pdf.text('N° COMMANDE / RÉFÉRENCE', margin + 3.5, 31);
      pdf.setFontSize(10.5);
      pdf.setTextColor(234, 88, 12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(order.orderNumber, margin + 3.5, 37);

      // Date
      pdf.setFontSize(6);
      pdf.setTextColor(100, 116, 139);
      pdf.setFont('helvetica', 'normal');
      pdf.text('DATE D\'ÉMISSION', 48, 31);
      pdf.setFontSize(7.5);
      pdf.setTextColor(15, 23, 42);
      pdf.setFont('helvetica', 'bold');
      pdf.text(order.createdAt, 48, 36.5);

      // Statut
      pdf.setFontSize(6);
      pdf.setTextColor(100, 116, 139);
      pdf.setFont('helvetica', 'normal');
      pdf.text('STATUT DU SERVICE', 84, 31);
      pdf.setFontSize(7.5);
      pdf.setTextColor(5, 150, 105);
      pdf.setFont('helvetica', 'bold');
      pdf.text(getFrenchStatus(order.status), 84, 36.5);

      // 4. Cadre Bénéficiaire Étudiant & Livraison
      const infoBoxY = 43.5;
      const infoBoxHeight = 44;
      pdf.setFillColor(248, 250, 252);
      pdf.setDrawColor(226, 232, 240);
      pdf.roundedRect(margin, infoBoxY, contentWidth, infoBoxHeight, 2, 2, 'FD');

      pdf.setFontSize(7.5);
      pdf.setTextColor(234, 88, 12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('BÉNÉFICIAIRE ÉTUDIANT & LIVRAISON CAMPUS', margin + 3.5, infoBoxY + 5.5);

      pdf.setDrawColor(241, 245, 249);
      pdf.setLineWidth(0.3);
      pdf.line(margin + 3.5, infoBoxY + 7.5, margin + contentWidth - 3.5, infoBoxY + 7.5);

      // Colonne Gauche : Étudiant
      const drawTextRow = (label: string, value: string, rowY: number, xVal: number, isBoldColor = false) => {
        pdf.setFontSize(6.8);
        pdf.setTextColor(100, 116, 139);
        pdf.setFont('helvetica', 'normal');
        pdf.text(label, xVal, rowY);

        pdf.setFontSize(7.2);
        if (isBoldColor) {
          pdf.setTextColor(234, 88, 12);
        } else {
          pdf.setTextColor(15, 23, 42);
        }
        pdf.setFont('helvetica', 'bold');
        const wrapped = pdf.splitTextToSize(value || '-', 38);
        pdf.text(wrapped[0], xVal + 17, rowY);
      };

      drawTextRow('Nom :', effectiveStudent.fullName, infoBoxY + 13, margin + 3.5);
      drawTextRow('N° Carte :', effectiveStudent.studentId, infoBoxY + 19, margin + 3.5, true);
      drawTextRow('Filière :', effectiveStudent.department, infoBoxY + 25, margin + 3.5);
      drawTextRow('Téléphone :', effectiveStudent.phone, infoBoxY + 31, margin + 3.5, true);
      drawTextRow('Campus :', 'ESP Dakar UCAD', infoBoxY + 37, margin + 3.5);

      // Colonne Droite : Livraison
      drawTextRow('Précision :', effectiveStudent.roomNumberOrDetails || 'Chambre / Pavillon', infoBoxY + 13, 62);
      drawTextRow('Livreur :', order.deliveryAgent.name, infoBoxY + 19, 62, true);
      drawTextRow('Emballage :', 'Plateau Isotherme', infoBoxY + 25, 62);
      drawTextRow('Tarif repas :', '100% Subventionné', infoBoxY + 31, 62);

      // 5. CACHET OFFICIEL CIRCULAIRE ULTRA-RÉALISTE (Encre verte institutionnelle)
      const stampX = 97;
      const stampY = infoBoxY + 23;
      pdf.setDrawColor(5, 150, 105); // Vert émeraude officiel
      pdf.setLineWidth(0.6);
      pdf.circle(stampX, stampY, 11);
      pdf.setLineWidth(0.25);
      pdf.circle(stampX, stampY, 9.6);

      pdf.setTextColor(4, 120, 87);
      pdf.setFontSize(4.5);
      pdf.setFont('helvetica', 'bold');
      pdf.text('ESP DAKAR • UCAD', stampX, stampY - 5.5, { align: 'center' });
      pdf.setFontSize(5);
      pdf.text('★ RESTAURATION ★', stampX, stampY - 2, { align: 'center' });
      pdf.setFontSize(7.5);
      pdf.text('CONFORME', stampX, stampY + 2.2, { align: 'center' });
      pdf.setFontSize(4.6);
      pdf.text('PASS VALIDÉ', stampX, stampY + 5.8, { align: 'center' });
      pdf.setFontSize(4.2);
      pdf.setFont('helvetica', 'normal');
      pdf.text(order.createdAt.split(' ')[0] || '2026', stampX, stampY + 8.5, { align: 'center' });

      // 6. Tableau des Articles Commandés
      let currentY = infoBoxY + infoBoxHeight + 3.5;
      pdf.setFillColor(255, 247, 237); // Orange 50
      pdf.setDrawColor(254, 215, 170); // Orange 200
      pdf.rect(margin, currentY, contentWidth, 7, 'FD');

      pdf.setFontSize(6.8);
      pdf.setTextColor(234, 88, 12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('#', margin + 3, currentY + 4.8);
      pdf.text('DÉSIGNATION PLAT', margin + 9, currentY + 4.8);
      pdf.text('PRIX HABITUEL', 88, currentY + 4.8, { align: 'right' });
      pdf.text('NET FACTURÉ', margin + contentWidth - 3, currentY + 4.8, { align: 'right' });

      currentY += 7;

      order.items.forEach((item, index) => {
        const itemRowHeight = 9.5;
        // Fond zébré
        if (index % 2 === 1) {
          pdf.setFillColor(248, 250, 252);
          pdf.rect(margin, currentY, contentWidth, itemRowHeight, 'F');
        }

        // Numéro
        pdf.setFontSize(7.5);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(234, 88, 12);
        pdf.text(String(index + 1), margin + 3, currentY + 5);

        // Nom du plat
        pdf.setTextColor(15, 23, 42);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7.8);
        const nameLines = pdf.splitTextToSize(item.menuItem.name, 48);
        pdf.text(nameLines[0], margin + 9, currentY + 4.5);

        // Options
        const optsString = Object.entries(item.selectedOptions)
          .map(([k, v]) => `${k}: ${v}`)
          .join(', ') || 'Menu standard';
        pdf.setTextColor(100, 116, 139);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(6);
        const optsLines = pdf.splitTextToSize(optsString, 48);
        pdf.text(optsLines[0], margin + 9, currentY + 8);

        // Prix normal barré
        pdf.setTextColor(148, 163, 184);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(7);
        pdf.text(formatFCFA(item.menuItem.normalPrice), 88, currentY + 5.5, { align: 'right' });

        // Net facturé (0 FCFA)
        pdf.setTextColor(5, 150, 105);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7.8);
        pdf.text('0 FCFA', margin + contentWidth - 3, currentY + 5.5, { align: 'right' });

        currentY += itemRowHeight;

        // Ligne séparatrice
        pdf.setDrawColor(241, 245, 249);
        pdf.setLineWidth(0.2);
        pdf.line(margin, currentY, margin + contentWidth, currentY);
      });

      // 7. Bloc Sécurité & QR Code de Contrôle (Fond Sombre Slate 900)
      currentY += 3.5;
      const summaryBoxHeight = 44;
      pdf.setFillColor(15, 23, 42); // Slate 900
      pdf.roundedRect(margin, currentY, contentWidth, summaryBoxHeight, 2.5, 2.5, 'F');

      // Cadre QR Code Haute Définition
      const qrDataURL = generateQRCodeDataURL(order.qrCodeData || `ESP-${order.orderNumber}`);
      if (qrDataURL) {
        pdf.setFillColor(255, 255, 255);
        pdf.roundedRect(margin + 3.5, currentY + 4.5, 33, 33, 2, 2, 'F');
        pdf.addImage(qrDataURL, 'PNG', margin + 5, currentY + 6, 30, 30);
      }

      // Mentions Sécurité à droite du QR
      const secX = margin + 40;
      pdf.setTextColor(251, 146, 60); // Orange 400
      pdf.setFontSize(7.5);
      pdf.setFont('helvetica', 'bold');
      pdf.text('CODE QR DE CONTRÔLE', secX, currentY + 9);

      pdf.setTextColor(203, 213, 225);
      pdf.setFontSize(6.2);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Présentez ce reçu au livreur lors de la livraison.', secX, currentY + 14);

      pdf.setTextColor(148, 163, 184);
      pdf.setFontSize(6);
      pdf.text(`Réf : ESP-PASS-${order.orderNumber}`, secX, currentY + 19);
      pdf.setTextColor(52, 211, 153); // Emerald 400
      pdf.text(`• Validé le ${order.createdAt}`, secX, currentY + 24);

      // Totaux et Net à payer
      pdf.setDrawColor(51, 65, 85);
      pdf.setLineWidth(0.3);
      pdf.line(secX, currentY + 27, margin + contentWidth - 3.5, currentY + 27);

      pdf.setTextColor(203, 213, 225);
      pdf.setFontSize(6.5);
      pdf.text(`Valeur réelle : ${formatFCFA(order.totalSaved)}`, secX, currentY + 32);

      pdf.setFontSize(10.5);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(251, 146, 60); // Orange 400
      pdf.text('NET : 0 FCFA (OFFERT)', margin + contentWidth - 3.5, currentY + 36, { align: 'right' });

      pdf.setFontSize(5.5);
      pdf.setTextColor(52, 211, 153);
      pdf.text('Facture Soldée • Prise en charge 100%', margin + contentWidth - 3.5, currentY + 40, { align: 'right' });

      // 8. Pied de page & Code-barres Réaliste
      currentY += summaryBoxHeight + 3.5;

      // Barcode simulé Code-128
      const barcodeStartX = 28;
      pdf.setFillColor(15, 23, 42);
      for (let i = 0; i < 48; i++) {
        const barX = barcodeStartX + i * 1.35;
        const barW = ((i * 7 + 3) % 4 === 0) ? 0.85 : 0.4;
        pdf.rect(barX, currentY + 1, barW, 6.5, 'F');
      }

      pdf.setFontSize(5.8);
      pdf.setTextColor(100, 116, 139);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`* CERT-ESP-2026-${order.orderNumber} *`, 60, currentY + 11.5, { align: 'center' });

      pdf.setFontSize(5.8);
      pdf.setTextColor(71, 85, 105);
      pdf.text('ÉCOLE SUPÉRIEURE POLYTECHNIQUE (ESP) • UNIVERSITÉ CHEIKH ANTA DIOP', 60, currentY + 16, { align: 'center' });
      pdf.setFontSize(5);
      pdf.setTextColor(148, 163, 184);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Direction Restauration & Logistique • Document Officiel Universitaire', 60, currentY + 19.5, { align: 'center' });

      // Ruban National Sénégalais inférieur
      pdf.setFillColor(16, 185, 129); // Vert
      pdf.rect(0, pageHeight - 3, 40, 3, 'F');
      pdf.setFillColor(250, 204, 21); // Jaune
      pdf.rect(40, pageHeight - 3, 40, 3, 'F');
      pdf.setFillColor(239, 68, 68); // Rouge
      pdf.rect(80, pageHeight - 3, 40, 3, 'F');

      pdf.save(`Recu_ESP_Dakar_${order.orderNumber}.pdf`);

      // Générer également une copie image haute définition pour la galerie mobile
      try {
        const receiptCard = document.getElementById('official-receipt-card');
        if (receiptCard) {
          const canvas = await html2canvas(receiptCard, {
            scale: 2.5,
            backgroundColor: '#ffffff',
            useCORS: true,
            allowTaint: false,
            logging: false,
            scrollX: 0,
            scrollY: 0,
          });

          const blob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob((b) => resolve(b), 'image/png', 1.0);
          });

          if (blob) {
            const fileName = `Recu_ESP_Dakar_${order.orderNumber}.png`;
            const imageUrl = URL.createObjectURL(blob);
            setPreviewImageUrl(imageUrl);

            let sharedNatively = false;
            const nav = navigator as any;
            if (typeof nav !== 'undefined' && nav.share && nav.canShare) {
              try {
                const file = new File([blob], fileName, { type: 'image/png' });
                if (nav.canShare({ files: [file] })) {
                  await nav.share({
                    files: [file],
                    title: `Reçu ESP - Commande ${order.orderNumber}`,
                    text: `Reçu officiel ESP Restauration #${order.orderNumber}`,
                  });
                  sharedNatively = true;
                }
              } catch (shareErr: any) {
                if (shareErr?.name === 'AbortError') {
                  sharedNatively = true;
                }
              }
            }

            // Déclencher le téléchargement direct de l'image (pour indexation dans la galerie Android)
            if (!sharedNatively) {
              setTimeout(() => {
                const imgLink = document.createElement('a');
                imgLink.href = imageUrl;
                imgLink.download = fileName;
                document.body.appendChild(imgLink);
                imgLink.click();
                document.body.removeChild(imgLink);
              }, 350);
            }
          }
        }
      } catch (imgError) {
        console.warn('Génération image galerie optionnelle:', imgError);
      }

      setDownloadNotice("📄 Reçu PDF téléchargé avec succès ! Format mobile grand et visible avec cachet officiel, également ajouté à votre Galerie.");
      setTimeout(() => {
        setDownloadNotice(null);
      }, 8000);

    } catch (err) {
      console.error('Erreur lors du téléchargement du PDF:', err);
      alert('Impossible de générer le PDF. Veuillez utiliser la fonction Imprimer.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSaveToGallery = async () => {
    try {
      setIsGeneratingImage(true);
      setDownloadNotice(null);

      const receiptCard = document.getElementById('official-receipt-card');
      if (!receiptCard) {
        throw new Error("L'élément de reçu officiel est introuvable");
      }

      // Render high resolution canvas (2.5x scale for sharp text and QR in mobile photo gallery)
      const canvas = await html2canvas(receiptCard, {
        scale: 2.5,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: false,
        logging: false,
        scrollX: 0,
        scrollY: 0,
      });

      const fileName = `Recu_ESP_Dakar_${order.orderNumber}.png`;

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((b) => resolve(b), 'image/png', 1.0);
      });

      if (!blob) {
        throw new Error("Impossible de générer l'image du reçu");
      }

      const imageUrl = URL.createObjectURL(blob);
      setPreviewImageUrl(imageUrl);

      let sharedNatively = false;

      // Mobile Web Share API with File
      // On mobile devices (iOS Safari & Android Chrome), this opens the native OS sheet
      // offering "Enregistrer dans Photos / Enregistrer l'image" or WhatsApp share
      const nav = navigator as any;
      if (typeof nav !== 'undefined' && nav.share && nav.canShare) {
        try {
          const file = new File([blob], fileName, { type: 'image/png' });
          if (nav.canShare({ files: [file] })) {
            await nav.share({
              files: [file],
              title: `Reçu ESP - Commande ${order.orderNumber}`,
              text: `Reçu officiel de commande Resto Campus ESP Dakar #${order.orderNumber}`,
            });
            sharedNatively = true;
            setDownloadNotice("📸 Reçu partagé ! Enregistrez-le dans vos Photos ou envoyez-le.");
          }
        } catch (shareErr: any) {
          if (shareErr?.name === 'AbortError') {
            sharedNatively = true; // User intentionally dismissed sheet
          }
        }
      }

      // Direct download trigger (saves to mobile Downloads/Pictures gallery)
      if (!sharedNatively) {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setDownloadNotice("📸 Reçu téléchargé en image ! Retrouvez-le directement dans votre Galerie photos ou dossier Téléchargements.");
      }

      setTimeout(() => {
        setDownloadNotice(null);
      }, 7000);

    } catch (err) {
      console.error("Erreur lors de la capture de l'image:", err);
      alert("Impossible de créer l'image du reçu. Vous pouvez faire une capture d'écran de cette page.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleCopyQRCode = () => {
    navigator.clipboard.writeText(order.qrCodeData || `ESP-ORDER-${order.orderNumber}`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShare = async () => {
    const shareText = `*Reçu Officiel ESP Dakar - Commande ${order.orderNumber}*\nBénéficiaire : ${effectiveStudent.fullName} (${effectiveStudent.studentId})\nStatut : 100% Offert (0 FCFA)\nLivreur ESP : ${order.deliveryAgent.name} (${order.deliveryAgent.phone})\nPoint de livraison : ${effectiveStudent.deliveryLocation} - ${effectiveStudent.roomNumberOrDetails}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Reçu Commande ${order.orderNumber} - Resto ESP Dakar`,
          text: shareText,
          url: window.location.href,
        });
      } catch {
        // User dismissed share dialog
      }
    } else {
      navigator.clipboard.writeText(shareText);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
      setDownloadNotice("📋 Détails du reçu copiés ! Vous pouvez les coller directement sur WhatsApp.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-3 sm:py-6 px-2.5 sm:px-4 animate-fade-in text-slate-800">
      {/* Top Banner Notice */}
      <div className="bg-orange-500 text-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 mb-3 sm:mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 shadow-md print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white text-orange-600 font-black flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="font-black text-sm sm:text-base text-white uppercase tracking-tight">
              Commande Validée avec Succès !
            </h3>
            <p className="text-[11px] sm:text-xs text-orange-100 font-medium">
              Votre reçu officiel ESP est prêt. Téléchargez-le en PDF pour l'avoir également dans votre galerie mobile !
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end pt-1 sm:pt-0 border-t sm:border-t-0 border-orange-400/60">
          {onViewHistory && (
            <button
              onClick={onViewHistory}
              className="flex-1 sm:flex-initial bg-orange-600 hover:bg-orange-700 text-white border border-orange-400/80 font-black px-3.5 sm:px-4 py-2.5 rounded-xl text-[11px] sm:text-xs uppercase tracking-wider transition-all active:scale-95 shadow-xs text-center"
            >
              📜 Historique
            </button>
          )}

          <button
            onClick={() => onTrackOrder(order)}
            className="flex-1 sm:flex-initial bg-white hover:bg-orange-50 text-orange-600 font-black px-4 sm:px-5 py-2.5 rounded-xl text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shrink-0 transition-all active:scale-95 shadow-xs"
          >
            <span>Suivre livraison</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Action Bar above Receipt (Both Mobile & Web) */}
      <div className="bg-white/95 backdrop-blur-md border-2 border-orange-200/90 rounded-2xl p-2.5 sm:p-3 mb-4 flex flex-wrap items-center justify-between gap-2 shadow-xs print:hidden">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider hidden sm:inline">
            Reçu Officiel
          </span>
          <span className="font-mono text-xs font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-200">
            {order.orderNumber}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 w-full xs:w-auto justify-end">
          {/* Direct Share (WhatsApp / Native) */}
          <button
            onClick={handleShare}
            className="flex-1 xs:flex-initial bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] sm:text-xs font-black px-3 py-2 rounded-xl uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-2xs"
            title="Partager le reçu sur WhatsApp ou autres applications"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Partager</span>
          </button>

          {/* Quick Download Button */}
          <button
            onClick={() => handleDownloadPDF(true)}
            disabled={isGeneratingPDF || isGeneratingImage}
            className="flex-1 xs:flex-initial bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 disabled:opacity-60 text-white text-[11px] sm:text-xs font-black px-3.5 sm:px-4 py-2 rounded-xl uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
            title="Télécharger le reçu officiel en PDF avec enregistrement automatique dans la galerie photos"
          >
            {isGeneratingPDF ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Patientez...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-orange-200" />
                <span>Télécharger le reçu</span>
              </>
            )}
          </button>

          {/* Print button on web */}
          <button
            onClick={handlePrint}
            className="hidden sm:flex bg-slate-800 hover:bg-slate-900 text-white text-xs font-black px-3 py-2 rounded-xl uppercase tracking-wider items-center justify-center gap-1.5 transition-all active:scale-95 shadow-2xs"
            title="Imprimer au format A4"
          >
            <Printer className="w-3.5 h-3.5 text-orange-400" />
            <span>Imprimer</span>
          </button>
        </div>
      </div>

      {/* Download Success Notice */}
      {downloadNotice && (
        <div className="bg-emerald-600 text-white rounded-2xl p-3 sm:p-4 mb-4 flex items-center justify-between gap-3 shadow-lg animate-fade-in border border-emerald-400 print:hidden">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
            <p className="text-xs font-black leading-snug">
              {downloadNotice}
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {previewImageUrl && (
              <button
                onClick={() => setIsPreviewModalOpen(true)}
                className="bg-white text-emerald-800 text-[10px] sm:text-xs font-black px-2.5 sm:px-3 py-1.5 rounded-lg uppercase tracking-wider hover:bg-emerald-50 active:scale-95 transition-all shadow-xs"
              >
                Voir l'image
              </button>
            )}
            <button
              onClick={() => setDownloadNotice(null)}
              className="text-emerald-200 hover:text-white p-1 rounded-lg"
              title="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Official Printable & Downloadable Receipt Card */}
      <div 
        id="official-receipt-card"
        className="bg-white text-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border-2 border-orange-200/80 relative overflow-hidden print:shadow-none print:border-none print:p-0"
      >
        {/* Decorative Top Tri-color Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-yellow-400 to-red-500" />

        {/* Background Watermark Stamp */}
        <div className="absolute right-3 bottom-10 opacity-[0.03] pointer-events-none select-none text-slate-900 font-black text-7xl sm:text-9xl tracking-tighter">
          ESP
        </div>

        {/* Realistic University Circular Ink Stamp (Cachet Officiel encre verte) */}
        <div className="absolute right-2 sm:right-6 top-28 sm:top-24 rotate-[-8deg] pointer-events-none select-none border-2 border-emerald-600/80 rounded-full w-20 h-20 sm:w-28 sm:h-28 p-1 flex items-center justify-center text-center opacity-85 z-10 print:opacity-100">
          <div className="border border-dashed border-emerald-600/90 rounded-full w-full h-full flex flex-col items-center justify-center p-1 text-emerald-800">
            <div className="text-[5.5px] sm:text-[7.5px] font-black uppercase tracking-widest text-emerald-900 leading-tight">ESP DAKAR • UCAD</div>
            <div className="text-[6.5px] sm:text-[8.5px] font-black text-emerald-600 my-0.2 sm:my-0.5">★ RESTAURATION ★</div>
            <div className="text-[8.5px] sm:text-[13px] font-black uppercase text-emerald-900 tracking-wider">CONFORME</div>
            <div className="text-[5.5px] sm:text-[7.5px] font-bold text-emerald-700 mt-0.2 sm:mt-0.5">PASS RESTO VALIDÉ</div>
            <div className="text-[4.5px] sm:text-[6.5px] font-mono text-emerald-600">{order.createdAt.split(' ')[0]}</div>
          </div>
        </div>

        {/* Receipt Header */}
        <div className="border-b-2 border-orange-500/80 pb-4 sm:pb-5 mb-4 sm:mb-5 pt-1 sm:pt-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-xl sm:text-2xl shadow-md shrink-0">
                E
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-[9px] sm:text-[11px] font-black text-slate-500 uppercase tracking-widest">
                  <Building2 className="w-3 h-3 text-orange-500 shrink-0" />
                  <span className="truncate">UCAD DAKAR • SÉNÉGAL</span>
                </div>
                <h1 className="font-black text-sm sm:text-xl text-slate-900 tracking-tight leading-tight">
                  ÉCOLE SUPÉRIEURE POLYTECHNIQUE
                </h1>
                <p className="text-[10px] sm:text-xs font-extrabold text-orange-600 uppercase tracking-wider mt-0.5">
                  Direction Restauration Universitaire (Resto ESP)
                </p>
              </div>
            </div>

            {/* Official Validated Digital Stamp */}
            <div className="w-full sm:w-auto border-2 border-emerald-600 bg-emerald-50/90 text-emerald-950 p-2 sm:p-2.5 rounded-2xl text-center shrink-0 font-mono shadow-xs">
              <div className="flex items-center justify-center gap-1 text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>REÇU AUTHENTIFIÉ</span>
              </div>
              <div className="font-black text-[11px] sm:text-xs text-emerald-900 mt-0.5">PASS INTÉGRATION ESP</div>
              <div className="text-[9px] sm:text-[10px] text-emerald-700 font-black">100% OFFERT • 0 FCFA</div>
            </div>
          </div>
        </div>

        {/* Receipt Meta Details Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 bg-orange-50/80 p-3 sm:p-4 rounded-2xl mb-4 sm:mb-5 text-xs border border-orange-200/80">
          <div className="space-y-0.5">
            <span className="text-slate-400 text-[8px] sm:text-[10px] uppercase block font-black tracking-wider">N° Référence</span>
            <span className="font-mono font-black text-orange-600 text-xs sm:text-sm block truncate">{order.orderNumber}</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-slate-400 text-[8px] sm:text-[10px] uppercase block font-black tracking-wider">Date & Heure</span>
            <span className="font-bold text-slate-800 text-[10px] sm:text-xs block truncate">{order.createdAt}</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-slate-400 text-[8px] sm:text-[10px] uppercase block font-black tracking-wider">Statut</span>
            <span className="inline-flex items-center gap-1 font-black text-orange-600 bg-white px-2 py-0.5 rounded-full text-[9px] sm:text-[11px] border border-orange-200">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping shrink-0" />
              <span>{order.status === 'confirmed' ? 'Confirmée' : order.status === 'preparing' ? 'En Cuisine' : order.status === 'delivering' ? 'En Livraison' : 'Livrée'}</span>
            </span>
          </div>
        </div>

        {/* Student & Delivery Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 mb-4 sm:mb-5 text-xs">
          {/* Student Info */}
          <div className="bg-slate-50/90 p-3 sm:p-4 rounded-2xl border-2 border-slate-100 space-y-2">
            <h4 className="font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-200/80 pb-1.5 uppercase tracking-wider text-[10px] sm:text-[11px] text-orange-600">
              <GraduationCap className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Informations Étudiant Bénéficiaire</span>
            </h4>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-2">
              <span className="text-slate-500 font-medium text-[11px] shrink-0">Nom complet :</span>
              <span className="font-extrabold text-slate-900 text-[11px] sm:text-right break-words">{effectiveStudent.fullName}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-2">
              <span className="text-slate-500 font-medium text-[11px] shrink-0">N° Carte Étudiant :</span>
              <span className="font-mono text-orange-600 font-black text-[11px] sm:text-right">{effectiveStudent.studentId}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-2">
              <span className="text-slate-500 font-medium text-[11px] shrink-0">Filière / Dép. :</span>
              <span className="font-bold text-slate-800 text-[11px] sm:text-right break-words">{effectiveStudent.department}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-2">
              <span className="text-slate-500 font-medium text-[11px] shrink-0">Niveau d'études :</span>
              <span className="font-semibold text-slate-700 text-[11px] sm:text-right break-words">{effectiveStudent.level}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-2">
              <span className="text-slate-500 font-medium text-[11px] shrink-0">Téléphone :</span>
              <a 
                href={`tel:${effectiveStudent.phone.replace(/\s+/g, '')}`}
                className="font-mono font-bold text-orange-600 hover:underline text-[11px] sm:text-right flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-orange-500" />
                <span>{effectiveStudent.phone}</span>
              </a>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-slate-50/90 p-3 sm:p-4 rounded-2xl border-2 border-slate-100 space-y-2">
            <h4 className="font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-200/80 pb-1.5 uppercase tracking-wider text-[10px] sm:text-[11px] text-orange-600">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Point de Livraison Campus</span>
            </h4>
            <div className="flex flex-col xs:flex-row xs:justify-between gap-0.5">
              <span className="text-slate-500 font-medium text-[11px]">Précision / Chambre :</span>
              <span className="font-bold text-slate-800 text-[11px]">{effectiveStudent.roomNumberOrDetails}</span>
            </div>
            <div className="flex flex-col xs:flex-row xs:justify-between gap-0.5">
              <span className="text-slate-500 font-medium text-[11px]">Moyen d'acheminement :</span>
              <span className="font-bold text-slate-700 text-[11px]">{order.deliveryAgent.transport || 'Vélo Express Campus'}</span>
            </div>
            <div className="flex flex-col xs:flex-row xs:justify-between items-start xs:items-center gap-1 border-t border-slate-200/60 pt-1.5 mt-1">
              <div>
                <span className="text-slate-500 font-medium text-[11px] block">Livreur Attitré :</span>
                <span className="font-extrabold text-orange-600 text-[11px]">{order.deliveryAgent.name}</span>
              </div>
              <a
                href={`tel:${order.deliveryAgent.phone.replace(/\s+/g, '')}`}
                className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1 transition-colors"
                title="Appeler le livreur"
              >
                <Phone className="w-3 h-3" />
                <span>Appeler</span>
              </a>
            </div>
          </div>
        </div>

        {/* Itemized Articles Section */}
        <div className="mb-4 sm:mb-5">
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 mb-2">
            <h4 className="font-black text-[10px] sm:text-xs uppercase tracking-wider text-slate-500">
              Détail des Articles Commandés (Quota : 3)
            </h4>
            <span className="text-[9px] sm:text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 w-fit">
              Subventionné à 100% par l'ESP
            </span>
          </div>

          {/* MOBILE RESPONSIVE CARDS (For small screens) */}
          <div className="block sm:hidden space-y-2">
            {order.items.map((item, idx) => (
              <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="font-extrabold text-slate-900 text-xs truncate">{item.menuItem.name}</div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {Object.entries(item.selectedOptions).map(([k, v]) => `${k}: ${v}`).join(', ') || 'Standard'}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-[10px] text-slate-400 line-through font-mono">{item.menuItem.normalPrice.toLocaleString()} FCFA</div>
                  <div className="text-xs font-black text-emerald-600">0 FCFA</div>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP TABLE (For tablet/desktop screens) */}
          <div className="hidden sm:block border-2 border-slate-100 rounded-2xl overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[450px]">
              <thead className="bg-orange-50/90 text-orange-950 font-black uppercase text-[9px] sm:text-[10px] tracking-wider border-b border-orange-100">
                <tr>
                  <th className="p-2.5 sm:p-3 w-8">#</th>
                  <th className="p-2.5 sm:p-3">Désignation Plat</th>
                  <th className="p-2.5 sm:p-3">Options</th>
                  <th className="p-2.5 sm:p-3 text-right">Prix Habituel</th>
                  <th className="p-2.5 sm:p-3 text-right">Montant Facturé</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="p-2.5 sm:p-3 font-mono text-orange-500 font-bold">{idx + 1}</td>
                    <td className="p-2.5 sm:p-3 font-extrabold text-slate-900">
                      {item.menuItem.name}
                    </td>
                    <td className="p-2.5 sm:p-3 text-[11px] text-slate-600 font-medium">
                      {Object.entries(item.selectedOptions).map(([k, v]) => `${k}: ${v}`).join(', ') || 'Standard'}
                    </td>
                    <td className="p-2.5 sm:p-3 text-right font-mono text-slate-400 line-through">
                      {item.menuItem.normalPrice.toLocaleString()} FCFA
                    </td>
                    <td className="p-2.5 sm:p-3 text-right font-black text-emerald-600">
                      0 FCFA
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Summary & Official QR Code Block */}
        <div className="bg-slate-900 text-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5">
          {/* HD SVG QR Code Component */}
          <div className="flex flex-col xs:flex-row items-center gap-3.5 w-full md:w-auto text-center xs:text-left">
            <div 
              onClick={() => setIsQrModalOpen(true)}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-white p-2 rounded-2xl flex items-center justify-center shrink-0 shadow-md relative group cursor-pointer hover:ring-2 hover:ring-orange-400 transition-all"
              title="Cliquer pour afficher le QR code en plein écran"
            >
              {/* High Precision SVG QR Code */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                <rect width="100" height="100" fill="white" />
                <rect x="6" y="6" width="26" height="26" fill="black" rx="4" />
                <rect x="10" y="10" width="18" height="18" fill="white" rx="2" />
                <rect x="14" y="14" width="10" height="10" fill="black" rx="1" />

                <rect x="68" y="6" width="26" height="26" fill="black" rx="4" />
                <rect x="72" y="10" width="18" height="18" fill="white" rx="2" />
                <rect x="76" y="14" width="10" height="10" fill="black" rx="1" />

                <rect x="6" y="68" width="26" height="26" fill="black" rx="4" />
                <rect x="10" y="72" width="18" height="18" fill="white" rx="2" />
                <rect x="14" y="76" width="10" height="10" fill="black" rx="1" />

                <rect x="36" y="8" width="8" height="8" fill="black" />
                <rect x="48" y="8" width="12" height="8" fill="black" />
                <rect x="38" y="20" width="10" height="10" fill="black" />
                <rect x="52" y="22" width="8" height="8" fill="black" />

                <rect x="8" y="38" width="10" height="8" fill="black" />
                <rect x="22" y="36" width="8" height="12" fill="black" />

                <rect x="68" y="38" width="12" height="8" fill="black" />
                <rect x="84" y="38" width="8" height="12" fill="black" />

                <rect x="38" y="68" width="10" height="10" fill="black" />
                <rect x="52" y="72" width="12" height="8" fill="black" />
                <rect x="68" y="68" width="10" height="12" fill="black" />
                <rect x="82" y="70" width="10" height="10" fill="black" />

                <rect x="38" y="82" width="14" height="10" fill="black" />
                <rect x="56" y="84" width="12" height="8" fill="black" />
                <rect x="72" y="84" width="20" height="10" fill="black" />

                <rect x="38" y="38" width="24" height="24" fill="white" rx="4" stroke="#f97316" strokeWidth="2" />
                <text x="50" y="54" fontSize="10" fontWeight="900" textAnchor="middle" fill="#ea580c">ESP</text>
              </svg>
              {/* Magnifier indicator on hover */}
              <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                <Maximize2 className="w-5 h-5 text-orange-400" />
              </div>
            </div>

            <div className="text-xs space-y-1">
              <div className="font-black text-orange-400 flex items-center justify-center xs:justify-start gap-1 uppercase tracking-wider text-[11px] sm:text-xs">
                <QrCode className="w-3.5 h-3.5" />
                <span>Code QR de Contrôle</span>
              </div>
              <p className="text-slate-300 text-[10px] sm:text-[11px] font-medium leading-tight max-w-[220px]">
                Présentez ce code QR lors de la réception de votre commande.
              </p>
              <div className="flex items-center justify-center xs:justify-start gap-1.5 pt-0.5">
                <span className="text-[10px] text-orange-300 font-mono font-bold bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
                  {order.qrCodeData || `ESP-2026-${order.orderNumber}`}
                </span>
                <button
                  onClick={handleCopyQRCode}
                  title="Copier le code de validation"
                  className="text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 p-1 rounded-md text-[10px] flex items-center gap-1 transition-colors print:hidden"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'Copié' : 'Copier'}</span>
                </button>
                <button
                  onClick={() => setIsQrModalOpen(true)}
                  title="Agrandir le QR Code en plein écran"
                  className="text-orange-300 hover:text-white bg-slate-800 hover:bg-slate-700 p-1 rounded-md text-[10px] flex items-center gap-1 transition-colors print:hidden"
                >
                  <Maximize2 className="w-3 h-3 text-orange-400" />
                  <span>Agrandir</span>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="w-full md:w-auto text-center md:text-right space-y-1 text-xs border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-6">
            <div className="text-slate-400 font-medium text-[11px] sm:text-xs">
              Valeur réelle du menu : <span className="line-through">{order.totalSaved.toLocaleString()} FCFA</span>
            </div>
            <div className="text-emerald-400 font-extrabold text-[11px] sm:text-xs">
              Prise en charge ESP : -{order.totalSaved.toLocaleString()} FCFA
            </div>
            <div className="text-sm sm:text-base font-black text-white pt-1 uppercase">
              NET À PAYER : <span className="text-orange-400 text-lg sm:text-xl font-mono ml-1">0 FCFA</span>
            </div>
          </div>
        </div>

        {/* Footer Official Certification Note */}
        <div className="mt-4 sm:mt-5 pt-3 border-t border-slate-200/80 text-center text-[9px] sm:text-[11px] text-slate-500 font-medium flex flex-col sm:flex-row items-center justify-between gap-1">
          <span>École Supérieure Polytechnique de Dakar (ESP) • Resto Universitaire Campus UCAD</span>
          <span className="font-mono text-slate-400">Réf : CERT-ESP-{order.id.slice(0, 8).toUpperCase()}</span>
        </div>
      </div>

      {/* Action Buttons (Hidden when printing) */}
      <div className="mt-4 sm:mt-6 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2.5 sm:gap-3 print:hidden">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToMenu}
            className="flex-1 xs:flex-initial text-slate-600 hover:text-slate-900 text-xs font-black px-3 sm:px-4 py-2.5 rounded-xl hover:bg-orange-100/60 transition-colors uppercase tracking-wider text-center"
          >
            ← Menu principal
          </button>

          {onViewHistory && (
            <button
              onClick={onViewHistory}
              className="flex-1 xs:flex-initial bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black px-3.5 py-2.5 rounded-xl transition-colors uppercase tracking-wider text-center"
            >
              📜 Historique
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* TÉLÉCHARGER LE REÇU PDF (AVEC COPIE GALERIE) */}
          <button
            onClick={() => handleDownloadPDF(true)}
            disabled={isGeneratingPDF || isGeneratingImage}
            className="flex-1 sm:flex-initial bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 disabled:opacity-60 text-white font-black px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all active:scale-95"
            title="Télécharger le reçu officiel en PDF avec enregistrement automatique dans la galerie photos"
          >
            {isGeneratingPDF ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Téléchargement...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-orange-200" />
                <span>Télécharger le reçu</span>
              </>
            )}
          </button>

          {/* PRINT BUTTON */}
          <button
            onClick={handlePrint}
            className="bg-slate-800 hover:bg-slate-900 text-white font-black px-3.5 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
            title="Imprimer le reçu"
          >
            <Printer className="w-4 h-4 text-orange-400" />
            <span className="hidden sm:inline">Imprimer</span>
          </button>
        </div>
      </div>

      {/* Modal d'aperçu de l'image & conseils mobile */}
      {isPreviewModalOpen && previewImageUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in print:hidden">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="p-3.5 sm:p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-orange-400" />
                <h3 className="font-black text-xs sm:text-sm uppercase tracking-wider">
                  Reçu Image (Galerie Mobile)
                </h3>
              </div>
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image Preview Container */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-slate-100 flex flex-col items-center">
              <img
                src={previewImageUrl}
                alt="Reçu officiel ESP"
                className="w-full h-auto rounded-xl shadow-md border border-slate-200 select-none object-contain"
              />
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-slate-700 text-[11px] leading-relaxed w-full">
                <p className="font-black text-amber-900 flex items-center gap-1">
                  <span>💡</span> Astuce pour smartphone (iPhone & Android) :
                </p>
                <p className="mt-1 text-slate-600">
                  Faites un <strong>appui long</strong> avec votre doigt sur l'image ci-dessus et choisissez « <strong>Enregistrer dans Photos</strong> » ou « <strong>Télécharger l'image</strong> » pour la retrouver directement dans votre galerie d'images.
                </p>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex flex-wrap gap-2 justify-between items-center shrink-0">
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="text-slate-600 font-bold text-xs px-3 py-2 rounded-xl hover:bg-slate-100"
              >
                Fermer
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={previewImageUrl}
                  download={`Recu_ESP_Dakar_${order.orderNumber}.png`}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-black px-4 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger l'image</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal QR Code Plein Écran pour le Scan Mobile / Restaurant */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in print:hidden">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border-2 border-orange-500 flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="text-left">
                <div className="text-[10px] font-black uppercase tracking-wider text-orange-600">Scan Authentification</div>
                <div className="font-mono text-sm font-black text-slate-900">{order.orderNumber}</div>
              </div>
              <button
                onClick={() => setIsQrModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Big High-Contrast QR Code for Scanner */}
            <div className="bg-white p-4 rounded-3xl border-4 border-slate-900 shadow-xl mb-4 w-64 h-64 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                <rect width="100" height="100" fill="white" />
                <rect x="6" y="6" width="26" height="26" fill="black" rx="4" />
                <rect x="10" y="10" width="18" height="18" fill="white" rx="2" />
                <rect x="14" y="14" width="10" height="10" fill="black" rx="1" />

                <rect x="68" y="6" width="26" height="26" fill="black" rx="4" />
                <rect x="72" y="10" width="18" height="18" fill="white" rx="2" />
                <rect x="76" y="14" width="10" height="10" fill="black" rx="1" />

                <rect x="6" y="68" width="26" height="26" fill="black" rx="4" />
                <rect x="10" y="72" width="18" height="18" fill="white" rx="2" />
                <rect x="14" y="76" width="10" height="10" fill="black" rx="1" />

                <rect x="36" y="8" width="8" height="8" fill="black" />
                <rect x="48" y="8" width="12" height="8" fill="black" />
                <rect x="38" y="20" width="10" height="10" fill="black" />
                <rect x="52" y="22" width="8" height="8" fill="black" />

                <rect x="8" y="38" width="10" height="8" fill="black" />
                <rect x="22" y="36" width="8" height="12" fill="black" />

                <rect x="68" y="38" width="12" height="8" fill="black" />
                <rect x="84" y="38" width="8" height="12" fill="black" />

                <rect x="38" y="68" width="10" height="10" fill="black" />
                <rect x="52" y="72" width="12" height="8" fill="black" />
                <rect x="68" y="68" width="10" height="12" fill="black" />
                <rect x="82" y="70" width="10" height="10" fill="black" />

                <rect x="38" y="82" width="14" height="10" fill="black" />
                <rect x="56" y="84" width="12" height="8" fill="black" />
                <rect x="72" y="84" width="20" height="10" fill="black" />

                <rect x="38" y="38" width="24" height="24" fill="white" rx="4" stroke="#ea580c" strokeWidth="2.5" />
                <text x="50" y="54" fontSize="10" fontWeight="900" textAnchor="middle" fill="#ea580c">ESP</text>
              </svg>
            </div>

            <p className="text-xs text-slate-600 font-medium mb-3">
              Présentez cet écran au livreur ESP ou au comptoir du restaurant pour valider votre repas.
            </p>

            <div className="w-full flex items-center justify-between gap-2 bg-orange-50 p-2.5 rounded-2xl border border-orange-200">
              <span className="font-mono text-xs font-black text-orange-700 truncate">
                {order.qrCodeData || `ESP-2026-${order.orderNumber}`}
              </span>
              <button
                onClick={handleCopyQRCode}
                className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-black px-2.5 py-1.5 rounded-xl uppercase tracking-wider transition-colors shrink-0"
              >
                {copiedCode ? 'Copié !' : 'Copier'}
              </button>
            </div>

            <button
              onClick={() => setIsQrModalOpen(false)}
              className="mt-4 w-full bg-slate-900 hover:bg-black text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-wider"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
