# Malten favicon — 2026-11-17

Replaced the generic template favicon with a compact typographic M / 3D mark in the existing website colors (#202722 and #f5f5ef). This is an adaptation of the website wordmark, not a replacement of the brand logo.

Assets: square, font-independent SVG paths; 96x96 PNG for search engines; multi-size ICO (16–256 px); 180x180 Apple touch icon. Stable URLs at the site root, referenced by index.html and inherited by both prerendered routes. No routing, application logic or commercial settings changed.

Validation: npm run build; check both generated route heads and canonical tags; decode PNG/ICO sizes; verify production HTTP responses and deployed asset hashes. Google must recrawl the homepage and favicon before the search result icon can update; publication does not confirm an update in Google.
