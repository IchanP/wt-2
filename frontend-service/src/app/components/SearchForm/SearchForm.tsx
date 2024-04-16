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
    <div className="flex flex-col justify-between w-full">
        <form action={handleSubmit} className="w-full flex flex-row">
            <input type="text" name="inputField" placeholder={placeHolderText} className="pl-1 rounded-md w-5/6 h-8 text-black focus:outline-none focus:ring focus:border-blue-700"/>
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
  return (
        <button disabled={data.pending} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/6"></button>
  )
}

export default SearchForm
