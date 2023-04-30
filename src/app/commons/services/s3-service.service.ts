import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root',
})
export class S3ServiceService {
  private S3: AWS.S3;
  constructor() {
    AWS.config.update({
      accessKeyId: 'AKIAWFSSXZG7VAT7VF4K',
      secretAccessKey: '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',
      region: 'ap-south-1',
    });
    this.S3 = new AWS.S3();
  }
  listFolders(bucketName: string, path: string): Promise<any> {
    const params = {
      Bucket: bucketName,
      Delimiter: '/',
      Prefix: path,
    };
    console.log('path', path);

    return new Promise<any>((resolve, reject) => {
      this.S3.listObjectsV2(params, (err, data) => {
        if (data) {
          console.log('data', data);
          const folders = data.CommonPrefixes?.map((d) =>
            d.Prefix?.replace(path, '')
          );
          const files = data.Contents?.map((c) => c.Key?.replace(path, ''));
          console.log('folders', folders);
          let allData: any = [];
          folders?.forEach((f) => allData.push({ type: 'FOLDER', key: f }));
          files?.forEach((f) => f && allData.push({ type: 'FILE', key: f }));
          resolve(allData);
        }
      });
    });
  }

  getFileFromS3(key: string, path: string) {
    const params = {
      Bucket: 'datastoragemanager',
      Key: path + key,
    };
    return this.S3.getSignedUrlPromise('getObject', params);
  }

  uploadFileToS3(file: File, path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const contentType = file.type;

      var params = {
        Bucket: 'datastoragemanager',
        Key: path + file.name,
        Body: file,
        ContentType: contentType,
      };
      console.log('key', path + file.name);

      this.S3.upload(params, function (err: any, data: any) {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  createFolder(name: string) {
    const params = {
      Bucket: 'datastoragemanager',
      Key: name,
    };
    return new Promise((resolve, reject) => {
      this.S3.putObject(params, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log('Successfully created folder!');
        }
        resolve({});
      });
    });
  }
}
