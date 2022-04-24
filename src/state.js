import { atom } from 'jotai'

export const socketAtom = atom(null)

export const visitorsAtom = atom([])
export const globalPositions = {
  visitors: {},
}

export const exploringAtom = atom(false)

export const gurkAtom = atom([
  {
    species: 'Telegraph Improved',
    rotation: [0, 0, 0],
    description: 'Good crops of traditional flavour.\\nLong dark fruits.',
    name: 'Gurban',
    position: [0, 0, -8],
    votes: 0,
    images: [
      {
        date: '2021-05-19T08:14:56+00:00',
        url: 'https://gurkpictures.s3.eu-north-1.amazonaws.com/2021-05-19 10:14:53.115150.jpg',
      },
    ],
  },
  {
    species: 'Emilie F1',
    rotation: [0, -Math.PI / 2, 0],
    description:
      'Prolific all female variety with smooth-skinned cues.\\nResistant to many diseases including cucumber mosaic virus.',
    name: 'Gladys',
    position: [8, 0, 0],
    votes: 0,
    images: [
      {
        date: '2021-05-19T08:14:56+00:00',
        url: 'https://gurkpictures.s3.eu-north-1.amazonaws.com/2021-05-19 10:14:53.115150.jpg',
      },
    ],
  },
  {
    species: 'Telegraph Improved',
    rotation: [0, -Math.PI, 0],
    description: 'Good crops of traditional flavour.\\nLong dark fruits.',
    name: 'Gurban 2',
    position: [0, 0, 10],
    votes: 0,
    images: [
      {
        date: '2021-05-19T08:14:56+00:00',
        url: 'https://gurkpictures.s3.eu-north-1.amazonaws.com/2021-05-19 10:14:53.115150.jpg',
      },
    ],
  },
  {
    species: 'Cornichon de Paris',
    rotation: [0, Math.PI / 2, 0],
    description:
      'French heirloom for masses of mini "cornichons".\\nCrunchy texture and sweet flavour.',
    name: 'Greger',
    position: [-8, 0, 0],
    votes: 0,
    images: [
      {
        date: '2021-05-19T08:14:56+00:00',
        url: 'https://gurkpictures.s3.eu-north-1.amazonaws.com/2021-05-19 10:14:53.115150.jpg',
      },
    ],
  },
])

export const selectedGurkAtom = atom(null)

export const colorAtom = atom('#FAFAFA')
// export const colorAtom = atom('#E9EDF0')
// export const colorAtom = atom('#252525')
