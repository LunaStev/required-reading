import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id;

    if (!id || typeof id !== 'string') {
        return res.status(400).send('잘못된 ID입니다.');
    }

    try {
        const client = await clientPromise;
        const db = client.db();

        await db.collection('books').deleteOne({ _id: new ObjectId(id) });

        res.redirect(302, '/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('삭제 중 오류 발생');
    }
}
