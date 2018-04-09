export default {
  getTodayDate () {
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear()
    dd = (dd < 10 ? '0' : '') + dd
    mm = (mm < 10 ? '0' : '') + mm
    return yyyy + '-' + mm + '-' + dd
  }
}
