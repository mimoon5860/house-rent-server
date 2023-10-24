import { Request } from "express";
import AbstractServices from "../../abstract/abstract.service";
import Lib from "../../utils/lib/lib";

class MemberAuthServices extends AbstractServices {
  constructor() {
    super();
  }

  // register member services
  public async registerMember(req: Request) {
    return await this.prisma.$transaction(async (tx) => {
      const userModel = this.Models.userModel(tx);
      const {
        email,
        password,
        firstName,
        lastName,
        mobileNumber,
        address,
        areaId,
      } = req.body;

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

      const newMember = await userModel.insertMember({ userId: newUser.id });
    });
  }
}

export default MemberAuthServices;
