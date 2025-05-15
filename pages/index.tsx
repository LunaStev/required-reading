import clientPromise from '../lib/mongodb';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

export async function getServerSideProps() {
    const client = await clientPromise;
    const db = client.db();
    const books = await db.collection('books').find({}).toArray();

    return {
        props: {
            books: books.map(({ _id, ...rest }) => ({
                id: _id.toString(),
                ...rest,
            })),
        },
    };
}

type Book = {
    id: string;
    title: string;
    author?: string;
    description?: string;
    age: string;
    year?: number;
    pages?: number;
    difficulty?: number;
    keywords?: string[];
    highlight?: string;
    lang_original?: string;
    recommended_by?: string;
    link_kr?: string;
    link_original?: string;
};

type HomeProps = {
    books: Book[];
};

export default function Home({ books }: HomeProps) {
    const router = useRouter();
    const rawAge = router.query.age;
    const queryAge = typeof rawAge === 'string' ? rawAge : '전체';
    const [selectedAge, setSelectedAge] = useState<string>(queryAge);

    useEffect(() => {
        if (typeof queryAge === 'string') {
            setSelectedAge(queryAge);
        }
    }, [queryAge]);

    const filteredBooks = selectedAge === "전체"
        ? books
        : books.filter((book: Book) => book.age === selectedAge);

    return (
        <Layout selectedAge={selectedAge} setSelectedAge={setSelectedAge}>
            <div className="space-y-4">
                {filteredBooks.length === 0 ? (
                    <div className="no-books-message">
                        현재 이 연령대의 필독서가 아직 없습니다.
                    </div>
                ) : (
                    filteredBooks.map((book, index) => (
                        <div key={book.id}>
                            <Link href={`/book/${book.id}`} className="card">
                                <div className="title">{book.title}</div>
                                <div className="meta">
                                    저자: {book.author} / {selectedAge === "전체" ? `${book.age} / ` : ''}{book.description}
                                </div>
                            </Link>
                            {index < filteredBooks.length - 1 && (
                                <hr className="my-4 border-gray-300" />
                            )}
                        </div>
                    ))
                )}
            </div>
        </Layout>
    );

}
