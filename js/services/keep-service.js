import { loadFromStorage, saveToStorage, makeid } from './utils-service.js';
let keeps = [
  {
    id: makeid(),
    cmps: [
      {
        id: makeid(),
        type: 'keep-txt',
        data: 'Hello Ariel'
      },
      {
        id: makeid(),
        type: 'keep-img',
        data: 'http://via.placeholder.com/350x150'
      }
    ],
    isPinned: true
  },

  {
    id: makeid(),
    cmps: [
      {
        id: makeid(),
        type: 'keep-txt',
        data: 'My note'
      },
      {
        id: makeid(),
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
