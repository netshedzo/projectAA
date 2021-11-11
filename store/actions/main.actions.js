export const ADD_NAME = "[MAIN APP] ADD NAME";

export const addName = (name) => {
return {
    type: ADD_NAME,
    payload: name,
}
};