const database = require("./database");
const env = require("../config/env-database-config");
const mysql = require("mysql2/promise");

async function executeSQL(sql) {
  try {
    const rows = await database.query(sql);

    console.log("Script SQL executado com sucesso.");

    return rows;
  } catch (error) {
    console.error("Erro ao executar script SQL:", error);
    throw error;
  }
}

async function createDatabase() {
  const maxRetries = 5; 
  let connection = null;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      const poolWithoutDB = mysql.createPool({
      
        connectionLimit: 10,
        host: env.host,
        user: env.user,
        password: env.password,
        port: env.port,
      });

      connection = await poolWithoutDB.getConnection();

      await connection.query(
        `CREATE DATABASE IF NOT EXISTS \`${env.database}\`;`
      );

      connection.release();

      console.log(`Database '${env.database}' created successfully.`);
      break;
    } catch (error) {
      console.error("Error creating database:", error);
      if (i === maxRetries) {
        console.error("Maximum retries reached. Database creation failed.");
      } else {
        // Close the connection and retry after a delay
        if (connection) connection.release();
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
        console.log(
          `Retrying database creation. Attempt ${i + 1} of ${maxRetries + 1}`
        );
      }
    }
  }

  return true;
}

async function createProducts() {
  const uuids = [
    "0e76353d-6790-46fc-8023-60e873c3f70f",
    "91619b26-946f-4c91-8c34-dc5775706247",
    "d8495879-f891-4201-a536-46a3dd71042b",
    "dc23e754-1f4d-4236-b7e5-2e6fc49ee8c1",
    "c8568fac-ae26-44a8-a68a-2017f364feb8",
    "06767304-9894-4c4c-93c4-87bd211717b2",
    "00665351-f520-4cd8-879f-eed8e47dc704",
    "f57cb3ee-cefe-402a-87fc-d1775be8c499",
    "70a50c01-b360-46be-9d2f-e3f864b541f9",
    "b81f7daf-fca1-4072-910e-61180a0dc1c2",
  ];

  const productScripts = [
    `INSERT INTO ${env.database}.product (id, name, value) VALUES ('${uuids[0]}', 'Kitkat', 10)`,
    `INSERT INTO ${env.database}.product (id, name, value) VALUES ('${uuids[1]}', 'Minuano', 10)`,
    `INSERT INTO ${env.database}.product (id, name, value) VALUES ('${uuids[2]}', 'Tablet', 10)`,
    `INSERT INTO ${env.database}.product (id, name, value) VALUES ('${uuids[3]}', 'Whey Protein', 10)`,
    `INSERT INTO ${env.database}.product (id, name, value) VALUES ('${uuids[4]}', 'Creatina', 10)`,
    `INSERT INTO ${env.database}.product (id, name, value) VALUES ('${uuids[5]}', 'Horus', 10)`,
    `INSERT INTO ${env.database}.product (id, name, value) VALUES ('${uuids[6]}', 'Monster', 10)`,
    `INSERT INTO ${env.database}.product (id, name, value) VALUES ('${uuids[7]}', 'Redbull', 10)`,
    `INSERT INTO ${env.database}.product (id, name, value) VALUES ('${uuids[8]}', 'Frango 1kg', 10)`,
    `INSERT INTO ${env.database}.product (id, name, value) VALUES ('${uuids[9]}', 'Carne 1kg', 10)`,
  ];

  try {
    for (const script of productScripts) {
      await executeSQL(script);
    }
    console.log("Todos os produtos foram criadas com sucesso.");
  } catch (error) {
    console.error("Erro ao criar os produtos:", error);
  }
}

async function createClients() {
  const uuids = [
    "4ae8bd6b-ff64-462d-88e3-a45d746e73b7",
    "0b2107e0-789f-44fe-b576-e5af397d9818",
    "e93aa35e-2726-4600-b744-eac73d1f03f9",
    "01f9f1da-383a-4704-a109-b178ba72b367",
    "f4c8c743-cb8f-48eb-a5ed-93467ca3e45f",
  ];

  const clientScripts = [
    `INSERT INTO ${env.database}.client (id, name) VALUES ('${uuids[0]}', 'Amazon')`,
    `INSERT INTO ${env.database}.client (id, name) VALUES ('${uuids[1]}', 'Magazine Luiza')`,
    `INSERT INTO ${env.database}.client (id, name) VALUES ('${uuids[2]}', 'Kabum')`,
    `INSERT INTO ${env.database}.client (id, name) VALUES ('${uuids[3]}', 'Smartfit')`,
    `INSERT INTO ${env.database}.client (id, name) VALUES ('${uuids[4]}', 'Heyfit')`,
  ];

  try {
    for (const script of clientScripts) {
      await executeSQL(script);
    }
    console.log("Todos os clientes foram criadas com sucesso.");
  } catch (error) {
    console.error("Erro ao criar os clientes:", error);
  }
}

async function init() {
  try {
    const createdDatabase = await createDatabase();

    if(createdDatabase) {
      await createTables();
      await createProducts();
      await createClients();
    }
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error);
  }
}

async function createTables() {
  const sqlScripts = [
    `CREATE TABLE ${env.database}.client (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(36) NOT NULL
    )`,
    `CREATE TABLE ${env.database}.product (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(32) UNIQUE NOT NULL,
      value DECIMAL(10,2) NOT NULL
    )`,
    `CREATE TABLE ${env.database}.stock (
      id VARCHAR(36) PRIMARY KEY,
      quantity int NOT NULL,
      fk_product varchar(120) NOT NULL,
      FOREIGN KEY (fk_product) REFERENCES product(id)
    )`,
    `CREATE TABLE ${env.database}.sell (
      id VARCHAR(36) PRIMARY KEY,
      quantity int NOT NULL,
      value DECIMAL(10,2) NOT NULL,
      fk_client VARCHAR(36) NOT NULL,
      fk_stock varchar(120) NOT NULL,
      FOREIGN KEY (fk_client) REFERENCES client(id),
      FOREIGN KEY (fk_stock) REFERENCES stock(id)
    )`,
  ];

  try {
    for (const script of sqlScripts) {
      await executeSQL(script);
    }
    console.log("Todas as tabelas foram criadas com sucesso.");
  } catch (error) {
    console.error("Erro ao criar tabelas:", error);
  }
}

module.exports = { createDatabase, createTables, init };
