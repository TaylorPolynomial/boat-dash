// Draws the Med -> Cook Islands route map into an <svg>.
// Requires d3 v7, topojson-client, window.LAND_TOPOJSON, window.ROUTE_DATA
// (loaded as separate <script> tags before this file).
window.drawRouteMap = function (svgSelector, opts) {
  "use strict";
  opts = opts || {};

  var COLORS = {
    deep: "#0b3346",
    land: "#1b2b33",
    landEdge: "#2c4650",
    sea: "#15697f",
    brass: "#e8b24c",
    foam: "#eaf3f2",
    muted: "#7fa6b1"
  };

  var svg = d3.select(svgSelector);
  var node = svg.node();
  if (!node) return;

  var W = opts.width || node.clientWidth || 1600;
  var H = opts.height || node.clientHeight || 800;
  var compact = !!opts.compact;
  var pad = opts.padding || (compact ? 34 : 70);

  svg.attr("viewBox", "0 0 " + W + " " + H)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("width", "100%")
    .style("height", "100%");
  svg.selectAll("*").remove();

  var stops = window.ROUTE_DATA.stops;
  var legs = window.ROUTE_DATA.legs;
  var byId = {};
  stops.forEach(function (s) { byId[s.id] = s; });

  function interpArc(a, b, n) {
    n = n || 40;
    var interp = d3.geoInterpolate([a.lon, a.lat], [b.lon, b.lat]);
    var coords = [];
    for (var i = 0; i <= n; i++) coords.push(interp(i / n));
    return { type: "LineString", coordinates: coords };
  }

  // Build every leg's densified arcs up front — used both for drawing and
  // for fitExtent, so the crop always matches the curves actually drawn.
  var legArcs = legs.map(function (leg) {
    var segs = [];
    for (var i = 0; i < leg.path.length - 1; i++) {
      segs.push(interpArc(byId[leg.path[i]], byId[leg.path[i + 1]], 40));
    }
    return { leg: leg, segs: segs };
  });

  var allPoints = [];
  stops.forEach(function (s) { allPoints.push([s.lon, s.lat]); });
  legArcs.forEach(function (la) {
    la.segs.forEach(function (seg) {
      seg.coordinates.forEach(function (c) { allPoints.push(c); });
    });
  });
  legs.forEach(function (leg) { allPoints.push([leg.labelLon, leg.labelLat]); });

  var fitFC = { type: "Feature", geometry: { type: "MultiPoint", coordinates: allPoints } };

  var projection = d3.geoNaturalEarth1().rotate([50, 0]);
  projection.fitExtent([[pad, pad], [W - pad, H - pad]], fitFC);
  var path = d3.geoPath(projection);

  var land = topojson.feature(window.LAND_TOPOJSON, window.LAND_TOPOJSON.objects.land);

  // ---- ocean ----
  svg.append("rect").attr("x", 0).attr("y", 0).attr("width", W).attr("height", H).attr("fill", COLORS.deep);

  // ---- faint graticule ----
  var graticule = d3.geoGraticule().step([15, 15]);
  svg.append("path").datum(graticule())
    .attr("d", path).attr("fill", "none")
    .attr("stroke", COLORS.sea).attr("stroke-width", 0.5).attr("opacity", 0.08);

  // ---- land ----
  svg.append("path").datum(land)
    .attr("d", path)
    .attr("fill", COLORS.land)
    .attr("stroke", COLORS.landEdge)
    .attr("stroke-width", 0.6);

  // ---- arrowhead marker ----
  var defs = svg.append("defs");
  defs.append("marker")
    .attr("id", "routeArrow")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 8).attr("refY", 5)
    .attr("markerWidth", compact ? 4.5 : 6)
    .attr("markerHeight", compact ? 4.5 : 6)
    .attr("orient", "auto-start-reverse")
    .append("path").attr("d", "M0,0L10,5L0,10z").attr("fill", COLORS.brass);

  // ---- hold halos (under everything else) ----
  var holdR = compact ? 30 : 56;
  var haloG = svg.append("g");
  stops.filter(function (s) { return s.type === "hold"; }).forEach(function (s) {
    var xy = projection([s.lon, s.lat]);
    haloG.append("circle")
      .attr("cx", xy[0]).attr("cy", xy[1]).attr("r", holdR)
      .attr("fill", COLORS.brass).attr("opacity", 0.15);
  });

  // ---- passages ----
  var legG = svg.append("g");
  legArcs.forEach(function (la) {
    la.segs.forEach(function (seg, i) {
      legG.append("path").datum(seg)
        .attr("d", path)
        .attr("fill", "none")
        .attr("stroke", COLORS.brass)
        .attr("stroke-width", compact ? 1.8 : 2.5)
        .attr("stroke-linecap", "round")
        .attr("marker-end", i === la.segs.length - 1 ? "url(#routeArrow)" : null);
    });
  });

  // ---- waypoint / milestone / hold-centre dots ----
  var dotG = svg.append("g");
  stops.forEach(function (s) {
    var xy = projection([s.lon, s.lat]);
    var r = s.type === "waypoint" ? (compact ? 3 : 4) : (compact ? 4 : 5.5);
    dotG.append("circle")
      .attr("cx", xy[0]).attr("cy", xy[1]).attr("r", r)
      .attr("fill", COLORS.brass)
      .attr("stroke", COLORS.deep)
      .attr("stroke-width", 1.5);
  });

  // ---- labels ----
  var labelG = svg.append("g");
  var stopFont = compact ? 10 : 14;
  var stayFont = compact ? 9 : 12;
  var legFont = compact ? 8.5 : 11;

  stops.forEach(function (s) {
    if (s.label === null) return;
    var xy = projection([s.lon, s.lat]);
    var lx = xy[0] + s.dx, ly = xy[1] + s.dy;
    var isHold = s.type === "hold";
    var t = labelG.append("text")
      .attr("x", lx).attr("y", ly)
      .attr("text-anchor", s.anchor || "start")
      .attr("font-family", "'Inter', system-ui, sans-serif")
      .attr("font-weight", isHold ? 700 : 600)
      .attr("font-size", isHold ? stayFont + (compact ? 1 : 2) : stopFont)
      .attr("fill", isHold ? COLORS.brass : COLORS.foam);
    // Two-line label: bold place name, then the stay/note beneath in muted ink.
    t.append("tspan").attr("x", lx).attr("dy", 0).text(s.name);
    if (s.label) {
      t.append("tspan").attr("x", lx).attr("dy", (compact ? "1.15em" : "1.3em"))
        .attr("fill", isHold ? COLORS.brass : COLORS.muted)
        .attr("font-weight", isHold ? 700 : 500)
        .attr("font-size", isHold ? stayFont : stopFont - 2)
        .text(s.label);
    }
  });

  legArcs.forEach(function (la) {
    var leg = la.leg;
    var xy = projection([leg.labelLon, leg.labelLat]);
    var parts = [leg.distance, leg.duration, leg.season].filter(Boolean);
    var line1 = parts.join(" · ");
    var t = labelG.append("text")
      .attr("x", xy[0]).attr("y", xy[1])
      .attr("text-anchor", leg.anchor || "middle")
      .attr("font-family", "'Inter', system-ui, sans-serif")
      .attr("font-weight", 500)
      .attr("fill", COLORS.muted)
      .attr("font-size", legFont);
    t.append("tspan").attr("x", xy[0]).attr("dy", 0).text(line1);
    if (leg.note && !compact) {
      t.append("tspan").attr("x", xy[0]).attr("dy", compact ? "1.1em" : "1.25em")
        .attr("font-style", "italic")
        .attr("fill", COLORS.muted)
        .attr("opacity", 0.85)
        .text(leg.note);
    }
  });
};
