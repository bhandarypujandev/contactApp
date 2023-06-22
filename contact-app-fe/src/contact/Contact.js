import { Group, Stack } from '@mantine/core';
import React from 'react';
import AddNewContact from './add/AddEditContact';
import ContactProvider from './contactContext/ContactContext';
import ContactTable from './table/Table';
import Search from './Search';
import Pagination from './Pagination';

const Contact = () => {
  return (
    <ContactProvider>
      <Stack spacing={'lg'}>
        <Group align="baseline" position="apart">
          <Search />
          <AddNewContact />
        </Group>
        <ContactTable />
        <Pagination />
      </Stack>
    </ContactProvider>
  );
};

export default Contact;
