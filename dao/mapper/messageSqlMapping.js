var message = {
	insert:'INSERT INTO message( user_id, content,up_count,gmt_create, gmt_modified) VALUES(?,?,0,?,?)',
	delete: 'delete from message where id=?',
	queryById: 'select * from message where id=?',
	queryAll: 'select * from message where order by id desc limit ?,?',
	queryCount:'select count(id) as count_value from message'
};

module.exports = message;