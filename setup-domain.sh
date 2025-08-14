#!/bin/bash

# Domain Setup Script for Crossword Tools Website
# This script helps you register a domain and set up CloudFront + Route 53

echo "🌐 Crossword Tools Domain Setup"
echo "================================"

# Step 1: Check if AWS CLI is configured
echo "Checking AWS CLI configuration..."
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo "❌ AWS CLI not configured. Please run 'aws configure' first."
    exit 1
fi
echo "✅ AWS CLI configured"

# Step 2: Get domain name from user
echo ""
read -p "Enter your desired domain name (e.g., crosswordtools.com): " DOMAIN_NAME

# Step 3: Check domain availability
echo "Checking domain availability..."
AVAILABILITY=$(aws route53domains check-domain-availability --domain-name $DOMAIN_NAME --query 'Availability' --output text)

if [ "$AVAILABILITY" = "AVAILABLE" ]; then
    echo "✅ Domain $DOMAIN_NAME is available!"
else
    echo "❌ Domain $DOMAIN_NAME is not available. Checking alternatives..."
    aws route53domains get-domain-suggestions --domain-name ${DOMAIN_NAME%.*} --suggestion-count 5 --query 'SuggestionsList[*].DomainName' --output table
    exit 1
fi

# Step 4: Get pricing
echo "Getting domain pricing..."
aws route53domains get-domain-detail --domain-name $DOMAIN_NAME --query 'DomainName' --output text 2>/dev/null || echo "Standard pricing: ~$12-15/year for .com domains"

# Step 5: Confirm registration
echo ""
echo "Domain registration details:"
echo "- Domain: $DOMAIN_NAME"
echo "- Duration: 1 year"
echo "- Estimated cost: $12-15"
echo ""
read -p "Do you want to proceed with registration? (y/N): " CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "Domain registration cancelled."
    exit 0
fi

echo ""
echo "📝 Next steps:"
echo "1. Edit contact-info.json with your details"
echo "2. Run: aws route53domains register-domain --domain-name $DOMAIN_NAME --duration-in-years 1 --admin-contact file://contact-info.json --registrant-contact file://contact-info.json --tech-contact file://contact-info.json"
echo "3. Update S3 bucket name in aws-commands.txt"
echo "4. Deploy to S3: ./deploy-to-s3.sh"
echo "5. Set up CloudFront distribution"
echo "6. Configure DNS records"
echo ""
echo "📖 See domain-setup-guide.md for detailed instructions"
