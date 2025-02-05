# ARC14 NPM LIBRARY

This is npm library for password generated ED25519 accounts and used mainly by the algorand community.

[ARC14 Specs](https://github.com/algorandfoundation/ARCs/pull/218/files?short_path=e2167da#diff-e2167dac2fd8311216a1b20ae6c3f5236e72d3731a8e841c7212632f1eab1a04)

## Usage

Install npm package

```
npm i arc14 --save
```

Import package

```
import { makeArc14Tx } from "arc14"
```

### makeArc14Tx

```
import { makeArc14Tx } from "arc14"

// prepare arc14 inputs
const realm = "MyApp#ARC14";
const authAddress = "..ADDR..";
const algod = new algosdk.Algodv2(..)

// get arc14 tx
const makeArc14Tx = async (
  realm: realm,
  authAddress: authAddress,
  algod: algod
)

// sign tx
```

### makeArc14TxWithSuggestedParams

```
import { makeArc14Tx } from "arc14"

const addr = await arc76.generateAlgorandAccount("my_cicd_password");
const params: SuggestedParamsFromAlgod = {
    consensusVersion: "https://github.com/algorandfoundation/specs/tree/236dcc18c9c507d794813ab768e467ea42d1b4d9",
    fee: 1000n,
    genesisHash: new Uint8Array(Buffer.from("wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=", "base64")),
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
expect(tx.fee).toBe(0n);
expect(Buffer.from(tx.note).toString("base64url")).toBe(Buffer.from("realm#ARC14").toString("base64url"));
```