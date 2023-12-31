import { Request, Response } from "express";
import AbstractController from "../../abstract/abstract.controller";
import PropertyValidator from "../utils/validator/property.validator";
import AdminPropertyService from "../services/admin.property.services";

class AdminPropertyController extends AbstractController {
  private validator = new PropertyValidator();
  private service = new AdminPropertyService();
  constructor() {
    super();
  }
}
export default AdminPropertyController;
