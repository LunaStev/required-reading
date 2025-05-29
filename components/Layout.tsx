import { ReactNode } from 'react';
import Link from 'next/link';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const ages = ['전체', '10대', '20대', '30대', '40대', '50대', '60대', '70대', '80대', '90대', '100대'];

type LayoutProps = {
    selectedAge?: string;
    setSelectedAge?: (age: string) => void;
    children: ReactNode;
};

export default function Layout({ selectedAge, setSelectedAge, children }: LayoutProps) {
    return (
        <div>
            <nav className="age-nav">
                {ages.map((age) => {
                    const isSelected = age === selectedAge;
                    const className = `age-nav-button ${isSelected ? 'selected' : ''}`;

                    if (setSelectedAge) {
                        return (
                            <button
                                key={age}
                                onClick={() => setSelectedAge(age)}
                                className={className}
                            >
                                {age}
                            </button>
                        );
                    } else {
                        return (
                            <Link key={age} href={`/?age=${encodeURIComponent(age)}`} className={className}>
                                {age}
                            </Link>
                        );
                    }
                })}
            </nav>

            <main className="main-content">{children}</main>

            <SpeedInsights />
            <Analytics />

            <div className="footer-notice">
                ※ 이 사이트는 YES24 및 Amazon 제휴 프로그램을 통해 운영되며,<br />
                도서 구매 시 제작자에게 소정의 수익이 돌아옵니다.
            </div>

            <div className="privacy-link">
                <Link href="/privacy-policy">개인정보처리방침</Link>
            </div>

            <div className="banner-bar">
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
                        />
                    </a>
                )}
            </div>
        </div>
    );
}