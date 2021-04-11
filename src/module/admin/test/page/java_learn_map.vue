<template>
  <el-row>
    <el-row>
      <el-col :span="5" style="position: relative">
        <el-card style="margin: 0 auto;border-radius: 10px;min-height: 1500px">
          <el-input
            placeholder="输入关键字进行过滤"
            size="mini"
            clearable
            v-model="filterText">
          </el-input>
          <div style="height: 5px"></div>
          <el-tree
            ref="tree"
            :data="javaLearnnings"
            node-key="value"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            :render-content="renderContent">
          </el-tree>
        </el-card>

      </el-col>
      <!--      show-checkbox -->
      <el-col :span="17" :offset="1">
        <el-card v-if="rightClick" style="background-color: aliceblue">
          <div slot="header" class="clearfix">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="(crumb,index) in rightNodeDataList" :key="index">{{ crumb.label }}
              </el-breadcrumb-item>
            </el-breadcrumb>
            <el-popover
              style="float: right; padding: 3px 0" type="text"
              placement="right"
              width="400"
              trigger="click">
              <div>
                <el-button @click="blogDialog = true" type="text" style="color: #566573" size="mini">新增博客</el-button>
              </div>
              <el-button slot="reference" type="text">~~~</el-button>
            </el-popover>
          </div>

          <div>
            <span
              style="line-height: 1.6;    margin-bottom: 20px;    color: #566573;">{{ rightNodeDataList[rightNodeDataList.length - 1]['desc'] }}</span>
          </div>
        </el-card>



        <div style="height: 20px"></div>

        <el-card v-for="(blog,index) in blogList" :key="index" style="margin-bottom: 10px">
          {{blog.title}}
          <el-divider></el-divider>
<!--          <div>-->
<!--            <span>{{blog.category}}</span>-->
<!--            <el-divider direction="vertical"></el-divider>-->
<!--            <span>创建时间 ：{{ blog.createDate }}</span>-->
<!--            <el-divider direction="vertical"></el-divider>-->
<!--            <span>更新时间 ：{{ blog.updateDate }}</span>-->
<!--          </div>-->


        </el-card>

      </el-col>
    </el-row>

    <el-row class="dialgos">
      <el-dialog
        title="提示"
        :visible.sync="blogDialog"
        width="50%"
        >
          <el-form label-width="150px">
            <el-form-item label="分类">
              <el-breadcrumb separator="/" style="width: 100%">
                <el-breadcrumb-item v-for="(crumb,index) in rightNodeDataList" :key="index">{{ crumb.label }}
                </el-breadcrumb-item>
              </el-breadcrumb>
            </el-form-item>
            <el-form-item label="标题">
              <el-input placeholder="请输入博客标题" v-model="blogPojo.title"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-button @click="blogSubmit" size="mini">确定</el-button>
            </el-form-item>
          </el-form>
      </el-dialog>
    </el-row>

  </el-row>
</template>

<script>
import * as api from '../api/api'

export default {
  name: "java_learn_map",
  data() {
    return {
      blogPojo:{
        category: undefined,
        title:undefined
      },
      blogDialog:false,
      blogList:[],
      javaLearnnings: [],
      rightNode: {},
      rightNodeDataList: [],
      rightClick: false,
      filterText:undefined
    }
  },
  watch: {
    filterText(val) {
      console.log(val);
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    blogSubmit(){

      api.saveBlog(this.blogPojo).then(res=>{
        if (res.success){
          this.$message.success('新增博客成功');
          this.blogDialog = false;
          let categoryData = this.rightNodeDataList[this.rightNodeDataList.length - 1];
          let category = categoryData.label;
          this.blogPojo.category = category;
          this.listBlog({"category":category})
        }
      })

    },
    listBlog(reload){
      api.listBlog(reload).then(res=>{
        console
        .log(res)
        if (res.success){
          this.blogList = res.data;
        }
      })
    },

    filterNode(value, data) {
      if (!value) return true;

      console.log(`value`,value)
      console.log(`data.label`,data.label)

      let newValue = value.toLowerCase();
      let newDataLabel = data.label.toLowerCase();
      return newDataLabel.indexOf(newValue) !== -1;
      // return data.label.indexOf(value) !== -1;
    },
    getTreeNode(node) { //获取当前树节点和其父级节点
      if (node) {
        if (node.label !== undefined) {
          this.rightNodeDataList.unshift(node.data); //在数组头部添加元素
          this.getTreeNode(node.parent); //递归
        }
      }
    },

    treeItemClick(node, data, store) {
      this.rightClick = true;
      console.log('node', node)
      console.log('data', data)
      console.log('store', store)
      // this.rightNode = node.data;
      // while ()
      this.rightNodeDataList = [];
      this.getTreeNode(node);
      // this.$message.info('树形item被点击')

      let categoryData = this.rightNodeDataList[this.rightNodeDataList.length - 1];
      let category = categoryData.label;
      console.log(category)
      this.blogPojo.category = category;
      this.listBlog({"category":category})
    },
    cyclePush(data) {
      this.rightNodeDataList.unshift(data);
    },
    renderContent(h, {node, data, store}) {
      return (
        <span class="custom-tree-node"
              style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" style="font-size: 12px;margin-right: 40px;"
                         on-click={() => this.treeItemClick(node, data, store)}>查看</el-button>
            </span>
          </span>);
    },
    javaLearnMap() {
      api.javaLearnMap().then(res => {
        if (res.success) {
          this.javaLearnnings = res.data;
        }
      }).then(res=>{
        this.$message.success(

          {
            dangerouslyUseHTMLString: true,
            message: '<strong>请点击 <el-button>查看</el-button> 按钮</strong>'
          }

        );
      })
    }
  },
  mounted() {

    this.javaLearnMap();
  }
}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

</style>
