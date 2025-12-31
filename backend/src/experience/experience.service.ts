import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Experience } from './entities/experience.entity';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
  ) {}

  create(createExperienceDto: CreateExperienceDto) {
    const newExp = this.experienceRepository.create(createExperienceDto);
    return this.experienceRepository.save(newExp);
  }

  findAll() {
    return this.experienceRepository.find();
  }

  findOne(id: number) {
    return this.experienceRepository.findOne({ where: { id } });
  }

  update(id: number, updateExperienceDto: UpdateExperienceDto) {
    return this.experienceRepository.update(id, updateExperienceDto);
  }

  remove(id: number) {
    return this.experienceRepository.delete(id);
  }
}