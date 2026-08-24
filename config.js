// The Boat Fund — starting values.
// Edit these and reload the page to change the plan's starting point.
//
// NOTE: once you use the on-screen "gear" editor at least once, your changes
// are saved in the browser (localStorage) and will take priority over this
// file from then on. To make this file the source of truth again, clear
// this site's storage in your browser (or open the dashboard in a fresh
// browser/profile).

window.BOAT_CONFIG = {
  // Total amount you're saving toward, in GBP.
  target: 75000,

  // How much you'd already saved before you started logging months here.
  startBalance: 6000,

  // The month you're aiming to hit the target by, format "YYYY-MM".
  targetDate: "2028-12",

  // Short name for the destination, shown as "<label> ★".
  label: "The boat",

  // Subtitle shown under the title.
  subtitle: "Raising children on the edge of the world",

  // Optional: pre-fill some months of savings.
  // Each entry is { ym: "YYYY-MM", amount: <number in GBP> }.
  entries: [
    { ym: "2026-06", amount: 1000 },
    // { ym: "2026-07", amount: 1642 }
  ]
};
