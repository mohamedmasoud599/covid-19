import * as yup from "yup";

const initialValues = {
    name: "",
    milId: "",
    tagnidDate: "",
    rank: "",
    corp: "",
    category: "",
    type: "",
    phoneNumber: "",
    joinDate: "",
    leavingDate: "",
};


const initialValuesGuy = {
    name: "",
    milId: "",
    // type: "",
    phoneNumber: "",
    address: "",
};

const initialValuesOfficers = {
    name: "",
    milId: "",
    type: "",
    phoneNumber: "",
    rank: "",
};

const validationSchema = yup.object({
    name: yup.string("ادخل الاسم رباعي").required("مطلوب"),
    milId: yup
        .string("ادخل سنة الميلاد")
        .min(13, "الرقم العسكرى يجب ان يتكون من 13   رقم")
        .required("مطلوب"),
    rank: yup.string("ادخل الرتبه").required("مطلوب"), //
    corp: yup.string("ادخل السلاح").required("مطلوب"),
    category: yup.string("ادخل الفئه").required("مطلوب"),
    tagnidDate: yup.string("ادخل تاريخ التجنيد").required("مطلوب"),
    joinDate: yup.string("ادخل تاريخ الضم ").required("مطلوب"),
    leavingDate: yup.string("ادخل  تاريخ التسريح").required("مطلوب"),
    phoneNumber: yup.number("ادخل رقم التلفون").required("مطلوب"),
    // type: yup.string("ادخل  النوع ").required("مطلوب"),
});

const validationSchemaGuy = yup.object({
    name: yup.string("ادخل الاسم رباعي").required("مطلوب"),
    milId: yup
        .string("ادخل سنة الميلاد")
        .min(14, "الرقم العسكرى يجب ان يتكون من 14 رقم")
        .required("مطلوب"),

    phoneNumber: yup.string("ادخل رقم التلفون").required("مطلوب"),
    type: yup.string("ادخل  النوع ").required("مطلوب"),
});

const validationSchemaOfficers = yup.object({
    name: yup.string("ادخل الاسم رباعي").required("مطلوب"),
    milId: yup
        .string("ادخل سنة الميلاد")
        .min(14, "الرقم العسكرى يجب ان يتكون من 14 رقم")
        .required("مطلوب"),
    rank: yup.string("ادخل الرتبه").required("مطلوب"),
    phoneNumber: yup.string("ادخل رقم التلفون").required("مطلوب"),
    type: yup.string("ادخل  النوع ").required("مطلوب"),
});

export {
    validationSchema,
    initialValues,
    initialValuesGuy,
    initialValuesOfficers,
    validationSchemaGuy,
    validationSchemaOfficers,
};