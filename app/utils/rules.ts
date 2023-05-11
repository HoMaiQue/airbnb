import * as yup from "yup";
export const schema = yup.object({
    email: yup.string().required(""),
    name: yup.string().required(""),
    password: yup.string().required(""),
    title: yup.string(),
    description: yup.string(),
    
})
export type Schema = yup.InferType<typeof schema>