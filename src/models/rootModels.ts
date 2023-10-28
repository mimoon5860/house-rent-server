import UserModel from "./userModel/userModel";
import { TDB } from "../utils/interfaces/common";
import PropertyModel from "./propertyModel/propertyModel";

class Models {
  private client: TDB;
  constructor(client: TDB) {
    this.client = client;
  }

  // user model
  public userModel(tx?: TDB) {
    return new UserModel(tx || this.client);
  }
  // property model
  public propertyModel(tx?: TDB) {
    return new PropertyModel(tx || this.client);
  }
}
export default Models;
