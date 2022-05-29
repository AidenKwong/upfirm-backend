const axios = require("axios");
const { faker } = require("@faker-js/faker");
const { country_list, industry_list } = require("./constants.ts");

interface Country {
  name: string;
  code: string;
}

const num_of_users = 100;
const num_of_companies = 100;
const num_of_jobs = 100;

const country_name_list = country_list.map((country: Country) => country.name);

const genders = ["male", "female"];

const randomPicker = (list: Array<any>) =>
  list[Math.floor(Math.random() * list.length)];

const genRandomUser = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    age: Math.ceil(Math.random() * 100),
    gender: randomPicker(genders),
    country: randomPicker(country_name_list),
  };
};

const genRandomCompany = () => {
  return {
    name: faker.company.companyName(),
    country: randomPicker(country_name_list),
    city: faker.address.city(),
    industryId: Math.ceil(Math.random() * industry_list.length),
    description: faker.lorem.paragraph(),
    websiteUrl: faker.internet.url(),
  };
};

const createUsers = (num: Number) => {
  return Array.from(new Array(num), genRandomUser);
};

const createCompanies = (num: Number) => {
  return Array.from(new Array(num), genRandomCompany);
};

const users = createUsers(num_of_users);
const companies = createCompanies(num_of_companies);

const usersReq = users.map(async (user) => {
  try {
    return await axios.post("http://localhost:3000/user", user);
  } catch (error) {}
});

const industries = industry_list;
const industriesReq = industries.map(async (industry: string) => {
  try {
    return await axios.post("http://localhost:3000/industry", {
      name: industry,
    });
  } catch (error) {}
});

const companiesReq = companies.map(async (company) => {
  try {
    return await axios.post("http://localhost:3000/company", company);
  } catch (error) {}
});

const companyCount = async () => {
  try {
    return await axios.get("http://localhost:3000/company/count");
  } catch (error) {}
};

const userCount = async () => {
  try {
    return await axios.get("http://localhost:3000/user/count");
  } catch (error) {}
};

const genRandomJob = async () => {
  const company_count = await companyCount();
  const user_count = await userCount();
  return {
    title: faker.name.jobTitle(),
    description: faker.lorem.paragraph(),
    companyId: Math.ceil(Math.random() * company_count.data),
    country: randomPicker(country_name_list),
    salary: Math.ceil(Math.random() * 100000),
    startDate: faker.date.past().toISOString(),
    endDate: faker.date.future().toISOString(),
    userId: Math.ceil(Math.random() * user_count.data),
  };
};

const jobsReq = (num: Number) => {
  const allRes = Array(num)
    .fill(0)
    .map(async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/job",
          await genRandomJob(),
        );
        return res;
      } catch (error) {}
    });

  return Promise.all(allRes);
};

(async () => {
  await Promise.all(usersReq);
  await Promise.all(industriesReq);
  await Promise.all(companiesReq);
  await jobsReq(num_of_jobs);
})();
