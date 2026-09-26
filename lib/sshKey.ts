import {utils} from 'ssh2';

export function getSSHKeyType(privateKeyPem: string): { keyType: string; bits?: number } {
    try {
        const parsed = utils.parseKey(privateKeyPem);

        if (parsed instanceof Error) {
            console.error(parsed);
            return {
                keyType: 'Unknown',
            };
        }

        const key = Array.isArray(parsed) ? parsed[0] : parsed;

        switch (key.type) {
            case 'ssh-rsa':
                return {
                    keyType: 'RSA',
                    bits: key.getPublicSSH().length * 8,
                };

            case 'ssh-ed25519':
                return {
                    keyType: 'Ed25519',
                    bits: 256,
                };

            default:
                return {
                    keyType: key.type,
                };
        }
    } catch {
        return {
            keyType: 'Unknown',
        };
    }
}