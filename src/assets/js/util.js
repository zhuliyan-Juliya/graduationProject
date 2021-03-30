
/**
* 求两个日期之间相差 多少年 多少月 多少天
* @param {date} String - 时间格式得字符串
* @returns {String}
*/
export function computedBalanceDate (date) {
	let target = new Date(date).getTime()
	let now = new Date().getTime()
	let runTime = now - target
	let year = Math.floor(runTime / (365 * 24 * 60 * 60 * 1000))
	runTime = runTime % (365 * 24 * 60 * 60 * 1000)
	let month = Math.floor(runTime / (30 * 24 * 60 * 60 * 1000))
	runTime = runTime % (30 * 24 * 60 * 60 * 1000)
	let day = Math.floor(runTime / (24 * 60 * 60 * 1000));
	return `${year}年${month}月${day}天`
}

/**
* 求两个日期之间相差 多少天
* @param {date} String - 时间格式得字符串
* @returns {Number}
*/
export function computedBalanceDay (date) {
	let target = new Date(date).getTime()
	let now = new Date().getTime()
	let runTime = now - target
	let day = Math.floor(runTime / (24 * 60 * 60 * 1000))
	return day
}

/**
* 根据身份证求年龄
* @param {IdCard} String - 身份证号
* @returns {Number}
*/
export function computedAge (IdCard = '') {
	let now = new Date().getFullYear()
	let age = null
	switch (IdCard.length) {
		case 15:
			age = '19' + IdCard.substr(6, 2)
			return now - age
		case 18:
			age = IdCard.substr(6, 4)
			return now - age
		default:
			return 0
	}
}

/**
* 根据身份证计算年代
* @param {IdCard} String - 身份证号
* @returns {Number}
*/
export function computedTime (IdCard = '') {
	let time = null
	switch (IdCard.length) {
		case 15:
			time = IdCard.substr(6, 1) + '0'
			return time
		case 18:
			time = IdCard.substr(8, 1) + '0'
			return time
		default:
			return '0'
	}
}