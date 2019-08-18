//http://stackoverflow.com/questions/5836833/create-a-array-with-random-values-in-javascript
function shuffle(array) {
    let tmp,
        current,
        top = array.length;
    if (top)
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
    return array;
}

export function randomiseItems(array) {
    //Optimised version
    return shuffle(Array.from(array.keys())).map(item => array[item]);
}
