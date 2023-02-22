import * as yup from 'yup';

export const lessonschema = yup.object({
    title: yup.string().required('required'),
    subject: yup.string().required('required'),
    content: yup.mixed().required(),
});
