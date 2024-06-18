import { AES, enc } from 'crypto-js'
// crear accion para emcripcion errada
export function encode (palabra: string, secretKey:string): string {
  return AES.encrypt(palabra, secretKey).toString()
}

export function decode (cifrado: string, secretKey:string): string {
  return AES.decrypt(cifrado, secretKey).toString(enc.Utf8)
}

export const checkDecodeKey = (secretKey: string, word: string) => {
  try {
    const decoded = decode(word, secretKey)
    if (decoded === '') {
      return false
    }
    return true
  } catch (error) {
    return false
  }
}
