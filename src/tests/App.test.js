import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

// Mock the fetch function
global.fetch = jest.fn();

describe("App component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("renders the App component", () => {
    render(<App />);
    const countryInput = screen.getByLabelText("Select Country");
    expect(countryInput).toBeInTheDocument();
  });

  it("fetches universities and displays them when a country is selected", async () => {
    const mockResponse = [
      {
        name: "Test University",
        country: "Test Country",
        web_pages: ["http://testuniversity.com"],
      },
    ];

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    });

    const { getByLabelText, getByText } = render(<App />);
    const countryInput = getByLabelText("Select Country");

    fireEvent.change(countryInput, { target: { value: "Sweden" } });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://universities.hipolabs.com/search?country=Sweden"
      );
    });

    expect(getByText("Test University")).toBeInTheDocument();
    expect(getByText("Country: Test Country")).toBeInTheDocument();
    expect(screen.getByText("Link")).toHaveAttribute(
      "href",
      "http://testuniversity.com"
    );
  });
});
