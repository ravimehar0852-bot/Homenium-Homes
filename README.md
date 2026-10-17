# Homenium Homes – static website
Pure HTML/CSS/JS. Open `index.html` locally, or push to GitHub and import into Vercel (no build step).

- **Photos:** edit the `GALLERY` array at the top of `js/main.js` and set each `src` (e.g. `images/elevation-1.jpg`). Empty `src` shows an elegant placeholder. Hero image: add `style="--hero:url(images/hero.jpg)"` to the `.hero` section in `index.html`.
- **WhatsApp number:** `WA_NUMBER` in `js/main.js`.
- **Header/footer** are injected by `js/main.js` – edit once, applies to all pages.
- Only label gallery items as completed projects once they are verified company work.
- After deploying, add canonical links (see comment in each `<head>`).
