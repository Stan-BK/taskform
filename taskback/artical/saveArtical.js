const connection = require('../sql')


const saveArtical = (artical) => {
  return new Promise((resolve,reject) => {

    const updataArtical = `UPDATE articals SET filename='${artical.filename}',description='${artical.description}',content='${artical.content}' WHERE id=${artical.id}`

    connection.query(updataArtical, function (err, result) {
      if (err) {
        console.log(err)
        reject(err)
      } else if (result) {
        resolve('保存成功！')
      }
    })
  })
}

module.exports = (artical) => {
  return saveArtical(artical)
}