import React from 'react';
import { QRCodeSVG } from 'qrcode.react'; // Assuming standard qrcode.react is available or similar

interface UpiQrProps {
  upiId: string;
  name: string;
  amount: number;
  transactionNote?: string;
}

const UpiQr: React.FC<UpiQrProps> = ({ upiId, name, amount, transactionNote = 'Order Payment' }) => {
  // UPI URL Schema: upi://pay?pa=<id>&pn=<name>&am=<amount>&tn=<note>&cu=INR
  const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${amount.toFixed(2)}&tn=${encodeURIComponent(transactionNote)}&cu=INR`;

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="bg-white p-2 rounded-lg border-2 border-gray-100">
        <QRCodeSVG value={upiUrl} size={200} level="H" />
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-sm text-gray-500">Scan with any UPI App</p>
        <div className="flex items-center justify-center space-x-2">
          {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
            <span key={app} className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-600">
              {app}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-400 pt-2 break-all select-all">{upiId}</p>
      </div>

      <a 
        href={upiUrl}
        className="block sm:hidden w-full bg-primary text-white text-center py-3 rounded-lg font-semibold hover:bg-secondary"
      >
        Pay ₹{amount}
      </a>
    </div>
  );
};

export default UpiQr;