export const ADD_SCORE = "[MAIN APP] ADD SCORE";

export const addScore = (score) => {
return {
    type: ADD_SCORE,
    payload: score,
}
};