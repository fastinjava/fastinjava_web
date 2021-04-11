<template>
  <el-row>

    <el-row>
      <h2>用户管理</h2>
    </el-row>

    <el-row style="padding: 20px">
      <el-button type="primary" size="mini" @click="insertUserVisible = true">新增</el-button>
      <el-button type="primary" size="mini" @click="init">刷新</el-button>
    </el-row>

    <el-row>
      <avue-crud v-if="false"
                 :data="userList"
                 :option="option"
                 @row-save="rowSave"
      >
        <template slot="roleDTOList" slot-scope="scope">
          <el-tag v-for="(role,index) in scope.row.roleDTOList" :key="index" :style="{marginRight:'15px'}">
            {{ role.roleName }}
          </el-tag>
        </template>
      </avue-crud>
    </el-row>

    <el-row>
      <el-table

        :data="userList"
        border
        :stripe="true"
        :fit="true"
        style="width: 100%">
        <el-table-column
          prop="userId"
          label="用户id"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户姓名"
          width="100"

        >
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="password"-->
<!--          label="用户密码"-->
<!--        >-->
<!--        </el-table-column>-->
        <el-table-column
          prop="userNickName"
          label="用户昵称"
        >
        </el-table-column>
        <el-table-column
          prop="userEmail"
          label="用户邮箱"
        >
        </el-table-column>

        <el-table-column
          label="角色信息"
        >
          <template slot-scope="scope">
            <el-tag v-for="(role,index) in scope.row.roleDTOList" :key="index" :style="{marginRight:'15px'}">
              {{ role.roleName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
        >
          <template slot-scope="scope">
            {{ $moment(scope.row.createTime).format('YYYY年MM月DD日 h:mm:ss a') }}
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
        >
          <template slot-scope="scope">
            {{ $moment(scope.row.updateTime).format('YYYY年MM月DD日 h:mm:ss a') }}
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-row>

    <el-row>
      <el-dialog
        title="提示"
        :visible.sync="insertUserVisible"
        width="70%"
      >
        <el-form size="medium" label-width="200px">
          <!--          <el-form-item label="userId" prop="userId">-->
          <!--            <el-input v-model="userInsertVO.userId" placeholder="userIduserIduserId"  :style="{width: '100%'}"></el-input>-->
          <!--          </el-form-item>-->
          <el-form-item label="userName" prop="userName">
            <el-input v-model="userInsertVO.userName" placeholder="userName" :style="{width: '100%'}"></el-input>
          </el-form-item>

          <el-form-item label="password" prop="password">
            <el-input v-model="userInsertVO.password" placeholder="请输入密码" :style="{width: '100%'}"></el-input>
          </el-form-item>

          <el-form-item label="userEmail" prop="userEmail">
            <el-input v-model="userInsertVO.userEmail" placeholder="userEmail" :style="{width: '100%'}"></el-input>
          </el-form-item>

          <el-form-item label="userNickName" prop="userNickName">
            <el-input v-model="userInsertVO.userNickName" placeholder="userNickNameuserNickName"
                      :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="请选择角色" >
            <el-select v-model="userInsertVO.roleIdList" multiple placeholder="请选择" :style="{width: '100%'}">
              <el-option
                v-for="(item,index) in roleList"
                :key="index"
                :label="item.roleName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="large">
            <el-button @click="insertClick" size="mini" type="primary">确定</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
    </el-row>

  </el-row>
</template>

<script>
import * as userController from '../api/userController'
import * as roleController from '../../role_manage/api/api'

export default {
  name: "user_manage",
  data() {
    return {
      insertUserVisible: false,
      userList: [],
      option: {
        column: [
          {
            label: '用户id',
            prop: 'userId',
            addDisplay: false
          },
          {
            label: '用户姓名',
            prop: 'userName'
          }, {
            label: '用户角色列表',
            prop: 'roleDTOList',
            slot: true,
            addDisplay: false
          },
          {
            label: '用户密码',
            prop: 'password'
          },
          {
            label: '用户昵称',
            prop: 'userNickName'
          },
          {
            label: '用户邮箱',
            prop: 'userEmail'
          },
          {
            label: '请选择用户角色',
            prop: 'roleIdList',
            hider: true
          }

        ]
      },
      roleList:[],
      userInsertVO: {
        userEmail: undefined,
        userName: undefined,
        userNickName: undefined,
        password: undefined,
      },
    }
  },
  components: {},
  methods: {

    rowSave(form, done, loading) {

      console.log(form);

      this.$message.success('模拟网络请求')
      setTimeout(() => {
        this.$message.success('关闭按钮等待');
        loading();
      }, 1000)
      setTimeout(() => {
        this.$message.success('新增数据' + JSON.stringify(form));
        done(form);
      }, 2000)
    },
    insertClick() {
      this.insertUser(this.userInsertVO);
      this.insertUserVisible = false;
      this.userInsertVO = {};

    },

    insertUser(reload) {
      userController.insert(reload).then(res => {
        this.$message.info(res.message)
        this.init();
      });
    },
    listUsers(reload) {
      userController.listUsers(reload).then(res => {
        if (res.success) {
          this.userList = res.data.list;
        }
      });
    },
    listAllRoles() {
      roleController.list({"pageable": false}).then(res => {
        this.roleList = res.data.list;
      });
    },
    init() {
      this.listUsers({"pageable": false})
      this.listAllRoles();
    }

  },
  beforeCreate() {
  },
  beforeDestroy() {
  },
  beforeMount() {
  },
  created() {
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped>

</style>
