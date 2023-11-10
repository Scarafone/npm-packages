# Cryptography Package

I wanted to make a JavaScript version of a file encryption/decryption process.

## Usage

Add the package as a dev-dependency to your project
```
npm install @scarafone/cryptography --save-dev
```
You will need to generate a private key.


The **private key** is used to encrypt the file. This could be as simple as a word or phrase or as complicated as a random hash string. 

Now you can import it into your script to encrypt/decrypt a file
```
const { Decrypt, Encrypt } = require('./cryptography')

const privateKey = "your-super-cool-private-key"
const fileLocation = "./data/secret-data.txt"
const destLocation = "./data/secret-data.txt.encrypted 
Encrypt(fileLocation, destLocation, privateKey)
Decrypt(destLocation, fileLocation, privateKey)

```