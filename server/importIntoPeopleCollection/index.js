import { Person, validatePerson } from "../models/person";

export const importIntoPeopleCollection = async (persons) => {
  for (let p of persons) {
    const { error } = validatePerson(p);

    if (error) {
      console.log(p);
      throw new Error(error.details[0].message);
    }
    let foundPersonbyMilId;
    let foundPersonbyNationalId;

    if (p.milId) foundPersonbyMilId = await Person.findOne({ milId: p.milId });

    if (p.nationalId)
      foundPersonbyNationalId = await Person.findOne({
        nationalId: p.nationalId,
      });

    // console.log(foundPersonbyMilId, foundPersonbyNationalId);
    if (foundPersonbyMilId || foundPersonbyNationalId) {
      // throw new Error("هذا الفرد مسجل بالفعل!");
    }
    const person = new Person(p);
    await person.save();
  }
};
