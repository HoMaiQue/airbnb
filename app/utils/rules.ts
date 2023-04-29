import * as yup from "yup";
export const schema = yup.object({
    email: yup.string().required(""),
    name: yup.string().required(""),
    password: yup.string().required(""),
    
})
export type Schema = yup.InferType<typeof schema>