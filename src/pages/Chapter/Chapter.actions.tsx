
export const ADD_LOCAL_PROGRESS = 'ADD_LOCAL_PROGRESS'

export class AddProgressInputs {
    chapterDone!: string
}

export const addLocalProgress = ({ chapterDone }: AddProgressInputs) => (dispatch: any) => {
    dispatch({
        type: ADD_LOCAL_PROGRESS,
        payload: {
            chapterDone
        },
    })
}