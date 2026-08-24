// The Boat Fund — all dashboard data lives here.
// Edit these values (including the "entries" list below) and reload the
// page to update the dashboard. There is no in-page editor; this file is
// the only source of data.

window.BOAT_CONFIG = {
  // Total amount you're saving toward, in GBP.
  target: 75000,

  // How much you'd already saved before you started logging months here.
  startBalance: 6000,

  // The month you started this savings plan, format "YYYY-MM".
  // Used to calculate the "Time to departure" progress figure.
  planStart: "2026-08",

  // The month you're aiming to hit the target by / depart, format "YYYY-MM".
  targetDate: "2028-12",

  // Subtitle shown under the title.
  subtitle: "Raising children on the edge of the world",

  // Monthly savings log — the only way to add data (no in-page editor).
  // Each entry is { ym: "YYYY-MM", amount: <number in GBP> }.
  entries: [
    { ym: "2026-06", amount: 1000 },
    // { ym: "2026-07", amount: 1642 }
  ]
};
