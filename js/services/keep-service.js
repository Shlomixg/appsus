import { loadFromStorage, saveToStorage, makeId } from './utils-service.js';

const KEEP_KEY = 'misterKeep';

let sampleKeeps = [
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
let keeps;

export function getKeeps() {
  // try loading keeps from storage
  if (!keeps) keeps = loadFromStorage(KEEP_KEY);
  // storge was empty create sample data
  if (!keeps) {
    keeps = JSON.parse(JSON.stringify(sampleKeeps));
    saveToStorage(KEEP_KEY, keeps);
  }
  return Promise.resolve(keeps);
}

export function getKeepById(keepId) {
  return getKeeps().then(keeps => {
    let keep = keeps.find(({ id }) => id === keepId);
    return keep;
  });
}

export function saveKeep(newKeep, keepId) {
  getKeepById(keepId).then(keep => {
    keep = newKeep;
    saveToStorage(KEEP_KEY, keeps);
  });
}

export function newKeep() {
  return getKeeps().then(keeps => {
    let emptyKeep = createEmptyKeep();
    keeps.unshift(emptyKeep);
    saveToStorage(KEEP_KEY, keeps);
    return emptyKeep.id;
  });
}

function createEmptyKeep() {
  return {
    id: makeId(),
    title: 'Title',
    cmps: [
      {
        id: makeId(),
        type: 'keep-txt',
        data: 'Write somthing....'
      }
    ],
    isPinned: false
  };
}
