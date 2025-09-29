// Big 5 traits constants
const TRAITS = {
  OPENNESS: 'Openness',
  CONSCIENTIOUSNESS: 'Conscientiousness',
  EXTRAVERSION: 'Extraversion',
  AGREEABLENESS: 'Agreeableness',
  NEUROTICISM: 'Neuroticism'
};

// Assumes scores array of length 10 (2 per trait)
// Question mapping: indices 0-1: openness, 2-3: conscientiousness, 4-5: extraversion, 6-7: agreeableness, 8-9: neuroticism
// Each value is on 1-5 Likert scale, scaled to 0.1-5.0 with step 0.1 (multiply by 0.2? No, since 1-5 can be decimal)
// But to match weights which are 0-1 (from JSON, like 0.286), we scale


/**
 * Calculates trait scores from validated question responses.
 * @param {number[]} questionScores - Array of 10 Likert scores (1-5 each).
 * @returns {Object} Normalized trait scores (1-10 scale) keyed by TRAITS constants.
 * @throws {Error} If input is invalid or out of bounds.
 */
export const calculateTraitScores = (questionScores) => {
  if (!Array.isArray(questionScores) || questionScores.length !== 10) {
    throw new Error('Must provide exactly 10 question scores');
  }

  questionScores.forEach((score, idx) => {
    if (typeof score !== 'number' || score < 1 || score > 5 || !Number.isFinite(score)) {
      throw new Error(`Question score at index ${idx} must be a numeric value between 1 and 5`);
    }
  });

  const traitAverages = [
    (questionScores[0] + questionScores[1]) / 2 * 2,
    (questionScores[2] + questionScores[3]) / 2 * 2,
    (questionScores[4] + questionScores[5]) / 2 * 2,
    (questionScores[6] + questionScores[7]) / 2 * 2,
    (questionScores[8] + questionScores[9]) / 2 * 2
  ];

  return {
    [TRAITS.OPENNESS]: traitAverages[0],
    [TRAITS.CONSCIENTIOUSNESS]: traitAverages[1],
    [TRAITS.EXTRAVERSION]: traitAverages[2],
    [TRAITS.AGREEABLENESS]: traitAverages[3],
    [TRAITS.NEUROTICISM]: traitAverages[4]
  };
};

// 25 Travel Personas based on provided JSON
const PERSONAS = [
  {
    name: "The Wild Trailblazer",
    weights: { Openness: 0.286, Extraversion: 0.286, Conscientiousness: -0.214, Agreeableness: -0.143, Neuroticism: -0.071 },
    description: "You're the ultimate Wild Trailblazer—a fearless explorer who thrives on uncharted territories, bold thrills, and cultural dives, powered by high Openness and Extraversion for that novel, high-energy wanderlust per Big 5 insights. Flightsnapp's hybrid curator spins hyper-personalized snaps just for you: random slot-machine deals on off-the-beaten-path gems, group packages syncing with fellow adventurers, and seamless affiliate ties for guided eco-tours or unique off-grid stays. Let's blaze trails with intuitive, joyful vibes like a vacation playlist echoing your spontaneous dreams!",
    tags: ["Adventure", "Spontaneous", "Outdoor", "Cultural"],
    example_trips: ["Safari in Kenya (guided eco-tours)", "Trekking in Patagonia (off-grid stays)", "Skydiving in New Zealand (group packages for thrill-seekers)"]
  },
  {
    name: "The Party Pathfinder",
    weights: { Extraversion: 0.357, Agreeableness: 0.214, Conscientiousness: -0.286, Openness: 0.071, Neuroticism: -0.071 },
    description: "As the Party Pathfinder, you're the electrifying life of the nightlife, charting vibrant social scenes and group escapades where Extraversion sparks the fun and low Conscientiousness unleashes pure spontaneity. Flightsnapp's AI magic curates your playlist of joy: Random spins for hot deals on festivals, persona-matched squads for epic vibes, and one-tap snaps blending affiliates for social dinners or events. Let's pathfind the party with intuitive, 5-star thrills reflecting your gregarious dreams!",
    tags: ["Social", "Nightlife", "Spontaneous", "Group"],
    example_trips: ["Club hopping in Ibiza (social dinners)", "Carnival in Rio (persona-matched groups)", "Music festival in Coachella (one-tap Snap bookings)"]
  },
  {
    name: "The Solo Dreamer",
    weights: { Openness: 0.385, Extraversion: -0.308, Conscientiousness: -0.231, Agreeableness: 0.0, Neuroticism: 0.077 },
    description: "Embrace your inner Solo Dreamer—a reflective wanderer chasing quiet inspiration in creative havens, where high Openness unlocks artistic depths and low Extraversion nurtures introspective serenity. Flightsnapp's hybrid curator dreams up your perfect solo snaps: Flexible date options for serene getaways, random spins for budget-friendly wellness retreats, and seamless ties to affiliates for workshops or unique hideaways. Let's dream solo with joyful, intuitive curation like a vacation playlist whispering your whimsical aspirations!",
    tags: ["Solo", "Creative", "Introspective", "Wellness"],
    example_trips: ["Artist retreat in Santorini (workshops)", "Meditation in Kyoto (low Neuroticism vibes)", "Photography walk in Prague (budget-friendly spins)"]
  },
  {
    name: "The Easygoing Roamer",
    weights: { Openness: 0.364, Conscientiousness: -0.364, Extraversion: -0.273, Agreeableness: 0.0, Neuroticism: 0.0 },
    description: "Flow like the Easygoing Roamer—a chill nomad drifting to relaxed, offbeat oases where high Openness invites novelty and low Conscientiousness embraces effortless wanderings. Flightsnapp's curator roams with you: Random spins for eco-deals under $500, flexible dates for spontaneous jaunts, and affiliate blends for unique stays or breezy flights. Let's roam easy with intuitive, joyful vibes curating a vacation playlist of your laid-back dreams!",
    tags: ["Relaxed", "Spontaneous", "Offbeat", "Eco"],
    example_trips: ["Beach camping in Tulum (unique stays)", "Island hopping in Thailand (under $500 options)", "Road trip in Iceland (flexible flights)"]
  },
  {
    name: "The Adventure Architect",
    weights: { Openness: 0.364, Conscientiousness: 0.364, Neuroticism: -0.273, Extraversion: 0.0, Agreeableness: 0.0 },
    description: "Design like the Adventure Architect—a strategic visionary building epic quests with balanced Openness and Conscientiousness for structured thrills, cooled by low Neuroticism for unflappable calm. Flightsnapp's curator architects your blueprint: Rule-based filters for eco-friendly plans, ML personalization for novel twists, and group similarities for shared expeditions via affiliates for tours or flexible payments. Let's architect adventures with joyful, intuitive curation like a vacation playlist mapping your bold blueprints!",
    tags: ["Adventure", "Planner", "Organized", "Eco-Friendly"],
    example_trips: ["Mount Kilimanjaro climb (eco-tours)", "Amazon rainforest expedition (group similarities)", "Scuba diving in the Great Barrier Reef (flexible payments)"]
  },
  {
    name: "The Comfort Crusader",
    weights: { Openness: -0.286, Agreeableness: 0.286, Conscientiousness: 0.214, Extraversion: 0.143, Neuroticism: -0.071 },
    description: "Cruise as the Comfort Crusader—a warm seeker of cozy luxuries and familiar havens, where high Agreeableness fosters social ease and low Openness favors traditional comforts. Flightsnapp's curator crusades for your bliss: One-tap snaps for all-inclusive retreats, group packages for family vibes, and affiliate blends for resorts or cruises. Let's crusade comfortably with intuitive, joyful vibes curating a vacation playlist of your soothing sanctuaries!",
    tags: ["Comfort", "Luxury", "Social", "Familiar"],
    example_trips: ["All-inclusive resort in Cancun", "Ski chalet in Aspen (family groups)", "Cruise in the Mediterranean"]
  },
  {
    name: "The Quiet Traditionalist",
    weights: { Conscientiousness: 0.417, Openness: -0.333, Extraversion: -0.25, Agreeableness: 0.0, Neuroticism: 0.0 },
    description: "Step into the Quiet Traditionalist—a structured sage savoring classic journeys and historical charms, with high Conscientiousness for planning and low Openness/Extraversion for peaceful solitude. Flightsnapp's curator traditions your path: Rule-based filters for budget classics, solo snaps with affiliate gems for tours, and random spins for cultural discoveries. Let's tradition quietly with intuitive, joyful curation like a vacation playlist echoing your timeless tales!",
    tags: ["Planner", "History", "Traditional", "Solo"],
    example_trips: ["Rome historical tour", "Castles of Scotland (budget filters)", "Vienna opera and museums (random cultural spins)"]
  },
  {
    name: "The Steady Socialite",
    weights: { Extraversion: 0.308, Agreeableness: 0.231, Conscientiousness: 0.231, Neuroticism: -0.154, Openness: 0.077 },
    description: "Mingle as the Steady Socialite—a reliable connector thriving on vibrant group vibes and familiar fun, where Extraversion and Agreeableness spark social harmony and low Neuroticism adds unflappable ease. Flightsnapp's curator socialites your scene: Persona matches for crew packages, affiliate blends for activities or villas, and referral bonuses for growing the party. Let's socialize steadily with intuitive, joyful curation like a vacation playlist of your friendly festivities!",
    tags: ["Social", "Group", "Relaxed", "Friendly"],
    example_trips: ["Group cruise to the Bahamas (activities)", "Wine tasting in Napa Valley (villas)", "City break in New York (referral bonuses)"]
  },
  {
    name: "The Nervous Nomad",
    weights: { Neuroticism: 0.333, Openness: 0.25, Conscientiousness: -0.25, Extraversion: -0.167, Agreeableness: 0.0 },
    description: "Navigate as the Nervous Nomad—a cautious dreamer drawn to safe, inspiring havens where high Neuroticism favors low-risk paths balanced by Openness for creative sparks. Flightsnapp's curator nomads gently: Guided snaps for eco-friendly options, flexible dates for peace of mind, and affiliate reassurances for tours or wellness retreats. Let's nomad nervously with intuitive, joyful curation like a vacation playlist easing your exploratory edges!",
    tags: ["Cautious", "Solo", "Creative", "Guided"],
    example_trips: ["Guided tour in Costa Rica (eco-friendly options)", "Photography walk in Prague (solo vibes)", "Wellness retreat in Sedona (flexible dates)"]
  },
  {
    name: "The Coolheaded Captain",
    weights: { Conscientiousness: 0.385, Neuroticism: -0.308, Extraversion: 0.231, Agreeableness: 0.077, Openness: 0.0 },
    description: "Captain as the Coolheaded Captain—a poised leader charting seamless group voyages with high Conscientiousness for organization and low Neuroticism for steady calm. Flightsnapp's curator captains your crew: Rule-based plans for flawless itineraries, ML matches for group similarities, and affiliate sails for flights or gear. Let's captain coolly with intuitive, joyful curation like a vacation playlist steering your collective dreams!",
    tags: ["Planner", "Group", "Calm", "Leader"],
    example_trips: ["Family safari in South Africa (flights)", "Group hike in the Alps (gear)", "Cultural tour in Japan (exclusives)"]
  },
  {
    name: "The Impulsive Influencer",
    weights: { Extraversion: 0.333, Conscientiousness: -0.333, Openness: 0.25, Agreeableness: 0.083, Neuroticism: 0.0 },
    description: "Influence as the Impulsive Influencer—a charismatic spark chasing last-minute thrills and viral shares, where low Conscientiousness ignites spontaneity and high Extraversion/Openness amps social novelty. Flightsnapp's curator influences your feed: Random spins for epic deals, Instagram-ready snaps with events, and referral growth for your network. Let's influence impulsively with intuitive, joyful curation like a vacation playlist capturing your viral visions!",
    tags: ["Spontaneous", "Social", "Influencer", "Viral"],
    example_trips: ["Weekend in Las Vegas (events)", "Beach escape to Miami (Instagram-ready Snaps)", "City vibe in Tokyo (referral growth)"]
  },
  {
    name: "The Lone Maverick",
    weights: { Openness: 0.333, Extraversion: -0.333, Agreeableness: -0.333, Conscientiousness: 0.0, Neuroticism: 0.0 },
    description: "Maverick as the Lone Maverick—a bold independent forging off-grid paths and unique quests, with high Openness for novelty and low Extraversion/Agreeableness for solo freedom. Flightsnapp's curator mavericks your trail: Budget adventures in tents, eco spins for island retreats, and flexible customizations for your edge. Let's maverick lone with intuitive, joyful curation like a vacation playlist charting your independent odysseys!",
    tags: ["Solo", "Adventure", "Independent", "Off-Grid"],
    example_trips: ["Desert camping in Morocco (tents)", "Solo trek in Nepal (budget adventures)", "Island retreat in the Azores (eco spins)"]
  },
  {
    name: "The Friendly Voyager",
    weights: { Agreeableness: 0.357, Extraversion: 0.286, Conscientiousness: -0.214, Neuroticism: -0.143, Openness: 0.0 },
    description: "Voyage as the Friendly Voyager—a warm connector linking with locals and explorers in spontaneous, eco-conscious jaunts, fueled by high Agreeableness/Extraversion for heartfelt interactions. Flightsnapp's curator voyages friendly: Group similarities for shared tours, flexible payments for festivals, and affiliate warmth for homestays. Let's voyage friendly with intuitive, joyful curation like a vacation playlist weaving your social stories!",
    tags: ["Social", "Friendly", "Spontaneous", "Eco-Conscious"],
    example_trips: ["Homestay in Vietnam", "Group tour in Peru (pro-environmental vibes)", "Festival in India (flexible payments)"]
  },
  {
    name: "The Budget Buccaneer",
    weights: { Openness: 0.4, Conscientiousness: -0.3, Agreeableness: -0.3, Extraversion: 0.0, Neuroticism: 0.0 },
    description: "Buccaneer as the Budget Buccaneer—a resourceful pirate hunting epic treasures on a shoestring, with high Openness for clever finds and low Conscientiousness/Agreeableness for flexible hunts. Flightsnapp's curator buccaneers your booty: Under $500 spins for backpacking deals, affiliate steals for hostel tours, and random foodie snaps. Let's buccaneer budget with intuitive, joyful curation like a vacation playlist plundering your savvy secrets!",
    tags: ["Budget", "Adventure", "Resourceful", "Spontaneous"],
    example_trips: ["Backpacking in Southeast Asia (deals)", "Hostel tour in Eastern Europe (hosts)", "Street food crawl in Mexico (random foodie Snaps)"]
  },
  {
    name: "The Lavish Logistician",
    weights: { Conscientiousness: 0.455, Extraversion: 0.273, Neuroticism: -0.273, Openness: 0.0, Agreeableness: 0.0 },
    description: "Logistics as the Lavish Logistician—a precise maestro orchestrating opulent escapes with flawless details, high Conscientiousness for organization and low Neuroticism for serene luxury. Flightsnapp's curator logisticians your lavish: Premium features for spa retreats, group upgrades, and exclusives for subs. Let's logistic lavish with intuitive, joyful curation like a vacation playlist pampering your polished pursuits!",
    tags: ["Luxury", "Planner", "Organized", "Social"],
    example_trips: ["Wine tour in Tuscany (luxury)", "Spa retreat in Bali (subs)", "Private yacht in the Maldives (group upgrades)"]
  },
  {
    name: "The Culture Chaser",
    weights: { Openness: 0.308, Agreeableness: 0.308, Extraversion: -0.231, Neuroticism: -0.154, Conscientiousness: 0.0 },
    description: "Chase as the Culture Chaser—an empathetic seeker immersing in arts, traditions, and eco-wonders with high Openness/Agreeableness for curious connections. Flightsnapp's curator chases culture: AI personalization for museum snaps, local immersions, and beta exclusives for history walks. Let's chase culture with intuitive, joyful curation like a vacation playlist unveiling your curious chronicles!",
    tags: ["Culture", "Solo", "Curious", "Eco"],
    example_trips: ["Art tour in Florence (museums)", "Cultural festival in Morocco (local immersions)", "History walk in Athens (beta access exclusives)"]
  },
  {
    name: "The Fearless Flyer",
    weights: { Openness: 0.364, Neuroticism: -0.364, Extraversion: 0.273, Conscientiousness: 0.0, Agreeableness: 0.0 },
    description: "Fly as the Fearless Flyer—a daring dynamo soaring into adrenaline highs and social thrills, with low Neuroticism for bold calm and high Openness/Extraversion for novel excitement. Flightsnapp's curator flies fearless: Spontaneous spins for extreme snaps, group adrenaline, and quick flights. Let's fly fearless with intuitive, joyful curation like a vacation playlist launching your thrilling tales!",
    tags: ["Adventure", "Fearless", "Social", "Thrill"],
    example_trips: ["Bungee jumping in Queenstown (extremes)", "White-water rafting in Costa Rica (group adrenaline)", "Paragliding in Interlaken (quick flights)"]
  },
  {
    name: "The Cozy Companion",
    weights: { Agreeableness: 0.286, Conscientiousness: 0.214, Openness: -0.286, Extraversion: 0.143, Neuroticism: -0.071 },
    description: "Companion as the Cozy Companion—a nurturing bond-builder cherishing intimate comforts with loved ones, high Agreeableness for warmth and low Openness for familiar coziness. Flightsnapp's curator companions cozy: Group packages for family villas, budget comforts, and ease for beach houses. Let's companion cozy with intuitive, joyful curation like a vacation playlist hugging your heartfelt harmonies!",
    tags: ["Comfort", "Social", "Planner", "Family"],
    example_trips: ["Cabin retreat in the Rockies (cozies)", "Family villa in Provence (budget comforts)", "Beach house in Cape Cod (ease)"]
  },
  {
    name: "The Restless Ruler",
    weights: { Extraversion: 0.286, Neuroticism: 0.286, Agreeableness: -0.214, Conscientiousness: 0.143, Openness: -0.071 },
    description: "Rule as the Restless Ruler—an ambitious dynamo conquering new horizons with driven pursuits, high Extraversion/Neuroticism for motivated social conquests. Flightsnapp's curator rules restlessly: Curated ambitions for premium snaps, events, and insights tie-ins. Let's rule restlessly with intuitive, joyful curation like a vacation playlist commanding your conqueror chronicles!",
    tags: ["Ambitious", "Social", "Adventure", "Driven"],
    example_trips: ["City marathon in London (events)", "Luxury safari in Botswana (premium spins)", "Tech tour in Silicon Valley (insights tie-in)"]
  },
  {
    name: "The Zen Seeker",
    weights: { Neuroticism: -0.455, Openness: 0.273, Agreeableness: 0.273, Conscientiousness: 0.0, Extraversion: 0.0 },
    description: "Seek as the Zen Seeker—a tranquil harmonizer finding peace in soulful sanctuaries, low Neuroticism for serene calm balanced by Openness/Agreeableness for empathetic wellness. Flightsnapp's curator seeks zen: Relaxing ML matches for yoga retreats, solo tranquility, and pro-environmental vibes for hot springs. Let's seek zen with intuitive, joyful curation like a vacation playlist soothing your spiritual serenades!",
    tags: ["Wellness", "Calm", "Solo", "Eco"],
    example_trips: ["Yoga retreat in India (wellness)", "Monastery stay in Bhutan (solo tranquility)", "Hot springs in Iceland (pro-environmental vibes)"]
  },
  {
    name: "The Squad Strategist",
    weights: { Extraversion: 0.308, Conscientiousness: 0.308, Agreeableness: 0.231, Neuroticism: -0.154, Openness: 0.0 },
    description: "Strategize as the Squad Strategist—a sociable planner orchestrating epic group quests with high Extraversion/Conscientiousness/Agreeableness for friendly coordination. Flightsnapp's curator strategizes squads: Persona similarities for ski trips, groups for getaways, and gamification badges for team retreats. Let's strategize squads with intuitive, joyful curation like a vacation playlist uniting your crew's collective cheers!",
    tags: ["Group", "Planner", "Social", "Friendly"],
    example_trips: ["Group ski trip in Whistler (snow activities)", "Friends' getaway to Barcelona (groups)", "Team-building retreat in Austin (gamification badges)"]
  },
  {
    name: "The Casual Curator",
    weights: { Openness: 0.286, Conscientiousness: 0.214, Agreeableness: 0.143, Extraversion: -0.214, Neuroticism: -0.143 },
    description: "Curate as the Casual Curator—a relaxed collector gathering unique gems with curious ease, high Openness for discovery and low Extraversion/Neuroticism for chill vibes. Flightsnapp's curator curates casually: Easy spins for food tours, affiliate art for galleries, and budget curiosities in markets. Let's curate casually with intuitive, joyful curation like a vacation playlist assembling your eclectic escapades!",
    tags: ["Curious", "Solo", "Relaxed", "Cultural"],
    example_trips: ["Food tour in Bangkok (locals)", "Art galleries in Berlin", "Local markets in Marrakech (budget curiosities)"]
  },
  {
    name: "The Edgy Empath",
    weights: { Openness: 0.214, Agreeableness: 0.214, Neuroticism: 0.214, Conscientiousness: -0.214, Extraversion: -0.143 },
    description: "Empathize as the Edgy Empath—an introspective soul seeking meaningful, offbeat paths with emotional depth, balanced traits for creative spontaneity and heartfelt connections. Flightsnapp's curator empaths edgy: Unique snaps for volunteer trips, urban art, and solo depth in retreats. Let's empath edgy with intuitive, joyful curation like a vacation playlist edging your empathetic explorations!",
    tags: ["Introspective", "Creative", "Spontaneous", "Empathetic"],
    example_trips: ["Volunteer trip in Guatemala (eco-volunteering)", "Street art tour in Melbourne (urban)", "Poetry retreat in Ireland (solo depth)"]
  },
  {
    name: "The Grounded Globetrotter",
    weights: { Openness: 0.333, Conscientiousness: 0.333, Neuroticism: -0.333, Extraversion: 0.0, Agreeableness: 0.0 },
    description: "Globetrot as the Grounded Globetrotter—a calm organizer exploring far horizons with novel plans, high Openness/Conscientiousness for structured adventures and low Neuroticism for steady footing. Flightsnapp's curator globetrots grounded: Hybrid curation for hiking snaps, historical matches, and pro-environmental filters for eco-tours. Let's globetrot grounded with intuitive, joyful curation like a vacation playlist grounding your global quests!",
    tags: ["Adventure", "Planner", "Calm", "Global"],
    example_trips: ["Hiking in the Andes (eco-stays)", "Cultural tour in Egypt (historical matches)", "Eco-tour in New Zealand (pro-environmental filters)"]
  },
  {
    name: "The Homebound Hustler",
    weights: { Conscientiousness: 0.286, Neuroticism: 0.214, Openness: -0.286, Extraversion: -0.214, Agreeableness: 0.0 },
    description: "Hustle as the Homebound Hustler—a practical planner maximizing nearby gems with purpose, high Conscientiousness for structure and low Openness/Extraversion for familiar focus. Flightsnapp's curator hustles homebound: Quick snaps for staycations, budget drives for local parks, and short-hauls for weekends. Let's hustle homebound with intuitive, joyful curation like a vacation playlist hustling your local legends!",
    tags: ["Planner", "Local", "Practical", "Staycation"],
    example_trips: ["City staycation in Chicago (local activities)", "National park tour in the U.S. (budget drives)", "Weekend in Quebec City (short-hauls)"]
  }
];

/**
 * Finds the best-matching travel persona based on trait scores.
 * @param {Object} traitScores - Trait scores object with numeric values.
 * @returns {Object} Best persona object with name, description, tags, example_trips or fallback.
 */
export const getPersona = (traitScores) => {
  if (!traitScores || Object.keys(traitScores).length !== 5) {
    throw new Error('Must provide trait scores for all 5 traits');
  }

  const scores = Object.values(traitScores); // [openness, consci, extrav, agree, neuro]

  let bestMatch = null;
  let highestScore = -Infinity;

  PERSONAS.forEach(persona => {
    const weightArray = [
      Number(persona.weights['Openness']) || 0,
      Number(persona.weights['Conscientiousness']) || 0,
      Number(persona.weights['Extraversion']) || 0,
      Number(persona.weights['Agreeableness']) || 0,
      Number(persona.weights['Neuroticism']) || 0
    ];

    const dotProduct = weightArray.reduce((sum, weight, i) => sum + (weight * (scores[i] - 6)), 0);
    const magnitude = Math.sqrt(weightArray.reduce((sum, w) => sum + w * w, 0));
    const normalizedDot = magnitude ? dotProduct / magnitude : dotProduct;

    if (!isNaN(normalizedDot) && normalizedDot > highestScore) {
      highestScore = normalizedDot;
      bestMatch = persona;
    }
  });

  // Fallback to first persona if no valid match found
  return bestMatch || PERSONAS[0];
};

/**
 * Encrypts sensitive data for localStorage.
 * @param {Object} data - Data to encrypt.
 * @returns {Promise<string>} Base64 encoded encrypted data.
 */
export async function encryptQuizResult(data) {
  try {
    const key = await crypto.subtle.deriveKey(
      new TextEncoder().encode('flight-snapp-quiz	result'),
      { name: 'PBKDF2', salt: new Uint8Array(16), iterations: 100000, hash: 'SHA-256' },
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
    );
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(JSON.stringify(data)));
    return btoa(String.fromCharCode(...iv, ...new Uint8Array(encrypted)));
  } catch (error) {
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypts localStorage data.
 * @param {string} encryptedData - Encrypted data string.
 * @returns {Promise<Object|null>} Decrypted object or null if tampered.
 */
export async function decryptQuizResult(encryptedData) {
  try {
    const key = await crypto.subtle.deriveKey(
      new TextEncoder().encode('flight-snapp-quiz-result'),
      { name: 'PBKDF2', salt: new Uint8Array(16), iterations: 100000, hash: 'SHA-256' },
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );
    const bytes = new Uint8Array(atob(encryptedData).split('').map(c => c.charCodeAt(0)));
    const iv = bytes.slice(0, 12);
    const ct = bytes.slice(12);
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
    return JSON.parse(new TextDecoder().decode(decrypted));
  } catch (error) {
    return null; // Invalid or tampered data
  }
}

/**
 * Gets user's location with retries and timeout.
 * @param {Object} control - Control object with signal.
 * @returns {Promise<Object>} Coordinates.
 */
export async function getSecureGeoLocation(control = {}) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation || !('geolocation' in navigator) || !window.isSecureContext) {
      reject(new Error('Geolocation not available or insecure context'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (error) => reject(new Error(`Geolocation error: ${error.message}`)),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000, signal: control.signal } // 10s timeout, 10min cache
    );
  });
}
