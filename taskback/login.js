const connection = require('./sql')

connection.connect();


const validate = (form) => {
  return new Promise((resolve,reject) => {

    const selectUser = `SELECT id,password,nickname from admin where username='${form.username}'`

    connection.query(selectUser, function (error, results, fields) {
      if (error) {
        console.log(error)
        reject(error)
      } else if (results[0]) {
        if(form.password === results[0].password) {
          let obj = {
            id: results[0].id,
            nickname: results[0].nickname
          }
          resolve(JSON.stringify(obj))
        } else {
          reject('密码错误')
        }
      } else {
        reject('用户名不存在')
      }
    });
  })
}


module.exports = (form) => {
  return validate(form)
}