import CryptoJS from "crypto-js";

const GLOBALS = {
  KEY: "J9SNdcjJgDnDBhPLb9e7bcSNlb6CfR52",
  IV: "J9SNdcjJgDnDBhPL",
};

const getShaKey = (key, length = 32) =>
  CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex).substring(0, length);

const shaKey = getShaKey(GLOBALS.KEY, 32);

export const encryptData = (data) =>
  CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Utf8.parse(shaKey), {
    iv: CryptoJS.enc.Utf8.parse(GLOBALS.IV),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();

export const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Utf8.parse(shaKey), {
      iv: CryptoJS.enc.Utf8.parse(GLOBALS.IV),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    return null;
  }
};
