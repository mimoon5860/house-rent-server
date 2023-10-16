"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const uploaderConstants_1 = require("../../middleware/uploader/uploaderConstants");
class ManageFile {
    constructor() {
        // delete from cloud
        // public deleteFromCloud = async (files: string[]) => {
        //   try {
        //     if (files.length) {
        //       for await (const file of files) {
        //         const deleteParams = {
        //           Bucket: config.AWS_S3_BUCKET,
        //           Key: `${rootFileFolder}/${file}`,
        //         };
        //         const res = await this.s3Client.send(
        //           new DeleteObjectCommand(deleteParams)
        //         );
        //         // console.log({ res });
        //         console.log('file deleted -> ', files);
        //       }
        //     }
        //   } catch (err) {
        //     console.log({ err });
        //   }
        // };
        // delete from local
        this.deleteFromLocal = (files) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (files.length) {
                    for (let i = 0; i < files.length; i++) {
                        const path = `${__dirname}/../../../${uploaderConstants_1.rootFileFolder}/${files[i]}`;
                        yield fs_1.default.promises.unlink(path);
                    }
                }
                else {
                    return;
                }
            }
            catch (err) {
                console.log({ err });
            }
        });
        // copy file to local
        this.copyFileLocal = (source, target, file) => __awaiter(this, void 0, void 0, function* () {
            try {
                const fileSource = `${__dirname}/../../../uploads/${source}/${file}`;
                const fileTarget = `${__dirname}/../../../uploads/${target}/${file}`;
                fs_1.default.copyFile(fileSource, fileTarget, (err) => {
                    console.log(err);
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.default = ManageFile;
