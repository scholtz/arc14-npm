import algosdk from "algosdk";
import { makeArc14TxWithSuggestedParams } from "./index";
import { SuggestedParamsFromAlgod } from "algosdk/dist/types/client/v2/algod/suggestedParams";
import { generateAlgorandAccount } from "arc76";
/**
 * @jest-environment jsdom
 */
test("makeArc14TxWithSuggestedParams should return correct address", async () => {
  const addr = await generateAlgorandAccount("tests_tests_tests_tests_tests");
  const params: SuggestedParamsFromAlgod = {
    consensusVersion:
      "https://github.com/algorandfoundation/specs/tree/236dcc18c9c507d794813ab768e467ea42d1b4d9",
    fee: 1000n,
    genesisHash: new Uint8Array(
      Buffer.from("wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=", "base64")
    ),
    genesisID: "mainnet-v1.0",
    lastValid: 46916880n,
    minFee: 1000n,
    flatFee: false,
    firstValid: 46915880n,
  };
  const tx = await makeArc14TxWithSuggestedParams(
    "realm#ARC14",
    algosdk.encodeAddress(addr.addr.publicKey),
    params
  );
  expect(tx.txID()).toBe(
    "IVN5JSHXPULCUP6VBIEANFHHDRMNBJNBEZYQSAPCSUINE6JCO4RA"
  );
  expect(tx.fee).toBe(0n);
  expect(Buffer.from(tx.note).toString("base64url")).toBe(
    Buffer.from("realm#ARC14").toString("base64url")
  );
});
