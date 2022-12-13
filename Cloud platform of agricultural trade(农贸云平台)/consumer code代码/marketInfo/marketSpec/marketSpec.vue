<template>
	<view class="main">
		<nav-bar :pageName="'市场信息'"></nav-bar>
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

							<view v-for="item in list" v-if="item.name===lastPageName.currentName">
								<view class="common__box--title"><text>市场信息</text></view>
								<view class="common__field">
									<text class="common__field--left">市场名称</text>
									<view class="common__field--right"><text>{{item.name}}</text></view>
								</view>
								<view class="common__field">
									<text class="common__field--left">地址</text>
									<view class="common__field--right"><text>{{item.address}}</text></view>
								</view>
								<view class="common__field">
									<text class="common__field--left">市场联系人</text>
									<view class="common__field--right"><text>{{item.contacts}}</text></view>
								</view>
								<view class="common__field">
									<text class="common__field--left">联系电话</text>
									<view class="common__field--right"><text>{{item.contactsTel}}</text></view>
								</view>
							</view>


							<view class="common__box--title"><text>经营介绍</text></view>
							<view class="intro">
								<text style="padding: 20rpx" v-for="item in list" v-show="item.name===lastPageName.currentName">{{item.introduction}}</text>
							</view>


							<view class="common__box--title"><text>市场名称登记证</text></view>
							<view class="common__list">
								<view class="common__list--box">
									<view class="box-left">
										<image :src= "jyUploadFile" mode="widthFix"></image>
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
				<view v-show="!isShowRuleSpec">
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
								<view class="common__scroll--type" v-for="(item, index) in typeList" :class="{active: currentType.id === item.id}"
								 @click="pushSwitch2(item)">
									<!-- v-show="item.marketName===lastPageName.currentName" -->
									<text>{{item.name}}</text>
								</view>

							</view>
						</view>
						<view class="common__list">
							<view class="common__list--box" v-for="typeListItem in typeList" v-show="typeListItem.id === currentType.id"
							 @click="specInfro(typeListItem)">
								<view class="box-left">
									<image src="../../../../static/image/homeother.png" mode=""></image>
								</view>
								<view class="box-right">
									<text>标题：{{typeListItem.name}}</text>
									<text v-for="ruleListItem in ruleList" v-if="ruleListItem.title === typeListItem.name">创建时间：{{ruleListItem.addtime}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 点进去的项目详情 -->
				<view class="food__c">
					<view class="food common">
						<view class="food__luru">
							<view class="common__box common__chakan" v-show="isShowRuleSpec">
								<view class="common__box--title"><text>规章制度: </text></view>
								<view class="common__field">
									<text class="common__field--left specRule">{{currentType.name}}</text>
									<view class="common__field--right"><text></text></view>
								</view>

								<view class="common__box--title" style="border-bottom: #FFFFFF;"><text>规章制度: 规章制度标题</text></view>
								<view class="intro">
									<text style="padding: 20rpx" v-for="item in ruleList" v-show="item.title === currentType.name">{{item.content}}</text>
								</view>
								<view class="common__field">
									<text class="common__field--left specRule">规章制度附件</text>
									<view class="common__field--right"><text></text></view>
								</view>
								<view class="common__box--title"><text>规章制度: </text></view>
								<view class="common__field">
									<text class="common__field--left specRule"></text>
									<view class="common__field--right"><text></text></view>
								</view>
								<button @click="backToRuleMenu">返回页面1</button>
							</view>
						</view>
					</view>
				</view>
				<!-- 项目详情 -->
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
				<view class="common__list">
					<view class="common__list--box" v-for="item in staffList" v-show="item.marketName === lastPageName.currentName">
						<view class="box-left">
							<image src="../../../../static/image/homeother.png" mode=""></image>
						</view>
						<view class="box-right">
							<text class="title">姓名：{{item.name}}</text>
							<text class="txt">职位：{{item.jobName}}</text>
						</view>
					</view>
				</view>
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
	import {
		baseURL
	} from '@/config';
	import {
		list
	} from '@/api/cusMarketInfo.js';
	import {
		ruleList
	} from '@/api/cusMarketInfo.js';
	import {
		staffList
	} from '@/api/cusMarketInfo.js';

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
				test:"http://localhost:8083/zj_promarket_manage/statics/img/operatorZZ.jpg",
				lastPageName: "",
				colorIndex: 0,
				colorBoolean: false,
				type: 1,
				type2: 2,
				marketInfoTitle: ["市场名称:", "地址:", "市场联系人:", "联系电话:"],
				list: [], //市场简介全部内容
				ruleList: [], //全部的ruleList
				ruleTitle: {}, // 全部的ruleTitle
				typeList: [], //按照规范的标题
				currentType: {
					id: 0,
					name: ''
				}, //下面当前的选择
				pushIndex: 0, //在pushSwitch里面定义
				staffList: [], //staff的list
				isShowRuleSpec: false, // 是否显示规章制度详情
				baseURL: "",
				jyUploadFile: "", //市场名称登记证
				yyzzUrl: "" //营业执照
			};
		},
		methods: {
			pullDown() {},
			pullUp() {},
			pushSwitch(type) {
				this.type = type;
				if (type === 2 && this.pushIndex === 0) {
					this.putDataInList();
					this.pushIndex = 1;
				}
				if (type === 2) {
					//小bug解决第一个规章制度的子目录无法被点击
					this.currentType.name = this.typeList[0].name
				}



			},
			pushSwitch2(item) {
				this.currentType = item;
			},
			putDataInList() {
				var j = 0
				for (var i = 0; i < this.ruleList.length; i++) {
					if (this.ruleList[i].marketName === this.lastPageName.currentName) {
						this.ruleTitle.id = j;
						this.ruleTitle.name = (this.ruleList[i].title);
						this.typeList.push(this.ruleTitle)
						this.ruleTitle = {};
						j++;
					}

				}

			},

			backMenu: function() {
				uni.navigateTo({
					url: '../marketIndex/marketIndex',
				});
			},
			getList(page, limit, search) {
				list(page, limit, search).then(res => {
					this.list = res.data;
				})
			},
			getRuleList(page, limit, search) {
				ruleList(page, limit, search).then(res => {
					this.ruleList = res.data;
				})
			},
			getStaffList(page, limit, search) {
				staffList(page, limit, search).then(res => {
					this.staffList = res.data;
				})
			},
			specInfro(typeListItem) {
				console.log("work1")

				if (typeListItem.name === this.currentType.name) {
					this.isShowRuleSpec = true

					console.log("work3")
				} else {
					this.isShowRuleSpec = false
					console.log("work4")
				}

			},
			backToRuleMenu() {
				console.log("work1")
				this.isShowRuleSpec = !this.isShowRuleSpec
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.lastPageName = option; //打印出上个页面传递的参数。
			//console.log(option.currentName)
			this.getList(1, 10, "");
			this.getRuleList(1, 10, "");
			this.getStaffList(1, 10, "");
			console.log("it work0")
			
			for (var i = 0; i < this.list.length; i++) {
				console.log("it work1")
			}
			this.baseURL = baseURL;
			this.jyUploadFile = this.baseURL + 'statics/img/operatorZZ.jpg'
		}
	};
</script>

<style lang="scss">
	@import '@/static/style/food.scss';

	.intro {
		border: #EBEBEB solid 1rpx;
		margin: 0 auto;
		border-radius: 35rpx;
		width: 730rpx;
		height: 120rpx;
	}

	.specRule {
		padding: 11rpx;
	}
</style>
