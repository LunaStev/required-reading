import React from 'react';

const PrivacyPolicyPage = () => {
    return (
        <main className="privacy-policy">
            <h1>개인정보처리방침</h1>

            <h2>1. 개인정보 수집</h2>
            <p>
                본 서비스는 <strong>개인정보를 수집하거나 저장하지 않습니다.</strong><br />
                회원가입, 로그인, 또는 어떤 입력도 요구하지 않으며, 어떠한 형태의 개인정보도 처리하지 않습니다.
            </p>

            <h2>2. 외부 링크</h2>
            <p>
                서비스에는 <strong>아마존(Amazon)</strong> 및 <strong>예스24(Yes24)</strong> 등의 도서 구매 사이트로
                연결되는 제휴 링크가 포함되어 있습니다. 해당 링크에는 각 사이트의 추적 정보가 포함될 수 있으며, 이로 인해
                수집되는 정보는 저희가 접근하거나 관리할 수 없습니다. 자세한 내용은 각 사이트의 개인정보처리방침을 참고해 주세요.
            </p>

            <h2>3. 결제</h2>
            <p>
                본 서비스는 자체적으로 결제 기능을 제공하지 않으며, 모든 구매는 외부 사이트에서 이루어집니다.
            </p>

            <h2>4. 문의</h2>
            <p>
                개인정보 처리에 관하여 궁금한 사항이 있으시면 <a href="mailto:lunastev@gurmstudios.com">lunastev@gurmstudios.com</a> 으로 문의해 주세요.
            </p>
        </main>
    );
};

export default PrivacyPolicyPage;