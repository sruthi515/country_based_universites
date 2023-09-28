import React from "react";
import { Select, MenuItem, Typography, Box } from "@material-ui/core";
import countries from "../../utils/countries";
import { useStyles } from "./index.styles";

export const Country = ({ selectedCountry, handleChangeCountry, ...props }) => {
  const styles = useStyles();

  return (
    <Box className={styles.countryWrapper}>
      <Typography variant="subtitle2"> Country</Typography>
      <Select
        value={selectedCountry}
        onChange={handleChangeCountry}
        className={styles.country}
      >
        <MenuItem value="">Select Country</MenuItem>
        {countries.map(({ name = "" }) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default Country;
