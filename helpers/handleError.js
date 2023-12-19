const httpError =(res, error) =>{
    res.status(500)
    res.send({error: "Algo ocurrió", errDetail:error})
}

module.exports = {
    httpError
}