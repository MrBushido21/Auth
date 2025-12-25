import cloudinary from "../../cfg/cloudinary.js";
import { removeLocalFile } from "../../utils/utils.js";


export const convertImg = async (path: any) => {
  try {
    const result = await cloudinary.uploader.upload(`${path}`, {
      folder: "images",
    });
    removeLocalFile(path)
    return { url: result.secure_url, public_id: result.public_id }
    
  } catch (error) {
    console.error(error);
  }
}



