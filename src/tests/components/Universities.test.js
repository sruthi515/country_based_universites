import React from "react";
import { render, screen } from "@testing-library/react";
import Universities from "../../components/universities";

const mockUniversities = [
  {
    name: "Test University",
    "state-province": "Test State",
    country: "Sweden",
    web_pages: ["http://testuniversity.com"],
  },
];

describe("Universities component", () => {
  it("renders the Universities component with loading message", () => {
    render(<Universities loading={true} />);
    const loadingMessage = screen.getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();
  });

  it("renders the Universities component with 'Select Country' message", () => {
    render(<Universities selectedCountry="" />);
    const selectCountryMessage = screen.getByText("Select Country");
    expect(selectCountryMessage).toBeInTheDocument();
  });

  it("renders the Universities component with 'No Data Available' message", () => {
    render(<Universities selectedCountry="Sweden" universities={[]} />);
    const noDataMessage = screen.getByText("No Data Available");
    expect(noDataMessage).toBeInTheDocument();
  });

  it("renders the Universities component with university data", () => {
    render(
      <Universities
        selectedCountry="Sweden"
        universities={mockUniversities}
        loading={false}
      />
    );

    const universityName = screen.getByText("Test University");
    expect(universityName).toBeInTheDocument();
    expect(screen.getByText("State: Test State")).toBeInTheDocument();
    expect(screen.getByText("Country: Sweden")).toBeInTheDocument();
    expect(screen.getByText("http://testuniversity.com")).toHaveAttribute(
      "href",
      "http://testuniversity.com"
    );
  });
});
