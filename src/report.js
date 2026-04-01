class Chart {
  constructor(containerId, storedData) {
      this.root = am5.Root.new(containerId)
      this.root.setThemes([am5themes_Animated.new(this.root)])
      this.chart = this.createChart()
    //   this.chartData = [
    //       { habit: "Gym", duration: 34.6 },
    //       { habit: "Reading", duration: 23.2 },
    //       { habit: "Row", duration: 14.6 },
    //       { habit: "Study", duration: 19.3 },
    //       { habit: "Gardening", duration: 22.5 }
    //   ]
      this.chartData = storedData
      this.series = this.createSeries()
      this.legend = this.createLegend()
      this.label = null
      this.centerText = ""

      this.series.events.on("click", ev => {
        // const targetField = ev.target._settings.categoryField
        const clicked = ev
        console.log(clicked)
          this.centerText = "Hello"
      }, this)

      this.setLabel()
  }

  createChart() {
      return this.root.container.children.push(am5percent.PieChart.new(this.root, {
          innerRadius: 100,
          layout: this.root.verticalLayout,
          innerRadius: am5.percent(50),
        //   class: "chart-container"
      }))
  }

  createSeries() {
      const series = this.chart.series.push(am5percent.PieSeries.new(this.root, {
          categoryField: "habit",
          valueField: "duration",
          alignLabels: false,
        //   class: "chart-segment"
      }))

      series.labels.template.setAll({
        visible: false,
        text: ""
        //   textType: "circular",
        //   centerX: 0,
        //   centerY: 0
      })

      if (this.chartData.length === 1) {
        series.slices.template.setAll({
            fill:am5.color("#cccccc")
        })
      }

      series.data.setAll(this.chartData)
      console.log(this.chartData)
      series.appear(1000, 100)

      series.onPrivate("width", width => {
          this.label.set("maxWidth", width * 0.7)
      })

    //   console.log(this.chartData.length)
      return series
  }

  createLegend() {
      const legend = this.chart.children.push(am5.Legend.new(this.root, {
          centerX: am5.percent(50),
          x: am5.percent(50),
          marginTop: 10
      }))

      legend.data.setAll(this.series.dataItems)
      return legend
  }

  setCenterText() {
    return this.centerText
    // return "Duration\nplaceholder"
  }

  setLabel() {
    // this.label.set("text", this.setCenterText())
      if (this.label) this.label.dispose()

      this.label = this.series.children.push(am5.Label.new(this.root, {
          text: this.setCenterText(),
          fontduration: 12,
          centerX: am5.percent(50),
          centerY: am5.percent(50),
          populateText: true,
          overdurationdBehavior: "fit"
      }))
  }
}

