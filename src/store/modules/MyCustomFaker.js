const { faker } = require('@faker-js/faker/locale/ru');

export default {
    getUsers(page, count_users) {
        let USERS_PAGE = {}
        let USERS = []
        Array.from({ length: count_users }).forEach(() => {
            USERS.push({
                id: faker.datatype.uuid(),
                first_name: faker.name.firstName(),
                second_name: faker.name.lastName(),
                tg_id: faker.random.numeric(10),
                role_id: faker.random.numeric(1)
            });
        });

        return USERS_PAGE = {
            current_page: page,
            total_pages: 7,
            count_users: count_users,
            total_users: 65,
            data: USERS,
            next_page: "url",
            prev_page: "url"
        }
    }
}

