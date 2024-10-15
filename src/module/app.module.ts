import { Module } from '@nestjs/common';
import { AppController, HomeAppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { HomeModule } from '../interface/modules/module.home';
import { DatabaseModule } from '../db/modules/database.module';
import { ImageModule } from '../image/modules/image.module';
import { AuthModule } from '../auth/modules/auth.module';
import { firebaseSdk } from '../firebase/SDK/firebase.sdk';

@Module({
  imports: [
    HomeModule,
    DatabaseModule,
    ImageModule,
    AuthModule,
  ],
  controllers: [AppController, HomeAppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    firebaseSdk();
  }
}
