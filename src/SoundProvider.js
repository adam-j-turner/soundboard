import _ from "lodash";

class SoundProvider {
  constructor() {
    this.playing = false
    this.queue = []

    this.audio = this.importBulk(require.context('./sounds', true, /\.(wav|mp3)$/))
  }

  // Imports audio in bulk from a webpack context
  importBulk(context) {
    let clips = {}

    context.keys().map((item) => {
      clips[item.replace('./', '')] = new Audio(context(item))
    })

    _.forEach(clips, (clip) => {
      clip.preload = true
      clip.load()

      clip.addEventListener('ended', () => {
          this.playing = false
          this.queue.shift()

          if (this.queue.length > 0) {
            this.audio[this.queue[0]].play()
          }
      })
    })

    return clips
  }

  stopAudio() {
    this.audio[this.queue[0]].pause()
    this.audio[this.queue[0]].currentTime = 0
  }

  playAudio(paths, allowSimultaneous=false) {
    if (typeof paths === "string") { paths = [paths] }
    if (this.playing && !allowSimultaneous) {
      this.playing = false
      this.stopAudio()
    }

    this.queue = Array.from(paths)
      
    this.playing = true
    this.audio[this.queue[0]].play()
  }
}

const instance = new SoundProvider();

export default instance;
