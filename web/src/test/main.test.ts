import { app } from "@app/app";
import type { Server } from "http";

const listenSpy = jest
  .spyOn(app, "listen")
  .mockImplementation((port: unknown, callback?: () => void) => {
    if (callback) callback();
    return {} as Server;
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
