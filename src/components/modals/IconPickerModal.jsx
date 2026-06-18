import { X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { ICONS } from '../../data/constants';

function DynIcon({ name, className }) {
  const pascal = name.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('');
  const Icon = LucideIcons[pascal];
  return Icon ? <Icon className={className} /> : <span className={className}>●</span>;
}

export default function IconPickerModal({ onSelect, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center no-print"
      onClick={onClose}
    >
      <div className="bg-white rounded-xl p-4 shadow-xl w-72" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-bold text-sm text-slate-900">בחר אייקון לפסקה</h4>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 max-h-52 overflow-y-auto">
          {ICONS.map(icon => (
            <button
              key={icon}
              title={icon}
              onClick={() => onSelect(icon)}
              className="p-1.5 rounded hover:bg-slate-100 border border-transparent hover:border-slate-300 flex items-center justify-center"
            >
              <DynIcon name={icon} className="w-4 h-4 text-slate-700" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
