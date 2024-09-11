const catchAsync = require('../utils/catchAsync');
const { userService, tokenService, authService } = require('../services');
const httpStatus = require('http-status');

const register = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user.id);
    res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.login(
        email,
        password,
        req.connection.remoteAddress,
    );
    const tokens = await tokenService.generateAuthTokens(user.id);
    res.status(httpStatus.OK).send({ user, tokens });
});

const refreshToken = catchAsync(async (req, res) => {
    const tokens = await authService.refreshAuthToken(req.body.refreshToken);
    res.status(httpStatus.OK).send({ ...tokens });
});

module.exports = { register, login, refreshToken };
