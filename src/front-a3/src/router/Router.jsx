import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ClientManagement } from "../pages/client-management";
import { ProductManagement } from "../pages/product-management";
import { SellManagement } from "../pages/sell-management";
import { StockManagement } from "../pages/stock-management";
import { BaseLayout } from "../shared/layouts/BaseLayout/base-layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <BaseLayout>
              <Navigate to="/client-management" />
            </BaseLayout>
          }
        />
        <Route
          index
          path="/client-management"
          element={
            <BaseLayout>
              <ClientManagement />
            </BaseLayout>
          }
        />
        <Route
          path="/product-management"
          element={
            <BaseLayout>
              <ProductManagement />
            </BaseLayout>
          }
        />
        <Route
          path="/stock-management"
          element={
            <BaseLayout>
              <StockManagement />
            </BaseLayout>
          }
        />
        <Route
          path="/sell-management"
          element={
            <BaseLayout>
              <SellManagement />
            </BaseLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
