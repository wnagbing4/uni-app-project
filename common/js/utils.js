class Utils {
	constructor() {
		this.baseUrl = 'http://159.75.169.224:7300/pz'
	}
	getUserInfo() {
		uni.login({
			success: (res) => {
				this.request({
					url: '/auth/wxLogin',
					data: {
						code: res.code
					},
					success: res => {
						console.log(res, 'res');
					}
				})
			}
		})
	}
	request(option = {
		showloading: false
	}) {
		if (!option.url) {
			return false
		}
		uni.request({
			url: this.baseUrl + option.url,
			data: option.data ? option.data : {},
			header: option.header ? option.header : {},
			method: option.method ? option.method : 'GET',
			success: (response) => {
				if (response.data.code != 10000) {
					// 将失败的结果返回出去
					if (option.fail && typeof option.fail == "function") {
						option.fail(response)
					}
				} else {
					// 将成功的结果返回出去
					if (option.success && typeof option.success == "function") {
						option.success(response)
					}
				}
			}


		})
	}
	showloading() {
		const isShowLoading = uni.getStorageSync('isShowLoading')
		if (isShowLoading) {
			uni.hideLoading()
			uni.setStorageSync('isShowLoading', false)
		}
		uni.showLoading({
			title: '加载中...',
			complete: () => {
				uni.setStorageSync('isShowLoading', true)
			},
			fail: () => {
				uni.setStorageSync('isShowLoading', false)
			}
		})
	}
}
export default new Utils()