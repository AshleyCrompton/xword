# Deploy Crossword Setters Hub to AWS S3

## Yes, your site is perfect for S3 static hosting!

Your website is entirely client-side with no server dependencies, making it ideal for AWS S3 static website hosting.

## Step 1: Prepare Files for Upload

### Files to Upload to S3:
```
/public/
├── index.html (Word Tool)
├── anagram.html (Anagram Generator) 
├── main.html (Homepage - rename to index.html)
├── blog.html (Blog)
├── styles.css
├── main.js
├── blog.js
├── words.js
├── filtered_words.txt (move from root to public/)
├── short_words.txt (move from root to public/)
└── ProcessedPhrases.csv (move from root to public/)
```

## Step 2: File Structure Changes Needed

1. **Rename main.html to index.html** (S3 default page)
2. **Move data files to public folder**:
   - `filtered_words.txt` → `public/filtered_words.txt`
   - `short_words.txt` → `public/short_words.txt` 
   - `ProcessedPhrases.csv` → `public/ProcessedPhrases.csv`

## Step 3: Update File Paths

The current code uses `../filename.txt` which won't work in S3. Update these fetch calls:

### In anagram.html:
- Change `"../filtered_words.txt"` → `"filtered_words.txt"`
- Change `"../short_words.txt"` → `"short_words.txt"`

### In words.js:
- Change `"../filtered_words.txt"` → `"filtered_words.txt"`
- Change `"../ProcessedPhrases.csv"` → `"ProcessedPhrases.csv"`

## Step 4: AWS S3 Setup

1. **Create S3 Bucket**:
   ```bash
   aws s3 mb s3://your-crossword-site-name
   ```

2. **Enable Static Website Hosting**:
   - Go to S3 Console → Your Bucket → Properties
   - Enable "Static website hosting"
   - Index document: `index.html`
   - Error document: `index.html` (for SPA behavior)

3. **Set Bucket Policy** (make public):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-crossword-site-name/*"
       }
     ]
   }
   ```

4. **Upload Files**:
   ```bash
   aws s3 sync ./public s3://your-crossword-site-name --delete
   ```

5. **Configure CORS** (for Dictionary API):
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET"],
       "AllowedOrigins": ["*"],
       "ExposeHeaders": []
     }
   ]
   ```

## Step 5: Optional - CloudFront CDN

For better performance and custom domain:

1. Create CloudFront distribution
2. Point to your S3 bucket
3. Set up custom domain with Route 53
4. Add SSL certificate

## Benefits of S3 Hosting:

✅ **Perfect fit**: Static site with no server-side code
✅ **Cost effective**: Pay only for storage and requests (~$1-5/month)
✅ **Scalable**: Handles traffic spikes automatically  
✅ **Reliable**: 99.999999999% durability
✅ **Fast**: Global CDN with CloudFront
✅ **Secure**: HTTPS support
✅ **Easy updates**: Just sync files to update

## Your Site's Compatibility:

- ✅ HTML/CSS/JavaScript only
- ✅ External API calls (Dictionary API) work fine
- ✅ No server-side processing needed
- ✅ All assets are static files
- ✅ Client-side data loading via fetch()

## Estimated Costs:

- **S3 Storage**: ~$0.50/month for your files
- **S3 Requests**: ~$0.10/month for typical traffic
- **CloudFront** (optional): ~$1-3/month
- **Total**: ~$1-5/month depending on traffic

Your crossword tools site is ideally suited for S3 static hosting!
