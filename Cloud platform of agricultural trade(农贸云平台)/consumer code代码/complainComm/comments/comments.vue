<template>
	<view class="main">
		<nav-bar :pageName="'评价投诉'"></nav-bar>
		<!-- 市场简介 -->
		<view class="food__c" v-if="type === 1">
			<view class="food common">
				<view class="food__luru">
					<view class="common__box common__chakan">

						<view class="common__box--title"><text>评价信息</text></view>
						<view class="common__field">
							<text class="common__field--left">评价标题</text>
							<view class="common__field--right"><text>xxx</text></view>
						</view>

						<view class="common__list">
							<view class="common__list--box">
								<view class="box-right" style="display: flex;">
									<text>评价: </text>
									<!-- "isActive?'../../../../static/image/customer-heart.png':'../../../../static/image/customer-selectedHeart.png'"  -->
									<image 
									:src="isActive1?'../../../../static/image/customer-heart.png':'../../../../static/image/customer-selectedHeart.png'"
									 style="width: 120rpx;" mode="widthFix" @click="changeActive1()">
									 </image>
						
									<image 
									:src="isActive2?'../../../../static/image/customer-heart.png':'../../../../static/image/customer-selectedHeart.png'"
									 style="width: 120rpx;" mode="widthFix" @click="changeActive2()">
									 </image>
									 
									 <image
									 :src="isActive3?'../../../../static/image/customer-heart.png':'../../../../static/image/customer-selectedHeart.png'"
									  style="width: 120rpx;" mode="widthFix" @click="changeActive3()">
									  </image>
									  
									  <image
									  :src="isActive4?'../../../../static/image/customer-heart.png':'../../../../static/image/customer-selectedHeart.png'"
									   style="width: 120rpx;" mode="widthFix" @click="changeActive4()">
									   </image>
									   
									   <image
									   :src="isActive5?'../../../../static/image/customer-heart.png':'../../../../static/image/customer-selectedHeart.png'"
									    style="width: 120rpx;" mode="widthFix" @click="changeActive5()">
									    </image>
								</view>
							</view>
						</view>
						<view class="common__box--title"><text>评价详情</text></view>
						<view style="border:#EBEBEB solid 1rpx;  margin:0 auto; border-radius: 35rpx;
							width: 730rpx; height: 120rpx;">
						</view>


						<view class="common__box--title"><text>附件</text></view>
						<view class="common__list">
							<view class="common__list--box">
								<view class="box-left">
									<image src="../../../../static/image/homeother.png" mode=""></image>
								</view>
								<view class="box-right">
									<easy-upload></easy-upload>
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
				isActive1: true,
				isActive2: true,
				isActive3: true,
				isActive4: true,
				isActive5: true
			};
		},
		methods: {
			pullDown() {},
			pullUp() {},
			pushSwitch(type) {
				console.log(type)
				this.type = type;
			},
			backMenu: function() {
				uni.navigateTo({
					url: '../complainCommIndex/complainCommIndex',
				});
			},
			changeActive1() {
				this.isActive1 = !this.isActive1;
			},
			changeActive2() {
				this.isActive2 = !this.isActive2;
			},
			changeActive3() {
				this.isActive3 = !this.isActive3;
			},
			changeActive4() {
				this.isActive4 = !this.isActive4;
			},
			changeActive5() {
				this.isActive5 = !this.isActive5;
			}
		}
	};
</script>

<style lang="scss">
	@import '@/static/style/food.scss';
</style>
