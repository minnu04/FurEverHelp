# Campaign Image Upload System - Complete Documentation

## Overview

This is a comprehensive campaign image upload system built for the FurEverHelp MERN crowdfunding platform. It includes:

- **Drag-and-drop image upload** with preview
- **Image reordering** functionality
- **Responsive gallery carousel** with fullscreen mode
- **Mobile swipe support** for navigation
- **Toast notifications** for user feedback
- **Production-ready backend** with Cloudinary integration
- **Complete error handling** and validation

## Features

### Frontend Features

1. **Image Uploader Component**
   - Drag-and-drop file selection
   - Click to browse files
   - Multiple image upload (up to 10 images)
   - Real-time file validation
   - Upload progress indicator
   - Image preview grid

2. **Image Preview Component**
   - Thumbnail preview cards
   - File size display
   - Image reordering (move up/down)
   - Individual image removal
   - Batch clear all option

3. **Campaign Gallery**
   - Responsive image carousel
   - Thumbnail navigation
   - Previous/Next buttons
   - Image counter
   - Hide/Show thumbnails toggle
   - Fullscreen modal support

4. **Gallery Modal**
   - Fullscreen image viewing
   - Keyboard navigation (Arrow keys, ESC)
   - Mobile swipe gestures
   - Image download button
   - Smooth transitions
   - Image counter and info display

5. **Toast Notifications**
   - Success/Error/Warning/Info messages
   - Auto-dismiss with customizable duration
   - Smooth animations
   - Icon indicators

### Backend Features

1. **Campaign Image Upload Endpoint**
   ```
   POST /api/campaigns/:id/images
   ```
   - Multiple image upload support
   - File type validation (JPG, PNG, JPEG, WEBP)
   - File size validation (5MB max)
   - Cloudinary integration
   - Authorization checks

2. **Image Reordering Endpoint**
   ```
   PUT /api/campaigns/:id/images/reorder
   ```
   - Rearrange image order
   - Persist order to database

3. **Featured Image Endpoint**
   ```
   PUT /api/campaigns/:id/featured-image
   ```
   - Set primary image for campaign
   - Used for campaign listing cards

4. **Image Deletion Endpoint**
   ```
   DELETE /api/campaigns/:id/images/:imageUrl
   ```
   - Remove specific image from campaign
   - Authorization validation

## Setup Instructions

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your Cloudinary credentials:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Get Cloudinary Credentials**
   - Sign up at https://cloudinary.com
   - Go to Dashboard
   - Copy Cloud Name, API Key, and API Secret
   - Add to `.env` file

4. **Start Backend Server**
   ```bash
   npm run start
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Required Packages** (Already included)
   - `react`: UI framework
   - `framer-motion`: Animations
   - `lucide-react`: Icons
   - `axios`: API client
   - `tailwindcss`: Styling

3. **Start Frontend Dev Server**
   ```bash
   npm run dev
   ```

## API Reference

### 1. Upload Campaign Images

**Endpoint:** `POST /api/campaigns/:id/images`

**Authentication:** Required (Owner or Admin)

**Request:**
```javascript
// JavaScript/Axios Example
const formData = new FormData();
formData.append('images', file1);
formData.append('images', file2);
formData.append('images', file3);

const response = await API.post(`/campaigns/${campaignId}/images`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
```

**Response:**
```json
{
  "message": "Images uploaded successfully",
  "images": [
    {
      "url": "https://res.cloudinary.com/...",
      "publicId": "public_id_1",
      "filename": "image.jpg",
      "uploadedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "campaign": {
    "_id": "campaign_id",
    "images": ["url1", "url2", "url3"],
    ...
  }
}
```

### 2. Reorder Campaign Images

**Endpoint:** `PUT /api/campaigns/:id/images/reorder`

**Authentication:** Required (Owner or Admin)

**Request:**
```javascript
const response = await API.put(`/campaigns/${campaignId}/images/reorder`, {
  imageOrder: [
    'https://res.cloudinary.com/image1.jpg',
    'https://res.cloudinary.com/image2.jpg',
    'https://res.cloudinary.com/image3.jpg',
  ],
});
```

**Response:**
```json
{
  "message": "Image order updated successfully",
  "images": ["url1", "url2", "url3"]
}
```

### 3. Set Featured Image

**Endpoint:** `PUT /api/campaigns/:id/featured-image`

**Authentication:** Required (Owner or Admin)

**Request:**
```javascript
const response = await API.put(`/campaigns/${campaignId}/featured-image`, {
  imageUrl: 'https://res.cloudinary.com/featured.jpg',
});
```

**Response:**
```json
{
  "message": "Featured image updated successfully",
  "featuredImage": "https://res.cloudinary.com/featured.jpg"
}
```

### 4. Delete Campaign Image

**Endpoint:** `DELETE /api/campaigns/:id/images/:imageUrl`

**Authentication:** Required (Owner or Admin)

**Request:**
```javascript
const encodedUrl = encodeURIComponent(imageUrl);
const response = await API.delete(`/campaigns/${campaignId}/images/${encodedUrl}`);
```

**Response:**
```json
{
  "message": "Image deleted successfully",
  "images": ["remaining_url1", "remaining_url2"]
}
```

## Component Usage

### Using ImageUploader Component

```jsx
import ImageUploader from '../components/ImageUploader';
import { useToast } from '../hooks/useToast';

function CampaignForm({ campaignId }) {
  const { toasts, addToast, removeToast } = useToast();

  const handleImagesUpload = (uploadedImages) => {
    console.log('Images uploaded:', uploadedImages);
    // Update campaign state with new images
  };

  return (
    <div>
      <ImageUploader
        campaignId={campaignId}
        onImagesUpload={handleImagesUpload}
        maxImages={10}
      />
    </div>
  );
}
```

### Using CampaignGallery Component

```jsx
import CampaignGallery from '../components/CampaignGallery';

function CampaignDetails({ campaign }) {
  return (
    <div>
      <CampaignGallery
        images={campaign.images}
        campaignTitle={campaign.title}
      />
    </div>
  );
}
```

### Using Toast Notifications

```jsx
import useToast from '../hooks/useToast';
import { ToastContainer } from '../components/Toast';

function MyComponent() {
  const { toasts, addToast, removeToast } = useToast();

  const handleAction = () => {
    addToast('Action completed successfully!', 'success', 3000);
    // Or error:
    addToast('Something went wrong', 'error', 5000);
  };

  return (
    <>
      <button onClick={handleAction}>Do Something</button>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}
```

## File Validation

### Supported Formats
- JPG
- JPEG
- PNG
- WEBP

### Size Limits
- Maximum 5MB per image
- Maximum 10 images per upload

## Error Handling

### Common Errors and Solutions

**Error: "Invalid file type"**
- Solution: Only JPG, JPEG, PNG, and WEBP files are allowed

**Error: "File size exceeds 5MB"**
- Solution: Compress image or use a smaller file

**Error: "Cloudinary environment variables are not configured"**
- Solution: Add Cloudinary credentials to `.env` file

**Error: "Not authorized to upload images for this campaign"**
- Solution: Only campaign owner or admin can upload images

## Best Practices

1. **Image Optimization**
   - Compress images before upload
   - Use modern formats (WebP)
   - Recommended size: 1920x1080px for best quality

2. **Performance**
   - Lazy load images in gallery
   - Use CDN URLs from Cloudinary
   - Cache images in browser

3. **Security**
   - Always validate file types on backend
   - Validate file sizes
   - Check user authorization
   - Use secure URLs from Cloudinary

4. **UX/UI**
   - Provide clear upload progress
   - Show helpful error messages
   - Auto-scroll to uploaded images
   - Confirm before deleting images

## Database Schema Updates

```javascript
// Campaign Model - Updated Fields
{
  // ... existing fields ...
  
  // Media (Cloudinary URLs)
  images: [{ type: String }],                    // Array of image URLs
  videos: [{ type: String }],                    // Array of video URLs
  featuredImage: { type: String },               // Primary image for display
  
  // Timestamps (already included)
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}
```

## Troubleshooting

### Images Not Uploading

1. Check if Cloudinary credentials are correct
2. Verify backend is running on correct port
3. Check browser console for errors
4. Ensure CORS is properly configured

### Images Not Displaying

1. Check if URLs are valid
2. Verify Cloudinary folder permissions
3. Check image file format is supported

### Upload Takes Too Long

1. Check image file size
2. Verify internet connection
3. Try uploading fewer images at once
4. Check Cloudinary API limits

## Production Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure Cloudinary for production
- [ ] Update CORS_ORIGIN for production URL
- [ ] Enable HTTPS
- [ ] Set strong JWT_SECRET
- [ ] Configure email service
- [ ] Set up monitoring and logging
- [ ] Test image uploads and downloads
- [ ] Verify file size limits
- [ ] Test gallery on mobile devices
- [ ] Configure CDN for image delivery

## Performance Optimization

1. **Image Compression**
   - Use Cloudinary's transformation parameters
   - Example: `https://res.cloudinary.com/.../w_800,q_80/image.jpg`

2. **Lazy Loading**
   - Load gallery images on demand
   - Use intersection observer for thumbnails

3. **Caching**
   - Enable browser cache for images
   - Use Cloudinary's cache settings

## Additional Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Multer Documentation](https://github.com/expressjs/multer)
- [Express File Upload Best Practices](https://expressjs.com/en/resources/middleware/multer.html)

## Support and Issues

For issues or questions:
1. Check this documentation
2. Review error messages carefully
3. Check browser console for detailed errors
4. Verify all credentials are correct
5. Ensure all dependencies are installed

## Version History

- **v1.0.0** (2024) - Initial release with complete image upload system
