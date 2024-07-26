const prisma = require('../config/db');

exports.createMessage = async (userId, roomId, content) => {
  const message = await prisma.message.create({
    data: {
      userId,
      roomId,
      content,
    },
  });
  console.log(message,'messages')
  return message;
};
