import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  CheckCircle, Circle, Folder, Calendar, Trophy, User, Plus, X, 
  Bell, ChevronUp, ChevronDown, Target, Zap, Clock, Star, Flame, Sparkles,
  ArrowUp, ArrowDown, Minus, ShieldAlert, Award, ShoppingCart, Snowflake, Dices, Coins, Gift, Trash2, ListTodo, RefreshCw, Hourglass, Sword, Shield,
  Swords, Egg, Heart, Utensils, Bath, Gamepad2, PackageOpen, Hammer, Sun, Moon, Ticket, Globe, Skull, Info, Flag, Wand2, Ghost, Wind, Loader2, PawPrint, Play, Maximize
} from 'lucide-react';
import { auth, db, provider } from './firebase'; // Assumindo que você criou o firebase.js na mesma pasta
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

const CustomCheckSquare = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="9 11 12 14 22 4"></polyline>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
  </svg>
);

const GlobalStyles = () => (
  <style>{`
    @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
    .animate-shimmer { background-size: 200% auto; animation: shimmer 4s linear infinite; }
    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
    .animate-float { animation: float 3s ease-in-out infinite; }
    @keyframes slot-spin { 0% { transform: translateY(-100%); opacity: 0; } 50% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(100%); opacity: 0; } }
    .animate-slot-spin { animation: slot-spin 0.2s linear infinite; }
    @keyframes card-glow { 0% { box-shadow: 0 0 0 rgba(16, 185, 129, 0); } 50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); border-color: rgba(16, 185, 129, 0.6); } 100% { box-shadow: 0 0 0 rgba(16, 185, 129, 0); } }
    .animate-card-glow { animation: card-glow 1s ease-out forwards; }
    @keyframes pet-glow { 0% { box-shadow: 0 0 0 rgba(234, 179, 8, 0); } 50% { box-shadow: 0 0 20px rgba(234, 179, 8, 0.4); border-color: rgba(234, 179, 8, 0.6); } 100% { box-shadow: 0 0 0 rgba(234, 179, 8, 0); } }
    .animate-pet-glow { animation: pet-glow 1.5s ease-out forwards; }
    @keyframes float-up-fade { 0% { opacity: 0; transform: translateY(10px) scale(0.8); } 20% { opacity: 1; transform: translateY(0) scale(1.1); } 80% { opacity: 1; transform: translateY(-20px) scale(1); } 100% { opacity: 0; transform: translateY(-30px) scale(0.9); } }
    .animate-reward-toast { animation: float-up-fade 2.5s ease-out forwards; }
    @keyframes modal-scale-in { from { opacity: 0; transform: scale(0.8) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
    .animate-modal-pop { animation: modal-scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    
    @keyframes pulse-urgency-nav { 0%, 100% { transform: scale(0.8) translate(-50%, -50%); opacity: 0.2; } 50% { transform: scale(1.4) translate(-35%, -35%); opacity: 0.8; } }
    .urgency-blob { position: absolute; top: 50%; left: 50%; width: 45px; height: 45px; background: radial-gradient(circle, rgba(239,68,68,0.7) 0%, rgba(239,68,68,0) 70%); border-radius: 50%; pointer-events: none; z-index: -1; animation: pulse-urgency-nav 2s ease-in-out infinite; }

    @keyframes urgency-pulse { 0%, 100% { background-color: rgba(239, 68, 68, 0.05); border-color: rgba(239, 68, 68, 0.3); } 50% { background-color: rgba(239, 68, 68, 0.15); border-color: rgba(239, 68, 68, 0.8); box-shadow: 0 0 15px rgba(239,68,68,0.4); } }
    .animate-urgency { animation: urgency-pulse 2s infinite; }
    
    @keyframes pop-green { 0% { transform: scale(1); color: #eab308; } 50% { transform: scale(1.4); color: #4ade80; } 100% { transform: scale(1); color: #eab308; } }
    @keyframes pop-red { 0% { transform: scale(1); color: #eab308; } 50% { transform: scale(1.4); color: #f87171; } 100% { transform: scale(1); color: #eab308; } }
    .animate-coin-up { animation: pop-green 0.5s ease-out; }
    .animate-coin-down { animation: pop-red 0.5s ease-out; }
    @keyframes slow-reveal { 0% { filter: brightness(0) blur(15px); transform: scale(0.8); opacity: 0; } 40% { filter: brightness(0) blur(5px); transform: scale(0.9); opacity: 0.5; } 100% { filter: brightness(1) blur(0); transform: scale(1); opacity: 1; } }
    .animate-slow-reveal { animation: slow-reveal 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
    @keyframes pulse-fast { 0%, 100% { transform: scale(1); filter: brightness(1); } 50% { transform: scale(1.05); filter: brightness(1.3); } }
    .animate-pulse-fast { animation: pulse-fast 0.6s infinite; }
    @keyframes flip-in { 0% { transform: rotateY(90deg); opacity: 0; } 100% { transform: rotateY(0deg); opacity: 1; } }
    .animate-flip-in { animation: flip-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
    @keyframes explode-particles { 0% { transform: scale(0.1); opacity: 1; border-width: 50px; } 100% { transform: scale(2.5); opacity: 0; border-width: 0px; } }
    .animate-explode { animation: explode-particles 0.8s ease-out forwards; position: absolute; border-radius: 50%; border-style: solid; pointer-events: none; }
    
    .gold-gradient { background: linear-gradient(90deg, rgba(113,63,18,0.2), rgba(250,204,21,0.15), rgba(113,63,18,0.2)); border-color: rgba(250,204,21,0.4); }
    .silver-gradient { background: linear-gradient(90deg, rgba(51,65,85,0.2), rgba(203,213,225,0.15), rgba(51,65,85,0.2)); border-color: rgba(203,213,225,0.4); }
    .bronze-gradient { background: linear-gradient(90deg, rgba(124,45,18,0.2), rgba(249,115,22,0.15), rgba(124,45,18,0.2)); border-color: rgba(249,115,22,0.4); }
    .fuchsia-gradient { background: linear-gradient(90deg, rgba(74,4,78,0.3), rgba(217,70,239,0.2), rgba(74,4,78,0.3)); border-color: rgba(217,70,239,0.5); }
    .blue-gradient { background: linear-gradient(90deg, rgba(30,58,138,0.3), rgba(59,130,246,0.2), rgba(30,58,138,0.3)); border-color: rgba(59,130,246,0.5); }
    .sprint-gradient { background: linear-gradient(90deg, rgba(13,148,136,0.3), rgba(20,184,166,0.15), rgba(13,148,136,0.3)); border-color: rgba(20,184,166,0.5); }
    .surprise-gradient { background: linear-gradient(90deg, rgba(168,85,247,0.1), rgba(217,70,239,0.05), rgba(168,85,247,0.1)); border-color: rgba(168,85,247,0.4); }
    
    .bg-checkered { background-image: repeating-linear-gradient(45deg, rgba(0,0,0,0.8) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.8) 75%, rgba(0,0,0,0.8)), repeating-linear-gradient(45deg, rgba(0,0,0,0.8) 25%, rgba(255,255,255,0.8) 25%, rgba(255,255,255,0.8) 75%, rgba(0,0,0,0.8) 75%, rgba(0,0,0,0.8)); background-position: 0 0, 4px 4px; background-size: 8px 8px; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

const ParticlesBackground = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; const ctx = canvas.getContext('2d'); let animationFrameId; let particles = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }; window.addEventListener('resize', resize); resize();
    class Particle {
      constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 1.5; this.speedY = Math.random() * 0.5 + 0.1; this.opacity = Math.random() * 0.5; }
      update() { this.y -= this.speedY; if (this.y < 0) { this.y = canvas.height; this.x = Math.random() * canvas.width; } }
      draw() { ctx.fillStyle = isDarkMode ? `rgba(255, 255, 255, ${this.opacity * 0.8})` : `rgba(0, 0, 0, ${this.opacity * 0.3})`; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
    }
    const init = () => { for (let i = 0; i < 50; i++) particles.push(new Particle()); };
    const animate = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); animationFrameId = requestAnimationFrame(animate); };
    init(); animate(); return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
  }, [isDarkMode]);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

const FocusTimer = ({ endTime }) => {
    const [left, setLeft] = useState(endTime - Date.now());
    useEffect(() => {
        const int = setInterval(() => setLeft(endTime - Date.now()), 1000);
        return () => clearInterval(int);
    }, [endTime]);
    
    if (left <= 0) return <span className="text-3xl text-red-500 font-mono font-black">00:00:00</span>;
    
    const h = Math.floor(left / 3600000);
    const m = Math.floor((left % 3600000) / 60000);
    const s = Math.floor((left % 60000) / 1000);
    return <span className="text-7xl md:text-9xl text-white font-mono font-black tracking-widest drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
        {String(h).padStart(2,'0')}:{String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}
    </span>
}

const CLASSES = {
    acrobat: { id: 'acrobat', name: 'Acrobata', icon: Wind, desc: 'Bónus de XP em Testes de Tempo e tarefas.', color: 'text-sky-500', bg: 'bg-sky-500/10', border: 'border-sky-500/30' },
    fighter: { id: 'fighter', name: 'Lutador', icon: Swords, desc: 'Bónus massivo ao possuir um duelo ativo.', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30' },
    illusionist: { id: 'illusionist', name: 'Ilusionista', icon: Wand2, desc: 'XP escala pela quantidade de tarefas não concluídas.', color: 'text-fuchsia-500', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/30' },
    thief: { id: 'thief', name: 'Ladrão', icon: Ghost, desc: 'Ganha um bónus de Moedas ao concluir tarefas.', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' }
};

const BOTS_NAMES_POOL = ['Lucas', 'Matheus', 'Tiago', 'Pedro', 'João', 'Miguel', 'Arthur', 'Gael', 'Heitor', 'Theo', 'Davi', 'Gabriel', 'Bernardo', 'Samuel', 'Enzo', 'Alice', 'Laura', 'Julia', 'Sophia', 'Isabella', 'Helena', 'Valentina', 'Sofia', 'Manuela', 'Vitória'];
const BOTS_TITLES_POOL = ['Analista de Dados', 'Curador Medicinal', 'Arquiteto Solar', 'Estrategista', 'Gerente de Eventos', 'a Valquíria', 'o Alquimista', 'a Maga', 'o Especialista', 'a Viajante', 'o Explorador', 'a Caçadora', 'o Guardião', 'a Campeã', 'a Lenda', 'a Visionária'];
const BOT_EMOJIS = ['🎃', '🕸️', '🧟', '☄️', '🪼', '🦎', '👽', '🤖', '🐸', '👾', '🤡', '⚡', '🌞', '👺', '💎', '💀','🐞','👻','🦋','🔥'];
const BOT_PETS = ['bat', 'penguin', 'eagle', 'parrot', 'phoenix', 'dragon'];
const BOT_CLASS_KEYS = ['acrobat', 'fighter', 'illusionist', 'thief'];

const SURPRISE_TASKS = [
  { title: "Leia um artigo", desc: "Expanda os seus conhecimentos." },
  { title: "Beba uma garrafa de água", desc: "A hidratação é chave." },
  { title: "Coma uma fruta", desc: "Dê vitaminas ao seu corpo." }
];

const SLOT_ITEMS = [ 
  { icon: '💎', name: 'Diamante', pay: 3000, base: 5 }, { icon: '💰', name: 'Bolsa', pay: 1500, base: 10 }, 
  { icon: '🪙', name: 'Moeda', pay: 500, base: 15 }, { icon: '🍎', name: 'Maçã', pay: 200, base: 30 }, { icon: '🍒', name: 'Cereja', pay: 50, base: 40 } 
];

const STORE_CLASSIC_ITEMS = [
  { id: 'freeze', title: 'Congelamento', desc: 'Congela e conclui um hábito.', price: 400, icon: Snowflake, theme: { text: 'text-sky-500', bg: 'bg-sky-500', border: 'border-sky-500/30', hover: 'hover:bg-sky-400' } },
  { id: 'bonusTask', title: 'Tarefa Bónus', desc: 'Adiciona um espaço extra reluzente.', price: 300, icon: Gift, theme: { text: 'text-blue-500', bg: 'bg-blue-500', border: 'border-blue-500/30', hover: 'hover:bg-blue-400' } },
  { id: 'magicDice', title: 'Dado Mágico', desc: 'Sorteia um multiplicador x1 a x6.', price: 450, icon: Dices, theme: { text: 'text-fuchsia-500', bg: 'bg-fuchsia-500', border: 'border-fuchsia-500/30', hover: 'hover:bg-fuchsia-400' } },
  { id: 'petEgg', title: 'Ovo de Pet', desc: 'Adquira um ovo misterioso.', price: 2500, icon: Egg, theme: { text: 'text-amber-500', bg: 'bg-amber-500', border: 'border-amber-500/30', hover: 'hover:bg-amber-400' } },
  { id: 'lifeHammer', title: 'Martelo da Vida', desc: 'Choca um ovo imediatamente.', price: 1000, icon: Hammer, theme: { text: 'text-red-500', bg: 'bg-red-500', border: 'border-red-500/30', hover: 'hover:bg-red-400' } },
  { id: 'realizador', title: 'Espírito Realizador', desc: 'Prêmios em +20% hoje.', price: 400, icon: Sword, theme: { text: 'text-fuchsia-500', bg: 'bg-fuchsia-500', border: 'border-fuchsia-500/30', hover: 'hover:bg-fuchsia-400' } },
  { id: 'resguardo', title: 'Espírito de Resguardo', desc: 'Reduz penalidades de tarefas em 80%.', price: 300, icon: Shield, theme: { text: 'text-cyan-500', bg: 'bg-cyan-500', border: 'border-cyan-500/30', hover: 'hover:bg-cyan-400' } },
  { id: 'cronosMoeda', title: 'Moeda de Cronos', desc: 'Adiciona +3 horas ao prazo.', price: 100, icon: Hourglass, theme: { text: 'text-indigo-500', bg: 'bg-indigo-500', border: 'border-indigo-500/30', hover: 'hover:bg-indigo-400' } },
  { id: 'cronosMedalha', title: 'Medalha de Cronos', desc: 'Adiciona +1 dia ao prazo.', price: 200, icon: Calendar, theme: { text: 'text-violet-500', bg: 'bg-violet-500', border: 'border-violet-500/30', hover: 'hover:bg-violet-400' } }
];

const MEDAL_STYLES = {
  plat: 'bg-gradient-to-br from-cyan-300 via-blue-500 to-indigo-600 shadow-[0_0_8px_rgba(56,189,248,0.6)]',
  gold: 'bg-gradient-to-br from-yellow-200 via-yellow-500 to-amber-600 shadow-[0_0_8px_rgba(234,179,8,0.6)]',
  silver: 'bg-gradient-to-br from-slate-100 via-slate-300 to-slate-500',
  bronze: 'bg-gradient-to-br from-orange-400 via-amber-700 to-orange-900',
  sprint_5k: 'bg-checkered border-emerald-500', sprint_10k: 'bg-checkered border-blue-500',
  sprint_15k: 'bg-checkered border-fuchsia-500', sprint_20k: 'bg-checkered border-yellow-500'
};

const WEEK_DAYS = [{ l: 'D', v: 0 }, { l: 'S', v: 1 }, { l: 'T', v: 2 }, { l: 'Q', v: 3 }, { l: 'Q', v: 4 }, { l: 'S', v: 5 }, { l: 'S', v: 6 }];
const PET_TYPES = { bat: { emoji: '🦇', name: 'Morcego Escuridão' }, penguin: { emoji: '🐧', name: 'Pinguim do Gelo' }, eagle: { emoji: '🦅', name: 'Águia do Tempo' }, parrot: { emoji: '🦜', name: 'Papagaio Saqueador' }, phoenix: { emoji: '🐦‍🔥', name: 'Fênix Ancestral' }, dragon: { emoji: '🐉', name: 'Dragão Dourado' } };

// --- FUNÇÕES AUXILIARES ---
const shuffleArray = (array) => {
   let curId = array.length, rndId;
   while (curId !== 0) { rndId = Math.floor(Math.random() * curId); curId--; [array[curId], array[rndId]] = [array[rndId], array[curId]]; }
   return array;
}
const calculateBotLevel = (totalXp) => { let lvl = 1; let xpLeft = totalXp; while(xpLeft >= (500 + (lvl - 1) * 200)) { xpLeft -= (500 + (lvl - 1) * 200); lvl++; } return lvl; };
const generateFakeUsers = (resetMonthly = false) => {
  const users = [];
  let allCombinations = [];
  for(let n of BOTS_NAMES_POOL) for(let t of BOTS_TITLES_POOL) allCombinations.push(`${n}, ${t}`);
  allCombinations = shuffleArray(allCombinations);

  for (let i = 0; i < 99; i++) {
    const botMonthlyXp = resetMonthly ? 0 : Math.floor(Math.random() * 2000);
    const totalXp = Math.floor(Math.random() * 80000) + 1000;
    let lvl = calculateBotLevel(totalXp);
    
    const botMedals = [];
    for(let j=0; j < 5; j++) {
       if (Math.random() > 0.6) {
           let type = 'bronze'; const r = Math.random();
           if (r > 0.95) type = 'plat'; else if (r > 0.8) type = 'gold'; else if (r > 0.5) type = 'silver';
           botMedals.push(type);
       }
    }
    if (Math.random() > 0.7) {
       const distances = ['5k', '10k', '15k', '20k'];
       botMedals.push(`sprint_${distances[Math.floor(Math.random()*distances.length)]}`);
    }
    let pet = null;
    if (lvl >= 10 && Math.random() > 0.4) pet = BOT_PETS[Math.floor(Math.random() * (lvl >= 30 ? 6 : 4))];

    users.push({
      id: `bot-${i}`, name: allCombinations[i] || `Bot ${i}`, emoji: BOT_EMOJIS[i % BOT_EMOJIS.length],
      monthlyXp: botMonthlyXp, lastMonthlyXp: botMonthlyXp, totalXp: totalXp, level: lvl, isUser: false, consistency: Math.random(), grindFactor: Math.random(), 
      medals: botMedals, pet: pet, botClass: BOT_CLASS_KEYS[Math.floor(Math.random() * 4)], activeBuffs: { realizador: Math.random() < 0.15, resguardo: Math.random() < 0.15, duelWin: false, duelLoss: false }
    });
  }
  return users;
};
const countMedals = (medalsArr) => {
  const counts = { plat: 0, gold: 0, silver: 0, bronze: 0, sprint_5k: 0, sprint_10k: 0, sprint_15k: 0, sprint_20k: 0 };
  medalsArr.forEach(m => { if(counts[m] !== undefined) counts[m]++; });
  return counts;
};
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
const MONTH_NAMES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const DAY_NAMES = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const formatDate = (dateStr) => { if (!dateStr) return ''; const [y, m, d] = dateStr.split('-'); return `${d}/${m}/${y}`; };
const formatTimeLeft = (deadlineMs) => {
   const diff = deadlineMs - Date.now();
   if (diff <= 0) return "00:00";
   const h = Math.floor(diff / (1000 * 60 * 60)); const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
   return `${h}h ${String(m).padStart(2,'0')}m`;
};

// --- APLICATIVO PRINCIPAL ---
export default function App() {
  // 1. Estados de Autenticação
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Para não renderizar o app antes de baixar os dados
  const [isGuestMode, setIsGuestMode] = useState (() => localStorage.getItem('fq_is_guest') === 'true');

  // 2. Estados de UI
  const [activeTab, setActiveTab] = useState('tasks');
  const [rankingView, setRankingView] = useState('ranking'); 
  const [isDarkMode, setIsDarkMode] = useState(true); // Deixamos o dark mode por padrão
  
  // 3. Estados dos Dados (Iniciam vazios/nulos)
  const [user, setUser] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bots, setBots] = useState([]);
  const [globalFeed, setGlobalFeed] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState({ tasks: 0, habits: 0 });
  const [folders, setFolders] = useState(['Geral', 'Trabalho', 'Estudos']);
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [collapsedSprints, setCollapsedSprints] = useState([]);

  // REMOVA TODOS os useEffects antigos que faziam localStorage.setItem() 
  // (aqueles 10 useEffects seguidos logo abaixo da declaração dos estados)

  /*
  useEffect(() => { localStorage.setItem('fq_theme', JSON.stringify(isDarkMode)); }, [isDarkMode]);
  useEffect(() => { localStorage.setItem('fq_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('fq_date', currentDate.toISOString()); }, [currentDate]);
  useEffect(() => { localStorage.setItem('fq_bots', JSON.stringify(bots)); }, [bots]);
  useEffect(() => { localStorage.setItem('fq_feed', JSON.stringify(globalFeed)); }, [globalFeed]);
  useEffect(() => { localStorage.setItem('fq_mstats', JSON.stringify(monthlyStats)); }, [monthlyStats]);
  useEffect(() => { localStorage.setItem('fq_folders', JSON.stringify(folders)); }, [folders]);
  useEffect(() => { localStorage.setItem('fq_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('fq_habits', JSON.stringify(habits)); }, [habits]);
  useEffect(() => { localStorage.setItem('fq_sprints', JSON.stringify(sprints)); }, [sprints]);
  */

// --- 1. MONITORAR LOGIN ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setCurrentUser(authUser);
      setIsLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // SE FOR VISITANTE (Lê do LocalStorage)
    if (isGuestMode) {
      const savedData = localStorage.getItem('fq_guest_data');
      if (savedData) {
        const data = JSON.parse(savedData);
        setUser(data.user);
        setTasks(data.tasks || []);
        setHabits(data.habits || []);
        setSprints(data.sprints || []);
        setBots(data.bots || generateFakeUsers(true));
        setGlobalFeed(data.globalFeed || []);
        setMonthlyStats(data.monthlyStats || { tasks: 0, habits: 0 });
        setFolders(data.folders || ['Geral', 'Trabalho', 'Estudos']);
        if (data.currentDate) setCurrentDate(new Date(data.currentDate));
        setIsDarkMode(data.isDarkMode !== undefined ? data.isDarkMode : true);
      } else {
        // Visitante novo
        setUser({
           name: 'Visitante', level: 1, xp: 0, monthlyXp: 0, coins: 0, vouchers: 0, lastMonthlyXp: 0, streak: 0, maxStreakThisMonth: 0, monthDaysElapsed: 0, isUser: true, medals: [],
           activeBuffs: { realizador: false, resguardo: false, criticalUsedToday: false, petBuffUsedToday: false, duelWin: false, duelLoss: false, lastGasp: false },
           dailyTaskLimits: { p1: 0, p2: 0 }, inventory: { food: 5, soap: 5, toys: 5 }, pet: null, petBuffBonus: 0, tasksTowardsLootbox: 0, dailyChallengedBots: {}, duelStats: { wins: 0, losses: 0, ties: 0 },
           dailyGainedXp: 0, dailyGainedCoins: 0, dailyGainedVouchers: 0, records: { maxXp: 0, maxCoins: 0 }, urgencyCountThisMonth: 0, hasSeenUrgencyInfo: false,
           hasCompletedOnboarding: false, userClass: { type: 'acrobat', level: 1, xp: 0 }, debugMode: false, dailyChallengeUsed: false, hasBonusTaskAvailable: false, activeDuel: null
        });
        setBots(generateFakeUsers(true));
      }
      setIsDataLoaded(true);
      return;
    }

    // SE NÃO FOR VISITANTE E ESTIVER LOGADO (Lê do Firebase)
    if (!currentUser) return;
    const docRef = doc(db, "usersData", currentUser.uid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUser(data.user);
        setTasks(data.tasks || []);
        setHabits(data.habits || []);
        setSprints(data.sprints || []);
        setBots(data.bots || generateFakeUsers(true));
        setGlobalFeed(data.globalFeed || []);
        setMonthlyStats(data.monthlyStats || { tasks: 0, habits: 0 });
        setFolders(data.folders || ['Geral', 'Trabalho', 'Estudos']);
        if (data.currentDate) setCurrentDate(new Date(data.currentDate));
        setIsDarkMode(data.isDarkMode !== undefined ? data.isDarkMode : true);
        setIsDataLoaded(true);
      } else {
        // Usuário do Google novo
        const initialUserData = {
           name: currentUser.displayName || '', level: 1, xp: 0, monthlyXp: 0, coins: 0, vouchers: 0, lastMonthlyXp: 0, streak: 0, maxStreakThisMonth: 0, monthDaysElapsed: 0, isUser: true, medals: [],
           activeBuffs: { realizador: false, resguardo: false, criticalUsedToday: false, petBuffUsedToday: false, duelWin: false, duelLoss: false, lastGasp: false },
           dailyTaskLimits: { p1: 0, p2: 0 }, inventory: { food: 5, soap: 5, toys: 5 }, pet: null, petBuffBonus: 0, tasksTowardsLootbox: 0, dailyChallengedBots: {}, duelStats: { wins: 0, losses: 0, ties: 0 },
           dailyGainedXp: 0, dailyGainedCoins: 0, dailyGainedVouchers: 0, records: { maxXp: 0, maxCoins: 0 }, urgencyCountThisMonth: 0, hasSeenUrgencyInfo: false,
           hasCompletedOnboarding: false, userClass: { type: 'acrobat', level: 1, xp: 0 }, debugMode: false, dailyChallengeUsed: false, hasBonusTaskAvailable: false, activeDuel: null
        };
        setDoc(docRef, {
          user: initialUserData, tasks: [], habits: [], sprints: [], bots: generateFakeUsers(true), globalFeed: [],
          monthlyStats: { tasks: 0, habits: 0 }, folders: ['Geral', 'Trabalho', 'Estudos'],
          currentDate: new Date().toISOString(), isDarkMode: true
        });
      }
    });

    return () => unsubscribe();
  }, [currentUser, isGuestMode]);

  // --- 3. SALVAR DADOS NO FIREBASE ---
  // Sempre que houver alguma alteração nestes estados, manda para a nuvem!
  useEffect(() => {
    if (!isDataLoaded || !user) return; // Garante que não subscreve com null
    
    const dataToSave = {
      user, tasks, habits, sprints, bots, globalFeed, monthlyStats, folders, currentDate: currentDate.toISOString(), isDarkMode
    };

    if (isGuestMode) {
      localStorage.setItem('fq_guest_data', JSON.stringify(dataToSave));
    } else if (currentUser) {
      setDoc(doc(db, "usersData", currentUser.uid), dataToSave, { merge: true });
    }
  }, [user, tasks, habits, sprints, bots, globalFeed, monthlyStats, folders, currentDate, isDarkMode, currentUser, isDataLoaded, isGuestMode]);

  // --- CONTROLO DA MEIA-NOITE E URGÊNCIA ---
  const [tick, setTick] = useState(0);
  const [forceAdvanceModal, setForceAdvanceModal] = useState(false);
  const [isProcessingDay, setIsProcessingDay] = useState(false);
  const [urgencyFailureModal, setUrgencyFailureModal] = useState(null); 
  const [dailySummaryModal, setDailySummaryModal] = useState(null); 
  const [urgencyInfoModal, setUrgencyInfoModal] = useState(false);
  const [pendingDuelResult, setPendingDuelResult] = useState(null);
  
  // Onboarding States
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [onboardingName, setOnboardingName] = useState(user?.name || '');
  const [onboardingClass, setOnboardingClass] = useState('acrobat');
  const [onboardingDebug, setOnboardingDebug] = useState(false);
  const [isLeavingOnboarding, setIsLeavingOnboarding] = useState(false);

  const isUrgentActive = tasks.some(t => t.isUrgent && !t.completed);

  // Inicialização/Check de Data no Mount
  useEffect(() => {
      if (!user?.hasCompletedOnboarding || user?.debugMode) return;
      const today = new Date();
      const saved = new Date(currentDate);
      if (today.getDate() !== saved.getDate() || today.getMonth() !== saved.getMonth() || today.getFullYear() !== saved.getFullYear()) {
          setForceAdvanceModal(true);
      }
  }, [user?.hasCompletedOnboarding, user?.debugMode, currentDate]);

  useEffect(() => {
     if (!user?.hasCompletedOnboarding) return; 
     const intervalId = setInterval(() => {
         const now = new Date(); const nowMs = now.getTime(); setTick(t => t + 1);
         const saved = new Date(currentDate);
         if (!user?.debugMode && (now.getDate() !== saved.getDate() || now.getMonth() !== saved.getMonth())) { setForceAdvanceModal(true); }
         
         let penaltyTaskTitle = null;
         setTasks(currentTasks => {
            let modified = false;
            const newTasks = currentTasks.map(t => {
               if (t.isUrgent && !t.completed && nowMs > t.urgencyDeadline) {
                  modified = true; penaltyTaskTitle = t.title; return { ...t, isUrgent: false, urgencyDeadline: null };
               }
               return t;
            });
            if (modified) {
               setUser(p => { const newGold = Math.floor(p.coins * 0.6); const newLevel = Math.max(1, p.level - 1); return { ...p, coins: newGold, level: newLevel }; });
               setUrgencyFailureModal({ title: penaltyTaskTitle });
            }
            return modified ? newTasks : currentTasks;
         });
     }, 5000); 
     return () => clearInterval(intervalId);
  }, [currentDate, tasks, user?.hasCompletedOnboarding, user?.debugMode]);

  const theme = {
    bg: isDarkMode ? 'bg-zinc-900' : 'bg-zinc-50', panel: isDarkMode ? 'bg-zinc-800' : 'bg-white', inner: isDarkMode ? 'bg-zinc-950' : 'bg-zinc-100',
    border: isDarkMode ? 'border-zinc-700' : 'border-zinc-200', text: isDarkMode ? 'text-zinc-100' : 'text-zinc-900', textMuted: isDarkMode ? 'text-zinc-400' : 'text-zinc-500',
    btnPrimary: isDarkMode ? 'bg-zinc-200 text-zinc-900 hover:bg-white' : 'bg-zinc-900 text-white hover:bg-zinc-800',
    nav: isDarkMode ? 'bg-zinc-900/95 border-zinc-800' : 'bg-white/95 border-zinc-200 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]',
    modalBg: isDarkMode ? 'bg-zinc-950/80' : 'bg-zinc-200/80', cardDone: isDarkMode ? 'bg-zinc-900 opacity-60 grayscale border-zinc-800' : 'bg-zinc-100 opacity-60 grayscale border-zinc-300'
  };

  // --- ESTADOS DE UI E MODAIS ---
  const [coinAnim, setCoinAnim] = useState(null);
  const prevCoinsRef = useRef(user?.coins);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showMonthlyReset, setShowMonthlyReset] = useState(false);
  const [levelModal, setLevelModal] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const [freezeModalOpen, setFreezeModalOpen] = useState(false);
  const [cronosModalOpen, setCronosModalOpen] = useState(null);
  const [slotModalOpen, setSlotModalOpen] = useState(false);
  const [slotBet, setSlotBet] = useState(1);
  const [slotState, setSlotState] = useState({ active: false, reels: ['❓','❓','❓'], result: null });
  const [pendingLootboxes, setPendingLootboxes] = useState(0);
  const [lootboxCardsModal, setLootboxCardsModal] = useState(false);
  const [lootboxRevealed, setLootboxRevealed] = useState(null); 
  const [selectedLootboxCard, setSelectedLootboxCard] = useState(null);
  const [petCareModal, setPetCareModal] = useState(false);
  const [eggHatchModal, setEggHatchModal] = useState(null);
  const [petNameInput, setPetNameInput] = useState('');
  const [releasePetModal, setReleasePetModal] = useState(false);
  const [duelResultModal, setDuelResultModal] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [showAllRanking, setShowAllRanking] = useState(false);
  const [expandedBot, setExpandedBot] = useState(null);
  const [epicCritModal, setEpicCritModal] = useState(null);
  const [debugPetSelect, setDebugPetSelect] = useState('bat');
  const [debugHabitStreak, setDebugHabitStreak] = useState(10);
  const [diceSlotActive, setDiceSlotActive] = useState(false);
  const [slotDisplay, setSlotDisplay] = useState({ roll: 1, title: '' });
  const [monthlySummaryModal, setMonthlySummaryModal] = useState(null);

  const [activeFolder, setActiveFolder] = useState('Todas');
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newFolderInput, setNewFolderInput] = useState('');
  
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState(''); 
  const [newTaskDeadline, setNewTaskDeadline] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');
  const [newTaskRecurring, setNewTaskRecurring] = useState([]); 
  const [newTaskPriority, setNewTaskPriority] = useState('P4');
  
  const [isDailyChallenge, setIsDailyChallenge] = useState(false);
  const [isBonusTask, setIsBonusTask] = useState(false);
  const [isSprintMode, setIsSprintMode] = useState(false);
  const [sprintTasksText, setSprintTasksText] = useState('');

  // Estados do Teste de Tempo
  const [isTimeTestMode, setIsTimeTestMode] = useState(false);
  const [timeTestDuration, setTimeTestDuration] = useState(30);
  const [focusTask, setFocusTask] = useState(null);
  
  const [newHabitText, setNewHabitText] = useState('');
  const [newHabitDesc, setNewHabitDesc] = useState(''); 
  const [newHabitType, setNewHabitType] = useState('single');
  const [newHabitTarget, setNewHabitTarget] = useState(3);

  const p1LimitReached = (user?.dailyTaskLimits?.p1 || 0) >= 2;
  const p2LimitReached = (user?.dailyTaskLimits?.p2 || 0) >= 3;

  useEffect(() => {
    if (user?.coins > prevCoinsRef.current) { setCoinAnim('up'); setTimeout(() => setCoinAnim(null), 500); } 
    else if (user?.coins < prevCoinsRef.current) { setCoinAnim('down'); setTimeout(() => setCoinAnim(null), 500); }
    prevCoinsRef.current = user?.coins;
  }, [user?.coins]);

  useEffect(() => {
    if (showDatePicker) {
        if (newTaskDeadline) {
            const [y, m, d] = newTaskDeadline.split('-');
            setCalendarDate(new Date(y, m - 1, 1));
        } else {
            setCalendarDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
        }
    }
  }, [showDatePicker, newTaskDeadline, currentDate]);

  useEffect(() => {
    if (eggHatchModal && eggHatchModal.step === 'cracking') {
        const timer = setTimeout(() => {
            setEggHatchModal(prev => prev ? { ...prev, step: 'reveal' } : null);
        }, 3000); // Espera 3 segundos e revela o pet
        return () => clearTimeout(timer);
    }
  }, [eggHatchModal]);

  // Intervalo global para monitorar Testes de Tempo
  useEffect(() => {
    const interval = setInterval(() => {
        const expired = tasks.find(t => t.isTimeTest && t.timeTestActive && !t.completed && Date.now() >= t.timeTestEndTime);
        if (expired) {
            processTimeTest(expired.id, true);
        }
    }, 1000);
    return () => clearInterval(interval);
  }, [tasks]);

  const processTimeTest = (taskId, isFailure) => {
      const task = tasks.find(t => t.id === taskId);
      if (!task || task.completed) return;
      
      const isAcrobat = user.userClass?.type === 'acrobat';
      const mod = isAcrobat ? 1.2 : 1;
      
      if (isFailure) {
          const penalty = Math.floor(100 * mod);
          addXpAndCoins(-penalty, -penalty, 0, 1);
          showToast(`⏳ Tempo esgotado! Penalidade de ${penalty} aplicada.`);
      } else {
          const elapsed = Date.now() - task.timeTestStartTime;
          const totalAllowed = task.timeTestEndTime - task.timeTestStartTime;
          const base = (elapsed <= totalAllowed / 2) ? 100 : 80;
          const reward = Math.floor(base * mod);
          addXpAndCoins(reward, reward, reward, 1);
          showToast(`⏳ Teste de Tempo concluído! +${reward} XP/Moedas.`);
      }
      
      setTasks(cur => cur.map(t => t.id === taskId ? { ...t, completed: true, timeTestActive: false } : t));
      if (focusTask && focusTask.id === taskId) setFocusTask(null);
  };

  const startTimeTest = (taskId) => {
      if (tasks.some(t => t.timeTestActive && !t.completed)) return showToast("Já existe um Teste de Tempo ativo!");
      let extraMins = 0;
      if (user.pet?.type === 'eagle' && Math.random() <= 0.10) {
          extraMins = 10;
          showToast("🦅 A Águia concedeu +10 minutos ao teste!");
      }
      setTasks(cur => cur.map(t => {
          if (t.id === taskId) {
             const duration = t.durationMinutes || 30;
             return { ...t, timeTestActive: true, timeTestStartTime: Date.now(), timeTestEndTime: Date.now() + (duration + extraMins) * 60000 };
          }
          return t;
      }));
  };

  // --- FUNÇÕES CORE ---
  const showToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(''), 3500); };
  const addNotification = (msg) => setNotifications(prev => [{ id: Date.now(), msg, read: false }, ...prev]);
  const getRequiredXp = (lvl) => 500 + (lvl - 1) * 200;
  const getClassRequiredXp = (lvl) => lvl * 1000;

  const addXpAndCoins = (xpAmount, coinAmount, classXpAmount = 0, tasksIncrement = 0) => {
    setUser(prev => {
      let newXp = prev.xp + xpAmount;
      let newMonthlyXp = Math.max(0, prev.monthlyXp + xpAmount); 
      let newLevel = prev.level;
      let levelChanged = null;

      while (newXp >= getRequiredXp(newLevel)) { newXp -= getRequiredXp(newLevel); newLevel++; levelChanged = 'up'; }
      while (newXp < 0 && newLevel > 1) { newLevel--; newXp += getRequiredXp(newLevel); levelChanged = 'down'; }
      if (newXp < 0) newXp = 0;

      if (levelChanged === 'up') setLevelModal({ type: 'up', level: newLevel });
      else if (levelChanged === 'down') setLevelModal({ type: 'down', level: newLevel });

      let newTasksTowardsLootbox = (prev.tasksTowardsLootbox || 0) + tasksIncrement;
      if (newTasksTowardsLootbox >= 15) {
         newTasksTowardsLootbox -= 15;
         setPendingLootboxes(p => p + 1);
         addNotification("🎁 Um novo Baú de Espólios foi encontrado!");
      }

      let newClassLvl = prev.userClass.level;
      let newClassXp = prev.userClass.xp + classXpAmount;
      if (newClassLvl < 10) {
         while (newClassXp >= getClassRequiredXp(newClassLvl) && newClassLvl < 10) {
             newClassXp -= getClassRequiredXp(newClassLvl);
             newClassLvl++;
             addNotification(`🪄 Nível de Classe subiu para ${newClassLvl}! O seu bónus passivo aumentou!`);
         }
         if (newClassLvl === 10) newClassXp = 0;
      }

      const dXp = prev.dailyGainedXp + Math.max(0, xpAmount);
      const dCoins = prev.dailyGainedCoins + Math.max(0, coinAmount);

      return { 
          ...prev, xp: newXp, monthlyXp: newMonthlyXp, level: newLevel, coins: Math.max(0, prev.coins + coinAmount), 
          tasksTowardsLootbox: newTasksTowardsLootbox, dailyGainedXp: dXp, dailyGainedCoins: dCoins,
          userClass: { ...prev.userClass, xp: newClassXp, level: newClassLvl }
      };
    });
  };

  const triggerUrgency = () => {
      if (user.urgencyCountThisMonth >= 8) return false;
      const validTasks = tasks.filter(t => !t.completed && !t.isUrgent && !t.isSurprise && (t.priority === 'P1' || t.priority === 'P2' || t.isDailyChallenge));
      if (validTasks.length === 0) return false;
      
      const target = validTasks[Math.floor(Math.random() * validTasks.length)];
      setTasks(cur => cur.map(t => t.id === target.id ? { ...t, isUrgent: true, urgencyDeadline: Date.now() + 5 * 3600 * 1000 } : t));
      setUser(p => ({ ...p, urgencyCountThisMonth: (p.urgencyCountThisMonth || 0) + 1 }));
      addNotification(`🚨 URGÊNCIA! A tarefa "${target.title}" deve ser concluída em 5 horas!`);
      return true;
  };

  const handleAddFolder = () => {
    if (newFolderInput.trim() && !folders.includes(newFolderInput.trim()) && newFolderInput.trim() !== 'Todas') {
       setFolders([...folders, newFolderInput.trim()]);
       setActiveFolder(newFolderInput.trim());
    }
    setNewFolderInput(''); setIsAddingFolder(false);
  };

  const handleDeleteFolder = (folderName) => {
     setTasks(prev => prev.map(t => t.folder === folderName ? {...t, folder: 'Geral'} : t));
     setFolders(prev => prev.filter(f => f !== folderName));
     setActiveFolder('Todas');
     showToast(`Pasta "${folderName}" apagada. Tarefas movidas para Geral.`);
  };

  const addTask = () => {
    if (isSprintMode) {
        if (!newTaskText.trim()) return showToast("Dê um nome à sua Sprint!");
        if (!newTaskDeadline) return showToast("A Sprint precisa de um prazo final!");
        if (sprints.some(s => !s.completed)) return showToast("Você já possui uma Sprint ativa! Conclua-a primeiro.");

        const lines = sprintTasksText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        if (lines.length === 0) return showToast("Adicione pelo menos 1 sub-tarefa à Sprint!");
        if (lines.length > 20) return showToast("Uma Sprint suporta no máximo 20 tarefas!");
        
        const daysDiff = Math.ceil((new Date(newTaskDeadline) - new Date(currentDate)) / (1000 * 60 * 60 * 24));
        if (daysDiff < lines.length) return showToast(`O prazo deve ser de pelo menos ${lines.length} dias para ${lines.length} tarefas!`);
        if (daysDiff > 31) return showToast("Sprints não podem durar mais de 31 dias!");

        let distance = '5K';
        if (lines.length > 5) distance = '10K';
        if (lines.length > 10) distance = '15K';
        if (lines.length > 15) distance = '20K';

        setSprints([{
           id: Date.now(), title: newTaskText, deadline: newTaskDeadline, distance: distance,
           tasks: lines.map((text, i) => ({ id: i, text, completed: false })),
           completed: false
        }, ...sprints]);

        showToast(`🏁 Sprint de ${distance} criada! Mantenha o ritmo!`);
        setNewTaskText(''); setSprintTasksText(''); setNewTaskDeadline(''); setIsSprintMode(false);
        return;
    }

    if (!newTaskText.trim()) return;
    if (newTaskTime && !newTaskDeadline) { showToast("⚠️ Adicione uma data antes de definir o horário!"); return; }
    
    let finalPriority = (isDailyChallenge || isBonusTask) ? 'P1' : newTaskPriority;
    let p1Count = user.dailyTaskLimits?.p1 || 0;
    let p2Count = user.dailyTaskLimits?.p2 || 0;
    
    if (!isDailyChallenge && !isBonusTask && !isTimeTestMode) {
        if (finalPriority === 'P1') p1Count++;
        if (finalPriority === 'P2') p2Count++;
    }

    if (isDailyChallenge && user.dailyChallengeUsed) return showToast("Desafio Diário já utilizado hoje!");
    if (isBonusTask && !user.hasBonusTaskAvailable) return showToast("Nenhuma Tarefa Bónus disponível!");

    if (isDailyChallenge) setUser(p => ({...p, dailyChallengeUsed: true}));
    if (isBonusTask) setUser(p => ({...p, hasBonusTaskAvailable: false}));

    const folderToSave = activeFolder === 'Todas' ? (folders.length > 0 ? folders[0] : 'Geral') : activeFolder;

    setTasks([{
      id: Date.now(), title: newTaskText, description: newTaskDesc, folder: folderToSave, completed: false,
      deadline: newTaskDeadline || null, deadlineTime: newTaskTime || null,
      recurring: newTaskRecurring, priority: finalPriority,
      isDailyChallenge, isBonusTask, boost: 1, ageInDays: 0, glowAnimation: false, rewardToast: null,
      isUrgent: false, urgencyDeadline: null, isSurprise: false,
      isTimeTest: isTimeTestMode, durationMinutes: isTimeTestMode ? timeTestDuration : null,
      timeTestActive: false, timeTestStartTime: null, timeTestEndTime: null
    }, ...tasks]); 
    
    setUser(prev => ({...prev, dailyTaskLimits: { p1: p1Count, p2: p2Count }}));
    showToast("✨ Tarefa forjada com sucesso!");

    setNewTaskText(''); setNewTaskDesc(''); setNewTaskDeadline(''); setNewTaskTime(''); 
    setNewTaskRecurring([]); setNewTaskPriority('P4');
    setIsDailyChallenge(false); setIsBonusTask(false); setIsTimeTestMode(false); setTimeTestDuration(30);
  };

  const toggleSprintTask = (sprintId, taskId) => {
     // 1. Encontramos a sprint e a tarefa primeiro (FORA do setState)
     const sprint = sprints.find(s => s.id === sprintId);
     if (!sprint || sprint.completed) return;
     
     const task = sprint.tasks.find(t => t.id === taskId);
     if (!task) return;
     
     const justCompletedTask = !task.completed;
     const newTasks = sprint.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
     const sprintNowCompleted = newTasks.every(t => t.completed) && !sprint.completed;

     // 2. Atualizamos o estado
     setSprints(prev => prev.map(s => s.id === sprintId ? { ...s, tasks: newTasks, completed: sprintNowCompleted || s.completed } : s));

     // 3. Aplicamos os Efeitos Colaterais (FORA do setState, evitando a duplicação!)
     if (justCompletedTask) {
         addXpAndCoins(50, 50, 50, 1); 
     }
     
     if (sprintNowCompleted) {
         let rewardXp = 0, rewardCoins = 0;
         if (sprint.distance === '5K') { rewardXp = 500; rewardCoins = 500; }
         if (sprint.distance === '10K') { rewardXp = 700; rewardCoins = 700; }
         if (sprint.distance === '15K') { rewardXp = 1000; rewardCoins = 1000; }
         if (sprint.distance === '20K') { rewardXp = 1400; rewardCoins = 1400; }
         
         addXpAndCoins(rewardXp, rewardCoins, rewardXp);
         setUser(u => ({...u, medals: [...u.medals, `sprint_${sprint.distance.toLowerCase()}`]}));
         showToast(`🏁 SPRINT ${sprint.distance} CONCLUÍDA! +${rewardXp} XP`);
     }
  };

  // --- NOVA LÓGICA MENSAL CENTRALIZADA ---
  const triggerMonthlyTurn = (isSimulated = false) => {
      let newMedal = null;
      const isPerfectMonth = user.maxStreakThisMonth >= 28;
      if (isPerfectMonth) newMedal = 'plat';
      else if (user.maxStreakThisMonth >= 23) newMedal = 'gold';
      else if (user.maxStreakThisMonth >= 14) newMedal = 'silver';
      else if (user.maxStreakThisMonth >= 7) newMedal = 'bronze';

      // Computar Pódio antes do Reset
      const userObj = { ...user, id: 'me' };
      const currentRanking = [...bots, userObj].sort((a, b) => b.monthlyXp - a.monthlyXp);
      const top3 = currentRanking.slice(0, 3);
      const userMonthlyXp = user.monthlyXp;

      // Ativar o Modal Mensal
      setMonthlySummaryModal({
          medal: newMedal,
          xp: userMonthlyXp,
          top3: top3,
          monthName: MONTH_NAMES[currentDate.getMonth()]
      });

      // Aplicar Reset
      setUser(prev => ({ 
          ...prev, 
          medals: newMedal ? [...prev.medals, newMedal] : prev.medals,
          maxStreakThisMonth: 0, monthDaysElapsed: 0, monthlyXp: 0, lastMonthlyXp: 0, phoenixUsedThisMonth: false, dailyChallengedBots: {}, urgencyCountThisMonth: 0 
      }));

      setHabits(cur => cur.map(h => ({ ...h, streak: 0, current: 0, completed: false, frozen: false })));
      setBots(cur => cur.map(b => ({ ...b, monthlyXp: 0, lastMonthlyXp: 0 })));
      
      if (isSimulated) {
          const nextMonthDate = new Date(currentDate);
          nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
          setCurrentDate(nextMonthDate);
      }
  };

  const tryPetBuff = (baseXP, baseCoins, task) => {
     let multXp = 1; let multCoins = 1; let triggered = false; let petEmoji = ''; let extraMsg = '';
     if (user.pet && user.pet.type !== 'egg' && !user.pet.isDead && !user.activeBuffs.petBuffUsedToday && !task.isSurprise) {
         const p = user.pet;
         const isHappy = p.food >= 60 && p.fun >= 60 && p.clean >= 60 && p.love >= 60;
         if (isHappy && Math.random() < 0.20) { 
             triggered = true; 
             petEmoji = PET_TYPES[p.type] ? PET_TYPES[p.type].emoji : '';
             setUser(prev => ({...prev, activeBuffs: {...prev.activeBuffs, petBuffUsedToday: true}}));
             const bns = user.petBuffBonus || 0;
             switch(p.type) {
                 case 'bat': multXp = 1.3 + bns + Math.random() * 0.2; extraMsg = "Chupão XP!"; break;
                 case 'dragon': multCoins = 3 + bns; extraMsg = "Ouro Triplicado!"; break;
                 case 'phoenix': multXp = 2 + bns; multCoins = 2 + bns; extraMsg = "Chamas Críticas!"; break;
                 case 'parrot': setPendingLootboxes(prev => prev + 1); addNotification("🦜 O Papagaio encontrou um baú!"); extraMsg = "Lootbox Instantânea!"; break;
                 case 'eagle':
                     setTasks(cur => cur.map(t => {
                         if(t.deadlineTime && !t.completed && !t.isSurprise) {
                             let [h, m] = t.deadlineTime.split(':');
                             if (parseInt(h) < 23) return { ...t, deadlineTime: `${String(parseInt(h)+1).padStart(2,'0')}:${m}`};
                         } return t;
                     }));
                     extraMsg = "Tempo expandido!"; break;
                 case 'penguin':
                     const unfrozen = habits.filter(h => !h.frozen && !h.completed);
                     if(unfrozen.length > 0) {
                         const target = unfrozen[Math.floor(Math.random() * unfrozen.length)];
                         setHabits(cur => cur.map(h => h.id === target.id ? {...h, frozen: true, completed: true} : h));
                         processHabitCompletion(); extraMsg = "Hábito congelado e concluído!";
                     } else { triggered = false; setUser(prev => ({...prev, activeBuffs: {...prev.activeBuffs, petBuffUsedToday: false}})); } break;
             }
         }
     }
     return { multXp, multCoins, triggered, petEmoji, extraMsg };
  };

  const interactWithPet = (actionType) => {
     if (actionType === 'love') {
        setUser(p => ({...p, pet: {...p.pet, love: Math.min(100, (p.pet.love || 0) + 15)}}));
        showToast("O seu pet adora o seu carinho! ❤️");
        return;
     }
     
     const inventoryKey = actionType === 'food' ? 'food' : actionType === 'clean' ? 'soap' : 'toys';
     if ((user.inventory?.[inventoryKey] || 0) <= 0) return showToast("Não tem itens suficientes! Compre na loja.");
     
     setUser(p => ({
       ...p, 
       inventory: {...p.inventory, [inventoryKey]: p.inventory[inventoryKey] - 1},
       pet: {...p.pet, [actionType]: Math.min(100, (p.pet[actionType] || 0) + 30)}
     }));
     showToast("Interação concluída! 🌟");
  };

  const toggleTask = (id) => {
    setTasks(currentTasks => currentTasks.map(t => {
      if (t.id === id) {
        if (t.isTimeTest) {
            if (!t.timeTestActive && !t.completed) {
                showToast("Inicie o Teste de Tempo para a concluir!");
                return t;
            }
            if (t.timeTestActive && !t.completed) {
                processTimeTest(t.id, false);
                return t;
            }
        }

        const isCompleting = !t.completed;
        if (isCompleting) {
          if (t.isSurprise) {
              addXpAndCoins(100, 100, 0, 1); 
              setMonthlyStats(prev => ({...prev, tasks: prev.tasks + 1}));
              setTimeout(() => { setTasks(tasksAfter => tasksAfter.map(task => task.id === id ? { ...task, glowAnimation: false, rewardToast: null } : task)); }, 2500);
              return { ...t, completed: true, glowAnimation: 'pet-glow', rewardToast: `🎁 Surpresa Concluída! +100 XP | +100 Moedas` };
          }

          const isSpecial = t.isDailyChallenge || t.isBonusTask;
          const baseXP = isSpecial ? 150 : (t.priority === 'P1' ? 50 : t.priority === 'P2' ? 40 : t.priority === 'P3' ? 30 : 20);
          const baseCoins = isSpecial ? 80 : (t.priority === 'P1' ? 60 : t.priority === 'P2' ? 50 : t.priority === 'P3' ? 40 : 30);
          
          let buffMult = 1; let coinBuffMult = 1; let isCrit = false;
          let isLate = false;
          
          const yyyy = currentDate.getFullYear(); const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); const dd = String(currentDate.getDate()).padStart(2, '0');
          const simDateStr = `${yyyy}-${mm}-${dd}`;

          if (t.recurring && t.recurring.length > 0) {
              if (t.deadlineTime) {
                  const now = new Date(); const nowTime = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
                  if (nowTime > t.deadlineTime) isLate = true;
              }
          } else {
              if (t.deadline) {
                  if (simDateStr > t.deadline) isLate = true;
                  else if (simDateStr === t.deadline && t.deadlineTime) {
                      const now = new Date(); const nowTime = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
                      if (nowTime > t.deadlineTime) isLate = true;
                  }
              }
          }

          let classMsg = '';
          if (user.userClass) {
              const clLvl = user.userClass.level;
              if (user.userClass.type === 'acrobat') {
                  if ((t.deadline || t.deadlineTime) && !isLate) { buffMult += 0.05 + (clLvl * 0.01); classMsg = 'Acrobata!'; }
              } else if (user.userClass.type === 'fighter') {
                  if (user.activeDuel && user.activeDuel.accepted) { buffMult += 0.08 + (clLvl * 0.012); classMsg = 'Lutador!'; }
              } else if (user.userClass.type === 'illusionist') {
                  const activeCount = tasks.filter(x=>!x.completed).length + habits.length;
                  buffMult += Math.min(0.15, activeCount * 0.005) + (clLvl * 0.005); classMsg = 'Ilusão!';
              } else if (user.userClass.type === 'thief') {
                  coinBuffMult += 0.10 + (clLvl * 0.02); classMsg = 'Saque!';
              }
          }

          if (user.activeBuffs.lastGasp) { buffMult *= 2; coinBuffMult *= 2; }
          if (user.activeBuffs.duelWin) { buffMult *= 1.15; coinBuffMult *= 1.15; }
          if (user.activeBuffs.duelLoss) { buffMult *= 0.85; coinBuffMult *= 0.85; }

          if (user.activeBuffs.realizador) {
             buffMult *= 1.2; coinBuffMult *= 1.2;
             if (!user.activeBuffs.criticalUsedToday) {
                 let critChance = 0.1;
                 if (t.priority === 'P4' && !isSpecial) critChance = 0.4;
                 else if (t.priority === 'P3') critChance = 0.3;
                 else if (t.priority === 'P2') critChance = 0.2;
                 if (Math.random() < critChance) {
                     buffMult *= 1.5; coinBuffMult *= 1.5; isCrit = true;
                     setUser(prev => ({...prev, activeBuffs: {...prev.activeBuffs, criticalUsedToday: true}}));
                     setEpicCritModal({ type: 'crit', taskTitle: t.title });
                 }
             }
          }

          const petEffect = tryPetBuff(baseXP, baseCoins, t);
          let depreciation = 1; let lossPercent = 0;
          if (!t.deadline && (!t.recurring || t.recurring.length === 0) && t.ageInDays > 0) {
              lossPercent = Math.min(80, t.ageInDays * 10); depreciation = (100 - lossPercent) / 100;
          }

          let finalXP = Math.floor(baseXP * t.boost * buffMult * petEffect.multXp * depreciation);
          let finalCoins = Math.floor(baseCoins * t.boost * coinBuffMult * petEffect.multCoins * depreciation);
          let finalClassXp = baseXP;

          if (isLate) { finalXP = Math.floor(finalXP / 2); finalCoins = Math.floor(finalCoins / 2); }

          addXpAndCoins(finalXP, finalCoins, finalClassXp, 1); 
          setMonthlyStats(prev => ({...prev, tasks: prev.tasks + 1}));
          setTimeout(() => { setTasks(tasksAfter => tasksAfter.map(task => task.id === id ? { ...task, glowAnimation: false, rewardToast: null } : task)); }, 2500);

          let toastMsg = `+${finalXP} XP | +${finalCoins} Moedas`;
          if (petEffect.triggered) toastMsg = `${petEffect.petEmoji} ${petEffect.extraMsg} ` + toastMsg;
          else if (isCrit) toastMsg = `CRÍTICO! ${toastMsg}`;
          else if (user.activeBuffs.lastGasp) toastMsg = `Último Gás! ${toastMsg}`;
          else if (user.activeBuffs.realizador) toastMsg = `Realizador! ${toastMsg}`;
          else if (classMsg) toastMsg = `${classMsg} ${toastMsg}`;
          if (isLate) toastMsg += ' (Atraso)';
          if (t.isUrgent) toastMsg += ' [URGÊNCIA CONCLUÍDA!]';

          return { 
            ...t, completed: true, isUrgent: false, urgencyDeadline: null,
            glowAnimation: petEffect.triggered ? 'pet-glow' : 'card-glow', 
            rewardToast: toastMsg, isLate, isCrit, isPetBuff: petEffect.triggered
          };
        }
        return { ...t, completed: false, glowAnimation: false, rewardToast: null, isLate: false, isCrit: false, isPetBuff: false };
      }
      return t;
    }));
  };

  const handleDeleteClick = (id, type) => {
     if (type === 'task') {
         const t = tasks.find(x => x.id === id);
         if (t && t.completed) { deleteTask(id); return; }
     }
     setItemToDelete({ id, type });
  };

  const confirmDelete = () => {
     if (itemToDelete.type === 'task') {
         const task = tasks.find(t => t.id === itemToDelete.id);
         if (task) {
             if (task.isSurprise) {
                 setTasks(currentTasks => currentTasks.filter(t => t.id !== task.id));
                 showToast("Tarefa Surpresa descartada sem penalidade.");
                 setItemToDelete(null); return;
             }
             if (task.priority === 'P1' && !task.isDailyChallenge && !task.isBonusTask && !task.isTimeTest) {
                 setUser(prev => ({...prev, dailyTaskLimits: { ...prev.dailyTaskLimits, p1: Math.max(0, (prev.dailyTaskLimits?.p1 || 0) - 1) }}));
             } else if (task.priority === 'P2' && !task.isTimeTest) {
                 setUser(prev => ({...prev, dailyTaskLimits: { ...prev.dailyTaskLimits, p2: Math.max(0, (prev.dailyTaskLimits?.p2 || 0) - 1) }}));
             }
             addXpAndCoins(-30, -10, 0, 0); 
             setTasks(currentTasks => currentTasks.filter(t => t.id !== task.id));
             showToast("Tarefa abandonada. Penalidade aplicada.");
         }
     } else {
         addXpAndCoins(-30, -10, 0, 0);
         setHabits(currentHabits => currentHabits.filter(h => h.id !== itemToDelete.id));
         showToast("Hábito abandonado. Penalidade aplicada.");
     }
     setItemToDelete(null);
  };

  const deleteTask = (id) => setTasks(currentTasks => currentTasks.filter(t => t.id !== id));
  
  const clearCompletedTasks = () => {
     setTasks(currentTasks => currentTasks.filter(t => {
         if (activeFolder === 'Todas') return !t.completed;
         if (t.folder === activeFolder) return !t.completed;
         return true;
     }));
     setSprints(current => current.filter(s => !s.completed));
  };

  const processHabitCompletion = () => {
     addXpAndCoins(50, 0, 50, 0); 
     setMonthlyStats(prev => ({...prev, habits: prev.habits + 1}));
     setUser(prev => {
        if (prev.pet && prev.pet.type === 'egg') {
           const newStrikes = prev.pet.strikes + 1;
           if (newStrikes >= 30) {
              let possiblePets = ['bat', 'penguin', 'eagle', 'parrot'];
              if (prev.level >= 30 && Math.random() < 0.25) possiblePets = Math.random() > 0.5 ? ['phoenix'] : ['dragon'];
              const hatchedType = possiblePets[Math.floor(Math.random() * possiblePets.length)];
              
              // Pequeno atraso para evitar conflitos de renderização no React
              setTimeout(() => {
                 setEggHatchModal({ type: hatchedType, step: 'cracking' });
              }, 0);
              
              return { ...prev, pet: { type: 'egg', strikes: newStrikes } }; 
           }
           return { ...prev, pet: { type: 'egg', strikes: newStrikes } };
        }
        return prev;
     });
  };

  const addHabit = () => {
    if (!newHabitText.trim() || habits.length >= 5) return;
    setHabits([...habits, {
      id: Date.now(), title: newHabitText, description: newHabitDesc, type: newHabitType,
      target: newHabitType === 'count' ? newHabitTarget : 1, current: 0, completed: false, streak: 0, frozen: false
    }]);
    setNewHabitText(''); setNewHabitDesc('');
  };

  const incrementHabit = (id) => {
    setHabits(currentHabits => currentHabits.map(h => {
      if (h.id === id && !h.completed && !h.frozen) {
        const nextCurrent = h.current + 1;
        const isCompleting = nextCurrent >= h.target;
        if (isCompleting) processHabitCompletion();
        return { ...h, current: nextCurrent, completed: isCompleting };
      }
      return h;
    }));
  };

  const deleteHabit = (id) => setHabits(currentHabits => currentHabits.filter(h => h.id !== id));

  // --- LOJA LOGIC ---
  const handleBuyItem = (action, cost, effectMsg) => {
    if (user.coins < cost) return showToast("Moedas insuficientes!");
    setUser(prev => ({ ...prev, coins: prev.coins - cost })); action(); showToast(effectMsg);
  };

  const handleBuyFreeze = (habitId) => {
    handleBuyItem(() => {
      setHabits(currentHabits => currentHabits.map(h => h.id === habitId ? { ...h, frozen: true, completed: true } : h));
      processHabitCompletion(); setFreezeModalOpen(false);
    }, 400, "Hábito congelado e concluído!");
  };

  const handleBuyBonusTask = () => {
    if (user.hasBonusTaskAvailable) return showToast("Já possui uma Tarefa Bónus!");
    handleBuyItem(() => setUser(prev => ({ ...prev, hasBonusTaskAvailable: true })), 300, "Tarefa Bónus desbloqueada!");
  };

  const handleBuyBuff = (type) => {
    const cost = type === 'realizador' ? 400 : 300;
    if (user.activeBuffs[type]) return showToast(`Espírito já está ativo!`);
    handleBuyItem(() => setUser(prev => ({ ...prev, activeBuffs: { ...prev.activeBuffs, [type]: true } })), cost, `O Espírito fluí em si!`);
  };

  const buyPetItem = (item) => {
     handleBuyItem(() => setUser(prev => ({ ...prev, inventory: { ...prev.inventory, [item]: prev.inventory[item] + 1 } })), 10, "Item comprado!");
  };

  const handleBuyPetEgg = () => {
      if (user.pet) return showToast("Você já possui um companheiro ou ovo!");
      handleBuyItem(() => setUser(prev => ({ ...prev, pet: { type: 'egg', strikes: 0 } })), 2500, "Ovo de Pet Adquirido!");
  };

  const handleBuyLifeHammer = () => {
      if (!user.pet || user.pet.type !== 'egg') return showToast("Apenas aplicável a ovos não rachados!");
      handleBuyItem(() => {
          let possiblePets = ['bat', 'penguin', 'eagle', 'parrot'];
          if (user.level >= 30 && Math.random() < 0.25) possiblePets = Math.random() > 0.5 ? ['phoenix'] : ['dragon'];
          const hatchedType = possiblePets[Math.floor(Math.random() * possiblePets.length)];
          setEggHatchModal({ type: hatchedType, step: 'cracking' });
      }, 1000, "Martelo utilizado!");
  };

  const applyCronosToTask = (taskId) => {
     setTasks(currentTasks => currentTasks.map(t => {
        if (t.id === taskId) {
           let dStr = t.deadline; let tStr = t.deadlineTime;
           const today = new Date(currentDate);
           if (!dStr) dStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
           if (!tStr) tStr = '23:59';
           const dObj = new Date(`${dStr}T${tStr}:00`);
           if (cronosModalOpen === 'moeda') dObj.setHours(dObj.getHours() + 3);
           else if (cronosModalOpen === 'medalha') dObj.setDate(dObj.getDate() + 1);
           const newDStr = `${dObj.getFullYear()}-${String(dObj.getMonth()+1).padStart(2,'0')}-${String(dObj.getDate()).padStart(2,'0')}`;
           const newTStr = `${String(dObj.getHours()).padStart(2,'0')}:${String(dObj.getMinutes()).padStart(2,'0')}`;
           return { ...t, deadline: newDStr, deadlineTime: newTStr };
        }
        return t;
     }));
     setUser(prev => ({ ...prev, coins: prev.coins - (cronosModalOpen === 'moeda' ? 100 : 200) }));
     showToast(`Prazo estendido!`); setCronosModalOpen(null);
  };

  const openCronosModal = (type) => {
     const cost = type === 'moeda' ? 100 : 200;
     if (user.coins < cost) return showToast("Moedas insuficientes!");
     const activeTasks = tasks.filter(t => !t.completed && !t.recurring?.length && !t.isSurprise && !t.isTimeTest);
     if (activeTasks.length === 0) return showToast("Nenhuma tarefa elegível!");
     setCronosModalOpen(type);
  };

  const handleBuyMagicDice = () => {
    if (user.coins < 450) return showToast("Moedas insuficientes!");
    const activeTasks = tasks.filter(t => !t.completed && !t.isSurprise);
    if (activeTasks.length === 0) return showToast("Sem tarefas ativas!");

    setUser(prev => ({ ...prev, coins: prev.coins - 450 }));
    const roll = Math.floor(Math.random() * 6) + 1;
    let weightedTasks = [];
    activeTasks.forEach(t => {
      let weight = 10;
      const isHighTier = t.isDailyChallenge || t.isBonusTask || t.priority === 'P1';
      if (isHighTier) weight = Math.max(1, 12 - (roll * 2)); 
      else if (t.priority === 'P2') weight = Math.max(3, 10 - roll);
      else weight = 10 + roll;
      for(let i=0; i<weight; i++) weightedTasks.push(t);
    });
    
    const selectedTask = weightedTasks[Math.floor(Math.random() * weightedTasks.length)];
    
    setDiceSlotActive(true); let ticks = 0; const intervalTime = 60; 
    const spinInterval = setInterval(() => {
      setSlotDisplay({ roll: Math.floor(Math.random() * 6) + 1, title: activeTasks[Math.floor(Math.random() * activeTasks.length)].title });
      ticks++;
      if (ticks > 25) {
        clearInterval(spinInterval); setSlotDisplay({ roll, title: selectedTask.title }); 
        setTimeout(() => {
          setDiceSlotActive(false);
          setTasks(current => current.map(t => t.id === selectedTask.id ? { ...t, boost: roll } : t));
          if (roll === 6 && (selectedTask.isDailyChallenge || selectedTask.isBonusTask || selectedTask.priority === 'P1')) {
            setEpicCritModal({ type: 'dice', roll, taskTitle: selectedTask.title });
          } else showToast(`🎲 Dado ${roll}! "${selectedTask.title}" x${roll}!`);
        }, 1800);
      }
    }, intervalTime);
  };

  const buyVoucherItem = (type) => {
     if (type === 'petBuff') {
         if (user.vouchers < 10) return showToast("Vouchers insuficientes!");
         setUser(p => ({...p, vouchers: p.vouchers - 10, petBuffBonus: (p.petBuffBonus || 0) + 0.05}));
         showToast("Buff permanente do Pet melhorado em 5%!");
     } else if (type === 'lootbox') {
         if (user.vouchers < 5) return showToast("Vouchers insuficientes!");
         setUser(p => ({...p, vouchers: p.vouchers - 5}));
         openLootbox(true);
     } else if (type === 'lastGasp') {
         if (user.vouchers < 7) return showToast("Vouchers insuficientes!");
         if (user.activeBuffs.lastGasp) return showToast("Último Gás já está ativo!");
         setUser(p => ({...p, vouchers: p.vouchers - 7, activeBuffs: {...p.activeBuffs, lastGasp: true}}));
         showToast("Último Gás Ativado! XP/Moedas a dobrar hoje.");
     }
  };

  const startSlotMachine = () => {
      if (user.vouchers < slotBet) return showToast("Vouchers insuficientes!");
      setUser(p => ({...p, vouchers: p.vouchers - slotBet}));
      
      setSlotModalOpen(true);
      setSlotState({ active: true, reels: ['❓','❓','❓'], result: null });
      
      const winChance = 20 - (slotBet - 1) * 2; 
      const isWin = Math.random() * 100 < winChance;
      
      let finalPrizeObj = null; let finalReels = [];

      if (isWin) {
         const dChance = 5 + (slotBet - 1); const bChance = 10 + (slotBet - 1);
         const cChance = 15 + (slotBet - 1); const aChance = 30 + (slotBet - 1);
         
         const r = Math.random() * 100;
         if (r < dChance) finalPrizeObj = SLOT_ITEMS[0];
         else if (r < dChance + bChance) finalPrizeObj = SLOT_ITEMS[1];
         else if (r < dChance + bChance + cChance) finalPrizeObj = SLOT_ITEMS[2];
         else if (r < dChance + bChance + cChance + aChance) finalPrizeObj = SLOT_ITEMS[3];
         else finalPrizeObj = SLOT_ITEMS[4];

         finalReels = [finalPrizeObj.icon, finalPrizeObj.icon, finalPrizeObj.icon];
      } else {
         const items = [...SLOT_ITEMS].sort(() => Math.random() - 0.5);
         finalReels = [items[0].icon, items[0].icon, items[1].icon];
      }

      setTimeout(() => setSlotState(s => ({...s, reels: [finalReels[0], '❓', '❓']})), 1000);
      setTimeout(() => setSlotState(s => ({...s, reels: [finalReels[0], finalReels[1], '❓']})), 2000);
      setTimeout(() => {
          setSlotState({ active: false, reels: finalReels, result: isWin ? finalPrizeObj : 'loss' });
          if (isWin) {
             const payout = finalPrizeObj.pay * slotBet;
             addXpAndCoins(0, payout, 0, 0);
             showToast(`🎉 Ganhou ${payout} Moedas!`);
          }
      }, 3500);
  };

  const openLootbox = (force = false) => {
      if(!force && pendingLootboxes <= 0) return;
      if(!force) setPendingLootboxes(p => Math.max(0, p - 1));
      setSelectedLootboxCard(null); 
      
      const cards = [];
      const hasPetItem = user.pet !== null; 
      let eggAdded = false;

      for(let i=0; i<3; i++) {
         let roll = Math.random();
         if (!hasPetItem && !eggAdded && roll < 0.2) { 
             cards.push({ type: 'egg' }); eggAdded = true;
         } else if (roll < 0.6) {
             cards.push({ type: 'coins', amount: Math.floor(Math.random() * 201) + 100 }); 
         } else {
             cards.push({ type: 'xp', amount: Math.floor(Math.random() * 101) + 100 }); 
         }
      }
      cards.sort(() => Math.random() - 0.5);
      
      if (Math.random() < 0.10 && (user.urgencyCountThisMonth || 0) < 8) triggerUrgency();

      setLootboxRevealed(cards);
      setLootboxCardsModal(true);
  };

  const handleCardSelect = (index, card) => {
      if (selectedLootboxCard !== null) return; 
      setSelectedLootboxCard(index);

      if(card.type === 'coins') addXpAndCoins(0, card.amount, 0, 0);
      if(card.type === 'xp') addXpAndCoins(card.amount, 0, 0, 0);
      if(card.type === 'egg') setUser(p => ({...p, pet: { type: 'egg', strikes: 0 }}));

      setTimeout(() => setLootboxCardsModal(false), 3000);
  };

  const challengeBot = (botId, botName, botEmoji) => {
     if(user.activeDuel && user.activeDuel.pending) return showToast("Já tem um duelo ativo ou pendente hoje!");
     if(user.dailyChallengedBots && user.dailyChallengedBots[botId] === 'refused') return showToast(`${botName} já recusou um duelo hoje.`);
     
     const now = new Date(); now.setMinutes(now.getMinutes() + Math.floor(Math.random() * 45) + 15);
     const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
     
     showToast(`Convite enviado para ${botName} ${botEmoji}. Ele responderá por volta das ${timeStr}.`);
     
     const willAccept = Math.random() <= 0.6;
     const botTarget = bots.find(b => b.id === botId);
     
     setUser(prev => ({
        ...prev,
        activeDuel: { botId, botName, botEmoji, pending: true, accepted: false, userDailyXpStart: prev.monthlyXp, botDailyXpStart: botTarget.monthlyXp }
     }));
     
     setTimeout(() => {
        setUser(prev => {
           if(!prev.activeDuel || !prev.activeDuel.pending) return prev; 
           if(willAccept) {
              addNotification(`⚔️ ${botName} aceitou o duelo! Acumule mais XP que ele até à meia-noite!`);
              return { ...prev, activeDuel: { ...prev.activeDuel, accepted: true, pending: false } };
           } else {
              addNotification(`💨 ${botName} recusou o desafio.`);
              return { ...prev, activeDuel: null, dailyChallengedBots: {...(prev.dailyChallengedBots || {}), [botId]: 'refused'} };
           }
        });
     }, 4000); 
  };

  const processNextDay = () => {
    let penaltyTaskTitle = null;
    let didFailUrgency = false;
    setTasks(currentTasks => {
        const newTasks = currentTasks.map(t => {
            if (t.isUrgent && !t.completed) { didFailUrgency = true; penaltyTaskTitle = t.title; return { ...t, isUrgent: false, urgencyDeadline: null }; }
            return t;
        });
        return newTasks;
    });

    if (didFailUrgency) {
        setUser(p => { const newGold = Math.floor(p.coins * 0.6); const newLevel = Math.max(1, p.level - 1); return { ...p, coins: newGold, level: newLevel }; });
        setUrgencyFailureModal({ title: penaltyTaskTitle });
    }

    setForceAdvanceModal(false);
    setIsProcessingDay(true);

    setTimeout(() => {
        const nextDate = new Date(currentDate);
        nextDate.setDate(nextDate.getDate() + 1);
        setCurrentDate(nextDate);

        if (nextDate.getMonth() !== currentDate.getMonth()) {
            triggerMonthlyTurn(false);
        }
        
        let newFeed = [];

        let newBots = bots.map(bot => {
          const dailyTasksCompleted = Math.floor(bot.consistency * 4) + Math.floor(Math.random() * 3);
          const didDailyChallenge = Math.random() < bot.grindFactor;
          let xpGained = (dailyTasksCompleted * 30) + (didDailyChallenge ? 150 : 0);
          
          if (bot.activeBuffs?.realizador) xpGained = Math.floor(xpGained * 1.2);
          if (bot.activeBuffs?.duelWin) xpGained = Math.floor(xpGained * 1.15);
          if (bot.activeBuffs?.duelLoss) xpGained = Math.floor(xpGained * 0.85);
          
          const newTotalXp = (bot.totalXp || 0) + xpGained;
          const newLevel = calculateBotLevel(newTotalXp);

          let newPet = bot.pet;
          if (!newPet && newLevel >= 10 && Math.random() < 0.05) {
              newPet = BOT_PETS[Math.floor(Math.random() * (newLevel >= 30 ? 6 : 4))];
              if (PET_TYPES[newPet]) newFeed.push({ id: Math.random(), type: 'pet', text: `${bot.name} adotou um ${PET_TYPES[newPet].name}!`, icon: '🐾' });
          } else if (newPet && Math.random() < 0.02) {
              newFeed.push({ id: Math.random(), type: 'pet_death', text: `O pet de ${bot.name} fugiu para a floresta...`, icon: '🪦' });
              newPet = null;
          }

          let botStreak = bot.streak || 0;
          if (Math.random() > 0.2) botStreak++; else botStreak = 0;
          if (botStreak === 7) newFeed.push({ id: Math.random(), type: 'streak', text: `${bot.name} atingiu uma ofensiva de Bronze!`, icon: '🔥' });
          if (botStreak === 14) newFeed.push({ id: Math.random(), type: 'streak', text: `${bot.name} atingiu uma ofensiva de Prata!`, icon: '🔥' });
          if (botStreak === 23) newFeed.push({ id: Math.random(), type: 'streak', text: `${bot.name} atingiu uma incrível ofensiva de Ouro!`, icon: '🔥' });

          return { 
             ...bot, lastMonthlyXp: bot.monthlyXp, monthlyXp: bot.monthlyXp + xpGained,
             totalXp: newTotalXp, level: newLevel, pet: newPet, streak: botStreak,
             activeBuffs: { realizador: Math.random() < 0.15, resguardo: Math.random() < 0.15, duelWin: false, duelLoss: false }
          };
        });

        let botPool = [...newBots].sort(() => Math.random() - 0.5);
        for(let i=0; i<6; i+=2) {
           let b1 = botPool[i]; let b2 = botPool[i+1];
           let xp1 = b1.monthlyXp - b1.lastMonthlyXp;
           let xp2 = b2.monthlyXp - b2.lastMonthlyXp;
           if (xp1 > xp2) {
               b1.activeBuffs.duelWin = true; b2.activeBuffs.duelLoss = true;
               newFeed.push({ id: Math.random(), type: 'duel', text: `${b1.name} massacrou ${b2.name} num duelo!`, icon: '⚔️' });
           } else if (xp2 > xp1) {
               b2.activeBuffs.duelWin = true; b1.activeBuffs.duelLoss = true;
               newFeed.push({ id: Math.random(), type: 'duel', text: `${b2.name} massacrou ${b1.name} num duelo!`, icon: '⚔️' });
           }
        }
        
        const completedHabitsCount = habits.filter(h => h.completed || h.frozen).length;
        let earnedVouchers = 0;
        if (completedHabitsCount >= 3) {
            earnedVouchers = 1;
            newFeed.push({ id: Math.random(), type: 'voucher', text: `Você ganhou 1 Voucher por consistência impecável!`, icon: '🎟️' });
        }

        let newGlobalStreak = user.streak;
        let monthMaxStreak = user.maxStreakThisMonth;
        const unfrozenHabits = habits.filter(h => !h.frozen);
        const allHabitsDone = habits.length > 0 && habits.every(h => h.completed || h.frozen);
        
        if (allHabitsDone) {
          newGlobalStreak++;
          if (newGlobalStreak > monthMaxStreak) monthMaxStreak = newGlobalStreak;
          if (newGlobalStreak === 7) newFeed.push({ id: Math.random(), type: 'streak', text: `Você atingiu uma ofensiva de Bronze!`, icon: '🔥' });
          if (newGlobalStreak === 14) newFeed.push({ id: Math.random(), type: 'streak', text: `Você atingiu uma ofensiva de Prata!`, icon: '🔥' });
          if (newGlobalStreak === 23) newFeed.push({ id: Math.random(), type: 'streak', text: `Você atingiu uma ofensiva de Ouro!`, icon: '🔥' });
        } else if (unfrozenHabits.length > 0) {
          let penalty = Math.max(100, 300 - (newGlobalStreak * 10)); 
          if (user.activeBuffs.resguardo) penalty = Math.floor(penalty * 0.2); // 80% de proteção (sofre apenas 20%)
          
          let fenixSaved = false;
          if (user.pet && user.pet.type === 'phoenix' && !user.pet.isDead && !user.phoenixUsedThisMonth) {
             fenixSaved = true;
             setUser(p => ({...p, phoenixUsedThisMonth: true}));
             addNotification("🐦‍🔥 A Fênix ressuscitou a sua ofensiva das cinzas!");
          } else {
             addXpAndCoins(-penalty, 0, 0, 0); 
             newGlobalStreak = 0;
          }
        }

        let nextDayDuelWin = false; let nextDayDuelLoss = false;

        if (user.activeDuel && user.activeDuel.accepted) {
            const bot = newBots.find(b => b.id === user.activeDuel.botId);
            const userDiff = user.monthlyXp - user.activeDuel.userDailyXpStart;
            const botDiff = bot.monthlyXp - user.activeDuel.botDailyXpStart;
            
            const win = userDiff > botDiff; const tie = userDiff === botDiff;
            
            if (win && !tie) {
                addXpAndCoins(500, 200, 0, 0); 
                setUser(prev => ({...prev, duelStats: { ...prev.duelStats, wins: (prev.duelStats?.wins || 0) + 1 }}));
                nextDayDuelWin = true; bot.activeBuffs.duelLoss = true;
                newFeed.push({ id: Math.random(), type: 'duel', text: `Você aniquilou ${bot.name} num duelo!`, icon: '⚔️' });
            } else if (tie) {
                setUser(prev => ({...prev, duelStats: { ...prev.duelStats, ties: (prev.duelStats?.ties || 0) + 1 }}));
            } else {
                setUser(prev => ({...prev, duelStats: { ...prev.duelStats, losses: (prev.duelStats?.losses || 0) + 1 }}));
                nextDayDuelLoss = true; bot.activeBuffs.duelWin = true;
                newFeed.push({ id: Math.random(), type: 'duel', text: `${bot.name} derrotou-o num duelo!`, icon: '⚔️' });
            }
            setPendingDuelResult({ botName: user.activeDuel.botName, botEmoji: user.activeDuel.botEmoji, win, tie, userDiff, botDiff });
        }
        
        newBots = newBots.map(bot => {
           if (Math.random() < 0.05) { 
               const dist = ['5k', '10k', '15k', '20k'][Math.floor(Math.random()*4)];
               bot.medals.push(`sprint_${dist}`);
               newFeed.push({ id: Math.random(), type: 'sprint', text: `🏁 ${bot.name} acaba de cruzar a linha de chegada de uma Sprint de ${dist.toUpperCase()}!`, icon: '🏁' });
           }
           return bot;
        });

        setBots(newBots); 

        let updatedPet = user.pet;
        if (updatedPet && updatedPet.type !== 'egg' && !updatedPet.isDead) {
            let p = { ...updatedPet };
            p.food = Math.max(0, p.food - 20); p.fun = Math.max(0, p.fun - 20); p.clean = Math.max(0, p.clean - 20); p.love = Math.max(0, p.love - 20);
            let lowCount = 0;
            if(p.food < 30) lowCount++; if(p.fun < 30) lowCount++; if(p.clean < 30) lowCount++; if(p.love < 30) lowCount++;
            if (lowCount >= 2) {
                p.isDead = true;
                addNotification(`🪦 O seu Pet ${PET_TYPES[p.type] ? PET_TYPES[p.type].name : ''} morreu por falta de cuidados...`);
                newFeed.push({ id: Math.random(), type: 'pet_death', text: `Infelizmente, o companheiro de Você não resistiu...`, icon: '🪦' });
            }
            updatedPet = p;
        }

        setGlobalFeed(prev => [...newFeed, ...prev].slice(0, 50));

        let isNewXpRecord = false; let isNewCoinsRecord = false;
        let newMaxXp = user.records.maxXp; let newMaxCoins = user.records.maxCoins;
        if (user.dailyGainedXp > user.records.maxXp) { isNewXpRecord = true; newMaxXp = user.dailyGainedXp; }
        if (user.dailyGainedCoins > user.records.maxCoins) { isNewCoinsRecord = true; newMaxCoins = user.dailyGainedCoins; }

        setDailySummaryModal({ xp: user.dailyGainedXp, coins: user.dailyGainedCoins, vouchers: earnedVouchers, isNewXpRecord, isNewCoinsRecord });

        setUser(prev => ({ 
          ...prev, streak: newGlobalStreak, maxStreakThisMonth: monthMaxStreak, vouchers: (prev.vouchers || 0) + earnedVouchers,
          monthDaysElapsed: prev.monthDaysElapsed + 1, lastMonthlyXp: prev.monthlyXp,
          activeBuffs: { realizador: false, resguardo: false, criticalUsedToday: false, petBuffUsedToday: false, lastGasp: false, duelWin: nextDayDuelWin, duelLoss: nextDayDuelLoss },
          dailyTaskLimits: { p1: 0, p2: 0 }, pet: updatedPet, dailyChallengedBots: {}, dailyChallengeUsed: false, activeDuel: null,
          dailyGainedXp: 0, dailyGainedCoins: 0, dailyGainedVouchers: 0, records: { maxXp: newMaxXp, maxCoins: newMaxCoins }
        }));

        setHabits(currentHabits => currentHabits.map(h => ({
          ...h, streak: (h.completed || h.frozen) ? (h.frozen ? h.streak : h.streak + 1) : 0,
          current: 0, completed: false, frozen: false 
        })));
        
        setTasks(currentTasks => {
          let modifiedTasks = currentTasks.filter(t => !(t.isSurprise && !t.completed)); 
          modifiedTasks = modifiedTasks.map(t => {
              let updatedTask = { ...t };
              if (t.recurring && t.recurring.includes(nextDate.getDay())) {
                 updatedTask = { ...updatedTask, completed: false, glowAnimation: false, rewardToast: null, isLate: false, isCrit: false, isPetBuff: false, isUrgent: false, urgencyDeadline: null };
              }
              if (!t.deadline && (!t.recurring || t.recurring.length === 0) && !t.completed && !t.isSurprise && !t.isTimeTest) {
                 updatedTask.ageInDays = (updatedTask.ageInDays || 0) + 1;
              }
              return updatedTask;
          });

          if (Math.random() < 0.35) {
              const st = SURPRISE_TASKS[Math.floor(Math.random() * SURPRISE_TASKS.length)];
              const nY = nextDate.getFullYear(); const nM = String(nextDate.getMonth() + 1).padStart(2, '0'); const nD = String(nextDate.getDate()).padStart(2, '0');
              modifiedTasks.unshift({
                  id: Date.now() + 1000, title: st.title, description: st.desc, folder: 'Geral', completed: false,
                  deadline: `${nY}-${nM}-${nD}`, deadlineTime: '23:59', recurring: [], priority: 'P4', 
                  isSurprise: true, boost: 1, ageInDays: 0, glowAnimation: false, rewardToast: null, isUrgent: false, isTimeTest: false
              });
          }
          return modifiedTasks;
        });

        setIsProcessingDay(false);

        if (Math.random() < 0.20 && user.urgencyCountThisMonth < 8) {
            triggerUrgency();
        }

        if (!user.activeDuel || !user.activeDuel.accepted) setShowWelcome(true);

    }, 2500); 
  };

  const simulateNextMonth = () => {
    triggerMonthlyTurn(true);
    let newMedal = null;
    const isPerfectMonth = user.maxStreakThisMonth >= 28;
    if (isPerfectMonth) newMedal = 'plat';
    else if (user.maxStreakThisMonth >= 23) newMedal = 'gold';
    else if (user.maxStreakThisMonth >= 14) newMedal = 'silver';
    else if (user.maxStreakThisMonth >= 7) newMedal = 'bronze';

    if (newMedal) setUser(prev => ({ ...prev, medals: [...prev.medals, newMedal] }));

    setHabits(cur => cur.map(h => ({ ...h, streak: 0, current: 0, completed: false, frozen: false })));

    setUser(prev => ({ ...prev, maxStreakThisMonth: 0, monthDaysElapsed: 0, monthlyXp: 0, lastMonthlyXp: 0, phoenixUsedThisMonth: false, dailyChallengedBots: {}, urgencyCountThisMonth: 0 }));
    setBots(cur => cur.map(b => ({ ...b, monthlyXp: 0, lastMonthlyXp: 0 })));
    
    // --- ADICIONADO: Avançar a data real em 1 mês ---
    const nextMonthDate = new Date(currentDate);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    setCurrentDate(nextMonthDate);
    
    showToast("Mês avançado! Estatísticas reiniciadas.");
    setShowMonthlyReset(true); 
  };

  const rankingList = useMemo(() => {
    const userObj = { ...user, id: 'me' };
    const oldRanking = [...bots, userObj].sort((a, b) => b.lastMonthlyXp - a.lastMonthlyXp);
    const oldPositions = {};
    oldRanking.forEach((u, index) => { oldPositions[u.id] = index; });
    
    const currentRanking = [...bots, userObj].sort((a, b) => b.monthlyXp - a.monthlyXp);
    return currentRanking.map((u, index) => {
      const oldPos = oldPositions[u.id];
      let trend = 'same';
      if (oldPos > index) trend = 'up';
      if (oldPos < index) trend = 'down';
      return { ...u, trend };
    });
  }, [bots, user]);
  
  const userRankPosition = rankingList.findIndex(u => u.isUser) + 1;

  const handleHourSelect = (hStr) => { const mins = newTaskTime ? newTaskTime.split(':')[1] : '00'; setNewTaskTime(`${hStr}:${mins}`); };
  const handleMinuteSelect = (mStr) => { const hrs = newTaskTime ? newTaskTime.split(':')[0] : '12'; setNewTaskTime(`${hrs}:${mStr}`); };

  // --- RENDERIZAÇÃO DE TELAS ---

  // TELA DE CARREGAMENTO DO LOGIN
  if (isLoadingAuth && !isGuestMode) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-emerald-500">
        <Loader2 size={64} className="animate-spin mb-4" />
        <p className="font-bold tracking-widest uppercase">Conectando ao servidor...</p>
      </div>
    );
  }

  // TELA DE LOGIN (Se não houver usuário)
  if (!currentUser && !isGuestMode) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 to-zinc-950"></div>
         
         <div className="relative z-10 w-full max-w-sm flex flex-col items-center animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
               <CheckCircle size={48} className="text-emerald-500" />
            </div>
            
            <h1 className="text-4xl font-black text-white mb-2">Focus<span className="text-zinc-500">Quest</span></h1>
            <p className="text-zinc-400 text-center mb-10">A sua jornada em múltiplos dispositivos começa aqui.</p>
            
            {/* Login com o Google */}
            <button 
               onClick={() => signInWithPopup(auth, provider)} 
               className="w-full bg-white text-black font-black py-4 rounded-xl flex items-center justify-center gap-3 transition-transform hover:scale-105 shadow-lg"
            >
               <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
               Entrar com o Google
            </button>

            {/* Opção Visitante (LocalStorage) */}
            <div className="mt-8 pt-8 border-t border-zinc-800 w-full text-center">
               <p className="text-xs text-zinc-500 mb-4 leading-relaxed px-4">
                  Não quer vincular uma conta? Jogue como Visitante. 
                  <strong className="text-zinc-400 block mt-1">Atenção: O seu progresso ficará salvo apenas neste navegador.</strong>
               </p>
               <button 
                  onClick={() => {
                     setIsGuestMode(true);
                     localStorage.setItem('fq_is_guest', 'true');
                  }} 
                  className="w-full bg-zinc-800 text-white font-bold py-3.5 rounded-xl border border-zinc-700 hover:bg-zinc-700 transition-colors"
               >
                  Jogar como Visitante
               </button>
            </div>
         </div>
      </div>
    );
  }

  // TELA DE CARREGAMENTO DE DADOS (Evita erros de null pointer antes do onSnapshot disparar)
  if (!isDataLoaded || !user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-emerald-500">
        <Loader2 size={64} className="animate-spin mb-4" />
        <p className="font-bold tracking-widest uppercase">Baixando seu progresso...</p>
      </div>
    );
  }

  // LOGOUT BUTTON (Opcional, mas útil colocar no header)
  const handleLogout = () => {
    if (isGuestMode) {
      // Se for visitante, apenas desligamos o modo visitante (os dados ficam guardados no localStorage para a próxima vez que ele clicar em visitante)
      setIsGuestMode(false);
      localStorage.removeItem('fq_is_guest');
      setUser(null);
      setIsDataLoaded(false);
    } else {
      // Se for do Google, fazemos o sign out real do Firebase
      signOut(auth);
      setUser(null);
      setIsDataLoaded(false);
    }
  };

  if (!user.hasCompletedOnboarding) {
    return (
        <div className={`fixed inset-0 bg-zinc-950 text-white z-[5000] flex flex-col justify-center items-center p-6 transition-all duration-500 ${isLeavingOnboarding ? 'opacity-0' : 'opacity-100'}`}>
            {onboardingStep === 0 && (
                <div className="max-w-md w-full text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="w-24 h-24 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                       <Sparkles size={48} className="text-emerald-500" />
                    </div>
                    <h1 className="text-4xl font-black mb-4">Focus<span className="text-zinc-500">Quest</span></h1>
                    <p className="text-zinc-400 mb-12 text-lg leading-relaxed">Onde a sua rotina diária se transforma numa jornada épica de evolução.</p>
                    <button onClick={() => setOnboardingStep(1)} className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-zinc-200 transition-transform hover:scale-105">Começar</button>
                </div>
            )}
            {onboardingStep === 1 && (
                <div className="max-w-md w-full text-center animate-in fade-in slide-in-from-right-8 duration-500">
                    <h2 className="text-2xl font-black mb-8 text-emerald-500">O que o aguarda?</h2>
                    <div className="space-y-4 mb-10">
                        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4 text-left">
                           <div className="w-12 h-12 bg-fuchsia-500/20 rounded-xl flex items-center justify-center text-fuchsia-500"><Swords size={24}/></div>
                           <div><h4 className="font-bold">Duelos & Mundo</h4><p className="text-xs text-zinc-400">Enfrente 99 adversários pelo topo.</p></div>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4 text-left">
                           <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-500"><Egg size={24}/></div>
                           <div><h4 className="font-bold">Pets Mágicos</h4><p className="text-xs text-zinc-400">Cuide deles para ganhar bónus em tarefas.</p></div>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4 text-left">
                           <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-500"><PackageOpen size={24}/></div>
                           <div><h4 className="font-bold">Lootboxes</h4><p className="text-xs text-zinc-400">Ganhe baús e recompensas raras no seu progresso.</p></div>
                        </div>
                    </div>
                    <button onClick={() => setOnboardingStep(2)} className="w-full bg-emerald-500 text-white font-black py-4 rounded-xl hover:bg-emerald-400 transition-transform hover:scale-105">Continuar</button>
                </div>
            )}
            {onboardingStep === 2 && (
                <div className="max-w-md w-full animate-in fade-in slide-in-from-right-8 duration-500 flex flex-col justify-center">
                    <h2 className="text-2xl font-black mb-6 text-center">Forje o seu Legado</h2>
                    <input type="text" placeholder="Qual o seu nome?" value={onboardingName} onChange={e=>setOnboardingName(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500 mb-6 text-center text-lg" />
                    
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4 text-center">Escolha a sua Classe</h3>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {Object.values(CLASSES).map(c => {
                           const Icon = c.icon;
                           const isSelected = onboardingClass === c.id;
                           return (
                               <div key={c.id} onClick={() => setOnboardingClass(c.id)} className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${isSelected ? `${c.border} bg-zinc-900 shadow-[0_0_20px_rgba(255,255,255,0.05)] scale-105` : 'border-zinc-800 bg-zinc-950 opacity-60 hover:opacity-100'}`}>
                                  <div className={`w-10 h-10 rounded-full ${c.bg} flex items-center justify-center mb-2`}><Icon size={20} className={c.color}/></div>
                                  <h4 className={`font-black text-sm mb-1 ${isSelected ? c.color : 'text-zinc-300'}`}>{c.name}</h4>
                                  <p className="text-[9px] text-zinc-500 leading-tight">{c.desc}</p>
                               </div>
                           )
                        })}
                    </div>

                    <div className="flex items-center gap-2 mt-2 mb-4 text-left bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl cursor-pointer" onClick={() => setOnboardingDebug(!onboardingDebug)}>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${onboardingDebug ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-zinc-600'}`}>
                            {onboardingDebug && <CheckCircle size={14} />}
                        </div>
                        <span className="text-xs text-zinc-300">Quero ter acesso ao Menu de Debug (Para Testes)</span>
                    </div>

                    <button 
                       onClick={() => {
                          if(!onboardingName.trim()) return showToast("Por favor, digite o seu nome.");
                          setOnboardingStep(3);
                          setTimeout(() => setIsLeavingOnboarding(true), 2500);
                          setTimeout(() => {
                              setUser(p => ({ ...p, name: onboardingName.trim(), hasCompletedOnboarding: true, debugMode: onboardingDebug, userClass: { type: onboardingClass, level: 1, xp: 0 } }));
                          }, 3000);
                       }} 
                       className="w-full bg-white text-black font-black py-4 rounded-xl shrink-0 transition-transform hover:scale-105">
                       Iniciar Jornada
                    </button>
                </div>
            )}
            {onboardingStep === 3 && (
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                    <Loader2 size={64} className="text-emerald-500 animate-spin mb-8" />
                    <h2 className="text-2xl font-black text-white tracking-widest uppercase animate-pulse">A preparar o reino...</h2>
                </div>
            )}
            {/* TOAST ONBOARDING */}
            {toastMsg && <div className={`fixed top-10 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full shadow-2xl z-[150] text-sm font-bold`}>{toastMsg}</div>}
        </div>
    );
  }

  const renderTasks = () => (
    <div className="space-y-6 relative z-10 pb-24">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide items-center">
        <button onClick={() => setActiveFolder('Todas')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1 ${activeFolder === 'Todas' ? theme.btnPrimary : `${theme.panel} border ${theme.border} ${theme.textMuted} hover:${theme.text}`}`}>
          <ListTodo size={14} /> Todas
        </button>
        {folders.map(folder => (
          <div key={folder} className={`flex items-center gap-1 px-4 py-1.5 rounded-full transition-colors whitespace-nowrap border ${activeFolder === folder ? theme.btnPrimary + ` border-transparent` : `${theme.panel} ${theme.border} ${theme.textMuted} hover:${theme.text}`}`}>
             <button onClick={() => setActiveFolder(folder)} className="text-sm font-medium">{folder}</button>
             {folder !== 'Geral' && folder !== 'Todas' && (
                <button onClick={() => handleDeleteFolder(folder)} className="ml-2 hover:text-red-500 opacity-60 hover:opacity-100"><X size={12}/></button>
             )}
          </div>
        ))}
        {isAddingFolder ? (
           <div className={`flex items-center gap-1 ${theme.inner} border ${theme.border} rounded-full px-3 py-1 flex-shrink-0 animate-in fade-in zoom-in duration-200`}>
             <input autoFocus value={newFolderInput} onChange={e => setNewFolderInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddFolder()} onBlur={() => setTimeout(() => setIsAddingFolder(false), 200)} placeholder="Nome..." className={`w-20 bg-transparent text-sm ${theme.text} focus:outline-none`} />
             <button onClick={handleAddFolder} className="text-emerald-500 hover:text-emerald-400"><Plus size={16}/></button>
           </div>
        ) : (
           <button onClick={() => setIsAddingFolder(true)} className={`px-4 py-2 rounded-full text-sm font-medium ${theme.panel} border ${theme.border} ${theme.textMuted} hover:${theme.text} flex items-center gap-1 flex-shrink-0`}>
             <Plus size={14} /> Nova Pasta
           </button>
        )}
      </div>

      <div className={`${theme.panel} border ${isSprintMode ? 'border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : theme.border} rounded-2xl p-4 backdrop-blur-sm shadow-lg transition-all`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text} flex flex-wrap gap-2 items-center justify-between`}>
          Adicionar {isSprintMode ? 'Sprint 🏁' : 'Tarefa'}
          <div className="flex gap-2">
            <button onClick={() => { setIsSprintMode(!isSprintMode); setIsDailyChallenge(false); setIsBonusTask(false); setIsTimeTestMode(false); setNewTaskRecurring([]); }} className={`text-[10px] px-3 py-1 rounded-full border transition-all flex items-center gap-1 ${isSprintMode ? 'sprint-gradient text-white animate-shimmer shadow-[0_0_15px_rgba(20,184,166,0.3)] border-transparent' : `${theme.inner} ${theme.textMuted} ${theme.border} hover:text-emerald-500`}`}>
               <Flag size={12} /> Sprint
            </button>

            {!isSprintMode && !user.dailyChallengeUsed && (
              <button onClick={() => { setIsDailyChallenge(!isDailyChallenge); setIsBonusTask(false); setIsTimeTestMode(false); setNewTaskRecurring([]); }} className={`text-[10px] px-3 py-1 rounded-full border transition-all flex items-center gap-1 ${isDailyChallenge ? 'fuchsia-gradient text-white animate-shimmer shadow-[0_0_15px_rgba(217,70,239,0.5)] border-transparent' : `${theme.inner} ${theme.textMuted} ${theme.border} hover:text-fuchsia-500`}`}>
                <Sparkles size={12} /> Desafio
              </button>
            )}
            {!isSprintMode && user.hasBonusTaskAvailable && (
              <button onClick={() => { setIsBonusTask(!isBonusTask); setIsDailyChallenge(false); setIsTimeTestMode(false); setNewTaskRecurring([]); }} className={`text-[10px] px-3 py-1 rounded-full border transition-all flex items-center gap-1 ${isBonusTask ? 'blue-gradient text-white animate-shimmer shadow-[0_0_15px_rgba(59,130,246,0.5)] border-transparent' : `${theme.inner} text-blue-500 ${theme.border} hover:text-blue-600`}`}>
                <Gift size={12} /> Bônus
              </button>
            )}
            {!isSprintMode && !isDailyChallenge && !isBonusTask && (
              <button onClick={() => { setIsTimeTestMode(!isTimeTestMode); }} className={`text-[10px] px-3 py-1 rounded-full border transition-all flex items-center gap-1 ${isTimeTestMode ? 'bg-amber-500/20 border-amber-500/50 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : `${theme.inner} ${theme.textMuted} ${theme.border} hover:text-amber-500`}`}>
                <Hourglass size={12} /> Tempo
              </button>
            )}
          </div>
        </h3>
        
        {isSprintMode ? (
           <div className="space-y-3 animate-in fade-in">
              <input type="text" placeholder="Dê um nome à sua Sprint..." value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} className={`w-full ${theme.inner} border rounded-xl px-4 py-3 ${theme.text} placeholder-zinc-500 focus:outline-none transition-colors border-emerald-500/50`} />
              <textarea placeholder="Escreva uma sub-tarefa por linha (Máx 20)..." value={sprintTasksText} onChange={(e) => setSprintTasksText(e.target.value)} className={`w-full ${theme.inner} border ${theme.border} rounded-xl px-4 py-3 text-sm ${theme.text} placeholder-zinc-500 focus:outline-none resize-none h-32`}></textarea>
              <div onClick={() => setShowDatePicker(true)} className={`w-full flex items-center ${theme.inner} border rounded-xl px-4 py-3 transition-all cursor-pointer border-emerald-500/50 group`}>
                 <Calendar size={16} className={`${newTaskDeadline ? 'text-emerald-500' : `${theme.textMuted} group-hover:text-emerald-500`} mr-2 flex-shrink-0 transition-colors`} />
                 <span className={`text-sm ${newTaskDeadline ? theme.text + ' font-medium' : theme.textMuted}`}>{newTaskDeadline ? `Prazo Final: ${formatDate(newTaskDeadline)}` : 'Definir Prazo da Sprint (Obrigatório)'}</span>
              </div>
              <button onClick={addTask} className={`w-full py-4 rounded-xl font-black transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-[1.02]`}>
                <Flag size={18} /> Iniciar Sprint
              </button>
           </div>
        ) : (
           <div className="space-y-3 animate-in fade-in">
             <input type="text" placeholder={(isDailyChallenge || isBonusTask || isTimeTestMode) ? "Qual é o grande objetivo?" : "O que precisa ser feito?"} value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} className={`w-full ${theme.inner} border rounded-xl px-4 py-3 ${theme.text} placeholder-zinc-500 focus:outline-none transition-colors ${isDailyChallenge ? 'border-fuchsia-500/50' : isBonusTask ? 'border-blue-500/50' : isTimeTestMode ? 'border-amber-500/50' : theme.border}`} />
             <textarea placeholder="Descrição detalhada (opcional)..." value={newTaskDesc} maxLength={800} onChange={(e) => setNewTaskDesc(e.target.value)} className={`w-full ${theme.inner} border ${theme.border} rounded-xl px-4 py-3 text-sm ${theme.text} placeholder-zinc-500 focus:outline-none resize-none h-20`}></textarea>
             
             {isTimeTestMode && (
                <div className={`flex items-center gap-3 ${theme.inner} border border-amber-500/50 rounded-xl px-4 py-3 shadow-[inset_0_0_10px_rgba(245,158,11,0.1)]`}>
                   <Hourglass size={16} className="text-amber-500" />
                   <span className={`text-sm ${theme.textMuted}`}>Duração do Foco (minutos):</span>
                   <input type="number" min="1" max="180" value={timeTestDuration} onChange={e => setTimeTestDuration(Math.max(1, parseInt(e.target.value) || 1))} className={`w-20 bg-transparent text-amber-500 font-bold text-center focus:outline-none border-b border-amber-500/50 ml-auto`} />
                </div>
             )}

             {!(isDailyChallenge || isBonusTask || isTimeTestMode) && (
               <div className="flex gap-2 mb-2">
                 {[ { id: 'P1', xp: 50, coins: 60, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30', active: 'bg-red-500/20 border-red-500 shadow-[inset_0_0_10px_rgba(239,68,68,0.2)]', disabled: p1LimitReached },
                   { id: 'P2', xp: 40, coins: 50, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30', active: 'bg-orange-500/20 border-orange-500', disabled: p2LimitReached },
                   { id: 'P3', xp: 30, coins: 40, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', active: 'bg-yellow-500/20 border-yellow-500', disabled: false },
                   { id: 'P4', xp: 20, coins: 30, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/30', active: 'bg-blue-500/20 border-blue-500', disabled: false }
                 ].map(p => (
                   <button key={p.id} disabled={p.disabled} onClick={() => setNewTaskPriority(p.id)} className={`flex-1 flex flex-col items-center py-2 rounded-lg border transition-all ${p.disabled && newTaskPriority !== p.id ? 'opacity-20 grayscale cursor-not-allowed' : newTaskPriority === p.id ? p.active : `${p.bg} ${p.border} opacity-70 hover:opacity-100`}`}>
                     <span className={`text-sm font-bold ${p.color}`}>{p.id}</span>
                     <div className="flex items-center gap-1 mt-0.5"><span className={`text-[9px] ${theme.textMuted}`}>{p.xp} XP</span>{(!p.disabled || newTaskPriority === p.id) && <Coins size={8} className="text-yellow-500"/>}</div>
                   </button>
                 ))}
               </div>
             )}

             <div className="flex flex-col sm:flex-row gap-2">
               <div onClick={() => setShowDatePicker(true)} className={`flex-1 flex items-center ${theme.inner} border rounded-xl px-4 py-3 transition-all cursor-pointer ${isDailyChallenge ? 'border-fuchsia-500/50 shadow-[inset_0_0_10px_rgba(217,70,239,0.1)]' : isBonusTask ? 'border-blue-500/50 shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]' : isTimeTestMode ? 'border-amber-500/50' : `${theme.border} hover:border-emerald-500/50`} group`}>
                 <Calendar size={16} className={`${newTaskDeadline ? 'text-emerald-500' : `${theme.textMuted} group-hover:text-emerald-500`} mr-2 flex-shrink-0 transition-colors`} />
                 <span className={`text-sm ${newTaskDeadline ? theme.text + ' font-medium' : theme.textMuted}`}>{newTaskDeadline ? formatDate(newTaskDeadline) : 'Sem Data'}</span>
               </div>
               
               <div onClick={() => setShowTimePicker(true)} className={`flex-1 flex items-center ${theme.inner} border rounded-xl px-4 py-3 transition-all cursor-pointer ${isDailyChallenge ? 'border-fuchsia-500/50 shadow-[inset_0_0_10px_rgba(217,70,239,0.1)]' : isBonusTask ? 'border-blue-500/50 shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]' : isTimeTestMode ? 'border-amber-500/50' : `${theme.border} hover:border-amber-500/50`} group`}>
                 <Clock size={16} className={`${newTaskTime ? 'text-amber-500' : `${theme.textMuted} group-hover:text-amber-500`} mr-2 flex-shrink-0 transition-colors`} />
                 <span className={`text-sm ${newTaskTime ? theme.text + ' font-medium' : theme.textMuted}`}>{newTaskTime ? newTaskTime : 'Sem Hora'}</span>
               </div>
             </div>

             {!(isDailyChallenge || isBonusTask) && (
                <div className={`flex flex-col sm:flex-row items-center gap-3 ${theme.inner} p-3 rounded-xl border ${theme.border} mt-1`}>
                  <span className={`text-xs ${theme.textMuted} font-medium flex items-center gap-1`}><RefreshCw size={12}/> Recorrente:</span>
                  <div className="flex gap-1 flex-1 w-full justify-between sm:justify-start">
                    {WEEK_DAYS.map(d => (
                      <button key={d.v} onClick={() => { setNewTaskRecurring(prev => prev.includes(d.v) ? prev.filter(x => x !== d.v) : [...prev, d.v]) }} className={`w-8 h-8 rounded-full text-xs font-bold transition-colors ${newTaskRecurring.includes(d.v) ? 'bg-emerald-500 text-white shadow-[0_0_8px_rgba(16,185,129,0.4)] border-transparent' : `${theme.panel} ${theme.textMuted} border ${theme.border}`}`}>
                         {d.l}
                      </button>
                    ))}
                  </div>
                </div>
             )}

             <div className="pt-2">
               <button onClick={addTask} className={`w-full py-4 rounded-xl font-black transition-all flex items-center justify-center gap-2 ${isDailyChallenge ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 shadow-[0_0_15px_rgba(217,70,239,0.4)] text-white hover:scale-[1.02]' : isBonusTask ? 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-[0_0_15px_rgba(59,130,246,0.4)] text-white hover:scale-[1.02]' : isTimeTestMode ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]' : theme.btnPrimary}`}>
                 {isTimeTestMode ? <Hourglass size={18}/> : <Plus size={18} />} Criar Tarefa
               </button>
             </div>
           </div>
        )}
      </div>

      <div className="space-y-3">
        {/* Renderização de Sprints */}
        {sprints.map(sprint => {
           if (activeFolder !== 'Todas' && activeFolder !== 'Geral') return null;
           const doneCount = sprint.tasks.filter(t => t.completed).length;
           const totalCount = sprint.tasks.length;
           const pct = (doneCount / totalCount) * 100;
           
           const yyyy = currentDate.getFullYear(); const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); const dd = String(currentDate.getDate()).padStart(2, '0');
           const nowStr = `${yyyy}-${mm}-${dd}`;
           const daysLeft = Math.ceil((new Date(sprint.deadline) - new Date(nowStr)) / (1000 * 60 * 60 * 24));
           const isClose = daysLeft <= 2 && daysLeft >= 0 && !sprint.completed;
           const isCollapsed = collapsedSprints.includes(sprint.id);

           return (
              <div key={sprint.id} className={`${theme.panel} border ${isClose ? 'border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : sprint.completed ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'border-teal-500/50'} rounded-2xl p-5 mb-4 transition-all`}>
                 <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                       <div className="flex items-center gap-2 mb-1">
                          <Flag size={18} className={sprint.completed ? 'text-emerald-500' : 'text-teal-500'} />
                          <h4 className={`text-lg font-bold ${sprint.completed ? 'text-emerald-500' : theme.text}`}>{sprint.title}</h4>
                          <button onClick={() => setCollapsedSprints(p => p.includes(sprint.id) ? p.filter(x=>x!==sprint.id) : [...p, sprint.id])} className={`ml-auto p-1 rounded-full ${theme.inner} ${theme.textMuted} hover:${theme.text} transition-colors`}>
                             {isCollapsed ? <ChevronDown size={16}/> : <ChevronUp size={16}/>}
                          </button>
                       </div>
                       <div className="flex gap-2 items-center">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30`}>{sprint.distance}</span>
                          {!sprint.completed && (
                             <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${isClose ? 'bg-orange-500/10 text-orange-500 border border-orange-500/50 animate-pulse' : `${theme.inner} ${theme.textMuted} border ${theme.border}`}`}>
                               {daysLeft < 0 ? 'Atrasada!' : `${daysLeft} dias restantes`}
                             </span>
                          )}
                          <span className={`text-[10px] ${theme.textMuted}`}>{doneCount}/{totalCount} Concluídas</span>
                       </div>
                    </div>
                    {sprint.completed && !isCollapsed && <Award size={32} className="text-emerald-500 drop-shadow-md ml-4" />}
                 </div>

                 <div className={`w-full ${theme.inner} h-2 rounded-full overflow-hidden border ${theme.border} mb-4 relative`}>
                    <div className="absolute right-0 top-0 bottom-0 w-4 bg-checkered z-10 opacity-50"></div>
                    <div className={`h-full transition-all duration-1000 ${sprint.completed ? 'bg-emerald-500' : 'bg-teal-500'}`} style={{ width: `${pct}%` }} />
                 </div>

                 {!isCollapsed && (
                    <div className="space-y-2 pl-2 border-l-2 border-zinc-200 dark:border-zinc-800 ml-2 animate-in fade-in duration-300">
                       {sprint.tasks.map(t => (
                          <div key={t.id} className="flex items-start gap-2">
                             <button onClick={() => toggleSprintTask(sprint.id, t.id)} disabled={sprint.completed} className={`mt-0.5 ${t.completed ? 'text-emerald-500' : theme.textMuted} flex-shrink-0 transition-colors`}>
                                {t.completed ? <CheckCircle size={14} /> : <Circle size={14} />}
                             </button>
                             <span className={`text-sm ${t.completed ? `line-through ${theme.textMuted}` : theme.text}`}>{t.text}</span>
                          </div>
                       ))}
                    </div>
                 )}
              </div>
           );
        })}

        {/* Renderização de Tarefas Normais */}
        {tasks.filter(t => activeFolder === 'Todas' || t.folder === activeFolder).length === 0 && sprints.filter(s => activeFolder === 'Todas' || activeFolder === 'Geral').length === 0 ? (
          <div className={`text-center py-10 ${theme.textMuted}`}>
            <CustomCheckSquare size={48} className="mx-auto mb-3 opacity-20" />
            <p>Nenhuma tarefa {activeFolder === 'Todas' ? 'registada' : 'nesta pasta'}.</p>
          </div>
        ) : (
          tasks.filter(t => activeFolder === 'Todas' || t.folder === activeFolder).map(task => {
            let pStyles = { text: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/30', cardBg: theme.panel, xp: 20, coins: 30 };
            
            if (task.isSurprise) { pStyles = { text: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/30', cardBg: 'surprise-gradient shadow-md', xp: 100, coins: 100, label: 'SURPRESA' }; }
            else if (task.isDailyChallenge) { pStyles = { text: isDarkMode ? 'text-white' : 'text-fuchsia-900', bg: isDarkMode ? 'bg-black/30' : 'bg-white/50', border: 'border-transparent', cardBg: 'fuchsia-gradient animate-shimmer shadow-[0_0_15px_rgba(217,70,239,0.15)]', xp: 150, coins: 80, label: 'DESAFIO' }; }
            else if (task.isBonusTask) { pStyles = { text: isDarkMode ? 'text-white' : 'text-blue-900', bg: isDarkMode ? 'bg-black/30' : 'bg-white/50', border: 'border-transparent', cardBg: 'blue-gradient animate-shimmer shadow-[0_0_15px_rgba(59,130,246,0.15)]', xp: 150, coins: 80, label: 'BÔNUS' }; }
            else if (task.isTimeTest) { pStyles = { text: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/50', cardBg: `${theme.panel} border-amber-500/50 shadow-[inset_0_0_15px_rgba(245,158,11,0.05)]`, xp: 80, coins: 80, label: 'TESTE DE TEMPO' }; }
            else if (task.priority === 'P1') pStyles = { text: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30', cardBg: theme.panel, xp: 50, coins: 60, label: 'P1' };
            else if (task.priority === 'P2') pStyles = { text: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30', cardBg: theme.panel, xp: 40, coins: 50, label: 'P2' };
            else if (task.priority === 'P3') pStyles = { text: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', cardBg: theme.panel, xp: 30, coins: 40, label: 'P3' };
            else pStyles.label = 'P4';

            const hasBoost = task.boost > 1;
            const lossPercent = Math.min(80, (task.ageInDays || 0) * 10);
            const isDepreciating = !task.deadline && (!task.recurring || task.recurring.length === 0) && lossPercent > 0 && !task.isSurprise && !task.isTimeTest;
            const cardAnimationClass = task.glowAnimation ? (task.glowAnimation === 'pet-glow' ? 'animate-pet-glow' : 'animate-card-glow') : '';

            return (
              <div key={task.id} className={`flex items-start gap-3 p-4 rounded-xl border transition-all relative ${cardAnimationClass} ${task.completed && !task.glowAnimation ? theme.cardDone : `${task.isUrgent ? 'animate-urgency' : ''} ${pStyles.cardBg} ${pStyles.border}`}`}>
                {task.rewardToast && (
                  <div className={`absolute top-0 right-4 animate-reward-toast ${task.isPetBuff ? 'text-yellow-500' : task.isCrit ? 'text-fuchsia-500' : 'text-emerald-500'} font-bold drop-shadow-md z-20 flex items-center gap-1 ${theme.panel} px-3 py-1.5 rounded-full border ${task.isPetBuff ? 'border-yellow-500/30' : 'border-emerald-500/30'}`}>
                     {!task.isPetBuff && <Sparkles size={14} />} {task.rewardToast}
                  </div>
                )}

                {task.isUrgent && !task.completed && (
                   <div className="absolute -top-3 left-4 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)] flex items-center gap-1 animate-pulse">
                      <Zap size={10}/> URGÊNCIA! {formatTimeLeft(task.urgencyDeadline)}
                   </div>
                )}

                <button onClick={() => toggleTask(task.id)} className={`mt-1 ${task.completed ? 'text-emerald-500' : (task.isDailyChallenge || task.isBonusTask) ? (isDarkMode ? 'text-white/70' : 'text-black/50') : task.isSurprise ? 'text-purple-500' : theme.textMuted} flex-shrink-0 transition-colors relative z-10`}>
                  {task.completed ? <CheckCircle className={task.isSurprise ? "text-purple-500" : "text-emerald-500"} /> : <Circle />}
                </button>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2 flex-wrap">
                    {(task.isDailyChallenge || task.isBonusTask) && !task.completed && <Sparkles size={14} className={`${isDarkMode ? 'text-white' : 'text-black/50'} animate-pulse flex-shrink-0`} />}
                    <p className={`text-sm ${task.completed ? `line-through ${theme.textMuted}` : theme.text} ${(task.isDailyChallenge || task.isBonusTask) ? 'font-bold' : ''}`}>{task.title}</p>
                    
                    {task.isTimeTest && !task.completed && (
                        <div className="flex items-center gap-1 ml-1 relative z-10">
                            {!task.timeTestActive ? (
                                <button onClick={(e) => { e.stopPropagation(); startTimeTest(task.id); }} className="bg-amber-500/20 hover:bg-amber-500/40 text-amber-500 p-1 rounded transition-colors" title="Iniciar Timer">
                                    <Play size={12} fill="currentColor"/>
                                </button>
                            ) : (
                                <button onClick={(e) => { e.stopPropagation(); setFocusTask(task); }} className="bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-500 p-1 rounded transition-colors" title="Ver Foco">
                                    <Maximize size={12} />
                                </button>
                            )}
                        </div>
                    )}

                    {task.isTimeTest && task.timeTestActive && !task.completed && (
                        <span className="text-[10px] font-mono font-bold text-amber-500 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded ml-1 animate-pulse">
                            EM ANDAMENTO
                        </span>
                    )}

                    {task.isSurprise && !task.completed && <span className="text-[9px] bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/50 px-1.5 py-0.5 rounded flex items-center gap-1 animate-pulse"><Gift size={8}/> Limitada</span>}
                    {isDepreciating && !task.completed && <span className={`text-[9px] bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded border border-red-500/30 ml-2 animate-pulse`}>Valor: {100 - lossPercent}%</span>}
                    {activeFolder === 'Todas' && <span className={`text-[9px] ${theme.inner} ${theme.textMuted} border ${theme.border} px-1.5 py-0.5 rounded flex items-center gap-1`}><Folder size={8}/> {task.folder}</span>}
                  </div>
                  
                  {task.description && (
                     <p className={`text-xs ${theme.textMuted} mt-1.5 line-clamp-3 leading-relaxed`}>{task.description}</p>
                  )}

                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${pStyles.bg} ${pStyles.text}`}>{pStyles.label}</span>
                    
                    {task.isTimeTest && !task.completed && (
                        <span className={`text-[10px] text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30 flex items-center gap-1`}>
                            <Hourglass size={10} /> {task.durationMinutes} mins
                        </span>
                    )}

                    {task.deadline && <span className={`text-[10px] ${theme.textMuted} ${theme.inner} border ${theme.border} px-1.5 py-0.5 rounded flex items-center gap-1`}><Calendar size={10} /> {formatDate(task.deadline)}</span>}
                    {task.deadlineTime && <span className={`text-[10px] ${task.isLate ? 'text-red-500 bg-red-500/10 border-red-500/30' : `${theme.textMuted} ${theme.inner} border ${theme.border}`} px-1.5 py-0.5 rounded flex items-center gap-1`}><Clock size={10} /> {task.deadlineTime}</span>}
                    {task.recurring && task.recurring.length > 0 && <span className="text-[10px] text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1"><RefreshCw size={10} /> Recorrente</span>}

                    <div className={`flex items-center gap-2 text-[10px] font-medium ${isDarkMode ? 'bg-black/20 text-zinc-300' : 'bg-white/50 text-zinc-700'} px-2 py-0.5 rounded ml-auto sm:ml-0`}>
                      <span>+{Math.floor(pStyles.xp * task.boost * (isDepreciating ? (100 - lossPercent)/100 : 1))} XP</span>
                      <span className={`flex items-center ${task.isSurprise ? 'text-purple-600 dark:text-purple-400' : 'text-yellow-600'}`}>+{Math.floor(pStyles.coins * task.boost * (isDepreciating ? (100 - lossPercent)/100 : 1))} <Coins size={10} className="ml-0.5" /></span>
                    </div>
                    {hasBoost && !task.completed && <span className="text-[10px] font-black bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-2 py-0.5 rounded animate-float shadow-sm">{task.boost}x BOOST</span>}
                  </div>
                </div>
                <button onClick={() => handleDeleteClick(task.id, 'task')} className={`p-2 rounded-lg ${(task.isDailyChallenge || task.isBonusTask) ? (isDarkMode ? 'text-white/50' : 'text-black/50') : theme.textMuted} hover:text-red-500 relative z-10`}><X size={16} /></button>
              </div>
            );
          })
        )}
        {(tasks.some(t => t.completed && (activeFolder === 'Todas' || t.folder === activeFolder)) || sprints.some(s => s.completed)) && (
          <div className="flex justify-center pt-2">
            <button onClick={clearCompletedTasks} className={`text-xs ${theme.textMuted} hover:text-red-500 transition-colors flex items-center gap-1 ${theme.inner} border ${theme.border} px-4 py-2 rounded-full`}><Trash2 size={12} /> Limpar Itens Concluídos</button>
          </div>
        )}
      </div>
    </div>
  );

  const renderHabits = () => (
    <div className="space-y-6 relative z-10 pb-24">
      {habits.length < 5 && (
        <div className={`${theme.panel} border ${theme.border} rounded-2xl p-4 backdrop-blur-sm`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-semibold ${theme.text}`}>Novo Hábito</h3>
            <span className={`text-xs ${theme.textMuted}`}>{habits.length}/5 Máximo</span>
          </div>
          <div className="space-y-3">
            <input type="text" placeholder="Qual é o hábito? (Ex: Beber Água)" value={newHabitText} onChange={(e) => setNewHabitText(e.target.value)} className={`w-full ${theme.inner} border ${theme.border} rounded-xl px-4 py-3 ${theme.text} placeholder-zinc-500 focus:outline-none`} />
            <textarea placeholder="Descrição (opcional)..." value={newHabitDesc} maxLength={800} onChange={(e) => setNewHabitDesc(e.target.value)} className={`w-full ${theme.inner} border ${theme.border} rounded-xl px-4 py-3 text-sm ${theme.text} placeholder-zinc-500 focus:outline-none resize-none h-16`}></textarea>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className={`flex flex-1 ${theme.inner} border ${theme.border} rounded-xl p-1`}>
                 <button onClick={() => setNewHabitType('single')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${newHabitType === 'single' ? theme.btnPrimary : theme.textMuted}`}>Check Único</button>
                 <button onClick={() => setNewHabitType('count')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${newHabitType === 'count' ? theme.btnPrimary : theme.textMuted}`}>Contagem Diária</button>
              </div>
              {newHabitType === 'count' && <input type="number" min="2" max="100" value={newHabitTarget} onChange={(e) => setNewHabitTarget(parseInt(e.target.value))} className={`w-full sm:w-20 ${theme.inner} border ${theme.border} rounded-xl px-4 py-3 ${theme.text} text-center focus:outline-none`} />}
              <button onClick={addHabit} className={`w-full sm:w-auto px-6 py-3 sm:py-0 rounded-xl font-bold transition-colors ${theme.btnPrimary}`}>Criar</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {habits.length === 0 ? (
          <div className={`text-center py-10 ${theme.textMuted}`}>
            <Target size={48} className="mx-auto mb-3 opacity-20" />
            <p>Nenhum hábito rastreado. Comece pequeno!</p>
          </div>
        ) : (
          habits.map(habit => {
            let streakStyle = { bg: theme.panel, border: theme.border, text: theme.textMuted, flame: theme.textMuted, isShimmer: false };
            
            if (habit.frozen) {
              streakStyle = { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', flame: 'text-cyan-500', isShimmer: false };
            } else if (habit.streak >= 20) {
              streakStyle = { bg: 'gold-gradient', border: 'border-transparent', text: 'text-yellow-900', flame: 'text-yellow-900', isShimmer: true };
            } else if (habit.streak >= 10) {
              streakStyle = { bg: 'silver-gradient', border: 'border-transparent', text: 'text-slate-900', flame: 'text-slate-900', isShimmer: true };
            } else if (habit.streak >= 5) {
              streakStyle = { bg: 'bronze-gradient', border: 'border-transparent', text: 'text-orange-900', flame: 'text-orange-900', isShimmer: true };
            }

            const titleColor = habit.completed ? `line-through ${theme.textMuted}` : habit.frozen ? 'text-cyan-600 dark:text-cyan-400' : (streakStyle.isShimmer ? 'text-black font-bold' : theme.text);

            return (
              <div key={habit.id} className={`${streakStyle.bg} ${streakStyle.isShimmer ? 'animate-shimmer shadow-lg' : ''} border ${streakStyle.border} p-4 rounded-xl flex items-center gap-4 transition-all duration-500 relative overflow-hidden`}>
                {habit.frozen && <Snowflake size={40} className="absolute -right-2 -bottom-2 text-cyan-500/20" />}
                <div className="flex-1 relative z-10 overflow-hidden">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className={`font-medium ${titleColor}`}>{habit.title} {habit.frozen && '(Congelado)'}</h4>
                    <button onClick={() => handleDeleteClick(habit.id, 'habit')} className={`${streakStyle.isShimmer ? 'text-black/50 hover:text-black' : `${theme.textMuted} hover:text-red-500`}`}><X size={16} /></button>
                  </div>
                  {habit.description && <p className={`text-xs ${habit.completed ? theme.textMuted : 'text-zinc-500'} mb-2 line-clamp-2 leading-relaxed`}>{habit.description}</p>}
                  
                  <div className="flex items-center gap-3">
                    {habit.type === 'count' ? (
                      <div className="flex-1 flex items-center gap-2">
                        <div className={`flex-1 ${streakStyle.isShimmer ? 'bg-black/20' : theme.inner} h-3 rounded-full overflow-hidden border ${streakStyle.isShimmer ? 'border-black/10' : theme.border}`}>
                          <div className={`${habit.frozen ? 'bg-cyan-500' : 'bg-emerald-500'} h-full transition-all duration-500`} style={{ width: `${(habit.current / habit.target) * 100}%` }} />
                        </div>
                        <span className={`text-xs font-mono w-10 text-right ${streakStyle.isShimmer ? 'text-black/70' : theme.textMuted}`}>{habit.current}/{habit.target}</span>
                      </div>
                    ) : <span className="flex-1"></span>}
                    
                    {habit.streak > 0 && (
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${streakStyle.isShimmer ? 'bg-black/10' : `${theme.inner} border ${theme.border}`}`}>
                        {habit.frozen ? <Snowflake size={14} className={streakStyle.flame} /> : <Flame size={14} className={streakStyle.flame} />}
                        <span className={`text-[10px] font-bold font-mono ${streakStyle.text}`}>{habit.streak}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button onClick={() => incrementHabit(habit.id)} disabled={habit.completed || habit.frozen}
                  className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all flex-shrink-0 relative z-10 ${
                    habit.completed ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-600 dark:text-emerald-400' : 
                    habit.frozen ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-600 dark:text-cyan-400' :
                    streakStyle.isShimmer ? 'bg-black/10 border-black/20 text-black hover:bg-black/20' : `${theme.inner} ${theme.border} ${theme.textMuted} hover:border-emerald-500`
                  }`}
                >
                  {habit.completed ? <CheckCircle size={24} /> : habit.frozen ? <Snowflake size={24} /> : <Plus size={24} />}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  const renderStore = () => (
    <div className="space-y-6 relative z-10 pb-24">
      {/* HEADER LOJA */}
      <div className="grid grid-cols-2 gap-4 mb-8">
          <div className={`bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-yellow-500/30 p-4 rounded-2xl flex flex-col justify-center shadow-inner`}>
             <p className="text-yellow-600 dark:text-yellow-500 text-[10px] font-bold uppercase tracking-wider mb-1">Seu Saldo</p>
             <h2 className={`text-3xl font-black ${theme.text} flex items-center gap-2`}>
               <span className={`${coinAnim === 'up' ? 'animate-coin-up' : coinAnim === 'down' ? 'animate-coin-down' : ''} inline-block`}>{user.coins}</span>
               <Coins size={24} className="text-yellow-500" />
             </h2>
          </div>
          <div className={`bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 p-4 rounded-2xl flex flex-col justify-center shadow-inner`}>
             <p className="text-emerald-600 dark:text-emerald-500 text-[10px] font-bold uppercase tracking-wider mb-1">Vouchers</p>
             <h2 className={`text-3xl font-black ${theme.text} flex items-center gap-2`}>
               {user.vouchers} <Ticket size={24} className="text-emerald-500" />
             </h2>
          </div>
      </div>

      {/* MERCADO NEGRO (VOUCHERS) */}
      <div className="mb-8">
         <h2 className={`text-sm font-black ${theme.textMuted} uppercase tracking-widest mb-4 flex items-center gap-2`}><Ticket size={16}/> Mercado de Vouchers</h2>
         <div className="grid gap-4">
            <div className={`${theme.panel} border border-emerald-500/30 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden group`}>
              <div className={`w-16 h-16 rounded-xl ${theme.inner} flex items-center justify-center flex-shrink-0 border border-emerald-500/30`}>
                <Flame size={32} className="text-emerald-500" />
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold ${theme.text} mb-1`}>Buffador de Pet</h3>
                <p className={`text-xs ${theme.textMuted} leading-relaxed`}>Uma guloseima mágica. Aumenta os benefícios base do seu pet atual em +5% permanentemente.</p>
              </div>
              <button onClick={() => buyVoucherItem('petBuff')} className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                10 <Ticket size={16} />
              </button>
            </div>

            <div className={`${theme.panel} border border-fuchsia-500/30 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden group`}>
              <div className={`w-16 h-16 rounded-xl ${theme.inner} flex items-center justify-center flex-shrink-0 border border-fuchsia-500/30`}>
                <PackageOpen size={32} className="text-fuchsia-500" />
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold ${theme.text} mb-1`}>Lootbox Instantânea</h3>
                <p className={`text-xs ${theme.textMuted} leading-relaxed`}>Não quer esperar para completar as 15 tarefas? Compre uma Lootbox e tente a sorte agora mesmo.</p>
              </div>
              <button onClick={() => buyVoucherItem('lootbox')} className="w-full sm:w-auto bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                5 <Ticket size={16} />
              </button>
            </div>

            <div className={`${theme.panel} border border-yellow-500/30 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden group`}>
              <div className={`w-16 h-16 rounded-xl ${theme.inner} flex items-center justify-center flex-shrink-0 border border-yellow-500/30`}>
                <Zap size={32} className="text-yellow-500" />
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold ${theme.text} mb-1`}>Último Gás</h3>
                <p className={`text-xs ${theme.textMuted} leading-relaxed`}>Ativa um multiplicador x2 em TODAS as tarefas concluídas no dia de hoje.</p>
              </div>
              <button onClick={() => buyVoucherItem('lastGasp')} disabled={user.activeBuffs.lastGasp} className={`w-full sm:w-auto font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all ${user.activeBuffs.lastGasp ? `${theme.inner} ${theme.textMuted}` : 'bg-yellow-500 hover:bg-yellow-400 text-white shadow-[0_0_15px_rgba(234,179,8,0.3)]'}`}>
                {user.activeBuffs.lastGasp ? 'Ativo' : <><Ticket size={16} /> 7</>}
              </button>
            </div>

            <div className={`${theme.panel} border border-pink-500/50 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden group shadow-[0_0_20px_rgba(236,72,153,0.1)]`}>
              <div className="absolute inset-0 bg-pink-500/5 animate-pulse"></div>
              <div className={`w-16 h-16 rounded-xl ${theme.inner} flex items-center justify-center flex-shrink-0 border border-pink-500/50 z-10`}>
                <Dices size={32} className="text-pink-500" />
              </div>
              <div className="flex-1 z-10">
                <h3 className={`text-lg font-bold ${theme.text} mb-1`}>Giro da Sorte</h3>
                <p className={`text-xs ${theme.textMuted} leading-relaxed`}>Arrisque seus suados vouchers em uma roleta de cassino. Prémio máximo: Diamante (3000 Moedas).</p>
                <div className="flex items-center gap-2 mt-2">
                   <span className="text-[10px] uppercase font-bold text-pink-500">Aposta:</span>
                   {[1,2,3,4,5].map(v => (
                      <button key={v} onClick={() => setSlotBet(v)} className={`w-6 h-6 rounded text-xs font-bold transition-all ${slotBet === v ? 'bg-pink-500 text-white scale-110' : `${theme.inner} ${theme.textMuted} hover:text-white`}`}>{v}</button>
                   ))}
                </div>
              </div>
              <button onClick={startSlotMachine} className="w-full sm:w-auto z-10 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                 Girar ({slotBet} <Ticket size={14}/>)
              </button>
            </div>
         </div>
      </div>

     {user.pet && user.pet.type !== 'egg' && !user.pet.isDead && (
        <div className="mb-8">
           <h2 className={`text-sm font-black ${theme.textMuted} uppercase tracking-widest mb-4 flex items-center gap-2`}><PawPrint size={16}/> Pet Shop</h2>
           <div className="grid grid-cols-3 gap-3">
              {/* Ração */}
              <div className={`${theme.panel} border ${theme.border} p-3 rounded-2xl flex flex-col items-center text-center gap-2 shadow-sm`}>
                 <div className="w-10 h-10 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center"><Utensils size={18}/></div>
                 <span className={`text-xs font-bold ${theme.text}`}>Ração</span>
                 <button onClick={() => buyPetItem('food')} className="w-full bg-amber-500 hover:bg-amber-400 text-white text-[10px] font-bold py-2 rounded-lg flex items-center justify-center gap-1 transition-transform hover:scale-105">
                    10 <Coins size={10}/>
                 </button>
              </div>
              
              {/* Sabão */}
              <div className={`${theme.panel} border ${theme.border} p-3 rounded-2xl flex flex-col items-center text-center gap-2 shadow-sm`}>
                 <div className="w-10 h-10 bg-cyan-500/20 text-cyan-500 rounded-full flex items-center justify-center"><Bath size={18}/></div>
                 <span className={`text-xs font-bold ${theme.text}`}>Sabão</span>
                 <button onClick={() => buyPetItem('soap')} className="w-full bg-cyan-500 hover:bg-cyan-400 text-white text-[10px] font-bold py-2 rounded-lg flex items-center justify-center gap-1 transition-transform hover:scale-105">
                    10 <Coins size={10}/>
                 </button>
              </div>
              
              {/* Brinquedos */}
              <div className={`${theme.panel} border ${theme.border} p-3 rounded-2xl flex flex-col items-center text-center gap-2 shadow-sm`}>
                 <div className="w-10 h-10 bg-pink-500/20 text-pink-500 rounded-full flex items-center justify-center"><Gamepad2 size={18}/></div>
                 <span className={`text-xs font-bold ${theme.text}`}>Brinquedo</span>
                 <button onClick={() => buyPetItem('toys')} className="w-full bg-pink-500 hover:bg-pink-400 text-white text-[10px] font-bold py-2 rounded-lg flex items-center justify-center gap-1 transition-transform hover:scale-105">
                    10 <Coins size={10}/>
                 </button>
              </div>
           </div>
        </div>
      )}

      <h2 className={`text-sm font-black ${theme.textMuted} uppercase tracking-widest mb-4 flex items-center gap-2`}><Coins size={16}/> Loja Clássica</h2>

      <div className="grid gap-4">
        {/* STORE ITEMS LOOP */}
        {STORE_CLASSIC_ITEMS.map(i => {
           const Icon = i.icon;
           let disabled = false; let action = null;
           if (i.id === 'freeze') action = () => setFreezeModalOpen(true);
           if (i.id === 'bonusTask') { action = handleBuyBonusTask; disabled = user.hasBonusTaskAvailable; }
           if (i.id === 'magicDice') action = handleBuyMagicDice;
           if (i.id === 'petEgg') action = handleBuyPetEgg;
           if (i.id === 'lifeHammer') action = handleBuyLifeHammer;
           if (i.id === 'realizador') { action = () => handleBuyBuff('realizador'); disabled = user.activeBuffs.realizador; }
           if (i.id === 'resguardo') { action = () => handleBuyBuff('resguardo'); disabled = user.activeBuffs.resguardo; }
           if (i.id === 'cronosMoeda') action = () => openCronosModal('moeda');
           if (i.id === 'cronosMedalha') action = () => openCronosModal('medalha');

           return (
             <div key={i.id} className={`${theme.panel} border ${theme.border} p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden group`}>
               <div className={`w-16 h-16 rounded-xl ${theme.inner} flex items-center justify-center flex-shrink-0 border ${i.theme.border}`}><Icon size={32} className={`${i.theme.text}`} /></div>
               <div className="flex-1"><h3 className={`text-lg font-bold ${theme.text} mb-1`}>{i.title}</h3><p className={`text-xs ${theme.textMuted} leading-relaxed`}>{i.desc}</p></div>
               <button onClick={action} disabled={disabled} className={`w-full sm:w-auto font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all ${disabled ? `${theme.inner} ${theme.textMuted}` : `${i.theme.bg} ${i.theme.hover} text-white`}`}>
                 {disabled ? 'Ativo/Comprado' : <>{i.price} <Coins size={16} /></>}
               </button>
             </div>
           );
        })}
      </div>
    </div>
  );

  const renderRanking = () => (
    <div className="space-y-4 relative z-10 pb-24">
      {/* Toggles Ranking / Feed */}
      <div className="flex gap-2 mb-6">
         <button onClick={() => setRankingView('ranking')} className={`flex-1 py-3 rounded-xl font-bold transition-colors flex justify-center items-center gap-2 ${rankingView === 'ranking' ? theme.btnPrimary : `${theme.panel} border ${theme.border} ${theme.textMuted}`}`}>
            <Trophy size={18}/> Tabela Global
         </button>
         <button onClick={() => setRankingView('feed')} className={`flex-1 py-3 rounded-xl font-bold transition-colors flex justify-center items-center gap-2 ${rankingView === 'feed' ? theme.btnPrimary : `${theme.panel} border ${theme.border} ${theme.textMuted}`}`}>
            <Globe size={18}/> Feed do Mundo
         </button>
      </div>

      {rankingView === 'ranking' ? (
        <>
          <div className={`${theme.panel} border ${theme.border} p-6 rounded-2xl flex flex-col items-center justify-center mb-6 shadow-xl relative overflow-hidden`}>
            <div className="absolute top-0 right-0 p-4 opacity-5"><Trophy size={100} /></div>
            <span className={`text-zinc-500 text-sm font-medium uppercase tracking-widest mb-2`}>Sua Posição</span>
            <div className="flex items-baseline gap-2">
              <span className={`text-5xl font-black ${theme.text}`}>#{userRankPosition}</span>
              <span className={`text-zinc-400 text-sm`}>de 100</span>
            </div>
          </div>

          {user.activeDuel && user.activeDuel.accepted && (
             <div className="bg-gradient-to-r from-blue-900 to-red-900 border border-red-500/50 p-4 rounded-2xl flex flex-col items-center justify-center mb-6 shadow-[0_0_20px_rgba(239,68,68,0.2)] animate-pulse">
                <span className="text-white text-xs font-bold uppercase tracking-widest mb-2">⚔️ Duelo em Andamento ⚔️</span>
                <h3 className="text-xl font-black text-white">Você <span className="text-red-400 mx-2">VS</span> {user.activeDuel.botName} {user.activeDuel.botEmoji}</h3>
             </div>
          )}

          <div className={`${theme.panel} border ${theme.border} rounded-2xl overflow-hidden shadow-lg`}>
            <div className={`p-3 border-b ${theme.border} flex justify-between items-center text-xs text-zinc-500 font-bold uppercase tracking-wider`}>
               <span>Competidor</span>
               <span>XP Mensal</span>
            </div>
            
            {rankingList.slice(0, showAllRanking ? 100 : 50).map((u, index) => {
              const medalCounts = countMedals(u.medals || []);
              const isMe = u.isUser;
              const clsObj = u.userClass ? CLASSES[u.userClass.type] : (u.botClass ? CLASSES[u.botClass] : CLASSES.acrobat);
              const ClassIcon = clsObj ? clsObj.icon : Wind;
              
              let petType = null; let petIsDead = false;
              if (u.pet) {
                  if (typeof u.pet === 'string') petType = u.pet;
                  else { petType = u.pet.type; petIsDead = u.pet.isDead; }
              }

              return (
                <div key={u.id} className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-b ${theme.border} last:border-0 ${isMe ? theme.inner : ''}`}>
                  <span className={`font-mono text-xs sm:text-sm w-5 sm:w-6 text-center ${index === 0 ? 'text-yellow-500 font-bold' : index === 1 ? 'text-slate-400 font-bold' : index === 2 ? 'text-amber-600 font-bold' : 'text-zinc-500'}`}>{index + 1}</span>
                  <div className="w-3 sm:w-4 flex justify-center">
                    {u.trend === 'up' && <ArrowUp size={12} className="text-emerald-500" />}
                    {u.trend === 'down' && <ArrowDown size={12} className="text-red-500" />}
                    {u.trend === 'same' && <Minus size={12} className="text-zinc-400" />}
                  </div>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg sm:text-xl shadow-inner ${isMe ? 'bg-emerald-500 text-white' : `${theme.inner}`}`}>
                    {isMe ? <User size={16} className="sm:w-5 sm:h-5" /> : u.emoji}
                  </div>
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                      <p onClick={() => setExpandedBot(u.id === expandedBot ? null : u.id)} className={`font-medium ${u.id === expandedBot ? 'break-words whitespace-normal' : 'truncate max-w-[120px] sm:max-w-full'} ${isMe ? theme.text : theme.textMuted} text-xs sm:text-sm cursor-pointer`}>
                         <span className={`text-[9px] sm:text-[10px] ${theme.inner} ${theme.textMuted} px-1 rounded mr-1`}>Nv {u.level || user.level}</span>
                         {u.name}
                      </p>
                      
                      <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm flex items-center justify-center bg-zinc-900 border ${clsObj ? clsObj.border : ''}`} title={`Classe: ${clsObj ? clsObj.name : ''}`}>
                         <ClassIcon size={8} className={clsObj ? clsObj.color : ''}/>
                      </div>

                      {u.activeBuffs?.realizador && <Sword size={10} className="text-fuchsia-500 drop-shadow" title="Espírito Realizador Ativo"/>}
                      {u.activeBuffs?.resguardo && <Shield size={10} className="text-cyan-500 drop-shadow" title="Espírito de Resguardo Ativo"/>}
                      {u.activeBuffs?.duelWin && <span className="text-[8px] sm:text-[10px] font-bold text-yellow-500 flex items-center bg-yellow-500/10 px-0.5 sm:px-1 rounded border border-yellow-500/30" title="Buff de Duelo (+15%)">⚔️+</span>}
                      {u.activeBuffs?.duelLoss && <span className="text-[8px] sm:text-[10px] font-bold text-red-500 flex items-center bg-red-500/10 px-0.5 sm:px-1 rounded border border-red-500/30" title="Nerf de Duelo (-15%)">⚔️-</span>}
                      
                      {petType && petType !== 'egg' && !petIsDead && PET_TYPES[petType] && (
                          <span className="text-[10px] sm:text-sm drop-shadow" title={`Pet: ${PET_TYPES[petType].name}`}>
                              {PET_TYPES[petType].emoji}
                          </span>
                      )}
                      
                      {isMe && <span className="text-[8px] sm:text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-1 sm:px-2 py-0.5 rounded-full flex-shrink-0">Você</span>}
                    </div>
                    
                    {Object.keys(medalCounts).length > 0 && (
                      <div className="flex gap-1 sm:gap-2 mt-1">
                        {['plat', 'gold', 'silver', 'bronze', 'sprint_5k', 'sprint_10k', 'sprint_15k', 'sprint_20k'].map(mType => {
                           if (!medalCounts[mType]) return null;
                           return (
                              <div key={mType} className="relative flex items-center" title={`${medalCounts[mType]}x ${mType}`}>
                                 <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${MEDAL_STYLES[mType]} flex items-center justify-center`}>
                                   {mType.startsWith('sprint') ? <Flag size={6} className={mType === 'sprint_5k' ? 'text-emerald-500' : mType === 'sprint_10k' ? 'text-blue-500' : mType === 'sprint_15k' ? 'text-fuchsia-500' : 'text-yellow-500'}/> : <Award size={6} className="text-white drop-shadow-md"/>}
                                 </div>
                                 {medalCounts[mType] > 1 && (
                                    <span className="text-[8px] sm:text-[9px] font-bold text-zinc-500 ml-0.5 sm:ml-1">x{medalCounts[mType]}</span>
                                 )}
                              </div>
                           )
                        })}
                      </div>
                    )}
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                     <p className={`font-mono text-xs sm:text-sm ${theme.text}`}>{u.monthlyXp}</p>
                     {!isMe && (
                        <button onClick={() => challengeBot(u.id, u.name, u.emoji)} className="text-[10px] bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 px-2 py-1 sm:py-0.5 rounded flex items-center gap-1 transition-colors">
                          <Swords size={12} className="sm:w-[10px] sm:h-[10px]" /> <span className="hidden sm:inline">Desafiar</span>
                        </button>
                     )}
                  </div>
                </div>
              )
            })}
            
            {!showAllRanking && rankingList.length > 50 && (
               <button onClick={() => setShowAllRanking(true)} className={`w-full p-4 text-center ${theme.textMuted} text-sm hover:${theme.text} hover:${theme.inner} transition-colors flex items-center justify-center gap-2`}>
                  <ChevronDown size={16} /> Mostrar Restantes
               </button>
            )}
          </div>
        </>
      ) : (
        // FEED DO MUNDO
        <div className="space-y-3 animate-in fade-in slide-in-from-right-4">
           {globalFeed.length === 0 ? (
               <div className={`text-center py-10 ${theme.textMuted}`}>
                 <Globe size={48} className="mx-auto mb-3 opacity-20" />
                 <p>O mundo está silencioso. Volte amanhã para ver as novidades.</p>
               </div>
           ) : (
               globalFeed.map((evt, idx) => (
                  <div key={idx} className={`${theme.panel} border ${theme.border} p-4 rounded-2xl flex items-center gap-4 shadow-sm`}>
                     <div className={`w-10 h-10 rounded-full ${theme.inner} border ${theme.border} flex items-center justify-center text-xl shadow-inner flex-shrink-0`}>
                        {evt.icon}
                     </div>
                     <p className={`text-sm ${theme.text} leading-relaxed`}>{evt.text}</p>
                  </div>
               ))
           )}
        </div>
      )}
    </div>
  );

  const renderProfile = () => {
    const UserClassIcon = CLASSES[user.userClass?.type || 'acrobat']?.icon || Wind;
    const userClassData = CLASSES[user.userClass?.type || 'acrobat'] || CLASSES.acrobat;
    
    return (
    <div className="space-y-6 relative z-10 pb-24">
      {/* Dev Tools */}
      {user.debugMode && (
        <div className={`${theme.panel} border border-amber-500/30 rounded-2xl p-4 mb-6 shadow-sm`}>
          <h3 className="text-amber-600 dark:text-amber-500 text-xs font-bold uppercase mb-3 flex items-center gap-2"><Zap size={14} /> Controlos de Simulação</h3>
          <p className={`text-xs mb-3 ${theme.textMuted}`}>Data simulada: {currentDate.toLocaleDateString()}</p>
          <div className="flex gap-2 flex-wrap">
            <button onClick={processNextDay} className={`flex-1 ${theme.inner} hover:${theme.panel} ${theme.text} py-2 px-3 rounded-lg text-sm border ${theme.border} whitespace-nowrap`}>Virar Dia</button>
            <button onClick={simulateNextMonth} className={`flex-1 ${theme.inner} hover:${theme.panel} ${theme.text} py-2 px-3 rounded-lg text-sm border ${theme.border} whitespace-nowrap`}>Virar Mês</button>
            
            <button onClick={() => { addXpAndCoins(0, 10000, 0, 0); showToast("+10000 Moedas!"); }} className="flex-1 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 dark:text-yellow-500 py-2 px-3 rounded-lg text-sm border border-yellow-500/30 whitespace-nowrap flex items-center justify-center gap-1">
              +10K <Coins size={14} />
            </button>
            <button onClick={() => setUser(p => ({...p, vouchers: p.vouchers + 50}))} className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-500 py-2 px-3 rounded-lg text-sm border border-emerald-500/30 whitespace-nowrap flex items-center justify-center gap-1">
              +50 <Ticket size={14} />
            </button>
            
            <div className="w-full flex gap-2">
               <select value={debugPetSelect} onChange={e => setDebugPetSelect(e.target.value)} className={`flex-1 ${theme.inner} border ${theme.border} rounded-lg px-2 text-sm`}>
                  <option value="bat">Morcego</option>
                  <option value="penguin">Pinguim</option>
                  <option value="eagle">Águia</option>
                  <option value="parrot">Papagaio</option>
                  <option value="phoenix">Fênix</option>
                  <option value="dragon">Dragão</option>
               </select>
               <button onClick={() => setUser(p => ({...p, pet: { type: debugPetSelect, customName: "Dev Pet", food: 100, fun: 100, clean: 100, love: 100, isDead: false }}))} className={`flex-1 ${theme.btnPrimary} py-2 rounded-lg text-sm`}>Set Pet</button>
            </div>

            <button onClick={() => { if(!triggerUrgency()) showToast("Sem tarefas válidas para urgência!"); }} className="w-full bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-500 py-2 px-3 rounded-lg text-sm border border-orange-500/30 whitespace-nowrap flex items-center justify-center gap-1 mt-2">
              Forçar Urgência (P1/P2/Desafio)
            </button>
            <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-500 py-2 px-3 rounded-lg text-sm border border-red-500/30 whitespace-nowrap flex items-center justify-center gap-1 mt-2">
              Resetar Save (Apagar Tudo)
            </button>
            {/* Debug do Habit Streak */}
            <div className="w-full flex gap-2 items-center mt-2">
               <input 
                  type="number" 
                  value={debugHabitStreak} 
                  onChange={e => setDebugHabitStreak(Number(e.target.value))} 
                  className={`w-20 ${theme.inner} border ${theme.border} rounded-lg px-2 text-sm py-2 focus:outline-none`} 
                  min="0"
               />
               <button onClick={() => {
                   setHabits(cur => cur.map(h => ({ ...h, streak: debugHabitStreak })));
                   // Agora também definimos a ofensiva global do utilizador para que conte para a medalha mensal!
                   setUser(prev => ({ 
                       ...prev, 
                       streak: debugHabitStreak, 
                       maxStreakThisMonth: Math.max(prev.maxStreakThisMonth || 0, debugHabitStreak) 
                   }));
                   showToast(`Streak Global e dos Hábitos definido para ${debugHabitStreak}!`);
               }} className={`flex-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-500 py-2 px-3 rounded-lg text-sm border border-blue-500/30 whitespace-nowrap`}>
                 Definir Streak Hábitos
               </button>
            </div>
          </div>
        </div>
      )}

      {/* ÁREA DO PET E PERFIL */}
      <div className="flex flex-col items-center py-6 relative">
        <div className={`w-24 h-24 ${theme.panel} rounded-full mx-auto border-2 ${theme.border} flex items-center justify-center mb-4 relative z-10 shadow-lg`}>
          <User size={40} className={theme.textMuted} />
          {user.medals.length > 0 && (
             <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 border-white dark:border-black flex items-center justify-center ${MEDAL_STYLES[user.medals[user.medals.length - 1]]}`}>
               {user.medals[user.medals.length - 1].startsWith('sprint') ? <Flag size={14} className={user.medals[user.medals.length - 1] === 'sprint_5k' ? 'text-emerald-500' : 'text-yellow-500'}/> : <Award size={16} className="text-white drop-shadow" />}
             </div>
          )}
        </div>
        
        {/* Companheiro (Ovo ou Pet) */}
        {user.pet && (
           <div className="absolute top-10 -right-2 transform translate-x-1/2 z-20 cursor-pointer hover:scale-110 transition-transform" onClick={() => { if(user.pet.type !== 'egg') setPetCareModal(true); }}>
              {user.pet.type === 'egg' ? (
                 <div className={`w-16 h-16 ${theme.inner} rounded-full border ${theme.border} flex flex-col items-center justify-center shadow-lg relative animate-pulse overflow-hidden`}>
                    <Egg size={28} className="text-amber-500" />
                    <div className="absolute bottom-0 w-full bg-amber-500/20 h-2">
                       <div className="bg-amber-500 h-full" style={{width: `${(user.pet.strikes/30)*100}%`}}></div>
                    </div>
                 </div>
              ) : user.pet.isDead ? (
                 <div className={`w-16 h-16 ${theme.inner} rounded-full border-2 border-red-500/50 flex flex-col items-center justify-center shadow-lg grayscale`}>
                    <span className="text-2xl">🪦</span>
                 </div>
              ) : (
                 <div className={`w-16 h-16 ${theme.inner} rounded-full border-2 border-amber-500 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-float`}>
                    <span className="text-3xl">{PET_TYPES[user.pet.type]?.emoji || ''}</span>
                 </div>
              )}
           </div>
        )}

        <h2 className={`text-2xl font-bold ${theme.text} mb-1`}>{user.name}</h2>
        <p className={`${theme.textMuted} flex items-center gap-1 mt-1 bg-black/10 dark:bg-white/5 px-2 py-0.5 rounded-full`}><UserClassIcon size={12} className={userClassData.color}/> Nv {user.userClass?.level || 1} {userClassData.name}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={`${theme.panel} border ${theme.border} p-4 rounded-2xl shadow-sm`}>
          <Target className="text-emerald-500 mb-2" size={24} />
          <p className={`text-3xl font-black ${theme.text}`}>{user.level}</p>
          <p className={`text-xs ${theme.textMuted} font-medium uppercase mt-1`}>Nível Atual</p>
        </div>
        <div className={`${theme.panel} border ${theme.border} p-4 rounded-2xl shadow-sm`}>
          <Flame className="text-orange-500 mb-2" size={24} />
          <p className={`text-3xl font-black ${theme.text}`}>{user.streak}</p>
          <p className={`text-xs ${theme.textMuted} font-medium uppercase mt-1`}>Dias Seguidos</p>
        </div>
      </div>

      {/* CLASSE XP BAR */}
      <div className={`${theme.panel} border ${userClassData.border} p-6 rounded-2xl shadow-sm mt-4 bg-gradient-to-br ${userClassData.bg} to-transparent`}>
        <div className="flex justify-between items-end mb-2">
          <span className={`text-sm ${userClassData.color} font-bold flex items-center gap-1`}><UserClassIcon size={14}/> {userClassData.name} Nv {user.userClass?.level || 1}</span>
          <span className={`font-mono text-sm ${theme.text}`}>{user.userClass?.level >= 10 ? 'MAX' : `${user.userClass?.xp || 0} / ${getClassRequiredXp(user.userClass?.level || 1)}`}</span>
        </div>
        <div className={`w-full ${theme.inner} h-2 rounded-full overflow-hidden border ${theme.border}`}>
          <div className={`h-full transition-all duration-1000 ease-out ${userClassData.color.replace('text-', 'bg-')}`} style={{ width: user.userClass?.level >= 10 ? '100%' : `${((user.userClass?.xp || 0) / getClassRequiredXp(user.userClass?.level || 1)) * 100}%` }} />
        </div>
        <p className={`text-[10px] ${theme.textMuted} mt-3`}>{userClassData.desc}</p>
      </div>

      <div className={`${theme.panel} border ${theme.border} p-4 rounded-2xl shadow-sm mt-4`}>
        <p className={`text-xs ${theme.textMuted} font-medium uppercase mb-2 flex items-center gap-1`}><Swords size={14}/> Duelos Diários</p>
        <div className={`flex justify-between items-center ${theme.inner} p-3 rounded-xl border ${theme.border}`}>
           <div className="flex flex-col items-center">
              <span className="text-xl text-emerald-500 font-black">{user.duelStats?.wins || 0}</span>
              <span className={`text-[10px] ${theme.textMuted}`}>VITÓRIAS</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-xl text-yellow-500 font-black">{user.duelStats?.ties || 0}</span>
              <span className={`text-[10px] ${theme.textMuted}`}>EMPATES</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-xl text-red-500 font-black">{user.duelStats?.losses || 0}</span>
              <span className={`text-[10px] ${theme.textMuted}`}>DERROTAS</span>
           </div>
        </div>
      </div>

      <div className={`${theme.panel} border ${theme.border} p-6 rounded-2xl shadow-sm mt-4`}>
        <div className="flex justify-between items-end mb-2">
          <span className={`text-sm ${theme.textMuted}`}>Progresso Nível {user.level + 1}</span>
          <span className={`font-mono text-sm ${theme.text}`}>{user.xp} / {getRequiredXp(user.level)}</span>
        </div>
        <div className={`w-full ${theme.inner} h-3 rounded-full overflow-hidden border ${theme.border}`}>
          <div className="bg-emerald-500 h-full transition-all duration-1000 ease-out" style={{ width: `${(user.xp / getRequiredXp(user.level)) * 100}%` }} />
        </div>
        <p className={`text-xs ${theme.textMuted} mt-3 text-center`}>XP Mensal (Ranking): {user.monthlyXp}</p>
      </div>
    </div>
  );
  }

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-sans selection:bg-emerald-500/30 overflow-x-hidden transition-colors duration-500`}>
      <GlobalStyles />
      <ParticlesBackground isDarkMode={isDarkMode} />

      {/* FOCUS OVERLAY */}
      {focusTask && (
        <div className="fixed inset-0 bg-zinc-950 z-[9999] flex flex-col items-center justify-center animate-in fade-in">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-950 opacity-50 animate-pulse-fast"></div>
           <div className="relative z-10 flex flex-col items-center justify-center w-full px-6">
              <h2 className="text-2xl md:text-4xl text-amber-500 font-bold mb-12 text-center drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">{focusTask.title}</h2>
              <FocusTimer endTime={focusTask.timeTestEndTime} />
              <button onClick={() => setFocusTask(null)} className="mt-16 px-8 py-4 rounded-full border-2 border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-500 transition-all font-bold tracking-widest uppercase">
                  Sair do Foco
              </button>
           </div>
        </div>
      )}

      {/* TELA DE PROCESSAMENTO DA NOITE */}
      {isProcessingDay && (
         <div className={`fixed inset-0 ${theme.bg} z-[1000] flex flex-col justify-center items-center p-6 animate-in fade-in`}>
            <Moon size={64} className="text-indigo-500 mb-8 animate-pulse" />
            <h2 className={`text-2xl font-black ${theme.text} mb-2 tracking-widest uppercase`}>A calcular Progresso...</h2>
            <p className={theme.textMuted}>Os deuses do foco estão a avaliar as suas ações.</p>
         </div>
      )}

      {/* Header Fixo com Barra de Progresso e Medalhas */}
      <header className={`pt-12 pb-4 px-6 relative z-10 sticky top-0 ${theme.nav} backdrop-blur-md transition-colors duration-500`}>
        <div className="flex justify-between items-center mb-3">
          <h1 className={`text-2xl font-black ${theme.text} tracking-tight flex items-center gap-2`}>
            Focus<span className={theme.textMuted}>Quest</span>
          </h1>
          <div className="flex items-center gap-3">

            {/* NOVO BOTÃO DE LOGOUT */}
            <button 
               onClick={handleLogout} 
               className="text-[10px] uppercase font-bold text-red-500 hover:text-red-400 px-2 py-1 rounded border border-red-500/30 bg-red-500/10 transition-colors"
            >
               Sair
            </button>

            {/* Restantes botões que já lá estavam */}
            {isUrgentActive && !user.hasSeenUrgencyInfo && (
                <button onClick={() => { setUrgencyInfoModal(true); setUser(p => ({...p, hasSeenUrgencyInfo: true})); }} className="animate-pulse text-red-500 hover:scale-110 transition-transform">
                   <Info size={20} />
                </button>
            )}

            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`w-10 h-10 rounded-full ${theme.inner} border ${theme.border} flex items-center justify-center shadow-sm transition-colors`}>
               {isDarkMode ? <Sun size={18} className={theme.textMuted} /> : <Moon size={18} className={theme.textMuted} />}
            </button>
            
            {pendingLootboxes > 0 && (
               <button onClick={() => openLootbox()} className="relative animate-bounce w-10 h-10 bg-fuchsia-100 dark:bg-fuchsia-950 border border-fuchsia-500/50 rounded-full flex items-center justify-center text-fuchsia-600 dark:text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                  <PackageOpen size={18} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{pendingLootboxes}</span>
               </button>
            )}
            <div onClick={() => setNotificationsOpen(!notificationsOpen)} className={`relative w-10 h-10 rounded-full ${theme.inner} border ${theme.border} flex items-center justify-center shadow-sm cursor-pointer hover:${theme.panel} transition-colors`}>
              <Bell size={18} className={theme.textMuted} />
              {notifications.filter(n => !n.read).length > 0 && <div className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
            </div>
          </div>
        </div>
        
        {/* Dropdown de Notificações */}
        {notificationsOpen && (
           <div className={`absolute right-6 top-24 w-64 ${theme.panel} border ${theme.border} rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-4`}>
             <div className={`flex justify-between items-center px-2 py-1 mb-2 border-b ${theme.border}`}>
               <span className={`text-xs font-bold ${theme.textMuted}`}>Notificações</span>
               <button onClick={() => setNotifications(n => n.map(x => ({...x, read:true})))} className="text-[10px] text-emerald-500 hover:text-emerald-400">Marcar lidas</button>
             </div>
             <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
                {notifications.length === 0 ? <p className={`text-xs text-center ${theme.textMuted} py-4`}>Nenhuma novidade.</p> : 
                   notifications.map(n => (
                     <div key={n.id} className={`p-2 rounded-xl text-xs ${n.read ? theme.textMuted : `${theme.text} ${theme.inner}`}`}>
                        {n.msg}
                     </div>
                   ))
                }
             </div>
           </div>
        )}
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
             <span className={`text-xs ${theme.text} font-bold`}>Nv {user.level}</span>
             <span className="text-xs text-orange-500 font-bold flex items-center"><Flame size={12} className="mr-0.5"/> {user.streak}</span>
             
             {/* Indicador Animado de Moedas */}
             <span className={`text-xs font-bold flex items-center ${theme.inner} px-2 py-0.5 rounded border transition-colors duration-300 ${coinAnim === 'up' ? 'text-emerald-500 border-emerald-500/50 shadow-[0_0_8px_rgba(52,211,153,0.3)]' : coinAnim === 'down' ? 'text-red-500 border-red-500/50 shadow-[0_0_8px_rgba(248,113,113,0.3)]' : 'text-yellow-600 dark:text-yellow-500 border-yellow-500/30'}`}>
               <span className={`${coinAnim === 'up' ? 'animate-coin-up' : coinAnim === 'down' ? 'animate-coin-down' : ''} inline-block`}>
                 {user.coins}
               </span>
               <Coins size={12} className="ml-1"/>
             </span>

             {/* Vouchers Top Bar */}
             <span className={`text-xs font-bold flex items-center ${theme.inner} px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-600 dark:text-emerald-500`}>
               {user.vouchers || 0}
               <Ticket size={12} className="ml-1"/>
             </span>

             {/* Buffs Ativos do Utilizador */}
             {(user.activeBuffs.realizador || user.activeBuffs.resguardo || user.activeBuffs.duelWin || user.activeBuffs.duelLoss || user.activeBuffs.lastGasp) && (
               <div className={`flex gap-1 border-l ${theme.border} pl-2 ml-1`}>
                 {user.activeBuffs.realizador && <div className="w-6 h-6 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/50 flex items-center justify-center animate-pulse" title="Espírito Realizador Ativo"><Sword size={12} className="text-fuchsia-500 drop-shadow" /></div>}
                 {user.activeBuffs.resguardo && <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center animate-pulse" title="Espírito de Resguardo Ativo"><Shield size={12} className="text-cyan-500 drop-shadow" /></div>}
                 {user.activeBuffs.lastGasp && <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center animate-pulse" title="Último Gás Ativo"><Zap size={12} className="text-emerald-500 drop-shadow" /></div>}
                 {user.activeBuffs.duelWin && <div className="w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center animate-pulse" title="Buff de Duelo (XP/Coins +15%)"><Swords size={12} className="text-yellow-500 drop-shadow" /></div>}
                 {user.activeBuffs.duelLoss && <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center animate-pulse" title="Nerf de Duelo (XP/Coins -15%)"><Swords size={12} className="text-red-500 drop-shadow" /></div>}
               </div>
             )}

             {/* Medalhas de topo do Utilizador */}
             {user.medals.length > 0 && (
               <div className="flex gap-1 ml-auto items-center">
                 {['plat', 'gold', 'silver', 'bronze', 'sprint_5k', 'sprint_10k', 'sprint_15k', 'sprint_20k'].map(mType => {
                    const count = countMedals(user.medals)[mType];
                    if (!count) return null;
                    return (
                       <div key={mType} className={`w-5 h-5 rounded-full ${MEDAL_STYLES[mType]} flex items-center justify-center relative shadow-sm`} title={`${count}x ${mType}`}>
                         {mType.startsWith('sprint') ? <Flag size={8} className={mType === 'sprint_5k' ? 'text-emerald-500' : mType === 'sprint_10k' ? 'text-blue-500' : mType === 'sprint_15k' ? 'text-fuchsia-500' : 'text-yellow-500'}/> : <Award size={8} className="text-white drop-shadow-md"/>}
                         {count > 1 && <span className="absolute -bottom-1 -right-1 text-[8px] bg-zinc-800 text-white px-0.5 rounded font-black border border-zinc-600">{count}</span>}
                       </div>
                    )
                 })}
               </div>
             )}
          </div>
          
          {/* Barra de XP Global e Contador de Lootbox */}
          <div className={`w-full ${theme.inner} h-1.5 rounded-full overflow-hidden border ${theme.border} mt-1 relative`}>
            <div className="bg-emerald-500 h-full transition-all duration-1000 ease-out" style={{ width: `${(user.xp / getRequiredXp(user.level)) * 100}%` }} />
            <div className="absolute top-0 bottom-0 left-0 bg-fuchsia-500 h-full transition-all duration-500 opacity-50" style={{ width: `${((user.tasksTowardsLootbox || 0) / 15) * 100}%` }}></div>
          </div>
        </div>
      </header>

      {/* Main Content com Animação de Separador */}
      <main className="px-6 pt-4 h-full">
        <div key={activeTab} className="animate-tab-enter">
          {activeTab === 'tasks' && renderTasks()}
          {activeTab === 'habits' && renderHabits()}
          {activeTab === 'store' && renderStore()}
          {activeTab === 'ranking' && renderRanking()}
          {activeTab === 'profile' && renderProfile()}
        </div>
      </main>

      {/* Nav */}
      <nav className={`fixed bottom-0 w-full ${theme.nav} backdrop-blur-lg pb-safe z-40 transition-colors duration-500`}>
        <div className="flex justify-around items-center h-20 px-4">
          {[
            { id: 'tasks', icon: CustomCheckSquare, label: 'Tarefas' },
            { id: 'habits', icon: Target, label: 'Hábitos' },
            { id: 'store', icon: ShoppingCart, label: 'Loja' },
            { id: 'ranking', icon: Trophy, label: 'Mundo' },
            { id: 'profile', icon: User, label: 'Perfil' }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const hasUrgencyAlert = tab.id === 'tasks' && isUrgentActive;
            
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`relative flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${isActive ? theme.text : theme.textMuted}`}>
                {hasUrgencyAlert && <div className="urgency-blob" />}
                <Icon size={24} className={`mb-1 transition-transform duration-200 ${isActive ? 'scale-110 text-emerald-500' : 'scale-100'} ${hasUrgencyAlert ? 'text-red-500' : ''}`} />
                <span className={`text-[10px] font-medium tracking-wide ${hasUrgencyAlert ? 'text-red-500' : ''}`}>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* TOAST NOTIFICATION */}
      {toastMsg && (
        <div className={`fixed top-36 left-1/2 -translate-x-1/2 ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-800'} text-white px-6 py-3 rounded-full shadow-2xl z-[150] text-sm font-medium animate-float border border-zinc-700 whitespace-nowrap`}>
          {toastMsg}
        </div>
      )}

      {/* MODAL INFO URGÊNCIA */}
      {urgencyInfoModal && (
        <div className={`fixed inset-0 ${theme.modalBg} z-[500] flex flex-col justify-center items-center p-6 backdrop-blur-md animate-in fade-in`}>
           <div className={`${theme.panel} border border-red-500/50 p-8 rounded-3xl w-full max-w-sm shadow-[0_0_50px_rgba(239,68,68,0.2)]`}>
              <Zap size={48} className="text-red-500 mx-auto mb-4 animate-pulse" />
              <h2 className={`text-2xl font-black ${theme.text} mb-2 text-center uppercase`}>Modo Urgência</h2>
              <p className={`text-sm ${theme.textMuted} mb-6 text-center leading-relaxed`}>Uma das suas tarefas ativas tornou-se subitamente <strong className="text-red-500">Urgente</strong>. Tem <strong className="text-red-500">5 horas</strong> para a concluir.</p>
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl mb-6">
                 <p className="text-xs text-red-500 font-bold text-center">Se falhar, perderá 1 Nível inteiro e 40% de todas as suas moedas acumuladas!</p>
              </div>
              <button onClick={() => setUrgencyInfoModal(false)} className={`w-full bg-red-500 hover:bg-red-400 text-white py-4 rounded-xl font-bold transition-transform hover:scale-105`}>Compreendido!</button>
           </div>
        </div>
      )}

      {/* MEIA-NOITE FORCE ADVANCE */}
      {forceAdvanceModal && !isProcessingDay && (
        <div className={`fixed inset-0 ${theme.modalBg} z-[500] flex flex-col justify-center items-center p-6 backdrop-blur-md animate-in fade-in`}>
           <div className={`${theme.panel} border ${theme.border} p-8 rounded-3xl w-full max-w-sm text-center shadow-2xl`}>
              <Clock size={64} className="text-indigo-500 mx-auto mb-4 animate-pulse" />
              <h2 className={`text-2xl font-black ${theme.text} mb-2`}>Meia-noite!</h2>
              <p className={`text-sm ${theme.textMuted} mb-6`}>Um novo dia acaba de nascer. O seu progresso de ontem será processado agora.</p>
              <button onClick={processNextDay} className={`w-full ${theme.btnPrimary} py-4 rounded-xl font-bold transition-transform hover:scale-105`}>Avançar para Hoje</button>
           </div>
        </div>
      )}

      {/* MODAL: FALHA URGÊNCIA */}
      {urgencyFailureModal && (
        <div className={`fixed inset-0 ${theme.modalBg} z-[500] flex flex-col justify-center items-center p-6 backdrop-blur-md animate-in zoom-in-95 duration-200`}>
           <div className={`${theme.panel} border border-red-500/50 p-8 rounded-3xl w-full max-w-sm text-center shadow-[0_0_50px_rgba(239,68,68,0.3)]`}>
              <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none rounded-3xl"></div>
              <Skull size={64} className="text-red-500 mx-auto mb-4" />
              <h2 className={`text-3xl font-black text-red-500 mb-2 uppercase tracking-widest`}>TEMPO ESGOTADO!</h2>
              <p className={`text-sm ${theme.textMuted} mb-6`}>Falhou em completar a urgência: <strong className="text-red-400">"{urgencyFailureModal.title}"</strong>.</p>
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl mb-6">
                 <p className="font-mono text-red-500 font-bold">-1 Nível<br/>-40% Moedas</p>
              </div>
              <button onClick={() => setUrgencyFailureModal(null)} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl transition-transform hover:scale-105 relative z-10">Aceitar o Fardo</button>
           </div>
        </div>
      )}

      {/* MODAL: RESUMO DIÁRIO (E SEQUÊNCIA DO DUELO) */}
      {dailySummaryModal && (
        <div className={`fixed inset-0 ${theme.modalBg} z-[400] flex flex-col justify-center items-center p-6 backdrop-blur-md animate-in fade-in duration-300`}>
           <div className={`${theme.panel} border ${theme.border} p-8 rounded-3xl w-full max-w-sm shadow-2xl relative overflow-hidden animate-modal-pop`}>
              <div className="absolute top-0 right-0 p-4 opacity-5"><Calendar size={100}/></div>
              <h2 className={`text-2xl font-black ${theme.text} mb-1`}>Relatório Diário</h2>
              <p className={`text-xs ${theme.textMuted} mb-6`}>O que conquistou no dia de ontem:</p>
              
              <div className="space-y-3 mb-8">
                 <div className={`flex justify-between items-center ${theme.inner} border ${theme.border} p-4 rounded-xl`}>
                    <div className="flex items-center gap-2"><Target size={20} className="text-emerald-500"/> <span className={`font-bold ${theme.text}`}>XP Obtido</span></div>
                    <div className="text-right">
                       <span className="font-black text-emerald-500 text-xl">+{dailySummaryModal.xp}</span>
                       {dailySummaryModal.isNewXpRecord && dailySummaryModal.xp > 0 && <p className="text-[9px] text-fuchsia-500 font-bold uppercase animate-pulse">Novo Recorde!</p>}
                    </div>
                 </div>
                 <div className={`flex justify-between items-center ${theme.inner} border ${theme.border} p-4 rounded-xl`}>
                    <div className="flex items-center gap-2"><Coins size={20} className="text-yellow-500"/> <span className={`font-bold ${theme.text}`}>Ouro Obtido</span></div>
                    <div className="text-right">
                       <span className="font-black text-yellow-500 text-xl">+{dailySummaryModal.coins}</span>
                       {dailySummaryModal.isNewCoinsRecord && dailySummaryModal.coins > 0 && <p className="text-[9px] text-fuchsia-500 font-bold uppercase animate-pulse">Novo Recorde!</p>}
                    </div>
                 </div>
                 <div className={`flex justify-between items-center ${theme.inner} border ${theme.border} p-4 rounded-xl`}>
                    <div className="flex items-center gap-2"><Ticket size={20} className="text-emerald-400"/> <span className={`font-bold ${theme.text}`}>Vouchers</span></div>
                    <span className="font-black text-emerald-400 text-xl">+{dailySummaryModal.vouchers}</span>
                 </div>
              </div>
              
              <button onClick={() => {
                 setDailySummaryModal(null);
                 if (pendingDuelResult) {
                    setDuelResultModal(pendingDuelResult);
                    setPendingDuelResult(null);
                 }
              }} className={`w-full ${theme.btnPrimary} font-bold py-4 rounded-xl`}>Excelente!</button>
           </div>
        </div>
      )}

      {/* MODAL DE RESULTADO DO DUELO (Renderizado APÓS o Resumo) */}
      {duelResultModal && (
        <div className={`fixed inset-0 ${theme.modalBg} z-[600] flex justify-center items-center p-6 backdrop-blur-md animate-in fade-in duration-300`}>
          <div className={`${theme.panel} border-2 ${duelResultModal.win ? 'border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.3)]' : duelResultModal.tie ? 'border-yellow-500/50 shadow-[0_0_50px_rgba(234,179,8,0.3)]' : 'border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.3)]'} p-8 rounded-3xl w-full max-w-sm text-center relative overflow-hidden animate-modal-pop`}>
             <div className="flex justify-center mb-6">
                <Swords size={64} className={`${duelResultModal.win ? 'text-emerald-500' : duelResultModal.tie ? 'text-yellow-500' : 'text-red-500'} animate-bounce`} />
             </div>
             
             <h2 className={`text-3xl font-black mb-2 uppercase tracking-widest ${duelResultModal.win ? 'text-emerald-500' : duelResultModal.tie ? 'text-yellow-500' : 'text-red-500'}`}>
                {duelResultModal.win ? 'VITÓRIA!' : duelResultModal.tie ? 'EMPATE!' : 'DERROTA!'}
             </h2>
             
             <p className={`text-sm ${theme.textMuted} mb-6`}>
                O duelo contra {duelResultModal.botName} {duelResultModal.botEmoji} chegou ao fim.
             </p>

             <div className={`flex justify-between items-center ${theme.inner} p-4 rounded-2xl mb-8`}>
                <div className="flex flex-col items-center">
                   <span className="text-[10px] font-bold text-zinc-500 mb-1 uppercase">Sua Pontuação</span>
                   <span className={`text-2xl font-black ${duelResultModal.win ? 'text-emerald-500' : theme.text}`}>{duelResultModal.userDiff}</span>
                </div>
                <div className="w-px h-10 bg-zinc-700/50 mx-2"></div>
                <div className="flex flex-col items-center">
                   <span className="text-[10px] font-bold text-zinc-500 mb-1 uppercase">Adversário</span>
                   <span className={`text-2xl font-black ${!duelResultModal.win && !duelResultModal.tie ? 'text-red-500' : theme.text}`}>{duelResultModal.botDiff}</span>
                </div>
             </div>

             <button onClick={() => setDuelResultModal(null)} className={`w-full py-4 font-bold rounded-xl text-white transition-all hover:scale-105 ${duelResultModal.win ? 'bg-emerald-600 hover:bg-emerald-500' : duelResultModal.tie ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-red-600 hover:bg-red-500'}`}>
                Continuar
             </button>
          </div>
        </div>
      )}

      {/* MODAL: PET CARE (INTERAÇÃO COM O PET) */}
      {petCareModal && user.pet && user.pet.type !== 'egg' && (
        <div className={`fixed inset-0 ${theme.modalBg} z-[200] flex justify-center items-center p-6 backdrop-blur-sm animate-in fade-in duration-300`}>
          <div className={`${theme.panel} border ${theme.border} p-8 rounded-3xl w-full max-w-sm shadow-2xl relative overflow-hidden animate-modal-pop`}>
            <div className="absolute top-0 right-0 p-4 opacity-5"><PawPrint size={100}/></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
               <div>
                  <h3 className={`text-xl font-bold ${theme.text}`}>{user.pet.customName || PET_TYPES[user.pet.type]?.name}</h3>
                  <p className={`text-xs ${theme.textMuted}`}>{PET_TYPES[user.pet.type]?.name}</p>
               </div>
               <button onClick={() => setPetCareModal(false)} className={`p-2 ${theme.textMuted} hover:${theme.text} ${theme.inner} rounded-full transition-colors`}><X size={16}/></button>
            </div>

            <div className="flex justify-center mb-8 relative z-10">
               <div className={`w-32 h-32 ${theme.inner} rounded-full border-2 border-amber-500/50 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.2)] animate-float`}>
                  <span className="text-6xl drop-shadow-xl">{PET_TYPES[user.pet.type]?.emoji}</span>
               </div>
            </div>

            <div className="space-y-4 mb-8 relative z-10">
               <div className="flex items-center gap-3">
                  <Utensils size={16} className="text-amber-500"/>
                  <div className={`flex-1 h-3 ${theme.inner} rounded-full overflow-hidden border ${theme.border}`}>
                     <div className="bg-amber-500 h-full transition-all" style={{ width: `${user.pet.food || 0}%` }}></div>
                  </div>
                  <button onClick={() => interactWithPet('food')} className="bg-amber-500 hover:bg-amber-400 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm">Alimentar</button>
               </div>
               
               <div className="flex items-center gap-3">
                  <Bath size={16} className="text-cyan-500"/>
                  <div className={`flex-1 h-3 ${theme.inner} rounded-full overflow-hidden border ${theme.border}`}>
                     <div className="bg-cyan-500 h-full transition-all" style={{ width: `${user.pet.clean || 0}%` }}></div>
                  </div>
                  <button onClick={() => interactWithPet('clean')} className="bg-cyan-500 hover:bg-cyan-400 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm">Limpar</button>
               </div>

               <div className="flex items-center gap-3">
                  <Gamepad2 size={16} className="text-pink-500"/>
                  <div className={`flex-1 h-3 ${theme.inner} rounded-full overflow-hidden border ${theme.border}`}>
                     <div className="bg-pink-500 h-full transition-all" style={{ width: `${user.pet.fun || 0}%` }}></div>
                  </div>
                  <button onClick={() => interactWithPet('fun')} className="bg-pink-500 hover:bg-pink-400 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm">Brincar</button>
               </div>

               <div className="flex items-center gap-3">
                  <Heart size={16} className="text-red-500"/>
                  <div className={`flex-1 h-3 ${theme.inner} rounded-full overflow-hidden border ${theme.border}`}>
                     <div className="bg-red-500 h-full transition-all" style={{ width: `${user.pet.love || 0}%` }}></div>
                  </div>
                  <button onClick={() => interactWithPet('love')} className="bg-red-500 hover:bg-red-400 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm">Carinho</button>
               </div>
            </div>

            <div className={`flex justify-around ${theme.inner} border ${theme.border} p-3 rounded-xl relative z-10`}>
               <div className="flex flex-col items-center text-xs">
                  <span className="font-bold text-amber-500">{user.inventory?.food || 0}</span>
                  <span className={theme.textMuted}>Rações</span>
               </div>
               <div className="flex flex-col items-center text-xs">
                  <span className="font-bold text-cyan-500">{user.inventory?.soap || 0}</span>
                  <span className={theme.textMuted}>Sabões</span>
               </div>
               <div className="flex flex-col items-center text-xs">
                  <span className="font-bold text-pink-500">{user.inventory?.toys || 0}</span>
                  <span className={theme.textMuted}>Brinquedos</span>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: RESUMO DO MÊS */}
      {monthlySummaryModal && (
        <div className={`fixed inset-0 ${theme.modalBg} z-[600] flex flex-col justify-center items-center p-6 backdrop-blur-md animate-in fade-in duration-500`}>
           <div className={`${theme.panel} border ${theme.border} p-8 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(16,185,129,0.2)] relative overflow-hidden animate-modal-pop`}>
              <div className="absolute top-0 right-0 p-4 opacity-5"><Trophy size={120}/></div>
              
              <h2 className={`text-3xl font-black ${theme.text} mb-1 uppercase tracking-wider text-center`}>Resumo de {monthlySummaryModal.monthName}</h2>
              <p className={`text-sm ${theme.textMuted} mb-6 text-center`}>Mais um ciclo concluído na sua jornada.</p>
              
              <div className="flex flex-col items-center mb-8">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">A sua Recompensa de Constância</h3>
                 {monthlySummaryModal.medal ? (
                    <div className={`w-20 h-20 rounded-full ${MEDAL_STYLES[monthlySummaryModal.medal]} flex items-center justify-center shadow-xl animate-bounce relative`}>
                        <Award size={40} className="text-white drop-shadow-md"/>
                        <span className="absolute -bottom-2 bg-zinc-800 text-white text-[10px] px-2 py-0.5 rounded-full border border-zinc-600 uppercase font-bold">
                            {monthlySummaryModal.medal === 'plat' ? 'Platina' : monthlySummaryModal.medal === 'gold' ? 'Ouro' : monthlySummaryModal.medal === 'silver' ? 'Prata' : 'Bronze'}
                        </span>
                    </div>
                 ) : (
                    <div className="w-20 h-20 rounded-full bg-zinc-800/50 border border-zinc-700 border-dashed flex items-center justify-center">
                        <span className="text-zinc-500 text-[10px] uppercase font-bold text-center px-2">Sem Medalha</span>
                    </div>
                 )}
                 <p className={`text-sm ${theme.text} mt-4 font-medium`}>XP Mensal: <span className="text-emerald-500 font-black">{monthlySummaryModal.xp}</span></p>
              </div>

              <div className={`bg-black/10 dark:bg-black/30 rounded-2xl p-4 border ${theme.border} mb-8`}>
                 <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3 text-center">Pódio Mensal</h3>
                 <div className="flex justify-center items-end gap-2 h-32">
                    {/* Segundo Lugar */}
                    {monthlySummaryModal.top3[1] && (
                        <div className="flex flex-col items-center w-1/3">
                            <span className="text-sm mb-1 text-center truncate w-full px-1">{monthlySummaryModal.top3[1].isUser ? 'Você' : monthlySummaryModal.top3[1].name}</span>
                            <div className="w-full bg-slate-300 dark:bg-slate-700 h-16 rounded-t-lg flex flex-col items-center justify-start pt-2 border-t-2 border-slate-400">
                               <span className="text-slate-600 dark:text-slate-300 font-black">2º</span>
                               <span className="text-[9px] text-slate-500 dark:text-slate-400">{monthlySummaryModal.top3[1].monthlyXp} XP</span>
                            </div>
                        </div>
                    )}
                    {/* Primeiro Lugar */}
                    {monthlySummaryModal.top3[0] && (
                        <div className="flex flex-col items-center w-1/3">
                            <span className="text-sm mb-1 font-bold text-yellow-600 dark:text-yellow-500 text-center truncate w-full px-1">{monthlySummaryModal.top3[0].isUser ? 'Você' : monthlySummaryModal.top3[0].name}</span>
                            <div className="w-full bg-yellow-300 dark:bg-yellow-600 h-24 rounded-t-lg flex flex-col items-center justify-start pt-2 border-t-2 border-yellow-400 shadow-[0_-5px_15px_rgba(234,179,8,0.3)] z-10">
                               <span className="text-yellow-700 dark:text-yellow-300 font-black">1º</span>
                               <span className="text-[9px] text-yellow-600 dark:text-yellow-400">{monthlySummaryModal.top3[0].monthlyXp} XP</span>
                            </div>
                        </div>
                    )}
                    {/* Terceiro Lugar */}
                    {monthlySummaryModal.top3[2] && (
                        <div className="flex flex-col items-center w-1/3">
                            <span className="text-sm mb-1 text-center truncate w-full px-1">{monthlySummaryModal.top3[2].isUser ? 'Você' : monthlySummaryModal.top3[2].name}</span>
                            <div className="w-full bg-orange-300 dark:bg-orange-800 h-12 rounded-t-lg flex flex-col items-center justify-start pt-2 border-t-2 border-orange-400">
                               <span className="text-orange-700 dark:text-orange-400 font-black">3º</span>
                               <span className="text-[9px] text-orange-600 dark:text-orange-500">{monthlySummaryModal.top3[2].monthlyXp} XP</span>
                            </div>
                        </div>
                    )}
                 </div>
              </div>

              <button onClick={() => setMonthlySummaryModal(null)} className={`w-full ${theme.btnPrimary} font-bold py-4 rounded-xl transition-transform hover:scale-105`}>Avançar para o Próximo Mês</button>
           </div>
        </div>
      )}

      {/* SLOT MACHINE MODAL */}
      {slotModalOpen && (
        <div className={`fixed inset-0 ${theme.modalBg} z-[200] flex flex-col justify-center items-center p-6 backdrop-blur-md animate-in fade-in duration-300`}>
          <div className={`${theme.panel} border-2 border-pink-500/30 rounded-3xl w-full max-w-sm shadow-[0_0_50px_rgba(236,72,153,0.15)] flex flex-col items-center p-6 animate-modal-pop`}>
            <h2 className="text-xl font-black text-pink-500 mb-6 uppercase tracking-widest text-center">Giro da Sorte</h2>
            
            <div className={`flex justify-around items-center w-full ${theme.inner} border border-pink-500/30 rounded-2xl p-6 mb-8`}>
               {slotState.reels.map((icon, idx) => (
                  <div key={idx} className="relative w-16 h-20 bg-black/20 rounded-xl flex items-center justify-center border border-white/5 overflow-hidden shadow-inner">
                     {slotState.active && icon === '❓' ? (
                        <div className="animate-slot-spin text-5xl">🎰</div>
                     ) : (
                        <span className={`text-5xl ${slotState.result && slotState.result !== 'loss' ? 'animate-pulse' : ''}`}>{icon}</span>
                     )}
                  </div>
               ))}
            </div>

            {slotState.result && slotState.result !== 'loss' && (
                <div className="mb-6 text-center animate-in zoom-in">
                   <p className="text-sm font-bold text-emerald-500 mb-1">VITÓRIA!</p>
                   <h3 className="text-3xl font-black text-yellow-500">+{slotState.result.pay * slotBet} Moedas</h3>
                </div>
            )}
            {slotState.result === 'loss' && (
                <div className="mb-6 text-center animate-in zoom-in">
                   <p className="text-sm font-bold text-red-500 mb-1">QUASE!</p>
                   <h3 className={`text-xl font-black ${theme.textMuted}`}>Mais sorte na próxima...</h3>
                </div>
            )}

            <button onClick={() => { setSlotModalOpen(false); setSlotState({active:false, reels:['❓','❓','❓'], result:null}); }} className={`w-full py-3 font-bold ${theme.textMuted} hover:${theme.text} transition-colors`}>
               Sair
            </button>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {itemToDelete && (
        <div className={`fixed inset-0 ${theme.modalBg} z-[300] flex flex-col justify-center items-center p-6 backdrop-blur-sm animate-in zoom-in-95 duration-200`}>
           <div className={`${theme.panel} border border-red-500/50 p-6 rounded-3xl w-full max-w-sm shadow-2xl flex flex-col items-center`}>
              <ShieldAlert size={48} className="text-red-500 mb-4" />
              <h3 className={`text-xl font-bold ${theme.text} mb-2 text-center`}>Apagar {itemToDelete.type === 'task' ? 'Tarefa' : 'Hábito'}?</h3>
              <p className={`text-sm ${theme.textMuted} mb-6 text-center`}>Ao apagar este item sem o concluir, sofrerá uma penalidade de <strong className="text-red-500">-30 XP e -10 Moedas</strong>. Tem a certeza que deseja prosseguir?</p>
              
              <div className="flex gap-3 w-full">
                 <button onClick={() => setItemToDelete(null)} className={`flex-1 py-3 font-bold ${theme.textMuted} ${theme.inner} hover:${theme.panel} rounded-xl transition-colors`}>Cancelar</button>
                 <button onClick={confirmDelete} className="flex-1 py-3 font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)]">Apagar e Perder XP</button>
              </div>
           </div>
        </div>
      )}

      {/* MODAL: DATE PICKER PERSONALIZADO */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex justify-center items-center p-6 animate-in fade-in duration-200">
          <div className={`${theme.panel} border-2 border-emerald-500/30 p-6 rounded-3xl w-full max-w-sm shadow-2xl animate-modal-pop`}>
             <div className="flex justify-between items-center mb-6">
                <button onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1))} className={`p-2 ${theme.textMuted} hover:${theme.text} ${theme.inner} rounded-full`}><ChevronUp className="-rotate-90" size={16}/></button>
                <h3 className={`text-lg font-bold ${theme.text} capitalize tracking-wide`}>{MONTH_NAMES[calendarDate.getMonth()]} {calendarDate.getFullYear()}</h3>
                <button onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1))} className={`p-2 ${theme.textMuted} hover:${theme.text} ${theme.inner} rounded-full`}><ChevronDown className="-rotate-90" size={16}/></button>
             </div>
             
             <div className="grid grid-cols-7 gap-1 mb-2">
                {DAY_NAMES.map((d,i) => <div key={i} className="text-center text-xs font-bold text-emerald-600/60">{d}</div>)}
             </div>
             
             <div className="grid grid-cols-7 gap-y-2 gap-x-1">
                {Array.from({ length: getFirstDayOfMonth(calendarDate.getFullYear(), calendarDate.getMonth()) }).map((_, i) => <div key={`empty-${i}`} />)}
                
                {Array.from({ length: getDaysInMonth(calendarDate.getFullYear(), calendarDate.getMonth()) }).map((_, i) => {
                   const day = i + 1;
                   const dateStr = `${calendarDate.getFullYear()}-${String(calendarDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                   const isSelected = newTaskDeadline === dateStr;
                   const isToday = dateStr === `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
                   
                   return (
                      <button key={day} onClick={() => { setNewTaskDeadline(dateStr); setShowDatePicker(false); }}
                         className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center text-sm transition-all ${isSelected ? 'bg-emerald-500 text-white font-black shadow-[0_0_10px_rgba(16,185,129,0.5)] scale-110' : isToday ? `${theme.panel} text-emerald-500 font-bold border border-emerald-500/40` : `${theme.text} hover:${theme.inner} hover:scale-105`}`}>
                         {day}
                      </button>
                   )
                })}
             </div>
             
             <div className="mt-8 flex gap-3">
                <button onClick={() => { setNewTaskDeadline(''); setShowDatePicker(false); }} className={`flex-1 py-3 text-sm font-bold ${theme.textMuted} hover:text-red-500 ${theme.inner} rounded-xl transition-colors border ${theme.border}`}>Remover Data</button>
                <button onClick={() => setShowDatePicker(false)} className={`flex-1 py-3 text-sm font-bold ${theme.btnPrimary} rounded-xl transition-colors`}>Fechar</button>
             </div>
          </div>
        </div>
      )}

      {/* MODAL: TIME PICKER PERSONALIZADO */}
      {showTimePicker && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex justify-center items-center p-6 animate-in fade-in duration-200">
          <div className={`${theme.panel} border-2 border-amber-500/30 p-6 rounded-3xl w-full max-w-sm shadow-2xl animate-modal-pop`}>
             <h3 className={`text-xl font-bold ${theme.text} mb-8 text-center flex items-center justify-center gap-2`}><Clock className="text-amber-500"/> Definir Horário</h3>
             
             <div className="flex justify-center gap-6 mb-10">
                <div className={`h-48 w-20 overflow-y-auto snap-y snap-mandatory scrollbar-hide border-y-2 border-amber-500/30 relative rounded-xl ${theme.inner} shadow-inner`}>
                   {Array.from({ length: 24 }).map((_, i) => {
                      const hStr = String(i).padStart(2, '0');
                      const isSelected = (newTaskTime ? newTaskTime.split(':')[0] : '12') === hStr;
                      return <div key={i} onClick={() => handleHourSelect(hStr)} className={`h-12 flex items-center justify-center snap-center cursor-pointer text-2xl font-mono transition-all ${isSelected ? 'text-amber-500 font-black scale-125 bg-amber-500/10' : `${theme.textMuted} hover:${theme.text}`}`}>{hStr}</div>
                   })}
                </div>
                
                <div className={`text-3xl font-black ${theme.textMuted} flex items-center animate-pulse`}>:</div>
                
                <div className={`h-48 w-20 overflow-y-auto snap-y snap-mandatory scrollbar-hide border-y-2 border-amber-500/30 relative rounded-xl ${theme.inner} shadow-inner`}>
                   {Array.from({ length: 12 }).map((_, i) => {
                      const mStr = String(i * 5).padStart(2, '0');
                      const isSelected = (newTaskTime ? newTaskTime.split(':')[1] : '00') === mStr;
                      return <div key={i} onClick={() => handleMinuteSelect(mStr)} className={`h-12 flex items-center justify-center snap-center cursor-pointer text-2xl font-mono transition-all ${isSelected ? 'text-amber-500 font-black scale-125 bg-amber-500/10' : `${theme.textMuted} hover:${theme.text}`}`}>{mStr}</div>
                   })}
                </div>
             </div>
             
             <div className="mt-4 flex gap-3">
                <button onClick={() => { setNewTaskTime(''); setShowTimePicker(false); }} className={`flex-1 py-3 text-sm font-bold ${theme.textMuted} hover:text-red-500 ${theme.inner} border ${theme.border} rounded-xl transition-colors`}>Remover</button>
                <button onClick={() => { if(!newTaskTime) setNewTaskTime('12:00'); setShowTimePicker(false); }} className="flex-1 py-3 text-sm font-bold text-white bg-amber-500 hover:bg-amber-400 rounded-xl transition-colors shadow-lg">Confirmar</button>
             </div>
          </div>
        </div>
      )}

      {/* MODAL: SELECIONAR HÁBITO PARA CONGELAR */}
      {freezeModalOpen && (
        <div className={`fixed inset-0 ${theme.modalBg} z-[100] flex justify-center items-center p-6 backdrop-blur-sm animate-in fade-in duration-300`}>
          <div className={`${theme.panel} border ${theme.border} p-6 rounded-3xl w-full max-w-sm shadow-2xl relative overflow-hidden animate-modal-pop`}>
             <div className="absolute -top-10 -right-10 opacity-10"><Snowflake size={120} className="text-cyan-500"/></div>
             <h3 className={`text-xl font-bold ${theme.text} mb-2 relative`}>Selecionar Hábito</h3>
             <p className={`text-sm ${theme.textMuted} mb-4 relative`}>Qual hábito deseja congelar hoje por 500 moedas?</p>
             
             <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
               {habits.filter(h => !h.frozen && !h.completed).length === 0 ? (
                 <p className={`text-center ${theme.textMuted} py-4`}>Nenhum hábito elegível encontrado.</p>
               ) : (
                 habits.filter(h => !h.frozen && !h.completed).map(h => (
                   <button key={h.id} onClick={() => handleBuyFreeze(h.id)} className={`w-full text-left p-3 rounded-xl border ${theme.border} ${theme.inner} hover:${theme.panel} hover:border-cyan-500/50 transition-all text-sm ${theme.text}`}>
                     {h.title}
                   </button>
                 ))
               )}
             </div>
             <button onClick={() => setFreezeModalOpen(false)} className={`w-full py-3 font-bold ${theme.textMuted} hover:${theme.text} transition-colors`}>Cancelar</button>
          </div>
        </div>
      )}

      {/* MODAL: APLICAR CRONOS (TEMPO EXTRA) */}
      {cronosModalOpen && (
        <div className={`fixed inset-0 ${theme.modalBg} z-[100] flex justify-center items-center p-6 backdrop-blur-sm animate-in fade-in duration-300`}>
          <div className={`${theme.panel} border ${theme.border} p-6 rounded-3xl w-full max-w-sm shadow-2xl relative overflow-hidden animate-modal-pop`}>
             <div className="absolute -top-10 -right-10 opacity-10"><Hourglass size={120} className="text-indigo-500"/></div>
             <h3 className={`text-xl font-bold ${theme.text} mb-2 relative`}>Atrasar Prazo</h3>
             <p className={`text-sm ${theme.textMuted} mb-4 relative`}>Qual tarefa receberá +{cronosModalOpen === 'moeda' ? '3 Horas' : '1 Dia'}?</p>
             <div className="space-y-2 mb-6 max-h-60 overflow-y-auto z-10 relative">
               {tasks.filter(t => !t.completed && !t.recurring?.length && !t.isSurprise).length === 0 ? (
                 <p className={`text-center ${theme.textMuted} py-4`}>Nenhuma tarefa com prazo elegível encontrada.</p>
               ) : (
                 tasks.filter(t => !t.completed && !t.recurring?.length && !t.isSurprise).map(t => (
                   <button key={t.id} onClick={() => applyCronosToTask(t.id)} className={`w-full text-left p-3 rounded-xl border ${theme.border} ${theme.inner} hover:${theme.panel} hover:border-indigo-500/50 transition-all text-sm ${theme.text}`}>
                     <span className="font-bold block">{t.title}</span>
                     <span className={`text-[10px] ${theme.textMuted}`}>Atual: {t.deadline ? formatDate(t.deadline) : 'Sem data'} {t.deadlineTime || '23:59'}</span>
                   </button>
                 ))
               )}
             </div>
             <button onClick={() => setCronosModalOpen(null)} className={`w-full py-3 font-bold ${theme.textMuted} hover:${theme.text} transition-colors relative z-10`}>Cancelar</button>
          </div>
        </div>
      )}

      {/* MODAL ÉPICO (DANO CRÍTICO ou SORTE LENDÁRIA) */}
      {epicCritModal && (
        <div className={`fixed inset-0 ${theme.modalBg} z-[200] flex flex-col justify-center items-center p-6 backdrop-blur-md animate-epic animate-in zoom-in-105 duration-500`}>
          <div className="animate-modal-pop w-full flex flex-col items-center relative z-10">
            <div className={`absolute inset-0 ${epicCritModal.type === 'crit' ? 'bg-fuchsia-500/20' : 'bg-pink-500/20'} animate-pulse mix-blend-screen pointer-events-none rounded-full blur-3xl`}></div>
            {epicCritModal.type === 'crit' ? (
               <Sword size={100} className="text-fuchsia-500 mb-8 animate-bounce drop-shadow-[0_0_30px_rgba(217,70,239,0.5)] relative z-10" />
            ) : (
               <Dices size={100} className="text-pink-500 mb-8 animate-bounce drop-shadow-[0_0_30px_rgba(219,39,119,0.5)] relative z-10" />
            )}
            <h1 className={`text-5xl font-black text-transparent bg-clip-text ${epicCritModal.type === 'crit' ? 'bg-gradient-to-r from-fuchsia-500 to-red-500' : 'bg-gradient-to-r from-pink-500 to-yellow-500'} text-center leading-tight mb-4 uppercase relative z-10`}>
              {epicCritModal.type === 'crit' ? 'GOLPE CRÍTICO!' : 'SORTE LENDÁRIA!'}
            </h1>
            <p className={`text-xl ${theme.text} text-center max-w-sm mb-8 font-medium relative z-10`}>
              {epicCritModal.type === 'crit' ? (
                 <>O Espírito Realizador invocou um dano massivo em <br/> "{epicCritModal.taskTitle}"!</>
              ) : (
                 <>Tirou um <strong className="text-pink-500 text-3xl">6</strong> na tarefa especial <br/> "{epicCritModal.taskTitle}"!</>
              )}
            </p>
            <div className={`${theme.panel} border ${epicCritModal.type === 'crit' ? 'border-fuchsia-500/50 text-fuchsia-500' : 'border-pink-500/50 text-pink-500'} p-4 rounded-2xl mb-8 shadow-lg relative z-10`}>
              <p className="font-mono font-bold">XP e Moedas recebem {epicCritModal.type === 'crit' ? '+50% (1.5x)' : '6x'} extra!</p>
            </div>
            <button onClick={() => setEpicCritModal(null)} className={`w-full max-w-xs ${epicCritModal.type === 'crit' ? 'bg-gradient-to-r from-fuchsia-500 to-red-500 shadow-[0_0_20px_rgba(217,70,239,0.3)]' : 'bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_20px_rgba(219,39,119,0.3)]'} text-white font-black py-4 rounded-xl hover:scale-105 transition-transform relative z-10`}>
              RESGATAR PODER
            </button>
          </div>
        </div>
      )}

      {/* LOOTBOX CARDS MODAL */}
      {lootboxCardsModal && lootboxRevealed && (
        <div className={`fixed inset-0 ${theme.modalBg} z-[200] flex flex-col justify-center items-center p-6 backdrop-blur-md animate-in fade-in duration-300`}>
           <h2 className="text-3xl font-black text-fuchsia-500 mb-8 uppercase tracking-widest text-center animate-pulse">Escolha uma Carta!</h2>
           <div className="flex gap-4 w-full max-w-md justify-center">
              {lootboxRevealed.map((card, i) => {
                 const isRevealed = selectedLootboxCard === i;
                 const isNotSelected = selectedLootboxCard !== null && selectedLootboxCard !== i;
                 
                 return (
                     <div key={i} onClick={() => handleCardSelect(i, card)} className={`w-28 h-40 rounded-xl border ${theme.border} ${theme.panel} flex flex-col items-center justify-center shadow-xl relative cursor-pointer transition-all duration-500 ${isRevealed ? 'animate-flip-in scale-110 z-10 border-fuchsia-500 shadow-[0_0_30px_rgba(217,70,239,0.3)]' : isNotSelected ? 'opacity-50 grayscale scale-95' : 'hover:scale-105 hover:border-fuchsia-500'}`}>
                        {selectedLootboxCard !== null ? (
                           isRevealed ? (
                              card.type === 'coins' ? <><Coins size={36} className="text-yellow-500 mb-2"/><span className="font-black text-yellow-600 dark:text-yellow-500">+{card.amount}</span></> :
                              card.type === 'xp' ? <><Target size={36} className="text-emerald-500 mb-2"/><span className="font-black text-emerald-600 dark:text-emerald-500">+{card.amount} XP</span></> :
                              <><div className="absolute inset-0 bg-amber-500/10 animate-pulse"></div><Egg size={48} className="text-amber-500 mb-2 relative z-10"/><span className="font-black text-amber-600 dark:text-amber-500 text-xs relative z-10 text-center">OVO MISTERIOSO</span></>
                           ) : (
                              <PackageOpen size={36} className={theme.textMuted} />
                           )
                        ) : (
                           <div className={`absolute inset-0 ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'} flex items-center justify-center rounded-xl bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMmQyZDNmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjM2YzZjQ2IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')]`}>
                               <span className="text-4xl drop-shadow-xl">❓</span>
                           </div>
                        )}
                     </div>
                 );
              })}
           </div>
           {selectedLootboxCard === null && <p className={`mt-8 ${theme.textMuted} text-sm font-medium`}>O destino aguarda a sua decisão...</p>}
        </div>
      )}

      {/* PET HATCH MODAL */}
      {eggHatchModal && (
        <div className={`fixed inset-0 ${theme.modalBg} z-[200] flex flex-col justify-center items-center p-6 backdrop-blur-md animate-in fade-in duration-500`}>
           {eggHatchModal.step === 'cracking' ? (
              <div className="flex flex-col items-center animate-pulse-fast">
                 <h2 className="text-3xl font-black text-amber-500 mb-8 uppercase tracking-widest text-center">Algo está a acontecer...</h2>
                 <div className={`relative w-40 h-40 ${theme.inner} border-4 border-amber-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.5)] overflow-hidden`}>
                    <div className="absolute inset-0 bg-amber-500/20 animate-ping"></div>
                    <Egg size={64} className="text-amber-500 z-10" />
                 </div>
                 <p className={`mt-8 ${theme.textMuted} animate-bounce font-medium`}>A casca está a romper-se...</p>
              </div>
           ) : (
              <div className="flex flex-col items-center animate-modal-pop w-full max-w-sm">
                 <div className="absolute inset-0 bg-amber-500/10 animate-pulse mix-blend-screen pointer-events-none rounded-full blur-3xl"></div>
                 <h2 className="text-3xl font-black text-amber-500 mb-4 uppercase tracking-widest text-center relative z-10">O OVO RACHOU!</h2>
                 <div className={`w-40 h-40 ${theme.inner} border-4 border-amber-500 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.4)] mb-8 animate-slow-reveal relative z-10`}>
                    <span className="text-6xl drop-shadow-xl">{PET_TYPES[eggHatchModal.type]?.emoji}</span>
                 </div>
                 <p className={`text-xl ${theme.text} text-center mb-6 font-medium relative z-10`}>Nasceu um <strong className="text-amber-500">{PET_TYPES[eggHatchModal.type]?.name}</strong>!</p>
                 
                 <input 
                    type="text" 
                    placeholder="Dê um nome ao seu companheiro..." 
                    value={petNameInput}
                    onChange={(e) => setPetNameInput(e.target.value)}
                    className={`w-full ${theme.inner} border border-amber-500/50 rounded-xl px-4 py-3 ${theme.text} text-center mb-6 focus:outline-none focus:border-amber-500 shadow-sm relative z-10`}
                    autoFocus
                 />

                 <button 
                    onClick={() => {
                       const finalName = petNameInput.trim() || PET_TYPES[eggHatchModal.type]?.name || "Companheiro";
                       setUser(prev => ({ ...prev, pet: { type: eggHatchModal.type, customName: finalName, food: 100, fun: 100, clean: 100, love: 100, isDead: false } }));
                       addNotification(`🎉 Diga olá a ${finalName}, o seu novo companheiro!`);
                       setEggHatchModal(null);
                       setPetNameInput('');
                    }} 
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black py-4 px-12 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 transition-transform relative z-10">
                    Salvar e Cuidar
                 </button>
              </div>
           )}
        </div>
      )}
    </div>
  );
}