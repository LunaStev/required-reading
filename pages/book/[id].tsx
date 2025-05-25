import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';
import Layout from '../../components/Layout';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { params } = context;
    const client = await clientPromise;
    const db = client.db();

    const book = await db.collection('books').findOne({
        _id: new ObjectId(params?.id as string),
    });

    if (!book) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            book: {
                id: book._id.toString(),
                ...book,
            },
        },
    };
}

type BookDetailProps = {
    book: {
        id: string;
        title: string;
        author: string;
        description?: string;
        age: string;
        year: number;
        pages: number;
        difficulty: number;
        keywords: string[];
        highlight: string;
        lang_original: string;
        recommended_by?: string;
        link_kr: string;
        link_original: string;
    };
};

export default function BookDetail({ book }: BookDetailProps) {
    return (
        <Layout selectedAge={book.age}>
            <Head>
                <title>{book.title} - 필독서 정보</title>
                <meta name="description" content={`${book.title} - ${book.description || '추천 도서'}`} />
            </Head>
            <div className="book-detail-container">
                <h1>{book.title}</h1>
                <h2>{book.author}</h2>
                <div className="info">
                    <p><strong>추천 연령:</strong> {book.age}</p>
                    <p><strong>출판년도:</strong> {book.year < 0 ? `기원전 ${Math.abs(book.year)}년` : `${book.year}년`}</p>
                    <p><strong>페이지 수:</strong> {book.pages}</p>
                    <p><strong>난이도:</strong> {'⭐'.repeat(book.difficulty)}</p>
                    <p><strong>키워드:</strong> {book.keywords.join(', ')}</p>
                    <p className="highlight">“{book.highlight}”</p>
                    <p><strong>원서 언어:</strong> {book.lang_original}</p>
                    <p><strong>추천 출처:</strong> {book.recommended_by || '직접 큐레이션'}</p>
                    <p style={{ marginTop: '16px' }}>
                        📘 <a href={book.link_kr} target="_blank">한국어 링크</a>
                        {book.lang_original !== '한국어' ? (
                            <>
                                {' '}| 🌐 <a href={book.link_original} target="_blank">원서 링크</a>
                            </>
                        ) : (
                            <>
                                {' '}| 🌐 <span style={{ color: '#888' }}>원서: 한국어</span>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </Layout>
    );
}