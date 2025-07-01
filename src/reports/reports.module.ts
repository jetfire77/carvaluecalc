import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Report } from './report.entity'; // Import the Report entity
@Module({
  imports: [
    TypeOrmModule.forFeature([Report]) // Specify the entities here if any
  ],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule { }
