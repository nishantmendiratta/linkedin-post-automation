# How to Set Up a LinkedIn App and Get `LINKEDIN_ACCESS_TOKEN`

This guide walks through the **minimum steps** required to create a LinkedIn app and generate an access token that can be used to post content via the LinkedIn API (e.g., from a GitHub Action).

This setup is intentionally **lean** and avoids permissions that require long approval cycles.

---

## What This Token Will Be Used For

- Posting text content to your **personal LinkedIn profile**
- Using the **UGC Posts API**
- Automating posts via scripts or CI (GitHub Actions)

Required scope: `w_member_social`

---

## 1. Create a LinkedIn App

1. Go to: https://www.linkedin.com/developers/
2. Click **Create App**
3. Fill in:
   - **App name**: anything (e.g., `Batwara Automation`)
   - **LinkedIn Page**: optional (can be your personal page)
   - **Privacy policy URL**: any valid URL (can be your site)
   - **App logo**: optional
4. Click **Create app**

You’ll now see your app dashboard.

---

## 2. Enable Required Product

Go to **Products** in the app dashboard.

Enable:
- ✅ **Share on LinkedIn**

You do **not** need:
- ❌ Sign In with LinkedIn
- ❌ Marketing Developer Platform

Once enabled, `w_member_social` becomes available.

---

## 3. Configure Redirect URL

Go to **Auth** tab.

Add this Redirect URL: https://localhost:3000

⚠️ This must match **exactly** — character by character.

---

## 4. Generate Authorization Code

Open this URL in your browser (replace `YOUR_CLIENT_ID`):
https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=https%3A%2F%2Flocalhost&scope=w_member_social

Steps:
1. Log in to LinkedIn
2. Approve the app
3. You will be redirected to: https://localhost:3000/?code=XXXX


Copy the value of `code`.

> ⚠️ The page may show an error — this is expected.  
> Only the URL matters.

---

## 5. Exchange Code for Access Token

Run this command **immediately** (the code expires quickly):

```bash
curl -X POST "https://www.linkedin.com/oauth/v2/accessToken" \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=authorization_code" \
-d "code=PASTE_CODE_HERE" \
-d "client_id=YOUR_CLIENT_ID" \
-d "client_secret=YOUR_CLIENT_SECRET" \
-d "redirect_uri=https://localhost:3000"
```

### Successful response:
```json
{
  "access_token": "AQX...",
  "expires_in": 5184000
}
```
•	Token validity: ~60 days
•	Save this token securely

## 6. Set LINKEDIN_ACCESS_TOKEN
Local development
```bash
export LINKEDIN_ACCESS_TOKEN="AQX..."
```

### GitHub Actions
1.	Go to Repo → Settings → Secrets → Actions
2.	Add: LINKEDIN_ACCESS_TOKEN = AQX...


## 7. Use the Token to Post Content
You can now call:
### Get user info
```bash
curl --location 'https://api.linkedin.com/v2/userinfo' \
--header 'Authorization: Bearer ${LINKEDIN_ACCESS_TOKEN}' \
```
Response
```json
{
    "sub": "xxxXXX-xxx", // This is the subscriber ID (SUBSCRIBER_ID)
    "email_verified": true,
    "name": "Nishant Mendiratta",
    "locale": {
        "country": "US",
        "language": "en"
    },
    "given_name": "Nishant",
    "family_name": "Mendiratta",
    "email": "i.nishantmendiratta@gmail.com",
    "picture": "https://media.licdn.com/dms/image/v2/D5603AQF3G3x7vfQmQA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1719050631258?e=1768435200&v=beta&t=E4LFGiISEeoAeJnTy1YaP2Mqlc8i3fiT1TnxjjBc1SU"
}
```

### Post to LinkedIn
```bash
curl --location 'https://api.linkedin.com/v2/ugcPosts' \
--header 'Authorization: Bearer ${LINKEDIN_ACCESS_TOKEN}' \
--header 'Content-Type: application/json' \
--data '{
    "author": "urn:li:person:${SUBSCRIBER_ID}$",
    "lifecycleState": "PUBLISHED",
    "specificContent": {
      "com.linkedin.ugc.ShareContent": {
        "shareCommentary": {
          "text": "Testing LinkedIn API post via curl 🚀"
        },
        "shareMediaCategory": "NONE"
      }
    },
    "visibility": {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
    }
  }'
```

### Important Notes
- Authorization codes are:
One-time use
	•	Short-lived
	•	Tokens cannot be refreshed automatically
	•	Regenerate token every ~60 days
	•	Do not commit tokens to git


Summary:
1️⃣ Authorization (Browser step, not curl)
Open this once in browser (replace CLIENT_ID):
```js
https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=CLIENT_ID&redirect_uri=https%3A%2F%2Flocalhost&scope=w_member_social
```

After approval, you’ll be redirected to:
```js
https://localhost:3000/?code=XXXX
```
👉 Copy AUTH_CODE_HERE immediately.

2️⃣ Exchange Authorization Code → Access Token
```js
curl -X POST "https://www.linkedin.com/oauth/v2/accessToken" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "code=AUTH_CODE_HERE" \
  -d "client_id=CLIENT_ID" \
  -d "client_secret=CLIENT_SECRET" \
  -d "redirect_uri=https://localhost"
```
✅ Success response
```js
{
  "access_token": "AQX...",
  "expires_in": 5184000
}
```
Save this token → this is your LINKEDIN_ACCESS_TOKEN.

3️⃣ Create a Text Post on LinkedIn (Main Call)
Replace:
	•	PERSON_URN → your hardcoded author (e.g. urn:li:person:ACoAABc1234)
	•	LINKEDIN_ACCESS_TOKEN
```js
curl -X POST "https://api.linkedin.com/v2/ugcPosts" \
  -H "Authorization: Bearer LINKEDIN_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "author": "PERSON_URN",
    "lifecycleState": "PUBLISHED",
    "specificContent": {
      "com.linkedin.ugc.ShareContent": {
        "shareCommentary": {
          "text": "Expense apps are heavy. Batwara keeps it simple.\n\nhttps://batwara.in"
        },
        "shareMediaCategory": "NONE"
      }
    },
    "visibility": {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
    }
  }'
  ```
  ✅ Success
	•	HTTP 201 Created
	•	Post appears instantly on your LinkedIn profile


### You should define LINKEDIN_ACCESS_TOKEN as an environment variable. Here are common ways:

1. Locally (macOS/Linux):
- In your terminal, run: export LINKEDIN_ACCESS_TOKEN="your_token_here"
- Or add the above line to your ~/.zshrc or ~/.bashrc for persistence.
2. .env file (for local development):
- Create a .env file in your project root: LINKEDIN_ACCESS_TOKEN=your_token_here
- Use a package like dotenv in your scripts to load it (add require('dotenv').config(); at the top).
3. GitHub Actions:
- Go to your repository → Settings → Secrets and variables → Actions.
- Add a new secret named LINKEDIN_ACCESS_TOKEN with your token value.

The script will automatically use the value from the environment. Never commit your token to git.