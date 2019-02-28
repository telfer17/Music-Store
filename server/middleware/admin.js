let admin = (req,res,next) => {
  if(req.user.role === 0){
    return res.send('Permission denied')
  }
  next();
}

module.exports = { admin }
