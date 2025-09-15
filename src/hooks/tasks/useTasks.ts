import { Task, TaskPriority, TaskStatus } from "@/domain/tasks";
import { useQuery } from "@tanstack/react-query";

export function useTasks() {
  const subjectsQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => [
      new Task(
        '1',
        'Math Homework',
        'subject-math',
        new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // due in 3 days
        TaskPriority.URGENT, // TaskPriority (example)
        // type omitted
        TaskStatus.TODO, // TaskStatus.TODO
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
        TaskPriority.MEDIUM, // TaskPriority (example)
        // type omitted
        TaskStatus.DONE, // TaskStatus.TODO
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
        TaskPriority.LOW, // TaskPriority (example)
        // type omitted
        TaskStatus.IN_PROGRESS, // TaskStatus.TODO
        'Write about WWII',
        3, // estimatedTimeHours
        undefined, // actualTimeHours
        ['essay', 'history'],
        new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // created 3 days ago
        new Date(), // updatedAt
        undefined // completedAt
      )
    ]
  });

  return subjectsQuery;
}