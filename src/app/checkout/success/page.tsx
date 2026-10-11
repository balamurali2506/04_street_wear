'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, PackageCheck, Printer, ArrowRight, Mail } from 'lucide-react';
import { formatSinglePrice } from '@/utils/format';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState('04-ORD-902481');
  const [orderTotal, setOrderTotal] = useState('0');
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const fromParam = searchParams.get('order');
    const storedId = sessionStorage.getItem('last_order_id');
    const storedTotal = sessionStorage.getItem('last_order_total');
    const storedEmail = sessionStorage.getItem('last_order_email');

    if (fromParam) setOrderNumber(fromParam);
    else if (storedId) setOrderNumber(storedId);

    if (storedTotal) setOrderTotal(storedTotal);
    if (storedEmail) setCustomerEmail(storedEmail);
  }, [searchParams]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto w-full bg-[#111111] border border-neutral-800 p-8 sm:p-12 shadow-2xl">
      {/* Header Badge */}
      <div className="flex flex-col items-center text-center pb-8 border-b border-neutral-800">
        <div className="w-16 h-16 bg-[#FF4D00]/15 border border-[#FF4D00] rounded-full flex items-center justify-center text-[#FF4D00] mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-[#FF4D00] font-black uppercase tracking-widest text-[11px] mb-1">
          DROP 04 ALLOTMENT CONFIRMED
        </span>
        <h1 className="font-display text-4xl sm:text-6xl text-white uppercase tracking-tight">
          ORDER AUTHORIZED
        </h1>
        <p className="text-neutral-400 mt-2 max-w-md uppercase">
          Thank you for securing your pieces from 04 Street Wear. Your capsule order is queued for hand-inspection and express dispatch.
        </p>
      </div>

      {/* Order Details Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-8 border-b border-neutral-800 text-center">
        <div className="p-4 bg-neutral-950 border border-neutral-900">
          <span className="text-neutral-500 block mb-1">ORDER NUMBER</span>
          <strong className="text-white text-sm">{orderNumber}</strong>
        </div>
        <div className="p-4 bg-neutral-950 border border-neutral-900">
          <span className="text-neutral-500 block mb-1">TOTAL AMOUNT PAID</span>
          <strong className="text-[#FF4D00] text-sm">
            {orderTotal !== '0' ? formatSinglePrice(Number(orderTotal)) : '₹8,799'}
          </strong>
        </div>
        <div className="p-4 bg-neutral-950 border border-neutral-900">
          <span className="text-neutral-500 block mb-1">EST. DELIVERY</span>
          <strong className="text-[#C6FF00] text-sm">3-5 BUSINESS DAYS</strong>
        </div>
      </div>

      {/* Confirmation Message */}
      <div className="py-8 flex flex-col gap-4 text-neutral-300 uppercase leading-relaxed">
        <div className="flex items-start gap-3 p-4 bg-neutral-950 border border-neutral-900">
          <Mail className="w-5 h-5 text-[#FF4D00] shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block mb-0.5">EMAIL RECEIPT SENT</strong>
            <span>
              A receipt and tracking code have been dispatched to{' '}
              <span className="text-[#FF4D00]">{customerEmail || 'your registered email'}</span>.
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-neutral-950 border border-neutral-900">
          <PackageCheck className="w-5 h-5 text-[#C6FF00] shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block mb-0.5">LIMITED EDITION CERTIFICATE INCLUDED</strong>
            <span>
              Your garment package includes a hand-stamped archival authentication certificate and official 04 vinyl stickers.
            </span>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3 border border-neutral-700 hover:border-white text-white font-bold uppercase transition-colors flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>PRINT RECEIPT</span>
        </button>

        <Link
          href="/shop"
          className="w-full sm:w-auto px-8 py-3 bg-[#FF4D00] hover:bg-white text-black font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
        >
          <span>CONTINUE BROWSING</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F2F0EB] pt-32 pb-24 px-4 sm:px-8 font-mono text-xs">
      <Suspense fallback={
        <div className="max-w-3xl mx-auto text-center py-20 text-neutral-400">
          LOADING ORDER CONFIRMATION...
        </div>
      }>
        <OrderSuccessContent />
      </Suspense>
    </main>
  );
}
