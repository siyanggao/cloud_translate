var sentence = {
	insert:'INSERT INTO sentence( e_content, c_content,image_path,publish_date,gmt_create,gmt_modified) VALUES(?,?,?,?,?,?)',
	update:'update sentence set e_content=?, c_content=?, image_path=?,publish_date=?, gmt_modified=? where id=?',
	delete: 'delete from sentence where id=?',
	queryById: 'select * from sentence where id=?',
	queryAll: 'select * from sentence limit ?,?',
	queryCount:'select count(id) as count_value from sentence'
};

module.exports = sentence;