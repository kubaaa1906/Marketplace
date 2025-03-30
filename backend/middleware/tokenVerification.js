const jwt = require("jsonwebtoken");

function tokenVerification(req, res, next){
    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decodeuser) => {
        if(err){
            console.log("Unauthorized");
            return res.status(401).send({ message: "Unauthorized!" });
        }
        console.log("Token OK, user: " + decodeuser._id);
        req.user = {
            id: decodeuser._id,
            role: decodeuser.role
        }
        next();
    })
}

module.exports = tokenVerification;
