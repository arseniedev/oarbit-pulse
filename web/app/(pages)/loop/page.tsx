"use client";

import { useHabits } from "../../hooks/useHabits";
import { useAudio } from "../../hooks/useAudio";
import { useState } from "react";

export default function HabitsPage() {
  const {
    filteredTasks,
    dayIndex,
    addTask,
    clearAll,
    nextDay,
    previousDay,
  } = useHabits();

  const { playAudio } = useAudio();

  const [formOpen, setFormOpen] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const taskName = form.get("taskName") as string;
    const startTime = form.get("startTime") as string;
    const endTime = form.get("endTime") as string;

    if (!taskName || !startTime || !endTime) {
      playAudio("error");
      return;
    }

    addTask({ name: taskName, startTime, endTime });

    playAudio("saveHabit");
    setFormOpen(false);

    e.currentTarget.reset();
  }

  return (
    <div className="habits-page">

      {/* HEADER INFO */}
      <div className="day-controls">
        <button onClick={() => { previousDay(); playAudio("previousNextDay"); }}>
          ‹
        </button>

        <h2>Day {dayIndex}</h2>

        <button onClick={() => { nextDay(); playAudio("previousNextDay"); }}>
          ›
        </button>
      </div>

      {/* TASK LIST */}
      <div className="task-list">
        {filteredTasks.map((task) => (
          <div key={task.id} className="task-card">
            <h3>{task.name}</h3>
            <p>{task.startTime} - {task.endTime}</p>
          </div>
        ))}
      </div>

      {/* ACTION BUTTON */}
      <button onClick={() => setFormOpen(true)}>+ Add Task</button>

      {/* CLEAR STORAGE */}
      <button
        onClick={() => {
          clearAll();
          playAudio("clear");
        }}
      >
        Clear All
      </button>

      {/* MODAL (REPLACES BOOTSTRAP MODAL) */}
      {formOpen && (
        <div className="modal">
          <form onSubmit={handleSubmit} className="modal-box">

            <h2>New Task</h2>

            <input name="taskName" placeholder="Task name" required />
            <input name="startTime" type="time" required />
            <input name="endTime" type="time" required />

            <div className="modal-actions">
              <button type="submit">Save</button>

              <button
                type="button"
                onClick={() => {
                  setFormOpen(false);
                  playAudio("cancel");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}