<template>
	<view class="main">
		<nav-bar :pageName="'商铺列表'" :showSearch="true"  @search="search"></nav-bar>
		<view class="common">
			<view class="common__scroll">
				<view class="common__scroll--main" :style="{width:(typeList.length * 150) + 'rpx'}">
					<view class="common__scroll--type" v-for="(item, index) in typeList" :class="{ active: currentType.id === item.id }"
					 @click="pushSwitch(item)">
						<text>{{ item.name }}</text>
					</view>
				</view>
			</view>
			<view class="common__list" @click="pagePushMenu">
				<view class="common__list--box">
					<view class="box-left">
						<image src="../../../../static/image/homeother.png" mode=""></image>
					</view>
					 
					<view class="box-right">
						<text>品种：苹果</text>
						<text>销售地址：水果区A1王二小</text>
						<text>价格：20元/箱</text>
						<text>产地：山东烟台</text>
					</view>
				</view>
			</view>
			<view @click="backMenu">
				<button type="default" class="backButton">返回</button>
			</view>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/components/navBar.vue';
	export default {
		components: {
			navBar
		},
		data() {
			return {
				typeList: [{
						id: 0,
						name: '惠丰西路'
					},
					{
						id: 1,
						name: '南京科巷'
					}
				],
				currentType: {
					id: 0,
					name: '全部'
				}
			};
		},
		methods: {
			pullDown() {},
			pullUp() {},
			search(e) {
				console.log(e);
			},
			pushSwitch(item) {
				this.currentType = item;
			},
			backMenu: function() {
				uni.navigateTo({
					url: '../../index',
				});
			},
			pagePushMenu: function(){
				uni.navigateTo({
					url: '../../goodsInfo/goodsInfo/goodsInfo'
				});
			}
		}
	};
</script>

<style lang="scss">
	.navBar {}
	@import '@/static/style/food.scss';
</style>
