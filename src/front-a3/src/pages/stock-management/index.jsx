import DescriptionIcon from "@mui/icons-material/Description";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import InventoryIcon from "@mui/icons-material/Inventory";
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
import { listProduct } from "../../shared/services/product-service/product-service";
import { productLowerStock } from "../../shared/services/relatory-service/relatory-service";
import {
  createStock,
  deleteStock,
  listStock,
  updateStock,
} from "../../shared/services/stock-service/stock-service";

export function StockManagement() {
  const [items] = useState([
    {
      title: "Gerenciar Estoque",
      href: "/client-management",
      lastPage: false,
    },
  ]);
  const [selectedRow, setSelectedRow] = useState();
  const [openCreate, setOpenCreate] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [products, setProducts] = useState([]);
  const initialValues = {
    quantity: "",
    fk_product: "",
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

    listProduct().then((response) => setProducts(response));
    listStock().then((response) => setRows(response));
  }, [selectedRow]);

  const updatedStockList = () => {
    listStock().then((response) => setRows(response));
  };

  const headers = [
    "Id",
    "Nome do Produto",
    "Valor unitário",
    "Quantidade em Estoque",
    "Ações",
  ];

  const updatedRows = rows.map((item) => ({
    id: item.id,
    product_name: item.product_name,
    product_value: item.product_value,
    quantity: item.quantity,
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

  async function getProductLowerStock(event) {
    event.preventDefault();

    try {
      const response = await productLowerStock(values.id);

      handleDownload(response.fileContent);

      toast.success("Relatório gerado com sucesso!");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  async function onSubmitEdit(event) {
    event.preventDefault();

    try {
      await updateStock(values);
      setOpenEdit(false);
      updatedStockList();
      toast.success("Estoque atualizado com sucesso!");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  async function onSubmitCreate(event) {
    event.preventDefault();

    try {
      values.quantity = parseInt(values.quantity);

      await createStock(values);
      setOpenCreate(false);
      updatedStockList();
      toast.success("Produto adicionado ao estoque com sucesso!");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  async function onClickDelete(event) {
    event.preventDefault();

    try {
      await deleteStock(values);
      setOpenDelete(false);
      updatedStockList();
      toast.success("Produto removido do estoque com sucesso!");
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
            <InventoryIcon
              className="d-flex align-items-center justify-content-center"
              sx={{ fontSize: "65px" }}
            />
            <h1 className="px-2 align-self-center">Gerenciar Estoque</h1>
          </div>

          <div className="d-flex justify-content-between w-100 py-2">
            <Button
              onClick={() => setOpenCreate(true)}
              startIcon={<DomainAddIcon />}
              variant="contained"
            >
              Adicionar Produto ao Estoque
            </Button>
            <Button
              startIcon={<DescriptionIcon />}
              onClick={(event) => getProductLowerStock(event)}
              variant="contained"
            >
              Relatório produto baixo estoque
            </Button>
          </div>

          <div className="py-2 w-100">
            <TableComponent
              headers={headers}
              rows={updatedRows}
              dialogViewComponentProps={{
                open: openView,
                title: "Visualizar Estoque",
                handleClose: () => setOpenView(false),
                maxWidth: "sm",
                fullWidth: true,
                openDialog: () => setOpenView(true),
                selectedRow: (selectedRow) => setSelectedRow(selectedRow),
                content: (
                  <form className="d-flex flex-column w-100 h-100 align-items-center justify-content-center">
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
                        value={values.fk_product}
                        label="Produto"
                        disabled
                      >
                        {products.map((product) => (
                          <MenuItem key={product.id} value={product.id}>
                            {product.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <TextField
                      label="Valor unitário"
                      variant="outlined"
                      className="flex-grow-1 m-2 ms-0"
                      sx={{ width: "60%" }}
                      value={values.product_value}
                      type="number"
                      disabled
                    />

                    <TextField
                      label="Quantidade em estoque"
                      variant="outlined"
                      className="flex-grow-1 m-2 ms-0"
                      sx={{ width: "60%" }}
                      value={values.quantity}
                      type="number"
                      disabled
                    />

                    <div className="d-flex justify-content-center align-items-center w-100 py-2">
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
                title: "Atualizar Estoque",
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
                        Produto
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className="flex-grow-1"
                        value={values.fk_product}
                        label="Produto"
                        onChange={(event) =>
                          setValues({
                            ...values,
                            fk_product: event.target.value,
                          })
                        }
                      >
                        {products.map((product) => (
                          <MenuItem key={product.id} value={product.id}>
                            {product.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <TextField
                      label="Quantidade em estoque"
                      variant="outlined"
                      className="flex-grow-1 m-2 ms-0"
                      sx={{ width: "60%" }}
                      value={values.quantity}
                      type="number"
                      onChange={(event) =>
                        setValues({ ...values, quantity: event.target.value })
                      }
                    />

                    <div>
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
                title: "Remover do Estoque",
                handleClose: () => setOpenDelete(false),
                maxWidth: "md",
                fullWidth: true,
                openDialog: () => setOpenDelete(true),
                selectedRow: (selectedRow) => setSelectedRow(selectedRow),
                content: (
                  <div className="d-flex flex-column align-items-center ">
                    <span className="fs-1">
                      Tem certeza que deseja remover esse produto do estoque?
                    </span>

                    <div className="div">
                      <Button
                        className="w-10 m-2"
                        onClick={onClickDelete}
                        variant="contained"
                      >
                        Remover do estoque
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
            <InputLabel id="demo-simple-select-label">Produto</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className="flex-grow-1"
              value={values.fk_product}
              label="Produto"
              onChange={(event) =>
                setValues({ ...values, fk_product: event.target.value })
              }
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Quantidade em estoque"
            variant="outlined"
            className="flex-grow-1 m-2 ms-0"
            sx={{ width: "60%" }}
            value={values.quantity}
            type="number"
            onChange={(event) =>
              setValues({ ...values, quantity: event.target.value })
            }
          />

          <div>
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
