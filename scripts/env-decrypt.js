
/**
 * Script to encrypt environment variables
 */

import { Decrypt } from '../pkgs/cryptography/cryptography';


async function Main() {

    const devEnv = '.env';
    const destination = `${devEnv}.encrypted`;
    const privateKey = '../.secrets/private.key';

    try {
        await Decrypt(destination, devEnv, privateKey);
    } catch (err) {
        console.error(err);
    }

}

Main();

