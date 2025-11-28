"use client"

import { useEffect, useState } from "react"
import httpAction from "../lib/httpAction"
import apis from "../lib/apis"

const MockCard = () => {
  const [cards, setCards] = useState([])

  const fetchCards = async () => {
    const data = {
      url: apis().getCards,
      method: "GET" as const,
    }
    const result = await httpAction(data)
    if (result?.status) {
      setCards(result?.data)
    }
  }

  useEffect(() => {
    fetchCards()
  }, [])

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {cards.map((item: any) => (
          <div
            key={item._id}
            className="bg-card text-card-foreground rounded-xl border shadow-sm p-4 sm:p-6 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200"
          >
            <h3 className="text-base sm:text-lg font-semibold text-foreground">{item.name}</h3>

            <p className="text-sm text-muted-foreground">{item.exam}</p>

            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-sm font-medium text-primary hover:underline underline-offset-4 transition-colors"
            >
              Visit Exam Link
            </a>

            <p className="text-xs sm:text-sm text-muted-foreground mt-auto pt-2 border-t border-border">
              Last Date: {item.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MockCard
