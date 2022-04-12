import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { CategoryService } from './category.service';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [CategoryService]
})
export class CategoryModule {}
