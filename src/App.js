import "./App.css";
import { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PDFInvoice from "./components/PDFInvoice";
import SearchURL from "./components/SearchURL";
import BillToInput from "./components/BillToInput";
import Error from "./components/Error";

function App() {
  const [equipmentId, setEquipmentId] = useState("");
  const [data, setData] = useState({});
  const [billTo, setBillTo] = useState("");
  const [generateInvoice, setGenerateInvoice] = useState(false);
  const [newInvoice, setNewInvoice] = useState(true);
  const [error, setError] = useState(false);

  const onChange = (e) => {
    setEquipmentId(e.target.value);
  };

  const billToSubmit = () => {
    setGenerateInvoice(true);

    setData((prevData) => ({
      ...prevData,
      result: {
        ...prevData.result,
        listing: {
          ...prevData.result.listing,
          billTo, // Add your billTo value here
        },
      },
    }));
    setBillTo("");
    setNewInvoice(!newInvoice);
  };

  const onChangeBillTo = (e) => {
    setBillTo(e.target.value);
  };

  const onSubmit = async () => {
    const eId = equipmentId.slice(-36);
    try {
      const response = await fetch(
        "https://garage-backend.onrender.com/getListing",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: eId }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();

      if (!jsonData?.result?.listing) {
        setError(true);
      }
      setData(jsonData);
      setEquipmentId("");
      setGenerateInvoice(false);
    } catch (error) {
      console.log(error);
    }
  };

  const isDataEmpty = Object.keys(data).length === 0;

  return (
    <div className="App">
      <h2 className="title">Welcome to Garage 🚒</h2>
      <SearchURL
        isDataEmpty={isDataEmpty}
        equipmentId={equipmentId}
        onChange={onChange}
        onSubmit={onSubmit}
      />
      <BillToInput
        isDataEmpty={isDataEmpty}
        generateInvoice={generateInvoice}
        error={error}
        onChangeBillTo={onChangeBillTo}
        billTo={billTo}
        billToSubmit={billToSubmit}
      />

      {generateInvoice && !error && (
        <h2 className="complete">Invoice completed 🎊</h2>
      )}

      {error && <Error />}

      {!isDataEmpty && generateInvoice && !error && (
        <div>
          <PDFViewer width="1000" height="650" className="app">
            <PDFInvoice data={data} billTo={billTo} />
          </PDFViewer>
        </div>
      )}
    </div>
  );
}

export default App;
