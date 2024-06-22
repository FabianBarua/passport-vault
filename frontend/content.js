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
    // make an frame 'google.com'
    const frame = document.createElement('div')

    frame.style.position = 'absolute'
    frame.style.top = input.getBoundingClientRect().top + window.scrollY + input.offsetHeight + 'px'
    frame.style.left = input.getBoundingClientRect().left + window.scrollX + 'px'
    frame.style.width = input.offsetWidth + 'px'

    frame.style.maxHeight = '300px'
    frame.style.height = 'auto'
    frame.style.border = '1px solid black'
    frame.style.borderRadius = '5px'

    const credentialItem = `
    
    
    `

    frame.appendChild(credentialItem)

    frame.addEventListener('mouseleave', () => {
      frame.remove()
    })

    input.addEventListener('mouseleave', () => {
      if (!frame.contains(event.relatedTarget)) {
        frame.remove()
      }
    }
    )

    document.body.appendChild(frame)
  })
})
