/* eslint-disable import/no-anonymous-default-export */
import { UploadApiResponse, UploadApiErrorResponse, v2 } from 'cloudinary';
import formidable from "formidable";
export const config = {
	api: {
	  bodyParser: false
	}
  };
export default async function (req , res) {
	const id = req.query.id;
	try {
		v2.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		});
		const form = new formidable.IncomingForm();
		form.parse(req, async function (err, fields, files) {
			return res.status(201).send(await uploadImageToCloudinary(files.file.filepath));
		  });
		

	} catch (error) {
		console.log(error);
	}
	async function uploadImage(
		file: string,
	  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
		return new Promise(async (resolve, reject) => {
		  await v2.uploader.upload(file, {public_id: `conference-${id}-avatar`}, (error, result) => {
			if (error) return reject(error);
			resolve(result);
		  });
		});
	  }
	
	async function uploadImageToCloudinary(file: string) {
		return await uploadImage(file).catch(() => {
		   console.log("error")
		});
	  }
}