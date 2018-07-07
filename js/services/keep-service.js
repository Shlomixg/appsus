import { loadFromStorage, saveToStorage, makeId } from './utils-service.js';

const KEEP_KEY = 'misterKeep';

let sampleKeeps = [
  {
    id: makeId(),
    title: 'Just another title',
    backgroundColor: 'bg-white',
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
      },
      {
        id: makeId(),
        type: 'keep-todo',
        data: [
          {
            id: makeId(),
            txt: 'Buy new car',
            isDone: false
          },
          {
            id: makeId(),
            txt: 'Watch WestWorld',
            isDone: true
          }
        ]
      }
    ],
    isPinned: true
  },

  {
    id: makeId(),
    title: 'Just another title title',
    backgroundColor: 'bg-white',
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

export function craeteEmptyItem(type) {
  let item = {
    id: makeId(),
    type
  };

  switch (type) {
    case 'keep-txt':
      item.data = 'Write Somthing';
      break;
    case 'keep-todo':
      item.data = [
        {
          id: makeId(),
          txt: 'What needs to be done',
          isDone: false
        }
      ];
      break;
  }

  return item;
}

export function deleteItem(keepId, cmpId) {
  getKeeps().then(keeps => {
    let keep = keeps.find(keep => keep.id === keepId);
    let idx = keep.cmps.findIndex(cmp => cmp.id === cmpId);

    keep.cmps.splice(idx, 1);
    saveKeep(keep, keepId);
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
