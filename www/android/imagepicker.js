/*global cordova,window,console*/
/**
 * An Image Picker plugin for Cordova
 *
 * Developed by Wymsee for Sync OnSet
 */
 window.imagePicker.prototype.OutputType = {
	FILE_URI: 0,
	BASE64_STRING: 1
};

window.imagePicker.prototype.SourceType = {
	 /** Choose image from the device's photo library (same as SAVEDPHOTOALBUM for Android) */
	 PHOTOLIBRARY: 0,
	 /** Take picture from camera */
	 CAMERA: 1,
	 /** Choose image only from the device's Camera Roll album (same as PHOTOLIBRARY for Android) */
	 SAVEDPHOTOALBUM: 2
}

window.imagePicker.prototype.MediaType = {
	/** Allow selection of still pictures only. DEFAULT. Will return format specified via DestinationType */
	PICTURE: 0,
	/** Allow selection of video only, ONLY RETURNS URL */
	VIDEO: 1,
	/** Allow selection from all media types */
	ALLMEDIA: 2
}

window.imagePicker.prototype.getPictures = function(success, fail, options) {
	if (!options) {
		options = {};
	}

	this.validateOutputType(options);

	const quality = options.quality ? options.quality : 100;
	const destinationType = 1; // Hardcoded to 1 for android as our project wont use dataUrls
	const sourceType = options.sourceType ? options.sourceType : window.imagePicker.SourceType.PHOTOLIBRARY;
	const targetWidth =  options.width ? options.width : 0;
	const targetHeight = options.height ? options.height : 0;
	const encodingType = 0; // Hardcoded to JPEG
	const mediaType = options.mediaType ? options.mediaType : window.imagePicker.MediaType.PICTURE;
	const allowEdit = !!options.allowEdit;
    const correctOrientation = !!options.correctOrientation;
    const saveToPhotoAlbum = !!options.saveToPhotoAlbum;
	const maximumImagesCount = options.maximumImagesCount ? options.maximumImagesCount : 15;

	var args = [quality, destinationType, sourceType, targetWidth, targetHeight, encodingType,
        mediaType, allowEdit, correctOrientation, saveToPhotoAlbum, maximumImagesCount];

    return cordova.exec(success, fail, 'ImagePicker', 'takePicture', args);
};