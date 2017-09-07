var user = {
	insert:'INSERT INTO user( username, pwd) VALUES(?,?)',
	update:'update user set name=?, age=? where id=?',
	delete: 'delete from user where id=?',
	queryById: 'select * from user where id=?',
	queryAll: 'select * from user',
	getByUsername:'select * from user where username=?'
};

module.exports = user;