import { Button, Group, Modal, TextInput } from '@mantine/core';
import React, { useContext, useState } from 'react';
import { useFormValues } from './useFormValues';
import { ContactContext } from '../contactContext/ContactContext';

const getLabel = id => {
  return { button: id ? 'Edit' : 'Add', title: id ? 'Edit Contact' : 'Add New Contact' };
};

const getValue = (values, fieldName) => {
  return values[fieldName]?.value || '';
};

const AddEditContact = ({ contactDetail, clickCallBack }) => {
  const [opened, setOpened] = useState(false);
  const handleModalTrigger = value => {
    setOpened(value);
    if (!value) clearError();
  };
  const { values, updateFormValues } = useFormValues(contactDetail);
  const { addContact, updateContact, loading, error, clearError, clearSpecificError } = useContext(ContactContext);

  const handleFormSubmit = e => {
    e.preventDefault();
    const toSubmit = {
      fullName: getValue(values, 'fullName'),
      emailAddress: getValue(values, 'emailAddress'),
      mobileNumber: getValue(values, 'mobileNumber'),
    };
    // if id is present then update contact else add new contact
    new Promise(resolve => {
      if (contactDetail?.id) {
        toSubmit.id = contactDetail.id;
        updateContact(contactDetail.id, toSubmit, resolve);
      } else {
        addContact(toSubmit, resolve);
      }
    }).then(() => {
      if (clickCallBack) clickCallBack();
      handleModalTrigger(false);
    });
  };

  return (
    <>
      <Button
        variant="outline"
        color="green"
        onClick={() => {
          handleModalTrigger(true);
        }}
      >
        {getLabel(contactDetail?.id).button}
      </Button>
      <Modal opened={opened} onClose={() => handleModalTrigger(false)} title={getLabel(contactDetail?.id).title}>
        <form onSubmit={e => handleFormSubmit(e)}>
          <TextInput
            placeholder="Full Name"
            label="Full name"
            name="fullName"
            value={getValue(values, 'fullName')}
            onChange={e => updateFormValues(e.target.name, e.target.value)}
            required
            error={error?.fullName}
          />
          <TextInput
            placeholder="Email"
            label="Email"
            name="emailAddress"
            value={getValue(values, 'emailAddress')}
            onChange={e => updateFormValues(e.target.name, e.target.value)}
            type="email"
            error={error?.emailAddress}
          />

          <TextInput
            placeholder="Phone Number"
            description="Exclude + "
            label="Mobile Number (Include country code)"
            name="mobileNumber"
            value={getValue(values, 'mobileNumber')}
            onChange={e => {
              updateFormValues(e.target.name, e.target.value);
              if (error?.mobileNumber) {
                clearSpecificError('mobileNumber');
              }
            }}
            step={1}
            pattern="^[1-9]\d{10,14}$"
            required
            error={error?.mobileNumber}
          />
          <Group spacing={'xs'} mt="xs" position="right">
            <Button type="submit" variant="outline" color="blue" loading={loading}>
              {getLabel(contactDetail?.id).button}
            </Button>
            <Button
              type="button"
              variant="outline"
              color="gray"
              onClick={() => {
                handleModalTrigger(false);
                if (clickCallBack) clickCallBack();
              }}
              disabled={loading}
            >
              Cancel
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default AddEditContact;
