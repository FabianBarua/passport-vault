import { Eye, EyeOff } from 'lucide-react'
import React from 'react'

export const ButtonHide = ({ isVisible, setIsVisible }: {isVisible:boolean, setIsVisible:React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
      <button className="focus:outline-none" type="button" onClick={() => setIsVisible(
        (prev) => !prev
      )}>
        {isVisible
          ? (
          <Eye className="text-2xl w-5 text-default-400 pointer-events-none" />
            )
          : (
          <EyeOff className="text-2xl w-5 text-default-400 pointer-events-none" />
            )}
      </button>
  )
}
