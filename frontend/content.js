import iframeResize from '@iframe-resizer/parent'

const allInputs = document.querySelectorAll('input')
const emailInputs = []
const passwordInputs = []
const usernameInputs = []

// insert

document.head.insertAdjacentHTML('beforeend', `
  <style>
    @keyframes fading {
      0% { opacity: 1; }
      100% { opacity: 0; }
    }

    @keyframes fading-in {
      0% { 
        opacity: 0; 
        transform: translateY(20px);
      }
      100% { 
        opacity: 1; 
        transform: translateY(0);
      }
      
    }
  </style>
`)

allInputs.forEach(input => {
  if (input.type === 'email' || input.name === 'email' || input.id === 'email') {
    emailInputs.push(input)
  }
  if (input.type === 'password' || input.name === 'password' || input.id === 'password') {
    passwordInputs.push(input)
  }
  if (input.name === 'username' || input.id === 'username') {
    usernameInputs.push(input)
  }
}
)

const url = new URL(window.location.href)
console.log(url.hostname)

chrome.storage.sync.get('vault', (data) => {
  const vault = data.vault
  const credentials = vault.filter(cred => cred.website === url.hostname)

  if (credentials.length === 0) return

  const email = credentials[0].email
  const password = credentials[0].password
  const username = credentials[0].username

  emailInputs.forEach(input => {
    input.value = email
  })

  passwordInputs.forEach(input => {
    input.value = password
  })

  usernameInputs.forEach(input => {
    input.value = username
  })
})

emailInputs.forEach(input => {
  input.addEventListener('mouseenter', () => {
    // verificar si ya existe un frame para no crear otro
    const existingFrame = document.getElementById('frame-email')
    if (existingFrame) return

    // Crear el contenedor del frame
    const frame = document.createElement('iframe')
    frame.id = 'frame-email'
    frame.src = chrome.runtime.getURL('/#/set-pass')
    console.log(frame.src)

    frame.style.position = 'absolute'
    frame.style.top = input.getBoundingClientRect().top + window.scrollY + input.offsetHeight + 5 + 'px'
    frame.style.left = input.getBoundingClientRect().left + window.scrollX + 'px'
    frame.style.width = input.offsetWidth + 'px'
    frame.style.height = '0px'

    frame.style.border = '0px solid black'
    frame.style.borderRadius = '0.5rem'
    frame.style.opacity = '0'

    frame.style.background = 'transparent'

    // only opacity

    frame.style.transitionProperty = 'opacity'

    frame.style.transitionDuration = '300ms'

    frame.addEventListener('mouseleave', () => {
      frame.style.animation = 'fading 410ms'
      setTimeout(() => {
        frame.remove()
      }, 400)
    }
    )

    frame.onload = () => {
      frame.contentWindow.postMessage({
        type: 'websiteUrl',
        data: 'wwww.ejemplo.com'
      }, '*')

      iframeResize(
        {
          log: false,
          license: 'GPLv3',
          onResized: () => {
            frame.style.animation = 'fading-in 300ms'
            frame.style.opacity = '1'
          }
        },
        frame
      )
    }

    document.body.appendChild(frame)
  })
})

window.addEventListener('message', (event) => {
  if (event.data.type === 'getWebsiteUrl') {
    const url = new URL(window.location.href)
    event.source.postMessage({
      type: 'websiteUrl',
      url: url.hostname
    }, '*')
  }

  if (event.data.type === 'setPass') {
    const { email, username, password } = event.data.data
    emailInputs.forEach(input => {
      input.value = email
    })
    passwordInputs.forEach(input => {
      input.value = password
    })
    usernameInputs.forEach(input => {
      input.value = username
    })

    const frameEmail = document.getElementById('frame-email')
    const frameUsername = document.getElementById('frame-username')
    const framePassword = document.getElementById('frame-password')

    if (frameEmail) frameEmail.remove()
    if (frameUsername) frameUsername.remove()
    if (framePassword) framePassword.remove()
  }
})
