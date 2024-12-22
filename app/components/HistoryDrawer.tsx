import React from "react";

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
          <button onClick={toggleDrawer}>Close</button>
          {/* Drawer content goes here */}
        </div>
      )}
    </>
  );
};

export default HistoryDrawer;
