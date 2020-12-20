import {ACTION_TYPES} from './actions.js'

const INIT_STATE = {
    listTerm: 
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_LIST_TERM:
            return {
                ...state,
                chatContent: action.id
            };
        case MSG_SUBMIT:
            return {
                ...state,
                chats: chatData.map(chat =>
                    (chat.id === action.id
                        ?
                        Object.assign({}, chat, chat.chatHistory[0][1]['to'].push(action.chatMsg))
                        : chat
                    ))
            };
        case SEARCH_USER:
            return {
                ...state,
                chatSearch: action.searchTerm
            }
        default:
            return state;
    }
};