import TextInput from "./TextInput";

export {TextInput}


const Form = ({schema})=>{
    return (
        <>
            <TextInput schema={schema.email}/>
            <TextInput schema={schema.password}/>
        </>
    )
}

export default Form;