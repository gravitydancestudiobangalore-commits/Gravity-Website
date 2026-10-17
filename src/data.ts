// All site content lives here. Edit this file to change text, timings, fees or photos.

export const PHONE_DISPLAY = '+91 78925 87219';
export const PHONES = ['78925 87219', '88677 64826', '63635 37624'];
export const TEL = 'tel:+917892587219';
export const EMAIL = 'gravitydancestudiobangalore@gmail.com';
export const waLink = (text: string) => `https://wa.me/917892587219?text=${encodeURIComponent(text)}`;
export const TRIAL_MSG = 'Hello Gravity Dance Academy! I would like to book a free demo class.';

export const RATING = 4.9;
export const REVIEWS = 312;
export const HOURS = '6:30 AM – 9:30 PM';
export const SINCE = 2018;

export const SOCIAL = {
  instagram: 'https://www.instagram.com/gravity_dance_academy/',
  instagramHandle: '@gravity_dance_academy',
  instagramFollowers: '58K',
  instagramPosts: '890+',
  youtube: 'https://www.youtube.com/@gravity_dance_01',
  youtubeHandle: '@gravity_dance_01',
};

const map = (q: string) => ({
  embed: `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`,
});

export const BRANCHES = {
  rajajinagar: {
    id: 'rajajinagar',
    name: 'Rajajinagar',
    tag: 'Branch 1 · since 2018',
    address: 'Ground Floor, #2930/15, 2nd Cross Rd, D-Block, 2nd Stage, Rajajinagar, Bengaluru 560010',
    landmark: 'Behind Mahakavi Kuvempu Road Metro Station',
    ...map('Gravity Dance Academy, 2nd Cross Rd, D-Block, 2nd Stage, Rajajinagar, Bengaluru 560010'),
  },
  hebbal: {
    id: 'hebbal',
    name: 'Hebbal',
    tag: 'Branch 2 · new',
    address: '1st Floor, BR Complex Sri Balaji, #87, Guddadahalli Main Road, Hebbal, Bengaluru 560024',
    landmark: 'Above Bank of Baroda',
    ...map('BR Complex Sri Balaji, 87, Guddadahalli Main Road, Hebbal, Bengaluru 560024'),
  },
} as const;
export type BranchId = keyof typeof BRANCHES;

// ---------- Menu (plain words + a one-line hint so anyone knows where to tap) ----------
export const NAV = [
  { label: 'Home', to: '/', icon: 'home', hint: 'Start here' },
  { label: 'Classes & Fees', to: '/classes', icon: 'clock', hint: 'Timings and fees, both branches' },
  { label: 'Achievements', to: '/achievements', icon: 'trophy', hint: 'Awards, TV shows, wins' },
  { label: 'Photos & Videos', to: '/gallery', icon: 'play', hint: 'Watch our students perform' },
  { label: 'About Shekar Master', to: '/about', icon: 'star', hint: 'Meet the founder' },
  { label: 'Branches', to: '/branches', icon: 'pin', hint: 'Rajajinagar & Hebbal, with maps' },
] as const;
export type IconName = (typeof NAV)[number]['icon'] | 'phone' | 'spark' | 'arrow';

// ---------- Classes ----------
// Fees from the owner (Oct 2026). Set SHOW_FEES = false to hide prices and show "Ask fees" buttons instead.
export const SHOW_FEES = true;
export const ADMISSION_FEE = 1500;

// fee = monthly fee in ₹. adm = one-time admission fee (₹1,500) applies.
export type Batch = { name: string; group: string; days: string; time?: string; fee?: number; adm?: boolean; note?: string };

export const BATCHES: Record<BranchId, Batch[]> = {
  rajajinagar: [
    { group: 'Western dance', name: 'Kids', days: 'Mon · Wed · Fri', time: '3:30 – 4:30 PM', fee: 2000, adm: true },
    { group: 'Western dance', name: 'Sub-junior', days: 'Mon · Wed · Fri', time: '4:30 – 5:30 PM', fee: 2000, adm: true },
    { group: 'Western dance', name: 'Junior', days: 'Mon · Wed · Fri', time: '5:30 – 6:30 PM', fee: 2000, adm: true },
    { group: 'Western dance', name: 'Junior (2nd batch)', days: 'Tue · Thu · Sat', fee: 2000, adm: true },
    { group: 'Western dance', name: 'Advanced level', days: 'Mon · Wed · Fri', fee: 2000, adm: true },
    { group: 'Western dance', name: 'Adults (morning)', days: 'Mon – Fri', time: '6:30 – 8:00 AM' },
    { group: 'Western dance', name: 'Ladies special', days: 'Mon · Wed · Fri', time: '11:00 AM – 12:30 PM' },
    { group: 'Western dance', name: 'Weekend kids', days: 'Saturday', time: '6:00 – 7:00 PM', fee: 1500, adm: true },
    { group: 'Western dance', name: 'Weekend seniors', days: 'Saturday', time: '7:00 – 8:30 PM', fee: 1500, adm: true },
    { group: 'Bharatanatyam', name: 'Beginners', days: 'Wed · Thu', time: '6:00 – 7:00 PM', fee: 1500, adm: true, note: 'With Guru Vidushi Manju Bhairavi' },
    { group: 'Bharatanatyam', name: 'Seniors', days: 'Wed · Thu', time: '7:00 – 8:00 PM', fee: 1800, adm: true, note: 'With Guru Vidushi Manju Bhairavi' },
    { group: 'Zumba', name: 'Ladies batch', days: 'Mon · Wed · Fri', time: '11:00 AM – 12:00 PM' },
    { group: 'More classes', name: 'Karate', days: 'Mon · Wed · Fri', fee: 1500, adm: true },
    { group: 'More classes', name: 'Public speaking', days: 'Tue · Thu', time: '5:00 – 6:00 PM', fee: 1500, adm: true },
  ],
  hebbal: [
    { group: 'Western dance', name: 'Kids', days: 'Mon · Wed · Fri', time: '5:30 – 6:30 PM', fee: 2000, adm: true },
    { group: 'Western dance', name: 'Junior', days: 'Mon · Wed · Fri', time: '6:30 – 7:30 PM', fee: 2000, adm: true },
    { group: 'Western dance', name: 'Kids (2nd batch)', days: 'Tue · Thu · Sat', time: '5:00 – 6:00 PM', fee: 2000, adm: true },
    { group: 'Zumba', name: 'Zumba & dance for ladies', days: 'Tue · Thu · Sat', time: '6:30 – 7:30 PM', fee: 2000 },
  ],
};

// Western dance monthly fee by classes per week (owner's pricing). Other classes use their own batch fee. Admission is extra, one-time.
export const PLANS = [
  { perWeek: 2, fee: 1500 },
  { perWeek: 3, fee: 2000 },
  { perWeek: 5, fee: 2500 },
];

export const PERKS = [
  'Free 1-day demo class for every activity',
  'Weekday and weekend batches, ages 4 to 60',
  'Training certificates',
  'Workshops and choreography for TV reality shows',
];

export const STYLES = ['Western dance', 'Hip-hop', 'Bollywood & filmy', 'Contemporary', 'Folk', 'Freestyle', 'Bharatanatyam', 'Zumba', 'Karate', 'Public speaking'];

// ---------- Images ----------
// `pos` = focus point when the photo is cropped to fit its frame (CSS object-position), e.g. '50% 20%' keeps the top.
const img = (name: string, pos = '50% 50%') => ({
  src: `/images/gravity/${name}-1280.webp`,
  srcSet: `/images/gravity/${name}-640.webp 640w, /images/gravity/${name}-1280.webp 1280w`,
  pos,
});
export type Img = ReturnType<typeof img>;

// Non-dance programmes, shown in "More than dance". Fees/timings match BATCHES above.
export const EXTRAS = [
  {
    id: 'karate',
    name: 'Karate',
    line: 'Self-defence, discipline and fitness. Students train for belts and compete for trophies.',
    who: 'Kids & teens',
    slots: [{ branch: 'Rajajinagar', days: 'Mon · Wed · Fri', time: 'Timing on request' }],
    fee: 1500,
    adm: true,
    img: img('g-karate-kids', '50% 35%'),
  },
  {
    id: 'speaking',
    name: 'Public speaking',
    line: 'Speak clearly and confidently in front of a class, a stage or an interview panel.',
    who: 'Kids & teens',
    slots: [{ branch: 'Rajajinagar', days: 'Tue · Thu', time: '5:00 – 6:00 PM' }],
    fee: 1500,
    adm: true,
  },
  {
    id: 'zumba',
    name: 'Zumba for ladies',
    line: 'Dance fitness that feels like a party: full-body workout, stress relief and fun.',
    who: 'Ladies',
    slots: [
      { branch: 'Hebbal', days: 'Tue · Thu · Sat', time: '6:30 – 7:30 PM', fee: 2000 },
      { branch: 'Rajajinagar', days: 'Mon · Wed · Fri', time: '11:00 AM – 12:00 PM' },
    ],
    fee: 2000,
    img: img('zumba-ladies', '50% 30%'),
  },
];


export const LOGO = '/images/gravity/logo-round-256.webp';
export const SHEKAR_PORTRAIT = '/images/gravity/shekar-portrait-640.webp';

export const IMAGES = {
  hero: img('ach-little-star'),
  shekar: img('shekar'),
  rajajinagarStudio: img('studio'),
  storefront: img('storefront', '50% 35%'),
  hebbalStudio: img('h-studio-1'),
  anniversary: img('anniversary'),
};

// ---------- Achievements (sources: academy posters, Instagram, public news/YouTube) ----------
export type Achievement = { title: string; detail: string; year?: string; img?: Img; highlight?: boolean };

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'Top 1 Dance Academy in Bangalore',
    detail: 'Awarded at the Karnataka Business Samrat Awards, Season 2, organised by Anyelp Group.',
    year: '2025',
    img: img('ach-business-samrat'),
    highlight: true,
  },
  {
    title: 'Dance Karnataka Dance, Zee Kannada',
    detail: 'Shekar Master was 2nd runner-up in DKD Season 1. Gravity students have since performed on the show, including DKD Super Moms.',
    img: img('ach-dkd-finale', '50% 95%'),
    highlight: true,
  },
  {
    title: 'Winners, Inter Punter Dance Competition',
    detail: 'Gravity students won the group dance category. Watch the “Chaava” Grand Finale performance in our videos.',
    year: '2026',
    img: img('ach-interpunter', '50% 30%'),
    highlight: true,
  },
  {
    title: 'Best Choreographer Award',
    detail: 'Awarded to founder Shekar Master for his stage and TV choreography.',
    img: img('ach-felicitation'),
  },
  {
    title: 'LuLu Funtura Little Star, Grand Finale',
    detail: 'Our kids’ crew performed in the Grand Finale of this talent hunt for 5–15 year olds at LuLu Mall Bengaluru.',
    img: img('ach-little-star'),
  },
  {
    title: 'Mantri Dance, Grand Finale',
    detail: 'Finalists on the big stage at Mantri Square Mall.',
    img: img('ach-mantri', '50% 18%'),
  },
  {
    title: 'On TV dance shows',
    detail: 'Our kids have performed on television dance show sets, with routines choreographed at Gravity.',
    img: img('ach-tv-champion'),
  },
  {
    title: 'Judge at 100+ competitions',
    detail: 'Shekar Master judges dance events across Bengaluru, including Engroove’26 at SIBM Bengaluru.',
    year: '2026',
    img: img('shekar', '40% 30%'),
  },
  {
    title: 'Workshop with Dharmesh Sir',
    detail: 'Students trained at the Masters of Music workshop led by choreographer Dharmesh.',
    img: img('ach-dharmesh'),
  },
];

export const STATS = [
  { value: '15+', label: 'years of Shekar Master’s experience' },
  { value: `${RATING}★`, label: `${REVIEWS} Google reviews` },
  { value: '2', label: 'branches: Rajajinagar & Hebbal' },
  { value: SOCIAL.instagramFollowers, label: 'Instagram followers' },
];

// ---------- Gallery ----------
export const PHOTOS: { img: Img; alt: string }[] = [
  { img: img('g-stage-costumes'), alt: 'Students in bright costumes performing on stage' },
  { img: img('stage-show'), alt: 'Gravity students on stage under orange spotlights at LuLu Mall' },
  { img: img('g-stage-group'), alt: 'A large Gravity group on stage after a show' },
  { img: img('g-bharatanatyam'), alt: 'A young Bharatanatyam student in costume' },
  { img: img('g-kgf-act'), alt: 'The KGF stage act with red lights and smoke' },
  { img: img('g-certificates'), alt: 'Students holding their training certificates' },
  { img: img('kids-class'), alt: 'Kids in yellow T-shirts dancing in class' },
  { img: img('g-karate-kids'), alt: 'Karate students in uniform with their belts' },
  { img: img('g-stage-crew'), alt: 'A Gravity crew on stage after a performance' },
  { img: img('g-bharatanatyam-award'), alt: 'A Bharatanatyam student with her award and certificate' },
  { img: img('g-class-fun'), alt: 'A packed class cheering in the studio' },
  { img: img('dkd-solo'), alt: 'A dancer holding a graceful pose in the studio' },
];

// YouTube clips from the academy's channel. vertical = YouTube Short.
export const VIDEOS = [
  { id: 'Z-t_vNIRwbA', title: 'Chaava · Grand Finale, Inter Punter 2026', vertical: false },
  { id: '9zgYR-gDp1Y', title: 'KGF stage performance', vertical: false },
  { id: 'bgCDp29GSZI', title: 'Rai Rai Raa Raa', vertical: true },
  { id: 'GwJSciDC9fk', title: 'Yeshanagula', vertical: true },
  { id: 'eLqN_Rt7iV0', title: 'Karuppu', vertical: true },
  { id: '4pSSuz9Zc1I', title: 'Pavazhamalli duet', vertical: true },
  { id: 'eIexya21rxQ', title: 'Amora Amora, kids’ batch', vertical: true },
  { id: 'TDX4kaetL4I', title: 'Sakku Sakku', vertical: true },
];
export const AWARD_VIDEO = { id: 'ID7uhNcEi8E', title: 'Top 1 Dance Academy award, Business Samrat 2025' };

// ---------- Hebbal ----------
export const HEBBAL_PHOTOS: { img: Img; alt: string }[] = [
  { img: img('h-studio-1'), alt: 'The new Hebbal studio: a large bright dance floor' },
  { img: img('h-ribbon'), alt: 'Ribbon cutting at the Hebbal branch opening' },
  { img: img('h-group'), alt: 'Students and families at the Hebbal studio' },
  { img: img('h-kids-cheer'), alt: 'Families and guests watching the Hebbal opening show' },
  { img: img('h-studio-2'), alt: 'Mirrored walls and lighting in the Hebbal studio' },
  { img: img('h-kids-line'), alt: 'Shekar Master and kids cheering at the Hebbal opening' },
];

export const SHEKAR = {
  name: 'Shekar Master',
  role: 'Founder & master choreographer',
  bio: 'Shekar has spent 15+ years choreographing, teaching and mentoring dancers. He started Gravity in Rajajinagar in 2018, opened the Hebbal branch two years ago, and has taken students from their first class to TV shows and big stages.',
  wins: [
    'Best Choreographer Award',
    'DKD Season 1 (Zee Kannada): 2nd runner-up',
    'Judge at 100+ dance competitions',
    'TV reality show choreographer',
    'Choreographed the KGF stage act',
  ],
  expertise: ['Western', 'Hip-hop', 'Contemporary', 'Bollywood', 'Filmy', 'Folk', 'Freestyle'],
};

export const THEMES = [
  { title: 'Stage confidence', text: 'Parents say their children now perform on any stage without fear.' },
  { title: 'Choreography they love', text: 'Shekar Master and his team are named again and again for their teaching.' },
  { title: 'Real chances to perform', text: 'Students get to perform at functions, malls and TV shows.' },
];
