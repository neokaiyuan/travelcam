import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface HistoryDrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
  selectedHistoryElementIndex: number | null;
  setSelectedHistoryElementIndex: React.Dispatch<
    React.SetStateAction<number | null>
  >;
}

const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  toggleDrawer,
  selectedHistoryElementIndex,
  setSelectedHistoryElementIndex,
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
