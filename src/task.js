class Task {
    constructor(newIndex, newName, newStart, newEnd){//, newColour) {
        this.dayIndex = newIndex
        this.name = newName
        this.startTime = newStart
        this.endTime = newEnd
        // this.color = newColour
        this.duration = 0
    }

    displayTask() {
        const containerColor = `style="background-color:${this.color}"`
        return `
            <div class="task-time-container">
                <div id="time-stamp">
                    <p>${this.startTime}</p><br/>
                    <p>${this.endTime}</p>
                </div>
                <div id="task-detail" ${containerColor}>
                    <h5>${this.name}</h5>
                    <p>${this.calculateDuration()} hr(s)</p>
                </div>
            </div>
        `
    }

    calculateDuration() {
        const startTime = this.startTime
        const endTime = this.endTime

        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);
    
        const startTimeMinutes = startHours * 60 + startMinutes;
        const endTimeMinutes = endHours * 60 + endMinutes;

        const durationInMinutes = endTimeMinutes - startTimeMinutes;
        const durationInHours = durationInMinutes / 60
        
        this.duration = parseFloat(durationInHours.toFixed(2))
        return this.duration
    }
}