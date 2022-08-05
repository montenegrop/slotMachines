import Roll from '../db/Roll'

export const rollConfig = {
  resource: Roll,
  options: {
    listProperties: [
      'publisher',
      'game',
      'player',
      'bet',
      'result',
      'createdAt'
    ],
    actions: {
      edit: false,
      list: {
        before: async (request: any, context: any) => {
          const { currentAdmin } = context
          if (currentAdmin.role === 'admin') {
            return {
              ...request
            }
          }
          return {
            ...request,
            query: {
              ...request.query,
              'filters.publisher': currentAdmin.publisher
            }
          }
        }
      }
    }
  }
}
