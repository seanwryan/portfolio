import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const username = 'seanwryan'
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repositories')
    }

    const repos = await response.json()

    // Filter and format repositories
    const projects = repos
      .filter((repo: any) => !repo.fork && !repo.archived) // Exclude forks and archived
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description available',
        url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        topics: repo.topics || [],
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        createdAt: repo.created_at,
      }))
      .sort((a: any, b: any) => {
        // Sort by stars, then by update date
        if (b.stars !== a.stars) return b.stars - a.stars
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      })
      .slice(0, 12) // Limit to top 12 projects

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

