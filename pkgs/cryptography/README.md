# Cryptography Package

I wanted to make a JavaScript version of a file encryption/decryption process.

# BREAKING CHANGE

Compared to the first version `0.0.1`, version `1.0.0` makes a big change to how items are encrypted and decrypted. If you have encrypted files using an earlier version, please continue to use that version as it has both a private and public key concept. 

If you wish to migrate to the newer version. I recommend decrypting your files with the older version, update to the new version and either use the same developer-token or generate a new one. Because we aren't using the second key you won't be able to just use the old token to decrypt.



## Usage

Add the package as a dev-dependency to your project
```
npm install @scarafone/cryptography --save-dev
```
You will need to generate a private key.


The **private key** is used to encrypt the file. This could be as simple as a word or phrase or as complicated as a random hash string. 

Now you can import it into your script to encrypt/decrypt a file


```
// CommonJS
const { Decrypt, Encrypt } = require('./cryptography')

// ES Modules
import { Decrypt, Encrypt } from './cryptography'

const privateKey = "your-super-cool-private-key"
const fileLocation = "./data/secret-data.txt"
const destLocation = "./data/secret-data.txt.encrypted 
Encrypt(fileLocation, destLocation, privateKey)
Decrypt(destLocation, fileLocation, privateKey)

```