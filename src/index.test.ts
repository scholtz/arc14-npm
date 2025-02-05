import algosdk from "algosdk";
import { makeArc14TxWithSuggestedParams, makeArc14AuthHeader } from "./index";
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

test("makeArc14AuthHeader should return correct value", async () => {
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
  const signed = tx.signTxn(addr.sk);
  const header = makeArc14AuthHeader(signed);
  expect(header).toBe(
    "SigTx gqNzaWfEQOi7A4rlhEZ8Yz+At5UaqqmYiaAcD9dr/H0WmC/sc2QnpauPM6O/loc5HlzQKIe1HgJ+3sg3mJoLWYHfRGPUBgqjdHhuiKJmds4Cy+Eoo2dlbqxtYWlubmV0LXYxLjCiZ2jEIMBhxNj8Hb3e0tdgS+RWjj9tBBmHrDe95LYgtas5JIrfomx2zgLL5RCkbm90ZcQLcmVhbG0jQVJDMTSjcmN2xCAzod+ZVTzO7j2awEaqTHZ/ZTY7U7RLA+NZYm1VfZtLUqNzbmTEIDOh35lVPM7uPZrARqpMdn9lNjtTtEsD41libVV9m0tSpHR5cGWjcGF5"
  );
});
