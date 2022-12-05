import { TaskTimestamp } from "./taskTimestamp";

export interface Todo {
    taskId: number;
    title: string;
    timeStamps: TaskTimestamp[];
    isCompleted: boolean;
    isFavorite: boolean;
    isArchived: boolean;
    isPinned: boolean;
    date?: string;
    // date?: Date; make it optional
}
