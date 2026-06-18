import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { initialStocksDb, DEFAULT_SECTIONS } from './data/constants';
import { buildStaticHtml, downloadHtml } from './utils/exportHtml';
import { exportToWord } from './utils/exportWord';
import Header from './components/Header';
import StockList from './components/StockList';
import SectionManager from './components/SectionManager';
import ImportPanel from './components/ImportPanel';
import Report from './components/Report';
import IconPickerModal from './components/modals/IconPickerModal';
import AddSectionModal from './components/modals/AddSectionModal';

function getStockSections(stocksDb, ticker) {
  if (stocksDb[ticker]?.sections) return stocksDb[ticker].sections;
  const secs = JSON.parse(JSON.stringify(DEFAULT_SECTIONS));
  secs.forEach(sec => {
    if (sec.contentKey) sec.content = stocksDb[ticker]?.[sec.contentKey] || '';
  });
  return secs;
}

export default function App() {
  const [stocksDb, setStocksDb] = useLocalStorage('stocks_db_v3', JSON.parse(JSON.stringify(initialStocksDb)));
  const [activeTicker, setActiveTicker] = useState(() => {
    try { return Object.keys(JSON.parse(localStorage.getItem('stocks_db_v3') || '{}'))[0] || 'SMCI'; }
    catch { return 'SMCI'; }
  });
  const [logoSrc, setLogoSrc] = useLocalStorage('global_logo_src_v3', null);
  const [logoTextMain, setLogoTextMain] = useLocalStorage('logo_text_main', 'ZIV ANALYTICS');
  const [logoTextSub,  setLogoTextSub]  = useLocalStorage('logo_text_sub',  'Capital Markets | Research Department');
  const [headerDate,    setHeaderDate]    = useLocalStorage('header_date',    new Date().toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' }));
  const [headerAuthor,  setHeaderAuthor]  = useLocalStorage('header_author',  'מחלקת מחקר טכנולוגיה');
  const [headerContact, setHeaderContact] = useLocalStorage('header_contact', 'research@zivcm.co.il');

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [iconPickerSectionId, setIconPickerSectionId] = useState(null);
  const [addSectionOpen, setAddSectionOpen] = useState(false);

  const stock = stocksDb[activeTicker];
  const sections = getStockSections(stocksDb, activeTicker);

  function updateStock(updates) {
    setStocksDb(prev => ({ ...prev, [activeTicker]: { ...prev[activeTicker], ...updates } }));
  }

  function updateSections(newSections) {
    setStocksDb(prev => ({ ...prev, [activeTicker]: { ...prev[activeTicker], sections: newSections } }));
  }

  function handleSelectTicker(ticker) {
    setActiveTicker(ticker);
    setMobileSidebarOpen(false);
  }

  function handleReset() {
    if (confirm('לאפס את כל השינויים?')) {
      setStocksDb(JSON.parse(JSON.stringify(initialStocksDb)));
      setActiveTicker('SMCI');
    }
  }

  function handleImport(newDb) {
    setStocksDb(prev => ({ ...prev, ...newDb }));
    setActiveTicker(Object.keys(newDb)[0]);
  }

  function handleMoveSectionUp(id) {
    const idx = sections.findIndex(s => s.id === id);
    if (idx <= 0) return;
    const next = [...sections];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    updateSections(next);
  }

  function handleMoveSectionDown(id) {
    const idx = sections.findIndex(s => s.id === id);
    if (idx >= sections.length - 1) return;
    const next = [...sections];
    [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
    updateSections(next);
  }

  function handleRemoveSection(id) {
    const sec = sections.find(s => s.id === id);
    if (sec && confirm(`להסיר את הפסקה "${sec.title}"?`)) {
      updateSections(sections.filter(s => s.id !== id));
    }
  }

  function handleAddSection(title, content) {
    updateSections([...sections, { id: 's' + Date.now(), icon: 'file-text', title, content }]);
    setAddSectionOpen(false);
  }

  function handleIconSelect(icon) {
    updateSections(sections.map(s => s.id === iconPickerSectionId ? { ...s, icon } : s));
    setIconPickerSectionId(null);
  }

  function handleExportHTML() {
    const html = buildStaticHtml({ ticker: activeTicker, stock, sections, logoSrc: logoSrc || '', logoTextMain, logoTextSub, headerDate, headerAuthor, headerContact });
    downloadHtml(html, activeTicker);
  }

  async function handleExportWord() {
    await exportToWord({ ticker: activeTicker, stock, sections, logoSrc: logoSrc || '', logoTextMain, logoTextSub, headerDate, headerAuthor, headerContact });
  }

  return (
    <div dir="rtl" className="text-slate-800">
      <Header
        onExportHTML={handleExportHTML}
        onExportWord={handleExportWord}
        onPrint={() => window.print()}
        onReset={handleReset}
        onToggleMobile={() => setMobileSidebarOpen(o => !o)}
      />

      {mobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 no-print" onClick={() => setMobileSidebarOpen(false)} />
      )}

      <div className="max-w-7xl mx-auto px-3 py-4 flex gap-4 main-layout">

        {/* Sidebar */}
        <aside className={`sidebar-panel w-60 shrink-0 flex flex-col gap-3 no-print ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
          <ImportPanel onImport={handleImport} />
          <StockList stocksDb={stocksDb} activeTicker={activeTicker} onSelect={handleSelectTicker} />
          <SectionManager
            sections={sections}
            onMoveUp={handleMoveSectionUp}
            onMoveDown={handleMoveSectionDown}
            onRemove={handleRemoveSection}
            onOpenAdd={() => setAddSectionOpen(true)}
          />
        </aside>

        {/* Main report */}
        <main className="flex-1 min-w-0 flex justify-center">
          {stock ? (
            <Report
              key={activeTicker}
              ticker={activeTicker}
              stock={stock}
              sections={sections}
              onUpdateStock={updateStock}
              onUpdateSections={updateSections}
              logoSrc={logoSrc}
              logoTextMain={logoTextMain}
              logoTextSub={logoTextSub}
              headerDate={headerDate}
              headerAuthor={headerAuthor}
              headerContact={headerContact}
              onLogoUpdate={setLogoSrc}
              onUpdateLogoTextMain={setLogoTextMain}
              onUpdateLogoTextSub={setLogoTextSub}
              onUpdateHeaderDate={setHeaderDate}
              onUpdateHeaderAuthor={setHeaderAuthor}
              onUpdateHeaderContact={setHeaderContact}
              onOpenIconPicker={setIconPickerSectionId}
            />
          ) : (
            <div className="text-slate-400 text-sm mt-20">בחר מניה מהרשימה</div>
          )}
        </main>
      </div>

      {iconPickerSectionId && (
        <IconPickerModal onSelect={handleIconSelect} onClose={() => setIconPickerSectionId(null)} />
      )}
      {addSectionOpen && (
        <AddSectionModal onAdd={handleAddSection} onClose={() => setAddSectionOpen(false)} />
      )}
    </div>
  );
}
