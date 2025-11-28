import { NextResponse } from "next/server"

// Mock data for testing - replace with real database calls
const mockCards = [
  {
    _id: "1",
    name: "Computer Science Entrance Exam",
    exam: "CS-101",
    link: "https://example.com/cs-exam",
    date: "2025-01-15",
  },
  {
    _id: "2",
    name: "Mathematics Aptitude Test",
    exam: "MATH-202",
    link: "https://example.com/math-exam",
    date: "2025-01-20",
  },
  {
    _id: "3",
    name: "English Proficiency Assessment",
    exam: "ENG-303",
    link: "https://example.com/eng-exam",
    date: "2025-01-25",
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(mockCards)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cards" }, { status: 500 })
  }
}
