const { userService, tokenService } = require('../services');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const { generateAuthTokens } = require('./token.service');
const { emailIpBruteLimiter, slowerBruteLimiter, emailBruteLimiter } = require('../middlewares/authLimiter');

const login = async (email, password, ippAddr) => {
    const promises = [slowerBruteLimiter.consume(ippAddr)];
    const user = await userService.getUserByEmail(email);
    if(!user || !(await user.isPasswordMatch(password))) {
        user && 
            promises.push([
                emailIpBruteLimiter.consume(`${email}_${ippAddr}`),
                emailBruteLimiter.consume(email)
                ]);
        await Promise.all(promises);
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user;
}

const refreshAuthToken = async (refreshToken) => {
    try {
        const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
        const user = await userService.getUserById(refreshTokenDoc.user);
        if(!user) {
            throw new Error()
        }
        await refreshTokenDoc.deleteOne();
        return generateAuthTokens(user.id);
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authtenticate');
    }
}

module.exports = { login, refreshAuthToken }