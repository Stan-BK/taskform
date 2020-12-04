const connection = require('../sql')


const removeArtical = (artical) => {
  return new Promise((resolve,reject) => {

    let params=''
    for(let i of artical)
    {
      params = params + i + ','
    }
    params = params.slice(0,params.length-1)

    const deleteArtical = `DELETE FROM articals WHERE id in (${params})`
    console.log(deleteArtical)
    connection.query(deleteArtical, function (err, result) {
      if (err) {
        console.log(err)
        reject(err)
      } else if (result) {
        resolve('删除成功！')
      }
    })
  })
}

module.exports = (artical) => {
  return removeArtical(artical)
}