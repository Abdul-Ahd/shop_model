import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./sale.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { document } from "postcss";

const Sale = () => {
  const [found, setFound] = useState([]);

  const agGridRef = useRef(null);
  const [gridApi, setGridApi] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  var searchdata;
  const [rowData, setRowData] = useState([
    {
      id: 0,
      name: 0,
      price: 0,
      qty: 0,
      Nprice: 0,
    },
  ]);
  const handleSelectionChanged = () => {
    const selectedData = agGridRef.current.api.getSelectedRows();
    setSelectedRows(selectedData);
  };
  const [refreshKey, setRefreshKey] = useState(0);
  const handleDeleteRow = (e) => {
    const selectedData = gridApi.getSelectedRows(); // Use gridApi directly
    const filteredData = selectedData.filter((row) => row !== null);
    const updatedRowData = rowData.filter((row) => !filteredData.includes(row)); // Filter out selected rows from rowData

    setRowData(updatedRowData); // Update rowData state to reflect removed rows
    setSelectedRows([]); // Clear selected rows

    // Optionally, you can update totalAmount if needed
    setRefreshKey((prevKey) => prevKey + 1);
    updateTotalAmount();
  };

  async function search() {
    try {
      const res = await fetch("http://localhost:3000/item", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      data.forEach((item) => {
        if (item.name === searchdata) {
          setRowData(rowData);
          setRowData([...rowData, item]);
        } else {
          console.log("not found");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/item", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          const data1 = await res.json();
          setFound(data1.map((item) => item.name));
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleKeyDown = (event) => {
    if (event.key === "Insert") {
      searchdata = event.target.value;
      search();
      // if (timeoutId) {
      //   clearTimeout(timeoutId);
      // }
      // setTimeoutId(
      //   setTimeout(() => {
      //     setFilterText(event.target.value);

      //     console.log("Selected value:", event.target.value);
      //     search();
      //   }, 100) // 2-second delay
      // );
    }
  };

  const [gridOptions2, setGridOptions] = useState({
    rowData: [],
    onCellValueChanged: updateTotalAmount,
    rowSelection: "multiple",
    enableCellChangeFlash: true,
    onSelectionChanged: handleSelectionChanged,
  });
  const handleQuantityChange = (value, rowIndex) => {
    const updatedRowData = rowData.map((row, index) => {
      if (index === rowIndex) {
        const newQty = parseFloat(value);
        const newNPrice = newQty * row.price;
        return { ...row, qty: newQty, Nprice: newNPrice };
      }
      return row;
    });
    setRowData(updatedRowData);

    setRefreshKey((prevKey) => prevKey + 1);
    updateTotalAmount();
  };
  const colms = [
    {
      headerName: "ID",
      field: "id",
      cellDataType: "number",

      maxWidth: 120,
      minWidth: 100,
      width: 110,
    },
    {
      headerName: "Product Name",
      field: "name",
      cellDataType: "text",
      wrapText: true,

      maxWidth: 200,
      minWidth: 150,
      width: 170,
    },
    {
      headerName: "Price",
      field: "price",
      cellDataType: "number",

      maxWidth: 120,
      minWidth: 80,
      width: 100,
    },
    {
      headerName: "Quantity",
      field: "qty",
      cellDataType: "number",
      editable: true,
      maxWidth: 150,
      minWidth: 80,
      width: 110,
      // cellEditor: "agNumericCellEditor", // Assuming you're using numeric cell editor
      // onCellValueChanged: (params) =>
      //   handleQuantityChange(params.event, params.rowIndex),
      onCellValueChanged: (params) =>
        handleQuantityChange(params.newValue, params.node.rowIndex),
    },
    {
      headerName: "Net_Price",
      field: "Nprice",
      cellDataType: "number",

      maxWidth: 120,
      minWidth: 80,
      width: 100,
    },
    {
      headerName: "Remove",
      field: "button",
      cellRenderer: (params) => (
        <div>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteRow(params.data)}
          >
            Remove
          </Button>
        </div>
      ),
      sortable: false,
      editable: false,
      filter: false,
      maxWidth: 145,
      minWidth: 145,
      width: 145,
    },
  ];
  const [totalAmount, setTotalAmount] = useState(0);
  function updateTotalAmount() {
    if (agGridRef.current) {
      const rowData = agGridRef.current.api
        .getModel()
        .rowsToDisplay.map((row) => row.data);
      const total = rowData.reduce(
        (acc, curr) => acc + (curr.Nprice ? parseFloat(curr.Nprice) : 0),
        0
      );

      const dis = parseFloat(discount);
      if (!isNaN(dis)) {
        setTotalAmount(total - dis);
      } else {
        setTotalAmount(total);
      }
    }
  }

  const [discount, setdis] = useState();
  function nettotal(event) {
    setdis(event.target.value);
    updateTotalAmount();
  }
  const onGridReady = (params) => {
    setGridApi(params.api);
    updateTotalAmount();
  };
  function handleInputChange(event) {}
  return (
    <>
      <div className="form-container">
        <form className="my-form">
          <label>
            ID:
            <input type="number" name="id1" />
          </label>
          <label>
            Customer:
            <input type="text" name="customer" />
          </label>
          <label>
            Date:
            <input type="date" name="date" />
          </label>

          <br />
        </form>
      </div>

      <div>
        <div
          className="ag-theme-alpine-dark"
          id="sale"
          style={{ height: 350, width: 750 }}
        >
          <Autocomplete
            disablePortal
            id="combo-box"
            options={found}
            sx={{
              width: 700,
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Medicine"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            )}
          />

          <AgGridReact
            key={refreshKey}
            rowData={rowData}
            columnDefs={colms}
            // defaultColDef={colmsdefs}
            gridOptions={gridOptions2}
            onGridReady={onGridReady}
            ref={agGridRef}
          />
        </div>
        <div className="netsale">
          <label>
            Discount
            <input
              type="number"
              id="dis"
              value={discount}
              onKeyDown={nettotal}
            />
          </label>
          <br />
          <label>
            Total Bill
            <output type="number" id="bill" />
            <br />
            <h1> {totalAmount}</h1>
          </label>

          <br />
        </div>
      </div>
    </>
  );
};
export default Sale;
