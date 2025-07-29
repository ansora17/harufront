# Image Cleanup Functionality

## Overview

The HaruCalories application now includes automatic cleanup of old profile images when users upload new ones. This helps manage storage costs and keeps the Supabase storage organized.

## Features

### 🗑️ Automatic Cleanup

- **Profile Images**: When a user uploads a new profile image, the old one is automatically deleted from Supabase storage
- **Thumbnails**: Both main images and their thumbnails are cleaned up
- **Error Handling**: Cleanup errors don't break the upload process

### 📁 Storage Management

- **Cost Optimization**: Prevents accumulation of unused images
- **Performance**: Keeps storage organized and reduces clutter
- **Space Efficiency**: Only keeps the most recent profile image per user

## Implementation

### Functions Added

#### `deleteImage(imageUrl)`

- Deletes a single image from Supabase storage
- Handles both main images and thumbnails
- Extracts file path from Supabase URL automatically
- Logs cleanup operations for debugging

#### `uploadProfileImageWithCleanup(file, oldImageUrl)`

- Uploads new profile image with automatic cleanup
- Deletes old image only after successful upload
- Returns the same result as `uploadProfileImage`

### Usage

#### In MyPage.jsx

```javascript
// Get current image URL for cleanup
const currentImageUrl = currentUser.photo || currentUser.profileImageUrl;

// Upload with cleanup
const uploadResult = await uploadProfileImageWithCleanup(file, currentImageUrl);
```

#### In EditProfile.jsx

```javascript
// Get current image URL for cleanup
const currentImageUrl =
  form.photo || currentUser.photo || currentUser.profileImageUrl;

// Upload with cleanup
const uploadResult = await uploadProfileImageWithCleanup(file, currentImageUrl);
```

## Benefits

### 💰 Cost Savings

- Reduces Supabase storage costs
- Prevents unnecessary storage usage
- Efficient resource management

### 🚀 Performance

- Faster storage operations
- Reduced clutter in storage buckets
- Better organization

### 🛡️ Reliability

- Cleanup errors don't break uploads
- Comprehensive logging for debugging
- Handles edge cases gracefully

## Logging

The cleanup process includes detailed logging:

- `🗑️ Attempting to delete image:` - Start of deletion process
- `📁 Extracted file path:` - File path extraction
- `✅ Main image deleted successfully` - Successful deletion
- `✅ Thumbnail deleted successfully` - Thumbnail cleanup
- `⚠️ Thumbnail not found or already deleted` - Non-critical warnings

## Error Handling

- **Missing URL**: Logs warning and continues
- **Invalid URL**: Logs error and continues
- **Supabase Errors**: Logs error but doesn't break upload
- **Network Issues**: Graceful degradation

## Future Enhancements

- [ ] Batch cleanup for multiple images
- [ ] Scheduled cleanup for orphaned images
- [ ] User preference for keeping old images
- [ ] Backup before deletion
- [ ] Cleanup for meal images
