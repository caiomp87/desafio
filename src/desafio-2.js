'use strict';

const axios = require('axios');
const excel = require('excel4node');

const url = 'https://ghibliapi.herokuapp.com/films';

(async () => {
  const result = await axios.get(url);
  makeSpreadsheet(result.data);
})();

function makeSpreadsheet(films) {
  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet('Films');

  const headerStyle = workbook.createStyle({
    font: {
      color: '#000000',
      size: 12,
      bold: true
    }
  });

  const bodyStyle = workbook.createStyle({
    font: {
      color: '#8B4513',
      size: 12,
      bold: true
    }
  });

  worksheet.column(1).setWidth(28);
  worksheet.column(2).setWidth(20);
  worksheet.column(3).setWidth(20);
  worksheet.column(4).setWidth(17);

  worksheet.cell(1,1).string('Título').style(headerStyle);
  worksheet.cell(1,2).string('Diretor').style(headerStyle);
  worksheet.cell(1,3).string('Data de Lançamento').style(headerStyle);
  worksheet.cell(1,4).string('Produtor').style(headerStyle);
  let i = 2;

  for (const film of films) {
    worksheet.cell(i, 1).string(film.title).style(bodyStyle);
    worksheet.cell(i, 2).string(film.director).style(bodyStyle);
    worksheet.cell(i, 3).string(film.release_date).style(bodyStyle);
    worksheet.cell(i, 4).string(film.producer).style(bodyStyle);
    i++;
  }

  workbook.write('documents/Films.xlsx');
}
