const database = require("../../config/database");

async function createClientRepository(client) {
  try {
    await database.query("INSERT INTO client (id, name) VALUES (?, ?)", [
      client.id,
      client.name,
    ]);

    const createdUser = await database.query(
      `SELECT * FROM client WHERE id = ?`,
      [client.id]
    );

    return createdUser.length > 0 ? createdUser[0] : [];
  } catch (error) {
    throw error;
  }
}

module.exports = { createClientRepository };
