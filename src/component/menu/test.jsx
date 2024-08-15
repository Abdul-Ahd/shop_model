import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { data } from "autoprefixer";

const Test = () => {
  const [found, setFound] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
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

  const handleChange = (value) => {
    console.log(found);
  };
  const handleAutocompleteChange = (event, value) => {
    // Log the selected value when an option is chosen
    console.log("Selected value1:", value);
    setSelectedValue(value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Call your function or display a message here
      console.log("medicen added");
      console.log("Selected value:", event.target.value);
    }
  };
  return (
    <>
      <button onClick={handleChange}>click</button>

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={found}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Medicen"
            onChange={(event, value) => setSelectedValue(value)}
            onKeyDown={handleKeyDown}
          />
        )}
        onChange={handleAutocompleteChange}
      />
    </>
  );
};

export default Test;
