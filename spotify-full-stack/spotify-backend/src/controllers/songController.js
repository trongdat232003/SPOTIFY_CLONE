import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";
const addSong = async (req, res) => {
  try {
    console.log(req.body);

    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video", // chắc chắn rằng đây là đúng
    });

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;
    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };
    const song = new songModel(songData);
    await song.save();

    res.json({ success: true, message: "Song Added" });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find({});
    res.json({ success: true, songs: allSongs });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};
const removeSong = async (req, res) => {
  try {
    await songModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Song remove" });
  } catch (error) {
    res.json({ success: false, error });
  }
};
export { addSong, listSong, removeSong };
