import ManageFile from "../utils/lib/manageFile";
import ResMsg from "../utils/miscellaneous/responseMessage";
import StatusCode from "../utils/miscellaneous/statusCode";

abstract class AbstractServices {
  protected manageFile = new ManageFile();
  protected ResMsg = ResMsg;
  protected StatusCode = StatusCode;

  // insert exception error
  protected async createException(
    endPoint: string | null = null,
    exceptionText: string | null = null,
    errorMsg: string | null = null,
    lineNumber: string | null = null
  ) {}
}

export default AbstractServices;
