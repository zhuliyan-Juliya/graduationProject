/**
* 删除属性值为 “” 空的字段
* @param {Object} obj - 需要删除空字段的对象
* @returns {Object}
*/
export function deleteInvalidProp (obj) {
	for (let key in obj) {
		if (obj[key] === '') {
			delete obj[key]
		}
	}
	return obj
}