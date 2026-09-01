# personal

Personal projects. One folder per project, each self-contained.

## Layout

```
CLAUDE.md          shared conventions for every project here
some-project/
  CLAUDE.md        rules specific to this project (optional)
```

Claude Code reads the nearest `CLAUDE.md` as it works, so a project folder's
own file layers on top of the root one.

## Projects

| Project | What it is |
| --- | --- |
| [`pitch-440`](pitch-440/) | Writes song pitches that have to fit 440 characters, and keeps a searchable library of them. |
