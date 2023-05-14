import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import {CallAPI, GETAPI, Toast, API_URL, TextInput} from '../../common'
import { useState, useEffect } from "react";

export const Admin =() => {
    const { register, handleSubmit } = useForm();
    const [catagories, setCatagories] = useState();
    const nav = useNavigate()
    useEffect(() => {
        const cat = GETAPI(`${API_URL}admin/catagories`).then(data => setCatagories(data))
        
        }, [])

    const onSubmit = async(data) => {
        const res = await CallAPI(`${API_URL}admin/catagory`, "POST", data)

        if(res.message){
        toast.success("Created!", Toast)
        nav('/admin')
        }
    }
        
    return (

        <>
       
        <form onSubmit={handleSubmit(onSubmit)}>
           <TextInput
            register={register}
            name="catagory"
            label="catagory"
            required
          />
          <TextInput register={register} name='description' label='description' required />
          <TextInput register={register} name='urlName' label='url NAME' require />
            <button type='submit'>Submit</button>
        </form>


{catagories ? catagories.map((cat) => {
    return(
        <h1>{cat.name}</h1>
    )
}) : ''}
</>
    )
}