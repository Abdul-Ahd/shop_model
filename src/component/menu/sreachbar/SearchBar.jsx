import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = async (value) => {
    const res = await fetch("http://localhost:3000/item", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data1 = await res.json();
    const results = data1.filter((item) => {
      return (
        value && item && item.name && item.name.toLowerCase().includes(value)
      );
    });
    setResults(results);
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        id="srch"
        placeholder="Type to search..."
        autoComplete="off"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
