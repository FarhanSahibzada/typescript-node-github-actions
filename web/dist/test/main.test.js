"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@app/app");
const listenSpy = jest
    .spyOn(app_1.app, "listen")
    .mockImplementation((port, callback) => {
    if (callback)
        callback();
    return {};
});
const main_1 = require("@app/main");
describe("main.ts / test", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it("should start the server without errors", async () => {
        await (0, main_1.bootstrap)();
        await expect(listenSpy).toHaveBeenCalledWith(process.env.PORT, expect.any(Function));
    });
});
