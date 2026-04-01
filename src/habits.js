class TaskManager {
    constructor(currentDate=new Date()) {
        this.container = ''
        this.date = currentDate
        this.dayIndex = (this.date).getDay()
        this.allMyTasks = []
    }

    // addTask(dayContainer, newName, newStart, newEnd) {
    //     let newHabit = new Task(dayContainer, newName, newStart, newEnd)
    //     this.allMyTasks.push(newHabit)
    // }

    sortHabits() {
        // let storage = this.getLocalStorage()
        // data.sort(function (a, b) {
        this.allMyTasks.sort(function (a, b) {
          if (a.start < b.start) {
            return 1
          } else if (a.start > b.start) {
            return -1
          } else {
            return 0
          }
        })
    }

    switchDayPage(value) {
        if (value === 'forward') {
            this.dayIndex++
            if(this.dayIndex > 6) {
                this.dayIndex = 0
            }
        } else if (value === 'back') {
            this.dayIndex--
            if(this.dayIndex < 0) {
                this.dayIndex = 6
            }
        }
        document.getElementById('day').innerHTML = this.switchDayDisplayed() 
        document.getElementById('day-contents').innerHTML = this.displayFilteredTasks()
    }

    switchDayDisplayed() {
        let result = ``
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        result += `<h2>${days[this.dayIndex]}</h2>`
        return result
    }

    displayHabit(duration = 24, name ='Empty Routine', start ='00:00', end ='00:00', taskTag = false) {
        let tag
        if (taskTag) {
            tag = "task-detail"
        } else {
            tag = "empty-task-detail"
        }
        return `
            <div class="task-time-container">
                <div id="time-stamp">
                    <p>${start}</p><br/>
                    <p>${end}</p>
                </div>
                <div id=${tag}>
                    <h5>${name}</h5>
                    <p>${this.formatHr(duration)}hr(s)</p>
                </div>
            </div>
        `
    }

    formatHr(duration) {
        return parseFloat(duration.toFixed(2))
    }

    handleFormData(form) {
        const formData = new FormData(form)
        let formObject = Object.fromEntries(formData)

        let newHabit = {}
        newHabit['day'] = this.dayIndex
        newHabit['name'] = formObject['task-name']
        newHabit['start'] = formObject['start-time']
        newHabit['end'] = formObject['end-time']
        newHabit['duration'] = this.calculateDuration(formObject['start-time'], formObject['end-time'])


        let validTime = this.validateInput(newHabit['start'],newHabit['end'])

        if(validTime) {
            // console.log(validTime)
            this.saveToStorage(newHabit)
            this.displayFilteredTasks()
            form.reset();
        } else {
            alert("Invalid time provided.")
        }
    }

    calculateDuration(startTime,endTime) {
        const [startHours, startMinutes] = startTime.split(':').map(Number)
        const [endHours, endMinutes] = endTime.split(':').map(Number)
    
        const startTimeMinutes = startHours * 60 +  startMinutes
        const endTimeMinutes = endHours * 60 + endMinutes
        const durationInMinutes = endTimeMinutes - startTimeMinutes
        const durationInHours = durationInMinutes / 60
        
        let duration = this.formatHr(durationInHours)
        return duration
    }


    saveToStorage(data) {;
        let storeKey = localStorage.length
        const json = JSON.stringify(data)
        localStorage.setItem(storeKey, json)
    }

    validateInput(startTime, endTime) {
        // const startTime = '16:29'
        // const endTime = '16:69'
        
        const [startHours, startMinutes] = startTime.split(':').map(Number)
        const [endHours, endMinutes] = endTime.split(':').map(Number)
        // First checkpoint: Time range
        let inputRangeChk = (startHours < 24 && startMinutes < 60 && startHours >=0 && startMinutes >=0 && endHours < 24 && endMinutes < 60 && endHours >= 0 && endMinutes >= 0)
        
        // Second checkpoint: Time values
        // const regEx =  /^([01]\d|2[0-3]):([0-5]\d)$/
        const regEx =  /^(0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/
        let regExStartChk = regEx.test(startTime)
        let regExEndChk = regEx.test(endTime)

        // Third checkpoint: Start time < End Time
        let timeCompareChk = startTime < endTime

        let regExChk = regExStartChk && regExEndChk
        let result = timeCompareChk && inputRangeChk && regExChk

        // console.log(result)
        // console.log(regExChk)
        // console.log(inputRangeChk)
        return result
    }

    getLocalStorage() {
        if (localStorage.length !== 0) {
            let allItems = []
            for (let index = 0 ; index < localStorage.length ; index++) {
                const key = localStorage.key(index)
                const data = window.localStorage.getItem(key)
                const parsedData = JSON.parse(data)
                allItems.push(parsedData)
            }
            this.allMyTasks = allItems
            this.sortHabits()
            return this.allMyTasks
            // return allItems
        } 
        else {
            return this.displayHabit()
        }
    }

    displayFilteredTasks() {
        let result = ""
        // this.sortHabits ()
        let array = this.getLocalStorage()
        let remainder = 24
        let accDayDuration = 0
        for (const newHabit of array) {
            if (newHabit.day === this.dayIndex) {
                const day = newHabit.day
                const name = newHabit.name
                const start = newHabit.start
                const end = newHabit.end
                const duration = newHabit.duration
                // const duration = this.calculateDuration(start, end)
                accDayDuration += duration
                result += this.displayHabit(duration, name, start, end, true)
                remainder = remainder - accDayDuration
            }
            }
        result += this.displayHabit(remainder)
        return result
    }
}