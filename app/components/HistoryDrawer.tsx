import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface HistoryDrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  toggleDrawer,
}) => {
  return (
    <>
      {isOpen && (
        <div className="drawer">
          <button onClick={toggleDrawer} className="drawer-close-button">
            <AiOutlineClose size={24} />
          </button>
          {/* Drawer content goes here */}
        </div>
      )}
    </>
  );
};

export default HistoryDrawer;
