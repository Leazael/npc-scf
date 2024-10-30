var sectionStyleDefault = "with-bars"; //from custom.css, otherwise with-bar
var sectionStyleName    = ""; //from custom.css
var sectionStyleLabel = "with-bars"; //from custom.css

var currentColumn = -1;

function prepareTable(input) {
  const splitByAnd = input.split('&&');
  const result = splitByAnd.map(substring => substring.split("||"));
  const maxLength = Math.max(...result.map(subArray => subArray.length));
 
  const paddedResult = result.map(subArray => {
    while (subArray.length < maxLength) {
      subArray.push('');
    }
    return subArray;
  });

  return paddedResult;
}

function textPrimary(txt) {
  return document.write(`<p class="primary-text">${txt}</p>`);
};

function textSecondary(txt) {
  return document.write(`<p class="secondary-text">${txt}</p>`);
};

function textPrimaryIndent(txt) {
  return document.write(`<p class="primary-text indented">${txt}</p>`);
};

function textSecondaryIndent(txt) {
  return document.write(`<p class="secondary-text indented">${txt}</p>`);
};

function newLinePrimary() {
  return textPrimary(`<br>`);
};

function newLineSecondary() {
  return textSecondary(`<br>`);
};

function alternateBold(delimiter, ...strings) {
  let html = '';

  for (let i = 0; i < strings.length; i++) {
    if (i % 2 === 0) {
      html += `<span class="bold">${strings[i]}</span>`; 
    } else {
      html += ` ${strings[i]}`;
      if (i < strings.length - 1) {html += `${delimiter} `};
    }
  }

  return textPrimary(html);
}

// Code related to the display of the different sections.

function sectionGeneric(content) {
  document.write(`</section><section>${content}`);
};

function sectionNewColumn(content) {
  currentColumn += 1
  if (currentColumn == 1) {
    document.write(`</div><div class="column">`);
  } else if (currentColumn == 2) {
    document.write(`</div></div></div><div class="page"><div class="columns"><div class="column">`);
    currentColumn = 0;
  };
  document.write(`</section><section>${content}`);
};

function sectionHead(txt) {
  return `<h1 class="${sectionStyleDefault}">${txt}</h1>`;
};

function sectionHeadName(txt) {
  return `<h1 class="${sectionStyleName}">${txt}</h1>`;
};

function sectionHeadLabel(lbl, txt) {
  return `<h1 class="${sectionStyleLabel}"><span class="fixed-width">${lbl}</span>${txt}</h1>`;
};

function section(content) {
  return sectionGeneric(sectionHead(content));
};

function sectionName(content) {
  return sectionNewColumn(sectionHeadName(content));
};

function sectionLabel(label, content) {
  return sectionGeneric(sectionHeadLabel(label, content));
};

function sectionBreak(content) {
  return sectionNewColumn(sectionHead(content));
};

function sectionBreakLabel(label, content) {
  return sectionNewColumn(sectionHeadLabel(label, content));
};

//

function specialAbility(name, content) {
  return textSecondary(`<span class="bold">${name}</span> ${content}`);
}

// Related to Spells and SLAs

function spellGeneric(content) {
  document.write(`<p class="spell-style">${content}<p>`)
}

function spellDaily(lvl, freq, list) {
  return spellGeneric(`<span class="bold">${lvl}</span> (${freq}) – <span class="italics">${list}</span>`)
}

function spellPrepared(lvl, list) {
  return spellGeneric(`<span class="bold">${lvl}</span> – <span class="italics">${list}</span>`)
}

function spellLikeAbility(freq, list) {
  return spellGeneric(`${freq} – <span class="italics">${list}</span>`)
}

// Code related to the display of the various tables.

function hpSavesTable(hp1, hp2, hp3, tableIn) {
  const tableArray = prepareTable(tableIn);
  var tableContent = `<table class="table-hp-save">
  <tr><td>${tableArray[0].slice(0,2).join('</td><td>')}</td><td>=</td><td>${tableArray[0].slice(2).join('</td><td>&nbsp')}</td><td>hp&nbsp</td><td>${hp1}</td></tr></tr>
  <tr><td>${tableArray[1].slice(0,2).join('</td><td>')}</td><td>=</td><td>${tableArray[1].slice(2).join('</td><td>&nbsp')}</td><td></td><td>${hp2}</td></tr>
  <tr><td>${tableArray[2].slice(0,2).join('</td><td>')}</td><td>=</td><td>${tableArray[2].slice(2).join('</td><td>&nbsp')}</td><td></td><td>${hp3}</td></tr>
  `;

  if (tableArray.length > 3) {
    tableContent = tableContent + `<tr><td>${(tableArray.splice(3).map(x => ([...x.splice(0,2), '=', ...x]).join('</td><td>&nbsp'))).join('</td><td></td><td></td></tr><tr><td>')}</td><td></td><td></td></tr>`
  }

  tableContent = tableContent + `</table>`;
  
  return document.write(`<p>${tableContent}</p>`);
};

function savesTable(tableIn) {
  const tableArray = prepareTable(tableIn);
  var tableContent = `<table class="table-save">
  <tr><td>${tableArray[0].slice(0,2).join('</td><td>')}</td><td>=</td><td>${tableArray[0].slice(2).join('</td><td>&nbsp')}</td></tr>
  <tr><td>${tableArray[1].slice(0,2).join('</td><td>')}</td><td>=</td><td>${tableArray[1].slice(2).join('</td><td>&nbsp')}</td></tr>
  <tr><td>${tableArray[2].slice(0,2).join('</td><td>')}</td><td>=</td><td>${tableArray[2].slice(2).join('</td><td>&nbsp')}</td></tr>
  `;

  if (tableArray.length > 3) {
    tableContent = tableContent + `<tr><td>${(tableArray.splice(3).map(x => ([...x.splice(0,2), '=', ...x]).join('</td><td>&nbsp'))).join('</td></tr><tr><td>')}</td></tr>`
  }

  tableContent = tableContent + `</table>`;
  return document.write(`<p>${tableContent}</p>`);
};

function attackTable(type, txt, tableIn) {
  const tableArray = prepareTable(tableIn);
  const tableContent = `
  <span class="bold">${type}</span> ${txt} </br>
  <table class="table-attack"><tr><td>
  ${(tableArray.map(x => x.join('</td><td>'))).join("</td></tr><tr><td>")}
  </td></tr></table>`;
  return document.write(`<p>${tableContent}</p>`);
};

function abilityScoreTable(tableIn) {
  const tableArray = prepareTable(tableIn);
  const tableContent = `<table class="table-ability">
  <tr><td><span class="bold">Str</span></td><td>(${tableArray[0][1]})</td><td>${tableArray[0][2]}</td><td>=</td><td>${tableArray[0].splice(3).join('</td><td>&nbsp')}</td></tr>
  <tr><td><span class="bold">Dex</span></td><td>(${tableArray[1][1]})</td><td>${tableArray[1][2]}</td><td>=</td><td>${tableArray[1].splice(3).join('</td><td>&nbsp')}</td></tr>
  <tr><td><span class="bold">Con</span></td><td>(${tableArray[2][1]})</td><td>${tableArray[2][2]}</td><td>=</td><td>${tableArray[2].splice(3).join('</td><td>&nbsp')}</td></tr>
  <tr><td><span class="bold">Int</span></td><td>(${tableArray[3][1]})</td><td>${tableArray[3][2]}</td><td>=</td><td>${tableArray[3].splice(3).join('</td><td>&nbsp')}</td></tr>
  <tr><td><span class="bold">Wis</span></td><td>(${tableArray[4][1]})</td><td>${tableArray[4][2]}</td><td>=</td><td>${tableArray[4].splice(3).join('</td><td>&nbsp')}</td></tr>
  <tr><td><span class="bold">Cha</span></td><td>(${tableArray[5][1]})</td><td>${tableArray[5][2]}</td><td>=</td><td>${tableArray[5].splice(3).join('</td><td>&nbsp')}</td></tr>
  </table>`;
  return document.write(`<p>${tableContent}</p>`);
};

function featsTable(tableIn) {
  const tableArray = prepareTable(tableIn);
  const tableContent = `<table class="table-feats"><tr><td>
  ${(tableArray.map(x => x[0] + '</td><td><span class="bold">' + x[1] + '</span> ' + x[2])).join('</td></tr><tr><td>')}
  </td></tr></table>`;
  return document.write(`<p>${tableContent}</p>`);
};

function skillTable(tableIn) {
  const tableArray = prepareTable(tableIn);
  const tableContent = `<table class="table-skill"><tr>
  <td></td><td>Skill</td><td></td><td>=</td><td>rnk</td><td>cs</td><td>abl</td><td>misc</td>
  </tr><tr><td>
  ${(tableArray.map(x => x.splice(0,3).join('<d><td>') + '</td><td>=</td><td>' + x.join('</td><td>') )).join('</td></tr><tr><td>')}
  </td></tr></table>`;
  return document.write(`<p>${tableContent}</p>`);
};

function inventoryTable(label, tableIn) {
  const tableArray = prepareTable(tableIn);
  const tableContent = `
  <table class="table-inventory">
  <tr><td><span class="bold">${label}</span></td><td><span class="italics">cost</span></td><td><span class="italics">weight</span></td></tr><tr><td>
  ${(tableArray.map(x => x.join('</td><td>'))).join('</td></tr><tr><td>')}
  </td></tr></table>`;  
  return document.write(`<p>${tableContent}</p>`);
};