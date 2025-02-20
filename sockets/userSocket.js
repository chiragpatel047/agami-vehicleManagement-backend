const { io } = require("../config/server");

module.exports = () => {

  const userNamespace = io.of("/users");

  userNamespace.on("connection", (socket) => {
    
    const userId = socket.handshake.query.userId;

    console.log("User connected:" + userId);
    socket.join(userId); 

    socket.on("user-notification", (message) => {
      console.log("message : "+ message);
      userNamespace.to(userId).emit("user-notification", ` ${message}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:" + userId);
    });
  });
};
