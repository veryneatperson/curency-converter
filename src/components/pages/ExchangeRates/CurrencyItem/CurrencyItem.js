import React from 'react';
import { Flag, Icon, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const CurrencyItem = ({
  code, country, handleClick, name, rate, iconName,
}) => (
  <Table.Row key={code} textAlign="center">
    <Table.Cell>
      <Flag name={country.toLowerCase()} />
      {code}
    </Table.Cell>
    <Table.Cell>{name}</Table.Cell>
    <Table.Cell>{rate.toFixed(5)}</Table.Cell>
    <Table.Cell>
      <Icon
        name={iconName}
        color={iconName === 'star' ? 'yellow' : 'red'}
        onClick={() => {
          handleClick(code.toLowerCase());
        }}
      />
    </Table.Cell>
  </Table.Row>
);

CurrencyItem.propTypes = {
  code: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  iconName: PropTypes.string.isRequired,
};

export default React.memo(CurrencyItem);
