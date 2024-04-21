'use client'

import { useFormStatus } from 'react-dom'

interface SearchFormProps {
    handleSubmit: (data: FormData) => void;
    placeHolderText: string;
}

/**
 * The search form component allows for the user to input a search query.
 *
 * @param {React.JSX.Element} root0 - Default react props.
 * @param {Function} root0.handleSubmit - The function to handle the form submission.
 * @param {string} root0.placeHolderText - The placeholder text for the input field.
 * @returns {React.JSX.Element} The search form component.
 */
const SearchForm = ({ handleSubmit, placeHolderText }: SearchFormProps): React.JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-between w-full">
        <form action={handleSubmit} className="w-1/2 flex flex-row">
            <input type="text" name="inputField" placeholder={placeHolderText} className="bg-gray-100 pl-5 grow rounded-l-md w-5/6 h-8 text-black focus:outline-none" />
            <SubmitButton />
        </form>
    </div>
  )
}

/**
 * A submit button component that is disabled when the form is pending.
 *
 * @returns {React.JSX.Element} The submit button component.
 */
const SubmitButton = (): React.JSX.Element => {
  const data = useFormStatus()
  const isLoading = data.pending
  return (
        <button disabled={isLoading} className="rounded-r-md bg-gray-100 h-8 text-white font-bold py-2 w-1/6 max-w-8 ">&#x1F50E;</button>
  )
}

// bg-blue-500 h-8 hover:bg-blue-700
export default SearchForm