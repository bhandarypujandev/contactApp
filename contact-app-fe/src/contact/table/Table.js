import { Table } from '@mantine/core';
import React, { useContext, useEffect } from 'react';
import Action from './Action';
import { ContactContext } from '../contactContext/ContactContext';
const TABLE_HEADS = [
  { title: 'Full Name', field: 'fullName' },
  { title: 'Email', field: 'email' },
  { title: 'Phone', field: 'phoneNumber' },
  { title: 'Action', field: 'action' },
];

const ContactTable = () => {
  const { contacts, fetchContacts } = useContext(ContactContext);

  useEffect(() => {
    fetchContacts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Table>
      <thead>
        <tr>
          {TABLE_HEADS.map(head => (
            <th key={head.field}>{head.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {contacts?.map((data, index) => (
          <tr key={data.id}>
            <td>{data.fullName}</td>
            <td>{data.emailAddress}</td>
            <td>{data.mobileNumber}</td>
            <td>
              <Action data={data} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ContactTable;
