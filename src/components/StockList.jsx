import { useState } from 'react';
import { ListFilter } from 'lucide-react';
import { isNeg } from '../utils/formatters';

export default function StockList({ stocksDb, activeTicker, onSelect }) {
  const [q, setQ] = useState('');
  const tickers = Object.keys(stocksDb).filter(t =>
    t.toLowerCase().includes(q.toLowerCase()) ||
    stocksDb[t].name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200 flex flex-col" style={{ maxHeight: '48vh' }}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
          <ListFilter className="w-4 h-4 text-blue-600" />
          בחירת מניה
        </h3>
        <span className="text-[12px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
          {q ? `${tickers.length}/${Object.keys(stocksDb).length}` : Object.keys(stocksDb).length}
        </span>
      </div>
      <input
        type="text"
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="חפש מניה..."
        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1.5"
      />
      <div className="overflow-y-auto flex-1">
        {tickers.map(ticker => {
          const stock = stocksDb[ticker];
          const isActive = ticker === activeTicker;
          const up = !isNeg(stock.dailyChange);
          return (
            <div
              key={ticker}
              onClick={() => onSelect(ticker)}
              className={`p-2 mb-1.5 rounded-lg cursor-pointer transition-all border text-right ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs">{ticker}</span>
                <span className={`text-[9px] truncate max-w-[100px] font-sans text-left ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>
                  {stock.name}
                </span>
              </div>
              <div className="flex justify-between items-center mt-0.5 text-[10px]">
                <span className="font-bold">{stock.price}</span>
                <span dir="ltr" className={`font-sans font-semibold ${
                  isActive ? (up ? 'text-emerald-400' : 'text-rose-400') : (up ? 'text-emerald-600' : 'text-rose-600')
                }`}>
                  {stock.dailyChange}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
