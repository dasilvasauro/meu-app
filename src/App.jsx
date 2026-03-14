import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  CheckCircle, Circle, Folder, Calendar, Trophy, User, Plus, X, 
  Bell, ChevronUp, ChevronDown, Target, Zap, Clock, Star, Flame, Sparkles,
  ArrowUp, ArrowDown, Minus, ShieldAlert, Award, ShoppingCart, Snowflake, Dices, Coins, Gift, Trash2, ListTodo, RefreshCw, Hourglass, Sword, Shield,
  Swords, Egg, Heart, Utensils, Bath, Gamepad2, PackageOpen, Hammer, Sun, Moon, Ticket, Globe
} from 'lucide-react';

// --- ESTILOS GLOBAIS DE ANIMAÇÃO ---
const GlobalStyles = () => (
  <style>{`
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    .animate-shimmer {
      background-size: 200% auto;
      animation: shimmer 4s linear infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    @keyframes slot-spin {
      0% { transform: translateY(-100%); opacity: 0; }
      50% { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(100%); opacity: 0; }
    }
    .animate-slot-spin {
      animation: slot-spin 0.2s linear infinite;
    }
    
    @keyframes card-glow {
      0% { box-shadow: 0 0 0 rgba(16, 185, 129, 0); }
      50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); border-color: rgba(16, 185, 129, 0.6); }
      100% { box-shadow: 0 0 0 rgba(16, 185, 129, 0); } 
    }
    .animate-card-glow { animation: card-glow 1s ease-out forwards; }
    
    @keyframes pet-glow {
      0% { box-shadow: 0 0 0 rgba(234, 179, 8, 0); }
      50% { box-shadow: 0 0 20px rgba(234, 179, 8, 0.4); border-color: rgba(234, 179, 8, 0.6); }
      100% { box-shadow: 0 0 0 rgba(234, 179, 8, 0); } 
    }
    .animate-pet-glow { animation: pet-glow 1.5s ease-out forwards; }

    @keyframes float-up-fade {
      0% { opacity: 0; transform: translateY(10px) scale(0.8); }
      20% { opacity: 1; transform: translateY(0) scale(1.1); }
      80% { opacity: 1; transform: translateY(-20px) scale(1); }
      100% { opacity: 0; transform: translateY(-30px) scale(0.9); }
    }
    .animate-reward-toast { animation: float-up-fade 2.5s ease-out forwards; }
    
    @keyframes pop-green {
      0% { transform: scale(1); color: #eab308; }
      50% { transform: scale(1.4); color: #4ade80; }
      100% { transform: scale(1); color: #eab308; }
    }
    @keyframes pop-red {
      0% { transform: scale(1); color: #eab308; }
      50% { transform: scale(1.4); color: #f87171; }
      100% { transform: scale(1); color: #eab308; }
    }
    .animate-coin-up { animation: pop-green 0.5s ease-out; }
    .animate-coin-down { animation: pop-red 0.5s ease-out; }
    
    @keyframes fade-slide-up {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-tab-enter { animation: fade-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    
    @keyframes modal-scale-in {
      from { opacity: 0; transform: scale(0.95) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    .animate-modal-pop { animation: modal-scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

    @keyframes slow-reveal {
      0% { filter: brightness(0) blur(15px); transform: scale(0.8); opacity: 0; }
      40% { filter: brightness(0) blur(5px); transform: scale(0.9); opacity: 0.5; }
      100% { filter: brightness(1) blur(0); transform: scale(1); opacity: 1; }
    }
    .animate-slow-reveal { animation: slow-reveal 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
    
    @keyframes pulse-fast {
      0%, 100% { transform: scale(1); filter: brightness(1); }
      50% { transform: scale(1.05); filter: brightness(1.3); }
    }
    .animate-pulse-fast { animation: pulse-fast 0.6s infinite; }

    @keyframes flip-in {
      0% { transform: rotateY(90deg); opacity: 0; }
      100% { transform: rotateY(0deg); opacity: 1; }
    }
    .animate-flip-in { animation: flip-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
    
    /* GRADIENTES SUAVIZADOS */
    .gold-gradient { background: linear-gradient(90deg, rgba(113,63,18,0.2), rgba(250,204,21,0.15), rgba(113,63,18,0.2)); border-color: rgba(250,204,21,0.4); }
    .silver-gradient { background: linear-gradient(90deg, rgba(51,65,85,0.2), rgba(203,213,225,0.15), rgba(51,65,85,0.2)); border-color: rgba(203,213,225,0.4); }
    .bronze-gradient { background: linear-gradient(90deg, rgba(124,45,18,0.2), rgba(249,115,22,0.15), rgba(124,45,18,0.2)); border-color: rgba(249,115,22,0.4); }
    .fuchsia-gradient { background: linear-gradient(90deg, rgba(74,4,78,0.3), rgba(217,70,239,0.2), rgba(74,4,78,0.3)); border-color: rgba(217,70,239,0.5); }
    .blue-gradient { background: linear-gradient(90deg, rgba(30,58,138,0.3), rgba(59,130,246,0.2), rgba(30,58,138,0.3)); border-color: rgba(59,130,246,0.5); }
    
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

    input[type="time"]::-webkit-calendar-picker-indicator,
    input[type="date"]::-webkit-calendar-picker-indicator {
        opacity: 0; width: 100%; height: 100%; position: absolute; top: 0; left: 0; cursor: pointer;
    }
  `}</style>
);

// --- COMPONENTES AUXILIARES ---

const ParticlesBackground = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    resize();
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5;
        this.speedY = Math.random() * 0.5 + 0.1;
        this.opacity = Math.random() * 0.5;
      }
      update() {
        this.y -= this.speedY;
        if (this.y < 0) { this.y = canvas.height; this.x = Math.random() * canvas.width; }
      }
      draw() {
        ctx.fillStyle = isDarkMode ? `rgba(255, 255, 255, ${this.opacity * 0.8})` : `rgba(0, 0, 0, ${this.opacity * 0.3})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const init = () => { for (let i = 0; i < 50; i++) particles.push(new Particle()); };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };
    init(); animate();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
  }, [isDarkMode]);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

const BOTS_NAMES = [
  'd0nk3y_war', 'florian_schneider', 'xX_slayer_Xx', 'neo_matrix', 'cyber_punk99',
  'alpha_wolf', 'beta_tester', 'gamma_ray', 'delta_force', 'epsilon_star',
  'zeta_reticuli', 'theta_prime', 'omega_supreme', 'shadow_hunter', 'light_bringer',
  'dark_knight', 'white_wizard', 'black_panther', 'red_dragon', 'blue_falcon',
  'green_lantern', 'yellow_flash', 'purple_haze', 'silver_surfer', 'gold_digger',
  'crystal_meth', 'diamond_dog', 'ruby_rose', 'sapphire_sky', 'emerald_city',
  'toxic_viper', 'venom_strike', 'blade_runner', 'ghost_face', 'iron_hide',
  'crash_override', 'acid_burn', 'zero_cool', 'pixel_ghost', 'neon_rider',
  'ninja_pro', 'samurai_jack', 'ronin_blade', 'shogun_assassin', 'yakuza_boss'
];

const BOT_EMOJIS = ['🤓','😎','🤖','👻','👽','👾','🤡','🤠','🎃','😈','😺','🦊','🐯','🐸','🐼','🐱','🦁','🐼','🦊','🦄'];
const BOT_PETS = ['bat', 'penguin', 'eagle', 'parrot', 'phoenix', 'dragon'];

const calculateBotLevel = (totalXp) => {
    let lvl = 1;
    let xpLeft = totalXp;
    while(xpLeft >= (500 + (lvl - 1) * 200)) {
        xpLeft -= (500 + (lvl - 1) * 200);
        lvl++;
    }
    return lvl;
};

const generateFakeUsers = (resetMonthly = false) => {
  const users = [];
  for (let i = 0; i < 99; i++) {
    const botMonthlyXp = resetMonthly ? 0 : Math.floor(Math.random() * 2000);
    const totalXp = Math.floor(Math.random() * 80000) + 1000;
    const lvl = calculateBotLevel(totalXp);
    
    const botMedals = [];
    for(let j=0; j < 5; j++) {
       if (Math.random() > 0.6) {
           let type = 'bronze';
           const r = Math.random();
           if (r > 0.95) type = 'plat';
           else if (r > 0.8) type = 'gold';
           else if (r > 0.5) type = 'silver';
           botMedals.push(type);
       }
    }
    
    let pet = null;
    if (lvl >= 10 && Math.random() > 0.4) {
        pet = BOT_PETS[Math.floor(Math.random() * (lvl >= 30 ? 6 : 4))];
    }

    users.push({
      id: `bot-${i}`, 
      name: `${BOTS_NAMES[i % BOTS_NAMES.length]}${Math.floor(Math.random()*99)}`,
      emoji: BOT_EMOJIS[i % BOT_EMOJIS.length],
      monthlyXp: botMonthlyXp, lastMonthlyXp: botMonthlyXp, 
      totalXp: totalXp, level: lvl,
      isUser: false, consistency: Math.random(), grindFactor: Math.random(), 
      medals: botMedals,
      pet: pet,
      activeBuffs: { realizador: Math.random() < 0.15, resguardo: Math.random() < 0.15, duelWin: false, duelLoss: false }
    });
  }
  return users;
};

const countMedals = (medalsArr) => {
  const counts = { plat: 0, gold: 0, silver: 0, bronze: 0 };
  medalsArr.forEach(m => { if(counts[m] !== undefined) counts[m]++; });
  return counts;
};

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
const MONTH_NAMES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const DAY_NAMES = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const formatDate = (dateStr) => {
   if (!dateStr) return '';
   const [y, m, d] = dateStr.split('-');
   return `${d}/${m}/${y}`;
};

const MEDAL_STYLES = {
  plat: 'bg-gradient-to-br from-cyan-300 via-blue-500 to-indigo-600 shadow-[0_0_8px_rgba(56,189,248,0.6)]',
  gold: 'bg-gradient-to-br from-yellow-200 via-yellow-500 to-amber-600 shadow-[0_0_8px_rgba(234,179,8,0.6)]',
  silver: 'bg-gradient-to-br from-slate-100 via-slate-300 to-slate-500',
  bronze: 'bg-gradient-to-br from-orange-400 via-amber-700 to-orange-900'
};

const WEEK_DAYS = [{ l: 'D', v: 0 }, { l: 'S', v: 1 }, { l: 'T', v: 2 }, { l: 'Q', v: 3 }, { l: 'Q', v: 4 }, { l: 'S', v: 5 }, { l: 'S', v: 6 }];

const PET_TYPES = {
  bat: { emoji: '🦇', name: 'Morcego Escuridão' },
  penguin: { emoji: '🐧', name: 'Pinguim do Gelo' },
  eagle: { emoji: '🦅', name: 'Águia do Tempo' },
  parrot: { emoji: '🦜', name: 'Papagaio Saqueador' },
  phoenix: { emoji: '🐦‍🔥', name: 'Fênix Ancestral' },
  dragon: { emoji: '🐉', name: 'Dragão Dourado' }
};

const SLOT_ITEMS = [
   { icon: '💎', name: 'Diamante', pay: 3000, base: 5 },
   { icon: '💰', name: 'Bolsa', pay: 1500, base: 10 },
   { icon: '🪙', name: 'Moeda', pay: 500, base: 15 },
   { icon: '🍎', name: 'Maçã', pay: 200, base: 30 },
   { icon: '🍒', name: 'Cereja', pay: 50, base: 40 }
];

// --- APLICATIVO PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [rankingView, setRankingView] = useState('ranking'); 
  
  // --- INICIALIZAÇÃO DE ESTADOS ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('fq_theme');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fq_user');
    const parsed = saved ? JSON.parse(saved) : null;
    if (parsed) {
        if (!parsed.duelStats) parsed.duelStats = { wins: 0, losses: 0, ties: 0 };
        if (parsed.vouchers === undefined) parsed.vouchers = 0;
        if (parsed.petBuffBonus === undefined) parsed.petBuffBonus = 0;
        if (!parsed.dailyTaskLimits) parsed.dailyTaskLimits = { p1: 0, p2: 0 };
        return parsed;
    }
    return {
      name: 'Você', level: 1, xp: 0, monthlyXp: 0, coins: 5000, vouchers: 5,
      lastMonthlyXp: 0, streak: 0, maxStreakThisMonth: 0, monthDaysElapsed: 0, isUser: true, medals: [],
      activeBuffs: { realizador: false, resguardo: false, criticalUsedToday: false, petBuffUsedToday: false, duelWin: false, duelLoss: false, lastGasp: false },
      dailyTaskLimits: { p1: 0, p2: 0 },
      inventory: { food: 5, soap: 5, toys: 5 },
      pet: null, petBuffBonus: 0,
      xpTowardsLootbox: 0,
      dailyChallengedBots: {},
      duelStats: { wins: 0, losses: 0, ties: 0 }
    };
  });

  const [currentDate, setCurrentDate] = useState(() => {
    const saved = localStorage.getItem('fq_date');
    return saved ? new Date(saved) : new Date();
  });

  const [bots, setBots] = useState(() => {
    const saved = localStorage.getItem('fq_bots');
    return saved ? JSON.parse(saved) : generateFakeUsers(true);
  });

  const [globalFeed, setGlobalFeed] = useState(() => {
    const saved = localStorage.getItem('fq_feed');
    return saved ? JSON.parse(saved) : [];
  });

  const [monthlyStats, setMonthlyStats] = useState(() => {
    const saved = localStorage.getItem('fq_mstats');
    return saved ? JSON.parse(saved) : { tasks: 0, habits: 0 };
  });

  const [folders, setFolders] = useState(() => {
    const saved = localStorage.getItem('fq_folders');
    return saved ? JSON.parse(saved) : ['Geral', 'Trabalho', 'Estudos'];
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('fq_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('fq_habits');
    return saved ? JSON.parse(saved) : [];
  });

  // --- EFEITOS PARA SALVAR NO LOCAL STORAGE AUTOMATICAMENTE ---
  useEffect(() => { localStorage.setItem('fq_theme', JSON.stringify(isDarkMode)); }, [isDarkMode]);
  useEffect(() => { localStorage.setItem('fq_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('fq_date', currentDate.toISOString()); }, [currentDate]);
  useEffect(() => { localStorage.setItem('fq_bots', JSON.stringify(bots)); }, [bots]);
  useEffect(() => { localStorage.setItem('fq_feed', JSON.stringify(globalFeed)); }, [globalFeed]);
  useEffect(() => { localStorage.setItem('fq_mstats', JSON.stringify(monthlyStats)); }, [monthlyStats]);
  useEffect(() => { localStorage.setItem('fq_folders', JSON.stringify(folders)); }, [folders]);
  useEffect(() => { localStorage.setItem('fq_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('fq_habits', JSON.stringify(habits)); }, [habits]);

  // --- CONTROLO DA MEIA-NOITE ---
  const [realDate, setRealDate] = useState(new Date());
  const [forceAdvanceModal, setForceAdvanceModal] = useState(false);
  const [isProcessingDay, setIsProcessingDay] = useState(false);

  useEffect(() => {
     const intervalId = setInterval(() => {
         const now = new Date();
         if (now.getDate() !== realDate.getDate() || now.getMonth() !== realDate.getMonth()) {
             setForceAdvanceModal(true);
             setRealDate(now);
         }
     }, 60000); 
     return () => clearInterval(intervalId);
  }, [realDate]);

  // --- VARIÁVEIS DE TEMA ---
  const theme = {
    bg: isDarkMode ? 'bg-zinc-900' : 'bg-zinc-50',
    panel: isDarkMode ? 'bg-zinc-800' : 'bg-white',
    inner: isDarkMode ? 'bg-zinc-950' : 'bg-zinc-100',
    border: isDarkMode ? 'border-zinc-700' : 'border-zinc-200',
    text: isDarkMode ? 'text-zinc-100' : 'text-zinc-900',
    textMuted: isDarkMode ? 'text-zinc-400' : 'text-zinc-500',
    btnPrimary: isDarkMode ? 'bg-zinc-200 text-zinc-900 hover:bg-white' : 'bg-zinc-900 text-white hover:bg-zinc-800',
    nav: isDarkMode ? 'bg-zinc-900/95 border-zinc-800' : 'bg-white/95 border-zinc-200 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]',
    modalBg: isDarkMode ? 'bg-zinc-950/80' : 'bg-zinc-200/80',
    cardDone: isDarkMode ? 'bg-zinc-900 opacity-60 grayscale border-zinc-800' : 'bg-zinc-100 opacity-60 grayscale border-zinc-300'
  };

  // --- ESTADOS DE UI E MODAIS ---
  const [coinAnim, setCoinAnim] = useState(null);
  const prevCoinsRef = useRef(user.coins);
  
  const [showWelcome, setShowWelcome] = useState(true);
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
  
  const [activeDuel, setActiveDuel] = useState(null);
  const [duelResultModal, setDuelResultModal] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  const [itemToDelete, setItemToDelete] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [showAllRanking, setShowAllRanking] = useState(false);
  const [epicCritModal, setEpicCritModal] = useState(null);

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
  const [hasUsedDailyChallenge, setHasUsedDailyChallenge] = useState(false);
  const [hasBonusTaskAvailable, setHasBonusTaskAvailable] = useState(false);

  const [newHabitText, setNewHabitText] = useState('');
  const [newHabitDesc, setNewHabitDesc] = useState(''); 
  const [newHabitType, setNewHabitType] = useState('single');
  const [newHabitTarget, setNewHabitTarget] = useState(3);

  const p1LimitReached = (user.dailyTaskLimits?.p1 || 0) >= 2;
  const p2LimitReached = (user.dailyTaskLimits?.p2 || 0) >= 3;

  useEffect(() => {
    if (user.coins > prevCoinsRef.current) {
      setCoinAnim('up'); setTimeout(() => setCoinAnim(null), 500);
    } else if (user.coins < prevCoinsRef.current) {
      setCoinAnim('down'); setTimeout(() => setCoinAnim(null), 500);
    }
    prevCoinsRef.current = user.coins;
  }, [user.coins]);

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
       const timer = setTimeout(() => setEggHatchModal(prev => ({ ...prev, step: 'revealed' })), 3500);
       return () => clearTimeout(timer);
    }
  }, [eggHatchModal]);

  // --- FUNÇÕES CORE ---
  const showToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(''), 3500); };
  const addNotification = (msg) => setNotifications(prev => [{ id: Date.now(), msg, read: false }, ...prev]);
  const getRequiredXp = (lvl) => 500 + (lvl - 1) * 200;

  const addXpAndCoins = (xpAmount, coinAmount) => {
    setUser(prev => {
      let newXp = prev.xp + xpAmount;
      let newMonthlyXp = Math.max(0, prev.monthlyXp + xpAmount); 
      let newLevel = prev.level;
      let levelChanged = null;

      while (newXp >= getRequiredXp(newLevel)) {
        newXp -= getRequiredXp(newLevel);
        newLevel++;
        levelChanged = 'up';
      }
      while (newXp < 0 && newLevel > 1) {
        newLevel--;
        newXp += getRequiredXp(newLevel);
        levelChanged = 'down';
      }
      if (newXp < 0) newXp = 0;

      if (levelChanged === 'up') setLevelModal({ type: 'up', level: newLevel });
      else if (levelChanged === 'down') setLevelModal({ type: 'down', level: newLevel });

      let newXpTowardsLootbox = prev.xpTowardsLootbox + xpAmount;
      if (newXpTowardsLootbox >= 3000) {
         newXpTowardsLootbox -= 3000;
         setPendingLootboxes(p => p + 1);
         addNotification("🎁 Um novo Baú de Espólios foi encontrado!");
      }

      return { ...prev, xp: newXp, monthlyXp: newMonthlyXp, level: newLevel, coins: Math.max(0, prev.coins + coinAmount), xpTowardsLootbox: newXpTowardsLootbox };
    });
  };

  const handleAddFolder = () => {
    if (newFolderInput.trim() && !folders.includes(newFolderInput.trim()) && newFolderInput.trim() !== 'Todas') {
       setFolders([...folders, newFolderInput.trim()]);
       setActiveFolder(newFolderInput.trim());
    }
    setNewFolderInput(''); setIsAddingFolder(false);
  };

  const addTask = () => {
    if (!newTaskText.trim()) return;
    
    if (newTaskTime && !newTaskDeadline) {
        showToast("⚠️ Adicione uma data antes de definir o horário!");
        return;
    }
    
    let finalPriority = (isDailyChallenge || isBonusTask) ? 'P1' : newTaskPriority;
    let p1Count = user.dailyTaskLimits?.p1 || 0;
    let p2Count = user.dailyTaskLimits?.p2 || 0;
    
    if (!isDailyChallenge && !isBonusTask) {
        if (finalPriority === 'P1') p1Count++;
        if (finalPriority === 'P2') p2Count++;
    }

    if (isDailyChallenge) setHasUsedDailyChallenge(true);
    if (isBonusTask) setHasBonusTaskAvailable(false);

    const folderToSave = activeFolder === 'Todas' ? (folders.length > 0 ? folders[0] : 'Geral') : activeFolder;

    setTasks([{
      id: Date.now(), title: newTaskText, description: newTaskDesc, folder: folderToSave, completed: false,
      deadline: newTaskDeadline || null, deadlineTime: newTaskTime || null,
      recurring: newTaskRecurring, priority: finalPriority,
      isDailyChallenge, isBonusTask, boost: 1, ageInDays: 0, glowAnimation: false, rewardToast: null
    }, ...tasks]); 
    
    setUser(prev => ({...prev, dailyTaskLimits: { p1: p1Count, p2: p2Count }}));
    showToast("✨ Tarefa forjada com sucesso!");

    setNewTaskText(''); setNewTaskDesc(''); setNewTaskDeadline(''); setNewTaskTime(''); 
    setNewTaskRecurring([]); setNewTaskPriority('P4');
    setIsDailyChallenge(false); setIsBonusTask(false);
  };

  const tryPetBuff = (baseXP, baseCoins, task) => {
     let multXp = 1; let multCoins = 1; let triggered = false; let petEmoji = ''; let extraMsg = '';

     if (user.pet && user.pet.type !== 'egg' && !user.pet.isDead && !user.activeBuffs.petBuffUsedToday) {
         const p = user.pet;
         const isHappy = p.food >= 60 && p.fun >= 60 && p.clean >= 60 && p.love >= 60;
         
         if (isHappy && Math.random() < 0.20) { 
             triggered = true;
             petEmoji = PET_TYPES[p.type].emoji;
             setUser(prev => ({...prev, activeBuffs: {...prev.activeBuffs, petBuffUsedToday: true}}));
             
             const bns = user.petBuffBonus || 0;
             switch(p.type) {
                 case 'bat': 
                     multXp = 1.3 + bns + Math.random() * 0.2; 
                     extraMsg = "Chupão XP!"; 
                     break;
                 case 'dragon': 
                     multCoins = 3 + bns; 
                     extraMsg = "Ouro Triplicado!"; 
                     break;
                 case 'phoenix': 
                     multXp = 2 + bns; multCoins = 2 + bns; 
                     extraMsg = "Chamas Críticas!"; 
                     break;
                 case 'parrot': 
                     setPendingLootboxes(prev => prev + 1); 
                     addNotification("🦜 O Papagaio encontrou um baú!");
                     extraMsg = "Lootbox Instantânea!"; 
                     break;
                 case 'eagle':
                     setTasks(cur => cur.map(t => {
                         if(t.deadlineTime && !t.completed) {
                             let [h, m] = t.deadlineTime.split(':');
                             if (parseInt(h) < 23) return { ...t, deadlineTime: `${String(parseInt(h)+1).padStart(2,'0')}:${m}`};
                         }
                         return t;
                     }));
                     extraMsg = "Tempo expandido!";
                     break;
                 case 'penguin':
                     const unfrozen = habits.filter(h => !h.frozen && !h.completed);
                     if(unfrozen.length > 0) {
                         const target = unfrozen[Math.floor(Math.random() * unfrozen.length)];
                         setHabits(cur => cur.map(h => h.id === target.id ? {...h, frozen: true, completed: true} : h));
                         processHabitCompletion(); 
                         extraMsg = "Hábito congelado e concluído!";
                     } else {
                         triggered = false; 
                         setUser(prev => ({...prev, activeBuffs: {...prev.activeBuffs, petBuffUsedToday: false}})); 
                     }
                     break;
             }
         }
     }
     return { multXp, multCoins, triggered, petEmoji, extraMsg };
  };

  const toggleTask = (id) => {
    setTasks(currentTasks => currentTasks.map(t => {
      if (t.id === id) {
        const isCompleting = !t.completed;
        if (isCompleting) {
          const isSpecial = t.isDailyChallenge || t.isBonusTask;
          const baseXP = isSpecial ? 150 : (t.priority === 'P1' ? 50 : t.priority === 'P2' ? 40 : t.priority === 'P3' ? 30 : 20);
          const baseCoins = isSpecial ? 80 : (t.priority === 'P1' ? 60 : t.priority === 'P2' ? 50 : t.priority === 'P3' ? 40 : 30);
          
          let buffMult = 1; let isCrit = false;

          if (user.activeBuffs.lastGasp) buffMult *= 2;
          if (user.activeBuffs.duelWin) buffMult *= 1.15;
          if (user.activeBuffs.duelLoss) buffMult *= 0.85;

          if (user.activeBuffs.realizador) {
             buffMult *= 1.2;
             if (!user.activeBuffs.criticalUsedToday) {
                 let critChance = 0.1;
                 if (t.priority === 'P4' && !isSpecial) critChance = 0.4;
                 else if (t.priority === 'P3') critChance = 0.3;
                 else if (t.priority === 'P2') critChance = 0.2;

                 if (Math.random() < critChance) {
                     buffMult *= 1.5; isCrit = true;
                     setUser(prev => ({...prev, activeBuffs: {...prev.activeBuffs, criticalUsedToday: true}}));
                     setEpicCritModal({ type: 'crit', taskTitle: t.title });
                 }
             }
          }

          const petEffect = tryPetBuff(baseXP, baseCoins, t);

          let depreciation = 1; let lossPercent = 0;
          if (!t.deadline && (!t.recurring || t.recurring.length === 0) && t.ageInDays > 0) {
              lossPercent = Math.min(80, t.ageInDays * 10);
              depreciation = (100 - lossPercent) / 100;
          }

          let finalXP = Math.floor(baseXP * t.boost * buffMult * petEffect.multXp * depreciation);
          let finalCoins = Math.floor(baseCoins * t.boost * buffMult * petEffect.multCoins * depreciation);

          let isLate = false;
          const yyyy = currentDate.getFullYear(); const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); const dd = String(currentDate.getDate()).padStart(2, '0');
          const simDateStr = `${yyyy}-${mm}-${dd}`;

          if (t.recurring && t.recurring.length > 0) {
              if (t.deadlineTime) {
                  const now = new Date();
                  const nowTime = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
                  if (nowTime > t.deadlineTime) isLate = true;
              }
          } else {
              if (t.deadline) {
                  if (simDateStr > t.deadline) isLate = true;
                  else if (simDateStr === t.deadline && t.deadlineTime) {
                      const now = new Date();
                      const nowTime = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
                      if (nowTime > t.deadlineTime) isLate = true;
                  }
              }
          }

          if (isLate) { finalXP = Math.floor(finalXP / 2); finalCoins = Math.floor(finalCoins / 2); }

          addXpAndCoins(finalXP, finalCoins); 
          setMonthlyStats(prev => ({...prev, tasks: prev.tasks + 1}));
          
          setTimeout(() => { setTasks(tasksAfter => tasksAfter.map(task => task.id === id ? { ...task, glowAnimation: false, rewardToast: null } : task)); }, 2500);

          let toastMsg = `+${finalXP} XP | +${finalCoins} Moedas`;
          if (petEffect.triggered) toastMsg = `${petEffect.petEmoji} ${petEffect.extraMsg} ` + toastMsg;
          else if (isCrit) toastMsg = `CRÍTICO! ${toastMsg}`;
          else if (user.activeBuffs.lastGasp) toastMsg = `Último Gás! ${toastMsg}`;
          else if (user.activeBuffs.realizador) toastMsg = `Realizador! ${toastMsg}`;
          if (isLate) toastMsg += ' (Atraso)';

          return { 
            ...t, completed: true, 
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
         if (t && t.completed) {
             deleteTask(id); 
             return;
         }
     }
     setItemToDelete({ id, type });
  };

  const confirmDelete = () => {
     if (itemToDelete.type === 'task') {
         const task = tasks.find(t => t.id === itemToDelete.id);
         if (task) {
             if (task.priority === 'P1' && !task.isDailyChallenge && !task.isBonusTask) {
                 setUser(prev => ({...prev, dailyTaskLimits: { ...prev.dailyTaskLimits, p1: Math.max(0, (prev.dailyTaskLimits?.p1 || 0) - 1) }}));
             } else if (task.priority === 'P2') {
                 setUser(prev => ({...prev, dailyTaskLimits: { ...prev.dailyTaskLimits, p2: Math.max(0, (prev.dailyTaskLimits?.p2 || 0) - 1) }}));
             }
             addXpAndCoins(-30, -10);
             setTasks(currentTasks => currentTasks.filter(t => t.id !== task.id));
             showToast("Tarefa abandonada. Penalidade aplicada.");
         }
     } else {
         addXpAndCoins(-30, -10);
         setHabits(currentHabits => currentHabits.filter(h => h.id !== itemToDelete.id));
         showToast("Hábito abandonado. Penalidade aplicada.");
     }
     setItemToDelete(null);
  };

  const deleteTask = (id) => setTasks(currentTasks => currentTasks.filter(t => t.id !== id));
  
  const clearCompletedTasks = () => setTasks(currentTasks => currentTasks.filter(t => {
      if (activeFolder === 'Todas') return !t.completed;
      if (t.folder === activeFolder) return !t.completed;
      return true;
  }));

  const processHabitCompletion = () => {
     addXpAndCoins(50, 0);
     setMonthlyStats(prev => ({...prev, habits: prev.habits + 1}));
     
     setUser(prev => {
        if (prev.pet && prev.pet.type === 'egg') {
           const newStrikes = prev.pet.strikes + 1;
           if (newStrikes >= 30) {
              let possiblePets = ['bat', 'penguin', 'eagle', 'parrot'];
              if (prev.level >= 30 && Math.random() < 0.25) {
                 possiblePets = Math.random() > 0.5 ? ['phoenix'] : ['dragon'];
              }
              const hatchedType = possiblePets[Math.floor(Math.random() * possiblePets.length)];
              setEggHatchModal({ type: hatchedType, step: 'cracking' });
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
  const handleBuyFreeze = (habitId) => {
    if (user.coins < 500) return showToast("Moedas insuficientes!");
    setUser(prev => ({ ...prev, coins: prev.coins - 500 }));
    setHabits(currentHabits => currentHabits.map(h => h.id === habitId ? { ...h, frozen: true, completed: true } : h));
    processHabitCompletion(); 
    setFreezeModalOpen(false); showToast("Hábito congelado e concluído!");
  };

  const handleBuyBonusTask = () => {
    if (user.coins < 650) return showToast("Moedas insuficientes!");
    if (hasBonusTaskAvailable) return showToast("Já possui uma Tarefa Bónus!");
    setUser(prev => ({ ...prev, coins: prev.coins - 650 }));
    setHasBonusTaskAvailable(true); showToast("Tarefa Bónus desbloqueada!");
  };

  const handleBuyBuff = (type) => {
    const cost = type === 'realizador' ? 400 : 500;
    if (user.coins < cost) return showToast("Moedas insuficientes!");
    if (user.activeBuffs[type]) return showToast(`Espírito já está ativo!`);
    setUser(prev => ({ ...prev, coins: prev.coins - cost, activeBuffs: { ...prev.activeBuffs, [type]: true } }));
    showToast(`O Espírito fluí em si!`);
  };

  const buyPetItem = (item) => {
     if(user.coins < 10) return showToast("Moedas insuficientes!");
     setUser(prev => ({ 
        ...prev, coins: prev.coins - 10, 
        inventory: { ...prev.inventory, [item]: prev.inventory[item] + 1 }
     }));
     showToast("Item comprado!");
  };

  const handleBuyPetEgg = () => {
      if (user.coins < 5000) return showToast("Moedas insuficientes!");
      if (user.pet) return showToast("Você já possui um companheiro ou ovo!");
      setUser(prev => ({ ...prev, coins: prev.coins - 5000, pet: { type: 'egg', strikes: 0 } }));
      showToast("Ovo de Pet Adquirido!");
  };

  const handleBuyLifeHammer = () => {
      if (user.coins < 3000) return showToast("Moedas insuficientes!");
      if (!user.pet || user.pet.type !== 'egg') return showToast("Apenas aplicável a ovos não rachados!");
      
      setUser(prev => ({ ...prev, coins: prev.coins - 3000 }));
      
      let possiblePets = ['bat', 'penguin', 'eagle', 'parrot'];
      if (user.level >= 30 && Math.random() < 0.25) {
         possiblePets = Math.random() > 0.5 ? ['phoenix'] : ['dragon'];
      }
      const hatchedType = possiblePets[Math.floor(Math.random() * possiblePets.length)];
      setEggHatchModal({ type: hatchedType, step: 'cracking' });
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
     setUser(prev => ({ ...prev, coins: prev.coins - (cronosModalOpen === 'moeda' ? 250 : 400) }));
     showToast(`Prazo estendido!`); setCronosModalOpen(null);
  };

  const openCronosModal = (type) => {
     const cost = type === 'moeda' ? 250 : 400;
     if (user.coins < cost) return showToast("Moedas insuficientes!");
     const activeTasks = tasks.filter(t => !t.completed && !t.recurring?.length);
     if (activeTasks.length === 0) return showToast("Nenhuma tarefa elegível!");
     setCronosModalOpen(type);
  };

  const buyVoucherItem = (type) => {
     if (type === 'petBuff') {
         if (user.vouchers < 10) return showToast("Vouchers insuficientes!");
         setUser(p => ({...p, vouchers: p.vouchers - 10, petBuffBonus: (p.petBuffBonus || 0) + 0.05}));
         showToast("Buff permanente do Pet melhorado em 5%!");
     } else if (type === 'lootbox') {
         if (user.vouchers < 10) return showToast("Vouchers insuficientes!");
         setUser(p => ({...p, vouchers: p.vouchers - 10}));
         openLootbox();
     } else if (type === 'lastGasp') {
         if (user.vouchers < 15) return showToast("Vouchers insuficientes!");
         if (user.activeBuffs.lastGasp) return showToast("Último Gás já está ativo!");
         setUser(p => ({...p, vouchers: p.vouchers - 15, activeBuffs: {...p.activeBuffs, lastGasp: true}}));
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
      
      let finalPrizeObj = null;
      let finalReels = [];

      if (isWin) {
         const dChance = 5 + (slotBet - 1);
         const bChance = 10 + (slotBet - 1);
         const cChance = 15 + (slotBet - 1);
         const aChance = 30 + (slotBet - 1);
         
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
             addXpAndCoins(0, payout);
             showToast(`🎉 Ganhou ${payout} Moedas!`);
          }
      }, 3500);
  };

  const openLootbox = () => {
      if(pendingLootboxes <= 0) return;
      setPendingLootboxes(p => Math.max(0, p - 1));
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
      
      setLootboxRevealed(cards);
      setLootboxCardsModal(true);
  };

  const handleCardSelect = (index, card) => {
      if (selectedLootboxCard !== null) return; 
      setSelectedLootboxCard(index);

      if(card.type === 'coins') addXpAndCoins(0, card.amount);
      if(card.type === 'xp') addXpAndCoins(card.amount, 0);
      if(card.type === 'egg') setUser(p => ({...p, pet: { type: 'egg', strikes: 0 }}));

      setTimeout(() => {
          setLootboxCardsModal(false);
      }, 3000);
  };

  const challengeBot = (botId, botName, botEmoji) => {
     if(activeDuel) return showToast("Já tem um duelo ativo ou pendente hoje!");
     if(user.dailyChallengedBots && user.dailyChallengedBots[botId] === 'refused') return showToast(`${botName} já recusou um duelo hoje.`);
     
     const now = new Date();
     now.setMinutes(now.getMinutes() + Math.floor(Math.random() * 45) + 15);
     const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
     
     showToast(`Convite enviado para ${botName} ${botEmoji}. Ele responderá por volta das ${timeStr}.`);
     
     const willAccept = Math.random() <= 0.6;
     const botTarget = bots.find(b => b.id === botId);
     
     setActiveDuel({ 
        botId, botName, botEmoji, pending: true, accepted: false, 
        userDailyXpStart: user.monthlyXp, botDailyXpStart: botTarget.monthlyXp 
     });
     
     setTimeout(() => {
        setActiveDuel(curr => {
           if(!curr || !curr.pending) return curr; 
           if(willAccept) {
              addNotification(`⚔️ ${botName} aceitou o duelo! Acumule mais XP que ele até à meia-noite!`);
              return { ...curr, accepted: true, pending: false };
           } else {
              addNotification(`💨 ${botName} recusou o desafio.`);
              setUser(prev => ({...prev, dailyChallengedBots: {...(prev.dailyChallengedBots || {}), [botId]: 'refused'}}));
              return null;
           }
        });
     }, 4000); 
  };

  const processNextDay = () => {
    setForceAdvanceModal(false);
    setIsProcessingDay(true);

    setTimeout(() => {
        const nextDate = new Date(currentDate);
        nextDate.setDate(nextDate.getDate() + 1);
        setCurrentDate(nextDate);
        
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
              newFeed.push({ id: Math.random(), type: 'pet', text: `${bot.name} adotou um ${PET_TYPES[newPet].name}!`, icon: '🐾' });
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
        
        const completedHabitsCount = habits.filter(h => h.completed).length;
        let earnedVouchers = 0;
        if (completedHabitsCount >= 3) {
            earnedVouchers = 1;
            newFeed.push({ id: Math.random(), type: 'voucher', text: `Você ganhou 1 Voucher por consistência impecável!`, icon: '🎟️' });
        }

        let newGlobalStreak = user.streak;
        let monthMaxStreak = user.maxStreakThisMonth;
        const unfrozenHabits = habits.filter(h => !h.frozen);
        const allHabitsDone = unfrozenHabits.length > 0 && unfrozenHabits.every(h => h.completed);
        
        if (allHabitsDone) {
          newGlobalStreak++;
          if (newGlobalStreak > monthMaxStreak) monthMaxStreak = newGlobalStreak;
          if (newGlobalStreak === 7) newFeed.push({ id: Math.random(), type: 'streak', text: `Você atingiu uma ofensiva de Bronze!`, icon: '🔥' });
          if (newGlobalStreak === 14) newFeed.push({ id: Math.random(), type: 'streak', text: `Você atingiu uma ofensiva de Prata!`, icon: '🔥' });
          if (newGlobalStreak === 23) newFeed.push({ id: Math.random(), type: 'streak', text: `Você atingiu uma ofensiva de Ouro!`, icon: '🔥' });
        } else if (unfrozenHabits.length > 0) {
          let penalty = Math.max(50, 150 - (newGlobalStreak * 5)); 
          if (user.activeBuffs.resguardo) penalty = Math.floor(penalty * 0.6);
          
          let fenixSaved = false;
          if (user.pet && user.pet.type === 'phoenix' && !user.pet.isDead && !user.phoenixUsedThisMonth) {
             fenixSaved = true;
             setUser(p => ({...p, phoenixUsedThisMonth: true}));
             addNotification("🐦‍🔥 A Fênix ressuscitou a sua ofensiva das cinzas!");
          } else {
             addXpAndCoins(-penalty, 0); 
             newGlobalStreak = 0;
          }
        }

        let nextDayDuelWin = false;
        let nextDayDuelLoss = false;

        if (activeDuel && activeDuel.accepted) {
            const bot = newBots.find(b => b.id === activeDuel.botId);
            const userDiff = user.monthlyXp - activeDuel.userDailyXpStart;
            const botDiff = bot.monthlyXp - activeDuel.botDailyXpStart;
            
            const win = userDiff > botDiff;
            const tie = userDiff === botDiff;
            
            if (win && !tie) {
                addXpAndCoins(500, 200); 
                setUser(prev => ({...prev, duelStats: { ...prev.duelStats, wins: (prev.duelStats?.wins || 0) + 1 }}));
                nextDayDuelWin = true;
                bot.activeBuffs.duelLoss = true;
                newFeed.push({ id: Math.random(), type: 'duel', text: `Você aniquilou ${bot.name} num duelo!`, icon: '⚔️' });
            } else if (tie) {
                setUser(prev => ({...prev, duelStats: { ...prev.duelStats, ties: (prev.duelStats?.ties || 0) + 1 }}));
            } else {
                setUser(prev => ({...prev, duelStats: { ...prev.duelStats, losses: (prev.duelStats?.losses || 0) + 1 }}));
                nextDayDuelLoss = true;
                bot.activeBuffs.duelWin = true;
                newFeed.push({ id: Math.random(), type: 'duel', text: `${bot.name} derrotou-o num duelo!`, icon: '⚔️' });
            }
            
            setDuelResultModal({ botName: activeDuel.botName, botEmoji: activeDuel.botEmoji, win, tie, userDiff, botDiff });
            setActiveDuel(null);
        } else {
            setActiveDuel(null); 
        }
        
        setBots(newBots); 

        let updatedPet = user.pet;
        if (updatedPet && updatedPet.type !== 'egg' && !updatedPet.isDead) {
            let p = { ...updatedPet };
            p.food = Math.max(0, p.food - 20);
            p.fun = Math.max(0, p.fun - 20);
            p.clean = Math.max(0, p.clean - 20);
            p.love = Math.max(0, p.love - 20);
            
            let lowCount = 0;
            if(p.food < 30) lowCount++; if(p.fun < 30) lowCount++; if(p.clean < 30) lowCount++; if(p.love < 30) lowCount++;
            
            if (lowCount >= 2) {
                p.isDead = true;
                addNotification(`🪦 O seu Pet ${PET_TYPES[p.type].name} morreu por falta de cuidados...`);
                newFeed.push({ id: Math.random(), type: 'pet_death', text: `Infelizmente, o companheiro de Você não resistiu...`, icon: '🪦' });
            }
            updatedPet = p;
        }

        setGlobalFeed(prev => [...newFeed, ...prev].slice(0, 50));

        setUser(prev => ({ 
          ...prev, streak: newGlobalStreak, maxStreakThisMonth: monthMaxStreak, vouchers: (prev.vouchers || 0) + earnedVouchers,
          monthDaysElapsed: prev.monthDaysElapsed + 1, lastMonthlyXp: prev.monthlyXp,
          activeBuffs: { realizador: false, resguardo: false, criticalUsedToday: false, petBuffUsedToday: false, lastGasp: false, duelWin: nextDayDuelWin, duelLoss: nextDayDuelLoss },
          dailyTaskLimits: { p1: 0, p2: 0 },
          pet: updatedPet, dailyChallengedBots: {}
        }));

        setHabits(currentHabits => currentHabits.map(h => ({
          ...h, streak: (h.completed || h.frozen) ? (h.frozen ? h.streak : h.streak + 1) : 0,
          current: 0, completed: false, frozen: false 
        })));
        
        setTasks(currentTasks => currentTasks.map(t => {
          let updatedTask = { ...t };
          if (t.recurring && t.recurring.includes(nextDate.getDay())) {
             updatedTask = { ...updatedTask, completed: false, glowAnimation: false, rewardToast: null, isLate: false, isCrit: false, isPetBuff: false };
          }
          if (!t.deadline && (!t.recurring || t.recurring.length === 0) && !t.completed) {
             updatedTask.ageInDays = (updatedTask.ageInDays || 0) + 1;
          }
          return updatedTask;
        }));

        setHasUsedDailyChallenge(false);
        setIsProcessingDay(false);

        if (!activeDuel || !activeDuel.accepted) setShowWelcome(true);

    }, 2500); 
  };

  const simulateNextMonth = () => {
    let newMedal = null;
    const isPerfectMonth = user.maxStreakThisMonth >= 28;
    if (isPerfectMonth) newMedal = 'plat';
    else if (user.maxStreakThisMonth >= 23) newMedal = 'gold';
    else if (user.maxStreakThisMonth >= 14) newMedal = 'silver';
    else if (user.maxStreakThisMonth >= 7) newMedal = 'bronze';

    if (newMedal) setUser(prev => ({ ...prev, medals: [...prev.medals, newMedal] }));

    setHabits(cur => cur.map(h => ({ ...h, streak: 0, current: 0, completed: false, frozen: false })));

    setUser(prev => ({ ...prev, maxStreakThisMonth: 0, monthDaysElapsed: 0, monthlyXp: 0, lastMonthlyXp: 0, phoenixUsedThisMonth: false, dailyChallengedBots: {} }));
    setBots(cur => cur.map(b => ({ ...b, monthlyXp: 0, lastMonthlyXp: 0 })));
    
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

  // --- RENDERIZAÇÃO DAS ABAS ---
  const renderTasks = () => (
    <div className="space-y-6 relative z-10 pb-24">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide items-center">
        <button onClick={() => setActiveFolder('Todas')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1 ${activeFolder === 'Todas' ? theme.btnPrimary : `${theme.panel} border ${theme.border} ${theme.textMuted} hover:${theme.text}`}`}>
          <ListTodo size={14} /> Todas
        </button>
        {folders.map(folder => (
          <button key={folder} onClick={() => setActiveFolder(folder)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeFolder === folder ? theme.btnPrimary : `${theme.panel} border ${theme.border} ${theme.textMuted} hover:${theme.text}`}`}>
            {folder}
          </button>
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

      <div className={`${theme.panel} border ${theme.border} rounded-2xl p-4 backdrop-blur-sm shadow-lg`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text} flex flex-wrap gap-2 items-center justify-between`}>
          Adicionar Tarefa
          <div className="flex gap-2">
            {!hasUsedDailyChallenge && (
              <button onClick={() => { setIsDailyChallenge(!isDailyChallenge); setIsBonusTask(false); setNewTaskRecurring([]); }} className={`text-[10px] px-3 py-1 rounded-full border transition-all flex items-center gap-1 ${isDailyChallenge ? 'fuchsia-gradient text-white animate-shimmer shadow-[0_0_15px_rgba(217,70,239,0.5)] border-transparent' : `${theme.inner} ${theme.textMuted} ${theme.border} hover:text-fuchsia-500`}`}>
                <Sparkles size={12} /> Desafio Diário
              </button>
            )}
            {hasBonusTaskAvailable && (
              <button onClick={() => { setIsBonusTask(!isBonusTask); setIsDailyChallenge(false); setNewTaskRecurring([]); }} className={`text-[10px] px-3 py-1 rounded-full border transition-all flex items-center gap-1 ${isBonusTask ? 'blue-gradient text-white animate-shimmer shadow-[0_0_15px_rgba(59,130,246,0.5)] border-transparent' : `${theme.inner} text-blue-500 ${theme.border} hover:text-blue-600`}`}>
                <Gift size={12} /> Bônus
              </button>
            )}
          </div>
        </h3>
        
        <div className="space-y-3">
          <input type="text" placeholder={(isDailyChallenge || isBonusTask) ? "Qual é o grande objetivo?" : "O que precisa ser feito?"} value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} className={`w-full ${theme.inner} border rounded-xl px-4 py-3 ${theme.text} placeholder-zinc-500 focus:outline-none transition-colors ${isDailyChallenge ? 'border-fuchsia-500/50' : isBonusTask ? 'border-blue-500/50' : theme.border}`} />
          
          <textarea placeholder="Descrição detalhada (opcional)..." value={newTaskDesc} maxLength={800} onChange={(e) => setNewTaskDesc(e.target.value)} className={`w-full ${theme.inner} border ${theme.border} rounded-xl px-4 py-3 text-sm ${theme.text} placeholder-zinc-500 focus:outline-none resize-none h-20`}></textarea>
          
          {!(isDailyChallenge || isBonusTask) && (
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
            <div onClick={() => setShowDatePicker(true)} className={`flex-1 flex items-center ${theme.inner} border rounded-xl px-4 py-3 transition-all cursor-pointer ${isDailyChallenge ? 'border-fuchsia-500/50 shadow-[inset_0_0_10px_rgba(217,70,239,0.1)]' : isBonusTask ? 'border-blue-500/50 shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]' : `${theme.border} hover:border-emerald-500/50`} group`}>
              <Calendar size={16} className={`${newTaskDeadline ? 'text-emerald-500' : `${theme.textMuted} group-hover:text-emerald-500`} mr-2 flex-shrink-0 transition-colors`} />
              <span className={`text-sm ${newTaskDeadline ? theme.text + ' font-medium' : theme.textMuted}`}>{newTaskDeadline ? formatDate(newTaskDeadline) : 'Sem Data'}</span>
            </div>
            
            <div onClick={() => setShowTimePicker(true)} className={`flex-1 flex items-center ${theme.inner} border rounded-xl px-4 py-3 transition-all cursor-pointer ${isDailyChallenge ? 'border-fuchsia-500/50 shadow-[inset_0_0_10px_rgba(217,70,239,0.1)]' : isBonusTask ? 'border-blue-500/50 shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]' : `${theme.border} hover:border-amber-500/50`} group`}>
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
            <button onClick={addTask} className={`w-full py-4 rounded-xl font-black transition-all flex items-center justify-center gap-2 ${isDailyChallenge ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 shadow-[0_0_15px_rgba(217,70,239,0.4)] text-white hover:scale-[1.02]' : isBonusTask ? 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-[0_0_15px_rgba(59,130,246,0.4)] text-white hover:scale-[1.02]' : theme.btnPrimary}`}>
              <Plus size={18} /> Criar Tarefa
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.filter(t => activeFolder === 'Todas' || t.folder === activeFolder).length === 0 ? (
          <div className={`text-center py-10 ${theme.textMuted}`}>
            <CheckCircle size={48} className="mx-auto mb-3 opacity-20" />
            <p>Nenhuma tarefa {activeFolder === 'Todas' ? 'registada' : 'nesta pasta'}.</p>
          </div>
        ) : (
          tasks.filter(t => activeFolder === 'Todas' || t.folder === activeFolder).map(task => {
            let pStyles = { text: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/30', cardBg: theme.panel, xp: 20, coins: 30 };
            if (task.isDailyChallenge) { pStyles = { text: isDarkMode ? 'text-white' : 'text-fuchsia-900', bg: isDarkMode ? 'bg-black/30' : 'bg-white/50', border: 'border-transparent', cardBg: 'fuchsia-gradient animate-shimmer shadow-[0_0_15px_rgba(217,70,239,0.15)]', xp: 150, coins: 80, label: 'DESAFIO' }; }
            else if (task.isBonusTask) { pStyles = { text: isDarkMode ? 'text-white' : 'text-blue-900', bg: isDarkMode ? 'bg-black/30' : 'bg-white/50', border: 'border-transparent', cardBg: 'blue-gradient animate-shimmer shadow-[0_0_15px_rgba(59,130,246,0.15)]', xp: 150, coins: 80, label: 'BÔNUS' }; }
            else if (task.priority === 'P1') pStyles = { text: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30', cardBg: theme.panel, xp: 50, coins: 60, label: 'P1' };
            else if (task.priority === 'P2') pStyles = { text: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30', cardBg: theme.panel, xp: 40, coins: 50, label: 'P2' };
            else if (task.priority === 'P3') pStyles = { text: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', cardBg: theme.panel, xp: 30, coins: 40, label: 'P3' };
            else pStyles.label = 'P4';

            const hasBoost = task.boost > 1;
            const lossPercent = Math.min(80, (task.ageInDays || 0) * 10);
            const isDepreciating = !task.deadline && (!task.recurring || task.recurring.length === 0) && lossPercent > 0;
            
            const cardAnimationClass = task.glowAnimation ? (task.glowAnimation === 'pet-glow' ? 'animate-pet-glow' : 'animate-card-glow') : '';

            return (
              <div key={task.id} className={`flex items-start gap-3 p-4 rounded-xl border transition-all relative ${cardAnimationClass} ${task.completed && !task.glowAnimation ? theme.cardDone : `${pStyles.cardBg} ${pStyles.border}`}`}>
                {task.rewardToast && (
                  <div className={`absolute top-0 right-4 animate-reward-toast ${task.isPetBuff ? 'text-yellow-500' : task.isCrit ? 'text-fuchsia-500' : 'text-emerald-500'} font-bold drop-shadow-md z-20 flex items-center gap-1 ${theme.panel} px-3 py-1.5 rounded-full border ${task.isPetBuff ? 'border-yellow-500/30' : 'border-emerald-500/30'}`}>
                     {!task.isPetBuff && <Sparkles size={14} />} {task.rewardToast}
                  </div>
                )}
                <button onClick={() => toggleTask(task.id)} className={`mt-1 ${task.completed ? 'text-emerald-500' : (task.isDailyChallenge || task.isBonusTask) ? (isDarkMode ? 'text-white/70' : 'text-black/50') : theme.textMuted} flex-shrink-0 transition-colors`}>
                  {task.completed ? <CheckCircle className="text-emerald-500" /> : <Circle />}
                </button>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2 flex-wrap">
                    {(task.isDailyChallenge || task.isBonusTask) && !task.completed && <Sparkles size={14} className={`${isDarkMode ? 'text-white' : 'text-black/50'} animate-pulse flex-shrink-0`} />}
                    <p className={`text-sm ${task.completed ? `line-through ${theme.textMuted}` : theme.text} ${(task.isDailyChallenge || task.isBonusTask) ? 'font-bold' : ''}`}>{task.title}</p>
                    {isDepreciating && !task.completed && <span className={`text-[9px] bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded border border-red-500/30 ml-2 animate-pulse`}>Valor: {100 - lossPercent}%</span>}
                    {activeFolder === 'Todas' && <span className={`text-[9px] ${theme.inner} ${theme.textMuted} border ${theme.border} px-1.5 py-0.5 rounded flex items-center gap-1`}><Folder size={8}/> {task.folder}</span>}
                  </div>
                  
                  {task.description && (
                     <p className={`text-xs ${theme.textMuted} mt-1.5 line-clamp-3 leading-relaxed`}>{task.description}</p>
                  )}

                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${pStyles.bg} ${pStyles.text}`}>{pStyles.label}</span>
                    {task.deadline && <span className={`text-[10px] ${theme.textMuted} ${theme.inner} border ${theme.border} px-1.5 py-0.5 rounded flex items-center gap-1`}><Calendar size={10} /> {formatDate(task.deadline)}</span>}
                    {task.deadlineTime && <span className={`text-[10px] ${task.isLate ? 'text-red-500 bg-red-500/10 border-red-500/30' : `${theme.textMuted} ${theme.inner} border ${theme.border}`} px-1.5 py-0.5 rounded flex items-center gap-1`}><Clock size={10} /> {task.deadlineTime}</span>}
                    {task.recurring && task.recurring.length > 0 && <span className="text-[10px] text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1"><RefreshCw size={10} /> Recorrente</span>}

                    <div className={`flex items-center gap-2 text-[10px] font-medium ${isDarkMode ? 'bg-black/20 text-zinc-300' : 'bg-white/50 text-zinc-700'} px-2 py-0.5 rounded ml-auto sm:ml-0`}>
                      <span>+{Math.floor(pStyles.xp * task.boost * (isDepreciating ? (100 - lossPercent)/100 : 1))} XP</span>
                      <span className="flex items-center text-yellow-600">+{Math.floor(pStyles.coins * task.boost * (isDepreciating ? (100 - lossPercent)/100 : 1))} <Coins size={10} className="ml-0.5" /></span>
                    </div>
                    {hasBoost && !task.completed && <span className="text-[10px] font-black bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-2 py-0.5 rounded animate-float shadow-sm">{task.boost}x BOOST</span>}
                  </div>
                </div>
                <button onClick={() => handleDeleteClick(task.id, 'task')} className={`p-2 rounded-lg ${(task.isDailyChallenge || task.isBonusTask) ? (isDarkMode ? 'text-white/50' : 'text-black/50') : theme.textMuted} hover:text-red-500`}><X size={16} /></button>
              </div>
            );
          })
        )}
        {tasks.some(t => t.completed && (activeFolder === 'Todas' || t.folder === activeFolder)) && (
          <div className="flex justify-center pt-2">
            <button onClick={clearCompletedTasks} className={`text-xs ${theme.textMuted} hover:text-red-500 transition-colors flex items-center gap-1 ${theme.inner} border ${theme.border} px-4 py-2 rounded-full`}><Trash2 size={12} /> Limpar Tarefas Concluídas</button>
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
              <select value={newHabitType} onChange={(e) => setNewHabitType(e.target.value)} className={`${theme.inner} border ${theme.border} rounded-xl px-4 py-3 ${theme.text} focus:outline-none flex-1 text-sm`}>
                <option value="single">Check Único</option>
                <option value="count">Contagem Diária</option>
              </select>
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
             <p className="text-emerald-600 dark:text-emerald-500 text-[10px] font-bold uppercase tracking-wider mb-1">Vouchers (Premium)</p>
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

            <div className={`${theme.panel} border border-emerald-500/30 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden group`}>
              <div className={`w-16 h-16 rounded-xl ${theme.inner} flex items-center justify-center flex-shrink-0 border border-emerald-500/30`}>
                <PackageOpen size={32} className="text-fuchsia-500" />
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold ${theme.text} mb-1`}>Lootbox Instantânea</h3>
                <p className={`text-xs ${theme.textMuted} leading-relaxed`}>Não quer esperar pelos 3000 XP? Compre uma Lootbox e tente a sorte agora mesmo.</p>
              </div>
              <button onClick={() => buyVoucherItem('lootbox')} className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                10 <Ticket size={16} />
              </button>
            </div>

            <div className={`${theme.panel} border border-emerald-500/30 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden group`}>
              <div className={`w-16 h-16 rounded-xl ${theme.inner} flex items-center justify-center flex-shrink-0 border border-emerald-500/30`}>
                <Zap size={32} className="text-yellow-500" />
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold ${theme.text} mb-1`}>Último Gás</h3>
                <p className={`text-xs ${theme.textMuted} leading-relaxed`}>Ativa um multiplicador x2 em TODAS as tarefas concluídas no dia de hoje.</p>
              </div>
              <button onClick={() => buyVoucherItem('lastGasp')} disabled={user.activeBuffs.lastGasp} className={`w-full sm:w-auto font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all ${user.activeBuffs.lastGasp ? `${theme.inner} ${theme.textMuted}` : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'}`}>
                {user.activeBuffs.lastGasp ? 'Ativo' : <><Ticket size={16} /> 15</>}
              </button>
            </div>

            <div className={`${theme.panel} border border-pink-500/50 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden group shadow-[0_0_20px_rgba(236,72,153,0.1)]`}>
              <div className="absolute inset-0 bg-pink-500/5 animate-pulse"></div>
              <div className={`w-16 h-16 rounded-xl ${theme.inner} flex items-center justify-center flex-shrink-0 border border-pink-500/50 z-10`}>
                <Dices size={32} className="text-pink-500" />
              </div>
              <div className="flex-1 z-10">
                <h3 className={`text-lg font-bold ${theme.text} mb-1`}>Giro da Sorte</h3>
                <p className={`text-xs ${theme.textMuted} leading-relaxed`}>O Cassino Vouchers. Arrisque para multiplicar os ganhos. Prémio máximo: Diamante (3000 Moedas).</p>
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

      <h2 className={`text-sm font-black ${theme.textMuted} uppercase tracking-widest mb-4 flex items-center gap-2`}><Coins size={16}/> Loja Clássica</h2>

      <div className="grid gap-4">
        {/* PET CARE ITEMS */}
        {user.pet && user.pet.type !== 'egg' && !user.pet.isDead && (
          <div className={`${theme.panel} border border-amber-500/30 p-4 rounded-2xl flex flex-wrap gap-2 items-center justify-between shadow-[inset_0_0_20px_rgba(217,119,6,0.1)]`}>
             <div className="flex-1 w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">
                <h3 className="text-sm font-bold text-amber-500 flex items-center gap-1"><ShoppingCart size={14}/> Pet Shop</h3>
             </div>
             <button onClick={() => buyPetItem('food')} className={`flex-1 ${theme.inner} border ${theme.border} ${theme.text} hover:${theme.panel} py-2 px-3 rounded-lg text-xs transition-colors flex flex-col items-center`}>
                <Utensils size={16} className="text-amber-500 mb-1"/> <span>10 <Coins size={10} className="inline"/></span>
             </button>
             <button onClick={() => buyPetItem('soap')} className={`flex-1 ${theme.inner} border ${theme.border} ${theme.text} hover:${theme.panel} py-2 px-3 rounded-lg text-xs transition-colors flex flex-col items-center`}>
                <Bath size={16} className="text-cyan-500 mb-1"/> <span>10 <Coins size={10} className="inline"/></span>
             </button>
             <button onClick={() => buyPetItem('toys')} className={`flex-1 ${theme.inner} border ${theme.border} ${theme.text} hover:${theme.panel} py-2 px-3 rounded-lg text-xs transition-colors flex flex-col items-center`}>
                <Gamepad2 size={16} className="text-pink-500 mb-1"/> <span>10 <Coins size={10} className="inline"/></span>
             </button>
          </div>
        )}

        {/* Itens Essenciais Pet */}
        <div className={`${theme.panel} border ${theme.border} p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden group`}>
          <div className={`w-16 h-16 rounded-xl ${theme.inner} flex items-center justify-center flex-shrink-0 border border-amber-500/30`}>
            <Egg size={32} className="text-amber-500" />
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${theme.text} mb-1`}>Ovo de Pet</h3>
            <p className={`text-xs ${theme.textMuted} leading-relaxed`}>Não está com sorte nos baús? Adquira um ovo misterioso diretamente da loja para chocar um companheiro de vida.</p>
          </div>
          <button onClick={handleBuyPetEgg} className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            5000 <Coins size={16} />
          </button>
        </div>

        <div className={`${theme.panel} border ${theme.border} p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden group`}>
          <div className={`w-16 h-16 rounded-xl ${theme.inner} flex items-center justify-center flex-shrink-0 border border-red-500/30`}>
            <Hammer size={32} className="text-red-500" />
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${theme.text} mb-1`}>Martelo da Vida</h3>
            <p className={`text-xs ${theme.textMuted} leading-relaxed`}>Impaciente? Destrua a casca do seu ovo de estimação imediatamente, ignorando a necessidade de concluir hábitos.</p>
          </div>
          <button onClick={handleBuyLifeHammer} className="w-full sm:w-auto bg-red-500 hover:bg-red-400 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            3000 <Coins size={16} />
          </button>
        </div>

        {/* Buffs / Espíritos */}
        <div className={`${theme.panel} border ${theme.border} p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden group`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-3xl group-hover:bg-fuchsia-500/20 transition-all"></div>
          <div className={`w-16 h-16 rounded-xl ${theme.inner} flex items-center justify-center flex-shrink-0 border border-fuchsia-500/30 z-10`}>
            <Sword size={32} className="text-fuchsia-500" />
          </div>
          <div className="flex-1 z-10">
            <h3 className={`text-lg font-bold ${theme.text} mb-1`}>Espírito Realizador</h3>
            <p className={`text-xs ${theme.textMuted} leading-relaxed`}>Aumenta os prêmios em 20% hoje. Permite desferir 1 Dano Crítico por dia (+50% Buff extra) com chance maior em tarefas fáceis.</p>
          </div>
          <button onClick={() => handleBuyBuff('realizador')} disabled={user.activeBuffs.realizador} className={`w-full sm:w-auto z-10 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all ${user.activeBuffs.realizador ? `${theme.inner} ${theme.textMuted}` : 'bg-fuchsia-500 hover:bg-fuchsia-400 text-white shadow-[0_0_15px_rgba(192,38,211,0.3)]'}`}>
            {user.activeBuffs.realizador ? 'Ativo' : <><Coins size={16} /> 400</>}
          </button>
        </div>

        <div className={`${theme.panel} border ${theme.border} p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden group`}>
          <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>
          <div className={`w-16 h-16 rounded-xl ${theme.inner} flex items-center justify-center flex-shrink-0 border border-cyan-500/30 z-10`}>
            <Shield size={32} className="text-cyan-500" />
          </div>
          <div className="flex-1 z-10">
            <h3 className={`text-lg font-bold ${theme.text} mb-1`}>Espírito de Resguardo</h3>
            <p className={`text-xs ${theme.textMuted} leading-relaxed`}>Diminui os efeitos negativos (XP/Moedas perdidas) ao falhar um hábito ou tarefa na virada de dia em 40%. Dura 1 dia.</p>
          </div>
          <button onClick={() => handleBuyBuff('resguardo')} disabled={user.activeBuffs.resguardo} className={`w-full sm:w-auto z-10 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all ${user.activeBuffs.resguardo ? `${theme.inner} ${theme.textMuted}` : 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'}`}>
            {user.activeBuffs.resguardo ? 'Ativo' : <><Coins size={16} /> 500</>}
          </button>
        </div>

        {/* Manipulação de Tempo */}
        <div className={`${theme.panel} border ${theme.border} p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden group`}>
          <div className={`w-16 h-16 rounded-xl ${theme.inner} flex items-center justify-center flex-shrink-0 border border-indigo-500/30`}>
            <Hourglass size={32} className="text-indigo-500" />
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${theme.text} mb-1`}>Moeda de Cronos</h3>
            <p className={`text-xs ${theme.textMuted} leading-relaxed`}>Manipule o tempo. Adiciona mais 3 horas ao prazo de uma tarefa específica para evitar penalidades de atraso.</p>
          </div>
          <button onClick={() => openCronosModal('moeda')} className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            250 <Coins size={16} />
          </button>
        </div>

        <div className={`${theme.panel} border ${theme.border} p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden group`}>
          <div className={`w-16 h-16 rounded-xl ${theme.inner} flex items-center justify-center flex-shrink-0 border border-violet-500/30`}>
            <Calendar size={32} className="text-violet-500" />
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${theme.text} mb-1`}>Medalha de Cronos</h3>
            <p className={`text-xs ${theme.textMuted} leading-relaxed`}>Magia temporal poderosa. Adiciona um dia inteiro extra ao prazo estipulado de uma tarefa.</p>
          </div>
          <button onClick={() => openCronosModal('medalha')} className="w-full sm:w-auto bg-violet-500 hover:bg-violet-400 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            400 <Coins size={16} />
          </button>
        </div>

        {/* Itens Clássicos */}
        <div className={`${theme.panel} border ${theme.border} p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden group`}>
          <div className={`w-16 h-16 rounded-xl ${theme.inner} flex items-center justify-center flex-shrink-0 border border-sky-500/30`}>
            <Snowflake size={32} className="text-sky-500" />
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${theme.text} mb-1`}>Congelamento</h3>
            <p className={`text-xs ${theme.textMuted} leading-relaxed`}>Escolha um hábito para congelar hoje. Ele contará como concluído magicamente e a sua ofensiva ficará intacta.</p>
          </div>
          <button onClick={() => setFreezeModalOpen(true)} className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)]">
            500 <Coins size={16} />
          </button>
        </div>

        <div className={`${theme.panel} border ${theme.border} p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden group`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
          <div className={`w-16 h-16 rounded-xl ${theme.inner} flex items-center justify-center flex-shrink-0 border border-blue-500/30 z-10`}>
            <Gift size={32} className="text-blue-500" />
          </div>
          <div className="flex-1 z-10">
            <h3 className={`text-lg font-bold ${theme.text} mb-1`}>Tarefa Bónus</h3>
            <p className={`text-xs ${theme.textMuted} leading-relaxed`}>Adiciona um espaço extra reluzente no separador de criação. Mesmas recompensas massivas do Desafio Diário.</p>
          </div>
          <button onClick={handleBuyBonusTask} disabled={hasBonusTaskAvailable} className={`w-full sm:w-auto z-10 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all ${hasBonusTaskAvailable ? `${theme.inner} ${theme.textMuted}` : 'bg-blue-500 hover:bg-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'}`}>
            {hasBonusTaskAvailable ? 'Adquirido' : <><Coins size={16} /> 650</>}
          </button>
        </div>
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

          <div className={`${theme.panel} border ${theme.border} rounded-2xl overflow-hidden shadow-lg`}>
            <div className={`p-3 border-b ${theme.border} flex justify-between items-center text-xs text-zinc-500 font-bold uppercase tracking-wider`}>
               <span>Competidor</span>
               <span>XP Mensal</span>
            </div>
            
            {rankingList.slice(0, showAllRanking ? 100 : 50).map((u, index) => {
              const medalCounts = countMedals(u.medals || []);
              const isMe = u.isUser;

              return (
                <div key={u.id} className={`flex items-center gap-3 p-4 border-b ${theme.border} last:border-0 ${isMe ? theme.inner : ''}`}>
                  <span className={`font-mono text-sm w-6 text-center ${index === 0 ? 'text-yellow-500 font-bold' : index === 1 ? 'text-slate-400 font-bold' : index === 2 ? 'text-amber-600 font-bold' : 'text-zinc-500'}`}>{index + 1}</span>
                  <div className="w-4 flex justify-center">
                    {u.trend === 'up' && <ArrowUp size={14} className="text-emerald-500" />}
                    {u.trend === 'down' && <ArrowDown size={14} className="text-red-500" />}
                    {u.trend === 'same' && <Minus size={14} className="text-zinc-400" />}
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xl shadow-inner ${isMe ? 'bg-emerald-500 text-white' : `${theme.inner}`}`}>
                    {isMe ? <User size={20} /> : u.emoji}
                  </div>
                  <div className="flex-1 flex flex-col justify-center truncate">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium truncate ${isMe ? theme.text : theme.textMuted}`}>
                         <span className={`text-[10px] ${theme.inner} ${theme.textMuted} px-1 rounded mr-1`}>Nv {u.level || user.level}</span>
                         {u.name}
                      </p>
                      
                      {u.activeBuffs?.realizador && <Sword size={12} className="text-fuchsia-500 drop-shadow" title="Espírito Realizador Ativo"/>}
                      {u.activeBuffs?.resguardo && <Shield size={12} className="text-cyan-500 drop-shadow" title="Espírito de Resguardo Ativo"/>}
                      {u.activeBuffs?.duelWin && <span className="text-[10px] font-bold text-yellow-500 flex items-center bg-yellow-500/10 px-1 rounded border border-yellow-500/30" title="Buff de Duelo (+15%)">⚔️+</span>}
                      {u.activeBuffs?.duelLoss && <span className="text-[10px] font-bold text-red-500 flex items-center bg-red-500/10 px-1 rounded border border-red-500/30" title="Nerf de Duelo (-15%)">⚔️-</span>}
                      {u.pet && u.pet.type !== 'egg' && !u.pet.isDead && <span className="text-sm drop-shadow" title={`Pet: ${PET_TYPES[u.pet.type]?.name}`}>{PET_TYPES[u.pet.type]?.emoji}</span>}
                      
                      {isMe && <span className="text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full flex-shrink-0">Você</span>}
                    </div>
                    
                    {Object.keys(medalCounts).length > 0 && (
                      <div className="flex gap-2 mt-1.5">
                        {['plat', 'gold', 'silver', 'bronze'].map(mType => {
                           if (!medalCounts[mType]) return null;
                           return (
                              <div key={mType} className="relative flex items-center" title={`${medalCounts[mType]}x ${mType}`}>
                                 <div className={`w-4 h-4 rounded-full ${MEDAL_STYLES[mType]} flex items-center justify-center`}>
                                   <Award size={8} className="text-white drop-shadow-md"/>
                                 </div>
                                 {medalCounts[mType] > 1 && (
                                    <span className="text-[9px] font-bold text-zinc-500 ml-1">x{medalCounts[mType]}</span>
                                 )}
                              </div>
                           )
                        })}
                      </div>
                    )}
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                     <p className={`font-mono text-sm ${theme.text}`}>{u.monthlyXp}</p>
                     {!isMe && (
                        <button onClick={() => challengeBot(u.id, u.name, u.emoji)} className="text-[10px] bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 px-2 py-0.5 rounded flex items-center gap-1 transition-colors">
                          <Swords size={10} /> Desafiar
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

  const renderProfile = () => (
    <div className="space-y-6 relative z-10 pb-24">
      {/* Dev Tools */}
      <div className={`${theme.panel} border border-amber-500/30 rounded-2xl p-4 mb-6 shadow-sm`}>
        <h3 className="text-amber-600 dark:text-amber-500 text-xs font-bold uppercase mb-3 flex items-center gap-2"><Zap size={14} /> Controlos de Simulação</h3>
        <p className={`text-xs mb-3 ${theme.textMuted}`}>Data simulada: {currentDate.toLocaleDateString()}</p>
        <div className="flex gap-2 flex-wrap">
          <button onClick={processNextDay} className={`flex-1 ${theme.inner} hover:${theme.panel} ${theme.text} py-2 px-3 rounded-lg text-sm border ${theme.border} whitespace-nowrap`}>Virar Dia</button>
          <button onClick={simulateNextMonth} className={`flex-1 ${theme.inner} hover:${theme.panel} ${theme.text} py-2 px-3 rounded-lg text-sm border ${theme.border} whitespace-nowrap`}>Virar Mês</button>
          <button onClick={() => { addXpAndCoins(0, 1000); showToast("+1000 Moedas!"); }} className="flex-1 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 dark:text-yellow-500 py-2 px-3 rounded-lg text-sm border border-yellow-500/30 whitespace-nowrap flex items-center justify-center gap-1">
            +1000 <Coins size={14} />
          </button>
          <button onClick={() => addXpAndCoins(3000, 0)} className="w-full bg-fuchsia-500/10 hover:bg-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-400 py-2 px-3 rounded-lg text-sm border border-fuchsia-500/30 whitespace-nowrap flex items-center justify-center gap-1">
            Forçar Lootbox (+3000 XP)
          </button>
          <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-500 py-2 px-3 rounded-lg text-sm border border-red-500/30 whitespace-nowrap flex items-center justify-center gap-1 mt-2">
            Resetar Save (Apagar Tudo)
          </button>
        </div>
      </div>

      {/* ÁREA DO PET E PERFIL */}
      <div className="flex flex-col items-center py-6 relative">
        <div className={`w-24 h-24 ${theme.panel} rounded-full mx-auto border-2 ${theme.border} flex items-center justify-center mb-4 relative z-10 shadow-lg`}>
          <User size={40} className={theme.textMuted} />
          {user.medals.length > 0 && (
             <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 border-white dark:border-black flex items-center justify-center ${MEDAL_STYLES[user.medals[user.medals.length - 1]]}`}>
               <Award size={16} className="text-white drop-shadow" />
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
                    <span className="text-3xl">{PET_TYPES[user.pet.type].emoji}</span>
                 </div>
              )}
           </div>
        )}

        <h2 className={`text-2xl font-bold ${theme.text} mb-1`}>O Seu Perfil</h2>
        <p className={theme.textMuted}>Membro Produtivo</p>
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

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-sans selection:bg-emerald-500/30 overflow-x-hidden transition-colors duration-500`}>
      <GlobalStyles />
      <ParticlesBackground isDarkMode={isDarkMode} />

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
                 {['plat', 'gold', 'silver', 'bronze'].map(mType => {
                    const count = countMedals(user.medals)[mType];
                    if (!count) return null;
                    return (
                       <div key={mType} className={`w-5 h-5 rounded-full ${MEDAL_STYLES[mType]} flex items-center justify-center relative shadow-sm`} title={`${count}x ${mType}`}>
                         <Award size={10} className="text-white drop-shadow-md" />
                         {count > 1 && <span className="absolute -bottom-1 -right-1 text-[8px] bg-zinc-800 text-white px-0.5 rounded font-black border border-zinc-600">{count}</span>}
                       </div>
                    )
                 })}
               </div>
             )}
          </div>
          
          {/* Barra de XP Global */}
          <div className={`w-full ${theme.inner} h-1.5 rounded-full overflow-hidden border ${theme.border} mt-1 relative`}>
            <div className="bg-emerald-500 h-full transition-all duration-1000 ease-out" style={{ width: `${(user.xp / getRequiredXp(user.level)) * 100}%` }} />
            {/* Indicador de Baú na barra de XP */}
            <div className="absolute top-0 bottom-0 left-0 bg-fuchsia-500 h-full transition-all duration-500 opacity-50" style={{ width: `${(user.xpTowardsLootbox / 3000) * 100}%` }}></div>
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
            { id: 'tasks', icon: CheckSquare, label: 'Tarefas' },
            { id: 'habits', icon: Target, label: 'Hábitos' },
            { id: 'store', icon: ShoppingCart, label: 'Loja' },
            { id: 'ranking', icon: Trophy, label: 'Mundo' },
            { id: 'profile', icon: User, label: 'Perfil' }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${isActive ? theme.text : theme.textMuted}`}
              >
                <Icon size={24} className={`mb-1 transition-transform duration-200 ${isActive ? 'scale-110 text-emerald-500' : 'scale-100'}`} />
                <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
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
               {tasks.filter(t => !t.completed && !t.recurring?.length).length === 0 ? (
                 <p className={`text-center ${theme.textMuted} py-4`}>Nenhuma tarefa com prazo elegível encontrada.</p>
               ) : (
                 tasks.filter(t => !t.completed && !t.recurring?.length).map(t => (
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
        <div className={`fixed inset-0 ${theme.modalBg} z-[200] flex flex-col justify-center items-center p-6 backdrop-blur-md animate-in zoom-in-105 duration-500`}>
          <div className="animate-modal-pop w-full flex flex-col items-center">
            <div className={`absolute inset-0 ${epicCritModal.type === 'crit' ? 'bg-fuchsia-500/20' : 'bg-pink-500/20'} animate-pulse mix-blend-screen pointer-events-none`}></div>
            {epicCritModal.type === 'crit' ? (
               <Sword size={100} className="text-fuchsia-500 mb-8 animate-bounce drop-shadow-[0_0_30px_rgba(217,70,239,0.5)]" />
            ) : (
               <Dices size={100} className="text-pink-500 mb-8 animate-bounce drop-shadow-[0_0_30px_rgba(219,39,119,0.5)]" />
            )}
            <h1 className={`text-5xl font-black text-transparent bg-clip-text ${epicCritModal.type === 'crit' ? 'bg-gradient-to-r from-fuchsia-500 to-red-500' : 'bg-gradient-to-r from-pink-500 to-yellow-500'} text-center leading-tight mb-4 uppercase`}>
              {epicCritModal.type === 'crit' ? 'GOLPE CRÍTICO!' : 'SORTE LENDÁRIA!'}
            </h1>
            <p className={`text-xl ${theme.text} text-center max-w-sm mb-8 font-medium`}>
              {epicCritModal.type === 'crit' ? (
                 <>O Espírito Realizador invocou um dano massivo em <br/> "{epicCritModal.taskTitle}"!</>
              ) : (
                 <>Tirou um <strong className="text-pink-500 text-3xl">6</strong> na tarefa especial <br/> "{epicCritModal.taskTitle}"!</>
              )}
            </p>
            <div className={`${theme.panel} border ${epicCritModal.type === 'crit' ? 'border-fuchsia-500/50 text-fuchsia-500' : 'border-pink-500/50 text-pink-500'} p-4 rounded-2xl mb-8 shadow-lg`}>
              <p className="font-mono font-bold">XP e Moedas recebem {epicCritModal.type === 'crit' ? '+50% (1.5x)' : '6x'} extra!</p>
            </div>
            <button onClick={() => setEpicCritModal(null)} className={`w-full max-w-xs ${epicCritModal.type === 'crit' ? 'bg-gradient-to-r from-fuchsia-500 to-red-500 shadow-[0_0_20px_rgba(217,70,239,0.3)]' : 'bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_20px_rgba(219,39,119,0.3)]'} text-white font-black py-4 rounded-xl hover:scale-105 transition-transform`}>
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
                 <div className="absolute inset-0 bg-amber-500/10 animate-pulse mix-blend-screen pointer-events-none"></div>
                 <h2 className="text-3xl font-black text-amber-500 mb-4 uppercase tracking-widest text-center">O OVO RACHOU!</h2>
                 <div className={`w-40 h-40 ${theme.inner} border-4 border-amber-500 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.4)] mb-8 animate-slow-reveal`}>
                    <span className="text-6xl drop-shadow-xl">{PET_TYPES[eggHatchModal.type].emoji}</span>
                 </div>
                 <p className={`text-xl ${theme.text} text-center mb-6 font-medium`}>Nasceu um <strong className="text-amber-500">{PET_TYPES[eggHatchModal.type].name}</strong>!</p>
                 
                 <input 
                    type="text" 
                    placeholder="Dê um nome ao seu companheiro..." 
                    value={petNameInput}
                    onChange={(e) => setPetNameInput(e.target.value)}
                    className={`w-full ${theme.inner} border border-amber-500/50 rounded-xl px-4 py-3 ${theme.text} text-center mb-6 focus:outline-none focus:border-amber-500 shadow-sm`}
                    autoFocus
                 />

                 <button 
                    onClick={() => {
                       const finalName = petNameInput.trim() || PET_TYPES[eggHatchModal.type].name;
                       setUser(prev => ({ ...prev, pet: { type: eggHatchModal.type, customName: finalName, food: 100, fun: 100, clean: 100, love: 100, isDead: false } }));
                       addNotification(`🎉 Diga olá a ${finalName}, o seu novo companheiro!`);
                       setEggHatchModal(null);
                       setPetNameInput('');
                    }} 
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black py-4 px-12 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 transition-transform">
                    Salvar e Cuidar
                 </button>
              </div>
           )}
        </div>
      )}

      {/* PET CARE MODAL */}
      {petCareModal && user.pet && user.pet.type !== 'egg' && (
        <div className={`fixed inset-0 ${theme.modalBg} z-[150] flex flex-col justify-center items-center p-6 backdrop-blur-sm animate-in fade-in duration-200`}>
          <div className={`${theme.panel} border-2 ${theme.border} p-6 rounded-3xl w-full max-w-sm shadow-2xl relative overflow-hidden animate-modal-pop flex flex-col items-center`}>
             <button onClick={() => setPetCareModal(false)} className={`absolute top-4 right-4 ${theme.textMuted} hover:text-red-500`}><X size={20}/></button>
             
             <h3 className={`text-xl font-black ${theme.text} mb-1 uppercase tracking-wider text-center`}>{user.pet.customName || PET_TYPES[user.pet.type].name}</h3>
             <p className={`text-xs ${theme.textMuted} mb-6 text-center`}>Espécie: {PET_TYPES[user.pet.type].name} | Mantenha os status &gt; 60%</p>
             
             <div className={`w-28 h-28 ${theme.inner} border-4 ${theme.border} rounded-full flex items-center justify-center shadow-inner mb-6 relative`}>
                 <span className="text-6xl">{PET_TYPES[user.pet.type].emoji}</span>
                 {user.pet.isDead && <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center"><span className="text-4xl">🪦</span></div>}
             </div>

             <div className="w-full space-y-3 mb-6">
                {[
                  { label: 'Fome', val: user.pet.food, icon: Utensils, col: 'bg-orange-500', bg:'bg-orange-500/20 text-orange-600 dark:text-orange-400', inv: 'food', text: 'Comida' },
                  { label: 'Diversão', val: user.pet.fun, icon: Gamepad2, col: 'bg-pink-500', bg:'bg-pink-500/20 text-pink-600 dark:text-pink-400', inv: 'toys', text: 'Brinquedo' },
                  { label: 'Limpeza', val: user.pet.clean, icon: Bath, col: 'bg-cyan-500', bg:'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400', inv: 'soap', text: 'Sabão' },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-3">
                     <s.icon size={16} className={theme.textMuted} />
                     <div className={`flex-1 ${theme.inner} h-3 rounded-full border ${theme.border} overflow-hidden relative`}>
                        <div className={`h-full ${s.col} transition-all`} style={{width:`${s.val}%`}}></div>
                     </div>
                     <button 
                        onClick={() => {
                           if(user.pet.isDead) return;
                           if(user.inventory[s.inv] > 0) {
                              setUser(p => ({...p, inventory: {...p.inventory, [s.inv]: p.inventory[s.inv]-1}, pet: {...p.pet, [s.inv === 'toys'?'fun':s.inv==='soap'?'clean':'food']: Math.min(100, p.pet[s.inv === 'toys'?'fun':s.inv==='soap'?'clean':'food'] + 30)}}));
                              showToast(`${s.label} aumentada!`);
                           } else showToast(`Sem ${s.text} no inventário. Compre na Loja!`);
                        }}
                        className={`text-[9px] font-bold px-2 py-1 rounded ${s.bg} whitespace-nowrap`}
                     >
                       Usar {s.text} ({user.inventory[s.inv]})
                     </button>
                  </div>
                ))}

                <div className="flex items-center gap-3">
                   <Heart size={16} className={theme.textMuted} />
                   <div className={`flex-1 ${theme.inner} h-3 rounded-full border ${theme.border} overflow-hidden`}>
                      <div className="h-full bg-red-500 transition-all" style={{width:`${user.pet.love}%`}}></div>
                   </div>
                   <button 
                      onClick={() => {
                         if(user.pet.isDead) return;
                         setUser(p => ({...p, pet: {...p.pet, love: Math.min(100, p.pet.love + 15)}}));
                      }}
                      className="text-[9px] font-bold px-2 py-1 rounded bg-red-500/20 text-red-600 dark:text-red-400 whitespace-nowrap"
                   >
                     Fazer Carinho (Grátis)
                   </button>
                </div>
             </div>

             <button onClick={() => setReleasePetModal(true)} className="mt-2 text-xs font-bold text-red-500/70 hover:text-red-500 transition-colors flex items-center gap-1 border border-red-500/20 px-4 py-1.5 rounded-full hover:bg-red-500/10">
                Libertar Pet
             </button>
          </div>
        </div>
      )}

      {/* RELEASE PET CONFIRMATION MODAL */}
      {releasePetModal && (
        <div className={`fixed inset-0 ${theme.modalBg} z-[300] flex flex-col justify-center items-center p-6 backdrop-blur-sm animate-in zoom-in-95 duration-200`}>
           <div className={`${theme.panel} border border-red-500/50 p-6 rounded-3xl w-full max-w-sm shadow-2xl flex flex-col items-center`}>
              <span className="text-5xl mb-4">🥺</span>
              <h3 className={`text-xl font-bold ${theme.text} mb-2 text-center`}>Libertar o Pet?</h3>
              <p className={`text-sm ${theme.textMuted} mb-6 text-center`}>Tem a certeza que deseja libertar o <strong>{user.pet?.customName || "seu companheiro"}</strong> para a natureza? Esta ação é irreversível e perderá todos os vínculos com ele.</p>
              
              <div className="flex gap-3 w-full">
                 <button onClick={() => setReleasePetModal(false)} className={`flex-1 py-3 font-bold ${theme.textMuted} ${theme.inner} hover:${theme.panel} rounded-xl transition-colors`}>Cancelar</button>
                 <button onClick={() => {
                     setUser(prev => ({ ...prev, pet: null }));
                     setReleasePetModal(false);
                     setPetCareModal(false);
                     showToast("O seu pet foi libertado na natureza.");
                 }} className="flex-1 py-3 font-bold text-white bg-red-500 hover:bg-red-400 rounded-xl transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)]">Libertar</button>
              </div>
           </div>
        </div>
      )}

      {/* DUEL RESULT MODAL */}
      {duelResultModal && (
        <div className={`fixed inset-0 ${theme.modalBg} z-[200] flex flex-col justify-center items-center p-6 backdrop-blur-md animate-in zoom-in-105 duration-700 fade-in`}>
           <div className="animate-in slide-in-from-bottom-8 fade-in duration-500 flex flex-col items-center w-full">
             <h2 className={`text-4xl font-black ${theme.text} mb-2 uppercase tracking-widest text-center`}>RESULTADO DO DUELO</h2>
             <p className={`${theme.textMuted} mb-8`}>vs {duelResultModal.botName} {duelResultModal.botEmoji}</p>
             
             <div className="flex gap-8 items-end mb-12">
                 <div className="flex flex-col items-center gap-2">
                    <span className={`text-sm font-bold ${theme.textMuted}`}>O seu XP</span>
                    <span className={`text-4xl font-black ${duelResultModal.win && !duelResultModal.tie ? 'text-emerald-500' : duelResultModal.tie ? 'text-yellow-500' : 'text-red-500'}`}>{duelResultModal.userDiff}</span>
                 </div>
                 <span className={`text-2xl font-black ${theme.textMuted} pb-2`}>X</span>
                 <div className="flex flex-col items-center gap-2">
                    <span className={`text-sm font-bold ${theme.textMuted}`}>{duelResultModal.botName}</span>
                    <span className={`text-4xl font-black ${!duelResultModal.win && !duelResultModal.tie ? 'text-emerald-500' : duelResultModal.tie ? 'text-yellow-500' : theme.textMuted}`}>{duelResultModal.botDiff}</span>
                 </div>
             </div>

             <h1 className={`text-6xl font-black text-transparent bg-clip-text ${duelResultModal.tie ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : duelResultModal.win ? 'bg-gradient-to-r from-emerald-500 to-cyan-500' : 'bg-gradient-to-r from-red-500 to-orange-500'} text-center leading-tight mb-8 uppercase drop-shadow-lg`}>
                {duelResultModal.tie ? 'EMPATE!' : duelResultModal.win ? 'VITÓRIA!' : 'DERROTA...'}
             </h1>
             
             {duelResultModal.win && !duelResultModal.tie && (
                <div className={`${theme.panel} border border-emerald-500/50 text-emerald-600 dark:text-emerald-500 p-4 rounded-2xl mb-8 font-mono font-bold text-center shadow-lg`}>
                   Recompensa Exclusiva:<br/>+500 XP | +200 Moedas
                </div>
             )}
             {duelResultModal.tie && (
                <div className={`${theme.panel} border border-yellow-500/50 text-yellow-600 dark:text-yellow-500 p-4 rounded-2xl mb-8 font-mono font-bold text-center shadow-lg`}>
                   Um duelo equilibrado!<br/>Nenhum lado obteve espólios.
                </div>
             )}

             <button onClick={() => setDuelResultModal(null)} className={`w-full max-w-xs ${theme.btnPrimary} font-black py-4 rounded-xl transition-colors hover:scale-105 duration-200`}>
                Continuar
             </button>
           </div>
        </div>
      )}

      {/* Pop-up Level UP / DOWN */}
      {levelModal && (
        <div className={`fixed inset-0 ${theme.modalBg} z-[100] flex flex-col justify-center items-center p-6 backdrop-blur-md animate-in fade-in duration-300`}>
          <div className={`${theme.panel} border ${theme.border} p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl relative overflow-hidden animate-modal-pop`}>
            <div className={`absolute inset-0 opacity-10 blur-3xl ${levelModal.type === 'up' ? 'bg-emerald-500' : 'bg-red-500'}`} />
            <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center border-4 relative z-10 ${levelModal.type === 'up' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' : 'bg-red-500/10 border-red-500 text-red-500'}`}>
              {levelModal.type === 'up' ? <Star size={48} className="animate-pulse" /> : <ShieldAlert size={48} />}
            </div>
            <h2 className={`text-3xl font-black ${theme.text} mb-2 relative z-10`}>{levelModal.type === 'up' ? 'LEVEL UP!' : 'LEVEL DOWN'}</h2>
            <p className={`text-sm mb-8 relative z-10 ${theme.textMuted}`}>{levelModal.type === 'up' ? 'O seu esforço está a ser recompensado. Continue a subir!' : 'Perdeu o ritmo. Hora de focar e recuperar o prejuízo!'}</p>
            <div className={`${theme.inner} rounded-xl p-4 mb-8 border ${theme.border} relative z-10`}>
              <p className={`text-xs ${theme.textMuted} uppercase font-bold mb-1`}>O seu novo nível é</p>
              <span className={`text-5xl font-black ${levelModal.type === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>{levelModal.level}</span>
            </div>
            <button onClick={() => setLevelModal(null)} className={`w-full ${theme.btnPrimary} font-bold py-4 rounded-xl relative z-10`}>Continuar</button>
          </div>
        </div>
      )}

      {/* Modal Boas Vindas Diário */}
      {showWelcome && !levelModal && (
        <div className={`fixed inset-0 ${theme.modalBg} z-[90] flex flex-col justify-center items-center p-6 backdrop-blur-sm animate-in fade-in duration-500`}>
          <div className={`${theme.panel} border ${theme.border} p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl animate-modal-pop`}>
            <div className={`w-20 h-20 ${theme.inner} rounded-full mx-auto mb-6 flex items-center justify-center border ${theme.border}`}><Zap size={36} className="text-yellow-500" /></div>
            <h2 className={`text-2xl font-black ${theme.text} mb-2`}>Um novo dia!</h2>
            <p className={`${theme.textMuted} text-sm mb-6`}>"Pequenas vitórias diárias constroem impérios."</p>
            <button onClick={() => setShowWelcome(false)} className={`w-full ${theme.btnPrimary} font-bold py-4 rounded-xl`}>Vamos começar</button>
          </div>
        </div>
      )}

      {/* Modal Reset Mensal */}
      {showMonthlyReset && (
        <div className={`fixed inset-0 ${theme.modalBg} z-[100] flex flex-col justify-center items-center p-6 backdrop-blur-md animate-in fade-in duration-500`}>
          <div className={`${theme.panel} border ${theme.border} p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl relative z-10 backdrop-blur-lg animate-modal-pop`}>
            <Award size={48} className="text-emerald-500 mx-auto mb-6" />
            <h2 className={`text-3xl font-black ${theme.text} mb-2`}>Fim de Mês!</h2>
            <p className={`${theme.textMuted} text-sm mb-8`}>O Ranking Mensal de todos os utilizadores voltou para 0 e a sua ofensiva foi resetada. Boa sorte nesta nova temporada!</p>
            {user.medals.length > 0 && (
              <div className={`mb-6 p-4 border ${theme.border} rounded-xl ${theme.inner}`}>
                <p className={`text-xs ${theme.textMuted} uppercase font-bold mb-3`}>Última Conquista</p>
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${MEDAL_STYLES[user.medals[user.medals.length - 1]]}`}><Award size={32} className="text-white drop-shadow-lg" /></div>
              </div>
            )}
            <button onClick={() => setShowMonthlyReset(false)} className="w-full bg-emerald-500 text-white font-black py-4 rounded-xl hover:bg-emerald-400 transition-colors shadow-lg">Iniciar Novo Mês</button>
          </div>
        </div>
      )}
    </div>
  );
}

function CheckSquare(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="9 11 12 14 22 4"></polyline>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
    </svg>
  );
}