// const aesjs = require('aes-js');

import * as aesjs from 'aes-js';

const encryptTextWithAES = (text = '') => {
  // An example 128-bit key (16 bytes * 8 bits/byte = 128 bits)
  const key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  // Convert text to bytes
  const textBytes = aesjs.utils.utf8.toBytes(text);

  // The counter is optional, and if omitted will begin at 1
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  const encryptedBytes = aesCtr.encrypt(textBytes);

  // To print or store the binary data, you may convert it to hex
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

  return encryptedHex;
};

const decryptTextEncryptedWithAES = (encryptedHexString = '') => {
  const key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  // When ready to decrypt the hex string, convert it back to bytes
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHexString);

  // The counter mode of operation maintains internal state, so to
  // decrypt a new instance must be instantiated.
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);

  // Convert our bytes back into text
  const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

  return decryptedText;
};

export { encryptTextWithAES, decryptTextEncryptedWithAES };
