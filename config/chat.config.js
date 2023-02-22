const io = require('socket.io');

const chatConfig = {
    socketIo: async (from,to,user_id,db) => {
                // Socket.io events
        io.on('connection', (socket) => {
            console.log(`Socket connected: ${socket.user_id}`);
        
            // Listen for chat events from the client
            socket.on('chat', (data) => {
            console.log(`Chat event received: ${data}`);
            const message = new db({
                from: data.from,
                to: data.to,
                content: data.content,
                timestamp: new Date()
            });
            message.save().then(() => {
                console.log(`Message saved: ${message}`);
                io.to(data.to).emit('chat', message);
            }).catch((err) => {
                console.error(err);
            });
            });
        
            // Disconnect event
            socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.user_id}`);
            });
        });
  
 }
}

module.exports = chatConfig;