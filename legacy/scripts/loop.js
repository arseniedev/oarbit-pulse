class LoopManager {
    timeOutID
    notifCounter
    gap
    constructor() {
        this.state = false
        this.notifCounter = 0
        // this.perm = 'denied'
        // this.countdown = 5
        // this.start = '--:--'
        // this.end = '--:--'
        // this.timePair = {}
    }

    getCurrentTime() {
        const now = new Date()
        const currentHour = now.getHours()
        const currentMinute = now.getMinutes()
        return `${currentHour}:0${currentMinute}`
    }
    
    compareTime(start, end) {
        return end > start
    }

    validateInput(event) {
        const value = event.target.value
        let isPastCurrentTime = value //> this.getCurrentTime()
        // console.log(this.getCurrentTime())
        // console.log(value)
        const validPrompt = [isPastCurrentTime, 'Valid time input', value]
        const inValidPrompt = [isPastCurrentTime, 'Please enter a larger time value.', value]

        return isPastCurrentTime
            ? validPrompt
            : inValidPrompt
    }

    calculateDuration(startTime, endTime) {
        const start = new Date(`2000-01-01T${startTime}:00`)
        const end = new Date(`2000-01-01T${endTime}:00`)
        let result = parseFloat(Math.abs((end - start) / 36e5).toFixed(2))
        return result
    }

    solveInterval(count, gap) {
        let result
        // console.log(gap, count)
        let minuteInterval = (gap / count) * 60
        this.gap = minuteInterval * 60
        this.notifCounter = count
        // console.log(this.notifCounter)
        // console.log(minuteInterval + ' mins')
        // console.log(this.gap + ' seconds')
        if (typeof this.gap === 'number') {
            result = `You will receive hydration reminders every `
            if (minuteInterval > 1) {
                result += `${parseFloat(minuteInterval.toFixed(1))} minute(s).`
            } else {
                result += `${parseFloat(minuteInterval * 60).toFixed(1)} second(s).`}
        } else {result = " - "}

        return result
    }

    setState(count, gap) {
        clearTimeout(this.timeOutID)
        // const button = document.getElementById('begin-button')
        // button.addEventListener('click', () => {
            // console.log(this.gap)
            // this.notifCounter = count
            this.gap = (gap / count) * 3606
            console.log('Loop has started')
            Notification.requestPermission().then(perm => {
                //  this.perm = perm
                if (perm === 'granted') {
                    this.state = true
                    this.loopNotify(count)
                } else {
                    alert(`Permission: ${perm.toUpperCase()}`)
                }
            })
        // })
    }

    loopNotify(notifMaxCount) {
        // this.notifCounter = notifCount
        if (this.state) {
            if (this.notifCounter <= notifMaxCount) {
                this.timeOutID = setTimeout(() => {
                    console.log(this.notifCounter)
                    this.notifCounter++
                    this.displayNotif()
                    this.loopNotify(notifMaxCount)
                }, this.gap * 1000)
            } else {
                console.log('done')
                clearTimeout(this.timeOutID)
                this.state = false
            }
        }
    }

    displayNotif() {
        const notify = new Notification(`Hydration Reminder #${this.notifCounter}`, {
            body: `It is time to drink water.`,
            // data:,
            icon: "../media/images/hydration_logo.png",
            tag: 'hydration-reminder'
        })
    }
}