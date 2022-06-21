
export const resolvers = {
  async question() {
    const question = await Question.findOne({});
    return question?.Q;
  },
};

export default resolvers;
