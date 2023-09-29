import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Country from "../../components/country";

describe("Country component", () => {
  it("renders the Country component with 'Select Country' label", () => {
    const handleChangeCountry = jest.fn();
    render(
      <Country
        selectedCountry="Sweden"
        handleChangeCountry={handleChangeCountry}
      />
    );

    const selectElement = screen.getByLabelText("Select Country");
    expect(selectElement).toBeInTheDocument();
  });

  it("calls handleChangeCountry when a country is selected", () => {
    const handleChangeCountry = jest.fn();
    render(
      <Country
        selectedCountry=""
        handleChangeCountry={handleChangeCountry}
      />
    );

    const selectElement = screen.getByLabelText("Select Country");
    fireEvent.change(selectElement, { target: { value: "Sweden" } });

    expect(handleChangeCountry).toHaveBeenCalledWith({
      target: { value: "Sweden" },
    });
  });
});
