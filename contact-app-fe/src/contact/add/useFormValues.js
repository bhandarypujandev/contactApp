import { useEffect, useState } from 'react';

export const useFormValues = contactDetail => {
  const [values, setValues] = useState({});

  //If Id is present then it is edit mode so set the form values
  useEffect(() => {
    if (contactDetail?.id) {
      setFormValues(contactDetail);
    }
  }, [contactDetail]);

  const setFormValues = formData => {
    const keys = Object.keys(formData);
    const formValues = {};
    for (let key of keys) {
      formValues[key] = { value: formData[key], error: '' };
    }
    setValues(formValues);
  };

  //Update the form values on change
  const updateFormValues = (name, value) => {
    setValues({ ...values, [name]: { value, error: '' } });
  };

  return { values, setFormValues, updateFormValues };
};
