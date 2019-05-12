
export default {
	name:'echart',
	props: {
		base: {
			type: String,
			default: 'https://cdn.bootcss.com'
		}
	},
	render () {
		return (
			<div id='echarts' style ='height:300px'></div>
		)
	},
	created () {
		
		this.addscript (this.base + '/echarts/4.2.1-rc.3/echarts.min.js', () => {
			this.initEchart ()
		})
	},
	methods: {
		addscript (url, callback) {
			let script = document.createElement('script')
			script.src = url
			script.type = "text\/javascript"
			callback && ( script.onload = callback )
			document.body.appendChild(script)
		},
		initEchart () {
			var option = {
			    title: {
			        text: '基础雷达图'
			    },
			    tooltip: {},
			   
			    radar: {
			        // shape: 'circle',
			        name: {
			            textStyle: {
			                color: '#fff',
			                backgroundColor: '#999',
			                borderRadius: 3,
			                padding: [3, 5]
			           }
			        },
			        indicator: [
			           { name: '销售（sales）', max: 6500},
			           { name: '管理（Administration）', max: 16000},
			           { name: '信息技术（Information Techology）', max: 30000},
			           { name: '客服（Customer Support）', max: 38000},
			           { name: '研发（Development）', max: 52000},
			           { name: '市场（Marketing）', max: 25000}
			        ]
			    },
			    series: [{
			        name: '预算 vs 开销（Budget vs spending）',
			        type: 'radar',
			        // areaStyle: {normal: {}},
			        data : [
			            {
			                value : [4300, 10000, 28000, 35000, 50000, 19000],
			                name : '预算分配（Allocated Budget）'
			            },
			             {
			                value : [5000, 14000, 28000, 31000, 42000, 21000],
			                name : '实际开销（Actual Spending）'
			            }
			        ]
			    }]
			};
			this.$nextTick(() => {
				this.instance= echarts.init(document.getElementById('echarts')).setOption(option)

			})
		}
	}
}