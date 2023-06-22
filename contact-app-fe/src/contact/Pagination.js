import { Pagination as MantinePagination } from '@mantine/core';
import React, { useContext } from 'react';
import { ContactContext } from './contactContext/ContactContext';

const Pagination = () => {
  const { pageInformation, fetchContacts } = useContext(ContactContext);
  const { page, size, totalElement } = pageInformation;
  const totalPages = Math.ceil(totalElement / size);

  const handleChange = value => {
    
    fetchContacts(value - 1);
  };

  return (
    <div>
      <MantinePagination onChange={handleChange} total={totalPages} siblings={1} defaultValue={page + 1} />
    </div>
  );
};

export default Pagination;
