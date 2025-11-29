# Ezoic ads.txt Setup Guide

This guide explains how ads.txt is configured for Ezoic integration on Toolspy.

## 📋 Overview

The ads.txt file tells advertisers which companies are authorized to sell ads on your website. This helps maximize ad revenue by ensuring authorized ad partners can bid on your inventory.

**Reference:** [Ezoic ads.txt Documentation](https://docs.ezoic.com/docs/ezoicads/adstxt/)

## 🔧 Current Setup

### Automatic Update Script

We use an automated script that fetches the latest ads.txt from Ezoic's manager before each build:

**Script Location:** `scripts/update-ads-txt.js`

**Configuration:**
- **Publisher ID:** `19390` (default, can be overridden via `NEXT_PUBLIC_EZOIC_PUBLISHER_ID`)
- **Domain:** `toolspy.net` (from `NEXT_PUBLIC_SITE_DOMAIN`)
- **Ezoic URL:** `https://srv.adstxtmanager.com/19390/toolspy.net`

### Build Integration

The ads.txt file is automatically updated during the build process:

```bash
npm run build
```

This runs `update-ads-txt.js` before building, ensuring the latest ads.txt is included in your static export.

### Manual Update

You can also update ads.txt manually:

```bash
npm run update-ads-txt
```

## 🌐 Server-Level Redirects (Alternative Method)

If you prefer server-level redirects instead of static files, configure your web server as follows:

### Apache (.htaccess)

Add this to your `.htaccess` file:

```apache
Redirect 301 /ads.txt https://srv.adstxtmanager.com/19390/toolspy.net
```

### Nginx

Add this to your Nginx configuration:

```nginx
server {
    location ~ /ads.txt {
        return 301 https://srv.adstxtmanager.com/19390/toolspy.net;
    }
}
```

### Cloudflare/CDN Redirects

If using Cloudflare or another CDN:
1. Go to Page Rules or Redirect Rules
2. Create a rule: `/ads.txt` → `https://srv.adstxtmanager.com/19390/toolspy.net`
3. Set redirect type to 301 (Permanent)

## ✅ Testing Your Setup

1. **Visit** `https://toolspy.net/ads.txt` in your browser
2. **Verify** you see a list of authorized ad sellers
3. **Clear cache** if the file doesn't appear immediately

### Expected Result

You should see content like:
```
# ads.txt file for toolspy.net
# Managed by Ezoic
google.com, pub-XXXXXXXXXX, DIRECT, f08c47fec0942fa0
...
```

## 🔄 Automated Daily Updates (Advanced)

For automatic daily updates without rebuilding, set up a cron job:

```bash
# Add to crontab (runs daily at 2 AM)
0 2 * * * cd /path/to/toolspy && node scripts/update-ads-txt.js
```

Or use a CI/CD pipeline to run the script periodically.

## 📝 Environment Variables

You can customize the setup using environment variables:

```env
# Ezoic Configuration
NEXT_PUBLIC_EZOIC_PUBLISHER_ID=19390
NEXT_PUBLIC_SITE_DOMAIN=toolspy.net
```

## 🎯 Benefits

- ✅ **Automatic Updates:** Script fetches latest ads.txt from Ezoic
- ✅ **Build Integration:** Updates happen automatically during build
- ✅ **Revenue Optimization:** Ensures authorized partners can bid
- ✅ **Compliance:** Meets IAB ads.txt standard requirements

## 🐛 Troubleshooting

### ads.txt Not Appearing

1. **Check file exists:** Verify `public/ads.txt` exists after build
2. **Clear cache:** Clear browser and CDN cache
3. **Check URL:** Ensure you're visiting `https://toolspy.net/ads.txt`
4. **Verify script:** Run `npm run update-ads-txt` manually

### Script Errors

If the update script fails:
1. Check your internet connection
2. Verify Ezoic publisher ID is correct
3. Ensure domain matches your actual domain
4. Check Node.js version (requires Node 18+)

## 📚 Additional Resources

- [Ezoic ads.txt Documentation](https://docs.ezoic.com/docs/ezoicads/adstxt/)
- [IAB ads.txt Specification](https://iabtechlab.com/ads-txt/)
- [Google ads.txt Guide](https://support.google.com/adsense/answer/7532444)

