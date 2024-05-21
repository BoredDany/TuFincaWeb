import { Injectable } from '@angular/core';
import {GetObjectCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3'
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class S3Service {
  private static instance: S3Service;
  private client: S3Client;
  private bucketName: string = "tu-finca-web";


  private constructor() {
    this.client = new S3Client({
      region: "us-east-2",
      credentials: {
        accessKeyId: environment.AWS_ACCESS_KEY,
        secretAccessKey: environment.AWS_SECRET_KEY
      }
    })
  }

  public static getInstance(): S3Service {
    if (!S3Service.instance) S3Service.instance = new S3Service();
    return S3Service.instance;
  }

  public async uploadFile(filename: string, fileBuffer: File, prefix: string) {
    const key = `images/${prefix}/${filename}`;
    try {
      const fileToSend = new Blob([await fileBuffer.arrayBuffer()]);
      await this.client.send(new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        ACL: "public-read",
        Body: fileToSend
      }))
    } catch (e) {
      console.error(e)
    }

    return filename;
  }

  public getObjectURL(Key: string) {
    return `https://tu-finca-web.s3.us-east-2.amazonaws.com/images/${Key}`;
  }

  public async getFileObject(Key: string) {
    try {
      const data = await this.client.send(new GetObjectCommand({
        Key,
        Bucket: this.bucketName
      }));
      return data;
    } catch (e) {
      console.error(e)
    }
    return;
  }
}
