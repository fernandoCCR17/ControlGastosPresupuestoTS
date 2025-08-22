export type BudgetActions = 
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' }  |
    { type: 'close-modal' }

export type BudgetState = {
    budget: number,
    modal: boolean
}

export const initialState: BudgetState = {
    budget: 0,
    modal: false
}

export const budgetReducer = (
    state: BudgetState = initialState,
    actions: BudgetActions
) => {
    if(actions.type === 'add-budget'){
        return {
            ...state,
            budget: actions.payload.budget
        }
    }

    if(actions.type === 'show-modal'){
        return {
            ...state,
            modal: true
        }
    }
    
    if(actions.type === 'close-modal'){
        return {
            ...state,
            modal: false
        }
    }

    return state;
}