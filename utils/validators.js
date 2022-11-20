const isNumber = (field) => {
  return !isNaN(field) && field > 0
}

const isText = (field) => {
  return (/[a-zA-Z]/).test(field);
}

const isValidID = (field) => {
  return (/^A\d+/).test(field);
}

const isFloat = (field) => {
  return parseFloat(field) > 0
}

const isEmpty = (field) => {
  return field === null
}

const isBlank = (field) => {
  return !field.length > 0
}

module.exports = {isNumber, isText, isValidID, isFloat, isEmpty, isBlank};