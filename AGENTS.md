# Notes for AI agents

This is a personal blog. If you're helping draft or edit a post, read this first.

## Voice

Korean is primary. English versions are paired translations for outward sharing, match the rhythm not the literal phrasing.

The Korean tone is informal and reflective. Natural code-switching to English terms (IC, agentic, cross-functional, HI-C) is fine and should be kept.

## Patterns to avoid

These read as LLM-generated and I'll push back:

- Marketing hooks like "If X, what does Y?", especially when the title is already a question.
- Tidy book-jacket closings: "한 조각 더하는 글", "Notes on X", "A piece adding to...".
- Resume-style bios ("ML researcher background, currently leading...").
- Over-symmetric parallel constructions that wouldn't survive real thinking.
- Em-dashes (—) anywhere. Use commas, periods, or colons.

## Patterns that work

- **Quote-then-tension**: open with a piece of conventional advice, then what broke when followed.
- **Memo tone**: "이거 읽고 이어붙임", "정리해봤다", "two things broke at once".
- **Uncertainty preserved**: "~것 같아서", "doesn't quite fit anymore". Don't escalate to confident claims I didn't make.

## Process

- I revise. You're editor, not author.
- When I push back, diagnose what was off and propose an alternative. Skip the apology.
- KO and EN posts are paired by slug. Translate for voice, not literal accuracy.

## Operational

- Astro 5 static site on GitHub Pages.
- Posts: `src/content/posts/{ko,en}/<slug>.md`.
- Once a URL is live it doesn't change (Slack previews depend on URL stability).
