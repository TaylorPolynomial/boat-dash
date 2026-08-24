// Mediterranean -> Cook Islands route data.
// Coordinates are [lon, lat]. Label positions are hand-placed to land in open
// ocean for this specific route/projection — edit dx/dy or labelLon/labelLat
// if you change the route and something collides.
window.ROUTE_DATA = {
  stops: [
    { id: 1,  name: "Balearics",        lon: 2.6,    lat: 39.5,
      type: "milestone", label: "Depart · autumn",              dx: 14,  dy: -10, anchor: "start" },
    { id: 2,  name: "Gibraltar",        lon: -5.4,   lat: 36.1,
      type: "waypoint",  label: null },
    { id: 3,  name: "Canary Islands",   lon: -15.6,  lat: 28.3,
      type: "waypoint",  label: "Staging",                      dx: -12, dy: -14, anchor: "end" },
    { id: 4,  name: "Cape Verde",       lon: -23.6,  lat: 16.0,
      type: "waypoint",  label: "Atlantic launch",              dx: -14, dy: 22,  anchor: "end" },
    { id: 5,  name: "Caribbean",        lon: -61.5,  lat: 13.0,
      type: "hold",      label: "Caribbean · ~12 months",       dx: 0,   dy: -82, anchor: "middle" },
    { id: 6,  name: "Panama Canal",     lon: -79.9,  lat: 9.1,
      type: "waypoint",  label: "Panama transit",               dx: 26,  dy: 8,   anchor: "start" },
    { id: 7,  name: "Galápagos",        lon: -90.3,  lat: -0.7,
      type: "waypoint",  label: "Brief stop",                   dx: 20,  dy: -24, anchor: "start" },
    { id: 8,  name: "Marquesas",        lon: -139.5, lat: -9.0,
      type: "waypoint",  label: "",                             dx: 10,  dy: -14, anchor: "start" },
    { id: 9,  name: "French Polynesia", lon: -149.4, lat: -17.6,
      type: "hold",      label: "French Polynesia · ~4–6 months", dx: 0, dy: -74, anchor: "middle" },
    { id: 10, name: "Cook Islands",     lon: -159.8, lat: -21.2,
      type: "milestone", label: "Arrive · pre-cyclone season",  dx: -18, dy: -10, anchor: "end" }
  ],

  // Each leg is a chain of stop ids (intermediate staging hops included).
  // One label per leg, hand-placed at [labelLon, labelLat] in open ocean.
  legs: [
    { path: [1, 2, 3, 4], distance: "staging hops", duration: "~weeks", season: "Sep–Oct",
      note: "via Gibraltar, Canaries", labelLon: -9, labelLat: 33.5, anchor: "middle" },
    { path: [4, 5], distance: "~2,100 nm", duration: "~2–3 wks", season: "Nov–Dec",
      note: "the trade-wind crossing", labelLon: -38, labelLat: 26, anchor: "middle" },
    { path: [5, 6], distance: "~1,000 nm", duration: "~1 wk", season: "Mar–Apr",
      labelLon: -68, labelLat: 16, anchor: "middle" },
    { path: [6, 7], distance: "~900 nm", duration: "~1 wk", season: "",
      labelLon: -85, labelLat: -9, anchor: "middle" },
    { path: [7, 8], distance: "~3,000 nm", duration: "~3 wks", season: "Apr–May",
      note: "the big one", labelLon: -115, labelLat: 4, anchor: "middle" },
    { path: [8, 9], distance: "island cruising", duration: "~4–6 months", season: "May–Oct",
      note: "Marquesas → Tuamotus → Societies", labelLon: -142, labelLat: -1.5, anchor: "middle" },
    { path: [9, 10], distance: "~600 nm", duration: "~5 days", season: "Sep–Oct",
      note: "before SP cyclone season", labelLon: -157, labelLat: -29, anchor: "middle" }
  ]
};
