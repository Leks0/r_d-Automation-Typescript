/**
 * Підготувати файл index.ts, у якому створити екземпляри класів і спробувати маніпулювати з обʼєктами через їхні методи
 */

import { fetchUserData  } from './api';
import { UserSummary } from './user-summary';
import { UserEntity } from './abstraction';

async function main(): Promise<void> {
    try {
        const userData = await fetchUserData(3);
        console.log(`Fetched data: ${JSON.stringify(userData)}`);

        const userSummary = new UserSummary(userData);
        console.log(`User summary: ${JSON.stringify(userSummary)}`);
        console.log(`User contacts: ${userSummary.getContact()}`);

        const userEntity = new UserEntity(
            userData.id,
            userData.name,
            userData.email
        );
        console.log(`User entity description: ${userEntity.getDescription()}`);
    } catch (error) {
        console.error(`Error in main: ${error}`);
    }
}

main();
