
# LinkedIn Post Automation

This project automates posting to LinkedIn using Node.js scripts, Supabase, and GitHub Actions.

## Automated Posting Workflow

- **post.yml** (in `.github/workflows/`):
  - Runs on a schedule (cron) or manually.
  - Installs dependencies and runs a Node.js script to post to LinkedIn.
  - Uses secrets for `LINKEDIN_ACCESS_TOKEN` and `API_URL` (your API endpoint for fetching the next post).

## How to Generate and Seed Daily Posts Using AI

1. **Generate Posts with AI**
	- Use an AI tool (e.g., OpenAI, Copilot) to generate a batch of LinkedIn post ideas/content for each day.
	- Save these posts in a format suitable for seeding (e.g., CSV, JSON).

2. **Seed Posts in Supabase**
	- Insert the generated posts into your Supabase database table (e.g., `scheduled_posts`).
	- Each row should have: post text, scheduled date, status (pending/posted), etc.
	- You can use Supabase SQL editor, dashboard, or a script to seed the data.

3. **API Endpoint for Next Post**
	- Expose an API (e.g., `/api/linkedin/post`) that returns the next scheduled post from Supabase.
	- The GitHub Action calls this API to fetch the post content to publish.

4. **GitHub Action (post.yml)**
	- Runs on schedule (e.g., every day at a set time).
	- Calls your API to get the next post.
	- Posts to LinkedIn using the access token.
	- Marks the post as posted in Supabase.

## Running Locally

- Use the scripts in the `scripts/` directory:
  - `npm run linkedin:exchange-token -- <AUTH_CODE>`: Exchange code for access token.
  - `npm run linkedin:userinfo`: Get user info.
  - `npm run linkedin:post -- <PERSON_URN> "<POST_TEXT>"`: Post to LinkedIn.

## Environment Variables

- `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`, `LINKEDIN_REDIRECT_URI` (for token exchange)
- `LINKEDIN_ACCESS_TOKEN` (for posting)
- `API_URL` (for GitHub Action to fetch posts)

## Example: Seeding Supabase with AI-Generated Posts

1. Generate posts (e.g., with OpenAI):
	```json
	[
	  { "text": "Day 1: How to automate LinkedIn posts with Node.js!" },
	  { "text": "Day 2: Using Supabase as a content scheduler." }
	]
	```
2. Insert into Supabase (via dashboard or script).

## Example: post.yml (GitHub Action)

- Schedules and posts daily using your API and LinkedIn token.
- See `.github/workflows/post.yml` for details.

---

**Tip:**
- Regenerate your LinkedIn access token every ~60 days.
- Never commit secrets to git.
- Use GitHub Secrets for all sensitive values.

