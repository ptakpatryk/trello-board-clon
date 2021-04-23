import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'second task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'and thrid',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'Ziemniaczki',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'Kurczaczki',
          id: uuid(),
          userAssigned: null
        },
        {
          description: 'Smaczki',
          name: 'Warchlaczki',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: 'Jedyneczka',
          name: '1',
          id: uuid(),
          userAssigned: null
        },
        {
          description: 'Dwojeczka',
          name: '2',
          id: uuid(),
          userAssigned: null
        },
        {
          description: 'Trojeczka',
          name: '3',
          id: uuid(),
          userAssigned: null
        },
        {
          description: 'Czworeczka',
          name: '4',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'done',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        }
      ]
    }
  ]
}
