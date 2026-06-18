import { useState } from 'react';

export default function AddSectionModal({ onAdd, onClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function handle() {
    if (!title.trim()) { alert('יש להזין כותרת'); return; }
    onAdd(title.trim(), content);
  }

  return (
    <div
      className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center no-print"
      onClick={onClose}
    >
      <div className="bg-white rounded-xl p-5 shadow-xl w-80" onClick={e => e.stopPropagation()}>
        <h4 className="font-bold text-sm text-slate-900 mb-3">הוסף פסקה חדשה</h4>
        <div className="mb-2">
          <label className="text-xs font-bold text-slate-700 block mb-1">כותרת הפסקה</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="כותרת..."
            className="w-full px-3 py-1.5 text-sm rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-3">
          <label className="text-xs font-bold text-slate-700 block mb-1">תוכן ראשוני</label>
          <textarea
            rows={3}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="תוכן הפסקה..."
            className="w-full px-3 py-1.5 text-sm rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={handle} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded text-sm font-bold">שמור</button>
          <button onClick={onClose} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 rounded text-sm font-bold">ביטול</button>
        </div>
      </div>
    </div>
  );
}
