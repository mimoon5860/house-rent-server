import { Router } from "express";
import FileFolder from "../utils/miscellaneous/fileFolders";
import Uploader from "../middleware/uploader/uploader";

class AbstractRouter {
  public router = Router();
  protected fileFolders = FileFolder;
  public uploader = new Uploader();
}

export default AbstractRouter;
