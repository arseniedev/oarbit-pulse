class TaskManager {
    constructor(currentDate) {
        this.allMyTasks = []
        this.name = ''
        this.startTime = '00:00'
        this.endTime = '00:00'
        this.container = ''
        this.date = currentDate
        this.index = (this.date).getDay()
    }
    // STATIC
    addTask(newIndex, newName, newStart, newEnd, newColour) {
        const newTask = new Task(newIndex, newName, newStart, newEnd, newColour)
        this.allMyTasks.push(newTask)
    }

    sortTasks () {
        this.allMyTasks.sort(function (a, b) {
          if (a.startTime < b.startTime) {
            return 1
          } else if (a.startTime > b.startTime) {
            return -1
          } else {
            return 0
          }
        })
    }

    switchDayPage(value) {
        if (value === 'forward') {
            this.index++
            if(this.index > 6) {
                this.index = 0
            }
        } else if (value === 'back') {
            this.index--
            if(this.index < 0) {
                this.index = 6
            }
        }
        document.getElementById('day').innerHTML = theTaskManager.switchDayDisplayed() 
        document.getElementById('day-contents').innerHTML = this.displayFilteredTasks()
    }

    switchDayDisplayed() {
        let result = ``
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const now = new Date()
        // const currentDay = days[now.getDay()]
        result += `<h2>${days[this.index]}</h2>`
        return result
    }

    displayFilteredTasks() {
        let result = ``
        for (const task of this.allMyTasks) {
            if (task.dayIndex === this.index) {
                result += task.displayTask()
            }
        }
        return result
    }
    
    displayTasks() {
        this.sortTasks()
        let result = ``
        for (const task of this.allMyTasks) {
            result += task.displayTask()
        }
        return result
    }

    // Functional--FORM SPECIFIC CODE
    toggleForm() {
        document.querySelector("#popup-form").classList.add("active")
    }
    
    closeForm() {
        document.querySelector("#popup-form").classList.remove("active")
    }

    displayFormData() {
        this.container = document.createElement('div')
        this.container.className = 'task-container'
        this.container.innerHTML = `
        <div id="time-stamp">
        <p>${this.startTime}</p><br/>
        <p>${this.endTime}</p>
        </div>
        <div id="task-detail">
        <p>${this.calculateDuration()} hr</p>
        </div>
        `
        if (this.index === 0) {
            document.getElementById('root').replaceChildren(this.container)
        } else {
            document.getElementById('root').appendChild(this.container)
        }
    }

    handleFormData(form) {
        const formData = new FormData(form)
        const formObject = Object.fromEntries(formData)
        
        this.name = formObject['task-name']
        this.startTime = formObject['start-time']
        this.endTime = formObject['end-time']
        
        form.reset();
        
        this.saveToStorage(formObject)
        this.displayFormData()
        this.index++
        this.closeForm()

        // this.addTask(formObject['task-name'],formObject['start-time'],formObject['end-time'])
    }

    saveToStorage(data) {;
        const json = JSON.stringify(data)
        localStorage.setItem(this.index, json)
    }

    validateInput() {

    }

    // getLocalStorage() {
    //     const allItems = []
    //     for (let index = 0 ; index < localStorage.length ; index++) {
    //         let set = []
    //         const key = localStorage.key(index)
    //         const data = window.localStorage.getItem(key)
    //         set.push(key)
    //         set.push(data)

    //         allItems.push(set)
    //     }
    //     return allItems
    // }


    // sandbox() {
    //     this.container = document.createElement('div');
    //     this.container.className = 'task-time-container';
    //     this.container.innerHTML = `
    //     <div id="time-stamp">
    //     <p>${this.getLocalStorage()}</p><br/>
    //     </div>
    //     `;
    //     const element = document.getElementById('root')
    //     element.appendChild(this.container);
    // }



}

// document.getElementsByClassName("tablinks");


const taskManager = new TaskManager()