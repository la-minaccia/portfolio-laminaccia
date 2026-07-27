import { useState } from 'react';

// Componente Card riutilizzabile con effetto riflesso integrato
function GlowCard({ children, className = "", borderGlowColor = "rgba(99, 102, 241, 0.3)" }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 transition-colors duration-300 ${className}`}
        >
            {/* Riflesso interno localizzato solo sulla card */}
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${borderGlowColor}, transparent 60%)`,
                }}
            />
            {/* Contenuto della Card */}
            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
}

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [copiedIp, setCopiedIp] = useState(false);

    // Dati di contatto
    const sulfurIp = "play.sulfurmc.it"; // Sostituisci con l'IP effettivo se diverso

    const copyToClipboard = () => {
        navigator.clipboard.writeText(sulfurIp);
        setCopiedIp(true);
        setTimeout(() => setCopiedIp(false), 2000);
    };

    const skinUrl = "https://mc-heads.net/body/la_minaccia/right";

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">

            {/* NAVBAR */}
            <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-800">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold tracking-wider text-indigo-400">
            LA_MINACCIA
          </span>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-6 text-sm font-medium text-slate-300">
                        <a href="#home" className="hover:text-indigo-400 transition-colors">Home</a>
                        <a href="#experiencies" className="hover:text-indigo-400 transition-colors">Esperienze</a>
                        <a href="#skills" className="hover:text-indigo-400 transition-colors">Competenze</a>
                        <a href="#learning" className="hover:text-indigo-400 transition-colors">Sto Imparando</a>
                        <a href="#contact" className="hover:text-indigo-400 transition-colors">Contatti</a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-slate-300 hover:text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? "✕" : "☰"}
                    </button>
                </div>

                {/* Mobile Nav Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-4 space-y-3 flex flex-col">
                        <a href="#home" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-400">Home</a>
                        <a href="#experiencies" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-400">Esperienze</a>
                        <a href="#skills" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-400">Competenze</a>
                        <a href="#learning" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-400">Sto Imparando</a>
                        <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-400">Contatti</a>
                    </div>
                )}
            </nav>

            {/* HERO SECTION */}
            <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 px-6 max-w-6xl mx-auto">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">

                    {/* Testo Hero */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
                            Portfolio Ufficiale
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                            Ciao, sono <span className="text-indigo-400">la_minaccia</span>
                        </h1>
                        <p className="text-slate-400 text-base md:text-lg mb-6 leading-relaxed">
                            CEO di <strong className="text-indigo-300">AstralyaStudios</strong>, HighStaff & Pluginner su <strong className="text-amber-400">SulfurMC</strong>. Frontend Developer, Video Editor, Project Manager ed esperto di AI Prompting.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <a href="#experiencies" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-indigo-600/20 text-center">
                                Scopri le mie esperienze
                            </a>
                            <a href="#contact" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-all border border-slate-700 text-center">
                                Contattami
                            </a>
                        </div>
                    </div>

                    {/* Skin Viewer Section */}
                    <div className="flex-1 flex justify-center items-center relative">
                        <div className="absolute w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
                        <GlowCard className="p-4 bg-slate-900/60 backdrop-blur-sm shadow-2xl transition-transform duration-300 hover:scale-105">
                            <img
                                src={skinUrl}
                                alt="Skin di la_minaccia"
                                className="h-80 md:h-96 object-contain"
                            />
                        </GlowCard>
                    </div>

                </div>
            </section>

            {/* SEZIONE ESPERIENZE E RUOLI PRINCIPALI */}
            <section id="experiencies" className="py-20 bg-slate-900/40 border-y border-slate-800">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-3">Esperienze & Leadership</h2>
                        <p className="text-slate-400">I progetti principali che dirigo e nei quali opero quotidianamente.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* AstralyaStudios Card */}
                        <GlowCard className="p-8" borderGlowColor="rgba(99, 102, 241, 0.25)">
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-3xl">🚀</span>
                                        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30">
                      CEO & Founder
                    </span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 text-white">AstralyaStudios</h3>
                                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                                        AstralyaStudios è una realtà dedicata allo sviluppo e alla creazione di contenuti digitali, soluzioni software e progetti per la community.
                                    </p>
                                    <div className="border-t border-slate-800/80 pt-4 mt-4">
                                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Cosa faccio all'interno:</h4>
                                        <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside">
                                            <li>Supervisione di tutte le fasi produttive e coordinamento dei team.</li>
                                            <li>Gestione delle strategie di crescita e organizzazione delle risorse.</li>
                                            <li>Sviluppo di servizi e infrastrutture chiave dello studio.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </GlowCard>

                        {/* SulfurMC Card */}
                        <GlowCard className="p-8" borderGlowColor="rgba(245, 158, 11, 0.25)">
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-3xl">⚔️</span>
                                        <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-semibold rounded-full border border-amber-500/30">
                      HighStaff & Pluginner
                    </span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 text-white">SulfurMC</h3>
                                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                                        SulfurMC è un server di Minecraft focalizzato nell'offrire un'esperienza di gioco strutturata e ottimizzata per gli utenti.
                                    </p>
                                    <div className="border-t border-slate-800/80 pt-4 mt-4">
                                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Cosa faccio all'interno:</h4>
                                        <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside">
                                            <li>Configurazione, ottimizzazione e integrazione di plugin di gioco.</li>
                                            <li>Gestione e coordinamento dello staff del server (HighStaff).</li>
                                            <li>Risoluzione di problemi tecnici e miglioramento delle meccaniche di gioco.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </GlowCard>

                    </div>
                </div>
            </section>

            {/* SEZIONE COMPETENZE SPECIFICHE */}
            <section id="skills" className="py-20 px-6 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-3">Cosa So Fare</h2>
                    <p className="text-slate-400">Dettaglio delle mie competenze tecniche ed esecutive.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <GlowCard className="p-6">
                        <div className="text-3xl mb-3">💻</div>
                        <h3 className="text-xl font-bold mb-2 text-indigo-400">Sviluppatore Frontend</h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-3">
                            Creazione di interfacce web veloci e reattive.
                        </p>
                        <ul className="text-slate-400 text-xs space-y-1.5 list-disc list-inside">
                            <li>Linguaggi & Framework: HTML5, CSS3, JavaScript, React.</li>
                            <li>Styling moderno con Tailwind CSS.</li>
                            <li>Integrazione e configurazione di plugin per server (MC).</li>
                        </ul>
                    </GlowCard>

                    <GlowCard className="p-6">
                        <div className="text-3xl mb-3">🤖</div>
                        <h3 className="text-xl font-bold mb-2 text-indigo-400">Prompt AI Engineering</h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-3">
                            Ottimizzazione dei flussi di lavoro grazie all'Intelligenza Artificiale.
                        </p>
                        <ul className="text-slate-400 text-xs space-y-1.5 list-disc list-inside">
                            <li>Creazione di prompt strutturati per generazione codice e testi.</li>
                            <li>Automazione dei task ripetitivi e accelerazione della produzione.</li>
                            <li>Integrazione di modelli AI nei workflow aziendali e creativi.</li>
                        </ul>
                    </GlowCard>

                    <GlowCard className="p-6">
                        <div className="text-3xl mb-3">🎬</div>
                        <h3 className="text-xl font-bold mb-2 text-indigo-400">Video Editor</h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-3">
                            Montaggio e produzione di contenuti multimediali d'impatto.
                        </p>
                        <ul className="text-slate-400 text-xs space-y-1.5 list-disc list-inside">
                            <li>Montaggio dinamico, transizioni e cura del ritmo visivo.</li>
                            <li>Editing audio e sync musicale.</li>
                            <li>Creazione di trailer, teaser e video promozionali.</li>
                        </ul>
                    </GlowCard>

                    <GlowCard className="p-6">
                        <div className="text-3xl mb-3">📂</div>
                        <h3 className="text-xl font-bold mb-2 text-indigo-400">Project Manager</h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-3">
                            Organizzazione e coordinamento completo delle attività.
                        </p>
                        <ul className="text-slate-400 text-xs space-y-1.5 list-disc list-inside">
                            <li>Pianificazione delle milestone e gestione delle scadenze.</li>
                            <li>Coordinamento dei collaboratori e assegnazione compiti.</li>
                            <li>Risoluzione rapida delle criticità durante lo sviluppo.</li>
                        </ul>
                    </GlowCard>

                </div>
            </section>

            {/* SEZIONE IN FASE DI APPRENDIMENTO */}
            <section id="learning" className="py-20 bg-slate-900/30 border-t border-slate-800">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-3">In Fase di Apprendimento</h2>
                        <p className="text-slate-400">Tecnologie e competenze su cui mi sto concentrando per espandere il mio bagaglio tecnico.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                        <GlowCard className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-2xl">⚡</span>
                                <h3 className="font-bold text-lg text-white">Next.js & Fullstack</h3>
                            </div>
                            <p className="text-slate-400 text-xs leading-relaxed">
                                Approfondimento dell'ecosistema React per la gestione del Server-Side Rendering (SSR) e l'ottimizzazione SEO delle Web App.
                            </p>
                        </GlowCard>

                        <GlowCard className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-2xl">☕</span>
                                <h3 className="font-bold text-lg text-white">Sviluppo Java / Spigot</h3>
                            </div>
                            <p className="text-slate-400 text-xs leading-relaxed">
                                Studio della programmazione in Java per passare dalla semplice configurazione dei plugin alla scrittura di plugin custom da zero.
                            </p>
                        </GlowCard>

                        <GlowCard className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-2xl">🎨</span>
                                <h3 className="font-bold text-lg text-white">Motion Graphics 3D</h3>
                            </div>
                            <p className="text-slate-400 text-xs leading-relaxed">
                                Integrazione di elementi tridimensionali ed effetti visivi avanzati per alzare l'asticella della qualità nei trailer video.
                            </p>
                        </GlowCard>

                    </div>
                </div>
            </section>

            {/* NUOVA SEZIONE: CONTATTI E LINK UTILI */}
            <section id="contact" className="py-20 px-6 max-w-6xl mx-auto border-t border-slate-800">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-3">Contatti & Link Utili</h2>
                    <p className="text-slate-400">Connettiti con me o accedi direttamente ai vari progetti digitali.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* AstralyaStudios Links */}
                    <GlowCard className="p-8" borderGlowColor="rgba(99, 102, 241, 0.3)">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-3xl">🚀</span>
                            <div>
                                <h3 className="text-xl font-bold text-white">AstralyaStudios</h3>
                                <p className="text-xs text-indigo-400">Link e canali ufficiali</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <a
                                href="https://tiktok.com/@astralyastudios"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between p-4 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">🎵</span>
                                    <span className="font-medium text-sm text-slate-200">TikTok AstralyaStudios</span>
                                </div>
                                <span className="text-slate-500 group-hover:text-indigo-400 transition-colors">→</span>
                            </a>
                        </div>
                    </GlowCard>

                    {/* SulfurMC Links */}
                    <GlowCard className="p-8" borderGlowColor="rgba(245, 158, 11, 0.3)">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-3xl">⚔️</span>
                            <div>
                                <h3 className="text-xl font-bold text-white">SulfurMC</h3>
                                <p className="text-xs text-amber-400">Server Minecraft & Social</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Copy IP Box */}
                            <div className="p-4 bg-slate-800/60 border border-slate-700/60 rounded-xl flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-slate-400 mb-0.5">IP Server Minecraft</p>
                                    <p className="font-mono text-sm font-bold text-amber-300">{sulfurIp}</p>
                                </div>
                                <button
                                    onClick={copyToClipboard}
                                    className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold transition-all"
                                >
                                    {copiedIp ? "Copiato! ✓" : "Copia IP"}
                                </button>
                            </div>

                            {/* Site Link */}
                            <a
                                href="https://sulfurmc.it"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between p-4 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">🌐</span>
                                    <span className="font-medium text-sm text-slate-200">Sito Ufficiale SulfurMC</span>
                                </div>
                                <span className="text-slate-500 group-hover:text-amber-400 transition-colors">→</span>
                            </a>

                            {/* Social Link / Discord */}
                            <a
                                href="https://discord.gg/sulfurmc"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between p-4 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">💬</span>
                                    <span className="font-medium text-sm text-slate-200">Community Discord / Social</span>
                                </div>
                                <span className="text-slate-500 group-hover:text-amber-400 transition-colors">→</span>
                            </a>
                        </div>
                    </GlowCard>

                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-8 bg-slate-900 border-t border-slate-800 text-center">
                <div className="max-w-6xl mx-auto px-6">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} la_minaccia. Tutti i diritti riservati.
                    </p>
                </div>
            </footer>

        </div>
    );
}