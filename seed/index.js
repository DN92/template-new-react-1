const db = require ('../server/db')
const models = require('../server/db/models')

/**
 *  seed - this function clears the database, updates tables to
 *    match our models, and populates the database
 */

const {} = models
const modelsArray = [ ... Object.values(models) ]

 async function seed() {
  console.log('drop all tables')
  await Promise.all(modelsArray.map(model => (model.drop({force: true}))))
  console.log('sync db')
  await db.sync({force: true})  //  clears the db and matches models to tables
  console.log('begin seed')
  await Promise.all([
    //  import and then ..
    //  seed dummy / actual data here
  ])
}

// runSeed isolates error handling and exit trapping.

async function runSeed(seedFunc) {
  try {
    console.log("Running database seed function")
    await seedFunc()
    console.log("Seed was successful")
  } catch (err) {
    console.log("Database seed failed")
    console.error(err)
    console.log(err.stack)
  } finally {
    console.log("Closing db connection")
    await db.close()
    console.log("DB connection closed")
  }
}

// execute our runSeed IF we ran this directly from Node ('node seed')

if (module === require.main) {
  runSeed(seed);
}
