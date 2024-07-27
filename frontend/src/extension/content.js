import { FrameSetPass } from '../components/FrameSetPass.js'
const insertStyle = () => {
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
}

const getInputs = () => {
  const allInputs = document.querySelectorAll('input')
  const emailInputs = []
  const passwordInputs = []
  const usernameInputs = []

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
  })

  return { emailInputs, passwordInputs, usernameInputs, allInputs }
}

// const checkIfThisWebsiteIsInVault = async ({
//   emailInputs,
//   passwordInputs,
//   usernameInputs
// }) => {
//   const vault = await chrome.storage.sync.get('vault')
//   const credentials = vault.vault.filter(cred => cred.website === url.hostname)

//   if (credentials.length === 0) return false

//   const email = credentials[0].email
//   const password = credentials[0].password
//   const username = credentials[0].username

//   emailInputs.forEach(input => {
//     input.value = email
//   })

//   passwordInputs.forEach(input => {
//     input.value = password
//   })

//   usernameInputs.forEach(input => {
//     input.value = username
//   })

//   return true
// }

const {
  allInputs
} = getInputs()
const url = new URL(window.location.href)

insertStyle()

const renderFrame = async ({
  input
}) => {
  const websiteUrl = url.hostname
  const frame = FrameSetPass({
    input,
    websiteUrl
  })
  document.body.appendChild(frame)
}

allInputs.forEach((input, i) => {
  input.setAttribute('autocomplete', 'off')
  input.setAttribute('index', i)

  input.addEventListener('mouseenter', () => {
    const existingFrame = document.getElementById('frame-set-pass')
    if (existingFrame) return

    renderFrame({
      input
    })
  })

  input.addEventListener('click', () => {
    const existingFrame = document.getElementById('frame-set-pass')
    const indexFrame = existingFrame?.getAttribute('index')
    if (indexFrame === i.toString()) return
    existingFrame?.remove()

    renderFrame({
      input
    })
  }
  )
})

window.addEventListener('message', (event) => {
  const {
    emailInputs,
    passwordInputs,
    usernameInputs
  } = getInputs()

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

  if (event.data.type === 'closeFrame') {
    const existingFrame = document.getElementById('frame-set-pass')
    existingFrame?.remove()
  }
})
