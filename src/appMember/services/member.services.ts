import { Request } from "express";
import AbstractServices from "../../abstract/abstract.service";

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
}
export default MemberService;
