const axios = require("axios");
const { faker } = require("@faker-js/faker");
const { country_list, industry_list } = require("./constants.ts");

interface Country {
  name: string;
  code: string;
}

const num_of_users = 100;
const num_of_companies = 50;
const num_of_jobs = 100;
const num_of_posts = 500;

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

(async () => {
  const usersReq = users.map(async (user) => {
    return await axios.post("http://localhost:3000/user", user);
  });
  await Promise.all(usersReq);
  const industries = industry_list;
  const industriesReq = industries.map(async (industry: string) => {
    return await axios.post("http://localhost:3000/industry", {
      name: industry,
    });
  });
  await Promise.all(industriesReq);

  const companiesReq = companies.map(async (company) => {
    return await axios.post("http://localhost:3000/company", company);
  });

  await Promise.all(companiesReq);

  const companyCount = async () => {
    return await axios.get("http://localhost:3000/company/count");
  };

  const userCount = async () => {
    return await axios.get("http://localhost:3000/user/count");
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

  const jobsReq = async (num: Number) => {
    const allRes = Array(num)
      .fill(0)
      .map(async () => {
        const res = await axios.post(
          "http://localhost:3000/job",
          await genRandomJob(),
        );
        return res;
      });

    return await Promise.all(allRes);
  };

  await jobsReq(num_of_jobs);

  const getRandomPost = async () => {
    const user_count = await userCount();
    const company_count = await companyCount();

    return {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      authorId: Math.ceil(Math.random() * user_count.data),
      companyId: Math.ceil(Math.random() * company_count.data),
    };
  };
  const postsReq = async (num: Number) => {
    const allRes = Array(num)
      .fill(0)
      .map(async () => {
        const res = await axios.post(
          "http://localhost:3000/post",
          await getRandomPost(),
        );
        return res;
      });

    return await Promise.all(allRes);
  };

  await postsReq(num_of_posts);
})();
