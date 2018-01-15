var csjs = require('csjs-inject')
var bel = require('bel')
var datauri = require('datauri')

window.addEventListener('keyup', function (event) {
  var left = 37
  var right = 39
  if (event.which === left) {
    previous()
  } else if (event.which === right){
    next()
  }
})

// ASSETS

var FONT = 'Pixelade';
var font_url = datauri(__dirname + '/assets/PIXELADE.ttf')
var font = bel`
  <style>
    @font-face {
      font-family: ${FONT};
      src: url('${font_url}');
    }
  </style>
`
document.head.appendChild(font)

// CSS
var css = csjs`
  *, *:before, *:after { box-sizing: inherit; }
  img { box-sizing: content-box; }
  iframe { border: 0; height: 100vh; }
  html {
    box-sizing: border-box;
    display: table;
    min-width: 100%;
    margin: 0;
  }
  body {
    margin: 0;
    display: flex;
    flex-flow: column;
    min-height: 100vh;
    font-family: ${FONT};
  }
  .content {
    position: relative;
    min-height: 100vh;
  }
  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    border: 5px solid #d6dbe1;
  }
  button {
    cursor: pointer;
    width: 100px;
    height: 100%;
    font-size: 50px;
    font-weight: 900;
    font-family: ${FONT};
    border: none;
    background-color: #ffd399;
    color: white;
  }
  button:hover {
    background-color: #43409a;
  }
  .header {
    background-color: red;
    width: 230px;
  }
  .logo {
    margin-right: 20px;
    width: 50px;
    height: 50px;
  }
  .logo:hover {
    opacity: 0.9;
    cursor: pointer;
  }
  .banner {
    margin: 0 5%;
    display: flex;
    color: black;
    font-size:30px;
    font-family: ${FONT};
    font-weight: 900;
  }
  .stats {
    display: flex;
    align-self: center;
  }
  .container {
    display: flex;
    background-color: #43409a;
    height: 90vh;
    align-items: center;
  }
  .wide {
    margin: 1%;
    display: flex;
    flex-direction: column;
    width: 70%;
    height: 85vh;
  }
  .narrow {
    margin: 1%;
    width: 27%;
    height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .editor {
    border: 5px solid #d6dbe1;
    width: 100%;
    height: 85vh;
  }
  .video {
    border: 5px solid #d6dbe1;
    width: 100%;
    height: 45vh;
  }
  .bottom {
    height: 39vh;
  }
  .switchButtons {
    display: flex;
    height: 5vh;
    width: 100%;
    flex-direction: row;
    justify-content: center;
  }
  .infoViewButton,
  .chatViewButton {
    border: 5px solid #d6dbe1;
    font-size: 20px;
    width: 50%;
    background-color: transparent;
    font-style: capitalize;
  }
  .infoViewButton:hover,
  .chatViewButton:hover {
    background-color: white;
    color: #43409a;
  }
  .infoBox {
    background-color: white;
    border-top: none;
    width: 100%;
    height: 34vh;
    display: flex;
    align-items: center;
  }
  .chatBox {
    display: flex;
    position: relative;
    flex-grow: 1;
    min-width: 300px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .gitter {
    position: absolute;
    width: 139.4%;
    height: 56.5vh;
    transform: translate(-20%, 24%) scale(0.6);
    align-self: center;
  }
  .welcome {
    font-size: 20px;
    padding: 0 10%;
    color: #43409a;
  }
`

var videos = [
  'z9TSzhcJWgI',
  'F_rA5h-9FZ0',
  'luxpr09zHxU',
  'QVUSi_AOKkQ',
  'HsvtL6iAAB8',
  'zT1VYVD7Rlk',
  'nBRH0xuIY0A',
  'ORYyfevzr0c'
]

var logo_url = datauri(__dirname + '/assets/wizard.png')
var logo = bel`
  <img class="${css.logo}" onclick=${home} title = "made with love by Wizard Amigos" src="${logo_url}">
`
var lesson = 0
var series = 'PORTFOLIO PAGE with YO and CSJS:'
var video = iframe(`https://www.youtube.com/embed/${videos[0]}`, css.video)
var editor = iframe("https://codesandbox.io/embed/k13vlrxzzo?fontsize=12&hidenavigation=1", css.editor)
var gitter = iframe("https://gitter.im/wizardamigosinstitute/program/~embed", css.gitter)
var chatBox = bel`<div class=${css.chatBox}>${gitter}</div>`
var infoBox = bel`
  <div class=${css.infoBox}>
    <div class=${css.welcome}>
      Welcome to WizardAmigos. Click play on the video above and start with
      the tutorial! In In the center of the screen you can see the editor
      where you can modify the code and see the preview.
    </div>
  </div>`
var view = 'info'

var stats = bel`<span class=${css.stats}>${series} Lesson ${lesson + 1}/${videos.length}</span>`

var app = bel`
  <div class="${css.content}">
    <div class=${css.menu}>
      <button onclick=${previous}> ${'<'} </button>
      <span class=${css.banner}>${logo} ${stats}</span>
      <button onclick=${next}> ${'>'} </button>
    </div>
    <div class=${css.container}>
      <div class=${css.narrow}>
        ${video}
        <div class=${css.bottom}>
          <div class=${css.switchButtons}>
            <button class=${css.infoViewButton} title='infoButton' onclick=${changeView}>Info</button>
            <button class=${css.chatViewButton} title='chatButton' onclick=${changeView}>Chat</button>
          </div>
          ${infoBox}
        </div>
      </div>
      <div class=${css.wide}>
        ${editor}
      </div>
    </div>
  </div>
`
document.body.appendChild(app)

function previous (event) {
  if (lesson <= 0) return
  lesson--
  var old = video
  video = iframe(`https://www.youtube.com/embed/${videos[lesson]}`, css.video)
  old.parentElement.replaceChild(video, old)
  stats.innerText = `Lesson ${lesson + 1}/${videos.length}`
}
function next (event) {
  if (lesson >= videos.length - 1) return
  lesson++
  var old = video
  video = iframe(`https://www.youtube.com/embed/${videos[lesson]}`, css.video)
  old.parentElement.replaceChild(video, old)
  stats.innerText = `Lesson ${lesson + 1}/${videos.length}`
}
function iframe (src, classname) {
  return bel`
    <iframe
      class=${classname}
      src="${src}"
      frameborder="0"
      allowfullscreen
    ></iframe>
  `
}

function changeView (e) {
  console.log(e.target.title)
  console.log('view =', view)
  var parent = document.querySelector(`.${css.bottom}`)
  console.log(parent)
  if (e.target.title === 'infoButton') {
    if (view != 'info') {
      parent.removeChild(chatBox)
      parent.appendChild(infoBox)
      return view = 'info'
    }
  }
  if (e.target.title === 'chatButton') {
    if (view != 'chat') {
      parent.removeChild(infoBox)
      parent.appendChild(chatBox)
      return view = 'chat'
    }
  }
}

function showChat () {
  var parent = document.querySelector(`.${css.narrow}`)
  parent.removeChild(infoBox)
  parent.appendChild(chatBox)
}

function home () {
  window.open('http://wizardamigos.com/', '_blank');
}
