const { response } = require('express');
const connection = require('../sql')


const createArtical = (artical) => {
  return new Promise((resolve,reject) => {

    const addArtical = `INSERT INTO articals(userid,filename,description,content) VALUES(${artical.userid},'${artical.filename}','${artical.description}','${artical.content}')`
    const findArtical = `SELECT id FROM articals WHERE filename='${artical.filename}'`

    connection.query(addArtical, function (err, result) {
      if (err) {
        console.log(err)
        reject(err)
      } else if (result) {
        connection.query(findArtical, function (err, result) {
          if(result)
          {
            console.log(result)
            resolve(result[0].id.toString())
          } 
          else
          {
            console.log(err)
            reject(err)
          }  
        })
      }
    })
  })
}

module.exports = (artical) => {
  return createArtical(artical)
}