<template>
  <div>
    <div class="edit clearfix">
      <div class="textarea clearfix">
        <div class="clearfix">
          <el-button class="compiler" type="primary" @click="input">运行</el-button>  
          <el-button class="compiler" type="info" @click="clearall">清空</el-button>  
        </div>
        <textarea id="textarea" @input="edited" v-model="form.content"></textarea>
      </div>
      <div class="iframe clearfix">
        <iframe id="iframe" frameborder="0"></iframe>
      </div>
    </div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <el-button type="primary" @click="dialogVisible = true">提交</el-button>
        <el-dialog
          title="提交内容"
          :visible.sync="dialogVisible"
          width="50%"
          :before-close="handleClose">
          
          <el-form ref="form" :model="form" label-width="80px">
            <el-row type="flex" class="row-bg" justify="center">
              <el-col :span="15">
                <el-form-item label="文件名" required prop="filename" :rules="[
                  { required: true, message: '文件名不能为空'},
                  { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ]">
                  <el-input v-model="form.filename" ref="filename"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="center">
              <el-col :span="20">
                <el-form-item label="描述">
                  <el-input type="textarea" v-model="form.description"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm('form')">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>  
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        filename: '',
        description: '',
        content: ''
      }
    }
  },
  watch: {
    '$route' (newValue) {
      if (!newValue.query.id) {
        this.form =  {
          filename: '',
          description: '',
          content: ''
        }
      }
    }
  },
  beforeRouteEnter (to,from,next) {
    next(vm => {
      vm.changeContent()
    })
  },
  methods: {
    open (msg) {
      this.$alert(`${msg}`, 'Tips', {
        confirmButtonText: '确定',
        callback: () => {
          this.$store.commit('notEdit')
          this.$router.push('/artical')
        }
      })
    },
    error (msg) {
      this.$alert(`${msg}`, 'Tips', {
        confirmButtonText: '确定',
        callback: () => {
            this.dialogVisible = true
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    confirm (formName) {
      this.dialogVisible = false
      if (this.$refs.filename.value.length >=3 && this.$refs.filename.value.length <= 15) {
        if (this.$route.query.id) {
          this.$store.dispatch('confirmsaveArtical',{
            id: this.form.id,
            filename: this.form.filename,
            description: this.form.description !== ''? this.form.description : '无',
            content: this.form.content !== ''? this.form.content : '无'
          }).then(res => {
            this.open(res)
          }).catch(err => {
            this.error(err)
          })
        } else {
          this.$store.dispatch('confirmcreateArtical',{
              filename: this.form.filename,
              description: this.form.description !== ''? this.form.description : '无',
              content: this.form.content !== ''? this.form.content : '无'
          }).then(res => {
            this.open(res)
          }).catch(err => {
            this.error(err)
          })
        }
      } else {
        this.dialogVisible = true
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false;
          }
        });
      }
    },
    input () {
      let text = document.getElementsByTagName('textarea')[0].value;
      document.getElementById('iframe').contentDocument.body.innerHTML=text;
    },
    clearall () {
      document.getElementsByTagName('textarea')[0].value = '';
    },
    changeContent () {
      if(this.$route.query.id)
      {
        this.form = JSON.parse(JSON.stringify(this.$store.state.artical[this.$route.query.id]))
        this.$store.commit('isEdit')
      } else {
        this.form =  {
          filename: '',
          description: '',
          content: ''
        }
      }
    },
    edited () {
      this.$store.commit('isEdit')
    }
  }
}
</script>
<style scoped>
  .edit{
    height: 400px;
    margin-bottom: 10px;
  }
  .textarea{
    display: flex;
    flex-direction: column;
    float:left;
    width: 48%;
    height: 100%;
    margin-left:1%;
    margin-right: 1%;
    background-color: rgb(229, 233, 242);
    border-radius: 4px;
  }
  .compiler{
    float: right;
    margin: 5px 10px;
  }
  #textarea{
    flex: 1;
    width:95%;
    margin: 0 auto;
    margin-bottom: 5px;
    border: 1px solid  rgb(229, 233, 242);
    border-radius: 4px;
    padding:2px;
    height: auto;
  }
  .iframe{
    float: right;
    display: block;
    width: 48%;
    height: 100%;
    margin-left:1%;
    margin-right: 1%;
    background-color:  #fff;
    border:4px solid rgb(229, 233, 242);
    box-sizing: border-box;
    border-radius: 4px;
  }
  #iframe{
    width:100%;
    height: 100%;
  }
  .clearfix:after{display:block;content:'';clear:both;zoom:1;} 
</style>