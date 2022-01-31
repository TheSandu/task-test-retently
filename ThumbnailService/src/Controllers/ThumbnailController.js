import ThumbnailModel from "../Models/ThumbnailModel.js";

const ThumbnailModelInstance = new ThumbnailModel();

export default class ThumbnailController {
    async getThumbnail(req, res) {
        try {

            let domainName = req.body.domainName;

            if (!domainName)
                return res.status(404).json({
                    data: "Set domainName"
                });

            if (!(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(domainName)))
                return res.status(404).json({
                    data: "Invalid domainName"
                });

            let userId = req.user._id;

            let thumbnail = await ThumbnailModelInstance.getThumbNail({
                domainName: domainName,
                userId: userId,
            });

            if (!thumbnail)
                return res.status(404).json({
                    data: "Thumbnail cant be created"
                });

            return res.sendFile(thumbnail.filePath);

        } catch (error) {
            console.log(`ThumbnailController:getThumbnail | ${ error.message }`);
        }
    }

}