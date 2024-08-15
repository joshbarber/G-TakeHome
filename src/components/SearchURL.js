import React from "react";

const SearchURL = ({ isDataEmpty, equipmentId, onChange, onSubmit }) => {
  return (
    <>
      {isDataEmpty && (
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter the Garage URL of the equipment you found "
              onChange={onChange}
              value={equipmentId}
            />
          </div>

          <button className="btn" onClick={onSubmit}>
            Send
          </button>
        </div>
      )}
    </>
  );
};

export default SearchURL;
