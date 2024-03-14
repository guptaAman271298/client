import * as Yup from 'yup';

// Yup form validation
const formValidation = Yup.object({
    name: Yup.string()
    .trim('The contact name cannot include leading and trailing spaces')
    .strict(true)
    .min(2, 'The contact name needs to be at least 2 char')
    .max(25, 'The contact name cannot exceed 25 char')
    .required('The contact Name is required'),
    email: Yup.string().email().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required("Please enter valid email ID"),
    isActive: Yup.boolean()
})

export default formValidation