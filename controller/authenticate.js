const authenticate = (req, res, next)=>{
    if(req.session.email)
    next()
    else
    res.render('login')
}

const authenticateFull = (req, res, next)=>{
    if(req.session.email && req.session.lv_access == 2)
    next()
    else
    res.render('login')
}

module.exports = {
    authenticate,
    authenticateFull
}