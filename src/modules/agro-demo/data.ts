export type DemoTone = 'blue' | 'green' | 'orange' | 'red' | 'teal';

export const learnerCourses = [
  {
    id: 'water-efficiency',
    title: 'Suvdan samarali foydalanish',
    category: 'Irrigatsiya',
    format: 'Onlayn',
    instructor: 'Dilshod Xolmatov',
    progress: 68,
    completedLessons: 7,
    totalLessons: 10,
    nextLesson: 'Tomchilatib sug‘orish tizimini hisoblash',
    nextDate: '12-sentabr, 10:00',
    tone: 'teal' as DemoTone
  },
  {
    id: 'project-designer',
    title: 'Loyihachi mutaxassis tayyorlash',
    category: 'Loyiha-smeta',
    format: 'Aralash',
    instructor: 'Nodira Rasulova',
    progress: 35,
    completedLessons: 3,
    totalLessons: 12,
    nextLesson: 'Nasos stansiyasini tanlash mezonlari',
    nextDate: '14-sentabr, 14:30',
    tone: 'green' as DemoTone
  },
  {
    id: 'soil-water',
    title: 'Tuproq namligi va sug‘orish rejimi',
    category: 'Agronomiya',
    format: 'Oflayn',
    instructor: 'Sanjar Qodirov',
    progress: 100,
    completedLessons: 8,
    totalLessons: 8,
    nextLesson: 'Kurs yakunlangan',
    nextDate: 'Sertifikat berilgan',
    tone: 'orange' as DemoTone
  }
];

export const catalogCourses = [
  {
    id: 'drip-irrigation',
    title: 'Tomchilatib sug‘orish asoslari',
    description: 'Suv sarfini hisoblash, filtr tanlash va dala sharoitida tizimni boshqarish.',
    category: 'Zamonaviy sug‘orish',
    format: 'Onlayn',
    duration: '6 hafta',
    lessons: 10,
    passScore: 70,
    region: 'Barcha hududlar',
    startDate: '18-sentabr',
    certificate: true,
    price: 'Bepul',
    tone: 'teal' as DemoTone
  },
  {
    id: 'project-specialist',
    title: 'Suv xo‘jaligi loyihachisi',
    description: 'Loyiha hujjatlari, gidravlik hisob va yakuniy oflayn attestatsiya.',
    category: 'Loyiha-smeta',
    format: 'Aralash',
    duration: '10 hafta',
    lessons: 12,
    passScore: 70,
    region: 'Toshkent shahri',
    startDate: '25-sentabr',
    certificate: true,
    price: 'Bepul',
    tone: 'green' as DemoTone
  },
  {
    id: 'pump-service',
    title: 'Nasos va filtrlar servisi',
    description: 'Nosozliklarni aniqlash, profilaktika va energiya samaradorligini oshirish.',
    category: 'Servis xizmati',
    format: 'Oflayn',
    duration: '3 kun',
    lessons: 6,
    passScore: 65,
    region: 'Samarqand viloyati',
    startDate: '2-oktabr',
    certificate: true,
    price: 'Bepul',
    tone: 'blue' as DemoTone
  },
  {
    id: 'soil-fertility',
    title: 'Tuproq unumdorligi va suv balansi',
    description: 'Ekin turi bo‘yicha suv me’yori va tuproq tahlili natijalaridan foydalanish.',
    category: 'Agronomiya',
    format: 'Onlayn',
    duration: '4 hafta',
    lessons: 8,
    passScore: 60,
    region: 'Barcha hududlar',
    startDate: '6-oktabr',
    certificate: true,
    price: 'Bepul',
    tone: 'orange' as DemoTone
  }
];

export const learnerApplications = [
  {
    id: 'AR-2048',
    course: 'Suv xo‘jaligi loyihachisi',
    submittedAt: '8-sentabr 2026',
    status: 'Qo‘shimcha ma’lumot kerak',
    detail: 'Diplom ilovasining barcha sahifalarini qayta yuklang.',
    tone: 'orange' as DemoTone,
    progress: 62
  },
  {
    id: 'AR-1987',
    course: 'Tomchilatib sug‘orish asoslari',
    submittedAt: '2-sentabr 2026',
    status: 'Tasdiqlangan',
    detail: 'Kurs 18-sentabr kuni ochiladi.',
    tone: 'green' as DemoTone,
    progress: 100
  },
  {
    id: 'AR-1902',
    course: 'Tuproq namligi va sug‘orish rejimi',
    submittedAt: '18-avgust 2026',
    status: 'Kurs yakunlangan',
    detail: 'Sertifikat profilingizga qo‘shildi.',
    tone: 'teal' as DemoTone,
    progress: 100
  }
];

export const certificates = [
  {
    number: 'SM-2026-008741',
    course: 'Tuproq namligi va sug‘orish rejimi',
    issuedAt: '31-avgust 2026',
    validUntil: 'Muddatsiz',
    status: 'Berilgan'
  },
  {
    number: 'SM-2026-006294',
    course: 'Fermer xo‘jaligida suv hisobi',
    issuedAt: '12-iyul 2026',
    validUntil: '12-iyul 2029',
    status: 'Berilgan'
  }
];

export const adminApplications = [
  {
    id: 'AR-2054',
    learner: 'Mansur Ergashev',
    pinfl: '••••••••••3842',
    course: 'Suv xo‘jaligi loyihachisi',
    region: 'Farg‘ona',
    submittedAt: 'Bugun, 09:42',
    wait: '1 soat',
    status: 'Yangi',
    tone: 'blue' as DemoTone
  },
  {
    id: 'AR-2048',
    learner: 'Aziza Abdullayeva',
    pinfl: '••••••••••7216',
    course: 'Suv xo‘jaligi loyihachisi',
    region: 'Toshkent',
    submittedAt: 'Kecha, 16:18',
    wait: '17 soat',
    status: 'Hujjat tekshiruvida',
    tone: 'orange' as DemoTone
  },
  {
    id: 'AR-2039',
    learner: 'Kamoliddin Yusupov',
    pinfl: '••••••••••1059',
    course: 'Nasos va filtrlar servisi',
    region: 'Samarqand',
    submittedAt: '8-sentabr, 11:06',
    wait: '2 kun',
    status: 'Qaror kutilmoqda',
    tone: 'red' as DemoTone
  },
  {
    id: 'AR-2017',
    learner: 'Mahliyo To‘rayeva',
    pinfl: '••••••••••4471',
    course: 'Tomchilatib sug‘orish asoslari',
    region: 'Buxoro',
    submittedAt: '7-sentabr, 14:30',
    wait: '3 kun',
    status: 'Tasdiqlangan',
    tone: 'green' as DemoTone
  }
];

export const consultations = [
  {
    id: 'MQ-8821',
    user: 'Sherzod Mamatqulov',
    initials: 'SM',
    subject: 'Tomchilatish quvurlarida bosim pasaymoqda',
    category: 'Tomchilatib sug‘orish',
    region: 'Qashqadaryo',
    crop: 'Paxta',
    area: '12 ga',
    time: '8 daqiqa oldin',
    status: 'Yangi',
    tone: 'blue' as DemoTone,
    preview: 'Filtrni tozaladik, lekin oxirgi qatordagi tomizgichlar baribir sust ishlayapti.'
  },
  {
    id: 'MQ-8814',
    user: 'Dilorom Hamroyeva',
    initials: 'DH',
    subject: 'Sho‘rlangan maydon uchun sug‘orish rejimi',
    category: 'Tuproq va o‘g‘it',
    region: 'Sirdaryo',
    crop: 'G‘alla',
    area: '8 ga',
    time: '34 daqiqa oldin',
    status: 'Javob berilmoqda',
    tone: 'orange' as DemoTone,
    preview:
      'Oxirgi tahlilda EC ko‘rsatkichi yuqori chiqdi. Qaysi yuvish me’yorini tavsiya qilasiz?'
  },
  {
    id: 'MQ-8798',
    user: 'Ulug‘bek Salimov',
    initials: 'US',
    subject: 'Nasosning energiya sarfi oshib ketdi',
    category: 'Nasos va filtr',
    region: 'Andijon',
    crop: 'Bog‘',
    area: '4.5 ga',
    time: 'Kecha',
    status: 'Javob berildi',
    tone: 'green' as DemoTone,
    preview: 'Bosim o‘zgarmagan bo‘lsa ham elektr sarfi qariyb 20 foizga oshdi.'
  }
];
