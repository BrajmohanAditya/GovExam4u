export const navbarStyles = {
  // Main nav container
  nav: "w-full sticky top-0 z-50 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 shadow-2xl py-3 sm:py-4 px-4 sm:px-6 lg:px-10 relative overflow-visible",

  // Main container

  container: "flex justify-between ",

  // Logo section
  logoContainer: "flex items-center flex-shrink-0",
  logoButton:
    "inline-flex items-center p-0 bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transform transition-transform duration-200",
  logoLink:
    "relative bg-gradient-to-br from-blue-400 to-purple-600 p-0.5 rounded-full",
  logoInner: "bg-gradient-to-b from-blue-900 to-purple-900 p-1 rounded-full",
  logoImage:
    "h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-purple-300",

  // Title section
  // titleContainer: "flex-1 flex justify-center px-3",
  titleText:
    "text-sm sm:text-base md:text-lg lg:text-2xl font-bold font-[pacifico] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center truncate",

  // Desktop buttons
  desktopButtonsContainer:
    "hidden md:flex items-center cursor-pointer flex-shrink-0 space-x-3",
  spacer: "hidden sm:block w-2",

  // Button styles
  resultsButton:
    "inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-medium shadow-md cursor-pointer transform transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400",
  logoutButton:
    "inline-flex cursor-pointer items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium shadow-md transform transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400",
  loginButton:
    "inline-flex cursor-pointer items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-medium shadow-md transform transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400",
  buttonIcon: "h-4 w-4 flex-shrink-0",

  // Mobile menu
  mobileMenuContainer: "md:hidden flex items-center",
  menuToggleButton:
    "inline-flex items-center justify-center p-2 rounded-full bg-white/90 shadow-sm hover:scale-105 transform transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400",
  menuIcon: "h-5 w-5",
  mobileMenuPanel:
    "absolute right-4 top-full mt-3 w-48 bg-white rounded-lg shadow-lg border z-50 overflow-hidden",
  mobileMenuList: "divide-y",
  mobileMenuItem:
    "w-full text-left px-4 py-3 flex items-center gap-2 text-sm hover:bg-gray-50",
  mobileMenuIcon: "h-4 w-4",

  // Animations and utility styles
  animations: `
    @keyframes float-slow {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-16px); }
      100% { transform: translateY(0px); }
    }
    @keyframes float-slower {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    @keyframes float-slowest {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
      100% { transform: translateY(0px); }
    }
    .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
    .animate-float-slower { animation: float-slower 9s ease-in-out infinite; }
    .animate-float-slowest { animation: float-slowest 11s ease-in-out infinite; }

    @media (max-width: 420px) {
      nav { padding-left: 12px; padding-right: 12px; }
    }
  `,
};

export const sidebarStyles = {
  // Page container
  pageContainer: "min-h-screen bg-gradient-to-br from-slate-50 to-gray-100",

  // Mobile overlay
  mobileOverlay: "fixed inset-0 bg-black/30 z-30 md:hidden",

  // Main container
  mainContainer: "flex xl:h-screen xl:overflow-y-hidden",

  // Sidebar styles
  sidebar:
    "fixed h-screen z-40 left-0 w-80 transform transition-transform duration-300 ease-in-out bg-white shadow-lg rounded-r-2xl overflow-y-auto border-r border-gray-200  md:translate-x-0 md:flex md:flex-col",

  // Sidebar header
  sidebarHeader:
    "top-0 z-20 p-6 bg-gradient-to-r from-blue-100 to-indigo-100 text-slate-800 relative overflow-hidden",
  headerDecoration1:
    "absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 bg-white opacity-20 rounded-full",
  headerDecoration2:
    "absolute bottom-0 left-0 w-24 h-24 -mb-12 -ml-12 bg-blue-200 opacity-40 rounded-full",
  headerContent:
    "flex font-[pacifico] items-center justify-between relative z-10",
  logoContainer: "flex items-center space-x-3",
  logoIcon: "p-2 bg-white/40 rounded-xl backdrop-blur-sm border border-white",
  logoTitle: "text-2xl font-bold",
  logoSubtitle: "mt-1 text-slate-600 text-sm",
  closeButton: "md:hidden p-2 rounded-md hover:bg-white/50",

  // Sidebar content
  sidebarContent: "sidebar-content flex-1 overflow-y-auto p-4",
  technologiesHeader: "mb-4 flex items-center justify-between",
  technologiesTitle: "text-lg font-semibold text-slate-700",
  technologiesCount: "text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full",

  // Technology items
  techItem: "mb-3",
  techButton:
    "w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 border",
  techButtonSelected: "border-current shadow-md transform scale-[1.02]",
  techButtonNormal: "border-gray-100 hover:border-gray-300 hover:bg-gray-50",
  techButtonContent: "flex items-center space-x-3",
  techIcon: "p-2 rounded-lg border",
  techName: "font-medium",

  // Levels container
  levelsContainer: "mt-3 ml-2 p-3 bg-gray-50 rounded-xl border border-gray-100",
  levelsTitle: "text-sm font-medium text-slate-700 mb-2 flex items-center",
  techBadge: "ml-2 text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full",

  // Level buttons
  levelButton:
    "w-full flex items-center justify-between cursor-pointer p-3 my-2 rounded-lg border transition-all",
  levelButtonSelected: "border-current shadow-sm font-bold",
  levelButtonNormal: "border-gray-100 hover:bg-white",
  levelButtonContent: "flex items-center space-x-2",
  levelIcon: "p-1.5 rounded-md",
  levelQuestions: "text-xs bg-gray-200 text-slate-700 px-2 py-1 rounded-full",

  // Sidebar footer
  sidebarFooter: "sticky bottom-0 z-20 p-4 border-t border-gray-100 bg-white",
  footerContent: "flex items-center justify-center text-slate-500",
  footerContentCenter: "text-center text-xs",
  footerHighlight: "mt-1 text-blue-600 font-medium",

  // Main content
  mainContent: "flex-1 min-h-screen p-4 md:p-8 ml-0 md:ml-0",

  // Mobile header
  mobileHeader: "flex items-center justify-between mb-4 md:hidden",
  menuButton: "p-2 rounded-md bg-white shadow-sm",
  mobileTitle: "flex-1 mx-3",
  mobileTechInfo: "flex items-center font-[pacifico] justify-center space-x-3",
  mobileTechIcon: "p-2 rounded-md border",
  mobileTechText: "text-center",
  mobileTechName: "text-sm font-semibold",
  mobileTechLevel: "text-xs text-slate-600",
  mobilePlaceholder: "text-center text-sm text-slate-600",

  // Mobile levels
  mobileLevels: "md:hidden mb-4",
  mobileLevelsContainer: "flex gap-2 overflow-x-auto",
  mobileLevelButton:
    "flex-none px-4 py-2 rounded-xl border border-gray-200 bg-white shadow-sm text-sm font-medium",

  // Welcome screen
  welcomeContainer:
    "h-full xl:pt-75 font-[pacifico] lg:pb-90 flex items-center justify-center",
  welcomeContent:
    "text-center font-[pacifico] max-w-2xl mx-auto bg-white/90 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-lg border border-white",
  welcomeIcon:
    "inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full shadow mb-6",
  welcomeTitle:
    "text-2xl md:text-4xl font-bold text-slate-800 mb-4 font-[pacifico]",
  welcomeDescription: "text-sm md:text-lg text-slate-700 mb-6 max-w-md mx-auto",

  // Features grid
  featuresGrid:
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6",
  featureCard:
    "bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-5 rounded-2xl border border-blue-100 text-center",
  featureIcon:
    "inline-flex items-center justify-center p-3 bg-green-100 text-green-600 rounded-full mb-3",
  featureTitle: "font-semibold text-slate-800 mb-2",
  featureDescription: "text-xs md:text-sm text-slate-600",

  // Welcome prompt
  welcomePrompt:
    "bg-gradient-to-r from-blue-100 to-indigo-100 p-3 md:p-4 rounded-2xl border border-blue-200 shadow-inner",
  welcomePromptText:
    "text-blue-700 font-medium flex items-center justify-center",

  // Level selection
  levelSelectionContainer:
    "h-full xl:mt-60 md:pb-200 pb-30 flex items-center justify-center",
  levelSelectionContent:
    "text-center bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-gray-100 max-w-md",
  techSelectionIcon: "p-5 rounded-2xl inline-flex mb-6 shadow-sm",
  techSelectionTitle: "text-2xl md:text-3xl font-bold text-slate-800 mb-2",
  techSelectionDescription: "text-slate-600 mb-6",
  techSelectionPrompt:
    "bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-xl border border-blue-200",
  techSelectionPromptText: "text-blue-700 font-medium",

  // Results screen
  resultsContainer:
    "h-full lg:pb-140 xl:pb-0 md:pb-90 flex items-center justify-center",
  resultsContent:
    "bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-gray-100 max-w-2xl w-full",
  resultsHeader: "text-center",
  performanceIcon: "p-4 rounded-2xl inline-flex mb-6 shadow-sm",
  resultsTitle:
    "text-2xl md:text-4xl font-bold text-slate-800 mb-2 font-[pacifico]",
  resultsSubtitle: "text-slate-600 mb-2",
  performanceBadge:
    "inline-block text-slate-800 px-4 py-1 rounded-full text-sm font-medium mb-6",

  // Score grid
  scoreGrid: "grid grid-cols-2 gap-4 mb-6",
  scoreCard:
    "bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200 text-center",
  scoreIcon:
    "inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-3 shadow-inner",
  scoreNumber: "text-2xl font-bold text-green-600",
  scoreLabel: "text-green-700 font-medium",

  // Score progress
  scoreProgress:
    "bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-2xl border border-indigo-200 mb-6",
  scoreProgressHeader: "flex items-center justify-between mb-4",
  scoreProgressTitle: "text-indigo-700 font-semibold",
  scoreProgressPercentage: "text-indigo-700 font-bold",
  scoreProgressBar: "w-full bg-gray-200 rounded-full h-4",
  scoreProgressFill: "h-4 rounded-full transition-all duration-500",

  // Quiz container
  quizContainer: "max-w-3xl mx-auto",
  quizHeader:
    "mb-4 bg-white p-4 md:p-6 rounded-2xl shadow-md border border-gray-100",
  quizTitleContainer: "flex items-center justify-between mb-2",
  quizTitle: "text-xl md:text-2xl font-bold text-slate-800",
  quizCounter:
    "text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium",
  progressBar: "w-full bg-gray-200 rounded-full h-2.5 mb-2",
  progressFill:
    "bg-gradient-to-r from-blue-300 to-indigo-300 h-2.5 rounded-full transition-all duration-500",

  // Question container
  questionContainer:
    "bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100",
  questionHeader: "flex items-center mb-2",
  questionIcon: "bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-3",
  questionText: "text-lg md:text-xl font-semibold text-slate-800",

  // Options container
  optionsContainer: "space-y-4 mt-6",
  optionButton:
    "w-full cursor-pointer text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-300",
  optionNormal:
    "border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-sm",
  optionCorrect: "bg-green-50 border-green-300 text-green-700 shadow-sm",
  optionIncorrect: "bg-red-50 border-red-300 text-red-700 shadow-sm",
  optionContent: "flex items-center",
  optionIconCorrect: "mr-3 text-green-500 flex-shrink-0",
  optionIconIncorrect: "mr-3 text-red-500 flex-shrink-0",
  optionIconEmpty:
    "w-5 h-5 rounded-full border-2 border-gray-200 mr-3 flex-shrink-0",
  optionText: "text-sm md:text-lg",

  // Loading container
  loadingContainer: "h-full flex items-center justify-center",
  loadingContent:
    "text-center bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-gray-100",
  loadingSpinner:
    "animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mx-auto mb-4",
  loadingTitle: "text-lg md:text-xl font-semibold text-slate-800 mb-2",
  loadingDescription: "text-sm md:text-base text-slate-600",

  // Custom styles
  customStyles: `
    .sidebar-content {
      -webkit-overflow-scrolling: touch;
    }

    aside .sidebar-content::-webkit-scrollbar {
      width: 10px;
    }
    aside .sidebar-content::-webkit-scrollbar-track {
      background: transparent;
    }
    aside .sidebar-content::-webkit-scrollbar-thumb {
      background-color: rgba(99,102,241,0.12);
      border-radius: 999px;
      border: 2px solid transparent;
      background-clip: padding-box;
    }
    aside .sidebar-content::-webkit-scrollbar-thumb:hover {
      background-color: rgba(99,102,241,0.18);
    }

    aside .sidebar-content {
      scrollbar-width: thin;
      scrollbar-color: rgba(99,102,241,0.12) transparent;
    }
  `,
};

export const resultStyles = {
  // Page container
  pageContainer: "min-h-screen bg-gray-50 p-6",
  container: "max-w-6xl font-[pacifico] mx-auto",

  // Header
  header:
    "mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4",
  title: "text-2xl md:text-3xl lg:text-2xl font-semibold",
  headerControls: "flex items-center gap-3",

  // Filter section
  filterContainer: "mb-4",
  filterContent: "flex items-center justify-between gap-3",
  filterButtons: "flex flex-wrap items-center gap-2",
  filterLabel: "text-sm text-gray-600 mr-2",
  filterButton:
    "px-3 py-1 rounded-full text-sm font-medium border shadow-sm focus:outline-none",
  filterButtonActive: "bg-indigo-600 text-white",
  filterButtonInactive: "bg-white text-gray-700",
  filterStatus: "text-sm text-gray-500",

  // Loading state
  loadingContainer: "text-center py-20",
  loadingSpinner:
    "inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mb-4",
  loadingText: "text-gray-600",

  // Track sections
  trackSection: "mb-6",
  trackTitle: "text-lg md:text-xl lg:text-lg font-semibold mb-3",

  // Results grid
  resultsGrid:
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-4",

  // Empty state
  emptyState: "text-center py-12 text-gray-600",

  // Badge styles
  badgeExcellent:
    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800",
  badgeGood:
    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800",
  badgeAverage:
    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800",
  badgeNeedsWork:
    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800",

  // Card styles
  card: "relative bg-white rounded-lg shadow-sm overflow-hidden border hover:shadow-md transition",
  cardAccent:
    "absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 to-indigo-700",
  cardContent: "p-4 md:p-5 lg:p-4 flex flex-col h-full",

  // Card header
  cardHeader: "flex items-start justify-between gap-3",
  cardInfo: "flex items-center gap-3 min-w-0",
  levelAvatar:
    "flex items-center justify-center w-12 h-12 md:w-14 md:h-14 lg:w-12 lg:h-12 rounded-md font-semibold text-lg md:text-xl lg:text-lg",
  levelBasic: "bg-indigo-50 text-indigo-700",
  levelIntermediate: "bg-purple-50 text-purple-700",
  levelAdvanced: "bg-pink-50 text-pink-700",
  cardText: "min-w-0",
  cardTitle: "text-sm md:text-base lg:text-sm font-medium truncate",
  cardMeta: "text-xs md:text-sm lg:text-xs text-gray-500",

  // Card performance
  cardPerformance: "text-right",
  performanceLabel: "text-md md:text-md lg:text-md text-gray-500",
  badgeContainer: "mt-1",

  // Card stats
  cardStats: "mt-4",
  statItem: "text-md md:text-md lg:text-md text-gray-600",
  statNumber: "font-semibold text-lg md:text-xl lg:text-lg text-gray-800",
};
