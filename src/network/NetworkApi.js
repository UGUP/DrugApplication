const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const API_PATH =
  "https://theexplorer1-2-deloitteblockchainhack20-bom.blockchain.ocp.oraclecloud.com:7443/restproxy/bcsgw/rest/v1/transaction/invocation";
const CHANNEL = "pharmacychannel";
const CHAINCODE = "PharmaWithArgs";

export const METHOD_REGISTER_COMPANY = "registerCompany";

export const METHOD_CREATE_DRUG = "addDrug";
export const METHOD_CREATE_PO = "createPO";
export const METHOD_CREATE_SHIPMENT = "createShipment";

export const METHOD_VIEW_CURRENT_STATE = "viewDrugCurrentState";

export function invokeTransaction(methodName, args) {
  return fetch(CORS_PROXY + API_PATH, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Basic dXBndXB0YUBkZWxvaXR0ZS5jb206Y3VhODU2NWh5SzEh",
    },
    body: JSON.stringify({
      channel: CHANNEL,
      chaincode: CHAINCODE,
      method: methodName,
      args: args,
    }),
  });
}
