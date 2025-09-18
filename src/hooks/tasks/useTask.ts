import { Task } from "@/domain/tasks";
import { useQuery } from "@tanstack/react-query";

export function useTask(taskId: string) {
  const taskQuery = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => [
      new Task(
        '1',
        'Math Homework',
        'subject-math',
        new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // due in 3 days
        1, // TaskPriority (example)
        // type omitted
        0, // TaskStatus.TODO
        'Complete exercises 1-10',
        2, // estimatedTimeHours
        undefined, // actualTimeHours
        ['homework', 'math'],
        // createdAt
        new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // created yesterday
        new Date(), // updatedAt
        undefined // completedAt
      ),
      new Task(
        '2',
        'Science Project',
        'subject-science',
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // due in 7 days
        2, // TaskPriority (example)
        // type omitted
        0, // TaskStatus.TODO
        'Prepare volcano model',
        5, // estimatedTimeHours
        undefined, // actualTimeHours
        ['project', 'science'],
        new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // created 2 days ago
        new Date(), // updatedAt
        undefined // completedAt
      ),
      new Task(
        '3',
        'History Essay',
        'subject-history',
        new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // due in 1 day
        0, // TaskPriority (example)
        // type omitted
        0, // TaskStatus.TODO
        'Write about WWII',
        3, // estimatedTimeHours
        undefined, // actualTimeHours
        ['essay', 'history'],
        new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // created 3 days ago
        new Date(), // updatedAt
        undefined // completedAt
      )
    ].find(t => t.id === taskId)
  })

  return taskQuery;
}