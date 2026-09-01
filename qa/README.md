# QA prompts

On this project the prompt and the stories are separate files — same split as a template vs ticket input.

| File | What it is | Change when |
|---|---|---|
| [generic-prompt.md](generic-prompt.md) | Procedure: role, rules, output format | Almost never |
| [stories.md](stories.md) | Input: product context, user stories, AC | New feature or AC change |

## Compose a run

1. Copy the prompt from `generic-prompt.md`.
2. Paste **Product context** from `stories.md`.
3. Paste **one** story (screens, visible elements, user story, AC).
4. Send. Repeat for the next story.

Do not paste all stories in one run.

On a larger team, `stories.md` is usually a Jira/Linear ticket. Keep this file only while AC live in the repo.
