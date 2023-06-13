import {
  eventBus,
  showSuccessMsg,
  showUserMsg,
} from '../services/event-bus.service.js'
import { useState, useEffect, useRef } from 'react'
import {
  socketService,
  SOCKET_EVENT_REVIEW_ABOUT_YOU,
} from '../services/socket.service.js'

export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBus.on('show-msg', msg => {
      setMsg(msg)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000)
    })

    socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, review => {
      showSuccessMsg(`New review about me ${review.txt}`)
    })

    return () => {
      unsubscribe()
      socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
    }
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  function getIcon() {
    if (!msg) return
    return msg.type === 'success'
      ? 'https://res.cloudinary.com/dokgseqgj/image/upload/v1679760119/success_sdvaid.ico'
      : 'https://res.cloudinary.com/dokgseqgj/image/upload/v1679760126/error_hfyagg.ico'
  }

  if (!msg) return <span></span>
  return (
    <section className={`user-msg ${'success'}`}>
      <img
        src={getIcon()}
        alt=''
      />
      <button onClick={closeMsg}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          id='close'
        >
          <path d='M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z'></path>
        </svg>
      </button>
      {msg.txt}
    </section>
  )
}