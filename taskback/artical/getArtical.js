const connection = require('../sql')

const getArtical = (userid) => {
  return new Promise((resolve,reject) => {

    const getArtical = `SELECT * from articals where userid=${userid}`

    connection.query(getArtical, function (err, result) {
      if (err) {
        console.log(err)
        reject(err)
      } else if (result) {
        resolve(result)
      }
    })
  })
}

module.exports = (userid) => {
  return getArtical(userid)
}