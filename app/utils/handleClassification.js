const { keywordRegex } = require('./helperConstants');

/**
 * Assigns classification information to the data object based on the keyword and value.
 *
 * @param {object} data - The data object to assign classification information to.
 * @param {string} keyword - The keyword to determine the type of classification information.
 * @param {string} value - The value of the classification information.
 */
function assignClassificationInfo(data, keyword, value) {
  if (keyword === 'Scientific classification') {
    return;
  }
  const actions = {
    order: () =>
      data.classificationInfo.orderInfo.push({
        orderType: keyword,
        value,
      }),
    domain: () => {
      data.classificationInfo.domain = value;
    },
    kingdom: () => {
      data.classificationInfo.kingdom = value;
    },
    phylum: () => {
      data.classificationInfo.phylum = value;
    },
    class: () =>
      data.classificationInfo.classInfo.push({
        classType: keyword,
        value,
      }),
    superfamily: () =>
      data.classificationInfo.familyInfo.push({
        familyType: keyword,
        value,
      }),
    family: () =>
      data.classificationInfo.familyInfo.push({
        familyType: keyword,
        value,
      }),
    subfamily: () =>
      data.classificationInfo.familyInfo.push({
        familyType: keyword,
        value,
      }),
    tribe: () =>
      data.classificationInfo.tribeInfo.push({
        tribeType: keyword,
        value,
      }),
    genus: () =>
      data.classificationInfo.genusInfo.push({
        genusType: keyword,
        value,
      }),
    clade: () => data.classificationInfo.clade.push(value),
    typespecies: () => {
      if (
        value &&
        !value.toLowerCase().includes('see text') &&
        value.trim() !== ''
      ) {
        const cleanValue = value
          .replace(/^\?/, '')
          .replace(/\[\d+\]/g, '')
          .trim();

        if (cleanValue) {
          data.classificationInfo.speciesInfo.push({
            speciesType: keyword,
            value: cleanValue,
          });
        }
      }
    },
    otherspecies: () => {
      if (
        value &&
        !value.toLowerCase().includes('see text') &&
        value.trim() !== ''
      ) {
        const cleanValue = value
          .replace(/^\?/, '')
          .replace(/\[\d+\]/g, '')
          .trim();

        if (cleanValue) {
          data.classificationInfo.speciesInfo.push({
            speciesType: keyword,
            value: cleanValue,
          });
        }
      }
    },
    species: () => {
      if (
        value &&
        !value.toLowerCase().includes('see text') &&
        value.trim() !== ''
      ) {
        const cleanValue = value
          .replace(/^\?/, '')
          .replace(/\[\d+\]/g, '')
          .trim();

        if (cleanValue) {
          data.classificationInfo.speciesInfo.push({
            speciesType: keyword,
            value: cleanValue,
          });
        }
      }
    },
    binomial: () =>
      data.classificationInfo.speciesInfo.push({
        speciesType: keyword,
        value,
      }),
  };
  const match = keyword.match(keywordRegex);
  let text = keyword.toLowerCase();
  if (match) {
    text = match[0].toLowerCase();
  }
  const action = actions[text];
  if (action) {
    action();
  } else {
    data.classificationInfo[text] = value;
  }
}

/**
 * Retrieves the information box from the HTML.
 *
 * @param {string} html - The HTML string.
 * @returns {object} The information box element.
 */
function getInfoBox(html) {
  const infoBoxTable = html.querySelector('.infobox');
  if (infoBoxTable !== undefined) {
    return infoBoxTable;
  }
}

/**
 * Retrieves all row elements from the information box.
 *
 * @param {object} infoBox - The information box element.
 * @returns {Array} An array of row elements.
 */
function getRows(infoBox) {
  const rows = infoBox.querySelectorAll('tr');
  if (rows) {
    return rows;
  }
}

/**
 * Returns the temporal range value for a given Dinosaur.
 *
 * @param {Array} temporalRange - A string containing the era of the dinosaur from the first row of the info box.
 * @returns {string} The temporal range value.
 */
function handleTemporalRange(temporalRange) {
  // Pattern to match the geological period string
const geoPeriodPattern = /\s*PreꞒ[\s\S]*?↓?\s*(?=\n|$)/g;
  return temporalRange
    // Remove "Temporal range:" prefix
    .replace(/^Temporal range:\s*/, '')
    // Remove geological period navigation strings (handles multi-line cases)
    .replace(geoPeriodPattern, '')
    // Remove bracketed references
    .replace(/\s*\[\d+\]*/g, '')
    // Remove question marks
    .replace(/\?+/g, '')
    // Remove quotes
    .replace(/['"]/g, '')
    // Fix malformed quotes around periods
    .replace(/['"]([^'"]+)['"]/g, '$1')
    // Normalize en-dashes and em-dashes to hyphens
    .replace(/[–—]/g, '-')
    // Fix spaces around hyphens in ranges
    .replace(/\s*-\s*/g, '-')
    // Fix missing spaces after commas
    .replace(/,([^\s])/g, ', $1')
    // Fix extra spaces before commas
    .replace(/\s+,/g, ',')
    // Fix multiple consecutive commas
    .replace(/,+/g, ',')
    // Fix spaces after commas in numerical contexts
    .replace(/(\d+),\s*(\d+)/g, '$1-$2')
    // Fix missing space after comma in letter combinations
    .replace(/([a-zA-Z]),([a-zA-Z])/g, '$1, $2')
    // Fix malformed hyphens between letters
    .replace(/([a-zA-Z])\s*-\s*([a-zA-Z])/g, '$1-$2')
    // Fix decimal numbers with commas
    .replace(/(\d+\.\d+),\s*(\d+)/g, '$1-$2')
    // Fix specific patterns like "122.0-, 118.9"
    .replace(/(\d+\.\d+)-,\s*(\d+)/g, '$1-$2')
    // Fix patterns without spaces around comma in numbers
    .replace(/(\d+),(\d+)/g, '$1-$2')
    // Fix missing space between period names and numbers
    .replace(/([a-zA-Z-]+)(\d+\.\d+)/g, '$1 $2')
    // Fix missing space between period names and whole numbers
    .replace(/([a-zA-Z-]+)(\d+)/g, '$1 $2')
    // Add comma after period names before numbers (simpler pattern)
    .replace(/([A-Z][a-zA-Z-]+)\s+(\d+(?:\.\d+)?(?:\s*-\s*\d+(?:\.\d+)?)?\s*Ma)/g, '$1, $2')
    // Clean up extra spaces (run this earlier to help other patterns)
    .replace(/\s+/g, ' ')
    // Fix spacing in decimal numbers (remove any spaces between integer and decimal parts)
    .replace(/(\d+)\s+(\.\d+)/g, '$1$2')
    // Fix specific decimal spacing issues (like "167. 5")
    .replace(/(\d+\.)\s+(\d+)/g, '$1$2')
    // Fix colons to commas in temporal ranges
    .replace(/:\s*/g, ', ')
    // Fix "Temporal range" text removal (after colon replacement)
    .replace(/Temporal range\s*,\s*/g, '')
    // Fix "to" patterns (convert "to" to dash only when not followed by comma)
    .replace(/(\d+(?:\.\d+)?)\s+to\s+(\d+(?:\.\d+)?)(?!\s*,)/g, '$1-$2')
    // Fix "to" followed by comma and number (remove comma and convert to dash)
    .replace(/to,\s*(\d+(?:\.\d+)?)/g, '-$1')
    // Fix comma-dash patterns between periods (including leading dashes)
    .replace(/,\s*-/g, '-')
    // Add comma before tilde when missing
    .replace(/([a-zA-Z-]+)\s+~([\d.]+-?[\d.]*)/g, '$1, ~$2')
    .replace(/([a-zA-Z-]+)~([\d.]+-?[\d.]*)/g, '$1, ~$2')
    // Fix spaces around hyphens in numerical ranges (after other fixes)
    .replace(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/g, '$1-$2')
    // Remove leading/trailing spaces
    .trim()
    // Ensure space after comma if missing
    .replace(/,([^ ])/g, ', $1')
    // Ensure space before opening parentheses
    .replace(/([a-zA-Z])\(/g, '$1 (')
    // Remove trailing commas
    .replace(/,\s*$/g, '');
}

/**
 * Handles a row of data.
 *
 * @param {Array} rowData - An array of data elements from a row.
 * @param {object} data - The data object to populate.
 */
function handleRowData(rowData, data) {
  let keyword = rowData[0].structuredText.trim();
  const originalKeyword = keyword;
  if (!keywordRegex.test(keyword)) {
    keyword = keyword.toLowerCase();
  }
  keyword = keyword.replace(':', '');
  let value = rowData[1].structuredText.trim().replace('†', '');
  if (value.includes('\n')) {
    [value] = value.split('\n');
  }
  assignClassificationInfo(data, originalKeyword.replace(':', ''), value);
}

/**
 * Handles a header row of data.
 *
 * @param {Array} headerData - An array of header elements from a row.
 * @param {Array} rows - An array of row elements.
 * @param {object} data - The data object to populate.
 */
function handleHeaderData(headerData, rows, data) {
  const keyword = headerData[0].structuredText.trim().replace(':', '');

  // Find the header row in the rows array by matching the header element
  let headerRowIndex = -1;
  for (let i = 0; i < rows.length; i++) {
    if (
      rows[i] === headerData[0].parentNode ||
      (rows[i].querySelectorAll && rows[i].querySelectorAll('th').length > 0)
    ) {
      headerRowIndex = i;
      break;
    }
  }

  // Get the next row (index + 1)
  const nextRowIndex = headerRowIndex + 1;
  if (nextRowIndex < rows.length) {
    const headerRowData = rows[nextRowIndex].querySelectorAll('td');
    if (headerRowData.length > 0) {
      let value = headerRowData[0].structuredText.trim().replace('†', '');
      if (value.includes('\n')) {
        [value] = value.split('\n');
      }
      assignClassificationInfo(data, keyword, value);
    }
  }
}

/**
 * Handles the first row of data.
 *
 * @param {object} firstRow - The first row element.
 * @param {object} data - The data object to populate.
 */
function handleFirstRow(firstRow, data) {
  const firstRowData = firstRow.structuredText.split('\n');
  data.name = firstRowData[0].trim();

  const temporalRangeData = firstRowData.slice(1).join('');
  data.temporalrange = handleTemporalRange(temporalRangeData);
}

/**
 * Handles all other rows of data.
 *
 * @param {Array} rows - An array of row elements.
 * @param {object} data - The data object to populate.
 */
function handleOtherRows(rows, data) {
  rows.forEach(row => {
    const rowData = row.querySelectorAll('td');
    const headerData = row.querySelectorAll('th');

    if (rowData.length > 1) {
      handleRowData(rowData, data);
    } else if (
      headerData.length === 1 &&
      rowData.length === 1 &&
      keywordRegex.test(headerData[0].structuredText.trim())
    ) {
      handleRowData([headerData[0], rowData[0]], data);
    } else if (
      headerData.length === 1 &&
      keywordRegex.test(headerData[0].structuredText.trim())
    ) {
      handleHeaderData(headerData, rows, data);
    }
  });
}

/**
 * Retrieves the data from the information box section of a Wikipedia article.
 *
 * @param {string} html - The HTML string.
 * @param {object} data - The data object to populate.
 * @returns {object} The populated data object.
 */
function retrieveBoxData(html, data) {
  const infoBox = getInfoBox(html);
  if (infoBox) {
    const rows = getRows(infoBox, data.name);
    handleFirstRow(rows[0], data);
    handleOtherRows(rows, data);
  }
}

module.exports = {
  assignClassificationInfo,
  retrieveBoxData,
  getInfoBox,
  getRows,
  handleFirstRow,
  handleOtherRows,
  handleHeaderData,
  handleTemporalRange,
  handleRowData,
};
