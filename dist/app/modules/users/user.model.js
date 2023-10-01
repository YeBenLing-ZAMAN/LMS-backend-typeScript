"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const UserSchema = new mongoose_1.Schema(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangeAt: {
      type: Date,
    },
    student: { type: mongoose_1.Schema.Types.ObjectId, ref: "Student" },
    faculty: { type: mongoose_1.Schema.Types.ObjectId, ref: "Faculty" },
    admin: { type: mongoose_1.Schema.Types.ObjectId, ref: "Admin" },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
UserSchema.pre("save", function (next) {
  return __awaiter(this, void 0, void 0, function* () {
    //hashing user password.
    this.password = yield bcrypt_1.default.hash(
      this.password,
      Number(config_1.default.bcrypt_salt_rounds)
    );
    if (!this.needsPasswordChange) {
      this.passwordChangeAt = new Date();
    }
    next();
  });
});
UserSchema.methods.isUserExist = function (id) {
  return __awaiter(this, void 0, void 0, function* () {
    const user = yield exports.User.findOne(
      { id },
      { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
    ).lean();
    return user;
  });
};
UserSchema.methods.isPasswordMatch = function (givenPassword, savedPassword) {
  return __awaiter(this, void 0, void 0, function* () {
    const isMatched = yield bcrypt_1.default.compare(
      givenPassword,
      savedPassword
    );
    return isMatched;
  });
};
exports.User = (0, mongoose_1.model)("User", UserSchema);
