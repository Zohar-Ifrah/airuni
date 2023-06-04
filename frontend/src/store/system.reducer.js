export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SET_DETAILS_SHOWN = 'SET_DETAILS_SHOWN'
export const SET_DETAILS_UNSHOWN = 'SET_DETAILS_UNSHOWN'

const initialState = {
  isLoading: false,
  isDetailsShown: false,
}

export function systemReducer(state = initialState, action = {}) {

  switch (action.type) {

    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case SET_DETAILS_SHOWN:
      return { ...state, isDetailsShown: true }
    case SET_DETAILS_UNSHOWN:
      return { ...state, isDetailsShown: false }

    default: return state

  }
}
