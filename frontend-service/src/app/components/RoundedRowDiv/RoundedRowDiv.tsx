'use client'
import { max } from 'd3'
import { createRef, useEffect, useRef, useState } from 'react'

interface RoundedRowDivProps {
  children: React.ReactNode;
  maxHeight?: string;
  isExpandable?: boolean;
}
/**
 * A rounded row div component that can be expanded to show more content.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {React.ReactNode} root0.children - The children to be displayed in the row.
 * @returns {React.JSX.Element} The rounded row div component.
 */
const RoundedRowDiv = ({ children, maxHeight, isExpandable = false }: RoundedRowDivProps): React.JSX.Element => {
  const ref = useRef<HTMLDivElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const [changeableMaxHeight, setMaxHeight] = useState(maxHeight || '')
  // TODO add button to show less...?

  /**
   * Resizes the div to show all of its children.
   */
  const resizeDiv = () => {
    console.log(isOverflowing)
    if (ref.current && isOverflowing) {
      setMaxHeight('')
      setIsOverflowing(false)
    } else if (ref.current && !isOverflowing) {
      setMaxHeight(maxHeight || '')
      setIsOverflowing(true)
    }
  }

  useEffect(() => {
    /**
     * Check if the div is overflowing and set the state accordingly.
     */
    const checkOverflow = () => {
      const current = ref.current
      if (current) {
        const isOverflow = current.scrollHeight > current.clientHeight
        setIsOverflowing(isOverflow)
      }
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)

    return () => window.removeEventListener('resize', checkOverflow)
  }, [children])

  return (
    <>
      <div
        ref={ref}
        className={`overflow-hidden w-full ${changeableMaxHeight} max-h-2/4 pl-3 pr-2 pt-1 pb-1 bg-slate-700 mt-3 text-center flex items-center flex-row flex-wrap rounded-md`}
      >
        {children}
      </div>
      {isExpandable && (
        <button className="bg-slate-700 text-white rounded-md p-1" onClick={resizeDiv}>
          {isOverflowing ? 'Show More' : 'Show Less'}
        </button>
      )}
    </>
  )
}

export default RoundedRowDiv
