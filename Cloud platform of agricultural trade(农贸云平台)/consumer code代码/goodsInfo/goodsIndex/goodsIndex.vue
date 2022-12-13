<template>
	<view class="main">
		<nav-bar :pageName="'商铺列表'" :showAdd="true" :showSearch="true" @add="add" @search="search"></nav-bar>
		<view class="common">
			<view class="common__scroll">
				<view class="common__scroll--main" :style="{width:(typeList.length * 150) + 'rpx'}">
					<view class="common__scroll--type" v-for="(item, index) in typeList" :class="{ active: currentType.id === item.id }" @click="pushSwitch(item)">
						<text>{{ item.name }}</text>
					</view>
				</view>
			</view>
			<view class="common__list">
				<view class="common__list--box">
					<view class="box-left"><image src="../../../../static/image/homeother.png" mode=""></image></view>
					<view class="box-right">
						<text>店铺总数：111</text>
						<text>在租：111</text>
						<text>空闲：111</text>
						<text>店铺总数：111</text>
						<text>在租：111</text>
						<text>空闲：111</text>
					</view>
				</view>
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
			typeList: [
				{
					id: 0,
					name: '全部'
				},
				{
					id: 1,
					name: '蔬菜'
				},
				{
					id: 2,
					name: '海水产'
				},
				{
					id: 3,
					name: '淡水产'
				},
				{
					id: 4,
					name: '淡水产1'
				},
				{
					id: 5,
					name: '淡水产2'
				},
				{
					id: 6,
					name: '淡水产3'
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
		add() {
			console.log('ss');
		},
		search(e) {
			console.log(e);
		},
		pushSwitch(item) {
			console.log(item)
			this.currentType = item;
		}
	}
};
</script>

<style lang="scss">
.navBar {
}
</style>
