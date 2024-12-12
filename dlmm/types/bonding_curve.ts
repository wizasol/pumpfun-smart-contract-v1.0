export type BondingCurve = {
  "version": "0.1.0",
  "name": "bonding_curve",
  "instructions": [
    {
      "name": "initToken",
      "accounts": [
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "metadata",
          "type": {
            "defined": "InitTokenParams"
          }
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fee",
          "type": "f64"
        }
      ]
    },
    {
      "name": "createPool",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "addLiquidity",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolSolVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createMeteoraPool",
      "accounts": [
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayBitmapExtension",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "tokenMintX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMintY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reserveX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presetParameter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "funder",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "dlmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "activeId",
          "type": "i32"
        },
        {
          "name": "binStep",
          "type": "u16"
        }
      ]
    },
    {
      "name": "buy",
      "accounts": [
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolSolVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "sell",
      "accounts": [
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolSolVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "binArrayBitmapExtension",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lbPair",
            "type": "publicKey"
          },
          {
            "name": "positiveBinArrayBitmap",
            "docs": [
              "Packed initialized bin array state for start_bin_index is positive"
            ],
            "type": {
              "array": [
                {
                  "array": [
                    "u64",
                    8
                  ]
                },
                12
              ]
            }
          },
          {
            "name": "negativeBinArrayBitmap",
            "docs": [
              "Packed initialized bin array state for start_bin_index is negative"
            ],
            "type": {
              "array": [
                {
                  "array": [
                    "u64",
                    8
                  ]
                },
                12
              ]
            }
          }
        ]
      }
    },
    {
      "name": "lbPair",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "parameters",
            "type": {
              "defined": "StaticParameters"
            }
          },
          {
            "name": "vParameters",
            "type": {
              "defined": "VariableParameters"
            }
          },
          {
            "name": "bumpSeed",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          },
          {
            "name": "binStepSeed",
            "docs": [
              "Bin step signer seed"
            ],
            "type": {
              "array": [
                "u8",
                2
              ]
            }
          },
          {
            "name": "pairType",
            "docs": [
              "Type of the pair"
            ],
            "type": "u8"
          },
          {
            "name": "activeId",
            "docs": [
              "Active bin id"
            ],
            "type": "i32"
          },
          {
            "name": "binStep",
            "docs": [
              "Bin step. Represent the price increment / decrement."
            ],
            "type": "u16"
          },
          {
            "name": "status",
            "docs": [
              "Status of the pair. Check PairStatus enum."
            ],
            "type": "u8"
          },
          {
            "name": "requireBaseFactorSeed",
            "type": "u8"
          },
          {
            "name": "baseFactorSeed",
            "type": {
              "array": [
                "u8",
                2
              ]
            }
          },
          {
            "name": "padding1",
            "type": {
              "array": [
                "u8",
                2
              ]
            }
          },
          {
            "name": "tokenXMint",
            "docs": [
              "Token X mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "tokenYMint",
            "docs": [
              "Token Y mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "reserveX",
            "docs": [
              "LB token X vault"
            ],
            "type": "publicKey"
          },
          {
            "name": "reserveY",
            "docs": [
              "LB token Y vault"
            ],
            "type": "publicKey"
          },
          {
            "name": "protocolFee",
            "docs": [
              "Uncollected protocol fee"
            ],
            "type": {
              "defined": "ProtocolFee"
            }
          },
          {
            "name": "feeOwner",
            "docs": [
              "Protocol fee owner,"
            ],
            "type": "publicKey"
          },
          {
            "name": "rewardInfos",
            "docs": [
              "Farming reward information"
            ],
            "type": {
              "array": [
                {
                  "defined": "RewardInfo"
                },
                2
              ]
            }
          },
          {
            "name": "oracle",
            "docs": [
              "Oracle pubkey"
            ],
            "type": "publicKey"
          },
          {
            "name": "binArrayBitmap",
            "docs": [
              "Packed initialized bin array state"
            ],
            "type": {
              "array": [
                "u64",
                16
              ]
            }
          },
          {
            "name": "lastUpdatedAt",
            "docs": [
              "Last time the pool fee parameter was updated"
            ],
            "type": "i64"
          },
          {
            "name": "whitelistedWallet",
            "docs": [
              "Whitelisted wallet"
            ],
            "type": "publicKey"
          },
          {
            "name": "preActivationSwapAddress",
            "docs": [
              "Address allowed to swap when the current slot is greater than or equal to the pre-activation slot. The pre-activation slot is calculated as `activation_slot - pre_activation_slot_duration`."
            ],
            "type": "publicKey"
          },
          {
            "name": "baseKey",
            "docs": [
              "Base keypair. Only required for permission pair"
            ],
            "type": "publicKey"
          },
          {
            "name": "activationSlot",
            "docs": [
              "Slot to enable the pair. Only applicable for permission pair."
            ],
            "type": "u64"
          },
          {
            "name": "preActivationSlotDuration",
            "docs": [
              "Number of slot before activation slot. Used to calculate pre-activation slot for pre_activation_swap_address"
            ],
            "type": "u64"
          },
          {
            "name": "padding2",
            "docs": [
              "_padding2 is reclaimed free space from swap_cap_deactivate_slot and swap_cap_amount before, BE CAREFUL FOR TOMBSTONE WHEN REUSE !!"
            ],
            "type": {
              "array": [
                "u8",
                8
              ]
            }
          },
          {
            "name": "lockDurationsInSlot",
            "docs": [
              "Liquidity lock duration for positions which created before activate. Only applicable for permission pair."
            ],
            "type": "u64"
          },
          {
            "name": "creator",
            "docs": [
              "Pool creator"
            ],
            "type": "publicKey"
          },
          {
            "name": "reserved",
            "docs": [
              "Reserved space for future use"
            ],
            "type": {
              "array": [
                "u8",
                24
              ]
            }
          }
        ]
      }
    },
    {
      "name": "oracle",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "idx",
            "docs": [
              "Index of latest observation slot"
            ],
            "type": "u64"
          },
          {
            "name": "activeSize",
            "docs": [
              "Size of active sample. Active sample is initialized observation."
            ],
            "type": "u64"
          },
          {
            "name": "length",
            "docs": [
              "Number of observations"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "presetParameter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "binStep",
            "docs": [
              "Bin step. Represent the price increment / decrement."
            ],
            "type": "u16"
          },
          {
            "name": "baseFactor",
            "docs": [
              "Used for base fee calculation. base_fee_rate = base_factor * bin_step"
            ],
            "type": "u16"
          },
          {
            "name": "filterPeriod",
            "docs": [
              "Filter period determine high frequency trading time window."
            ],
            "type": "u16"
          },
          {
            "name": "decayPeriod",
            "docs": [
              "Decay period determine when the volatile fee start decay / decrease."
            ],
            "type": "u16"
          },
          {
            "name": "reductionFactor",
            "docs": [
              "Reduction factor controls the volatile fee rate decrement rate."
            ],
            "type": "u16"
          },
          {
            "name": "variableFeeControl",
            "docs": [
              "Used to scale the variable fee component depending on the dynamic of the market"
            ],
            "type": "u32"
          },
          {
            "name": "maxVolatilityAccumulator",
            "docs": [
              "Maximum number of bin crossed can be accumulated. Used to cap volatile fee rate."
            ],
            "type": "u32"
          },
          {
            "name": "minBinId",
            "docs": [
              "Min bin id supported by the pool based on the configured bin step."
            ],
            "type": "i32"
          },
          {
            "name": "maxBinId",
            "docs": [
              "Max bin id supported by the pool based on the configured bin step."
            ],
            "type": "i32"
          },
          {
            "name": "protocolShare",
            "docs": [
              "Portion of swap fees retained by the protocol by controlling protocol_share parameter. protocol_swap_fee = protocol_share * total_swap_fee"
            ],
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "curveConfiguration",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fees",
            "type": "f64"
          }
        ]
      }
    },
    {
      "name": "liquidityProvider",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "shares",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "liquidityPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "token",
            "type": "publicKey"
          },
          {
            "name": "totalSupply",
            "type": "u64"
          },
          {
            "name": "reserveToken",
            "type": "u64"
          },
          {
            "name": "reserveSol",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Observation",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "cumulativeActiveBinId",
            "docs": [
              "Cumulative active bin ID"
            ],
            "type": "i128"
          },
          {
            "name": "createdAt",
            "docs": [
              "Observation sample created timestamp"
            ],
            "type": "i64"
          },
          {
            "name": "lastUpdatedAt",
            "docs": [
              "Observation sample last updated timestamp"
            ],
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "FeeParameter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "protocolShare",
            "docs": [
              "Portion of swap fees retained by the protocol by controlling protocol_share parameter. protocol_swap_fee = protocol_share * total_swap_fee"
            ],
            "type": "u16"
          },
          {
            "name": "baseFactor",
            "docs": [
              "Base factor for base fee rate"
            ],
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "StaticParameters",
      "docs": [
        "Parameter that set by the protocol"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "baseFactor",
            "docs": [
              "Used for base fee calculation. base_fee_rate = base_factor * bin_step"
            ],
            "type": "u16"
          },
          {
            "name": "filterPeriod",
            "docs": [
              "Filter period determine high frequency trading time window."
            ],
            "type": "u16"
          },
          {
            "name": "decayPeriod",
            "docs": [
              "Decay period determine when the volatile fee start decay / decrease."
            ],
            "type": "u16"
          },
          {
            "name": "reductionFactor",
            "docs": [
              "Reduction factor controls the volatile fee rate decrement rate."
            ],
            "type": "u16"
          },
          {
            "name": "variableFeeControl",
            "docs": [
              "Used to scale the variable fee component depending on the dynamic of the market"
            ],
            "type": "u32"
          },
          {
            "name": "maxVolatilityAccumulator",
            "docs": [
              "Maximum number of bin crossed can be accumulated. Used to cap volatile fee rate."
            ],
            "type": "u32"
          },
          {
            "name": "minBinId",
            "docs": [
              "Min bin id supported by the pool based on the configured bin step."
            ],
            "type": "i32"
          },
          {
            "name": "maxBinId",
            "docs": [
              "Max bin id supported by the pool based on the configured bin step."
            ],
            "type": "i32"
          },
          {
            "name": "protocolShare",
            "docs": [
              "Portion of swap fees retained by the protocol by controlling protocol_share parameter. protocol_swap_fee = protocol_share * total_swap_fee"
            ],
            "type": "u16"
          },
          {
            "name": "padding",
            "docs": [
              "Padding for bytemuck safe alignment"
            ],
            "type": {
              "array": [
                "u8",
                6
              ]
            }
          }
        ]
      }
    },
    {
      "name": "VariableParameters",
      "docs": [
        "Parameters that changes based on dynamic of the market"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "volatilityAccumulator",
            "docs": [
              "Volatility accumulator measure the number of bin crossed since reference bin ID. Normally (without filter period taken into consideration), reference bin ID is the active bin of last swap.",
              "It affects the variable fee rate"
            ],
            "type": "u32"
          },
          {
            "name": "volatilityReference",
            "docs": [
              "Volatility reference is decayed volatility accumulator. It is always <= volatility_accumulator"
            ],
            "type": "u32"
          },
          {
            "name": "indexReference",
            "docs": [
              "Active bin id of last swap."
            ],
            "type": "i32"
          },
          {
            "name": "padding",
            "docs": [
              "Padding for bytemuck safe alignment"
            ],
            "type": {
              "array": [
                "u8",
                4
              ]
            }
          },
          {
            "name": "lastUpdateTimestamp",
            "docs": [
              "Last timestamp the variable parameters was updated"
            ],
            "type": "i64"
          },
          {
            "name": "padding1",
            "docs": [
              "Padding for bytemuck safe alignment"
            ],
            "type": {
              "array": [
                "u8",
                8
              ]
            }
          }
        ]
      }
    },
    {
      "name": "ProtocolFee",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amountX",
            "type": "u64"
          },
          {
            "name": "amountY",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "RewardInfo",
      "docs": [
        "Stores the state relevant for tracking liquidity mining rewards"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "docs": [
              "Reward token mint."
            ],
            "type": "publicKey"
          },
          {
            "name": "vault",
            "docs": [
              "Reward vault token account."
            ],
            "type": "publicKey"
          },
          {
            "name": "funder",
            "docs": [
              "Authority account that allows to fund rewards"
            ],
            "type": "publicKey"
          },
          {
            "name": "rewardDuration",
            "docs": [
              "TODO check whether we need to store it in pool"
            ],
            "type": "u64"
          },
          {
            "name": "rewardDurationEnd",
            "docs": [
              "TODO check whether we need to store it in pool"
            ],
            "type": "u64"
          },
          {
            "name": "rewardRate",
            "docs": [
              "TODO check whether we need to store it in pool"
            ],
            "type": "u128"
          },
          {
            "name": "lastUpdateTime",
            "docs": [
              "The last time reward states were updated."
            ],
            "type": "u64"
          },
          {
            "name": "cumulativeSecondsWithEmptyLiquidityReward",
            "docs": [
              "Accumulated seconds where when farm distribute rewards, but the bin is empty. The reward will be accumulated for next reward time window."
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "InitTokenParams",
      "type": {
        "kind": "struct",
        "fields": [
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
          },
          {
            "name": "decimals",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "Rounding",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Up"
          },
          {
            "name": "Down"
          }
        ]
      }
    },
    {
      "name": "PairType",
      "docs": [
        "Type of the Pair. 0 = Permissionless, 1 = Permission. Putting 0 as permissionless for backward compatibility."
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Permissionless"
          },
          {
            "name": "Permission"
          }
        ]
      }
    },
    {
      "name": "PairStatus",
      "docs": [
        "Pair status. 0 = Enabled, 1 = Disabled. Putting 0 as enabled for backward compatibility."
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Enabled"
          },
          {
            "name": "Disabled"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "InitializeEvent",
      "fields": [
        {
          "name": "data",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "AddLiquidityEvent",
      "fields": [
        {
          "name": "data",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "BuyEvent",
      "fields": [
        {
          "name": "data",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "CreatePoolEvent",
      "fields": [
        {
          "name": "data",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "RemoveLiquidityEvent",
      "fields": [
        {
          "name": "data",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "SellEvent",
      "fields": [
        {
          "name": "data",
          "type": "string",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "DuplicateTokenNotAllowed",
      "msg": "Duplicate tokens are not allowed"
    },
    {
      "code": 6001,
      "name": "FailedToAllocateShares",
      "msg": "Failed to allocate shares"
    },
    {
      "code": 6002,
      "name": "FailedToDeallocateShares",
      "msg": "Failed to deallocate shares"
    },
    {
      "code": 6003,
      "name": "InsufficientShares",
      "msg": "Insufficient shares"
    },
    {
      "code": 6004,
      "name": "InsufficientFunds",
      "msg": "Insufficient funds to swap"
    },
    {
      "code": 6005,
      "name": "InvalidAmount",
      "msg": "Invalid amount to swap"
    },
    {
      "code": 6006,
      "name": "InvalidFee",
      "msg": "Invalid fee"
    },
    {
      "code": 6007,
      "name": "FailedToAddLiquidity",
      "msg": "Failed to add liquidity"
    },
    {
      "code": 6008,
      "name": "FailedToRemoveLiquidity",
      "msg": "Failed to remove liquidity"
    },
    {
      "code": 6009,
      "name": "NotEnoughToRemove",
      "msg": "Sold token is not enough to remove pool"
    },
    {
      "code": 6010,
      "name": "NotCreator",
      "msg": "Not a pool creator"
    },
    {
      "code": 6011,
      "name": "OverflowOrUnderflowOccurred",
      "msg": "Overflow or underflow occured"
    },
    {
      "code": 6012,
      "name": "TokenAmountToSellTooBig",
      "msg": "Token amount is too big to sell"
    },
    {
      "code": 6013,
      "name": "NotEnoughSolInVault",
      "msg": "SOL is not enough in vault"
    },
    {
      "code": 6014,
      "name": "NotEnoughTokenInVault",
      "msg": "Token is not enough in vault"
    },
    {
      "code": 6015,
      "name": "NegativeNumber",
      "msg": "Amount is negative"
    },
    {
      "code": 6016,
      "name": "NonPresetBinStep",
      "msg": "Non preset bin step"
    },
    {
      "code": 6017,
      "name": "InvalidInput",
      "msg": "Invalid input data"
    },
    {
      "code": 6018,
      "name": "MathOverflow",
      "msg": "Math operation overflow"
    },
    {
      "code": 6019,
      "name": "TypeCastFailed",
      "msg": "Type cast error"
    },
    {
      "code": 6020,
      "name": "ExcessiveFeeUpdate",
      "msg": "Excessive fee update"
    }
  ]
};

export const IDL: BondingCurve = {
  "version": "0.1.0",
  "name": "bonding_curve",
  "instructions": [
    {
      "name": "initToken",
      "accounts": [
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "metadata",
          "type": {
            "defined": "InitTokenParams"
          }
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fee",
          "type": "f64"
        }
      ]
    },
    {
      "name": "createPool",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "addLiquidity",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolSolVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createMeteoraPool",
      "accounts": [
        {
          "name": "lbPair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "binArrayBitmapExtension",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "tokenMintX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMintY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reserveX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presetParameter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "funder",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "dlmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "activeId",
          "type": "i32"
        },
        {
          "name": "binStep",
          "type": "u16"
        }
      ]
    },
    {
      "name": "buy",
      "accounts": [
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolSolVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "sell",
      "accounts": [
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolSolVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "binArrayBitmapExtension",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lbPair",
            "type": "publicKey"
          },
          {
            "name": "positiveBinArrayBitmap",
            "docs": [
              "Packed initialized bin array state for start_bin_index is positive"
            ],
            "type": {
              "array": [
                {
                  "array": [
                    "u64",
                    8
                  ]
                },
                12
              ]
            }
          },
          {
            "name": "negativeBinArrayBitmap",
            "docs": [
              "Packed initialized bin array state for start_bin_index is negative"
            ],
            "type": {
              "array": [
                {
                  "array": [
                    "u64",
                    8
                  ]
                },
                12
              ]
            }
          }
        ]
      }
    },
    {
      "name": "lbPair",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "parameters",
            "type": {
              "defined": "StaticParameters"
            }
          },
          {
            "name": "vParameters",
            "type": {
              "defined": "VariableParameters"
            }
          },
          {
            "name": "bumpSeed",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          },
          {
            "name": "binStepSeed",
            "docs": [
              "Bin step signer seed"
            ],
            "type": {
              "array": [
                "u8",
                2
              ]
            }
          },
          {
            "name": "pairType",
            "docs": [
              "Type of the pair"
            ],
            "type": "u8"
          },
          {
            "name": "activeId",
            "docs": [
              "Active bin id"
            ],
            "type": "i32"
          },
          {
            "name": "binStep",
            "docs": [
              "Bin step. Represent the price increment / decrement."
            ],
            "type": "u16"
          },
          {
            "name": "status",
            "docs": [
              "Status of the pair. Check PairStatus enum."
            ],
            "type": "u8"
          },
          {
            "name": "requireBaseFactorSeed",
            "type": "u8"
          },
          {
            "name": "baseFactorSeed",
            "type": {
              "array": [
                "u8",
                2
              ]
            }
          },
          {
            "name": "padding1",
            "type": {
              "array": [
                "u8",
                2
              ]
            }
          },
          {
            "name": "tokenXMint",
            "docs": [
              "Token X mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "tokenYMint",
            "docs": [
              "Token Y mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "reserveX",
            "docs": [
              "LB token X vault"
            ],
            "type": "publicKey"
          },
          {
            "name": "reserveY",
            "docs": [
              "LB token Y vault"
            ],
            "type": "publicKey"
          },
          {
            "name": "protocolFee",
            "docs": [
              "Uncollected protocol fee"
            ],
            "type": {
              "defined": "ProtocolFee"
            }
          },
          {
            "name": "feeOwner",
            "docs": [
              "Protocol fee owner,"
            ],
            "type": "publicKey"
          },
          {
            "name": "rewardInfos",
            "docs": [
              "Farming reward information"
            ],
            "type": {
              "array": [
                {
                  "defined": "RewardInfo"
                },
                2
              ]
            }
          },
          {
            "name": "oracle",
            "docs": [
              "Oracle pubkey"
            ],
            "type": "publicKey"
          },
          {
            "name": "binArrayBitmap",
            "docs": [
              "Packed initialized bin array state"
            ],
            "type": {
              "array": [
                "u64",
                16
              ]
            }
          },
          {
            "name": "lastUpdatedAt",
            "docs": [
              "Last time the pool fee parameter was updated"
            ],
            "type": "i64"
          },
          {
            "name": "whitelistedWallet",
            "docs": [
              "Whitelisted wallet"
            ],
            "type": "publicKey"
          },
          {
            "name": "preActivationSwapAddress",
            "docs": [
              "Address allowed to swap when the current slot is greater than or equal to the pre-activation slot. The pre-activation slot is calculated as `activation_slot - pre_activation_slot_duration`."
            ],
            "type": "publicKey"
          },
          {
            "name": "baseKey",
            "docs": [
              "Base keypair. Only required for permission pair"
            ],
            "type": "publicKey"
          },
          {
            "name": "activationSlot",
            "docs": [
              "Slot to enable the pair. Only applicable for permission pair."
            ],
            "type": "u64"
          },
          {
            "name": "preActivationSlotDuration",
            "docs": [
              "Number of slot before activation slot. Used to calculate pre-activation slot for pre_activation_swap_address"
            ],
            "type": "u64"
          },
          {
            "name": "padding2",
            "docs": [
              "_padding2 is reclaimed free space from swap_cap_deactivate_slot and swap_cap_amount before, BE CAREFUL FOR TOMBSTONE WHEN REUSE !!"
            ],
            "type": {
              "array": [
                "u8",
                8
              ]
            }
          },
          {
            "name": "lockDurationsInSlot",
            "docs": [
              "Liquidity lock duration for positions which created before activate. Only applicable for permission pair."
            ],
            "type": "u64"
          },
          {
            "name": "creator",
            "docs": [
              "Pool creator"
            ],
            "type": "publicKey"
          },
          {
            "name": "reserved",
            "docs": [
              "Reserved space for future use"
            ],
            "type": {
              "array": [
                "u8",
                24
              ]
            }
          }
        ]
      }
    },
    {
      "name": "oracle",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "idx",
            "docs": [
              "Index of latest observation slot"
            ],
            "type": "u64"
          },
          {
            "name": "activeSize",
            "docs": [
              "Size of active sample. Active sample is initialized observation."
            ],
            "type": "u64"
          },
          {
            "name": "length",
            "docs": [
              "Number of observations"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "presetParameter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "binStep",
            "docs": [
              "Bin step. Represent the price increment / decrement."
            ],
            "type": "u16"
          },
          {
            "name": "baseFactor",
            "docs": [
              "Used for base fee calculation. base_fee_rate = base_factor * bin_step"
            ],
            "type": "u16"
          },
          {
            "name": "filterPeriod",
            "docs": [
              "Filter period determine high frequency trading time window."
            ],
            "type": "u16"
          },
          {
            "name": "decayPeriod",
            "docs": [
              "Decay period determine when the volatile fee start decay / decrease."
            ],
            "type": "u16"
          },
          {
            "name": "reductionFactor",
            "docs": [
              "Reduction factor controls the volatile fee rate decrement rate."
            ],
            "type": "u16"
          },
          {
            "name": "variableFeeControl",
            "docs": [
              "Used to scale the variable fee component depending on the dynamic of the market"
            ],
            "type": "u32"
          },
          {
            "name": "maxVolatilityAccumulator",
            "docs": [
              "Maximum number of bin crossed can be accumulated. Used to cap volatile fee rate."
            ],
            "type": "u32"
          },
          {
            "name": "minBinId",
            "docs": [
              "Min bin id supported by the pool based on the configured bin step."
            ],
            "type": "i32"
          },
          {
            "name": "maxBinId",
            "docs": [
              "Max bin id supported by the pool based on the configured bin step."
            ],
            "type": "i32"
          },
          {
            "name": "protocolShare",
            "docs": [
              "Portion of swap fees retained by the protocol by controlling protocol_share parameter. protocol_swap_fee = protocol_share * total_swap_fee"
            ],
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "curveConfiguration",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fees",
            "type": "f64"
          }
        ]
      }
    },
    {
      "name": "liquidityProvider",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "shares",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "liquidityPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "token",
            "type": "publicKey"
          },
          {
            "name": "totalSupply",
            "type": "u64"
          },
          {
            "name": "reserveToken",
            "type": "u64"
          },
          {
            "name": "reserveSol",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Observation",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "cumulativeActiveBinId",
            "docs": [
              "Cumulative active bin ID"
            ],
            "type": "i128"
          },
          {
            "name": "createdAt",
            "docs": [
              "Observation sample created timestamp"
            ],
            "type": "i64"
          },
          {
            "name": "lastUpdatedAt",
            "docs": [
              "Observation sample last updated timestamp"
            ],
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "FeeParameter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "protocolShare",
            "docs": [
              "Portion of swap fees retained by the protocol by controlling protocol_share parameter. protocol_swap_fee = protocol_share * total_swap_fee"
            ],
            "type": "u16"
          },
          {
            "name": "baseFactor",
            "docs": [
              "Base factor for base fee rate"
            ],
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "StaticParameters",
      "docs": [
        "Parameter that set by the protocol"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "baseFactor",
            "docs": [
              "Used for base fee calculation. base_fee_rate = base_factor * bin_step"
            ],
            "type": "u16"
          },
          {
            "name": "filterPeriod",
            "docs": [
              "Filter period determine high frequency trading time window."
            ],
            "type": "u16"
          },
          {
            "name": "decayPeriod",
            "docs": [
              "Decay period determine when the volatile fee start decay / decrease."
            ],
            "type": "u16"
          },
          {
            "name": "reductionFactor",
            "docs": [
              "Reduction factor controls the volatile fee rate decrement rate."
            ],
            "type": "u16"
          },
          {
            "name": "variableFeeControl",
            "docs": [
              "Used to scale the variable fee component depending on the dynamic of the market"
            ],
            "type": "u32"
          },
          {
            "name": "maxVolatilityAccumulator",
            "docs": [
              "Maximum number of bin crossed can be accumulated. Used to cap volatile fee rate."
            ],
            "type": "u32"
          },
          {
            "name": "minBinId",
            "docs": [
              "Min bin id supported by the pool based on the configured bin step."
            ],
            "type": "i32"
          },
          {
            "name": "maxBinId",
            "docs": [
              "Max bin id supported by the pool based on the configured bin step."
            ],
            "type": "i32"
          },
          {
            "name": "protocolShare",
            "docs": [
              "Portion of swap fees retained by the protocol by controlling protocol_share parameter. protocol_swap_fee = protocol_share * total_swap_fee"
            ],
            "type": "u16"
          },
          {
            "name": "padding",
            "docs": [
              "Padding for bytemuck safe alignment"
            ],
            "type": {
              "array": [
                "u8",
                6
              ]
            }
          }
        ]
      }
    },
    {
      "name": "VariableParameters",
      "docs": [
        "Parameters that changes based on dynamic of the market"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "volatilityAccumulator",
            "docs": [
              "Volatility accumulator measure the number of bin crossed since reference bin ID. Normally (without filter period taken into consideration), reference bin ID is the active bin of last swap.",
              "It affects the variable fee rate"
            ],
            "type": "u32"
          },
          {
            "name": "volatilityReference",
            "docs": [
              "Volatility reference is decayed volatility accumulator. It is always <= volatility_accumulator"
            ],
            "type": "u32"
          },
          {
            "name": "indexReference",
            "docs": [
              "Active bin id of last swap."
            ],
            "type": "i32"
          },
          {
            "name": "padding",
            "docs": [
              "Padding for bytemuck safe alignment"
            ],
            "type": {
              "array": [
                "u8",
                4
              ]
            }
          },
          {
            "name": "lastUpdateTimestamp",
            "docs": [
              "Last timestamp the variable parameters was updated"
            ],
            "type": "i64"
          },
          {
            "name": "padding1",
            "docs": [
              "Padding for bytemuck safe alignment"
            ],
            "type": {
              "array": [
                "u8",
                8
              ]
            }
          }
        ]
      }
    },
    {
      "name": "ProtocolFee",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amountX",
            "type": "u64"
          },
          {
            "name": "amountY",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "RewardInfo",
      "docs": [
        "Stores the state relevant for tracking liquidity mining rewards"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "docs": [
              "Reward token mint."
            ],
            "type": "publicKey"
          },
          {
            "name": "vault",
            "docs": [
              "Reward vault token account."
            ],
            "type": "publicKey"
          },
          {
            "name": "funder",
            "docs": [
              "Authority account that allows to fund rewards"
            ],
            "type": "publicKey"
          },
          {
            "name": "rewardDuration",
            "docs": [
              "TODO check whether we need to store it in pool"
            ],
            "type": "u64"
          },
          {
            "name": "rewardDurationEnd",
            "docs": [
              "TODO check whether we need to store it in pool"
            ],
            "type": "u64"
          },
          {
            "name": "rewardRate",
            "docs": [
              "TODO check whether we need to store it in pool"
            ],
            "type": "u128"
          },
          {
            "name": "lastUpdateTime",
            "docs": [
              "The last time reward states were updated."
            ],
            "type": "u64"
          },
          {
            "name": "cumulativeSecondsWithEmptyLiquidityReward",
            "docs": [
              "Accumulated seconds where when farm distribute rewards, but the bin is empty. The reward will be accumulated for next reward time window."
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "InitTokenParams",
      "type": {
        "kind": "struct",
        "fields": [
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
          },
          {
            "name": "decimals",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "Rounding",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Up"
          },
          {
            "name": "Down"
          }
        ]
      }
    },
    {
      "name": "PairType",
      "docs": [
        "Type of the Pair. 0 = Permissionless, 1 = Permission. Putting 0 as permissionless for backward compatibility."
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Permissionless"
          },
          {
            "name": "Permission"
          }
        ]
      }
    },
    {
      "name": "PairStatus",
      "docs": [
        "Pair status. 0 = Enabled, 1 = Disabled. Putting 0 as enabled for backward compatibility."
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Enabled"
          },
          {
            "name": "Disabled"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "InitializeEvent",
      "fields": [
        {
          "name": "data",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "AddLiquidityEvent",
      "fields": [
        {
          "name": "data",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "BuyEvent",
      "fields": [
        {
          "name": "data",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "CreatePoolEvent",
      "fields": [
        {
          "name": "data",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "RemoveLiquidityEvent",
      "fields": [
        {
          "name": "data",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "SellEvent",
      "fields": [
        {
          "name": "data",
          "type": "string",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "DuplicateTokenNotAllowed",
      "msg": "Duplicate tokens are not allowed"
    },
    {
      "code": 6001,
      "name": "FailedToAllocateShares",
      "msg": "Failed to allocate shares"
    },
    {
      "code": 6002,
      "name": "FailedToDeallocateShares",
      "msg": "Failed to deallocate shares"
    },
    {
      "code": 6003,
      "name": "InsufficientShares",
      "msg": "Insufficient shares"
    },
    {
      "code": 6004,
      "name": "InsufficientFunds",
      "msg": "Insufficient funds to swap"
    },
    {
      "code": 6005,
      "name": "InvalidAmount",
      "msg": "Invalid amount to swap"
    },
    {
      "code": 6006,
      "name": "InvalidFee",
      "msg": "Invalid fee"
    },
    {
      "code": 6007,
      "name": "FailedToAddLiquidity",
      "msg": "Failed to add liquidity"
    },
    {
      "code": 6008,
      "name": "FailedToRemoveLiquidity",
      "msg": "Failed to remove liquidity"
    },
    {
      "code": 6009,
      "name": "NotEnoughToRemove",
      "msg": "Sold token is not enough to remove pool"
    },
    {
      "code": 6010,
      "name": "NotCreator",
      "msg": "Not a pool creator"
    },
    {
      "code": 6011,
      "name": "OverflowOrUnderflowOccurred",
      "msg": "Overflow or underflow occured"
    },
    {
      "code": 6012,
      "name": "TokenAmountToSellTooBig",
      "msg": "Token amount is too big to sell"
    },
    {
      "code": 6013,
      "name": "NotEnoughSolInVault",
      "msg": "SOL is not enough in vault"
    },
    {
      "code": 6014,
      "name": "NotEnoughTokenInVault",
      "msg": "Token is not enough in vault"
    },
    {
      "code": 6015,
      "name": "NegativeNumber",
      "msg": "Amount is negative"
    },
    {
      "code": 6016,
      "name": "NonPresetBinStep",
      "msg": "Non preset bin step"
    },
    {
      "code": 6017,
      "name": "InvalidInput",
      "msg": "Invalid input data"
    },
    {
      "code": 6018,
      "name": "MathOverflow",
      "msg": "Math operation overflow"
    },
    {
      "code": 6019,
      "name": "TypeCastFailed",
      "msg": "Type cast error"
    },
    {
      "code": 6020,
      "name": "ExcessiveFeeUpdate",
      "msg": "Excessive fee update"
    }
  ]
};
