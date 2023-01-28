import { type MouseEventHandler } from "react";

interface props {
  text: string;
  enabled: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({text, enabled, onClick}: props) => {
  return <button 
    onClick={
      (e) => {
          if (enabled && onClick) {
            onClick(e)
          }
        }
      }
    className={(enabled ? 'text-white' : 'text-gray-600') + " rounded-md w-full h-11 mt-1"}
    style={{backgroundColor: enabled ? "#11096B":"#EFEFF0"}}
  >
    {text}
  </button>;
}
