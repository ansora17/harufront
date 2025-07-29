import React, { useState, useRef } from "react";
import { getThumbnailUrl } from "../../utils/imageUpload/uploadImageToSupabase";

export default function ProfileImage({
  photo,
  currentImage,
  nickname,
  onImageChange,
  readOnly = false,
  size = "medium",
  useThumbnail = true, // New prop to control thumbnail usage
}) {
  const getInitial = (name) => name?.charAt(0).toUpperCase();
  const fileInputRef = useRef(null);

  // Handle both prop names for backward compatibility
  const imageUrl = photo || currentImage;

  // Try to get thumbnail URL if useThumbnail is enabled
  const thumbnailUrl =
    useThumbnail && imageUrl ? getThumbnailUrl(imageUrl) : null;
  const displayUrl = thumbnailUrl || imageUrl;

  // Debug: Log image URL
  console.log("ProfileImage - Image URL:", imageUrl);
  console.log("ProfileImage - Thumbnail URL:", thumbnailUrl);
  console.log("ProfileImage - Display URL:", displayUrl);
  console.log("ProfileImage - Photo prop:", photo);
  console.log("ProfileImage - CurrentImage prop:", currentImage);

  // Size classes
  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24 sm:w-28 sm:h-28",
    large: "w-32 h-32 sm:w-36 sm:h-36",
  };

  // State for image loading
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    console.log("ProfileImage - Image loaded successfully:", displayUrl);
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = (e) => {
    console.error("ProfileImage - Failed to load image:", displayUrl);
    setImageError(true);
    setImageLoaded(false);
    e.target.style.display = "none";
  };

  const handleImageClick = () => {
    if (!readOnly && onImageChange) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(file);
    }
    // Reset the input
    e.target.value = "";
  };

  return (
    <div className="relative text-center">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Clickable image or placeholder */}
      <div
        className={`${sizeClasses[size]} mx-auto rounded-full cursor-pointer transition-transform hover:scale-105`}
        onClick={handleImageClick}
      >
        {displayUrl && !imageError ? (
          <img
            src={displayUrl}
            alt="profile"
            className={`w-full h-full rounded-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy" // Enable lazy loading
          />
        ) : (
          <div
            className={`w-full h-full rounded-full bg-green-300 flex items-center justify-center text-white font-bold text-3xl`}
          >
            {getInitial(nickname)}
          </div>
        )}

        {/* Loading indicator */}
        {displayUrl && !imageLoaded && !imageError && (
          <div
            className={`absolute inset-0 rounded-full bg-gray-200 flex items-center justify-center animate-pulse`}
          >
            <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Upload button */}
      {onImageChange && !readOnly && (
        <button
          onClick={handleImageClick}
          className="mt-2 text-sm text-blue-500 hover:underline"
        >
          사진 변경
        </button>
      )}
    </div>
  );
}
