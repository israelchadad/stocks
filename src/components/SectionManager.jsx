import { Layers, ChevronUp, ChevronDown, X, PlusCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

function DynIcon({ name, className }) {
  const pascal = name.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('');
  const Icon = LucideIcons[pascal];
  return Icon ? <Icon className={className} /> : <span className={className}>●</span>;
}

export default function SectionManager({ sections, onMoveUp, onMoveDown, onRemove, onOpenAdd }) {
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200">
      <h3 className="font-bold text-slate-900 text-xs flex items-center gap-2 mb-2">
        <Layers className="w-4 h-4 text-purple-600" />
        ניהול פסקאות
      </h3>
      <div className="space-y-1 mb-2">
        {sections.map((sec, idx) => (
          <div key={sec.id} className="flex items-center justify-between text-[10px] bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
            <div className="flex items-center gap-1 flex-1 min-w-0">
              <DynIcon name={sec.icon} className="w-3 h-3 text-slate-500 shrink-0" />
              <span className="truncate text-slate-700 font-medium text-[9px]">{sec.title}</span>
            </div>
            <div className="flex gap-0.5 shrink-0">
              <button
                onClick={() => onMoveUp(sec.id)}
                disabled={idx === 0}
                className={`text-slate-400 hover:text-blue-600 p-0.5 ${idx === 0 ? 'opacity-30' : ''}`}
              >
                <ChevronUp className="w-3 h-3" />
              </button>
              <button
                onClick={() => onMoveDown(sec.id)}
                disabled={idx === sections.length - 1}
                className={`text-slate-400 hover:text-blue-600 p-0.5 ${idx === sections.length - 1 ? 'opacity-30' : ''}`}
              >
                <ChevronDown className="w-3 h-3" />
              </button>
              <button onClick={() => onRemove(sec.id)} className="text-rose-400 hover:text-rose-600 p-0.5">
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onOpenAdd}
        className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5"
      >
        <PlusCircle className="w-3.5 h-3.5" />
        הוסף פסקה חדשה
      </button>
    </div>
  );
}
