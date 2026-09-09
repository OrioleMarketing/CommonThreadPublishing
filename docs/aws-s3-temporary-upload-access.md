# Temporary AWS Access for the Common Thread Publishing Asset Migration

This guide creates an **upload-only IAM user** for the one-time migration of the prepared Common Thread Publishing image assets into `s3://common-thread-publishing/assets/` in **US East (Ohio), `us-east-2`**. It deliberately avoids root credentials, broad S3 access, deletion rights, and AWS Console access.

> **Use only an AWS administrator account to create this access. Do not create access keys for the AWS root user.** AWS recommends temporary credentials or roles where possible and advises against sharing long-lived access keys. For this one-time external upload, create a narrowly scoped IAM user, use its credential once, then delete the access key immediately after verification. [1]

## 1. Create the IAM user

In the AWS Console, open **IAM** and select **Users** → **Create user**. Set the username to:

```text
ctp-s3-migration
```

Do **not** enable AWS Management Console access. This identity needs only programmatic access for the limited S3 upload.

On the **Set permissions** page, select **Attach policies directly** → **Create policy**. Choose the **JSON** tab and paste the policy below. Name it `CTPS3AssetMigration` and then attach it to `ctp-s3-migration`.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListOnlyCommonThreadSiteAssets",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::common-thread-publishing",
      "Condition": {
        "StringLike": {
          "s3:prefix": [
            "assets/",
            "assets/*"
          ]
        }
      }
    },
    {
      "Sid": "UploadAndVerifyOnlyCommonThreadSiteAssets",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::common-thread-publishing/assets/*"
    }
  ]
}
```

This policy lets the migration identity list only the `assets/` prefix, upload only to that prefix, and retrieve assets for post-upload verification. It does **not** permit deletion, bucket changes, access to objects outside that prefix, or access to other AWS services. Amazon S3 supports limiting list results by prefix with the `s3:prefix` condition key. [2]

## 2. Create a one-time access key

Open **IAM** → **Users** → **ctp-s3-migration** → **Security credentials**. Under **Access keys**, select **Create access key**. Choose the use case that most closely matches **Application running outside AWS** or **Other**, add the description `Common Thread Publishing one-time S3 asset migration`, and complete the creation.

Download the CSV or copy both values immediately:

| Credential | What to provide securely |
|---|---|
| Access key ID | Starts with `AKIA...` or similar |
| Secret access key | Long private value displayed only once |
| AWS region | `us-east-2` |

The secret access key is displayed only when it is created. If it is lost, the correct remedy is to delete that key and create a new one. [1]

## 3. Allow public delivery of site images

The website needs readers’ browsers to retrieve the finished image files. After the upload is complete, open **S3** → **common-thread-publishing** → **Permissions** and add this bucket policy. It grants **read-only public access to `assets/` only**; it does not expose uploads or other bucket objects.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadForWebsiteAssetsOnly",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::common-thread-publishing/assets/*"
    }
  ]
}
```

If AWS reports that public access is blocked, open **Permissions** → **Block public access (bucket settings)** → **Edit** and disable only the block setting that prevents a new public bucket policy from taking effect. Review the policy afterward to confirm that it remains limited to `assets/*`. Do not grant `PutObject`, `DeleteObject`, or `ListBucket` publicly. AWS recommends reviewing public and cross-account access using IAM Access Analyzer. [3]

> **More private production alternative:** Add CloudFront with Origin Access Control later, keep the bucket private, and use the CloudFront HTTPS domain for `VITE_ASSET_BASE_URL`. The application is already designed for that switch without source changes.

## 4. Cleanup after verification

After I confirm every site asset loads from S3 and the Vercel preview is correct, return to **IAM** → **Users** → **ctp-s3-migration** → **Security credentials**, deactivate and then delete the access key. You may then delete the `ctp-s3-migration` user and the `CTPS3AssetMigration` policy as well.

## References

[1] [AWS IAM: Manage access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)

[2] [AWS S3: Bucket policy examples using condition keys](https://docs.aws.amazon.com/AmazonS3/latest/userguide/amazon-s3-policy-keys.html)

[3] [AWS IAM: Security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
