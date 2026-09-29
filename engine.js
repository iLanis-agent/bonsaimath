/* BonsaiMath engine - honest bonsai sizing and care math. */
(function (root) {
  "use strict";

  /* Classic proportions: pot length about 2/3 of tree height
     (or of canopy spread, whichever is greater). */
  function potLengthIn(treeHeightIn, canopySpreadIn) {
    var basis = Math.max(treeHeightIn, canopySpreadIn || 0);
    return Math.round((basis * 2 / 3) * 10) / 10;
  }

  /* Pot depth roughly equals trunk caliper, slightly deeper for cascades. */
  function potDepthIn(trunkCaliperIn, style) {
    var mult = style === "cascade" ? 1.6 : (style === "literati" ? 0.8 : 1.1);
    return Math.round(trunkCaliperIn * mult * 10) / 10;
  }

  /* Pot width for oval/rectangle: about 60% of length. */
  function potWidthIn(potLengthInValue) {
    return Math.round(potLengthInValue * 0.6 * 10) / 10;
  }

  /* Soil volume in liters from inside dimensions (inches), minus 15%
     headspace. 61.02 cubic inches per liter. */
  function soilLiters(lengthIn, widthIn, depthIn) {
    var ci = lengthIn * widthIn * depthIn * 0.85;
    return Math.round((ci / 61.02) * 100) / 100;
  }

  /* Mix component liters. Classic conifer: 1:1:1 akadama:pumice:lava;
     deciduous leans heavier on akadama. */
  function mixVolumes(totalLiters, treeType) {
    var a = 0.34, p = 0.33, l = 0.33;
    if (treeType === "deciduous") { a = 0.5; p = 0.25; l = 0.25; }
    if (treeType === "tropical") { a = 0.6; p = 0.2; l = 0.2; }
    return {
      akadama: Math.round(totalLiters * a * 100) / 100,
      pumice: Math.round(totalLiters * p * 100) / 100,
      lava: Math.round(totalLiters * l * 100) / 100
    };
  }

  /* Watering interval in days: small pots and heat dry fast, conifers
     tolerate drier than deciduous. Base: pot liters hold ~1.5 days per
     liter in mild weather for deciduous. */
  function wateringDays(potLiters, treeType, tempF) {
    if (potLiters <= 0) return 0.5;
    var base = potLiters * 1.5;
    if (treeType === "conifer") base *= 1.3;
    if (treeType === "tropical") base *= 0.8;
    if (tempF >= 90) base *= 0.4;
    else if (tempF >= 80) base *= 0.6;
    else if (tempF >= 70) base *= 0.8;
    else if (tempF < 45) base *= 1.5;
    var d = Math.round(base * 10) / 10;
    return Math.max(0.5, d);
  }

  function wateringVerdict(days) {
    if (days <= 0.6) return "check morning and evening - it may need water twice a day";
    if (days <= 1) return "daily watering, sometimes twice in wind";
    if (days <= 2) return "daily check, water most days";
    return "every couple of days - always check the soil first";
  }

  /* Liquid fertilizer schedule: half-strength weekly during the growing
     season, monthly in winter for tropicals only. Returns feedings per
     month and label multiplier. */
  function feedingPlan(treeType, season) {
    if (season === "winter") {
      if (treeType === "tropical") return { perMonth: 1, strength: 0.25 };
      return { perMonth: 0, strength: 0 };
    }
    if (season === "spring") return { perMonth: 4, strength: 0.5 };
    if (season === "fall") return { perMonth: 2, strength: 0.5 };
    return { perMonth: 4, strength: treeType === "conifer" ? 0.25 : 0.5 };
  }

  /* Trunk thickening: field-growing thickens a trunk roughly 0.4 in/yr
     (fast species) vs 0.15 in/yr in a bonsai pot. Years to target. */
  function thickeningYears(currentIn, targetIn, method, speciesSpeed) {
    if (targetIn <= currentIn) return 0;
    var rate = method === "ground" ? 0.4 : 0.15;
    if (speciesSpeed === "slow") rate *= 0.6;
    if (speciesSpeed === "fast") rate *= 1.4;
    return Math.round(((targetIn - currentIn) / rate) * 10) / 10;
  }

  /* Repot interval in years by tree type and age. */
  function repotYears(treeType, ageYears) {
    if (treeType === "tropical") return ageYears < 10 ? 2 : 3;
    if (treeType === "conifer") return ageYears < 15 ? 3 : 5;
    return ageYears < 10 ? 1 : 2; /* deciduous roots grow fast */
  }

  var api = {
    potLengthIn: potLengthIn,
    potDepthIn: potDepthIn,
    potWidthIn: potWidthIn,
    soilLiters: soilLiters,
    mixVolumes: mixVolumes,
    wateringDays: wateringDays,
    wateringVerdict: wateringVerdict,
    feedingPlan: feedingPlan,
    thickeningYears: thickeningYears,
    repotYears: repotYears
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.BonsaiMath = api;
})(typeof window !== "undefined" ? window : globalThis);
