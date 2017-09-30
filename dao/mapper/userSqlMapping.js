var user = {
	insert:'INSERT INTO user( username, pwd) VALUES(?,?)',
	update:'update user set value where id=?',
	delete: 'delete from user where id=?',
	queryById: 'select * from user where id=?',
	queryAll: 'select * from user where limit ?,?',
	queryCount:'select count(id) as count_value from user',
	getByUsername:'select * from user where username=?',
	updateToken:'update user set token=?,gmt_modified=? where id=?',
	queryByToken:'select * from user where token=?'
};

module.exports = user;