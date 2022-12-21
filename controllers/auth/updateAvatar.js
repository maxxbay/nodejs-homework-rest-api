const fs = require("fs/promises");
const { User } = require("../../models");
const path = require("path");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatar");

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const extention = originalname.split(".").pop();
    const fileName = `avatar${_id}.${extention}`;
    const resultUpload = path.join(avatarDir, fileName);

    Jimp.read(tempUpload)
      .then((image) => image.resize(250, 250).write(resultUpload))
      .catch((error) => console.log(error));

    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", fileName);

    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
