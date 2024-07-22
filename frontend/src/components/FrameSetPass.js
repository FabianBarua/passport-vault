import iframeResize from '@iframe-resizer/parent'

export const FrameSetPass = ({
  input,
  websiteUrl
}) => {
  const frame = document.createElement('iframe')
  frame.id = 'frame-set-pass'
  frame.src = chrome.runtime.getURL('/setpass.html')
  console.log('frame.src', frame.src)
  frame.style.position = 'absolute'
  frame.style.top = input.getBoundingClientRect().top + window.scrollY + input.offsetHeight + 5 + 'px'
  frame.style.left = input.getBoundingClientRect().left + window.scrollX + 'px'
  frame.style.width = input.offsetWidth + 'px'
  frame.style.height = '0px'
  frame.style.border = '0px solid black'
  frame.style.borderRadius = '0.5rem'
  frame.style.opacity = '0'
  frame.style.background = 'transparent'
  frame.style.transitionProperty = 'opacity'
  frame.style.transitionDuration = '300ms'

  const index = input.getAttribute('index')
  frame.setAttribute('index', index)

  const deleteFrame = () => {
    frame.style.animation = 'fading 210ms'
    setTimeout(() => {
      frame.remove()
    }, 200)
  }

  document.addEventListener('click', (event) => {
    if (frame.contains(event.target) || input.contains(event.target)) { return }
    deleteFrame()
  })

  frame.onload = () => {
    frame.contentWindow.postMessage({
      type: 'websiteUrl',
      data: websiteUrl
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

  return frame
}
