import * as Yup from 'yup';

// ✅ Add Stuff schema
export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

// ✅ Edit Stuff schema
export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

// ✅ Add Contact schema
export const AddContactSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  address: Yup.string().required(),
  image: Yup.string().url().required(),
  description: Yup.string().required(),
  owner: Yup.string().required(),
});

// ✅ Edit Contact schema
export const EditContactSchema = Yup.object({
  id: Yup.number().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  address: Yup.string().required(),
  image: Yup.string().url().required(),
  description: Yup.string().required(),
  owner: Yup.string().required(),
});

// ✅ Contact interface with owner field
export interface Contact {
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
  owner: string;
}
