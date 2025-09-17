import { Skeleton } from "../ui/skeleton"

export const DashboardTaskCardSkeleton = () => {
  return (
    <Skeleton
      className="h-32 rounded-xl border-l-8 px-8 py-4 border flex hover:scale-x-105 transition-all duration-300 cursor-pointer hover:border-primary"
    />
  )
}