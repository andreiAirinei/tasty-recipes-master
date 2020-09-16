export const getErrorType = (msg) => {
  switch (msg) {
    case 'Token is not valid!':
    case 'No token, authorization denied!':
      return 'Need to Login first!';

    default:
      return msg;
  }
}