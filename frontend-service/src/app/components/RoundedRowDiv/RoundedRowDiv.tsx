/**
 * A rounded div which will list all of its children in a neat row, with one child per row.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {React.ReactNode} root0.children - The children to be displayed in the row.
 * @returns {React.JSX.Element} The rounded row div component.
 */
const RoundedRowDiv = ({ children }: {children: React.ReactNode}): React.JSX.Element => {
  return (
        <div className='w-full pl-3 pr-2 bg-slate-700 mt-3 text-center flex items-center flex-row flex-wrap rounded-md'>
            {children}
        </div>
  )
}

export default RoundedRowDiv
