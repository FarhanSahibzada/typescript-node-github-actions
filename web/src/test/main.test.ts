import { app } from "@app/app";

const listenSpy = jest
  .spyOn(app, "listen")
  .mockImplementation((port: any, callback: any) => {
    if (callback) callback();
    return {} as any;
  });

import { bootstrap } from "@app/main";

describe("main.ts / test", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("should start the server without errors", async () => {
    await bootstrap();
    await expect(listenSpy).toHaveBeenCalledWith(
      process.env.PORT,
      expect.any(Function)
    );
  });
});
