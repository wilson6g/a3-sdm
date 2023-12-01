import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";

DialogComponent.propTypes = {
  title: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", false]).isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export function DialogComponent({
  title,
  fullWidth,
  maxWidth,
  open,
  handleClose,
  children,
}) {
  return (
    <Dialog
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className="py-2">{children}</DialogContent>
    </Dialog>
  );
}
