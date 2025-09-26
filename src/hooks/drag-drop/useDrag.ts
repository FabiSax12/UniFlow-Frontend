import { useState } from "react"

interface UseDragOptions {
  dragData: any // Datos a transferir
  onDragStart?: () => void
  onDragEnd?: () => void
}

export function useDrag({ dragData, onDragStart, onDragEnd }: UseDragOptions) {
  const [isBeingDragged, setIsBeingDragged] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsBeingDragged(true)

    // Almacenar datos en dataTransfer
    e.dataTransfer.setData('application/json', JSON.stringify(dragData))

    // Configurar efectos visuales
    e.dataTransfer.effectAllowed = 'move'

    onDragStart?.()
  }

  const handleDragEnd = () => {
    onDragEnd?.()
    setIsBeingDragged(false)
  }

  return {
    draggable: true,
    isBeingDragged,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd
  }
}