"use client";

import { useEffect, useMemo, useState } from "react";
import { HabitsService, Task } from "../../_lib/habits-service";

const service = new HabitsService();

export function useHabits() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dayIndex, setDayIndex] = useState(0);

  useEffect(() => {
    setTasks(service.getTasks());
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      // replace with your real logic if needed
      return true;
    });
  }, [tasks, dayIndex]);

  function addTask(task: Omit<Task, "id">) {
    const newTask: Task = {
      ...task,
      id: service.generateId(),
      completed: false,
    };

    const updated = service.addTask(newTask);
    setTasks(updated);
  }

  function clearAll() {
    service.clearTasks();
    setTasks([]);
  }

  function nextDay() {
    setDayIndex((p) => p + 1);
  }

  function previousDay() {
    setDayIndex((p) => p - 1);
  }

  return {
    tasks,
    filteredTasks,
    dayIndex,
    addTask,
    clearAll,
    nextDay,
    previousDay,
  };
}