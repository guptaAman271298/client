import * as Yup from 'yup';

// Yup form validation
export const FormValidation = Yup.object({
    name: Yup.string().min(3).max(25).required("Please enter valid name"),
    email: Yup.string().email().required("Please enter valid email ID"),
    isActive: Yup.boolean()
})