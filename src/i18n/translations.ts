import { stayMessages } from './stayTranslations';
import { Language } from '../types';

// English source phrases are stable catalog keys. IDs and form values stay language-neutral.
const messages = {
  ...stayMessages,
  "Anchor Pt": { "fr": "Anchor Point", "ar": "أنكور بوينت" },
  "Anchor Point": { "fr": "Anchor Point", "ar": "أنكور بوينت" },
  "Killers": { "fr": "Killers", "ar": "كيلرز" },
  "Boilers": { "fr": "Boilers", "ar": "بويلرز" },
  "Imsouane": { "fr": "Imsouane", "ar": "إمسوان" },
  "Tamri": { "fr": "Tamri", "ar": "تامري" },
  "Screens:": {
    "fr": "Pages :",
    "ar": "الصفحات:"
  },
  "Home": {
    "fr": "Accueil",
    "ar": "الرئيسية"
  },
  "Stay & Rooms": {
    "fr": "Séjours et chambres",
    "ar": "الإقامة والغرف"
  },
  "Surf Packages": {
    "fr": "Forfaits surf",
    "ar": "باقات ركوب الأمواج"
  },
  "Reserve": {
    "fr": "Réserver",
    "ar": "احجز"
  },
  "Imi Ouaddar • Clean Offshore": {
    "fr": "Imi Ouaddar • Vent de terre, vagues propres",
    "ar": "إيمي وادار • رياح برية وأمواج صافية"
  },
  "Atlantic Swell: 4.5ft @ 14s NW | Water: 19°C | Next High Tide: 16:42": {
    "fr": "Houle atlantique : 4,5 pieds / 14 s NO | Eau : 19 °C | Prochaine marée haute : 16:42",
    "ar": "موج الأطلسي: 4.5 قدم / 14 ثانية شمال غرب | الماء: 19°م | المد القادم: 16:42"
  },
  "2h Response Time for Custom Requests": {
    "fr": "Réponse sous 2 h aux demandes personnalisées",
    "ar": "الرد على الطلبات الخاصة خلال ساعتين"
  },
  "Bespoke Sanctuary Booking": {
    "fr": "Réservation de votre séjour sur mesure",
    "ar": "حجز إقامتك حسب رغبتك"
  },
  "Reserve Your Ocean Stay": {
    "fr": "Réservez votre séjour face à l’océan",
    "ar": "احجز إقامتك على المحيط"
  },
  "Seamless booking for artisanal lodge rooms, private ocean point break coaching, and Berber coastal nourishment.": {
    "fr": "Réservez facilement une chambre artisanale, un coaching de surf privé et une cuisine berbère du littoral.",
    "ar": "احجز بسهولة غرفاً بلمسات حرفية، وتدريباً خاصاً على الأمواج، ووجبات أمازيغية ساحلية."
  },
  "Preview Confirmation State": {
    "fr": "Aperçu de la confirmation",
    "ar": "معاينة التأكيد"
  },
  "Select Travel Dates": {
    "fr": "Choisissez vos dates",
    "ar": "اختر تواريخ السفر"
  },
  "Recommended: 7-night Atlantic swell cycle (Saturday to Saturday)": {
    "fr": "Conseillé : 7 nuits au rythme de la houle (du samedi au samedi)",
    "ar": "موصى به: 7 ليالٍ مع دورة أمواج الأطلسي (من السبت إلى السبت)"
  },
  "Peak Winter Swell": {
    "fr": "Pleine saison de houle hivernale",
    "ar": "ذروة أمواج الشتاء"
  },
  "Check-In": {
    "fr": "Arrivée",
    "ar": "تسجيل الوصول"
  },
  "Saturday • Sunset Arrival": {
    "fr": "Samedi • Arrivée au coucher du soleil",
    "ar": "السبت • وصول عند الغروب"
  },
  "Check-Out": {
    "fr": "Départ",
    "ar": "تسجيل المغادرة"
  },
  "Saturday • Late Ocean Dip": {
    "fr": "Samedi • Dernière baignade",
    "ar": "السبت • سباحة أخيرة في المحيط"
  },
  "Duration": {
    "fr": "Durée",
    "ar": "المدة"
  },
  "Nights": {
    "fr": "Nuits",
    "ar": "ليالٍ"
  },
  "Optimal Ocean Alignment": {
    "fr": "Au meilleur rythme de l’océan",
    "ar": "أفضل توقيت للاستمتاع بالمحيط"
  },
  "November 2025 — Swell Season": {
    "fr": "Novembre 2025 — Saison de la houle",
    "ar": "نوفمبر 2025 — موسم الأمواج"
  },
  "High offshore probability": {
    "fr": "Forte probabilité de vent de terre",
    "ar": "احتمال مرتفع لرياح برية"
  },
  "Sa (08)": {
    "fr": "Sa (08)",
    "ar": "السبت (08)"
  },
  "Su (09)": {
    "fr": "Di (09)",
    "ar": "الأحد (09)"
  },
  "Mo (10)": {
    "fr": "Lu (10)",
    "ar": "الاثنين (10)"
  },
  "Tu (11)": {
    "fr": "Ma (11)",
    "ar": "الثلاثاء (11)"
  },
  "We (12)": {
    "fr": "Me (12)",
    "ar": "الأربعاء (12)"
  },
  "Th (13)": {
    "fr": "Je (13)",
    "ar": "الخميس (13)"
  },
  "Fr (14)": {
    "fr": "Ve (14)",
    "ar": "الجمعة (14)"
  },
  "Arrival": {
    "fr": "Arrivée",
    "ar": "الوصول"
  },
  "Sunset": {
    "fr": "Coucher du soleil",
    "ar": "الغروب"
  },
  "Guests & Accommodations": {
    "fr": "Voyageurs et hébergements",
    "ar": "الضيوف والإقامة"
  },
  "Lodge accommodates adults and young ocean explorers": {
    "fr": "Le lodge accueille adultes et jeunes explorateurs de l’océan",
    "ar": "يستقبل النزل الكبار ومستكشفي المحيط الصغار"
  },
  "Adults": {
    "fr": "Adultes",
    "ar": "بالغون"
  },
  "Age 13+": {
    "fr": "13 ans et plus",
    "ar": "13 سنة فما فوق"
  },
  "Children": {
    "fr": "Enfants",
    "ar": "أطفال"
  },
  "Ages 4-12": {
    "fr": "De 4 à 12 ans",
    "ar": "من 4 إلى 12 سنة"
  },
  "Suites / Rooms": {
    "fr": "Suites / Chambres",
    "ar": "أجنحة / غرف"
  },
  "Max 4 suites": {
    "fr": "4 suites maximum",
    "ar": "4 أجنحة كحد أقصى"
  },
  "Select Sanctuary Room": {
    "fr": "Choisissez votre chambre",
    "ar": "اختر غرفتك"
  },
  "Handcrafted Moroccan finishes with organic linens and unhindered ocean horizons": {
    "fr": "Finitions artisanales marocaines, linge biologique et vue dégagée sur l’océan",
    "ar": "تشطيبات مغربية يدوية وبياضات عضوية وإطلالات مفتوحة على المحيط"
  },
  "All Include Berber Breakfast": {
    "fr": "Petit-déjeuner berbère inclus",
    "ar": "الإفطار الأمازيغي مشمول للجميع"
  },
  "Ocean Front": {
    "fr": "Face à l’océan",
    "ar": "واجهة المحيط"
  },
  "Sea View Balcony Suite": {
    "fr": "Suite avec balcon et vue sur mer",
    "ar": "جناح بشرفة وإطلالة على البحر"
  },
  "Private shaded terrace facing the Atlantic breakers, handcrafted cedar furniture, king bed, and artisanal tadelakt bathroom with organic argan amenities.": {
    "fr": "Terrasse privée ombragée face aux vagues, mobilier en cèdre artisanal, lit king size et salle de bain en tadelakt avec produits à l’argan biologique.",
    "ar": "شرفة خاصة مظللة تواجه أمواج الأطلسي، وأثاث أرز يدوي، وسرير كبير، وحمام تادلاكت بمنتجات أركان عضوية."
  },
  "/ night": {
    "fr": "/ nuit",
    "ar": "/ ليلة"
  },
  "Pool Access": {
    "fr": "Accès piscine",
    "ar": "دخول المسبح"
  },
  "Pool & Garden Terrace": {
    "fr": "Terrasse piscine et jardin",
    "ar": "شرفة المسبح والحديقة"
  },
  "Direct garden step-out to the heated stone saltwater infinity pool. Ambient morning shadow and calm courtyard seclusion.": {
    "fr": "Accès direct au jardin et à la piscine à débordement chauffée à l’eau salée. Ombre matinale et tranquillité de la cour.",
    "ar": "وصول مباشر عبر الحديقة إلى المسبح الحجري اللامتناهي المدفأ بالمياه المالحة، مع ظل الصباح وهدوء الفناء."
  },
  "Available": {
    "fr": "Disponible",
    "ar": "متاح"
  },
  "Signature Penthouse": {
    "fr": "Penthouse signature",
    "ar": "بنتهاوس مميز"
  },
  "Penthouse Ocean Residence": {
    "fr": "Résidence penthouse sur l’océan",
    "ar": "إقامة بنتهاوس على المحيط"
  },
  "Entire upper-level panoramic lodge flat with dual wrap-around sunset decks, private outdoor shower, fireplace, and lounge for wave observation.": {
    "fr": "Appartement panoramique au dernier étage avec deux terrasses, douche extérieure privée, cheminée et salon d’observation des vagues.",
    "ar": "شقة بانورامية كاملة في الطابق العلوي بشرفتين للغروب، ودش خارجي خاص، ومدفأة، وصالة لمشاهدة الأمواج."
  },
  "1 Residence remaining": {
    "fr": "1 résidence restante",
    "ar": "إقامة واحدة متبقية"
  },
  "Surf & Coaching Program": {
    "fr": "Programme de surf et coaching",
    "ar": "برنامج ركوب الأمواج والتدريب"
  },
  "Would you like to add ocean sessions to your stay?": {
    "fr": "Souhaitez-vous ajouter des sessions de surf à votre séjour ?",
    "ar": "هل ترغب في إضافة جلسات ركوب الأمواج إلى إقامتك؟"
  },
  "ISA Certified Coaches": {
    "fr": "Moniteurs certifiés ISA",
    "ar": "مدربون معتمدون من ISA"
  },
  "Custom Guest Surf Assignments": {
    "fr": "Programme de surf personnalisé par voyageur",
    "ar": "برنامج أمواج مخصص لكل ضيف"
  },
  "Guest 1 (Lead Traveler)": {
    "fr": "Voyageur 1 (responsable du séjour)",
    "ar": "الضيف 1 (المسافر الرئيسي)"
  },
  "Point Guiding": {
    "fr": "Guidage sur les point breaks",
    "ar": "إرشاد عند نقاط تكسّر الأمواج"
  },
  "Level 3: Intermediate/Advanced Point Break Guiding (+€320)": {
    "fr": "Niveau 3 : guidage intermédiaire/avancé sur point breaks (+320 €)",
    "ar": "المستوى 3: إرشاد متوسط/متقدم عند نقاط تكسّر الأمواج (+320€)"
  },
  "Level 1: Daily Sandbank Surf Lessons (+€280)": {
    "fr": "Niveau 1 : cours quotidiens sur bancs de sable (+280 €)",
    "ar": "المستوى 1: دروس يومية على الشواطئ الرملية (+280€)"
  },
  "Quiver Rental Only (Torq / Firewire) (+€120)": {
    "fr": "Location de planches seule (Torq / Firewire) (+120 €)",
    "ar": "تأجير ألواح فقط (Torq / Firewire) (+120€)"
  },
  "No Coaching": {
    "fr": "Sans coaching",
    "ar": "دون تدريب"
  },
  "4x4 Beach Transfer & Video Analysis Included": {
    "fr": "Transfert plage en 4x4 et analyse vidéo inclus",
    "ar": "نقل إلى الشاطئ بسيارة دفع رباعي وتحليل فيديو مشمولان"
  },
  "Guest 2": {
    "fr": "Voyageur 2",
    "ar": "الضيف 2"
  },
  "Lessons": {
    "fr": "Cours",
    "ar": "دروس"
  },
  "Level 2: Reef & Point Transition (+€320)": {
    "fr": "Niveau 2 : transition vers récifs et point breaks (+320 €)",
    "ar": "المستوى 2: الانتقال إلى الشعاب ونقاط تكسّر الأمواج (+320€)"
  },
  "Quiver Rental Only (+€120)": {
    "fr": "Location de planches seule (+120 €)",
    "ar": "تأجير ألواح فقط (+120€)"
  },
  "No Surf Coaching": {
    "fr": "Sans cours de surf",
    "ar": "دون تدريب على الأمواج"
  },
  "1:4 Coach Ratio + Soft-top & 3/2mm Wetsuit": {
    "fr": "1 moniteur pour 4 + planche en mousse et combinaison 3/2 mm",
    "ar": "مدرب لكل 4 + لوح إسفنجي وبدلة 3/2 مم"
  },
  "Retreat Extras & Coastal Flow": {
    "fr": "Extras et expériences sur la côte",
    "ar": "إضافات الإقامة وتجارب ساحلية"
  },
  "Elevate your stay with handpicked Berber wellness and seamless arrivals": {
    "fr": "Enrichissez votre séjour avec le bien-être berbère et une arrivée sereine",
    "ar": "ارتقِ بإقامتك مع تجارب عافية أمازيغية مختارة ووصول مريح"
  },
  "Flexible Additions": {
    "fr": "Options flexibles",
    "ar": "إضافات مرنة"
  },
  "Agadir Airport Transfer": {
    "fr": "Transfert aéroport d’Agadir",
    "ar": "نقل مطار أكادير"
  },
  "Round-trip private air-conditioned van from Agadir Al-Massira (AGA) right to our lodge gates.": {
    "fr": "Aller-retour privé en van climatisé entre l’aéroport Agadir Al-Massira (AGA) et le lodge.",
    "ar": "نقل خاص ذهاباً وإياباً بسيارة مكيفة من مطار أكادير المسيرة (AGA) إلى باب النزل."
  },
  "Private Driver • Surfboard Roof Rack": {
    "fr": "Chauffeur privé • Porte-planches sur le toit",
    "ar": "سائق خاص • حامل ألواح على السقف"
  },
  "Daily Sunset Shala Yoga": {
    "fr": "Yoga quotidien au coucher du soleil",
    "ar": "يوغا يومية عند الغروب"
  },
  "7 evenings of restorative ocean-terrace Vinyasa & Yin sessions tailored for paddle recovery.": {
    "fr": "7 soirées de Vinyasa et Yin réparateurs sur la terrasse océanique, adaptés à la récupération après la rame.",
    "ar": "7 أمسيات من فينياسا ويوغا يِن على شرفة المحيط، مخصصة للتعافي بعد التجديف."
  },
  "Mats, Bolsters & Herbal Mint Tea": {
    "fr": "Tapis, coussins et tisane à la menthe",
    "ar": "حصائر ووسائد وشاي بالنعناع"
  },
  "Organic Half-Board Dining": {
    "fr": "Demi-pension biologique",
    "ar": "نصف إقامة بوجبات عضوية"
  },
  "Nightly family-style 3-course Moroccan tagines, ocean-fresh line fish, couscous, and fresh pastries.": {
    "fr": "Chaque soir, repas convivial en 3 services : tajines marocains, poisson frais, couscous et pâtisseries.",
    "ar": "عشاء عائلي من ثلاثة أطباق: طواجن مغربية، وأسماك طازجة، وكسكس، وحلويات طازجة."
  },
  "Local Souss Valley Produce": {
    "fr": "Produits locaux de la vallée du Souss",
    "ar": "منتجات محلية من وادي سوس"
  },
  "Premium Fiber Quiver Pass": {
    "fr": "Pass planches en fibre haut de gamme",
    "ar": "اشتراك ألواح فايبر مميزة"
  },
  "Unlimited board swapping from our test center: custom PU twin fins, fishes, and performance shortboards.": {
    "fr": "Échanges illimités de planches : twin-fins en PU, fish et shortboards de performance.",
    "ar": "تبديل غير محدود للألواح: ألواح PU مزدوجة الزعانف، وألواح فيش، وألواح قصيرة للأداء العالي."
  },
  "Swap Anytime Based on Tide": {
    "fr": "Changez de planche au gré des marées",
    "ar": "بدّل لوحك حسب المد في أي وقت"
  },
  "Guest Details & Arrival": {
    "fr": "Coordonnées et arrivée",
    "ar": "بيانات الضيف والوصول"
  },
  "We tailor your room temperature and arrival tagine before landing": {
    "fr": "Nous préparons votre chambre et votre tajine avant votre atterrissage",
    "ar": "نجهز حرارة غرفتك وطاجن الاستقبال قبل هبوطك"
  },
  "First Name *": {
    "fr": "Prénom *",
    "ar": "الاسم الأول *"
  },
  "Last Name *": {
    "fr": "Nom *",
    "ar": "اسم العائلة *"
  },
  "Email Address *": {
    "fr": "Adresse e-mail *",
    "ar": "البريد الإلكتروني *"
  },
  "WhatsApp / Phone Number *": {
    "fr": "WhatsApp / Téléphone *",
    "ar": "واتساب / رقم الهاتف *"
  },
  "Country of Residence *": {
    "fr": "Pays de résidence *",
    "ar": "بلد الإقامة *"
  },
  "Sweden": {
    "fr": "Suède",
    "ar": "السويد"
  },
  "France": {
    "fr": "France",
    "ar": "فرنسا"
  },
  "Germany": {
    "fr": "Allemagne",
    "ar": "ألمانيا"
  },
  "United Kingdom": {
    "fr": "Royaume-Uni",
    "ar": "المملكة المتحدة"
  },
  "Morocco": {
    "fr": "Maroc",
    "ar": "المغرب"
  },
  "United States": {
    "fr": "États-Unis",
    "ar": "الولايات المتحدة"
  },
  "Spain": {
    "fr": "Espagne",
    "ar": "إسبانيا"
  },
  "Flight Arrival Info / ETA (Optional)": {
    "fr": "Vol / Heure d’arrivée prévue (facultatif)",
    "ar": "معلومات الرحلة / وقت الوصول المتوقع (اختياري)"
  },
  "Dietary Preferences or Surf Board Dimensions": {
    "fr": "Préférences alimentaires ou dimensions de planche",
    "ar": "التفضيلات الغذائية أو مقاسات لوح الأمواج"
  },
  "I agree to the Blue Wave Lodge": {
    "fr": "J’accepte les conditions de Blue Wave Lodge :",
    "ar": "أوافق على شروط Blue Wave Lodge:"
  },
  "Sanctuary Terms & Booking Policy": {
    "fr": "Conditions de séjour et politique de réservation",
    "ar": "شروط الإقامة وسياسة الحجز"
  },
  ". I understand no payment is charged now; availability is personally reviewed by the host within 2 hours.": {
    "fr": ". Aucun paiement n’est prélevé maintenant ; l’hôte vérifie personnellement la disponibilité sous 2 heures.",
    "ar": ". أدرك أنه لن يُحصّل أي مبلغ الآن؛ وسيتحقق المضيف شخصياً من التوافر خلال ساعتين."
  },
  "Sending…": {
    "fr": "Envoi en cours…",
    "ar": "جارٍ الإرسال…"
  },
  "Send Reservation Request": {
    "fr": "Envoyer la demande de réservation",
    "ar": "إرسال طلب الحجز"
  },
  "Fast-Track via WhatsApp": {
    "fr": "Contact rapide via WhatsApp",
    "ar": "تواصل سريع عبر واتساب"
  },
  "Summary": {
    "fr": "Récapitulatif",
    "ar": "الملخص"
  },
  "Your Stay Overview": {
    "fr": "Votre séjour en bref",
    "ar": "نظرة عامة على إقامتك"
  },
  "Dates:": {
    "fr": "Dates :",
    "ar": "التواريخ:"
  },
  "Nights:": {
    "fr": "Nuits :",
    "ar": "الليالي:"
  },
  "Party Size:": {
    "fr": "Voyageurs :",
    "ar": "عدد الضيوف:"
  },
  "Suite": {
    "fr": "Suite",
    "ar": "جناح"
  },
  "Room:": {
    "fr": "Chambre :",
    "ar": "الغرفة:"
  },
  "total": {
    "fr": "au total",
    "ar": "الإجمالي"
  },
  "Surf Package:": {
    "fr": "Forfait surf :",
    "ar": "باقة الأمواج:"
  },
  "total (": {
    "fr": "au total (",
    "ar": "الإجمالي ("
  },
  "guests)": {
    "fr": "voyageurs)",
    "ar": "ضيوف)"
  },
  "Airport Transfer:": {
    "fr": "Transfert aéroport :",
    "ar": "نقل المطار:"
  },
  "Sunset Shala Yoga:": {
    "fr": "Yoga au coucher du soleil :",
    "ar": "يوغا الغروب:"
  },
  "Half-Board Feast:": {
    "fr": "Demi-pension :",
    "ar": "نصف إقامة:"
  },
  "Fiber Quiver Pass:": {
    "fr": "Pass planches en fibre :",
    "ar": "اشتراك ألواح فايبر:"
  },
  "Total Stay": {
    "fr": "Total du séjour",
    "ar": "إجمالي الإقامة"
  },
  "Includes tourist tax & VAT": {
    "fr": "Taxe de séjour et TVA incluses",
    "ar": "يشمل الضريبة السياحية وضريبة القيمة المضافة"
  },
  "Deposit due on review: €": {
    "fr": "Acompte après validation : €",
    "ar": "العربون المستحق بعد المراجعة: €"
  },
  "Host Review within 2 hours": {
    "fr": "Validation par l’hôte sous 2 heures",
    "ar": "مراجعة المضيف خلال ساعتين"
  },
  "Free cancellation up to 14 days prior": {
    "fr": "Annulation gratuite jusqu’à 14 jours avant",
    "ar": "إلغاء مجاني حتى 14 يوماً قبل الوصول"
  },
  "Complimentary surf check briefing daily": {
    "fr": "Briefing surf quotidien offert",
    "ar": "إحاطة يومية مجانية عن الأمواج"
  },
  "Proceed to Confirmation": {
    "fr": "Passer à la confirmation",
    "ar": "المتابعة إلى التأكيد"
  },
  "Need a custom date?": {
    "fr": "Besoin de dates sur mesure ?",
    "ar": "تحتاج إلى موعد خاص؟"
  },
  "Our Imi Ouaddar lodge concierge can accommodate split stays or private surf camp buyouts.": {
    "fr": "Notre conciergerie peut organiser des séjours fractionnés ou la privatisation du surf camp.",
    "ar": "يمكن لفريق الاستقبال تنظيم إقامات مقسمة أو حجز مخيم الأمواج بالكامل."
  },
  "Reservation Request Received": {
    "fr": "Demande de réservation reçue",
    "ar": "تم استلام طلب الحجز"
  },
  "Marhaban! Your Atlantic Haven Awaits": {
    "fr": "Marhaban ! Votre havre atlantique vous attend",
    "ar": "مرحباً! ملاذك على الأطلسي ينتظرك"
  },
  "Thank you,": {
    "fr": "Merci,",
    "ar": "شكراً لك،"
  },
  ". We have logged your reservation request for": {
    "fr": ". Nous avons enregistré votre demande pour",
    "ar": ". لقد سجلنا طلب حجزك لـ"
  },
  "for": {
    "fr": "pour",
    "ar": "لمدة"
  },
  "nights)": {
    "fr": "nuits)",
    "ar": "ليالٍ)"
  },
  "Status:": {
    "fr": "Statut :",
    "ar": "الحالة:"
  },
  "Under Concierge Review": {
    "fr": "En cours d’examen par la conciergerie",
    "ar": "قيد مراجعة فريق الاستقبال"
  },
  "Response Window:": {
    "fr": "Délai de réponse :",
    "ar": "مدة الرد:"
  },
  "Within 2 hours": {
    "fr": "Sous 2 heures",
    "ar": "خلال ساعتين"
  },
  "Total Estimated:": {
    "fr": "Total estimé :",
    "ar": "الإجمالي التقديري:"
  },
  "Selected Add-ons:": {
    "fr": "Options choisies :",
    "ar": "الإضافات المختارة:"
  },
  "Open WhatsApp for Instant VIP Verification": {
    "fr": "Ouvrir WhatsApp pour une vérification VIP immédiate",
    "ar": "افتح واتساب للتحقق الفوري المميز"
  },
  "Return to Booking Overview": {
    "fr": "Retour au récapitulatif",
    "ar": "العودة إلى ملخص الحجز"
  },
  "Clean Offshore": {
    "fr": "Vent de terre, vagues propres",
    "ar": "رياح برية وأمواج صافية"
  },
  "Atlantic Swell:": {
    "fr": "Houle atlantique :",
    "ar": "أمواج الأطلسي:"
  },
  "1.8m @ 13s NW": {
    "fr": "1,8 m / 13 s NO",
    "ar": "1.8 م / 13 ثانية شمال غرب"
  },
  "Water:": {
    "fr": "Eau :",
    "ar": "الماء:"
  },
  "Tide:": {
    "fr": "Marée :",
    "ar": "المد:"
  },
  "High 16:42 (+2.1m)": {
    "fr": "Haute 16:42 (+2,1 m)",
    "ar": "مد عالٍ 16:42 (+2.1 م)"
  },
  "Imi Ouaddar • Point Breaks & Sanctuary": {
    "fr": "Imi Ouaddar • Point breaks et sérénité",
    "ar": "إيمي وادار • أمواج وملاذ هادئ"
  },
  "Daily Surf Report": {
    "fr": "Bulletin surf quotidien",
    "ar": "تقرير الأمواج اليومي"
  },
  "Atlantic Coastline • Morocco": {
    "fr": "Côte atlantique • Maroc",
    "ar": "ساحل الأطلسي • المغرب"
  },
  "Stay by the Ocean.": {
    "fr": "Séjournez face à l’océan.",
    "ar": "أقم بجوار المحيط."
  },
  "Surf Morocco.": {
    "fr": "Surfez au Maroc.",
    "ar": "اركب أمواج المغرب."
  },
  "A relaxing ocean escape in Imi Ouaddar combining comfortable accommodation, authentic Moroccan hospitality, and unforgettable surf experiences.": {
    "fr": "Une escapade apaisante à Imi Ouaddar, alliant hébergement confortable, hospitalité marocaine authentique et surf inoubliable.",
    "ar": "ملاذ مريح على المحيط في إيمي وادار يجمع إقامة مريحة وضيافة مغربية أصيلة وتجارب أمواج لا تُنسى."
  },
  "Book Your Stay": {
    "fr": "Réservez votre séjour",
    "ar": "احجز إقامتك"
  },
  "Explore Surf Packages": {
    "fr": "Découvrez nos forfaits surf",
    "ar": "استكشف باقات الأمواج"
  },
  "2 Adults, 0 Child": {
    "fr": "2 adultes, aucun enfant",
    "ar": "بالغان، دون أطفال"
  },
  "1 Adult (Solo)": {
    "fr": "1 adulte (solo)",
    "ar": "بالغ واحد (فردي)"
  },
  "2 Adults, 1 Child": {
    "fr": "2 adultes, 1 enfant",
    "ar": "بالغان وطفل واحد"
  },
  "3+ Group Retreat": {
    "fr": "Séjour en groupe de 3+",
    "ar": "إقامة جماعية لـ3 أشخاص فأكثر"
  },
  "Surf Coaching (All Levels)": {
    "fr": "Coaching surf (tous niveaux)",
    "ar": "تدريب أمواج (جميع المستويات)"
  },
  "Surf & Stay Standard": {
    "fr": "Surf et séjour standard",
    "ar": "أمواج وإقامة قياسية"
  },
  "Surf + Yoga Retreat": {
    "fr": "Retraite surf et yoga",
    "ar": "إقامة أمواج ويوغا"
  },
  "Advanced Spot Guiding": {
    "fr": "Guidage avancé sur les spots",
    "ar": "إرشاد متقدم لمواقع الأمواج"
  },
  "None (Room Only)": {
    "fr": "Aucun (chambre seule)",
    "ar": "بدون (غرفة فقط)"
  },
  "Check Rates": {
    "fr": "Voir les tarifs",
    "ar": "عرض الأسعار"
  },
  "Sanctuary in Taghazout Bay": {
    "fr": "Un havre dans la baie de Taghazout",
    "ar": "ملاذ في خليج تغازوت"
  },
  "Where Berber soul meets the Atlantic crest.": {
    "fr": "L’âme berbère à la rencontre des vagues atlantiques.",
    "ar": "حيث تلتقي الروح الأمازيغية بأمواج الأطلسي."
  },
  "Tucked away in the tranquil fishing enclave of Imi Ouaddar—just north of Taghazout and minutes from Tamri's secret dunes—Blue Wave Lodge is an unhurried beachfront haven designed for surfers, creators, and coastal seekers.": {
    "fr": "Niché dans le paisible village de pêcheurs d’Imi Ouaddar, au nord de Taghazout et près des dunes de Tamri, Blue Wave Lodge est un havre en bord de mer pour surfeurs, créateurs et amoureux de la côte.",
    "ar": "في قرية الصيد الهادئة إيمي وادار، شمال تغازوت وعلى بُعد دقائق من كثبان تامري، يُعد Blue Wave Lodge ملاذاً شاطئياً لراكبي الأمواج والمبدعين ومحبي الساحل."
  },
  "Wake to morning offshore breezes, recharge by our freshwater cliffside pool, share mint tea and freshly caught Atlantic sea bream, and catch sunset glow over the point from our panoramic rooftop shala.": {
    "fr": "Réveillez-vous avec la brise, ressourcez-vous à la piscine d’eau douce, partagez un thé à la menthe et une dorade fraîche, puis admirez le coucher du soleil depuis notre toit panoramique.",
    "ar": "استيقظ على نسيم الصباح، واسترح بجوار مسبح المياه العذبة، وشارك شاي النعناع والأسماك الطازجة، وتأمل الغروب من سطحنا البانورامي."
  },
  "Days of sunshine annually": {
    "fr": "Jours de soleil par an",
    "ar": "يوم مشمس سنوياً"
  },
  "World-class reef & beach breaks": {
    "fr": "Spots de récif et de plage de renommée mondiale",
    "ar": "مواقع أمواج شاطئية وشعابية عالمية"
  },
  "Ocean-facing lodge living": {
    "fr": "Séjour au lodge face à l’océan",
    "ar": "إقامة في النزل تطل على المحيط"
  },
  "Location Marker": {
    "fr": "Repère géographique",
    "ar": "علامة الموقع"
  },
  "Imi Ouaddar, Taghazout Bay": {
    "fr": "Imi Ouaddar, baie de Taghazout",
    "ar": "إيمي وادار، خليج تغازوت"
  },
  "25 min from Agadir": {
    "fr": "À 25 min d’Agadir",
    "ar": "25 دقيقة من أكادير"
  },
  "The Sanctuary Experience": {
    "fr": "L’expérience de notre havre",
    "ar": "تجربة الملاذ"
  },
  "Why Blue Wave Lodge": {
    "fr": "Pourquoi Blue Wave Lodge",
    "ar": "لماذا Blue Wave Lodge"
  },
  "Carefully balanced between surf performance house and serene Moroccan boutique haven.": {
    "fr": "L’équilibre entre performance surf et quiétude d’un lodge marocain de charme.",
    "ar": "توازن مدروس بين أداء ركوب الأمواج وهدوء نزل مغربي مميز."
  },
  "Oceanfront Location": {
    "fr": "Emplacement face à l’océan",
    "ar": "موقع على واجهة المحيط"
  },
  "Step directly from your room to Imi Ouaddar’s golden sands with unbroken views across the Atlantic swell window.": {
    "fr": "Passez de votre chambre au sable doré d’Imi Ouaddar, avec une vue dégagée sur les vagues atlantiques.",
    "ar": "انتقل مباشرة من غرفتك إلى رمال إيمي وادار الذهبية مع إطلالات مفتوحة على أمواج الأطلسي."
  },
  "Comfortable Rooms": {
    "fr": "Chambres confortables",
    "ar": "غرف مريحة"
  },
  "Handcrafted Moroccan craftsmanship, organic linen bedding, quiet private terraces, and modern acoustic tranquility.": {
    "fr": "Artisanat marocain, linge biologique, terrasses privées paisibles et isolation acoustique moderne.",
    "ar": "حرف مغربية يدوية، وبياضات عضوية، وشرفات خاصة هادئة، وعزل صوتي حديث."
  },
  "Infinity Swimming Pool": {
    "fr": "Piscine à débordement",
    "ar": "مسبح لا متناهٍ"
  },
  "Perched right above the surfline, our turquoise infinity pool offers calm post-session dips with horizon sunsets.": {
    "fr": "Notre piscine turquoise surplombe les vagues pour des baignades paisibles après le surf, face au soleil couchant.",
    "ar": "يطل مسبحنا الفيروزي على الأمواج ويوفر سباحة هادئة بعد الجلسات مع مشاهد الغروب."
  },
  "Sunset Rooftop Lounge": {
    "fr": "Salon sur le toit au soleil couchant",
    "ar": "صالة سطح عند الغروب"
  },
  "Unwind under woven pergolas with 360-degree ocean views, sunrise yoga classes, acoustic music, and golden hour mint tea.": {
    "fr": "Détendez-vous sous les pergolas : vue à 360°, yoga au lever du soleil, musique acoustique et thé à la menthe à l’heure dorée.",
    "ar": "استرخِ تحت المظلات المنسوجة مع إطلالة 360 درجة، ويوغا الشروق، وموسيقى هادئة، وشاي نعناع عند الغروب."
  },
  "Fresh Moroccan Cuisine": {
    "fr": "Cuisine marocaine fraîche",
    "ar": "مأكولات مغربية طازجة"
  },
  "Nutritious farm-to-table coastal dishes, freshly caught fish from local boats, spiced tagines, and hearty surfer breakfasts.": {
    "fr": "Plats côtiers locaux et nutritifs, poisson frais, tajines épicés et petits-déjeuners copieux pour surfeurs.",
    "ar": "أطباق ساحلية مغذية من المزرعة، وأسماك طازجة، وطواجن متبلة، وإفطار غني لراكبي الأمواج."
  },
  "Certified Surf Guiding": {
    "fr": "Guidage surf certifié",
    "ar": "إرشاد أمواج معتمد"
  },
  "Local Moroccan surf masters with ISA credentials guiding you to the best daily conditions from Anchor Point to Tamri.": {
    "fr": "Des experts marocains certifiés ISA vous guident vers les meilleures conditions du jour, d’Anchor Point à Tamri.",
    "ar": "خبراء أمواج مغاربة معتمدون من ISA يرشدونك إلى أفضل الظروف اليومية من أنكور بوينت إلى تامري."
  },
  "Coastal Sanctuaries": {
    "fr": "Havres côtiers",
    "ar": "ملاذات ساحلية"
  },
  "Boutique Accommodations": {
    "fr": "Hébergements de charme",
    "ar": "إقامات مميزة"
  },
  "Explore All Accommodations": {
    "fr": "Voir tous les hébergements",
    "ar": "استكشف جميع أماكن الإقامة"
  },
  "From": {
    "fr": "À partir de",
    "ar": "ابتداءً من"
  },
  "Select Room": {
    "fr": "Choisir la chambre",
    "ar": "اختر الغرفة"
  },
  "Wave Mastery": {
    "fr": "Maîtrise des vagues",
    "ar": "إتقان الأمواج"
  },
  "Surf Academy & Guiding": {
    "fr": "École de surf et guidage",
    "ar": "أكاديمية الأمواج والإرشاد"
  },
  "From first white-water pop-ups to peeling right-hand points, our seasoned guides match Atlantic swells to your skill level.": {
    "fr": "Des premiers redressements dans la mousse aux droites parfaites, nos guides adaptent les vagues à votre niveau.",
    "ar": "من أول وقوف في المياه البيضاء إلى الأمواج اليمنى، يختار مرشدونا أمواج الأطلسي المناسبة لمستواك."
  },
  "Find Your Surfing Level": {
    "fr": "Trouvez votre niveau de surf",
    "ar": "اكتشف مستواك في ركوب الأمواج"
  },
  "Select your current stage to see our recommended Moroccan spots and training strategy.": {
    "fr": "Choisissez votre niveau pour découvrir nos spots marocains et notre programme conseillés.",
    "ar": "اختر مستواك الحالي للاطلاع على المواقع المغربية وخطة التدريب الموصى بها."
  },
  "Interactive Skill Matcher": {
    "fr": "Évaluation interactive du niveau",
    "ar": "مطابقة تفاعلية للمهارات"
  },
  "Level Profile • Bracket": {
    "fr": "Profil • Niveau",
    "ar": "الملف • المستوى"
  },
  "Spots:": {
    "fr": "Spots :",
    "ar": "المواقع:"
  },
  "Quiver:": {
    "fr": "Planches :",
    "ar": "الألواح:"
  },
  "Recommended Package": {
    "fr": "Forfait conseillé",
    "ar": "الباقة الموصى بها"
  },
  "View Package Details": {
    "fr": "Voir les détails du forfait",
    "ar": "عرض تفاصيل الباقة"
  },
  "Resort Living": {
    "fr": "La vie au lodge",
    "ar": "الحياة في المنتجع"
  },
  "Lodge Amenities & Spaces": {
    "fr": "Équipements et espaces du lodge",
    "ar": "مرافق النزل ومساحاته"
  },
  "Thoughtful coastal facilities designed to restore the body and foster community between sessions.": {
    "fr": "Des espaces côtiers conçus pour récupérer et partager des moments entre les sessions.",
    "ar": "مرافق ساحلية مصممة لتجديد النشاط وتعزيز التواصل بين الجلسات."
  },
  "Visual Diary": {
    "fr": "Journal en images",
    "ar": "مذكرات مصورة"
  },
  "Moments at Blue Wave Lodge": {
    "fr": "Instants à Blue Wave Lodge",
    "ar": "لحظات في Blue Wave Lodge"
  },
  "Guest Reflections": {
    "fr": "Témoignages",
    "ar": "آراء الضيوف"
  },
  "Memories From Our Travelers": {
    "fr": "Souvenirs de nos voyageurs",
    "ar": "ذكريات مسافرينا"
  },
  "(280+ Verified Reviews)": {
    "fr": "(Plus de 280 avis vérifiés)",
    "ar": "(أكثر من 280 تقييماً موثّقاً)"
  },
  "Taghazout Bay Coast": {
    "fr": "Côte de la baie de Taghazout",
    "ar": "ساحل خليج تغازوت"
  },
  "Find Blue Wave Lodge": {
    "fr": "Retrouvez Blue Wave Lodge",
    "ar": "اعثر على Blue Wave Lodge"
  },
  "Situated peacefully on the beachfront of Imi Ouaddar within Commune Tamri, away from the heavy crowds but only 10 minutes from central Taghazout and 45 minutes from Agadir Al Massira Airport (AGA).": {
    "fr": "Sur la plage paisible d’Imi Ouaddar, commune de Tamri, à l’écart des foules, à seulement 10 minutes de Taghazout et 45 minutes de l’aéroport Agadir Al Massira (AGA).",
    "ar": "على شاطئ إيمي وادار الهادئ في جماعة تامري بعيداً عن الازدحام، وعلى بُعد 10 دقائق من وسط تغازوت و45 دقيقة من مطار أكادير المسيرة (AGA)."
  },
  "Physical Address": {
    "fr": "Adresse",
    "ar": "العنوان"
  },
  "Lot 150, Plage Imi Ouaddar, Commune Tamri, 80000 Agadir-Ida Ou Tanane, Morocco": {
    "fr": "Lot 150, plage Imi Ouaddar, commune Tamri, 80000 Agadir-Ida Ou Tanane, Maroc",
    "ar": "القطعة 150، شاطئ إيمي وادار، جماعة تامري، 80000 أكادير إداوتنان، المغرب"
  },
  "Check-in & Check-out": {
    "fr": "Arrivée et départ",
    "ar": "الوصول والمغادرة"
  },
  "Check-in: 15:00 • Check-out: 11:30 • 24/7 Front Gate Concierge": {
    "fr": "Arrivée : 15:00 • Départ : 11:30 • Conciergerie 24 h/24",
    "ar": "الوصول: 15:00 • المغادرة: 11:30 • استقبال على مدار الساعة"
  },
  "Complimentary Transfers": {
    "fr": "Transferts offerts",
    "ar": "نقل مجاني"
  },
  "Included for 7+ night stays from Agadir Airport (AGA) or Agadir CTM Station.": {
    "fr": "Inclus dès 7 nuits, depuis l’aéroport d’Agadir (AGA) ou la gare CTM d’Agadir.",
    "ar": "مشمول للإقامات من 7 ليالٍ من مطار أكادير (AGA) أو محطة CTM أكادير."
  },
  "Open in Google Maps": {
    "fr": "Ouvrir dans Google Maps",
    "ar": "افتح في خرائط Google"
  },
  "Direct WhatsApp Concierge": {
    "fr": "Conciergerie directe sur WhatsApp",
    "ar": "تواصل مباشر مع الاستقبال عبر واتساب"
  },
  "Blue Wave Lodge Location": {
    "fr": "Emplacement de Blue Wave Lodge",
    "ar": "موقع Blue Wave Lodge"
  },
  "30.6032° N, 9.8241° W • Taghazout Bay": {
    "fr": "30,6032° N, 9,8241° O • Baie de Taghazout",
    "ar": "30.6032° شمالاً، 9.8241° غرباً • خليج تغازوت"
  },
  "Begin Your Atlantic Journey": {
    "fr": "Commencez votre aventure atlantique",
    "ar": "ابدأ رحلتك الأطلسية"
  },
  "Ready for Your Moroccan Ocean Escape?": {
    "fr": "Prêt pour votre escapade au bord de l’océan marocain ?",
    "ar": "مستعد لرحلتك إلى المحيط في المغرب؟"
  },
  "Reserve your room or package directly with us for guaranteed lowest rates, flexible rescheduling, and complimentary surfboard lockers.": {
    "fr": "Réservez directement pour bénéficier du meilleur tarif garanti, de dates flexibles et d’un casier à planches offert.",
    "ar": "احجز غرفتك أو باقتك مباشرة معنا لأفضل الأسعار المضمونة، ومرونة تغيير المواعيد، وخزائن ألواح مجانية."
  },
  "Check Live Availability": {
    "fr": "Vérifier les disponibilités",
    "ar": "تحقق من التوافر"
  },
  "Chat With Surf Guide": {
    "fr": "Discuter avec un guide surf",
    "ar": "تحدث مع مرشد الأمواج"
  },
  "Live Taghazout Bay Swell": {
    "fr": "Houle en direct dans la baie de Taghazout",
    "ar": "أمواج خليج تغازوت مباشرة"
  },
  "Anchor Point:": {
    "fr": "Anchor Point :",
    "ar": "أنكور بوينت:"
  },
  "1.8m @ 14s NW": {
    "fr": "1,8 m / 14 s NO",
    "ar": "1.8 م / 14 ثانية شمال غرب"
  },
  "Low 09:42 (+0.4m) | High 16:15": {
    "fr": "Basse 09:42 (+0,4 m) | Haute 16:15",
    "ar": "جزر 09:42 (+0.4 م) | مد 16:15"
  },
  "Bespoke Atlantic Sessions": {
    "fr": "Sessions atlantiques sur mesure",
    "ar": "جلسات أطلسية مخصصة"
  },
  "Surf Morocco with": {
    "fr": "Surfez au Maroc avec",
    "ar": "اركب أمواج المغرب مع"
  },
  "Blue Wave.": {
    "fr": "Blue Wave.",
    "ar": "Blue Wave."
  },
  "From protected sandbars right outside our Imi Ouaddar gate to legendary Atlantic right-hand points in Taghazout and raw dunes in Tamri. Coached by ISA specialists, nourished by coastal Berber cuisine.": {
    "fr": "Des bancs de sable d’Imi Ouaddar aux droites légendaires de Taghazout et aux dunes de Tamri. Coaching ISA et cuisine berbère du littoral.",
    "ar": "من الشواطئ الرملية المحمية في إيمي وادار إلى أمواج تغازوت الشهيرة وكثبان تامري، مع تدريب خبراء ISA ومأكولات أمازيغية ساحلية."
  },
  "Explore Packages": {
    "fr": "Découvrir les forfaits",
    "ar": "استكشف الباقات"
  },
  "Find Your Level": {
    "fr": "Trouvez votre niveau",
    "ar": "اكتشف مستواك"
  },
  "Days of Sun": {
    "fr": "Jours de soleil",
    "ar": "أيام مشمسة"
  },
  "Coach Ratio": {
    "fr": "Ratio moniteur/élèves",
    "ar": "نسبة المدربين"
  },
  "Local Breaks": {
    "fr": "Spots locaux",
    "ar": "مواقع أمواج محلية"
  },
  "Imi Ouaddar Bay & Coast": {
    "fr": "Baie et côte d’Imi Ouaddar",
    "ar": "خليج وساحل إيمي وادار"
  },
  "Taghazout Surf Corridor": {
    "fr": "Circuit surf de Taghazout",
    "ar": "مسار أمواج تغازوت"
  },
  "ISA Certified": {
    "fr": "Certifié ISA",
    "ar": "معتمد من ISA"
  },
  "Daily Video Reviews": {
    "fr": "Analyses vidéo quotidiennes",
    "ar": "مراجعات فيديو يومية"
  },
  "HD drone & beach angle debriefs": {
    "fr": "Débriefings HD par drone et depuis la plage",
    "ar": "تحليل فيديو عالي الدقة من الدرون والشاطئ"
  },
  "Curated Disciplines": {
    "fr": "Disciplines sélectionnées",
    "ar": "تخصصات مختارة"
  },
  "Ocean Programs Built Around Swell & Form": {
    "fr": "Des programmes adaptés à la houle et à votre technique",
    "ar": "برامج بحرية تناسب الأمواج والمهارات"
  },
  "Whether stepping onto fiberglass for the first time or chasing reeling six-foot walls, each session is timed to local tides and individual biomechanics.": {
    "fr": "Premiers pas sur une planche ou vagues de deux mètres : chaque session suit les marées et votre biomécanique.",
    "ar": "سواء كانت أول تجربة على اللوح أو مطاردة أمواج بارتفاع ستة أقدام، تُضبط كل جلسة حسب المد وقدراتك البدنية."
  },
  "Progression Architecture": {
    "fr": "Parcours de progression",
    "ar": "مسار التطور"
  },
  "Find Your Exact Skill Bracket": {
    "fr": "Identifiez précisément votre niveau",
    "ar": "حدّد مستوى مهاراتك بدقة"
  },
  "We match every guest with the ideal coach, board length, and wave break profile so you never feel out of your depth or held back.": {
    "fr": "Nous adaptons le moniteur, la planche et le spot à chaque voyageur pour progresser sereinement.",
    "ar": "نختار لكل ضيف المدرب وطول اللوح ونوع الأمواج المناسبين ليتقدم بثقة دون صعوبة أو قيود."
  },
  "Focus:": {
    "fr": "Objectif :",
    "ar": "التركيز:"
  },
  "Retreat Curations": {
    "fr": "Séjours sélectionnés",
    "ar": "إقامات مختارة"
  },
  "Featured All-Inclusive Surf Packages": {
    "fr": "Nos forfaits surf tout compris",
    "ar": "باقات أمواج شاملة مميزة"
  },
  "Designed for total ease. Accommodations, coaching, transfers, and coastal cuisine grouped into seamless seasonal itineraries.": {
    "fr": "Hébergement, coaching, transferts et cuisine côtière réunis dans des séjours saisonniers sans souci.",
    "ar": "إقامة وتدريب ونقل ومأكولات ساحلية ضمن برامج موسمية متكاملة لراحة تامة."
  },
  "Guest Favorite": {
    "fr": "Favori des voyageurs",
    "ar": "المفضل لدى الضيوف"
  },
  "Nights /": {
    "fr": "Nuits /",
    "ar": "ليالٍ /"
  },
  "Days": {
    "fr": "Jours",
    "ar": "أيام"
  },
  "/ person": {
    "fr": "/ personne",
    "ar": "/ شخص"
  },
  "Local Geography": {
    "fr": "Géographie locale",
    "ar": "الجغرافيا المحلية"
  },
  "The Taghazout Surf Corridor": {
    "fr": "Le circuit surf de Taghazout",
    "ar": "مسار أمواج تغازوت"
  },
  "Within a 15-minute radius of Blue Wave Lodge lie over a dozen distinct breaks catering to every wave period and wind direction.": {
    "fr": "À moins de 15 minutes du lodge, plus de douze spots s’adaptent aux différentes houles et directions du vent.",
    "ar": "على بُعد 15 دقيقة من النزل، يوجد أكثر من اثني عشر موقعاً تناسب مختلف دورات الأمواج واتجاهات الرياح."
  },
  "Blue Wave Lodge HQ": {
    "fr": "Siège de Blue Wave Lodge",
    "ar": "مقر Blue Wave Lodge"
  },
  "Imi Ouaddar Coastal Headland": {
    "fr": "Promontoire côtier d’Imi Ouaddar",
    "ar": "رأس إيمي وادار الساحلي"
  },
  "Get Directions": {
    "fr": "Itinéraire",
    "ar": "الاتجاهات"
  },
  "Guest Inquiries": {
    "fr": "Questions des voyageurs",
    "ar": "استفسارات الضيوف"
  },
  "Frequently Asked Surf Questions": {
    "fr": "Questions fréquentes sur le surf",
    "ar": "الأسئلة الشائعة عن ركوب الأمواج"
  },
  "Everything you need to know before packing your sunscreen and arriving on the Moroccan coast.": {
    "fr": "Tout savoir avant de préparer votre crème solaire et de rejoindre la côte marocaine.",
    "ar": "كل ما تحتاج معرفته قبل تجهيز حقيبتك والوصول إلى الساحل المغربي."
  },
  "Sanctuary Awaits": {
    "fr": "Votre havre vous attend",
    "ar": "ملاذك ينتظرك"
  },
  "Ready to Ride the Atlantic Swell of Morocco?": {
    "fr": "Prêt à surfer les vagues atlantiques du Maroc ?",
    "ar": "مستعد لركوب أمواج الأطلسي في المغرب؟"
  },
  "Book your package directly with our resident surf concierge for custom dates, private coaching requests, and suite upgrades.": {
    "fr": "Réservez auprès de notre conciergerie surf pour des dates sur mesure, des cours privés ou un surclassement en suite.",
    "ar": "احجز باقتك مباشرة مع فريق الأمواج لمواعيد مخصصة وتدريب خاص وترقية الأجنحة."
  },
  "Book Your Surf Package": {
    "fr": "Réservez votre forfait surf",
    "ar": "احجز باقة الأمواج"
  },
  "Speak with Head Coach": {
    "fr": "Parler au moniteur principal",
    "ar": "تحدث مع المدرب الرئيسي"
  },
  "Swell Status": {
    "fr": "État de la houle",
    "ar": "حالة الأمواج"
  },
  "Imi Ouaddar Point: 1.8m @ 13s • Glassy Offshore • 21°C Sea Temp": {
    "fr": "Pointe d’Imi Ouaddar : 1,8 m / 13 s • Vent de terre, mer lisse • Eau à 21 °C",
    "ar": "نقطة إيمي وادار: 1.8 م / 13 ثانية • رياح برية ومياه صافية • حرارة البحر 21°م"
  },
  "The Sanctuary • Taghazout Bay": {
    "fr": "Le havre • Baie de Taghazout",
    "ar": "الملاذ • خليج تغازوت"
  },
  "Stay Your Way.": {
    "fr": "Séjournez à votre rythme.",
    "ar": "أقم على طريقتك."
  },
  "Where sculpted Moroccan tadelakt meets the rhythmic cadence of the Atlantic. From panoramic cliff-top suites overlooking point breaks to secluded courtyard retreats, find your personal sanctuary.": {
    "fr": "Le tadelakt marocain rencontre le rythme de l’Atlantique. Suites panoramiques sur la falaise ou retraites paisibles côté cour : trouvez votre havre.",
    "ar": "حيث يلتقي التادلاكت المغربي بإيقاع الأطلسي. من أجنحة بانورامية على الجرف إلى غرف هادئة في الفناء، اعثر على ملاذك."
  },
  "Availability Rate": {
    "fr": "Disponibilité",
    "ar": "نسبة التوافر"
  },
  "94% Booked This Week": {
    "fr": "94 % réservé cette semaine",
    "ar": "94٪ محجوز هذا الأسبوع"
  },
  "Autumn swells active. Early reservations advised for sea-facing balconies.": {
    "fr": "Houle d’automne active. Réservation anticipée conseillée pour les balcons face à la mer.",
    "ar": "أمواج الخريف نشطة. يُنصح بالحجز المبكر للشرفات المطلة على البحر."
  },
  "Currency:": {
    "fr": "Devise :",
    "ar": "العملة:"
  },
  "EUR (€)": {
    "fr": "EUR (€)",
    "ar": "يورو (€)"
  },
  "• Free Board Storage Included": {
    "fr": "• Rangement des planches gratuit inclus",
    "ar": "• تخزين مجاني للألواح مشمول"
  },
  "Architectural Living": {
    "fr": "L’art d’habiter",
    "ar": "إقامة بطابع معماري"
  },
  "Curated Sanctuaries": {
    "fr": "Nos havres sélectionnés",
    "ar": "ملاذات مختارة"
  },
  "Every residence pairs authentic Moroccan craftsmanship with surf-inspired comfort: custom cedar woodwork, limestone rain showers, and organic linens.": {
    "fr": "Chaque résidence allie artisanat marocain et confort surf : cèdre sur mesure, douches pluie en pierre calcaire et linge biologique.",
    "ar": "تجمع كل إقامة بين الحرف المغربية وراحة مستوحاة من الأمواج: خشب أرز مخصص، ودش مطري حجري، وبياضات عضوية."
  },
  "From €": {
    "fr": "À partir de €",
    "ar": "ابتداءً من €"
  },
  "Inspect Floorplan & Details": {
    "fr": "Voir le plan et les détails",
    "ar": "عرض مخطط الغرفة والتفاصيل"
  },
  "Reserve Room": {
    "fr": "Réserver la chambre",
    "ar": "احجز الغرفة"
  },
  "In-Depth Room Showcase": {
    "fr": "Découvrez la chambre en détail",
    "ar": "استكشف الغرفة بالتفصيل"
  },
  "The Sea View Balcony Room": {
    "fr": "La chambre avec balcon vue mer",
    "ar": "الغرفة ذات الشرفة المطلة على البحر"
  },
  "Room 204 • Second Tier Cliffside": {
    "fr": "Chambre 204 • Deuxième niveau sur la falaise",
    "ar": "الغرفة 204 • المستوى الثاني على الجرف"
  },
  "Immediate Spot Check View": {
    "fr": "Vue directe sur le spot",
    "ar": "إطلالة مباشرة على موقع الأمواج"
  },
  "Capacity": {
    "fr": "Capacité",
    "ar": "السعة"
  },
  "Bed Configuration": {
    "fr": "Configuration des lits",
    "ar": "ترتيب الأسرّة"
  },
  "Ocean Aspect": {
    "fr": "Orientation océan",
    "ar": "اتجاه المحيط"
  },
  "Total Living Area": {
    "fr": "Surface totale",
    "ar": "المساحة الإجمالية"
  },
  "Climate": {
    "fr": "Climatisation",
    "ar": "التكييف"
  },
  "The Ocean Sanctuary Experience": {
    "fr": "L’expérience du havre océanique",
    "ar": "تجربة ملاذ المحيط"
  },
  "Positioned on the highest seaward terrace of the lodge, the Sea View Balcony Room was conceived for travelers who live by the tides. Awaken without an alarm clock to the roar of waves peeling across the bay; step bare-foot onto the smooth tadelakt balcony to check the wind direction and swell angle with your first sip of fresh spiced mint tea.": {
    "fr": "Sur la plus haute terrasse face à la mer, cette chambre est pensée pour vivre au rythme des marées. Réveillez-vous au son des vagues, puis rejoignez pieds nus le balcon en tadelakt pour observer le vent et la houle en dégustant un thé à la menthe épicé.",
    "ar": "تقع الغرفة على أعلى شرفة بحرية في النزل، وصُممت لمن يعيشون بإيقاع المد. استيقظ على صوت الأمواج، ثم اخرج حافي القدمين إلى شرفة التادلاكت لمراقبة الرياح والأمواج مع أول رشفة من شاي النعناع المتبل."
  },
  "Every detail honors regional authenticity: polished lime-plaster surfaces regulate coastal humidity naturally, while hand-carved cedar furniture infuses the room with a rich, grounding scent. After an afternoon surf session, replenish under the high-pressure rain shower scented with local organic argan and rosemary botanicals.": {
    "fr": "Chaque détail célèbre la région : l’enduit à la chaux régule l’humidité et le cèdre sculpté parfume la chambre. Après le surf, profitez de la douche pluie et de produits locaux biologiques à l’argan et au romarin.",
    "ar": "تحتفي كل التفاصيل بأصالة المنطقة: الجص الجيري ينظم الرطوبة طبيعياً، والأرز المنحوت يعطر الغرفة. وبعد ركوب الأمواج، انتعش تحت الدش المطري بمنتجات أركان وإكليل الجبل العضوية المحلية."
  },
  "Included Room Amenities": {
    "fr": "Équipements inclus",
    "ar": "مرافق الغرفة المشمولة"
  },
  "Direct Balcony Viewpoint": {
    "fr": "Vue directe depuis le balcon",
    "ar": "إطلالة مباشرة من الشرفة"
  },
  "Taghazout Bay Swell Forecast": {
    "fr": "Prévisions de houle de la baie de Taghazout",
    "ar": "توقعات أمواج خليج تغازوت"
  },
  "Live Sensor: Ouaddar Point": {
    "fr": "Capteur en direct : pointe Ouaddar",
    "ar": "مستشعر مباشر: نقطة وادار"
  },
  "Morning Tide (06:45)": {
    "fr": "Marée du matin (06:45)",
    "ar": "مد الصباح (06:45)"
  },
  "Midday Swell Peak (13:30)": {
    "fr": "Pic de houle à midi (13:30)",
    "ar": "ذروة أمواج الظهيرة (13:30)"
  },
  "Sunset Glass-Off (18:15)": {
    "fr": "Accalmie au coucher du soleil (18:15)",
    "ar": "هدوء الغروب (18:15)"
  },
  "2.2m @ 14s (Optimal)": {
    "fr": "2,2 m / 14 s (optimal)",
    "ar": "2.2 م / 14 ثانية (مثالي)"
  },
  "1.4m Low Tide Shorebreak": {
    "fr": "1,4 m au bord à marée basse",
    "ar": "أمواج شاطئية 1.4 م عند الجزر"
  },
  "Peak Point Session: 2.2m Offshore": {
    "fr": "Session à la pointe : 2,2 m, vent de terre",
    "ar": "جلسة الذروة: 2.2 م مع رياح برية"
  },
  "1.7m Sunset Peeler": {
    "fr": "Vague déroulante de 1,7 m au couchant",
    "ar": "موجة متتابعة 1.7 م عند الغروب"
  },
  "(42 reviews)": {
    "fr": "(42 avis)",
    "ar": "(42 تقييماً)"
  },
  "Guests & Surfers": {
    "fr": "Voyageurs et surfeurs",
    "ar": "الضيوف وراكبو الأمواج"
  },
  "2 Adults (1 King Bed)": {
    "fr": "2 adultes (1 lit king size)",
    "ar": "بالغان (سرير كبير واحد)"
  },
  "1 Adult (Solo Traveler)": {
    "fr": "1 adulte (voyageur solo)",
    "ar": "بالغ واحد (مسافر منفرد)"
  },
  "Enhance Your Stay": {
    "fr": "Enrichissez votre séjour",
    "ar": "عزّز إقامتك"
  },
  "Daily Organic Berber Breakfast": {
    "fr": "Petit-déjeuner berbère bio quotidien",
    "ar": "إفطار أمازيغي عضوي يومي"
  },
  "Included": {
    "fr": "Inclus",
    "ar": "مشمول"
  },
  "Unlimited Surfboard Quiver": {
    "fr": "Accès illimité aux planches",
    "ar": "ألواح أمواج بلا حدود"
  },
  "+€20 / day": {
    "fr": "+20 € / jour",
    "ar": "+20€ / يوم"
  },
  "Agadir Airport (AGA) Private Transfer": {
    "fr": "Transfert privé aéroport d’Agadir (AGA)",
    "ar": "نقل خاص من مطار أكادير (AGA)"
  },
  "nights": {
    "fr": "nuits",
    "ar": "ليالٍ"
  },
  "Quiver Pass (": {
    "fr": "Pass planches (",
    "ar": "اشتراك الألواح ("
  },
  "days)": {
    "fr": "jours)",
    "ar": "أيام)"
  },
  "Airport Transfer (Round trip)": {
    "fr": "Transfert aéroport (aller-retour)",
    "ar": "نقل المطار (ذهاباً وإياباً)"
  },
  "Tourist & Eco Tax": {
    "fr": "Taxe de séjour et écotaxe",
    "ar": "ضريبة سياحية وبيئية"
  },
  "Total Amount": {
    "fr": "Montant total",
    "ar": "المبلغ الإجمالي"
  },
  "Instant Book Sea View Room": {
    "fr": "Réserver la chambre vue mer",
    "ar": "احجز غرفة بإطلالة بحرية فوراً"
  },
  "Enquire via WhatsApp Concierge": {
    "fr": "Contacter la conciergerie sur WhatsApp",
    "ar": "استفسر عبر واتساب الاستقبال"
  },
  "Yassine • Head Guide": {
    "fr": "Yassine • Guide principal",
    "ar": "ياسين • المرشد الرئيسي"
  },
  "“Room 204 gets the first morning offshore breeze. Ask me anytime for the daily secret spot forecast.”": {
    "fr": "« La chambre 204 reçoit la première brise du matin. Demandez-moi les prévisions de nos spots secrets. »",
    "ar": "«الغرفة 204 تستقبل أول نسيم صباحي. اسألني متى شئت عن توقعات مواقع الأمواج السرية.»"
  },
  "Discover Alternatives": {
    "fr": "Découvrez d’autres options",
    "ar": "اكتشف البدائل"
  },
  "Other Available Rooms & Suites": {
    "fr": "Autres chambres et suites disponibles",
    "ar": "غرف وأجنحة أخرى متاحة"
  },
  "View All 9 Accommodations": {
    "fr": "Voir les 9 hébergements",
    "ar": "عرض أماكن الإقامة التسعة"
  },
  "/nt": {
    "fr": "/nuit",
    "ar": "/ليلة"
  },
  "Reserve Now →": {
    "fr": "Réserver maintenant →",
    "ar": "احجز الآن ←"
  },
  "Peace of Mind": {
    "fr": "Tranquillité d’esprit",
    "ar": "راحة البال"
  },
  "Frequently Asked Questions": {
    "fr": "Questions fréquentes",
    "ar": "الأسئلة الشائعة"
  },
  "Everything you need to know about reserving your stay, surf equipment, check-in, and life at Blue Wave Lodge.": {
    "fr": "Tout savoir sur la réservation, le matériel de surf, l’arrivée et la vie à Blue Wave Lodge.",
    "ar": "كل ما تحتاج معرفته عن الحجز ومعدات الأمواج والوصول والحياة في Blue Wave Lodge."
  },
  "Yassine • Surf Concierge": {
    "fr": "Yassine • Conciergerie surf",
    "ar": "ياسين • مسؤول خدمات الأمواج"
  },
  "Online • Blue Wave Lodge HQ": {
    "fr": "En ligne • Blue Wave Lodge",
    "ar": "متصل • مقر Blue Wave Lodge"
  },
  "Swell Forecast?": {
    "fr": "Prévisions de houle ?",
    "ar": "توقعات الأمواج؟"
  },
  "Airport Transfer?": {
    "fr": "Transfert aéroport ?",
    "ar": "نقل المطار؟"
  },
  "Beginner Boards?": {
    "fr": "Planches pour débutants ?",
    "ar": "ألواح للمبتدئين؟"
  },
  "A curated boutique ocean sanctuary in Imi Ouaddar, Morocco. Where Atlantic point breaks meet refined Berber warmth and unhurried coastal living.": {
    "fr": "Un lodge de charme à Imi Ouaddar, au Maroc, où les vagues atlantiques rencontrent la chaleur berbère et la douceur de la vie côtière.",
    "ar": "ملاذ مميز على المحيط في إيمي وادار بالمغرب، حيث تلتقي أمواج الأطلسي بالدفء الأمازيغي والحياة الساحلية الهادئة."
  },
  "Route d'Essaouira, Plage Imi Ouaddar, Taghazout Bay, Morocco": {
    "fr": "Route d’Essaouira, plage Imi Ouaddar, baie de Taghazout, Maroc",
    "ar": "طريق الصويرة، شاطئ إيمي وادار، خليج تغازوت، المغرب"
  },
  "Accommodations": {
    "fr": "Hébergements",
    "ar": "أماكن الإقامة"
  },
  "Lodge Rooms": {
    "fr": "Chambres du lodge",
    "ar": "غرف النزل"
  },
  "Sea View Suites": {
    "fr": "Suites vue mer",
    "ar": "أجنحة بإطلالة بحرية"
  },
  "Pool Terrace": {
    "fr": "Terrasse piscine",
    "ar": "شرفة المسبح"
  },
  "Ocean Apartments": {
    "fr": "Appartements face à l’océan",
    "ar": "شقق مطلة على المحيط"
  },
  "Surf & Life": {
    "fr": "Surf et art de vivre",
    "ar": "الأمواج والحياة"
  },
  "Surf Academy": {
    "fr": "École de surf",
    "ar": "أكاديمية الأمواج"
  },
  "Point Break Guiding": {
    "fr": "Guidage sur les point breaks",
    "ar": "إرشاد عند نقاط تكسّر الأمواج"
  },
  "Yoga Shala": {
    "fr": "Shala de yoga",
    "ar": "قاعة اليوغا"
  },
  "All-Inclusive Retreats": {
    "fr": "Séjours tout compris",
    "ar": "إقامات شاملة"
  },
  "Direct Contacts & Swell Letter": {
    "fr": "Contacts et bulletin de houle",
    "ar": "التواصل ونشرة الأمواج"
  },
  "+212 (0) 528 000 000 (Front Desk)": {
    "fr": "+212 (0) 528 000 000 (Réception)",
    "ar": "+212 (0) 528 000 000 (الاستقبال)"
  },
  "+212 (0) 661 000 000 (Surf House)": {
    "fr": "+212 (0) 661 000 000 (Maison du surf)",
    "ar": "+212 (0) 661 000 000 (بيت الأمواج)"
  },
  "Thank you! You will receive our monthly Atlantic swell chart and secret tide guide.": {
    "fr": "Merci ! Vous recevrez notre bulletin mensuel de houle atlantique et notre guide des marées.",
    "ar": "شكراً لك! ستتلقى نشرتنا الشهرية لأمواج الأطلسي ودليل المد الخاص بنا."
  },
  "© 2025 Blue Wave Lodge Imi Ouaddar. All rights reserved.": {
    "fr": "© 2025 Blue Wave Lodge Imi Ouaddar. Tous droits réservés.",
    "ar": "© 2025 Blue Wave Lodge إيمي وادار. جميع الحقوق محفوظة."
  },
  "Privacy Policy": {
    "fr": "Politique de confidentialité",
    "ar": "سياسة الخصوصية"
  },
  "Terms of Stay": {
    "fr": "Conditions de séjour",
    "ar": "شروط الإقامة"
  },
  "Find Us": {
    "fr": "Nous trouver",
    "ar": "اعثر علينا"
  },
  "1. Home Overview": {
    "fr": "1. Accueil",
    "ar": "1. الرئيسية"
  },
  "2. Stay / Sanctuaries": {
    "fr": "2. Séjours / Hébergements",
    "ar": "2. الإقامة / الملاذات"
  },
  "3. Surf & Packages": {
    "fr": "3. Surf et forfaits",
    "ar": "3. الأمواج والباقات"
  },
  "4. Reserve / Booking Flow": {
    "fr": "4. Réservation",
    "ar": "4. الحجز"
  },
  "Taghazout Bay Swell: 1.8m @ 14s NW": {
    "fr": "Houle de Taghazout : 1,8 m / 14 s NO",
    "ar": "أمواج خليج تغازوت: 1.8 م / 14 ثانية شمال غرب"
  },
  "Lodge • Morocco": {
    "fr": "Lodge • Maroc",
    "ar": "نزل • المغرب"
  },
  "Pool View Rooms": {
    "fr": "Chambres vue piscine",
    "ar": "غرف بإطلالة على المسبح"
  },
  "Surf Lessons": {
    "fr": "Cours de surf",
    "ar": "دروس ركوب الأمواج"
  },
  "Surf Guiding": {
    "fr": "Guidage surf",
    "ar": "إرشاد ركوب الأمواج"
  },
  "Surf & Stay": {
    "fr": "Surf et séjour",
    "ar": "أمواج وإقامة"
  },
  "Surf + Yoga": {
    "fr": "Surf et yoga",
    "ar": "أمواج ويوغا"
  },
  "Equipment Rental": {
    "fr": "Location de matériel",
    "ar": "تأجير المعدات"
  },
  "Guest Sanctuary": {
    "fr": "Espace voyageur",
    "ar": "مساحة الضيف"
  },
  "Imi Ouaddar Member": {
    "fr": "Membre Imi Ouaddar",
    "ar": "عضو إيمي وادار"
  },
  "Manage Reservations": {
    "fr": "Gérer les réservations",
    "ar": "إدارة الحجوزات"
  },
  "Message Surf Concierge": {
    "fr": "Contacter la conciergerie surf",
    "ar": "راسل مسؤول خدمات الأمواج"
  },
  "Home Overview": {
    "fr": "Accueil",
    "ar": "الرئيسية"
  },
  "Accommodations & Suites": {
    "fr": "Hébergements et suites",
    "ar": "أماكن الإقامة والأجنحة"
  },
  "Surf & Packages": {
    "fr": "Surf et forfaits",
    "ar": "الأمواج والباقات"
  },
  "Reserve Sanctuary": {
    "fr": "Réserver votre havre",
    "ar": "احجز ملاذك"
  },
  "Language:": {
    "fr": "Langue :",
    "ar": "اللغة:"
  },
  "• Package Specification": {
    "fr": "• Détails du forfait",
    "ar": "• تفاصيل الباقة"
  },
  "Free cancellation up to 14 days before arrival": {
    "fr": "Annulation gratuite jusqu’à 14 jours avant l’arrivée",
    "ar": "إلغاء مجاني حتى 14 يوماً قبل الوصول"
  },
  "Secure reservation request reviewed within 2 hours": {
    "fr": "Demande de réservation sécurisée examinée sous 2 heures",
    "ar": "طلب حجز آمن يُراجع خلال ساعتين"
  },
  "Includes 1:4 ISA instructor ratio & video debriefs": {
    "fr": "Inclut 1 moniteur ISA pour 4 élèves et des analyses vidéo",
    "ar": "يشمل مدرب ISA لكل 4 متدربين وتحليل فيديو"
  },
  "Proceed to Booking": {
    "fr": "Passer à la réservation",
    "ar": "المتابعة إلى الحجز"
  },
  "Dismiss": {
    "fr": "Fermer",
    "ar": "إغلاق"
  },
  "Chat on WhatsApp": {
    "fr": "Discuter sur WhatsApp",
    "ar": "تحدث عبر واتساب"
  },
  "Home Screen": {
    "fr": "Page d’accueil",
    "ar": "الصفحة الرئيسية"
  },
  "Stay / Sanctuaries Screen": {
    "fr": "Page des hébergements",
    "ar": "صفحة الإقامة والملاذات"
  },
  "Surf & Packages Screen": {
    "fr": "Page surf et forfaits",
    "ar": "صفحة الأمواج والباقات"
  },
  "Reserve Screen": {
    "fr": "Page de réservation",
    "ar": "صفحة الحجز"
  },
  "Sea View Suite": {
    "fr": "Suite vue mer",
    "ar": "جناح بإطلالة بحرية"
  },
  "Pool & Garden Terrace Room": {
    "fr": "Chambre avec terrasse piscine et jardin",
    "ar": "غرفة بشرفة للمسبح والحديقة"
  },
  "e.g. Royal Air Maroc AT802 @ 16:30": {
    "fr": "Ex. Royal Air Maroc AT802 à 16:30",
    "ar": "مثال: الخطوط الملكية المغربية AT802 الساعة 16:30"
  },
  "Let our chef know about vegetarian/vegan desires, or tell our guides your favorite board dimensions...": {
    "fr": "Indiquez vos préférences végétariennes/véganes ou les dimensions de votre planche préférée…",
    "ar": "أخبر طاهينا بتفضيلاتك النباتية أو مرشدينا بمقاسات لوحك المفضل…"
  },
  "Real-time Surf Conditions": {
    "fr": "Conditions de surf en direct",
    "ar": "ظروف الأمواج المباشرة"
  },
  "Blue Wave Lodge oceanfront infinity pool and sunset over Imi Ouaddar Atlantic coast": {
    "fr": "Piscine à débordement de Blue Wave Lodge et coucher de soleil sur la côte d’Imi Ouaddar",
    "ar": "مسبح Blue Wave Lodge اللامتناهي والغروب فوق ساحل إيمي وادار الأطلسي"
  },
  "Warm sunlight illuminating the bohemian Moroccan tadelakt architecture of Blue Wave Lodge": {
    "fr": "Lumière chaude sur l’architecture marocaine en tadelakt de Blue Wave Lodge",
    "ar": "ضوء الشمس الدافئ يضيء عمارة التادلاكت المغربية في Blue Wave Lodge"
  },
  "Coastal map view of Imi Ouaddar and Taghazout Bay": {
    "fr": "Carte côtière d’Imi Ouaddar et de la baie de Taghazout",
    "ar": "خريطة ساحل إيمي وادار وخليج تغازوت"
  },
  "Atlantic Swell Report": {
    "fr": "Bulletin de houle atlantique",
    "ar": "تقرير أمواج الأطلسي"
  },
  "Taghazout bay sunset with wooden surfboards": {
    "fr": "Coucher de soleil sur la baie de Taghazout et planches en bois",
    "ar": "غروب خليج تغازوت مع ألواح أمواج خشبية"
  },
  "Taghazout bay map": {
    "fr": "Carte de la baie de Taghazout",
    "ar": "خريطة خليج تغازوت"
  },
  "Main room showcase": {
    "fr": "Vue principale de la chambre",
    "ar": "العرض الرئيسي للغرفة"
  },
  "Portrait of Yassine": {
    "fr": "Portrait de Yassine",
    "ar": "صورة ياسين"
  },
  "Type your question or request...": {
    "fr": "Saisissez votre question ou demande…",
    "ar": "اكتب سؤالك أو طلبك…"
  },
  "Blue Wave Lodge Logo": {
    "fr": "Logo de Blue Wave Lodge",
    "ar": "شعار Blue Wave Lodge"
  },
  "Your email address": {
    "fr": "Votre adresse e-mail",
    "ar": "بريدك الإلكتروني"
  },
  "Toggle Dark / Light Mode": {
    "fr": "Basculer entre mode sombre et clair",
    "ar": "تبديل الوضع الداكن / الفاتح"
  },
  "Sea View Balcony Room": {
    "fr": "Chambre avec balcon vue mer",
    "ar": "غرفة بشرفة وإطلالة بحرية"
  },
  "Panoramic Ocean Front": {
    "fr": "Vue panoramique sur l’océan",
    "ar": "واجهة محيط بانورامية"
  },
  "Wake to Atlantic swells breaking along the reef. Features a private cedar-railed panoramic terrace, artisanal emerald zellige rain shower, and custom Moroccan brass sconces.": {
    "fr": "Réveillez-vous face aux vagues atlantiques. Terrasse panoramique privée bordée de cèdre, douche pluie en zellige émeraude et appliques marocaines en laiton.",
    "ar": "استيقظ على أمواج الأطلسي فوق الشعاب، مع شرفة بانورامية خاصة بسياج أرز، ودش مطري بزليج زمردي، ومصابيح نحاسية مغربية."
  },
  "King Size Bed": {
    "fr": "Lit king size",
    "ar": "سرير كبير"
  },
  "12 m² Ocean Terrace": {
    "fr": "Terrasse sur l’océan de 12 m²",
    "ar": "شرفة بحرية بمساحة 12 م²"
  },
  "Point Break View": {
    "fr": "Vue sur le point break",
    "ar": "إطلالة على نقطة تكسّر الأمواج"
  },
  "Artisanal Zellige Bath": {
    "fr": "Salle de bain en zellige artisanal",
    "ar": "حمام بزليج يدوي"
  },
  "2 Guests": {
    "fr": "2 voyageurs",
    "ar": "ضيفان"
  },
  "34 m² + 12 m² Balcony": {
    "fr": "34 m² + balcon de 12 m²",
    "ar": "34 م² + شرفة 12 م²"
  },
  "1 Royal King": {
    "fr": "1 lit king size royal",
    "ar": "سرير ملكي كبير واحد"
  },
  "Pool View Suite": {
    "fr": "Suite vue piscine",
    "ar": "جناح بإطلالة على المسبح"
  },
  "Direct Garden Access": {
    "fr": "Accès direct au jardin",
    "ar": "وصول مباشر إلى الحديقة"
  },
  "Terrace Pool Access": {
    "fr": "Accès piscine depuis la terrasse",
    "ar": "دخول المسبح من الشرفة"
  },
  "Step out straight onto the sun-warmed stone deck and plunge into the saltwater pool. Features an oversized Berber lounge nook and handcrafted daybed.": {
    "fr": "Accédez à la terrasse en pierre chauffée par le soleil et à la piscine d’eau salée. Grand coin salon berbère et banquette artisanale.",
    "ar": "اخرج إلى التراس الحجري الدافئ بالشمس واغطس في مسبح المياه المالحة، مع ركن جلوس أمازيغي واسع وأريكة نهارية يدوية."
  },
  "Moroccan Daybed": {
    "fr": "Banquette marocaine",
    "ar": "أريكة نهارية مغربية"
  },
  "Garden Lounge": {
    "fr": "Salon de jardin",
    "ar": "صالة الحديقة"
  },
  "30 m²": {
    "fr": "30 m²",
    "ar": "30 م²"
  },
  "Queen or Twin": {
    "fr": "Lit queen size ou lits jumeaux",
    "ar": "سرير مزدوج أو سريران منفصلان"
  },
  "Penthouse Ocean Apartment": {
    "fr": "Appartement penthouse sur l’océan",
    "ar": "شقة بنتهاوس على المحيط"
  },
  "Exclusive Penthouse": {
    "fr": "Penthouse exclusif",
    "ar": "بنتهاوس حصري"
  },
  "The crown jewel of Blue Wave Lodge. Dual private suites, chef’s granite kitchen, and a private 45 m² wrap-around rooftop deck designed for post-surf sunset gatherings.": {
    "fr": "Le joyau du lodge : deux suites privées, cuisine en granit et terrasse panoramique de 45 m² sur le toit pour se retrouver après le surf au couchant.",
    "ar": "جوهرة النزل: جناحان خاصان، ومطبخ غرانيت مجهز، وسطح خاص محيط بمساحة 45 م² للقاءات الغروب بعد الأمواج."
  },
  "Up to 5 Guests": {
    "fr": "Jusqu’à 5 voyageurs",
    "ar": "حتى 5 ضيوف"
  },
  "Full Chef Kitchen": {
    "fr": "Cuisine entièrement équipée",
    "ar": "مطبخ مجهز بالكامل"
  },
  "45 m² Roof Deck": {
    "fr": "Terrasse sur le toit de 45 m²",
    "ar": "سطح بمساحة 45 م²"
  },
  "2 Private Bedrooms": {
    "fr": "2 chambres privées",
    "ar": "غرفتا نوم خاصتان"
  },
  "82 m² Interior": {
    "fr": "Intérieur de 82 m²",
    "ar": "مساحة داخلية 82 م²"
  },
  "2 King Suites": {
    "fr": "2 suites avec lits king size",
    "ar": "جناحان بسريرين كبيرين"
  },
  "Standard Double Room": {
    "fr": "Chambre double standard",
    "ar": "غرفة مزدوجة قياسية"
  },
  "Courtyard Serenity": {
    "fr": "Sérénité de la cour",
    "ar": "هدوء الفناء"
  },
  "Quiet Garden Patio": {
    "fr": "Patio de jardin paisible",
    "ar": "فناء حديقة هادئ"
  },
  "Pure minimalist Atlantic comfort. Tucked away from ocean winds in the quiet fragrant garden courtyard, perfect for solo surfers and couples seeking profound sleep.": {
    "fr": "Confort atlantique épuré dans une cour parfumée à l’abri du vent. Idéal pour les surfeurs solos et les couples en quête de repos profond.",
    "ar": "راحة أطلسية بسيطة في فناء حديقة عطِر بعيد عن الرياح، مثالية للمسافرين المنفردين والأزواج الباحثين عن نوم عميق."
  },
  "Queen Size Bed": {
    "fr": "Lit queen size",
    "ar": "سرير مزدوج كبير"
  },
  "Courtyard Calm": {
    "fr": "Calme de la cour",
    "ar": "هدوء الفناء"
  },
  "Work Nook & 300Mbps": {
    "fr": "Coin bureau et 300 Mbit/s",
    "ar": "ركن عمل وإنترنت 300 ميغابت/ثانية"
  },
  "24 m²": {
    "fr": "24 m²",
    "ar": "24 م²"
  },
  "Queen Bed": {
    "fr": "Lit queen size",
    "ar": "سرير مزدوج"
  },
  "Garden Courtyard Suite": {
    "fr": "Suite avec cour et jardin",
    "ar": "جناح بفناء حديقة"
  },
  "Garden Oasis": {
    "fr": "Oasis de jardin",
    "ar": "واحة الحديقة"
  },
  "Quiet shaded patio, rain shower, ideal for unwinding after deep sun.": {
    "fr": "Patio ombragé paisible et douche pluie, parfaits après une journée au soleil.",
    "ar": "فناء هادئ مظلل ودش مطري، مثاليان للاسترخاء بعد الشمس."
  },
  "Sunset Horizon Studio": {
    "fr": "Studio horizon au couchant",
    "ar": "استوديو أفق الغروب"
  },
  "Top Floor": {
    "fr": "Dernier étage",
    "ar": "الطابق العلوي"
  },
  "Open sunset panoramas, private workstation, and custom record player.": {
    "fr": "Panoramas sur le soleil couchant, bureau privé et platine vinyle personnalisée.",
    "ar": "إطلالات مفتوحة على الغروب ومكتب خاص ومشغل أسطوانات مميز."
  },
  "Two-Bedroom Coastal Flat": {
    "fr": "Appartement côtier de deux chambres",
    "ar": "شقة ساحلية بغرفتي نوم"
  },
  "Family • 4 Guests": {
    "fr": "Famille • 4 voyageurs",
    "ar": "عائلة • 4 ضيوف"
  },
  "Independent kitchen, spacious living quarters, and direct beach trail access.": {
    "fr": "Cuisine indépendante, espaces de vie généreux et accès direct au sentier de la plage.",
    "ar": "مطبخ مستقل ومساحات معيشة واسعة ووصول مباشر إلى مسار الشاطئ."
  },
  "4-Day Surf Escape": {
    "fr": "Escapade surf de 4 jours",
    "ar": "رحلة أمواج لـ4 أيام"
  },
  "Short Break": {
    "fr": "Court séjour",
    "ar": "إقامة قصيرة"
  },
  "A rapid reset for busy travelers wanting maximum water hours over an extended weekend.": {
    "fr": "Une pause revitalisante pour profiter au maximum des vagues pendant un long week-end.",
    "ar": "استراحة سريعة للمسافرين المشغولين للاستمتاع بأكبر وقت في الماء خلال عطلة ممتدة."
  },
  "3 Surf coaching days": {
    "fr": "3 jours de coaching surf",
    "ar": "3 أيام تدريب أمواج"
  },
  "Agadir Airport transfer": {
    "fr": "Transfert aéroport d’Agadir",
    "ar": "نقل مطار أكادير"
  },
  "Full quiver & wetsuit hire": {
    "fr": "Location complète de planches et combinaisons",
    "ar": "تأجير كامل للألواح والبدلات"
  },
  "3 Nights / 4 Days of high-intensity Atlantic coaching, Agadir airport pickup, seaside breakfast buffets, and private room living.": {
    "fr": "3 nuits / 4 jours de coaching intensif, transfert depuis l’aéroport d’Agadir, buffets de petit-déjeuner en bord de mer et chambre privée.",
    "ar": "3 ليالٍ / 4 أيام من التدريب المكثف، واستقبال من مطار أكادير، وإفطار على البحر، وغرفة خاصة."
  },
  "7-Day Surf & Stay": {
    "fr": "Surf et séjour de 7 jours",
    "ar": "أمواج وإقامة لـ7 أيام"
  },
  "Signature Week": {
    "fr": "Semaine signature",
    "ar": "أسبوع مميز"
  },
  "The definitive Atlantic immersion. Daily spot hunts, theory modules, healthy meals, and sunset social dinners.": {
    "fr": "Une immersion atlantique complète : recherche quotidienne des meilleurs spots, théorie, repas sains et dîners conviviaux au couchant.",
    "ar": "تجربة أطلسية متكاملة: استكشاف يومي للمواقع، ودروس نظرية، ووجبات صحية، وعشاء اجتماعي عند الغروب."
  },
  "5 Full surf coaching days": {
    "fr": "5 journées complètes de coaching surf",
    "ar": "5 أيام كاملة من تدريب الأمواج"
  },
  "Daily hearty packed beach lunch": {
    "fr": "Déjeuner copieux à emporter sur la plage chaque jour",
    "ar": "غداء شاطئي غني يومياً"
  },
  "Sunset Paradise Valley day trip": {
    "fr": "Excursion à Paradise Valley au couchant",
    "ar": "رحلة إلى وادي الجنة عند الغروب"
  },
  "Our most cherished week-long formula with 5 coached days, daily beach lunches, spot trips, Paradise Valley excursion, and Agadir transfers.": {
    "fr": "Notre formule favorite : 5 jours de coaching, déjeuners sur la plage, sorties surf, excursion à Paradise Valley et transferts d’Agadir.",
    "ar": "باقتنا الأسبوعية المفضلة: 5 أيام تدريب، وغداء شاطئي يومي، ورحلات مواقع، ورحلة وادي الجنة، ونقل أكادير."
  },
  "Coaching Intensive Week": {
    "fr": "Semaine de coaching intensif",
    "ar": "أسبوع تدريب مكثف"
  },
  "Performance": {
    "fr": "Performance",
    "ar": "الأداء"
  },
  "Hyper-focused technical progression. Drone videography, slow-motion biomechanics, and curated individual goals.": {
    "fr": "Progression technique ciblée : vidéo par drone, biomécanique au ralenti et objectifs individuels.",
    "ar": "تطور تقني مركز: تصوير بالدرون، وتحليل حركة بطيء، وأهداف فردية مخصصة."
  },
  "4 Drone & land video analyses": {
    "fr": "4 analyses vidéo par drone et depuis la plage",
    "ar": "4 تحليلات فيديو جوية وأرضية"
  },
  "Carver skate ramp balance drills": {
    "fr": "Exercices d’équilibre sur rampe en skate Carver",
    "ar": "تمارين توازن على منحدر سكيت Carver"
  },
  "1-on-1 performance review folder": {
    "fr": "Dossier individuel d’analyse des performances",
    "ar": "ملف مراجعة أداء فردي"
  },
  "Designed for rapid progression with multiple HD video reviews, pool breath holding, dryland board mastery, and ISA coach feedback.": {
    "fr": "Progression rapide grâce aux analyses vidéo HD, à l’apnée en piscine, aux exercices à terre et aux conseils d’un moniteur ISA.",
    "ar": "مصمم للتطور السريع مع مراجعات فيديو عالية الدقة، وتمارين تنفس بالمسبح، وإتقان اللوح على اليابسة، وملاحظات مدرب ISA."
  },
  "Surf & Yoga Sanctuary": {
    "fr": "Havre surf et yoga",
    "ar": "ملاذ الأمواج واليوغا"
  },
  "Sanctuary": {
    "fr": "Havre de paix",
    "ar": "ملاذ"
  },
  "Sea view suite upgrade, morning ocean waves followed by rooftop yin sessions and restorative Moroccan hammam.": {
    "fr": "Suite vue mer, vagues matinales, yoga Yin sur le toit et hammam marocain réparateur.",
    "ar": "ترقية لجناح بحري، وأمواج صباحية، وجلسات يِن على السطح، وحمام مغربي مجدد للنشاط."
  },
  "Deluxe Sea View Suite guaranteed": {
    "fr": "Suite Deluxe vue mer garantie",
    "ar": "جناح ديلوكس بحري مضمون"
  },
  "2x Daily rooftop yoga classes": {
    "fr": "2 cours de yoga par jour sur le toit",
    "ar": "حصتا يوغا يومياً على السطح"
  },
  "Traditional eucalyptus hammam bath": {
    "fr": "Hammam traditionnel à l’eucalyptus",
    "ar": "حمام تقليدي بالأوكالبتوس"
  },
  "Harmonize wave energy and deep relaxation with ocean view suite living, 2x daily rooftop shala yoga, and holistic Moroccan wellness treatments.": {
    "fr": "Harmonisez énergie des vagues et relaxation : suite vue mer, yoga deux fois par jour sur le toit et soins marocains holistiques.",
    "ar": "وازن بين طاقة الأمواج والاسترخاء العميق مع جناح بحري، ويوغا مرتين يومياً، وعلاجات عافية مغربية متكاملة."
  },
  "First Time": {
    "fr": "Première fois",
    "ar": "أول تجربة"
  },
  "First Time: Complete Beginner": {
    "fr": "Première fois : débutant complet",
    "ar": "أول تجربة: مبتدئ تماماً"
  },
  "You have never touched a surfboard before or tried it once a long time ago. We start safely on waist-deep sandy bottoms, mastering paddling technique, wave timing, and the clean Moroccan pop-up.": {
    "fr": "Vous débutez ou avez essayé il y a longtemps. Nous commençons en sécurité sur fond sableux, avec de l’eau à la taille, pour apprendre la rame, le timing et le redressement.",
    "ar": "لم تجرّب اللوح من قبل أو جربته منذ زمن. نبدأ بأمان على قاع رملي بماء حتى الخصر، لتعلّم التجديف وتوقيت الموجة والوقوف."
  },
  "Ocean safety, board handling, prone balance & basic push-pop-up.": {
    "fr": "Sécurité en mer, maniement de la planche, équilibre allongé et redressement.",
    "ar": "السلامة البحرية، والتحكم باللوح، والتوازن مستلقياً، وأساسيات الوقوف."
  },
  "Imi Ouaddar Beach & Banana Beach": {
    "fr": "Plage d’Imi Ouaddar et Banana Beach",
    "ar": "شاطئ إيمي وادار وشاطئ بانانا"
  },
  "8'0 - 9'0 Soft-top foam boards": {
    "fr": "Planches en mousse de 8'0 à 9'0",
    "ar": "ألواح إسفنجية من 8'0 إلى 9'0"
  },
  "Surf Lessons & Stay": {
    "fr": "Cours de surf et séjour",
    "ar": "دروس أمواج وإقامة"
  },
  "Beginner": {
    "fr": "Débutant",
    "ar": "مبتدئ"
  },
  "Beginner: White Water Rider": {
    "fr": "Débutant : glisse dans la mousse",
    "ar": "مبتدئ: راكب المياه البيضاء"
  },
  "Comfortable in the whitewash, can stand reliably on small rolling foam. Focus on building paddle stamina, reading incoming white-water reform, and trimming across gentle rollers.": {
    "fr": "À l’aise dans la mousse, vous tenez debout régulièrement. Travaillez l’endurance à la rame, la lecture des vagues et la glisse sur de petites vagues.",
    "ar": "مرتاح في المياه البيضاء وتقف بثبات على الأمواج الصغيرة. ركّز على تحمّل التجديف وقراءة الأمواج والانزلاق عليها."
  },
  "Whitewater trimming, paddling stamina, catching rolling swell alone.": {
    "fr": "Glisse dans la mousse, endurance à la rame et prise de vagues autonome.",
    "ar": "الانزلاق في المياه البيضاء، وتحمّل التجديف، والتقاط الأمواج منفرداً."
  },
  "Panoramas & Anza Beach Break": {
    "fr": "Panoramas et plage d’Anza",
    "ar": "بانوراما وشاطئ أنزا"
  },
  "7'6 - 8'4 High volume epoxy/soft hybrid": {
    "fr": "Planches hybrides époxy/mousse à grand volume de 7'6 à 8'4",
    "ar": "ألواح هجينة إيبوكسي/إسفنجية كبيرة الحجم من 7'6 إلى 8'4"
  },
  "Improver": {
    "fr": "En progression",
    "ar": "في طور التحسن"
  },
  "Improver: Catching Green Waves": {
    "fr": "En progression : prendre des vagues vertes",
    "ar": "متحسن: التقاط الأمواج الخضراء"
  },
  "Paddling outside the break to catch unbroken waist-high green waves. Focus on angled take-offs, bottom turns, trimming across the wave face, and managing ocean currents.": {
    "fr": "Vous ramez au large pour prendre des vagues non déferlées à hauteur de taille. Travaillez les départs en angle, virages en bas de vague, trajectoires et courants.",
    "ar": "تجدّف إلى الخارج لالتقاط أمواج غير متكسرة بارتفاع الخصر. ركّز على الانطلاق المائل، والانعطاف السفلي، والانزلاق، والتعامل مع التيارات."
  },
  "Angled take-offs, bottom turns, trimming across the wave face.": {
    "fr": "Départs en angle, virages en bas de vague et glisse sur la face.",
    "ar": "انطلاق مائل، وانعطافات سفلية، وانزلاق على وجه الموجة."
  },
  "KM 11, KM 12 & Tamri Dunes": {
    "fr": "KM 11, KM 12 et dunes de Tamri",
    "ar": "الكيلومتر 11 و12 وكثبان تامري"
  },
  "6'8 - 7'2 Midlength & Funboards": {
    "fr": "Midlengths et funboards de 6'8 à 7'2",
    "ar": "ألواح متوسطة وفن بورد من 6'8 إلى 7'2"
  },
  "Intermediate": {
    "fr": "Intermédiaire",
    "ar": "متوسط"
  },
  "Intermediate: Reef & Point Break Guiding": {
    "fr": "Intermédiaire : guidage sur récifs et point breaks",
    "ar": "متوسط: إرشاد الشعاب ونقاط تكسّر الأمواج"
  },
  "Confident on chest-to-overhead walls, navigates line-ups safely. Focus on generating speed down the line, cutbacks, duck diving safely, and reading point speed lines.": {
    "fr": "À l’aise sur des vagues de poitrine à plus haut que la tête, vous évoluez en sécurité au pic. Travaillez vitesse, cutbacks, canards et lecture des trajectoires.",
    "ar": "واثق على أمواج من ارتفاع الصدر إلى فوق الرأس وتتحرك بأمان. ركّز على السرعة والالتفاف والغوص باللوح وقراءة المسارات."
  },
  "Generating speed, cutbacks, duck diving, reading point speed lines.": {
    "fr": "Vitesse, cutbacks, canards et lecture des trajectoires.",
    "ar": "توليد السرعة، والالتفاف، والغوص باللوح، وقراءة مسارات الأمواج."
  },
  "Anchor Point, Hash Point, Mysteries": {
    "fr": "Anchor Point, Hash Point, Mysteries",
    "ar": "أنكور بوينت، هاش بوينت، ميستريز"
  },
  "5'10 - 6'4 Shortboard & Retro Fish": {
    "fr": "Shortboards et fish rétro de 5'10 à 6'4",
    "ar": "ألواح قصيرة وفيش كلاسيكية من 5'10 إلى 6'4"
  },
  "Advanced": {
    "fr": "Avancé",
    "ar": "متقدم"
  },
  "Advanced: Heavy Points & Swell Chasing": {
    "fr": "Avancé : grosses vagues et chasse à la houle",
    "ar": "متقدم: أمواج قوية ومطاردة الموج"
  },
  "Charging heavy reef points like Anchor, Killer Point, or Boilers. Focus on deep barrel positioning, critical top turns, high-line speed generation, and navigating hollow Atlantic slabs.": {
    "fr": "Vous surfez les puissants récifs d’Anchor, Killer Point ou Boilers. Travaillez le placement dans le tube, les virages au sommet et la vitesse sur les vagues creuses.",
    "ar": "تركب أمواج الشعاب القوية مثل أنكور وكيلر وبويلرز. ركّز على التموضع داخل الأنبوب، والانعطاف العلوي، والسرعة، والأمواج الأطلسية المجوفة."
  },
  "Deep barrel positioning, high-line speed generation, critical lip turns.": {
    "fr": "Placement dans le tube, vitesse en haut de vague et virages sur la lèvre.",
    "ar": "التموضع العميق في الأنبوب، وتوليد السرعة عالياً، والانعطاف على حافة الموجة."
  },
  "Boilers, Dracula, Desert Point, Killer Point": {
    "fr": "Boilers, Dracula, Desert Point, Killer Point",
    "ar": "بويلرز، دراكولا، ديزرت بوينت، كيلر بوينت"
  },
  "Step-ups, Guns, High performance PU blades": {
    "fr": "Step-ups, guns et planches PU haute performance",
    "ar": "ألواح ستيب أب وغانز وألواح PU عالية الأداء"
  },
  "Advanced Guiding Safaris": {
    "fr": "Safaris guidés de niveau avancé",
    "ar": "رحلات إرشاد متقدمة"
  },
  "Beginner to Improver": {
    "fr": "Débutant à en progression",
    "ar": "من مبتدئ إلى متحسن"
  },
  "The Academy": {
    "fr": "L’école",
    "ar": "الأكاديمية"
  },
  "ISA-certified guidance with a strict 1:4 instructor ratio. Focus on paddle mechanics, wave assessment, priority rules, and effortless pop-ups.": {
    "fr": "Encadrement ISA avec 1 moniteur pour 4 élèves. Rame, lecture des vagues, priorités et redressements fluides.",
    "ar": "إرشاد معتمد من ISA بمدرب لكل 4، يركز على التجديف وتقييم الموجة وقواعد الأولوية والوقوف السلس."
  },
  "2 x 2-hour water sessions daily": {
    "fr": "2 sessions de 2 h dans l’eau par jour",
    "ar": "جلستان مائيتان يومياً، كل منهما ساعتان"
  },
  "Foamies, torq hardboards & wetsuits included": {
    "fr": "Planches mousse, Torq rigides et combinaisons incluses",
    "ar": "ألواح إسفنجية وصلبة من Torq وبدلات مشمولة"
  },
  "Intermediate & Pro": {
    "fr": "Intermédiaire et pro",
    "ar": "متوسط ومحترف"
  },
  "Point Expeditions": {
    "fr": "Expéditions sur les point breaks",
    "ar": "رحلات نقاط الأمواج"
  },
  "Local knowledge unlocks secret reefs and tide windows without the crowds. Morning spot checks from Anchor Point to Boilers and Mysteries.": {
    "fr": "L’expertise locale révèle récifs secrets et bons créneaux sans foule. Repérages matinaux d’Anchor Point à Boilers et Mysteries.",
    "ar": "الخبرة المحلية تكشف الشعاب السرية وأوقات المد بعيداً عن الازدحام، مع استكشاف صباحي من أنكور إلى بويلرز وميستريز."
  },
  "4x4 coastal transport to optimum break": {
    "fr": "Transport côtier en 4x4 vers le meilleur spot",
    "ar": "نقل ساحلي بدفع رباعي لأفضل موقع"
  },
  "In-depth hazard, current & entry briefings": {
    "fr": "Briefings détaillés sur les dangers, courants et mises à l’eau",
    "ar": "إحاطات مفصلة عن المخاطر والتيارات والدخول"
  },
  "All-Inclusive": {
    "fr": "Tout compris",
    "ar": "شامل"
  },
  "Seamless Retreat": {
    "fr": "Séjour sans souci",
    "ar": "إقامة مريحة متكاملة"
  },
  "The quintessential Blue Wave rhythm. Ocean-view lodge rooms, hearty farm-to-table coastal breakfasts, beach picnics, and round-the-clock surf mentoring.": {
    "fr": "Le rythme Blue Wave : chambres vue mer, petits-déjeuners locaux copieux, pique-niques sur la plage et accompagnement surf permanent.",
    "ar": "إيقاع Blue Wave الأصيل: غرف بحرية، وإفطار محلي غني، ونزهات شاطئية، وإرشاد أمواج مستمر."
  },
  "Ensuite suite with private sun terrace": {
    "fr": "Suite avec salle de bain et terrasse privée",
    "ar": "جناح بحمام وشرفة شمسية خاصة"
  },
  "Full board + seasonal tajine dinners": {
    "fr": "Pension complète et tajines de saison",
    "ar": "إقامة كاملة وعشاء طواجن موسمية"
  },
  "Mind & Body": {
    "fr": "Corps et esprit",
    "ar": "الجسم والعقل"
  },
  "Equilibrium": {
    "fr": "Équilibre",
    "ar": "توازن"
  },
  "Balance intense ocean paddling with targeted fascial release. Sunrise dynamic vinyasa to activate paddle muscles, sunset yin yoga to restore shoulders and hips.": {
    "fr": "Équilibrez la rame et la détente musculaire. Vinyasa dynamique à l’aube pour activer les muscles, Yin au couchant pour récupérer épaules et hanches.",
    "ar": "وازن بين التجديف المكثف وإرخاء العضلات: فينياسا نشطة عند الشروق ويوغا يِن عند الغروب لاستعادة الكتفين والوركين."
  },
  "Rooftop shala with unobstructed ocean vistas": {
    "fr": "Shala sur le toit avec vue dégagée sur l’océan",
    "ar": "قاعة يوغا على السطح بإطلالة مفتوحة على المحيط"
  },
  "Breathwork for lung capacity & wipeout calm": {
    "fr": "Respiration pour la capacité pulmonaire et le calme lors des chutes",
    "ar": "تمارين تنفس لسعة الرئتين والهدوء عند السقوط"
  },
  "Equipment & Quiver": {
    "fr": "Matériel et planches",
    "ar": "المعدات والألواح"
  },
  "Board Room": {
    "fr": "Salle des planches",
    "ar": "غرفة الألواح"
  },
  "Premium Gear": {
    "fr": "Matériel haut de gamme",
    "ar": "معدات مميزة"
  },
  "Over 70 high-end craft available to swap as swells change: Channel Islands, Pyzel, McTavish single-fins, Softech learner boards, and 4/3mm Rip Curl steamers.": {
    "fr": "Plus de 70 planches à échanger selon la houle : Channel Islands, Pyzel, McTavish single-fin, Softech débutant et combinaisons Rip Curl 4/3 mm.",
    "ar": "أكثر من 70 لوحاً مميزاً للتبديل حسب الموج: Channel Islands وPyzel وMcTavish وSoftech، وبدلات Rip Curl مقاس 4/3 مم."
  },
  "Free board exchanges whenever conditions shift": {
    "fr": "Échanges gratuits dès que les conditions changent",
    "ar": "تبديل مجاني للألواح عند تغير الظروف"
  },
  "Eco-wax, leashes, fins & travel booties provided": {
    "fr": "Wax écologique, leashs, dérives et chaussons fournis",
    "ar": "شمع بيئي وأربطة وزعانف وأحذية مائية متوفرة"
  },
  "Surf Safari Trips": {
    "fr": "Safaris surf",
    "ar": "رحلات سفاري الأمواج"
  },
  "Coastal Journey": {
    "fr": "Voyage côtier",
    "ar": "رحلة ساحلية"
  },
  "Desert Swells": {
    "fr": "Houle du désert",
    "ar": "أمواج الصحراء"
  },
  "Full-day excursions to Imsouane Magic Bay (the longest wave in Africa), secret empty peaks in Tamri dunes, and coastal fish barbecues straight off wooden fishing skiffs.": {
    "fr": "Excursions d’une journée à Imsouane, la plus longue vague d’Afrique, aux spots secrets de Tamri, avec grillades de poisson fraîchement débarqué.",
    "ar": "رحلات يوم كامل إلى خليج إمسوان، أطول موجة في أفريقيا، ومواقع تامري الخفية، مع شواء أسماك طازجة من قوارب الصيد."
  },
  "Scenic drives through argan valleys & cliffs": {
    "fr": "Routes panoramiques entre vallées d’arganiers et falaises",
    "ar": "جولات خلابة عبر أودية الأركان والجروف"
  },
  "Fresh grilled fish harbor lunch included": {
    "fr": "Déjeuner de poisson grillé au port inclus",
    "ar": "غداء سمك مشوي طازج بالميناء مشمول"
  },
  "Afternoon Swell Watch": {
    "fr": "Observation des vagues l’après-midi",
    "ar": "مراقبة أمواج العصر"
  },
  "The Pool Terrace": {
    "fr": "La terrasse piscine",
    "ar": "شرفة المسبح"
  },
  "Morning Lines": {
    "fr": "Vagues du matin",
    "ar": "أمواج الصباح"
  },
  "Ocean Balcony": {
    "fr": "Balcon sur l’océan",
    "ar": "شرفة المحيط"
  },
  "Suites": {
    "fr": "Suites",
    "ar": "أجنحة"
  },
  "Berber Mint Ritual": {
    "fr": "Rituel berbère du thé à la menthe",
    "ar": "طقوس النعناع الأمازيغية"
  },
  "Hospitality": {
    "fr": "Hospitalité",
    "ar": "الضيافة"
  },
  "Curated Board Quiver": {
    "fr": "Sélection de planches",
    "ar": "مجموعة ألواح مختارة"
  },
  "Surf Club": {
    "fr": "Club de surf",
    "ar": "نادي الأمواج"
  },
  "Blue Wave Lodge completely changed my perspective on surf camps. It feels like a high-end boutique riad perched on the Atlantic. The coaching team got me catching green waves by day 3!": {
    "fr": "Blue Wave Lodge a changé ma vision des surf camps. Un riad de charme haut de gamme sur l’Atlantique. Grâce aux moniteurs, je prenais des vagues vertes dès le troisième jour !",
    "ar": "غيّر Blue Wave Lodge نظرتي لمخيمات الأمواج. كأنه رياض فاخر على الأطلسي. بفضل المدربين، التقطت الأمواج الخضراء في اليوم الثالث!"
  },
  "Munich, Germany": {
    "fr": "Munich, Allemagne",
    "ar": "ميونخ، ألمانيا"
  },
  "The pool looking over the sunset while drinking freshly brewed mint tea is an experience I will never forget. The staff treats you like family from the minute you step through the wooden doors.": {
    "fr": "Le coucher de soleil à la piscine avec un thé à la menthe frais est inoubliable. L’équipe vous accueille comme un membre de la famille dès votre arrivée.",
    "ar": "مشاهدة الغروب من المسبح مع شاي النعناع الطازج تجربة لن أنساها. يعاملك الفريق كأحد أفراد العائلة منذ دخولك."
  },
  "Bordeaux, France": {
    "fr": "Bordeaux, France",
    "ar": "بوردو، فرنسا"
  },
  "Unbelievable surf guiding. Having local guides who know every tide nuance at Tamri and Killer Point meant we had uncrowded sessions every single morning. We are already booking our return.": {
    "fr": "Un guidage exceptionnel. Les guides connaissent chaque détail des marées à Tamri et Killer Point : des sessions sans foule tous les matins. Nous réservons déjà notre retour.",
    "ar": "إرشاد مذهل. يعرف المرشدون المحليون تفاصيل المد في تامري وكيلر بوينت، فاستمتعنا بجلسات هادئة كل صباح. نحجز عودتنا بالفعل."
  },
  "London, UK": {
    "fr": "Londres, Royaume-Uni",
    "ar": "لندن، المملكة المتحدة"
  },
  "Surf Coaching Week": {
    "fr": "Semaine de coaching surf",
    "ar": "أسبوع تدريب أمواج"
  },
  "Imi Ouaddar Beach Break": {
    "fr": "Spot de plage d’Imi Ouaddar",
    "ar": "أمواج شاطئ إيمي وادار"
  },
  "Right at our doorstep": {
    "fr": "Juste devant le lodge",
    "ar": "أمام بابنا مباشرة"
  },
  "Gentle sandy bottom beach break perfect for first-timers, kids, and playful sunset longboard cruisers.": {
    "fr": "Vagues douces sur fond sableux, idéales pour débutants, enfants et longboard au couchant.",
    "ar": "أمواج لطيفة على قاع رملي، مثالية للمبتدئين والأطفال ومحبي الألواح الطويلة عند الغروب."
  },
  "Anchor Point & Killer Point": {
    "fr": "Anchor Point et Killer Point",
    "ar": "أنكور بوينت وكيلر بوينت"
  },
  "12 mins South": {
    "fr": "12 min au sud",
    "ar": "12 دقيقة جنوباً"
  },
  "World-renowned right-hand point breaks offering 500-meter rides, fast barrel sections, and powerful Atlantic walls.": {
    "fr": "Droites mondialement connues, offrant 500 mètres de glisse, tubes rapides et vagues atlantiques puissantes.",
    "ar": "أمواج يمنى عالمية تتيح ركوباً لمسافة 500 متر، وأنابيب سريعة، وجدراناً أطلسية قوية."
  },
  "Imsouane Bay (The Bay)": {
    "fr": "Baie d’Imsouane (La Baie)",
    "ar": "خليج إمسوان"
  },
  "45 mins North": {
    "fr": "45 min au nord",
    "ar": "45 دقيقة شمالاً"
  },
  "Legendary 2-minute leg-burning rides curling into a calm fishing cove. Pure heaven for retro twin-fins and classic single-fin logs.": {
    "fr": "Glisses légendaires de deux minutes dans une crique de pêche paisible. Le paradis des twin-fins rétro et longboards classiques.",
    "ar": "ركوب أسطوري لدقيقتين ينتهي في خليج صيد هادئ، جنة للألواح الكلاسيكية مزدوجة أو أحادية الزعنفة."
  },
  "Panoramic Rooftop Shala": {
    "fr": "Shala panoramique sur le toit",
    "ar": "قاعة يوغا بانورامية على السطح"
  },
  "Elevated yoga shala and social sunset lounge with views stretching towards Taghazout Bay.": {
    "fr": "Shala de yoga et salon convivial au couchant avec vue sur la baie de Taghazout.",
    "ar": "قاعة يوغا مرتفعة وصالة اجتماعية عند الغروب بإطلالات نحو خليج تغازوت."
  },
  "Ocean Restaurant": {
    "fr": "Restaurant de l’océan",
    "ar": "مطعم المحيط"
  },
  "Daily chef-crafted breakfasts, catch-of-the-day fish barbecues, and spiced vegetable tagines.": {
    "fr": "Petits-déjeuners du chef, grillades de poisson du jour et tajines de légumes épicés.",
    "ar": "إفطار يومي من إعداد الطاهي، وشواء صيد اليوم، وطواجن خضار متبلة."
  },
  "Heated Infinity Pool": {
    "fr": "Piscine à débordement chauffée",
    "ar": "مسبح لا متناهٍ مدفأ"
  },
  "Year-round comfortable swim sessions overlooking the Atlantic swells with poolside towel service.": {
    "fr": "Baignades agréables toute l’année face aux vagues, avec service de serviettes au bord de la piscine.",
    "ar": "سباحة مريحة طوال العام تطل على أمواج الأطلسي مع خدمة مناشف بجوار المسبح."
  },
  "Coastal 4x4 Excursions": {
    "fr": "Excursions côtières en 4x4",
    "ar": "رحلات ساحلية بالدفع الرباعي"
  },
  "Guided trips to Paradise Valley natural pools, Tamri sandboarding dunes, and Essaouira argan cooperatives.": {
    "fr": "Sorties guidées aux piscines naturelles de Paradise Valley, dunes de Tamri et coopératives d’argan d’Essaouira.",
    "ar": "رحلات مرشدة إلى مسابح وادي الجنة الطبيعية، وكثبان تامري للتزلج، وتعاونيات أركان الصويرة."
  },
  "Private terrace with unobstructed view of Imi Ouaddar point break": {
    "fr": "Terrasse privée avec vue dégagée sur le spot d’Imi Ouaddar",
    "ar": "شرفة خاصة بإطلالة مفتوحة على أمواج إيمي وادار"
  },
  "Close up of private balcony with Atlantic surf breaking and morning coffee setup": {
    "fr": "Balcon privé avec vue sur les vagues et café du matin",
    "ar": "شرفة خاصة مع أمواج الأطلسي وتجهيز قهوة الصباح"
  },
  "Artisanal bathroom with handcrafted emerald Moroccan zellige tile and walk-in rain shower": {
    "fr": "Salle de bain artisanale en zellige émeraude avec douche pluie à l’italienne",
    "ar": "حمام حرفي بزليج مغربي زمردي يدوي ودش مطري مفتوح"
  },
  "King bed with organic unbleached linen, cedar wood headboard, and bedside reading sconces": {
    "fr": "Lit king size avec linge bio écru, tête de lit en cèdre et liseuses",
    "ar": "سرير كبير ببياضات عضوية غير مبيضة ولوح أرز ومصابيح قراءة"
  },
  "Dedicated surfboard rack and wetsuit drying corner located inside the private hallway": {
    "fr": "Râtelier à planches et espace de séchage des combinaisons dans le couloir privé",
    "ar": "حامل ألواح وركن تجفيف بدلات في الممر الخاص"
  },
  "When is the best time of year to surf in Morocco?": {
    "fr": "Quelle est la meilleure période pour surfer au Maroc ?",
    "ar": "ما أفضل وقت لركوب الأمواج في المغرب؟"
  },
  "Morocco delivers year-round surf. September through April welcomes potent North Atlantic groundswells creating world-class point breaks for improvers and advanced surfers. May through August brings gentle, glassy beach waves and 30°C sunny days, ideal for beginners, longboarders, and families.": {
    "fr": "On surfe toute l’année au Maroc. De septembre à avril, la puissante houle nord-atlantique offre des point breaks de classe mondiale aux surfeurs en progression et avancés. De mai à août, vagues douces et journées ensoleillées à 30 °C conviennent aux débutants, longboardeurs et familles.",
    "ar": "يمكن ركوب الأمواج طوال العام في المغرب. من سبتمبر إلى أبريل تأتي أمواج شمال الأطلسي القوية المناسبة للمتحسنين والمتقدمين. ومن مايو إلى أغسطس تكون الأمواج لطيفة والأيام مشمسة بحرارة 30°م، مثالية للمبتدئين والألواح الطويلة والعائلات."
  },
  "Do I need to bring my own wetsuit and surfboard?": {
    "fr": "Dois-je apporter ma combinaison et ma planche ?",
    "ar": "هل أحتاج لإحضار بدلتي ولوحي؟"
  },
  "Not unless you prefer your custom equipment. Blue Wave maintains a premium quiver of over 70 boards—from soft-tops for safety to Torqs, fishes, and performance shortboards—as well as freshly sanitized 3/2mm and 4/3mm Rip Curl and Billabong wetsuits. All rentals are included in our retreat packages.": {
    "fr": "Seulement si vous préférez votre matériel. Nous disposons de plus de 70 planches, des mousses aux Torq, fish et shortboards, ainsi que de combinaisons Rip Curl et Billabong 3/2 et 4/3 mm désinfectées. Les locations sont incluses dans nos forfaits.",
    "ar": "فقط إذا كنت تفضل معداتك. لدينا أكثر من 70 لوحاً، من الإسفنجية إلى Torq وفيش والألواح القصيرة، وبدلات Rip Curl وBillabong المعقمة مقاس 3/2 و4/3 مم. جميع الإيجارات مشمولة في الباقات."
  },
  "What is the water temperature in Taghazout and Imi Ouaddar?": {
    "fr": "Quelle est la température de l’eau à Taghazout et Imi Ouaddar ?",
    "ar": "ما درجة حرارة الماء في تغازوت وإيمي وادار؟"
  },
  "Atlantic water temps range between 17°C to 19°C in the winter (requiring a 3/2mm or 4/3mm full suit) and 20°C to 22°C during the late spring and summer months (suitable for a shorty or light 2mm suit).": {
    "fr": "L’eau varie de 17 à 19 °C en hiver (combinaison intégrale 3/2 ou 4/3 mm) et de 20 à 22 °C à la fin du printemps et en été (shorty ou combinaison légère de 2 mm).",
    "ar": "تتراوح حرارة الأطلسي بين 17 و19°م شتاءً (بدلة كاملة 3/2 أو 4/3 مم)، وبين 20 و22°م أواخر الربيع والصيف (بدلة قصيرة أو خفيفة 2 مم)."
  },
  "Can non-surfers or partners join the lodge retreats?": {
    "fr": "Les non-surfeurs et accompagnants peuvent-ils venir ?",
    "ar": "هل يمكن لغير راكبي الأمواج أو المرافقين الانضمام؟"
  },
  "Absolutely. Non-surfer companions can book our sanctuary stay rates with full access to the infinity pool, oceanfront dining, yoga sessions, hammam spa treatments, and day excursions to Agadir souks and coastal hiking routes.": {
    "fr": "Bien sûr. Les accompagnants peuvent réserver un séjour avec accès à la piscine à débordement, au restaurant face à l’océan, au yoga, au hammam et aux excursions vers les souks d’Agadir et les sentiers côtiers.",
    "ar": "بالتأكيد. يمكن للمرافقين الحجز والاستمتاع بالمسبح اللامتناهي، والمطعم البحري، واليوغا، والحمام، ورحلات أسواق أكادير والمسارات الساحلية."
  },
  "Can I store my own surfboards and wetsuits securely?": {
    "fr": "Puis-je ranger mes planches et combinaisons en sécurité ?",
    "ar": "هل يمكن تخزين ألواحي وبدلاتي بأمان؟"
  },
  "Yes. Every Sea View room and Apartment includes an internal cedar surfboard rack. Additionally, the lodge provides an access-controlled ground-floor board locker with rinse showers, custom ventilation for quick drying wetsuits, and ding repair supplies.": {
    "fr": "Oui. Chaque chambre vue mer et appartement possède un râtelier en cèdre. Un local sécurisé au rez-de-chaussée offre aussi des douches de rinçage, une ventilation pour sécher les combinaisons et du matériel de réparation.",
    "ar": "نعم. تضم كل غرفة بحرية وشقة حاملاً داخلياً من الأرز. ويوفر النزل مخزناً مؤمناً في الطابق الأرضي مع دش للشطف وتهوية لتجفيف البدلات ومستلزمات إصلاح الألواح."
  },
  "How does airport transfer from Agadir Al Massira (AGA) work?": {
    "fr": "Comment se déroule le transfert depuis Agadir Al Massira (AGA) ?",
    "ar": "كيف يعمل النقل من مطار أكادير المسيرة (AGA)؟"
  },
  "We provide direct private Mercedes Vito shuttle transfers from Agadir Airport (approx. 50 minutes along the scenic coast road). Our driver waits with your name sign in arrivals. You can select this add-on during booking or coordinate via our WhatsApp concierge anytime prior to arrival.": {
    "fr": "Nous assurons un transfert privé en Mercedes Vito depuis l’aéroport d’Agadir, environ 50 minutes par la route côtière. Le chauffeur vous attend avec votre nom aux arrivées. Ajoutez cette option à la réservation ou contactez notre conciergerie WhatsApp avant votre arrivée.",
    "ar": "نوفر نقلاً خاصاً مباشراً بسيارة مرسيدس فيتو من مطار أكادير، حوالي 50 دقيقة على الطريق الساحلي. ينتظرك السائق بلافتة اسمك عند الوصول. أضف الخدمة أثناء الحجز أو نسّق عبر واتساب قبل وصولك."
  },
  "Best Rate Direct Guarantee": {
    "fr": "Meilleur tarif garanti en direct",
    "ar": "ضمان أفضل سعر للحجز المباشر"
  },
  "King Size": {
    "fr": "King size",
    "ar": "سرير كبير"
  },
  "Ocean Vista": {
    "fr": "Vue sur l’océan",
    "ar": "إطلالة على المحيط"
  },
  "Ensuite Plaster Bath": {
    "fr": "Salle de bain privée en enduit",
    "ar": "حمام خاص بالجص"
  },
  "Board Storage": {
    "fr": "Rangement des planches",
    "ar": "تخزين الألواح"
  },
  "Only 2 left for your dates": {
    "fr": "Plus que 2 pour vos dates",
    "ar": "متبقيتان فقط لتواريخك"
  },
  "Step to Water": {
    "fr": "Accès direct à l’eau",
    "ar": "خطوات إلى الماء"
  },
  "270° Vista": {
    "fr": "Vue à 270°",
    "ar": "إطلالة 270 درجة"
  },
  "Fire Hearth": {
    "fr": "Cheminée",
    "ar": "مدفأة"
  },
  "Up to 4 Guests": {
    "fr": "Jusqu’à 4 voyageurs",
    "ar": "حتى 4 ضيوف"
  },
  "Encrypted": {
    "fr": "Chiffré",
    "ar": "مشفّر"
  },
  "Curated Rooms": {
    "fr": "Chambres sélectionnées",
    "ar": "غرف مختارة"
  },
  "ISA Coaching": {
    "fr": "Coaching ISA",
    "ar": "تدريب ISA"
  },
  "Oceanfront Infinity Pool": {
    "fr": "Piscine à débordement face à l’océan",
    "ar": "مسبح لا متناهٍ على المحيط"
  },
  "Ocean Gastronomy": {
    "fr": "Gastronomie de l’océan",
    "ar": "مأكولات المحيط"
  },
  "Guests": {
    "fr": "Voyageurs",
    "ar": "الضيوف"
  },
  "Surf Package": {
    "fr": "Forfait surf",
    "ar": "باقة الأمواج"
  },
  "Water 19°C": {
    "fr": "Eau à 19 °C",
    "ar": "الماء 19°م"
  },
  "Offshore 7 kts NE": {
    "fr": "Vent de terre 7 nœuds NE",
    "ar": "رياح برية 7 عقد شمال شرق"
  },
  "Conditions: Clean Glass": {
    "fr": "Conditions : mer lisse",
    "ar": "الظروف: مياه صافية"
  },
  "Atlantic Point": {
    "fr": "Pointe atlantique",
    "ar": "النقطة الأطلسية"
  },
  "Silent Inverter A/C": {
    "fr": "Climatisation inverter silencieuse",
    "ar": "تكييف إنفرتر صامت"
  },
  "Free cancellation (14d)": {
    "fr": "Annulation gratuite (14 j)",
    "ar": "إلغاء مجاني (14 يوماً)"
  },
  "Best rate guarantee": {
    "fr": "Meilleur tarif garanti",
    "ar": "ضمان أفضل سعر"
  },
  "Stay": {
    "fr": "Séjour",
    "ar": "الإقامة"
  },
  "Surf": {
    "fr": "Surf",
    "ar": "ركوب الأمواج"
  },
  "Packages": {
    "fr": "Forfaits",
    "ar": "الباقات"
  },
  "Experiences": {
    "fr": "Expériences",
    "ar": "التجارب"
  },
  "Gallery": {
    "fr": "Galerie",
    "ar": "الصور"
  },
  "Location": {
    "fr": "Localisation",
    "ar": "الموقع"
  },
  "Subscribed!": {
    "fr": "Inscription confirmée !",
    "ar": "تم الاشتراك!"
  },
  "Subscribe": {
    "fr": "S’abonner",
    "ar": "اشترك"
  },
  "Privacy policy: Blue Wave Lodge protects all guest contact and passport details.": {
    "fr": "Confidentialité : Blue Wave Lodge protège les coordonnées et les informations de passeport de ses voyageurs.",
    "ar": "الخصوصية: يحمي Blue Wave Lodge جميع بيانات الاتصال وجوازات السفر للضيوف."
  },
  "Terms of stay: 100% refund up to 14 days before check-in. Clean surf guaranteed.": {
    "fr": "Conditions de séjour : remboursement intégral jusqu’à 14 jours avant l’arrivée. Belles vagues garanties.",
    "ar": "شروط الإقامة: استرداد كامل حتى 14 يوماً قبل الوصول. أمواج صافية مضمونة."
  },
  "Dates": {
    "fr": "Dates",
    "ar": "التواريخ"
  },
  "Room": {
    "fr": "Chambre",
    "ar": "الغرفة"
  },
  "Surf Coaching": {
    "fr": "Coaching surf",
    "ar": "تدريب الأمواج"
  },
  "Details & Request": {
    "fr": "Coordonnées et demande",
    "ar": "البيانات والطلب"
  },
  "Selected Room": {
    "fr": "Chambre sélectionnée",
    "ar": "الغرفة المختارة"
  },
  "Select": {
    "fr": "Choisir",
    "ar": "اختر"
  },
  "No Surf": {
    "fr": "Sans surf",
    "ar": "دون أمواج"
  },
  "Relax Only": {
    "fr": "Détente seule",
    "ar": "استرخاء فقط"
  },
  "Beginner Focus": {
    "fr": "Spécial débutant",
    "ar": "تركيز للمبتدئين"
  },
  "Intermediate+": {
    "fr": "Intermédiaire et plus",
    "ar": "متوسط فأعلى"
  },
  "Full Immersion": {
    "fr": "Immersion complète",
    "ar": "تجربة متكاملة"
  },
  "Holistic Flow": {
    "fr": "Bien-être global",
    "ar": "عافية متكاملة"
  },
  "Rental Only": {
    "fr": "Location seule",
    "ar": "تأجير فقط"
  },
  "Quiver Access": {
    "fr": "Accès aux planches",
    "ar": "استخدام الألواح"
  },
  "Not selected": {
    "fr": "Non sélectionné",
    "ar": "غير محدد"
  },
  "Valued Guest": {
    "fr": "Cher voyageur",
    "ar": "ضيفنا العزيز"
  },
  "Transfer •": {
    "fr": "Transfert •",
    "ar": "نقل •"
  },
  "Sunset Yoga •": {
    "fr": "Yoga au couchant •",
    "ar": "يوغا الغروب •"
  },
  "Please accept the Sanctuary Terms & Booking Policy to proceed.": {
    "fr": "Veuillez accepter les conditions de séjour et de réservation pour continuer.",
    "ar": "يرجى قبول شروط الإقامة وسياسة الحجز للمتابعة."
  },
  "Failed to send reservation. Please try again or contact us directly.": {
    "fr": "Échec de l’envoi. Réessayez ou contactez-nous directement.",
    "ar": "تعذر إرسال الحجز. يرجى المحاولة مجدداً أو التواصل معنا مباشرة."
  },
  "Level 1": {
    "fr": "Niveau 1",
    "ar": "المستوى 1"
  },
  "Level 2": {
    "fr": "Niveau 2",
    "ar": "المستوى 2"
  },
  "Level 3": {
    "fr": "Niveau 3",
    "ar": "المستوى 3"
  },
  "Level 4": {
    "fr": "Niveau 4",
    "ar": "المستوى 4"
  },
  "Level 5": {
    "fr": "Niveau 5",
    "ar": "المستوى 5"
  },
  "You have never surfed or have tried once or twice with assistance.": {
    "fr": "Vous n’avez jamais surfé ou avez essayé une ou deux fois avec de l’aide.",
    "ar": "لم تركب الأمواج من قبل أو جربتها مرة أو مرتين بمساعدة."
  },
  "Comfortable in the whitewash, can stand reliably on small rolling foam.": {
    "fr": "À l’aise dans la mousse, vous tenez debout régulièrement sur de petites vagues.",
    "ar": "مرتاح في المياه البيضاء ويمكنك الوقوف بثبات على أمواج صغيرة."
  },
  "Paddling outside the break to catch unbroken waist-high green waves.": {
    "fr": "Vous ramez au large pour prendre des vagues non déferlées à hauteur de taille.",
    "ar": "تجدّف خارج منطقة التكسّر لالتقاط أمواج خضراء بارتفاع الخصر."
  },
  "Confident on chest-to-overhead walls, navigates line-ups safely.": {
    "fr": "À l’aise sur des vagues de poitrine à plus haut que la tête, vous évoluez en sécurité au pic.",
    "ar": "واثق على أمواج من الصدر إلى فوق الرأس وتتنقل بأمان بين الراكبين."
  },
  "Charging heavy reef points like Anchor, Killer Point, or Boilers.": {
    "fr": "Vous surfez les puissants récifs d’Anchor, Killer Point ou Boilers.",
    "ar": "تركب أمواج الشعاب القوية مثل أنكور وكيلر بوينت وبويلرز."
  },
  "All Accommodations (9)": {
    "fr": "Tous les hébergements (9)",
    "ar": "جميع أماكن الإقامة (9)"
  },
  "Sea View": {
    "fr": "Vue mer",
    "ar": "إطلالة بحرية"
  },
  "Pool & Garden": {
    "fr": "Piscine et jardin",
    "ar": "المسبح والحديقة"
  },
  "Apartments": {
    "fr": "Appartements",
    "ar": "الشقق"
  },
  "Couples": {
    "fr": "Couples",
    "ar": "الأزواج"
  },
  "Groups & Families": {
    "fr": "Groupes et familles",
    "ar": "المجموعات والعائلات"
  },
  "300 Mbps Fiber WiFi": {
    "fr": "Wi-Fi fibre 300 Mbit/s",
    "ar": "واي فاي ألياف 300 ميغابت/ثانية"
  },
  "Organic Argan Toiletries": {
    "fr": "Produits de toilette à l’argan bio",
    "ar": "مستلزمات استحمام بأركان عضوي"
  },
  "Private Board Storage": {
    "fr": "Rangement privé des planches",
    "ar": "تخزين خاص للألواح"
  },
  "Espresso & Berber Tea Bar": {
    "fr": "Bar à espresso et thé berbère",
    "ar": "ركن إسبريسو وشاي أمازيغي"
  },
  "Daily Eco Housekeeping": {
    "fr": "Ménage écologique quotidien",
    "ar": "تنظيف بيئي يومي"
  },
  "Laptop Security Safe": {
    "fr": "Coffre pour ordinateur portable",
    "ar": "خزنة للحاسوب المحمول"
  },
  "all": {
    "fr": "tout",
    "ar": "الكل"
  },
  "surf": {
    "fr": "surf",
    "ar": "الأمواج"
  },
  "rooms": {
    "fr": "chambres",
    "ar": "الغرف"
  },
  "pool": {
    "fr": "piscine",
    "ar": "المسبح"
  },
  "lifestyle": {
    "fr": "art de vivre",
    "ar": "نمط الحياة"
  },
  "Salam! Marhaban. I am Yassine, Head Surf Concierge at Blue Wave Lodge. How can I help customize your Taghazout Bay stay today?": {
    "fr": "Salam ! Marhaban. Je suis Yassine, responsable de la conciergerie surf de Blue Wave Lodge. Comment personnaliser votre séjour dans la baie de Taghazout ?",
    "ar": "سلام! مرحباً. أنا ياسين، مسؤول خدمات الأمواج في Blue Wave Lodge. كيف أساعدك في تخصيص إقامتك في خليج تغازوت؟"
  },
  "Thank you! Anchor Point is peeling with a clean 1.8m swell this morning. I will note your request and you can also reach us directly via WhatsApp at +212 661 000 000.": {
    "fr": "Merci ! Anchor Point offre de belles vagues de 1,8 m ce matin. Je note votre demande. Vous pouvez aussi nous joindre sur WhatsApp au +212 661 000 000.",
    "ar": "شكراً! أمواج أنكور بوينت صافية بارتفاع 1.8 م هذا الصباح. سأدوّن طلبك، ويمكنك التواصل عبر واتساب على +212 661 000 000."
  },
  "Our Sea View Balcony Rooms are 94% booked for this week, but we have availability for next week! You can book directly with 14-day free cancellation.": {
    "fr": "Nos chambres avec balcon vue mer sont réservées à 94 % cette semaine, mais il reste des places la semaine prochaine ! Réservez directement avec annulation gratuite jusqu’à 14 jours avant l’arrivée.",
    "ar": "غرف الشرفة البحرية محجوزة بنسبة 94٪ هذا الأسبوع، ولدينا توافر للأسبوع القادم! احجز مباشرة مع إلغاء مجاني حتى 14 يوماً قبل الوصول."
  },
  "Our beginner surf lessons take place directly at Imi Ouaddar sandy beach break right in front of the lodge gates with a 1:4 instructor ratio!": {
    "fr": "Nos cours débutants se déroulent sur la plage de sable d’Imi Ouaddar, juste devant le lodge, avec 1 moniteur pour 4 élèves !",
    "ar": "دروس المبتدئين على شاطئ إيمي وادار الرملي أمام النزل مباشرة، بمدرب لكل 4 متدربين!"
  },
  "What is the swell forecast today?": {
    "fr": "Quelles sont les prévisions de houle aujourd’hui ?",
    "ar": "ما توقعات الأمواج اليوم؟"
  },
  "Can I arrange airport transfer?": {
    "fr": "Puis-je organiser un transfert aéroport ?",
    "ar": "هل يمكنني ترتيب نقل من المطار؟"
  },
  "Do you have boards for beginners?": {
    "fr": "Avez-vous des planches pour débutants ?",
    "ar": "هل لديكم ألواح للمبتدئين؟"
  },
  "Opening navigation coordinates: 30.6032° N, 9.8241° W (Plage Imi Ouaddar)": {
    "fr": "Ouverture des coordonnées : 30,6032° N, 9,8241° O (plage Imi Ouaddar)",
    "ar": "فتح إحداثيات الموقع: 30.6032° شمالاً، 9.8241° غرباً (شاطئ إيمي وادار)"
  },
  "Opening Google Maps navigation to Blue Wave Lodge HQ, Imi Ouaddar": {
    "fr": "Ouverture de l’itinéraire Google Maps vers Blue Wave Lodge, Imi Ouaddar",
    "ar": "فتح اتجاهات خرائط Google إلى Blue Wave Lodge، إيمي وادار"
  }
} as const;

export type TranslationKey = keyof typeof messages;
type Catalog = Record<TranslationKey, string>;

export const translations: Record<Language, Catalog> = {
  en: Object.fromEntries(Object.keys(messages).map(key => [key, key])) as Catalog,
  fr: Object.fromEntries(Object.entries(messages).map(([key, value]) => [key, value.fr])) as Catalog,
  ar: Object.fromEntries(Object.entries(messages).map(([key, value]) => [key, value.ar])) as Catalog,
};

let contentOverrides: Record<string, Record<Language, string>> = {};
export function setContentOverrides(content: typeof contentOverrides) { contentOverrides = content; }

/** Unknown strings (for example proper names) retain their original spelling. */
export function getTranslator(language: Language) {
  return (text: string): string => {
    if (Object.hasOwn(contentOverrides, text)) return contentOverrides[text][language] || contentOverrides[text].en || text;
    if (!Object.prototype.hasOwnProperty.call(messages, text)) return text;
    return translations[language][text as TranslationKey];
  };
}

export const locales: Record<Language, string> = { en: 'en-GB', fr: 'fr-FR', ar: 'ar-MA' };

export function formatDate(value: string, language: Language): string {
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat(locales[language]).format(date);
}
