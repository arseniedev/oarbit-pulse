class Chart {
  constructor(container) {
    this.chart = am4core.create(container, am4charts.PieChart)
    this.allChartData = []
    this.series = null
    this.label = null
    this.legend = null
    this.showLabel = false
    this.showCenterTxt = false
    this.oldVal = ''
  }

  initialize() {
    am4core.ready(() => {
      am4core.useTheme(am4themes_animated)
      this.loadChartData()
      this.createChart()
      this.createSeries()
      this.createLabel()
      this.createLegend()
      this.chartEventHandler()
    })
  }

  loadChartData() {
    let theHabitManager = new TaskManager()
    if (window.localStorage.length === 0) {
      let placeholder = {}
      placeholder['habit'] = "Empty"
      placeholder['duration'] = 100
      this.allChartData.push(placeholder)
      document.getElementById("habit-chart").classList.add("non-empty-chart")
    }
    else {
      let mappedData = theHabitManager.mapData()
      for (let aHabit of mappedData) {
        let habit = {}
        habit['habit'] = aHabit.taskName
        habit['duration'] = aHabit.duration
        this.allChartData.push(habit)
      }
    }
  }


  chartEventHandler() {
    this.series.slices.template.events.on('hit', (ev) => {
      const habitName = ev.target.dataItem.category
      const value = ev.target.dataItem.values.value.value
      this.displayCenterTxt(this.oldVal, value)
      this.setCenterText(habitName, value)
    })
  }

  createChart() {
    this.chart.hiddenState.properties.opacity = 0
    this.chart.data = this.allChartData
    this.chart.radius = am4core.percent(70)
    this.chart.innerRadius = am4core.percent(40)
    this.chart.startAngle = 180
    this.chart.endAngle = 360
  }

  createSeries() {
      this.series = this.chart.series.push(new am4charts.PieSeries())
      this.series.dataFields.value = "duration"
      this.series.dataFields.category = "habit"

      this.series.slices.template.cornerRadius = 10
      this.series.slices.template.innerCornerRadius = 7
      this.series.slices.template.draggable = false
      this.series.slices.template.inert = true
      this.series.labels.template.disabled = this.displayLabel()
      this.series.alignLabels = false

      this.series.hiddenState.properties.startAngle = 90
      this.series.hiddenState.properties.endAngle = 90
  }

  createLabel() {
    this.label = this.series.createChild(am4core.Label)
    this.label.text = this.setCenterText()
    this.label.horizontalCenter = "middle"
    this.label.verticalCenter = "middle"
    this.label.fontSize = 25
  }

  createLegend() {
    this.chart.legend = new am4charts.Legend()
  }

  displayLabel() {
    this.showLabel = !this.showLabel
    this.series.labels.template.disabled = this.showLabel
    return this.showLabel
  }

  setCenterText(habit = "[]", duration = "0") {
    if(this.showCenterTxt) {
      this.label.text = `${habit.toUpperCase()}\n${duration}hr(s)`
      this.label.textAlign = "middle"
    }
    else {
      this.label.text = ""
    }
    return this.label.text
  }

  displayCenterTxt(oldTxt, newVal) {
    // console.log(oldTxt,newVal)
    if(oldTxt === newVal) {
      this.showCenterTxt = !this.showCenterTxt
    } else {
      this.showCenterTxt = true
    }
    this.oldVal = newVal
    // this.showCenterTxt = !this.showCenterTxt
    return this.showCenterTxt
  }
}


