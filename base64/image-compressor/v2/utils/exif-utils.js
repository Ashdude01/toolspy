/**
 * EXIF Metadata Handling Utilities
 * Supports reading, writing, and selective preservation of EXIF data
 */

// EXIF tags dictionary
const EXIF_TAGS = {
    // Basic image information
    0x0100: 'ImageWidth',
    0x0101: 'ImageHeight',
    0x0102: 'BitsPerSample',
    0x0103: 'Compression',
    0x0106: 'PhotometricInterpretation',
    0x010F: 'Make',
    0x0110: 'Model',
    0x0112: 'Orientation',
    0x011A: 'XResolution',
    0x011B: 'YResolution',
    0x0128: 'ResolutionUnit',
    0x0131: 'Software',
    0x0132: 'DateTime',
    0x013B: 'Artist',
    0x013E: 'WhitePoint',
    0x013F: 'PrimaryChromaticities',
    
    // Camera information
    0x829A: 'ExposureTime',
    0x829D: 'FNumber',
    0x8822: 'ExposureProgram',
    0x8824: 'SpectralSensitivity',
    0x8827: 'ISOSpeedRatings',
    0x8828: 'OECF',
    0x9000: 'ExifVersion',
    0x9003: 'DateTimeOriginal',
    0x9004: 'DateTimeDigitized',
    0x9101: 'ComponentsConfiguration',
    0x9102: 'CompressedBitsPerPixel',
    0x9201: 'ShutterSpeedValue',
    0x9202: 'ApertureValue',
    0x9203: 'BrightnessValue',
    0x9204: 'ExposureBiasValue',
    0x9205: 'MaxApertureValue',
    0x9206: 'SubjectDistance',
    0x9207: 'MeteringMode',
    0x9208: 'LightSource',
    0x9209: 'Flash',
    0x920A: 'FocalLength',
    0x927C: 'MakerNote',
    0x9286: 'UserComment',
    0x9290: 'SubSecTime',
    0x9291: 'SubSecTimeOriginal',
    0x9292: 'SubSecTimeDigitized',
    
    // GPS information
    0x8825: 'GPSInfo',
    0x0000: 'GPSVersionID',
    0x0001: 'GPSLatitudeRef',
    0x0002: 'GPSLatitude',
    0x0003: 'GPSLongitudeRef',
    0x0004: 'GPSLongitude',
    0x0005: 'GPSAltitudeRef',
    0x0006: 'GPSAltitude',
    0x0007: 'GPSTimeStamp',
    0x0008: 'GPSSatellites',
    0x0009: 'GPSStatus',
    0x000A: 'GPSMeasureMode',
    0x000B: 'GPSDOP',
    0x000C: 'GPSSpeedRef',
    0x000D: 'GPSSpeed',
    0x000E: 'GPSTrackRef',
    0x000F: 'GPSTrack',
    0x0010: 'GPSImgDirectionRef',
    0x0011: 'GPSImgDirection',
    0x0012: 'GPSMapDatum',
    0x0013: 'GPSDestLatitudeRef',
    0x0014: 'GPSDestLatitude',
    0x0015: 'GPSDestLongitudeRef',
    0x0016: 'GPSDestLongitude',
    0x0017: 'GPSDestBearingRef',
    0x0018: 'GPSDestBearing',
    0x0019: 'GPSDestDistanceRef',
    0x001A: 'GPSDestDistance',
    0x001B: 'GPSProcessingMethod',
    0x001C: 'GPSAreaInformation',
    0x001D: 'GPSDateStamp',
    0x001E: 'GPSDifferential'
};

// Privacy-sensitive EXIF tags
const PRIVACY_SENSITIVE_TAGS = [
    'GPSInfo',
    'GPSLatitude',
    'GPSLongitude',
    'GPSAltitude',
    'GPSTimeStamp',
    'GPSDateStamp',
    'GPSLatitudeRef',
    'GPSLongitudeRef',
    'GPSAltitudeRef',
    'GPSAreaInformation',
    'GPSProcessingMethod',
    'GPSMapDatum',
    'GPSSatellites',
    'GPSStatus',
    'GPSMeasureMode',
    'GPSDOP',
    'GPSSpeed',
    'GPSTrack',
    'GPSImgDirection',
    'GPSDestLatitude',
    'GPSDestLongitude',
    'GPSDestBearing',
    'GPSDestDistance',
    'Artist',
    'Copyright',
    'UserComment',
    'MakerNote',
    'CameraOwnerName',
    'BodySerialNumber',
    'LensSerialNumber'
];

// Safe EXIF tags to preserve
const SAFE_EXIF_TAGS = [
    'ImageWidth',
    'ImageHeight',
    'BitsPerSample',
    'Compression',
    'PhotometricInterpretation',
    'Orientation',
    'XResolution',
    'YResolution',
    'ResolutionUnit',
    'Software',
    'DateTime',
    'ExposureTime',
    'FNumber',
    'ExposureProgram',
    'ISOSpeedRatings',
    'ExifVersion',
    'DateTimeOriginal',
    'DateTimeDigitized',
    'ShutterSpeedValue',
    'ApertureValue',
    'BrightnessValue',
    'ExposureBiasValue',
    'MaxApertureValue',
    'SubjectDistance',
    'MeteringMode',
    'LightSource',
    'Flash',
    'FocalLength',
    'ColorSpace',
    'PixelXDimension',
    'PixelYDimension',
    'WhiteBalance',
    'DigitalZoomRatio',
    'SceneCaptureType',
    'Contrast',
    'Saturation',
    'Sharpness'
];

/**
 * EXIF utilities class
 */
class ExifUtils {
    /**
     * Read EXIF data from image file
     */
    static async readExifData(file) {
        try {
            const buffer = await this.readFileAsArrayBuffer(file);
            const dataView = new DataView(buffer);
            
            // Check for JPEG format
            if (dataView.getUint16(0) !== 0xFFD8) {
                throw new Error('Not a valid JPEG file');
            }
            
            // Find EXIF segment
            const exifData = this.findExifSegment(dataView);
            
            if (!exifData) {
                return null;
            }
            
            // Parse EXIF data
            const parsedExif = this.parseExifData(exifData);
            
            return parsedExif;
            
        } catch (error) {
            console.error('Error reading EXIF data:', error);
            return null;
        }
    }
    
    /**
     * Extract EXIF data as object
     */
    static async extractExifObject(file) {
        const exifData = await this.readExifData(file);
        
        if (!exifData) {
            return {};
        }
        
        const exifObject = {};
        
        // Convert to readable object
        for (const [tag, value] of Object.entries(exifData)) {
            const tagName = EXIF_TAGS[parseInt(tag)] || `Unknown_${tag}`;
            exifObject[tagName] = this.formatExifValue(value);
        }
        
        return exifObject;
    }
    
    /**
     * Remove EXIF data from image
     */
    static async removeExifData(file) {
        try {
            const buffer = await this.readFileAsArrayBuffer(file);
            const dataView = new DataView(buffer);
            
            // Check for JPEG format
            if (dataView.getUint16(0) !== 0xFFD8) {
                // For non-JPEG files, just return the original
                return file;
            }
            
            // Create new buffer without EXIF data
            const cleanBuffer = this.removeExifSegments(dataView);
            
            // Create new file
            const cleanFile = new File([cleanBuffer], file.name, {
                type: file.type,
                lastModified: file.lastModified
            });
            
            return cleanFile;
            
        } catch (error) {
            console.error('Error removing EXIF data:', error);
            return file;
        }
    }
    
    /**
     * Preserve only safe EXIF data
     */
    static async preserveSafeExifData(file) {
        try {
            const exifData = await this.extractExifObject(file);
            
            if (!exifData || Object.keys(exifData).length === 0) {
                return file;
            }
            
            // Filter out privacy-sensitive tags
            const safeExifData = {};
            
            for (const [tag, value] of Object.entries(exifData)) {
                if (SAFE_EXIF_TAGS.includes(tag)) {
                    safeExifData[tag] = value;
                }
            }
            
            // Create new file with safe EXIF data
            return await this.embedExifData(file, safeExifData);
            
        } catch (error) {
            console.error('Error preserving safe EXIF data:', error);
            return file;
        }
    }
    
    /**
     * Handle EXIF data based on policy
     */
    static async handleExifData(file, policy = 'remove') {
        switch (policy) {
            case 'remove':
                return await this.removeExifData(file);
            case 'preserve':
                return file; // Keep original
            case 'selective':
                return await this.preserveSafeExifData(file);
            default:
                return file;
        }
    }
    
    /**
     * Get EXIF summary information
     */
    static async getExifSummary(file) {
        try {
            const exifData = await this.extractExifObject(file);
            
            if (!exifData || Object.keys(exifData).length === 0) {
                return {
                    hasExif: false,
                    totalTags: 0,
                    privacySensitive: 0,
                    cameraMake: null,
                    cameraModel: null,
                    dateTaken: null,
                    gpsData: false,
                    orientation: null
                };
            }
            
            // Count privacy-sensitive tags
            const privacySensitiveCount = Object.keys(exifData).filter(tag => 
                PRIVACY_SENSITIVE_TAGS.includes(tag)
            ).length;
            
            // Check for GPS data
            const hasGpsData = Object.keys(exifData).some(tag => 
                tag.startsWith('GPS')
            );
            
            return {
                hasExif: true,
                totalTags: Object.keys(exifData).length,
                privacySensitive: privacySensitiveCount,
                cameraMake: exifData.Make || null,
                cameraModel: exifData.Model || null,
                dateTaken: exifData.DateTimeOriginal || exifData.DateTime || null,
                gpsData: hasGpsData,
                orientation: exifData.Orientation || null,
                software: exifData.Software || null,
                exposureTime: exifData.ExposureTime || null,
                fNumber: exifData.FNumber || null,
                isoSpeed: exifData.ISOSpeedRatings || null,
                focalLength: exifData.FocalLength || null
            };
            
        } catch (error) {
            console.error('Error getting EXIF summary:', error);
            return {
                hasExif: false,
                totalTags: 0,
                privacySensitive: 0,
                error: error.message
            };
        }
    }
    
    /**
     * Read file as ArrayBuffer
     */
    static readFileAsArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }
    
    /**
     * Find EXIF segment in JPEG data
     */
    static findExifSegment(dataView) {
        let offset = 2; // Skip SOI marker
        
        while (offset < dataView.byteLength) {
            const marker = dataView.getUint16(offset);
            
            if (marker === 0xFFE1) { // APP1 segment
                const length = dataView.getUint16(offset + 2);
                const exifHeader = dataView.getUint32(offset + 4);
                
                if (exifHeader === 0x45786966) { // "Exif" in ASCII
                    const exifData = new DataView(
                        dataView.buffer,
                        offset + 10,
                        length - 8
                    );
                    return exifData;
                }
            }
            
            if ((marker & 0xFF00) !== 0xFF00) {
                break;
            }
            
            if (marker === 0xFFDA) { // Start of scan
                break;
            }
            
            const segmentLength = dataView.getUint16(offset + 2);
            offset += 2 + segmentLength;
        }
        
        return null;
    }
    
    /**
     * Parse EXIF data
     */
    static parseExifData(dataView) {
        const exifData = {};
        
        try {
            // Check byte order
            const byteOrder = dataView.getUint16(0);
            const littleEndian = byteOrder === 0x4949;
            
            // Check TIFF header
            const tiffHeader = dataView.getUint16(2, littleEndian);
            if (tiffHeader !== 0x002A) {
                throw new Error('Invalid TIFF header');
            }
            
            // Get IFD offset
            const ifdOffset = dataView.getUint32(4, littleEndian);
            
            // Parse IFD entries
            this.parseIFD(dataView, ifdOffset, littleEndian, exifData);
            
        } catch (error) {
            console.error('Error parsing EXIF data:', error);
        }
        
        return exifData;
    }
    
    /**
     * Parse IFD (Image File Directory)
     */
    static parseIFD(dataView, offset, littleEndian, exifData) {
        const entryCount = dataView.getUint16(offset, littleEndian);
        
        for (let i = 0; i < entryCount; i++) {
            const entryOffset = offset + 2 + (i * 12);
            
            const tag = dataView.getUint16(entryOffset, littleEndian);
            const type = dataView.getUint16(entryOffset + 2, littleEndian);
            const count = dataView.getUint32(entryOffset + 4, littleEndian);
            const valueOffset = dataView.getUint32(entryOffset + 8, littleEndian);
            
            const value = this.readExifValue(dataView, type, count, valueOffset, littleEndian);
            exifData[tag] = value;
        }
    }
    
    /**
     * Read EXIF value based on type
     */
    static readExifValue(dataView, type, count, valueOffset, littleEndian) {
        try {
            switch (type) {
                case 1: // BYTE
                    return dataView.getUint8(valueOffset);
                case 2: // ASCII
                    return this.readString(dataView, valueOffset, count);
                case 3: // SHORT
                    return dataView.getUint16(valueOffset, littleEndian);
                case 4: // LONG
                    return dataView.getUint32(valueOffset, littleEndian);
                case 5: // RATIONAL
                    const numerator = dataView.getUint32(valueOffset, littleEndian);
                    const denominator = dataView.getUint32(valueOffset + 4, littleEndian);
                    return denominator !== 0 ? numerator / denominator : 0;
                case 7: // UNDEFINED
                    return valueOffset;
                case 9: // SLONG
                    return dataView.getInt32(valueOffset, littleEndian);
                case 10: // SRATIONAL
                    const sNumerator = dataView.getInt32(valueOffset, littleEndian);
                    const sDenominator = dataView.getInt32(valueOffset + 4, littleEndian);
                    return sDenominator !== 0 ? sNumerator / sDenominator : 0;
                default:
                    return valueOffset;
            }
        } catch (error) {
            console.error('Error reading EXIF value:', error);
            return null;
        }
    }
    
    /**
     * Read string from DataView
     */
    static readString(dataView, offset, length) {
        const bytes = new Uint8Array(dataView.buffer, offset, length);
        return String.fromCharCode(...bytes).replace(/\0/g, '');
    }
    
    /**
     * Format EXIF value for display
     */
    static formatExifValue(value) {
        if (value === null || value === undefined) {
            return null;
        }
        
        if (typeof value === 'number') {
            // Format decimal numbers
            if (value % 1 !== 0) {
                return Number(value.toFixed(3));
            }
            return value;
        }
        
        if (typeof value === 'string') {
            return value.trim();
        }
        
        return value;
    }
    
    /**
     * Remove EXIF segments from JPEG
     */
    static removeExifSegments(dataView) {
        const result = [];
        let offset = 0;
        
        // Copy SOI marker
        result.push(dataView.getUint8(offset++));
        result.push(dataView.getUint8(offset++));
        
        while (offset < dataView.byteLength) {
            const marker = dataView.getUint16(offset);
            
            if (marker === 0xFFE1) { // APP1 segment (likely EXIF)
                const length = dataView.getUint16(offset + 2);
                // Skip this segment
                offset += 2 + length;
                continue;
            }
            
            if ((marker & 0xFF00) !== 0xFF00) {
                break;
            }
            
            if (marker === 0xFFDA) { // Start of scan
                // Copy remaining data
                for (let i = offset; i < dataView.byteLength; i++) {
                    result.push(dataView.getUint8(i));
                }
                break;
            }
            
            const segmentLength = dataView.getUint16(offset + 2);
            
            // Copy segment
            for (let i = 0; i < segmentLength + 2; i++) {
                result.push(dataView.getUint8(offset + i));
            }
            
            offset += 2 + segmentLength;
        }
        
        return new Uint8Array(result);
    }
    
    /**
     * Embed EXIF data into image (placeholder - complex implementation)
     */
    static async embedExifData(file, exifData) {
        // This would require a complex implementation to rebuild EXIF segments
        // For now, return the original file
        console.warn('EXIF embedding not yet implemented');
        return file;
    }
    
    /**
     * Get orientation from EXIF data
     */
    static async getOrientation(file) {
        try {
            const exifData = await this.extractExifObject(file);
            return exifData.Orientation || 1;
        } catch (error) {
            console.error('Error getting orientation:', error);
            return 1;
        }
    }
    
    /**
     * Apply orientation correction
     */
    static applyOrientationCorrection(canvas, orientation) {
        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;
        
        switch (orientation) {
            case 2:
                // Horizontal flip
                ctx.scale(-1, 1);
                ctx.translate(-width, 0);
                break;
            case 3:
                // 180° rotation
                ctx.rotate(Math.PI);
                ctx.translate(-width, -height);
                break;
            case 4:
                // Vertical flip
                ctx.scale(1, -1);
                ctx.translate(0, -height);
                break;
            case 5:
                // 90° rotation + horizontal flip
                ctx.rotate(Math.PI / 2);
                ctx.scale(-1, 1);
                ctx.translate(-height, -width);
                break;
            case 6:
                // 90° rotation
                ctx.rotate(Math.PI / 2);
                ctx.translate(0, -width);
                break;
            case 7:
                // 90° rotation + vertical flip
                ctx.rotate(Math.PI / 2);
                ctx.scale(1, -1);
                ctx.translate(0, -width);
                break;
            case 8:
                // 270° rotation
                ctx.rotate(-Math.PI / 2);
                ctx.translate(-height, 0);
                break;
            default:
                // No transformation needed
                break;
        }
    }
}

// Export utilities
export {
    ExifUtils,
    EXIF_TAGS,
    PRIVACY_SENSITIVE_TAGS,
    SAFE_EXIF_TAGS
}; 