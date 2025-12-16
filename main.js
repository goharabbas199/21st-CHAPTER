import { PageFlip } from "page-flip";

// Flip sound (bundled with Vite)
const flipSoundUrl = new URL("./page-flip.wav", import.meta.url);
const flipAudio = new Audio(flipSoundUrl);
flipAudio.preload = "auto";
flipAudio.volume = 0.55;

// Mobile/Chrome autoplay policies: unlock audio on the first real user gesture.
let audioUnlocked = false;
function unlockAudioOnce() {
  if (audioUnlocked) return;
  audioUnlocked = true;

  try {
    // Play muted for a split-second to satisfy gesture requirements, then unmute.
    flipAudio.muted = true;
    const p = flipAudio.play();
    if (p && typeof p.then === "function") {
      p.then(() => {
        flipAudio.pause();
        flipAudio.currentTime = 0;
        flipAudio.muted = false;
      }).catch(() => {
        // If it fails, keep trying on the next gesture.
        flipAudio.muted = false;
        audioUnlocked = false;
      });
    } else {
      flipAudio.muted = false;
    }
  } catch {
    flipAudio.muted = false;
    audioUnlocked = false;
  }
}
window.addEventListener("pointerdown", unlockAudioOnce, { once: true });
window.addEventListener("touchstart", unlockAudioOnce, {
  once: true,
  passive: true,
});
window.addEventListener("keydown", unlockAudioOnce, { once: true });

function playFlipSound() {
  // Ensure we try to unlock on first interaction (safe no-op after unlocked)
  unlockAudioOnce();

  try {
    // Clone so rapid flips can overlap without cutting off.
    const a = flipAudio.cloneNode(true);
    a.volume = flipAudio.volume;
    a.currentTime = 0;
    void a.play();
  } catch (_) {
    // ignore
  }
}

let pageFlipInstance;

const bookContent = {
  intro: {
    title: "For Mun",
    subtitle: "On a chapter called twenty-one",
    dedication: `This is a book for you, one that I hope you will love and read again & again, just like a favorite book. In these pages, you will find all the things I have never told you before, the moments I remember, the days I will never forget, the feelings that mean so much. Take your time with them. They're all for you.`,
  },
  chapters: [
    {
      title: "Chapter One: 21 Things I Love About You",
      items: [
        "I love the way you smile when you look at me.",
        "I love how you talk to me when you're excited, how your hands move and your eyes light up.",
        "I love how you fix your hair without thinking, and how I always notice it.",
        "I love how you add me on your Instagram stories, like you want me to be part of your world.",
        "I love how you share even the smallest details of your day with me.",
        "I love how you always ask me if I've eaten, like it's something that really matters to you.",
        "I love how you ask about my day and actually wait for the answer.",
        "I love how you listen to me when I'm stressed, without rushing me.",
        "I love how you give me calm, mature advice when my mind feels messy.",
        "I love how your voice sounds soft and steady when you talk to me.",
        "I love how you make me feel alive just by being with me.",
        "I love how you stay patient with me, even when I'm quiet or tired.",
        "I love how you let me be myself with you, and you stay the same with me too.",
        "I love how your laugh comes out naturally when you're happy.",
        "I love how being close to you makes everything feel peaceful.",
        "I love how you sit close to me and the world feels quiet.",
        "I love how you make moments with me feel special, even simple ones.",
        "I love how your presence makes heavy days feel lighter.",
        "I love how you make time for me, even on busy days.",
        "I love how you feel like home to me.",
        "I love you for all of this — and for so much more that words can't explain.",
      ],
    },
    {
      title: "Chapter Two: 21 Moments With You I Will Never Forget",
      items: [
        "The moment on our first month anniversary when I gave you that teddy and your face lit up with happiness.",
        "The moment in the office parking when you gave me a surprise kiss and ran inside, and I stood there completely shocked.",
        "The moment we shared our first kiss on that street.",
        "The moment you dressed so beautifully on National Day.",
        "The Christmas night when we left the office and spent time at Mamzar Beach, just you and me.",
        "The moment you came to Sharjah for the first time.",
        "The moment you sat on my lap and tried to hide my hickey with your makeup.",
        "The moment we sat on the grass together at Al Majaz.",
        "The moment we sat and painted together on New Year.",
        "The moment we walked hand in hand at Kite Beach on New Year.",
        "The moment we ate pizza on the beach with candles around us.",
        "The moment you hugged me on your birthday.",
        "The moment we were going back to drop you home after your birthday.",
        "The moment you brought me flowers without any reason.",
        "The moment you got me those two shirts.",
        "The moment you held my arm while we were walking.",
        "The moment you sat on my lap before going home and gave my heart the peace it always looks for.",
        "The moment you told me that you feel like home with me.",
        "The moment you said you didn't want to go home.",
        "The moment you made me try momo for the first time.",
        "The moment I realized these memories are not just moments — they are part of me now.",
      ],
    },
    {
      title: "Chapter Three: 21 Days I Can't Forget With You",
      items: [
        "The day we shared our first kiss.",
        "Your birthday, and how special that day felt to me.",
        "Our Christmas night together.",
        "The way we spent our day on New Year.",
        "The day we went kayaking together.",
        "Our Valentine's Day.",
        "The day we did iftar together at Mamzar Beach.",
        "The day we cooked iftar together.",
        "The day we went to Aya World.",
        "The day we went to Global Village.",
        "The day you woke me up for the office for the first time with your call.",
        "The day we went to watch a movie together for the first time.",
        "The day we went to that game café together.",
        "The day we went Eid shopping together.",
        "The day you dressed in that Pakistani shalwar kameez on Eid and sent me pictures.",
        "The night we spent Chand Raat together, when you let me put mehndi on your hands even though I messed it up.",
        "My birthday, and how you did all the preparations for me.",
        "The day we talked to my mom on video call for the first time.",
        'The day I talked to your mom for the first time, when she called my flowers "kachra" and you couldn\'t stop laughing.',
        "The day before you left for India, when you cried holding those flowers.",
        "The day I realized these days are not just memories — they are part of my heart forever.",
      ],
    },
    {
      title: "Chapter Four: 21 Things I Never Said to You",
      items: [
        "I never told you how much you changed my life just by being yourself.",
        "I never told you how many times I replay our talks in my head.",
        "I never told you how peaceful I feel when you are around.",
        "I never told you how much comfort I get just by sitting close to you.",
        "I never told you how proud I feel when I look at you.",
        "I never told you how your smile fixes my bad days.",
        "I never told you how much I miss you, even when I act normal.",
        "I never told you how safe I feel opening my heart to you.",
        "I never told you how special it feels when you choose me in small ways.",
        "I never told you how much your care means to me.",
        "I never told you how much I admire the way you love.",
        "I never told you how calming your voice is for me.",
        "I never told you how much I love our simple moments together.",
        "I never told you how connected I feel to you.",
        "I never told you how important your trust is to me.",
        "I never told you how much your happiness matters to me.",
        "I never told you how grateful I am for every moment we share.",
        "I never told you how loving you feels natural to me.",
        "I never told you how deeply I Love you.",
        "I never told you how much you mean in my life.",
        "I never told you all of this properly — but I feel it every single day.",
      ],
    },
    {
      title: "Chapter Five: 21 Reasons I Choose You",
      items: [
        "I choose you because being with you feels natural to me.",
        "I choose you because you understand me without forcing me to explain.",
        "I choose you because you listen to me when I am stressed.",
        "I choose you because I can talk to you freely.",
        "I choose you because you give advice with care and maturity.",
        "I choose you because you share your day with me, even the small parts.",
        "I choose you because you make time for me.",
        "I choose you because you make me feel calm.",
        "I choose you because you are real with me, without pretending to be someone else.",
        "I choose you because you are yourself with me.",
        "I choose you because you make normal moments special.",
        "I choose you because your smile feels real.",
        "I choose you because your presence gives me peace.",
        "I choose you because you care deeply.",
        "I choose you because you treat me with respect.",
        "I choose you because you make me feel important.",
        "I choose you because you support me without judging me.",
        "I choose you because you feel like home to me.",
        "I choose you because loving you feels right.",
        "I choose you because I want you in my life.",
        "I choose you — today, tomorrow, and every day.",
      ],
    },
    {
      title: "Chapter Six: 21 Dreams I See With You",
      items: [
        "I dream of more quiet mornings with you, where we wake up slowly and just exist together.",
        "I dream of more walks where we don't need to rush anywhere, just holding hands and talking.",
        "I dream of laughing with you over small, silly things that only make sense to us.",
        "I dream of growing together, step by step, without pressure and without fear.",
        "I dream of supporting each other on hard days, even when words are not enough.",
        "I dream of celebrating our small wins together, no matter how simple they are.",
        "I dream of traveling to new places with you and making memories there.",
        "I dream of doing normal life things with you and finding happiness in them.",
        "I dream of sitting with you after long days and just resting beside each other.",
        "I dream of sharing meals and late-night talks that go on without noticing time.",
        "I dream of learning more about you every day and loving you more because of it.",
        "I dream of creating new memories with you that we will talk about years later.",
        "I dream of being there for you whenever you need me, in every way I can.",
        "I dream of building something real with you, slowly and honestly.",
        "I dream of feeling safe and calm with you, no matter what life brings.",
        "I dream of growing stronger together through everything we face.",
        "I dream of choosing each other again and again, even on difficult days.",
        "I dream of a life where we face things side by side, never alone.",
        "I dream of calling you my home, wherever we are.",
        "I dream of many years filled with moments like these.",
        "I dream of a future where you and I stay together.",
      ],
    },
    {
      title: "Chapter Seven: 21 Thank-Yous You Deserve",
      items: [
        "Thank you for being patient with me on days I'm not at my best.",
        "Thank you for listening to me when I need to talk.",
        "Thank you for caring about small things that matter to me.",
        "Thank you for checking on me and asking how I'm doing.",
        "Thank you for sharing your days with me.",
        "Thank you for making time for me, even when you're busy.",
        "Thank you for calming me when I feel stressed.",
        "Thank you for giving advice without judging me.",
        "Thank you for being yourself with me.",
        "Thank you for trusting me with your thoughts.",
        "Thank you for making me feel comfortable and safe.",
        "Thank you for making normal days feel better.",
        "Thank you for being kind in ways that really matter.",
        "Thank you for understanding me without many words.",
        "Thank you for choosing me in small, quiet ways.",
        "Thank you for bringing peace into my life.",
        "Thank you for making me smile without trying.",
        "Thank you for being part of my everyday life.",
        "Thank you for standing by me.",
        "Thank you for loving me the way you do.",
        "Thank you for being you.",
      ],
    },
    {
      title: "Chapter Eight: 21 Ways You Make My Life Better",
      items: [
        "You make my days feel lighter.",
        "You make me look forward to tomorrow.",
        "You make stressful moments easier to handle.",
        "You make silence feel comfortable.",
        "You make ordinary days feel meaningful.",
        "You make me smile without trying.",
        "You make me feel calm when my mind is busy.",
        "You make me feel understood.",
        "You make me feel supported.",
        "You make me feel less alone.",
        "You make my bad days softer.",
        "You make good days even better.",
        "You make me feel motivated.",
        "You make me feel appreciated.",
        "You make me feel peaceful.",
        "You make me feel steady.",
        "You make me feel closer to life.",
        "You make my heart feel full.",
        "You make my world feel warmer.",
        "You make my life feel more complete.",
        "You make everything better just by being you.",
      ],
    },
    {
      title: "Chapter Nine: 21 Words From You I'll Always Remember",
      items: [
        "The way you say my name.",
        'When you ask me, "Did you eat?"',
        'When you say, "How was your day?"',
        'When you tell me, "I\'m here."',
        'When you say, "Don\'t stress."',
        'When you say, "It\'s okay."',
        'When you say, "I understand."',
        'When you say, "Susu ayi hai," and make everything feel light.',
        'When you say, "I don\'t want to go home."',
        'When you say, "I wish tomorrow was Sunday so I could come."',
        'When you say, "Reach ghar jaldi."',
        'When you say, "Take rest."',
        'When you say, "Eat properly."',
        "When you say you like something, and I can hear it in your voice.",
        'When you ask me, "Did you reach?"',
        'When you say, "Wait."',
        'When you say, "Tell me properly."',
        'When you say, "I\'m listening."',
        'When you say, "Come jaldi."',
        'When you literally say "..." in between our conversation.',
        "When you say these small things and they mean everything to me.",
      ],
    },
    {
      title: "Chapter Ten: 21 Feelings You Give Me",
      items: [
        "You make me feel calm.",
        "You make me feel safe.",
        "You make me feel understood.",
        "You make me feel heard.",
        "You make me feel peaceful.",
        "You make me feel happy without trying.",
        "You make me feel close.",
        "You make me feel warm.",
        "You make me feel steady.",
        "You make me feel comfortable.",
        "You make me feel relaxed.",
        "You make me feel important.",
        "You make me feel cared for.",
        "You make me feel quiet inside.",
        "You make me feel less stressed.",
        "You make me feel connected.",
        "You make me feel full.",
        "You make me feel light.",
        "You make me feel okay.",
        "You make me feel at home.",
        "You make me feel loved.",
      ],
    },
    {
      title: "Chapter Eleven: 21 Little Things I Notice About You",
      items: [
        "I notice the way you fix your hair when you're thinking.",
        "I notice how your face changes when you're excited.",
        "I notice how you smile before you even say anything.",
        "I notice how you get quiet when you're tired.",
        "I notice how you look at me when you feel comfortable.",
        "I notice how you listen fully when I'm talking.",
        "I notice how your voice changes when you're happy.",
        "I notice how you laugh without holding it back.",
        "I notice how you remember small things I forget.",
        "I notice how you check on me in simple ways.",
        "I notice how you care without making it obvious.",
        "I notice how you stay yourself around me.",
        "I notice how you try even when you're tired.",
        "I notice how your mood shows on your face.",
        "I notice how you sit closer without saying anything.",
        "I notice how you get shy sometimes.",
        "I notice how you calm me just by being there.",
        "I notice how you make normal moments feel warm.",
        "I notice how you don't pretend with me.",
        "I notice how you feel familiar to my heart.",
        "I notice you — more than you probably know.",
      ],
    },
    {
      title: "Chapter Twelve: 21 Ways I Care About You",
      items: [
        "I care about how your day went.",
        "I care about whether you've eaten or not.",
        "I care about how you're feeling, even when you don't say much.",
        "I care about your stress and your worries.",
        "I care about your happiness.",
        "I care about your peace.",
        "I care about the small things that matter to you.",
        "I care about your tired days.",
        "I care about your smiles.",
        "I care about your silence too.",
        "I care about being there when you need me.",
        "I care about listening to you properly.",
        "I care about supporting you in your own way.",
        "I care about making things easier for you when you feel overwhelmed.",
        "I care about making you feel comfortable.",
        "I care about your dreams.",
        "I care about your fears, even the quiet ones.",
        "I care about growing with you.",
        "I care about choosing you every day.",
        "I care about us.",
        "I care about you — deeply and honestly.",
      ],
    },
    {
      title: "Chapter Thirteen: 21 Times You Made Me Smile Without Trying",
      items: [
        "When you smile at me without saying anything.",
        "When you laugh at something small.",
        "When you talk excitedly about your day.",
        "When you send me random pictures.",
        "When you tease me gently.",
        "When you make a funny face without realizing it.",
        "When you get shy suddenly.",
        "When you talk nonstop about something you like.",
        "When you check on me during the day.",
        "When you say my name softly.",
        "When you complain in a cute way.",
        "When you laugh at your own jokes.",
        "When you act serious but end up smiling.",
        "When you share something silly with me.",
        "When you remember something small about us.",
        "When you smile while listening to me.",
        "When you make fun of me playfully.",
        "When you say something random out of nowhere.",
        "When you act innocent even when you're not.",
        "When you smile without knowing I'm looking.",
        "When you're just being you.",
      ],
    },
    {
      title: "Chapter Fourteen: 21 Things I Want You to Know",
      items: [
        "I want you to know that I notice you even when you're quiet.",
        "I want you to know that your presence matters more than you think.",
        "I want you to know that you don't have to try with me.",
        "I want you to know that I see your effort.",
        "I want you to know that your small actions stay with me.",
        "I want you to know that I remember the little things you forget.",
        "I want you to know that you don't need to explain yourself to me.",
        "I want you to know that your mood never scares me.",
        "I want you to know that I'm comfortable with your silence.",
        "I want you to know that I like you exactly how you are.",
        "I want you to know that you don't need to be perfect.",
        "I want you to know that I value your honesty.",
        "I want you to know that your presence is enough.",
        "I want you to know that I listen even when you don't notice.",
        "I want you to know that your happiness matters to me.",
        "I want you to know that I care about your peace.",
        "I want you to know that I'm patient with you.",
        "I want you to know that I don't take you lightly.",
        "I want you to know that you matter in my life.",
        "I want you to know that I choose you without forcing anything.",
        "I want you to know that this book exists because of you.",
      ],
    },
    {
      title: "Chapter Fifteen: 21 Random Thoughts I Have About You",
      items: [
        "Sometimes I think about you when I'm doing nothing.",
        "Sometimes I remember your smile for no reason.",
        "Sometimes I hear your voice in my head.",
        "Sometimes I wonder what you're doing at that exact moment.",
        "Sometimes I miss you even when we just talked.",
        "Sometimes I replay small moments we shared.",
        "Sometimes I think about how natural everything feels with you.",
        "Sometimes I smile without realizing why — and it's you.",
        "Sometimes I imagine sitting next to you quietly.",
        "Sometimes I think about the way you look at me.",
        "Sometimes I remember the way you laugh.",
        "Sometimes I think about your habits.",
        "Sometimes I think about how comfortable I feel with you.",
        "Sometimes I wish time slowed down when we're together.",
        "Sometimes I think about future days with you.",
        "Sometimes I think about how you changed my routine.",
        "Sometimes I notice things remind me of you.",
        "Sometimes I feel calm just thinking about you.",
        "Sometimes I miss your presence more than your words.",
        "Sometimes I think about you before sleeping.",
        "Sometimes I realize how often you're on my mind.",
      ],
    },
    {
      title: "Chapter Sixteen: 21 Things That Exist Because of You",
      items: [
        "A smile that comes without effort.",
        "Days that feel a little softer.",
        "Nights that don't feel too long.",
        "A calm I didn't expect.",
        "Conversations I look forward to.",
        "A sense of comfort in small things.",
        "Laughter that feels natural.",
        "Patience where there used to be rush.",
        "A habit of checking my phone with hope.",
        "Moments that feel lighter.",
        "A reason to slow down.",
        "Quiet happiness.",
        "A feeling of ease.",
        "Warm thoughts in between busy hours.",
        "Smiles that stay longer.",
        "Peace in simple routines.",
        "A gentler way of seeing things.",
        "Normal days that feel better.",
        "A steady presence in my life.",
        "Small joys that matter.",
        "This book.",
      ],
    },
    {
      title: "Chapter Seventeen: 21 Things I Like Doing With You",
      items: [
        "I like talking to you about nothing important.",
        "I like listening to you when you start talking excitedly.",
        "I like sitting close to you without saying much.",
        "I like holding your hand while walking.",
        "I like watching your expressions when you're focused.",
        "I like teasing you just a little.",
        "I like making you laugh on purpose.",
        "I like sharing food with you.",
        "I like walking slowly with you, even when we're late.",
        "I like hearing your random thoughts.",
        "I like sitting next to you and feeling comfortable.",
        "I like doing small things with you.",
        "I like spending time with you without any plans.",
        "I like talking to you late when we should be sleeping.",
        "I like seeing you smile because of me.",
        "I like annoying you a bit and then making it better.",
        "I like being quiet with you.",
        "I like sharing moments that feel simple but special.",
        "I like the way time passes when I'm with you.",
        "I like ending my day talking to you.",
        "I like being with you — always.",
      ],
    },
    {
      title: "Chapter Eighteen: 21 Ways I Fall for You Again and Again",
      items: [
        "I fall for you when you smile at me without knowing it.",
        "I fall for you when you look at me like I'm your person.",
        "I fall for you when you talk about your day and include me in it.",
        "I fall for you when you sit close and don't say anything.",
        "I fall for you when you laugh and forget the world.",
        "I fall for you when you care in small, quiet ways.",
        "I fall for you when you tease me and then smile.",
        "I fall for you when you hold my hand like it belongs there.",
        "I fall for you when you check on me without me asking.",
        "I fall for you when you listen to me properly.",
        "I fall for you when you make me feel chosen.",
        "I fall for you when you trust me with your time.",
        "I fall for you when you are just being yourself.",
        "I fall for you when you make ordinary moments feel special.",
        "I fall for you when you say simple things that stay with me.",
        "I fall for you when you sit on my lap and the world feels quiet.",
        "I fall for you when you make me feel calm and alive at the same time.",
        "I fall for you when you smile at me before leaving.",
        "I fall for you when you don't want to go home yet.",
        "I fall for you when you make me feel like home.",
        "I fall for you every time — and I don't get tired of it.",
      ],
    },
    {
      title: "Chapter Nineteen: 21 Things I Want to Keep With You",
      items: [
        "I want to keep choosing you, even on normal days.",
        "I want to keep talking to you the way we do now.",
        "I want to keep sharing small parts of our days.",
        "I want to keep laughing with you over nothing.",
        "I want to keep learning you, slowly.",
        "I want to keep growing together, not apart.",
        "I want to keep being honest with you.",
        "I want to keep supporting you in quiet ways.",
        "I want to keep being patient with you.",
        "I want to keep making time for you.",
        "I want to keep building memories with you.",
        "I want to keep showing up for you.",
        "I want to keep understanding you better.",
        "I want to keep protecting what we have.",
        "I want to keep choosing us.",
        "I want to keep being there on good days.",
        "I want to keep being there on hard days.",
        "I want to keep making you smile.",
        "I want to keep loving you in simple ways.",
        "I want to keep you close to my heart.",
        "I want to keep this — you and me.",
      ],
    },
    {
      title: "Chapter Twenty: 21 Things I Feel When I Think About You",
      items: [
        "When I think about you, I feel calm in a way that slows everything down.",
        "When I think about you, my heart feels warm without any reason.",
        "When I think about you, I feel steady, like I'm not drifting anymore.",
        "When I think about you, I feel grounded, even on busy days.",
        "When I think about you, my mind feels clearer.",
        "When I think about you, things feel lighter than before.",
        "When I think about you, I feel close to you even from far away.",
        "When I think about you, I feel present in the moment.",
        "When I think about you, my thoughts slow down and feel quiet.",
        "When I think about you, I feel safe inside my own head.",
        "When I think about you, I feel softer with myself.",
        "When I think about you, I feel balanced instead of confused.",
        "When I think about you, I feel understood without explaining anything.",
        "When I think about you, I feel peaceful in my chest.",
        "When I think about you, I feel connected in a deep, simple way.",
        "When I think about you, I feel settled where I am.",
        "When I think about you, I feel sure in small, quiet ways.",
        "When I think about you, I feel thankful without counting reasons.",
        "When I think about you, I feel content with the moment.",
        "When I think about you, my heart feels full.",
        "When I think about you, I feel you with me, even when you're not here.",
      ],
    },
    {
      title: "Chapter Twenty-One: 21 Things I Hope You Always Remember",
      items: [
        "I hope you always remember how loved you are.",
        "I hope you always remember you never had to try with me.",
        "I hope you always remember you were enough as you are.",
        "I hope you always remember how much your presence matters.",
        "I hope you always remember your smile stays with me.",
        "I hope you always remember the small moments meant everything.",
        "I hope you always remember you were never alone with me.",
        "I hope you always remember how deeply you were cared for.",
        "I hope you always remember how gently I held you in my heart.",
        "I hope you always remember the comfort we shared.",
        "I hope you always remember how real this was.",
        "I hope you always remember how naturally everything felt.",
        "I hope you always remember how quietly strong you are.",
        "I hope you always remember how much joy you brought into my days.",
        "I hope you always remember how important you became to me.",
        "I hope you always remember how loved you were in every chapter.",
        "I hope you always remember the warmth we created together.",
        "I hope you always remember how safe it felt to be ourselves.",
        "I hope you always remember how deeply you were chosen.",
        "I hope you always remember this book exists because of you.",
        "I hope you always remember you will always have a place in my heart.",
      ],
    },
  ],
  ending: {
    text1:
      "And now, as you close this book, you're also opening a new one — the twenty-first chapter of your life.",
    text2:
      "A chapter where you grow, learn, and become even more of who you already are. I hope you walk into it knowing how deeply you are loved and how much light you bring into the lives around you.",
    signature: "Happy 21st chapter, Mun",
  },
};

function getRandomStains() {
  const stains = [];
  const stainCount = Math.floor(Math.random() * 4) + 3;

  for (let i = 0; i < stainCount; i++) {
    const size = Math.random() * 50 + 25;
    const top = Math.random() * 75 + 5;
    const left = Math.random() * 75 + 5;
    const opacity = Math.random() * 0.06 + 0.03;
    const rotation = Math.random() * 360;

    stains.push(`
      <div class="page-stain" style="
        width: ${size}px;
        height: ${size * (0.5 + Math.random() * 0.8)}px;
        top: ${top}%;
        left: ${left}%;
        background: radial-gradient(ellipse at center, rgba(101, 67, 33, ${opacity}) 0%, rgba(80, 50, 20, ${opacity * 0.6}) 35%, transparent 65%);
        transform: rotate(${rotation}deg);
      "></div>
    `);
  }
  return stains.join("");
}

function createPages(pageWidth, pageHeight) {
  const bookElement = document.getElementById("book");
  bookElement.innerHTML = "";
  let pageNumber = 1;

  const makePageShell = (extraClass = "") => {
    const page = document.createElement("div");
    page.className = `page ${extraClass}`.trim();
    // Force a stable, measurable box for pagination (prevents 1-item-per-page)
    if (pageWidth && pageHeight) {
      page.style.width = `${pageWidth}px`;
      page.style.height = `${pageHeight}px`;
    }
    return page;
  };

  // Cover page (no page number)
  const coverPage = makePageShell("page-cover");
  coverPage.innerHTML = `
    <div class="page-title">Happy</div>
    <div class="page-number-big">21</div>
    <div class="page-subtitle">Chapter of Your Life</div>
  `;
  bookElement.appendChild(coverPage);

  // Intro page (page number 1)
  const introPage = makePageShell("");
  introPage.innerHTML = `
    ${getRandomStains()}
    <div class="page-border"></div>
    <div class="page-edge-left"></div>
    <div class="page-edge-right"></div>
    <div class="chapter-title">${bookContent.intro.title}</div>
    <div class="chapter-intro" style="font-size: 1.1rem; color: #3d2817; font-weight: 500;">${bookContent.intro.subtitle}</div>
    <div class="dedication">${bookContent.intro.dedication}</div>
    <span class="page-number right">${pageNumber++}</span>
  `;
  bookElement.appendChild(introPage);

  // Hidden measurer (attached once) to avoid DOM timing issues
  const measurer = document.createElement("div");
  measurer.style.position = "absolute";
  measurer.style.left = "-10000px";
  measurer.style.top = "0";
  measurer.style.visibility = "hidden";
  measurer.style.pointerEvents = "none";
  document.body.appendChild(measurer);

  const doesOverflow = (pageEl) => {
    // Compare scrollHeight vs clientHeight on the page itself.
    // Absolute-positioned decorations won't affect this.
    return pageEl.scrollHeight - pageEl.clientHeight > 1;
  };

  bookContent.chapters.forEach((chapter) => {
    let i = 0;
    let chapterItemNumber = 0;

    while (i < chapter.items.length) {
      const page = makePageShell("");
      // Base decorations
      let content = `
        ${getRandomStains()}
        <div class="page-border"></div>
        <div class="page-edge-left"></div>
        <div class="page-edge-right"></div>
      `;

      // Chapter title only on the first page of the chapter
      const isFirstChapterPage = chapterItemNumber === 0;
      if (isFirstChapterPage) {
        content += `<div class="chapter-title">${chapter.title}</div>`;
      }

      // Start item list container
      content += `<div class="chapter-items">`;

      page.innerHTML = content + `</div>`; // close container (we'll add items by DOM below)
      // Add page number
      const isLeftPage = pageNumber % 2 === 0;
      const pageNumSpan = document.createElement("span");
      pageNumSpan.className = `page-number ${isLeftPage ? "left" : "right"}`;
      pageNumSpan.textContent = String(pageNumber++);
      page.appendChild(pageNumSpan);

      // Prepare for measurement: move to measurer
      measurer.appendChild(page);

      const itemsContainer = page.querySelector(".chapter-items");

      // Add items until we would overflow
      let addedAny = false;
      while (i < chapter.items.length) {
        const itemText = chapter.items[i];
        const testNumber = chapterItemNumber + 1;

        const itemEl = document.createElement("div");
        itemEl.className = "content-item";
        itemEl.innerHTML = `<span class="item-number">${testNumber}.</span><span class="item-text">${itemText}</span>`;
        itemsContainer.appendChild(itemEl);

        // Add a tiny spacer at end to ensure bottom line doesn't touch page edge
        // (we keep it constant so measurement is stable)
        let spacer = itemsContainer.querySelector(".bottom-safe-spacer");
        if (!spacer) {
          spacer = document.createElement("div");
          spacer.className = "bottom-safe-spacer";
          spacer.style.height = "22px";
          spacer.style.width = "1px";
          itemsContainer.appendChild(spacer);
        } else {
          itemsContainer.appendChild(spacer);
        }

        if (doesOverflow(page)) {
          // Remove the item we just added (and keep spacer at end)
          itemsContainer.removeChild(itemEl);

          // If we couldn't add even one item, force-add it to avoid infinite loop.
          // This should be rare (only for extremely long single items).
          if (!addedAny) {
            itemsContainer.insertBefore(itemEl, spacer);
            addedAny = true;
            chapterItemNumber++;
            i++;
          }
          break; // start a new page
        } else {
          // It fits, keep it and move on
          addedAny = true;
          chapterItemNumber++;
          i++;
        }
      }

      // Move finalized page from measurer into the actual book
      measurer.removeChild(page);
      bookElement.appendChild(page);
    }
  });

  // Ending page (no chapter items)
  const endingPage = makePageShell("ending-page");
  endingPage.innerHTML = `
    ${getRandomStains()}
    <div class="page-border"></div>
    <div class="page-edge-left"></div>
    <div class="page-edge-right"></div>
    <div class="ending-text">${bookContent.ending.text1}</div>
    <div class="ending-text">${bookContent.ending.text2}</div>
    <div style="font-family: 'Cinzel', Georgia, serif; font-size: 1.3rem; font-weight: 600; color: #3d2817; margin-top: 25px; text-align: center;">Happy 21st, Mun 🤍</div>
  `;
  bookElement.appendChild(endingPage);

  // Closing trigger page (blank) — flipping onto this will close the book to the back cover.
  const closingTrigger = makePageShell("closing-trigger");
  closingTrigger.innerHTML = `
    ${getRandomStains()}
    <div class="page-border"></div>
    <div class="page-edge-left"></div>
    <div class="page-edge-right"></div>
    <div style="height: 100%; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond', Georgia, serif; font-size:1.2rem; opacity:0.75;">
      The End
    </div>
  `;
  bookElement.appendChild(closingTrigger);

  // Cleanup measurer
  document.body.removeChild(measurer);
}

let isClosingToBack = false;
let isOnBackCover = false;
let reopenToIndex = null;

function closeBookToBackCover() {
  const coverContainer = document.getElementById("book-cover-container");
  coverContainer.classList.remove("show-back");
  const bookContainer = document.getElementById("book-container");

  // Fade out the book pages
  bookContainer.style.opacity = "0";
  bookContainer.style.transition = "all 0.8s ease";

  setTimeout(() => {
    // Destroy the page flip instance (prevents stray listeners)
    try {
      pageFlipInstance?.destroy?.();
    } catch (_) {}

    // Show the back cover
    bookContainer.classList.add("hidden");
    bookContainer.style.opacity = "";
    bookContainer.style.transition = "";

    coverContainer.classList.add("show-back");
    isOnBackCover = true;
    coverContainer.style.display = "";
    coverContainer.style.opacity = "1";
    coverContainer.style.transition = "all 0.8s ease";

    // Ensure the cover is visually "closed"
    const book3d = coverContainer.querySelector(".book-3d");
    if (book3d) {
      book3d.style.animation = "none";
      book3d.style.transform = "rotateY(180deg) rotateX(5deg)";
    }

    isClosingToBack = false;
  }, 800);
}

async function openFromBackCover() {
  if (!isOnBackCover) return;

  const coverContainer = document.getElementById("book-cover-container");
  const bookContainer = document.getElementById("book-container");

  // Hide back cover and reopen the book view
  coverContainer.style.opacity = "0";
  coverContainer.style.transition = "all 0.6s ease";

  setTimeout(async () => {
    coverContainer.style.display = "none";
    coverContainer.classList.remove("show-back");
    bookContainer.classList.remove("hidden");
    isOnBackCover = false;

    await initBook();

    // After re-initialization, jump back to the last real page (not the closing trigger).
    try {
      if (typeof reopenToIndex === "number" && reopenToIndex >= 0) {
        pageFlipInstance?.turnToPage?.(reopenToIndex);
      }
    } catch (_) {}
  }, 600);
}

async function initBook() {
  const bookElement = document.getElementById("book");
  const isMobile = window.innerWidth <= 768;
  const isPortrait = window.innerHeight > window.innerWidth;

  let pageWidth, pageHeight;

  if (isMobile) {
    if (isPortrait) {
      pageWidth = Math.min(window.innerWidth * 0.88, 340);
      pageHeight = Math.min(window.innerHeight * 0.68, 500);
    } else {
      pageWidth = Math.min(window.innerWidth * 0.42, 320);
      pageHeight = Math.min(window.innerHeight * 0.78, 460);
    }
  } else {
    pageWidth = 400;
    pageHeight = 550;
  }

  // Wait for fonts and layout so pagination measurements are accurate
  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  } catch (_) {}
  await new Promise((r) => requestAnimationFrame(() => r()));

  // Create pages using the SAME dimensions we pass to PageFlip
  createPages(pageWidth, pageHeight);

  // Ensure container has the correct size before PageFlip reads it
  bookElement.style.width = `${pageWidth * 2}px`;
  bookElement.style.height = `${pageHeight}px`;

  pageFlipInstance = new PageFlip(bookElement, {
    width: pageWidth,
    height: pageHeight,
    size: "fixed",
    minWidth: pageWidth,
    maxWidth: pageWidth,
    minHeight: pageHeight,
    maxHeight: pageHeight,
    maxShadowOpacity: 0.5,
    showCover: true,
    mobileScrollSupport: true,
  });

  pageFlipInstance.loadFromHTML(document.querySelectorAll(".page"));

  // When the reader flips onto the very last page (our closing trigger),
  // automatically close the book and show the back cover.
  // Play sound as soon as a flip starts (some devices miss the 'flip' event timing)
  pageFlipInstance.on("changeState", (state) => {
    try {
      const s = typeof state === "string" ? state : state?.data;
      if (s === "flipping") playFlipSound();
    } catch (_) {}
  });

  pageFlipInstance.on("flip", () => {
    playFlipSound();
    if (isClosingToBack) return;
    const current = pageFlipInstance.getCurrentPageIndex();
    const total = pageFlipInstance.getPageCount();
    if (current === total - 1) {
      isClosingToBack = true;
      // Reopen from the back cover to the last readable page (the one before the trigger)
      reopenToIndex = Math.max(0, total - 2);
      setTimeout(() => closeBookToBackCover(), 350);
    }
  });

  // Swipe / drag instruction text stays
  const hint = document.querySelector(".flip-hint");
  if (hint) hint.style.display = "block";

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      pageFlipInstance.flipPrev();
    } else if (e.key === "ArrowRight") {
      pageFlipInstance.flipNext();
    }
  });
}

const coverEl = document.getElementById("book-cover-container");

// Open from the *front* cover on click. If the back cover is showing, clicking does nothing —
// you can only swipe back to reopen.
coverEl.addEventListener("click", () => {
  if (isOnBackCover) return;

  const coverContainer = document.getElementById("book-cover-container");
  coverContainer.classList.remove("show-back");
  const bookContainer = document.getElementById("book-container");

  const book3d = coverContainer.querySelector(".book-3d");
  if (book3d) {
    book3d.style.animation = "none";
    book3d.style.transform = "rotateY(-180deg) scale(0.8)";
  }

  coverContainer.style.opacity = "0";
  coverContainer.style.transition = "all 0.8s ease";

  setTimeout(() => {
    coverContainer.style.display = "none";
    bookContainer.classList.remove("hidden");
    initBook();
  }, 800);
});

// Swipe-back gesture to reopen when the back cover is showing
let swipeStartX = null;
let swipeStartY = null;

function onSwipeStart(e) {
  if (!isOnBackCover) return;
  const t = e.touches ? e.touches[0] : e;
  swipeStartX = t.clientX;
  swipeStartY = t.clientY;
}

function onSwipeEnd(e) {
  if (!isOnBackCover) return;
  if (swipeStartX == null || swipeStartY == null) return;

  const t = e.changedTouches ? e.changedTouches[0] : e;
  const dx = t.clientX - swipeStartX;
  const dy = t.clientY - swipeStartY;

  swipeStartX = null;
  swipeStartY = null;

  // Require a clear horizontal swipe to the right (backwards)
  if (Math.abs(dx) > 70 && Math.abs(dy) < 60 && dx > 0) {
    openFromBackCover();
  }
}

coverEl.addEventListener("touchstart", onSwipeStart, { passive: true });
coverEl.addEventListener("touchend", onSwipeEnd, { passive: true });
coverEl.addEventListener("mousedown", onSwipeStart);
coverEl.addEventListener("mouseup", onSwipeEnd);
