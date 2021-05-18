import baseAxios from "axios";

console.log(process.env.NEXT_PUBLIC_API_URL);

export const axios = baseAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// {
//   "Version": "2008-10-17",
//   "Id": "PolicyForCloudFrontPrivateContent",
//   "Statement": [
//       {
//           "Sid": "1",
//           "Effect": "Allow",
//           "Principal": {
//               "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E31VR8LGGK9WTY"
//           },
//           "Action": "s3:GetObject",
//           "Resource": [
//               "arn:aws:s3:::btix-stg-content.caretex365.jp/deploy/*",
//               "arn:aws:s3:::btix-stg-content.caretex365.jp/home/*",
//               "arn:aws:s3:::btix-stg-content.caretex365.jp/images/*",
//               "arn:aws:s3:::btix-stg-content.caretex365.jp/test/*",
//               "arn:aws:s3:::btix-stg-content.caretex365.jp/upload/*"
//           ]
//       }
//   ]
// }
// [
//   {
//       "AllowedHeaders": [
//           "*"
//       ],
//       "AllowedMethods": [
//           "GET",
//           "PUT",
//           "POST",
//           "HEAD"
//       ],
//       "AllowedOrigins": [
//           "https://btix-stg-user.caretex365.jp",
//           "https://btix-stg-supplier.caretex365.jp",
//           "https://btix-stg-admin.caretex365.jp",
//           "https://btix-stg-api.caretex365.jp",
//           "https://btix-stg-user.karadacare-online.jp",
//           "https://btix-stg-supplier.karadacare-online.jp",
//           "https://btix-stg-admin.karadacare-online.jp",
//           "https://btix-stg-api.karadacare-online.jp",
//           "https://btix-dev-user.caretex365.jp",
//           "https://btix-dev-supplier.caretex365.jp",
//           "https://btix-dev-admin.caretex365.jp",
//           "https://btix-dev-api.caretex365.jp",
//           "https://btix-dev-user.karadacare-online.jp",
//           "https://btix-dev-supplier.karadacare-online.jp",
//           "https://btix-dev-admin.karadacare-online.jp",
//           "https://btix-dev-api.karadacare-online.jp",
//           "http://39.110.219.234",
//           "http://supplier.karadacare_online.internal:8080",
//           "http://supplier.caretex365.internal:8081",
//           "http://admin.karadacare.internal",
//           "http://localhost:8081",
//           "http://localhost:8080",
//           "http://api.caretex365.internal:10081",
//           "http://admin.caretex365.internal:10081"
//       ],
//       "ExposeHeaders": []
//   }
// ]
