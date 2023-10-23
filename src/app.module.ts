import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    AuthModule
  ],

})
export class AppModule { }
// AppModule에서 imports 배열에 포함된 모듈들 (BoardsModule, AuthModule 등)은 애플리케이션의 일부로서 실행됩니다. 
// 이것은 해당 모듈들이 애플리케이션에 포함되어야 한다는 것을 NestJS 프레임워크에 알려주는 것입니다.
// 그러나 실제 HTTP 요청 처리는 각 컨트롤러에서 직접 수행되며, AppModule 자체가 요청을 "중간에서 처리"하는 것은 아닙니다. 
// AppModule은 애플리케이션의 전반적인 구조와 종속성을 정의하는 역할만 수행합니다.