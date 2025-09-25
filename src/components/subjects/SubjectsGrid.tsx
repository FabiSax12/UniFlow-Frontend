import { useSubjectsByPeriod } from "@/hooks/subjects/useSubjectsByPeriod";
import { Skeleton } from "../ui/skeleton";
import { SubjectCard } from "./SubjectCard";

interface Props {
  periodId: string;
}

export const SubjectsGrid = ({ periodId }: Props) => {

  const { subjectsByPeriod } = useSubjectsByPeriod(periodId);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mt-4'>
      {
        subjectsByPeriod.isLoading && !subjectsByPeriod.data
          ? <>
            <Skeleton className='h-64 w-full rounded-xl' />
            <Skeleton className='h-64 w-full rounded-xl' />
            <Skeleton className='h-64 w-full rounded-xl' />
            <Skeleton className='h-64 w-full rounded-xl' />
          </>
          : subjectsByPeriod.data?.map(subject => <SubjectCard key={subject.id} subject={subject} />)
      }
    </div>
  )
}
