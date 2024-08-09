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
    founded: 1946,
    mascot: "Lucky the Leprechaun",
    teamColors: ["Green", "White", "Black", "Gold"],
    championships: 17,
    keyPlayers: [
      { name: "Jayson Tatum", position: "Small Forward" },
      { name: "Jaylen Brown", position: "Shooting Guard" },
      { name: "Marcus Smart", position: "Point Guard" },
    ],
    headCoach: "Joe Mazzulla",
    recentForm: "Won 7 of last 10 games",
    currentSeasonStats: {
      wins: 57,
      losses: 25,
      conferenceName: "Eastern",
      conferencePosition: 2,
    },
    rivalries: ["Los Angeles Lakers", "Philadelphia 76ers"],
    upcomingFixtures: [
      { opponent: "Miami Heat", date: "2024-08-15", location: "Home" },
      { opponent: "Philadelphia 76ers", date: "2024-08-18", location: "Away" },
    ],
    teamHistory:
      "The Celtics are one of the most successful franchises in NBA history, with a record 17 championships. They dominated the league in the 1960s, led by legendary coach Red Auerbach and star player Bill Russell.",
    fanbase:
      "Known as some of the most passionate fans in the NBA, Celtics supporters are often referred to as the 'Green Army'.",
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
    founded: 1947,
    mascot: "None (previously had Jack Nicholson as unofficial mascot)",
    teamColors: ["Purple", "Gold"],
    championships: 17,
    keyPlayers: [
      { name: "LeBron James", position: "Small Forward" },
      { name: "Anthony Davis", position: "Power Forward" },
      { name: "Russell Westbrook", position: "Point Guard" },
    ],
    headCoach: "Darvin Ham",
    recentForm: "Won 6 of last 10 games",
    currentSeasonStats: {
      wins: 43,
      losses: 39,
      conferenceName: "Western",
      conferencePosition: 7,
    },
    rivalries: ["Boston Celtics", "LA Clippers"],
    upcomingFixtures: [
      {
        opponent: "Golden State Warriors",
        date: "2024-08-12",
        location: "Away",
      },
      { opponent: "Phoenix Suns", date: "2024-08-16", location: "Home" },
    ],
    teamHistory:
      "The Lakers are one of the most storied franchises in NBA history, tied with the Celtics for the most championships. They've been home to many NBA legends including Magic Johnson, Kareem Abdul-Jabbar, Kobe Bryant, and Shaquille O'Neal.",
    fanbase:
      "The Lakers have a global fanbase and are known for their celebrity fans, often seen courtside at home games.",
  },
  {
    id: "man_utd",
    name: "Manchester United",
    league: "premier",
    city: "Manchester",
    country: "United Kingdom",
    timezone: "Europe/London",
    homeArena: "Old Trafford",
    founded: 1878,
    mascot: "Fred the Red",
    teamColors: ["Red", "White", "Black"],
    championships: 20, // Premier League titles
    keyPlayers: [
      { name: "Bruno Fernandes", position: "Midfielder" },
      { name: "Marcus Rashford", position: "Forward" },
      { name: "David de Gea", position: "Goalkeeper" },
    ],
    headCoach: "Erik ten Hag",
    recentForm: "Won 6 of last 10 games",
    currentSeasonStats: {
      wins: 23,
      losses: 9,
      draws: 6,
      leaguePosition: 3,
    },
    rivalries: ["Liverpool", "Manchester City", "Arsenal"],
    upcomingFixtures: [
      { opponent: "Liverpool", date: "2024-08-11", location: "Away" },
      { opponent: "Tottenham Hotspur", date: "2024-08-19", location: "Home" },
    ],
    teamHistory:
      "Manchester United is one of the most successful clubs in English football history. They've won a record 20 league titles and have a rich history of producing talented players through their youth academy.",
    fanbase:
      "Known as the 'Red Devils', Manchester United has one of the largest and most widespread fanbases in world football.",
  },
  // ... Add similar detailed information for other teams
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
