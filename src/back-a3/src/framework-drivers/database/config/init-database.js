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
  const poolWithoutDB = mysql.createPool({
    connectionLimit: 10,
    host: env.host,
    user: env.user,
    password: env.password,
  });

  try {
    const connection = await poolWithoutDB.getConnection();

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${env.database}\`;`
    );

    connection.release();

    console.log(`Database '${env.database}' created successfully.`);
  } catch (error) {
    console.error("Error creating database:", error);
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

module.exports = { createDatabase, createTables };
