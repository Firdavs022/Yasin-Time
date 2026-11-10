import { Language } from '../types';

export interface Translations {
  nav: {
    about: string;
    communities: string;
    projects: string;
    aziziPartner: string;
    catalog: string;
    contact: string;
    enquire: string;
    adminPortal: string;
    themeLight: string;
    themeDark: string;
  };
  hero: {
    exclusiveOffer: string;
    salesEvent: string;
    discoverHomes: string;
    startingFrom: string;
    flexiblePayment: string;
    visitShowroom: string;
    showroomTime: string;
    registerInterest: string;
    discover: string;
    roiLabel: string;
    handoverLabel: string;
  };
  signature: {
    badge: string;
    title: string;
    subtitle: string;
    offplanTitle: string;
    offplanDesc: string;
    flippingTitle: string;
    flippingDesc: string;
    rentalTitle: string;
    rentalDesc: string;
    villaTitle: string;
    villaDesc: string;
    discoverBtn: string;
    roiHigh: string;
    guaranteedYield: string;
    paymentPlanBadge: string;
  };
  catalog: {
    badge: string;
    title: string;
    subtitle: string;
    allCategories: string;
    allDeals: string;
    forSale: string;
    forRent: string;
    offPlan: string;
    priceFilter: string;
    roomsFilter: string;
    anyRooms: string;
    searchPlaceholder: string;
    sqm: string;
    beds: string;
    baths: string;
    discoverDetails: string;
    inquireNow: string;
    noPropertiesFound: string;
    aziziVerified: string;
  };
  aziziSection: {
    badge: string;
    title: string;
    description: string;
    statsProjects: string;
    statsPortfolio: string;
    statsDelivered: string;
    statsNationalities: string;
    features1Title: string;
    features1Desc: string;
    features2Title: string;
    features2Desc: string;
    features3Title: string;
    features3Desc: string;
  };
  leadModal: {
    title: string;
    subtitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    phone: string;
    email: string;
    propertyInterested: string;
    budget: string;
    dealType: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    close: string;
    privacyNote: string;
  };
  contactBar: {
    enquireTooltip: string;
    callTooltip: string;
    telegramTooltip: string;
    instagramTooltip: string;
    adminTooltip: string;
  };
  footer: {
    newsletterTitle: string;
    newsletterSubtitle: string;
    emailPlaceholder: string;
    subscribe: string;
    aboutUs: string;
    ourLegacy: string;
    corporateTeam: string;
    contactUs: string;
    careers: string;
    ourPortfolio: string;
    services: string;
    vipConsulting: string;
    investmentManagement: string;
    handoverProcedure: string;
    phone: string;
    officeTashkent: string;
    officeDubai: string;
    rights: string;
    language: string;
    adminLogin: string;
  };
  admin: {
    title: string;
    tagline: string;
    backToSite: string;
    roleSelector: string;
    roleAdmin: string;
    roleManager: string;
    roleAccountant: string;
    tabLeads: string;
    tabProperties: string;
    tabFinance: string;
    tabAudit: string;
    simulateLeadBtn: string;
    exportExcel: string;
    exportFinance: string;
    totalLeads: string;
    newLeads: string;
    inProgress: string;
    closedDeals: string;
    statusNew: string;
    statusContacted: string;
    statusMeeting: string;
    statusNegotiation: string;
    statusWon: string;
    statusLost: string;
    assignManager: string;
    leadNotes: string;
    openTelegram: string;
    callClient: string;
    addPropertyBtn: string;
    addCategoryBtn: string;
    propertyTitle: string;
    propertyPrice: string;
    propertyArea: string;
    propertyBeds: string;
    propertyBaths: string;
    propertyLocation: string;
    propertyCategory: string;
    propertyDealType: string;
    propertyImage: string;
    actions: string;
    edit: string;
    delete: string;
    save: string;
    cancel: string;
    financeTitle: string;
    totalRevenue: string;
    totalExpenses: string;
    netProfit: string;
    conversionRate: string;
    addExpenseBtn: string;
    expenseCategory: string;
    expenseAmount: string;
    expenseDate: string;
    expenseTitle: string;
    filterDaily: string;
    filterWeekly: string;
    filterMonthly: string;
    filterYearly: string;
    auditLogTitle: string;
    time: string;
    user: string;
    action: string;
    details: string;
  };
}

export const translations: Record<Language, Translations> = {
  uz: {
    nav: {
      about: "Biz haqimizda",
      communities: "Hududlar",
      projects: "Asosiy loyihalar",
      aziziPartner: "Azizi hamkorligi",
      catalog: "Mulklar katalogi",
      contact: "Bog'lanish",
      enquire: "Ariza qoldirish",
      adminPortal: "Boshqaruv tizimi",
      themeLight: "Kunduzgi rejim",
      themeDark: "Tungi rejim",
    },
    hero: {
      exclusiveOffer: "Maxsus sotuv mavsumi",
      salesEvent: "Premyera va imtiyozli shartlar",
      discoverHomes: "Yasin Time va Azizi bilan hashamatli hayotni kashf eting",
      startingFrom: "Boshlang'ich narx",
      flexiblePayment: "Foizsiz bo'lib to'lash va chegirmalar",
      visitShowroom: "Bizning shou-rum va namoyish villamizga tashrif buyuring",
      showroomTime: "Har kuni: 10:00 dan 20:00 gacha",
      registerInterest: "Qiziqish bildirish",
      discover: "Batafsil ma'lumot",
      roiLabel: "Kutilayotgan daromadlilik",
      handoverLabel: "Topshirish muddati",
    },
    signature: {
      badge: "Azizi uslubidagi 4 asosiy yo'nalish",
      title: "Yasin Time eksklyuziv loyihalari",
      subtitle: "Dubay va xalqaro miqyosdagi eng nufuzli va daromadli investitsiya aktivlari",
      offplanTitle: "Qurilish bosqichidagi loyihalar",
      offplanDesc: "Boshlang'ich bosqichdagi eng qulay narxlar, qulay to'lov jadvallari va kapitalning kafolatlangan o'sishi.",
      flippingTitle: "Yuqori rentabelli qayta sotuv",
      flippingDesc: "Mulkni yangilash va qayta sotish orqali 6-12 oy ichida 25-40% gacha sof foyda olish imkoniyati.",
      rentalTitle: "Barqaror ijara portfeli",
      rentalDesc: "Dubay markazida yillik 9-12% sof valyutadagi ijara daromadi bilan to'liq boshqariladigan xonadonlar.",
      villaTitle: "Hashamatli xususiy villalar",
      villaDesc: "Xususiy basseyn, shaxsiy sohil va yuqori darajadagi qulayliklarga ega bo'lgan xususiy saroylar.",
      discoverBtn: "Loyiha bilan tanishish",
      roiHigh: "Rentabellik 28%+",
      guaranteedYield: "Yillik 11% daromad",
      paymentPlanBadge: "60/40 Bo'lib to'lash",
    },
    catalog: {
      badge: "Ko'chmas mulk katalogi",
      title: "Tanlangan obyektlar va Azizi kolleksiyasi",
      subtitle: "Kvartira, villa, hovli va tijorat maydonlari — to'liq tekshirilgan va kafolatlangan",
      allCategories: "Barcha toifalar",
      allDeals: "Barchasi",
      forSale: "Sotuv",
      forRent: "Ijara",
      offPlan: "Off-Plan",
      priceFilter: "Narx: Barchasi",
      roomsFilter: "Xonalar soni",
      anyRooms: "Xonalar: Barchasi",
      searchPlaceholder: "Nomi, joylashuvi yoki xususiyati bo'yicha qidiruv...",
      sqm: "m²",
      beds: "xona",
      baths: "hammom",
      discoverDetails: "Batafsil ko'rish",
      inquireNow: "Ariza topshirish",
      noPropertiesFound: "Kiritilgan mezonlarga mos obyekt topilmadi",
      aziziVerified: "Azizi tasdiqlangan hamkor",
    },
    aziziSection: {
      badge: "Rasmiy strategik hamkorlik",
      title: "Azizi Developments va Yasin Time Group",
      description: "Biz Birlashgan Arab Amirliklarining yetakchi qurilish kompaniyasi bo'lgan Azizi Developments bilan to'g'ridan-to'g'ri hamkorlikda mijozlarimizga eng yaxshi shartlar bilan ko'chmas mulk xarid qilish imkonini beramiz.",
      statsProjects: "Muvaffaqiyatli loyihalar",
      statsPortfolio: "Umumiy portfel qiymati",
      statsDelivered: "Topshirilgan xonadonlar",
      statsNationalities: "Investor davlatlar",
      features1Title: "To'g'ridan-to'g'ri ishlab chiquvchi narxi",
      features1Desc: "O'rtakashlarsiz rasmiy shartnoma, chegirmalar va quruvchining to'liq kafolati.",
      features2Title: "0% Komissiya va Oltin viza",
      features2Desc: "Ko'chmas mulk xaridi orqali Dubay 'Oltin Vizasi' va to'liq yuridik hamrohlik xizmati.",
      features3Title: "Moslashuvchan to'lov rejalari",
      features3Desc: "Qurilish davrida foizsiz bo'lib to'lash va davlat bank kafolatlari.",
    },
    leadModal: {
      title: "Shaxsiy konsultatsiya va arizani rasmiylashtirish",
      subtitle: "Ma'lumotlaringizni qoldiring, shaxsiy maslahatchimiz 10 daqiqa ichida siz bilan bog'lanadi",
      fullName: "To'liq ismingiz",
      fullNamePlaceholder: "Masalan: Alisher Usmonov",
      phone: "Telefon raqamingiz",
      email: "Elektron pochta (ixtiyoriy)",
      propertyInterested: "Sizni qiziqtirgan obyekt yoki toifa",
      budget: "Rejalashtirilgan byudjet",
      dealType: "Qiziqish turi",
      message: "Qo'shimcha istaklaringiz",
      messagePlaceholder: "Masalan: Dubay markazidagi 2 xonali kvartiraga qiziqyapti, to'lov rejasini bilmoqchiman...",
      submit: "Arizani yuborish",
      submitting: "Yuborilmoqda...",
      successTitle: "Arizangiz muvaffaqiyatli qabul qilindi!",
      successDesc: "Rahmat! Ma'lumotlaringiz boshqaruv tizimiga kiritildi. Shaxsiy menejerimiz tez orada siz bilan bog'lanadi.",
      close: "Yopish",
      privacyNote: "Sizning ma'lumotlaringiz maxfiy saqlanadi va begonalarga berilmaydi.",
    },
    contactBar: {
      enquireTooltip: "Ariza qoldirish",
      callTooltip: "Qo'ng'iroq qilish: +998 50 876 77 22",
      telegramTooltip: "Telegram: @YasinTime_Group",
      instagramTooltip: "Instagram: @yasintime.official",
      adminTooltip: "Boshqaruv tizimi",
    },
    footer: {
      newsletterTitle: "Maxsus takliflarga obuna bo'ling",
      newsletterSubtitle: "Dubaydagi yopiq sotuvlar, chegirmalar va yangi loyihalar xabarnomasi",
      emailPlaceholder: "Elektron pochta manzilingiz",
      subscribe: "Obuna bo'lish",
      aboutUs: "Kompaniya haqida",
      ourLegacy: "Bizning tariximiz",
      corporateTeam: "Boshqaruv kengashi",
      contactUs: "Bog'lanish",
      careers: "Karyera",
      ourPortfolio: "Bizning portfel",
      services: "Xizmatlar",
      vipConsulting: "Mulk boshqaruvi",
      investmentManagement: "Investitsiya konsaltingi",
      handoverProcedure: "Kalit topshirish tartibi",
      phone: "+998 50 876 77 22",
      officeTashkent: "Тошкент шаҳар, Шайхонтоҳур тумани, кв. Жангох, дом 2аб, кв. 185",
      officeDubai: "Dubay: DIFC, Gate Precinct 4 / Azizi Sales Gallery, Meydan",
      rights: "Barcha huquqlar himoyalangan.",
      language: "Tilni tanlang",
      adminLogin: "Boshqaruv paneli (Admin)",
    },
    admin: {
      title: "YASIN TIME BOSHQARUV TIZIMI",
      tagline: "Lidlar oqimi, obyektlar katalogi va moliyaviy tahlil",
      backToSite: "Saytga qaytish",
      roleSelector: "Lavozimni tanlang",
      roleAdmin: "Boshqaruvchi (To'liq huquq)",
      roleManager: "Menejer (Mijozlar va aloqa)",
      roleAccountant: "Buxgalter (Moliya va xarajatlar)",
      tabLeads: "Lidlar va mijozlar",
      tabProperties: "Obyektlar va katalog",
      tabFinance: "Moliya va xarajatlar",
      tabAudit: "Tizim tarixi",
      simulateLeadBtn: "+ Yangi ariza kiritish",
      exportExcel: "Excel faylga yuklash (Lidlar)",
      exportFinance: "Excel faylga yuklash (Moliya)",
      totalLeads: "Jami arizalar",
      newLeads: "Yangi arizalar",
      inProgress: "Jarayonda",
      closedDeals: "Muvaffaqiyatli bitimlar",
      statusNew: "Yangi",
      statusContacted: "Bog'lanildi",
      statusMeeting: "Uchrashuv",
      statusNegotiation: "Muzokaralar",
      statusWon: "Muvaffaqiyatli bitim",
      statusLost: "Rad etildi",
      assignManager: "Menejer biriktirish",
      leadNotes: "Menejer izohi",
      openTelegram: "Telegramda yozish",
      callClient: "Qo'ng'iroq qilish",
      addPropertyBtn: "+ Yangi obyekt qo'shish",
      addCategoryBtn: "+ Yangi toifa",
      propertyTitle: "Obyekt nomi",
      propertyPrice: "Narxi ($)",
      propertyArea: "Maydoni (m²)",
      propertyBeds: "Xonalar soni",
      propertyBaths: "Hammomlar soni",
      propertyLocation: "Joylashuvi",
      propertyCategory: "Toifasi",
      propertyDealType: "Shartnoma turi",
      propertyImage: "Rasm havolasi (URL)",
      actions: "Amallar",
      edit: "Tahrirlash",
      delete: "O'chirish",
      save: "Saqlash",
      cancel: "Bekor qilish",
      financeTitle: "Moliyaviy hisobot va xarajatlar",
      totalRevenue: "Jami savdo aylanmasi",
      totalExpenses: "Jami xarajatlar",
      netProfit: "Sof foyda",
      conversionRate: "Muvaffaqiyat ko'rsatkichi",
      addExpenseBtn: "+ Xarajat kiritish",
      expenseCategory: "Xarajat toifasi",
      expenseAmount: "Summa ($)",
      expenseDate: "Sana",
      expenseTitle: "Xarajat nomi",
      filterDaily: "Kunlik",
      filterWeekly: "Haftalik",
      filterMonthly: "Oylik",
      filterYearly: "Yillik",
      auditLogTitle: "Tizim harakatlari tarixi",
      time: "Vaqt",
      user: "Xodim",
      action: "Amal",
      details: "Tafsilot",
    },
  },

  ru: {
    nav: {
      about: "О компании",
      communities: "Районы",
      projects: "Флагманские проекты",
      aziziPartner: "Партнерство Azizi",
      catalog: "Каталог объектов",
      contact: "Контакты",
      enquire: "Оставить заявку",
      adminPortal: "Панель управления",
      themeLight: "Светлая тема",
      themeDark: "Темная тема",
    },
    hero: {
      exclusiveOffer: "Сезон закрытых продаж",
      salesEvent: "Премьера и эксклюзивные условия",
      discoverHomes: "Откройте премиальный образ жизни с Yasin Time и Azizi",
      startingFrom: "Начальная стоимость",
      flexiblePayment: "Беспроцентная рассрочка и закрытые скидки",
      visitShowroom: "Посетите наш демонстрационный комплекс и виллу",
      showroomTime: "Ежедневно: с 10:00 до 20:00",
      registerInterest: "Зарегистрировать интерес",
      discover: "Подробная информация",
      roiLabel: "Прогнозируемая доходность",
      handoverLabel: "Срок завершения",
    },
    signature: {
      badge: "4 ключевых направления в стиле Azizi",
      title: "Эксклюзивные проекты Yasin Time",
      subtitle: "Престижные и высокодоходные инвестиционные активы в Дубае",
      offplanTitle: "Проекты на стадии строительства",
      offplanDesc: "Стартовые цены на этапе котлована, гибкие графики оплат и максимальный рост капитализации.",
      flippingTitle: "Высокодоходный флиппинг",
      flippingDesc: "Инвестиции в обновление и перепродажу с чистой доходностью 25-40% за 6-12 месяцев.",
      rentalTitle: "Стабильный арендный портфель",
      rentalDesc: "Апартаменты в центре Дубая с доходом от аренды 9-12% в валюте под полным управлением.",
      villaTitle: "Элитные частные виллы",
      villaDesc: "Роскошные резиденции с собственными бассейнами, выходом к пляжу и первоклассным сервисом.",
      discoverBtn: "Посмотреть проект",
      roiHigh: "Доходность 28%+",
      guaranteedYield: "11% годовых",
      paymentPlanBadge: "Рассрочка 60/40",
    },
    catalog: {
      badge: "Каталог недвижимости",
      title: "Избранные объекты и коллекция Azizi",
      subtitle: "Апартаменты, виллы, таунхаусы и коммерческие площади с полной гарантией",
      allCategories: "Все категории",
      allDeals: "Все",
      forSale: "Купить",
      forRent: "Аренда",
      offPlan: "Off-Plan",
      priceFilter: "Цена: Все",
      roomsFilter: "Спальни",
      anyRooms: "Спальни: Все",
      searchPlaceholder: "Поиск по названию, району или параметрам...",
      sqm: "м²",
      beds: "сп.",
      baths: "ванн",
      discoverDetails: "Подробнее",
      inquireNow: "Подать заявку",
      noPropertiesFound: "По вашему запросу объектов не найдено",
      aziziVerified: "Официальный партнер Azizi",
    },
    aziziSection: {
      badge: "Стратегическое партнерство",
      title: "Azizi Developments и Yasin Time Group",
      description: "Работая в прямом партнерстве с ведущим застройщиком ОАЭ Azizi Developments, мы предлагаем нашим клиентам эксклюзивные условия покупки недвижимости в престижных районах Дубая.",
      statsProjects: "Реализованных проектов",
      statsPortfolio: "Общий объем портфеля",
      statsDelivered: "Сданных резиденций",
      statsNationalities: "Стран-инвесторов",
      features1Title: "Прямые цены от застройщика",
      features1Desc: "Официальный контракт без посредников, закрытые цены и полная гарантия девелопера.",
      features2Title: "0% Комиссии и Золотая виза",
      features2Desc: "Оформление 10-летней визы ОАЭ для всей семьи и полное юридическое сопровождение.",
      features3Title: "Удобные графики выплат",
      features3Desc: "Беспроцентная рассрочка на период строительства и гарантия эскроу-счетов.",
    },
    leadModal: {
      title: "Персональная консультация и регистрация интереса",
      subtitle: "Оставьте контактные данные, персональный консультант свяжется с вами в течение 10 минут",
      fullName: "Ваше имя и фамилия",
      fullNamePlaceholder: "Например: Алишер Усманов",
      phone: "Номер телефона",
      email: "Электронная почта (по желанию)",
      propertyInterested: "Интересующий объект или категория",
      budget: "Планируемый бюджет",
      dealType: "Тип сделки",
      message: "Комментарий к запросу",
      messagePlaceholder: "Например: Ищу апартаменты с 2 спальнями в Дубае для получения дохода...",
      submit: "Отправить заявку",
      submitting: "Отправка...",
      successTitle: "Заявка успешно принята!",
      successDesc: "Благодарим! Данные поступили в систему. Наш старший консультант свяжется с вами в ближайшее время.",
      close: "Закрыть",
      privacyNote: "Ваши данные строго конфиденциальны и не передаются третьим лицам.",
    },
    contactBar: {
      enquireTooltip: "Оставить заявку",
      callTooltip: "Позвонить: +998 50 876 77 22",
      telegramTooltip: "Telegram: @YasinTime_Group",
      instagramTooltip: "Instagram: @yasintime.official",
      adminTooltip: "Панель управления",
    },
    footer: {
      newsletterTitle: "Подписка на закрытые предложения",
      newsletterSubtitle: "Оповещения о старте продаж, скидках и новых проектах в Дубае",
      emailPlaceholder: "Ваш адрес электронной почты",
      subscribe: "Подписаться",
      aboutUs: "О компании",
      ourLegacy: "История развития",
      corporateTeam: "Совет директоров",
      contactUs: "Контакты",
      careers: "Карьера",
      ourPortfolio: "Портфель проектов",
      services: "Услуги",
      vipConsulting: "Управление активами",
      investmentManagement: "Инвестиционный консалтинг",
      handoverProcedure: "Порядок получения ключей",
      phone: "+998 50 876 77 22",
      officeTashkent: "Тошкент шаҳар, Шайхонтоҳур тумани, кв. Жангох, дом 2аб, кв. 185",
      officeDubai: "Дубай: DIFC, Gate Precinct 4 / Azizi Sales Gallery, Meydan",
      rights: "Все права защищены.",
      language: "Выберите язык",
      adminLogin: "Вход для администратора",
    },
    admin: {
      title: "ПАНЕЛЬ УПРАВЛЕНИЯ YASIN TIME",
      tagline: "Управление лидами, каталогом объектов и финансовый учет",
      backToSite: "Вернуться на сайт",
      roleSelector: "Выберите роль",
      roleAdmin: "Руководитель (Полный доступ)",
      roleManager: "Менеджер (Клиенты и сделки)",
      roleAccountant: "Бухгалтер (Финансы и расходы)",
      tabLeads: "Лиды и клиенты",
      tabProperties: "Объекты и каталог",
      tabFinance: "Финансы и расходы",
      tabAudit: "Журнал аудита",
      simulateLeadBtn: "+ Добавить заявку",
      exportExcel: "Экспорт в Excel (Лиды)",
      exportFinance: "Экспорт в Excel (Финансы)",
      totalLeads: "Всего заявок",
      newLeads: "Новые заявки",
      inProgress: "В работе",
      closedDeals: "Закрытые сделки",
      statusNew: "Новая",
      statusContacted: "Связались",
      statusMeeting: "Встреча",
      statusNegotiation: "Переговоры",
      statusWon: "Успешная сделка",
      statusLost: "Отказ",
      assignManager: "Назначить менеджера",
      leadNotes: "Заметка менеджера",
      openTelegram: "Написать в Telegram",
      callClient: "Позвонить клиенту",
      addPropertyBtn: "+ Добавить объект",
      addCategoryBtn: "+ Добавить категорию",
      propertyTitle: "Название объекта",
      propertyPrice: "Стоимость ($)",
      propertyArea: "Площадь (м²)",
      propertyBeds: "Количество спален",
      propertyBaths: "Количество ванных",
      propertyLocation: "Расположение",
      propertyCategory: "Категория",
      propertyDealType: "Тип сделки",
      propertyImage: "Ссылка на фото (URL)",
      actions: "Действия",
      edit: "Редактировать",
      delete: "Удалить",
      save: "Сохранить",
      cancel: "Отмена",
      financeTitle: "Финансовая аналитика и учет расходов",
      totalRevenue: "Общий объем продаж",
      totalExpenses: "Общие расходы",
      netProfit: "Чистая прибыль",
      conversionRate: "Коэффициент конверсии",
      addExpenseBtn: "+ Зафиксировать расход",
      expenseCategory: "Статья расходов",
      expenseAmount: "Сумма ($)",
      expenseDate: "Дата",
      expenseTitle: "Наименование расхода",
      filterDaily: "День",
      filterWeekly: "Неделя",
      filterMonthly: "Месяц",
      filterYearly: "Год",
      auditLogTitle: "История системных действий",
      time: "Время",
      user: "Сотрудник",
      action: "Действие",
      details: "Детали",
    },
  },

  en: {
    nav: {
      about: "About Us",
      communities: "Communities",
      projects: "Signature Projects",
      aziziPartner: "Azizi Partnership",
      catalog: "Property Portfolio",
      contact: "Contact",
      enquire: "Enquire",
      adminPortal: "Control Center",
      themeLight: "Light Mode",
      themeDark: "Dark Mode",
    },
    hero: {
      exclusiveOffer: "Exclusive Sales Event",
      salesEvent: "Premiere and Privileged Terms",
      discoverHomes: "Discover Exceptional Luxury Living with Yasin Time & Azizi",
      startingFrom: "Starting Price",
      flexiblePayment: "0% Interest Payment Plans & Exclusive Incentives",
      visitShowroom: "Visit Our Showcase Suite & Private Villa",
      showroomTime: "Open Daily: 10:00 AM – 8:00 PM",
      registerInterest: "Register Your Interest",
      discover: "Discover Project",
      roiLabel: "Expected Rental Yield",
      handoverLabel: "Handover Date",
    },
    signature: {
      badge: "4 Core Pillars in Azizi Style",
      title: "Yasin Time Signature Projects",
      subtitle: "High-yield, prime international real estate assets across Dubai",
      offplanTitle: "Prime Off-Plan Developments",
      offplanDesc: "Ground-floor entry pricing, capital appreciation throughout construction, and flexible payment plans.",
      flippingTitle: "High-ROI Flipping Strategy",
      flippingDesc: "Turnkey luxury revitalization and resale delivering 25–40% net returns within 6–12 months.",
      rentalTitle: "High-Yield Rental Portfolio",
      rentalDesc: "Fully managed waterfront apartments generating 9–12% net currency rental yield.",
      villaTitle: "Exclusive Private Mansions",
      villaDesc: "Bespoke architectural masterworks featuring private pools, direct beach access, and 24/7 concierge.",
      discoverBtn: "Discover Project",
      roiHigh: "Yield 28%+",
      guaranteedYield: "11% Net Yield",
      paymentPlanBadge: "60/40 Payment Plan",
    },
    catalog: {
      badge: "Property Portfolio",
      title: "Curated Developments & Azizi Collection",
      subtitle: "Apartments, villas, townhouses, and commercial spaces with guaranteed developer warranties",
      allCategories: "All Categories",
      allDeals: "All",
      forSale: "Buy",
      forRent: "Rent",
      offPlan: "Off-Plan",
      priceFilter: "Price: All",
      roomsFilter: "Bedrooms",
      anyRooms: "Rooms: All",
      searchPlaceholder: "Search by title, location, or amenities...",
      sqm: "sq.m",
      beds: "beds",
      baths: "baths",
      discoverDetails: "View Details",
      inquireNow: "Submit Enquiry",
      noPropertiesFound: "No properties matching your criteria",
      aziziVerified: "Azizi Verified Partner",
    },
    aziziSection: {
      badge: "Strategic Partnership",
      title: "Azizi Developments & Yasin Time Group",
      description: "Partnering directly with Azizi Developments, UAE's premier private developer, we provide our clients with privileged access to prime communities across Dubai with zero brokerage commissions.",
      statsProjects: "Completed Developments",
      statsPortfolio: "Total Portfolio Value",
      statsDelivered: "Homes Delivered",
      statsNationalities: "Investor Nationalities",
      features1Title: "Direct Developer Pricing",
      features1Desc: "Official contract without middlemen, private discounts, and full builder warranties.",
      features2Title: "0% Commission & UAE Golden Visa",
      features2Desc: "Seamless qualification for Dubai 10-Year Golden Visa with end-to-end legal support.",
      features3Title: "Tailored Payment Milestones",
      features3Desc: "0% interest developer financing backed by UAE government escrow accounts.",
    },
    leadModal: {
      title: "Private Consultation & Registration",
      subtitle: "Leave your contact details and our senior investment advisor will reach out within 10 minutes",
      fullName: "Full Name",
      fullNamePlaceholder: "e.g. Alisher Usmanov",
      phone: "Phone Number",
      email: "Email Address (optional)",
      propertyInterested: "Property or Category of Interest",
      budget: "Target Budget",
      dealType: "Interest Type",
      message: "Additional Requirements",
      messagePlaceholder: "e.g. Inquiring about a 2-bedroom waterfront apartment in Dubai...",
      submit: "Submit Enquiry",
      submitting: "Submitting...",
      successTitle: "Enquiry Successfully Received!",
      successDesc: "Thank you! Your information has been recorded into our system. Our advisor will contact you shortly.",
      close: "Close",
      privacyNote: "Your information is confidential and will never be shared with third parties.",
    },
    contactBar: {
      enquireTooltip: "Register Interest",
      callTooltip: "Call: +998 50 876 77 22",
      telegramTooltip: "Telegram: @YasinTime_Group",
      instagramTooltip: "Instagram: @yasintime.official",
      adminTooltip: "Control Center",
    },
    footer: {
      newsletterTitle: "Subscribe to Exclusive Invitations",
      newsletterSubtitle: "Private off-market releases, investor discounts, and new Dubai project launches",
      emailPlaceholder: "Enter your email address",
      subscribe: "Subscribe",
      aboutUs: "About the Company",
      ourLegacy: "Our Legacy",
      corporateTeam: "Corporate Leadership",
      contactUs: "Contact",
      careers: "Careers",
      ourPortfolio: "Our Portfolio",
      services: "Services",
      vipConsulting: "Asset Management",
      investmentManagement: "Investment Advisory",
      handoverProcedure: "Handover Procedure",
      phone: "+998 50 876 77 22",
      officeTashkent: "Тошкент шаҳар, Шайхонтоҳур тумани, кв. Жангох, дом 2аб, кв. 185 (Tashkent, Shaykhontokhur, Jangokh, 2ab/185)",
      officeDubai: "Dubai: DIFC, Gate Precinct 4 / Azizi Sales Gallery, Meydan",
      rights: "All rights reserved.",
      language: "Select Language",
      adminLogin: "Portal Administration",
    },
    admin: {
      title: "YASIN TIME CONTROL CENTER",
      tagline: "Leads pipeline, property management, and financial intelligence",
      backToSite: "Return to Website",
      roleSelector: "Select Role",
      roleAdmin: "Executive Director (Full Access)",
      roleManager: "Sales Manager (Clients & Deals)",
      roleAccountant: "Chief Accountant (Finance & Expenses)",
      tabLeads: "Leads & Clients",
      tabProperties: "Properties & CMS",
      tabFinance: "Finance & Expenses",
      tabAudit: "Audit Log",
      simulateLeadBtn: "+ Add New Lead",
      exportExcel: "Export to Excel (Leads)",
      exportFinance: "Export to Excel (Finance)",
      totalLeads: "Total Inquiries",
      newLeads: "New Inquiries",
      inProgress: "In Progress",
      closedDeals: "Won Deals",
      statusNew: "New",
      statusContacted: "Contacted",
      statusMeeting: "Meeting",
      statusNegotiation: "Negotiating",
      statusWon: "Won Deal",
      statusLost: "Lost",
      assignManager: "Assign Manager",
      leadNotes: "Manager Note",
      openTelegram: "Message on Telegram",
      callClient: "Call Client",
      addPropertyBtn: "+ Add New Property",
      addCategoryBtn: "+ Add Category",
      propertyTitle: "Property Title",
      propertyPrice: "Price ($)",
      propertyArea: "Area (m²)",
      propertyBeds: "Bedrooms",
      propertyBaths: "Bathrooms",
      propertyLocation: "Location",
      propertyCategory: "Category",
      propertyDealType: "Deal Type",
      propertyImage: "Photo URL",
      actions: "Actions",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      financeTitle: "Financial Analytics & Expense Tracking",
      totalRevenue: "Gross Sales Volume",
      totalExpenses: "Total Expenses",
      netProfit: "Net Profit",
      conversionRate: "Conversion Rate",
      addExpenseBtn: "+ Record Expense",
      expenseCategory: "Expense Category",
      expenseAmount: "Amount ($)",
      expenseDate: "Date",
      expenseTitle: "Expense Description",
      filterDaily: "Daily",
      filterWeekly: "Weekly",
      filterMonthly: "Monthly",
      filterYearly: "Yearly",
      auditLogTitle: "System Audit Log",
      time: "Timestamp",
      user: "Staff Member",
      action: "Action",
      details: "Details",
    },
  },

  tg: {
    nav: {
      about: "Дар бораи мо",
      communities: "Маҳаллаҳо",
      projects: "Лоиҳаҳои асосӣ",
      aziziPartner: "Ҳамкории Azizi",
      catalog: "Каталоги амвол",
      contact: "Тамос",
      enquire: "Дархост гузоштан",
      adminPortal: "Панели идоракунӣ",
      themeLight: "Реҷаи рӯзона",
      themeDark: "Реҷаи шабона",
    },
    hero: {
      exclusiveOffer: "Мавсими фурӯши пӯшида",
      salesEvent: "Пешниҳоди махсус ва шароити имтиёзнок",
      discoverHomes: "Ҳаёти боҳашаматро бо Yasin Time ва Azizi кашф намоед",
      startingFrom: "Нархи ибтидоӣ",
      flexiblePayment: "Пардохти мусовии бефоиз ва тахфифҳо",
      visitShowroom: "Ба маҷмааи намоишӣ ва виллаи мо ташриф оред",
      showroomTime: "Ҳама рӯза: аз 10:00 то 20:00",
      registerInterest: "Қайди таваҷҷӯҳ",
      discover: "Маълумоти муфассал",
      roiLabel: "Даромаднокии пешбинишуда",
      handoverLabel: "Мӯҳлати супоридан",
    },
    signature: {
      badge: "4 самти асосӣ бо услуби Azizi",
      title: "Лоиҳаҳои баргузидаи Yasin Time",
      subtitle: "Дороиҳои сармоягузории бонуфуз ва сердаромад дар Дубай",
      offplanTitle: "Лоиҳаҳо дар марҳилаи сохтмон",
      offplanDesc: "Нархҳои беҳтарин дар марҳилаи аввалия бо нақшаҳои пардохти мусоид ва афзоиши сармоя.",
      flippingTitle: "Флиппинги сердаромад",
      flippingDesc: "Сармоягузорӣ дар навсозӣ ва бозфурӯш бо даромаднокии софи 25-40% дар 6-12 моҳ.",
      rentalTitle: "Портфели устувори иҷора",
      rentalDesc: "Ҳуҷраҳо дар маркази Дубай бо даромади иҷоравии 9-12% бо асъори устувор таҳти идоракунӣ.",
      villaTitle: "Виллаҳои боҳашамати шахсӣ",
      villaDesc: "Қасрҳои хусусӣ бо ҳавзи шиноварӣ, соҳили шахсӣ ва шароити олии истиқомат.",
      discoverBtn: "Шиносоӣ бо лоиҳа",
      roiHigh: "Даромад 28%+",
      guaranteedYield: "11% солона",
      paymentPlanBadge: "Пардохти 60/40",
    },
    catalog: {
      badge: "Каталоги амвол",
      title: "Объектҳои интихобшуда ва коллексияи Azizi",
      subtitle: "Ҳуҷраҳо, виллаҳо, таунхаусҳо ва майдонҳои тиҷоратӣ бо кафолати расмӣ",
      allCategories: "Ҳамаи гурӯҳҳо",
      allDeals: "Ҳама",
      forSale: "Фурӯш",
      forRent: "Иҷора",
      offPlan: "Off-Plan",
      priceFilter: "Нарх: Ҳама",
      roomsFilter: "Шумораи ҳуҷраҳо",
      anyRooms: "Ҳуҷраҳо: Ҳама",
      searchPlaceholder: "Ҷустуҷӯ аз рӯи ном, макон ва тавсиф...",
      sqm: "м²",
      beds: "ҳуҷра",
      baths: "ҳаммом",
      discoverDetails: "Муфассал",
      inquireNow: "Дархост гузоштан",
      noPropertiesFound: "Мувофиқи дархости шумо объекте ёфт нашуд",
      aziziVerified: "Шарики расмии Azizi",
    },
    aziziSection: {
      badge: "Ҳамкории стратегии расмӣ",
      title: "Azizi Developments ва Yasin Time Group",
      description: "Мо бо беҳтарин созандаи АМА, ширкати Azizi Developments мустақиман ҳамкорӣ намуда, ба мизоҷони худ беҳтарин шароити хариди амволро пешниҳод менамоем.",
      statsProjects: "Лоиҳаҳои анҷомёфта",
      statsPortfolio: "Арзиши умумии портфел",
      statsDelivered: "Хонаҳои супоридашуда",
      statsNationalities: "Кишварҳои сармоягузор",
      features1Title: "Нархи мустақим аз ширкати сохтмонӣ",
      features1Desc: "Шартномаи расмӣ бе миёнаравҳо, тахфифҳо ва кафолати пурра.",
      features2Title: "0% Комиссия ва Визаи тиллоӣ",
      features2Desc: "Дарёфти Golden Visa барои тамоми оила ва дастгирии пурраи ҳуқуқӣ.",
      features3Title: "Нақшаи чандири пардохт",
      features3Desc: "Пардохти мусовии бефоиз дар давраи сохтмон ва эскроу-ҳисобҳо.",
    },
    leadModal: {
      title: "Машварати шахсӣ ва бақайдгирии дархост",
      subtitle: "Маълумоти худро гузоред ва мушовири мо дар зарфи 10 дақиқа бо шумо тамос мегирад",
      fullName: "Ному насаби шумо",
      fullNamePlaceholder: "Масалан: Алишер Усмонов",
      phone: "Рақами телефон",
      email: "Почтаи электронӣ (ихтиёрӣ)",
      propertyInterested: "Объект ё гурӯҳи мавриди таваҷҷӯҳ",
      budget: "Буҷети банақшагирифта",
      dealType: "Навъи дархост",
      message: "Хоҳиш ва талаботҳои иловагӣ",
      messagePlaceholder: "Масалан: Барои хариди ҳуҷра дар соҳили Дубай маълумот лозим аст...",
      submit: "Фиристодани дархост",
      submitting: "Дар ҳоли ирсол...",
      successTitle: "Дархости шумо бо муваффақият қабул шуд!",
      successDesc: "Ташаккур! Маълумоти шумо ба система ворид шуд. Мутахассиси мо ба зудӣ бо шумо тамос мегирад.",
      close: "Пӯшидан",
      privacyNote: "Маълумоти шахсии шумо маҳфуз буда, ба шахсони сеюм дода намешавад.",
    },
    contactBar: {
      enquireTooltip: "Дархост гузоштан",
      callTooltip: "Занг задан: +998 50 876 77 22",
      telegramTooltip: "Telegram: @YasinTime_Group",
      instagramTooltip: "Instagram: @yasintime.official",
      adminTooltip: "Панели идоракунӣ",
    },
    footer: {
      newsletterTitle: "Обуна ба пешниҳодҳои махсус",
      newsletterSubtitle: "Огоҳӣ аз оғози фурӯш, тахфифҳо ва лоиҳаҳои нави Дубай",
      emailPlaceholder: "Суроғаи почтаи электронӣ",
      subscribe: "Обуна шудан",
      aboutUs: "Дар бораи ширкат",
      ourLegacy: "Таърихи мо",
      corporateTeam: "Ҳайати роҳбарикунанда",
      contactUs: "Тамос",
      careers: "Фаъолият ва кор",
      ourPortfolio: "Портфели лоиҳаҳо",
      services: "Хизматрасониҳо",
      vipConsulting: "Идоракунии дороиҳо",
      investmentManagement: "Машварати сармоягузорӣ",
      handoverProcedure: "Раванди супоридани калид",
      phone: "+998 50 876 77 22",
      officeTashkent: "Тошкент шаҳар, Шайхонтоҳур тумани, кв. Жангох, дом 2аб, кв. 185",
      officeDubai: "Дубай: DIFC, Gate Precinct 4 / Azizi Sales Gallery, Meydan",
      rights: "Ҳамаи ҳуқуқҳо ҳифз шудаанд.",
      language: "Забонро интихоб намоед",
      adminLogin: "Вуруд ба панели идоракунӣ",
    },
    admin: {
      title: "ПАНЕЛИ ИДОРАКУНИИ YASIN TIME",
      tagline: "Идоракунии мизоҷон, феҳристи амвол ва таҳлили молиявӣ",
      backToSite: "Бозгашт ба сайт",
      roleSelector: "Интихоби вазифа",
      roleAdmin: "Роҳбар (Дастрасии пурра)",
      roleManager: "Менеҷер (Мизоҷон ва аҳдҳо)",
      roleAccountant: "Ҳисобдор (Молия ва хароҷот)",
      tabLeads: "Мизоҷон ва дархостҳо",
      tabProperties: "Амвол ва феҳрист",
      tabFinance: "Молия ва хароҷот",
      tabAudit: "Таърихи амалҳо",
      simulateLeadBtn: "+ Сабти дархости нав",
      exportExcel: "Боргирӣ ба Excel (Лидҳо)",
      exportFinance: "Боргирӣ ба Excel (Молия)",
      totalLeads: "Ҳамаи дархостҳо",
      newLeads: "Дархостҳои нав",
      inProgress: "Дар раванд",
      closedDeals: "Аҳдҳои муваффақ",
      statusNew: "Нав",
      statusContacted: "Тамос гирифта шуд",
      statusMeeting: "Мулоқот",
      statusNegotiation: "Гуфтушунид",
      statusWon: "Аҳди муваффақ",
      statusLost: "Рад шуд",
      assignManager: "Таъин кардани менеҷер",
      leadNotes: "Қайди менеҷер",
      openTelegram: "Навиштан дар Telegram",
      callClient: "Занг задан ба мизоҷ",
      addPropertyBtn: "+ Иловаи амволи нав",
      addCategoryBtn: "+ Иловаи гурӯҳ",
      propertyTitle: "Номи объект",
      propertyPrice: "Нарх ($)",
      propertyArea: "Масоҳат (м²)",
      propertyBeds: "Шумораи ҳуҷраҳо",
      propertyBaths: "Шумораи ҳаммомҳо",
      propertyLocation: "Макон",
      propertyCategory: "Гурӯҳ",
      propertyDealType: "Навъи шартнома",
      propertyImage: "Суроғаи акс (URL)",
      actions: "Амалҳо",
      edit: "Таҳрир",
      delete: "Нобуд кардан",
      save: "Нигоҳ доштан",
      cancel: "Бекор кардан",
      financeTitle: "Таҳлили молиявӣ ва ҳисоботи хароҷот",
      totalRevenue: "Ҳаҷми умумии фурӯш",
      totalExpenses: "Хароҷоти умумӣ",
      netProfit: "Фоидаи соф",
      conversionRate: "Нишондиҳандаи муваффақият",
      addExpenseBtn: "+ Сабти хароҷот",
      expenseCategory: "Гурӯҳи хароҷот",
      expenseAmount: "Маблағ ($)",
      expenseDate: "Сана",
      expenseTitle: "Номи хароҷот",
      filterDaily: "Рӯзона",
      filterWeekly: "Ҳафтаина",
      filterMonthly: "Моҳона",
      filterYearly: "Солона",
      auditLogTitle: "Таърихи фаъолияти система",
      time: "Вақт",
      user: "Корманд",
      action: "Амал",
      details: "Тафсилот",
    },
  },
};
