import { create } from 'domain';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  //collector
  await prisma.collector
    .createMany({
      data: [
        {
          id: 1,
          name: 'Everything Everywhere All at Once',
          type: 'movie',
          teaser: '',
        },
        {
          id: 2,
          name: 'Scream VI',
          type: 'movie',
          teaser: '',
        },
        {
          id: 3,
          name: 'The Whale',
          type: 'movie',
          teaser: '',
        },
        {
          id: 4,
          name: 'Luther: The Fallen Sun',
          type: 'movie',
          teaser: '',
        },
        {
          id: 5,
          name: 'The  Mermaid ',
          type: 'serie',
          teaser: '',
        },
        {
          id: 6,
          name: 'Cocaine Bear',
          type: 'serie',
          teaser: '',
        },
        {
          id: 7,
          name: 'Shazam! Fury of the Gods ',
          type: 'serie',
          teaser: '',
        },
        {
          id: 8,
          name: 'Im Westen nichts Neues',
          type: 'serie',
          teaser: '',
        },
        {
          id: 9,
          name: 'The Banshees of Inisherin',
          type: 'serie',
          teaser: '',
        },
        {
          id: 10,
          name: 'Triangle of Sadness',
          type: 'serie',
          teaser: '',
        },
        {
          id: 11,
          name: '65',
          type: 'movie',
          teaser: '',
        },
        {
          id: 12,
          name: 'Creed III ',
          type: 'movie',
          teaser: '',
        },
        {
          id: 13,
          name: 'John Wick: Chapter 4',
          type: 'movie',
          teaser: '',
        },
        {
          id: 14,
          name: 'Women Talking',
          type: 'movie',
          teaser: '',
        },
        {
          id: 15,
          name: 'Tár',
          type: 'movie',
          teaser: '',
        },
      ],
    })
    .then(() => {
      console.info('[SEED] Succussfully seeded Categories table ');
    })
    .catch((err) => {
      console.log(err);
    });
  //rating
  await prisma.rating
    .createMany({
      data: [
        {
          id: 1,
          collectorId: 1,
          mark: 9.2,
        },
        {
          id: 2,
          collectorId: 2,
          mark: 8,
        },
        {
          id: 3,
          collectorId: 3,
          mark: 4,
        },
        {
          id: 4,
          collectorId: 4,
          mark: 4,
        },
        {
          id: 5,
          collectorId: 5,
          mark: 8,
        },
        {
          id: 6,
          collectorId: 6,
          mark: 8,
        },
        {
          id: 7,
          collectorId: 7,
          mark: 8,
        },
        {
          id: 8,
          collectorId: 8,
          mark: 8,
        },
        {
          id: 9,
          collectorId: 9,
          mark: 2,
        },
        {
          id: 10,
          collectorId: 10,
          mark: 2,
        },
        {
          id: 11,
          collectorId: 11,
          mark: 4,
        },
        {
          id: 12,
          collectorId: 12,
          mark: 4,
        },
        {
          id: 13,
          collectorId: 12,
          mark: 10,
        },
        {
          id: 14,
          collectorId: 12,
          mark: 7.5,
        },
        {
          id: 15,
          collectorId: 12,
          mark: 6.5,
        },
        {
          id: 16,
          collectorId: 1,
          mark: 5,
        },
        {
          id: 17,
          collectorId: 1,
          mark: 2,
        },
      ],
    })
    .then(() => {
      console.info('[SEED] Succussfully seeded Categories table ');
    })
    .catch((err) => {
      console.log(err);
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
