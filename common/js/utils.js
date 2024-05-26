class Utils {
	constructor() {
		this.baseUrl = 'https://code.itndedu.com/pz/'
	}
	// 获取用户信息
	getUserInfo() {
		// 调用登录的API
		uni.login({
			success: (res) => {
				this.request({
					url: 'auth/wxLogin',
					data: {
						code: res.code
					},
					success: res => {}
				})
			}
		})
	}
	// 封装请求方法
	request(option = {
		showLoading: false
	}) {
		// 判断 url 是否存在
		if (!option.url) return false
		if (option.showLoading) this.showLoading()
		uni.request({
			url: this.baseUrl + option.url,
			data: option.data ? option.data : {},
			header: option.header ? option.header : {},
			method: option.method ? option.method : 'GET',
			success: (response) => {
				uni.hideLoading()
				// 后端返回的数据异常
				if (response.data.code != 10000) {
					// 将失败的结果返回出去
					if (option.fail && typeof option.fail == 'function') {
						option.fail(response)
					}
				} else {
					if (option.success && typeof option.success == 'function') {
						option.success(response)
					}
				}
			},
			fail: (response) => {
				uni.hideLoading()
			}
		})
	}
	// 创建加载的 Loading 效果
	showLoading() {
		const isShowLoading = uni.getStorageSync('isShowLoading')
		if (isShowLoading) {
			uni.hideLoading()
			uni.setStorageSync('isShowLoading', false)
		}
		uni.showLoading({
			title: '加载中...',
			complete: function() {
				uni.setStorageSync('isShowLoading', true)
			},
			fail: function() {
				uni.setStorageSync('isShowLoading', false)
			}
		})
	}
}

export default new Utils()