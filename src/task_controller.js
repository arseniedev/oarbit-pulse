class Controller {
    static setup (task_json) {
      const theTaskManager = new TaskManager(new Date())
      
      for (let aNewTask of task_json.Tasks){
        let dayContainer = aNewTask.dayIndex
        let newName = aNewTask.name
        let newStart = aNewTask.startTime
        let newEnd = aNewTask.endTime
        let newColour = aNewTask.color
        theTaskManager.addTask(dayContainer, newName, newStart, newEnd, newColour)
      }
      
      return theTaskManager
      }
    }
    