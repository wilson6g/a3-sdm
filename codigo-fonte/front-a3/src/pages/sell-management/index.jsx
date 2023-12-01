import DescriptionIcon from "@mui/icons-material/Description";
import SellIcon from "@mui/icons-material/Sell";
import StoreIcon from "@mui/icons-material/Store";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Breadcrumb } from "../../shared/components/Breadcrumb/breadcrumb";
import { DialogComponent } from "../../shared/components/DialogComponent";
import { TableComponent } from "../../shared/components/TableComponent";
import { listClient } from "../../shared/services/client-service/client-service";
import { bestSellingProduct } from "../../shared/services/relatory-service/relatory-service";
import {
  createSell,
  deleteSell,
  listSell,
  updateSell,
} from "../../shared/services/sell-service/sell-service";
import { listStock } from "../../shared/services/stock-service/stock-service";

export function SellManagement() {
  const [items] = useState([
    {
      title: "Gerenciar Venda",
      href: "/client-management",
      lastPage: false,
    },
  ]);
  const [selectedRow, setSelectedRow] = useState();
  const [openCreate, setOpenCreate] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [clients, setClients] = useState([]);

  const initialValues = {
    quantity: "",
    fk_stock: "",
    fk_client: "",
  };
  const [values, setValues] = useState(initialValues);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (selectedRow) {
      const rowSelected = rows.find((row) => row.id === selectedRow.id);

      setValues({
        ...rowSelected,
      });
    }

    listStock().then((response) => setStocks(response));
    listClient().then((response) => setClients(response));
    listSell().then((response) => setRows(response));
  }, [selectedRow]);

  const updatedSellList = () => {
    listSell().then((response) => setRows(response));
  };

  const headers = [
    "Id",
    "Cliente",
    "Nome do Produto",
    "Valor unitário",
    "Total de produtos",
    "Valor Total",
  ];

  const updatedRows = rows.map((item) => ({
    id: item.id,
    client_name: item.client_name,
    product_name: item.product_name,
    product_value: item.product_value,
    orderProductQuantity: item.orderProductQuantity,
    totalOrder: item.totalOrder,
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

  async function getBestSellingProduct(event) {
    event.preventDefault();

    try {
      const response = await bestSellingProduct(values.id);

      handleDownload(response.fileContent);

      toast.success("Relatório gerado com sucesso!");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  async function onSubmitEdit(event) {
    event.preventDefault();

    try {
      await updateSell(values);
      setOpenEdit(false);
      updatedSellList();
      toast.success("Venda atualizada com sucesso!");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  async function onSubmitCreate(event) {
    event.preventDefault();

    try {
      values.quantity = parseInt(values.quantity);

      await createSell(values);
      setOpenCreate(false);
      updatedSellList();
      toast.success("Venda registrada com sucesso!");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  async function onClickDelete(event) {
    event.preventDefault();

    try {
      await deleteSell(values);
      setOpenDelete(false);
      updatedSellList();
      toast.success("Venda removida com sucesso!");
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
            <h1 className="px-2 align-self-center">Gerenciar Venda</h1>
          </div>
          <div className="d-flex justify-content-between w-100 py-2">
            <Button
              onClick={() => setOpenCreate(true)}
              startIcon={<SellIcon />}
              variant="contained"
            >
              Realizar uma venda
            </Button>
            <Button
              startIcon={<DescriptionIcon />}
              onClick={(event) => getBestSellingProduct(event)}
              variant="contained"
            >
              Relatório produto mais vendido
            </Button>
          </div>
          <div className="py-2 w-100">
            <TableComponent
              headers={headers}
              rows={updatedRows}
              dialogViewComponentProps={{
                open: openView,
                title: "Visualizar Venda",
                handleClose: () => setOpenView(false),
                maxWidth: "sm",
                fullWidth: true,
                openDialog: () => setOpenView(true),
                selectedRow: (selectedRow) => setSelectedRow(selectedRow),
                content: (
                  <form className="d-flex flex-column w-100 h-100 align-items-center justify-content-center">
                    <TextField
                      label="Cliente"
                      variant="outlined"
                      className="flex-grow-1 m-2 ms-0"
                      sx={{ width: "60%" }}
                      value={values.client_name}
                      type="text"
                      disabled
                    />
                    <TextField
                      label="Produto"
                      variant="outlined"
                      className="flex-grow-1 m-2 ms-0"
                      sx={{ width: "60%" }}
                      value={values.product_name}
                      type="text"
                      disabled
                    />
                    <TextField
                      label="Valor unitario"
                      variant="outlined"
                      className="flex-grow-1 m-2 ms-0"
                      sx={{ width: "60%" }}
                      value={values.product_value}
                      type="number"
                      disabled
                    />
                    <TextField
                      label="Total de produtos"
                      variant="outlined"
                      className="flex-grow-1 m-2 ms-0"
                      sx={{ width: "60%" }}
                      value={values.orderProductQuantity}
                      type="number"
                      disabled
                    />
                    <TextField
                      label="Valor total"
                      variant="outlined"
                      className="flex-grow-1 m-2 ms-0"
                      sx={{ width: "60%" }}
                      value={values.totalOrder}
                      type="number"
                      disabled
                    />

                    <div className="div">
                      <Button
                        className="w-10 m-2"
                        onClick={() => setOpenView(false)}
                        variant="contained"
                        color="error"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                ),
              }}
              dialogEditComponentProps={{
                open: openEdit,
                title: "Atualizar Venda",
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
                    <FormControl
                      className="flex-grow-1 m-2 ms-0"
                      sx={{ width: "60%" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Cliente
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className="flex-grow-1"
                        value={values.fk_client}
                        label="Cliente"
                        onChange={(event) =>
                          setValues({
                            ...values,
                            fk_client: event.target.value,
                          })
                        }
                      >
                        {clients.map((client) => (
                          <MenuItem key={client.id} value={client.id}>
                            {client.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl
                      className="flex-grow-1 m-2 ms-0"
                      sx={{ width: "60%" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Produto
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className="flex-grow-1"
                        value={values.fk_stock}
                        label="Produto"
                        onChange={(event) =>
                          setValues({ ...values, fk_stock: event.target.value })
                        }
                      >
                        {stocks.map((stock) => (
                          <MenuItem key={stock.id} value={stock.id}>
                            {stock.product_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <TextField
                      label="Quantidade"
                      variant="outlined"
                      className="flex-grow-1 m-2 ms-0"
                      sx={{ width: "60%" }}
                      value={values.orderProductQuantity}
                      type="number"
                      onChange={(event) =>
                        setValues({
                          ...values,
                          orderProductQuantity: event.target.value,
                        })
                      }
                    />

                    <div className="div">
                      <Button
                        className="w-10 m-2"
                        type="submit"
                        variant="contained"
                      >
                        Salvar
                      </Button>
                      <Button
                        className="w-10 m-2"
                        onClick={() => setOpenEdit(false)}
                        variant="contained"
                        color="error"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                ),
              }}
              dialogDeleteComponentProps={{
                open: openDelete,
                title: "Deletar Venda",
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
        title="Adicionar produto ao estoque"
        handleClose={() => setOpenCreate(false)}
        maxWidth="sm"
        fullWidth={true}
      >
        <form
          className="d-flex flex-column w-100 h-100 align-items-center justify-content-center"
          onSubmit={onSubmitCreate}
        >
          <FormControl className="flex-grow-1 m-2 ms-0" sx={{ width: "60%" }}>
            <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className="flex-grow-1"
              value={values.fk_client}
              label="Produto"
              onChange={(event) =>
                setValues({ ...values, fk_client: event.target.value })
              }
            >
              {clients.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className="flex-grow-1 m-2 ms-0" sx={{ width: "60%" }}>
            <InputLabel id="demo-simple-select-label">Produto</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className="flex-grow-1"
              value={values.fk_stock}
              label="Produto"
              onChange={(event) =>
                setValues({ ...values, fk_stock: event.target.value })
              }
            >
              {stocks.map((stock) => (
                <MenuItem key={stock.id} value={stock.id}>
                  {stock.product_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Quantidade"
            variant="outlined"
            className="flex-grow-1 m-2 ms-0"
            sx={{ width: "60%" }}
            value={values.quantity}
            type="number"
            onChange={(event) =>
              setValues({ ...values, quantity: event.target.value })
            }
          />

          <div className="div">
            <Button className="w-10 m-2" type="submit" variant="contained">
              Adicionar
            </Button>
            <Button
              className="w-10 m-2"
              onClick={() => setOpenCreate(false)}
              variant="contained"
              color="error"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogComponent>
    </div>
  );
}
