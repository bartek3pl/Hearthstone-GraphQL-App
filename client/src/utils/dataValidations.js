const validateLogin = (login) =>
  typeof login === 'string' && login?.length >= 6 && login?.length <= 30;

const hasUpperCaseLetter = (str) => str.toLowerCase() !== str;

const validatePassword = (password) =>
  typeof password === 'string' &&
  password?.length >= 6 &&
  password?.length <= 30 &&
  hasUpperCaseLetter(password);

export { validateLogin, validatePassword };
