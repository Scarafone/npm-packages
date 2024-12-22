
/**
 * Script to encrypt environment variables
 */

// import { Encrypt } from '@scarafone/cryptography';

const { Encrypt } = require('../pkgs/cryptography');

async function Main() {

    const devEnv = '.env.source';
    const destination = `.env.encrypted`;
    const privateKey = '../.secrets/private.key';

    try {
        await Encrypt(devEnv, destination, privateKey);
    } catch (err) {
        console.error(err);
    }

}

Main();

