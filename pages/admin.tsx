import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import clientPromise from '../lib/mongodb';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context;
    const cookies = parse(req.headers.cookie || '');
    const password = cookies.admin_password;
    const correct = process.env.ADMIN_PASSWORD;

    if (password !== correct) {
        return { props: { authorized: false, books: [] } };
    }

    const client = await clientPromise;
    const db = client.db();
    const books = await db.collection('books').find({}).toArray();

    return {
        props: {
            authorized: true,
            books: books.map(({ _id, ...rest }) => ({
                id: _id.toString(),
                ...rest,
            })),
        },
    };
};

type AdminProps = {
    authorized: boolean;
    books: {
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
    }[];
};

export default function Admin({ authorized, books }: AdminProps) {
    const [pw, setPw] = useState('');

    if (!authorized) {
        return (
            <form
                method="POST"
                onSubmit={(e) => {
                    e.preventDefault();
                    document.cookie = `admin_password=${pw}; path=/`;
                    location.reload();
                }}
                className="admin-container"
            >
                <h1>🔒 관리자 락</h1>
                <input
                    type="password"
                    placeholder="비밀번호 입력"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                />
                <button type="submit">입장</button>
            </form>
        );
    }

    return (
        <div className="admin-container">
            <h1>📂 관리자 페이지</h1>

            <form method="POST" action="/api/add-book">
                <h2>➕ 책 추가</h2>
                <input name="title" placeholder="제목" required />
                <input name="author" placeholder="저자" required />
                <label>추천 나이대:</label>
                <select name="age" required>
                    {['10대', '20대', '30대', '40대', '50대', '60대', '70대', '80대', '90대', '100대'].map(age => (
                        <option key={age} value={age}>{age}</option>
                    ))}
                </select>
                <textarea name="description" placeholder="설명" />
                <input name="year" placeholder="출판년도" type="number" />
                <input name="pages" placeholder="페이지 수" type="number" />
                <label>난이도:</label>
                <select name="difficulty" required defaultValue="3">
                    {[1, 2, 3, 4, 5].map(level => (
                        <option key={level} value={level}>{level} - {'⭐'.repeat(level)}</option>
                    ))}
                </select>
                <input name="keywords" placeholder="쉼표로 구분된 키워드" />
                <input name="highlight" placeholder="명문장" />
                <input name="lang_original" placeholder="원서 언어" />
                <input name="link_kr" placeholder="한국어 링크" />
                <input name="link_original" placeholder="원서 링크" />
                <input name="recommended_by" placeholder="추천 기관/출처 (예: 서울대학교)" />
                <button type="submit">추가</button>
            </form>

            <hr />
            <h2>📚 현재 책 목록</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <strong>{book.title}</strong> ({book.age}) - <a href={`/book/${book.id}`}>보기</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
