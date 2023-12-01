import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import { DialogComponent } from "../DialogComponent";

TableComponent.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  dialogViewComponentProps: PropTypes.object.isRequired,
  dialogEditComponentProps: PropTypes.object.isRequired,
  dialogDeleteComponentProps: PropTypes.object.isRequired,
};

export function TableComponent({
  rows,
  headers,
  dialogViewComponentProps,
  dialogEditComponentProps,
  dialogDeleteComponentProps,
}) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {Object.keys(row).map((key) => (
                  <TableCell key={key}>
                    {row.specialCell && key === "specialCell" ? (
                      <>
                        <VisibilityIcon
                          sx={{
                            color: "gray",
                            fontSize: "3",
                            "&:hover": {
                              backgroundColor: "#fff",
                              color: "#031d42",
                            },
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            dialogViewComponentProps.selectedRow(row);
                            dialogViewComponentProps.openDialog();
                          }}
                        />
                        <EditIcon
                          sx={{
                            color: "gray",
                            fontSize: "3",
                            "&:hover": {
                              backgroundColor: "#fff",
                              color: "#031d42",
                            },
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            dialogEditComponentProps.selectedRow(row);
                            dialogEditComponentProps.openDialog();
                          }}
                        />
                        <DeleteIcon
                          sx={{
                            color: "gray",
                            fontSize: "3",
                            "&:hover": {
                              backgroundColor: "#fff",
                              color: "#031d42",
                            },
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            dialogDeleteComponentProps.selectedRow(row);
                            dialogDeleteComponentProps.openDialog();
                          }}
                        />
                      </>
                    ) : (
                      row[key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DialogComponent
        open={dialogViewComponentProps.open}
        title={dialogViewComponentProps.title}
        handleClose={dialogViewComponentProps.handleClose}
        maxWidth={dialogViewComponentProps.maxWidth}
        fullWidth={dialogViewComponentProps.fullWidth}
      >
        {dialogViewComponentProps.content}
      </DialogComponent>

      <DialogComponent
        open={dialogEditComponentProps.open}
        title={dialogEditComponentProps.title}
        handleClose={dialogEditComponentProps.handleClose}
        maxWidth={dialogEditComponentProps.maxWidth}
        fullWidth={dialogEditComponentProps.fullWidth}
      >
        {dialogEditComponentProps.content}
      </DialogComponent>

      <DialogComponent
        open={dialogDeleteComponentProps.open}
        title={dialogDeleteComponentProps.title}
        handleClose={dialogDeleteComponentProps.handleClose}
        maxWidth={dialogDeleteComponentProps.maxWidth}
        fullWidth={dialogDeleteComponentProps.fullWidth}
      >
        {dialogDeleteComponentProps.content}
      </DialogComponent>
    </>
  );
}
