/** GET /:id - get detail of message.
 * 
 * 
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

const db = require("../db"); 
const expressError = require ("../expressError");



/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

 class Message {

    static async create({from_username, to_username, body}) {
    const result = await db.query(
        `INSERT INTO messages (
            from_username, 
            to_username, 
            body, 
            sent_at)
            VALUES ($1, $2, $3, current_timestamp)
            RETURNING id, from_username, to_username, body, sent_at`,
            [from_username, to_username, body]); 

        return result.rows[0];
    }

 }

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

static async markRead(id) {{
    const result = await db.query(
        `UPDATE messages
        SET read_at = current_timestamp
        WHERE id = $1
        RETURNING id, read_at`
    [id])); 

    if(!results.row[0]) {
        throw new ExpressError (`No such messge: $1{id}`, 404);
    }
    return results.row[0];
}

