// Exchange Authorization Code for Access Token
// Usage: node exchange-token.js <AUTH_CODE>
// Requires env: LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, LINKEDIN_REDIRECT_URI

const https = require('https');
const querystring = require('querystring');

const code = process.argv[2];
const client_id = process.env.LINKEDIN_CLIENT_ID;
const client_secret = process.env.LINKEDIN_CLIENT_SECRET;
const redirect_uri = process.env.LINKEDIN_REDIRECT_URI || 'https://localhost:3000';

if (!code || !client_id || !client_secret) {
  console.error('Usage: node exchange-token.js <AUTH_CODE>');
  console.error('Required env: LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, [LINKEDIN_REDIRECT_URI]');
  process.exit(1);
}

const postData = querystring.stringify({
  grant_type: 'authorization_code',
  code,
  client_id,
  client_secret,
  redirect_uri
});

const options = {
  hostname: 'www.linkedin.com',
  path: '/oauth/v2/accessToken',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log(JSON.stringify(json, null, 2));
    } catch (e) {
      console.error('Response:', data);
      console.error('Failed to parse JSON:', e);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
});

req.write(postData);
req.end();
