import { MongoClient } from 'mongodb';


if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DATABASE
const collectionName = process.env.MONGODB_COLLECTION
const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

export default async function handler(req: any, res: any) {

    if (req.method === 'POST') {
        const {step, data} = req.body;

        const client = new MongoClient(uri, options);
        try {
            await client.connect();

            const database = client.db(databaseName);
            const collection = database.collection(collectionName as any);
            if (!data) {
                // Save profile data for the specific step
                await collection.insertOne({ userId: '999' }, {[`step${step}`]: data });
            } else {
                await collection.updateOne(
                    { userId: '999' }, // Replace with user ID or unique identifier
                    { $set: { [`step${step}`]: data } },
                    { upsert: true }
                );
            }
            // res.json(myPost.ops[0]);
            // const savedData = await collection.find({})
            // res.status(201).json(savedData)
            res.status(200).json({ message: 'data data saved successfully' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}



