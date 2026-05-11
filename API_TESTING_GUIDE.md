# API Testing Guide

## Backend API Endpoints - Testing Examples

### 1. Upload Campaign Images

**Endpoint:** `POST /api/campaigns/:id/images`

#### Using Curl
```bash
curl -X POST http://localhost:5000/api/campaigns/CAMPAIGN_ID/images \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "images=@image1.jpg" \
  -F "images=@image2.jpg" \
  -F "images=@image3.jpg"
```

#### Using JavaScript/Axios
```javascript
import API from './api/axiosInstance';

async function uploadImages(campaignId, files) {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('images', file);
  });

  try {
    const response = await API.post(`/campaigns/${campaignId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Upload successful:', response.data);
  } catch (error) {
    console.error('Upload failed:', error.response?.data?.message);
  }
}

// Usage:
const fileInput = document.querySelector('input[type="file"]');
uploadImages('campaign_id', Array.from(fileInput.files));
```

#### Using Postman
1. Create new POST request to: `http://localhost:5000/api/campaigns/CAMPAIGN_ID/images`
2. Go to **Headers** tab, add:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```
3. Go to **Body** tab:
   - Select **form-data**
   - Key: `images`, Type: File, Value: Select image file
   - Repeat for multiple images
4. Click Send

**Expected Response:**
```json
{
  "message": "Images uploaded successfully",
  "images": [
    {
      "url": "https://res.cloudinary.com/...",
      "publicId": "fur-ever-help/campaigns/...",
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

---

### 2. Reorder Campaign Images

**Endpoint:** `PUT /api/campaigns/:id/images/reorder`

#### Using Curl
```bash
curl -X PUT http://localhost:5000/api/campaigns/CAMPAIGN_ID/images/reorder \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "imageOrder": [
      "https://res.cloudinary.com/image3.jpg",
      "https://res.cloudinary.com/image1.jpg",
      "https://res.cloudinary.com/image2.jpg"
    ]
  }'
```

#### Using JavaScript/Axios
```javascript
async function reorderImages(campaignId, imageUrls) {
  try {
    const response = await API.put(
      `/campaigns/${campaignId}/images/reorder`,
      { imageOrder: imageUrls }
    );
    console.log('Images reordered:', response.data);
  } catch (error) {
    console.error('Reorder failed:', error.response?.data?.message);
  }
}

// Usage:
const newOrder = [
  'https://res.cloudinary.com/image2.jpg',
  'https://res.cloudinary.com/image1.jpg',
];
reorderImages('campaign_id', newOrder);
```

#### Using Postman
1. Create PUT request to: `http://localhost:5000/api/campaigns/CAMPAIGN_ID/images/reorder`
2. Headers: Add Authorization Bearer token
3. Body (raw JSON):
```json
{
  "imageOrder": [
    "https://res.cloudinary.com/image3.jpg",
    "https://res.cloudinary.com/image1.jpg",
    "https://res.cloudinary.com/image2.jpg"
  ]
}
```
4. Click Send

**Expected Response:**
```json
{
  "message": "Image order updated successfully",
  "images": ["url1", "url2", "url3"]
}
```

---

### 3. Set Featured Image

**Endpoint:** `PUT /api/campaigns/:id/featured-image`

#### Using Curl
```bash
curl -X PUT http://localhost:5000/api/campaigns/CAMPAIGN_ID/featured-image \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "imageUrl": "https://res.cloudinary.com/featured.jpg"
  }'
```

#### Using JavaScript/Axios
```javascript
async function setFeaturedImage(campaignId, imageUrl) {
  try {
    const response = await API.put(
      `/campaigns/${campaignId}/featured-image`,
      { imageUrl }
    );
    console.log('Featured image set:', response.data);
  } catch (error) {
    console.error('Failed to set featured image:', error.response?.data?.message);
  }
}

// Usage:
setFeaturedImage('campaign_id', 'https://res.cloudinary.com/featured.jpg');
```

**Expected Response:**
```json
{
  "message": "Featured image updated successfully",
  "featuredImage": "https://res.cloudinary.com/featured.jpg"
}
```

---

### 4. Delete Campaign Image

**Endpoint:** `DELETE /api/campaigns/:id/images/:imageUrl`

#### Using Curl
```bash
# Note: URL encode the image URL
curl -X DELETE http://localhost:5000/api/campaigns/CAMPAIGN_ID/images/https%3A%2F%2Fres.cloudinary.com%2Fimage.jpg \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Using JavaScript/Axios
```javascript
async function deleteImage(campaignId, imageUrl) {
  try {
    const encodedUrl = encodeURIComponent(imageUrl);
    const response = await API.delete(
      `/campaigns/${campaignId}/images/${encodedUrl}`
    );
    console.log('Image deleted:', response.data);
  } catch (error) {
    console.error('Delete failed:', error.response?.data?.message);
  }
}

// Usage:
deleteImage('campaign_id', 'https://res.cloudinary.com/image.jpg');
```

**Expected Response:**
```json
{
  "message": "Image deleted successfully",
  "images": ["remaining_url1", "remaining_url2"]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "No images provided"
}
```

### 403 Forbidden
```json
{
  "message": "Not authorized to upload images for this campaign"
}
```

### 404 Not Found
```json
{
  "message": "Campaign not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Image upload failed: Cloudinary error details"
}
```

---

## Authentication

### Getting JWT Token

```bash
# Login first
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Response will include token:
# {
#   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#   "user": { ... }
# }
```

### Using Token in Requests

All image endpoints require the token:
```bash
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Testing Workflow

### Complete Test Scenario

```bash
# 1. Create Campaign
curl -X POST http://localhost:5000/api/campaigns \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Campaign",
    "description": "Testing image upload system",
    "category": "Medical Care",
    "goalAmount": 5000,
    "deadline": "2024-12-31T23:59:59Z",
    "pet": {
      "species": "Dog",
      "name": "Buddy"
    }
  }'

# Response will include campaign._id
# Save this ID for next steps

# 2. Upload Images
curl -X POST http://localhost:5000/api/campaigns/CAMPAIGN_ID/images \
  -H "Authorization: Bearer TOKEN" \
  -F "images=@photo1.jpg" \
  -F "images=@photo2.jpg"

# 3. Set Featured Image (use URL from response above)
curl -X PUT http://localhost:5000/api/campaigns/CAMPAIGN_ID/featured-image \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "imageUrl": "https://res.cloudinary.com/image.jpg"
  }'

# 4. Reorder Images
curl -X PUT http://localhost:5000/api/campaigns/CAMPAIGN_ID/images/reorder \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "imageOrder": ["url2", "url1"]
  }'

# 5. Get Campaign (verify images)
curl -X GET http://localhost:5000/api/campaigns/CAMPAIGN_ID \
  -H "Authorization: Bearer TOKEN"

# 6. Delete Image
curl -X DELETE http://localhost:5000/api/campaigns/CAMPAIGN_ID/images/https%3A%2F%2Fres.cloudinary.com%2Fimage.jpg \
  -H "Authorization: Bearer TOKEN"
```

---

## Postman Collection Setup

### Quick Setup

1. Create a Postman environment variable:
```
Base URL: http://localhost:5000/api
Campaign ID: your_campaign_id
Token: your_jwt_token
```

2. Use in requests:
```
{{Base URL}}/campaigns/{{Campaign ID}}/images
Header: Authorization Bearer {{Token}}
```

### Pre-request Script (Auto-refresh token if needed)
```javascript
// pm.environment.set("token", pm.globals.get("token"));
// This helps manage token expiration
```

---

## Performance Testing

### Load Test with Multiple Images

```bash
# Upload 10 images in parallel
for i in {1..10}; do
  curl -X POST http://localhost:5000/api/campaigns/CAMPAIGN_ID/images \
    -H "Authorization: Bearer TOKEN" \
    -F "images=@test_image_$i.jpg" &
done
wait
```

### Monitor Response Times

```bash
# Using Apache Bench
ab -n 100 -c 10 \
  -H "Authorization: Bearer TOKEN" \
  -p images.json \
  http://localhost:5000/api/campaigns/CAMPAIGN_ID/images
```

---

## Debugging

### Enable Verbose Output

```bash
# Curl verbose mode
curl -v -X POST http://localhost:5000/api/campaigns/CAMPAIGN_ID/images \
  -H "Authorization: Bearer TOKEN" \
  -F "images=@image.jpg"

# Check response headers, timing, etc.
```

### Check Server Logs

```bash
# In backend terminal
# Look for any errors or warnings
# Example output:
# Image uploaded: image.jpg (2.5MB)
# Cloudinary response: secure_url: https://res.cloudinary.com/...
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Check JWT token validity |
| 403 Forbidden | Verify campaign ownership |
| 413 Payload Too Large | Image exceeds 5MB limit |
| 415 Unsupported Media Type | Check file format (JPG/PNG/WEBP only) |
| CORS Error | Ensure backend CORS is configured |
| Cloudinary Error | Check credentials in `.env` |

---

## Quick Reference

```javascript
// Frontend usage summary
import { uploadCampaignImages, deleteCampaignImage } from '../api/campaignImageAPI';

// Upload
await uploadCampaignImages(campaignId, formData);

// Delete
await deleteCampaignImage(campaignId, imageUrl);
```

