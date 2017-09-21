var article = {
	insert:'INSERT INTO article(title,origin,publish_date,content,content_brief,image_path,gmt_create,gmt_modified) VALUES(?,?,?,?,?,?,?,?)',
	update:'update article set title=?, origin=?, publish_date=?, content=?, content_brief=?, image_path=? where id=?',
	delete: 'delete from article where id=?',
	queryById: 'select * from article where id=?',
	queryAll: 'select * from article where order by id desc limit ?,?',
	queryCount:'select count(id) as count_value from article'
};

module.exports = article;