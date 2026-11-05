# CMMC Assist

A plain-language CMMC readiness check for small defense contractors.

- **Level 1:** 15 yes/no questions, one for each practice in the CMMC Level 1 Assessment Guide (FAR 52.204-21). Results list every gap with the official requirement it maps to.
- **Level 2:** under construction.
- **Level 3:** work in progress.

This is a self-check, not an official CMMC assessment. Answers are kept only in the visitor's browser.

## Files

| Path | What it is |
|---|---|
| `index.html` | The page: tabs, Level 1 form, Level 2/3 placeholders, About |
| `css/styles.css` | Styles (light and dark mode, mobile, print) |
| `js/level1.js` | **The Level 1 question set.** Edit questions and requirement text here |
| `js/app.js` | Tabs, building the questions from the data file, progress, results |

## Editing questions

Each practice in `js/level1.js` has an `id`, a `family`, the official `requirement` text, and the plain-language `question`. The page rebuilds itself from that list, so changing a question doesn't require touching the HTML. If you change questions in a way that makes old saved answers wrong, bump `version` at the top of the file so browsers start fresh.

## Running locally

Open `index.html` in a browser, or run `python -m http.server` in this folder and visit `http://localhost:8000`.

## Publishing

Push to `main`, then in the repository's **Settings → Pages**, set the source to **Deploy from a branch**, branch `main`, folder `/ (root)`.
