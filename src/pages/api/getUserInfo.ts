import { MongoClient, ObjectId } from 'mongodb';

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
    if (req.method === 'GET') {

        const { id,userId } = req.query;
        const client = new MongoClient(uri, options);

        // if (!id) {
        //   return res.status(400).json({ message: 'Missing ID parameter' });
        // }

        try {
            await client.connect();
            const database = client.db(databaseName);
            const collection = database.collection(collectionName as any);
            const user = await collection
                .findOne({ _id: new ObjectId(id) });
            res.status(200).json(user);
        } catch (error) {
            console.error('Error retrieving data from MongoDB:', error);
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
