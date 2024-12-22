
/**
 * Script to encrypt environment variables
 */

import { Encrypt } from '../pkgs/cryptography/cryptography';


async function Main() {

    const devEnv = '.env';
    const destination = `${devEnv}.encrypted`;
    const privateKey = '../.secrets/private.key';

    try {
        await Encrypt(devEnv, destination, privateKey);
    } catch (err) {
        console.error(err);
    }

}

Main();

