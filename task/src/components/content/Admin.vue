<template>
  <div id="admin">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="8">
          <el-form-item label="用户名" required prop="username" :rules="[
                  { required: true, message: '用户名不能为空'}
                ]">
            <el-input v-model="form.username" ref="username"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="8">
          <el-form-item label="密码" required prop="password" :rules="[
                  { required: true, message: '密码不能为空'}
                ]">
            <el-input v-model="form.password" type="password" ref="password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="8">
          <el-form-item label="职位">
            <el-radio-group v-model="form.resource">
              <el-radio label="部长"></el-radio>
              <el-radio label="部员"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>   
      <el-row type="flex" class="row-bg" justify="center">
        <el-row type="flex" class="row-bg" justify="end">
          <el-col :span="8">
            <el-form-item label="记住密码">
              <el-switch v-model="form.remember"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>  
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">登录</el-button>
        <el-button @click="clearForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
      return {
        form: {
          username: this.$store.state.username,
          password: this.$store.state.password,
          remember: this.$store.state.isremember,
          resource: ''
        }
      }
    },
    methods: {
      confirmForm (formName) {
        if (this.$refs.username.value === '' && this.$refs.password.value === '') {
          this.$refs[formName].validate((valid) => {
            if (!valid) {
              return false;
            }
          })
          return true
        } else if (this.$refs.username.value === '') {
          this.$refs[formName].validate((valid) => {
            if (!valid) {
              return false;
            }
          })
          return true
        } if (this.$refs.password.value === '') {
          this.$refs[formName].validate((valid) => {
            if (!valid) {
              return false;
            }
          })
          return true
        } else {
          return false
        }
      },
      onSubmit(formName) {
        const isNull = this.confirmForm(formName)
        if(!isNull)
        {
          this.$store.dispatch('login',{
            username: this.form.username,
            password: this.form.password
          }).then(() => {
            if (this.form.remember) {
              this.$store.commit('saveForm',{
                username: this.form.username,
                password: this.form.password
              })
            } else {
              this.$store.commit('deleteForm')
            }
            this.$router.push('/edit')
          },err => {
            if (err.response.status === 500) { 
              this.$alert('服务器无响应','error' , {
                confirmButtonText: '确定'
              })
            } else if (err.response.status === 400) {
              this.$alert(`${err.response.data}`,'error' , {
                confirmButtonText: '确定'
              })
            } else {
              this.$alert(`${err.response.data}`,'error' , {
                confirmButtonText: '确定'
              })
            }
          })
        }
      },
      clearForm () {
        this.form.username = this.form.password = ''
      }
    }
}
</script>
<style scoped>
  #admin{
    margin-top:5%;
  }
</style>