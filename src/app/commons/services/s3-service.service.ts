import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class S3ServiceService {
  private S3: AWS.S3;
  constructor() {
    AWS.config.update({
      accessKeyId: environment.accessKeyId,
      secretAccessKey: environment.secretAccessKey,
      region: environment.region,
    });
    this.S3 = new AWS.S3();
  }
  listFolders(bucketName: string, path: string): Promise<any> {
    const params = {
      Bucket: bucketName,
      Delimiter: '/',
      Prefix: path,
    };
    return new Promise<any>((resolve, reject) => {
      // resolve([
      //   {
      //     type: 'FOLDER',
      //     key: 'Jay/',
      //   },
      //   {
      //     type: 'FOLDER',
      //     key: 'new folder/',
      //   },
      //   {
      //     type: 'FOLDER',
      //     key: 'photos/',
      //   },
      //   {
      //     type: 'FILE',
      //     key: 'IMG_E1619.JPG',
      //   },
      //   {
      //     type: 'FILE',
      //     key: 'sidebars.css',
      //   },
      //   {
      //     type: 'FILE',
      //     key: 'sidebars.js',
      //   },
      //   {
      //     type: 'FILE',
      //     key: 'sidebars.js',
      //   },
      //   {
      //     type: 'FILE',
      //     key: 'sidebars.js',
      //   },
      // ]);
      this.S3.listObjectsV2(params, (err, data) => {
        if (data) {
          const folders = data.CommonPrefixes?.map((d) =>
            d.Prefix?.replace(path, '')
          );
          const files = data.Contents?.map((c) => c.Key?.replace(path, ''));
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
      Bucket: environment.Bucket,
      Key: path + key,
    };
    console.log('fetch data', path, key);

    return this.S3.getSignedUrlPromise('getObject', params);
  }

  uploadFileToS3(file: File, path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const contentType = file.type;

      var params = {
        Bucket: environment.Bucket,
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
      Bucket: environment.Bucket,
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
  downloadFile(key: string) {
    const s3 = new AWS.S3();
    const params = {
      Bucket: environment.Bucket,
      Key: key,
    };
    s3.getObject(params, function (err, data: any) {
      if (err) {
        console.log(err);
      } else if (data) {
        const blob = new Blob([data?.Body], { type: data.ContentType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = params.Key;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    });
  }

  deleteFile(key: string) {
    console.log('key', key);
    return new Promise((resolve, reject) => {
      this.S3.deleteObject(
        {
          Bucket: environment.Bucket,
          Key: key,
        },
        function (err, data) {
          if (err) {
            console.log('er', err);

            resolve({});
          } else {
            reject({});
          }
        }
      );
    });
  }
}
