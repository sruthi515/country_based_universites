import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./index.styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableContainer,
} from "@material-ui/core";

const columns = [
  { id: "name", label: "University Name" },
  { id: "state-province", label: "State" },
  { id: "country", label: "Country" },
  {
    id: "web_pages",
    label: "Website(s)",
    render: ({ links = [] }) => {
      return links?.map((link, i) => (
        <Link to={{ pathname: link }} target="_blank" rel="noopener noreferrer">
          {link}
          {links.length - 1 !== i && <br />}
        </Link>
      ));
    },
  },
];

const Universities = ({
  universities = [],
  selectedCountry,
  loading,
  ...props
}) => {
  const styles = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(getMessage());
  }, [universities, selectedCountry, loading]);

  const getMessage = () => {
    if (selectedCountry === "") {
      return "Select Country";
    } else if (loading) {
      return "Loading...";
    } else if (universities.length === 0) {
      return "No Data Available";
    } else {
      return "";
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={styles.paper}>
      <TableContainer className={styles.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {message !== "" && (
              <TableRow>
                <TableCell className={styles.message} colSpan={4}>
                  {message}
                </TableCell>
              </TableRow>
            )}
            {universities
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns?.map((column) => {
                      let value = row[column.id];
                      return (
                        <TableCell key={column.id}>
                          {column.render ? (
                            <column.render links={value} />
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20, 50, 100]}
        component="div"
        count={universities.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Universities;
