const { validateToken } = require("../services/auth");

function checkForAuthCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieVal=req.cookies[cookieName];
            if(!tokenCookieVal){
                return next();
            }
        try {
            const userPayLoad = validateToken(tokenCookieVal);
            req.user=userPayLoad;
        } catch (error) {
        }
        next();
    }
}


module.exports={
    checkForAuthCookie
}