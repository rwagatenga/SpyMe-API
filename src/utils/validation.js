/* eslint-disable no-unused-vars */
/* eslint-disable no-eval */
/**
 *
 * @param {Object} input
 * @param {boolean} condition
 */
export const isRequired = (input, condition = true) => {
  const { key, value } = input;
  if (value.length === 0) {
    return `${key} is required`;
  }
  return true;
};

/**
 *
 * @param {Object} input
 * @param {number} condition
 */
export const min = (input, condition) => {
  const { key, value } = input;
  if (value.length < condition) {
    return `${key} should not be less than ${condition}`;
  }
  return true;
};

/**
 *
 * @param {Object} input
 * @param {number} condition
 */
export const max = (input, condition) => {
  const { key, value } = input;
  if (value.length > condition) {
    return `${key} should not be more than ${max}`;
  }
  return true;
};

/**
 *
 * @param {Object} input
 * @param {Array} condition
 */
export const oneOf = (input, condition) => {
  const { key, value } = input;
  if (condition.includes(value)) {
    return true;
  }
  return `${key} should be one of ${condition}`;
};

/**
 *
 * @param {Object} input
 * @param {boolean} condition
 */
export const email = (input) => {
  const { key, value } = input;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim;
  if (!re.test(value)) {
    return 'Please provide a valid email address.';
  }
  return true;
};

/**
 *
 * @param {Object} data Details to validate
 * @param {Object[]} rules List of the rules
 */
const validate = (data, rules) => {
  const errorBag = {}; // Object to keep store messages
  // Loop over the object rules for each input
  Object.keys(rules).forEach((key) => {
    let errors = [];
    let valueToCheck;
    valueToCheck = data[key];
    let isUndefined = false;
    let wasRequired = false;
    // If value to check is undefined, set empty string to it
    if (valueToCheck === undefined) {
      valueToCheck = '';
      isUndefined = true;
    }
    // Loop over
    for (let i = 0; i < rules[key].length; i += 1) {
      const rule = rules[key][i];
      const ruleName = Object.keys(rule)[0];
      // Get corresponding error handler function, If it's not valid it'll return error message
      const validationMethod = eval(ruleName);
      // Transform camelcase attribute name for friendly presentation
      let friendlyKeyName = key
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .toLowerCase();
      friendlyKeyName = friendlyKeyName.charAt(0).toUpperCase() + friendlyKeyName.slice(1);
      const valueObject = { key: friendlyKeyName, value: valueToCheck };
      // Ignore other error messages if the value was not provided and required
      if (ruleName === 'isRequired' && data[key] === undefined) {
        wasRequired = true;
        errors = [isRequired(valueObject)];
        break;
      }
      const valid = validationMethod(valueObject, rule[ruleName]);
      if (valid !== true) {
        errors.push(valid);
      }
    }
    if (!wasRequired && isUndefined) {
      errors = [];
    }
    if (errors.length > 0) {
      errorBag[key] = errors;
    }
  });
  if (Object.keys(errorBag).length > 0) {
    return errorBag;
  }
  return true;
};

export default validate;
