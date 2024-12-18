import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default defineEventHandler(async (event) => {
  try {
    // อ่านค่าจาก .env
    const config = useRuntimeConfig();
    return "OK";

    const S3 = new S3Client({
      region: "auto",
      endpoint: config.awsEndpoint, // เช่น "https://<account-id>.r2.cloudflarestorage.com"
      credentials: {
        accessKeyId: config.awsAccessKeyId, // ตั้งค่าจาก runtimeConfig
        secretAccessKey: config.awsSecretAccessKey, // ตั้งค่าจาก runtimeConfig
      },
    });

    // อ่าน query parameters
    const query = getQuery(event);
    const { key, operation } = query;

    if (!key || !operation) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing 'key' or 'operation' parameter",
      });
    }

    let command;
    if (operation === "get") {
      command = new GetObjectCommand({
        Bucket: "1669",
        Key: key,
      });
    } else if (operation === "put") {
      command = new PutObjectCommand({
        Bucket: "1669",
        Key: key,
      });
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid 'operation' parameter. Use 'get' or 'put'.",
      });
    }

    // สร้าง presigned URL
    const url = await getSignedUrl(S3, command, { expiresIn: 3600 });

    return { url };
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});
