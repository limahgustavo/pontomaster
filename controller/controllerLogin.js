const db = require('../database/connection')

const createSession = (data) => {
    return new Promise((resolve, reject) => {
        try {

            const {
                email,
                password
            } = data

            let query = "select `password`, lv_access, name, `active` from control_point.control_users where email = ?"

            db.query(query, [email], (err, result) => {
                if (!err) {
                    if (result[0] == null) {
                        reject({
                            success: false,
                            msg: "EMAIL NÃO ENCONTRADO"
                        })
                    } else if (result[0].password == password && result[0].active == "enabled") {
                        resolve({
                            success: true,
                            msg: "LOGIN EFETUADO COM SUCESSO",
                            name: result[0].name,
                            lv_access: result[0].lv_access,
                            active: result[0].active
                        })
                    } else {
                        reject({
                            success: false,
                            msg: "CREDENCIAIS INVALIDAS OU USUARIO NÃO AUTORIZADO"
                        })
                    }
                } else {
                    reject({
                        success: false,
                        msg: "ERRR: createSession" + err + "DATABASE"
                    })
                }
            })
        } catch (err) {
            reject({
                success: false,
                msg: "ERRO, CONTATE O ADMINISTRADOR\n"+err
            })
        }
    })
}

const loginauthetication = async (req, res) => {
    try {
        let result = await createSession(req.body)
        if(result.success){
            req.session.email = req.body.email
            req.session.name = result.name
            req.session.lv_access = result.lv_access
            req.session.active = result.active
            res.json(result)
        }
    } catch (err) {
        res.json(err)
    }

}

const login = (req, res) => {
    res.render("login")
}

const logout = (req, res)=>{
    req.session.destroy();
    res.redirect('/login')
}

module.exports = {
    login,
    loginauthetication,
    logout
}