import { TDB } from "../../utils/interfaces/common";
import {
  IGetUserMemberParams,
  IGetUserMemberWhere,
  IInsertMember,
  IInsertUserParams,
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

  // get user member
  public async getUserMember(params: IGetUserMemberParams) {
    const where: IGetUserMemberWhere = {
      user: {
        type: {
          some: { userType: "MEMBER" },
        },
      },
    };

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
        user: {
          select: {
            id: true,
            isVerified: true,
            email: true,
            type: {
              select: {
                id: true,
                userType: true,
              },
            },
            userName: true,
            firstName: true,
            lastName: true,
            mobileNumber: true,
            photo: true,
            status: true,
            createdAt: true,
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
}
export default UserModel;
