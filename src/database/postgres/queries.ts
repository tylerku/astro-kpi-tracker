

// Time Blocks Queries
const INSERT_NEW_TIME_BLOCK = (userId: number) => `INSERT INTO time_block (start, user_id) VALUES (CURRENT_TIMESTAMP, ${userId});`

// Users Queries
const FIND_USER_WITH_AUTH_ID = (authProviderId: string) => `SELECT * FROM users WHERE auth_provider_id = '${authProviderId}';`
const CREATE_USER = (firstName: string, lastName: string, authProviderId: string, email: string) => `
INSERT INTO users (first_name, last_name, auth_provider_id, email) 
VALUES ('${firstName}', '${lastName}', '${authProviderId}', '${email}') 
RETURNING first_name, last_name, auth_provider_id, email;`

export default {
  timeBlocks: {
    insertNewTimeBlock: INSERT_NEW_TIME_BLOCK
  },
  users: {
    findUserWithAuthProviderId: FIND_USER_WITH_AUTH_ID,
    createUser: CREATE_USER
  }
}