<template>
	<view class="main">
		<nav-bar :pageName="'人员信息'"></nav-bar>
		<view class="food common">
			<view class="common__switch">
				<view class="common__switch--type" :class="{ active: type === 1 }" @click="pushSwitch(1)"><text>市场简介</text></view>
				<view class="common__switch--type" :class="{ active: type === 2 }" @click="pushSwitch(2)"><text>规章制度</text></view>
				<view class="common__switch--type" :class="{ active: type === 3 }" @click="pushSwitch(3)"><text>人员信息</text></view>
				<view class="common__switch--type" :class="{ active: type === 4 }" @click="pushSwitch(4)"><text>遍历设施</text></view>
			</view>

			<!-- 市场简介 -->
			<view class="food__c" v-if="type === 1">
				<view class="food common">
					<view class="food__luru">
						<view class="common__box common__chakan">

							<view class="common__box--title"><text>市场信息</text></view>
							<view class="common__field">
								<text class="common__field--left">市场名称</text>
								<view class="common__field--right"><text>sss</text></view>
							</view>
							<view class="common__field">
								<text class="common__field--left">地址</text>
								<view class="common__field--right"><text>xxx</text></view>
							</view>
							<view class="common__field">
								<text class="common__field--left">市场联系人</text>
								<view class="common__field--right"><text>xxx</text></view>
							</view>
							<view class="common__field">
								<text class="common__field--left">联系电话</text>
								<view class="common__field--right"><text>xxx</text></view>
							</view>

							<view class="common__box--title"><text>经营介绍</text></view>
							<view style="border:#EBEBEB solid 1rpx;  margin:0 auto; border-radius: 35rpx;
							width: 730rpx; height: 120rpx;">
							</view>


							<view class="common__box--title"><text>市场名称登记证</text></view>
							<view class="common__list">
								<view class="common__list--box">
									<view class="box-left">
										<image src="../../../../static/image/homeother.png" mode=""></image>
									</view>
									<view class="box-right"></view>
								</view>
							</view>

							<view class="common__box--title"><text>营业执照</text></view>
							<view class="common__list">
								<view class="common__list--box">
									<view class="box-left">
										<image src="../../../../static/image/homeother.png" mode=""></image>
									</view>
									<view class="box-right"></view>
								</view>
							</view>
							<view @click="backMenu">
								<button type="default" class="backButton">返回</button>
							</view>
						</view>
					</view>
				</view>

			</view>

			<!-- 规章制度 -->
			<view class="" v-else-if="type === 2">
				<view class="common__search">
					<!-- 搜索框 -->
					<view class="common__search--left">
						<uni-icons type="search" color="#2E2E2E"></uni-icons>
					</view>
					<input type="text" placeholder="可按标题、时间搜索" confirm-type="search" @confirm="search" />
				</view>
				<!-- 搜索框 -->
				<view class="common">
					<view class="common__scroll">
						<view class="common__scroll--main" :style="{width:(typeList.length * 150) + 'rpx'}">
							<view class="common__scroll--type" v-for="(item, index) in typeList" :class="{ active: currentType.id === item.id }" @click="pushSwitch2(item)">
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
				<!-- 返回 -->
				<view @click="backMenu">
					<button type="default" class="backButton" style="position: absolute; top: 800rpx; left: 570rpx;">返回</button>
				</view>
				<!-- 返回 -->
			</view>
			<!-- 规章制度 -->


			<!-- 人员信息 -->
			<view class="" v-else-if="type === 3">
				<!-- 搜索框 -->
				<view class="common__search">
					<view class="common__search--left">
						<uni-icons type="search" color="#2E2E2E"></uni-icons>
					</view>
					<input type="text" placeholder="可按姓名搜索" confirm-type="search" @confirm="search" />
				</view>
				<!-- 搜索框 -->
			</view>
			<!-- 人员信息 -->

			<!-- 遍历设施 -->
			<view class="" v-else-if="type === 4">
				<swiper autoplay="true" interval="2000" circular="true" indicator-dots="true">
					<swiper-item>
						<image src="https://s3.ax1x.com/2020/12/25/rRtCND.png" mode="widthFix" />
					</swiper-item>

					<swiper-item>
						<image src="https://s3.ax1x.com/2020/12/25/rRtM4g.png" mode="widthFix" />
					</swiper-item>

					<swiper-item>
						<image src="https://s3.ax1x.com/2020/12/25/rRt8vn.png" mode="widthFix" />
					</swiper-item>
				</swiper>
				<view class="contentTitle">轮播图测试</view>
				<!-- 返回 -->
				<view @click="backMenu">
					<button type="default" class="backButton">返回</button>
				</view>
				<!-- 返回 -->
			</view>
			<!-- 遍历设施 -->


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
	export default {
		components: {
			navBar,
			tTable,
			tTh,
			tTr,
			tTd,
			uniPagination
		},
		data() {
			return {
				colorIndex: 0,
				colorBoolean: false,
				type: 1,
				type2: 2,
				marketInfoTitle: ["市场名称:", "地址:", "市场联系人:", "联系电话:"],
				marketInfo: [
					"宁波市江北孙家菜市场",
					"浙江省宁波市江北区洪塘街道云津路328号",
					"周子君",
					"13065627999"
				],
				typeList: [{
						id: 0,
						name: '规章1'
					},
					{
						id: 1,
						name: '规章2'
					}
				],
				currentType: {
					id: 0,
					name: '规章1'
				}
			};
		},
		methods: {
			pullDown() {},
			pullUp() {},
			pushSwitch(type) {
				this.type = type;
			},
			pushSwitch2(item) {
				this.currentType = item;
			},
			backMenu: function() {
				uni.navigateTo({
					url: '../../index',
				});
			}
		}
	};
</script>

<style lang="scss">
	@import '@/static/style/food.scss';
</style>
