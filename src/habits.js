class TaskManager {
    constructor(currentDate=new Date()) {
        this.container = ''
        this.date = currentDate
        this.dayIndex = (this.date).getDay()
        this.allMyTasks = []
    }
    // React auto fill
    // https://www.npmjs.com/package/react-autofill


    sortHabits(allItems) {
        allItems.sort((a, b) => a.startTime.localeCompare(b.startTime))
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
        // let name = formObject['taskName']
        let start = formObject['startTime']
        let end = formObject['endTime']
        formObject['day'] = this.dayIndex
        formObject['duration'] = this.calculateDuration(start,end)

        let validTime = this.validateInput(start,end)

        if(validTime) {
            // console.log(validTime)
            this.saveToStorage(formObject)
            this.displayFilteredTasks()
            form.reset();
            // document.getElementById('taskName').focus()
            location.reload()

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
            this.sortHabits(allItems)
            this.allMyTasks = allItems
            return this.allMyTasks
        } 
        else {
            return this.displayHabit()
        }
    }

    displayFilteredTasks() {
        let result = ""
        let array = this.getLocalStorage()
        let remainder = 24
        let accDayDuration = 0
        for (const newHabit of array) {
            if (newHabit.day === this.dayIndex) {
                const day = newHabit.day
                const name = newHabit.taskName
                const start = newHabit.startTime
                const end = newHabit.endTime
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

    clearLocalStorage() {
        localStorage.clear()
        location.reload()
    }
}