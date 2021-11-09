import React from 'react';

import { FiUsers } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { Nav, NavItem, NavGroup } from '@/components';

export const AdminNav = () => {
  const { pathname } = useLocation();
  const isActive = (to) => pathname.startsWith(to);
  return (
    <Nav>
      <NavGroup title={'Administration'}>
        <NavItem
          as={Link}
          to="/admin/appointment/list"
          isActive={isActive('/admin/user')}
          icon={FiUsers}
        >
          {'consultas'}
        </NavItem>
      </NavGroup>
    </Nav>
  );
};
