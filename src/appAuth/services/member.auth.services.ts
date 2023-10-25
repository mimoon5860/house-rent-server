import { Request } from "express";
import AbstractServices from "../../abstract/abstract.service";
import Lib from "../../utils/lib/lib";
import config from "../../utils/config/config";

class MemberAuthServices extends AbstractServices {
  constructor() {
    super();
  }

  // register member services
  public async registerMember(req: Request) {
    return await this.prisma.$transaction(async (tx) => {
      const userModel = this.Models.userModel(tx);
      const { email, password, firstName, lastName, mobileNumber } = req.body;

      const userMember = await userModel.getUserMember({ email });
      if (userMember) {
        return {
          success: false,
          message: "Email already exist!",
          code: this.StatusCode.HTTP_CONFLICT,
        };
      }

      const files = (req.files as Express.Multer.File[]) || [];

      let photo: string | null = null;
      if (files.length) {
        photo = files[0].filename;
      }
      const userName = (
        email.split("@")[0] + Lib.otpGenNumberAndAlphabet(3)
      ).toLocaleLowerCase();

      const hashPass = await Lib.hashPass(password);

      const newUser = await userModel.insertUser({
        email,
        firstName,
        lastName,
        mobileNumber,
        password: hashPass,
        userName,
        photo,
      });

      await userModel.insertUserType({ userId: newUser.id });

      const newMember = await userModel.insertMember({ userId: newUser.id });

      const tokenData = {
        userId: newUser.id,
        memberId: newMember.id,
        userName,
        email,
        firstName,
        lastName,
        photo,
      };

      const token = Lib.createToken(tokenData, config.JWT_SECRET_USER, "72h");

      return {
        success: true,
        message: "Registration successful",
        code: this.StatusCode.HTTP_SUCCESSFUL,
        token,
      };
    });
  }

  // login member service
  public async loginMember(req: Request) {
    const { email, password } = req.body;
    const userModel = this.Models.userModel();
    const member = await userModel.getUserMember({ email });
    if (!member) {
      return {
        success: false,
        message: this.ResMsg.WRONG_CREDENTIALS,
        code: this.StatusCode.HTTP_UNAUTHORIZED,
      };
    }

    const { user, id: memberId } = member;

    const {
      password: hashedPass,
      id: userId,
      firstName,
      lastName,
      photo,
    } = user;

    const match = await Lib.compare(password, hashedPass);

    if (!match) {
      return {
        success: false,
        message: this.ResMsg.WRONG_CREDENTIALS,
        code: this.StatusCode.HTTP_UNAUTHORIZED,
      };
    }

    const tokenData = {
      userId,
      memberId,
      userName: user.userName,
      email,
      firstName,
      lastName,
      photo,
    };

    const token = Lib.createToken(tokenData, config.JWT_SECRET_USER, "72h");

    return {
      success: true,
      message: "Login successful",
      token,
      code: this.StatusCode.HTTP_SUCCESSFUL,
    };
  }
}

export default MemberAuthServices;
