export const reducer = (state, action) => {

    if (action.type === "ATP_CALCULATOR_DATA") {

        return {
            ...state,
            AtpCalculatorData: action.payload
        }
    }
    if (action.type === "SYMBOLLIST_DATA") {

        return {
            ...state,
            symbolList: action.payload
        }
    }
    if (action.type === "Order_Type_DATA") {

        return {
            ...state,
            OrderTypeData: action.payload
        }
    }
    if (action.type === "MULTISCRIPT_GET_ToKENS") {

        return {
            ...state,
            item: action.payload
        }
    }
    if (action.type === "MULTISCRIPT_DATA") {

        return {
            ...state,
            multiScriptData: action.payload
        }
    }
    if (action.type === "OPTION_DATA") {

        return {
            ...state,
            optionData: action.payload
        }
    }
    return state
}