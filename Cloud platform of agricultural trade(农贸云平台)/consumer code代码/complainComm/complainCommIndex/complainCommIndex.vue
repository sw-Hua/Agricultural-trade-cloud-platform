<template>
	<view class="main">
		<nav-bar :pageName="'投诉评价'"></nav-bar>
		<view class="food common">
			<view class="common__top">
				<view class="common__search">
					<view class="common__search--left">
						<uni-icons type="search" color="#2E2E2E"></uni-icons>
					</view>
					<input type="text" placeholder="可按区域、商铺名、商户名、销售商品搜索" confirm-type="search" @confirm="search" />
				</view>
				<view class="common__top--add"><image @click="redirect('myComments')" src="../../../../static/image/customer-comments.png" mode="widthFix" style="width: 40rpx; position: absolute; top:137rpx; left: 620rpx;"></image></view>
				<view class="common__top--add"><image @click="redirect('myComplains')" src="../../../../static/image/customer-complaint.png" mode="widthFix"></image></view>
			</view>
			
			<view class="common__list">
				<view class="common__list--box">
					<view class="box-left"><image src="../../../../static/image/homeother.png"></image></view>
					<view class="box-right">
						<text>张三</text>
						<text>水果区A2</text>
						<text>信用等级：A</text>
						<text>主营商品： 苹果、梨子</text>
						
						<view style="display: flex; width: 450rpx">
						<view style="color: #000000; width: 225rpx; padding: 10rpx;">
						<text @click="redirect('comments')" class="reText">评价</text>
						</view>
						
						<view style="color: #000000; width: 225rpx; padding: 10rpx;">
						<text @click="redirect('comments')" class="reText">投诉</text>
						</view></view>
						
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
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import uniPopupDialog from '@/components/uni-popup-dialog/uni-popup-dialog.vue';
	export default {
		components: {
			navBar,
			tTable,
			tTh,
			tTr,
			tTd,
			uniPagination,
			uniPopup,
			uniPopupDialog
		},
		data() {
			return {
				type: 1,
				tableList: [{
					name: 'John Brown',
					age: 18,
					hobby: 'xxx',
					hobby1: 'xxx1'
				}]
			};
		},
		methods: {
			pullDown() {},
			pullUp() {},
			pushSwitch(type) {
				this.type = type;
			},
			open() {
				this.$refs.popup.open();
			},
			close(done) {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
				// ...
				done();
			},
			/**
			 * 点击确认按钮触发
			 * @param {Object} done
			 * @param {Object} value
			 */
			confirm(done, value) {
				// 输入框的值
				console.log(value);
				// TODO 做一些其他的事情，手动执行 done 才会关闭对话框
				// ...
				done();
			},
			backMenu: function() {
				uni.navigateTo({
					url: '../../index',
				});
			},
			redirect: function(value) {
				if(value === "comments"){
					uni.navigateTo({
						url: '../comments/comments',
					});
				}
				else if (value === "complains"){
					uni.navigateTo({
						url: '../complaints/complaints',
					});
				}
				else if (value === "myComments"){
					uni.navigateTo({
						url: '../myComments/myComments',
					});
				}
				else if (value === "myComplains"){
					uni.navigateTo({
						url: '../myComments/myComments',
					});
				}
			}
		}
	};
</script>

<style lang="scss">
	@import '@/static/style/food.scss';
	.reText{
		font-weight: bold;
		 border: solid #F1F1F1 1rpx;
		 text-align: center;
		 border-radius: 15rpx;
	}
</style>

