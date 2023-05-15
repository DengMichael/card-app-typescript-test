import { DialogHTMLAttributes, useState } from 'react';
import DarkModeDialogBox from './DarkModeDialogBox';

type DarkModeButtonProps = {
  inheritedClassNames: string;
};

export default function DarkModeButton({ inheritedClassNames }: DarkModeButtonProps) {
  const [open, setOpen] = useState(false);

  function toggleDialogBox() {
    setOpen(!open)
  }

  return (
    <div>
      <button
        className={inheritedClassNames}
        onClick={toggleDialogBox}>
        Dark Mode
      </button>
      <DarkModeDialogBox
        isActive={open}
        onToggle={toggleDialogBox}
      />
    </div>
  )
}