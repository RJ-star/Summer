<template>
    <div class="app">
        <el-container>
			<el-aside class="app-side app-side-left"
					:class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
				<el-dropdown trigger="hover"
							:hide-on-click="false">
				<span class="el-dropdown-link">
				<div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
				<div class="block" v-for="size in sizeList" :key="size">
					<el-avatar :size="size" :src="circleUrl"></el-avatar>
				</div>
				</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>{{username}}</el-dropdown-item>
						<el-dropdown-item divided>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided
										@click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<div>
					<!-- 我是样例菜单 -->
					<el-menu default-active="1-4-1"
							class="el-menu-vertical-demo"
							@open="handleOpen"
							:collapse="isCollapse">
						<el-menu-item index="1">
							<i class="el-icon-s-platform"></i>
							<span slot="title">工作台</span>
						</el-menu-item>
						<el-menu-item index="2">
							<i class="el-icon-menu"></i>
							<span slot="title">我的桌面</span>
						</el-menu-item>
						<el-menu-item index="3">
							<i class="el-icon-document"></i>
							<span slot="title">团队空间</span>
						</el-menu-item>
						<el-menu-item index="4">
							<i class="el-icon-delete"></i>
							<span slot="title">回收站</span>
						</el-menu-item>
					</el-menu>
					<el-card>
						<p><el-button type="primary">新建</el-button></p>
							<p><el-button>模板库</el-button></p>
							<el-upload
								class="upload-demo"
								action="https://jsonplaceholder.typicode.com/posts/"
								:on-preview="handlePreview"
								:on-remove="handleRemove"
								:before-remove="beforeRemove"
								multiple
								:limit="3"
								:on-exceed="handleExceed"
								:file-list="fileList">
							<el-button >导入</el-button>
						</el-upload>
					</el-card>
					</div>
				</el-aside>
				<el-container>
					<el-header>
						<el-menu default-active="2"
							class="el-menu-demo tab-page"
							mode="horizontal"
							@select="handleSelect"
							active-text-color="#409EFF">
							<el-menu-item index="1" @click="gotoPatterns">模板库</el-menu-item>
							<el-menu-item index="2">当前模板</el-menu-item>
						</el-menu>
					</el-header>
				<el-main class="app-body">			
				<!-- <el-drawer
					:visible.sync="drawer"
					:with-header="false"
					:direction="ltr"
					size=200px>
					<el-menu
						class="el-menu-vertical-demo"
						@open="handleOpen"
						@close="handleClose">
						<el-menu-item index="1">求职信</el-menu-item>
						<el-menu-item index="2">辞职信</el-menu-item>
						<el-menu-item index="3">与朱元思书</el-menu-item>
						<el-submenu index="4">
							<template slot="title">爽文</template>
							<el-menu-item index="4-1">杨家赘婿</el-menu-item>
							<el-menu-item index="4-2">医术高超</el-menu-item>
							<el-menu-item index="4-3">百亿财产</el-menu-item>
						</el-submenu>
						<el-submenu index="5">
							<template slot="title">江诗寿</template>
							<el-menu-item index="5-1">苟利国家生死以</el-menu-item>
							<el-menu-item index="5-2">岂因祸福避趋之</el-menu-item>
						</el-submenu>
					</el-menu>
				</el-drawer> -->
				<quill-editor
					v-model="form.content"
					ref="content"
					:options="editorOption"
					style="height:370px;line-height:15px"
					@blur="onEditorBlur($event)"
					@focus="onEditorFocus($event)"
					@change="onContentChange($event)">
				</quill-editor>
				<div style="text-align: right;">
					<el-badge :value=gridData.length class="item">
						<el-button size="small" @click="dialogTableVisible = true">评论</el-button>
						<el-dialog style="text-align: left;" title="全部评论" :visible.sync="dialogTableVisible">
							<el-table :data="gridData">
								<el-table-column property="date" label="日期" width="150"></el-table-column>
								<el-table-column property="name" label="昵称" width="200"></el-table-column>
								<el-table-column property="comment" label="内容"></el-table-column>
							</el-table>
							&nbsp;<br>
							<el-form :inline="true" :model="formInline" class="demo-form-inline">
								<el-form-item label="发表评论" :label-width="formLabelWidth">
									<el-input v-model="formcomment.comment" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="onSubmit">发表</el-button>
								</el-form-item>
						</el-form>
						</el-dialog>
					</el-badge>
					&#8195;
					<el-button size="small">选择该模板</el-button>
				</div>
			</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
    export default {
        name: 'Detail',
        data() {
            return {
				currentDate: new Date(),
                username: '',
				drawer: false,
                isCollapse: false,
				gridData: [{
					date: '2016-05-02',
					name: '王小虎',
					comment: '生而为人，我很抱歉'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					comment: '生吃个人，我很抱歉'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					comment: '生不出人，我很抱歉'
				}, {
					date: '2016-05-03',
					name: '三日杀神',
					comment: '敢不敢比划比划什么叫黑手'
				}],
				formcomment: {
					comment: ''
				},
				formLabelWidth: '80px',
				dialogTableVisible: false,
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
				form: {
					// 存储富文本框内容
					content:'这是一段测试文字<br>富文本编辑器，Rich Text Editor, 简称 RTE, 它提供类似于 Microsoft Word 的编辑功能，容易被不会编写 HTML 的用户并需要设置各种文本格式的用户所喜爱。它的应用也越来越广泛。最先只有 IE 浏览器支持，其它浏览器相继跟进，在功能的丰富性来说，还是 IE 强些。虽然没有一个统一的标准，但对于最基本的功能，各浏览器提供的 API 基本一致，从而使编写一个跨浏览器的富文本编辑器成为可能。',
				},
				editorOption: { // 定义富文本编辑器显示
					modules:{
						toolbar:[
							['bold','italic','underline','strike'], // 加粗、倾斜、下划线、删除线
							[{'header':1},{'header':2}], // 标题一、标题二
							[{'list':'ordered'},{'list':'bullet'}], // 列表
							[{'color':[]},{'background':[]}], // 字体颜色、背景颜色
						]
					}
				}
            }
        },
        methods: {
            toggleSideBar() {
                this.isCollapse = !this.isCollapse
            },
            logout: function () {
                this.$confirm('确认退出?', '提示', {})
                    .then(() => {
                        sessionStorage.removeItem('user');
                        this.$router.push('/login');
                    })
                    .catch(() => { });
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
			gotoPatterns() {
				this.$router.push({
					path: "/Patterns"
				});
			}
        },
        mounted: function () {
            let user = sessionStorage.getItem('user');
            if (user) {
                this.username = user;
            }
        },
    }

</script>

<style>
.el-header {
	color: #333;
	line-height: 60px;
}
  
.el-aside {
	color: #333;
}
  
.time {
	font-size: 13px;
	color: #999;
}
  
.bottom {
	margin-top: 13px;
	line-height: 12px;
}

.button {
	padding: 0;
	float: right;
}

.image {
	width: 100%;
	display: block;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
}
  
.clearfix:after {
	clear: both
}
</style>
