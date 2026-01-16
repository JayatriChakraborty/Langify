import { useState } from "react";
import { ArrowLeftRight, Star, BookOpen, Settings, Globe, Trash2 } from "lucide-react";
import { LanguageSelector } from "./components/LanguageSelector";
import { TranslationCard } from "./components/TranslationCard";
import { PhraseCategory } from "./components/PhraseCategory";
import { AddPhraseModal } from "./components/AddPhraseModal";
import { AddCategoryModal } from "./components/AddCategoryModal";
import { AddPhraseMenu } from "./components/AddPhraseMenu";
import { SettingsPage } from "./components/SettingsPage";
import { AccountPage } from "./components/AccountPage";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";

// Multi-language phrase database
const phraseTranslations: Record<string, Record<string, string>> = {
  // Greetings
  "1": {
    English: "Hello",
    Spanish: "Hola",
    French: "Bonjour",
    German: "Hallo",
    Italian: "Ciao",
    Portuguese: "Olá",
    Russian: "Привет",
    Japanese: "こんにちは",
    Korean: "안녕하세요",
    Chinese: "你好",
    Arabic: "مرحبا",
    Hindi: "नमस्ते",
    Thai: "สวัสดี",
    Vietnamese: "Xin chào",
    Dutch: "Hallo",
    Polish: "Cześć",
    Turkish: "Merhaba",
    Swedish: "Hej"
  },
  "2": {
    English: "Good morning",
    Spanish: "Buenos días",
    French: "Bonjour",
    German: "Guten Morgen",
    Italian: "Buongiorno",
    Portuguese: "Bom dia",
    Russian: "Доброе утро",
    Japanese: "おはようございます",
    Korean: "좋은 아침",
    Chinese: "早上好",
    Arabic: "صباح الخير",
    Hindi: "सुप्रभात",
    Thai: "สวัสดีตอนเช้า",
    Vietnamese: "Chào buổi sáng",
    Dutch: "Goedemorgen",
    Polish: "Dzień dobry",
    Turkish: "Günaydın",
    Swedish: "God morgon"
  },
  "3": {
    English: "Good evening",
    Spanish: "Buenas noches",
    French: "Bonsoir",
    German: "Guten Abend",
    Italian: "Buonasera",
    Portuguese: "Boa noite",
    Russian: "Добрый вечер",
    Japanese: "こんばんは",
    Korean: "좋은 저녁",
    Chinese: "晚上好",
    Arabic: "مساء الخير",
    Hindi: "शुभ संध्या",
    Thai: "สวัสดีตอนเย็น",
    Vietnamese: "Chào buổi tối",
    Dutch: "Goedenavond",
    Polish: "Dobry wieczór",
    Turkish: "İyi akşamlar",
    Swedish: "God kväll"
  },
  "4": {
    English: "How are you?",
    Spanish: "¿Cómo estás?",
    French: "Comment allez-vous?",
    German: "Wie geht es dir?",
    Italian: "Come stai?",
    Portuguese: "Como vai?",
    Russian: "Как дела?",
    Japanese: "元気ですか？",
    Korean: "어떻게 지내세요?",
    Chinese: "你好吗？",
    Arabic: "كيف حالك؟",
    Hindi: "आप कैसे हैं?",
    Thai: "คุณเป็นอย่างไร?",
    Vietnamese: "Bạn khỏe không?",
    Dutch: "Hoe gaat het?",
    Polish: "Jak się masz?",
    Turkish: "Nasılsın?",
    Swedish: "Hur mår du?"
  },
  // Directions
  "5": {
    English: "Where is the bathroom?",
    Spanish: "¿Dónde está el baño?",
    French: "Où sont les toilettes?",
    German: "Wo ist die Toilette?",
    Italian: "Dov'è il bagno?",
    Portuguese: "Onde fica o banheiro?",
    Russian: "Где туалет?",
    Japanese: "トイレはどこですか？",
    Korean: "화장실이 어디에 있습니까?",
    Chinese: "洗手间在哪里？",
    Arabic: "أين الحمام؟",
    Hindi: "बाथरूम कहाँ है?",
    Thai: "ห้องน้ำอยู่ที่ไหน?",
    Vietnamese: "Nhà vệ sinh ở đâu?",
    Dutch: "Waar is het toilet?",
    Polish: "Gdzie jest toaleta?",
    Turkish: "Tuvalet nerede?",
    Swedish: "Var är toaletten?"
  },
  "6": {
    English: "How do I get to...?",
    Spanish: "¿Cómo llego a...?",
    French: "Comment puis-je aller à...?",
    German: "Wie komme ich zu...?",
    Italian: "Come arrivo a...?",
    Portuguese: "Como chego a...?",
    Russian: "Как мне добраться до...?",
    Japanese: "...にはどう行けばいいですか？",
    Korean: "...에 어떻게 가나요?",
    Chinese: "我怎么去...？",
    Arabic: "كيف أصل إلى...؟",
    Hindi: "मैं ... कैसे पहुंचूं?",
    Thai: "ฉันจะไป...ได้อย่างไร?",
    Vietnamese: "Làm thế nào để đến...?",
    Dutch: "Hoe kom ik bij...?",
    Polish: "Jak mogę dostać się до...?",
    Turkish: "...e nasıl gidebilirim?",
    Swedish: "Hur kommer jag till...?"
  },
  "7": {
    English: "Is it far from here?",
    Spanish: "¿Está lejos de aquí?",
    French: "Est-ce loin d'ici?",
    German: "Ist es weit von hier?",
    Italian: "È lontano da qui?",
    Portuguese: "É longe daqui?",
    Russian: "Это далеко отсюда?",
    Japanese: "ここから遠いですか？",
    Korean: "여기서 멀어요?",
    Chinese: "离这里远吗？",
    Arabic: "هل هو بعيد من هنا؟",
    Hindi: "क्या यह यहाँ से दूर है?",
    Thai: "ไกลจากที่นี่ไหม?",
    Vietnamese: "Có xa từ đây không?",
    Dutch: "Is het ver hier vandaan?",
    Polish: "Czy to daleko stąd?",
    Turkish: "Buradan uzak mı?",
    Swedish: "Är det långt härifrån?"
  },
  "8": {
    English: "Turn left/right",
    Spanish: "Gira a la izquierda/derecha",
    French: "Tournez à gauche/droite",
    German: "Links/rechts abbiegen",
    Italian: "Gira a sinistra/destra",
    Portuguese: "Vire à esquerda/direita",
    Russian: "Поверните налево/направо",
    Japanese: "左/右に曲がる",
    Korean: "왼쪽/오른쪽으로 도세요",
    Chinese: "向左/右转",
    Arabic: "انعطف يسارًا/يمينًا",
    Hindi: "बाएं/दाएं मुड़ें",
    Thai: "เลี้ยวซ้าย/ขวา",
    Vietnamese: "Rẽ trái/phải",
    Dutch: "Ga naar links/rechts",
    Polish: "Skręć w lewo/prawo",
    Turkish: "Sola/sağa dön",
    Swedish: "Sväng vänster/höger"
  },
  // Food & Dining
  "9": {
    English: "Menu, please",
    Spanish: "El menú, por favor",
    French: "Le menu, s'il vous plaît",
    German: "Die Speisekarte, bitte",
    Italian: "Il menu, per favore",
    Portuguese: "O menu, por favor",
    Russian: "Меню, пожалуйста",
    Japanese: "メニューをお願いします",
    Korean: "메뉴 주세요",
    Chinese: "请给我菜单",
    Arabic: "القائمة من فضلك",
    Hindi: "मेनू, कृपया",
    Thai: "ขอเมนูหน่อย",
    Vietnamese: "Cho tôi xem thực đơn",
    Dutch: "Het menu, alstublieft",
    Polish: "Menu, proszę",
    Turkish: "Menü, lütfen",
    Swedish: "Menyn, tack"
  },
  "10": {
    English: "I'm allergic to...",
    Spanish: "Soy alérgico a...",
    French: "Je suis allergique à...",
    German: "Ich bin allergisch gegen...",
    Italian: "Sono allergico a...",
    Portuguese: "Sou alérgico a...",
    Russian: "У меня аллергия на...",
    Japanese: "...にアレルギーがあります",
    Korean: "...にアルルギーがあります",
    Chinese: "我对...过敏",
    Arabic: "أنا أعاني من حساسية تجاه...",
    Hindi: "मुझे ... से एलर्जी है",
    Thai: "ฉันแพ้...",
    Vietnamese: "Tôi bị dị ứng với...",
    Dutch: "Ik ben allergisch voor...",
    Polish: "Jestem uczulony na...",
    Turkish: "...e alerjim var",
    Swedish: "Jag är allergisk mot..."
  },
  "11": {
    English: "Check, please",
    Spanish: "La cuenta, por favor",
    French: "L'addition, s'il vous plaît",
    German: "Die Rechnung, bitte",
    Italian: "Il conto, per favore",
    Portuguese: "A conta, por favor",
    Russian: "Счет, пожалуйста",
    Japanese: "お会計をお願いします",
    Korean: "계산서 주세요",
    Chinese: "买单",
    Arabic: "الفاتورة من فضلك",
    Hindi: "बिल, कृपया",
    Thai: "เช็คบิล",
    Vietnamese: "Tính tiền",
    Dutch: "De rekening, alstublieft",
    Polish: "Rachunek, proszę",
    Turkish: "Hesap, lütfen",
    Swedish: "Notan, tack"
  },
  "12": {
    English: "This is delicious",
    Spanish: "Esto está delicioso",
    French: "C'est délicieux",
    German: "Das ist lecker",
    Italian: "È delizioso",
    Portuguese: "Isto está delicioso",
    Russian: "Это вкусно",
    Japanese: "これは美味しいです",
    Korean: "이것은 맛있어요",
    Chinese: "这很好吃",
    Arabic: "هذا لذيذ",
    Hindi: "यह स्वादिष्ट है",
    Thai: "อร่อยมาก",
    Vietnamese: "Ngon quá",
    Dutch: "Dit is heerlijk",
    Polish: "To jest pyszne",
    Turkish: "Bu çok lezzetli",
    Swedish: "Det här är utsökt"
  },
  // Emergency
  "13": {
    English: "Help!",
    Spanish: "¡Ayuda!",
    French: "Au secours!",
    German: "Hilfe!",
    Italian: "Aiuto!",
    Portuguese: "Ajuda!",
    Russian: "Помогите!",
    Japanese: "助けて！",
    Korean: "도와주세요!",
    Chinese: "救命！",
    Arabic: "!مساعدة",
    Hindi: "मदद!",
    Thai: "ช่วยด้วย!",
    Vietnamese: "Cứu tôi!",
    Dutch: "Help!",
    Polish: "Pomoc!",
    Turkish: "Yardım!",
    Swedish: "Hjälp!"
  },
  "14": {
    English: "I need a doctor",
    Spanish: "Necesito un médico",
    French: "J'ai besoin d'un médecin",
    German: "Ich brauche einen Arzt",
    Italian: "Ho bisogno di un medico",
    Portuguese: "Preciso de um médico",
    Russian: "Мне нужен врач",
    Japanese: "医者が必要です",
    Korean: "의사가 필요해요",
    Chinese: "我需要医生",
    Arabic: "أحتاج إلى طبيب",
    Hindi: "मुझे डॉक्टर की ज़रूरत है",
    Thai: "ฉันต้องการหมอ",
    Vietnamese: "Tôi cần bác sĩ",
    Dutch: "Ik heb een dokter nodig",
    Polish: "Potrzebuję lekarza",
    Turkish: "Doktora ihtiyacım var",
    Swedish: "Jag behöver en läkare"
  },
  "15": {
    English: "Call the police",
    Spanish: "Llama a la policía",
    French: "Appelez la police",
    German: "Rufen Sie die Polizei",
    Italian: "Chiama la polizia",
    Portuguese: "Chame a polícia",
    Russian: "Вызовите полицию",
    Japanese: "警察を呼んでください",
    Korean: "경찰을 불러주세요",
    Chinese: "叫警察",
    Arabic: "اتصل بالشرطة",
    Hindi: "पुलिस को बुलाओ",
    Thai: "เรียกตำรวจ",
    Vietnamese: "Gọi cảnh sát",
    Dutch: "Bel de politie",
    Polish: "Zadzwoń po policję",
    Turkish: "Polisi ara",
    Swedish: "Ring polisen"
  },
  "16": {
    English: "Where is the hospital?",
    Spanish: "¿Dónde está el hospital?",
    French: "Où est l'hôpital?",
    German: "Wo ist das Krankenhaus?",
    Italian: "Dov'è l'ospedale?",
    Portuguese: "Onde fica o hospital?",
    Russian: "Где больница?",
    Japanese: "病院はどこですか？",
    Korean: "병원이 어디에 있습니까?",
    Chinese: "医院在哪里？",
    Arabic: "أين المستشفى؟",
    Hindi: "अस्पताल कहाँ है?",
    Thai: "โรงพยาบาลอยู่ที่ไหน?",
    Vietnamese: "Bệnh viện ở đâu?",
    Dutch: "Waar is het ziekenhuis?",
    Polish: "Gdzie jest szpital?",
    Turkish: "Hastane nerede?",
    Swedish: "Var är sjukhuset?"
  }
};

const getPhrasesByLanguage = (language: string) => {
  return [
    {
      category: "Greetings",
      icon: "👋",
      phrases: [
        { id: "1", text: phraseTranslations["1"][language] || phraseTranslations["1"]["English"], translation: phraseTranslations["1"]["English"] },
        { id: "2", text: phraseTranslations["2"][language] || phraseTranslations["2"]["English"], translation: phraseTranslations["2"]["English"] },
        { id: "3", text: phraseTranslations["3"][language] || phraseTranslations["3"]["English"], translation: phraseTranslations["3"]["English"] },
        { id: "4", text: phraseTranslations["4"][language] || phraseTranslations["4"]["English"], translation: phraseTranslations["4"]["English"] },
      ]
    },
    {
      category: "Directions",
      icon: "🗺️",
      phrases: [
        { id: "5", text: phraseTranslations["5"][language] || phraseTranslations["5"]["English"], translation: phraseTranslations["5"]["English"] },
        { id: "6", text: phraseTranslations["6"][language] || phraseTranslations["6"]["English"], translation: phraseTranslations["6"]["English"] },
        { id: "7", text: phraseTranslations["7"][language] || phraseTranslations["7"]["English"], translation: phraseTranslations["7"]["English"] },
        { id: "8", text: phraseTranslations["8"][language] || phraseTranslations["8"]["English"], translation: phraseTranslations["8"]["English"] },
      ]
    },
    {
      category: "Food & Dining",
      icon: "🍽️",
      phrases: [
        { id: "9", text: phraseTranslations["9"][language] || phraseTranslations["9"]["English"], translation: phraseTranslations["9"]["English"] },
        { id: "10", text: phraseTranslations["10"][language] || phraseTranslations["10"]["English"], translation: phraseTranslations["10"]["English"] },
        { id: "11", text: phraseTranslations["11"][language] || phraseTranslations["11"]["English"], translation: phraseTranslations["11"]["English"] },
        { id: "12", text: phraseTranslations["12"][language] || phraseTranslations["12"]["English"], translation: phraseTranslations["12"]["English"] },
      ]
    },
    {
      category: "Emergency",
      icon: "🚨",
      phrases: [
        { id: "13", text: phraseTranslations["13"][language] || phraseTranslations["13"]["English"], translation: phraseTranslations["13"]["English"] },
        { id: "14", text: phraseTranslations["14"][language] || phraseTranslations["14"]["English"], translation: phraseTranslations["14"]["English"] },
        { id: "15", text: phraseTranslations["15"][language] || phraseTranslations["15"]["English"], translation: phraseTranslations["15"]["English"] },
        { id: "16", text: phraseTranslations["16"][language] || phraseTranslations["16"]["English"], translation: phraseTranslations["16"]["English"] },
      ]
    }
  ];
};

export default function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [phraseLang, setPhraseLang] = useState("Spanish");
  const [activeTab, setActiveTab] = useState<"translate" | "phrases" | "saved" | "settings">("translate");
  const [currentPage, setCurrentPage] = useState<"main" | "account" | "privacy">("main");
  
  // Saved translations state
  interface SavedTranslation {
    id: string;
    sourceText: string;
    translatedText: string;
    sourceLang: string;
    targetLang: string;
    timestamp: number;
  }
  
  const [savedTranslations, setSavedTranslations] = useState<SavedTranslation[]>([]);
  const [savedPhraseIds, setSavedPhraseIds] = useState<Set<string>>(new Set());

  // Custom phrases and categories state
  interface CustomPhrase {
    id: string;
    text: string;
    translation: string;
    category: string;
  }

  interface CustomCategory {
    name: string;
    icon: string;
  }

  const [customPhrases, setCustomPhrases] = useState<CustomPhrase[]>([]);
  const [customCategories, setCustomCategories] = useState<CustomCategory[]>([]);
  const [showAddPhraseModal, setShowAddPhraseModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const handlePhraseSelect = (phrase: { text: string; translation: string }) => {
    setInputText(phrase.text);
    setOutputText(phrase.translation);
    setActiveTab("translate");
  };
  
  const handleSaveTranslation = () => {
    if (!inputText || !outputText) return;
    
    const newTranslation: SavedTranslation = {
      id: Date.now().toString(),
      sourceText: inputText,
      translatedText: outputText,
      sourceLang,
      targetLang,
      timestamp: Date.now()
    };
    
    // Check if this exact translation already exists
    const exists = savedTranslations.some(
      t => t.sourceText === inputText && t.translatedText === outputText
    );
    
    if (!exists) {
      setSavedTranslations(prev => [newTranslation, ...prev]);
    }
  };
  
  const handleSavePhrase = (phrase: { id: string; text: string; translation: string }) => {
    const newSavedPhraseIds = new Set(savedPhraseIds);
    
    if (newSavedPhraseIds.has(phrase.id)) {
      newSavedPhraseIds.delete(phrase.id);
    } else {
      newSavedPhraseIds.add(phrase.id);
      
      // Also add to saved translations
      const newTranslation: SavedTranslation = {
        id: `phrase-${phrase.id}-${Date.now()}`,
        sourceText: phrase.text,
        translatedText: phrase.translation,
        sourceLang: phraseLang,
        targetLang: "English",
        timestamp: Date.now()
      };
      
      setSavedTranslations(prev => [newTranslation, ...prev]);
    }
    
    setSavedPhraseIds(newSavedPhraseIds);
  };
  
  const handleDeleteSaved = (id: string) => {
    setSavedTranslations(prev => prev.filter(t => t.id !== id));
  };

  const handleAddCustomPhrase = (phrase: string, translation: string, category: string) => {
    const newPhrase: CustomPhrase = {
      id: `custom-${Date.now()}`,
      text: phrase,
      translation,
      category
    };
    setCustomPhrases(prev => [...prev, newPhrase]);
  };

  const handleAddCustomCategory = (name: string, icon: string) => {
    const newCategory: CustomCategory = { name, icon };
    setCustomCategories(prev => [...prev, newCategory]);
  };

  const handleDeleteCustomPhrase = (id: string) => {
    setCustomPhrases(prev => prev.filter(p => p.id !== id));
    // Also remove from saved if it was saved
    const newSavedPhraseIds = new Set(savedPhraseIds);
    newSavedPhraseIds.delete(id);
    setSavedPhraseIds(newSavedPhraseIds);
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      // In a real app, this would clear auth tokens and redirect
      alert("Logged out successfully. This is a demo, so you weren't actually logged out.");
    }
  };

  const handleNavigateToAccount = () => {
    setCurrentPage("account");
  };

  const handleNavigateToPrivacy = () => {
    setCurrentPage("privacy");
  };

  const handleBackToSettings = () => {
    setCurrentPage("main");
    setActiveTab("settings");
  };

  // Get all categories (built-in + custom)
  const getAllCategories = () => {
    const builtInCategories = ["Greetings", "Directions", "Food & Dining", "Emergency"];
    const customCategoryNames = customCategories.map(c => c.name);
    return [...builtInCategories, ...customCategoryNames];
  };

  // Get phrases by language including custom phrases
  const getAllPhrasesByLanguage = (language: string) => {
    const builtInPhrases = getPhrasesByLanguage(language);
    
    // Group custom phrases by category
    const customByCategory: Record<string, CustomPhrase[]> = {};
    customPhrases.forEach(phrase => {
      if (!customByCategory[phrase.category]) {
        customByCategory[phrase.category] = [];
      }
      customByCategory[phrase.category].push(phrase);
    });

    // Add custom categories with their phrases
    const customCategoriesWithPhrases = customCategories.map(cat => ({
      category: cat.name,
      icon: cat.icon,
      phrases: (customByCategory[cat.name] || []).map(p => ({
        id: p.id,
        text: p.text,
        translation: p.translation,
        isCustom: true
      })),
      isCustom: true
    }));

    // Add custom phrases to existing categories
    const updatedBuiltInPhrases = builtInPhrases.map(cat => {
      const customPhrasesForCat = customByCategory[cat.category] || [];
      return {
        ...cat,
        phrases: [
          ...cat.phrases,
          ...customPhrasesForCat.map(p => ({
            id: p.id,
            text: p.text,
            translation: p.translation,
            isCustom: true
          }))
        ]
      };
    });

    return [...updatedBuiltInPhrases, ...customCategoriesWithPhrases];
  };
  
  const isCurrentTranslationSaved = savedTranslations.some(
    t => t.sourceText === inputText && t.translatedText === outputText
  );

  // Simulate translation (in real app, this would call an API)
  const handleInputChange = (text: string) => {
    setInputText(text);
    // Simulate translation with a simple transformation
    if (text) {
      setTimeout(() => {
        setOutputText(`[Translated: ${text}]`);
      }, 300);
    } else {
      setOutputText("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Render different pages based on currentPage */}
      {currentPage === "account" && (
        <AccountPage onBack={handleBackToSettings} />
      )}
      
      {currentPage === "privacy" && (
        <PrivacyPolicyPage onBack={handleBackToSettings} />
      )}
      
      {currentPage === "main" && (
        <>
          {/* Header */}
          <header className="bg-white border-b border-border px-4 py-4 safe-area-top">
            <div className="max-w-md mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary" />
                <h1>Translate</h1>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto pb-20">
            <div className="max-w-md mx-auto">
              {activeTab === "translate" && (
                <div className="p-4 space-y-4">
                  {/* Language Selector Row */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <LanguageSelector
                        label="From"
                        language={sourceLang}
                        onLanguageChange={setSourceLang}
                      />
                    </div>
                    
                    <button
                      onClick={handleSwapLanguages}
                      className="mt-5 p-2 hover:bg-input-background rounded-full transition-colors"
                      aria-label="Swap languages"
                    >
                      <ArrowLeftRight className="w-5 h-5 text-foreground" />
                    </button>
                    
                    <div className="flex-1">
                      <LanguageSelector
                        label="To"
                        language={targetLang}
                        onLanguageChange={setTargetLang}
                      />
                    </div>
                  </div>

                  {/* Input Card */}
                  <TranslationCard
                    type="input"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="Enter text to translate"
                  />

                  {/* Output Card */}
                  <TranslationCard
                    type="output"
                    value={outputText}
                    placeholder="Translation will appear here"
                    onSave={handleSaveTranslation}
                    isSaved={isCurrentTranslationSaved}
                  />
                </div>
              )}

              {activeTab === "phrases" && (
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="px-1">Common Phrases</h2>
                    <AddPhraseMenu
                      onAddPhrase={() => setShowAddPhraseModal(true)}
                      onAddCategory={() => setShowAddCategoryModal(true)}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <LanguageSelector
                      label="Show phrases in"
                      language={phraseLang}
                      onLanguageChange={setPhraseLang}
                    />
                  </div>

                  {getAllPhrasesByLanguage(phraseLang).map((category) => (
                    <PhraseCategory
                      key={category.category}
                      title={category.category}
                      icon={category.icon}
                      phrases={category.phrases}
                      onPhraseSelect={handlePhraseSelect}
                      onPhraseSave={handleSavePhrase}
                      onPhraseDelete={handleDeleteCustomPhrase}
                      savedPhraseIds={savedPhraseIds}
                    />
                  ))}
                </div>
              )}

              {activeTab === "saved" && (
                <div className="p-4">
                  {savedTranslations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                      <Star className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="text-muted-foreground mb-2">No saved translations</h3>
                      <p className="text-muted-foreground text-sm text-center">
                        Tap the star icon to save translations for quick access later
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <h2 className="px-1">Saved Translations</h2>
                      {savedTranslations.map((translation) => (
                        <div
                          key={translation.id}
                          className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden"
                        >
                          <div className="p-4">
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <div className="flex-1">
                                <div className="text-xs text-muted-foreground mb-1">
                                  {translation.sourceLang} → {translation.targetLang}
                                </div>
                                <div className="mb-2">{translation.sourceText}</div>
                                <div className="text-muted-foreground">
                                  {translation.translatedText}
                                </div>
                              </div>
                              <button
                                onClick={() => handleDeleteSaved(translation.id)}
                                className="p-2 hover:bg-muted rounded-full transition-colors"
                                aria-label="Delete saved translation"
                              >
                                <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "settings" && (
                <SettingsPage
                  onNavigateToAccount={handleNavigateToAccount}
                  onNavigateToPrivacy={handleNavigateToPrivacy}
                  onLogout={handleLogout}
                />
              )}
            </div>
          </main>

          {/* Bottom Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-border safe-area-bottom">
            <div className="max-w-md mx-auto flex items-center justify-around px-4 py-2">
              <button
                onClick={() => setActiveTab("translate")}
                className={`flex flex-col items-center gap-1 py-2 px-6 rounded-xl transition-colors ${
                  activeTab === "translate" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Globe className="w-6 h-6" />
                <span className="text-xs">Translate</span>
              </button>
              
              <button
                onClick={() => setActiveTab("phrases")}
                className={`flex flex-col items-center gap-1 py-2 px-6 rounded-xl transition-colors ${
                  activeTab === "phrases" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <BookOpen className="w-6 h-6" />
                <span className="text-xs">Phrases</span>
              </button>
              
              <button
                onClick={() => setActiveTab("saved")}
                className={`flex flex-col items-center gap-1 py-2 px-6 rounded-xl transition-colors ${
                  activeTab === "saved" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Star className="w-6 h-6" />
                <span className="text-xs">Saved</span>
              </button>
              
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex flex-col items-center gap-1 py-2 px-6 rounded-xl transition-colors ${
                  activeTab === "settings" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Settings className="w-6 h-6" />
                <span className="text-xs">Settings</span>
              </button>
            </div>
          </nav>

          {/* Add Phrase Modal */}
          <AddPhraseModal
            isOpen={showAddPhraseModal}
            onClose={() => setShowAddPhraseModal(false)}
            onAdd={handleAddCustomPhrase}
            categories={getAllCategories()}
          />

          {/* Add Category Modal */}
          <AddCategoryModal
            isOpen={showAddCategoryModal}
            onClose={() => setShowAddCategoryModal(false)}
            onAdd={handleAddCustomCategory}
          />
        </>
      )}
    </div>
  );
}