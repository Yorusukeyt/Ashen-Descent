# Ashen Descent

A tiny 8-bit Dark Souls-like roguelike that runs in the browser. One HTML file, no dependencies.

- 10 chambers, 2 bosses, daily seeded layouts
- Touch controls (landscape) and keyboard: WASD move, J strike, K heavy, Space roll, E flask
- Chiptune music and sound effects generated with the Web Audio API

## Play
Open `index.html` in a browser, or enable GitHub Pages (Settings > Pages > deploy from branch) to host it.

## Install as a home screen app
Host it over HTTPS (GitHub Pages works), open the link on your phone, then:
- **iPhone (Safari):** Share > Add to Home Screen
- **Android (Chrome):** menu > Install app / Add to Home screen

It works offline after the first load. When you update the game, bump `V` in `sw.js` so installed copies refresh.
