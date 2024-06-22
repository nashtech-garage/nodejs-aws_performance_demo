import { Injectable } from '@nestjs/common';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { UpdateSummaryDto } from './dto/update-summary.dto';
import { Repository } from 'typeorm';
import { Summary } from './entities/summary.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SummaryService {
  constructor(
    @InjectRepository(Summary)
    private summaryRepository: Repository<Summary>,
  ) {}

  create(createSummaryDto: CreateSummaryDto) {
    return this.summaryRepository.save(createSummaryDto);
  }

  findAll(): Promise<Summary[]> {
    return this.summaryRepository.find();
  }

  findOne(id: number): Promise<Summary | null> {
    return this.summaryRepository.findOneBy({id});
  }

  update(id: number, updateSummaryDto: UpdateSummaryDto) {
    return this.summaryRepository.update(id, updateSummaryDto);
  }

  remove(id: number) {
    return this.summaryRepository.delete({id});
  }
}
