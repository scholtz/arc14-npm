import { Buffer } from "buffer";
import algosdk, { makePaymentTxnWithSuggestedParamsFromObject } from "algosdk";
import { SuggestedParamsFromAlgod } from "algosdk/dist/types/client/v2/algod/suggestedParams";
// https://github.com/algorandfoundation/ARCs/pull/218/files?short_path=e2167da#diff-e2167dac2fd8311216a1b20ae6c3f5236e72d3731a8e841c7212632f1eab1a04

const makeArc14TxWithSuggestedParams = async (
  realm: string,
  authAddress: string,
  params: SuggestedParamsFromAlgod
) => {
  params.fee = BigInt(0);
  params.minFee = BigInt(0);
  params.flatFee = true;
  const tx = makePaymentTxnWithSuggestedParamsFromObject({
    amount: 0,
    sender: authAddress,
    receiver: authAddress,
    suggestedParams: params,
    note: new Uint8Array(Buffer.from(realm)),
  });
  return tx;
};

const makeArc14Tx = async (
  realm: string,
  authAddress: string,
  algod: algosdk.Algodv2
) => {
  const params = await algod.getTransactionParams().do();
  return makeArc14TxWithSuggestedParams(realm, authAddress, params);
};
export { makeArc14Tx, makeArc14TxWithSuggestedParams };
