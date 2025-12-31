import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios'; 
import { firstValueFrom } from 'rxjs';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private readonly httpService: HttpService,
  ) {}

  async getGithubRepos() {

    const username = 'Muhammad-Salman-dev';

    const url = `https://api.github.com/users/${username}/repos?sort=updated`;

    const { data } = await firstValueFrom(this.httpService.get(url));

    return data.map((repo) => ({
      title: repo.name,
      description: repo.description || 'No description provided.',
      githubLink: repo.html_url,
      liveLink: repo.homepage || '',
      stars: repo.stargazers_count,
      language: repo.language
    }));
  }

  create(createProjectDto: CreateProjectDto) {
    const newProject = this.projectsRepository.create(createProjectDto);
    return this.projectsRepository.save(newProject);
  }

  findAll() {
    return this.projectsRepository.find();
  }

  findOne(id: number) {
    return this.projectsRepository.findOne({ where: { id } });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectsRepository.update(id, updateProjectDto);
  }

  remove(id: number) {
    return this.projectsRepository.delete(id);
  }
}