import app from "./app"
import { connectToDatabase } from "./db";

async function main(){
  await connectToDatabase()
  app.listen(8080,() => console.log(`App listening on: ${8080}`));
}
main();
