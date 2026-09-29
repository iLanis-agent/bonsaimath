# BonsaiMath

Honest math for bonsai: pot proportions, soil mix volumes, watering intervals by pot size and weather, seasonal feeding plans, trunk-thickening timelines, and repot intervals.

## Run it

Static site. Open `index.html` (landing) or `app.html` (the calculator). On GitHub Pages the root serves the landing page.

## What it computes

- **Pot size** - length about 2/3 of the greater of tree height or canopy spread, depth near trunk caliper (deeper for cascades, shallower for literati).
- **Soil** - inside dimensions minus headspace, split into akadama / pumice / lava: equal thirds for conifers, heavier akadama for deciduous and tropical trees.
- **Watering** - interval from pot volume, tree type and temperature; small pots in heat can need water twice a day, and no calendar replaces checking the soil.
- **Feeding** - half-strength weekly in the growing season, tapered in fall, nothing in winter for temperate trees.
- **Thickening** - a trunk thickens roughly 0.4 in/yr in the ground versus 0.15 in/yr in a bonsai pot; the years difference is the real cost of refining early.
- **Repot** - young deciduous yearly, conifers every 3-5, tropicals every 2-3.

## Files

- `index.html` - landing page
- `app.html` - the calculator
- `engine.js` - pure math (also usable from Node: `require('./engine.js')`)
