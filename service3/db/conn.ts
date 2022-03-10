import { Db, MongoClient } from "mongodb";
const connectionString = process.env.DB_CONNECTION as string;
const client = new MongoClient(connectionString) as MongoClient;

let dbConnection: any;

export default {
  connectToServer: function (callback: Function) {
    client.connect(function (err: any, db: MongoClient | undefined) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("test");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function (): Db {
    return dbConnection;
  },
};