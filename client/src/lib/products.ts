/*
 * DESIGN PHILOSOPHY: Dark Academic Editorial — CTP Product Data
 * All book data sourced from store.commonthreadpublishing.com
 * Shopify store links used for checkout (print books via POD fulfillment, ebooks direct)
 */

export type BookFormat = 'print' | 'ebook' | 'both';
export type BookGenre = 'fiction' | 'nonfiction' | 'devotional' | 'historical' | 'biblical' | 'practical';

export interface Author {
  id: string;
  name: string;
  title?: string;
  bio: string;
  photo?: string;
}

export interface Book {
  shopifyVariantId?: string; // Shopify variant ID for Buy SDK
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  series?: string;
  seriesNumber?: number;
  authorIds: string[];
  description: string;
  price: number;
  ebookPrice?: number;
  format: BookFormat;
  genre: BookGenre[];
  coverImage: string;
  shopifyUrl: string;
  fulfillmentUrl?: string;
  featured?: boolean;
  badge?: string;
  isbn?: string;
  pages?: number;
  publishedYear?: number;
}

export const authors: Author[] = [
  {
    id: 'mark-mirza',
    name: 'Mark S. Mirza',
    bio: 'Mark S. Mirza is a compelling author whose works explore the intersection of faith, politics, and American society. His novels challenge readers to examine their own convictions in the face of cultural and spiritual conflict.',
    photo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/MarkMirza_d886115c.jpg',
  },
  {
    id: 'bruce-mayo',
    name: 'Bruce A. Mayo, MTh',
    bio: 'Bruce A. Mayo holds a Master of Theology and brings decades of biblical scholarship to his writing. His work in The Kingdom Continuum Series is designed to help new and seasoned believers see Scripture as one unified, connected story.',
    photo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/BruceMayo_4c08e9b4.jpeg',
  },
  {
    id: 'john-greenfield',
    name: 'John Greenfield',
    bio: 'John Greenfield was a renowned Moravian historian and evangelist whose original account of the Great Moravian Revival has inspired generations of believers.',
    photo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/JohnGreenfield_61b19951.jpeg',
  },
  {
    id: 'darrel-suderman',
    name: 'Dr. Darrel R. Suderman',
    bio: 'Dr. Darrel R. Suderman is an international ministry leader and author whose devotional work has reached believers across the globe, offering daily guidance for a life of prayer.',
    photo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/DarrelSuderman_37e221f7.jpg',
  },
];

export const books: Book[] = [
  {
    id: 'divided-nation',
    slug: 'divided-nation',
    title: 'Divided Nation',
    subtitle: 'Persecution of the Church',
    authorIds: ['mark-mirza'],
    description: 'Five years after COVID-19, Christians accidentally spread the next pandemic. Within weeks, Christians become "Public Enemy #1" and begin losing their Constitutional rights. When persecution comes to the USA, FBI assistant director Jack Jones is forced to choose how he will handle the crisis. Many church-goers arrogantly defend themselves. But over time, Jack finds the Bride of Christ and walks through persecution with her as he helps bear her burdens. While Jack encourages the 2,000-year-old church, there is a back story of the Apostle Paul — going from persecutor to persecuted. This novel is a sobering reminder that the USA is not immune to persecution. The question is: How will you handle it if and when it comes?',
    price: 24.99,
    format: 'print',
    genre: ['fiction'],
    coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/DividedNation_10dbd00f.webp',
    shopifyUrl: 'https://store.commonthreadpublishing.com/products/divided-nation',
    shopifyVariantId: 'gid://shopify/ProductVariant/48189834330367',
    featured: true,
    badge: 'NOVEL',
    publishedYear: 2022,
  },
  {
    id: 'divided-together',
    slug: 'divided-together',
    title: 'Divided Together',
    subtitle: 'Politics in the Church',
    authorIds: ['mark-mirza'],
    description: 'The sequel to Divided Nation continues the story of faith, politics, and the American church. When political division invades the pews, believers must decide what truly unites them — and what threatens to tear the Body of Christ apart from the inside.',
    price: 19.99,
    format: 'print',
    genre: ['fiction'],
    coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/DividedTogether_b4149c9c.webp',
    shopifyUrl: 'https://store.commonthreadpublishing.com/products/divided-together',
    shopifyVariantId: 'gid://shopify/ProductVariant/48189835477247',
    featured: true,
    badge: 'NOVEL',
    publishedYear: 2023,
  },
  {
    id: 'power-from-on-high',
    slug: 'power-from-on-high',
    title: 'Power From On High',
    subtitle: 'The 200th Anniversary of the Great Moravian Revival 1727–1927',
    authorIds: ['john-greenfield', 'mark-mirza'],
    description: 'A remarkable account of the Great Moravian Revival of 1727 — one of the most extraordinary outpourings of the Holy Spirit in church history. Originally written by John Greenfield to mark the 200th anniversary, this edition is updated and annotated by Mark S. Mirza to bring this transformative story of prayer, unity, and revival to a new generation of believers.',
    price: 14.99,
    format: 'print',
    genre: ['nonfiction', 'historical'],
    coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/PowerfromonHigh_757543e5.webp',
    shopifyUrl: 'https://store.commonthreadpublishing.com/products/power-from-on-high',
    shopifyVariantId: 'gid://shopify/ProductVariant/48189836034303',
    badge: 'HISTORY',
    publishedYear: 2023,
  },
  {
    id: 'the-bible-finally-makes-sense',
    slug: 'the-bible-finally-makes-sense',
    title: 'The Bible Finally Makes Sense',
    subtitle: 'A New Christian\'s Guide to Seeing Scripture as One Connected Story',
    series: 'The Kingdom Continuum Series',
    seriesNumber: 1,
    authorIds: ['bruce-mayo'],
    description: 'Many new believers open the Bible with hunger — only to close it discouraged. The stories feel disconnected. The timeline feels confusing. The meaning feels distant. They long to know God, yet the pages seem fragmented. Scripture is not a collection of scattered episodes. It is one unbroken narrative of God\'s reign — from creation to covenant, from cross to crown — revealing Jesus as the reigning center of all 66 books. The Bible Finally Makes Sense is a summons to recover the unified story of Scripture through The Kingdom Continuum and to give bold allegiance to Christ at its center. Rise and take your place in the story.',
    price: 27.00,
    format: 'print',
    genre: ['biblical', 'nonfiction'],
    coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/TheBibleFinallyMakesSense_194ae03f.webp',
    shopifyUrl: 'https://store.commonthreadpublishing.com/products/the-bible-finally-makes-sense',
    shopifyVariantId: 'gid://shopify/ProductVariant/48188559491327',
    featured: true,
    badge: 'SERIES',
    publishedYear: 2024,
  },
  {
    id: 'the-johnstown-tragedy',
    slug: 'the-johnstown-tragedy',
    title: 'The Johnstown Tragedy',
    subtitle: 'God In Its Midst',
    authorIds: ['mark-mirza'],
    description: 'Based on the original 1889 accounts of the catastrophic Johnstown Flood — one of the deadliest disasters in American history — this retelling explores the faith, resilience, and providence of God witnessed in the midst of unimaginable tragedy. A powerful reminder that even in the darkest moments of human history, the hand of God is present.',
    price: 19.99,
    format: 'print',
    genre: ['historical', 'nonfiction'],
    coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/TheJohnstownTragedy_c7f61357.jpg',
    shopifyUrl: 'https://store.commonthreadpublishing.com/products/the-johnstown-tragedy',
    shopifyVariantId: 'gid://shopify/ProductVariant/48189836001535',
    badge: 'HISTORY',
    publishedYear: 2022,
  },
  {
    id: 'the-pray-ers-book-1',
    slug: 'the-pray-ers-book-1',
    title: 'The Pray-ers \u2014 Book One',
    subtitle: 'Troubles',
    series: 'The Pray-ers Series',
    seriesNumber: 1,
    authorIds: ['mark-mirza'],
    description: 'The Pray-ers \u201cTroubles\u201d is Mark S. Mirza\u2019s first book in the trilogy exploring the natural and supernatural world \u2014 explaining what prayer is and what it is not. Mark reminds us that we have a formidable enemy who can be defeated when we link ourselves via prayer with an omnipotent God with whom nothing is impossible. The imaginative link between 1st, 19th, and 20th century characters is inventive but effective, helping the reader learn about prayer in a way that will fascinate, inspire, and bless.',
    price: 30.00,
    format: 'print',
    genre: ['fiction'],
    coverImage: 'https://store.commonthreadpublishing.com/cdn/shop/files/95d6qje-front-shortedge-384.jpg?v=1775578000&width=1946',
    shopifyUrl: 'https://store.commonthreadpublishing.com/products/the-pray-ers-book-1',
    shopifyVariantId: 'gid://shopify/ProductVariant/48378019315967',
    badge: 'SERIES',
    publishedYear: 2020,
  },
  {
    id: 'the-pray-ers-book-3',
    slug: 'the-pray-ers-book-3',
    title: 'The Pray-ers — Book Three',
    subtitle: 'Return to the Past',
    series: 'The Pray-ers Series',
    seriesNumber: 3,
    authorIds: ['mark-mirza'],
    description: 'The third installment in the compelling Pray-ers series takes readers on a journey through time as the power of prayer intersects with history. Return to the Past continues the story of ordinary people called to extraordinary intercession, weaving together past and present in a narrative that challenges every reader to take their place in the great story of prayer.',
    price: 30.00,
    format: 'print',
    genre: ['fiction'],
    coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/ThePrayers-3_a2b926d0.webp',
    shopifyUrl: 'https://store.commonthreadpublishing.com/products/the-pray-ers-books-3',
    shopifyVariantId: 'gid://shopify/ProductVariant/48189832954111',
    badge: 'SERIES',
    publishedYear: 2023,
  },
  {
    id: 'when-im-gone',
    slug: 'when-im-gone',
    title: "When I'm Gone",
    subtitle: 'The Guide Our Family Will Thank Us For',
    authorIds: ['bruce-mayo'],
    description: "What happens to your digital life when you're gone? Your family shouldn't have to play detective with your passwords, accounts, and important documents during their most difficult moments. Yet every day, grieving families struggle to access bank accounts, cancel subscriptions, find insurance policies, and unlock phones — all while dealing with loss. \"When I'm Gone\" solves this problem with a simple, caring approach to digital preparedness. A practical, compassionate guide that gives your loved ones the gift of clarity when they need it most.",
    price: 27.00,
    format: 'ebook',
    genre: ['nonfiction', 'practical'],
    coverImage: 'https://cdn.shopify.com/s/files/1/0790/8596/1471/files/Screenshot2026-03-21at7.56.04PM.png?v=1774137385',
    shopifyUrl: 'https://store.commonthreadpublishing.com/products/when-im-gone-the-guide-our-family-will-thank-us-for',
    shopifyVariantId: 'gid://shopify/ProductVariant/48310041444607',
    featured: true,
    badge: 'EBOOK',
    publishedYear: 2026,
  },
  {
    id: 'thinking-about-prayer',
    slug: 'thinking-about-prayer',
    title: 'Thinking About Prayer…',
    subtitle: 'A Daily Pocket Devotional — International Edition',
    authorIds: ['darrel-suderman'],
    description: 'A compact yet profound daily devotional designed for believers around the world. Dr. Darrel R. Suderman draws from decades of international ministry to offer short, powerful reflections on the nature and practice of prayer. Perfect for morning quiet time, this pocket-sized guide will deepen your prayer life one day at a time.',
    price: 9.95,
    format: 'print',
    genre: ['devotional'],
    coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/ThinkingAboutPrayer_a02b07c5.webp',
    shopifyUrl: 'https://store.commonthreadpublishing.com/products/thinking-about-prayer',
    shopifyVariantId: 'gid://shopify/ProductVariant/48189833511167',
    badge: 'DEVOTIONAL',
    publishedYear: 2021,
  },
];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find(b => b.slug === slug);
}

export function getAuthorById(id: string): Author | undefined {
  return authors.find(a => a.id === id);
}

export function getAuthorsByIds(ids: string[]): Author[] {
  return ids.map(id => getAuthorById(id)).filter(Boolean) as Author[];
}

export function getFeaturedBooks(): Book[] {
  return books.filter(b => b.featured);
}

export function getBooksByGenre(genre: BookGenre): Book[] {
  return books.filter(b => b.genre.includes(genre));
}

export function getBooksByAuthor(authorId: string): Book[] {
  return books.filter(b => b.authorIds.includes(authorId));
}
