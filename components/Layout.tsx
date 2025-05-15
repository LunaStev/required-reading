import { ReactNode } from 'react';
import Link from 'next/link';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

const ages = ['전체', '10대', '20대', '30대', '40대', '50대', '60대', '70대', '80대', '90대', '100대'];

type LayoutProps = {
    selectedAge?: string;
    setSelectedAge?: (age: string) => void;
    children: ReactNode;
};

export default function Layout({ selectedAge, setSelectedAge, children }: LayoutProps) {
    return (
        <div>
            <nav style={{
                display: 'flex',
                gap: 12,
                padding: '16px 32px',
                borderBottom: '1px solid #ccc',
                backgroundColor: '#f8f8f8',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}>
                {ages.map((age) => {
                    const isSelected = age === selectedAge;
                    const style = {
                        backgroundColor: isSelected ? '#333' : '#eee',
                        color: isSelected ? '#fff' : '#000',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        textDecoration: 'none'
                    };

                    if (setSelectedAge) {
                        return (
                            <button
                                key={age}
                                onClick={() => setSelectedAge(age)}
                                style={style}
                            >
                                {age}
                            </button>
                        );
                    } else {
                        return (
                            <Link key={age} href={`/?age=${encodeURIComponent(age)}`} style={style}>
                                {age}
                            </Link>
                        );
                    }
                })}
            </nav>

            <main style={{padding: 32}}>
                {children}
            </main>

            <SpeedInsights/>
            <Analytics/>

            {/* 제휴 안내 텍스트 */}
            <div style={{
                textAlign: 'center',
                fontSize: '14px',
                color: '#666',
                paddingTop: '32px'
            }}>
                ※ 이 사이트는 YES24 및 Amazon 제휴 프로그램을 통해 운영되며,<br />
                도서 구매 시 제작자에게 소정의 수익이 돌아옵니다.
            </div>

            {/* 제휴 배너 영역 */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '32px',
                padding: '24px 0',
                background: '#f9f9f9',
                borderTop: '1px solid #ddd'
            }}>
                {/* YES24 배너 */}
                {process.env.NEXT_PUBLIC_YES24_BANNER && (
                    <>
                        <a
                            target="_blank"
                            href={process.env.NEXT_PUBLIC_YES24_BANNER}
                            rel="noopener noreferrer"
                        >
                            <img
                                src="https://img.linkprice.com/files/glink/yes24/20230404/mO0SSvv3Ncca0_12060yyyyy.png"
                                alt="YES24 배너"
                                width="120"
                                height="60"
                                style={{
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                }}
                            />
                        </a>
                        <img
                            src="http://track.linkprice.com/lpshow.php?m_id=yes24&a_id=A100695952&p_id=0000&l_id=Id9f&l_cd1=2&l_cd2=0"
                            width="1"
                            height="1"
                            style={{ display: 'none' }}
                            alt=""
                        />
                    </>
                )}

                {/* Amazon 배너 */}
                {process.env.NEXT_PUBLIC_AMAZON_BANNER && (
                    <a
                        target="_blank"
                        href={process.env.NEXT_PUBLIC_AMAZON_BANNER}
                        rel="noopener noreferrer"
                    >
                        <img
                            src="/amazon.png"
                            alt="Amazon 배너"
                            width="120"
                            height="60"
                            style={{
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                        />
                    </a>
                )}
            </div>
        </div>
    );
}
