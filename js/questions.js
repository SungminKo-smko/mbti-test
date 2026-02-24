// MBTI 검사 질문 데이터 — 이중 언어 (한국어 / English)
// Each question has `ko` and `en` objects with question + options.

const questionPool = {

    // ─── E vs I (외향 / Extraversion vs Introversion) ─── 12문항 ───────────
    EI: [
        {
            ko: { question: '새 학기가 시작됐어요! 어떻게 할 거예요?',
                  options: [{ text: '친구들에게 먼저 다가가서 인사해요 👋', value: 'E' },
                             { text: '친구가 말을 걸어줄 때까지 기다려요 🤫', value: 'I' }] },
            en: { question: 'A new school year has started! What do you do?',
                  options: [{ text: 'I go up to classmates and say hi first 👋', value: 'E' },
                             { text: 'I wait for someone to talk to me first 🤫', value: 'I' }] }
        },
        {
            ko: { question: '주말에 뭐 하고 싶어요?',
                  options: [{ text: '친구들이랑 밖에서 신나게 놀래요 🎮', value: 'E' },
                             { text: '집에서 혼자 좋아하는 걸 하고 싶어요 🏠', value: 'I' }] },
            en: { question: 'What do you want to do on weekends?',
                  options: [{ text: 'Play outside with friends and have fun 🎮', value: 'E' },
                             { text: 'Stay home and do my favorite things alone 🏠', value: 'I' }] }
        },
        {
            ko: { question: '재미있는 일이 생기면?',
                  options: [{ text: '바로 친구들한테 이야기해요! 📢', value: 'E' },
                             { text: '혼자 생각하면서 즐거워해요 😊', value: 'I' }] },
            en: { question: 'When something fun happens?',
                  options: [{ text: 'I tell my friends right away! 📢', value: 'E' },
                             { text: 'I enjoy thinking about it by myself 😊', value: 'I' }] }
        },
        {
            ko: { question: '수업 시간에 조별 활동을 해요!',
                  options: [{ text: '친구들이랑 이야기 나누는 게 재미있어요 💬', value: 'E' },
                             { text: '혼자 집중해서 하는 게 더 좋아요 ✍️', value: 'I' }] },
            en: { question: "It's group activity time in class!",
                  options: [{ text: 'I love talking and working together 💬', value: 'E' },
                             { text: 'I prefer working alone and focusing ✍️', value: 'I' }] }
        },
        {
            ko: { question: '쉬는 시간에는?',
                  options: [{ text: '친구들이랑 운동장에서 뛰어놀아요 ⚽', value: 'E' },
                             { text: '교실에서 조용히 책을 읽거나 쉬어요 📖', value: 'I' }] },
            en: { question: 'What do you do during recess?',
                  options: [{ text: 'Run around the playground with friends ⚽', value: 'E' },
                             { text: 'Read quietly or rest in the classroom 📖', value: 'I' }] }
        },
        {
            ko: { question: '생일 파티를 한다면?',
                  options: [{ text: '친구들 많이 초대해서 시끌벅적하게! 🎉', value: 'E' },
                             { text: '가까운 친구 몇 명만 조용히 🎂', value: 'I' }] },
            en: { question: 'If you had a birthday party?',
                  options: [{ text: 'Invite lots of friends for a big, noisy party! 🎉', value: 'E' },
                             { text: 'Just a few close friends, quiet and cozy 🎂', value: 'I' }] }
        },
        {
            ko: { question: '친구를 사귈 때',
                  options: [{ text: '새로운 친구를 쉽게 만들어요 🤝', value: 'E' },
                             { text: '천천히 친해지는 편이에요 🌱', value: 'I' }] },
            en: { question: 'When making friends',
                  options: [{ text: 'I make new friends easily 🤝', value: 'E' },
                             { text: 'I warm up to people slowly 🌱', value: 'I' }] }
        },
        {
            ko: { question: '수업 발표를 할 때',
                  options: [{ text: '앞에 나가서 발표하는 게 신나요 🎤', value: 'E' },
                             { text: '자리에 앉아서 조용히 하고 싶어요 🪑', value: 'I' }] },
            en: { question: 'When giving a presentation in class',
                  options: [{ text: 'I love going up front and presenting 🎤', value: 'E' },
                             { text: "I'd rather present from my seat quietly 🪑", value: 'I' }] }
        },
        {
            ko: { question: '학교 끝나고 집에 오면?',
                  options: [{ text: '친구들이랑 놀았던 이야기를 하고 싶어요 💬', value: 'E' },
                             { text: '혼자만의 시간이 필요해요 🛋️', value: 'I' }] },
            en: { question: 'After school, when you get home?',
                  options: [{ text: 'I want to tell everyone what happened today 💬', value: 'E' },
                             { text: 'I need some quiet alone time 🛋️', value: 'I' }] }
        },
        {
            ko: { question: '파티에서 돌아온 후',
                  options: [{ text: '더 신나고 에너지가 넘쳐요! ⚡', value: 'E' },
                             { text: '좀 피곤하고 쉬고 싶어요 😴', value: 'I' }] },
            en: { question: 'After coming home from a party',
                  options: [{ text: 'I feel even more excited and energized! ⚡', value: 'E' },
                             { text: 'I feel a bit tired and want to rest 😴', value: 'I' }] }
        },
        {
            ko: { question: '전화 통화는?',
                  options: [{ text: '친구랑 오래 통화하는 게 좋아요 📞', value: 'E' },
                             { text: '짧게 끝내고 싶어요 📱', value: 'I' }] },
            en: { question: 'About phone calls?',
                  options: [{ text: 'I love long chats with friends 📞', value: 'E' },
                             { text: 'I prefer to keep them short 📱', value: 'I' }] }
        },
        {
            ko: { question: '낯선 곳에 갔을 때',
                  options: [{ text: '새로운 사람들과 금방 친해져요 👥', value: 'E' },
                             { text: '아는 사람 옆에 있는 게 편해요 🙋', value: 'I' }] },
            en: { question: 'When you go somewhere new',
                  options: [{ text: 'I quickly become friends with new people 👥', value: 'E' },
                             { text: 'I feel more comfortable near people I know 🙋', value: 'I' }] }
        }
    ],

    // ─── S vs N (감각 / Sensing vs Intuition) ─── 12문항 ──────────────────
    SN: [
        {
            ko: { question: '레고나 블록을 만들 때',
                  options: [{ text: '설명서를 보면서 정확하게 만들어요 📖', value: 'S' },
                             { text: '내 상상대로 자유롭게 만들어요 ✨', value: 'N' }] },
            en: { question: 'When building with Lego or blocks',
                  options: [{ text: 'I follow the instructions step by step 📖', value: 'S' },
                             { text: 'I build freely from my imagination ✨', value: 'N' }] }
        },
        {
            ko: { question: '이야기를 들을 때',
                  options: [{ text: '무슨 일이 일어났는지 자세히 알고 싶어요 🔍', value: 'S' },
                             { text: '전체 줄거리가 어떤지 궁금해요 📚', value: 'N' }] },
            en: { question: 'When listening to a story',
                  options: [{ text: 'I want to know exactly what happened 🔍', value: 'S' },
                             { text: "I'm curious about the big picture 📚", value: 'N' }] }
        },
        {
            ko: { question: '그림을 그릴 때',
                  options: [{ text: '눈에 보이는 것을 그려요 🎨', value: 'S' },
                             { text: '머릿속 상상을 그려요 🌈', value: 'N' }] },
            en: { question: 'When drawing pictures',
                  options: [{ text: 'I draw what I can actually see 🎨', value: 'S' },
                             { text: 'I draw imaginary things from my mind 🌈', value: 'N' }] }
        },
        {
            ko: { question: '새로운 게임을 배울 때',
                  options: [{ text: '규칙을 하나씩 배워가면서 해요 📝', value: 'S' },
                             { text: '일단 해보면서 감으로 배워요 🎯', value: 'N' }] },
            en: { question: 'When learning a new game',
                  options: [{ text: 'I learn the rules one by one 📝', value: 'S' },
                             { text: 'I just dive in and figure it out 🎯', value: 'N' }] }
        },
        {
            ko: { question: '좋아하는 과목은?',
                  options: [{ text: '수학, 과학처럼 정확한 답이 있는 과목 🔢', value: 'S' },
                             { text: '미술, 음악처럼 상상력을 쓰는 과목 🎭', value: 'N' }] },
            en: { question: "What's your favorite subject?",
                  options: [{ text: 'Subjects like math or science with clear answers 🔢', value: 'S' },
                             { text: 'Creative subjects like art or music 🎭', value: 'N' }] }
        },
        {
            ko: { question: '선생님 말씀을 들을 때',
                  options: [{ text: '구체적인 예시를 들어주면 이해가 잘 돼요 📌', value: 'S' },
                             { text: '전체적인 개념을 알려주면 이해가 잘 돼요 💡', value: 'N' }] },
            en: { question: "When listening to the teacher's explanation",
                  options: [{ text: 'I understand better with specific examples 📌', value: 'S' },
                             { text: 'I understand better with the big concept first 💡', value: 'N' }] }
        },
        {
            ko: { question: '장래희망을 이야기할 때',
                  options: [{ text: '지금 좋아하는 것을 생각해요 🎯', value: 'S' },
                             { text: '미래에 하고 싶은 새로운 걸 생각해요 🚀', value: 'N' }] },
            en: { question: 'When thinking about your future dream job',
                  options: [{ text: 'I think about what I like right now 🎯', value: 'S' },
                             { text: 'I imagine completely new things I could do 🚀', value: 'N' }] }
        },
        {
            ko: { question: '과학 시간에',
                  options: [{ text: '실험하고 관찰하는 게 좋아요 🔬', value: 'S' },
                             { text: '왜 그런지 원리를 생각하는 게 좋아요 🤔', value: 'N' }] },
            en: { question: 'During science class',
                  options: [{ text: 'I love doing experiments and observing 🔬', value: 'S' },
                             { text: 'I love thinking about why things happen 🤔', value: 'N' }] }
        },
        {
            ko: { question: '책을 읽을 때',
                  options: [{ text: '실제로 일어난 이야기가 재미있어요 📰', value: 'S' },
                             { text: '판타지나 상상 속 이야기가 재미있어요 🧙', value: 'N' }] },
            en: { question: 'When reading books',
                  options: [{ text: 'I enjoy stories based on real events 📰', value: 'S' },
                             { text: 'I love fantasy and made-up worlds 🧙', value: 'N' }] }
        },
        {
            ko: { question: '숙제를 할 때',
                  options: [{ text: '정해진 방법대로 차근차근 해요 📋', value: 'S' },
                             { text: '내 방식대로 창의적으로 해요 🎨', value: 'N' }] },
            en: { question: 'When doing homework',
                  options: [{ text: 'I follow the set method step by step 📋', value: 'S' },
                             { text: 'I do it my own creative way 🎨', value: 'N' }] }
        },
        {
            ko: { question: '친구에게 설명할 때',
                  options: [{ text: '순서대로 자세하게 설명해요 1️⃣2️⃣3️⃣', value: 'S' },
                             { text: '큰 그림을 먼저 이야기해요 🖼️', value: 'N' }] },
            en: { question: 'When explaining something to a friend',
                  options: [{ text: 'I explain step by step in detail 1️⃣2️⃣3️⃣', value: 'S' },
                             { text: 'I describe the big picture first 🖼️', value: 'N' }] }
        },
        {
            ko: { question: '새로운 장난감을 받으면?',
                  options: [{ text: '어떻게 작동하는지 확인해요 🔧', value: 'S' },
                             { text: '뭘 만들 수 있을지 상상해요 💭', value: 'N' }] },
            en: { question: 'When you get a new toy?',
                  options: [{ text: 'I check how it works first 🔧', value: 'S' },
                             { text: 'I imagine all the ways I can play with it 💭', value: 'N' }] }
        }
    ],

    // ─── T vs F (사고 / Thinking vs Feeling) ─── 12문항 ───────────────────
    TF: [
        {
            ko: { question: '친구가 잘못했을 때',
                  options: [{ text: '뭐가 잘못됐는지 설명해줘요 💡', value: 'T' },
                             { text: '기분 나쁠까봐 조심스럽게 이야기해요 💕', value: 'F' }] },
            en: { question: 'When a friend makes a mistake',
                  options: [{ text: 'I explain what went wrong logically 💡', value: 'T' },
                             { text: "I speak carefully so they don't feel bad 💕", value: 'F' }] }
        },
        {
            ko: { question: '게임을 할 때 가장 중요한 건?',
                  options: [{ text: '이기는 게 제일 중요해요! 🏆', value: 'T' },
                             { text: '친구들이랑 재미있게 하는 게 중요해요 🎉', value: 'F' }] },
            en: { question: 'What matters most when playing a game?',
                  options: [{ text: 'Winning is the most important thing! 🏆', value: 'T' },
                             { text: 'Having fun together with friends 🎉', value: 'F' }] }
        },
        {
            ko: { question: '친구가 울고 있어요',
                  options: [{ text: '왜 우는지 이유를 물어봐요 🤔', value: 'T' },
                             { text: '먼저 위로해주고 안아줘요 🤗', value: 'F' }] },
            en: { question: 'Your friend is crying',
                  options: [{ text: 'I ask why they are crying 🤔', value: 'T' },
                             { text: 'I comfort them and give them a hug 🤗', value: 'F' }] }
        },
        {
            ko: { question: '선생님께 질문할 때',
                  options: [{ text: '궁금한 걸 바로바로 물어봐요 ❓', value: 'T' },
                             { text: '괜찮으신지 눈치를 먼저 봐요 👀', value: 'F' }] },
            en: { question: 'When you want to ask the teacher something',
                  options: [{ text: 'I ask my question right away ❓', value: 'T' },
                             { text: "I check if it's a good time first 👀", value: 'F' }] }
        },
        {
            ko: { question: '친구가 시험을 못 봤어요',
                  options: [{ text: '다음엔 어떻게 공부할지 조언해줘요 📚', value: 'T' },
                             { text: '괜찮다고 위로해줘요 💙', value: 'F' }] },
            en: { question: 'Your friend did poorly on a test',
                  options: [{ text: 'I give advice on how to study better next time 📚', value: 'T' },
                             { text: "I tell them it's okay and comfort them 💙", value: 'F' }] }
        },
        {
            ko: { question: '조별 과제에서',
                  options: [{ text: '효율적으로 역할을 나눠요 📊', value: 'T' },
                             { text: '모두가 하고 싶은 걸 배려해요 🤝', value: 'F' }] },
            en: { question: 'During group projects',
                  options: [{ text: 'I divide tasks efficiently 📊', value: 'T' },
                             { text: 'I consider what everyone wants to do 🤝', value: 'F' }] }
        },
        {
            ko: { question: '친구와 의견이 다를 때',
                  options: [{ text: '논리적으로 설명해요 🧠', value: 'T' },
                             { text: '친구 기분을 먼저 생각해요 💖', value: 'F' }] },
            en: { question: 'When you disagree with a friend',
                  options: [{ text: 'I explain my reasoning logically 🧠', value: 'T' },
                             { text: "I think about my friend's feelings first 💖", value: 'F' }] }
        },
        {
            ko: { question: '영화를 볼 때',
                  options: [{ text: '줄거리가 말이 되는지 생각해요 🎬', value: 'T' },
                             { text: '주인공의 감정에 빠져들어요 😢', value: 'F' }] },
            en: { question: 'When watching a movie',
                  options: [{ text: 'I think about whether the plot makes sense 🎬', value: 'T' },
                             { text: "I get absorbed in the main character's feelings 😢", value: 'F' }] }
        },
        {
            ko: { question: '칭찬을 받고 싶을 때',
                  options: [{ text: '"잘했어!" 라는 말을 듣고 싶어요 👍', value: 'T' },
                             { text: '"고생했어!" 라는 말을 듣고 싶어요 🫶', value: 'F' }] },
            en: { question: 'What kind of praise do you prefer?',
                  options: [{ text: '"You did great!" 👍', value: 'T' },
                             { text: '"You worked so hard!" 🫶', value: 'F' }] }
        },
        {
            ko: { question: '결정을 내릴 때',
                  options: [{ text: '뭐가 옳은지 생각해요 ⚖️', value: 'T' },
                             { text: '마음이 어떤지 느껴봐요 ❤️', value: 'F' }] },
            en: { question: 'When making a decision',
                  options: [{ text: 'I think about what is right and logical ⚖️', value: 'T' },
                             { text: 'I go with what feels right in my heart ❤️', value: 'F' }] }
        },
        {
            ko: { question: '친구가 규칙을 어겼어요',
                  options: [{ text: '규칙은 지켜야 한다고 말해요 📜', value: 'T' },
                             { text: '왜 그랬는지 이해해보려고 해요 🤷', value: 'F' }] },
            en: { question: 'A friend broke a rule',
                  options: [{ text: 'I tell them rules must be followed 📜', value: 'T' },
                             { text: 'I try to understand why they did it 🤷', value: 'F' }] }
        },
        {
            ko: { question: '선물을 고를 때',
                  options: [{ text: '유용한 걸 선물해요 🎁', value: 'T' },
                             { text: '좋아할 만한 걸 선물해요 💝', value: 'F' }] },
            en: { question: 'When choosing a gift',
                  options: [{ text: 'I pick something useful 🎁', value: 'T' },
                             { text: 'I pick something they would love 💝', value: 'F' }] }
        }
    ],

    // ─── J vs P (판단 / Judging vs Perceiving) ─── 12문항 ──────────────────
    JP: [
        {
            ko: { question: '숙제는 언제 해요?',
                  options: [{ text: '미리미리 해요! 📅', value: 'J' },
                             { text: '내일 하면 되지~ 마감일 전에만 하면 돼요 ⏰', value: 'P' }] },
            en: { question: 'When do you do your homework?',
                  options: [{ text: 'I do it early, well in advance! 📅', value: 'J' },
                             { text: "I'll do it later — as long as it's done before the deadline ⏰", value: 'P' }] }
        },
        {
            ko: { question: '놀러 갈 때',
                  options: [{ text: '계획을 세우고 그대로 해요 📋', value: 'J' },
                             { text: '그때그때 하고 싶은 거 해요 🎈', value: 'P' }] },
            en: { question: 'When going out to have fun',
                  options: [{ text: 'I make a plan and stick to it 📋', value: 'J' },
                             { text: 'I go with the flow and do whatever sounds fun 🎈', value: 'P' }] }
        },
        {
            ko: { question: '내 책상 위는',
                  options: [{ text: '깔끔하게 정리되어 있어요 📚', value: 'J' },
                             { text: '필요한 것들이 여기저기 있어요 🎨', value: 'P' }] },
            en: { question: 'What does your desk look like?',
                  options: [{ text: 'Nice and tidy 📚', value: 'J' },
                             { text: 'Things are spread around but I know where they are 🎨', value: 'P' }] }
        },
        {
            ko: { question: '갑자기 계획이 바뀌면',
                  options: [{ text: '좀 불편해요... 😰', value: 'J' },
                             { text: '상관없어요! 재미있을 것 같아요 😄', value: 'P' }] },
            en: { question: 'When plans suddenly change',
                  options: [{ text: 'I feel a bit uncomfortable... 😰', value: 'J' },
                             { text: 'No problem! Sounds fun actually 😄', value: 'P' }] }
        },
        {
            ko: { question: '가방을 쌀 때',
                  options: [{ text: '전날 미리 챙겨요 🎒', value: 'J' },
                             { text: '아침에 급하게 챙겨요 ⏱️', value: 'P' }] },
            en: { question: 'When packing your bag',
                  options: [{ text: 'I pack it the night before 🎒', value: 'J' },
                             { text: 'I rush to pack it in the morning ⏱️', value: 'P' }] }
        },
        {
            ko: { question: '시간표를 볼 때',
                  options: [{ text: '매일 확인하고 준비해요 📖', value: 'J' },
                             { text: '가끔 깜빡해요 🤭', value: 'P' }] },
            en: { question: 'Regarding your class schedule',
                  options: [{ text: 'I check it every day and prepare 📖', value: 'J' },
                             { text: 'I sometimes forget to check 🤭', value: 'P' }] }
        },
        {
            ko: { question: '방학 숙제는?',
                  options: [{ text: '방학 시작하자마자 끝내요 ✅', value: 'J' },
                             { text: '방학 끝날 때 몰아서 해요 😅', value: 'P' }] },
            en: { question: 'What about vacation homework?',
                  options: [{ text: 'I finish it right at the start of vacation ✅', value: 'J' },
                             { text: 'I cram it all in at the end 😅', value: 'P' }] }
        },
        {
            ko: { question: '하루 일과는?',
                  options: [{ text: '정해진 시간에 정해진 일을 해요 🕐', value: 'J' },
                             { text: '그날 기분에 따라 달라요 🌤️', value: 'P' }] },
            en: { question: 'What is your daily routine like?',
                  options: [{ text: 'I do the same things at the same times every day 🕐', value: 'J' },
                             { text: "It changes depending on how I'm feeling 🌤️", value: 'P' }] }
        },
        {
            ko: { question: '정리 정돈은?',
                  options: [{ text: '매일매일 정리해요 🧹', value: 'J' },
                             { text: '한번에 몰아서 해요 🗑️', value: 'P' }] },
            en: { question: 'When do you tidy up?',
                  options: [{ text: 'I tidy up every single day 🧹', value: 'J' },
                             { text: 'I do a big clean-up all at once 🗑️', value: 'P' }] }
        },
        {
            ko: { question: '새로운 취미를 시작하면?',
                  options: [{ text: '꾸준히 계속해요 📈', value: 'J' },
                             { text: '재미있으면 하고 아니면 다른 거 해요 🔄', value: 'P' }] },
            en: { question: 'When you start a new hobby',
                  options: [{ text: 'I keep at it consistently 📈', value: 'J' },
                             { text: "I do it while it's fun, then try something else 🔄", value: 'P' }] }
        },
        {
            ko: { question: '준비물을 챙길 때',
                  options: [{ text: '리스트를 만들어서 체크해요 ✔️', value: 'J' },
                             { text: '생각나는 대로 챙겨요 💭', value: 'P' }] },
            en: { question: 'When gathering supplies',
                  options: [{ text: 'I make a list and check things off ✔️', value: 'J' },
                             { text: 'I grab things as they come to mind 💭', value: 'P' }] }
        },
        {
            ko: { question: '약속 시간에',
                  options: [{ text: '10분 일찍 도착해요 ⏰', value: 'J' },
                             { text: '딱 맞춰서 또는 조금 늦게 와요 ⌚', value: 'P' }] },
            en: { question: 'When you have an appointment',
                  options: [{ text: 'I arrive 10 minutes early ⏰', value: 'J' },
                             { text: 'I arrive right on time or a little late ⌚', value: 'P' }] }
        }
    ]
};

// 랜덤하게 질문 선택 (각 차원별로 4개씩, 총 16개)
function selectRandomQuestions() {
    const lang = (typeof I18n !== 'undefined' && I18n.isReady()) ? I18n.lang() : 'ko';
    const selected = [];
    let id = 1;

    ['EI', 'SN', 'TF', 'JP'].forEach(dimension => {
        const pool     = questionPool[dimension];
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        const picked   = shuffled.slice(0, 4);

        picked.forEach(q => {
            const localised = q[lang] || q['ko']; // fallback to Korean
            selected.push({
                id:        id++,
                dimension: dimension,
                question:  localised.question,
                options:   localised.options,
                _raw:      q   // keep raw bilingual data for live language switching
            });
        });
    });

    // Shuffle so the four dimensions are mixed across the 16 questions
    return selected.sort(() => Math.random() - 0.5);
}

let questions = [];
