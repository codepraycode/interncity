
export const userTypes = {
    STUDENTS:'student',
    ORGANIZATION:'organization',
    SUPERVISOR:'supervisor',
}

export const setUpWithPreviousValue = (schema, data=null, seed={})=>{

    let prev = {
        ...seed,
    }

    if (!data) return prev;

    Object.keys(schema).forEach((fieldName)=>{
        // if key not in prevProfile, continue;
        console.log(fieldName)
        if (!(['city', 'country', 'state'].includes(fieldName)) || !data[fieldName]) return

        let value = data[fieldName];

        if(['city', 'country', 'state'].includes(fieldName)){
            console.log("includes")
            // const {city, country, state} = value

            prev[fieldName] = value[fieldName];
            // prev.country = country;
            // prev.state = state;
        }
        else{
            prev[fieldName] = data[fieldName]; // set value.
        }
    });

    // console.log(schema);
    // console.log(prev);

    return prev;

}

export const getDateLists = (start, end=null)=>{

    const listDate = [];
    const startDate = start; //'2017-02-01';
    const endDate = end || new Date().toISOString();//'2017-02-10';
    const dateMove = new Date(startDate);
    let strDate = startDate;

    while (strDate < endDate) {
        strDate = dateMove.toISOString().slice(0, 10);
        listDate.push(strDate);
        dateMove.setDate(dateMove.getDate() + 1);
    };

    return listDate;

}

export function weeksBetween(date) {
    const d1 = new Date(date);
    const d2 = new Date();

    return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}

export const getDayVerbose = (dayNumber)=>{

    switch (dayNumber){
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
    }

}

export const JSONLog = (obj)=> console.log(JSON.stringify(obj, null, 4))

const FIREBASE_ERRORS = {
    "auth/email-already-in-use":"Email already exist",
    "auth/network-request-failed":"Network error, check your internet connection and try again",
    "auth/email-already-in-use":"Account with credentials already exist",
    "auth/user-not-found":"Invalid email/password",
    "auth/wrong-password":"Invalid email/password"
}

export const HandleFirebaseError = (errObject) =>{
    // Returns a useable version of the error
    // which will contain a message
    // console.log(errObject);
    const code = errObject.code;
    const _default = 'Cannot sign into account, check input and try again.';

    console.log("Error code:", code);
    return (
        {
            code,
            message: FIREBASE_ERRORS[code] || _default
        }
    )
}

export const HandlerJoiError = (joiErrorObject, generalMessage=null) =>{
    // JSONLog(joiErrorObject);
    const {details} = joiErrorObject;

    // Details is an array
    const errorObj = {
        message: generalMessage,
    };

    details.forEach((eachError)=>{
        const {message, context} = eachError;

        let label = context.key;

        if(!label) label = context.peer;

        errorObj[label] = message;
    })

    throw (errorObj);
}