module.exports = {
  returnJsonError (res, err,status) {
    return res.status(status).send({
        status:false,
        error: err
      })
  },
  returnJsonResponse (res, obj) {
    obj["status"] = true
    return res.status(200).send(obj)
  }
}