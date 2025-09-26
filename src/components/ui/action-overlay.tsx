import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Pencil,Check } from "lucide-react"
import React from "react"

type ActionType = "delete" | "edit"

interface ActionOverlayProps {
  show: boolean
  type: ActionType
}

export const ActionOverlay: React.FC<ActionOverlayProps> = ({ show, type }) => {
   const [phase, setPhase] = React.useState<"idle" | "loading" | "success">("idle")

  React.useEffect(() => {
    if (show) {
      setPhase("loading")
    } else if (!show && phase === "loading") {
      // cuando deja de estar show, mostramos el check un momento
      setPhase("success")
      const timer = setTimeout(() => setPhase("idle"), 1500) // 1.5s check
      return () => clearTimeout(timer)
    }
  }, [show])

 
  return (
<AnimatePresence>
  {(show || phase === "success") &&  phase !== "idle" && (
    <motion.div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="flex flex-col items-center justify-center bg-card rounded-full p-8 shadow-lg"
      >
        {/* Contenedor de íconos con transición */}
        <motion.div className="relative w-16 h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {phase === "success" ? (
              <motion.div
                key="check"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute"
              >
                <Check className="w-16 h-16 text-green-500" />
              </motion.div>
            ) : type === "delete" ? (
              <motion.div
                key="trash"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute"
              >
                <Trash2 className="w-16 h-16 text-red-500" />
              </motion.div>
            ) : (
              <motion.div
                key="pencil"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute"
              >
                <Pencil className="w-16 h-16 text-blue-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <p className="mt-4 text-lg font-semibold text-foreground">
          {phase === "success"
            ? "Completado"
            : type === "delete"
            ? "Eliminando Curso..."
            : "Guardando cambios..."}
        </p>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
  )
}