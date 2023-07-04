"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../users/user.model");
const config_1 = __importDefault(require("../../../config"));
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = payload;
    const user = new user_model_1.User(); // creating instance of a user.
    // checking user by custom our created instance methods
    const isUserExist = yield user.isUserExist(id);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    // isMatching password
    const isPasswordMatch = isUserExist.password &&
        (yield user.isPasswordMatch(password, isUserExist.password));
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Password is incorrect");
    }
    const { id: userId, role, needsPasswordChange } = isUserExist;
    // create JWT token
    const accessToken = jwtHelper_1.jwtHelpers.createToken({
        userId,
        role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expiries_in);
    // created refresh token
    const refreshToken = jwtHelper_1.jwtHelpers.createToken({
        userId,
        role,
    }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expiries_in);
    return {
        accessToken,
        refreshToken,
        needsPasswordChange,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // verify token
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
        //
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "invalid refresh Token");
    }
    const { userId } = verifiedToken;
    const user = new user_model_1.User(); // creating instance of a user.
    const isUserExist = yield user.isUserExist(userId);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    // generate new token
    // create JWT token
    const newAccessToken = jwtHelper_1.jwtHelpers.createToken({
        id: isUserExist.id,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expiries_in);
    return {
        accessToken: newAccessToken,
    };
});
const changePassword = (userinfo, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    // checking user?
    const user = new user_model_1.User();
    const isUserExist = yield user_model_1.User.findOne({ id: userinfo === null || userinfo === void 0 ? void 0 : userinfo.userId }).select("+password");
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    // checking password?
    const isPasswordMatch = isUserExist.password &&
        (yield user.isPasswordMatch(oldPassword, isUserExist.password));
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Old password is incorrect");
    }
    // hash password before saving
    /*const newHashPassword = await bcrypt.hash(
      newPassword,
      Number(config.bcrypt_salt_rounds as string)
    );
  
      const updateData = {
      password: newHashPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    };
  
    await User.findOneAndUpdate({ id: userinfo?.userId }, updateData); */
    // updating using save()
    isUserExist.password = newPassword;
    isUserExist.needsPasswordChange = false;
    isUserExist.save();
});
exports.AuthService = {
    login,
    refreshToken,
    changePassword,
};
