import React from "react";

const BillToInput = ({
  isDataEmpty,
  generateInvoice,
  error,
  onChangeBillTo,
  billTo,
  billToSubmit,
}) => {
  return (
    <>
      {!isDataEmpty && !generateInvoice && !error && (
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Who should we bill the invoice to? "
              onChange={onChangeBillTo}
              value={billTo}
            />
          </div>

          <button className="btn" onClick={billToSubmit}>
            Send
          </button>
        </div>
      )}
    </>
  );
};

export default BillToInput;
