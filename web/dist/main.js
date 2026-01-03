"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const app_1 = require("@app/app");
async function bootstrap() {
    app_1.app.listen(process.env.PORT, () => {
        console.log("server is successfully started on port= ", process.env.PORT);
    });
}
bootstrap();
