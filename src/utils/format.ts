import { Currency } from '@/types';

export function formatPrice(priceINR: number, _priceUSD?: number, _currency?: Currency): string {
  return `₹${priceINR.toLocaleString('en-IN')}`;
}

export function formatSinglePrice(amount: number, _currency?: Currency): string {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

export function getWhatsAppOrderUrl(productName: string, selectedSize: string, selectedColor: string, priceText: string): string {
  const text = encodeURIComponent(
    `Yo 04 Street Wear team! ⚡ I want to place an order for:\n\n` +
    `• Item: ${productName}\n` +
    `• Size: ${selectedSize}\n` +
    `• Colorway: ${selectedColor}\n` +
    `• Price: ${priceText}\n\n` +
    `Please confirm stock availability and UPI/Payment details!`
  );
  return `https://wa.me/919999040404?text=${text}`;
}

export function getInstagramDMUrl(productName?: string): string {
  return `https://ig.me/m/04_street_wear`;
}
