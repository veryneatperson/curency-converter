import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import CURRENCIES_ARRAY from '../../../data/currencies-array.json';

export const DropdownMenu = ({ handleChange, value, placeholder = 'Click here...' }) => {
  const currencies = CURRENCIES_ARRAY.map(({ code, country, name }) => ({
    key: code,
    value: code,
    flag: country.toLowerCase(),
    text: `${code} - ${name}`,
  }));

  return (
    <Dropdown
      placeholder={placeholder}
      search
      fluid
      selection
      value={value || ''}
      onChange={handleChange}
      options={currencies}
    />
  );
};

DropdownMenu.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

export default React.memo(DropdownMenu);
