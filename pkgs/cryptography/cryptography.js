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
    const crypto = getCryptography();

    const iv = crypto.randomBytes(16); // Generate a random IV
    const key = crypto.createHash(hashAlgo).update(privateKey).digest();
    const cipher = crypto.createCipheriv(cipherIVAlgo, key, iv);

    const sourceRef = readFile(source, null, false);
    const encrypted = cipher.update(sourceRef.toString(), 'utf8', 'hex') + cipher.final('hex');

    // Combine IV and encrypted data
    const dataToStore = {
        iv: iv.toString('hex'),
        encrypted,
    };

    writeFile(destination, btoa(JSON.stringify(dataToStore)), true, false);
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
    const crypto = getCryptography();

    const sourceRef = readFile(source, null, false);
    const { iv, encrypted } = JSON.parse(atob(sourceRef.toString()));

    const key = crypto.createHash(hashAlgo).update(privateKey).digest();
    const decipher = crypto.createDecipheriv(cipherIVAlgo, key, Buffer.from(iv, 'hex'));

    const decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');

    writeFile(destination, decrypted, true, false);
}




module.exports = {
    Decrypt,
    Encrypt,
}