const mongoose = require("mongoose");

class Connection {
  constructor() {
    this.dataBaseConnectionMongoDB();
  }

  dataBaseConnectionMongoDB() {
    this.mongoDBConnection = mongoose
      .connect(
        "mongodb+srv://root:DmasecRirkgG9hIP@cluster0.ids8s.mongodb.net/node-mongo-task?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        }
      )
      .then(() => {
        console.log("conectado com sucesso no MongoDB !");
      })
      .catch((err) => {
        console.log("Erro conexão MongoDB: " + err.message);
      });
  }
}

module.exports = new Connection();
