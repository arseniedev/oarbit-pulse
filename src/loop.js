'use strict'
const loopElement = React.createElement

class BeginLoop extends React.Component {
  constructor(props) {
    super(props)
    this.state = { go: false }
  }

  render() {
    if (this.state.go) {
        // !Asking for permission
        // Notification.requestPermission().then(perm => {
        //     alert(perm)
        // })
        // ! Basic Notification
        // Notification.requestPermission().then(permission => {
        //     if(permission === "granted") {
        //         new Notification("Example Notification")
        //     }
        // })
        // ! More texts
        // Notification.requestPermission().then(permission => {
        //     if(permission === "granted") {
        //         new Notification("Example Notification", {
        //             body: "This is more text"
        //         })
        //     }
        // })
        // ! Error and icon
        // Notification.requestPermission().then(permission => {
        //     if(permission === "granted") {
        //         const notification = new Notification("Example Notification", {
        //             body: "This is more text",
        //             data: { hello: "Hello!!!" },
        //             icon: "/img/logo.jpg",
        //             // tag: "Test tag", //overwriting existing notif
        //         })
        //         // notification.data //not sure what this does
        //         notification.addEventListener("error", e => {
        //             alert("error")
        //         })
        //     }
        // })
        // ! interval
        Notification.requestPermission().then(permission => {
            if(permission === "granted") {
                const notification = new Notification("Example Notification", {
                    body: "This is more text",
                    data: { hello: "Hello!!!" },
                    icon: "/img/logo.jpg",
                    // tag: "Test tag", //overwriting existing notif
                })
                notification.addEventListener("error", e => {
                    alert("error")
                })
            }
        })
    }
    
        // let notification
        // document.addEventListener("visibilitychange", () => {
        //     if (document.visibilityState === 'hidden') {
        //         notification = new Notification("Come backkk", {
        //             body: "PLEASEEEE"
        //         })
        //     } else {
        //         notification.close()
        //     }
        // })

        // return loopElement(
        //   'button',
        //   { onClick: () => this.setState({ go: true }) },
        //   'Begin'
        // )

        let notification
        let interval
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === 'hidden') {
                const leaveData = new Date()
                setInterval(() => {
                    notification = new Notification("Come backkk", {
                        body: `You have been gone for ${Math.round((new Date() - leaveData) / 1000)} seconds...`,
                        tag: "Test tag", //overwriting existing notif
                    })
                }, 100)
                
            } else {
                // clearInterval()
                if (interval) clearInterval(interval)
                if (notification) notification.close()
            }
        })

        return loopElement(
          'button',
          { onClick: () => this.setState({ go: true }) },
          'Begin'
        )
  }
}

const domContainer = document.querySelector('#begin-loop-container')
const root = ReactDOM.createRoot(domContainer)
root.render(loopElement(BeginLoop))