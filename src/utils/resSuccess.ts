export const resSuccess = (data: object, statusCode = 200) => {
  return {
    statusCode,
    message: `Success`,
    data,
  };
};
