const DEFAULT_CHARACTER_SET =
  'ABCDEFGHIJKLMNOPQRSTUVYWXYZabcdefghijklmnopqrstuvwxyz0123456789';

interface Options {
  characterSet?: string;
}

const generateRandomString = (length: number, options: Options = {}) => {
  const { characterSet = DEFAULT_CHARACTER_SET } = options;

  let result = '';

  for (let i = 0; i < length; i++) {
    result += characterSet.charAt(
      Math.floor(Math.random() * characterSet.length)
    );
  }

  return result;
};

export default generateRandomString;
