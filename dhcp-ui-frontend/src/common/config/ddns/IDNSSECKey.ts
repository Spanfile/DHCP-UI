export enum DNSSECAlgorithm {
  HMAC_MD5 = "HMAC-MD5",
  HMAC_SHA1 = "HMAC-SHA1",
  HMAC_SHA224 = "HMAC-SHA224",
  HMAC_SHA256 = "HMAC-SHA256",
  HMAC_SHA384 = "HMAC-SHA384",
  HMAC_SHA512 = "HMAC-SHA512"
}

export interface IDNSSECKeys {
  [id: number]: IDNSSECKey;
}

export interface IDNSSECKey {
  name: string;
  algorithm: DNSSECAlgorithm;
  key: string;
}