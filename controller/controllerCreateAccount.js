const db = require('../database/connection')

const verifyPassword = (data) => {
    return new Promise((resolve, reject) => {
        const {
            senha,
            confirme_senha
        } = data

        if (senha == confirme_senha) {
            resolve(true)
        } else {
            reject({
                success: false,
                msg: "SENHAS NÃO CONFEREM"
            })
        }
    })
}

const verifyEmail = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const {
                email,
            } = data

            let query = `select count(email) as cont from control_point.control_users where email = ?`;

            db.query(query, [email], (err, result) => {
                if (!err) {
                    if (result[0].cont == 0) {
                        resolve({
                            success: true
                        })
                    } else {
                        reject({
                            success: false,
                            msg: "EMAIL JÁ CADASTRADO"
                        })
                    }
                } else {
                    reject({
                        success: false,
                        erro: "ERRO DATABASE"
                    })
                }
            })
        } catch (err) {
            reject({
                success: false,
                msg: "verifyEmail:" + err + "\nERRO NO SISTEMA, CONTATE O ADMINISTRADOR"
            })
        }
    })
}

const createAccountDatabase = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const {
                email,
                nome,
                senha,
            } = data
        
            let query = "insert into control_point.control_users (email, `name`, `password`) values (?,?,?)";

                db.query(query, [
                    email,
                    nome,
                    senha,
                ], (err) => {
                    if (!err) {
                        resolve({
                            success: true,
                            msg: "CONTA CRIADA"
                        })
                    } else {
                        reject({
                            success: false,
                            msg: "createAccountDatabase:" + err + "\nERRO NO SISTEMA, CONTATE O ADMINISTRADOR"
                        })
                    }
                })
        } catch (err) {
            reject({
                success: false,
                msg: "createAccountDatabase:" + err + "\nERRO NO SISTEMA, CONTATE O ADMINISTRADOR"
            })
        }
    })
}

const registration = async (req, res) => {
    try {
        await verifyPassword(req.body)
        await verifyEmail(req.body)
        let createAccount = await createAccountDatabase(req.body)
        res.send(createAccount)
    } catch (err) {
        res.send(err)
    }
}

const createAccount = (req, res) => {
    res.render('createAccount')
}

module.exports = {
    createAccount,
    registration
}