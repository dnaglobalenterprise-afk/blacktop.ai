import { Test, TestingModule } from '@nestjs/testing';
import { FeasibilityService } from './feasibility.service';

describe('FeasibilityService', () => {
  let service: FeasibilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeasibilityService],
    }).compile();

    service = module.get<FeasibilityService>(FeasibilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
