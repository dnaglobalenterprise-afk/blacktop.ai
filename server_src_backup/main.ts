import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // This is the important part: it opens the door for your dashboard
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,POST',
    credentials: true,
  });

  await app.listen(3000);
  console.log("🚀 Brain is live on http://localhost:3000");
}
bootstrap();