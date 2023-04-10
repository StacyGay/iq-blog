/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    const documentConfig = new DocumentBuilder()
        .setTitle('iq-blog api')
        .setDescription('The iq-blog api implementation')
        .setVersion('1.0')
        .addTag('blog')
        .build();
    const document = SwaggerModule.createDocument(app, documentConfig);
    SwaggerModule.setup('api/swagger', app, document); // TODO: set swagger to api root
    
    const port = process.env.PORT || 3000;
    await app.listen(port);
    Logger.log(
        `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
    );
}

bootstrap();
