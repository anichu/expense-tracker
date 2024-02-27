export const getErrorMessage = (err) => {
  if (err.response) {
    return err.response.data.message;
  }
  return err.message;
};
