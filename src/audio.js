class OarBitAudio {
    constructor() {
        this.audio = new Audio()
    }
    playAudio(action) {
        let audioDictionary = {
            openingAudio: 'ui_loading.wav',
            switchToHabit: 'navigation_transition-right.ogg',
            switchToStats: 'shuffle-cards-stack.mp3',
            switchToLoop: 'ui_camera-shutter.ogg',

            previousNextDay: 'navigation_hover-tap.ogg',
            saveHabit: 'navigation_selection-complete-celebration.ogg',
            clear: 'notification_ambient.ogg',
            cancel: 'navigation_unavailable-selection.ogg',
            beginLoop: 'hero_decorative-celebration-03.ogg',
            interval: 'navigation_forward-selection-minimal.ogg',
            error: 'alert_error-02.ogg',
        }

        let audioName = audioDictionary[action]
        this.audio.src = `../media/audio/${audioName}`
        this.audio.play()
        
        // var aud = document.createElement("audio")
        // document.body.appendChild(aud)
        // aud.src = `../media/audio/${audioName}`
        
        // console.log(this.audio.src)

        // document.body.addEventListener("mousemove", function () {
            // aud.play()
        // })
    }
}