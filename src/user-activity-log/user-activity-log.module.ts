import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserActivityLogService } from './user-activity-log.service';
import { UserActivityLogController } from './user-activity-log.controller';
import { UserActivityLog } from './entities/user-activity-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserActivityLog])],
  controllers: [UserActivityLogController],
  providers: [UserActivityLogService],
  exports: [TypeOrmModule, UserActivityLogService],
})
export class UserActivityLogModule {}
