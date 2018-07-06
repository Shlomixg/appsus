import { loadFromStorage, saveToStorage, makeId } from './utils-service.js';
let keeps = [
  {
    id: makeId(),
    title: 'Just another title',
    cmps: [
      {
        id: makeId(),
        type: 'keep-txt',
        data: 'Hello Ariel'
      },
      {
        id: makeId(),
        type: 'keep-img',
        data: 'http://via.placeholder.com/350x150'
      },
      {
        id: makeId(),
        type: 'keep-audio',
        data:
          'http://soundbible.com/mp3/Tyrannosaurus%20Rex%20Roar-SoundBible.com-807702404.mp3'
      }
    ],
    isPinned: true
  },

  {
    id: makeId(),
    title: 'Just another title title',
    cmps: [
      {
        id: makeId(),
        type: 'keep-txt',
        data: 'My note'
      },
      {
        id: makeId(),
        type: 'keep-img',
        data: 'http://via.placeholder.com/150x150'
      }
    ],
    isPinned: false
  }
];

export function getKeeps() {
  return Promise.resolve(keeps);
}

export function getKeepById(keepId) {
  let keep = keeps.find(({ id }) => id === keepId);
  return Promise.resolve(keep);
}
