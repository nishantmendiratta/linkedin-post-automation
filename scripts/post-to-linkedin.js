// Create a Text Post on LinkedIn
// Usage: node post-to-linkedin.js <PERSON_URN> [API_URL]
// Requires env: LINKEDIN_ACCESS_TOKEN
// PERSON_URN can be provided as env: PERSON_URN or as first argument
// API_URL defaults to http://localhost:3000/api/linkedin/post if not provided

const https = require('https');
const http = require('http');

const personUrn = process.argv[2] || process.env.PERSON_URN;
const apiUrl = process.argv[3] || process.env.API_URL || 'http://localhost:3000/api/linkedin/post';
const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

if (!personUrn || !accessToken) {
  console.error('Usage: node post-to-linkedin.js <PERSON_URN> [API_URL]');
  console.error('Required env: LINKEDIN_ACCESS_TOKEN and PERSON_URN (or as first argument)');
  process.exit(1);
}

function fetchLatestPost(url, cb) {
  const client = url.startsWith('https') ? https : http;
  client.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        cb(null, json.text || data);
      } catch (e) {
        cb(new Error('Failed to parse API response: ' + e));
      }
    });
  }).on('error', (e) => cb(e));
}

function postToLinkedIn(postText) {
  const postData = JSON.stringify({
    author: personUrn,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: { text: postText },
        shareMediaCategory: 'NONE'
      }
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
    }
  });

  const options = {
    hostname: 'api.linkedin.com',
    path: '/v2/ugcPosts',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
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
}

fetchLatestPost(apiUrl, (err, postText) => {
  if (err) {
    console.error('Failed to fetch post from API:', err);
    process.exit(1);
  }
  postToLinkedIn(postText);
});
