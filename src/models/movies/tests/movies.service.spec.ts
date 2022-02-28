import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { MoviesService } from '../movies.service';

describe('MoviesService', () => {
  let moviesService: MoviesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(moviesService).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
