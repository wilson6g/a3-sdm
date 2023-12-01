import DescriptionIcon from "@mui/icons-material/Description";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
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
  listClient,
  updateClient,
} from "../../shared/services/client-service/client-service";
import {
  getAverageClientConsumption,
  getProductPerClient,
} from "../../shared/services/relatory-service/relatory-service";

export function ClientManagement() {
  const [items] = useState([
    {
      title: "Gerenciar Cliente",
      href: "/client-management",
      lastPage: false,
    },
  ]);

  const [selectedRow, setSelectedRow] = useState();
  const [openCreate, setOpenCreate] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const initialValues = {
    name: "",
  };
  const [values, setValues] = useState(initialValues);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (selectedRow) {
      setValues({
        ...selectedRow,
      });
    }

    listClient().then((response) => setRows(response));
  }, [selectedRow]);

  const updatedUsersList = () => {
    listClient().then((response) => setRows(response));
  };

  const headers = ["Id", "Nome", "Ações"];

  const updatedRows = rows.map((item) => ({
    ...item,
    specialCell: true,
  }));

  const handleDownload = (base64Content) => {
    const byteCharacters = atob(base64Content);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  async function relatoryPerClient(event) {
    event.preventDefault();

    try {
      const response = await getProductPerClient(values.id);

      handleDownload(response.fileContent);

      toast.success("Relatório gerado com sucesso!");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  async function averageClientConsumption(event) {
    event.preventDefault();

    try {
      const response = await getAverageClientConsumption(values.id);

      handleDownload(response.fileContent);

      toast.success("Relatório gerado com sucesso!");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  async function onSubmitEdit(event) {
    event.preventDefault();

    try {
      await updateClient(values);
      setOpenEdit(false);
      updatedUsersList();
      toast.success("Cliente atualizado com sucesso!");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  async function onSubmitCreate(event) {
    event.preventDefault();

    try {
      await createClient(values);
      setOpenCreate(false);
      updatedUsersList();
      toast.success("Cliente criado com sucesso!");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  async function onClickDelete(event) {
    event.preventDefault();

    try {
      await deleteClient(values);
      setOpenDelete(false);
      updatedUsersList();
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
            <h1 className="px-2 align-self-center">Gerenciar Cliente</h1>
          </div>
          <div className="d-flex justify-content-between w-100 py-2">
            <Button
              onClick={() => setOpenCreate(true)}
              startIcon={<PersonAddIcon />}
              variant="contained"
            >
              Adicionar Cliente
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
                        onClick={(event) => averageClientConsumption(event)}
                        variant="contained"
                      >
                        Relatório consumo médio por cliente
                      </Button>
                      <Button
                        className="mx-3 align-self-center"
                        startIcon={<DescriptionIcon />}
                        onClick={(event) => relatoryPerClient(event)}
                        variant="contained"
                      >
                        Relatório produto por cliente
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
                      Salvar
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
              value={values.name}
              onChange={(event) =>
                setValues({ ...values, name: event.target.value })
              }
            />
            <Button className="w-10 m-2" type="submit" variant="contained">
              Adicionar
            </Button>
          </form>
        </DialogComponent>
      </div>
    </div>
  );
}
