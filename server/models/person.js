import mongoose from "mongoose";
import Joi from "joi";

const doseSchema = new mongoose.Schema({
  type: { type: String, required: true },
  indexOfDose: { type: Number, required: true },
  isInMilitaryHospital: { type: Boolean, required: true },
  date: { type: Date, default: Date.now() },
  vaccineDate: { type: Date, required: true },
  certificate: { type: String, required: true },
});

const vaccineSchema = new mongoose.Schema({
  registerSerialNumber: { type: String },
  dosesCount: { type: Number, default: 0 },
  doses: [doseSchema],
});
const personSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true, minlength: 3 },
  nationalId: {
    type: String,
    required: true,
    minlength: 14,
    maxlength: 14,
    description: "must be an integer and is required",
  },
  milId: {
    type: String,
    required: false,
    minlength: 13,
    maxlength: 13,
    description: "must be an integer and is required",
  },
  category: { type: String }, // الفئة
  tagnidDate: { type: Date }, // تاريخ التجنيد
  joinDate: { type: Date }, //تاريخ الضم
  leavingDate: { type: Date }, // تاريخ التسريح
  corp: { type: String }, // TODO: validate with the array of corps in meta
  rank: { type: String },
  phoneNumber: { type: String },
  covidVaccine: { type: vaccineSchema, default: { dosesCount: 0 } },
  seniorityNum: { type: String },
  registerDate: { type: Date, default: new Date() },
  address: String,
});

const Person = mongoose.model("person", personSchema);

const doseValidationSchema = Joi.object({
  type: Joi.string().required(),
  indexOfDose: Joi.number().required(),
  isInMilitaryHospital: Joi.boolean().required(),
  date: Joi.date(),
  certificate: Joi.string(),
  vaccineDate: Joi.date().required(),
});

const vaccineValidationSchema = Joi.object({
  registerSerialNumber: Joi.string().required(),
  dosesCount: Joi.number(),
  doses: Joi.array().items(doseValidationSchema),
});

function validatePerson(person) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    seniorityNum: Joi.string(),
    type: Joi.string().required(),
    nationalId: Joi.string().required().min(14).max(14),
    milId: Joi.string().min(13).max(13),
    corp: Joi.string(),
    tagnidDate: Joi.date(),
    joinDate: Joi.date(),
    leavingDate: Joi.date(),
    category: Joi.string(),
    rank: Joi.string(),
    address: Joi.string(),
    phoneNumber: Joi.string(),
    registerDate: Joi.date(),
    covidVaccine: vaccineValidationSchema,
  });

  return schema.validate(person);
}

export { Person, validatePerson, doseValidationSchema };
