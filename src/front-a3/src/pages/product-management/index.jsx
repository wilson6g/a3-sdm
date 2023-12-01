import DescriptionIcon from "@mui/icons-material/Description";
import SellIcon from "@mui/icons-material/Sell";
import StoreIcon from "@mui/icons-material/Store";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Breadcrumb } from "../../shared/components/Breadcrumb/breadcrumb";
import { DialogComponent } from "../../shared/components/DialogComponent";
import { TableComponent } from "../../shared/components/TableComponent";
import {
  createClient,
  deleteClient,
  updateClient,
} from "../../shared/services/client-service/client-service";
import { listProduct } from "../../shared/services/product-service/product-service";

export function ProductManagement() {
  const [items] = useState([
    {
      title: "Gerenciar Produto",
      href: "/product-management",
      lastPage: false,
    },
  ]);
  const [selectedRow, setSelectedRow] = useState();
  const [openCreate, setOpenCreate] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const initialValues = {
    nome: "",
    valor: "",
  };
  const [values, setValues] = useState(initialValues);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (selectedRow) {
      setValues({
        ...selectedRow,
      });
    }

    listProduct().then((response) => setRows(response));
  }, [selectedRow]);

  const headers = ["Id", "Nome", "Valor unitário", "Ações"];

  const updatedRows = rows.map((item) => ({
    ...item,
    specialCell: true,
  }));

  async function onSubmitEdit(event) {
    event.preventDefault();

    try {
      await updateClient(values);

      toast.success("Cliente atualizado com sucesso!");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  async function onSubmitCreate(event) {
    event.preventDefault();

    try {
      await createClient(values);

      toast.success("Cliente criado com sucesso!");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  async function onClickDelete(event) {
    event.preventDefault();

    try {
      await deleteClient(values);

      toast.success("Cliente removido com sucesso!");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  return (
    <div
      className="d-flex align-items-start justify-content-start flex-column"
      style={{ padding: "1%" }}
    >
      <div className="d-flex">
        <Breadcrumb items={items} />
      </div>

      <div className="d-flex w-100 align-items-center justify-content-between">
        <div className="d-flex flex-column align-items-start w-100">
          <div className="d-flex align-items-center justify-content-center">
            <StoreIcon
              className="d-flex align-items-center justify-content-center"
              sx={{ fontSize: "65px" }}
            />
            <h1 className="px-2 align-self-center">Gerenciar Produto</h1>
          </div>
          <div className="d-flex justify-content-between w-100 py-2">
            <Button
              onClick={() => setOpenCreate(true)}
              startIcon={<SellIcon />}
              variant="contained"
            >
              Adicionar produto
            </Button>
          </div>
          <div className="py-2 w-100">
            <TableComponent
              headers={headers}
              rows={updatedRows}
              dialogViewComponentProps={{
                open: openView,
                title: "Visualizar Cliente",
                handleClose: () => setOpenView(false),
                maxWidth: "sm",
                fullWidth: true,
                openDialog: () => setOpenView(true),
                selectedRow: (selectedRow) => setSelectedRow(selectedRow),
                content: (
                  <form className="d-flex flex-column w-100 h-100 align-items-center justify-content-center">
                    <TextField
                      label="Nome"
                      variant="outlined"
                      className="flex-grow-1 m-2 ms-0"
                      disabled
                      sx={{ width: "60%" }}
                      value={values.name}
                    />
                    <div className="d-flex justify-content-center align-items-center w-100 py-2">
                      <Button
                        className="mx-3 align-self-center"
                        startIcon={<DescriptionIcon />}
                        // onClick={() => }
                        variant="contained"
                      >
                        Relatório consumo médio por cliente
                      </Button>
                    </div>
                  </form>
                ),
              }}
              dialogEditComponentProps={{
                open: openEdit,
                title: "Atualizar Cliente",
                handleClose: () => setOpenEdit(false),
                maxWidth: "sm",
                fullWidth: true,
                openDialog: () => setOpenEdit(true),
                selectedRow: (selectedRow) => setSelectedRow(selectedRow),
                content: (
                  <form
                    className="d-flex flex-column w-100 h-100 align-items-center justify-content-center"
                    onSubmit={onSubmitEdit}
                  >
                    <TextField
                      label="Nome"
                      variant="outlined"
                      className="flex-grow-1 m-2 ms-0"
                      sx={{ width: "60%" }}
                      value={values.name}
                      onChange={(event) =>
                        setValues({ ...values, name: event.target.value })
                      }
                    />
                    <Button
                      className="w-10 m-2"
                      type="submit"
                      variant="contained"
                    >
                      Adicionar
                    </Button>
                  </form>
                ),
              }}
              dialogDeleteComponentProps={{
                open: openDelete,
                title: "Deletar Cliente",
                handleClose: () => setOpenDelete(false),
                maxWidth: "md",
                fullWidth: true,
                openDialog: () => setOpenDelete(true),
                selectedRow: (selectedRow) => setSelectedRow(selectedRow),
                content: (
                  <div className="d-flex flex-column align-items-center ">
                    <span className="fs-1">
                      Tem certeza que deseja remover esse cliente?
                    </span>

                    <div className="div">
                      <Button
                        className="w-10 m-2"
                        onClick={onClickDelete}
                        variant="contained"
                      >
                        Apagar cliente
                      </Button>
                      <Button
                        className="w-10 m-2"
                        onClick={() => setOpenDelete(false)}
                        variant="contained"
                        color="error"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ),
              }}
            />
          </div>
        </div>
      </div>

      <DialogComponent
        open={openCreate}
        title="Registrar Cliente"
        handleClose={() => setOpenCreate(false)}
        maxWidth="sm"
        fullWidth={true}
      >
        <form
          className="d-flex flex-column w-100 h-100 align-items-center justify-content-center"
          onSubmit={onSubmitCreate}
        >
          <TextField
            label="Nome"
            variant="outlined"
            className="flex-grow-1 m-2 ms-0"
            sx={{ width: "60%" }}
            value={values.nome}
            onChange={(event) =>
              setValues({ ...values, nome: event.target.value })
            }
          />

          <TextField
            label="Valor"
            variant="outlined"
            className="flex-grow-1 m-2 ms-0"
            sx={{ width: "60%" }}
            value={values.valor}
            type="number"
            onChange={(event) =>
              setValues({ ...values, valor: event.target.value })
            }
          />
          <Button className="w-10 m-2" type="submit" variant="contained">
            Adicionar
          </Button>
        </form>
      </DialogComponent>
    </div>
  );
}
