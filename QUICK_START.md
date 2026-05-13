# Campaign Image Upload System - Quick Start Guide

## 5-Minute Setup

### Backend Setup

```bash
# 1. Install dependencies (if not already installed)
cd backend
npm install

# 2. Update .env file with Cloudinary credentials
# Edit backend/.env and add:
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret

# 3. Start server
npm run start
```

### Frontend Setup

```bash
# 1. Already installed (check package.json for dependencies)
cd frontend

# 2. Start dev server
npm run dev
```

## File Structure Overview

```
backend/
├── src/
│   ├── middlewares/
│   │   └── campaignImageUpload.js      ← NEW: Multer config for images
│   ├── controllers/
│   │   └── uploadController.js         ← UPDATED: Added image functions
│   ├── utils/
│   │   └── imageUploadUtils.js         ← NEW: Image upload utilities
│   ├── models/
│   │   └── Campaign.js                 ← UPDATED: Added featuredImage field
│   └── routes/
│       └── campaignRoutes.js           ← UPDATED: Added image routes
└── .env.example                         ← NEW: Environment variables

frontend/
├── src/
│   ├── components/
│   │   ├── ImageUploader.jsx            ← NEW: Main upload component
│   │   ├── ImagePreview.jsx             ← NEW: Preview cards
│   │   ├── CampaignGallery.jsx          ← NEW: Gallery carousel
│   │   ├── GalleryModal.jsx             ← NEW: Fullscreen viewer
│   │   └── Toast.jsx                    ← NEW: Notifications
│   ├── hooks/
│   │   └── useToast.js                  ← NEW: Toast hook
│   └── api/
│       └── campaignImageAPI.js          ← NEW: API utilities

Documentation/
├── CAMPAIGN_IMAGE_UPLOAD_GUIDE.md       ← Complete guide
├── INTEGRATION_EXAMPLES.jsx             ← Code examples
└── QUICK_START.md                       ← This file
```

## Basic Usage

### 1. Simple Gallery on Campaign Details Page

```jsx
import CampaignGallery from '../components/CampaignGallery';

function CampaignDetails({ campaign }) {
  return (
    <CampaignGallery
      images={campaign.images}
      campaignTitle={campaign.title}
    />
  );
}
```

### 2. Upload Images in Campaign Creation

```jsx
import ImageUploader from '../components/ImageUploader';

function CreateCampaign({ campaignId }) {
  const handleUpload = (images) => {
    console.log('Uploaded:', images);
  };

  return (
    <ImageUploader
      campaignId={campaignId}
      onImagesUpload={handleUpload}
      maxImages={10}
    />
  );
}
```

### 3. Add Toast Notifications

```jsx
import useToast from '../hooks/useToast';
import { ToastContainer } from '../components/Toast';

function MyPage() {
  const { toasts, addToast, removeToast } = useToast();

  return (
    <>
      <button onClick={() => addToast('Success!', 'success')}>
        Click me
      </button>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}
```

## API Endpoints

```
POST   /api/campaigns/:id/images              - Upload images
PUT    /api/campaigns/:id/images/reorder      - Reorder images
PUT    /api/campaigns/:id/featured-image      - Set featured image
DELETE /api/campaigns/:id/images/:imageUrl    - Delete image
```

## Cloudinary Setup (Important!)

1. Go to https://cloudinary.com and sign up
2. In Dashboard, find these:
   - **Cloud Name**: Under "API Environment variable"
   - **API Key**: In Account Settings > API Keys
   - **API Secret**: In Account Settings > API Keys

3. Add to backend/.env:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Testing

### Test Image Upload

```bash
# Using curl to test backend
curl -X POST http://localhost:5000/api/campaigns/campaign_id/images \
  -H "Authorization: Bearer your_token" \
  -F "images=@image1.jpg" \
  -F "images=@image2.jpg"
```

### Test Frontend Component

```jsx
// In any React component
import ImageUploader from '../components/ImageUploader';

function TestPage() {
  return (
    <ImageUploader
      campaignId="test_campaign_id"
      onImagesUpload={(images) => console.log('Uploaded:', images)}
    />
  );
}
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cloudinary not configured" | Add env vars to `.env` and restart server |
| Images not uploading | Check browser console for errors |
| CORS errors | Verify backend is running and CORS enabled |
| Images not displaying | Check Cloudinary URL format |
| Upload hangs | Check image file size (max 5MB) |

## Component Props

### ImageUploader
- `campaignId`: string (required) - Campaign ID
- `onImagesUpload`: function - Callback when upload completes
- `maxImages`: number - Max images allowed (default: 10)

### CampaignGallery
- `images`: array - Array of image URLs (required)
- `campaignTitle`: string - Title for display

### Toast
- `message`: string - Toast message (required)
- `type`: string - 'success' | 'error' | 'warning' | 'info'
- `duration`: number - Auto-dismiss time in ms (default: 3000)

## Best Practices

✅ **DO:**
- Compress images before upload
- Validate file types
- Show loading indicators
- Handle errors gracefully
- Use toast notifications

❌ **DON'T:**
- Upload images > 5MB
- Accept non-image formats
- Ignore error responses
- Block UI during upload

## Next Steps

1. ✅ Set up Cloudinary account
2. ✅ Add env variables
3. ✅ Import components into pages
4. ✅ Test upload functionality
5. ✅ Customize UI to match brand
6. ✅ Deploy to production

## Support Links

- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Framer Motion](https://www.framer.com/motion/)
- [Express Upload Guide](https://expressjs.com/en/resources/middleware/multer.html)

## Production Checklist

- [ ] Cloudinary configured
- [ ] Env variables set
- [ ] Error handling tested
- [ ] Mobile responsiveness verified
- [ ] Image sizes optimized
- [ ] HTTPS enabled
- [ ] Rate limiting configured
- [ ] Backups in place

---

**Need help?** Check `CAMPAIGN_IMAGE_UPLOAD_GUIDE.md` for detailed documentation.
