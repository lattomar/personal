# personal — shared conventions

This repo holds unrelated personal projects, one per top-level folder. It has
nothing to do with AQ Mastery / funnelengine; none of those rules apply here.

## Scope

Work only inside the project folder the current task is about. Do not refactor,
reformat, or "tidy" a sibling project as a side effect — they are independent
and share no code.

## Adding a project

1. Create a top-level folder named after the project.
2. Add a short `README.md` saying what it is and how to run it.
3. Add a `CLAUDE.md` in that folder only when it needs rules that differ from
   this file (a required toolchain, a deploy step, files that must not change).
4. Add a row to the Projects list in the root `README.md`.

## Preferences

_Omar: put your general coding preferences here — languages you reach for,
formatting, testing expectations, commit style. Anything left blank just means
"use your judgement."_

## Commits

Small and scoped to one project. Subject line says which project it touches,
e.g. `budget-tracker: fix date parsing`.
