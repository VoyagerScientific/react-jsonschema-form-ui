function initListenerAutoResize() {
  var observer
  if (window.attachEvent) {
    observer = function (element, event, handler) {
      element.attachEvent('on' + event, handler)
    }
  } else {
    observer = function (element, event, handler) {
      element.addEventListener(event, handler, false)
    }
  }

  const initListener = () => {
    const resize = (element) => () => {
      const { height } = element.getBoundingClientRect()
      if (element.scrollHeight + 2 > height) {
        element.style.height = element.scrollHeight + 'px'
      }
    }

    /* 0-timeout to get the already changed text */
    const delayedResize = (element) => () => {
      window.setTimeout(resize(element), 0)
    }

    const elements = document.getElementsByTagName('textarea')
    for (let index = 0; index < elements.length; index++) {
      const element = elements[index]
      observer(element, 'change', resize(element))
      observer(element, 'cut', delayedResize(element))
      observer(element, 'paste', delayedResize(element))
      observer(element, 'drop', delayedResize(element))
      observer(element, 'keyup', resize(element))
      observer(element, 'keydown', resize(element))
      resize(element)()
    }
  }

  initListener()
}

export {
  initListenerAutoResize
}
