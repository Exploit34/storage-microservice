import { Module } from '@nestjs/common';
import { AppController, HomeAppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { HomeModule } from '../interface/modules/module.home';
import { DatabaseModule } from '../db/modules/database.module';

@Module({
  imports: [
    HomeModule,
    DatabaseModule,
  ],
  controllers: [AppController, HomeAppController],
  providers: [AppService, HomeModule],
})
export class AppModule {}
