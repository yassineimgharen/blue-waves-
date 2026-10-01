import { RoomItem, PackageItem, SurfLevel, GalleryItem, Testimonial } from '../types';

export const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1WvaqUVhHI2mqeOM3d3EvuycAGdj_UCVGnHaBU-IuzcuZZO4T_s0C9XwOi9VakKP8l6cwtlm59FUmaM1TJ7uhFRImFNFDfPUBd6painehduiitPyxcxXdW5YcEA1m_JYhoCc43fi45EKcWG2TcpzOzqi9krjkuGnyiPaHOhUKEhEyoLFDiEbwLaXkKI4SCsiflVqFGFSQ29bMJ-u81DGxODzbZRUInS4XySgaV99sdNbKS8g83egCkVF_4';

export const ROOMS_DATA: RoomItem[] = [
  {
    id: 'sea-view-balcony',
    name: 'Sea View Balcony Room',
    pricePerNight: 145,
    rating: 4.98,
    reviewsCount: 42,
    category: ['sea-view', 'couples'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSkMKQONIjiz3YfY9gkD8KkR-5UNeypPIslCiJUiGhbDK3d5akilNi3Q8njyfZDPnN0ZG_UGuKlRCMacb8TTkdr0wOOhohIyV1rL5G-J6fGd8olM-NQ4NqEK4moO8T96J147zuFjTlEOH7_OCfNBNTlEWSbjdKonzZJ-2aQrwfdlEe8KZ9iyp4IdUYvkV5Ehiex26YOPtlGttgMdz2X854e2OxDIXISnyMBUtf4U9MOs74anAk5NfO',
    badge: 'Guest Favorite',
    tag: 'Panoramic Ocean Front',
    description:
      'Wake to Atlantic swells breaking along the reef. Features a private cedar-railed panoramic terrace, artisanal emerald zellige rain shower, and custom Moroccan brass sconces.',
    features: ['King Size Bed', '12 m² Ocean Terrace', 'Point Break View', 'Artisanal Zellige Bath'],
    capacity: '2 Guests',
    size: '34 m² + 12 m² Balcony',
    bedType: '1 Royal King'
  },
  {
    id: 'pool-view-suite',
    name: 'Pool View Suite',
    pricePerNight: 125,
    rating: 4.92,
    reviewsCount: 36,
    category: ['pool-view', 'couples'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCPRp6XuwJRFSqVopjsmxybZoQGm5vtMooE5HPS_bNR2PjGQliOTFFUgbmmEZu-H8cUIgEeJnjBX0Y9IgbMTwosmnpE3uYbttJ3laC9XjpSq_SDwKKwJvit4pzyzkN7GJRn_unXZQjFgLdygMGruCkNMaSczf35vcn8EtxdzvtaqaKMM4Iy96FJ7ADi0maZWzE8WF-YxBDpHSmZEDifB575JI0lHmx1-roBVgWYK--N1I0eyTve11cZ',
    badge: 'Direct Garden Access',
    tag: 'Terrace Pool Access',
    description:
      'Step out straight onto the sun-warmed stone deck and plunge into the saltwater pool. Features an oversized Berber lounge nook and handcrafted daybed.',
    features: ['Terrace Pool Access', 'Moroccan Daybed', 'Garden Lounge'],
    capacity: '2 Guests',
    size: '30 m²',
    bedType: 'Queen or Twin'
  },
  {
    id: 'penthouse-ocean-apartment',
    name: 'Penthouse Ocean Apartment',
    pricePerNight: 260,
    rating: 5.0,
    reviewsCount: 29,
    category: ['apartments', 'families'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDN0llzIOhiFNH3viGqIPov7LvVjBzSZbGjy3MoQ4KgEobixZr4EwyqKi8--gB0ZsN7fFqPfuCql9mUhQdj8POAazNlengQU_04PbxKd7V_oiuLR4IeplJ_YLmAyYrcoYHlD-KG7RZqsQ3BtibNW-zEV71HfFmgfrZAAarduSXuBvmscaLFx_xRni3JFpCVbco-R2rLYjEZe1DzxkO7SXo9Huqlk3sBEDN-_L1Y8FHcZQe9ccqFL7X-',
    badge: 'Exclusive Penthouse',
    tag: 'Signature Penthouse',
    description:
      'The crown jewel of Blue Wave Lodge. Dual private suites, chef’s granite kitchen, and a private 45 m² wrap-around rooftop deck designed for post-surf sunset gatherings.',
    features: ['Up to 5 Guests', 'Full Chef Kitchen', '45 m² Roof Deck', '2 Private Bedrooms'],
    capacity: 'Up to 5 Guests',
    size: '82 m² Interior',
    bedType: '2 King Suites'
  },
  {
    id: 'standard-double',
    name: 'Standard Double Room',
    pricePerNight: 85,
    rating: 4.88,
    reviewsCount: 54,
    category: ['couples'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCkEKXrwUQ9SEHIR4rrcRNj3NB5cnYCkzo1U1arkQInHeZaoIexQV2unxd-53k2zz6tSMuBtcRZ5-aHcjdFXmGle8n_o2KxzVEsIqUIK2El8cv6pS9hu9Uhldd2HYHc14Qfa_kjAcEJk3vPqPD-y_wToXaSR1LW0WTzEq-g30IBmkrNL1RdgX8LXLr4IbLu16ggLZUmBVJytsx_KypttWReo5EUP4i3m_TA8QHOlXOM7-CoAUF3RLkY',
    badge: 'Courtyard Serenity',
    tag: 'Quiet Garden Patio',
    description:
      'Pure minimalist Atlantic comfort. Tucked away from ocean winds in the quiet fragrant garden courtyard, perfect for solo surfers and couples seeking profound sleep.',
    features: ['Queen Size Bed', 'Courtyard Calm', 'Work Nook & 300Mbps'],
    capacity: '2 Guests',
    size: '24 m²',
    bedType: 'Queen Bed'
  }
];

export const RELATED_ROOMS = [
  {
    name: 'Garden Courtyard Suite',
    badge: 'Garden Oasis',
    desc: 'Quiet shaded patio, rain shower, ideal for unwinding after deep sun.',
    price: 115,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDw7U3Ta5tGTC_6rFvK2eGqWqF04hYg4yi8fQKgBdZ_bynA-4CVxGjYELoEtdeBTj2Iv0JQypwdl8V3nWlcLbSNKVFr11yCR6MdsKmVW4zHUKRUJv0f0WbrWfPyKta9BMIodNHnB84bXTJA5eIEhMpQKrcd4wyyPNxteQGTG09yFvVtISbcysVrxCWA7KGrKF53k2busZefB3JU0waFNQaXOMF0KcboiOJEBz1d9Y3b7z6juij9jeey'
  },
  {
    name: 'Sunset Horizon Studio',
    badge: 'Top Floor',
    desc: 'Open sunset panoramas, private workstation, and custom record player.',
    price: 160,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCHDE2HbXDH2-gCjtO12mn-6xktzLRi5A2NdHX6lrmRhg_fcFmdlbLz70LzDuHyaQfpbBQl0GrTEV-IfUGFLVeMcLmS1YgatyvLDqtHGhI6665-lNzfeqrA2ufx-0ebTqNKejVOWeqQLXyfGxK1HQCew8ShyX10LrkztZavkj4EJJ1PI1Z7Wonp4JmIF_EKgrXgOftOpZKVo9Ps1aiyDyN8aqVR4Z2tEOwqfJ_cAwKdckwBTyZf3pl'
  },
  {
    name: 'Two-Bedroom Coastal Flat',
    badge: 'Family • 4 Guests',
    desc: 'Independent kitchen, spacious living quarters, and direct beach trail access.',
    price: 210,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD_VpIhGAS-dELkpoRq2fBDKhHU16P5zkQA6hE6VjRMGaIipZnMaBouMr4h3otgFmruPjnfoVxscZW2D6gDsUdPeBjINVJ2FJWKS2hdfHyXidTpj8Jkpx2uu8XKZH6NXyr9rSUhIH6L4Pdb8zj0l7hiYCmrN8NB3Tv-4rXmCDzH8ohr_lMpTBLYiniAfItSFOs-4yjKbot5E8DbGcoBAb1MjM_uI5m-T_l03-S2elnDVoPO-hrFHxlr'
  }
];

export const PACKAGES_DATA: PackageItem[] = [
  {
    id: 'short-break-4d',
    title: '4-Day Surf Escape',
    categoryTag: 'Short Break',
    price: 420,
    durationNights: 3,
    durationDays: 4,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBtHRa9zbmbECh7uAbmR9r-9nrjokLM_n1-LQYKaJ95E6_YhXq2ZMRh-7AJy3xnUChy9IxebxQTWniidJ4OyGIPHIFGWaeZ0k-FiejYUcuJh5RzkYMq_J26gDDML0Zrg7ydgO6VvAYGHQbI8-O9W82FfrM66KIRxHUzsNoKZvSzI18SyxWFJciBx9Y0V8zVmKlrulqH-voxq4GVDve59n4Anh8i7ZFPszOcQu05MzpcWR2lOd3U4Mfo',
    summary: 'A rapid reset for busy travelers wanting maximum water hours over an extended weekend.',
    highlights: ['3 Surf coaching days', 'Agadir Airport transfer', 'Full quiver & wetsuit hire'],
    detailedDescription:
      '3 Nights / 4 Days of high-intensity Atlantic coaching, Agadir airport pickup, seaside breakfast buffets, and private room living.'
  },
  {
    id: 'surf-stay-7d',
    title: '7-Day Surf & Stay',
    categoryTag: 'Signature Week',
    isPopular: true,
    price: 790,
    durationNights: 6,
    durationDays: 7,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCBRqB0XU-9drWapFYR18xSU-CPsm8koofDyU7vd5O6sbr41-EmbxsklH1OAfJpuitNywEcDXckqmXpM9FvjU_LilOGIFFXsG2XfKuVwNQlKz9Izt5hi7AXf1ZGJ5J7DuuMEPQGwwu6Ummu-9WfFP5R5oaK55HapQAktbQh3a6aiM7Wcd0iY4y1yUgHcNZ8sdBKsSd0vatLnZ6fwNSbQ-V9ZYQN-c3n2cTZo6BM6OlfOByTo-zGS3Pp',
    summary: 'The definitive Atlantic immersion. Daily spot hunts, theory modules, healthy meals, and sunset social dinners.',
    highlights: ['5 Full surf coaching days', 'Daily hearty packed beach lunch', 'Sunset Paradise Valley day trip'],
    detailedDescription:
      'Our most cherished week-long formula with 5 coached days, daily beach lunches, spot trips, Paradise Valley excursion, and Agadir transfers.'
  },
  {
    id: 'coaching-intensive',
    title: 'Coaching Intensive Week',
    categoryTag: 'Performance',
    price: 940,
    durationNights: 6,
    durationDays: 7,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7cRpBG13GO5cOWJdjMzKoH8bPtoKcqfhULZI2xOFRfMyt9LX2eRZEx70neUe0lPwlGmDIIeUFyKkeFE3fuL5F0BbHqMB54eBi9hgECdRva-KH87OJ_aq3yBDAPqFkAxuorXQBdzMqcqHaK5IvnbMLz9B9WbuDTZxWzqNJvWL2XmWOCVFybl7FvSf9MzfwjzALprWpGnHh1zBcCdP1QTt8h0FJA_WyZkJVaCvw-KviuIOmOgKeP4oX',
    summary: 'Hyper-focused technical progression. Drone videography, slow-motion biomechanics, and curated individual goals.',
    highlights: ['4 Drone & land video analyses', 'Carver skate ramp balance drills', '1-on-1 performance review folder'],
    detailedDescription:
      'Designed for rapid progression with multiple HD video reviews, pool breath holding, dryland board mastery, and ISA coach feedback.'
  },
  {
    id: 'surf-yoga-sanctuary',
    title: 'Surf & Yoga Sanctuary',
    categoryTag: 'Sanctuary',
    price: 980,
    durationNights: 6,
    durationDays: 7,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCey55equLQLmogr9IkUkxXdaZlbZpyIrHrsWUhd-EXS7t3hjBF8KE8Z2SL1AbPMF_iLMQ6jdyzc1ZXsPkvO3bu01Q-aPcU7VBqZT2TbGYfoss6fkaJAvYRXdpbFCx1cbf3PMBpiZ6G4zxHD-bJLsKwYB62GRm6hLeKeVgPB_CR9jrcsvXwt-7D50cqsaD2kpfbHyP1tB4NzPpWmhbJEg8IT1fvbDt0KAQl9KvVheLTOpTtzpnlkONF',
    summary: 'Sea view suite upgrade, morning ocean waves followed by rooftop yin sessions and restorative Moroccan hammam.',
    highlights: ['Deluxe Sea View Suite guaranteed', '2x Daily rooftop yoga classes', 'Traditional eucalyptus hammam bath'],
    detailedDescription:
      'Harmonize wave energy and deep relaxation with ocean view suite living, 2x daily rooftop shala yoga, and holistic Moroccan wellness treatments.'
  }
];

export const SURF_LEVELS_DATA: Record<string, SurfLevel> = {
  'first-time': {
    levelNumber: '01',
    title: 'First Time',
    headline: 'First Time: Complete Beginner',
    description:
      'You have never touched a surfboard before or tried it once a long time ago. We start safely on waist-deep sandy bottoms, mastering paddling technique, wave timing, and the clean Moroccan pop-up.',
    focus: 'Ocean safety, board handling, prone balance & basic push-pop-up.',
    spots: 'Imi Ouaddar Beach & Banana Beach',
    quiver: "8'0 - 9'0 Soft-top foam boards",
    recommendedPackage: 'Surf Lessons & Stay'
  },
  beginner: {
    levelNumber: '02',
    title: 'Beginner',
    headline: 'Beginner: White Water Rider',
    description:
      'Comfortable in the whitewash, can stand reliably on small rolling foam. Focus on building paddle stamina, reading incoming white-water reform, and trimming across gentle rollers.',
    focus: 'Whitewater trimming, paddling stamina, catching rolling swell alone.',
    spots: 'Panoramas & Anza Beach Break',
    quiver: "7'6 - 8'4 High volume epoxy/soft hybrid",
    recommendedPackage: '7-Day Surf & Stay'
  },
  improver: {
    levelNumber: '03',
    title: 'Improver',
    headline: 'Improver: Catching Green Waves',
    description:
      'Paddling outside the break to catch unbroken waist-high green waves. Focus on angled take-offs, bottom turns, trimming across the wave face, and managing ocean currents.',
    focus: 'Angled take-offs, bottom turns, trimming across the wave face.',
    spots: 'KM 11, KM 12 & Tamri Dunes',
    quiver: "6'8 - 7'2 Midlength & Funboards",
    recommendedPackage: 'Coaching Intensive Week'
  },
  intermediate: {
    levelNumber: '04',
    title: 'Intermediate',
    headline: 'Intermediate: Reef & Point Break Guiding',
    description:
      'Confident on chest-to-overhead walls, navigates line-ups safely. Focus on generating speed down the line, cutbacks, duck diving safely, and reading point speed lines.',
    focus: 'Generating speed, cutbacks, duck diving, reading point speed lines.',
    spots: 'Anchor Point, Hash Point, Mysteries',
    quiver: "5'10 - 6'4 Shortboard & Retro Fish",
    recommendedPackage: 'Point Break Guiding'
  },
  advanced: {
    levelNumber: '05',
    title: 'Advanced',
    headline: 'Advanced: Heavy Points & Swell Chasing',
    description:
      'Charging heavy reef points like Anchor, Killer Point, or Boilers. Focus on deep barrel positioning, critical top turns, high-line speed generation, and navigating hollow Atlantic slabs.',
    focus: 'Deep barrel positioning, high-line speed generation, critical lip turns.',
    spots: 'Boilers, Dracula, Desert Point, Killer Point',
    quiver: 'Step-ups, Guns, High performance PU blades',
    recommendedPackage: 'Advanced Guiding Safaris'
  }
};

export const DISCIPLINES_DATA = [
  {
    title: 'Surf Lessons',
    tag: 'Beginner to Improver',
    category: 'The Academy',
    icon: 'school',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAON1ILb4_n8tf8AhffP3PieGA_Z7SQ8LvyDDNmH6Ht2e5QOcsoTudtCb180lfSOpTwUwkOC2IwZhjWKakhjjdDRXpmTHvcQJTYJpuCoRu7nvwFRNqZtdxx19XALIdHLOVMaXVzyBxW_UoQvn_O-swEVNoXiWQDVR6rMPTkaIG7lKepabF4DcKFWFwZfzJkUCO8raKpWX1yoh6Es0fEnrVSpWqBkA_OU2FU-FL1Bj-W-VCroqtoPNiJ',
    description:
      'ISA-certified guidance with a strict 1:4 instructor ratio. Focus on paddle mechanics, wave assessment, priority rules, and effortless pop-ups.',
    bullets: ['2 x 2-hour water sessions daily', 'Foamies, torq hardboards & wetsuits included']
  },
  {
    title: 'Surf Guiding',
    tag: 'Intermediate & Pro',
    category: 'Point Expeditions',
    icon: 'explore',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuADZzbqT_pZLTef0Zu8ClrVWAhwanmQDYPSjjcaZykab4OCihNU597eJyg5RZlTICEWexSYUnawEJWPPvXGf0Zb8s7ZoMBDFRUOh72z_EO6xOI5BoiNcpj7yb4VneyRrwp8e9LjxCWslgcuFOmP697yOO79rKiVpy-WB6y8L6Bpaa6ZH_i_v1TdeI7ioFrx-MU1C8HPw-OoTHU8jN9Kg2rkM0gs4VphMcBsvgIlrSZTEoKuorL8kk4c',
    description:
      'Local knowledge unlocks secret reefs and tide windows without the crowds. Morning spot checks from Anchor Point to Boilers and Mysteries.',
    bullets: ['4x4 coastal transport to optimum break', 'In-depth hazard, current & entry briefings']
  },
  {
    title: 'Surf & Stay',
    tag: 'All-Inclusive',
    category: 'Seamless Retreat',
    icon: 'hotel',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDvQ1bfwLt1dhoTbNLsJPiRysNtHoB-lbHVZ8gvak-lUjyCU-FQ7kxmA5xFMs2WQHWTKNMX6gtSRMBSPieLLR-86CL-TA87WI4aRiif1gWuCTnhJmu4e3HnyDW3BIq6XFcKO6uxBQmuZvRWDArmARVuysYKnJb7guPg1vsVOn74F0mlzB8BgJlaIl37XjYFSDyzJHmxteolnlm9jsE_ycqPxOtwsb04Sgr22zwp4B45oDkkJO0o0ud8',
    description:
      'The quintessential Blue Wave rhythm. Ocean-view lodge rooms, hearty farm-to-table coastal breakfasts, beach picnics, and round-the-clock surf mentoring.',
    bullets: ['Ensuite suite with private sun terrace', 'Full board + seasonal tajine dinners']
  },
  {
    title: 'Surf + Yoga',
    tag: 'Mind & Body',
    category: 'Equilibrium',
    icon: 'self_improvement',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA1wWY2Gr8wCMnTJVZcg-MdeLsMy6fy-GYY6vmwOibIPj4pNb-0On5e0RysfYNLXbcn9bJs2lQvbo3SbAipMxrfXC6lgF27L_7WeRxgdQ5yVfqFzCQPxgcqeregqoHDr9uSvq8kjFkhwDO6imwx_8vVFxZ_GCJSqls_hl2x-7xCiu3vptPz6tcKlZSyZ64DWr5gxS9B62lya9uIouc-5HAyLFJhvgc1wForgRqmcukqYPkvG3GKs0Bd',
    description:
      'Balance intense ocean paddling with targeted fascial release. Sunrise dynamic vinyasa to activate paddle muscles, sunset yin yoga to restore shoulders and hips.',
    bullets: ['Rooftop shala with unobstructed ocean vistas', 'Breathwork for lung capacity & wipeout calm']
  },
  {
    title: 'Equipment & Quiver',
    tag: 'Board Room',
    category: 'Premium Gear',
    icon: 'inventory_2',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCoNMlpYmGKSljpLFmLREurUzYb4BqqXvclEVx-Eq4iW7CRnrbck8g0ZuUyQLckFrm-wLaiyace1o5bRdZ6iKk1wq_n-e-pcsHbNU6pvRq7O8hzUUk_5qXn9DTEliacyyzWJ1g8DGBOLb1arL4e120k5jp-Ez2tUH7H2KNs5zRGGJb1YKvlde-321gijgn5wMasq5_1Saz3m7Mnmkd2FDLKtk5k1lXK1TmbUMjSqzjCzUOHZQJ6vaOa',
    description:
      'Over 70 high-end craft available to swap as swells change: Channel Islands, Pyzel, McTavish single-fins, Softech learner boards, and 4/3mm Rip Curl steamers.',
    bullets: ['Free board exchanges whenever conditions shift', 'Eco-wax, leashes, fins & travel booties provided']
  },
  {
    title: 'Surf Safari Trips',
    tag: 'Coastal Journey',
    category: 'Desert Swells',
    icon: 'alt_route',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBOUBgtIW9TtRu-gmYnbNt7gTCJN7JKpclUdfDgbCulhbnzPtSER-2NHKQzNdF4D3MrKOD7BWi1V_PXNdN-iq94TpNuBj1VW8iIU52_nTsy7AL36hEC72EWyHJI23bF17O3QoQCyfjgqltWfF1_z3WHPcsmMBMxGPkTLmrHnTGFZ39ZkyxgQ2x9e-2sPZaS4lNhq2B5DQdDxeNO4PjRBFzjBo9g_eHXu_UHQ_zMvmG-1q5Fm1t6OiwI',
    description:
      'Full-day excursions to Imsouane Magic Bay (the longest wave in Africa), secret empty peaks in Tamri dunes, and coastal fish barbecues straight off wooden fishing skiffs.',
    bullets: ['Scenic drives through argan valleys & cliffs', 'Fresh grilled fish harbor lunch included']
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Afternoon Swell Watch',
    subtitle: 'The Pool Terrace',
    category: 'pool',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCVJhnKnRe9aevSODPVu4iDN0Ujnh3-Mp-Gah2R5a_RPXZkLes1AoCMfEC6q2ZYwyMBJh3_dm2GDBUYmRcL97vI2jhtTjROesIJSWXAzEvu6K8oagZYSHZt312vZO90VRFZD60cXT7HPgVKvMdrxFhpUMkmEICPuhSLNh9MhCIF18iq8RdOLKDqmkWWtyw9mY7MQeze3QPHfz6n930Oa-YbhKx0brgrHQHNNOxo621iNn3Ix6530oQH',
    span: 'col-span-1 md:col-span-2 row-span-2'
  },
  {
    id: 'g2',
    title: 'Morning Lines',
    subtitle: 'Anchor Point',
    category: 'surf',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBPNPY13B7kf-pIyRlpHZs4uWj6oS0OT1GpHnD0ile1SCfRNJ0TOAkP2feadSXvtMa0my94vtE5O20LLOc4nsKKoAIy7Gxk67P-TeYUZV5YGQRLjHmXmp-cTArugYjJkr8JvfJ3DSOn2RNX5lTvy7PGV4lW9_05znczh8_cdvMKuh9qAAGttXri341dG58aaQ8d0V21nYszd3ZnlkywlRyG_p3wrxP6T6mw_fu4R2PYptEb56PSvpl8'
  },
  {
    id: 'g3',
    title: 'Ocean Balcony',
    subtitle: 'Suites',
    category: 'rooms',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAuKkRHpjvn0T9eJVv3IufMJNpLAmdneQY-wBJ7PRtJb6N8pGQ4QDy78PQA1xPk69kQ4BpwUDwiACRKMNFgQYrRc-N7gViSr2uicMEk8P2a9oe_1DMF7VEW-rPpf0e9pGBfc-11CKJvvPNDOXRp7EknvTGpCsYA1X9W0-UvKSU-T-5CnmPjyQHwSiaJv-_F2r3r_m1NRpCLpCzyw4ggz8QLoYha7yMxxLZV4FZSDh2Bxzs451bD0C-K'
  },
  {
    id: 'g4',
    title: 'Berber Mint Ritual',
    subtitle: 'Hospitality',
    category: 'lifestyle',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCJizLs5uRcJbVLj33kpCAVGg_yOrPI_1x66yKJoy-ggLz0-R0f88SJz0Jd5ETF5QHyyZ0p5oCzSr-ftsaBMNKiUwePGqYItCiBAzzWqEBxjQpRaKzckLK-zttCyR7Wu7n7EPluSIaSMxxbA0S5jBk2iPwpMLbaIDkU-yWsZW7-_ZUwhiCYGjJyctmdKsifvymqRXLf2r1bgKwZLX4bP3CMWNeZbbjxp8vFT7tYNx5iaBWeogxu5Wy1'
  },
  {
    id: 'g5',
    title: 'Curated Board Quiver',
    subtitle: 'Surf Club',
    category: 'surf',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC0PGaJdyWMSkUibKam8TAX60RBsUmlWdpApH8o2k5naz8lNIm8AoampwoNtDBU7ct0Mcr6dBv1_TrqtzkjQnGR6TskcaYUKaLLqY0TWLDsMPa1rYOhWI055Wk-Cce-k8cC2E6c5VPV52VP_WNRW5xwKc5Ht1hZqUkc3BCBZmu3ZPCf_b086ZFX1maN-SCvxHedUiMJ-qdHTZgRW5ziCWC4lytBJph2LFHNNfWcNy4817VzgekzSvlD'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    quote:
      'Blue Wave Lodge completely changed my perspective on surf camps. It feels like a high-end boutique riad perched on the Atlantic. The coaching team got me catching green waves by day 3!',
    author: 'Lena Hartmann',
    location: 'Munich, Germany',
    packageTaken: '7-Day Surf & Stay',
    initials: 'LH',
    rating: 5
  },
  {
    quote:
      'The pool looking over the sunset while drinking freshly brewed mint tea is an experience I will never forget. The staff treats you like family from the minute you step through the wooden doors.',
    author: 'Arthur Mercier',
    location: 'Bordeaux, France',
    packageTaken: 'Sea View Suite',
    initials: 'AM',
    rating: 5
  },
  {
    quote:
      'Unbelievable surf guiding. Having local guides who know every tide nuance at Tamri and Killer Point meant we had uncrowded sessions every single morning. We are already booking our return.',
    author: 'Sarah Jenkins',
    location: 'London, UK',
    packageTaken: 'Surf Coaching Week',
    initials: 'SJ',
    rating: 5
  }
];

export const SURF_SPOTS_DATA = [
  {
    name: 'Imi Ouaddar Beach Break',
    badge: 'Right at our doorstep',
    desc: 'Gentle sandy bottom beach break perfect for first-timers, kids, and playful sunset longboard cruisers.',
    icon: 'waves',
    accent: 'text-primary'
  },
  {
    name: 'Anchor Point & Killer Point',
    badge: '12 mins South',
    desc: 'World-renowned right-hand point breaks offering 500-meter rides, fast barrel sections, and powerful Atlantic walls.',
    icon: 'navigation',
    accent: 'text-tertiary'
  },
  {
    name: 'Imsouane Bay (The Bay)',
    badge: '45 mins North',
    desc: 'Legendary 2-minute leg-burning rides curling into a calm fishing cove. Pure heaven for retro twin-fins and classic single-fin logs.',
    icon: 'landscape',
    accent: 'text-secondary'
  }
];

export const AMENITIES_DATA = [
  {
    title: 'Panoramic Rooftop Shala',
    desc: 'Elevated yoga shala and social sunset lounge with views stretching towards Taghazout Bay.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAkbhAmdIupnKqLA21fNWKosCQ9cDsnUaiA6_KfKdoS6rXJVCk7T9O4oaB8r35fOTLBKsrGduSIrlEpkUgR0_m2fcj4aml1OoNSPO5RRMSpXfDVEEdxdhIWOiy4hfWl_vEZOu8-JKeiyrKskFM_-nq94wSENmAdb5GHGYg1LX3y7eyaDRigXY8xMYVlFLsu5m2PndmN8FlZXJ-GvhJ1bA0yvssIb6K1lT1voPBLPa6Fv5X5jQtL5ClO'
  },
  {
    title: 'Ocean Restaurant',
    desc: 'Daily chef-crafted breakfasts, catch-of-the-day fish barbecues, and spiced vegetable tagines.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDXk_JarenaVci42SA14MsU2Uk4XZlYt4mKrKeHuSKPnU3QvulNprGeCyop4D2TV8xxJEGAW-PHID2assc_tkYEjHu6pplyQavBHvOtJKnY2gY8UMF5J54E9gvi3fOMyGz_E2_hM2tSXO9wxe7RYuSv_Iv8MyhWVpxG99OUMhbL_y0OVkwsiu0brHLgNudR5Bl7fGA7xyr5GOG5dsG4RDpceZ7ixOvRx1tSCTN02NavfH3Wo7G3B_Fv'
  },
  {
    title: 'Heated Infinity Pool',
    desc: 'Year-round comfortable swim sessions overlooking the Atlantic swells with poolside towel service.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAGPlqoU4MZk6Zy6dtf45j3fN1ZH87_umqq26rRULLEmI6KPxceZ5A4_nGTN0027a1RVgwy7DUEs9TXCVOUMqmIpVbVhHjf7qVUZLBfkesaZv18y6mZlOlW-Ab6R-t3zK1Zdhx7VPBBb_JqVv_8xMAWsajGbM-MDw5xhZmPgRFOhuA8Ew0iWukXru2dI7YDMpqtpPqDSwadBdFKj14E3qKFrFnUa7vB5ojhFWXLUnWK9Md_JMVEJyVD'
  },
  {
    title: 'Coastal 4x4 Excursions',
    desc: 'Guided trips to Paradise Valley natural pools, Tamri sandboarding dunes, and Essaouira argan cooperatives.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuANcklZdYKBEwAGJWfwldlACWKkENATyGznweWvMfW1rzkaJWb4zsaRI9tRgMKWluFG7SjlAZvHJSBHabWazfTiSqPgPg72m_EtBHXAhAMJpGgwrVCY_1BuAoMIHAX9fFOKs0uDPibe0Qei0Zd2VMBeC8y9r8x-106Ru4slEBYTM_85B4dZs08c3UYYyTCliPN2qNf8w8CQmNN4-IJEDSKtAJNcDGa1p0VC3YDjG8iXM0_LKYxgieH7'
  }
];

export const ROOM_SHOWCASE_IMAGES = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDboPww_gk0Au7fT16rL7kgDrEWhmstWyNFTitCWlvQj_7Qo5w_wiuOaK-YS-6Jh0IfI5a-63-AnI3sqsAfdeBAe1n9HrgktlGtpAjRoRdBV2-nB1Jv61_WGOqThRFeMMKJzROttReOpyfGHnycyZpkRqPOa-wJKeRUwicTot4bHccsZDzk9li0Ot-anOIXjBe086yIOyKo7WKdXIK9Mt4SKOa1st7MByuE43HYy8h5pInWp0ECsgG_',
    caption: 'Private terrace with unobstructed view of Imi Ouaddar point break'
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtNutQfmAHutdPFwJORrObGJbAPApfTgc52ukLutFT2ptzZR4xYgxMH20mN5I7zVj4H42WiP-WP9Lx55ZPO2oDTAbUbWQuz97VMW_kp3ISEVBpWVtPvfOwNtjUnCHayEpLDP6DGH7WQjtyK134LI7AHcwn-iIyGOMkuCMm8QoiglqDifn7Br8Bb0OHaBLn6T_cwZot_u0q_WUUMG_47q5zGy17AeEzn7U1Or857cqWbT2OaFBZHAG0',
    caption: 'Close up of private balcony with Atlantic surf breaking and morning coffee setup'
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA11d2g_h0VHPRpc72Ztac1P0jkOMDIZdMqw4Q8pjqMFmrhlAtEGFX2m4U6baAFsUydC2Juc7GBOH_z_p_3sibfklOUtpO4IoEa83O27lcwOwgzeRT32JAh9zLu6R0QlIt9p-O5Ta-iThRTHIibP7hzKkki4--YmQgqYe5sVCdoiNSgKX7U1wNaD5emcIwbz66XtaYJ-mbaY7TOULGEZ-UjcBgzHnwg7rEeHgQXN8YWPEDUFBxGTTLu',
    caption: 'Artisanal bathroom with handcrafted emerald Moroccan zellige tile and walk-in rain shower'
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAahQbccCYkA4cw6S4XwhV5YAsmsigSeISIwDGoiOIYkQ7Hn7fdFFnyBZOuj5_-MU39fz36ku3DCMbM0U-8agPkbg7NtyJmVYpHjGpFJh3NISRdHBdzqsJOnem5HoSqQarqk2VJ0-X3kuPouUMfJp70is7bM0mBY353vF-rdwd36p-BiCLeq8w0VfFDcFM3z1R54W1P-NK4JoSHMDjZCgHZlvOtS_XJnrUfUGvNEP7vMBqKyL3174XN',
    caption: 'King bed with organic unbleached linen, cedar wood headboard, and bedside reading sconces'
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpdSo_7JOxfBsxSQW-BvJlkjNTg8bh3zLhm_6XID9qnol1lOhwK7MlPxQNC3BnkQDKfEav_lhlw6OsobXsXTq3_Q-xUBI2tFAbm8pwO7N0xOEsg1zVuqXUxY-bxxVBZAEFAcH_1qENT9ZsH1Xyp2Bfs_68A4uMZ0r_MU6H8W2p5ralVifxyxDxB2RcrwABMISIZAErOF1FdyYUkQQphzTaahqSmPsOlQBzqbEipmqxi1C_J9jX5YQL',
    caption: 'Dedicated surfboard rack and wetsuit drying corner located inside the private hallway'
  }
];

export const FAQ_DATA = [
  {
    question: 'When is the best time of year to surf in Morocco?',
    answer:
      'Morocco delivers year-round surf. September through April welcomes potent North Atlantic groundswells creating world-class point breaks for improvers and advanced surfers. May through August brings gentle, glassy beach waves and 30°C sunny days, ideal for beginners, longboarders, and families.'
  },
  {
    question: 'Do I need to bring my own wetsuit and surfboard?',
    answer:
      'Not unless you prefer your custom equipment. Blue Wave maintains a premium quiver of over 70 boards—from soft-tops for safety to Torqs, fishes, and performance shortboards—as well as freshly sanitized 3/2mm and 4/3mm Rip Curl and Billabong wetsuits. All rentals are included in our retreat packages.'
  },
  {
    question: 'What is the water temperature in Taghazout and Imi Ouaddar?',
    answer:
      'Atlantic water temps range between 17°C to 19°C in the winter (requiring a 3/2mm or 4/3mm full suit) and 20°C to 22°C during the late spring and summer months (suitable for a shorty or light 2mm suit).'
  },
  {
    question: 'Can non-surfers or partners join the lodge retreats?',
    answer:
      'Absolutely. Non-surfer companions can book our sanctuary stay rates with full access to the infinity pool, oceanfront dining, yoga sessions, hammam spa treatments, and day excursions to Agadir souks and coastal hiking routes.'
  },
  {
    question: 'Can I store my own surfboards and wetsuits securely?',
    answer:
      'Yes. Every Sea View room and Apartment includes an internal cedar surfboard rack. Additionally, the lodge provides an access-controlled ground-floor board locker with rinse showers, custom ventilation for quick drying wetsuits, and ding repair supplies.'
  },
  {
    question: 'How does airport transfer from Agadir Al Massira (AGA) work?',
    answer:
      'We provide direct private Mercedes Vito shuttle transfers from Agadir Airport (approx. 50 minutes along the scenic coast road). Our driver waits with your name sign in arrivals. You can select this add-on during booking or coordinate via our WhatsApp concierge anytime prior to arrival.'
  }
];
