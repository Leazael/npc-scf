function section(title) {
  return document.write(`</section><section><h1 class="with-clef"><span class="header">${title}</span></h1>`);
};

function textStandard(txt) {
  return document.write(`<p>${txt}</p>`);
};


function createSavesTable(hp1, hp2, hp3, row1, row2, row3) {
  const tableContent = `
    <table class="table-save">
    <tr>${row1.split(/\s+/).map(cell => `<td>&nbsp${cell.trim()}</td>`).join('')}<td>hp&nbsp</td><td>${hp1}</td></tr>
    <tr>${row2.split(/\s+/).map(cell => `<td>&nbsp${cell.trim()}</td>`).join('')}<td></td><td>${hp2}</td></tr>
    <tr>${row3.split(/\s+/).map(cell => `<td>&nbsp${cell.trim()}</td>`).join('')}<td></td><td>${hp3}</td></tr>
    </table>`;
  return tableContent;
};

