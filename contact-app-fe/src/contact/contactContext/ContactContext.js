import { notifications } from '@mantine/notifications';
import { createContext, useState } from 'react';
import axiosInstance from '../../axios/axiosInstance';
import { getErrorMessage, getErrorObjext } from '../../utils/getErrorMessage';

export const ContactContext = createContext();

const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageInformation, setPageInformation] = useState({
    page: 0,
    size: 10,
    totalElement: 0,
    totalPages: 0,
  });
  const [searchText, setSearchText] = useState('');

  // Function to fetch contacts
  const fetchContacts = async pageNumber => {
    try {
      if (searchText?.length > 0) searchContact(searchText, pageNumber);
      else {
        const pageToFetch = pageNumber >= 0 ? pageNumber : pageInformation.page;
        setLoading(true);
        const response = await axiosInstance.get(`/contact/all?pageNumber=${pageToFetch}`);
        setContacts(response.data?.content);
        setPageInformation({
          page: pageToFetch,
          size: response.data?.size,
          totalElement: response.data?.totalElement,
          totalPages: response.data?.totalPages,
        });
        setError(null);
        notifications.show({
          title: 'Successfully Fetched',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Failed',
        message: getErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new contact
  const addContact = async (newContact, resolve) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/contact', newContact);
      if (contacts.length < 10) setContacts([...contacts, response.data]);
      notifications.show({
        title: 'Successfully Added',
      });
      setError(null);
      resolve();
    } catch (error) {
      notifications.show({
        title: 'Failed',
        message: getErrorMessage(error),
      });
      if (error?.response.status === 422) {
        setError(getErrorObjext(error?.response.data.fields));
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to update an existing contact (example)
  const updateContact = async (contactId, updatedContact, resolve) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put(`/contact/${contactId}`, updatedContact);
      const contactsCopy = [...contacts];
      const contactIndex = contactsCopy.findIndex(contact => contact.id === contactId);
      contactsCopy[contactIndex] = response.data;
      setContacts(contactsCopy);
      notifications.show({
        title: 'Successfully Updated',
      });
      resolve();
    } catch (error) {
      notifications.show({
        title: 'Failed',
        message: getErrorMessage(error),
      });
      if (error?.response.status === 422) {
        setError(getErrorObjext(error?.response.data.fields));
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a contact (example)
  const deleteContact = async contactId => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/contact/${contactId}`);
      setContacts(contacts.filter(contact => contact.id !== contactId));
      notifications.show({
        title: 'Successfully Deleted',
      });
    } catch (error) {
      notifications.show({
        title: 'Failed',
        message: getErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  //clear error
  const clearError = () => setError(null);

  const clearSpecificError = name =>
    setError(error => {
      return { ...error, [name]: null };
    });

  //search contact
  const searchContact = async (searchValue, pageNumber, resolve) => {
    try {
      const pageToFetch = pageNumber >= 0 ? pageNumber : pageInformation.page;
      setLoading(true);
      const response = await axiosInstance.get(`/contact/search?fullName=${searchValue || ''}&pageNumber=${pageToFetch}`);
      setSearchText(searchValue);
      setContacts(response.data?.content);
      setPageInformation({
        page: pageToFetch,
        size: response.data?.size,
        totalElement: response.data?.totalElement,
        totalPages: response.data?.totalPages,
      });
      setError(null);
      const message = response.data?.content.length === 0 ? 'No Contact Found' : 'Successfully Fetched';
      notifications.show({
        title: message,
      });
      resolve(response.data?.content.length === 0);
    } catch (error) {
      setSearchText('');
      notifications.show({
        title: 'Failed',
        message: getErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        fetchContacts,
        addContact,
        updateContact,
        deleteContact,
        error,
        clearError,
        loading,
        searchContact,
        pageInformation,
        clearSpecificError,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
