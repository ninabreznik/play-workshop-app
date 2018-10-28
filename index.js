var st = document.createElement('style')
st.innerHTML = `
  html {
    display: table;
    min-width: 100%;
    margin: 0;
  }
  body {
    margin: 0;
    display: flex;
    flex-flow: column;
    height: 100vh;
  }`
document.head.appendChild(st)

var workshop = require('wizardamigos-workshop')

async function start () {
  var el = await workshop({
    theme: {
      '--font': 'assets/PIXELADE.ttf'
    }
  })
  document.body.appendChild(el)
}

start()
