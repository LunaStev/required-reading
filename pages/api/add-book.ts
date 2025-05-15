import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end('허용되지 않은 메서드입니다.');
    }

    const {
        title,
        author,
        age,
        description,
        year,
        pages,
        difficulty,
        keywords,
        highlight,
        lang_original,
        link_kr,
        link_original,
        recommended_by
    } = req.body;

    // 키워드 쉼표로 나눈 배열 처리
    const keywordsArray = keywords
        ? keywords.split(',').map((k: string) => k.trim()).filter(Boolean)
        : [];

    const book = {
        title,
        author,
        age,
        description,
        year: Number(year),
        pages: Number(pages),
        difficulty: Number(difficulty),
        keywords: keywordsArray,
        highlight,
        lang_original,
        link_kr,
        link_original,
        recommended_by
    };

    try {
        const client = await clientPromise;
        const db = client.db();

        await db.collection('books').insertOne(book);

        res.redirect(302, '/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('책 추가 중 오류가 발생했습니다.');
    }
}
