import React, { useState } from "react";
import "./App.css";
import Country from "./components/country";
import Universities from "./components/universities";

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChangeCountry = (event) => {
    setSelectedCountry(event.target.value);
    setUniversities([]);
    setLoading(true);
    fetch(
      `http://universities.hipolabs.com/search?country=${event.target.value}`
    )
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        setUniversities(response);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
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
