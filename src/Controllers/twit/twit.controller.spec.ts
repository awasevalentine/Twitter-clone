import { Test, TestingModule } from '@nestjs/testing';
import { TwitController } from './twit.controller';

describe('TwitController', () => {
  let controller: TwitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TwitController],
    }).compile();

    controller = module.get<TwitController>(TwitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
