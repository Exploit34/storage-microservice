import { Module } from '@nestjs/common';
import { AppController } from '../../controllers/app.controller';
import { HomeService } from '../services/service.home';
import { AppService } from '../../services/app.service';

@Module({
  controllers: [AppController],
  providers: [HomeService, AppService],
  exports: [HomeService]
})
export class HomeModule {}