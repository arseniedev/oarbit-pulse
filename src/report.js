class Report {
    constructor() {
        this.allTasks = []
        this.totalDuration = 0
        this.taskManager = Controller.setup(task_json)
        this.srcArray = this.taskManager.allMyTasks
    }
// TODO: ADD CHARTS, reference to iteration 5
// https://www.amcharts.com/demos/donut-chart/
// https://jsfiddle.net/kdvuxbtj/

    displayChart() {
        let habitData = this.getHabitChartData();
        this.addHabitChart(document.getElementById('habitChart'), habitData[0], habitData[1], habitData[2]);
    }

    addHabitChart(canvasElement, labelsArray, dataArray, colorArray) {
        const ctx = canvasElement.getContext('2d')
        const data = {
            labels: labelsArray,
            datasets: [{
                label: labelsArray,
                data: dataArray,
                backgroundColor: colorArray,
                borderColor: colorArray,
                borderWidth: 3
            }]
        }

        const options = {
            legend: {
                display: false,
            }
        }

        this.partyChart = new Chart(ctx, {
        type: 'doughnut',
        data,
        options
      })

    }


    // addHabitChart(canvasElement, labelsArray, dataArray, colorArray) {
    //     const ctx = canvasElement.getContext('2d')
    //   const data = {
    //     labels: labelsArray,
    //     datasets: [{
    //       label: labelsArray,
    //       data: dataArray,
    //       borderColor: colorArray,
    //       borderWidth: 3
    //     }]
    //   }
  
    //   const options = {
    //     responsive: true,
    //     legend: {
    //       display: false,
    //       position: 'left',
    //       labels: {
    //         padding: 3,
    //         boxWidth: 10,
    //         fontSize: 10,
    //         generateLabels: function (chart) {
    //           const datasets = chart.data.datasets[0]
    //           return datasets.label.map(function (label, index) {
    //             const backgroundColor = datasets.borderColor[index]
    //             return {
    //               text: label,
    //               fillStyle: backgroundColor
    //             }
    //           })
    //         }
    //       }
    //     },
    //     title: {
    //       display: true,
    //       text: 'NZ Election General Election Party Vote Percentage',
    //       fontSize: 30,
    //       padding: 20,
    //       fontColor: 'rgb(0,0,0)'
    //     },
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           fontSize: 12,
    //           callback: function (value, index, values) {
    //             return value + '%'
    //           }
    //         }
    //       }]
    //     }
    //   }
  
    //   this.partyChart = new Chart(ctx, {
    //     type: 'doughnut',
    //     data,
    //     options
    //   })
    // }

    getHabitChartData() {
        let habitNameArray = this.mapArray()
        let habitDurationArray = []
        let habitColorArray = [
            '#1f906a',
            '#901f7f',
            '#fb720a',
            '#030a91',
            '#767cfd',
        ]
        for(const aTask of this.mapArray()) {
            habitDurationArray.push(this.getDuration(aTask))
            // habitColorArray.push(aTask.color)
        }
        return [habitNameArray, habitDurationArray, habitColorArray]
    }
    
    displayReport() {
        let result = ``
        result += this.displayChartLabels()
        // result += this.calcAccumulatedDuration()
        return result
    }

    // mapArray(){
    // // unique array
    //     this.srcArray.forEach(task => {
    //         if (!this.allTasks.includes(task.name)) {
    //             this.allTasks.push(task.name)
    //         }
    //     })
    //     return this.allTasks
    // }

    mapArray(){
        // unique array
        this.srcArray.forEach(task => {
            if (!this.allTasks.includes(task.name)) {
                this.allTasks.push(task.name)
            }
        })
        return this.allTasks
    }

    displayChartLabels() {
        let array = this.mapArray()
        let result =``
        array.forEach((tag) => {
            result += `<button class="tags">${tag}</button>` 
        })
        return `<div id="tag-box">${result}</div>`
    }

    calcAccumulatedDuration() {
        let result = ``
        for (const task of this.mapArray()) {
            // let array = this.getDuration(task)
            // for (const duration of array) {

                // const duration = this.getDuration(task)
                // result += {task, duration}

                result += `[${task}-${this.getDuration(task)}]`
                // result += this.getDuration(taskName)
                // result += ``
            // }
        }
        return result
        // for (aTask of this.allTasks) {
        //     result += aTask
        // }
    }

    getDuration(taskName){
        // let timeArray = []
        let result = 0
        for (const task of this.srcArray) {
            if (task.name === taskName) {
                result += task.calculateDuration()
                // timeArray.push(task.calculateDuration())
            }
        }
        return result
        // return timeArray
    }
}
