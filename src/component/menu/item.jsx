import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const Item = (e) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshKey1, setRefreshKey1] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  // const { enqueueSnackbar } = useSnackbar();
  const handleSelectionChanged = () => {
    const selectedData = agGridRef.current.api.getSelectedRows();
    setSelectedRows(selectedData);
  };
  function myDateComparator(filterLocalDateAtMidnight, cellValue) {
    // Ensure that the cell value is a valid date
    if (!cellValue) {
      return 0;
    }

    // Convert the cell value to a JavaScript Date object
    const cellDate = new Date(cellValue);

    // Compare the date parts (ignoring time)
    if (cellDate.toDateString() === filterLocalDateAtMidnight.toDateString()) {
      return 0; // Dates are equal
    } else if (cellDate < filterLocalDateAtMidnight) {
      return -1; // Cell date is earlier than the filter date
    } else {
      return 1; // Cell date is later than the filter date
    }
  }
  const colmsdefs = {
    sortable: true,
    editable: true,
    filter: true,

    maxWidth: 150,
  };
  const agGridRef = useRef(null);
  const agGridRef1 = useRef(null);
  const handleDeleteRow1 = () => {
    const selectedData = agGridRef1.current.api.getSelectedRows();
    const filteredData = selectedData.filter((row) => row !== null);
    agGridRef1.current.api.applyTransaction({ remove: filteredData });
    enqueueSnackbar("Row Deleted", {
      variant: "error",
      autoHideDuration: 1000,
    });
  };

  const handleDeleteRow = async () => {
    const selectedData = agGridRef.current.api.getSelectedRows();

    // Filter out rows with null values before applying the transaction
    const filteredData = selectedData.filter((row) => row !== null);
    var id1;
    // agGridRef.current.api.applyTransaction({ remove: filteredData });
    for (const row of filteredData) {
      try {
        const res = await fetch("http://localhost:3000/item", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data2 = await res.json();
        data2.forEach((data1) => {
          if (data1.id === row.id || data1.name === row.name) {
            id1 = data1._id;
          }
        });
      } catch (err) {
        console.error(`Error deleting item ${id1}:`, err.message);
      }
      try {
        console.log(id1);

        const response = await fetch(`http://localhost:3000/item/${id1}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
        
          console.log(`Item ${id1} deleted successfully`);
        } else {
          
          const data = await response.json();
          console.error(`Error in deleting item ${id1}: ${data.error}`);
        }
      } catch (error) {
        console.error(`Error deleting item ${id1}:`, error.message);
      }
    }

    // Apply the transaction to remove rows from ag-Grid
    agGridRef.current.api.applyTransaction({ remove: filteredData });
    enqueueSnackbar("Row Data Deleted", {
      variant: "error",
      autoHideDuration: 1000,
    });
  };
  const colums = [
    {
      headerName: "ID",
      field: "id",
      cellDataType: "number",
      editable: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      headerName: "Product Name",
      field: "name",
      cellDataType: "text",
      wrapText: true,
    },
    {
      headerName: "price",
      field: "price",
      cellDataType: "number",
    },
    {
      headerName: "Expirey Date",
      field: "exp",
      cellDataType: "date",
      filter: "agDateColumnFilter",

      filterParams: { comparator: myDateComparator },
      valueFormatter: (params) =>
        params.data.exp ? new Date(params.data.exp).toLocaleDateString() : null,
      valueSetter: (params) => {
        const newDate = new Date(params.newValue);
        params.data.exp = newDate;
        return true;
      },
      suppressMenu: true,
    },

    {
      headerName: "In Stock",
      field: "stock",
      cellDataType: "number",
    },
    {
      headerName: "Buyer Name",
      field: "buyer",
      cellDataType: "text",
    },
    {
      headerName: "Company",
      field: "company",
      cellDataType: "text",
      wrapText: true,
    },
    {
      headerName: "Delete",
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
            Delete
          </Button>
        </div>
      ),
      sortable: false,
      editable: false,
      filter: false,
    },
  ];
  const colums2 = [
    {
      headerName: "ID",
      field: "id",
      cellDataType: "number",
      editable: true,
    },
    {
      headerName: "Product Name",
      field: "name",
      cellDataType: "text",
      wrapText: true,
    },
    {
      headerName: "price",
      field: "price",
      cellDataType: "number",
    },
    {
      headerName: "Expirey Date",
      field: "exp",
      cellDataType: "date",
      filter: "agDateColumnFilter",

      filterParams: { comparator: myDateComparator },
      valueFormatter: (params) =>
        params.data.exp ? new Date(params.data.exp).toLocaleDateString() : null,
      valueSetter: (params) => {
        const newDate = new Date(params.newValue);
        params.data.exp = newDate;
        return true;
      },
      suppressMenu: true,
    },

    {
      headerName: "In Stock",
      field: "stock",
      cellDataType: "number",
    },
    {
      headerName: "Buyer Name",
      field: "buyer",
      cellDataType: "text",
    },
    {
      headerName: "Company",
      field: "company",
      cellDataType: "text",
      wrapText: true,
    },
    {
      headerName: "Delete",
      field: "button",
      cellRenderer: (params) => (
        <div>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteRow1(params.data)}
          >
            Delete
          </Button>
        </div>
      ),
      sortable: false,
      editable: false,
      filter: false,
    },
  ];

  const onGridReady = (params) => {
    setGridApi1(params.api);
  };
  const onGridReady2 = (params) => {
    setGridApi(params.api);
  };
  const [gridApi, setGridApi] = useState(null);
  const [gridApi1, setGridApi1] = useState(null);

  const saveDataToDatabase = async () => {
    try {
      if (gridApi1) {
        const rowData = [];
        gridApi1.forEachNode((node) => {
          rowData.push(node.data);
        });

        const response = await fetch("http://localhost:3000/item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rowData),
        });

        const result = await response.json();
        console.log(result); // Log the response from the backend
        enqueueSnackbar("Save", { variant: "success", autoHideDuration: 1000 });
        setRowData(newData);
        setRefreshKey1((prevKey1) => prevKey1 + 1);
        setRefreshKey((prevKey) => prevKey + 1);
      }
    } catch (error) {
      enqueueSnackbar("Error Saving Data", {
        variant: "error",
        autoHideDuration: 1000,
      });
      console.error("Error saving data:", error);
    }
  };
  const [rowData1, setRowData1] = useState([
    {
      id: 1,
      name: 0,
      price: 0,
      exp: 0,
      stock: 0,
    },
  ]);
  const [newData, setNewData] = useState([
    {
      id: 1,
      name: 0,
      price: 0,
      exp: 0,
      stock: 0,
      company: 0,
      buyer: 0,
    },
  ]);

  useEffect(() => {
    // Fetch data from the server to update the grid
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/item");
        const data = await response.json();
        setRowData1(data);
      } catch (error) {
        enqueueSnackbar("Error Fecthing Data", {
          variant: "error",
          autoHideDuration: 1000,
        });
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Initial fetch
  }, [refreshKey]);
  const addNewRow = () => {
    const newRow = {
      id: 2,
      name: "exp",
      price: 0,
      exp: 0,
      stock: 0,
      company: "exp",
      buyer: "exp",
    };
    setRowData([...rowData, newRow]);
  };
  const gridOptions = {
    enableCellChangeFlash: true,
    rowSelection: "multiple",
    getRowHeight: (params) => (params.node.group ? 80 : 40),
  };

  const gridOptions2 = {
    rowSelection: "multiple",
    enableCellChangeFlash: true,
    onSelectionChanged: handleSelectionChanged,
    getRowHeight: (params) => (params.node.group ? 80 : 40),
  };

  const [rowData, setRowData] = useState([
    { id: 1, name: 0, price: 0, exp: 0, stock: 0, company: 0, buyer: 0 },
  ]);
  const updated = async () => {
    try {
      if (selectedRows.length === 0) {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar("No rows selected for update", {
          variant: "warning",
          autoHideDuration: 1000,
        });
        console.warn("No rows selected for update");
        return;
      }

      // Assuming each row has an 'id' property representing the unique identifier

      selectedRows.forEach(async (rowdata) => {
        const idsToUpdate = rowdata._id;
        // Send a PATCH request to update the selected rows
        const response = await fetch(
          `http://localhost:3000/item/update-multiple`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ids: idsToUpdate,
              updateData: rowdata,
            }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              enqueueSnackbar("HTTP error! Status", {
                variant: "error",
                autoHideDuration: 1000,
              });
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            setRefreshKey((prevKey) => prevKey + 1);
            setRefreshKey1((prevKey) => prevKey + 1);
            enqueueSnackbar("Database update successful", {
              variant: "success",
              autoHideDuration: 2000,
            });
            console.log("Database update successful", data);
          })
          .catch((error) => {
            enqueueSnackbar("Database update failed", {
              variant: "error",
              autoHideDuration: 2000,
            });
            console.error("Database update failed", error);
          });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const KeyDown = (e) => {
    if (e.key === "F8") {
      addNewRow();

      enqueueSnackbar("New Row Added", {
        variant: "info",
        autoHideDuration: 2000,
      });
      e.preventDefault(); // Prevent default behavior of F8 key
    }
  };

  return (
    <>
      <div style={{ marginBottom: "10px", padding: 50 }}>
        <div
          className="ag-theme-alpine-dark"
          style={{ height: 350, width: 1210 }}
          onKeyDown={KeyDown}
        >
          <AgGridReact
            key={refreshKey1}
            ref={agGridRef1}
            rowData={rowData}
            columnDefs={colums2}
            defaultColDef={colmsdefs}
            gridOptions={gridOptions}
            onGridReady={onGridReady}
          />
        </div>
        <Button
          variant="contained"
          color="success"
          size="meduim"
          style={{ margin: 5 }}
          onClick={saveDataToDatabase}
        >
          Insert
        </Button>
        <div
          className="ag-theme-alpine-dark"
          style={{ height: 350, width: 1210 }}
        >
          <AgGridReact
            key={refreshKey}
            rowData={rowData1}
            columnDefs={colums}
            defaultColDef={colmsdefs}
            gridOptions={gridOptions2}
            onGridReady={onGridReady2}
            ref={agGridRef}
          />
        </div>
        <Button
          variant="contained"
          color="success"
          size="meduim"
          style={{ margin: 5 }}
          onClick={updated}
        >
          update
        </Button>{" "}
        <SnackbarProvider />
      </div>
    </>
  );
};

export default Item;
