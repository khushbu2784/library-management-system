import cryptoLib from 'cryptLib';
import GLOBALS from '../config/constant.js';

export const sendResponse = async (res,statusCode,resMsg,resData=null)=>{
    console.log("sendResponse called with statusCode:",statusCode,"message:",resMsg);

    const code = Number.isInteger(statusCode)?statusCode:500;
    const response = {
        success:code>=200 && code<300,
        message:resMsg,
    };

    if(resData){
        let data = resData.toObject?resData.toObject():resData;
        if(data && data.password) delete data.password;
        response.data = data;
    }

    const encryptedResponse = await encryption(response);
    return res.status(code).send(encryptedResponse);
}

const shaKey = cryptoLib.getHashSha256(GLOBALS.KEY, 32);

export const encryption = (data) => {
  return cryptoLib.encrypt(JSON.stringify(data), shaKey, GLOBALS.IV);
};

export const decryption = (encryptedData) => {
  const decrypted = cryptoLib.decrypt(encryptedData, shaKey, GLOBALS.IV);
  try {
    return JSON.parse(decrypted);
  } catch {
    return decrypted;
  }
}; 
