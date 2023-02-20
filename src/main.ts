import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // 우리가 쓰고 싶은 파이프를 NestJS어플리케이션에게 넘겨줌
    new ValidationPipe({
      // true로 설정하면 아무 decorator도 없는 어떠한 property의 object를 거릅니다
      whitelist:true,
      // 보안을 한단계 상승 / 누군가 이상한걸 보내면 request자체를 막아버림
      forbidNonWhitelisted:true,

      // 여기있는 유저들이 보낸 값을 우리가 원하는 실제 타입으로 변환해준다 
      // 엔티티에 있는 타입으로 자동 변환해줌// 프레임워크의 유용성 express였으면 직접 수정해서 적용했어야 함
      transform:true,
      
    }) // 유효성 검사를 해줌
  );
  await app.listen(3000);
}
bootstrap();
