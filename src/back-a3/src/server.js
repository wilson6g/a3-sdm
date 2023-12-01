const express = require("express");
const init =
  require("./framework-drivers/database/config/init-database").init;
const env = require("./framework-drivers/database/config/env-database-config");
const { clientRoutes } = require("./routes/client-routes/client-routes");
const cors = require("cors");
const { productRoutes } = require("./routes/product-routes/product-routes");
const { stockRoutes } = require("./routes/stock-routes/stock-routes");
const { sellRoutes } = require("./routes/sell-routes/sell-routes");
const { relatoryRoutes } = require("./routes/relatory-routes/relatory-routes");

require("dotenv").config();

(async () => {
  if (env.synchronize === true) {
    await init();
  }
})();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(clientRoutes);
server.use(productRoutes);
server.use(stockRoutes);
server.use(sellRoutes);
server.use(relatoryRoutes);

const PORT = process.env.APP_PORT ?? 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
