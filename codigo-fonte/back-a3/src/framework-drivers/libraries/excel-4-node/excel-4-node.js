const xl = require("excel4node");
const fs = require("fs");

async function generateXlsx(data, headingColumnNames, name) {
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet("Worksheet Name");

  let headingColumnIndex = 1;
  headingColumnNames.forEach((heading) => {
    ws.cell(1, headingColumnIndex++).string(heading);
  });

  let rowIndex = 2;
  data.forEach((record) => {
    let columnIndex = 1;
    Object.keys(record).forEach((columnName) => {
      ws.cell(rowIndex, columnIndex++).string(record[columnName].toString());
    });
    rowIndex++;
  });

  return new Promise((resolve, reject) => {
    const filePath = `${name}.xlsx`;

    wb.write(filePath, (error, stats) => {
      if (error) {
        reject(error);
      } else {
        const fileContent = fs.readFileSync(filePath, { encoding: "base64" });
        resolve({ fileContent });
      }
    });
  });
}

module.exports = { generateXlsx };
