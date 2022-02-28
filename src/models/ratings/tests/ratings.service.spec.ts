import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { RatingsService } from '../ratings.service';

describe('RatingsService', () => {
  let ratingsService: RatingsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingsService,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    ratingsService = module.get<RatingsService>(RatingsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(ratingsService).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
