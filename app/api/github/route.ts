import { NextResponse } from 'next/server'

// Whitelist of project names to display (case-insensitive matching)
// Add or remove project names here to control which projects appear
// Projects are displayed in the order listed here
const PROJECT_WHITELIST = [
  // Featured projects from resume
  'compliance-copilot-gais',      // Compliance Copilot - Full-stack platform
  'bicep-buddy',                   // AI-Powered Fitness App
  'BCAN-Energy-Usage-Data-VIsualizations', // Boston Climate Action Network capstone
  
  // Strong technical projects with descriptions
  'CustomerChurn',                 // ML project with good description
  'financial-benchmark-validation', // Data validation project
  'MLB_Hitting_Analysis',          // Sports analytics with description
  'LakersPlayerPerformanceAnalysis', // Performance analysis project
]

// Map repository names to display titles
const PROJECT_TITLES: Record<string, string> = {
  'compliance-copilot-gais': 'Compliance Copilot',
  'bicep-buddy': 'Bicep Buddy',
  'bcan-energy-usage-data-visualizations': 'BCAN Energy Analysis',
  'customerchurn': 'Customer Churn Prediction',
  'financial-benchmark-validation': 'Financial Benchmark Validation',
  'mlb_hitting_analysis': 'MLB Hitting Analysis',
  'lakersplayerperformanceanalysis': 'Lakers Performance Analysis',
}

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
      .filter((repo: any) => {
        // Only include repos that are in the whitelist
        const repoNameLower = repo.name.toLowerCase()
        return PROJECT_WHITELIST.some(
          (whitelistedName) => whitelistedName.toLowerCase() === repoNameLower
        )
      })
      .filter((repo: any) => !repo.fork && !repo.archived) // Also exclude forks and archived
      .map((repo: any) => {
        // Get display title from mapping, or format the name nicely
        const displayTitle = PROJECT_TITLES[repo.name.toLowerCase()] || 
          repo.name
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (l: string) => l.toUpperCase())
        
        return {
          id: repo.id,
          name: repo.name,
          displayTitle: displayTitle,
          description: repo.description || 'No description available',
          url: repo.html_url,
          homepage: repo.homepage,
          language: repo.language,
          topics: repo.topics || [],
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: repo.updated_at,
          createdAt: repo.created_at,
        }
      })
      .sort((a: any, b: any) => {
        // Sort by whitelist order first, then by stars, then by update date
        const aIndex = PROJECT_WHITELIST.findIndex(
          (name) => name.toLowerCase() === a.name.toLowerCase()
        )
        const bIndex = PROJECT_WHITELIST.findIndex(
          (name) => name.toLowerCase() === b.name.toLowerCase()
        )
        
        if (aIndex !== bIndex) {
          return aIndex - bIndex // Maintain whitelist order
        }
        
        if (b.stars !== a.stars) return b.stars - a.stars
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      })

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

