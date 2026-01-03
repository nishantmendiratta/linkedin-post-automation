// Get LinkedIn user info
// Usage: node get-userinfo.js
// Requires env: LINKEDIN_ACCESS_TOKEN

const https = require('https');

const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

if (!accessToken) {
  console.error('Required env: LINKEDIN_ACCESS_TOKEN');
  process.exit(1);
}

const options = {
  hostname: 'api.linkedin.com',
  path: '/v2/userinfo',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`
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

req.end();
