import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import CurrencyItem from '../CurrencyItem/CurrencyItem';

const SubTable = ({
  name, currencies, iconName, handleClick, getRate,
}) => (
  <>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan="4" textAlign="center">{name}</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {currencies.map((curr) => (
        <CurrencyItem
          key={curr.code}
          {...curr}
          handleClick={handleClick}
          rate={getRate(curr.code.toLowerCase())}
          iconName={iconName}
        />
      ))}
    </Table.Body>
  </>
);

SubTable.propTypes = {
  name: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  getRate: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default SubTable;
