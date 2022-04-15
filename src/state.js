import { atom } from 'jotai'

export const exploringAtom = atom(false)

export const gurkAtom = atom([
  {
    name: 'Gurban',
    species: 'Telegraph Improved',
    description: 'Good crops of traditional flavour.\nLong dark fruits.',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    url: '/gurka.jpg',
  },
  {
    name: 'Greger',
    species: 'Cornichon de Paris',
    description:
      'French heirloom for masses of mini "cornichons".\nCrunchy texture and sweet flavour.',
    position: [-3, 0, 0.5],
    rotation: [0, Math.PI / 8, 0],
    url: '/gurka.jpg',
  },
  {
    name: 'Gladys',
    species: 'Emilie F1',
    description:
      'Prolific all female variety with smooth-skinned cues.\nResistant to many diseases including cucumber mosaic virus.',
    position: [3, 0, 0.5],
    rotation: [0, -Math.PI / 8, 0],
    // url: '/gurka.jpg',
    url: 'https://gurkpictures.s3.eu-north-1.amazonaws.com/2021-05-18%2015:09:48.271722.jpg',
  },
])

export const selectedGurkAtom = atom(null)
