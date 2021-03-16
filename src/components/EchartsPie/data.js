export default {
	title: {
		text: '员工性别分布',
		left: 'left',
	},
	tooltip: {
		trigger: 'item',
	},
	legend: {
		orient: 'horizontal',
		left: 'right',
	},
	series: [
		{
			name: '访问来源',
			type: 'pie',
			radius: '60%',
			avoidLabelOverlap: false,
			data: [],
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)',
				},
			},
		},
	],
}