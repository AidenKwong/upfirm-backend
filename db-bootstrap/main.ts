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
const num_of_comments = 1000;

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
  console.log("Creating users...");
  const usersReq = users.map(async (user) => {
    return await axios.post("http://localhost:3000/user", user);
  });
  await Promise.all(usersReq);

  console.log("Createing industries...");
  const industries = industry_list;
  const industriesReq = industries.map(async (industry: string) => {
    return await axios.post("http://localhost:3000/industry", {
      name: industry,
    });
  });
  await Promise.all(industriesReq);

  console.log("Creating companies...");
  const companiesReq = companies.map(async (company) => {
    return await axios.post("http://localhost:3000/company", company);
  });

  await Promise.all(companiesReq);

  console.log("Creating jobs...");
  const companyCount = async () => {
    const { data } = await axios.get("http://localhost:3000/company/count");
    return data;
  };

  const userCount = async () => {
    const { data } = await axios.get("http://localhost:3000/user/count");
    return data;
  };

  const genRandomJob = async () => {
    const company_count = await companyCount();
    const user_count = await userCount();
    return {
      title: faker.name.jobTitle(),
      description: faker.lorem.paragraph(),
      companyId: Math.ceil(Math.random() * company_count),
      country: randomPicker(country_name_list),
      salary: Math.ceil(Math.random() * 100000),
      startDate: faker.date.past().toISOString(),
      endDate: faker.date.future().toISOString(),
      userId: Math.ceil(Math.random() * user_count),
    };
  };

  await Promise.all(
    Array(num_of_jobs)
      .fill(0)
      .map(async () => {
        const res = await axios.post(
          "http://localhost:3000/job",
          await genRandomJob(),
        );
        return res;
      }),
  );

  console.log("Creating posts...");
  const genRandomPost = async () => {
    const user_count = await userCount();
    const company_count = await companyCount();

    return {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      authorId: Math.ceil(Math.random() * user_count),
      companyId: Math.ceil(Math.random() * company_count),
    };
  };

  await Promise.all(
    Array(num_of_posts)
      .fill(0)
      .map(async () => {
        const res = await axios.post(
          "http://localhost:3000/post",
          await genRandomPost(),
        );
        return res;
      }),
  );

  console.log("Creating comments...");
  const postCount = async () => {
    const { data } = await axios.get("http://localhost:3000/post/count");
    return data;
  };

  const genRandomComment = async () => {
    const user_count = await userCount();
    const post_count = await postCount();
    return {
      content: faker.lorem.paragraph(),
      authorId: Math.ceil(Math.random() * user_count),
      postId: Math.ceil(Math.random() * post_count),
    };
  };

  await Promise.all(
    Array(num_of_comments)
      .fill(0)
      .map(async () => {
        const comment = await genRandomComment();
        return await axios.post("http://localhost:3000/comment", comment);
      }),
  );
})();
