import Vue from 'vue'
import Vuex from 'vuex'
//import router from '../router/index'
//import axios from 'axios'
import axios from '../axios/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'wbk',
    islogin: false,
    isremember: false,
    title: '首页',
    userid: -1,
    username: '',
    password: '',
    articalId: 0,
    artical: [],
    editStatus: false,
    token: '',
    route: '/admin'
  },
  mutations: {
    init (state) {
      if (localStorage.Webusername) {
        state.username = localStorage.getItem('Webusername')
      }
      if (localStorage.Webpassword) {
        state.password = localStorage.getItem('Webpassword')
      }
      if (localStorage.Webisremember) {
        state.isremember = Boolean(localStorage.getItem('Webisremember'))
      }
    },
    changeisLogin (state) {
      state.islogin = true
    },
    changeLoginState (state) {
      state.islogin = false
    },
    changeTitle (state,title) {
      state.title = title
    },
    isEdit (state) {
      state.editStatus = true
    },
    changeEditStatus (state) {
      state.editStatus = false
    },
    changeRoute (state, path) {
      state.route = path
    },
    notEdit (state) {
      state.editStatus = false
    },
    saveForm (state,form) {
      state.username = form.username
      state.password = form.password
      state.isremember = true
      localStorage.setItem('Webusername', form.username)
      localStorage.setItem('Webpassword', form.password)
      localStorage.setItem('Webisremember', 1)
    },
    saveUserid (state,id) {
      state.userid = Number(id)
    },
    saveNickname (state,nickname) {
      state.name = nickname
    },
    deleteForm (state) {
      state.username = ''
      state.password = ''
      state.isremember = false
      localStorage.removeItem('Webusername')
      localStorage.removeItem('Webpassword')
      localStorage.removeItem('Webisremember')
    },
    createArtical (state, artical) {
      state.artical.push(artical)
    },
    saveArtical (state,artical) {
      for(let i of state.artical) {
        if (i.id === artical.id) {
          i.filename = artical.filename
          i.description = artical.description
          i.content = artical.content
          break
        }
      }
    },
    deleteArtical (state,articalList) {
      state.artical = state.artical.filter((num) => {
        return articalList.indexOf(num.id) === -1
      })
    },
    initArtical (state,artical) {
      state.artical = artical
    }
  },
  actions: {
    login ({commit,dispatch},form) {
      return new Promise((resolve,reject) => {
        axios({
          method: 'post',
          url: '/login',
          params: {
            username: form.username,
            password: form.password
          }
        }).then(val => {
          commit('changeisLogin')
          commit('saveUserid',val.data.id)
          commit('saveNickname',val.data.nickname)
          dispatch('loadArtical')
          resolve('登录成功')
        },err => {
          reject(err)
        })
      })
    },
    loadArtical ({state,commit}) {
      axios({
        method: 'get',
        url: '/getArtical',
        params: {
          userid: state.userid
        }
      }).then(val => {
        commit('initArtical',val.data)
      })
    },
    confirmsaveArtical ({state,commit},artical) {
      return new Promise((resolve, reject) => {
        let count = 0
        for(let i of state.artical) {
          if (i.filename === artical.filename && i.id !== artical.id) {
            count++
          }
        }
        if (count < 1) {
          axios({
            method: 'post',
            url: '/saveArtical',
            params: {
              id: artical.id,
              filename: artical.filename,
              description: artical.description,
              content: artical.content
            }
          }).then(val => {
            commit('saveArtical',artical)
            resolve(val.data)
          }).catch(() => {
            reject('修改失败！')
          })
        } else {
          reject('已存在重复文件名！')
        }
      })
    },
    confirmcreateArtical ({state,commit},artical) {
      return new Promise((resolve,reject) => {
        let count = 0
        for(let i of state.artical) {
          if (i.filename === artical.filename) {
            count++
          }
        }
        if (count !== 1) {
          axios({
            method: 'post',
            url: '/createArtical',
            params: {
              userid: state.userid,
              filename: artical.filename,
              description: artical.description,
              content: artical.content
            }
          }).then(val => {
            artical.id = val.data
            commit('createArtical',artical)
            resolve('创建成功！')
          }).catch(() => {
            console.log('创建失败！')
            reject('创建失败！')
          })
        } else {
          reject('已存在重复文件名！')
        }
      })
    },
    confirmDeleteArtical ({commit},artical) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: '/removeArtical',
          params: {
            artical
          }
        }).then(val => {
          commit('deleteArtical',artical)
          resolve(val.data)
        }).catch(() => {
          reject('删除失败！')
        })
      })
    }
  },
  modules: {
  }
})
