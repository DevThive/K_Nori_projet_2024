import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/entity/class.entity';
import { Instructor } from 'src/entity/instructor.entity';

@Module({ imports: [TypeOrmModule.forFeature([Class, Instructor])] })
export class InstructorModule {}
