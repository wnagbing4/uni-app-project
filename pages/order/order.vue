<template>
	<view>
		<view class="od-banner">
			<image class="od-banner-icon" src="/static/images/od_bg_icon.png" mode="widthFix" />
			<view :class="'od-jd od-jd-' + orderStatus">
				<view class="od-jd-out">
					<view class="od-jd-in"></view>
				</view>
				<view class="vp-flex od-jd-text">
					<view class="vp-flex_1">
						<text class="od-jd-st-0">填写订单</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-10">在线支付</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-20">专人服务</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-30">服务完成</text>
					</view>
				</view>
			</view>
		</view>
		<view class="order-status">
			<!-- 待付款 -->
			<block v-if="orderStatus==10">
				<view><text class="od-st">订单待支付</text></view>
				<view class="od-stt">
					请在
					<counter style="font-size: 24rpx" :second="order._exp_time" @counterOver="onCounterOver" />
					内完成支付，超时订单自动取消
				</view>
				<view class="od-op">
					<button class="btnp" @click="doplay">立即支付({{order.price}}元)</button>
				</view>
			</block>
			<!-- 进行中 -->
			<block v-if="orderStatus==20">
				<block v-if="order.service_state==0">
					<view><text class="od-st">正在为您安排服务专员....</text></view>
					<view class="od-stt">请保持手机畅通，稍后将有服务专员与您联系</view>
				</block>
				<block v-if="order.service_state == 1">
					<view><text class="od-st">服务进行中</text></view>
					<view class="od-stt">已安排服务专员，将于预约时间进行服务</view>
				</block>
			</block>
			<!-- 已完成 -->
			<block v-if="orderStatus == 30">
				<view><text class="od-st">服务已完成</text></view>
				<view class="od-stt">感谢您的使用，如有售后问题请联系客服</view>
			</block>
			<!-- 已取消 -->
			<block v-if="orderStatus == 40">
				<view><text class="od-st">订单已取消</text></view>
				<view class="od-stt">期待下次为您服务，如需帮助可咨询客服</view>
			</block>
		</view>
		<block v-if="orderStatus == 20">
			<view class="od-box">
				<view class="weui-cells">
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label od-box-tt">本次服务专员</view>
						</view>
						<view class="weui-cell__bd"></view>
					</view>
					<view class="weui-cell od-staff">
						<view class="weui-cell__hd">
							<view>
								<image :src="order._staff.avatar_url" mode="aspectFill" class="od-staff-avatar" />
							</view>
						</view>
						<view class="weui-cell__bd">
							<view>{{ order._staff.nickname }}</view>
						</view>
						<view class="weui-cell__ft">
							<view>
								<button class="btn1m" @tap="makePhoneCall" :data-tel="order._staff.mobile">电话联系</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<uni-popup ref="qrcodePopup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="pay-box">
				<image @click="payment" src='../../static/images/modal_closer.png'
					style="display:block;width:30rpx;height:30rpx"></image>
				<view class="text-center">微信支付</view>
				<canvas id="qrcode" canvas-id="qrcode" style="width: 300rpx;height: 300rpx;"></canvas>
				<view class="text-center">请用本人微信扫描二维码</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		computed,
		toRaw
	} from "vue"
	import {
		onReady,
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import UQRCode from 'uqrcodejs';
	onLoad((params) => {
		getOrderDetail(params)
	})
	const qrcodePopup = ref()
	const doplay = () => {
		qrcodePopup.value.open('center')
		// 获取uQRCode实例
		const qr = new UQRCode();
		// 设置二维码内容
		qr.data = order.value.code_url;
		// 设置二维码大小，必须与canvas设置的宽高一致
		qr.size = 150;
		// 调用制作二维码方法
		qr.make();
		// 获取canvas上下文
		var canvasContext = uni.createCanvasContext('qrcode'); // 如果是组件，this必须传入
		// 设置uQRCode实例的canvas上下文
		qr.canvasContext = canvasContext;
		// 调用绘制方法将二维码图案绘制到canvas上
		qr.drawCanvas();
	}

	const payment = () => {
		uni.switchTab({
			url: '../order/index'
		})
	}
	const app = getApp()
	// 获取订单详情
	const order = ref({})
	const orderStatus = computed(() => {
		const map = {
			'待支付': '10',
			"待服务": '20',
			"已完成": '30',
			"已取消": '40',
		}
		return map[order.value.trade_state]
	})
	const onCounterOver = () => {
		getOrderDetail()
	}
	//  请求订单详情 
	const getOrderDetail = (params) => {
		app.globalData.utils.request({
			url: '/order/detail',
			header: {
				token: uni.getStorageSync('token')
			},
			data: {
				oid: params.oid
			},
			success: (res) => {
				console.log(res, '订单详情')
				order.value = res.data.data
			},

		})
	}
	const makePhoneCall=(e)=>{
		uni.makePhoneCall({
			phoneNumber:e.currentTarget.dataset.tel,
		})
	}
</script>

<style>
	@import "./order.css";
</style>