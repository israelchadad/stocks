document.getElementById('headerDate').innerText = new Date().toLocaleDateString('he-IL', {day:'2-digit', month:'2-digit', year:'numeric'});

// ============================================================
// CONSTANTS
// ============================================================
const ICONS = ['building', 'cpu', 'shield', 'bar-chart-3', 'trending-up', 'star', 'zap', 'globe', 'layers',
    'briefcase', 'users', 'target', 'award', 'flag', 'bookmark', 'activity', 'lightbulb', 'info',
    'alert-circle', 'check-circle', 'package', 'database', 'server', 'cloud', 'lock', 'eye', 'search',
    'settings', 'wrench', 'compass', 'chart-line', 'pie-chart', 'dollar-sign', 'percent', 'microphone',
    'megaphone', 'message-circle', 'phone', 'mail', 'bell', 'calendar', 'clock', 'file-text', 'folder',
    'link', 'brain', 'bot', 'network', 'hard-drive', 'monitor', 'cpu', 'circuit-board', 'bar-chart-2'];

const DEFAULT_SECTIONS = [
    { id: 's1', icon: 'building', title: 'תיאור החברה ופעילותה העסקית', contentKey: 'desc' },
    { id: 's2', icon: 'cpu', title: 'הזיקה והשייכות לתחום ה-AI', contentKey: 'aiRel' },
    { id: 's3', icon: 'shield', title: 'מעמד תחרותי וחפיר עסקי (Moat)', contentKey: 'moat' },
    { id: 's4', icon: 'bar-chart-3', title: 'הגורמים לעלייה ושיפור ברווחים ברבעונים האחרונים', contentKey: 'perfReason' },
    { id: 's5', icon: 'megaphone', title: 'דגשים מתוך שיחת המשקיעים לרבעון האחרון ותחזיות להמשך', contentKey: 'investorCall' }
];

// ============================================================
// INITIAL DATA
// ============================================================
const initialStocksDb = {
    "SMCI": {
        name: "Super Micro Computer Inc.", price: "$46.90", dailyChange: "-1.10%", dailyIsUp: false,
        volume: "0.16M", marketcap: "$28,207M", peTtm: "25.49", pe2026: "18.04", cagr: "25.65%",
        peg: "0.99", peg2026: "0.70", beta: "1.87", high52: "-24.79%", low52: "+140.76%",
        m1: "+68.52%", m3: "+45.47%", m6: "+35.20%", m12: "+15.04%", ytd: "+60.23%",
        epsTtm: "1.84", eps26: "2.60", eps27: "3.24", eps28: "3.65",
        desc: "חברת Super Micro Computer (SMCI) היא מובילה עולמית בפיתוח וייצור של פתרונות מחשוב ענן מתקדמים, שרתים בעלי ביצועים גבוהים (High-Performance Computing), מערכות אחסון ותשתיות טכנולוגיות מרכזי נתונים ירוקים. החברה מתמקדת באדריכלות מודולרית המאפשרת התאמה מדויקת לצורכי הלקוחות.",
        aiRel: "החברה מהווה עמוד תווך מרכזי במהפכת ה-AI הגנרטיבי. SMCI מייצרת את מארזי השרתים והתשתיות הפיזיות המורכבות ביותר הדרושות לאירוח מעבדי ה-GPU המובילים של Nvidia, AMD ואינטל. פתרונות קירור המים הנוזליים הייחודיים שלה קריטיים להפעלת אשכולות שרתי AI מאסיביים.",
        moat: "החפיר של החברה מבוסס על מהירות הגעה לשוק (Time-to-Market). בזכות שיתוף פעולה הדוק עם אנבידיה, SMCI מקבלת שבבים ראשונה ומסוגלת לתכנן ולספק שרתי AI מותאמים תוך שבועות ספורים, בעוד המתחרות לוקחות חודשים.",
        perfReason: "העלייה המטאורית ברווחים נובעת מהביקוש חסר התקדים לשרתי AI. החברה נהנית מהרחבת שולי הרווח הגולמי עקב מעבר למכירת מערכות שרתים שלמות עם פתרונות קירור נוזליים, לצד הגדלת כושר הייצור במפעליה.",
        investorCall: "בשיחת המשקיעים לרבעון האחרון ציין המנכ\"ל כי הביקוש לשרתי AI ממשיך לעלות באופן מואץ. החברה מתכננת הרחבה של קיבולת הייצור ב-40% עד סוף 2026. תחזית ההכנסות עודכנה כלפי מעלה ל-25-26 מיליארד דולר לשנת 2026.",
        sections: null
    },
    "GILT": {
        name: "Gilat Satellite Networks", price: "$15.97", dailyChange: "+3.17%", dailyIsUp: true,
        volume: "0.00M", marketcap: "$3,633M", peTtm: "31.31", pe2026: "27.07", cagr: "17.63%",
        peg: "1.78", peg2026: "1.54", beta: "1.00", high52: "-23.70%", low52: "+175.34%",
        m1: "-20.43%", m3: "-4.49%", m6: "+34.65%", m12: "+172.53%", ytd: "+23.42%",
        epsTtm: "0.51", eps26: "0.59", eps27: "0.76", eps28: "0.83",
        desc: "גילת רשתות לוויין (Gilat) היא ספקית עולמית מובילה של טכנולוגיה מבוססת לוויין, רשתות תקשורת ושירותים משלימים. החברה מציעה פתרונות פס רחב ורשתות קישוריות קריטיות בכל רחבי העולם, עם התמחות מיוחדת בתחבורה וקישוריות בטיסה.",
        aiRel: "רשתות לוויין מודרניות עוברות אופטימיזציה קריטית מבוססת AI. גילת משלבת אלגוריתמים של למידת מכונה במערכות הניהול שלה כדי לנהל רוחב פס לווייני דינמי ולנתב תעבורה ביעילות בזמן אמת.",
        moat: "החפיר של גילת נשען על קשרי לקוחות ממשלתיים וצבאיים ארוכי טווח ופורטפוליו פטנטים עשיר בטכנולוגיות VSAT.",
        perfReason: "החברה מציגה שיפור משמעותי ברווחים הודות לחוזים חדשים עם צבא ארה\"ב ופריסת רשתות באמריקה הלטינית.",
        investorCall: "בשיחת המשקיעים הדגישה ההנהלה את הצמיחה בחוזים ממשלתיים ואת ההתרחבות לשוק ה-LEO. תחזית ה-EBITDA לשנת 2026 עודכנה כלפי מעלה ב-12%.",
        sections: null
    },
    "FORM": {
        name: "FormFactor Inc.", price: "$126.61", dailyChange: "+0.46%", dailyIsUp: true,
        volume: "0.01M", marketcap: "$9,869M", peTtm: "147.22", pe2026: "51.68", cagr: "49.78%",
        peg: "2.96", peg2026: "1.04", beta: "1.26", high52: "-20.42%", low52: "+385.47%",
        m1: "-12.68%", m3: "+46.08%", m6: "+120.38%", m12: "+293.32%", ytd: "+126.98%",
        epsTtm: "0.86", eps26: "2.45", eps27: "3.06", eps28: "2.89",
        desc: "חברת FormFactor היא מובילה עולמית באספקת טכנולוגיות ומערכות בדיקה מבוססות מוליכים למחצה. מוצריה העיקריים הם כרטיסי פרובים (Probe Cards) המשמשים לבדיקת תקינות פרוסות סיליקון בשלבים המוקדמים.",
        aiRel: "כל שבב AI חייב לעבור בדיקות קפדניות לפני אריזתו. FormFactor מפתחת כרטיסי בדיקה מתקדמים התומכים בטכנולוגיות 3D Packaging ו-HBM ההכרחיים לשבבי AI מודרניים.",
        moat: "החפיר מבוסס על מורכבות הנדסית קיצונית ופטנטים על טכנולוגיית מיקרו-קפיצים (MEMS micro-springs).",
        perfReason: "ההאצה החדה ברווחים מונעת מהזינוק בביקוש לשבבי זיכרון HBM לשרתי AI ושבבי מחשוב עתיר ביצועים.",
        investorCall: "המנכ\"ל הדגיש כי הביקוש לפתרונות בדיקה לשבבי HBM-4 עולה על ההיצע. החברה הכריזה על השקעה של 200 מיליון דולר בהרחבת מתקני הייצור.",
        sections: null
    }
};

// ============================================================
// STATE
// ============================================================
let stocksDb = JSON.parse(localStorage.getItem('stocks_db_v3') || 'null') || JSON.parse(JSON.stringify(initialStocksDb));
let activeTicker = Object.keys(stocksDb)[0] || "SMCI";
let globalLogoSrc = localStorage.getItem('global_logo_src_v3') || null;
let currentIconPickerSection = null;
let xlsxRows = [], xlsxHeaders = [];

function persistDb() { localStorage.setItem('stocks_db_v3', JSON.stringify(stocksDb)); }

function getStockSections(ticker) {
    if (stocksDb[ticker] && stocksDb[ticker].sections) return stocksDb[ticker].sections;
    const secs = JSON.parse(JSON.stringify(DEFAULT_SECTIONS));
    secs.forEach(sec => {
        if (sec.contentKey) sec.content = stocksDb[ticker]?.[sec.contentKey] || '';
    });
    return secs;
}

function saveStockSections(ticker, sections) {
    if (!stocksDb[ticker]) return;
    stocksDb[ticker].sections = sections;
    persistDb();
}

// ============================================================
// INIT
// ============================================================
window.onload = function () {
    if (globalLogoSrc) document.getElementById("logoImg").src = globalLogoSrc;
    renderStocksList();
    loadReport(activeTicker);
    lucide.createIcons();
};

// ============================================================
// MOBILE
// ============================================================
function toggleMobileSidebar() {
    const sb = document.getElementById("sidebarPanel");
    const ov = document.getElementById("mobileOverlay");
    sb.classList.toggle("mobile-open");
    ov.classList.toggle("hidden");
}

// ============================================================
// SECTIONS RENDER
// ============================================================
function renderSections(ticker) {
    const sections = getStockSections(ticker);
    const col = document.getElementById("sectionsColumn");
    col.innerHTML = "";
    sections.forEach(sec => {
        const block = document.createElement("div");
        block.className = "section-block";
        block.dataset.id = sec.id;
        block.innerHTML = `
    <div class="flex items-center mb-0.5">
        <h3 class="text-xs font-extrabold text-slate-900 border-b-2 border-slate-900 pb-0.5 flex items-center gap-1.5 flex-1 min-w-0 w-full">
            <button onclick="openIconPicker('${sec.id}')" title="שנה אייקון" class="no-print hover:bg-slate-100 rounded p-0.5 shrink-0 transition-all">
                <i data-lucide="${sec.icon}" class="w-3.5 h-3.5 text-slate-800 pointer-events-none"></i>
            </button>
            <span contenteditable="true" class="outline-none" id="secTitle_${sec.id}" onblur="saveSectionTitle('${sec.id}')">${sec.title}</span>
        </h3>
    </div>
    <div class="text-[11px] text-slate-700 mt-0.5 leading-normal text-justify whitespace-pre-line"
         id="secContent_${sec.id}" contenteditable="true"
         onblur="saveSectionContent('${sec.id}')">${sec.content || ''}</div>`;
        col.appendChild(block);
    });
    lucide.createIcons();
    renderSectionManager(sections);
}

function renderSectionManager(sections) {
    const list = document.getElementById("sectionManagerList");
    list.innerHTML = "";
    sections.forEach((sec, idx) => {
        const item = document.createElement("div");
        item.className = "flex items-center justify-between text-[10px] bg-slate-50 border border-slate-200 rounded-lg px-2 py-1";
        item.innerHTML = `
    <div class="flex items-center gap-1 flex-1 min-w-0">
        <i data-lucide="${sec.icon}" class="w-3 h-3 text-slate-500 shrink-0"></i>
        <span class="truncate text-slate-700 font-medium text-[9px]">${sec.title}</span>
    </div>
    <div class="flex gap-0.5 shrink-0">
        <button onclick="moveSectionUp('${sec.id}')" class="text-slate-400 hover:text-blue-600 p-0.5 ${idx === 0 ? 'opacity-30' : ''}" ${idx === 0 ? 'disabled' : ''}>
            <i data-lucide="chevron-up" class="w-3 h-3"></i>
        </button>
        <button onclick="moveSectionDown('${sec.id}')" class="text-slate-400 hover:text-blue-600 p-0.5 ${idx === sections.length - 1 ? 'opacity-30' : ''}" ${idx === sections.length - 1 ? 'disabled' : ''}>
            <i data-lucide="chevron-down" class="w-3 h-3"></i>
        </button>
        <button onclick="removeSection('${sec.id}')" class="text-rose-400 hover:text-rose-600 p-0.5">
            <i data-lucide="x" class="w-3 h-3"></i>
        </button>
    </div>`;
        list.appendChild(item);
    });
    lucide.createIcons();
}

function saveSectionTitle(id) {
    const secs = getStockSections(activeTicker);
    const sec = secs.find(s => s.id === id);
    if (sec) { sec.title = document.getElementById("secTitle_" + id).innerText; saveStockSections(activeTicker, secs); renderSectionManager(secs); }
}

function saveSectionContent(id) {
    const secs = getStockSections(activeTicker);
    const sec = secs.find(s => s.id === id);
    if (sec) { sec.content = document.getElementById("secContent_" + id).innerText; saveStockSections(activeTicker, secs); }
}

function removeSection(id) {
    const secs = getStockSections(activeTicker);
    const sec = secs.find(s => s.id === id);
    if (!sec) return;
    if (confirm(`להסיר את הפסקה "${sec.title}"?`)) {
        saveStockSections(activeTicker, secs.filter(s => s.id !== id));
        renderSections(activeTicker);
    }
}

function moveSectionUp(id) {
    const secs = getStockSections(activeTicker);
    const idx = secs.findIndex(s => s.id === id);
    if (idx <= 0) return;
    [secs[idx - 1], secs[idx]] = [secs[idx], secs[idx - 1]];
    saveStockSections(activeTicker, secs);
    renderSections(activeTicker);
}

function moveSectionDown(id) {
    const secs = getStockSections(activeTicker);
    const idx = secs.findIndex(s => s.id === id);
    if (idx >= secs.length - 1) return;
    [secs[idx + 1], secs[idx]] = [secs[idx], secs[idx + 1]];
    saveStockSections(activeTicker, secs);
    renderSections(activeTicker);
}

function openAddSectionModal() {
    document.getElementById("sectionModalTitle").value = "";
    document.getElementById("sectionModalContent").value = "";
    document.getElementById("sectionModal").classList.remove("hidden");
}

function closeSectionModal() { document.getElementById("sectionModal").classList.add("hidden"); }
function closeSectionModalOutside(e) { if (e.target === document.getElementById("sectionModal")) closeSectionModal(); }

function confirmAddSection() {
    const title = document.getElementById("sectionModalTitle").value.trim();
    if (!title) { alert("יש להזין כותרת"); return; }
    const secs = getStockSections(activeTicker);
    secs.push({ id: 's' + Date.now(), icon: 'file-text', title, content: document.getElementById("sectionModalContent").value });
    saveStockSections(activeTicker, secs);
    renderSections(activeTicker);
    closeSectionModal();
}

// ============================================================
// ICON PICKER
// ============================================================
function openIconPicker(id) {
    currentIconPickerSection = id;
    const grid = document.getElementById("iconPickerGrid");
    grid.innerHTML = "";
    ICONS.forEach(icon => {
        const btn = document.createElement("button");
        btn.className = "p-1.5 rounded hover:bg-slate-100 border border-transparent hover:border-slate-300 flex items-center justify-center";
        btn.title = icon;
        btn.innerHTML = `<i data-lucide="${icon}" class="w-4 h-4 text-slate-700"></i>`;
        btn.onclick = () => selectIcon(icon);
        grid.appendChild(btn);
    });
    document.getElementById("iconPickerModal").classList.remove("hidden");
    lucide.createIcons();
}

function selectIcon(icon) {
    if (!currentIconPickerSection) return;
    const secs = getStockSections(activeTicker);
    const sec = secs.find(s => s.id === currentIconPickerSection);
    if (sec) { sec.icon = icon; saveStockSections(activeTicker, secs); renderSections(activeTicker); }
    closeIconPicker();
}

function closeIconPicker() { document.getElementById("iconPickerModal").classList.add("hidden"); currentIconPickerSection = null; }
function closeIconPickerOutside(e) { if (e.target === document.getElementById("iconPickerModal")) closeIconPicker(); }

// ============================================================
// PERFORMANCE COLOR + ARROW HELPERS
// ============================================================
function stripArrow(s) { return String(s || '').replace(/^[▲▼⬆⬇↑↓]\s*/u, '').trim(); }
function isNegPerf(s) { const c = stripArrow(s); return c.startsWith('-') || parseFloat(c) < 0; }
function applyPerfColor(el) {
    const raw = stripArrow(el.innerText);
    if (!raw || raw === '-') return;
    const neg = isNegPerf(raw);
    el.style.color = neg ? '#dc2626' : '#059669';
    el.innerText = (neg ? '▼ ' : '▲ ') + raw;
}
function applyAllPerfColors() {
    ['perf1M','perf3M','perf6M','perf12M','perfYtd'].forEach(id => {
        const el = document.getElementById(id);
        if (el) applyPerfColor(el);
    });
}

// ============================================================
// EPS BAR CHART (VERTICAL)
// ============================================================
function renderEpsBars() {
    const v = [
        parseFloat(document.getElementById("epsValTtm").innerText) || 0,
        parseFloat(document.getElementById("epsVal26").innerText) || 0,
        parseFloat(document.getElementById("epsVal27").innerText) || 0,
        parseFloat(document.getElementById("epsVal28").innerText) || 0
    ];
    const mx = Math.max(...v, 0.01);
    const epsBarTtm = document.getElementById("epsBarTtm");
    const epsBar26 = document.getElementById("epsBar26");
    const epsBar27 = document.getElementById("epsBar27");
    const epsBar28 = document.getElementById("epsBar28");
    if (epsBarTtm) { epsBarTtm.style.height = `${Math.max(4, (v[0] / mx) * 88)}%`; epsBarTtm.setAttribute("data-val", v[0].toFixed(2)); }
    if (epsBar26)  { epsBar26.style.height  = `${Math.max(4, (v[1] / mx) * 88)}%`; epsBar26.setAttribute("data-val",  v[1].toFixed(2)); }
    if (epsBar27)  { epsBar27.style.height  = `${Math.max(4, (v[2] / mx) * 88)}%`; epsBar27.setAttribute("data-val",  v[2].toFixed(2)); }
    if (epsBar28)  { epsBar28.style.height  = `${Math.max(4, (v[3] / mx) * 88)}%`; epsBar28.setAttribute("data-val",  v[3].toFixed(2)); }
}

// ============================================================
// SAVE / LOAD
// ============================================================
function saveCurrentReportState() {
    if (!activeTicker || !stocksDb[activeTicker]) return;
    const s = stocksDb[activeTicker];
    const g = id => { const el = document.getElementById(id); return el ? el.innerText : ''; };
    s.name = g("companyNameHeader"); s.price = g("headerMarketPrice"); s.recommendation = g("headerRecommendation");
    s.marketcap = g("indMarketcap"); s.dailyChange = g("indDailyChange"); s.volume = g("indVolume");
    s.peTtm = g("indPeTtm"); s.pe2026 = g("indPe2026"); s.cagr = g("indCagr");
    s.peg = g("indPeg"); s.peg2026 = g("indPeg2026"); s.beta = g("indBeta");
    s.high52 = g("indHigh52"); s.low52 = g("indLow52");
    const gp = id => stripArrow(g(id));
    s.m1 = gp("perf1M"); s.m3 = gp("perf3M"); s.m6 = gp("perf6M"); s.m12 = gp("perf12M"); s.ytd = gp("perfYtd");
    s.epsTtm = g("epsValTtm"); s.eps26 = g("epsVal26"); s.eps27 = g("epsVal27"); s.eps28 = g("epsVal28");
    persistDb();
    renderStocksList();
}

document.getElementById("activeReport").addEventListener("blur", e => {
    if (e.target.hasAttribute("contenteditable")) saveCurrentReportState();
}, true);

function loadReport(ticker) {
    const stock = stocksDb[ticker];
    if (!stock) return;
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val || '-'; };
    set("tickerBadge", ticker); set("companyNameHeader", stock.name); set("headerMarketPrice", stock.price);
    set("headerRecommendation", stock.recommendation || "קנייה (BUY)");
    set("indMarketcap", stock.marketcap); set("indPrice", stock.price);
    set("indDailyChange", stock.dailyChange); set("indVolume", stock.volume);
    set("indPeTtm", stock.peTtm); set("indPe2026", stock.pe2026); set("indCagr", stock.cagr);
    set("indPeg", stock.peg); set("indPeg2026", stock.peg2026); set("indBeta", stock.beta);
    set("indHigh52", stock.high52); set("indLow52", stock.low52);
    set("perf1M", stock.m1); set("perf3M", stock.m3); set("perf6M", stock.m6); set("perf12M", stock.m12); set("perfYtd", stock.ytd);
    set("epsValTtm", stock.epsTtm); set("epsVal26", stock.eps26); set("epsVal27", stock.eps27); set("epsVal28", stock.eps28);
    const dc = document.getElementById("indDailyChange");
    if (dc) dc.className = (stock.dailyChange || '').includes('+') || !(stock.dailyChange || '').includes('-')
        ? "font-extrabold text-emerald-600 font-sans"
        : "font-extrabold text-rose-600 font-sans";
    applyAllPerfColors();
    renderSections(ticker);
    renderEpsBars();
}

// ============================================================
// STOCKS LIST
// ============================================================
function renderStocksList(q = "") {
    const list = document.getElementById("stocksList");
    list.innerHTML = "";
    const allTickers = Object.keys(stocksDb);
    let shown = 0;
    allTickers.forEach(ticker => {
        const stock = stocksDb[ticker];
        if (!(ticker.toLowerCase().includes(q.toLowerCase()) || stock.name.toLowerCase().includes(q.toLowerCase()))) return;
        shown++;
        const isActive = ticker === activeTicker;
        const isUp = (stock.dailyChange || '').includes("+") || !(stock.dailyChange || '').includes("-");
        const div = document.createElement("div");
        div.className = `p-2 mb-1.5 rounded-lg cursor-pointer transition-all border text-right ${isActive ? "bg-slate-900 text-white border-slate-900 shadow-sm" : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"}`;
        div.onclick = () => { saveCurrentReportState(); activeTicker = ticker; loadReport(ticker); renderStocksList(q); };
        div.innerHTML = `
    <div class="flex justify-between items-center">
        <span class="font-bold text-xs">${ticker}</span>
        <span class="text-[9px] ${isActive ? "text-slate-400" : "text-slate-500"} truncate max-w-[100px] font-sans text-left">${stock.name}</span>
    </div>
    <div class="flex justify-between items-center mt-0.5 text-[10px]">
        <span class="font-bold">${stock.price}</span>
        <span dir="ltr" class="${isActive ? (isUp ? 'text-emerald-400' : 'text-rose-400') : (isUp ? 'text-emerald-600' : 'text-rose-600')} font-sans font-semibold">${stock.dailyChange}</span>
    </div>`;
        list.appendChild(div);
    });
    const countEl = document.getElementById("stockCount");
    if (countEl) countEl.textContent = q ? `${shown}/${allTickers.length}` : allTickers.length;
    const importDate = localStorage.getItem('last_import_date_v3');
    const dateEl = document.getElementById("lastImportDate");
    if (dateEl && importDate) {
        dateEl.textContent = `ייבוא אחרון: ${importDate}`;
        dateEl.classList.remove("hidden");
    }
}

function filterStocks() { renderStocksList(document.getElementById("searchStock").value); }

// ============================================================
// LOGO
// ============================================================
function handleLogoUpload(input) {
    const file = input.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = e => { globalLogoSrc = e.target.result; document.getElementById("logoImg").src = globalLogoSrc; localStorage.setItem('global_logo_src_v3', globalLogoSrc); };
    reader.readAsDataURL(file);
}

// ============================================================
// RESET
// ============================================================
function resetData() {
    if (confirm("לאפס את כל השינויים?")) {
        localStorage.removeItem('stocks_db_v3');
        stocksDb = JSON.parse(JSON.stringify(initialStocksDb));
        activeTicker = "SMCI";
        loadReport(activeTicker);
        renderStocksList();
    }
}

// ============================================================
// IMPORT TOGGLE
// ============================================================
function toggleImportArea() { document.getElementById("importArea").classList.toggle("hidden"); }

// ============================================================
// XLSX IMPORT
// ============================================================
function processRawTable(json, sourceName) {
    const statusEl = document.getElementById("importStatus");
    if (!json || json.length < 2) { statusEl.textContent = "קובץ ריק או לא תקין"; return; }
    xlsxHeaders = json[0].map(h => String(h || "").trim());
    xlsxRows = json.slice(1).filter(r => r.some(c => c !== undefined && c !== "" && c !== null));
    statusEl.textContent = `✓ ${sourceName}: ${xlsxRows.length} שורות, ${xlsxHeaders.length} עמודות`;
    renderXlsxMapper();
}

function handleXlsxImport(input) {
    const file = input.files[0]; if (!file) return;
    const statusEl = document.getElementById("importStatus");
    statusEl.textContent = "טוען קובץ...";
    const name = file.name.toLowerCase();
    const isCsv = name.endsWith('.csv') || file.type === 'text/csv';
    const reader = new FileReader();
    if (isCsv) {
        reader.onload = e => {
            try {
                const wb = XLSX.read(e.target.result, { type: 'string' });
                const ws = wb.Sheets[wb.SheetNames[0]];
                const json = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false });
                processRawTable(json, file.name);
            } catch (err) { statusEl.textContent = "שגיאת CSV: " + err.message; }
        };
        reader.readAsText(file, 'UTF-8');
    } else {
        reader.onload = e => {
            try {
                const wb = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
                const ws = wb.Sheets[wb.SheetNames[0]];
                const json = XLSX.utils.sheet_to_json(ws, { header: 1 });
                processRawTable(json, file.name);
            } catch (err) { statusEl.textContent = "שגיאת Excel: " + err.message; }
        };
        reader.readAsArrayBuffer(file);
    }
}

function parsePastedCsv() {
    const text = document.getElementById("csvPasteArea").value.trim();
    const statusEl = document.getElementById("importStatus");
    if (!text) { statusEl.textContent = "אין טקסט להדבקה"; return; }
    try {
        const wb = XLSX.read(text, { type: 'string' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false });
        processRawTable(json, "CSV שהודבק");
    } catch (err) { statusEl.textContent = "שגיאה: " + err.message; }
}

const FIELD_PATTERNS = {
    ticker: ['ticker', 'סימול', 'מניה', 'symbol', 'stock', 'סימבול', 'קוד'],
    name: ['company name', 'company', 'שם חברה', 'שם', 'תאגיד', 'name', 'חברה', 'שם מניה'],
    price: ['price', 'מחיר', 'שער', 'close', 'last price', 'מחיר אחרון', 'שער אחרון'],
    dailyChange: ['daily change', 'daily %', 'שינוי %', 'שינוי יומי', 'שינוי', '% change', 'change %', 'change', 'daily', 'יומי'],
    volume: ['volume', 'מחזור', 'vol', 'מחזור מסחר'],
    marketcap: ['market cap', 'marketcap', 'market capitalization', 'שווי שוק', 'שווי', 'cap', 'שווי חברה'],
    peTtm: ['p/e ttm', 'pe ttm', 'p/e (ttm)', 'pe (ttm)', 'מכפיל רווח ttm', 'מכפיל רווח', 'pe', 'p/e', 'ttm pe'],
    pe2026: ['p/e 2026', 'pe2026', 'pe 2026', 'pe 26', 'p/e forward', 'מכפיל עתידי', 'forward pe', 'forward p/e'],
    cagr: ['cagr', 'צמיחה', 'growth rate', 'growth', 'שיעור צמיחה', 'שצ"ש'],
    peg: ['peg ratio', 'peg ttm', 'peg', 'מכפיל peg'],
    peg2026: ['peg 2026', 'peg2026', 'peg forward'],
    beta: ['beta', 'בטא'],
    high52: ['52w high', '52 week high', '52w hi', 'high 52', 'גבוה 52', 'גבוה שנתי', '52 high'],
    low52: ['52w low', '52 week low', '52w lo', 'low 52', 'נמוך 52', 'נמוך שנתי', '52 low'],
    m1: ['1m', '1m %', '1 month', 'חודש', '1mo', 'return 1m', 'תשואה חודש'],
    m3: ['3m', '3m %', '3 months', '3 month', '3 חודשים', '3mo', 'return 3m'],
    m6: ['6m', '6m %', '6 months', '6 month', '6 חודשים', '6mo', 'return 6m'],
    m12: ['12m', '12m %', '12 months', '12 month', '1 year', '1y', 'שנה', '12mo', 'return 1y'],
    ytd: ['ytd', 'ytd %', 'מתחילת שנה', 'year to date', 'return ytd', 'תשואה ytd'],
    epsTtm: ['eps ttm', 'eps (ttm)', 'eps היסטורי', 'ttm eps', 'eps trailing', 'רווח למניה ttm', 'eps'],
    eps26: ['eps 26', 'eps 2026', '2026 eps', 'eps est 2026', 'רווח למניה 2026'],
    eps27: ['eps 27', 'eps 2027', '2027 eps', 'eps est 2027', 'רווח למניה 2027'],
    eps28: ['eps 28', 'eps 2028', '2028 eps', 'eps est 2028', 'רווח למניה 2028']
};

const FIELD_LABELS = {
    ticker: 'סימול', name: 'שם חברה', price: 'מחיר', dailyChange: 'שינוי יומי', volume: 'מחזור',
    marketcap: 'שווי שוק', peTtm: 'P/E TTM', pe2026: 'P/E 2026', cagr: 'CAGR', peg: 'PEG',
    peg2026: 'PEG 2026', beta: 'Beta', high52: 'גבוה 52 שב', low52: 'נמוך 52 שב',
    m1: '1M', m3: '3M', m6: '6M', m12: '12M', ytd: 'YTD', epsTtm: 'EPS TTM', eps26: 'EPS 26', eps27: 'EPS 27', eps28: 'EPS 28'
};

function guessField(header) {
    const h = header.toLowerCase().replace(/\n|\r/g, ' ').replace(/\s+/g, ' ').trim();
    for (const [field, patterns] of Object.entries(FIELD_PATTERNS)) {
        if (patterns.some(p => h === p)) return field;
    }
    for (const [field, patterns] of Object.entries(FIELD_PATTERNS)) {
        if (patterns.some(p => h.startsWith(p) || p.startsWith(h))) return field;
    }
    for (const [field, patterns] of Object.entries(FIELD_PATTERNS)) {
        if (patterns.some(p => p.length > 2 && h.includes(p))) return field;
    }
    return "";
}

function renderXlsxMapper() {
    const container = document.getElementById("xlsxColumnMapper");
    container.innerHTML = '<p class="text-[10px] font-bold text-slate-700 mb-1.5">מיפוי עמודות:</p>';
    const grid = document.createElement("div");
    grid.className = "grid grid-cols-2 gap-1";
    Object.keys(FIELD_LABELS).forEach(field => {
        const guess = xlsxHeaders.findIndex(h => guessField(h) === field);
        const div = document.createElement("div");
        div.innerHTML = `<span class="text-[9px] text-slate-500 block">${FIELD_LABELS[field]}</span>
    <select id="map_${field}" class="text-[9px] border border-slate-300 rounded px-1 py-0.5 w-full focus:outline-none">
        <option value="">-- לא ממופה --</option>
        ${xlsxHeaders.map((h, i) => `<option value="${i}" ${i === guess && guess >= 0 ? 'selected' : ''}>${h}</option>`).join('')}
    </select>`;
        grid.appendChild(div);
    });
    container.appendChild(grid);
    container.classList.remove("hidden");
    document.getElementById("importConfirmBtn").classList.remove("hidden");
}

function confirmXlsxImport() {
    const statusEl = document.getElementById("importStatus");
    try {
        const mapping = {};
        Object.keys(FIELD_LABELS).forEach(field => {
            const sel = document.getElementById("map_" + field);
            if (sel && sel.value !== "") mapping[field] = parseInt(sel.value);
        });
        const newDb = {};

        const fmtPct = v => {
            if (!v && v !== 0) return "0.00%";
            const s = String(v).trim();
            if (s === '' || s === '-') return '-';
            if (s.includes('%')) return s;
            const n = parseFloat(s);
            if (isNaN(n)) return s;
            if (Math.abs(n) < 5 && Math.abs(n) > 0) return (n * 100).toFixed(2) + '%';
            return n.toFixed(2) + '%';
        };

        const fmt$ = v => {
            if (!v) return "$0.00";
            const s = String(v).trim();
            if (s.startsWith('$')) return s;
            return '$' + s;
        };

        const fmtNum = v => {
            if (!v && v !== 0) return "-";
            const s = String(v).trim();
            if (!s || s === '-') return '-';
            const n = parseFloat(s);
            if (isNaN(n)) return s;
            return n.toFixed(2);
        };

        xlsxRows.forEach((row, ri) => {
            const item = {};
            Object.entries(mapping).forEach(([f, ci]) => { item[f] = row[ci] !== undefined ? row[ci] : ""; });
            const key = item.ticker ? String(item.ticker).trim().toUpperCase() : `STOCK_${ri + 1}`;
            if (key === 'STOCK_' + (ri + 1) && !item.name) return;

            newDb[key] = {
                name: item.name ? String(item.name).trim() : key,
                price: fmt$(item.price),
                dailyChange: fmtPct(item.dailyChange),
                dailyIsUp: !String(item.dailyChange || '').includes('-'),
                volume: item.volume ? String(item.volume).trim() : "0.00M",
                marketcap: fmt$(item.marketcap),
                peTtm: fmtNum(item.peTtm), pe2026: fmtNum(item.pe2026),
                cagr: fmtPct(item.cagr), peg: fmtNum(item.peg), peg2026: fmtNum(item.peg2026),
                beta: fmtNum(item.beta), high52: fmtPct(item.high52), low52: fmtPct(item.low52),
                m1: fmtPct(item.m1), m3: fmtPct(item.m3), m6: fmtPct(item.m6),
                m12: fmtPct(item.m12), ytd: fmtPct(item.ytd),
                epsTtm: fmtNum(item.epsTtm), eps26: fmtNum(item.eps26),
                eps27: fmtNum(item.eps27), eps28: fmtNum(item.eps28),
                desc: `חברת ${item.name || key} - פרטים מקובץ Excel. יש לערוך.`,
                aiRel: "יש לערוך טקסט זה.", moat: "יש לערוך טקסט זה.",
                perfReason: "יש לערוך טקסט זה.", investorCall: "יש לערוך טקסט זה.", sections: null
            };
        });

        if (!Object.keys(newDb).length) { statusEl.textContent = "לא נמצאו נתונים תקינים"; return; }
        Object.assign(stocksDb, newDb);
        persistDb();

        const now = new Date();
        const dateStr = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        localStorage.setItem('last_import_date_v3', dateStr);

        activeTicker = Object.keys(newDb)[0];
        document.getElementById("importArea").classList.add("hidden");
        document.getElementById("xlsxColumnMapper").classList.add("hidden");
        document.getElementById("importConfirmBtn").classList.add("hidden");
        statusEl.textContent = "";
        document.getElementById("xlsxFileInput").value = "";
        renderStocksList();
        loadReport(activeTicker);
        alert(`ייבוא הושלם! נוספו ${Object.keys(newDb).length} מניות.`);
    } catch (err) { statusEl.textContent = "שגיאה: " + err.message; console.error(err); }
}

// ============================================================
// EXPORT TO HTML
// ============================================================
function exportToHTML() {
    saveCurrentReportState();
    const stock = stocksDb[activeTicker];
    const sections = getStockSections(activeTicker);
    const logoSrc = globalLogoSrc || document.getElementById("logoImg").src;
    const g = id => { const el = document.getElementById(id); return el ? el.innerText.trim() : ''; };
    const gh = id => { const el = document.getElementById(id); return el ? el.innerHTML : ''; };
    const v = [parseFloat(stock.epsTtm) || 0, parseFloat(stock.eps26) || 0, parseFloat(stock.eps27) || 0, parseFloat(stock.eps28) || 0];
    const mx = Math.max(...v, 0.01);
    const pct = val => Math.round((val / mx) * 85);

    const lblTtm = g("epsLabelTtm") || "TTM";
    const lbl26  = g("epsLabel26")  || "2026";
    const lbl27  = g("epsLabel27")  || "2027";
    const lbl28  = g("epsLabel28")  || "2028";
    const epsCardTitleTxt = g("epsCardTitle") || "תחזית רווח למניה (EPS)";
    const footerL = g("footerTextL"); const footerR = g("footerTextR");

    const ICON_EMO = {
        building:'🏢', cpu:'💻', shield:'🛡️', 'bar-chart-3':'📊', 'trending-up':'📈',
        star:'⭐', zap:'⚡', globe:'🌐', layers:'▤', briefcase:'💼', users:'👥',
        target:'🎯', award:'🏆', flag:'🚩', bookmark:'🔖', activity:'📉',
        lightbulb:'💡', info:'ℹ️', 'alert-circle':'⚠️', 'check-circle':'✅',
        package:'📦', database:'🗄️', server:'🖥️', cloud:'☁️', lock:'🔒',
        eye:'👁️', search:'🔍', settings:'⚙️', wrench:'🔧', compass:'🧭',
        'pie-chart':'🥧', 'dollar-sign':'💲', percent:'%', microphone:'🎤',
        megaphone:'📣', 'message-circle':'💬', phone:'📞', mail:'✉️', bell:'🔔',
        calendar:'📅', clock:'⏰', 'file-text':'📄', folder:'📁', link:'🔗',
        brain:'🧠', bot:'🤖', network:'🌐', 'hard-drive':'💾', monitor:'🖥️',
        'bar-chart-2':'📊', 'circuit-board':'🔌'
    };
    const ico = s => ICON_EMO[s] || '●';

    const secHtml = sections.map(sec => `
<div style="margin-bottom:12px;">
    <div style="font-size:13px;font-weight:bold;color:#0f172a;border-bottom:1.5px solid #0f172a;padding-bottom:2px;margin-bottom:4px;">${ico(sec.icon)} ${sec.title}</div>
    <div style="font-size:12.32px;color:#334155;text-align:justify;line-height:1.4;color:black;">${(sec.content || '').replace(/\n/g, '<br>')}</div>
</div>`).join('');

    const perfIsNeg = v => String(v || '').startsWith('-') || parseFloat(v) < 0;
    const perfArrow = v => perfIsNeg(v) ? '▼ ' : '▲ ';
    const perfColor = v => perfIsNeg(v) ? '#dc2626' : '#059669';
    const perfCell = (lbl, v) => `<div class="perf-cell"><span>${lbl}</span><b style="color:${perfColor(v)};">${perfArrow(v)}${v}</b></div>`;
    const dailyColor = (stock.dailyChange || '').includes('+') ? '#059669' : '#dc2626';

    const html = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>דוח מחקר - ${activeTicker} - ${stock.name}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Assistant',Arial,sans-serif;background:#f3f4f6;direction:rtl;text-align:right;color:#1e293b;}
.page{width:210mm;min-height:297mm;background:white;margin:20px auto;padding:12mm 15mm;box-shadow:0 4px 20px rgba(0,0,0,0.1);display:flex;flex-direction:column;}
.page-content{flex:1;}
.header{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #0f172a;padding-bottom:8px;margin-bottom:12px;}
.logo-wrap{display:flex;align-items:center;gap:10px;}
.logo-main{font-size:20px;font-weight:900;color:#0f172a;letter-spacing:2px;line-height:1;}
.logo-sub{font-size:8px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-top:2px;}
.header-info{text-align:left;font-size:10px;color:#475569;flex-shrink:0;}
.banner{background:#0f172a;color:white;padding:10px 14px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}
.two-col{display:grid;grid-template-columns:65% 35%;gap:14px;}
.ind-box{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:9px;}
.ind-title-row{font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:1px;color:#0f172a;border-bottom:1px solid #e2e8f0;padding-bottom:5px;margin-bottom:7px;}
.ind-row{display:flex;justify-content:space-between;align-items:baseline;font-size:12px;margin-bottom:3px;gap:6px;}
.ind-lbl{color:#64748b;white-space:nowrap;flex-shrink:1;}
.ind-val{font-weight:700;white-space:nowrap;flex-shrink:0;text-align:left;direction:ltr;}
.eps-box{background:#0f172a;color:white;border-radius:10px;padding:10px;margin-top:10px;}
.eps-title{font-size:11px;font-weight:900;color:white;border-bottom:1px solid #334155;padding-bottom:3px;margin-bottom:8px;}
.eps-chart{display:flex;flex-direction:row;direction:ltr;align-items:flex-end;justify-content:space-evenly;height:120px;padding:0 6px;}
.eps-bar-wrap{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;width:26px;flex:none;height:100%;}
.eps-bar{width:100%;border-radius:3px 3px 0 0;}
.eps-bar-lbl{font-size:9px;color:#94a3b8;margin-top:3px;text-align:center;direction:ltr;}
.eps-bar-val{font-size:9px;font-weight:bold;margin-bottom:1px;text-align:center;direction:ltr;}
.perf-grid{display:grid;grid-template-columns:1fr 1fr;gap:3px;font-size:12px;margin-top:3px;}
.perf-cell{display:flex;justify-content:space-between;background:white;border:1px solid #f1f5f9;padding:2px 4px;border-radius:3px;}
.perf-cell>b{direction:ltr;}
.ind-row>b{direction:ltr;}
.disc{border:1px dashed #cbd5e1;border-radius:6px;padding:7px;font-size:9px;color:#64748b;margin-top:8px;line-height:1.4;}
.glossary{font-size:8px;color:#94a3b8;line-height:1.6;margin-top:8px;padding-top:6px;border-top:1px solid #e2e8f0;}
.glossary b{color:#64748b;}
.footer{display:flex;justify-content:space-between;font-size:8px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:8px;margin-top:auto;}
@media(max-width:600px){.two-col{grid-template-columns:1fr;}.page{width:100%;min-height:auto;padding:4mm;margin:0;}}
@media print{body{background:none;}.page{box-shadow:none;margin:0;width:210mm;padding:12mm 15mm;}}
</style>
</head>
<body>
<div class="page">
<div class="page-content">
<div class="header">
    <div class="logo-wrap">
        <img src="${logoSrc}" width="36" height="36" style="object-fit:contain;" alt="לוגו">
        <div><div class="logo-main">${g("logoTextMain")}</div><div class="logo-sub">${g("logoTextSub")}</div></div>
    </div>
    <div class="header-info"><b>${g("headerDate")}</b><br>${g("headerAuthor")}<br>${g("headerContact")}</div>
</div>
<div class="banner">
    <div>
        <span style="background:#2563eb;color:white;padding:1px 5px;font-size:8px;font-weight:bold;border-radius:3px;">${activeTicker}</span>
        <div style="font-size:16px;font-weight:bold;margin-top:3px;">${stock.name}</div>
        <div style="font-size:9px;color:#94a3b8;">${g("headerSubtitle")}</div>
    </div>
    <div style="text-align:left;">
        <div style="font-size:8px;color:#cbd5e1;">${g("headerRecLabel")}</div>
        <div style="font-size:13px;font-weight:bold;color:#4ade80;">${g("headerRecommendation")}</div>
        <div style="font-size:9px;color:#f1f5f9;">מחיר שוק: ${stock.price}</div>
    </div>
</div>
<div class="two-col">
    <div>${secHtml}</div>
    <div>
        <div class="ind-box">
            <div class="ind-title-row">📊 ${g("indCardTitle").replace(/[\n\r]+/g, ' ').replace(/[^\x20-\xFF֐-׿ﬀ-ﭏ]/gu,'').trim()}</div>
            <div class="ind-row"><span class="ind-lbl">שווי שוק:</span><span class="ind-val">${stock.marketcap}</span></div>
            <div class="ind-row"><span class="ind-lbl">מחיר מניה:</span><span class="ind-val">${stock.price}</span></div>
            <div class="ind-row"><span class="ind-lbl">שינוי יומי:</span><span class="ind-val" style="color:${dailyColor};">${stock.dailyChange}</span></div>
            <div class="ind-row"><span class="ind-lbl">מחזור מסחר:</span><span class="ind-val">${stock.volume}</span></div>
            <hr style="margin:3px 0;border:none;border-top:1px solid #e2e8f0;">
            <div class="ind-row"><span class="ind-lbl">מכפיל רווח (TTM):</span><span class="ind-val">${stock.peTtm}</span></div>
            <div class="ind-row"><span class="ind-lbl">P/E עתידי 2026:</span><span class="ind-val" style="color:#1d4ed8;">${stock.pe2026}</span></div>
            <div class="ind-row"><span class="ind-lbl">CAGR:</span><span class="ind-val">${stock.cagr}</span></div>
            <div class="ind-row"><span class="ind-lbl">PEG:</span><span class="ind-val">${stock.peg}</span></div>
            <div class="ind-row"><span class="ind-lbl">PEG עתידי 2026:</span><span class="ind-val" style="color:#1d4ed8;">${stock.peg2026}</span></div>
            <div class="ind-row"><span class="ind-lbl">Beta:</span><span class="ind-val">${stock.beta}</span></div>
            <hr style="margin:3px 0;border:none;border-top:1px solid #e2e8f0;">
            <div class="ind-row"><span class="ind-lbl">גבוה 52 שבועות:</span><span class="ind-val" style="color:#dc2626;">${stock.high52}</span></div>
            <div class="ind-row"><span class="ind-lbl">נמוך 52 שבועות:</span><span class="ind-val" style="color:#059669;">${stock.low52}</span></div>
            <hr style="margin:3px 0;border:none;border-top:1px solid #e2e8f0;">
            <div style="font-size:12px;font-weight:bold;color:#334155;margin-bottom:3px;">תשואות לתקופות מסחר:</div>
            <div class="perf-grid">
                ${perfCell('חודש:',stock.m1)}
                ${perfCell('3M:',stock.m3)}
                ${perfCell('6M:',stock.m6)}
                ${perfCell('12M:',stock.m12)}
            </div>
            <div class="ind-row" style="margin-top:3px;background:#eff6ff;padding:2px 4px;border-radius:3px;">
                <span style="color:#1d4ed8;font-weight:bold;">YTD:</span>
                <b style="color:${perfColor(stock.ytd)};">${perfArrow(stock.ytd)}${stock.ytd}</b>
            </div>
        </div>
        <div class="eps-box">
            <div class="eps-title">📈 ${epsCardTitleTxt}</div>
            <div class="eps-chart">
                <div class="eps-bar-wrap"><div class="eps-bar-val" style="color:#94a3b8;">${stock.epsTtm}</div><div class="eps-bar" style="background:#94a3b8;height:${pct(v[0])}%;"></div><div class="eps-bar-lbl">${lblTtm}</div></div>
                <div class="eps-bar-wrap"><div class="eps-bar-val" style="color:#e2e8f0;">${stock.eps26}</div><div class="eps-bar" style="background:#3b82f6;height:${pct(v[1])}%;"></div><div class="eps-bar-lbl">${lbl26}</div></div>
                <div class="eps-bar-wrap"><div class="eps-bar-val" style="color:#e2e8f0;">${stock.eps27}</div><div class="eps-bar" style="background:#3b82f6;height:${pct(v[2])}%;"></div><div class="eps-bar-lbl">${lbl27}</div></div>
                <div class="eps-bar-wrap"><div class="eps-bar-val" style="color:#e2e8f0;">${stock.eps28}</div><div class="eps-bar" style="background:#3b82f6;height:${pct(v[3])}%;"></div><div class="eps-bar-lbl">${lbl28}</div></div>
            </div>
        </div>
        <div class="disc">${gh("disclosureBlock")}</div>
    </div>
</div>
</div>
<div class="glossary">
    <b style="color:#475569;font-size:8.5px;">מקרא: </b>
    <b>P/E</b> — יחס בין מחיר המניה לרווח למניה.&nbsp;|&nbsp;<b>EPS</b> — רווח נקי חלקי מספר המניות.&nbsp;|&nbsp;<b>CAGR</b> — שיעור צמיחה שנתי ממוצע.&nbsp;|&nbsp;<b>PEG</b> — P/E חלקי קצב הצמיחה; ערך מתחת ל-1 מעיד על הזדמנות.&nbsp;|&nbsp;<b>Beta</b> — תנודתיות ביחס לשוק.&nbsp;|&nbsp;<b>52W High/Low</b> — שינוי % ממחיר גבוה/נמוך ב-52 שבועות.&nbsp;|&nbsp;<b>YTD</b> — תשואה מתחילת השנה.
</div>
<div class="footer"><span>${footerL}</span><span>${footerR}</span></div>
</div>
</body>
</html>`;
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `Report_${activeTicker}_${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
}

// ============================================================
// EXPORT TO WORD
// ============================================================
function exportToWord() {
    saveCurrentReportState();
    const stock = stocksDb[activeTicker];
    const sections = getStockSections(activeTicker);
    const logoSrc = globalLogoSrc || document.getElementById("logoImg").src;
    const g = id => { const el = document.getElementById(id); return el ? el.innerText : ''; };
    const v = [parseFloat(stock.epsTtm) || 0, parseFloat(stock.eps26) || 0, parseFloat(stock.eps27) || 0, parseFloat(stock.eps28) || 0];
    const mx = Math.max(...v, 1);
    const w = val => Math.round((val / mx) * 120);
    const ICON_EMO = {
        building:'🏢',cpu:'💻',shield:'🛡️','bar-chart-3':'📊','trending-up':'📈',
        star:'⭐',zap:'⚡',globe:'🌐',layers:'▤',briefcase:'💼',users:'👥',
        target:'🎯',award:'🏆',flag:'🚩',bookmark:'🔖',activity:'📉',
        lightbulb:'💡',info:'ℹ️','alert-circle':'⚠️','check-circle':'✅',
        package:'📦',database:'🗄️',server:'🖥️',cloud:'☁️',lock:'🔒',
        eye:'👁️',search:'🔍',settings:'⚙️',wrench:'🔧',compass:'🧭',
        'pie-chart':'🥧','dollar-sign':'💲',percent:'%',microphone:'🎤',
        megaphone:'📣','message-circle':'💬',phone:'📞',mail:'✉️',bell:'🔔',
        calendar:'📅',clock:'⏰','file-text':'📄',folder:'📁',link:'🔗',
        brain:'🧠',bot:'🤖',network:'🌐','hard-drive':'💾',monitor:'🖥️','bar-chart-2':'📊','circuit-board':'🔌'
    };
    const ico = s => ICON_EMO[s] || '●';
    const perfNeg = v => String(v||'').startsWith('-') || parseFloat(v)<0;
    const perfArrow = v => perfNeg(v) ? '▼ ' : '▲ ';
    const perfColor = v => perfNeg(v) ? '#dc2626' : '#059669';
    const secHtml = sections.map(sec => `<div class="section-title">${ico(sec.icon)} ${sec.title}</div><div class="content-text">${(sec.content || '').replace(/\n/g, '<br>')}</div>`).join('');

    const wordHtml = `<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="utf-8"><style>
body{font-family:Arial,sans-serif;direction:rtl;text-align:right;color:#1e293b;line-height:1.35;}
.ht{width:100%;border-bottom:2px solid #0f172a;margin-bottom:12px;}
.banner{background:#0f172a;color:#fff;padding:10px 15px;margin-bottom:15px;}
.section-title{font-size:11px;font-weight:bold;color:#0f172a;border-bottom:1.5px solid #0f172a;padding-bottom:2px;margin-top:10px;margin-bottom:4px;}
.content-text{font-size:9.5px;color:#334155;margin-bottom:8px;text-align:justify;}
.it{width:100%;border-collapse:collapse;background:#f8fafc;border:1px solid #cbd5e1;margin-bottom:10px;}
.it td{padding:4px 6px;font-size:9px;border-bottom:1px solid #e2e8f0;}
.ititle{background:#f1f5f9;color:#0f172a;font-weight:bold;font-size:10px;padding:5px 6px;border:1px solid #cbd5e1;border-bottom:none;}
.eb{background:#0f172a;color:#fff;padding:8px;border-radius:8px;margin-bottom:10px;}
.etitle{font-size:10px;font-weight:bold;color:#38bdf8;border-bottom:1px solid #334155;padding-bottom:3px;margin-bottom:6px;}
.ebt{width:100%;border-collapse:collapse;}.ebt td{padding:3px 2px;font-size:9px;color:#e2e8f0;vertical-align:middle;}
.bg{background:#1e293b;width:120px;height:12px;border-radius:3px;overflow:hidden;display:inline-block;}
.bf{height:12px;border-radius:3px;display:inline-block;}
</style></head><body>
<table class="ht"><tr>
    <td style="text-align:right;vertical-align:middle;"><table><tr>
        <td style="padding-left:8px;"><img src="${logoSrc}" width="32" height="32"></td>
        <td><div style="font-size:18px;font-weight:bold;color:#0f172a;">${g("logoTextMain")}</div><div style="font-size:8px;color:#64748b;">${g("logoTextSub")}</div></td>
    </tr></table></td>
    <td style="text-align:left;font-size:9px;color:#475569;vertical-align:middle;"><b>תאריך:</b> ${g("headerDate")}<br><b>אנליסט:</b> ${g("headerAuthor")}<br>${g("headerContact")}</td>
</tr></table>
<div class="banner"><table style="width:100%;border-collapse:collapse;"><tr>
    <td style="text-align:right;">
        <span style="background:#2563eb;color:white;padding:1px 4px;font-size:8px;font-weight:bold;border-radius:2px;">${activeTicker}</span>
        <div style="font-size:15px;font-weight:bold;margin-top:3px;">${stock.name}</div>
        <div style="font-size:9px;color:#94a3b8;">${g("headerSubtitle")}</div>
    </td>
    <td style="text-align:left;vertical-align:middle;">
        <div style="font-size:8px;color:#cbd5e1;">${g("headerRecLabel")}</div>
        <div style="font-size:13px;font-weight:bold;color:#4ade80;">${g("headerRecommendation")}</div>
        <div style="font-size:9px;color:#f1f5f9;">מחיר שוק: ${stock.price}</div>
    </td>
</tr></table></div>
<table style="width:100%;border-collapse:collapse;"><tr>
    <td style="width:58%;vertical-align:top;padding-left:12px;border-left:1px solid #e2e8f0;">${secHtml}</td>
    <td style="width:42%;vertical-align:top;padding-right:12px;">
        <div class="ititle">אינדיקטורים פיננסיים מרכזיים</div>
        <table class="it">
            <tr><td><b>שווי שוק:</b></td><td style="text-align:left;"><b>${stock.marketcap}</b></td></tr>
            <tr><td>מחיר:</td><td style="text-align:left;">${stock.price}</td></tr>
            <tr><td>שינוי יומי:</td><td style="text-align:left;color:${(stock.dailyChange||'').includes('+')?'#059669':'#dc2626'};">${stock.dailyChange}</td></tr>
            <tr><td>מחזור:</td><td style="text-align:left;">${stock.volume}</td></tr>
            <tr><td>P/E TTM:</td><td style="text-align:left;">${stock.peTtm}</td></tr>
            <tr><td><b>P/E 2026:</b></td><td style="text-align:left;"><b style="color:#1d4ed8;">${stock.pe2026}</b></td></tr>
            <tr><td>CAGR:</td><td style="text-align:left;">${stock.cagr}</td></tr>
            <tr><td>PEG:</td><td style="text-align:left;">${stock.peg}</td></tr>
            <tr><td><b>PEG 2026:</b></td><td style="text-align:left;"><b style="color:#059669;">${stock.peg2026}</b></td></tr>
            <tr><td>Beta:</td><td style="text-align:left;">${stock.beta}</td></tr>
            <tr><td>גבוה 52 שב':</td><td style="text-align:left;color:#dc2626;">${stock.high52}</td></tr>
            <tr><td>נמוך 52 שב':</td><td style="text-align:left;color:#059669;">${stock.low52}</td></tr>
        </table>
        <div style="font-size:11px;font-weight:bold;color:#334155;margin:6px 0 3px;">תשואות:</div>
        <table style="width:100%;border-collapse:collapse;font-size:11px;">
            <tr>
                <td style="padding:2px 4px;border:1px solid #e2e8f0;">חודש:</td>
                <td style="padding:2px 4px;border:1px solid #e2e8f0;color:${perfColor(stock.m1)};font-weight:bold;">${perfArrow(stock.m1)}${stock.m1}</td>
                <td style="padding:2px 4px;border:1px solid #e2e8f0;">3M:</td>
                <td style="padding:2px 4px;border:1px solid #e2e8f0;color:${perfColor(stock.m3)};font-weight:bold;">${perfArrow(stock.m3)}${stock.m3}</td>
            </tr>
            <tr>
                <td style="padding:2px 4px;border:1px solid #e2e8f0;">6M:</td>
                <td style="padding:2px 4px;border:1px solid #e2e8f0;color:${perfColor(stock.m6)};font-weight:bold;">${perfArrow(stock.m6)}${stock.m6}</td>
                <td style="padding:2px 4px;border:1px solid #e2e8f0;">12M:</td>
                <td style="padding:2px 4px;border:1px solid #e2e8f0;color:${perfColor(stock.m12)};font-weight:bold;">${perfArrow(stock.m12)}${stock.m12}</td>
            </tr>
            <tr>
                <td colspan="2" style="padding:2px 4px;border:1px solid #e2e8f0;font-weight:bold;color:#1d4ed8;">YTD:</td>
                <td colspan="2" style="padding:2px 4px;border:1px solid #e2e8f0;color:${perfColor(stock.ytd)};font-weight:bold;">${perfArrow(stock.ytd)}${stock.ytd}</td>
            </tr>
        </table>
        <div class="eb">
            <div class="etitle">תחזית EPS - ציר X: שנים | ציר Y: EPS ($)</div>
            <table class="ebt">
                <tr><td>TTM:</td><td><div class="bg"><div class="bf" style="background:#94a3b8;width:${w(v[0])}px;"></div></div></td><td style="text-align:left;"><b>${stock.epsTtm}</b></td></tr>
                <tr><td style="color:#4ade80;font-weight:bold;">2026:</td><td><div class="bg"><div class="bf" style="background:#10b981;width:${w(v[1])}px;"></div></div></td><td style="text-align:left;color:#4ade80;"><b>${stock.eps26}</b></td></tr>
                <tr><td>2027:</td><td><div class="bg"><div class="bf" style="background:#3b82f6;width:${w(v[2])}px;"></div></div></td><td style="text-align:left;"><b>${stock.eps27}</b></td></tr>
                <tr><td>2028:</td><td><div class="bg"><div class="bf" style="background:#6366f1;width:${w(v[3])}px;"></div></div></td><td style="text-align:left;"><b>${stock.eps28}</b></td></tr>
            </table>
        </div>
        <div style="font-size:7.5px;color:#64748b;text-align:justify;line-height:1.2;"><b>גילוי נאות:</b> דוח מחקר זה מבוסס על נתונים פיננסיים גלויים ואינו מהווה ייעוץ לרכישת ניירות ערך.</div>
    </td>
</tr></table>
<div style="margin-top:10px;padding-top:6px;border-top:1px solid #e2e8f0;font-size:8px;color:#94a3b8;line-height:1.6;">
    <b style="color:#64748b;">מקרא: </b>
    <b style="color:#475569;">P/E</b> — יחס מחיר לרווח למניה.&nbsp;|&nbsp;
    <b style="color:#475569;">EPS</b> — רווח נקי למניה.&nbsp;|&nbsp;
    <b style="color:#475569;">CAGR</b> — צמיחה שנתית מצטברת.&nbsp;|&nbsp;
    <b style="color:#475569;">PEG</b> — P/E חלקי צמיחה (ערך &lt;1 = הזדמנות).&nbsp;|&nbsp;
    <b style="color:#475569;">Beta</b> — תנודתיות ביחס לשוק (&gt;1 = תנודתי יותר).&nbsp;|&nbsp;
    <b style="color:#475569;">52W</b> — שינוי % מגבוה/נמוך שנתי.&nbsp;|&nbsp;
    <b style="color:#475569;">YTD</b> — תשואה מתחילת השנה.
</div>
</body></html>`;
    const blob = htmlDocx.asBlob(wordHtml);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `ZIV_Report_${activeTicker}_2026.docx`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
}
