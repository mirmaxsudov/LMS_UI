import type { Locale } from '@/shared/i18n/config';

type PublicLocale = Extract<Locale, 'ru' | 'uz'>;

export interface LegalSection {
  id: string;
  items?: string[];
  paragraphs: string[];
  title: string;
}

export interface LegalDocumentCopy {
  backLabel: string;
  contentsLabel: string;
  eyebrow: string;
  notice: string;
  printLabel: string;
  sections: LegalSection[];
  summary: string;
  title: string;
  updatedAt: string;
  updatedLabel: string;
}

export const getPublicLocale = (locale?: string): PublicLocale => (locale === 'ru' ? 'ru' : 'uz');

export const publicCopy = {
  uz: {
    brand: 'Suvchilar maktabi',
    brandCaption: 'Agro ta’lim platformasi',
    navigation: {
      features: 'Imkoniyatlar',
      courses: 'Kurslar',
      process: 'Qanday ishlaydi',
      faq: 'Savollar'
    },
    login: 'Tizimga kirish',
    register: 'Kurslarni ko‘rish',
    menu: 'Menyuni ochish',
    language: 'Til',
    terms: 'Foydalanish shartlari',
    privacy: 'Maxfiylik siyosati',
    footerDescription:
      'Suv xo‘jaligi va zamonaviy sug‘orish bo‘yicha bilim, amaliy ko‘nikma va sertifikatlash platformasi.',
    footerPlatform: 'Platforma',
    footerSupport: 'Yordam',
    footerRights: 'Barcha huquqlar himoyalangan.',
    support: 'Mutaxassis bilan bog‘lanish',
    home: 'Bosh sahifa'
  },
  ru: {
    brand: 'Школа водников',
    brandCaption: 'Платформа агрообразования',
    navigation: {
      features: 'Возможности',
      courses: 'Курсы',
      process: 'Как это работает',
      faq: 'Вопросы'
    },
    login: 'Войти',
    register: 'Смотреть курсы',
    menu: 'Открыть меню',
    language: 'Язык',
    terms: 'Условия использования',
    privacy: 'Политика конфиденциальности',
    footerDescription:
      'Платформа знаний, практических навыков и сертификации в сфере водного хозяйства и современного орошения.',
    footerPlatform: 'Платформа',
    footerSupport: 'Поддержка',
    footerRights: 'Все права защищены.',
    support: 'Связаться со специалистом',
    home: 'Главная'
  }
} as const;

export const landingCopy = {
  uz: {
    heroEyebrow: 'Suvni tejang. Hosildorlikni oshiring.',
    heroTitle: 'Har bir tomchi — bilim bilan boshqariladi.',
    heroDescription:
      'Fermerlar, irrigatorlar va soha mutaxassislari uchun zamonaviy sug‘orish, loyiha tayyorlash va suv resurslarini boshqarish bo‘yicha yagona ta’lim maydoni.',
    heroPrimary: 'Kurslarni boshlash',
    heroSecondary: 'Platformani o‘rganish',
    verified: 'Tasdiqlangan dasturlar',
    onlineOffline: 'Onlayn va oflayn',
    certificate: 'QR sertifikat',
    visualLabel: 'Bugungi o‘quv yo‘li',
    visualCourse: 'Tomchilatib sug‘orish asoslari',
    visualProgress: 'Kurs jarayoni',
    visualProgressValue: '68%',
    visualNext: 'Keyingi mashg‘ulot',
    visualNextValue: '12 sentabr · 10:00',
    visualLocation: 'Samarqand o‘quv markazi',
    visualAction: 'Darsni davom ettirish',
    stats: [
      { value: '14', label: 'hudud bo‘yicha ta’lim' },
      { value: '2 til', label: 'o‘zbek va rus' },
      { value: '24/7', label: 'kurslarga kirish' },
      { value: '1 profil', label: 'barcha natijalar uchun' }
    ],
    featureEyebrow: 'Bitta platforma — to‘liq o‘quv jarayoni',
    featureTitle: 'Nazariyadan daladagi natijagacha',
    featureDescription:
      'Kurs tanlashdan sertifikat olishgacha bo‘lgan har bir qadam sodda, shaffof va kuzatiladigan tarzda tashkil etilgan.',
    features: [
      {
        title: 'Agro kurslar katalogi',
        description: 'Yo‘nalish, hudud va o‘qish shakli bo‘yicha mos kursni tez toping.'
      },
      {
        title: 'Bosqichma-bosqich ta’lim',
        description: 'Video dars, amaliy material va testlar yagona o‘quv yo‘lida.'
      },
      {
        title: 'Oflayn mashg‘ulotlar',
        description: 'O‘quv markazi, sana, vaqt va qatnashuv holati doimo qo‘lingizda.'
      },
      {
        title: 'Hujjatlar nazorati',
        description: 'Ariza va hujjatlarni yuboring, tekshiruv holatini real vaqtda kuzating.'
      },
      {
        title: 'Ishonchli sertifikat',
        description: 'Sertifikatni yuklab oling va QR-kod orqali haqiqiyligini tekshiring.'
      },
      {
        title: 'Mutaxassis yordami',
        description: 'Savol, rasm yoki hujjat yuborib, tasdiqlangan ekspertdan javob oling.'
      }
    ],
    coursesEyebrow: 'Talab yuqori bo‘lgan yo‘nalishlar',
    coursesTitle: 'Amaliy bilim beradigan kurslar',
    coursesDescription:
      'O‘quv dasturlari real xo‘jalik vazifalari va hududiy ehtiyojlar asosida tuziladi.',
    allCourses: 'Barcha kurslar',
    courseLabels: { lessons: 'dars', weeks: 'hafta', free: 'Bepul', certificate: 'Sertifikat' },
    courses: [
      {
        category: 'Sug‘orish texnologiyalari',
        title: 'Tomchilatib sug‘orish tizimini loyihalash',
        description: 'Maydon tahlilidan uskuna tanlash va loyiha-smeta tayyorlashgacha.',
        lessons: 12,
        weeks: 6,
        tone: 'water'
      },
      {
        category: 'Suv resurslari',
        title: 'Suvdan samarali foydalanish asoslari',
        description: 'Suv balansi, yo‘qotishlarni aniqlash va xo‘jalik rejimini optimallashtirish.',
        lessons: 9,
        weeks: 4,
        tone: 'field'
      },
      {
        category: 'Texnik xizmat',
        title: 'Nasos va filtr tizimlariga xizmat ko‘rsatish',
        description: 'Nosozliklarni topish, xavfsiz ishlash va mavsumiy profilaktika.',
        lessons: 10,
        weeks: 5,
        tone: 'earth'
      }
    ],
    processEyebrow: 'To‘rtta aniq qadam',
    processTitle: 'O‘qishni boshlash oson',
    process: [
      {
        number: '01',
        title: 'Profil yarating',
        description: 'Telefon raqami orqali kiring va ma’lumotlaringizni to‘ldiring.'
      },
      {
        number: '02',
        title: 'Kursni tanlang',
        description: 'Talablar, muddat va o‘quv shakli bilan tanishib, ariza yuboring.'
      },
      {
        number: '03',
        title: 'Bilim oling',
        description: 'Video darslar, materiallar va testlarni ketma-ket yakunlang.'
      },
      {
        number: '04',
        title: 'Sertifikat oling',
        description: 'Talablarni bajaring va tasdiqlangan sertifikatni profilingizda oling.'
      }
    ],
    expertEyebrow: 'Savol yolg‘iz qolmaydi',
    expertTitle: 'Sohani biladigan mutaxassis doimo yoningizda',
    expertDescription:
      'Sug‘orish uskunasi, agronomiya, loyiha-smeta yoki huquqiy masala bo‘yicha murojaat yuboring. Platforma savolingizni tegishli yo‘nalishdagi tasdiqlangan ekspertga yetkazadi.',
    expertPoints: ['Rasm va PDF yuborish', 'Murojaat holatini kuzatish', 'Javobni baholash'],
    expertAction: 'Tizimga kirib savol berish',
    expertName: 'Dilshod Raximov',
    expertRole: 'Sug‘orish texnologiyalari eksperti',
    expertResponse:
      'Bosim pasayishiga filtr ifloslanishi yoki magistral quvurdagi yo‘qotish sabab bo‘lishi mumkin. Avval manometr ko‘rsatkichini tekshiring...',
    expertVerified: 'Tasdiqlangan mutaxassis',
    expertResponseTime: 'O‘rtacha javob vaqti · 18 daqiqa',
    quote:
      'Suvni to‘g‘ri boshqarish — faqat texnologiya emas. Bu bilim, intizom va kelajak avlod oldidagi mas’uliyatdir.',
    quoteAttribution: 'Suvchilar maktabi tamoyili',
    faqEyebrow: 'Ko‘p so‘raladigan savollar',
    faqTitle: 'Boshlashdan oldin bilishingiz kerak',
    faqs: [
      {
        question: 'Platformadan kimlar foydalanishi mumkin?',
        answer:
          'Fermerlar, dehqonlar, tomorqa egalari, irrigatorlar, agronomlar, suv xo‘jaligi xodimlari va sohaga qiziqqan boshqa ro‘yxatdan o‘tgan foydalanuvchilar.'
      },
      {
        question: 'Kurslar faqat onlaynmi?',
        answer:
          'Yo‘q. Platformada onlayn, oflayn va aralash shakldagi kurslar bo‘lishi mumkin. Har bir kurs kartasida o‘qish shakli, hudud va sanalar ko‘rsatiladi.'
      },
      {
        question: 'Sertifikatni qanday tekshirish mumkin?',
        answer:
          'Berilgan sertifikatda noyob raqam va QR-kod bo‘ladi. QR-kod orqali ochiq tekshiruv sahifasiga o‘tib, sertifikat holatini ko‘rish mumkin.'
      },
      {
        question: 'Hujjatlarim xavfsiz saqlanadimi?',
        answer:
          'Shaxsiy va tasdiqlovchi hujjatlar faqat vakolati bor xodimlarga ko‘rsatiladi. Batafsil ma’lumot Maxfiylik siyosatida keltirilgan.'
      }
    ],
    ctaEyebrow: 'Bilimga yo‘l ochiq',
    ctaTitle: 'Suv resurslarini bilim bilan boshqarishni bugun boshlang.',
    ctaDescription:
      'Mos kursni toping, ariza yuboring va o‘quv jarayoningizni bir joyda boshqaring.',
    ctaPrimary: 'Kurslarni ko‘rish',
    ctaSecondary: 'Tizimga kirish'
  },
  ru: {
    heroEyebrow: 'Экономьте воду. Повышайте урожайность.',
    heroTitle: 'Каждая капля управляется знаниями.',
    heroDescription:
      'Единая образовательная среда для фермеров, ирригаторов и специалистов: современное орошение, проектирование и управление водными ресурсами.',
    heroPrimary: 'Начать обучение',
    heroSecondary: 'Изучить платформу',
    verified: 'Проверенные программы',
    onlineOffline: 'Онлайн и офлайн',
    certificate: 'QR-сертификат',
    visualLabel: 'Ваш учебный маршрут',
    visualCourse: 'Основы капельного орошения',
    visualProgress: 'Прогресс курса',
    visualProgressValue: '68%',
    visualNext: 'Следующее занятие',
    visualNextValue: '12 сентября · 10:00',
    visualLocation: 'Учебный центр Самарканда',
    visualAction: 'Продолжить урок',
    stats: [
      { value: '14', label: 'регионов обучения' },
      { value: '2 языка', label: 'узбекский и русский' },
      { value: '24/7', label: 'доступ к курсам' },
      { value: '1 профиль', label: 'для всех результатов' }
    ],
    featureEyebrow: 'Одна платформа — полный учебный цикл',
    featureTitle: 'От теории к результату в поле',
    featureDescription:
      'Каждый этап — от выбора курса до получения сертификата — организован просто, прозрачно и последовательно.',
    features: [
      {
        title: 'Каталог агрокурсов',
        description: 'Быстро находите курс по направлению, региону и формату обучения.'
      },
      {
        title: 'Последовательное обучение',
        description: 'Видеоуроки, материалы и тесты объединены в один учебный маршрут.'
      },
      {
        title: 'Очные занятия',
        description: 'Учебный центр, дата, время и посещаемость всегда доступны в профиле.'
      },
      {
        title: 'Проверка документов',
        description: 'Отправляйте заявку и документы и отслеживайте статус проверки.'
      },
      {
        title: 'Надёжный сертификат',
        description: 'Скачивайте сертификат и проверяйте его подлинность по QR-коду.'
      },
      {
        title: 'Помощь специалиста',
        description: 'Отправьте вопрос, фото или документ и получите ответ эксперта.'
      }
    ],
    coursesEyebrow: 'Востребованные направления',
    coursesTitle: 'Курсы с практической пользой',
    coursesDescription:
      'Программы обучения основаны на реальных задачах хозяйств и потребностях регионов.',
    allCourses: 'Все курсы',
    courseLabels: {
      lessons: 'уроков',
      weeks: 'недель',
      free: 'Бесплатно',
      certificate: 'Сертификат'
    },
    courses: [
      {
        category: 'Технологии орошения',
        title: 'Проектирование системы капельного орошения',
        description: 'От анализа участка до выбора оборудования и подготовки проектной сметы.',
        lessons: 12,
        weeks: 6,
        tone: 'water'
      },
      {
        category: 'Водные ресурсы',
        title: 'Основы эффективного использования воды',
        description: 'Водный баланс, поиск потерь и оптимизация режима хозяйства.',
        lessons: 9,
        weeks: 4,
        tone: 'field'
      },
      {
        category: 'Техническое обслуживание',
        title: 'Обслуживание насосов и фильтров',
        description: 'Диагностика неисправностей, безопасная работа и сезонная профилактика.',
        lessons: 10,
        weeks: 5,
        tone: 'earth'
      }
    ],
    processEyebrow: 'Четыре понятных шага',
    processTitle: 'Начать обучение просто',
    process: [
      {
        number: '01',
        title: 'Создайте профиль',
        description: 'Войдите по номеру телефона и заполните личные данные.'
      },
      {
        number: '02',
        title: 'Выберите курс',
        description: 'Изучите требования, сроки и формат, затем отправьте заявку.'
      },
      {
        number: '03',
        title: 'Получайте знания',
        description: 'Последовательно завершайте видеоуроки, материалы и тесты.'
      },
      {
        number: '04',
        title: 'Получите сертификат',
        description: 'Выполните требования и получите подтверждённый сертификат в профиле.'
      }
    ],
    expertEyebrow: 'Ваш вопрос не останется без ответа',
    expertTitle: 'Профильный специалист всегда рядом',
    expertDescription:
      'Отправьте обращение по оборудованию, агрономии, проектной смете или правовому вопросу. Платформа направит его проверенному эксперту нужного направления.',
    expertPoints: ['Фото и PDF', 'Отслеживание статуса', 'Оценка ответа'],
    expertAction: 'Войти и задать вопрос',
    expertName: 'Дильшод Рахимов',
    expertRole: 'Эксперт по технологиям орошения',
    expertResponse:
      'Снижение давления может быть вызвано загрязнением фильтра или потерями в магистральной трубе. Сначала проверьте показания манометра...',
    expertVerified: 'Проверенный специалист',
    expertResponseTime: 'Среднее время ответа · 18 минут',
    quote:
      'Грамотное управление водой — это не только технология. Это знания, дисциплина и ответственность перед будущими поколениями.',
    quoteAttribution: 'Принцип Школы водников',
    faqEyebrow: 'Частые вопросы',
    faqTitle: 'Что важно знать перед началом',
    faqs: [
      {
        question: 'Кто может пользоваться платформой?',
        answer:
          'Фермеры, владельцы хозяйств, ирригаторы, агрономы, сотрудники водного хозяйства и другие зарегистрированные пользователи, интересующиеся отраслью.'
      },
      {
        question: 'Курсы проводятся только онлайн?',
        answer:
          'Нет. Доступны онлайн-, офлайн- и смешанные программы. На карточке курса указываются формат, регион и даты обучения.'
      },
      {
        question: 'Как проверить сертификат?',
        answer:
          'Каждый сертификат содержит уникальный номер и QR-код. Он ведёт на открытую страницу проверки со статусом документа.'
      },
      {
        question: 'Мои документы хранятся безопасно?',
        answer:
          'Личные данные и подтверждающие документы доступны только сотрудникам с соответствующими полномочиями. Подробнее — в Политике конфиденциальности.'
      }
    ],
    ctaEyebrow: 'Путь к знаниям открыт',
    ctaTitle: 'Начните управлять водными ресурсами с помощью знаний уже сегодня.',
    ctaDescription:
      'Найдите подходящий курс, отправьте заявку и управляйте обучением в одном месте.',
    ctaPrimary: 'Смотреть курсы',
    ctaSecondary: 'Войти'
  }
} as const;

export const termsCopy: Record<PublicLocale, LegalDocumentCopy> = {
  uz: {
    eyebrow: 'Huquqiy ma’lumot',
    title: 'Foydalanish shartlari',
    summary:
      'Ushbu shartlar “Suvchilar maktabi” platformasidan foydalanish, kurslarda qatnashish va sertifikat olishning asosiy qoidalarini belgilaydi.',
    updatedLabel: 'Yangilangan sana',
    updatedAt: '10 sentabr 2026',
    contentsLabel: 'Mundarija',
    printLabel: 'Chop etish',
    backLabel: 'Bosh sahifaga qaytish',
    notice:
      'Platformadan foydalanish orqali siz ushbu shartlar va Maxfiylik siyosati bilan tanishganingizni tasdiqlaysiz. Kursga ariza yuborishdan oldin ularni diqqat bilan o‘qing.',
    sections: [
      {
        id: 'acceptance',
        title: '1. Shartlarni qabul qilish',
        paragraphs: [
          'Platformada ro‘yxatdan o‘tish, tizimga kirish yoki uning xizmatlaridan foydalanish ushbu shartlarni qabul qilganingizni anglatadi. Agar shartlarga rozi bo‘lmasangiz, platformadan foydalanmasligingiz kerak.',
          'Ayrim kurslar uchun qo‘shimcha talablar, hujjatlar yoki qatnashuv qoidalari belgilanishi mumkin. Bunday talablar kurs sahifasida alohida ko‘rsatiladi.'
        ]
      },
      {
        id: 'account',
        title: '2. Profil va hisob xavfsizligi',
        paragraphs: [
          'Ro‘yxatdan o‘tishda to‘g‘ri, to‘liq va dolzarb ma’lumot taqdim etishingiz kerak. Hisobingiz orqali amalga oshirilgan harakatlar uchun javobgarsiz.'
        ],
        items: [
          'Kirish ma’lumotlarini boshqa shaxsga bermang.',
          'Ruxsatsiz kirishdan shubhalansangiz, platforma ma’muriyatiga xabar bering.',
          'Boshqa shaxs nomidan yoki soxta ma’lumot bilan profil yaratmang.'
        ]
      },
      {
        id: 'courses',
        title: '3. Kurslar va arizalar',
        paragraphs: [
          'Kursga qabul qilish kurs talablari, taqdim etilgan ma’lumotlar, hujjatlar, hududiy kvota va mavjud o‘rinlarga bog‘liq. Ariza yuborilishi avtomatik qabulni anglatmaydi.',
          'Kurs sanasi, joyi yoki dasturi zarurat tug‘ilganda o‘zgartirilishi mumkin. Muhim o‘zgarishlar platforma yoki bildirishnoma kanallari orqali yetkaziladi.'
        ]
      },
      {
        id: 'learning',
        title: '4. Ta’lim, test va qatnashuv',
        paragraphs: [
          'Video darslarni ko‘rish, testlardan o‘tish, oflayn mashg‘ulotlarda qatnashish va shaxsni tasdiqlash talablari kursga qarab farq qiladi. Natijalarni buzish yoki boshqa shaxs yordamidan ruxsatsiz foydalanish taqiqlanadi.'
        ],
        items: [
          'Test savollari va javoblarini noqonuniy tarqatmang.',
          'Qatnashuv yoki shaxsni tekshirish jarayoniga xalaqit bermang.',
          'Kurs materiallaridan faqat shaxsiy o‘qish maqsadida foydalaning.'
        ]
      },
      {
        id: 'certificates',
        title: '5. Sertifikatlar',
        paragraphs: [
          'Sertifikat kursning barcha majburiy talablari bajarilgandan va zarur tasdiqlashlardan so‘ng beriladi. Noto‘g‘ri ma’lumot, qoidabuzarlik yoki texnik xato aniqlansa, sertifikat holati qayta ko‘rib chiqilishi, bekor qilinishi yoki yangilanishi mumkin.'
        ]
      },
      {
        id: 'acceptable-use',
        title: '6. Maqbul foydalanish',
        paragraphs: [
          'Platformadan qonuniy, xavfsiz va boshqa foydalanuvchilarning huquqlariga hurmat bilan foydalaning.'
        ],
        items: [
          'Zararli kod, spam yoki ruxsatsiz reklama yuborish taqiqlanadi.',
          'Tizim xavfsizligini chetlab o‘tish yoki ma’lumotlarni ruxsatsiz yig‘ish taqiqlanadi.',
          'Chat va murojaatlarda haqoratli, tahdidli yoki noqonuniy material yuborish taqiqlanadi.'
        ]
      },
      {
        id: 'content',
        title: '7. Intellektual mulk',
        paragraphs: [
          'Kurslar, videolar, testlar, grafikalar, matnlar va platforma dizayni tegishli huquq egalariga tegishli. Yozma ruxsatsiz ularni nusxalash, sotish, ommaviy tarqatish yoki tijorat maqsadida qayta ishlatish mumkin emas.'
        ]
      },
      {
        id: 'availability',
        title: '8. Xizmat mavjudligi va o‘zgarishlar',
        paragraphs: [
          'Platforma barqaror ishlashi uchun choralar ko‘riladi, biroq texnik xizmat, aloqa uzilishi yoki tashqi xizmatlar sababli vaqtinchalik cheklovlar bo‘lishi mumkin. Funksiyalar va ushbu shartlar zaruratga ko‘ra yangilanishi mumkin.'
        ]
      },
      {
        id: 'suspension',
        title: '9. Hisobni cheklash',
        paragraphs: [
          'Shartlar buzilganda, xavfsizlik tahdidi aniqlanganda yoki qonuniy talab mavjud bo‘lsa, hisob vaqtincha cheklanishi yoki yopilishi mumkin. Imkon qadar sabab va keyingi harakatlar foydalanuvchiga bildiriladi.'
        ]
      },
      {
        id: 'contact',
        title: '10. Murojaat qilish',
        paragraphs: [
          'Shartlar, kurs qoidalari yoki hisobingiz bo‘yicha savollarni platformadagi yordam kanali orqali yuborishingiz mumkin. Rasmiy operator va aloqa ma’lumotlari platforma ishga tushirilishidan oldin ushbu bo‘limda e’lon qilinadi.'
        ]
      }
    ]
  },
  ru: {
    eyebrow: 'Правовая информация',
    title: 'Условия использования',
    summary:
      'Эти условия определяют основные правила использования платформы «Школа водников», участия в курсах и получения сертификатов.',
    updatedLabel: 'Дата обновления',
    updatedAt: '10 сентября 2026 года',
    contentsLabel: 'Содержание',
    printLabel: 'Распечатать',
    backLabel: 'Вернуться на главную',
    notice:
      'Используя платформу, вы подтверждаете, что ознакомились с этими условиями и Политикой конфиденциальности. Пожалуйста, внимательно прочитайте их перед подачей заявки на курс.',
    sections: [
      {
        id: 'acceptance',
        title: '1. Принятие условий',
        paragraphs: [
          'Регистрация, вход или использование сервисов платформы означает принятие настоящих условий. Если вы с ними не согласны, не используйте платформу.',
          'Для отдельных курсов могут действовать дополнительные требования к документам и участию. Они указываются на странице соответствующего курса.'
        ]
      },
      {
        id: 'account',
        title: '2. Профиль и безопасность аккаунта',
        paragraphs: [
          'При регистрации необходимо предоставить точные, полные и актуальные сведения. Вы отвечаете за действия, выполненные через ваш аккаунт.'
        ],
        items: [
          'Не передавайте данные для входа другим лицам.',
          'Сообщите администрации, если подозреваете несанкционированный доступ.',
          'Не создавайте профиль от имени другого человека и не указывайте ложные сведения.'
        ]
      },
      {
        id: 'courses',
        title: '3. Курсы и заявки',
        paragraphs: [
          'Зачисление зависит от требований курса, предоставленных сведений и документов, региональной квоты и наличия мест. Отправка заявки не означает автоматического зачисления.',
          'При необходимости дата, место или программа курса могут измениться. О важных изменениях сообщается через платформу или каналы уведомлений.'
        ]
      },
      {
        id: 'learning',
        title: '4. Обучение, тестирование и посещаемость',
        paragraphs: [
          'Требования к просмотру видео, тестированию, очному участию и подтверждению личности зависят от курса. Запрещено искажать результаты или пользоваться неразрешённой помощью.'
        ],
        items: [
          'Не распространяйте вопросы и ответы тестов незаконным способом.',
          'Не препятствуйте проверке личности или посещаемости.',
          'Используйте материалы курса только для личного обучения.'
        ]
      },
      {
        id: 'certificates',
        title: '5. Сертификаты',
        paragraphs: [
          'Сертификат выдаётся после выполнения всех обязательных требований и необходимых подтверждений. При обнаружении ложных данных, нарушений или технической ошибки сертификат может быть пересмотрен, отменён или заменён.'
        ]
      },
      {
        id: 'acceptable-use',
        title: '6. Допустимое использование',
        paragraphs: [
          'Используйте платформу законно, безопасно и с уважением к правам других пользователей.'
        ],
        items: [
          'Запрещено отправлять вредоносный код, спам и несанкционированную рекламу.',
          'Запрещено обходить защиту системы и собирать данные без разрешения.',
          'Запрещено отправлять оскорбительные, угрожающие или незаконные материалы.'
        ]
      },
      {
        id: 'content',
        title: '7. Интеллектуальная собственность',
        paragraphs: [
          'Курсы, видео, тесты, графика, тексты и дизайн платформы принадлежат соответствующим правообладателям. Без письменного разрешения их нельзя копировать, продавать, публично распространять или использовать в коммерческих целях.'
        ]
      },
      {
        id: 'availability',
        title: '8. Доступность и изменения сервиса',
        paragraphs: [
          'Мы принимаем меры для стабильной работы платформы, однако техническое обслуживание, проблемы связи или внешних сервисов могут временно ограничивать доступ. Функции и настоящие условия могут обновляться.'
        ]
      },
      {
        id: 'suspension',
        title: '9. Ограничение аккаунта',
        paragraphs: [
          'При нарушении условий, угрозе безопасности или наличии законного требования аккаунт может быть временно ограничен или закрыт. По возможности пользователю сообщаются причина и дальнейшие действия.'
        ]
      },
      {
        id: 'contact',
        title: '10. Обращения',
        paragraphs: [
          'Вопросы об условиях, правилах курса или аккаунте можно направить через канал поддержки платформы. Официальные сведения об операторе и контакты будут опубликованы в этом разделе до запуска платформы.'
        ]
      }
    ]
  }
};

export const privacyCopy: Record<PublicLocale, LegalDocumentCopy> = {
  uz: {
    eyebrow: 'Shaxsiy ma’lumotlar',
    title: 'Maxfiylik siyosati',
    summary:
      'Ushbu siyosat platforma qanday ma’lumotlarni yig‘ishi, ulardan nima maqsadda foydalanishi va ularni qanday himoya qilishini tushuntiradi.',
    updatedLabel: 'Yangilangan sana',
    updatedAt: '10 sentabr 2026',
    contentsLabel: 'Mundarija',
    printLabel: 'Chop etish',
    backLabel: 'Bosh sahifaga qaytish',
    notice:
      'Pasport, JSHSHIR, diplom va biometrik ma’lumotlar sezgir hisoblanadi. Ular faqat aniq maqsad, tegishli rozilik va vakolat asosida qayta ishlanishi kerak.',
    sections: [
      {
        id: 'scope',
        title: '1. Siyosat doirasi',
        paragraphs: [
          'Siyosat “Suvchilar maktabi” veb-platformasi va u bilan bog‘liq mobil xizmatlarda qayta ishlanadigan shaxsiy ma’lumotlarga tatbiq etiladi. Tashqi saytlarga o‘tganingizda ularning maxfiylik qoidalari amal qiladi.'
        ]
      },
      {
        id: 'data',
        title: '2. Yig‘ilishi mumkin bo‘lgan ma’lumotlar',
        paragraphs: ['Kurs va xizmat turiga qarab quyidagi ma’lumotlar so‘ralishi mumkin:'],
        items: [
          'F.I.Sh., tug‘ilgan sana, telefon raqami, yashash hududi va manzili;',
          'JSHSHIR, pasport ma’lumotlari va shaxsni tasdiqlash natijalari;',
          'Kasb, lavozim, ish staji, xo‘jalik yoki tashkilot ma’lumotlari;',
          'Diplom, mehnat faoliyati va boshqa kurs talab qiladigan hujjatlar;',
          'Kurs arizalari, dars progressi, test natijalari, qatnashuv va sertifikatlar;',
          'Murojaatlar, chat xabarlari va yuborilgan media fayllar;',
          'Qurilma, brauzer, IP-manzil va texnik jurnal ma’lumotlari.'
        ]
      },
      {
        id: 'identity',
        title: '3. MyID va shaxsni tasdiqlash',
        paragraphs: [
          'MyID yoki boshqa tasdiqlangan identifikatsiya xizmati orqali olingan ma’lumotlar profilni to‘ldirish, shaxsni tekshirish va firibgarlikning oldini olish uchun ishlatiladi. Tashqi xizmatlar ma’lumotlarni o‘z siyosatlari asosida qayta ishlashi mumkin.'
        ]
      },
      {
        id: 'biometrics',
        title: '4. Face ID va nazorat ma’lumotlari',
        paragraphs: [
          'Ayrim kurslarda qatnashuv yoki test topshiruvchining shaxsini tekshirish uchun yuz tasviri yoki boshqa nazorat materiallari talab qilinishi mumkin. Bunday qayta ishlashdan oldin maqsad, saqlash muddati, kirish huquqi va rozilik tartibi alohida tushuntiriladi.',
          'Biometrik ma’lumotlar reklama yoki profilni tijorat maqsadida tahlil qilish uchun ishlatilmaydi.'
        ]
      },
      {
        id: 'purpose',
        title: '5. Ma’lumotlardan foydalanish maqsadlari',
        paragraphs: ['Ma’lumotlar quyidagi maqsadlarda ishlatiladi:'],
        items: [
          'Profil yaratish va foydalanuvchini autentifikatsiya qilish;',
          'Kursga moslikni va hujjatlarni tekshirish;',
          'Ta’lim jarayoni, test, qatnashuv va sertifikatlarni boshqarish;',
          'Bildirishnoma va xizmat xabarlarini yuborish;',
          'Ekspert bilan murojaatlarni tashkil etish;',
          'Xavfsizlik, xatolarni aniqlash va xizmat sifatini yaxshilash;',
          'Qonuniy majburiyatlarni bajarish.'
        ]
      },
      {
        id: 'sharing',
        title: '6. Ma’lumotlarni ulashish',
        paragraphs: [
          'Ma’lumotlar faqat xizmat ko‘rsatish uchun zarur bo‘lgan doirada vakolatli administratorlar, o‘quv markazlari, tasdiqlangan mutaxassislar va texnik xizmat ko‘rsatuvchilar bilan ulashilishi mumkin. Maxfiy ma’lumotlar sotilmaydi.',
          'Qonun talab qilganda yoki xavfsizlikni himoya qilish zarur bo‘lganda vakolatli davlat organlariga ma’lumot taqdim etilishi mumkin.'
        ]
      },
      {
        id: 'retention',
        title: '7. Saqlash muddati',
        paragraphs: [
          'Ma’lumotlar ularni yig‘ish maqsadi, sertifikat va ta’lim yozuvlarini saqlash zarurati hamda amaldagi qonun talablari doirasida saqlanadi. Aniq muddatlar ma’lumot turi bo‘yicha tasdiqlanadi va zarur bo‘lmagan ma’lumotlar xavfsiz o‘chiriladi yoki anonimlashtiriladi.'
        ]
      },
      {
        id: 'security',
        title: '8. Axborot xavfsizligi',
        paragraphs: [
          'Platforma ruxsatsiz kirish, yo‘qotish va oshkor bo‘lish xavfini kamaytirish uchun tashkiliy va texnik choralarni qo‘llaydi.'
        ],
        items: [
          'Rol va hududga asoslangan kirish huquqlari;',
          'Ma’lumotlarni uzatishda himoyalangan aloqa;',
          'Muhim harakatlarni qayd etish va monitoring;',
          'Fayllar va maxfiy maydonlarga cheklangan kirish.'
        ]
      },
      {
        id: 'rights',
        title: '9. Foydalanuvchi huquqlari',
        paragraphs: ['Amaldagi qonun doirasida siz quyidagilarni so‘rashingiz mumkin:'],
        items: [
          'Profil ma’lumotlarini ko‘rish va ruxsat etilgan qismini tuzatish;',
          'Ma’lumotlar qanday ishlatilayotgani haqida ma’lumot olish;',
          'Noto‘g‘ri ma’lumotni tuzatish yoki asos mavjud bo‘lsa o‘chirish;',
          'Muayyan qayta ishlashga berilgan rozilikni qaytarib olish;',
          'Maxfiylik bo‘yicha murojaat yoki shikoyat yuborish.'
        ]
      },
      {
        id: 'contact',
        title: '10. Bog‘lanish va yangilanishlar',
        paragraphs: [
          'Maxfiylik bo‘yicha savol yoki so‘rovni platformadagi yordam kanali orqali yuborishingiz mumkin. Rasmiy operator, ma’lumotlarni himoya qilish bo‘yicha aloqa va tasdiqlangan saqlash muddatlari platforma ishga tushirilishidan oldin e’lon qilinadi.',
          'Siyosat yangilanganda uning yangi sanasi ushbu sahifada ko‘rsatiladi. Muhim o‘zgarishlar haqida qo‘shimcha bildirishnoma berilishi mumkin.'
        ]
      }
    ]
  },
  ru: {
    eyebrow: 'Персональные данные',
    title: 'Политика конфиденциальности',
    summary:
      'Эта политика объясняет, какие данные может собирать платформа, зачем они используются и как обеспечивается их защита.',
    updatedLabel: 'Дата обновления',
    updatedAt: '10 сентября 2026 года',
    contentsLabel: 'Содержание',
    printLabel: 'Распечатать',
    backLabel: 'Вернуться на главную',
    notice:
      'Паспортные данные, ПИНФЛ, дипломы и биометрические сведения являются чувствительными. Они должны обрабатываться только для конкретной цели, с надлежащим согласием и на основании полномочий.',
    sections: [
      {
        id: 'scope',
        title: '1. Область действия',
        paragraphs: [
          'Политика применяется к персональным данным, обрабатываемым веб-платформой «Школа водников» и связанными мобильными сервисами. При переходе на внешний сайт действуют правила конфиденциальности этого сайта.'
        ]
      },
      {
        id: 'data',
        title: '2. Какие данные могут собираться',
        paragraphs: ['В зависимости от курса и услуги могут потребоваться:'],
        items: [
          'Ф.И.О., дата рождения, номер телефона, регион и адрес проживания;',
          'ПИНФЛ, паспортные данные и результаты подтверждения личности;',
          'Профессия, должность, стаж, сведения о хозяйстве или организации;',
          'Диплом, сведения о трудовой деятельности и другие документы курса;',
          'Заявки, прогресс уроков, результаты тестов, посещаемость и сертификаты;',
          'Обращения, сообщения чата и прикреплённые медиафайлы;',
          'Сведения об устройстве, браузере, IP-адресе и технические журналы.'
        ]
      },
      {
        id: 'identity',
        title: '3. MyID и подтверждение личности',
        paragraphs: [
          'Данные, полученные через MyID или другую проверенную систему идентификации, используются для заполнения профиля, проверки личности и предотвращения мошенничества. Внешние сервисы могут обрабатывать данные по собственным политикам.'
        ]
      },
      {
        id: 'biometrics',
        title: '4. Face ID и данные контроля',
        paragraphs: [
          'Для отдельных курсов может потребоваться изображение лица или другие материалы контроля посещаемости и тестирования. До обработки пользователю отдельно разъясняются цель, срок хранения, круг лиц с доступом и порядок получения согласия.',
          'Биометрические данные не используются для рекламы или коммерческого профилирования.'
        ]
      },
      {
        id: 'purpose',
        title: '5. Для чего используются данные',
        paragraphs: ['Данные используются, чтобы:'],
        items: [
          'Создавать профиль и выполнять аутентификацию;',
          'Проверять соответствие требованиям курса и документы;',
          'Управлять обучением, тестами, посещаемостью и сертификатами;',
          'Отправлять уведомления и сервисные сообщения;',
          'Организовывать обращения к экспертам;',
          'Обеспечивать безопасность, находить ошибки и улучшать сервис;',
          'Выполнять законные обязательства.'
        ]
      },
      {
        id: 'sharing',
        title: '6. Передача данных',
        paragraphs: [
          'Данные могут передаваться в необходимом объёме уполномоченным администраторам, учебным центрам, проверенным специалистам и техническим поставщикам. Конфиденциальные данные не продаются.',
          'Информация может быть предоставлена уполномоченным государственным органам, если этого требует закон или защита безопасности.'
        ]
      },
      {
        id: 'retention',
        title: '7. Срок хранения',
        paragraphs: [
          'Данные хранятся с учётом цели сбора, необходимости сохранять учебные и сертификационные записи и требований закона. Точные сроки утверждаются по типам данных; ненужные сведения безопасно удаляются или обезличиваются.'
        ]
      },
      {
        id: 'security',
        title: '8. Информационная безопасность',
        paragraphs: [
          'Платформа применяет организационные и технические меры для снижения риска несанкционированного доступа, утраты и раскрытия данных.'
        ],
        items: [
          'Доступ на основе роли и региона;',
          'Защищённая передача данных;',
          'Журналирование и мониторинг важных действий;',
          'Ограниченный доступ к файлам и чувствительным полям.'
        ]
      },
      {
        id: 'rights',
        title: '9. Права пользователя',
        paragraphs: ['В пределах применимого законодательства вы можете запросить:'],
        items: [
          'Просмотр и исправление разрешённых данных профиля;',
          'Информацию о том, как используются ваши данные;',
          'Исправление неточных или удаление данных при наличии основания;',
          'Отзыв согласия на определённую обработку;',
          'Рассмотрение обращения или жалобы по конфиденциальности.'
        ]
      },
      {
        id: 'contact',
        title: '10. Контакты и обновления',
        paragraphs: [
          'Вопрос или запрос о конфиденциальности можно направить через поддержку платформы. Официальные сведения об операторе, контакт по защите данных и утверждённые сроки хранения будут опубликованы до запуска.',
          'При обновлении политики на странице указывается новая дата. О существенных изменениях может быть направлено дополнительное уведомление.'
        ]
      }
    ]
  }
};
