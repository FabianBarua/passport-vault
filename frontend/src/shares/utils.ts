import { AES, enc } from 'crypto-js'

export function encode (palabra: string, secretKey:string): string {
  return AES.encrypt(palabra, secretKey).toString()
}

export function decode (cifrado: string, secretKey:string): string {
  return AES.decrypt(cifrado, secretKey).toString(enc.Utf8)
}
