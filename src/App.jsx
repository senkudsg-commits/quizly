import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  Home, PlusCircle, Library as LibraryIcon, Users, Play, BarChart3, User as UserIcon,
  Settings as SettingsIcon, Sun, Moon, Globe, Search, Filter, Trash2, Copy, GripVertical,
  Image as ImageIcon, Video as VideoIcon, Music as MusicIcon, Timer, Star, CheckCircle2,
  XCircle, ChevronRight, ChevronLeft, ChevronDown, Upload, Download, Plus, X, Edit3, Eye,
  Trophy, Medal, Flame, Zap, QrCode, Hash, ArrowUpDown, Shuffle, ToggleLeft, Type as TypeIcon,
  ListChecks, CheckSquare, Rocket, Target, Award, Crown, Sparkles, RefreshCw, Clock, TrendingUp,
  Gamepad2, Skull, LayoutGrid, ClipboardList, FolderOpen, Save, Link2, FileJson, FileSpreadsheet,
  ArrowLeft, MoreVertical, Layers, HelpCircle, Send, PauseCircle
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, Radar
} from "recharts";

/* ============================================================================
   BUZZR — an interactive quiz platform (Kahoot/Quizizz-inspired, original UI)
   Single-file React demo. All data lives in memory + localStorage.
   ============================================================================ */

/* ---------------------------------- utils --------------------------------- */

const uid = (p = "id") => `${p}_${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-3)}`;
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const fmtTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const LS_KEY = "buzzr_state_v1";

/* ------------------------------ i18n strings ------------------------------ */

const STR = {
  en: {
    appName: "BUZZR", tagline: "Make it click.",
    nav_dashboard: "Dashboard", nav_myquizzes: "My Quizzes", nav_create: "Create Quiz",
    nav_library: "Library", nav_join: "Join Game", nav_stats: "Statistics",
    nav_profile: "Profile", nav_settings: "Settings",
    dash_welcome: "Welcome back", dash_sub: "Here's what's happening with your quizzes.",
    dash_totalQuizzes: "Quizzes", dash_totalPlays: "Total plays", dash_avgScore: "Avg. accuracy",
    dash_bestStreak: "Best streak", dash_recent: "Recent quizzes", dash_quickstart: "Quick start",
    dash_createNew: "New quiz", dash_hostGame: "Host a game", dash_joinGame: "Join a game",
    dash_activity: "Weekly activity", dash_typesBreakdown: "Question types used",
    btn_create: "Create quiz", btn_edit: "Edit", btn_play: "Host", btn_duplicate: "Duplicate",
    btn_delete: "Delete", btn_solo: "Solo mode", btn_survival: "Survival mode",
    btn_export: "Export JSON", btn_exportCsv: "Export CSV", btn_import: "Import",
    btn_save: "Save quiz", btn_saved: "Saved", btn_addQuestion: "Add question",
    btn_cancel: "Cancel", btn_next: "Next", btn_back: "Back", btn_start: "Start game",
    btn_use: "Use this quiz", btn_viewResults: "View results", btn_playAgain: "Play again",
    search_placeholder: "Search quizzes…", filter_all: "All", filter_category: "Category",
    filter_difficulty: "Difficulty",
    diff_easy: "Easy", diff_medium: "Medium", diff_hard: "Hard",
    my_empty_title: "No quizzes yet", my_empty_sub: "Create your first quiz to get started.",
    builder_title_create: "Create quiz", builder_title_edit: "Edit quiz",
    builder_quizTitle: "Quiz title", builder_quizDesc: "Description", builder_category: "Category",
    builder_difficulty: "Difficulty", builder_cover: "Cover color", builder_questions: "Questions",
    builder_noQuestions: "No questions yet — add your first one.",
    builder_question: "Question", builder_questionText: "Question text",
    builder_points: "Points", builder_timeLimit: "Time limit (sec)", builder_type: "Type",
    builder_media: "Media (optional)", builder_imageUrl: "Image URL", builder_videoUrl: "Video URL",
    builder_audioUrl: "Audio URL", builder_options: "Answer options", builder_addOption: "Add option",
    builder_correct: "Mark correct", builder_acceptedAnswers: "Accepted answers (one per line)",
    builder_pairs: "Matching pairs", builder_left: "Left", builder_right: "Right", builder_addPair: "Add pair",
    builder_orderItems: "Items (in correct order)", builder_addItem: "Add item",
    builder_pollNote: "Poll questions have no correct answer — just opinions.",
    join_title: "Join a game", join_pin: "Game PIN", join_nickname: "Nickname",
    join_enterPin: "Enter PIN", join_enterNick: "Enter a nickname", join_go: "Enter",
    lobby_title: "Lobby", lobby_waiting: "Waiting for players…", lobby_pin: "PIN",
    lobby_players: "Players", lobby_start: "Start game",
    live_question: "Question", live_of: "of", live_timeLeft: "Time left",
    live_yourAnswer: "Your answer", live_submit: "Submit answer", live_submitted: "Answer locked in",
    live_correct: "Correct!", live_incorrect: "Not quite", live_streak: "Streak",
    live_leaderboard: "Leaderboard", live_continue: "Continue",
    podium_title: "Final results", podium_congrats: "Great game!",
    results_title: "Results", results_perQuestion: "Per-question breakdown",
    results_accuracy: "Accuracy", results_players: "Players",
    stats_title: "Statistics", stats_overview: "Overview", stats_scoreTrend: "Score trend",
    stats_typeDist: "Question type distribution", stats_categoryPerf: "Performance by category",
    stats_topPlayers: "Top players (all-time)",
    profile_title: "Profile", profile_achievements: "Achievements", profile_stats: "Lifetime stats",
    settings_title: "Settings", settings_appearance: "Appearance", settings_theme: "Theme",
    settings_light: "Light", settings_dark: "Dark", settings_language: "Language",
    settings_data: "Data", settings_clearData: "Clear all data", settings_exportAll: "Export all data",
    library_title: "Quiz library", library_sub: "Ready-made quizzes to play or remix.",
    mode_solo: "Solo", mode_survival: "Survival", mode_live: "Live",
    toast_saved: "Quiz saved", toast_deleted: "Quiz deleted", toast_duplicated: "Quiz duplicated",
    toast_imported: "Questions imported", toast_copied: "Copied to clipboard",
    toast_cleared: "All data cleared", toast_invalidPin: "That PIN doesn't match any live game",
  },
  ru: {
    appName: "BUZZR", tagline: "Включай азарт.",
    nav_dashboard: "Главная", nav_myquizzes: "Мои квизы", nav_create: "Создать квиз",
    nav_library: "Библиотека", nav_join: "Присоединиться", nav_stats: "Статистика",
    nav_profile: "Профиль", nav_settings: "Настройки",
    dash_welcome: "С возвращением", dash_sub: "Вот что происходит с вашими квизами.",
    dash_totalQuizzes: "Квизов", dash_totalPlays: "Всего игр", dash_avgScore: "Средняя точность",
    dash_bestStreak: "Лучшая серия", dash_recent: "Недавние квизы", dash_quickstart: "Быстрый старт",
    dash_createNew: "Новый квиз", dash_hostGame: "Запустить игру", dash_joinGame: "Войти в игру",
    dash_activity: "Активность за неделю", dash_typesBreakdown: "Используемые типы вопросов",
    btn_create: "Создать квиз", btn_edit: "Изменить", btn_play: "Запустить", btn_duplicate: "Копировать",
    btn_delete: "Удалить", btn_solo: "Соло режим", btn_survival: "Режим выживания",
    btn_export: "Экспорт JSON", btn_exportCsv: "Экспорт CSV", btn_import: "Импорт",
    btn_save: "Сохранить квиз", btn_saved: "Сохранено", btn_addQuestion: "Добавить вопрос",
    btn_cancel: "Отмена", btn_next: "Далее", btn_back: "Назад", btn_start: "Начать игру",
    btn_use: "Использовать квиз", btn_viewResults: "Смотреть результаты", btn_playAgain: "Играть снова",
    search_placeholder: "Поиск квизов…", filter_all: "Все", filter_category: "Категория",
    filter_difficulty: "Сложность",
    diff_easy: "Легко", diff_medium: "Средне", diff_hard: "Сложно",
    my_empty_title: "Пока нет квизов", my_empty_sub: "Создайте свой первый квиз, чтобы начать.",
    builder_title_create: "Создание квиза", builder_title_edit: "Редактирование квиза",
    builder_quizTitle: "Название квиза", builder_quizDesc: "Описание", builder_category: "Категория",
    builder_difficulty: "Сложность", builder_cover: "Цвет обложки", builder_questions: "Вопросы",
    builder_noQuestions: "Пока нет вопросов — добавьте первый.",
    builder_question: "Вопрос", builder_questionText: "Текст вопроса",
    builder_points: "Очки", builder_timeLimit: "Лимит времени (сек)", builder_type: "Тип",
    builder_media: "Медиа (необязательно)", builder_imageUrl: "Ссылка на изображение", builder_videoUrl: "Ссылка на видео",
    builder_audioUrl: "Ссылка на аудио", builder_options: "Варианты ответа", builder_addOption: "Добавить вариант",
    builder_correct: "Отметить верным", builder_acceptedAnswers: "Допустимые ответы (по одному на строку)",
    builder_pairs: "Пары для сопоставления", builder_left: "Слева", builder_right: "Справа", builder_addPair: "Добавить пару",
    builder_orderItems: "Элементы (в верном порядке)", builder_addItem: "Добавить элемент",
    builder_pollNote: "У опроса нет правильного ответа — только мнения.",
    join_title: "Войти в игру", join_pin: "PIN игры", join_nickname: "Никнейм",
    join_enterPin: "Введите PIN", join_enterNick: "Введите никнейм", join_go: "Войти",
    lobby_title: "Лобби", lobby_waiting: "Ожидание игроков…", lobby_pin: "PIN",
    lobby_players: "Игроки", lobby_start: "Начать игру",
    live_question: "Вопрос", live_of: "из", live_timeLeft: "Осталось времени",
    live_yourAnswer: "Ваш ответ", live_submit: "Отправить ответ", live_submitted: "Ответ зафиксирован",
    live_correct: "Верно!", live_incorrect: "Не совсем", live_streak: "Серия",
    live_leaderboard: "Таблица лидеров", live_continue: "Продолжить",
    podium_title: "Итоги игры", podium_congrats: "Отличная игра!",
    results_title: "Результаты", results_perQuestion: "Разбор по вопросам",
    results_accuracy: "Точность", results_players: "Игроки",
    stats_title: "Статистика", stats_overview: "Обзор", stats_scoreTrend: "Динамика очков",
    stats_typeDist: "Распределение типов вопросов", stats_categoryPerf: "Результаты по категориям",
    stats_topPlayers: "Лучшие игроки (за всё время)",
    profile_title: "Профиль", profile_achievements: "Достижения", profile_stats: "Общая статистика",
    settings_title: "Настройки", settings_appearance: "Внешний вид", settings_theme: "Тема",
    settings_light: "Светлая", settings_dark: "Тёмная", settings_language: "Язык",
    settings_data: "Данные", settings_clearData: "Очистить все данные", settings_exportAll: "Экспорт всех данных",
    library_title: "Библиотека квизов", library_sub: "Готовые квизы — играйте или адаптируйте под себя.",
    mode_solo: "Соло", mode_survival: "Выживание", mode_live: "Прямой эфир",
    toast_saved: "Квиз сохранён", toast_deleted: "Квиз удалён", toast_duplicated: "Квиз скопирован",
    toast_imported: "Вопросы импортированы", toast_copied: "Скопировано",
    toast_cleared: "Все данные очищены", toast_invalidPin: "Игра с таким PIN не найдена",
  },
  kz: {
    appName: "BUZZR", tagline: "Қызықты іске қос.",
    nav_dashboard: "Басты бет", nav_myquizzes: "Менің квиздерім", nav_create: "Квиз құру",
    nav_library: "Кітапхана", nav_join: "Қосылу", nav_stats: "Статистика",
    nav_profile: "Профиль", nav_settings: "Баптаулар",
    dash_welcome: "Қайта келуіңізбен", dash_sub: "Квиздеріңіздегі жаңалықтар осында.",
    dash_totalQuizzes: "Квиздер", dash_totalPlays: "Барлық ойындар", dash_avgScore: "Орташа дәлдік",
    dash_bestStreak: "Ең үздік серия", dash_recent: "Соңғы квиздер", dash_quickstart: "Жылдам бастау",
    dash_createNew: "Жаңа квиз", dash_hostGame: "Ойын бастау", dash_joinGame: "Ойынға қосылу",
    dash_activity: "Апталық белсенділік", dash_typesBreakdown: "Қолданылған сұрақ түрлері",
    btn_create: "Квиз құру", btn_edit: "Өңдеу", btn_play: "Бастау", btn_duplicate: "Көшіру",
    btn_delete: "Жою", btn_solo: "Жеке режим", btn_survival: "Аман қалу режимі",
    btn_export: "JSON экспорт", btn_exportCsv: "CSV экспорт", btn_import: "Импорт",
    btn_save: "Квизді сақтау", btn_saved: "Сақталды", btn_addQuestion: "Сұрақ қосу",
    btn_cancel: "Бас тарту", btn_next: "Келесі", btn_back: "Артқа", btn_start: "Ойынды бастау",
    btn_use: "Осы квизді қолдану", btn_viewResults: "Нәтижелерді көру", btn_playAgain: "Қайта ойнау",
    search_placeholder: "Квиздерді іздеу…", filter_all: "Барлығы", filter_category: "Санат",
    filter_difficulty: "Қиындық",
    diff_easy: "Оңай", diff_medium: "Орташа", diff_hard: "Қиын",
    my_empty_title: "Әзірге квиздер жоқ", my_empty_sub: "Бастау үшін алғашқы квизіңізді жасаңыз.",
    builder_title_create: "Квиз құру", builder_title_edit: "Квизді өңдеу",
    builder_quizTitle: "Квиз атауы", builder_quizDesc: "Сипаттама", builder_category: "Санат",
    builder_difficulty: "Қиындық", builder_cover: "Мұқаба түсі", builder_questions: "Сұрақтар",
    builder_noQuestions: "Әзірге сұрақтар жоқ — біріншісін қосыңыз.",
    builder_question: "Сұрақ", builder_questionText: "Сұрақ мәтіні",
    builder_points: "Ұпайлар", builder_timeLimit: "Уақыт шегі (сек)", builder_type: "Түрі",
    builder_media: "Медиа (міндетті емес)", builder_imageUrl: "Сурет сілтемесі", builder_videoUrl: "Видео сілтемесі",
    builder_audioUrl: "Аудио сілтемесі", builder_options: "Жауап нұсқалары", builder_addOption: "Нұсқа қосу",
    builder_correct: "Дұрыс деп белгілеу", builder_acceptedAnswers: "Қабылданатын жауаптар (әр жолда біреу)",
    builder_pairs: "Сәйкестендіру жұптары", builder_left: "Сол жақ", builder_right: "Оң жақ", builder_addPair: "Жұп қосу",
    builder_orderItems: "Элементтер (дұрыс ретімен)", builder_addItem: "Элемент қосу",
    builder_pollNote: "Сауалнамада дұрыс жауап жоқ — тек пікірлер.",
    join_title: "Ойынға қосылу", join_pin: "Ойын PIN", join_nickname: "Никнейм",
    join_enterPin: "PIN енгізіңіз", join_enterNick: "Никнейм енгізіңіз", join_go: "Кіру",
    lobby_title: "Лобби", lobby_waiting: "Ойыншылар күтілуде…", lobby_pin: "PIN",
    lobby_players: "Ойыншылар", lobby_start: "Ойынды бастау",
    live_question: "Сұрақ", live_of: "/", live_timeLeft: "Уақыт қалды",
    live_yourAnswer: "Сіздің жауабыңыз", live_submit: "Жауапты жіберу", live_submitted: "Жауап бекітілді",
    live_correct: "Дұрыс!", live_incorrect: "Дұрыс емес", live_streak: "Серия",
    live_leaderboard: "Көшбасшылар кестесі", live_continue: "Жалғастыру",
    podium_title: "Ойын қорытындысы", podium_congrats: "Керемет ойын!",
    results_title: "Нәтижелер", results_perQuestion: "Сұрақтар бойынша талдау",
    results_accuracy: "Дәлдік", results_players: "Ойыншылар",
    stats_title: "Статистика", stats_overview: "Шолу", stats_scoreTrend: "Ұпай динамикасы",
    stats_typeDist: "Сұрақ түрлерінің үлесі", stats_categoryPerf: "Санаттар бойынша нәтиже",
    stats_topPlayers: "Үздік ойыншылар (барлық уақыт)",
    profile_title: "Профиль", profile_achievements: "Жетістіктер", profile_stats: "Жалпы статистика",
    settings_title: "Баптаулар", settings_appearance: "Сыртқы түрі", settings_theme: "Тақырып",
    settings_light: "Ашық", settings_dark: "Күңгірт", settings_language: "Тіл",
    settings_data: "Деректер", settings_clearData: "Барлық деректерді тазарту", settings_exportAll: "Барлық деректерді экспорттау",
    library_title: "Квиз кітапханасы", library_sub: "Дайын квиздер — ойнаңыз немесе бейімдеңіз.",
    mode_solo: "Жеке", mode_survival: "Аман қалу", mode_live: "Тікелей эфир",
    toast_saved: "Квиз сақталды", toast_deleted: "Квиз жойылды", toast_duplicated: "Квиз көшірілді",
    toast_imported: "Сұрақтар импортталды", toast_copied: "Көшірілді",
    toast_cleared: "Барлық деректер тазартылды", toast_invalidPin: "Мұндай PIN бар ойын табылмады",
  },
};

/* --------------------------------- theme ----------------------------------
   Neo-arcade / gameshow-buzzer identity: thick ink outlines, hard offset
   shadows, flat punchy colors, chunky rounded blocks. No soft SaaS shadows,
   no gradients-as-decoration, no cream+terracotta defaults.
------------------------------------------------------------------------- */

const INK_L = "#15131F";       // near-black ink, light mode text/borders
const PAPER = "#F5F2EA";       // warm paper background (light)
const INK_D = "#0E0D16";       // dark mode background
const PAPER_D = "#1C1A29";     // dark mode surface
const BUZZ = {
  coral: "#FF5C5C",
  citrus: "#FFC53D",
  mint: "#28D9A8",
  violet: "#8B6CFF",
  sky: "#3DB4FF",
  rose: "#FF6FB0",
  paper: "#FFFFFF",
};
const BUZZ_ORDER = ["coral", "citrus", "mint", "violet", "sky", "rose"];
const CATEGORIES = ["General", "Science", "History", "Geography", "Pop Culture", "Sports", "Tech", "Language"];
const CAT_LABELS = { ru: { General:"Общее", Science:"Наука", History:"История", Geography:"География", "Pop Culture":"Культура", Sports:"Спорт", Tech:"Технологии", Language:"Язык" },
  kz: { General:"Жалпы", Science:"Ғылым", History:"Тарих", Geography:"География", "Pop Culture":"Мәдениет", Sports:"Спорт", Tech:"Технология", Language:"Тіл" },
  en: { General:"General", Science:"Science", History:"History", Geography:"Geography", "Pop Culture":"Pop Culture", Sports:"Sports", Tech:"Tech", Language:"Language" } };

const QUESTION_TYPES = [
  { id: "mcq", icon: ListChecks, label: { en: "Multiple Choice", ru: "Один из вариантов", kz: "Бір нұсқа" } },
  { id: "multi", icon: CheckSquare, label: { en: "Multiple Select", ru: "Несколько вариантов", kz: "Бірнеше нұсқа" } },
  { id: "boolean", icon: ToggleLeft, label: { en: "True / False", ru: "Верно / Неверно", kz: "Дұрыс / Бұрыс" } },
  { id: "short", icon: TypeIcon, label: { en: "Short Answer", ru: "Короткий ответ", kz: "Қысқа жауап" } },
  { id: "matching", icon: Shuffle, label: { en: "Matching", ru: "Сопоставление", kz: "Сәйкестендіру" } },
  { id: "ordering", icon: ArrowUpDown, label: { en: "Ordering", ru: "Упорядочивание", kz: "Реттеу" } },
  { id: "poll", icon: BarChart3, label: { en: "Poll", ru: "Опрос", kz: "Сауалнама" } },
];

const BOT_NAMES = ["Nova", "Rex", "Pixel", "Kira", "Zed", "Luma", "Otto", "Mika", "Fizz", "Juno", "Dax", "Vee"];
const AVATAR_EMOJI = ["🦊","🐼","🦉","🐙","🐸","🦁","🐨","🦄","🐳","🐺","🦖","🐝","🦋","🐧","🦈","🐲"];

/* ------------------------------ demo content ------------------------------- */

function mkOpt(text) { return { id: uid("o"), text }; }

function demoQuizzes() {
  const q1 = {
    id: uid("quiz"), title: "World Geography Blitz", description: "Continents, capitals, and curious facts.",
    category: "Geography", difficulty: "medium", cover: "sky", lang: "en", plays: 214, createdAt: Date.now() - 86400000 * 12,
    questions: [
      { id: uid("q"), type: "mcq", text: "Which country has the most time zones?", points: 1000, time: 20,
        options: [mkOpt("Russia"), mkOpt("USA"), mkOpt("France"), mkOpt("China")], correct: [0], image: "" },
      { id: uid("q"), type: "boolean", text: "The Amazon River is longer than the Nile.", points: 500, time: 10,
        correct: false },
      { id: uid("q"), type: "multi", text: "Which of these countries border Germany?", points: 1000, time: 25,
        options: [mkOpt("Poland"), mkOpt("Spain"), mkOpt("Austria"), mkOpt("Italy"), mkOpt("Netherlands")], correct: [0,2,4] },
      { id: uid("q"), type: "short", text: "What is the capital of Kazakhstan?", points: 800, time: 15,
        accepted: ["Astana"] },
      { id: uid("q"), type: "ordering", text: "Order these continents from largest to smallest by area.", points: 1200, time: 30,
        items: ["Asia", "Africa", "North America", "Europe"] },
      { id: uid("q"), type: "matching", text: "Match each capital to its country.", points: 1200, time: 30,
        pairs: [{ left: "Tokyo", right: "Japan" }, { left: "Cairo", right: "Egypt" }, { left: "Ottawa", right: "Canada" }, { left: "Canberra", right: "Australia" }] },
      { id: uid("q"), type: "mcq", text: "Mount Kilimanjaro is located on which continent?", points: 800, time: 15,
        options: [mkOpt("Asia"), mkOpt("Africa"), mkOpt("South America"), mkOpt("Oceania")], correct: [1] },
      { id: uid("q"), type: "poll", text: "Which continent would you most like to visit?", points: 0, time: 15,
        options: [mkOpt("Asia"), mkOpt("Africa"), mkOpt("South America"), mkOpt("Europe")] },
    ],
  };
  const q2 = {
    id: uid("quiz"), title: "Science Sprint", description: "Physics, biology and a bit of chemistry.",
    category: "Science", difficulty: "hard", cover: "mint", lang: "en", plays: 431, createdAt: Date.now() - 86400000 * 30,
    questions: [
      { id: uid("q"), type: "mcq", text: "What is the powerhouse of the cell?", points: 1000, time: 15,
        options: [mkOpt("Nucleus"), mkOpt("Mitochondria"), mkOpt("Ribosome"), mkOpt("Golgi apparatus")], correct: [1] },
      { id: uid("q"), type: "boolean", text: "Light travels faster than sound.", points: 500, time: 10, correct: true },
      { id: uid("q"), type: "short", text: "What planet is known as the Red Planet?", points: 600, time: 12, accepted: ["Mars"] },
      { id: uid("q"), type: "multi", text: "Which of these are noble gases?", points: 1200, time: 25,
        options: [mkOpt("Helium"), mkOpt("Oxygen"), mkOpt("Neon"), mkOpt("Argon"), mkOpt("Nitrogen")], correct: [0,2,3] },
      { id: uid("q"), type: "ordering", text: "Order these from smallest to largest.", points: 1000, time: 25,
        items: ["Atom", "Molecule", "Cell", "Organ"] },
      { id: uid("q"), type: "mcq", text: "What gas do plants absorb from the atmosphere?", points: 800, time: 15,
        options: [mkOpt("Oxygen"), mkOpt("Carbon dioxide"), mkOpt("Nitrogen"), mkOpt("Hydrogen")], correct: [1] },
    ],
  };
  const q3 = {
    id: uid("quiz"), title: "История: Великие открытия", description: "Ключевые события и даты.",
    category: "History", difficulty: "medium", cover: "coral", lang: "ru", plays: 98, createdAt: Date.now() - 86400000 * 5,
    questions: [
      { id: uid("q"), type: "mcq", text: "В каком году произошла Октябрьская революция?", points: 1000, time: 20,
        options: [mkOpt("1905"), mkOpt("1917"), mkOpt("1924"), mkOpt("1939")], correct: [1] },
      { id: uid("q"), type: "boolean", text: "Великий шёлковый путь соединял Азию и Европу.", points: 500, time: 10, correct: true },
      { id: uid("q"), type: "short", text: "Кто открыл Америку в 1492 году?", points: 700, time: 15, accepted: ["Колумб", "Христофор Колумб"] },
      { id: uid("q"), type: "ordering", text: "Расположите события в хронологическом порядке.", points: 1200, time: 30,
        items: ["Падение Рима", "Открытие Америки", "Первая мировая война", "Полёт Гагарина"] },
      { id: uid("q"), type: "poll", text: "Какая эпоха истории вам интереснее всего?", points: 0, time: 15,
        options: [mkOpt("Античность"), mkOpt("Средневековье"), mkOpt("Новое время"), mkOpt("XX век")] },
    ],
  };
  const q4 = {
    id: uid("quiz"), title: "Tech & Gadgets", description: "From CPUs to startups.",
    category: "Tech", difficulty: "easy", cover: "violet", lang: "en", plays: 156, createdAt: Date.now() - 86400000 * 2,
    questions: [
      { id: uid("q"), type: "mcq", text: "What does 'CPU' stand for?", points: 800, time: 15,
        options: [mkOpt("Central Processing Unit"), mkOpt("Computer Personal Unit"), mkOpt("Central Print Utility"), mkOpt("Core Program Unit")], correct: [0] },
      { id: uid("q"), type: "boolean", text: "HTML is a programming language.", points: 500, time: 10, correct: false },
      { id: uid("q"), type: "matching", text: "Match the company to its founder.", points: 1200, time: 30,
        pairs: [{ left: "Apple", right: "Steve Jobs" }, { left: "Microsoft", right: "Bill Gates" }, { left: "Tesla", right: "Elon Musk" }, { left: "Amazon", right: "Jeff Bezos" }] },
      { id: uid("q"), type: "short", text: "What does 'AI' stand for?", points: 600, time: 12, accepted: ["Artificial Intelligence"] },
      { id: uid("q"), type: "poll", text: "Which OS do you use daily?", points: 0, time: 15,
        options: [mkOpt("Windows"), mkOpt("macOS"), mkOpt("Linux"), mkOpt("Mobile only")] },
    ],
  };
  const q5 = {
    id: uid("quiz"), title: "Қазақстан тарихы", description: "Тарихи оқиғалар мен фактілер.",
    category: "History", difficulty: "medium", cover: "citrus", lang: "kz", plays: 63, createdAt: Date.now() - 86400000 * 1,
    questions: [
      { id: uid("q"), type: "mcq", text: "Қазақстан тәуелсіздігін қай жылы жариялады?", points: 1000, time: 20,
        options: [mkOpt("1989"), mkOpt("1991"), mkOpt("1995"), mkOpt("2000")], correct: [1] },
      { id: uid("q"), type: "boolean", text: "Астана — Қазақстанның ең үлкен қаласы.", points: 500, time: 10, correct: false },
      { id: uid("q"), type: "short", text: "Қазақстанның бас қаласы қалай аталады?", points: 700, time: 15, accepted: ["Астана"] },
      { id: uid("q"), type: "poll", text: "Қазақстанның қай өңірін көргіңіз келеді?", points: 0, time: 15,
        options: [mkOpt("Алтай"), mkOpt("Маңғыстау"), mkOpt("Алатау"), mkOpt("Ұлытау")] },
    ],
  };
  const q6 = {
    id: uid("quiz"), title: "Pop Culture Mania", description: "Movies, music and internet culture.",
    category: "Pop Culture", difficulty: "easy", cover: "rose", lang: "en", plays: 512, createdAt: Date.now() - 86400000 * 20,
    questions: [
      { id: uid("q"), type: "mcq", text: "Which streaming platform produced 'Stranger Things'?", points: 800, time: 15,
        options: [mkOpt("Netflix"), mkOpt("Hulu"), mkOpt("HBO"), mkOpt("Disney+")], correct: [0] },
      { id: uid("q"), type: "multi", text: "Which of these are Marvel superheroes?", points: 1000, time: 20,
        options: [mkOpt("Iron Man"), mkOpt("Batman"), mkOpt("Thor"), mkOpt("Superman"), mkOpt("Black Widow")], correct: [0,2,4] },
      { id: uid("q"), type: "boolean", text: "The Beatles were from Liverpool.", points: 500, time: 10, correct: true },
      { id: uid("q"), type: "poll", text: "Best movie genre?", points: 0, time: 15,
        options: [mkOpt("Comedy"), mkOpt("Sci-fi"), mkOpt("Horror"), mkOpt("Drama")] },
    ],
  };
  return [q1, q2, q3, q4, q5, q6];
}

const ACHIEVEMENTS = [
  { id: "first_quiz", icon: Rocket, title: { en:"Liftoff", ru:"Взлёт", kz:"Ұшу" }, desc: { en:"Create your first quiz", ru:"Создайте первый квиз", kz:"Алғашқы квизді жасаңыз" }, check: (s) => s.quizzes.length >= 1 },
  { id: "five_quiz", icon: Layers, title: { en:"Builder", ru:"Конструктор", kz:"Құрастырушы" }, desc: { en:"Create 5 quizzes", ru:"Создайте 5 квизов", kz:"5 квиз жасаңыз" }, check: (s) => s.quizzes.length >= 5 },
  { id: "first_game", icon: Gamepad2, title: { en:"Game On", ru:"Игра началась", kz:"Ойын басталды" }, desc: { en:"Host or play your first game", ru:"Сыграйте первую игру", kz:"Алғашқы ойынды өткізіңіз" }, check: (s) => s.history.length >= 1 },
  { id: "streak5", icon: Flame, title: { en:"On Fire", ru:"В огне", kz:"Отты" }, desc: { en:"Reach a 5-answer streak", ru:"Наберите серию из 5", kz:"5 серия жинаңыз" }, check: (s) => s.bestStreak >= 5 },
  { id: "perfect", icon: Target, title: { en:"Perfectionist", ru:"Перфекционист", kz:"Перфекционист" }, desc: { en:"Score 100% in a game", ru:"Наберите 100% в игре", kz:"Ойында 100% жинаңыз" }, check: (s) => s.history.some(h => h.accuracy === 100) },
  { id: "podium", icon: Trophy, title: { en:"Podium Finish", ru:"На пьедестале", kz:"Марапат тұғырында" }, desc: { en:"Finish top 3 in a live game", ru:"Займите топ-3 в игре", kz:"Ойында үздік 3-ке кіріңіз" }, check: (s) => s.history.some(h => h.rank <= 3) },
  { id: "explorer", icon: Sparkles, title: { en:"Explorer", ru:"Исследователь", kz:"Зерттеуші" }, desc: { en:"Play a quiz from the Library", ru:"Сыграйте квиз из библиотеки", kz:"Кітапханадан квиз ойнаңыз" }, check: (s) => s.history.some(h => h.fromLibrary) },
  { id: "survivor", icon: Skull, title: { en:"Survivor", ru:"Выживший", kz:"Аман қалды" }, desc: { en:"Complete a Survival run", ru:"Пройдите режим выживания", kz:"Аман қалу режимін өтіңіз" }, check: (s) => s.history.some(h => h.mode === "survival") },
];

/* ------------------------------ localStorage ------------------------------- */

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}
function saveState(state) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch {}
}

/* --------------------------------- shared UI -------------------------------- */

function cx(...a) { return a.filter(Boolean).join(" "); }

const Panel = ({ className, children, tone = "paper", style, ...rest }) => (
  <div
    className={cx("rounded-[22px] border-[2.5px]", className)}
    style={{ borderColor: "var(--ink)", background: tone === "paper" ? "var(--surface)" : tone, boxShadow: "5px 5px 0 var(--ink)", ...style }}
    {...rest}
  >{children}</div>
);

function Btn({ children, onClick, variant = "solid", color = "coral", className, disabled, size = "md", icon: Icon, type = "button" }) {
  const sizes = { sm: "px-3 py-1.5 text-sm gap-1.5", md: "px-4 py-2.5 text-[15px] gap-2", lg: "px-6 py-3.5 text-lg gap-2.5" };
  const base = "inline-flex items-center justify-center font-bold rounded-2xl border-[2.5px] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-40 disabled:pointer-events-none select-none whitespace-nowrap";
  const styles = variant === "solid"
    ? { borderColor: "var(--ink)", background: BUZZ[color] || color, color: INK_L, boxShadow: "3px 3px 0 var(--ink)" }
    : variant === "ghost"
      ? { borderColor: "transparent", background: "transparent", color: "var(--ink)" }
      : { borderColor: "var(--ink)", background: "var(--surface)", color: "var(--ink)", boxShadow: "3px 3px 0 var(--ink)" };
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cx(base, sizes[size], className)} style={styles}>
      {Icon && <Icon size={size === "sm" ? 15 : 18} strokeWidth={2.5} />}
      {children}
    </button>
  );
}

function Badge({ children, color = "coral", className }) {
  return (
    <span className={cx("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border-2", className)}
      style={{ borderColor: "var(--ink)", background: BUZZ[color] || color, color: INK_L }}>
      {children}
    </span>
  );
}

function IconBtn({ icon: Icon, onClick, title, color, size = 34, className }) {
  return (
    <button title={title} onClick={onClick}
      className={cx("inline-flex items-center justify-center rounded-xl border-2 transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none", className)}
      style={{ width: size, height: size, borderColor: "var(--ink)", background: color ? (BUZZ[color] || color) : "var(--surface)", color: "var(--ink)", boxShadow: "2px 2px 0 var(--ink)" }}>
      <Icon size={size * 0.5} strokeWidth={2.5} />
    </button>
  );
}

function ProgressBar({ pct, color = "mint", height = 10 }) {
  return (
    <div className="w-full rounded-full border-2 overflow-hidden" style={{ borderColor: "var(--ink)", height, background: "var(--surface)" }}>
      <div className="h-full transition-all duration-300 ease-out" style={{ width: `${clamp(pct, 0, 100)}%`, background: BUZZ[color] || color }} />
    </div>
  );
}

function Toast({ toasts }) {
  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 items-end pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="pointer-events-auto px-4 py-3 rounded-2xl border-[2.5px] font-bold text-sm animate-toast-in"
          style={{ borderColor: INK_L, background: BUZZ[t.color] || BUZZ.mint, color: INK_L, boxShadow: "4px 4px 0 " + INK_L }}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

function Avatar({ emoji, name, size = 40, color = "citrus" }) {
  return (
    <div className="rounded-2xl border-[2.5px] flex items-center justify-center font-black shrink-0"
      style={{ width: size, height: size, borderColor: "var(--ink)", background: BUZZ[color] || color, fontSize: size * 0.5, boxShadow: "2px 2px 0 var(--ink)" }}>
      {emoji || (name ? name[0].toUpperCase() : "?")}
    </div>
  );
}

function Modal({ open, onClose, children, title, wide }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" style={{ background: "rgba(15,13,22,0.6)" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className={cx("w-full animate-pop-in", wide ? "max-w-2xl" : "max-w-md")}>
        <Panel className="p-6" style={{ background: "var(--surface)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-black" style={{ color: "var(--ink)" }}>{title}</h3>
            <IconBtn icon={X} onClick={onClose} size={32} />
          </div>
          {children}
        </Panel>
      </div>
    </div>
  );
}

/* QR-like decorative code (visual only, encodes nothing — demo placeholder) */
function FakeQR({ seed = "0000", size = 128 }) {
  const cells = useMemo(() => {
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    const rnd = () => { h = (h * 1664525 + 1013904223) >>> 0; return h / 4294967295; };
    const n = 9;
    const grid = [];
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) grid.push(rnd() > 0.55);
    return grid;
  }, [seed]);
  const n = 9;
  const cell = size / n;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-lg overflow-hidden">
      <rect width={size} height={size} fill="#fff" />
      {cells.map((on, i) => on ? <rect key={i} x={(i % n) * cell} y={Math.floor(i / n) * cell} width={cell} height={cell} fill="#0E0D16" /> : null)}
      {/* corner markers */}
      {[[0,0],[n-3,0],[0,n-3]].map(([cx0,cy0], idx) => (
        <g key={idx}>
          <rect x={cx0*cell} y={cy0*cell} width={cell*3} height={cell*3} fill="#0E0D16" />
          <rect x={cx0*cell+cell*0.6} y={cy0*cell+cell*0.6} width={cell*1.8} height={cell*1.8} fill="#fff" />
          <rect x={cx0*cell+cell*1.1} y={cy0*cell+cell*1.1} width={cell*0.8} height={cell*0.8} fill="#0E0D16" />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------- app shell ---------------------------------- */

const NAV = [
  { id: "dashboard", icon: Home, key: "nav_dashboard" },
  { id: "myquizzes", icon: FolderOpen, key: "nav_myquizzes" },
  { id: "create", icon: PlusCircle, key: "nav_create" },
  { id: "library", icon: LibraryIcon, key: "nav_library" },
  { id: "join", icon: Users, key: "nav_join" },
  { id: "stats", icon: BarChart3, key: "nav_stats" },
  { id: "profile", icon: UserIcon, key: "nav_profile" },
  { id: "settings", icon: SettingsIcon, key: "nav_settings" },
];

export default function App() {
  const initial = loadState();
  const [quizzes, setQuizzes] = useState(initial?.quizzes || demoQuizzes());
  const [history, setHistory] = useState(initial?.history || seedHistory());
  const [theme, setTheme] = useState(initial?.theme || "light");
  const [lang, setLang] = useState(initial?.lang || "en");
  const [profile, setProfile] = useState(initial?.profile || { name: "Player One", emoji: "🦊", color: "violet" });
  const [route, setRoute] = useState({ page: "dashboard", params: {} });
  const [toasts, setToasts] = useState([]);
  const [game, setGame] = useState(null); // active game session
  const [autosaveTick, setAutosaveTick] = useState(0);

  const t = useCallback((k) => STR[lang]?.[k] ?? STR.en[k] ?? k, [lang]);
  const catLabel = useCallback((c) => (CAT_LABELS[lang] && CAT_LABELS[lang][c]) || c, [lang]);

  useEffect(() => {
    saveState({ quizzes, history, theme, lang, profile });
  }, [quizzes, history, theme, lang, profile, autosaveTick]);

  useEffect(() => {
    document.documentElement.style.setProperty("--ink", theme === "dark" ? "#F2EFE7" : INK_L);
    document.documentElement.style.setProperty("--bg", theme === "dark" ? INK_D : PAPER);
    document.documentElement.style.setProperty("--surface", theme === "dark" ? PAPER_D : "#FFFFFF");
    document.documentElement.style.setProperty("--muted", theme === "dark" ? "#9C97AE" : "#6B6577");
  }, [theme]);

  const pushToast = useCallback((msg, color = "mint") => {
    const id = uid("toast");
    setToasts(ts => [...ts, { id, msg, color }]);
    setTimeout(() => setToasts(ts => ts.filter(x => x.id !== id)), 2800);
  }, []);

  const go = (page, params = {}) => { setRoute({ page, params }); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const bestStreak = useMemo(() => Math.max(0, ...history.map(h => h.bestStreak || 0)), [history]);
  const achState = { quizzes, history, bestStreak };

  const saveQuiz = (quiz, { silent } = {}) => {
    setQuizzes(qs => {
      const exists = qs.some(q => q.id === quiz.id);
      const next = exists ? qs.map(q => q.id === quiz.id ? quiz : q) : [quiz, ...qs];
      return next;
    });
    if (!silent) pushToast(t("toast_saved"), "mint");
  };
  const deleteQuiz = (id) => { setQuizzes(qs => qs.filter(q => q.id !== id)); pushToast(t("toast_deleted"), "coral"); };
  const duplicateQuiz = (id) => {
    setQuizzes(qs => {
      const src = qs.find(q => q.id === id);
      if (!src) return qs;
      const copy = { ...src, id: uid("quiz"), title: src.title + " (copy)", createdAt: Date.now(), plays: 0,
        questions: src.questions.map(q => ({ ...q, id: uid("q") })) };
      return [copy, ...qs];
    });
    pushToast(t("toast_duplicated"), "citrus");
  };

  const recordGameResult = (result) => setHistory(h => [result, ...h].slice(0, 200));

  const ctx = { t, catLabel, lang, setLang, theme, setTheme, quizzes, setQuizzes, saveQuiz, deleteQuiz, duplicateQuiz,
    go, route, pushToast, profile, setProfile, history, setHistory, recordGameResult, game, setGame, achState };

  return (
    <div className="min-h-screen w-full font-sans" style={{ background: "var(--bg, " + PAPER + ")", color: "var(--ink, " + INK_L + ")" }}>
      <style>{`
        :root { --ink: ${INK_L}; --bg: ${PAPER}; --surface: #FFFFFF; --muted: #6B6577; }
        * { box-sizing: border-box; }
        body { -webkit-font-smoothing: antialiased; }
        @keyframes popIn { 0% { opacity:0; transform: scale(.92) translateY(6px); } 100% { opacity:1; transform: scale(1) translateY(0); } }
        .animate-pop-in { animation: popIn .22s cubic-bezier(.2,.9,.3,1.2); }
        @keyframes toastIn { 0% { opacity:0; transform: translateX(24px); } 100% { opacity:1; transform: translateX(0); } }
        .animate-toast-in { animation: toastIn .25s ease-out; }
        @keyframes floaty { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-6px);} }
        .animate-floaty { animation: floaty 3.2s ease-in-out infinite; }
        @keyframes pulseRing { 0% { box-shadow: 0 0 0 0 rgba(255,92,92,.5);} 100% { box-shadow: 0 0 0 14px rgba(255,92,92,0);} }
        .animate-pulse-ring { animation: pulseRing 1.4s ease-out infinite; }
        @keyframes barGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes confettiFall { 0% { transform: translateY(-20px) rotate(0deg); opacity:1;} 100% { transform: translateY(240px) rotate(360deg); opacity:0;} }
        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-thumb { background: var(--ink); border-radius: 8px; border: 2px solid var(--bg); }
        input[type=range] { accent-color: ${BUZZ.violet}; }
      `}</style>

      <div className="flex min-h-screen">
        <Sidebar ctx={ctx} />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar ctx={ctx} />
          <main className="flex-1 px-4 md:px-8 py-6 max-w-[1400px] w-full mx-auto">
            <PageRouter ctx={ctx} />
          </main>
        </div>
      </div>
      <Toast toasts={toasts} />
    </div>
  );
}

function seedHistory() {
  const cats = CATEGORIES;
  const now = Date.now();
  const arr = [];
  for (let i = 0; i < 14; i++) {
    const acc = clamp(Math.round(50 + Math.random() * 50), 40, 100);
    arr.push({
      id: uid("hist"), quizTitle: pick(["World Geography Blitz","Science Sprint","Pop Culture Mania","Tech & Gadgets"]),
      category: pick(cats), mode: pick(["live","solo","survival"]), players: Math.round(2 + Math.random()*18),
      score: Math.round(acc * 42), accuracy: acc, bestStreak: Math.round(Math.random()*8), rank: Math.round(1+Math.random()*6),
      date: now - i * 86400000 * (1 + Math.floor(Math.random()*2)), fromLibrary: Math.random() > 0.6,
      typeBreakdown: { mcq: Math.round(Math.random()*5), multi: Math.round(Math.random()*3), boolean: Math.round(Math.random()*3), short: Math.round(Math.random()*2), matching: Math.round(Math.random()*2), ordering: Math.round(Math.random()*2), poll: Math.round(Math.random()*2) },
    });
  }
  return arr;
}

/* ---------------------------------- Sidebar --------------------------------- */

function Sidebar({ ctx }) {
  const { t, route, go, theme } = ctx;
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="md:hidden fixed top-4 left-4 z-40 rounded-xl border-2 p-2" style={{ borderColor: "var(--ink)", background: "var(--surface)" }}>
        <LayoutGrid size={20} />
      </button>
      {open && <div className="fixed inset-0 z-40 md:hidden" style={{ background: "rgba(0,0,0,.5)" }} onClick={() => setOpen(false)} />}
      <aside className={cx("z-50 md:z-auto fixed md:static top-0 left-0 h-full md:h-auto w-[240px] shrink-0 border-r-[2.5px] flex flex-col transition-transform",
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0")}
        style={{ borderColor: "var(--ink)", background: "var(--surface)" }}>
        <div className="px-5 pt-6 pb-5 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl border-[2.5px] flex items-center justify-center animate-floaty" style={{ borderColor: "var(--ink)", background: BUZZ.citrus, boxShadow: "3px 3px 0 var(--ink)" }}>
            <Zap size={20} strokeWidth={3} />
          </div>
          <div>
            <div className="font-black text-xl tracking-tight leading-none">{t("appName")}</div>
            <div className="text-[11px] font-semibold" style={{ color: "var(--muted)" }}>{t("tagline")}</div>
          </div>
        </div>
        <nav className="flex-1 px-3 flex flex-col gap-1.5 overflow-y-auto pb-4">
          {NAV.map(item => {
            const active = route.page === item.id;
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => { go(item.id); setOpen(false); }}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-bold text-[15px] transition-all border-2"
                style={active
                  ? { borderColor: "var(--ink)", background: BUZZ.violet, color: "#fff", boxShadow: "3px 3px 0 var(--ink)" }
                  : { borderColor: "transparent", background: "transparent", color: "var(--ink)" }}>
                <Icon size={19} strokeWidth={2.5} />
                {t(item.key)}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t-2" style={{ borderColor: "var(--ink)" }}>
          <button onClick={() => go("profile")} className="w-full flex items-center gap-2.5 p-2 rounded-2xl border-2" style={{ borderColor: "var(--ink)", background: "var(--bg)" }}>
            <Avatar emoji={ctx.profile.emoji} color={ctx.profile.color} size={36} />
            <div className="text-left min-w-0">
              <div className="font-bold text-sm truncate">{ctx.profile.name}</div>
              <div className="text-[11px]" style={{ color: "var(--muted)" }}>{t("nav_profile")}</div>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}

/* ---------------------------------- TopBar ---------------------------------- */

function TopBar({ ctx }) {
  const { t, theme, setTheme, lang, setLang, go } = ctx;
  const [langOpen, setLangOpen] = useState(false);
  const titleKey = { dashboard: "nav_dashboard", myquizzes: "nav_myquizzes", create: "builder_title_create", edit: "builder_title_edit",
    library: "nav_library", join: "nav_join", stats: "nav_stats", profile: "nav_profile", settings: "nav_settings",
    lobby: "lobby_title", live: "live_question", results: "results_title", podium: "podium_title" }[ctx.route.page] || "nav_dashboard";
  return (
    <header className="sticky top-0 z-30 border-b-[2.5px] backdrop-blur px-4 md:px-8 py-3.5 flex items-center justify-between gap-3" style={{ borderColor: "var(--ink)", background: "var(--bg)" }}>
      <h1 className="text-xl md:text-2xl font-black tracking-tight ml-10 md:ml-0">{t(titleKey)}</h1>
      <div className="flex items-center gap-2">
        <div className="relative">
          <IconBtn icon={Globe} onClick={() => setLangOpen(o => !o)} title="Language" />
          {langOpen && (
            <div className="absolute right-0 mt-2 rounded-2xl border-[2.5px] overflow-hidden z-40" style={{ borderColor: "var(--ink)", background: "var(--surface)", boxShadow: "4px 4px 0 var(--ink)" }}>
              {["en","ru","kz"].map(l => (
                <button key={l} onClick={() => { setLang(l); setLangOpen(false); }}
                  className="block w-full text-left px-4 py-2 font-bold text-sm hover:opacity-80"
                  style={{ background: lang === l ? BUZZ.citrus : "transparent" }}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
        <IconBtn icon={theme === "dark" ? Sun : Moon} onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title="Theme" color={theme === "dark" ? "citrus" : undefined} />
        <Btn icon={Rocket} color="violet" className="!text-white hidden sm:inline-flex" onClick={() => go("create")}>{t("btn_create")}</Btn>
      </div>
    </header>
  );
}

/* --------------------------------- Router ------------------------------------ */

function PageRouter({ ctx }) {
  const { route } = ctx;
  switch (route.page) {
    case "dashboard": return <Dashboard ctx={ctx} />;
    case "myquizzes": return <MyQuizzes ctx={ctx} />;
    case "create": return <QuizBuilder ctx={ctx} mode="create" />;
    case "edit": return <QuizBuilder ctx={ctx} mode="edit" quizId={route.params.id} />;
    case "library": return <Library ctx={ctx} />;
    case "join": return <JoinGame ctx={ctx} />;
    case "lobby": return <Lobby ctx={ctx} />;
    case "live": return <LiveGame ctx={ctx} />;
    case "podium": return <Podium ctx={ctx} />;
    case "results": return <ResultsPage ctx={ctx} />;
    case "stats": return <Statistics ctx={ctx} />;
    case "profile": return <Profile ctx={ctx} />;
    case "settings": return <SettingsPage ctx={ctx} />;
    default: return <Dashboard ctx={ctx} />;
  }
}

/* --------------------------------- Dashboard ---------------------------------- */

function Dashboard({ ctx }) {
  const { t, quizzes, history, go, profile, catLabel } = ctx;
  const totalPlays = quizzes.reduce((a, q) => a + (q.plays || 0), 0);
  const avgAcc = history.length ? Math.round(history.reduce((a, h) => a + h.accuracy, 0) / history.length) : 0;
  const bestStreak = Math.max(0, ...history.map(h => h.bestStreak || 0));
  const weekly = useMemo(() => {
    const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    return days.map((d, i) => ({ day: d, plays: Math.round(2 + Math.random() * 10 + (i === 4 ? 6 : 0)) }));
  }, []);
  const typeCounts = useMemo(() => {
    const map = {};
    quizzes.forEach(q => q.questions.forEach(qq => { map[qq.type] = (map[qq.type] || 0) + 1; }));
    return QUESTION_TYPES.map(qt => ({ name: qt.label.en, value: map[qt.id] || 0 }));
  }, [quizzes]);
  const pieColors = [BUZZ.coral, BUZZ.citrus, BUZZ.mint, BUZZ.violet, BUZZ.sky, BUZZ.rose, "#B7B2C6"];

  return (
    <div className="flex flex-col gap-6">
      <Panel className="p-6 md:p-8 relative overflow-hidden" style={{ background: BUZZ.violet }}>
        <div className="relative z-10 max-w-lg">
          <div className="text-white/80 font-bold text-sm mb-1">{t("dash_welcome")}, {profile.name.split(" ")[0]} {profile.emoji}</div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2">{t("dash_sub")}</h2>
          <div className="flex flex-wrap gap-2 mt-4">
            <Btn color="citrus" icon={PlusCircle} onClick={() => go("create")}>{t("dash_createNew")}</Btn>
            <Btn variant="outline" color="paper" icon={Play} className="!bg-white" onClick={() => go("myquizzes")}>{t("dash_hostGame")}</Btn>
            <Btn variant="outline" icon={Hash} className="!bg-white" onClick={() => go("join")}>{t("dash_joinGame")}</Btn>
          </div>
        </div>
        <Sparkles className="absolute right-6 top-6 text-white/30 animate-floaty" size={90} />
        <Zap className="absolute right-24 bottom-4 text-white/20" size={50} />
      </Panel>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FolderOpen} label={t("dash_totalQuizzes")} value={quizzes.length} color="citrus" />
        <StatCard icon={Play} label={t("dash_totalPlays")} value={totalPlays} color="mint" />
        <StatCard icon={Target} label={t("dash_avgScore")} value={`${avgAcc}%`} color="sky" />
        <StatCard icon={Flame} label={t("dash_bestStreak")} value={bestStreak} color="coral" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Panel className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-black text-lg">{t("dash_recent")}</h3>
            <button onClick={() => go("myquizzes")} className="text-sm font-bold flex items-center gap-1" style={{ color: BUZZ.violet }}>
              {t("nav_myquizzes")} <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            {quizzes.slice(0, 4).map(q => <QuizRow key={q.id} q={q} ctx={ctx} />)}
          </div>
        </Panel>
        <Panel className="p-5">
          <h3 className="font-black text-lg mb-3">{t("dash_activity")}</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weekly}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 700, fill: "var(--muted)" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: `2px solid ${INK_L}`, fontWeight: 700 }} />
              <Bar dataKey="plays" fill={BUZZ.mint} radius={[8,8,0,0]} stroke={INK_L} strokeWidth={2} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <Panel className="p-5">
        <h3 className="font-black text-lg mb-3">{t("dash_typesBreakdown")}</h3>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <ResponsiveContainer width="100%" height={220} className="md:max-w-xs">
            <PieChart>
              <Pie data={typeCounts} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3} stroke={INK_L} strokeWidth={2}>
                {typeCounts.map((_, i) => <Cell key={i} fill={pieColors[i % pieColors.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: `2px solid ${INK_L}`, fontWeight: 700 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 flex-1 w-full">
            {typeCounts.map((tc, i) => (
              <div key={tc.name} className="flex items-center gap-2 text-sm font-semibold">
                <span className="w-3 h-3 rounded-full border-2" style={{ background: pieColors[i % pieColors.length], borderColor: "var(--ink)" }} />
                {tc.name} <span style={{ color: "var(--muted)" }}>· {tc.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <Panel className="p-4 flex items-center gap-3">
      <div className="w-11 h-11 rounded-2xl border-2 flex items-center justify-center shrink-0" style={{ borderColor: "var(--ink)", background: BUZZ[color] }}>
        <Icon size={20} strokeWidth={2.5} />
      </div>
      <div className="min-w-0">
        <div className="text-2xl font-black leading-none">{value}</div>
        <div className="text-xs font-semibold truncate" style={{ color: "var(--muted)" }}>{label}</div>
      </div>
    </Panel>
  );
}

function QuizRow({ q, ctx }) {
  const { t, go, catLabel } = ctx;
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-2xl border-2" style={{ borderColor: "var(--ink)", background: "var(--bg)" }}>
      <div className="w-11 h-11 rounded-xl border-2 flex items-center justify-center shrink-0" style={{ borderColor: "var(--ink)", background: BUZZ[q.cover] }}>
        <ClipboardList size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-bold truncate">{q.title}</div>
        <div className="text-xs font-semibold" style={{ color: "var(--muted)" }}>{catLabel(q.category)} · {q.questions.length}q · {q.plays} plays</div>
      </div>
      <IconBtn icon={Play} color="mint" size={32} onClick={() => go("lobby", { id: q.id })} />
      <IconBtn icon={Edit3} size={32} onClick={() => go("edit", { id: q.id })} />
    </div>
  );
}

/* --------------------------------- My Quizzes ---------------------------------- */

function MyQuizzes({ ctx }) {
  const { t, quizzes, go, deleteQuiz, duplicateQuiz, catLabel } = ctx;
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");
  const [diff, setDiff] = useState("all");
  const [confirmDel, setConfirmDel] = useState(null);

  const filtered = quizzes.filter(q =>
    (cat === "all" || q.category === cat) &&
    (diff === "all" || q.difficulty === diff) &&
    (q.title.toLowerCase().includes(search.toLowerCase()) || q.description.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="flex flex-col gap-5">
      <FilterBar t={t} search={search} setSearch={setSearch} cat={cat} setCat={setCat} diff={diff} setDiff={setDiff} catLabel={catLabel} />
      {filtered.length === 0 ? (
        <EmptyState t={t} onCreate={() => go("create")} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(q => (
            <QuizCard key={q.id} q={q} ctx={ctx} onDelete={() => setConfirmDel(q)} onDuplicate={() => duplicateQuiz(q.id)} />
          ))}
        </div>
      )}
      <Modal open={!!confirmDel} onClose={() => setConfirmDel(null)} title={t("btn_delete") + "?"}>
        <p className="mb-4 font-semibold" style={{ color: "var(--muted)" }}>{confirmDel?.title}</p>
        <div className="flex gap-2 justify-end">
          <Btn variant="outline" onClick={() => setConfirmDel(null)}>{t("btn_cancel")}</Btn>
          <Btn color="coral" onClick={() => { deleteQuiz(confirmDel.id); setConfirmDel(null); }}>{t("btn_delete")}</Btn>
        </div>
      </Modal>
    </div>
  );
}

function FilterBar({ t, search, setSearch, cat, setCat, diff, setDiff, catLabel }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--muted)" }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t("search_placeholder")}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-[2.5px] font-semibold outline-none"
          style={{ borderColor: "var(--ink)", background: "var(--surface)", color: "var(--ink)" }} />
      </div>
      <select value={cat} onChange={e => setCat(e.target.value)} className="px-3 py-2.5 rounded-2xl border-[2.5px] font-bold outline-none"
        style={{ borderColor: "var(--ink)", background: "var(--surface)", color: "var(--ink)" }}>
        <option value="all">{t("filter_category")}: {t("filter_all")}</option>
        {CATEGORIES.map(c => <option key={c} value={c}>{catLabel(c)}</option>)}
      </select>
      <select value={diff} onChange={e => setDiff(e.target.value)} className="px-3 py-2.5 rounded-2xl border-[2.5px] font-bold outline-none"
        style={{ borderColor: "var(--ink)", background: "var(--surface)", color: "var(--ink)" }}>
        <option value="all">{t("filter_difficulty")}: {t("filter_all")}</option>
        <option value="easy">{t("diff_easy")}</option>
        <option value="medium">{t("diff_medium")}</option>
        <option value="hard">{t("diff_hard")}</option>
      </select>
    </div>
  );
}

function EmptyState({ t, onCreate }) {
  return (
    <Panel className="p-12 flex flex-col items-center text-center gap-3">
      <div className="w-16 h-16 rounded-3xl border-2 flex items-center justify-center animate-floaty" style={{ borderColor: "var(--ink)", background: BUZZ.citrus }}>
        <ClipboardList size={28} />
      </div>
      <h3 className="text-xl font-black">{t("my_empty_title")}</h3>
      <p className="font-semibold max-w-sm" style={{ color: "var(--muted)" }}>{t("my_empty_sub")}</p>
      <Btn icon={PlusCircle} color="violet" className="!text-white mt-2" onClick={onCreate}>{t("btn_create")}</Btn>
    </Panel>
  );
}

const DIFF_COLOR = { easy: "mint", medium: "citrus", hard: "coral" };

function QuizCard({ q, ctx, onDelete, onDuplicate }) {
  const { t, go, catLabel } = ctx;
  const [menu, setMenu] = useState(false);
  return (
    <Panel className="overflow-hidden flex flex-col">
      <div className="h-28 relative flex items-center justify-center" style={{ background: BUZZ[q.cover] }}>
        <ClipboardList size={40} className="opacity-70" />
        <div className="absolute top-2 right-2">
          <button onClick={() => setMenu(m => !m)} className="w-8 h-8 rounded-xl border-2 flex items-center justify-center" style={{ borderColor: "var(--ink)", background: "#fff" }}>
            <MoreVertical size={16} />
          </button>
          {menu && (
            <div className="absolute right-0 mt-1 rounded-xl border-2 overflow-hidden z-10 w-40" style={{ borderColor: "var(--ink)", background: "var(--surface)", boxShadow: "3px 3px 0 var(--ink)" }}>
              <button onClick={() => { setMenu(false); onDuplicate(); }} className="w-full text-left px-3 py-2 text-sm font-bold flex items-center gap-2 hover:opacity-70"><Copy size={14} />{t("btn_duplicate")}</button>
              <button onClick={() => { setMenu(false); onDelete(); }} className="w-full text-left px-3 py-2 text-sm font-bold flex items-center gap-2 hover:opacity-70" style={{ color: BUZZ.coral }}><Trash2 size={14} />{t("btn_delete")}</button>
            </div>
          )}
        </div>
        <div className="absolute bottom-2 left-2"><Badge color={DIFF_COLOR[q.difficulty]}>{t("diff_" + q.difficulty)}</Badge></div>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h4 className="font-black text-lg leading-tight">{q.title}</h4>
        <p className="text-sm font-medium line-clamp-2" style={{ color: "var(--muted)" }}>{q.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-1">
          <Badge color="sky">{catLabel(q.category)}</Badge>
          <Badge color="rose">{q.questions.length}q</Badge>
        </div>
        <div className="flex gap-2 mt-auto pt-3">
          <Btn size="sm" color="mint" icon={Play} className="flex-1" onClick={() => go("lobby", { id: q.id })}>{t("btn_play")}</Btn>
          <Btn size="sm" variant="outline" icon={Edit3} onClick={() => go("edit", { id: q.id })}>{t("btn_edit")}</Btn>
        </div>
      </div>
    </Panel>
  );
}

/* --------------------------------- Library -------------------------------------- */

function Library({ ctx }) {
  const { t, quizzes, go, saveQuiz, pushToast, catLabel } = ctx;
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");
  const [diff, setDiff] = useState("all");
  const filtered = quizzes.filter(q =>
    (cat === "all" || q.category === cat) && (diff === "all" || q.difficulty === diff) &&
    q.title.toLowerCase().includes(search.toLowerCase()));

  const useQuiz = (q) => {
    const copy = { ...q, id: uid("quiz"), title: q.title, createdAt: Date.now(), plays: 0, questions: q.questions.map(qq => ({ ...qq, id: uid("q") })) };
    saveQuiz(copy, { silent: true });
    pushToast(t("toast_duplicated"), "citrus");
    go("edit", { id: copy.id });
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="font-semibold -mt-2" style={{ color: "var(--muted)" }}>{t("library_sub")}</p>
      <FilterBar t={t} search={search} setSearch={setSearch} cat={cat} setCat={setCat} diff={diff} setDiff={setDiff} catLabel={catLabel} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(q => (
          <Panel key={q.id} className="overflow-hidden flex flex-col">
            <div className="h-28 flex items-center justify-center relative" style={{ background: BUZZ[q.cover] }}>
              <LibraryIcon size={36} className="opacity-70" />
              <div className="absolute bottom-2 left-2 flex gap-1.5">
                <Badge color={DIFF_COLOR[q.difficulty]}>{t("diff_" + q.difficulty)}</Badge>
                <Badge color="paper" className="!text-black" >{q.lang.toUpperCase()}</Badge>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-2 flex-1">
              <h4 className="font-black text-lg leading-tight">{q.title}</h4>
              <p className="text-sm font-medium line-clamp-2" style={{ color: "var(--muted)" }}>{q.description}</p>
              <div className="flex flex-wrap gap-1.5"><Badge color="sky">{catLabel(q.category)}</Badge><Badge color="rose">{q.questions.length}q</Badge><Badge color="mint">{q.plays} plays</Badge></div>
              <div className="flex gap-2 mt-auto pt-3">
                <Btn size="sm" color="violet" className="!text-white flex-1" icon={Play} onClick={() => go("lobby", { id: q.id })}>{t("btn_play")}</Btn>
                <Btn size="sm" variant="outline" icon={Copy} onClick={() => useQuiz(q)}>{t("btn_use")}</Btn>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- Quiz Builder ------------------------------------ */

function emptyQuiz() {
  return { id: uid("quiz"), title: "", description: "", category: "General", difficulty: "medium", cover: pick(BUZZ_ORDER), lang: "en", plays: 0, createdAt: Date.now(), questions: [] };
}

function newQuestion(type = "mcq") {
  const base = { id: uid("q"), type, text: "", points: 1000, time: 20, image: "" };
  switch (type) {
    case "mcq": return { ...base, options: [mkOpt(""), mkOpt(""), mkOpt(""), mkOpt("")], correct: [0] };
    case "multi": return { ...base, options: [mkOpt(""), mkOpt(""), mkOpt(""), mkOpt("")], correct: [] };
    case "boolean": return { ...base, correct: true };
    case "short": return { ...base, accepted: [""] };
    case "matching": return { ...base, pairs: [{ left: "", right: "" }, { left: "", right: "" }] };
    case "ordering": return { ...base, items: ["", "", ""] };
    case "poll": return { ...base, points: 0, options: [mkOpt(""), mkOpt("")] };
    default: return base;
  }
}

function QuizBuilder({ ctx, mode, quizId }) {
  const { t, quizzes, saveQuiz, go, pushToast, catLabel } = ctx;
  const existing = mode === "edit" ? quizzes.find(q => q.id === quizId) : null;
  const [quiz, setQuiz] = useState(existing || emptyQuiz());
  const [selected, setSelected] = useState(existing?.questions[0]?.id || null);
  const [savedFlag, setSavedFlag] = useState(true);
  const [dragIdx, setDragIdx] = useState(null);
  const fileRef = useRef(null);
  const autosaveTimer = useRef(null);

  useEffect(() => {
    if (!existing && mode === "edit") go("myquizzes");
  }, []);

  // autosave to localStorage draft + saved flag after debounce
  useEffect(() => {
    setSavedFlag(false);
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      if (quiz.title.trim()) { saveQuiz(quiz, { silent: true }); setSavedFlag(true); }
    }, 900);
    return () => clearTimeout(autosaveTimer.current);
  }, [quiz]);

  const q = quiz.questions.find(x => x.id === selected);

  const update = (patch) => setQuiz(prev => ({ ...prev, ...patch }));
  const updateQ = (id, patch) => setQuiz(prev => ({ ...prev, questions: prev.questions.map(qq => qq.id === id ? { ...qq, ...patch } : qq) }));

  const addQuestion = (type) => {
    const nq = newQuestion(type);
    setQuiz(prev => ({ ...prev, questions: [...prev.questions, nq] }));
    setSelected(nq.id);
  };
  const removeQuestion = (id) => {
    setQuiz(prev => {
      const qs = prev.questions.filter(x => x.id !== id);
      return { ...prev, questions: qs };
    });
    if (selected === id) setSelected(null);
  };
  const duplicateQuestion = (id) => {
    setQuiz(prev => {
      const idx = prev.questions.findIndex(x => x.id === id);
      const copy = { ...prev.questions[idx], id: uid("q") };
      const qs = [...prev.questions];
      qs.splice(idx + 1, 0, copy);
      return { ...prev, questions: qs };
    });
  };
  const reorder = (from, to) => {
    setQuiz(prev => {
      const qs = [...prev.questions];
      const [moved] = qs.splice(from, 1);
      qs.splice(to, 0, moved);
      return { ...prev, questions: qs };
    });
  };

  const doSave = () => {
    if (!quiz.title.trim()) { pushToast("Add a quiz title", "coral"); return; }
    saveQuiz(quiz);
    go("myquizzes");
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(quiz.questions, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${quiz.title || "quiz"}-questions.json`; a.click();
    URL.revokeObjectURL(url);
  };
  const exportCSV = () => {
    const rows = [["type","text","points","time","options/correct"]];
    quiz.questions.forEach(qq => {
      let extra = "";
      if (qq.options) extra = qq.options.map(o => o.text).join("|");
      else if (qq.items) extra = qq.items.join("|");
      else if (qq.pairs) extra = qq.pairs.map(p => `${p.left}=${p.right}`).join("|");
      else if (qq.accepted) extra = qq.accepted.join("|");
      rows.push([qq.type, qq.text.replace(/,/g, ";"), qq.points, qq.time, extra.replace(/,/g, ";")]);
    });
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${quiz.title || "quiz"}-questions.csv`; a.click();
    URL.revokeObjectURL(url);
  };
  const importJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        const arr = Array.isArray(parsed) ? parsed : [parsed];
        const cleaned = arr.map(qq => ({ ...newQuestion(qq.type || "mcq"), ...qq, id: uid("q") }));
        setQuiz(prev => ({ ...prev, questions: [...prev.questions, ...cleaned] }));
        pushToast(t("toast_imported"), "mint");
      } catch { pushToast("Invalid JSON file", "coral"); }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-5">
      {/* meta bar */}
      <Panel className="p-5">
        <div className="grid md:grid-cols-[1fr_auto] gap-4">
          <div className="flex flex-col gap-3">
            <input value={quiz.title} onChange={e => update({ title: e.target.value })} placeholder={t("builder_quizTitle")}
              className="text-2xl font-black outline-none bg-transparent border-b-2 pb-1" style={{ borderColor: "var(--ink)" }} />
            <textarea value={quiz.description} onChange={e => update({ description: e.target.value })} placeholder={t("builder_quizDesc")} rows={2}
              className="font-medium outline-none bg-transparent resize-none border-b-2 pb-1" style={{ borderColor: "var(--surface)", color: "var(--muted)" }} />
            <div className="flex flex-wrap gap-2">
              <select value={quiz.category} onChange={e => update({ category: e.target.value })} className="px-3 py-2 rounded-xl border-2 font-bold text-sm outline-none" style={{ borderColor: "var(--ink)", background: "var(--surface)" }}>
                {CATEGORIES.map(c => <option key={c} value={c}>{catLabel(c)}</option>)}
              </select>
              <select value={quiz.difficulty} onChange={e => update({ difficulty: e.target.value })} className="px-3 py-2 rounded-xl border-2 font-bold text-sm outline-none" style={{ borderColor: "var(--ink)", background: "var(--surface)" }}>
                <option value="easy">{t("diff_easy")}</option>
                <option value="medium">{t("diff_medium")}</option>
                <option value="hard">{t("diff_hard")}</option>
              </select>
              <select value={quiz.lang} onChange={e => update({ lang: e.target.value })} className="px-3 py-2 rounded-xl border-2 font-bold text-sm outline-none" style={{ borderColor: "var(--ink)", background: "var(--surface)" }}>
                <option value="en">EN</option><option value="ru">RU</option><option value="kz">KZ</option>
              </select>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl border-2" style={{ borderColor: "var(--ink)" }}>
                <span className="text-xs font-bold px-1" style={{ color: "var(--muted)" }}>{t("builder_cover")}</span>
                {BUZZ_ORDER.map(c => (
                  <button key={c} onClick={() => update({ cover: c })} className="w-6 h-6 rounded-full border-2" style={{ background: BUZZ[c], borderColor: quiz.cover === c ? "var(--ink)" : "transparent" }} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-stretch md:items-end justify-between">
            <div className="text-xs font-bold flex items-center gap-1.5" style={{ color: savedFlag ? BUZZ.mint : "var(--muted)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: savedFlag ? BUZZ.mint : "var(--muted)" }} />
              {savedFlag ? t("btn_saved") : "…"}
            </div>
            <div className="flex flex-wrap gap-2 justify-end">
              <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={importJSON} />
              <IconBtn icon={Upload} title={t("btn_import")} onClick={() => fileRef.current.click()} />
              <IconBtn icon={FileJson} title={t("btn_export")} onClick={exportJSON} />
              <IconBtn icon={FileSpreadsheet} title={t("btn_exportCsv")} onClick={exportCSV} />
              <Btn color="mint" icon={Save} onClick={doSave}>{t("btn_save")}</Btn>
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid lg:grid-cols-[320px_1fr] gap-5 items-start">
        {/* question list + add */}
        <Panel className="p-4 lg:sticky lg:top-24">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-black">{t("builder_questions")} ({quiz.questions.length})</h3>
          </div>
          <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-1 mb-3">
            {quiz.questions.length === 0 && <p className="text-sm font-semibold py-4 text-center" style={{ color: "var(--muted)" }}>{t("builder_noQuestions")}</p>}
            {quiz.questions.map((qq, idx) => {
              const QT = QUESTION_TYPES.find(x => x.id === qq.type);
              const Icon = QT?.icon || HelpCircle;
              return (
                <div key={qq.id} draggable
                  onDragStart={() => setDragIdx(idx)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => { if (dragIdx !== null && dragIdx !== idx) reorder(dragIdx, idx); setDragIdx(null); }}
                  onClick={() => setSelected(qq.id)}
                  className="flex items-center gap-2 p-2.5 rounded-xl border-2 cursor-pointer"
                  style={{ borderColor: "var(--ink)", background: selected === qq.id ? BUZZ.citrus : "var(--bg)" }}>
                  <GripVertical size={15} className="cursor-grab shrink-0" style={{ color: "var(--muted)" }} />
                  <span className="w-6 h-6 rounded-lg border-2 flex items-center justify-center text-[11px] font-black shrink-0" style={{ borderColor: "var(--ink)", background: "var(--surface)" }}>{idx + 1}</span>
                  <Icon size={15} className="shrink-0" />
                  <span className="text-sm font-bold truncate flex-1">{qq.text || "Untitled question"}</span>
                  <button onClick={(e) => { e.stopPropagation(); duplicateQuestion(qq.id); }} className="shrink-0 opacity-70 hover:opacity-100"><Copy size={14} /></button>
                  <button onClick={(e) => { e.stopPropagation(); removeQuestion(qq.id); }} className="shrink-0 opacity-70 hover:opacity-100"><Trash2 size={14} /></button>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {QUESTION_TYPES.map(qt => {
              const Icon = qt.icon;
              return (
                <button key={qt.id} onClick={() => addQuestion(qt.id)}
                  className="flex flex-col items-center gap-1 p-2.5 rounded-xl border-2 font-bold text-[11px] text-center transition-all active:translate-y-[1px]"
                  style={{ borderColor: "var(--ink)", background: "var(--surface)", boxShadow: "2px 2px 0 var(--ink)" }}>
                  <Icon size={17} />
                  {qt.label.en}
                </button>
              );
            })}
          </div>
        </Panel>

        {/* editor */}
        <div>
          {q ? <QuestionEditor key={q.id} q={q} onChange={(patch) => updateQ(q.id, patch)} t={t} /> :
            <Panel className="p-10 text-center font-bold" style={{ color: "var(--muted)" }}>{t("builder_noQuestions")}</Panel>}
        </div>
      </div>
    </div>
  );
}

function QuestionEditor({ q, onChange, t }) {
  const QT = QUESTION_TYPES.find(x => x.id === q.type);
  return (
    <Panel className="p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Badge color="violet" className="!text-white"><QT.icon size={13} />{QT.label.en}</Badge>
      </div>
      <div>
        <label className="text-xs font-black uppercase tracking-wide" style={{ color: "var(--muted)" }}>{t("builder_questionText")}</label>
        <textarea value={q.text} onChange={e => onChange({ text: e.target.value })} rows={2}
          className="w-full mt-1 p-3 rounded-xl border-2 font-bold text-lg outline-none resize-none" style={{ borderColor: "var(--ink)", background: "var(--surface)" }} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-black uppercase tracking-wide flex items-center gap-1" style={{ color: "var(--muted)" }}><Star size={12} />{t("builder_points")}</label>
          <input type="number" step={100} value={q.points} onChange={e => onChange({ points: Number(e.target.value) })}
            className="w-full mt-1 p-2.5 rounded-xl border-2 font-bold outline-none" style={{ borderColor: "var(--ink)", background: "var(--surface)" }} disabled={q.type === "poll"} />
        </div>
        <div>
          <label className="text-xs font-black uppercase tracking-wide flex items-center gap-1" style={{ color: "var(--muted)" }}><Timer size={12} />{t("builder_timeLimit")}</label>
          <input type="number" step={5} value={q.time} onChange={e => onChange({ time: Number(e.target.value) })}
            className="w-full mt-1 p-2.5 rounded-xl border-2 font-bold outline-none" style={{ borderColor: "var(--ink)", background: "var(--surface)" }} />
        </div>
      </div>

      <div>
        <label className="text-xs font-black uppercase tracking-wide flex items-center gap-1 mb-1.5" style={{ color: "var(--muted)" }}><ImageIcon size={12} />{t("builder_media")}</label>
        <div className="grid md:grid-cols-3 gap-2">
          <div className="flex items-center gap-1.5 border-2 rounded-xl px-2.5" style={{ borderColor: "var(--ink)" }}>
            <ImageIcon size={14} className="shrink-0" />
            <input value={q.image || ""} onChange={e => onChange({ image: e.target.value })} placeholder={t("builder_imageUrl")} className="w-full py-2 text-sm font-medium outline-none bg-transparent" />
          </div>
          <div className="flex items-center gap-1.5 border-2 rounded-xl px-2.5" style={{ borderColor: "var(--ink)" }}>
            <VideoIcon size={14} className="shrink-0" />
            <input value={q.video || ""} onChange={e => onChange({ video: e.target.value })} placeholder={t("builder_videoUrl")} className="w-full py-2 text-sm font-medium outline-none bg-transparent" />
          </div>
          <div className="flex items-center gap-1.5 border-2 rounded-xl px-2.5" style={{ borderColor: "var(--ink)" }}>
            <MusicIcon size={14} className="shrink-0" />
            <input value={q.audio || ""} onChange={e => onChange({ audio: e.target.value })} placeholder={t("builder_audioUrl")} className="w-full py-2 text-sm font-medium outline-none bg-transparent" />
          </div>
        </div>
        {q.image && <img src={q.image} alt="" className="mt-2 h-32 rounded-xl border-2 object-cover" style={{ borderColor: "var(--ink)" }} onError={e => e.target.style.display = "none"} />}
        {q.video && <video src={q.video} controls className="mt-2 h-32 rounded-xl border-2" style={{ borderColor: "var(--ink)" }} />}
        {q.audio && <audio src={q.audio} controls className="mt-2 w-full" />}
      </div>

      <TypeSpecificEditor q={q} onChange={onChange} t={t} />
    </Panel>
  );
}

function OptionRow({ opt, idx, isCorrect, onToggleCorrect, onText, onRemove, multi, color }) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-xl border-2" style={{ borderColor: "var(--ink)", background: isCorrect ? BUZZ[color] : "var(--surface)" }}>
      <button onClick={onToggleCorrect} className="w-7 h-7 rounded-lg border-2 flex items-center justify-center shrink-0" style={{ borderColor: "var(--ink)", background: isCorrect ? "#fff" : "var(--bg)" }}>
        {isCorrect && <CheckCircle2 size={16} strokeWidth={3} />}
      </button>
      <input value={opt.text} onChange={e => onText(e.target.value)} placeholder={`Option ${idx + 1}`} className="flex-1 bg-transparent outline-none font-bold py-1" />
      <button onClick={onRemove} className="shrink-0 opacity-60 hover:opacity-100"><X size={16} /></button>
    </div>
  );
}

function TypeSpecificEditor({ q, onChange, t }) {
  const colorFor = (i) => BUZZ_ORDER[i % BUZZ_ORDER.length];

  if (q.type === "mcq" || q.type === "poll") {
    const isPoll = q.type === "poll";
    return (
      <div>
        <label className="text-xs font-black uppercase tracking-wide" style={{ color: "var(--muted)" }}>{t("builder_options")}</label>
        {isPoll && <p className="text-xs font-semibold mb-2 mt-0.5" style={{ color: "var(--muted)" }}>{t("builder_pollNote")}</p>}
        <div className="flex flex-col gap-2 mt-1.5">
          {q.options.map((o, i) => (
            <OptionRow key={o.id} opt={o} idx={i} color={colorFor(i)}
              isCorrect={!isPoll && q.correct.includes(i)}
              onToggleCorrect={() => !isPoll && onChange({ correct: [i] })}
              onText={(val) => onChange({ options: q.options.map((oo, ii) => ii === i ? { ...oo, text: val } : oo) })}
              onRemove={() => onChange({ options: q.options.filter((_, ii) => ii !== i), correct: q.correct.filter(c => c !== i).map(c => c > i ? c - 1 : c) })} />
          ))}
        </div>
        {q.options.length < 6 && <button onClick={() => onChange({ options: [...q.options, mkOpt("")] })} className="mt-2 text-sm font-bold flex items-center gap-1" style={{ color: BUZZ.violet }}><Plus size={15} />{t("builder_addOption")}</button>}
      </div>
    );
  }
  if (q.type === "multi") {
    return (
      <div>
        <label className="text-xs font-black uppercase tracking-wide" style={{ color: "var(--muted)" }}>{t("builder_options")}</label>
        <div className="flex flex-col gap-2 mt-1.5">
          {q.options.map((o, i) => (
            <OptionRow key={o.id} opt={o} idx={i} color={colorFor(i)}
              isCorrect={q.correct.includes(i)}
              onToggleCorrect={() => onChange({ correct: q.correct.includes(i) ? q.correct.filter(c => c !== i) : [...q.correct, i] })}
              onText={(val) => onChange({ options: q.options.map((oo, ii) => ii === i ? { ...oo, text: val } : oo) })}
              onRemove={() => onChange({ options: q.options.filter((_, ii) => ii !== i), correct: q.correct.filter(c => c !== i).map(c => c > i ? c - 1 : c) })} />
          ))}
        </div>
        {q.options.length < 8 && <button onClick={() => onChange({ options: [...q.options, mkOpt("")] })} className="mt-2 text-sm font-bold flex items-center gap-1" style={{ color: BUZZ.violet }}><Plus size={15} />{t("builder_addOption")}</button>}
      </div>
    );
  }
  if (q.type === "boolean") {
    return (
      <div className="flex gap-3">
        {[true, false].map(v => (
          <button key={String(v)} onClick={() => onChange({ correct: v })}
            className="flex-1 py-4 rounded-xl border-2 font-black text-lg flex items-center justify-center gap-2"
            style={{ borderColor: "var(--ink)", background: q.correct === v ? (v ? BUZZ.mint : BUZZ.coral) : "var(--surface)" }}>
            {v ? <CheckCircle2 /> : <XCircle />} {v ? "True" : "False"}
          </button>
        ))}
      </div>
    );
  }
  if (q.type === "short") {
    return (
      <div>
        <label className="text-xs font-black uppercase tracking-wide" style={{ color: "var(--muted)" }}>{t("builder_acceptedAnswers")}</label>
        <textarea value={q.accepted.join("\n")} onChange={e => onChange({ accepted: e.target.value.split("\n") })} rows={3}
          className="w-full mt-1 p-3 rounded-xl border-2 font-bold outline-none resize-none" style={{ borderColor: "var(--ink)", background: "var(--surface)" }} />
      </div>
    );
  }
  if (q.type === "matching") {
    return (
      <div>
        <label className="text-xs font-black uppercase tracking-wide" style={{ color: "var(--muted)" }}>{t("builder_pairs")}</label>
        <div className="flex flex-col gap-2 mt-1.5">
          {q.pairs.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <input value={p.left} onChange={e => onChange({ pairs: q.pairs.map((pp, ii) => ii === i ? { ...pp, left: e.target.value } : pp) })} placeholder={t("builder_left")}
                className="flex-1 p-2 rounded-xl border-2 font-bold outline-none" style={{ borderColor: "var(--ink)", background: BUZZ[colorFor(i)] }} />
              <Link2 size={16} className="shrink-0" style={{ color: "var(--muted)" }} />
              <input value={p.right} onChange={e => onChange({ pairs: q.pairs.map((pp, ii) => ii === i ? { ...pp, right: e.target.value } : pp) })} placeholder={t("builder_right")}
                className="flex-1 p-2 rounded-xl border-2 font-bold outline-none" style={{ borderColor: "var(--ink)", background: "var(--surface)" }} />
              <button onClick={() => onChange({ pairs: q.pairs.filter((_, ii) => ii !== i) })}><X size={16} /></button>
            </div>
          ))}
        </div>
        <button onClick={() => onChange({ pairs: [...q.pairs, { left: "", right: "" }] })} className="mt-2 text-sm font-bold flex items-center gap-1" style={{ color: BUZZ.violet }}><Plus size={15} />{t("builder_addPair")}</button>
      </div>
    );
  }
  if (q.type === "ordering") {
    return (
      <div>
        <label className="text-xs font-black uppercase tracking-wide" style={{ color: "var(--muted)" }}>{t("builder_orderItems")}</label>
        <div className="flex flex-col gap-2 mt-1.5">
          {q.items.map((it, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-xl border-2" style={{ borderColor: "var(--ink)", background: BUZZ[colorFor(i)] }}>
              <span className="w-6 h-6 rounded-lg border-2 flex items-center justify-center text-xs font-black shrink-0" style={{ borderColor: "var(--ink)", background: "#fff" }}>{i + 1}</span>
              <input value={it} onChange={e => onChange({ items: q.items.map((ii2, ii) => ii === i ? e.target.value : ii2) })} className="flex-1 bg-transparent outline-none font-bold" />
              <button onClick={() => onChange({ items: q.items.filter((_, ii) => ii !== i) })}><X size={16} /></button>
            </div>
          ))}
        </div>
        <button onClick={() => onChange({ items: [...q.items, ""] })} className="mt-2 text-sm font-bold flex items-center gap-1" style={{ color: BUZZ.violet }}><Plus size={15} />{t("builder_addItem")}</button>
      </div>
    );
  }
  return null;
}

/* -------------------------------- Join Game --------------------------------------- */

function JoinGame({ ctx }) {
  const { t, quizzes, go, setGame, pushToast, profile } = ctx;
  const [pin, setPin] = useState("");
  const [nick, setNick] = useState(profile.name);

  const submit = () => {
    if (pin.length < 4) { pushToast(t("join_enterPin"), "coral"); return; }
    const quiz = quizzes.find(q => (q.pin || pinFromId(q.id)) === pin) || pick(quizzes);
    if (!quiz) { pushToast(t("toast_invalidPin"), "coral"); return; }
    startLobby(ctx, quiz, "live", { playerNick: nick || "Player" });
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Panel className="p-8 max-w-md w-full flex flex-col items-center gap-5" style={{ background: BUZZ.violet }}>
        <div className="w-16 h-16 rounded-3xl border-2 flex items-center justify-center bg-white animate-pulse-ring" style={{ borderColor: INK_L }}>
          <Hash size={30} />
        </div>
        <h2 className="text-2xl font-black text-white text-center">{t("join_title")}</h2>
        <input value={pin} onChange={e => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder={t("join_enterPin")} inputMode="numeric"
          className="w-full text-center text-3xl tracking-[0.3em] font-black py-3 rounded-2xl border-[3px] outline-none font-mono" style={{ borderColor: INK_L }} />
        <input value={nick} onChange={e => setNick(e.target.value)} placeholder={t("join_enterNick")}
          className="w-full text-center text-lg font-bold py-2.5 rounded-2xl border-[3px] outline-none" style={{ borderColor: INK_L }} />
        <Btn color="citrus" size="lg" className="w-full" onClick={submit}>{t("join_go")}</Btn>
        <p className="text-white/80 text-xs font-semibold text-center">Demo tip: any PIN works — we'll match you into a sample live quiz.</p>
      </Panel>
    </div>
  );
}

function pinFromId(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return String(100000 + (h % 900000));
}

/* --------------------------- game session engine -------------------------------- */

function startLobby(ctx, quiz, mode, opts = {}) {
  const { setGame, go, profile } = ctx;
  const pin = pinFromId(quiz.id);
  const botCount = mode === "solo" || mode === "survival" ? 0 : 3 + Math.floor(Math.random() * 5);
  const bots = Array.from({ length: botCount }).map((_, i) => ({
    id: uid("bot"), name: BOT_NAMES[i % BOT_NAMES.length] + (i >= BOT_NAMES.length ? i : ""), emoji: AVATAR_EMOJI[(i * 3) % AVATAR_EMOJI.length],
    isBot: true, score: 0, streak: 0, bestStreak: 0, answers: [], skill: 0.35 + Math.random() * 0.55,
  }));
  const you = { id: "you", name: opts.playerNick || profile.name, emoji: profile.emoji, isBot: false, score: 0, streak: 0, bestStreak: 0, answers: [] };
  const players = mode === "solo" || mode === "survival" ? [you] : [you, ...bots];
  setGame({
    quiz, mode, pin, players, qIndex: -1, phase: "lobby", questionStart: null, fromLibrary: !!opts.fromLibrary,
    log: [],
  });
  go("lobby");
}

function scoreForAnswer(correct, timeLeftRatio, points) {
  if (!correct) return 0;
  return Math.round(points * (0.5 + 0.5 * clamp(timeLeftRatio, 0, 1)));
}

function isAnswerCorrect(q, ans) {
  if (ans === undefined || ans === null) return false;
  switch (q.type) {
    case "mcq": return q.correct.includes(ans);
    case "multi": {
      const a = new Set(ans || []);
      const c = new Set(q.correct);
      if (a.size !== c.size) return false;
      for (const x of a) if (!c.has(x)) return false;
      return true;
    }
    case "boolean": return ans === q.correct;
    case "short": return q.accepted.some(acc => acc.trim().toLowerCase() === String(ans || "").trim().toLowerCase());
    case "matching": {
      if (!ans) return false;
      return q.pairs.every((p, i) => ans[i] === p.right);
    }
    case "ordering": return ans && q.items.every((it, i) => ans[i] === it);
    case "poll": return true;
    default: return false;
  }
}

/* ----------------------------------- Lobby ---------------------------------------- */

function Lobby({ ctx }) {
  const { t, game, setGame, go, quizzes, route } = ctx;
  const quizFromRoute = route.params?.id ? quizzes.find(q => q.id === route.params.id) : null;

  useEffect(() => {
    if (!game && quizFromRoute) startLobby(ctx, quizFromRoute, "live");
    else if (!game && !quizFromRoute) go("myquizzes");
  }, []);

  const [joined, setJoined] = useState(game?.mode === "solo" || game?.mode === "survival" ? (game?.players.length || 1) : 1);

  useEffect(() => {
    if (!game || game.mode === "solo" || game.mode === "survival") return;
    if (joined >= game.players.length) return;
    const timer = setTimeout(() => setJoined(j => j + 1), 500 + Math.random() * 700);
    return () => clearTimeout(timer);
  }, [joined, game]);

  if (!game) return null;
  const visible = game.players.slice(0, joined);

  const start = () => setGame(g => ({ ...g, phase: "countdown" })) || go("live");

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <Panel className="p-6 md:p-8 w-full max-w-3xl flex flex-col items-center gap-5" style={{ background: BUZZ.citrus }}>
        <Badge color="paper" className="!text-black">{game.quiz.category}</Badge>
        <h2 className="text-2xl md:text-3xl font-black text-center">{game.quiz.title}</h2>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <span className="text-xs font-black uppercase" style={{ color: INK_L + "99" }}>{t("lobby_pin")}</span>
            <span className="text-4xl md:text-5xl font-black font-mono tracking-widest bg-white px-5 py-2 rounded-2xl border-[3px] mt-1" style={{ borderColor: INK_L }}>{game.pin}</span>
          </div>
          <FakeQR seed={game.pin} size={110} />
        </div>
        {game.mode !== "solo" && game.mode !== "survival" && <p className="font-bold flex items-center gap-1.5">{joined < game.players.length ? <RefreshCw size={15} className="animate-spin" /> : <CheckCircle2 size={15} />} {t("lobby_waiting")}</p>}
      </Panel>

      <Panel className="p-5 w-full max-w-3xl">
        <h3 className="font-black mb-3 flex items-center gap-2"><Users size={18} />{t("lobby_players")} ({visible.length})</h3>
        <div className="flex flex-wrap gap-2">
          {visible.map(p => (
            <div key={p.id} className="flex items-center gap-2 px-3 py-2 rounded-2xl border-2 animate-pop-in" style={{ borderColor: "var(--ink)", background: p.id === "you" ? BUZZ.mint : "var(--bg)" }}>
              <span className="text-lg">{p.emoji}</span>
              <span className="font-bold text-sm">{p.name}{p.id === "you" && " (you)"}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Btn color="mint" size="lg" icon={Rocket} onClick={start} disabled={game.mode === "live" && joined < game.players.length}>{t("lobby_start")}</Btn>
    </div>
  );
}

/* --------------------------------- Live Game --------------------------------------- */

function LiveGame({ ctx }) {
  const { t, game, setGame, go, recordGameResult, profile } = ctx;
  const [phase, setPhase] = useState("question"); // question -> reveal -> leaderboard
  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [myAnswer, setMyAnswer] = useState(undefined);
  const [locked, setLocked] = useState(false);
  const [players, setPlayers] = useState(game?.players || []);
  const [orderDraft, setOrderDraft] = useState([]);
  const [matchDraft, setMatchDraft] = useState({});
  const timerRef = useRef(null);
  const myAnswerRef = useRef(undefined);
  const timeLeftRef = useRef(0);

  const quiz = game?.quiz;
  const q = quiz?.questions[qIndex];

  useEffect(() => { myAnswerRef.current = myAnswer; }, [myAnswer]);

  // once the player locks in an answer, wrap the round up shortly after
  // instead of always waiting out the full timer (nicer pacing)
  useEffect(() => {
    if (!locked || phase !== "question") return;
    const to = setTimeout(() => { if (phase === "question") revealAnswer(qIndex); }, 1100);
    return () => clearTimeout(to);
    // eslint-disable-next-line
  }, [locked]);

  useEffect(() => {
    if (!game) { go("myquizzes"); return; }
    beginQuestion(0);
    // eslint-disable-next-line
  }, []);

  function beginQuestion(idx) {
    const question = quiz.questions[idx];
    if (!question) return endGame();
    setQIndex(idx);
    setMyAnswer(question.type === "multi" ? [] : undefined);
    setOrderDraft(question.type === "ordering" ? shuffle(question.items) : []);
    setMatchDraft({});
    setLocked(false);
    setPhase("question");
    setTimeLeft(question.time);
    timeLeftRef.current = question.time;
    myAnswerRef.current = undefined;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(tl => {
        const next = tl - 1;
        timeLeftRef.current = next;
        if (next <= 0) { clearInterval(timerRef.current); revealAnswer(idx); return 0; }
        return next;
      });
    }, 1000);
  }

  function submitAnswer(ans) {
    if (locked) return;
    setLocked(true);
    setMyAnswer(ans);
    myAnswerRef.current = ans;
  }

  function revealAnswer(idx) {
    clearInterval(timerRef.current);
    const question = quiz.questions[idx];
    setPlayers(prev => {
      const next = prev.map(p => {
        let ans = p.id === "you" ? myAnswerRef.current : botAnswer(question, p.skill);
        const timeUsed = p.id === "you" ? (question.time - timeLeftRef.current) : question.time * (0.3 + Math.random() * 0.6);
        const timeLeftRatio = 1 - timeUsed / question.time;
        const correct = isAnswerCorrect(question, ans);
        const gained = question.type === "poll" ? 0 : scoreForAnswer(correct, timeLeftRatio, question.points);
        const streak = correct && question.type !== "poll" ? p.streak + 1 : (question.type === "poll" ? p.streak : 0);
        return { ...p, score: p.score + gained, streak, bestStreak: Math.max(p.bestStreak, streak), answers: [...p.answers, { qId: question.id, ans, correct, gained, time: timeUsed }] };
      });
      return next;
    });
    setPhase("reveal");
  }

  function nextStep() {
    if (phase === "reveal") { setPhase("leaderboard"); return; }
    if (phase === "leaderboard") {
      // survival: stop if "you" got it wrong
      if (game.mode === "survival") {
        const me = players.find(p => p.id === "you");
        const lastAns = me?.answers[me.answers.length - 1];
        if (lastAns && !lastAns.correct) { endGame(); return; }
      }
      const nextIdx = qIndex + 1;
      if (nextIdx >= quiz.questions.length) endGame();
      else beginQuestion(nextIdx);
    }
  }

  function botAnswer(question, skill) {
    const roll = Math.random();
    switch (question.type) {
      case "mcq": return roll < skill ? question.correct[0] : Math.floor(Math.random() * question.options.length);
      case "multi": return roll < skill ? question.correct : shuffle(question.options.map((_, i) => i)).slice(0, question.correct.length);
      case "boolean": return roll < skill ? question.correct : !question.correct;
      case "short": return roll < skill ? question.accepted[0] : "guess";
      case "matching": return roll < skill ? question.pairs.map(p => p.right) : shuffle(question.pairs.map(p => p.right));
      case "ordering": return roll < skill ? question.items : shuffle(question.items);
      case "poll": return Math.floor(Math.random() * question.options.length);
      default: return null;
    }
  }

  function endGame() {
    clearInterval(timerRef.current);
    const sorted = [...players].sort((a, b) => b.score - a.score);
    const me = sorted.find(p => p.id === "you");
    const myRank = sorted.findIndex(p => p.id === "you") + 1;
    const totalScoreable = quiz.questions.filter(qq => qq.type !== "poll").length;
    const correctCount = me ? me.answers.filter(a => a.correct && quiz.questions.find(qq => qq.id === a.qId)?.type !== "poll").length : 0;
    const accuracy = totalScoreable ? Math.round((correctCount / totalScoreable) * 100) : 100;
    const result = {
      id: uid("hist"), quizTitle: quiz.title, category: quiz.category, mode: game.mode, players: players.length,
      score: me?.score || 0, accuracy, bestStreak: me?.bestStreak || 0, rank: myRank || 1, date: Date.now(),
      fromLibrary: game.fromLibrary, sorted, quiz, me,
    };
    recordGameResult(result);
    setGame(g => ({ ...g, finished: true, finalResult: result, players }));
    go("podium");
  }

  if (!game || !q) return null;
  const pct = Math.round((timeLeft / q.time) * 100);
  const sortedBoard = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <Badge color="violet" className="!text-white">{t("live_question")} {qIndex + 1} {t("live_of")} {quiz.questions.length}</Badge>
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <div className="w-40"><ProgressBar pct={pct} color={pct > 30 ? "mint" : "coral"} /></div>
          <span className="font-mono font-black w-8">{timeLeft}s</span>
        </div>
      </div>

      {phase !== "leaderboard" ? (
        <Panel className="p-6 md:p-8">
          <h2 className="text-xl md:text-3xl font-black text-center mb-4">{q.text}</h2>
          {q.image && <img src={q.image} className="mx-auto h-40 md:h-56 rounded-2xl border-2 object-cover mb-4" style={{ borderColor: "var(--ink)" }} onError={e => e.target.style.display = "none"} />}
          {q.video && <video src={q.video} controls className="mx-auto h-40 md:h-56 rounded-2xl border-2 mb-4" style={{ borderColor: "var(--ink)" }} />}
          {q.audio && <audio src={q.audio} controls className="mx-auto mb-4 w-full max-w-md block" />}
          <QuestionPlayArea q={q} phase={phase} myAnswer={myAnswer} locked={locked} submitAnswer={submitAnswer}
            orderDraft={orderDraft} setOrderDraft={setOrderDraft} matchDraft={matchDraft} setMatchDraft={setMatchDraft} t={t} />
          <div className="flex justify-center mt-5">
            {phase === "question" && (
              <Btn color="mint" size="lg" icon={Send} disabled={locked} onClick={() => submitAnswer(myAnswer)}>{locked ? t("live_submitted") : t("live_submit")}</Btn>
            )}
            {phase === "reveal" && <Btn color="citrus" size="lg" icon={ChevronRight} onClick={nextStep}>{t("live_leaderboard")}</Btn>}
          </div>
        </Panel>
      ) : (
        <Panel className="p-6 md:p-8">
          <h3 className="text-xl font-black text-center mb-4 flex items-center justify-center gap-2"><Trophy size={22} />{t("live_leaderboard")}</h3>
          <div className="flex flex-col gap-2 max-w-xl mx-auto">
            {sortedBoard.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-2xl border-2 animate-pop-in" style={{ borderColor: "var(--ink)", background: p.id === "you" ? BUZZ.mint : "var(--surface)", animationDelay: `${i * 60}ms` }}>
                <span className="font-black w-6 text-center">{i + 1}</span>
                <Avatar emoji={p.emoji} size={32} color={BUZZ_ORDER[i % BUZZ_ORDER.length]} />
                <span className="font-bold flex-1 truncate">{p.name}{p.id === "you" && " (you)"}</span>
                {p.streak > 1 && <span className="flex items-center gap-0.5 text-xs font-black" style={{ color: BUZZ.coral }}><Flame size={14} />{p.streak}</span>}
                <span className="font-mono font-black">{p.score}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-5">
            <Btn color="violet" className="!text-white" size="lg" icon={ChevronRight} onClick={nextStep}>{t("live_continue")}</Btn>
          </div>
        </Panel>
      )}
    </div>
  );
}

function QuestionPlayArea({ q, phase, myAnswer, locked, submitAnswer, orderDraft, setOrderDraft, matchDraft, setMatchDraft, t }) {
  const reveal = phase === "reveal";
  if (q.type === "mcq" || q.type === "poll") {
    return (
      <div className="grid sm:grid-cols-2 gap-3">
        {q.options.map((o, i) => {
          const isCorrect = q.type !== "poll" && q.correct.includes(i);
          const isMine = myAnswer === i;
          const show = reveal && q.type !== "poll";
          return (
            <button key={o.id} disabled={locked} onClick={() => submitAnswer(i)}
              className="p-4 rounded-2xl border-[2.5px] font-bold text-left flex items-center gap-2.5 transition-all disabled:opacity-90"
              style={{ borderColor: "var(--ink)", background: BUZZ[BUZZ_ORDER[i % BUZZ_ORDER.length]], boxShadow: isMine ? "0 0 0 3px " + INK_L : "3px 3px 0 var(--ink)",
                opacity: show ? (isCorrect ? 1 : 0.45) : 1 }}>
              {show && (isCorrect ? <CheckCircle2 size={18} /> : isMine ? <XCircle size={18} /> : null)}
              {o.text || `Option ${i + 1}`}
            </button>
          );
        })}
      </div>
    );
  }
  if (q.type === "multi") {
    const selArr = myAnswer || [];
    return (
      <div className="grid sm:grid-cols-2 gap-3">
        {q.options.map((o, i) => {
          const isCorrect = q.correct.includes(i);
          const isMine = selArr.includes(i);
          return (
            <button key={o.id} disabled={locked} onClick={() => submitAnswer(selArr.includes(i) ? selArr.filter(x => x !== i) : [...selArr, i])}
              className="p-4 rounded-2xl border-[2.5px] font-bold text-left flex items-center gap-2.5"
              style={{ borderColor: "var(--ink)", background: BUZZ[BUZZ_ORDER[i % BUZZ_ORDER.length]], boxShadow: isMine ? "0 0 0 3px " + INK_L : "3px 3px 0 var(--ink)",
                opacity: reveal ? (isCorrect ? 1 : 0.45) : 1 }}>
              {reveal && (isCorrect ? <CheckCircle2 size={18} /> : isMine ? <XCircle size={18} /> : null)}
              {o.text}
            </button>
          );
        })}
        <p className="text-xs font-semibold col-span-full" style={{ color: "var(--muted)" }}>Select all that apply, then submit.</p>
      </div>
    );
  }
  if (q.type === "boolean") {
    return (
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        {[true, false].map(v => (
          <button key={String(v)} disabled={locked} onClick={() => submitAnswer(v)}
            className="p-6 rounded-2xl border-[2.5px] font-black text-xl flex items-center justify-center gap-2"
            style={{ borderColor: "var(--ink)", background: v ? BUZZ.mint : BUZZ.coral, boxShadow: myAnswer === v ? "0 0 0 3px " + INK_L : "3px 3px 0 var(--ink)",
              opacity: reveal ? (v === q.correct ? 1 : 0.45) : 1 }}>
            {v ? <CheckCircle2 /> : <XCircle />} {v ? "True" : "False"}
          </button>
        ))}
      </div>
    );
  }
  if (q.type === "short") {
    return (
      <div className="max-w-md mx-auto flex flex-col gap-2">
        <input disabled={locked} value={myAnswer || ""} onChange={e => submitAnswer(e.target.value)} placeholder={t("live_yourAnswer")}
          className="p-4 rounded-2xl border-[2.5px] font-bold text-lg text-center outline-none" style={{ borderColor: "var(--ink)", background: "var(--surface)" }} />
        {reveal && <p className="text-center text-sm font-bold" style={{ color: BUZZ.mint }}>✓ {q.accepted[0]}</p>}
      </div>
    );
  }
  if (q.type === "ordering") {
    const move = (i, dir) => {
      const arr = [...orderDraft];
      const j = i + dir;
      if (j < 0 || j >= arr.length) return;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      setOrderDraft(arr);
      submitAnswer(arr);
    };
    return (
      <div className="max-w-md mx-auto flex flex-col gap-2">
        {orderDraft.map((it, i) => (
          <div key={it} className="flex items-center gap-2 p-3 rounded-2xl border-2" style={{ borderColor: "var(--ink)", background: BUZZ[BUZZ_ORDER[i % BUZZ_ORDER.length]] }}>
            <span className="w-6 h-6 rounded-lg border-2 bg-white flex items-center justify-center text-xs font-black shrink-0" style={{ borderColor: "var(--ink)" }}>{i + 1}</span>
            <span className="font-bold flex-1">{it}</span>
            {!locked && (<div className="flex flex-col gap-0.5"><button onClick={() => move(i, -1)}><ChevronDown className="rotate-180" size={16} /></button><button onClick={() => move(i, 1)}><ChevronDown size={16} /></button></div>)}
          </div>
        ))}
        {reveal && <p className="text-center text-sm font-bold mt-1" style={{ color: BUZZ.mint }}>✓ {q.items.join(" → ")}</p>}
      </div>
    );
  }
  if (q.type === "matching") {
    const rightOptions = shuffle(q.pairs.map(p => p.right));
    const assign = (left, right) => {
      const next = { ...matchDraft, [left]: right };
      setMatchDraft(next);
      submitAnswer(q.pairs.map(p => next[p.left]));
    };
    return (
      <div className="max-w-md mx-auto flex flex-col gap-2.5">
        {q.pairs.map((p, i) => (
          <div key={p.left} className="flex items-center gap-2">
            <span className="flex-1 p-2.5 rounded-xl border-2 font-bold" style={{ borderColor: "var(--ink)", background: BUZZ[BUZZ_ORDER[i % BUZZ_ORDER.length]] }}>{p.left}</span>
            <ArrowLeft className="rotate-180 shrink-0" size={16} />
            <select disabled={locked} value={matchDraft[p.left] || ""} onChange={e => assign(p.left, e.target.value)}
              className="flex-1 p-2.5 rounded-xl border-2 font-bold outline-none" style={{ borderColor: "var(--ink)", background: "var(--surface)" }}>
              <option value="">…</option>
              {rightOptions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        ))}
        {reveal && <p className="text-center text-sm font-bold mt-1" style={{ color: BUZZ.mint }}>✓ {q.pairs.map(p => `${p.left}→${p.right}`).join(", ")}</p>}
      </div>
    );
  }
  return null;
}

/* ---------------------------------- Podium ------------------------------------- */

function Podium({ ctx }) {
  const { t, game, go } = ctx;
  useEffect(() => { if (!game?.finalResult) go("myquizzes"); }, []);
  if (!game?.finalResult) return null;
  const sorted = game.finalResult.sorted;
  const top3 = sorted.slice(0, 3);
  const order = top3.length === 3 ? [top3[1], top3[0], top3[2]] : top3;
  const heights = [130, 170, 100];

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <Sparkles className="text-current animate-floaty" size={36} style={{ color: BUZZ.citrus }} />
      <h2 className="text-2xl md:text-3xl font-black text-center">{t("podium_congrats")}</h2>
      <div className="flex items-end gap-3 md:gap-6">
        {order.map((p, i) => {
          const rank = top3.indexOf(p) + 1;
          const h = top3.length === 3 ? heights[i] : 140;
          return (
            <div key={p.id} className="flex flex-col items-center gap-2 animate-pop-in" style={{ animationDelay: `${i * 150}ms` }}>
              {rank === 1 && <Crown size={28} style={{ color: BUZZ.citrus }} />}
              <Avatar emoji={p.emoji} size={54} color={BUZZ_ORDER[rank % BUZZ_ORDER.length]} />
              <span className="font-black text-sm md:text-base">{p.name}</span>
              <span className="font-mono font-black text-sm" style={{ color: "var(--muted)" }}>{p.score}</span>
              <div className="w-20 md:w-28 rounded-t-2xl border-[2.5px] flex items-start justify-center pt-2 font-black text-2xl"
                style={{ height: h, borderColor: "var(--ink)", background: rank === 1 ? BUZZ.citrus : rank === 2 ? BUZZ.sky : BUZZ.coral, boxShadow: "4px 0 0 var(--ink)" }}>
                {rank}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2">
        <Btn color="mint" icon={BarChart3} onClick={() => go("results")}>{t("btn_viewResults")}</Btn>
        <Btn variant="outline" icon={RefreshCw} onClick={() => startLobby(ctx, game.quiz, game.mode)}>{t("btn_playAgain")}</Btn>
      </div>
    </div>
  );
}

/* --------------------------------- Results -------------------------------------- */

function ResultsPage({ ctx }) {
  const { t, game, go } = ctx;
  useEffect(() => { if (!game?.finalResult) go("myquizzes"); }, []);
  if (!game?.finalResult) return null;
  const { sorted, quiz, me } = game.finalResult;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={Star} label="Score" value={me?.score || 0} color="citrus" />
        <StatCard icon={Target} label={t("results_accuracy")} value={`${game.finalResult.accuracy}%`} color="mint" />
        <StatCard icon={Flame} label={t("live_streak")} value={me?.bestStreak || 0} color="coral" />
      </div>

      <Panel className="p-5">
        <h3 className="font-black text-lg mb-3">{t("results_players")}</h3>
        <div className="flex flex-col gap-2">
          {sorted.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3 p-2.5 rounded-2xl border-2" style={{ borderColor: "var(--ink)", background: p.id === "you" ? BUZZ.mint : "var(--bg)" }}>
              <span className="font-black w-6 text-center">{i + 1}</span>
              <Avatar emoji={p.emoji} size={30} color={BUZZ_ORDER[i % BUZZ_ORDER.length]} />
              <span className="font-bold flex-1 truncate">{p.name}</span>
              <span className="font-mono font-black">{p.score}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="p-5">
        <h3 className="font-black text-lg mb-3">{t("results_perQuestion")}</h3>
        <div className="flex flex-col gap-3">
          {quiz.questions.map((q, i) => {
            const a = me?.answers.find(x => x.qId === q.id);
            const QT = QUESTION_TYPES.find(x => x.id === q.type);
            const Icon = QT?.icon || HelpCircle;
            return (
              <div key={q.id} className="flex items-center gap-3 p-3 rounded-2xl border-2" style={{ borderColor: "var(--ink)", background: "var(--bg)" }}>
                <span className="w-7 h-7 rounded-lg border-2 flex items-center justify-center text-xs font-black shrink-0" style={{ borderColor: "var(--ink)", background: "var(--surface)" }}>{i + 1}</span>
                <Icon size={16} className="shrink-0" />
                <span className="font-bold flex-1 truncate">{q.text}</span>
                {q.type !== "poll" && (a?.correct ? <CheckCircle2 size={18} style={{ color: BUZZ.mint }} /> : <XCircle size={18} style={{ color: BUZZ.coral }} />)}
                <span className="font-mono font-black text-sm w-14 text-right">{q.type === "poll" ? "—" : `+${a?.gained || 0}`}</span>
              </div>
            );
          })}
        </div>
      </Panel>

      <div className="flex gap-2 justify-center">
        <Btn color="violet" className="!text-white" icon={BarChart3} onClick={() => go("stats")}>{t("nav_stats")}</Btn>
        <Btn variant="outline" icon={Home} onClick={() => go("dashboard")}>{t("nav_dashboard")}</Btn>
      </div>
    </div>
  );
}

/* -------------------------------- Statistics -------------------------------------- */

function Statistics({ ctx }) {
  const { t, history, catLabel } = ctx;
  const trend = useMemo(() => [...history].slice(0, 10).reverse().map((h, i) => ({ name: `#${i + 1}`, accuracy: h.accuracy, score: h.score })), [history]);
  const byCat = useMemo(() => {
    const map = {};
    history.forEach(h => { map[h.category] = map[h.category] || { category: h.category, total: 0, count: 0 }; map[h.category].total += h.accuracy; map[h.category].count++; });
    return Object.values(map).map(x => ({ category: catLabel(x.category), accuracy: Math.round(x.total / x.count) }));
  }, [history]);
  const typeDist = useMemo(() => {
    const map = {};
    history.forEach(h => Object.entries(h.typeBreakdown || {}).forEach(([k, v]) => map[k] = (map[k] || 0) + v));
    return QUESTION_TYPES.map(qt => ({ type: qt.label.en, count: map[qt.id] || 0 }));
  }, [history]);
  const topPlayers = useMemo(() => {
    const demo = [
      { name: "You", score: history.reduce((a, h) => a + h.score, 0), emoji: ctx.profile.emoji },
      { name: "Nova", score: Math.round(3000 + Math.random() * 4000), emoji: "🦊" },
      { name: "Rex", score: Math.round(2500 + Math.random() * 4000), emoji: "🐼" },
      { name: "Kira", score: Math.round(2000 + Math.random() * 4000), emoji: "🦄" },
      { name: "Pixel", score: Math.round(1500 + Math.random() * 3000), emoji: "🐸" },
    ];
    return demo.sort((a, b) => b.score - a.score);
  }, [history]);

  const avgAcc = history.length ? Math.round(history.reduce((a, h) => a + h.accuracy, 0) / history.length) : 0;
  const totalGames = history.length;
  const bestStreak = Math.max(0, ...history.map(h => h.bestStreak || 0));

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Gamepad2} label="Games played" value={totalGames} color="citrus" />
        <StatCard icon={Target} label={t("results_accuracy")} value={`${avgAcc}%`} color="mint" />
        <StatCard icon={Flame} label={t("dash_bestStreak")} value={bestStreak} color="coral" />
        <StatCard icon={Trophy} label="Best rank" value={`#${Math.min(...history.map(h => h.rank), 1)}`} color="sky" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Panel className="p-5">
          <h3 className="font-black text-lg mb-3">{t("stats_scoreTrend")}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="4 4" stroke="var(--muted)" opacity={0.25} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 700, fill: "var(--muted)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontWeight: 700, fill: "var(--muted)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: `2px solid ${INK_L}`, fontWeight: 700 }} />
              <Line type="monotone" dataKey="accuracy" stroke={BUZZ.violet} strokeWidth={3} dot={{ r: 4, fill: BUZZ.violet, stroke: INK_L, strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
        <Panel className="p-5">
          <h3 className="font-black text-lg mb-3">{t("stats_categoryPerf")}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={byCat}>
              <PolarGrid stroke="var(--muted)" opacity={0.3} />
              <PolarAngleAxis dataKey="category" tick={{ fontSize: 10, fontWeight: 700, fill: "var(--muted)" }} />
              <Radar dataKey="accuracy" stroke={BUZZ.coral} fill={BUZZ.coral} fillOpacity={0.4} strokeWidth={2} />
              <Tooltip contentStyle={{ borderRadius: 12, border: `2px solid ${INK_L}`, fontWeight: 700 }} />
            </RadarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <Panel className="p-5">
        <h3 className="font-black text-lg mb-3">{t("stats_typeDist")}</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={typeDist} layout="vertical">
            <XAxis type="number" hide />
            <YAxis dataKey="type" type="category" tick={{ fontSize: 11, fontWeight: 700, fill: "var(--muted)" }} axisLine={false} tickLine={false} width={110} />
            <Tooltip contentStyle={{ borderRadius: 12, border: `2px solid ${INK_L}`, fontWeight: 700 }} />
            <Bar dataKey="count" fill={BUZZ.sky} radius={[0,8,8,0]} stroke={INK_L} strokeWidth={2} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      <Panel className="p-5">
        <h3 className="font-black text-lg mb-3">{t("stats_topPlayers")}</h3>
        <div className="flex flex-col gap-2">
          {topPlayers.map((p, i) => (
            <div key={p.name} className="flex items-center gap-3 p-2.5 rounded-2xl border-2" style={{ borderColor: "var(--ink)", background: p.name === "You" ? BUZZ.mint : "var(--bg)" }}>
              <span className="font-black w-6 text-center">{i + 1}</span>
              <Avatar emoji={p.emoji} size={30} color={BUZZ_ORDER[i % BUZZ_ORDER.length]} />
              <span className="font-bold flex-1">{p.name}</span>
              <span className="font-mono font-black">{p.score}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* --------------------------------- Profile -------------------------------------- */

function Profile({ ctx }) {
  const { t, profile, setProfile, history, quizzes, achState } = ctx;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile.name);

  const totalGames = history.length;
  const avgAcc = history.length ? Math.round(history.reduce((a, h) => a + h.accuracy, 0) / history.length) : 0;
  const totalScore = history.reduce((a, h) => a + h.score, 0);

  return (
    <div className="flex flex-col gap-5">
      <Panel className="p-6 flex flex-col sm:flex-row items-center gap-5" style={{ background: BUZZ[profile.color] }}>
        <div className="flex flex-col items-center gap-2">
          <Avatar emoji={profile.emoji} size={80} color={profile.color} />
          <div className="flex gap-1 flex-wrap justify-center max-w-[220px]">
            {AVATAR_EMOJI.slice(0, 8).map(e => (
              <button key={e} onClick={() => setProfile(p => ({ ...p, emoji: e }))} className="w-7 h-7 rounded-lg border-2 flex items-center justify-center text-sm" style={{ borderColor: "var(--ink)", background: profile.emoji === e ? "#fff" : "transparent" }}>{e}</button>
            ))}
          </div>
        </div>
        <div className="flex-1 text-center sm:text-left">
          {editing ? (
            <div className="flex gap-2 items-center justify-center sm:justify-start">
              <input value={name} onChange={e => setName(e.target.value)} className="text-2xl font-black bg-white/70 rounded-xl px-3 py-1 outline-none border-2" style={{ borderColor: "var(--ink)" }} />
              <IconBtn icon={CheckCircle2} onClick={() => { setProfile(p => ({ ...p, name })); setEditing(false); }} />
            </div>
          ) : (
            <h2 className="text-2xl md:text-3xl font-black flex items-center gap-2 justify-center sm:justify-start">{profile.name}
              <button onClick={() => setEditing(true)}><Edit3 size={18} /></button>
            </h2>
          )}
          <div className="flex gap-1.5 flex-wrap justify-center sm:justify-start mt-2">
            {BUZZ_ORDER.map(c => <button key={c} onClick={() => setProfile(p => ({ ...p, color: c }))} className="w-6 h-6 rounded-full border-2" style={{ background: BUZZ[c], borderColor: profile.color === c ? "var(--ink)" : "transparent" }} />)}
          </div>
        </div>
      </Panel>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Gamepad2} label="Games" value={totalGames} color="citrus" />
        <StatCard icon={Target} label={t("results_accuracy")} value={`${avgAcc}%`} color="mint" />
        <StatCard icon={Star} label="Total score" value={totalScore} color="sky" />
        <StatCard icon={FolderOpen} label={t("dash_totalQuizzes")} value={quizzes.length} color="rose" />
      </div>

      <Panel className="p-5">
        <h3 className="font-black text-lg mb-3">{t("profile_achievements")}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ACHIEVEMENTS.map(a => {
            const unlocked = a.check(achState);
            const Icon = a.icon;
            return (
              <div key={a.id} className="p-3 rounded-2xl border-2 flex flex-col items-center text-center gap-1.5" style={{ borderColor: "var(--ink)", background: unlocked ? BUZZ.citrus : "var(--bg)", opacity: unlocked ? 1 : 0.5 }}>
                <Icon size={24} />
                <span className="font-black text-sm">{a.title.en}</span>
                <span className="text-xs font-semibold" style={{ color: "var(--muted)" }}>{a.desc.en}</span>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}

/* -------------------------------- Settings -------------------------------------- */

function SettingsPage({ ctx }) {
  const { t, theme, setTheme, lang, setLang, pushToast, setQuizzes, setHistory } = ctx;
  const [confirmClear, setConfirmClear] = useState(false);

  const exportAll = () => {
    const data = localStorage.getItem(LS_KEY) || "{}";
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "buzzr-data.json"; a.click();
    URL.revokeObjectURL(url);
  };
  const clearAll = () => {
    localStorage.removeItem(LS_KEY);
    setQuizzes(demoQuizzes());
    setHistory(seedHistory());
    pushToast(t("toast_cleared"), "coral");
    setConfirmClear(false);
  };

  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      <Panel className="p-5">
        <h3 className="font-black text-lg mb-4">{t("settings_appearance")}</h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-black uppercase tracking-wide" style={{ color: "var(--muted)" }}>{t("settings_theme")}</label>
            <div className="flex gap-2 mt-1.5">
              <button onClick={() => setTheme("light")} className="flex-1 p-3 rounded-2xl border-2 font-bold flex items-center justify-center gap-2" style={{ borderColor: "var(--ink)", background: theme === "light" ? BUZZ.citrus : "var(--surface)" }}><Sun size={18} />{t("settings_light")}</button>
              <button onClick={() => setTheme("dark")} className="flex-1 p-3 rounded-2xl border-2 font-bold flex items-center justify-center gap-2" style={{ borderColor: "var(--ink)", background: theme === "dark" ? BUZZ.violet : "var(--surface)", color: theme === "dark" ? "#fff" : "var(--ink)" }}><Moon size={18} />{t("settings_dark")}</button>
            </div>
          </div>
          <div>
            <label className="text-xs font-black uppercase tracking-wide" style={{ color: "var(--muted)" }}>{t("settings_language")}</label>
            <div className="flex gap-2 mt-1.5">
              {[["en","English"],["ru","Русский"],["kz","Қазақша"]].map(([code, label]) => (
                <button key={code} onClick={() => setLang(code)} className="flex-1 p-3 rounded-2xl border-2 font-bold" style={{ borderColor: "var(--ink)", background: lang === code ? BUZZ.mint : "var(--surface)" }}>{label}</button>
              ))}
            </div>
          </div>
        </div>
      </Panel>

      <Panel className="p-5">
        <h3 className="font-black text-lg mb-4">{t("settings_data")}</h3>
        <div className="flex flex-wrap gap-2">
          <Btn variant="outline" icon={Download} onClick={exportAll}>{t("settings_exportAll")}</Btn>
          <Btn color="coral" icon={Trash2} onClick={() => setConfirmClear(true)}>{t("settings_clearData")}</Btn>
        </div>
      </Panel>

      <Modal open={confirmClear} onClose={() => setConfirmClear(false)} title={t("settings_clearData") + "?"}>
        <p className="mb-4 font-semibold" style={{ color: "var(--muted)" }}>This resets quizzes and history back to demo data. This can't be undone.</p>
        <div className="flex gap-2 justify-end">
          <Btn variant="outline" onClick={() => setConfirmClear(false)}>{t("btn_cancel")}</Btn>
          <Btn color="coral" onClick={clearAll}>{t("settings_clearData")}</Btn>
        </div>
      </Modal>
    </div>
  );
}
