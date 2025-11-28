import MockCard from "@/components/MockCard"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Exam Cards</h1>
          <p className="text-muted-foreground">Browse available exam opportunities and deadlines</p>
        </div>
        <MockCard />
      </div>
    </main>
  )
}
