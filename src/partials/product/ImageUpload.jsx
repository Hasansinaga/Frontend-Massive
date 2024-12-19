import React, { useRef } from 'react';
import { Icon } from '@iconify/react';

const CardImageUpload = () => {
  // Reference untuk input file
  const fileInputRef = useRef(null);
  const additionalFileInputRef = useRef(null);

  // Fungsi untuk membuka dialog file
  const handleUploadClick = (inputRef) => {
    inputRef.current.click(); // Memicu klik pada input file
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      {/* Upload Cover Image */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-2">
        {/* Klik icon juga memicu input file */}
        <Icon
          icon="mdi:upload"
          className="w-12 h-12 cursor-pointer"
          style={{ color: '#7AB434' }}
          onClick={() => handleUploadClick(fileInputRef)}
        />
        <button
          className="font-semibold"
          style={{ color: '#7AB434' }}
          onClick={() => handleUploadClick(fileInputRef)}
        >
          Upload Image
        </button>
        <p className="text-gray-400 text-sm">
          Upload a cover image for your product.<br />
          File Format <span className="font-semibold">jpeg, png</span> Recommended Size <span className="font-semibold">600×600 (1:1)</span>
        </p>
        {/* Input file untuk cover image */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg, image/png"
          className="hidden"
          onChange={(e) => console.log(e.target.files[0])} // Logika untuk menangani file yang di-upload
        />
      </div>

      {/* Additional Images */}
      <div>
        <p className="text-gray-700 font-medium mb-2">Additional Images</p>
        <div className="flex space-x-4">
          {/* Additional Image Upload */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-24 h-24 flex flex-col items-center justify-center text-center space-y-1"
            onClick={() => handleUploadClick(additionalFileInputRef)}
          >
            {/* Klik icon juga memicu input file */}
            <Icon
              icon="mdi:upload"
              className="w-8 h-8 cursor-pointer"
              style={{ color: '#7AB434' }}
              onClick={() => handleUploadClick(additionalFileInputRef)}
            />
            <button className="text-sm font-semibold" style={{ color: '#7AB434' }}>
              Upload Image
            </button>
            {/* Input file untuk additional image */}
            <input
              ref={additionalFileInputRef}
              type="file"
              accept="image/jpeg, image/png"
              className="hidden"
              onChange={(e) => console.log(e.target.files[0])} // Logika untuk menangani file yang di-upload
            />
          </div>

          {/* Placeholder for Additional Image */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex items-center justify-center">
            <p className="text-gray-400 text-xs">No Image</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardImageUpload;
