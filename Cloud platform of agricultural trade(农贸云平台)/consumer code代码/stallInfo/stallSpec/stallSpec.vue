<template>
	<view class="main">
		<nav-bar :pageName="'商铺详情'"></nav-bar>
		<view class="food common">
			<view class="food__luru">
				<view class="common__box common__chakan">
					<view class="common__box--title"><text>商铺详情信息</text></view>
					<view class="common__field">
						<text class="common__field--left">商铺区域</text>
						<view class="common__field--right"><text>sss</text></view>
					</view>
					<view class="common__field">
						<text class="common__field--left">商铺名称</text>
						<view class="common__field--right"><text>xxx</text></view>
					</view>
					<view class="common__field">
						<text class="common__field--left">经营户</text>
						<view class="common__field--right"><text>xxx</text></view>
					</view>
					<view class="common__field">
						<text class="common__field--left">联系方式</text>
						<view class="common__field--right"><text>xxx</text></view>
					</view>
					
					<view class="common__box--title"><text>经营户头像</text></view>
					<view class="common__list">
						<view class="common__list--box">
							<view class="box-left"><image src="../../../../static/image/homeother.png" mode=""></image></view>
							<view class="box-right"></view>
						</view>
					</view>
					
					<view class="common__box--title"><text>摊位照片</text></view>
					<view class="common__list">
						<view class="common__list--box">
							<view class="box-left"><image src="../../../../static/image/homeother.png" mode=""></image></view>
							<view class="box-right"></view>
						</view>
					</view>
					
					<view class="common__box--title"><text>经营品类</text></view>
					<view class="common__list">
						<view class="common__list--box">
							<view class="box-left"><image src="../../../../static/image/homeother.png" mode=""></image></view>
							<view class="box-right">
								<text>苹果</text>
								<text>20元/箱</text>
								<text>正宗烟台苹果，个大味甜，每项5公斤，最低价销售，走过路过，不要错过</text>
							</view>
						</view>
					</view>
					<view @click="backMenu">
						<button type="default" class="backButton">返回</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import navBar from '@/components/components/navBar.vue';
import jPicker from '@/components/J-Picker/jPicker.vue';
import { baseURL } from '@/config';
export default {
	components: {
		navBar,
		jPicker
	},
	data() {
		return {
			uploadUrl: '',
			imageList: [],
		};
	},
	onLoad() {
		this.uploadUrl = baseURL + 'file/upload';
	},
	methods: {
		pickerStoreType(e) {
			console.log(e);
		},
		changeUrl(){},
		backMenu: function() {
			uni.navigateTo({
				url: '../../index',
			});
		}
	},
};
</script>

<style lang="scss">
@import '@/static/style/food.scss';
</style>
