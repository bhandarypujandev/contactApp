export const getErrorMessage = error => {
  console.log(error);
  if (error?.response) {
    if (error.response.status === 500) {
      return error.response.data.message;
    } else if (error.response.status === 422) {
      return 'Validation Error';
    }
  } else {
    return error?.message || 'Something went wrong';
  }
};

export const getErrorObjext = errors => {
  try {
    return errors.reduce((obj, error) => {
      obj[error.name] = error.message;
      return obj;
    }, {});
  } catch (e) {
    return null;
  }
};
