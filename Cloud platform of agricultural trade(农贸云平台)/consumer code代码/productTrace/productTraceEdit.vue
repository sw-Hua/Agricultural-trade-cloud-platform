<template>
	<view class="main">
		<nav-bar :pageName="pageName"></nav-bar>
		<view class="food common">
			<view class="food__luru">
				<view class="common__box">
					<view class="common__box--title" v-show="disabled"><text>进场信息</text></view>
					<view class="common__field">
						<text class="common__field--left">商铺区域</text>
						<view class="common__field--right">
							<jPicker sureColor="#3E7CEF" class="cont" @sure="pickerStallType" :val="formData.stallTypeId" :options="stallTypeArray"
							 showKey="text" valKey="value" v-bind:disabled="disabled" />
						</view>
					</view>
					<view class="common__field">
						<text class="common__field--left">商铺名</text>
						<view class="common__field--right">
							<jPicker sureColor="#3E7CEF" class="cont" @sure="pickerStall" :val="formData.stallId" :options="stallArray"
							 showKey="text" valKey="value" v-bind:disabled="disabled1" />
						</view>
					</view>
					<view class="common__field">
						<text class="common__field--left">经营户</text>
						<view class="common__field--right">
							<jPicker sureColor="#3E7CEF" class="cont" @sure="pickerOperator" :val="formData.operatorId" :options="operatorArray"
							 showKey="text" valKey="value" v-bind:disabled="true" />
						</view>
					</view>
					<view class="common__field">
						<text class="common__field--left">品种</text>
						<view class="common__field--right">
							<jPicker sureColor="#3E7CEF" class="cont" @sure="pickerGoods" :val="formData.goodsCode" :options="goodsArray"
							 showKey="text" valKey="value" v-bind:disabled="disabled" />
						</view>
					</view>
					<view class="common__field">
						<text class="common__field--left">进场重量</text>
						<view class="common__field--right">
							<input v-model="formData.amount" v-if="!disabled" placeholder="请输入进场重量(KG)" type="digit"/>
							<input v-model="formData.amount" v-else="disabled"  v-bind:disabled="disabled" />
						</view>
					</view>
					<view class="common__field">
						<text class="common__field--left">进场数量</text>
						<view class="common__field--right">
							<input v-model="formData.inAmount" v-if="!disabled" placeholder="请输入进场数量(件)" type="digit"/>
							<input v-model="formData.inAmount" v-else="disabled"  v-bind:disabled="disabled" />
						</view>
					</view>
					<view class="common__upload">
						<text class="common__upload--txt">进场单</text>
						<view>
							<easy-upload :dataList="imageList" :uploadUrl="uploadUrl" :types="'image'" :uploadCount="uploadCount" @changeUrl="changeUrl"
							 :token="token" :show="!disabled"></easy-upload>
						</view>
					</view>
					<view class="common__btn" @click="submit" v-show="!disabled"><text class="common__threebtn--yes">保存</text></view>
					<view class="common__threebtn" v-show="disabled">
						<text class="common__threebtn--yes" v-if="!showDelete" @click="doAdd">新增</text>
						<text class="common__threebtn--yes" v-else @click="doUpdate">修改</text>
						<text class="common__threebtn--del" v-show="showDelete" @click="doDelete">删除</text>
						<text class="common__threebtn--no" @click="doBack">返回</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import sPullScroll from '@/components/s-ui/s-pull-scroll';
	import regionPicker from '@/components/region-picker/region-picker.vue';
	import navBar from '@/components/components/navBar.vue';
	import jPicker from '@/components/J-Picker/jPicker.vue';
	import common from '../../../static/js/common.js';
	import {
		baseURL
	} from '@/config';
	import {
		stallTypeList
	} from '../../../api/scStallType.js';
	import {
		stallList
	} from '../../../api/scStall.js';
	import {
		operatorList
	} from '../../../api/scOperator.js';
	import {
		goodsList
	} from '../../../api/spGoods.js';
	import {
		checkTypeList
	} from '../../../api/spCheckType.js';
	import {
		goodsInList,
		goodsInSave,
		goodsInUpdate,
		goodsInInfo,
		goodsInDelete
	} from '../../../api/spGoodsIn.js';
	export default {
		components: {
			navBar,
			jPicker,
			regionPicker
		},
		data() {
			return {
				pageName: '进场新增',
				disabled: false,
				disabled1: true,
				showDelete: true,
				token: '',
				uploadUrl: '',
				uploadCount: 6,
				imageList: [],
				stallTypeQuery: {},
				stallTypeArray: [],
				stallQuery: {},
				stallArray: [{
					value: null,
					text: '请先选择商铺区域'
				}],
				operatorQuery: {},
				operatorArray: [],
				goodsQuery: {},
				goodsArray: [],
				formData: {
					id: null,
					stallTypeId: null,
					stallId: null,
					operatorId: null,
					operatorName: '',
					goodsCode: null,
					goodsName: '',
					goodsCodeAndName: '',
					amount: null,
					inAmount: null,
					url: '',
					ticketDate: common.getDate(0),
				},
			};
		},
		methods: {
			pickerStallType(e) {
				this.formData.stallId = null;
				if (e.value) {
					if (this.formData.stallTypeId != e.value) {
						this.formData.stallTypeId = e.value;
						this.getStall();
					}
				} else {
					this.disabled1 = true;
					this.stallArray = [{
						value: null,
						text: '请先选择商铺区域'
					}];
				}
			},
			pickerStall(e) {
				this.formData.stallId = e.value;
				this.formData.operatorId = e.operatorId;
				this.formData.operatorName = e.operatorName;
				this.formData.operatorAndStall = e.value + "," + e.operatorId;
			},
			pickerGoods(e) {
				this.formData.goodsCode = e.value;
				this.formData.goodsName = e.text;
				this.formData.goodsCodeAndName = e.value + "," + e.text;
			},
			pickerCheckType(e) {
				this.formData.checkTypeId = e.value
			},
			pickerCheckResult(e) {
				this.formData.checkResult = e.value
			},
			changeUrl(e) {
				this.formData.url = e;
			},
			getStallType() {
				stallTypeList(this.stallTypeQuery).then(res => {
					if (res.code == '0') {
						let stallTypeTemp = [];
						let map = {};
						map["value"] = null;
						map["text"] = "--请选择--";
						stallTypeTemp.push(map);
						for (let item of res.data) {
							let map = {};
							map["value"] = item.id.toString();
							map["text"] = item.typeName + "区";
							stallTypeTemp.push(map);
						}
						this.stallTypeArray = this.stallTypeArray.concat(stallTypeTemp);
					}
				});
			},
			getStall() {
				this.stallQuery["stallTypeId"] = this.formData.stallTypeId;
				//已出租的摊位
				this.stallQuery["status"] = '1';
				this.stallArray = [];
				stallList(this.stallQuery).then(res => {
					if (res.code == '0') {
						let stallTemp = [];
						let map = {};
						map["value"] = null;
						map["text"] = "--请选择--";
						stallTemp.push(map);
						for (let item of res.data) {
							let map = {};
							map["value"] = item.id.toString();
							map["text"] = item.name;
							map["operatorId"] = item.operatorId;
							map["operatorName"] = item.operatorName;
							stallTemp.push(map);
						}
						this.stallArray = this.stallArray.concat(stallTemp);
					}
					this.disabled1 = false;
				});
			},
			getOperator() {
				operatorList(this.operatorQuery).then(res => {
					if (res.code == '0') {
						let operatorTemp = [];
						let map = {};
						map["value"] = null;
						map["text"] = "--请选择--";
						operatorTemp.push(map);
						for (let item of res.data) {
							let map = {};
							map["value"] = item.id.toString();
							map["text"] = item.name;
							operatorTemp.push(map);
						}
						this.operatorArray = this.operatorArray.concat(operatorTemp);
					}
				});
			},
			getGoods() {
				goodsList(this.goodsQuery).then(res => {
					if (res.code == '0') {
						let goodsTemp = [];
						let map = {};
						map["value"] = null;
						map["text"] = "--请选择--";
						goodsTemp.push(map);
						for (let item of res.data) {
							let map = {};
							map["value"] = item.code;
							map["text"] = item.name;
							goodsTemp.push(map);
						}
						this.goodsArray = this.goodsArray.concat(goodsTemp);
					}
				});
			},
			getInfo() {
				uni.showLoading({
					title: "加载中..."
				});
				goodsInList({
					id: this.formData.id
				}).then(res => {
					if (res.code == '0') {
						this.formData = res.data[0];
						this.formData.goodsCodeAndName = this.formData.goodsCode + "," + this.formData.goodsName;
						this.formData.operatorAndStall = this.formData.stallId + "," + this.formData.operatorId;
						//获取商铺名列表
						this.getStall();
						//加载图片
						if(this.formData.url){
							let urlList = common.removeTrim(this.formData.url.split(","));
							for (let i = 0; i < urlList.length; i++) {
								this.imageList.push(urlList[i]);
							}
						}
					}
					uni.hideLoading();
				});
			},
			submit: function(isSubmit) {
				if (!this.formData.stallId) {
					uni.showToast({
						title: "请选择商铺名",
						icon: "none"
					})
					return;
				}
				if (!this.formData.goodsCode) {
					uni.showToast({
						title: "请选择品种",
						icon: "none"
					})
					return;
				}
				if (!this.formData.amount && !this.formData.inAmount) {
					uni.showToast({
						title: "请输入进场重量或进场数量",
						icon: "none"
					})
					return;
				}
				uni.showLoading({
					title: "保存中..."
				});
				if (!this.formData.id) {
					this.save()
				} else {
					this.update();
				}
			},
			save() {
				goodsInSave(this.formData).then(res => {
					if (res.code == '0') {
						uni.showToast({
							title: '保存成功',
							duration: 2000
						});
						setTimeout(function() {
							uni.redirectTo({
								url: 'goodsTrace'
							});
						}, 2000);
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			update() {
				goodsInUpdate(this.formData).then(res => {
					if (res.code == '0') {
						uni.showToast({
							title: '保存成功',
							duration: 2000
						});
						setTimeout(function() {
							uni.redirectTo({
								url: 'goodsTrace'
							});
						}, 2000);
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			doBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			doAdd() {
				this.pageName = '进场新增';
				//启用编辑
				this.disabled = false;
				this.disabled1 = false;
			},
			doUpdate() {
				this.pageName = '进场修改';
				//启用编辑
				this.disabled = false;
				this.disabled1 = false;
			},
			doDelete() {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '确认删除该数据',
					success: function(res) {
						if (res.confirm) {
							goodsInDelete(_this.formData.id).then(res => {
								if (res.code == '0') {
									uni.showToast({
										title: '删除成功',
										duration: 2000
									});
									setTimeout(function() {
										uni.redirectTo({
											url: 'goodsTrace'
										});
									}, 2000);
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none',
										duration: 2000
									});
								}
							});
						}
					}
				})
			}
		},
		onLoad(option) {
			this.uploadUrl = baseURL + 'file/upload';
			if (option.id) {
				this.pageName = '进场详情';
				//禁用输入框
				this.disabled = true;
				this.disabled1 = true;
				this.formData.id = option.id;
			}
		},
		onShow() {
			this.$resetToken().then(() => {
				//获取商铺区域
				this.getStallType();
				//获取经营户
				this.getOperator();
				//获取商品
				this.getGoods();	
				if(this.formData.id){
					this.getInfo();
				}
			}).catch(() => {
				uni.navigateTo({
					url: '../../../pages/login/login'
				});
			})
		}
	};
</script>

<style lang="scss"></style>
