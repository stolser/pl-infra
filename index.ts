// The Pulumi program that defines the stack resources

import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

// Create a GCS bucket
const bucketArgs = {
    location: "EU",
    storageClass: "STANDARD"
}
const bucket = new gcp.storage.Bucket("test-bucket-gk7l", bucketArgs);
console.log("A new bucket is created:")
console.log(`bucket.id = '${bucket.id}'`)
console.log(`bucket.selfLink = '${bucket.selfLink}'`)
console.log(`bucket.url = '${bucket.url}'`)

// Export the base URL of the bucket, in the format gs://<bucket-name>
export const bucketName = bucket.url;
