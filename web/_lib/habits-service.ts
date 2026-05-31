export type Task = {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    completed?: boolean;
  };
  
  export class HabitsService {
    private storageKey = "oarbit_tasks";
  
    getTasks(): Task[] {
      if (typeof window === "undefined") return [];
      return JSON.parse(localStorage.getItem(this.storageKey) || "[]");
    }
  
    saveTasks(tasks: Task[]) {
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
  
    addTask(task: Task) {
      const tasks = this.getTasks();
      tasks.push(task);
      this.saveTasks(tasks);
      return tasks;
    }
  
    clearTasks() {
      localStorage.removeItem(this.storageKey);
    }
  
    filterByDay(dayIndex: number): Task[] {
      const tasks = this.getTasks();
      return tasks.filter((t) => Number(t.id?.slice(-1)) % 7 === dayIndex);
    }
  
    generateId() {
      return crypto.randomUUID();
    }
  }