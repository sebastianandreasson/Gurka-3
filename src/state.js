import { atom } from 'jotai'

export const socketAtom = atom(null)

export const visitorsAtom = atom([])
export const globalPositions = {
  visitors: {},
}

export const exploringAtom = atom(false)

export const gurkAtom = atom([])

export const selectedGurkAtom = atom(null)

export const colorAtom = atom('#FAFAFA')
// export const colorAtom = atom('#E9EDF0')
// export const colorAtom = atom('#252525')
