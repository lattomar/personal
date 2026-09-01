# 440 Pitch Desk

A single-page tool for writing song pitches that have to fit **440 characters**.

Paste the lyrics, send one prompt to ChatGPT, paste the reply back — genre, mood,
themes and the pitch all fill themselves in. Everything saves to a searchable
library you can delete from.

## Why it exists

The manual version of this job is: read the lyrics, work out the genre and mood
by hand, type all of it into ChatGPT with the lyrics, ask for a description, trim
it by eye until it fits the form, and keep no record of any of it.

This does the same job with the typing removed:

- **One prompt asks for everything at once.** Genre, mood, themes and the pitch
  come back in one reply, in a fixed format the page reads and fills in for you.
- **The 440-character cap is enforced while you write**, not discovered after.
- **Mood comes from a fixed vocabulary** (21 words across six colour families) so
  pitches written months apart still sound like one catalogue.
- **A "house style" note** is saved once and added to every prompt.
- **Everything is kept** — lyrics, metadata, the pitch, older versions — and
  nothing is deleted unless you delete it.

Lyrics can be in any language; the pitch always comes back in English.

## Running it

It is one self-contained HTML file with no build step and no dependencies.

**As a hosted page (what it's built for).** Publish `index.html` as a Claude
Artifact. That gives a private URL that works on a laptop and a phone with the
same library, no install needed:

```
capabilities: {
  db:        { rules: [{ path: "", read: "interact", write: "interact" }] },
  sample:    {},
  downloads: true
}
```

- `db` stores the library and syncs it across devices.
- `sample` powers the optional **Write it here** button. It spends the *viewer's*
  Claude usage, so the button only appears for viewers who have Claude. Everyone
  else uses the ChatGPT buttons, which is the main path.
- `downloads` powers CSV and JSON export.

**Sharing it.** The artifact is private to whoever publishes it. Share the link
with edit access — the `write: "interact"` rule above is what lets a shared
viewer save to the library rather than only read it.

**Locally.** Open the file in a browser (it needs a `<!doctype html>` wrapper if
you're not publishing it as an artifact). Every capability resolves to `null`,
the page falls back to `localStorage`, and everything except sync, in-app
generation and file export still works.

## Where the data lives

Published as an artifact, saved songs — lyrics included — are stored on
Anthropic's servers under the publishing account. If that isn't acceptable for
the material, run it locally instead and accept the loss of phone sync.

Export from the header at any time; JSON is the complete record.

## Notes

- Mood colours are semantic, grouped into six families (joy, love, calm, blue,
  heat, deep). Genre is free text with suggestions, because label genre terms
  vary too much to pin down.
- Reply parsing is deliberately tolerant: the structured block fills every field,
  a plain paragraph fills only the pitch and leaves metadata alone.
- No Sanrio artwork. The icons are original SVG in a punk-cute palette.
