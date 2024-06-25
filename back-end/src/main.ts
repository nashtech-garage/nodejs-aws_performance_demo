import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import instrumentation from './instrumentation';
import BackendInstrument from './backend.instrument';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(), {
      snapshot: true,  
    }
  );
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:8080'
    ]
  });

  const config = new DocumentBuilder()
  .setTitle('Demo Backend')
  .setDescription('Backend API Description')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // await instrumentation();
  await BackendInstrument();

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
