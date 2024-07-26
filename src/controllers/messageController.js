const messageService = require('../services/messageService');

exports.createMessage = async (req, res, next) => {
  try {
    const { userId, roomId, content } = req.body;
    const message = await messageService.createMessage(userId, roomId, content);
    console.log(message,'message')
    // Emit real-time update to the room
    req.io.to(roomId).emit('newMessage', message);
    
    res.status(201).json(message);
  } catch (error) {
    console.log(error)
    next(error);
  }
};
