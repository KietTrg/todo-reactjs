function logger(reducer){
     return(preState, action) =>{
    //     console.group(action.type)
    //     console.log('preState',preState);
    //     console.log('action',action);
        const nextState = reducer(preState, action)
        // console.log('nextState',nextState);
        // console.groupEnd()
        return nextState
    }
}
export default logger