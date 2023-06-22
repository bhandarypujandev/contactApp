import { Button, Group, Modal, TextInput } from '@mantine/core';
import React, { useContext, useState } from 'react';
import { ContactContext } from './contactContext/ContactContext';
import AddEditContact from './add/AddEditContact';
import { useModalTrigger } from '../utils/ModalTriggerHook';

const Search = () => {
  const { show, handleModalTrigger } = useModalTrigger();

  const { searchContact, loading } = useContext(ContactContext);
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    new Promise(resolve => {
      searchContact(searchText, '', resolve);
    }).then(value => {
      if (value) handleModalTrigger(true);
    });
  };

  return (
    <Group>
      <TextInput
        placeholder="Seach By Contact Name"
        onChange={e => setSearchText(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <Button loading={loading} onClick={handleSearch}>
        Search
      </Button>
      <Modal opened={show} onClose={() => handleModalTrigger(false)} title="No Records Found">
        <p>Do you want to add new contact ?</p>

        <Group spacing="xs" position="right">
          <AddEditContact clickCallBack={()=>handleModalTrigger(false)}/>

          <Button disabled={loading} size="xs" variant="outline" color="gray">
            Cancel
          </Button>
        </Group>
      </Modal>
    </Group>
  );
};

export default Search;
