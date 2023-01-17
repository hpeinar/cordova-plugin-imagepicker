/*global cordova,window,console*/
/**
 * An Image Picker plugin for Cordova
 *
 * Developed by Wymsee for Sync OnSet
 */

var ImagePicker = function() {

};

ImagePicker.prototype.OutputType = {
	FILE_URI: 0,
	BASE64_STRING: 1
};

ImagePicker.prototype.SourceType = {
	 /** Choose image from the device's photo library (same as SAVEDPHOTOALBUM for Android) */
	 PHOTOLIBRARY: 0,
	 /** Take picture from camera */
	 CAMERA: 1,
	 /** Choose image only from the device's Camera Roll album (same as PHOTOLIBRARY for Android) */
	 SAVEDPHOTOALBUM: 2
}

ImagePicker.prototype.MediaType = {
	/** Allow selection of still pictures only. DEFAULT. Will return format specified via DestinationType */
	PICTURE: 0,
	/** Allow selection of video only, ONLY RETURNS URL */
	VIDEO: 1,
	/** Allow selection from all media types */
	ALLMEDIA: 2
}

ImagePicker.prototype.validateOutputType = function(options){
	var outputType = options.outputType;
	if(outputType){
		if(outputType !== this.OutputType.FILE_URI && outputType !== this.OutputType.BASE64_STRING){
			console.log('Invalid output type option entered. Defaulting to FILE_URI. Please use window.imagePicker.OutputType.FILE_URI or window.imagePicker.OutputType.BASE64_STRING');
			options.outputType = this.OutputType.FILE_URI;
		}
	}
};

ImagePicker.prototype.hasReadPermission = function(callback) {
  return cordova.exec(callback, null, "ImagePicker", "hasReadPermission", []);
};

ImagePicker.prototype.requestReadPermission = function(callback, failureCallback) {
  return cordova.exec(callback, failureCallback, "ImagePicker", "requestReadPermission", []);
};

/*
*	success - success callback
*	fail - error callback
*	options
*		.maximumImagesCount - max images to be selected, defaults to 15. If this is set to 1,
*		                      upon selection of a single image, the plugin will return it.
*		.width - width to resize image to (if one of height/width is 0, will resize to fit the
*		         other while keeping aspect ratio, if both height and width are 0, the full size
*		         image will be returned)
*		.height - height to resize image to
*		.quality - quality of resized image, defaults to 100
*       .outputType - type of output returned. defaults to file URIs.
*					  Please see ImagePicker.OutputType for available values.
*/
ImagePicker.prototype.getPictures = function(success, fail, options) {
	if (!options) {
		options = {};
	}

	this.validateOutputType(options);

	const quality = options.quality ? options.quality : 100;
	const destinationType = 1; // Hardcoded to 1 for android as our project wont use dataUrls
	const sourceType = options.sourceType ? options.sourceType : ImagePicker.SourceType.PHOTOLIBRARY;
	const targetWidth =  options.width ? options.width : 0;
	const targetHeight = options.height ? options.height : 0;
	const encodingType = 0; // Hardcoded to JPEG
	const mediaType = options.mediaType ? options.mediaType : ImagePicker.MediaType.PICTURE;
	const allowEdit = !!options.allowEdit;
    const correctOrientation = !!options.correctOrientation;
    const saveToPhotoAlbum = !!options.saveToPhotoAlbum;
	const maximumImagesCount = options.maximumImagesCount ? options.maximumImagesCount : 15;

	var args = [quality, destinationType, sourceType, targetWidth, targetHeight, encodingType,
        mediaType, allowEdit, correctOrientation, saveToPhotoAlbum, maximumImagesCount];

    return cordova.exec(success, fail, 'ImagePicker', 'takePicture', args);
};

window.imagePicker = new ImagePicker();
