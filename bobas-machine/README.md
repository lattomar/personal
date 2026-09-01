# Boba's Machine

A single-page tool for writing song descriptions that have to fit **440 characters**.

Paste the lyrics, send one prompt to an assistant, paste the reply back — genre,
moods and the description all fill themselves in. Everything saves to a searchable
library you can delete from.

## Why it exists

The manual version of this job is: read the lyrics, work out the genre and mood
by hand, type all of it into ChatGPT with the lyrics, ask for a description, trim
it by eye until it fits, and keep no record of any of it.

This does the same job with the typing removed:

- **One prompt asks for everything at once.** Genre, moods and the description
  come back in one reply, in a fixed format the page reads and fills in for you.
- **It is not tied to any one assistant.** A "Send to" picker offers ChatGPT
  (the default), Claude, Gemini, or copy-only. The prompt names no vendor, so it
  works anywhere. Gemini has no documented way to receive a prompt through a
  link, so it opens empty with the prompt already on the clipboard.
- **ChatGPT can reuse one dedicated conversation.** Save its private `/c/` URL
  once; the main button copies the prompt and reopens that same chat every time.
  Shared `/share/` snapshots are rejected because they cannot receive messages.
- **The 440-character cap is enforced while you write**, not discovered after.
  "Tighten to fit" rewrites rather than silently truncating.
- **Mood and genre come from vocabularies you control** — see below.
- **A "house style" note** is saved once and added to every prompt.
- **Everything is kept** — lyrics, metadata, the description, older versions — and
  nothing is deleted unless you delete it. Deletes can be undone.

Lyrics can be in any language; the description always comes back in English.

## About the mood list

**The defaults are a starting point, not an industry standard.** There isn't one.
[AllMusic](https://www.allmusic.com/moods) carries roughly 289 editorially
assigned mood terms — the largest published vocabulary. Spotify and Apple each
have their own fixed list inside their pitch forms, and neither publishes it; the
list exists only in the form itself. Labels then have their own.

So the 48 shipped moods cover the terms that recur across DSP pitch forms, and
the Vocabulary sheet lets you replace the lot. Open the pitch form you actually
submit to, read its mood dropdown, paste the terms in, done — the prompt then
offers ChatGPT your vocabulary rather than a guess.

Genres work the same way. Both lists support add, rename, remove, reorder, paste
a list, and reset. Terms already used by saved songs show a usage count;
removing a term from the list never rewrites songs that already carry it.

The mood cap defaults to 2 because Spotify's pitch form takes two. It warns
rather than blocks, and it's configurable.

## The two copies

One source file, `index.html`, ships two ways.

**As a Claude Artifact.** `node build.js` is not involved — the file is published
as-is and the platform supplies the `<head>`. This copy gets:

```
capabilities: {
  db:        { rules: [{ path: "", read: "interact", write: "interact" }] },
  sample:    {},
  downloads: true
}
```

- `db` stores the library and syncs it across devices.
- `sample` powers the optional **Write it here** button. It spends the *viewer's*
  Claude usage, so it only appears for viewers who have a Claude account.
- `downloads` powers CSV and JSON export.

Viewing needs a claude.ai sign-in, and saving needs the link shared with edit
access — the `write: "interact"` rule is what lets a shared viewer save rather
than only read.

**As a static page.** `node build.js` wraps the same source in a doctype and
`<head>` and writes `../docs/bobas-machine/index.html`, which GitHub Pages
serves. No sign-in, no install, and **lyrics never leave the browser** — the
library is `localStorage`, so it does not sync between devices.

Never edit the generated file. Edit `index.html` and rebuild.

The same file also works with no hosting at all: download it and open it. It is
entirely self-contained, so double-clicking it runs the tool offline.

### Turning the static page on

`github.com/lattomar/personal` → Settings → Pages → Build and deployment →
Source: **Deploy from a branch** → Branch **`main`**, folder **`/docs`** → Save.

`docs/index.html` and the repo-root `index.html` are redirects into the app, so
**`lattomar.github.io/personal`** reaches it whichever folder is selected.

## Where the data lives

| Copy | Library | Lyrics leave the machine? | Syncs devices? | Sign-in? |
|---|---|---|---|---|
| Artifact | Anthropic's servers | Yes | Yes | claude.ai |
| Static page | That browser only | No | No | None |

Export from the header at any time; JSON is the complete record.

## Notes

- Every capability is reached with `await claude.use(name)` and handles `null`.
  A database read failure drops to local saving rather than failing silently, and
  an empty snapshot never overwrites a non-empty local backup.
- Work in progress autosaves as you type and is restored after a reload.
- Reply parsing is tolerant: the structured block fills every field, fenced
  replies are unwrapped, and a plain paragraph fills only the description.
- The header uses transparent Kuromi and Luna-and-Lilo image cutouts supplied
  for this personal tool.
