"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const { AppModule } = require('./app.module');
async function bootstrap() {
    const app = await core_1.NestFactory.create(AppModule);
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    await app.listen(4000);
    console.log('Servidor a correr em http://localhost:4000');
}
bootstrap();
//# sourceMappingURL=main.js.map