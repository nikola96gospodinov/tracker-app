type ActionType =
    | {
          type: 'SET_EMAIL'
          payload: string
      }
    | {
          type: 'SET_IS_SUCCESS' | 'SET_FORM_ERROR' | 'SET_EMAIL_ERROR'
          payload: boolean
      }

export const initialState = {
    email: '',
    emailError: false,
    formError: false,
    isSuccess: false
}

export const reducer = (state: typeof initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload
            }
        case 'SET_EMAIL_ERROR':
            return {
                ...state,
                emailError: action.payload
            }
        case 'SET_FORM_ERROR':
            return {
                ...state,
                formError: action.payload
            }
        case 'SET_IS_SUCCESS':
            return {
                ...state,
                isSuccess: action.payload
            }
        default:
            return state
    }
}
