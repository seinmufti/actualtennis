import { ArabicFlag, EnglishFlag, KurdishFlag } from './components/Flags.jsx'

const LANG_KEY = 'actual-tennis-language'

export const LANGUAGES = [
  { id: 'en', labelKey: 'english', Flag: EnglishFlag },
  { id: 'ku', labelKey: 'kurdish', Flag: KurdishFlag },
  { id: 'ar', labelKey: 'arabic', Flag: ArabicFlag },
]

export const translations = {
  en: {
    appTitle: 'Actual Tennis',
    settings: 'Settings',
    language: 'Language',
    developedBy: 'developed by',
    english: 'English',
    kurdish: 'Kurdish (Sorani)',
    arabic: 'Arabic',
    ourCourts: 'Our Courts',
    branchName: 'Erbil Branch',
    branchAddress: 'Ainkawa-Opposite of Erbil Avenue',
    court1: 'Court 1',
    court2: 'Court 2',
    pickTime: 'Pick a time',
    slotsOpen: '{count} slots open this day',
    onBoard: 'You are on the board',
    bookedAs: 'Booked as {name}',
    cancelBooking: 'Cancel booking',
    canceling: 'Canceling…',
    pricing: 'Pricing',
    pricingBefore: 'Pricing for 55 minutes session is',
    pricingAmount: '10,000 IQD',
    pricingAfter: '.',
    courtRules: 'Court rules',
    rules: [
      'The last 5 minutes are for packing up and a quick court reset.',
      'One device can hold only one booking at a time.',
      'Be on time. The next crew starts right at the hour.',
      'No smoking on the court.',
      'Wear appropriate sport clothes and footwear.',
    ],
    bookSlot: 'Book this slot?',
    chooseCourt: 'Choose Court',
    yourName: 'Your name',
    namePlaceholder: 'e.g. Sam',
    neverMind: 'Never mind',
    bookCourt: 'Book this court',
    booking: 'Booking…',
    cancelConfirm: 'Cancel this booking?',
    cancelSure: 'Are you sure? This slot will open for someone else.',
    yesCancel: 'Yes, cancel',
    open: 'Open',
    yourGame: 'Your game',
    finished: 'Finished',
    oneCourtLeft: '1 court left',
    am: 'AM',
    pm: 'PM',
    courtLabel: 'Court {id}',
  },
  ku: {
    appTitle: 'Actual Tennis',
    settings: 'ڕێکخستن',
    language: 'زمان',
    developedBy: 'پەرەپێدراوە لەلایەن',
    english: 'ئینگلیزی',
    kurdish: 'کوردی (سۆرانی)',
    arabic: 'عەرەبی',
    ourCourts: 'یاریگاکانمان',
    branchName: 'لقی هەولێر',
    branchAddress: 'عەینکاوە - بەرامبەر ئەربیل ئاڤێنیو',
    court1: 'یاریگا ١',
    court2: 'یاریگا ٢',
    pickTime: 'کاتێک هەڵبژێرە',
    slotsOpen: '{count} کات بەردەستە لەم ڕۆژەدا',
    onBoard: 'تۆ لە لیستەکەدایت',
    bookedAs: 'تۆمارکراوە وەک {name}',
    cancelBooking: 'هەڵوەشاندنەوەی حجز',
    canceling: 'هەڵدەوەشێت…',
    pricing: 'نرخ',
    pricingBefore: 'نرخی دانیشتنێکی ٥٥ خولەکی',
    pricingAmount: '١٠٬٠٠٠ دینار',
    pricingAfter: 'ە.',
    courtRules: 'یاساکانی یاریگا',
    rules: [
      '٥ خولەکی کۆتایی بۆ کۆکردنەوە و ئامادەکردنی یاریگا.',
      'هەر ئامێرێک تەنها یەک حجز دەتوانێت بگرێت.',
      'لە کاتی خۆتدا بێ. کەسانی دواتر لە کاتژمێرەکە دەستپێدەکەن.',
      'جگەرەکێشان لەسەر یاریگا قەدەغەیە.',
      'جلوبەرگی و پێڵاوی وەرزشی گونجاو بپۆشە.',
    ],
    bookSlot: 'ئەم کاتە حجز بکەیت؟',
    chooseCourt: 'یاریگا هەڵبژێرە',
    yourName: 'ناوت',
    namePlaceholder: 'وەک Sam',
    neverMind: 'پاشگەزبوونەوە',
    bookCourt: 'ئەم یاریگایە حجز بکە',
    booking: 'حجز دەکرێت…',
    cancelConfirm: 'ئەم حجزە هەڵبوەشێنیتەوە؟',
    cancelSure: 'دڵنیایت؟ ئەم کاتە بۆ کەسێکی تر دەکرێتەوە.',
    yesCancel: 'بەڵێ، هەڵبوەشێنەوە',
    open: 'کراوە',
    yourGame: 'یاریی تۆ',
    finished: 'تەواوبوو',
    oneCourtLeft: '١ یاریگا ماوە',
    am: 'پ.ن',
    pm: 'د.ن',
    courtLabel: 'یاریگا {id}',
  },
  ar: {
    appTitle: 'Actual Tennis',
    settings: 'الإعدادات',
    language: 'اللغة',
    developedBy: 'طُوِّر بواسطة',
    english: 'الإنجليزية',
    kurdish: 'الكردية (السورانية)',
    arabic: 'العربية',
    ourCourts: 'ملاعبنا',
    branchName: 'فرع أربيل',
    branchAddress: 'عينكاوه - مقابل اربيل افنيو',
    court1: 'الملعب ١',
    court2: 'الملعب ٢',
    pickTime: 'اختر وقتاً',
    slotsOpen: '{count} موعد متاح هذا اليوم',
    onBoard: 'أنت على اللوحة',
    bookedAs: 'محجوز باسم {name}',
    cancelBooking: 'إلغاء الحجز',
    canceling: 'جارٍ الإلغاء…',
    pricing: 'الأسعار',
    pricingBefore: 'سعر جلسة ٥٥ دقيقة هو',
    pricingAmount: '١٠٬٠٠٠ دينار عراقي',
    pricingAfter: '.',
    courtRules: 'قواعد الملعب',
    rules: [
      'آخر ٥ دقائق لتجميع الأغراض وإعداد الملعب.',
      'كل جهاز يمكنه حجز موعد واحد فقط.',
      'كن في الموعد. المجموعة التالية تبدأ عند الساعة.',
      'التدخين ممنوع في الملعب.',
      'ارتدِ ملابس وأحذية رياضية مناسبة.',
    ],
    bookSlot: 'حجز هذا الموعد؟',
    chooseCourt: 'اختر الملعب',
    yourName: 'اسمك',
    namePlaceholder: 'مثال: Sam',
    neverMind: 'لا بأس',
    bookCourt: 'احجز هذا الملعب',
    booking: 'جارٍ الحجز…',
    cancelConfirm: 'إلغاء هذا الحجز؟',
    cancelSure: 'هل أنت متأكد؟ سيتاح هذا الموعد لشخص آخر.',
    yesCancel: 'نعم، إلغاء',
    open: 'متاح',
    yourGame: 'مباراتك',
    finished: 'انتهى',
    oneCourtLeft: 'ملعب واحد متبقٍ',
    am: 'ص',
    pm: 'م',
    courtLabel: 'الملعب {id}',
  },
}

export function getSavedLanguage() {
  const saved = localStorage.getItem(LANG_KEY)
  if (saved && translations[saved]) return saved
  return 'en'
}

export function saveLanguage(lang) {
  localStorage.setItem(LANG_KEY, lang)
}

export function applyDocumentLanguage(lang) {
  document.documentElement.lang = lang === 'ku' ? 'ckb' : lang
  document.documentElement.dir = lang === 'ar' || lang === 'ku' ? 'rtl' : 'ltr'
}

export function translate(lang, key, vars = {}) {
  const table = translations[lang] ?? translations.en
  let text = table[key] ?? translations.en[key] ?? key
  if (Array.isArray(text)) return text
  for (const [name, value] of Object.entries(vars)) {
    text = text.replace(`{${name}}`, String(value))
  }
  return text
}
