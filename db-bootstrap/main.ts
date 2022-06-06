const axios = require("axios");
const { faker } = require("@faker-js/faker");
const { country_list, industry_list } = require("./constants.ts");
const fs = require("fs");
require("dotenv").config();
const axiosRetry = require("axios-retry");

axiosRetry(axios, { retries: 3 });

interface Country {
  name: string;
  code: string;
}

const SERVER_URL = `http://localhost:${process.env.PORT}`;
const num_of_users = 1000;
const num_of_companies = 500;
const num_of_jobs = 1000;
const num_of_posts = 5000;
const num_of_comments = 10000;

const country_name_list = country_list.map((country: Country) => country.name);

const genders = ["male", "female"];

const randomPicker = (list: Array<any>) =>
  list[Math.floor(Math.random() * list.length)];

const genRandomUser = () => {
  return {
    username: faker.name.firstName() + faker.name.lastName(),
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

const users = createUsers(num_of_users);

const file = fs.createWriteStream("users.js");
file.write("[");
users.forEach(function (v) {
  file.write(JSON.stringify(v) + "," + "\n");
});
file.write("]");
file.end();

(async () => {
  for await (const user of users) {
    const { data } = await Promise.resolve(
      await axios.post(`${SERVER_URL}/user`, user),
    );
    process.stdout.write(`Created user with id ${data.id}\r`);
  }

  console.log("\n");

  const industries = industry_list;
  for await (const industry of industries) {
    const { data } = await Promise.resolve(
      await axios.post(`${SERVER_URL}/industry`, {
        name: industry,
      }),
    );
    process.stdout.write(`Created industry with id ${data.id}\r`);
  }

  console.log("\n");

  const companies = Array.from(new Array(num_of_companies), genRandomCompany);

  for await (const company of companies) {
    const { data } = await Promise.resolve(
      await axios.post(`${SERVER_URL}/company`, company),
    );
    process.stdout.write(`Created company with id ${data.id}\r`);
  }

  console.log("\n");

  const genRandomJob = async () => {
    return {
      title: faker.name.jobTitle(),
      description: faker.lorem.paragraph(),
      companyId: Math.ceil(Math.random() * num_of_companies),
      salary: Math.ceil(Math.random() * 100000),
      startDate: faker.date.past().toISOString(),
      endDate: faker.date.future().toISOString(),
      rating: Math.ceil(Math.random() * 5),
      userId: Math.ceil(Math.random() * num_of_users),
    };
  };

  const jobs = Array.from(new Array(num_of_jobs), genRandomJob);

  for await (const job of jobs) {
    const { data } = await Promise.resolve(
      await axios.post(`${SERVER_URL}/job`, job),
    );
    process.stdout.write(`Created job with id ${data.id}\r`);
  }

  console.log("\n");

  const genRandomPost = async () => {
    return {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      authorId: Math.ceil(Math.random() * num_of_users),
      companyId: Math.ceil(Math.random() * num_of_companies),
    };
  };

  const posts = Array.from(new Array(num_of_posts), genRandomPost);

  for await (const post of posts) {
    const { data } = await Promise.resolve(
      await axios.post(`${SERVER_URL}/post`, post),
    );
    process.stdout.write(`Created post with id ${data.id}\r`);
  }

  console.log("\n");

  const genRandomComment = async () => {
    return {
      content: faker.lorem.paragraph(),
      authorId: Math.ceil(Math.random() * num_of_users),
      postId: Math.ceil(Math.random() * num_of_posts),
    };
  };

  const comments = Array.from(new Array(num_of_comments), genRandomComment);

  for await (const comment of comments) {
    const { data } = await Promise.resolve(
      await axios.post(`${SERVER_URL}/comment`, comment),
    );
    process.stdout.write(`Created comment with id ${data.id}\r`);
  }

  console.log("\n");
})();
