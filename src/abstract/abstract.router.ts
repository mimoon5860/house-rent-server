import { Router } from "express";
import FileFolder from "../utils/miscellaneous/fileFolders";

class AbstractRouter {
  public router = Router();
  protected fileFolders = FileFolder;
}

export default AbstractRouter;
