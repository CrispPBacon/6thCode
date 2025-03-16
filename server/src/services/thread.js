import Topic from "../models/topic.js";

async function createNewTopic({ title, content, createdBy }) {
  const data = new Topic({ title, content, createdBy });
  // console.log(data);
  return await data.save();
}

async function getAllTopic() {
  const data = await Topic.find({});
  // console.log(data);
  return data;
}

export default { createNewTopic, getAllTopic };
