const db = require('../db');

module.exports=db.defineModel('messages',{
    message: db.STRING(200),
});