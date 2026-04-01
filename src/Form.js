function toggleForm() {
    document.querySelector("#popup-form").classList.add("active")
}

function closeForm() {
    document.querySelector("#popup-form").classList.remove("active")
}

function defaultTemplate() {
    const newTaskContainer = document.createElement('div');
    newTaskContainer.className = 'task-time-container';
    newTaskContainer.innerHTML = `
    <div id="time-stamp">
    <p>00:00</p><br/>
    <p>00:00</p>
    </div>
    <div id="task-detail">
    <p>taskName</p><br/>
    </div>
    `;
    document.getElementById('root').appendChild(newTaskContainer);
}

function saveData(event, form, index) {
    event.preventDefault()
    const formData = new FormData(form)
    const formObject = Object.fromEntries(formData)
    index++
    const json = JSON.stringify(formObject)
    localStorage.setItem(index, json)

    const startTime = formObject['start-time'];
    const endTime = formObject['end-time'];
    const taskName = formObject['task-name'];
    const newTaskContainer = document.createElement('div');
    newTaskContainer.className = 'task-time-container';
    newTaskContainer.innerHTML = `
        <div id="time-stamp">
            <p>${startTime}</p><br/>
            <p>${endTime}</p>
        </div>
        <div id="task-detail">
            <p>${taskName}</p><br/>
        </div>
    `;
    document.getElementById('root').appendChild(newTaskContainer);
    form.reset();
}

function testDisplay() {
    console.log('test display')
}