const express = require('express')
const route = express()
const { index } = require('../controller/controllerIndex')
const { authenticate , authenticateFull  } = require('../controller/authenticate')

route.get('/',authenticate, index)



module.exports = route