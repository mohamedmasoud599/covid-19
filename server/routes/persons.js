import { Person, validatePerson } from "../models/person";
import fs from "fs";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validatePerson(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  let foundPersonbyMilId;
  let foundPersonbyNationalId;

  if (req.body.milId)
    foundPersonbyMilId = await Person.findOne({ milId: req.body.milId });

  if (req.body.nationalId)
    foundPersonbyNationalId = await Person.findOne({
      nationalId: req.body.nationalId,
    });

  console.log(foundPersonbyMilId, foundPersonbyNationalId);
  if (foundPersonbyMilId || foundPersonbyNationalId)
    return res.status(400).send("هذا الفرد مسجل بالفعل!");
  const person = new Person(req.body);
  await person.save();
  res.send("Data is saved ");
});

router.get("/", async (req, res) => {
  res.send(await Person.find({}));
});

router.get("/filterPerson", async (req, res) => {
  let { number } = req.query;
  let foundPerson =
    (await Person.findOne({ milId: number })) ||
    (await Person.findOne({ nationalId: number }));
  if (foundPerson) return res.send(foundPerson);
  else return res.status(400).send("This person is not registerd!");
});

router.post("/:id/covidVaccine", async (req, res) => {
  let person = await Person.findById(req.params.id);
  console.log(person);
  if (person.covidVaccine.registerSerialNumber) {
    res.status(400).send("يوجد رقم تسجيل لهذا الشخص يرجى حذفه اولا");
  } else {
    person.covidVaccine = req.body;
    await person.save();
    res.send("Data is saved ");
  }
});

router.post("/:id/covidVaccine/doses", async (req, res) => {
  const { id } = req.params;
  let person = await Person.findById(req.params.id);
  if (person.covidVaccine) {
    let latestDoseIndex = person.covidVaccine.dosesCount;
    let dose = req.body;
    let { indexOfDose } = req.body;
    if (indexOfDose === latestDoseIndex + 1) {
      const dir = `./data/certificateImages/${id}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const baseUrl =
        req.protocol + "://" + req.get("host") + "/certificateImages";
      fs.writeFileSync(
        `${dir}/${indexOfDose}.jpeg`,
        Buffer.from(
          req.body.certificate.replace("data:image/jpeg;base64,", ""),
          "base64"
        )
      );
      const path = `${baseUrl}/${id}/${indexOfDose}.jpeg`;
      dose.certificate = path;
      person.covidVaccine.doses.push(dose);
      if (dose.type === "جونسون" && dose.indexOfDose === 1) {
        person.covidVaccine.doses.push(dose);
        person.covidVaccine.dosesCount++;
      }
      person.covidVaccine.dosesCount++;
      console.log(person);
      person.save();
      res.send("Data is saved ");
    } else res.status(400).send("هذه الجرعة مسجلة بالفعل او يوجد جرعة مفقودة");
  } else {
    console.log(person);
    res
      .status(400)
      .send("لا يوجد رقم تسجيل لاضافة الجرعة، قم باضافة رقم تسجل اللقاح اولا");
  }
});

router.get("/peopleFilteration", async (req, res) => {
  // let {  type, VaccineType } = req.query;
  let {
    name,
    corp,
    nationalId,
    milId,
    persontype,
    VaccineType,
    indexOfDose,
    rank,
    registerSerialNumber,
  } = req.query;

  let query = { ...req.query };

  let corpSearch = "";
  let milIdSearch = "";
  let nationalIdSearch = "";
  let nameSearch = "";
  let persontypeSearch = "";
  let VaccineTypeSearch = "";
  let rankSearch = "";
  let registerSerialNumberSearch = "";
  let indexOfDosesSearch = "";

  if (name) nameSearch = `"name" : /${name}/i ,`;
  delete query.name;

  if (nationalId) nationalIdSearch = `"nationalId": ${nationalId},`;
  delete query.nationalId;

  if (milId) milIdSearch = `"milId": ${milId},`;
  delete query.milId;

  if (corp) corpSearch = `"corp": ${corp},`;
  delete query.corp;

  if (persontype) persontypeSearch = `"type": ${persontype},`;
  delete query.persontype;

  if (VaccineType)
    VaccineTypeSearch = `"covidVaccine.doses.type": ${VaccineType},`;
  delete query.VaccineType;

  if (indexOfDose)
    if (indexOfDose === "0") {
      indexOfDosesSearch = `"covidVaccine.dosesCount": {$eq:${indexOfDose}},`;
    } else {
      indexOfDosesSearch = `"covidVaccine.dosesCount": {$gte:${indexOfDose}},`;
    }
  delete query.indexOfDose;

  if (rank) rankSearch = `"rank": ${rank},`;
  delete query.rank;

  if (registerSerialNumber)
    registerSerialNumberSearch = `"covidVaccine.registerSerialNumber": ${registerSerialNumber}`;
  delete query.registerSerialNumber;

  console.log(
    "query:",
    `Person.find({  ${nameSearch} ${corpSearch} ${nationalIdSearch} ${milIdSearch} ${persontypeSearch} ${VaccineTypeSearch} ${rankSearch} ${indexOfDosesSearch} ${registerSerialNumberSearch}})`
  );
  let result = await eval(
    `Person.find({  ${nameSearch} ${corpSearch} ${nationalIdSearch} ${milIdSearch} ${persontypeSearch} ${VaccineTypeSearch} ${rankSearch} ${indexOfDosesSearch} ${registerSerialNumberSearch}})`
  );

  res.send(result);
});
router.get("/:nationalId", async (req, res) => {
  res.send((await Person.find({ nationalId: req.params.nationalId }))[0]);
});

router.delete("/:id", async (req, res) => {
  res.send(await Person.findByIdAndRemove(req.params.id));
});

export default router;
