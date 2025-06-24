const moment = require('moment');

const isDate = (value, {
  req, // The request object, if needed for context
  location, // The location of the field (e.g., body, query, params)
  path // The path of the field in the request
}) => {
  console.log(value, req, location, path);

  if (!value) {
    return false; // If no value is provided, return false
  }

  const fecha = moment(value);

  if(fecha.isValid()) {
    return true; // If the date is valid, return true
  }

}

module.exports = {
  isDate,
}