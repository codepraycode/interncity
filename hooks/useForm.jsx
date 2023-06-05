import {useState} from 'react';

/*
    Form hook works by:
    -> receiving a initialValues
    -> an onSubmit function
    -> a validate function
    
    The hook provides a form object with:
    -> onChange - receive element and value according to schema
    -> submit() - to trigger onSubmit
    -> reset() - to clear values and reset them to initial values

    -> value - according to schema
    -> errors - accoring to schema, stores name:error message. 
        This contains a general message in the .message attribute.
        so to use for example: form.errors.<field name>
    -> touched - state to check if the current value is difference from initial value
            so to use for example: form.touched.<field name>
            always a booleans
*/


// Default functions
const onSubmitDefault = (...args)=>{
    console.log("Submitted:",...args)
}

const resetState = () => {
    // Meta is an object of values, touched, errors
    // Values are the data of elements
    // touched are the state of each element data
    // errors are the errors for each elements and the form generally
    //      This could be errors from onSubmit or general validation
    return {
        values: {},
        touched: {},
        errors: {
            _general: '' // general message for form
        }
    }
}


const FormHook = ({
    schema,
    initialValues = {}, // object, can be empty
    onSubmit = onSubmitDefault,
}) => {

    const [meta, setMeta] = useState(() => resetState());

    const onChange = (field, value, validator=null) => {
        if (!schema[field]) return  // if not in schema, return

        // Values are assumed to be correctly validated!

        // If the new value is same as old, no need to update state.
        if (Object.is(meta.values[field], value)) return;

        // Check if the current value is same as the inital value
        const isDiff = Object.is(initialValues[field], value);

        // Update element with value
        setMeta((prevMeta)=>{
            prevMeta.values[field] = value;
            prevMeta.touched[field] = isDiff;

            return {
                ...prevMeta
            }
        })
    }

    const reset = () => resetState();

    return {
        ...meta,

        handleChange: (...args)=>onChange(...args),
        handleSubmit: (...args) => onSubmit(meta.values),
        reset,
    }
}


export default FormHook;