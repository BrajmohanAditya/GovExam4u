

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "./button"
import { Input } from "./input"
import { Trash2, Plus, CheckCircle2, Circle } from "lucide-react"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoApp() {
  // Load saved todos from localStorage (NO HARDCODE)
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos")
    return saved ? JSON.parse(saved) : []
  })

  const [inputValue, setInputValue] = useState("")

  // Save todos in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  // Add new todo
  const addTodo = () => {
    if (!inputValue.trim()) return

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: inputValue,
        completed: false
      }
    ])

    setInputValue("")
  }

  // Delete todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id))
  }

  // Toggle complete
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    )
  }

  // Add on Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") addTodo()
  }

  const active = todos.filter((t) => !t.completed)
  const completed = todos.filter((t) => t.completed)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">My Tasks</h1>
          <p className="text-slate-400 text-lg">
            {active.length} {active.length === 1 ? "task" : "tasks"} remaining
          </p>
        </div>

        {/* Input */}
        <div className="mb-8">
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Add your task..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-14 text-lg bg-slate-800/50 border-slate-700 text-white"
            />

            <Button
              onClick={addTodo}
              className="h-14 w-14 rounded-xl bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Active Tasks */}
        {active.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-slate-400 mb-3 px-1">
              Active Tasks
            </h2>

            <div className="space-y-3">
              {active.map((todo) => (
                <div key={todo.id} className="group">
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center gap-4">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className="text-slate-400 hover:text-blue-500"
                    >
                      <Circle className="h-6 w-6" />
                    </button>

                    <span className="flex-1 text-white">{todo.text}</span>

                    <Button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-slate-400 hover:text-red-400  group-hover:opacity-100"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Tasks */}
        {completed.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-slate-400 mb-3 px-1">
              Completed
            </h2>

            <div className="space-y-3">
              {completed.map((todo) => (
                <div key={todo.id} className="group">
                  <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 flex items-center gap-4">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className="text-green-500 hover:text-green-400"
                    >
                      <CheckCircle2 className="h-6 w-6" />
                    </button>

                    <span className="flex-1 text-slate-500 line-through">
                      {todo.text}
                    </span>

                    <Button
                      onClick={() => deleteTodo(todo.id)}
                        className="text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>


                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {todos.length === 0 && (
          <div className="text-center py-16">
            <Circle className="h-16 w-16 mx-auto text-slate-600" />
            <h3 className="text-xl text-slate-400 mt-4">No tasks yet</h3>
            <p className="text-slate-500">Add your first task!</p>
          </div>
        )}
      </div>
    </div>
  )
}
