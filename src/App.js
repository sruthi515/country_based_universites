import React, { useEffect, useState } from "react";
import Universities from "./components/universities";
import Country from "./components/country";
import "./App.css";

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setUniversities([]);
      setLoading(true);
      const response = await fetch(
        `http://universities.hipolabs.com/search?country=${selectedCountry}`
      );
      const newData = await response.json();
      setUniversities(newData);
      setLoading(false);
    };
    fetchData();
  }, [selectedCountry]);

  const handleChangeCountry = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div className="App">
      <Country
        selectedCountry={selectedCountry}
        handleChangeCountry={handleChangeCountry}
      />
      <Universities
        loading={loading}
        universities={universities}
        selectedCountry={selectedCountry}
      />
    </div>
  );
};

export default App;
