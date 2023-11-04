import { Request } from "express";
import AbstractServices from "../../abstract/abstract.service";
import Lib from "../../utils/lib/lib";
import { IUpdateUserParams } from "../../utils/interfaces/userTypes";

class MemberService extends AbstractServices {
  constructor() {
    super();
  }

  // get profile service
  public async getProfile(req: Request) {
    const { memberId } = req.user;
    const userModel = this.Models.userModel();
    const member = await userModel.getUserMember({ memberId });

    if (!member) {
      return {
        success: false,
        message: this.ResMsg.HTTP_UNAUTHORIZED,
        code: this.StatusCode.HTTP_UNAUTHORIZED,
      };
    }

    const { address, area, id, user } = member;
    const { password, id: userId, ...rest } = user;

    return {
      success: true,
      message: this.ResMsg.HTTP_OK,
      code: this.StatusCode.HTTP_OK,
      data: {
        userId,
        memberId: id,
        address,
        area,
        ...rest,
      },
    };
  }

  public async changePassword(req: Request) {
    const { email, password, newPassword } = req.body;

    const userModel = this.Models.userModel();

    const member = await userModel.getUserMember({ email });
    if (!member) {
      return {
        success: false,
        message: this.ResMsg.WRONG_CREDENTIALS,
        code: this.StatusCode.HTTP_UNAUTHORIZED,
      };
    }

    const { password: hashedPass, id } = member.user;

    const match = await Lib.compare(password, hashedPass);

    if (!match) {
      return {
        success: false,
        message: this.ResMsg.WRONG_CREDENTIALS,
        code: this.StatusCode.HTTP_UNAUTHORIZED,
      };
    }

    const newHashedPass = await Lib.hashPass(newPassword);

    await userModel.changePassword(newHashedPass, id);

    return {
      success: true,
      message: this.ResMsg.PASSWORD_CHANGED,
      code: this.StatusCode.HTTP_OK,
    };
  }

  // update profile
  public async updateProfile(req: Request) {
    const { firstName, lastName, mobileNumber, address, areaId } = req.body;

    const { memberId, userId } = req.user;
    const userModel = this.Models.userModel();

    const member = await userModel.getUserMember({ memberId });

    if (!member) {
      return {
        success: false,
        message: this.ResMsg.HTTP_UNAUTHORIZED,
        code: this.StatusCode.HTTP_UNAUTHORIZED,
      };
    }

    const files = req.files as Express.Multer.File[] | [];
    let photo: string | null = null;
    if (files.length) {
      photo = files[0].filename;
    }

    const userInfo: IUpdateUserParams = {
      mobileNumber,
      firstName,
      lastName,
      photo,
    };
    await userModel.updateUser(userInfo, userId);

    await userModel.updateMember({ address, areaId }, memberId);

    return {
      success: true,
      code: this.StatusCode.HTTP_SUCCESSFUL,
      message: this.ResMsg.PROFILE_UPDATED,
    };
  }

  // delete profile
  public async deleteProfile(req: Request) {
    const { userId, memberId } = req.user;

    const userModel = this.Models.userModel();

    const member = await userModel.getUserMember({ memberId });

    if (!member) {
      return {
        success: false,
        message: this.ResMsg.HTTP_UNAUTHORIZED,
        code: this.StatusCode.HTTP_UNAUTHORIZED,
      };
    }

    await userModel.inActiveUser(userId);

    return {
      success: true,
      code: this.StatusCode.HTTP_SUCCESSFUL,
      message: this.ResMsg.PROFILE_DELETED,
    };
  }
}
export default MemberService;
