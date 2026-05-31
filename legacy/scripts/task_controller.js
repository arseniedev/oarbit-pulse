class Controller {
    static setup (task_json) {
      const theHabitManager = new Report()
      // const theTaskManager = new TaskManager(new Date())
      
      for (let aNewTask of task_json.Tasks){
        let dayContainer = aNewTask.dayIndex
        let newName = aNewTask.name
        let newStart = aNewTask.startTime
        let newEnd = aNewTask.endTime
        // let newColour = aNewTask.color
        theHabitManager.addHabit(dayContainer, newName, newStart, newEnd)//, newColour)
        // theTaskManager.addTask(dayContainer, newName, newStart, newEnd)//, newColour)
      }
      
      return theHabitManager
      }
    }
    