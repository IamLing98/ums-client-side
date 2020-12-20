export const ACTION_TYPES = {
    SET_LIST_TERM: "SET_LIST_TERM"
}

export const setListTerm = (listTerm) =>({
    type: SET_LIST_TERM,
    payload:listTerm
})
