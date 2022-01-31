import assert from "assert";
import ThumbnailControllerProxy from "../src/Proxy/ThumbnailControllerProxy.js";

let ThumbnailControllerInstance = new ThumbnailControllerProxy();

describe("ThumbnailService", () => {
    it("request should return invalid domain", () => {
        let domainName = "https://google";

        ThumbnailControllerInstance.getThumbnail({
            domainName: domainName,
        }).then((response) => {
            assert.strictEqual(response.status, 404);
            assert.strictEqual(typeof response.data, "string");
        });
    });

    it("request should return image", () => {
        let domainName = "https://google.com";

        ThumbnailControllerInstance.getThumbnail({
            domainName: domainName,
        }).then((response) => {
            assert.strictEqual(response.headers['content-type'], "image/png");
        });
    });
});