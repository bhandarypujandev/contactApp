import { Button, Group, Modal } from '@mantine/core';
import React, { useContext } from 'react';
import { useModalTrigger } from '../../utils/ModalTriggerHook';
import { ContactContext } from '../contactContext/ContactContext';

const Delete = ({ id }) => {
  const { show, handleModalTrigger } = useModalTrigger();
  const { loading, deleteContact } = useContext(ContactContext);
  const handleDeleteClick = finalDelete => {
    handleModalTrigger(true);
    if (finalDelete) deleteContact(id);
  };

  return (
    <>
      <Button variant="outline" color="red" onClick={() => handleDeleteClick(false)}>
        Delete
      </Button>

      <Modal opened={show} onClose={() => handleModalTrigger(false)} title="Confirm">
        <p>Are you sure you want to delete this contact?</p>

        <Group spacing="xs" position="right">
          <Button loading={loading} size="xs" variant="outline" color="red" onClick={() => handleDeleteClick(true)}>
            Delete
          </Button>

          <Button disabled={loading} size="xs" variant="outline" color="gray">
            Cancel
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default Delete;
