# Deploying Your Website

## Option 1: GitHub Pages with Your GoDaddy Domain (Recommended)

### Step 1: Enable GitHub Pages
1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under "Source", select "Deploy from a branch"
4. Choose "gh-pages" branch and "/ (root)" folder
5. Click Save

### Step 2: Set up your GoDaddy domain
1. Log into your GoDaddy account
2. Go to DNS Management for your domain
3. Add these DNS records:

**A Records** (for root domain):
- Type: A, Name: @, Value: 185.199.108.153
- Type: A, Name: @, Value: 185.199.109.153  
- Type: A, Name: @, Value: 185.199.110.153
- Type: A, Name: @, Value: 185.199.111.153

**CNAME Record** (for www):
- Type: CNAME, Name: www, Value: yourusername.github.io

4. Wait 24-48 hours for DNS changes to take effect

### Step 3: Verify
- Your site will be available at your domain (e.g., andeda.net)
- GitHub will automatically generate SSL certificate

## Option 2: Download ZIP for Any Hosting Provider

### Step 1: Build ZIP
1. Go to your GitHub repository
2. Click **Actions** tab
3. Find "Build Website ZIP" workflow
4. Click **Run workflow** → **Run workflow**
5. Wait for it to complete (green checkmark)
6. Click on the completed run
7. Download the "site" artifact (will be a ZIP file)

### Step 2: Upload to Your Host
1. Extract the ZIP file
2. In your hosting control panel, go to File Manager
3. Navigate to your domain's root folder (usually public_html)
4. Upload all the extracted files (not the folder, just the files inside)
5. Your site is now live!

## Troubleshooting

**Domain not working?**
- Check DNS settings are correct
- Wait longer (DNS can take up to 48 hours)
- Use [DNSChecker.org](https://dnschecker.org) to verify

**Files not loading?**
- Make sure you uploaded the files to the correct folder
- Check file permissions (should be 644 for files, 755 for folders)

**Still need help?**
Contact your hosting provider's support team with this deployment guide.