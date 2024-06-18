import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { stages } from '../utils/settings'

interface StageState {
    name: string,
    count: number
}

interface State {
    count: number,
    stageStates: StageState[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state() {
        return {
            count: 123,
            stageStates: stages.map(name => ({name, count: 0}))
        }
    },
    mutations: {
        increment(state: State) {
            state.count++
        },
        moveToNextColumn(state: State, index: number) {
            if(index < state.stageStates.length-1) {
                state.stageStates[index].count++
            }
            
        },
        leaveCurrentColumn(state: State, index: number) {
            if(index > 0) {
                state.stageStates[index].count--
            }
        }
    }
})