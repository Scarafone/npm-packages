
/**
 * Script to encrypt environment variables
 */

// import { Decrypt } from '@scarafone/cryptography';
const { Decrypt } = require('../pkgs/cryptography');


async function Main() {

    const devEnv = '.env.dev';
    const destination = `.env.encrypted`;
    const privateKey = '../.secrets/private.key';

    try {
        await Decrypt(destination, devEnv, privateKey);
    } catch (err) {
        console.error(err);
    }

}

Main();

