type ActionType =
    | {
          type: 'SET_TITLE' | 'SET_DESCRIPTION' | 'SET_DEADLINE'
          payload: string
      }
    | {
          type: 'SET_FORM_ERROR' | 'SET_TITLE_ERROR'
          payload: boolean
      }

export const initialState = {
    title: '',
    description: '',
    deadline: '',
    formError: false,
    titleError: false
}

export const reducer = (state: typeof initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET_TITLE':
            return {
                ...state,
                title: action.payload
            }
        case 'SET_DESCRIPTION':
            return {
                ...state,
                description: action.payload
            }
        case 'SET_DEADLINE':
            return {
                ...state,
                deadline: action.payload
            }
        case 'SET_TITLE_ERROR':
            return {
                ...state,
                titleError: action.payload
            }
        case 'SET_FORM_ERROR':
            return {
                ...state,
                formError: action.payload
            }
        default:
            return state
    }
}
