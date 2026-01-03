import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center bg-background">
      <div className="w-full py-12 px-4 max-w-[420px] min-h-screen shadow-lg md:border-l md:border-r border-gray-200 flex flex-col">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-2">LinkedIn Post Automation App</h1>
          <p className="mb-4 text-lg">Automate your daily LinkedIn posts using Node.js scripts, Supabase, and GitHub Actions. This app includes all scripts and configuration needed for seamless LinkedIn automation.</p>
          <ul className="list-disc ml-6 mb-4">
            <li>
              <Link href="https://github.com/nishantmendiratta/linkedin-post-automation/blob/main/README.md" className="text-blue-600 underline">Project Overview & Usage (README.md)</Link>
            </li>
            <li>
              <Link href="https://github.com/nishantmendiratta/linkedin-post-automation/blob/main/LINKEDIN_ACCESS_TOKEN.md" className="text-blue-600 underline">LinkedIn Access Token Setup (LINKEDIN_ACCESS_TOKEN.md)</Link>
            </li>
            <li>
              <Link href="https://github.com/nishantmendiratta/linkedin-post-automation/blob/main/scripts" className="text-blue-600 underline">Node.js Automation Scripts</Link>
            </li>
            <li>
              <Link href="https://github.com/nishantmendiratta/linkedin-post-automation/blob/main/.github/workflows/post.yml" className="text-blue-600 underline">GitHub Action Workflow</Link>
            </li>
            <li>
              <Link href="https://github.com/nishantmendiratta/linkedin-post-automation/blob/main/post.json" className="text-blue-600 underline">Sample Posts (post.json)</Link>
            </li>
          </ul>
          <p className="mb-2">Key Features:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Exchange LinkedIn authorization code for access token</li>
            <li>Fetch and post scheduled content to LinkedIn automatically</li>
            <li>Seed and manage posts using Supabase</li>
            <li>Run scheduled jobs via GitHub Actions</li>
            <li>Configure secrets and environment variables securely</li>
          </ul>
          <p className="mb-2">Get started by following the <Link href="https://github.com/nishantmendiratta/linkedin-post-automation/blob/main/README.md" className="text-blue-600 underline">README</Link> and <Link href="https://github.com/nishantmendiratta/linkedin-post-automation/blob/main/LINKEDIN_ACCESS_TOKEN.md" className="text-blue-600 underline">LinkedIn Access Token Guide</Link>.</p>
        </section>
        <footer className="mt-auto text-center text-sm text-gray-500">
          No Rights Reserved. <Link href="https://batwara.in" className="text-blue-600 underline">Batwara.in</Link>
        </footer>
      </div>
    </main>
  );
}
