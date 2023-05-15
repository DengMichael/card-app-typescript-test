import { useState } from 'react';

export interface DarkModeDialogBoxProps {
  isActive: boolean
  onToggle: React.MouseEventHandler<HTMLButtonElement>;
};

//open - Indicates that the dialog is active and can be interacted with. When the open attribute is not set, the dialog shouldn't be shown to the user. It is recommended to use the .show() or .showModal() methods to render dialogs, rather than the open attribute. If a <dialog> is opened using the open attribute, it will be non-modal.
//would prevent altering of text/closing when clicking outside

export default function DarkModeDialogBox({ isActive, onToggle }: DarkModeDialogBoxProps) {
  
  function toggleDarkMode() {
    if (!document.body.classList.contains('dark')) {
      document.body.classList.add('dark');
      document.body.classList.add('bg-black');
    }
    else {
      document.body.classList.remove('dark');
      document.body.classList.remove('bg-black');
    }
  }

  return (
    <div>
      <dialog open={isActive} className="fixed p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white
    dark:text-black">
        <p>
          <label>Dark Mode: </label>
          <input
            type="checkbox"
            onChange={() => toggleDarkMode()}>
          </input>
        </p>
        <button onClick={onToggle} >
          Submit
        </button>
      </dialog>
    </div>
  )
}