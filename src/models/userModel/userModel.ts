import { TDB } from "../../utils/interfaces/common";
import {
  IGetUserMemberParams,
  IGetUserMemberWhere,
  IInsertMember,
  IInsertUserParams,
  IInsertUserTypeParams,
  IUpdateUserParams,
} from "../../utils/interfaces/userTypes";

class UserModel {
  private client: TDB;
  constructor(client: TDB) {
    this.client = client;
  }

  // insert user
  public async insertUser(params: IInsertUserParams) {
    return await this.client.user.create({
      data: params,
    });
  }

  // insert member
  public async insertMember(params: IInsertMember) {
    return await this.client.member.create({
      data: params,
    });
  }

  // insert user type
  public async insertUserType(params: IInsertUserTypeParams) {
    return await this.client.userType.create({ data: params });
  }

  // get user member
  public async getUserMember(params: IGetUserMemberParams) {
    const where: IGetUserMemberWhere = {
      user: {
        type: {
          some: { userType: "MEMBER" },
        },
      },
    };

    if (params.email) {
      where.user.email = params.email;
    }

    if (params.memberId) {
      where.id = params.memberId;
    }

    if (params.userId) {
      where.user.id = params.userId;
    }

    if (params.userName) {
      where.user.userName = params.userName;
    }

    if (params.mobileNumber) {
      where.user.mobileNumber = params.mobileNumber;
    }

    if (params.status) {
      where.user.status = params.status;
    }
    if (params.userName) {
      where.user.userName = params.userName;
    }

    return await this.client.member.findFirst({
      select: {
        id: true,
        user: {
          select: {
            id: true,
            isVerified: true,
            email: true,
            password: true,
            userName: true,
            firstName: true,
            lastName: true,
            mobileNumber: true,
            photo: true,
            status: true,
            createDate: true,
          },
        },
        address: true,
        area: {
          select: {
            id: true,
            name: true,
            thana: {
              select: {
                id: true,
                name: true,
                district: {
                  select: {
                    id: true,
                    name: true,
                    division: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      where,
    });
  }

  // get user admin
  public async getUserAdmin() {}

  // change passwoard
  public async changePassword(password: string, id: number) {
    return await this.client.user.update({
      data: { password },
      where: { id },
    });
  }

  // update user
  public async updateUser(payload: IUpdateUserParams, id: number) {
    return await this.client.user.update({
      data: payload,
      where: { id },
    });
  }

  // update member
  public async updateMember(
    payload: { address?: string; areaId?: number },
    id: number
  ) {
    return await this.client.member.update({
      data: { address: payload.address, areaId: payload.areaId },
      where: { id },
    });
  }

  // delete user
  public async inActiveUser(id: number) {
    return this.client.user.update({
      data: { status: "Inactive" },
      where: { id },
    });
  }
}
export default UserModel;
