// 결과 표시
let mbtiResult = '';
let typeData   = {};   // color + emoji (language-independent)

// Kakao SDK 초기화
if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
    Kakao.init('1abe40bb8385bee1ed1d7f08e18fa3e0');
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', async function() {
    // i18n 초기화
    if (typeof I18n !== 'undefined') {
        await I18n.init();
    }

    mbtiResult = localStorage.getItem('mbtiResult');

    if (!mbtiResult) {
        const msg = (typeof I18n !== 'undefined')
            ? I18n.t('result.alert_no_result')
            : '검사를 먼저 진행해주세요!';
        alert(msg);
        window.location.href = 'index.html';
        return;
    }

    await loadTypeData();
    displayResult();
    populateCompatOptions();

    // 언어 변경 시 결과 화면 다시 렌더링
    window.addEventListener('i18n:changed', () => {
        displayResult();
        populateCompatOptions();
        // 열려 있던 궁합 결과 닫기
        const cr = document.getElementById('compatibilityResult');
        if (cr) cr.style.display = 'none';
    });
});

// ─── 타입 데이터 로드 (색상 + 이모지) ─────────────────────────────────────────
async function loadTypeData() {
    try {
        const response = await fetch('data/types.json');
        const allTypes = await response.json();
        // types.json is the original Korean file — we only use language-independent fields
        typeData = {
            emoji: allTypes[mbtiResult].emoji,
            color: allTypes[mbtiResult].color
        };
    } catch (error) {
        console.error('타입 데이터 로드 실패:', error);
        typeData = { emoji: '⭐', color: '#667eea' };
    }
}

// ─── 결과 표시 ────────────────────────────────────────────────────────────────
function displayResult() {
    const lang      = (typeof I18n !== 'undefined') ? I18n.lang() : 'ko';
    const typeKey   = `types.${mbtiResult}`;
    const name      = (typeof I18n !== 'undefined') ? I18n.t(`${typeKey}.name`)        : mbtiResult;
    const character = (typeof I18n !== 'undefined') ? I18n.t(`${typeKey}.character`)   : '';
    const desc      = (typeof I18n !== 'undefined') ? I18n.t(`${typeKey}.description`) : '';
    // traits is an array — I18n.t returns the array directly
    let traits = [];
    if (typeof I18n !== 'undefined') {
        const raw = I18n.t(`${typeKey}.traits`);
        traits = Array.isArray(raw) ? raw : [];
    }

    const resultCard = document.getElementById('resultCard');
    resultCard.style.borderColor = typeData.color;

    const mbtiTypeEl = document.getElementById('mbtiType');
    mbtiTypeEl.textContent = mbtiResult;
    mbtiTypeEl.style.color = typeData.color;

    document.getElementById('characterEmoji').textContent = typeData.emoji;
    document.getElementById('typeName').textContent       = name;
    document.getElementById('characterName').textContent  = `${typeData.emoji} ${character}`;
    document.getElementById('description').textContent    = desc;

    const traitsList = document.getElementById('traitsList');
    traitsList.innerHTML = '';
    traits.forEach(trait => {
        const li = document.createElement('li');
        li.textContent = `✓ ${trait}`;
        li.style.borderLeftColor = typeData.color;
        traitsList.appendChild(li);
    });
}

// ─── 궁합 셀렉트 옵션 채우기 ─────────────────────────────────────────────────
function populateCompatOptions() {
    const select = document.getElementById('friendType');
    if (!select) return;

    const placeholder = (typeof I18n !== 'undefined')
        ? I18n.t('result.compat_placeholder')
        : '친구 유형 선택하기';

    const types = ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP',
                   'ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'];

    select.innerHTML = `<option value="">${placeholder}</option>`;
    types.forEach(t => {
        const label = (typeof I18n !== 'undefined')
            ? I18n.t(`compat_options.${t}`)
            : `${t}`;
        const opt = document.createElement('option');
        opt.value       = t;
        opt.textContent = label;
        select.appendChild(opt);
    });
}

// ─── 카카오톡 공유 ────────────────────────────────────────────────────────────
function shareKakao() {
    if (typeof Kakao === 'undefined' || !Kakao.isInitialized()) {
        alert((typeof I18n !== 'undefined')
            ? I18n.t('result.alert_kakao_na')
            : '카카오톡 공유 기능 준비 중이에요! 😊\n지금은 링크 복사를 이용해주세요.');
        return;
    }

    const name  = (typeof I18n !== 'undefined') ? I18n.t(`types.${mbtiResult}.name`) : mbtiResult;
    const title = (typeof I18n !== 'undefined')
        ? I18n.t('result.kakao_title', { type: mbtiResult, name })
        : `나는 ${mbtiResult} - ${name}!`;
    const btnTxt = (typeof I18n !== 'undefined') ? I18n.t('result.kakao_btn') : '나도 검사하기';
    const url    = window.location.origin;

    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title,
            description: `${typeData.emoji} ${(typeof I18n !== 'undefined') ? I18n.t(`types.${mbtiResult}.character`) : ''} | ${(typeof I18n !== 'undefined') ? I18n.t(`types.${mbtiResult}.description`) : ''}`,
            imageUrl: 'https://via.placeholder.com/800x400/667eea/ffffff?text=' + mbtiResult,
            link: { mobileWebUrl: url, webUrl: url }
        },
        buttons: [{ title: btnTxt, link: { mobileWebUrl: url, webUrl: url } }]
    });
}

// ─── 문자메시지 공유 ──────────────────────────────────────────────────────────
function shareSMS() {
    const name = (typeof I18n !== 'undefined') ? I18n.t(`types.${mbtiResult}.name`) : mbtiResult;
    const text = (typeof I18n !== 'undefined')
        ? I18n.t('result.sms_text', { type: mbtiResult, name, url: window.location.origin })
        : `나는 ${mbtiResult} (${name})이야! 너도 검사해봐!\n${window.location.origin}`;

    const ua   = navigator.userAgent.toLowerCase();
    const link = (ua.includes('iphone') || ua.includes('ipad'))
        ? `sms:&body=${encodeURIComponent(text)}`
        : `sms:?body=${encodeURIComponent(text)}`;
    window.location.href = link;
}

// ─── 링크 복사 ────────────────────────────────────────────────────────────────
function shareLink() {
    const url = window.location.origin +
        window.location.pathname.replace('result.html', 'index.html');

    if (navigator.clipboard) {
        navigator.clipboard.writeText(url)
            .then(() => showToast(
                (typeof I18n !== 'undefined') ? I18n.t('result.toast_link_copied') : '링크가 복사되었어요! 🎉'
            ))
            .catch(() => fallbackCopyText(url));
    } else {
        fallbackCopyText(url);
    }
}

function fallbackCopyText(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-999999px';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try {
        document.execCommand('copy');
        showToast((typeof I18n !== 'undefined') ? I18n.t('result.toast_link_copied') : '링크가 복사되었어요! 🎉');
    } catch (_) {
        const prefix = (typeof I18n !== 'undefined') ? I18n.t('result.copy_error') : '링크 복사에 실패했어요 😢\n수동으로 복사해주세요:\n';
        alert(prefix + text);
    }
    document.body.removeChild(ta);
}

// ─── 이미지 저장 ──────────────────────────────────────────────────────────────
async function saveImage() {
    if (typeof html2canvas === 'undefined') {
        alert('이미지 저장 기능을 불러오는 중이에요! 잠시 후 다시 시도해주세요.');
        return;
    }

    showToast((typeof I18n !== 'undefined') ? I18n.t('result.toast_img_generating') : '이미지를 생성하는 중이에요... ⏳');

    try {
        const canvas = await html2canvas(document.querySelector('.result-card'), {
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false
        });

        canvas.toBlob(blob => {
            const name = (typeof I18n !== 'undefined') ? I18n.t(`types.${mbtiResult}.name`) : mbtiResult;
            if (navigator.share && navigator.canShare &&
                navigator.canShare({ files: [new File([blob], 'result.png', { type: 'image/png' })] })) {
                const file = new File([blob], 'result.png', { type: 'image/png' });
                const shareTitle = (typeof I18n !== 'undefined')
                    ? I18n.t('result.share_title_native', { type: mbtiResult })
                    : `나의 MBTI - ${mbtiResult}`;
                const shareText = (typeof I18n !== 'undefined')
                    ? I18n.t('result.share_text_native', { name })
                    : `나는 ${name}!`;
                navigator.share({ title: shareTitle, text: shareText, files: [file] })
                    .catch(() => downloadImage(blob));
            } else {
                downloadImage(blob);
            }
        }, 'image/png');

    } catch (err) {
        console.error('이미지 생성 실패:', err);
        showToast((typeof I18n !== 'undefined') ? I18n.t('result.toast_img_error') : '이미지 생성에 실패했어요 😢');
    }
}

function downloadImage(blob) {
    const filename = (typeof I18n !== 'undefined')
        ? I18n.t('result.img_filename', { type: mbtiResult })
        : `mbti-${mbtiResult}-result.png`;
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = filename;
    document.body.appendChild(link); link.click();
    document.body.removeChild(link); URL.revokeObjectURL(url);
    showToast((typeof I18n !== 'undefined') ? I18n.t('result.toast_img_saved') : '이미지가 저장되었어요! 📸');
}

// ─── 다시하기 ─────────────────────────────────────────────────────────────────
function restart() {
    localStorage.removeItem('mbtiResult');
    localStorage.removeItem('answers');
    window.location.href = 'index.html';
}

// ─── 토스트 메시지 ───────────────────────────────────────────────────────────
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position:fixed;bottom:30px;left:50%;transform:translateX(-50%);
        background:rgba(0,0,0,0.8);color:white;padding:15px 25px;
        border-radius:25px;font-size:0.95rem;z-index:9999;
        animation:fadeInUp 0.3s ease;`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

// ─── 궁합 확인 ───────────────────────────────────────────────────────────────
function checkCompatibility() {
    const friendType = document.getElementById('friendType').value;
    if (!friendType) {
        alert((typeof I18n !== 'undefined') ? I18n.t('result.alert_no_friend') : '친구의 MBTI 유형을 선택해주세요!');
        return;
    }

    const score   = getCompatibilityScore(mbtiResult, friendType);
    const message = getCompatibilityMessage(score);
    const meLabel = (typeof I18n !== 'undefined') ? I18n.t('result.compat_me')     : '나:';
    const frLabel = (typeof I18n !== 'undefined') ? I18n.t('result.compat_friend') : '친구:';

    const resultDiv = document.getElementById('compatibilityResult');
    resultDiv.innerHTML = `
        <div class="compatibility-score">
            <div class="score-emoji">${message.emoji}</div>
            <div class="score-text">${score}점</div>
            <div class="score-subtitle">${message.title}</div>
        </div>
        <div class="compatibility-details">
            <p><strong>${meLabel}</strong> ${mbtiResult} ${typeData.emoji}</p>
            <p><strong>${frLabel}</strong> ${friendType}</p>
            <p style="margin-top:15px">${message.description}</p>
        </div>`;
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ─── 애니메이션 CSS ───────────────────────────────────────────────────────────
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { opacity:0; transform:translate(-50%,20px); }
        to   { opacity:1; transform:translate(-50%,0); }
    }
    @keyframes fadeOut {
        from { opacity:1; }
        to   { opacity:0; }
    }`;
document.head.appendChild(style);
