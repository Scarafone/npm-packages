#!/usr/bin/env node
/**
 * cryptography.js
 * 
 * References: 
 * - https://nodejs.org/api/crypto.html#determining-if-crypto-support-is-unavailable
 * - https://nodejs.org/en/knowledge/cryptography/how-to-use-crypto-module/
 * 
 */

const { readFile, writeFile } = require('@scarafone/files-helper')

// Common delimiter for the crypto algorithm
const delimiter = '\n'
// Hashing algo
const hashAlgo = "sha256"
// Cipher IV Algo
const cipherIVAlgo = "aes256"

/**
 * 
 * @since 0.0.1
 * 
 * Test for built in crypto library in supported node versions
 * https://nodejs.org/api/crypto.html#determining-if-crypto-support-is-unavailable
 */
function getCryptography() {
    try {
        const crypto = require('node:crypto')
        return crypto
    } catch (err) {
        throw new Error('Your version of node does not support the crypto library, please use a version of node that includes this package try the operation again.')
    }
}

/**
 * Encrypt
 * 
 * Encrypt a source to a destination with a private key
 * 
 * @since 0.0.1
 * @updated 1.0.0
 * 
 * @param {string} source 
 * @param {string} destination 
 */
function Encrypt(source, destination, privateKey, options = { silent: true }) {

    if (!source || !destination || !privateKey) {
        throw new Error(`Missing required values${!source ? ", a source" : ""}${!destination ? ", a destination" : ""}${!privateKey ? ", a private key" : ""}`)
    }

    const crypto = getCryptography()

    // Create buffer for storage with initializing vector
    const resizeIV = Buffer.allocUnsafe(16)
    const key = crypto.createHash(hashAlgo).update(privateKey).digest()
    const cipher = crypto.createCipheriv(cipherIVAlgo, key, resizeIV)

    // Run encryption steps
    !options.silent && process.stdout.write("Encrypting source...")
    const sourceRef = readFile(source, null, false)
    const parts = sourceRef.toString().split('\n')
    const builder = []
    parts.forEach(part => builder.push(cipher.update(part, 'binary', 'hex')))
    builder.push(cipher.final('hex'))
    const result = builder.join(delimiter)
    const encodedString = btoa(result);
    writeFile(destination, encodedString, true, false)
    !options.silent && process.stdout.write("done!\n")

}

/**
 * Decrypt
 * 
 * @since 0.0.1
 * @updated 1.0.0
 * 
 * Decrypt a source to a destination with a private key
 * 
 * This function will currently only decrypt items that have been encrypted with the matching `Encrypt` function exported from the same file. 
 * 
 * 
 * @param {string} source // The file location to save the file at
 * @param {string} destination // The location to save the file to
 * @param {string} privateKey // The private key used to encrypt the data
 * @param {object} options // options = { silent: true }  
 */
function Decrypt(source, destination, privateKey, options = { silent: false }) {

    if (!source || !destination || !privateKey) {
        throw new Error(`Missing required values${!source ? ", a source" : ""}${!destination ? ", a destination" : ""}${!privateKey ? ", a private key" : ""}`)
    }

    const crypto = getCryptography()

    // Create buffer for storage with initializing vector
    const resizeIV = Buffer.allocUnsafe(16)
    const key = crypto.createHash(hashAlgo).update(privateKey).digest()
    const decipher = crypto.createDecipheriv(cipherIVAlgo, key, resizeIV)

    // Run decryption steps
    !options.silent && process.stdout.write("Decrypting source...", false)
    const sourceRef = readFile(source, null, false)
    const decodedString = atob(sourceRef.toString());
    const parts = decodedString.split(delimiter)
    const builder = []
    parts.forEach(part => builder.push(decipher.update(part, 'hex', 'binary')))
    builder.push(decipher.final('binary'))
    const result = builder.join('')
    writeFile(destination, result, true, false)
    !options.silent && process.stdout.write("done!\n")
}

module.exports = {
    Decrypt,
    Encrypt,
}