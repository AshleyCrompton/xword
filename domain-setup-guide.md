# Custom Domain Setup with AWS Route 53

## Overview

This guide will help you register a domain name and configure it to work with your crossword website hosted on AWS S3.

## Step 1: Register Domain in Route 53

### Choose a Domain Name

Consider these suggestions for your crossword site:

- `crosswordtools.com`
- `cryptictools.com`
- `xwordsetters.com`
- `crosswordcraft.com`
- `wordsmithtools.com`

### Register the Domain

1. Go to AWS Route 53 Console
2. Click "Register Domain"
3. Search for your desired domain name
4. Complete the registration process (typically $12-$15/year for .com)
5. Fill in registrant contact information

## Step 2: Create CloudFront Distribution (Recommended)

Using CloudFront provides:

- HTTPS support (required for custom domains)
- Global CDN for faster loading
- Better caching

### Commands to create CloudFront distribution:

```bash
# Create CloudFront distribution (replace with your actual bucket name and domain)
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

## Step 3: Configure DNS in Route 53

After CloudFront is created:

1. Go to Route 53 → Hosted Zones
2. Click on your domain
3. Create A record pointing to CloudFront distribution
4. Create CNAME for www subdomain

### Example DNS Records:

- **A Record**: `yourdomain.com` → CloudFront distribution
- **CNAME Record**: `www.yourdomain.com` → `yourdomain.com`

## Step 4: SSL Certificate

AWS will automatically provide SSL certificate through CloudFront for your domain.

## Cost Estimate

- Domain registration: ~$12-15/year
- CloudFront: ~$1-5/month (depending on traffic)
- Route 53 hosted zone: $0.50/month

## Timeline

- Domain registration: Immediate
- DNS propagation: 24-48 hours
- Total setup time: 1-2 hours

## Next Steps

1. Choose your domain name
2. Run the domain registration commands
3. Configure CloudFront
4. Update DNS records
5. Test the custom domain

Would you like me to help you with any specific step?
