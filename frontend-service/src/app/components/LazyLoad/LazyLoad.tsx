import React, { useEffect, useRef, useState } from 'react'

/**
 * A lazy load component that only renders its children when it is visible.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {React.JSX.Element} root0.children - The children to be displayed when the component is visible.
 * @returns {React.JSX.Element} The lazy load component.
 */
const LazyLoad = ({ children }: {children: JSX.Element}): React.JSX.Element => {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true)
        // Stop observing after the element is visible
        observer.unobserve(domRef.current as HTMLDivElement)
      }
    }, {
      threshold: 0.1
    })
    if (domRef.current) {
      observer.observe(domRef.current)
    }

    // Clean up observer when the component is removed from the DOM
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={domRef}>
        {isVisible ? children : <div>Loading...</div>}
    </div>
  )
}

export default LazyLoad