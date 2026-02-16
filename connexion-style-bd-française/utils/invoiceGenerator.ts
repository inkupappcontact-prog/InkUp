import { LEGAL_INFO } from '../constants/legal';

interface OrderDetails {
    orderId: string;
    customerName: string;
    customerAddress: string;
    items: { description: string; quantity: number; unitPrice: number }[];
    date: Date;
}

interface InvoiceStructure {
    header: {
        issuer: {
            name: string;
            address: string;
            siret: string;
            email: string;
        };
        customer: {
            name: string;
            address: string;
        };
        invoiceNumber: string;
        date: string;
    };
    lines: { description: string; quantity: number; unitPrice: number; total: number }[];
    totals: {
        totalHT: number;
        totalTTC: number; // Égal au HT car Franchise TVA
        vatMention: string;
    };
}

/**
 * Génère une structure de données JSON pour une facture conforme (Micro-entreprise).
 * À utiliser côté serveur ou pour générer un PDF.
 */
export const generateInvoiceData = (order: OrderDetails): InvoiceStructure => {
    const totalAmount = order.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
    
    // Génération d'un numéro de facture séquentiel (Simulation)
    // En prod: utiliser un compteur atomique en base de données.
    const invoiceNum = `INV-${order.date.getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

    return {
        header: {
            issuer: {
                name: `${LEGAL_INFO.entrepreneur} (${LEGAL_INFO.trade_name})`,
                address: LEGAL_INFO.address,
                siret: LEGAL_INFO.siret,
                email: LEGAL_INFO.contact_email
            },
            customer: {
                name: order.customerName,
                address: order.customerAddress
            },
            invoiceNumber: invoiceNum,
            date: order.date.toLocaleDateString('fr-FR')
        },
        lines: order.items.map(item => ({
            ...item,
            total: item.quantity * item.unitPrice
        })),
        totals: {
            totalHT: totalAmount,
            totalTTC: totalAmount, // Pas de TVA
            vatMention: LEGAL_INFO.vat_mention
        }
    };
};
