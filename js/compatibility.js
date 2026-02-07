// MBTI 궁합 데이터
const compatibilityData = {
    // 각 MBTI 유형별 궁합 점수 (0-100)
    scores: {
        'ISTJ': { 'ESFP': 95, 'ESTP': 90, 'ISFJ': 85, 'ESTJ': 80, 'ISTP': 75, 'ISFP': 70 },
        'ISFJ': { 'ESFP': 95, 'ESTP': 90, 'ISTJ': 85, 'ESFJ': 80, 'ISFP': 75, 'ISTP': 70 },
        'INFJ': { 'ENFP': 95, 'ENTP': 90, 'INFP': 85, 'INTJ': 80, 'ENFJ': 75, 'ENTJ': 70 },
        'INTJ': { 'ENFP': 95, 'ENTP': 90, 'INFJ': 80, 'ENTJ': 75, 'INTP': 70, 'INTJ': 65 },
        'ISTP': { 'ESFJ': 95, 'ESTJ': 90, 'ISFP': 85, 'ESTP': 80, 'ISTJ': 75, 'ISTP': 70 },
        'ISFP': { 'ESFJ': 95, 'ENFJ': 90, 'INFP': 85, 'ISFJ': 70, 'ISTP': 85, 'ESFP': 80 },
        'INFP': { 'ENFJ': 95, 'ENTJ': 90, 'INFJ': 85, 'ENFP': 80, 'ISFP': 85, 'INTP': 75 },
        'INTP': { 'ENTJ': 95, 'ENFJ': 90, 'ENTP': 85, 'INTJ': 70, 'INFP': 75, 'INTP': 65 },
        'ESTP': { 'ISFJ': 95, 'ISTJ': 90, 'ESFP': 85, 'ESTJ': 80, 'ISTP': 80, 'ESTP': 75 },
        'ESFP': { 'ISTJ': 95, 'ISFJ': 95, 'ESFJ': 85, 'ESTP': 85, 'ISFP': 80, 'ESFP': 75 },
        'ENFP': { 'INTJ': 95, 'INFJ': 95, 'ENFJ': 85, 'ENTP': 80, 'INFP': 80, 'ENFP': 75 },
        'ENTP': { 'INFJ': 90, 'INTJ': 90, 'ENFP': 80, 'ENTJ': 75, 'INTP': 85, 'ENTP': 70 },
        'ESTJ': { 'ISFP': 95, 'ISTP': 90, 'ISTJ': 80, 'ESFJ': 75, 'ESTP': 80, 'ESTJ': 70 },
        'ESFJ': { 'ISFP': 95, 'ISTP': 95, 'ESFP': 85, 'ISFJ': 80, 'ESTJ': 75, 'ESFJ': 70 },
        'ENFJ': { 'INFP': 95, 'ISFP': 90, 'ENFP': 85, 'INFJ': 75, 'ENTJ': 70, 'ENFJ': 65 },
        'ENTJ': { 'INTP': 95, 'INFP': 90, 'INTJ': 75, 'ENTP': 75, 'ENTJ': 65, 'ENFJ': 70 }
    },
    
    // 궁합 설명
    messages: {
        excellent: {
            emoji: '💖',
            title: '환상의 궁합!',
            description: '서로를 완벽하게 보완해주는 최고의 조합이에요! 함께 있으면 더 성장할 수 있어요.'
        },
        veryGood: {
            emoji: '💕',
            title: '아주 좋은 궁합!',
            description: '서로 다른 점이 매력적으로 느껴지는 조합이에요. 많이 배울 수 있어요!'
        },
        good: {
            emoji: '😊',
            title: '좋은 궁합!',
            description: '서로 이해하고 존중하면 좋은 친구가 될 수 있어요.'
        },
        normal: {
            emoji: '👍',
            title: '무난한 궁합',
            description: '비슷한 점도 있고 다른 점도 있어요. 노력하면 잘 지낼 수 있어요!'
        },
        needEffort: {
            emoji: '🤔',
            title: '노력이 필요한 궁합',
            description: '서로 다른 점이 많지만, 그만큼 배울 점도 많아요. 이해하려고 노력해보세요!'
        }
    }
};

// 궁합 점수 계산
function getCompatibilityScore(type1, type2) {
    // 같은 유형
    if (type1 === type2) {
        return 80; // 비슷해서 이해는 잘 되지만 최고는 아님
    }
    
    // 데이터에서 찾기
    if (compatibilityData.scores[type1] && compatibilityData.scores[type1][type2]) {
        return compatibilityData.scores[type1][type2];
    }
    
    // 역방향 찾기
    if (compatibilityData.scores[type2] && compatibilityData.scores[type2][type1]) {
        return compatibilityData.scores[type2][type1];
    }
    
    // 기본 점수 (E/I, S/N, T/F, J/P 비교)
    let score = 50;
    
    // E/I 비교
    if ((type1[0] === 'E' && type2[0] === 'I') || (type1[0] === 'I' && type2[0] === 'E')) {
        score += 15; // 외향과 내향은 보완적
    }
    
    // S/N 비교
    if (type1[1] === type2[1]) {
        score += 10; // 같은 인식 방식
    }
    
    // T/F 비교
    if ((type1[2] === 'T' && type2[2] === 'F') || (type1[2] === 'F' && type2[2] === 'T')) {
        score += 10; // 보완적
    }
    
    // J/P 비교
    if ((type1[3] === 'J' && type2[3] === 'P') || (type1[3] === 'P' && type2[3] === 'J')) {
        score += 15; // 보완적
    }
    
    return score;
}

// 궁합 메시지 선택
function getCompatibilityMessage(score) {
    if (score >= 90) return compatibilityData.messages.excellent;
    if (score >= 80) return compatibilityData.messages.veryGood;
    if (score >= 70) return compatibilityData.messages.good;
    if (score >= 60) return compatibilityData.messages.normal;
    return compatibilityData.messages.needEffort;
}
