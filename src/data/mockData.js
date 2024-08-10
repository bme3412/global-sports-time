// src/data/mockData.js

export const leagues = [
    { id: "nba", name: "NBA (Basketball)" },
    { id: "premier", name: "Premier League (Soccer)" },
    { id: "nfl", name: "NFL (American Football)" },
    { id: "mlb", name: "MLB (Baseball)" },
    { id: "nhl", name: "NHL (Ice Hockey)" },
    { id: "laliga", name: "La Liga (Soccer)" },
    { id: "bundesliga", name: "Bundesliga (Soccer)" },
    { id: "seriea", name: "Serie A (Soccer)" },
    { id: "ligue1", name: "Ligue 1 (Soccer)" },
    { id: "ipl", name: "IPL (Cricket)" },
    { id: "nrl", name: "NRL (Rugby League)" },
    { id: "afl", name: "AFL (Australian Rules Football)" },
    { id: "f1", name: "Formula 1 (Motorsport)" },
    { id: "ufc", name: "UFC (Mixed Martial Arts)" },
  ];

export const teams = [
  {
    id: "celtics",
    name: "Boston Celtics",
    league: "nba",
    city: "Boston",
    state: "Massachusetts",
    country: "USA",
    timezone: "America/New_York",
    homeArena: "TD Garden",
  },
  {
    id: "lakers",
    name: "Los Angeles Lakers",
    league: "nba",
    city: "Los Angeles",
    state: "California",
    country: "USA",
    timezone: "America/Los_Angeles",
    homeArena: "Crypto.com Arena",
  },
  {
    id: "man_utd",
    name: "Manchester United",
    league: "premier",
    city: "Manchester",
    country: "United Kingdom",
    timezone: "Europe/London",
    homeArena: "Old Trafford",
  }
];

export const locations = [
  {
    id: "new_york",
    name: "New York City",
    country: "USA",
    timezone: "America/New_York",
  },
  {
    id: "los_angeles",
    name: "Los Angeles",
    country: "USA",
    timezone: "America/Los_Angeles",
  },
  {
    id: "chicago",
    name: "Chicago",
    country: "USA",
    timezone: "America/Chicago",
  },
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    timezone: "Europe/London",
  },
  { id: "tokyo", name: "Tokyo", country: "Japan", timezone: "Asia/Tokyo" },
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    timezone: "Australia/Sydney",
  },
  { id: "paris", name: "Paris", country: "France", timezone: "Europe/Paris" },
  {
    id: "berlin",
    name: "Berlin",
    country: "Germany",
    timezone: "Europe/Berlin",
  },
];

export const games = [
  {
    id: 1,
    league: "nba",
    team1: "celtics",
    team2: "lakers",
    time: "2024-08-10T19:00:00Z",
  },
  {
    id: 2,
    league: "nba",
    team1: "warriors",
    team2: "lakers",
    time: "2024-08-12T22:00:00Z",
  },
  {
    id: 3,
    league: "premier",
    team1: "man_utd",
    team2: "liverpool",
    time: "2024-08-11T14:00:00Z",
  },
  {
    id: 4,
    league: "nfl",
    team1: "chiefs",
    team2: "49ers",
    time: "2024-08-14T18:00:00Z",
  },
  {
    id: 5,
    league: "nba",
    team1: "celtics",
    team2: "warriors",
    time: "2024-08-15T23:30:00Z",
  },
  {
    id: 6,
    league: "premier",
    team1: "liverpool",
    team2: "man_utd",
    time: "2024-08-18T15:30:00Z",
  },
  {
    id: 7,
    league: "nfl",
    team1: "49ers",
    team2: "chiefs",
    time: "2024-08-20T20:00:00Z",
  },
];

export const viewingOptions = {
  nba: {
    usa: {
      services: [
        "NBA League Pass",
        "ESPN+",
        "ABC",
        "TNT",
        "NBA TV",
        "Hulu + Live TV",
        "YouTube TV",
        "Sling TV",
      ],
      cost: "$28.99/month for NBA League Pass, $69.99/month for Hulu + Live TV",
      restrictions:
        "Some games may be blacked out locally. National broadcasts are exclusive to ABC, ESPN, and TNT.",
      additionalInfo:
        "NBA League Pass offers both live and on-demand viewing. Local team games are typically blacked out on League Pass.",
    },
    uk: {
      services: ["Sky Sports", "NBA League Pass International", "NOW TV"],
      cost: "£24.99/month for Sky Sports, £14.99/month for NBA League Pass",
      restrictions:
        "No local blackouts, but some games may not be available live due to broadcasting rights",
      additionalInfo:
        "Sky Sports shows up to 5 live NBA games per week. NBA League Pass International offers all games with no blackouts.",
    },
    japan: {
      services: ["Rakuten", "NBA League Pass", "WOWOW"],
      cost: "¥2,990/month for NBA League Pass, ¥2,530/month for WOWOW",
      restrictions: "No local blackouts",
      additionalInfo:
        "Rakuten has exclusive rights to NBA games in Japan. WOWOW offers some NBA content including playoffs.",
    },
    canada: {
      services: ["NBA League Pass", "TSN", "Sportsnet", "RDS"],
      cost: "CAD 29.99/month for NBA League Pass, CAD 19.99/month for TSN Direct",
      restrictions: "Local team games may be blacked out on League Pass",
      additionalInfo:
        "TSN and Sportsnet split national broadcast rights. RDS provides French-language coverage.",
    },
    australia: {
      services: ["NBA League Pass", "ESPN", "SBS"],
      cost: "AUD 39.99/month for NBA League Pass, AUD 25/month for Kayo Sports (includes ESPN)",
      restrictions: "No local blackouts",
      additionalInfo:
        "SBS broadcasts some games for free. ESPN shows select games through Foxtel and Kayo Sports.",
    },
    germany: {
      services: ["NBA League Pass", "DAZN", "Sport1+"],
      cost: "€29.99/month for NBA League Pass, €14.99/month for DAZN",
      restrictions: "No local blackouts",
      additionalInfo:
        "DAZN shows select games and highlights. Sport1+ offers additional coverage.",
    },
    france: {
      services: ["NBA League Pass", "beIN SPORTS"],
      cost: "€29.99/month for NBA League Pass, €15/month for beIN SPORTS",
      restrictions: "No local blackouts",
      additionalInfo:
        "beIN SPORTS has exclusive broadcast rights for NBA games in France.",
    },
    spain: {
      services: ["NBA League Pass", "Movistar+"],
      cost: "€29.99/month for NBA League Pass, Movistar+ pricing varies",
      restrictions: "No local blackouts",
      additionalInfo:
        "Movistar+ holds exclusive TV rights for NBA games in Spain.",
    },
  },
  premier: {
    usa: {
      services: ["Peacock", "NBC Sports", "USA Network"],
      cost: "$4.99/month for Peacock",
      restrictions: "Not all games are televised",
      additionalInfo:
        "Peacock offers live streaming of all 380 Premier League matches",
    },
    uk: {
      services: ["Sky Sports", "BT Sport", "Amazon Prime Video"],
      cost: "£25/month for NOW TV Sky Sports Pass",
      restrictions: "Saturday 3pm games are not televised",
      additionalInfo:
        "Rights are split between Sky Sports, BT Sport, and Amazon Prime Video",
    },
  },
  nfl: {
    usa: {
      services: ["NFL Sunday Ticket", "CBS", "FOX", "NBC", "ESPN"],
      cost: "$73.49/month for NFL Sunday Ticket",
      restrictions: "Local games may be blacked out",
      additionalInfo:
        "NFL Sunday Ticket provides access to out-of-market games",
    },
    uk: {
      services: ["Sky Sports", "NFL Game Pass"],
      cost: "£14.99/month for NFL Game Pass",
      restrictions: "No local blackouts",
      additionalInfo:
        "NFL Game Pass provides live and on-demand access to all NFL games",
    },
  },
};
