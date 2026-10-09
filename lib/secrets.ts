import crypto from "node:crypto"

const ENCRYPTED_PREFIX = "enc:v1:"
const ALGORITHM = "aes-256-gcm"

function getEncryptionKey() {
    const rawKey = process.env.QUASAR_ENCRYPTION_KEY
    if (!rawKey) {
        throw new Error("QUASAR_ENCRYPTION_KEY is not configured")
    }

    const key = Buffer.from(rawKey, "base64")
    if (key.length !== 32) {
        throw new Error("QUASAR_ENCRYPTION_KEY must be a base64-encoded 32-byte key")
    }

    return key
}

export function encryptSecret(value: string) {
    const iv = crypto.randomBytes(12)
    const cipher = crypto.createCipheriv(ALGORITHM, getEncryptionKey(), iv)
    const ciphertext = Buffer.concat([cipher.update(value, "utf8"), cipher.final()])
    const authTag = cipher.getAuthTag()

    return `${ENCRYPTED_PREFIX}${iv.toString("base64url")}.${authTag.toString("base64url")}.${ciphertext.toString("base64url")}`
}

export function decryptSecret(value: string) {
    if (!value.startsWith(ENCRYPTED_PREFIX)) {
        throw new Error("Secret is not encrypted")
    }

    const encoded = value.slice(ENCRYPTED_PREFIX.length).split(".")
    if (encoded.length !== 3) {
        throw new Error("Invalid encrypted secret")
    }

    const [ivEncoded, authTagEncoded, ciphertextEncoded] = encoded
    const decipher = crypto.createDecipheriv(
        ALGORITHM,
        getEncryptionKey(),
        Buffer.from(ivEncoded, "base64url"),
    )
    decipher.setAuthTag(Buffer.from(authTagEncoded, "base64url"))

    return Buffer.concat([
        decipher.update(Buffer.from(ciphertextEncoded, "base64url")),
        decipher.final(),
    ]).toString("utf8")
}
