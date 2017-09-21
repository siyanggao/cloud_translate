var word = {
	insert:'INSERT INTO word( word,translate, image_path,publish_date,us_phonemes,uk_phonemes,us_phonemes_audio,uk_phonemes_audio,gmt_create,gmt_modified) VALUES(?,?,?,?,?,?,?,?,?,?)',
	update:'update word set word=?,translate=?, image_path=?, publish_date=?,us_phonemes=?,uk_phonemes=?,us_phonemes_audio=?,uk_phonemes_audio=?, gmt_modified=? where id=?',
	delete: 'delete from word where id=?',
	queryById: 'select * from word where id=?',
	queryAll: 'select * from word where order by id desc limit ?,?',
	queryCount:'select count(id) as count_value from word'
};

module.exports = word;