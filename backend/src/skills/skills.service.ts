import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillsRepository: Repository<Skill>,
  ) {}

  create(createSkillDto: CreateSkillDto) {
    const newSkill = this.skillsRepository.create(createSkillDto);
    return this.skillsRepository.save(newSkill);
  }

  findAll() {
    return this.skillsRepository.find();
  }

  findOne(id: number) {
    return this.skillsRepository.findOne({ where: { id } });
  }

  update(id: number, updateSkillDto: UpdateSkillDto) {
    return this.skillsRepository.update(id, updateSkillDto);
  }

  remove(id: number) {
    return this.skillsRepository.delete(id);
  }
}