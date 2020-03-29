import React from 'react';
import { Container, Label, Menu } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import DropdownMenu from '../DropdownMenu/DropdownMenu';

export const NavigationMenu = ({ setBaseCurrency, baseCurrency, location }) => {
  const handleChange = (e, { value }) => setBaseCurrency(value);

  const detectActiveLink = (currentPath, targetPath) => (currentPath === targetPath ? 'link active' : 'link');

  return (
    <Menu inverted color="blue" fixed="top" size="huge">
      <Container className="navigation">
        <Menu.Item className={detectActiveLink(location.pathname, '/')}>
          <NavLink to="/">Rates</NavLink>
        </Menu.Item>
        <Menu.Item className={detectActiveLink(location.pathname, '/converter')}>
          <NavLink to="/converter">Converter</NavLink>
        </Menu.Item>
        <Menu.Item position="right">
          <Label color="teal" pointing="right" size="large">Select your base currency</Label>
          <DropdownMenu
            value={baseCurrency}
            handleChange={handleChange}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

NavigationMenu.propTypes = {
  setBaseCurrency: PropTypes.func.isRequired,
  baseCurrency: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(NavigationMenu);
