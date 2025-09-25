import { useState } from "react"

interface UseDropOptions {
  onDrop: (dragData: any) => void
  accept?: string[] // Tipos de datos aceptados
  onDragEnter?: () => void
  onDragLeave?: () => void
}

export function useDrop({ onDrop, accept, onDragEnter, onDragLeave }: UseDropOptions) {
  const [isOver, setIsOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!isOver) {
      console.log("IS OVER")
      setIsOver(true)
    }
    // e.dataTransfer.dropEffect = 'move'
    console.log("Drag Over")
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    // setIsOver(true)
    onDragEnter?.()
  }

  const handleDragLeave = (e: React.DragEvent) => {
    console.log("Drag Leave")
    setIsOver(false)
    onDragLeave?.()
  }

  const handleDrop = (e: React.DragEvent) => {
    console.log("Drop")
    e.preventDefault()
    setIsOver(false)

    try {
      const dragData = JSON.parse(e.dataTransfer.getData('application/json'))
      onDrop(dragData)
    } catch (error) {
      console.error('Error parsing drag data:', error)
    }
  }

  return {
    isOver,
    onDragOver: handleDragOver,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop
  }
}