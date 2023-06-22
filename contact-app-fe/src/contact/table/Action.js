import { Group } from '@mantine/core';
import React from 'react';
import AddEditContact from '../add/AddEditContact';
import Delete from '../add/Delete';

const Action = ({ data }) => {
  return (
    <Group>
      <AddEditContact contactDetail={data} />
      <Delete id={data?.id} />
    </Group>
  );
};

export default Action;
