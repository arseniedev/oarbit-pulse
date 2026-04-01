class Task {
    constructor(newIndex, newName, newStart, newEnd, newColour) {
        this.dayIndex = newIndex
        this.name = newName
        this.startTime = newStart
        this.endTime = newEnd
        this.color = newColour
        this.duration = 0
    }

    displayTask() {
        return `
            <div class="task-time-container">
                <div id="time-stamp">
                    <p>${this.startTime}</p><br/>
                    <p>${this.endTime}</p>
                </div>
                <div id="task-detail">
                    <h5>${this.name}</h5>
                    <p>${this.calculateDuration()} hr(s)</p>
                    <h6>${this.color}</h6>
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
        
        this.duration = durationInHours
        return this.duration
    }
}
// class TaskManager {
//     constructor() {
//         this.tasks = [];
//         // this.index = 0;
//     }
//     toggleForm() {
//         document.querySelector("#popup-form").classList.add("active")
//     }
    
//     closeForm() {
//         document.querySelector("#popup-form").classList.remove("active")
//     }
    
//     defaultTemplate() {
//         const newTaskContainer = document.createElement('div');
//         newTaskContainer.className = 'task-time-container';
//         newTaskContainer.innerHTML = `
//         <div id="time-stamp">
//         <p>00:00</p><br/>
//         <p>00:00</p>
//         </div>
//         <div id="task-detail">
//         <p>taskName</p><br/>
//         </div>
//         `;
//         document.getElementById('root').appendChild(newTaskContainer);
//     }
    
//     saveData(event, form, index) {
//         event.preventDefault()
//         const formData = new FormData(form)
//         const formObject = Object.fromEntries(formData)
//         index++
//         const json = JSON.stringify(formObject)
//         localStorage.setItem(index, json)
    
//         const startTime = formObject['start-time'];
//         const endTime = formObject['end-time'];
//         const taskName = formObject['task-name'];
//         const newTaskContainer = document.createElement('div');
//         newTaskContainer.className = 'task-time-container';
//         newTaskContainer.innerHTML = `
//             <div id="time-stamp">
//                 <p>${startTime}</p><br/>
//                 <p>${endTime}</p>
//             </div>
//             <div id="task-detail">
//                 <p>${taskName}</p><br/>
//             </div>
//         `;
//         document.getElementById('root').appendChild(newTaskContainer);
//         form.reset();
//     }
    
//     testDisplay() {
//         console.log('test display')
//     }
// }

// // function getLocalStorage() {
// //     const allItems = []
// //     for (let index = 0 ; index < localStorage.length ; index++) {
// //         let set = []
// //         const key = localStorage.key(index)
// //         const data = window.localStorage.getItem(key)
// //         set.push(key)
// //         set.push(data)

// //         allItems.push(set)
// //     }
// //     document.querySelector('#habit-output').textContent += allItems
// // }



// // document.getElementsByClassName("tablinks");

// // function getAllMyHabits() {
// //     let content = ''
// //     for(const habit of allMyHabits) {
// //         content += habit
// //     }
// //     displayHabits('#habit-output', content)
// // }

// // function displayHabits(tag, content) {
// //     document.querySelector(tag).innerHTML = `${content}`
// // }

// // function saveEntry() {
// //     getList()
// // }
// const taskManager = new TaskManager()