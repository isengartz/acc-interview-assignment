export const generateS3Url = (url: string) => {
  return `${process.env.REACT_APP_AWS_S3_URL}${url}`;
};
