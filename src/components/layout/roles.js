/// icons

const RegisterRole = () => {
    return [{
            pathname: "/RegisteredPeople",
            string: "كشف الافراد",
        },
        {
            pathname: "/adminstration",
            string: "تسجيل تطعيم",
        },
    ];
};

const AdminRole = () => {
    return [{
            pathname: "/register",
            string: "تسجيل فرد",
        },
        {
            pathname: "/RegisteredPeople",
            string: "كشف الافراد",
        },
        {
            pathname: "/adminstration",
            string: "تسجيل تطعيم",
        },
        {
            pathname: "/after_adminstration",
            string: "بيان متلقي التطعيم",
        },
        {
            pathname: "/after_vaccines",
            string: " توقيتات استحقاق التطعيم",
        },
        {
            pathname: "/reports",
            string: "التقارير",
        },
        {
            pathname: "/inquire",
            string: "استعلام",
        },
    ];
};



export { RegisterRole, AdminRole };