/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/launchpad.json`.
 */
export type Launchpad = {
    "address": "5noUdXL9uS5pNnmsxSfEHYo2yXBYkRwQJRpYd5AfqaHJ",
    "metadata": {
      "name": "launchpad",
      "version": "0.1.0",
      "spec": "0.1.0",
      "description": "Created with Anchor"
    },
    "instructions": [
      {
        "name": "initNewNftInx",
        "discriminator": [
          58,
          193,
          140,
          156,
          216,
          44,
          54,
          78
        ],
        "accounts": [
          {
            "name": "mint",
            "writable": true,
            "signer": true
          },
          {
            "name": "signer",
            "writable": true,
            "signer": true
          },
          {
            "name": "metadata",
            "writable": true
          },
          {
            "name": "systemProgram"
          },
          {
            "name": "sysvarInstructions"
          },
          {
            "name": "masterEdition",
            "writable": true
          },
          {
            "name": "tokenProgram"
          },
          {
            "name": "mplTokenMetadata"
          }
        ],
        "args": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          }
        ]
      },
      {
        "name": "initNewTokenInx",
        "discriminator": [
          116,
          184,
          61,
          111,
          198,
          10,
          216,
          246
        ],
        "accounts": [
          {
            "name": "mint",
            "writable": true,
            "signer": true
          },
          {
            "name": "signer",
            "writable": true,
            "signer": true
          },
          {
            "name": "metadata",
            "writable": true
          },
          {
            "name": "systemProgram"
          },
          {
            "name": "sysvarInstructions"
          },
          {
            "name": "masterEdition",
            "writable": true
          },
          {
            "name": "tokenProgram"
          },
          {
            "name": "mplTokenMetadata"
          }
        ],
        "args": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          }
        ]
      },
      {
        "name": "mintNewNftInx",
        "discriminator": [
          23,
          135,
          122,
          190,
          156,
          50,
          44,
          193
        ],
        "accounts": [
          {
            "name": "signer",
            "writable": true,
            "signer": true
          },
          {
            "name": "mint",
            "writable": true
          },
          {
            "name": "metadata",
            "writable": true
          },
          {
            "name": "systemProgram"
          },
          {
            "name": "sysvarInstructions"
          },
          {
            "name": "masterEdition",
            "writable": true
          },
          {
            "name": "tokenProgram"
          },
          {
            "name": "mplTokenMetadata"
          },
          {
            "name": "destination"
          },
          {
            "name": "associatedTokenProgram"
          },
          {
            "name": "token",
            "writable": true
          }
        ],
        "args": []
      },
      {
        "name": "mintNewTokenInx",
        "discriminator": [
          45,
          31,
          255,
          5,
          178,
          75,
          139,
          18
        ],
        "accounts": [
          {
            "name": "signer",
            "writable": true,
            "signer": true
          },
          {
            "name": "mint",
            "writable": true
          },
          {
            "name": "metadata",
            "writable": true
          },
          {
            "name": "systemProgram"
          },
          {
            "name": "sysvarInstructions"
          },
          {
            "name": "masterEdition",
            "writable": true
          },
          {
            "name": "tokenProgram"
          },
          {
            "name": "mplTokenMetadata"
          },
          {
            "name": "destination"
          },
          {
            "name": "associatedTokenProgram"
          },
          {
            "name": "token",
            "writable": true
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "customError",
        "msg": "Custom error message"
      }
    ],
    "constants": [
      {
        "name": "seed",
        "type": "string",
        "value": "\"anchor\""
      }
    ]
  };
  