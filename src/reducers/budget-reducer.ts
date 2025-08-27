import { v4 as uuidv4 } from 'uuid'
import type { DraftExpense, Expense } from "../types"

export type BudgetActions = 
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' }  |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: { id: Expense['id'] } } |
    { type: 'get-expense-by-id', payload: { id: Expense['id'] } }

export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[],
    editingId: Expense['id']
}

export const initialState: BudgetState = {
    budget: 0,
    modal: false,
    expenses: [],
    editingId: ''
}

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
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
            modal: false,
            editingId: ''
        }
    }

    if(actions.type === 'add-expense'){
        const expense = createExpense(actions.payload.expense)

        return {
            ...state,
            expenses: [...state.expenses, expense]
        }
    }

    if(actions.type === 'remove-expense'){
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== actions.payload.id)
        }
    }

    if(actions.type === 'get-expense-by-id'){
        return {
            ...state,
            editingId: actions.payload.id,
            modal: true
        }
    }

    return state;
}