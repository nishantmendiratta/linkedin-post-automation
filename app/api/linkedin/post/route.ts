// Simple API route to return a post from post.json
// GET /api/linkedin/post

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'post.json');
  const posts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  // For demo: return a random post. In production, use logic for 'next scheduled' post.
  const post = posts[Math.floor(Math.random() * posts.length)];
  return NextResponse.json(post);
}
