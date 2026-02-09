import { Test, TestingModule } from '@nestjs/testing';
import { FeasibilityController } from './feasibility.controller';

describe('FeasibilityController', () => {
  let controller: FeasibilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeasibilityController],
    }).compile();

    controller = module.get<FeasibilityController>(FeasibilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
