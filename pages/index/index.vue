<template>
	<view class="content">
		<navbar :isHome="true"></navbar>
		<view style="margin-top: 130rpx;">
			<view class="weui-cell" style="background: #fff9eb;">
				<view class="weui-cell_hd">
					<image src="../../static/resource/images/ic_myapp.png"></image>
				</view>
				<view class="weui-cell_bd">
					<text>点击右上角“添加到我的小程序”，方便下次找到！</text>
				</view>
				<view class="weui-cell_ft">
					<image src="../../static/resource/images/modal_closer.png"></image>
				</view>
			</view>
		</view>
		<view v-if="slides && slides.length>0" class="index-swiper">
			<swiper autoplay circular :interval="4000" :duration="500">
				<block v-for="(item, index) in slides" :key="index">
					<swiper-item>
						<image :src="item.pic_image_url" mode="widthFix" show-menu-by-longpress :data-index="index">
						</image>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<view v-if="nav2s && nav2s.length>0" class="nav2-list">
			<block v-for="(item,index) in nav2s" :key="index">
				<view class="nav2-item" @click="onNav2Tap" :data-index="index">
					<view class="nav2-pic">
						<image :src="item.pic_image_url" mode="widthFix"></image>
					</view>
				</view>
			</block>
		</view>
		<view v-if="navs && navs.length>0" class="nav-list">
			<block v-for="(item,index) in navs" :key="index">
				<view class="nav-item" :data-index="index" @click="onNavTap">
					<view class="nav-pic">
						<image :src="item.pic_image_url"></image>
					</view>
					<view class="nav-text" :style="`color: ${item.tcolor ? item.tcolor : ''}`">{{item.title}}</view>
				</view>
			</block>
		</view>
		<view class="weui-cells hosp-list">
			<!-- 医院列表 -->
			<view class="weui-cell hosp-item weui-cell_access" v-for="(item, index) in hospitals" :key="item.id"
				:data-hid="item.id" @click="toHospital">
				<view class="weui-cell__hd">
					<image class="hosp-avatar" mode="aspectFill"
						:src="item.avatar ? item.avatar_url : '../../static/resource/image/avatar.jpg'">
					</image>
				</view>
				<view class="weui-cell__bd">
					<view>
						<text class="hosp-name">{{ item.name }}</text>
					</view>
					<view class="hosp-line">
						<text class="hosp-rank">{{ item.rank }}</text>
						<text class="hosp-label">{{ item.label }}</text>
					</view>
					<view class="hosp-line">
						<text class="hosp-intro">{{ item.intro }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	import { ref, toRaw } from 'vue'
	const app = getApp()
	// 定义轮播图数据
	const slides = ref([])
	// 快捷入口2
	const nav2s = ref([])
	// 快捷入口多个
	const navs = ref([])
	// 医院列表
	const hospitals = ref([])
	onLoad(() => {
		app.globalData.utils.getUserInfo()
		app.globalData.utils.request({
			url: 'app/init',
			success: res => {
				const { id } = res.data.data.area
				// 通过 id 获取当前地区的页面数据
				app.globalData.utils.request({
					url: 'Index/index',
					data: {
						aid: id
					},
					success: ({ data }) => {
						slides.value = data.data.slides
						nav2s.value = data.data.nav2s
						navs.value = data.data.navs
						hospitals.value = data.data.hospitals
					}
				})
			}
		})
	})
	// 封装相同跳转逻辑
	const jump = (nav, type) => {
		// 判断是否为内部链接
		if (nav.stype == 1) {
			uni.navigateTo({
				url: nav.stype_link
			})
		}
	}
	const onNav2Tap = (e) => {
		// toRaw 把响应式对象转为普通对象
		const nav = toRaw(nav2s.value)[e.currentTarget.dataset.index]
		jump(nav, 'nav2s')
	}
	const onNavTap = (e) => {
		const nav = toRaw(navs.value)[e.currentTarget.dataset.index]
		jump(nav, 'navs')
	}
	// 跳转到医院详情
	const toHospital = (e) => {
		const hid = e.currentTarget.dataset.hid
		uni.navigateTo({
			url: `../hospital/index?hid=${hid}`
		})
	}
</script>

<style>
	page {
		background: #fff;
	}

	.weui-cell_hd image {
		display: block;
		width: 40rpx;
		height: 40rpx;
		margin-right: 14rpx;
	}

	.weui-cell_bd text {
		color: #be9719;
		font-size: 26rpx;
	}

	.weui-cell_ft image {
		display: block;
		width: 30rpx;
		height: 30rpx;
	}

	/* 轮播图样式 */
	.index-swiper {
		padding: 20rpx 20rpx 0 20rpx;
		overflow: hidden;
	}

	.index-swiper swiper {
		height: 320rpx;
		overflow: hidden;
		border-radius: 10rpx;
	}

	.index-swiper swiper-item image {
		width: 100%;
		height: 100%;
	}

	.nav2-list {
		margin: 10rpx 20rpx 0 20rpx;
	}

	.nav2-list::after {
		content: '';
		display: block;
		height: 0;
		line-height: 0;
		clear: both;
		visibility: hidden;
	}

	.nav2-item {
		float: left;
		margin-top: 20rpx;
		width: 50%;
		text-align: center;
		box-sizing: border-box;
		padding: 0 5rpx;
	}

	.nav2-pic {
		width: 100%;
	}

	.nav2-pic image {
		display: block;
		width: 100%;
	}

	.nav-list::after {
		content: '';
		display: block;
		height: 0;
		line-height: 0;
		clear: both;
		visibility: hidden;
	}

	.nav-item {
		float: left;
		margin-top: 20rpx;
		width: 20%;
		text-align: center;
		padding: 10rpx 0;
	}

	.nav-pic image {
		display: block;
		margin: 0 auto;
		width: 110rpx;
		height: 110rpx;
	}

	.nav-text {
		font-size: 24rpx;
		font-weight: bold;
		white-space: nowrap;
		overflow: hidden;
	}

	.hosp-list {
		margin: 10rpx 0 0 0;
		background: none;
	}

	.hosp-list::before {
		display: none;
	}

	.hosp-list::after {
		display: none;
	}

	.hosp-item {
		-webkit-box-align: stretch;
		-webkit-align-items: stretch;
		align-items: stretch;
		padding: 20rpx;
		margin: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
		box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.04), 0 1px 6px 0 rgba(0, 0, 0, 0.04);
	}

	.hosp-item::before {
		display: none;
	}

	.hosp-item::after {
		display: none;
	}

	.hosp-name {
		font-weight: bold;
		font-size: 34rpx;
	}

	.hosp-avatar {
		display: block;
		width: 200rpx;
		height: 180rpx;
		border-radius: 10rpx;
		overflow: hidden;
		margin-right: 20rpx;
	}

	.hosp-line {
		margin-top: 5rpx;
	}

	.hosp-line text {
		font-size: 26rpx;
	}

	.hosp-rank {
		font-weight: bold;
		color: #0bb585;
		margin-right: 15rpx;
	}

	.hosp-label {
		font-weight: bold;
		color: #0ca7ae;
		margin-right: 15rpx;
	}

	.hosp-intro {
		color: #999999;
	}
</style>