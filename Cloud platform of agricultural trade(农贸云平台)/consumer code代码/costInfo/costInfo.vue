<template>
	<view class="main">
		<view v-show="!isShowSpec">
			<nav-bar :pageName="'费用信息'" :showAdd="true" :showSearch="true" @add="add" @search="search"></nav-bar>
			<view class="common__top">
				<view class="common__top--main">
					<view class="common__search">
						<view class="common__search--left">
							<uni-icons type="search" color="#2E2E2E"></uni-icons>
						</view>
						<input type="text" placeholder="时间" confirm-type="search" @confirm="search" />
					</view>
					<view class="common__top--add">添加</view>
				</view>
			</view>
			<view class="common__box common__chakan">
				<view class="common__box--title"><text>商户信息</text></view>
				<view class="common__field">
					<text class="common__field--left">商铺区域</text>
					<view class="common__field--right">
						<text>233</text>
					</view>
				</view>
				<view class="common__field">
					<text class="common__field--left">姓名</text>
					<view class="common__field--right">
						<text>233</text>
					</view>
				</view>
				<view class="common__field">
					<text class="common__field--left">身份证号码</text>
					<view class="common__field--right">
						<text>233</text>
					</view>
				</view>
			</view>

			<view class="common">
				<view class="common__scroll">
					<view class="common__scroll--main" :style="{width:(typeList.length * 150) + 'rpx'}">
						<view class="common__scroll--type" v-for="(item, index) in typeList" :class="{ active: currentType.id === item.id }"
						 @click="pushSwitch(item)">
							<text>{{ item.name }}</text>
						</view>
					</view>
				</view>
				<view class="common__list" @click="categoryAdd">
					<view class="common__list--box">
						<view class="box-left">
							<image src="../../../static/image/homeother.png" mode=""></image>
						</view>
						<view class="box-right">
							<text class="title">店铺总数：111</text>
							<text class="txt">在租：111</text>
							<text class="time">空闲：111</text>
							<text class="status no">已出租</text>
						</view>
					</view>
				</view>
			</view>
		</view>


		<!-- 品种添加 -->
		<view class="" v-show="isShowSpec">
			<view class="common__box common__chakan">
				<view class="common__box--title"><text>费用信息</text></view>
				<view class="common__field">
					<text class="common__field--left">商铺区域</text>
					<view class="common__field--right">
						<text>233</text>
					</view>
				</view>
				<view class="common__field">
					<text class="common__field--left">商铺名称</text>
					<view class="common__field--right">
						<text>233</text>
					</view>
				</view>
				<view class="common__field">
					<text class="common__field--left">经营户</text>
					<view class="common__field--right">
						<text>233</text>
					</view>
				</view>
				<view class="common__field">
					<text class="common__field--left">费用类型</text>
					<view class="common__field--right">
						<text>233</text>
					</view>
				</view>
				<view class="common__field">
					<text class="common__field--left">金额</text>
					<view class="common__field--right">
						<text>233</text>
					</view>
				</view>
				<view class="common__field">
					<text class="common__field--left">生成时间</text>
					<view class="common__field--right">
						<text>233</text>
					</view>
				</view>
				<view class="common__field">
					<text class="common__field--left">费用描述</text>
					<view class="common__field--right">
						<text>233</text>
					</view>
				</view>
				<view class="common__field">
					<text class="common__field--left">应缴日期</text>
					<view class="common__field--right">
						<text>233</text>
					</view>
				</view>
				<view class="common__field">
					<text class="common__field--left">缴纳日期</text>
					<view class="common__field--right">
						<text>233</text>
					</view>
				</view>
				<view class="common__field">
					<text class="common__field--left">费用缴纳状态</text>
					<view class="common__field--right">
						<text>233</text>
					</view>
				</view>
				<view class="common__btn" @click="backCostIndex()"><text class="common__twobtn--yes">返回</text></view>
			</view>
		</view>
		<!-- 品种添加 -->
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
				isShowSpec: false,
				typeList: [{
						id: 0,
						name: '全部'
					},
					{
						id: 1,
						name: '费用类型'
					},
					{
						id: 2,
						name: '金额'
					},
					{
						id: 3,
						name: '缴纳状态'
					}
				],
				currentType: {
					id: 0,
					name: '上传日期'
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
			},
			categoryAdd() {
				this.isShowSpec = !this.isShowSpec;
			},
			backCostIndex(){
				this.isShowSpec = !this.isShowSpec;
			}
		}
	};
</script>

<style lang="scss">
	.navBar {}
</style>
