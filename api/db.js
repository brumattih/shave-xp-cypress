const { Pool } = require('pg')

const dbConfig = {
    host: 'motty.db.elephantsql.com',
    user: 'xfegitzw',
    password: 'vkvBocSowSooIhkNPu2nI5LNUXW_qqWT',
    database: 'xfegitzw',
    port: 5432
}

const pool = new Pool(dbConfig)

async function deleteUser(email) {
    await pool.query('DELETE FROM users WHERE email = $1', [email])
}

async function inserUser(user) {
    const sql = 'INSERT INTO users (name, email, password, is_shaver) VALUES ($1, $2, $3, $4) returning id'
    const data = [user.name, user.email, user.password, user.is_shaver]

    const result = await pool.query(sql, data)
    const { id } = result.rows[0]

    return id
}

async function findToken(email) {
    const sql = 'SELECT UT.token FROM users U INNER JOIN user_tokens UT ' +
    'ON U.id = UT.user_id WHERE U.email = $1 ORDER BY UT.created_at DESC LIMIT 1'

    const result = await pool.query(sql, [email])

    return result.rows[0]
}

module.exports = {
    deleteUser,
    inserUser,
    findToken
}