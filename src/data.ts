/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WordDetail, QuizQuestion, LadderQuestion } from './types';

export const VOCABULARY_DATA: WordDetail[] = [
  {
    id: "1",
    word: "Royal Ballroom",
    ipa: "/ˈrɔɪəl ˈbɔːlruːm/",
    zh: "皇家宴會廳",
    emoji: "🏰",
    explanation: "城堡裡舉辦盛大派對和跳舞的漂亮大廳！✨",
    en_example: "Tom looked in the Royal Ballroom.",
    zh_example: "湯姆朝皇家宴會廳裡面看去。"
  },
  {
    id: "2",
    word: "Streamers",
    ipa: "/ˈstriːmərz/",
    zh: "五彩裝飾彩帶",
    emoji: "🎗️",
    explanation: "用來佈置派對、掛在天花板上的彩色長條紙帶，隨風飄動超美麗！🎈",
    en_example: "Streamers hung from the ceiling.",
    zh_example: "彩帶從天花板上掛了下來。"
  },
  {
    id: "3",
    word: "Ceiling",
    ipa: "/ˈsiːlɪŋ/",
    zh: "天花板",
    emoji: "🏠",
    explanation: "房間裡的最上方頂棚，和地板相對的地方！🚪",
    en_example: "Beautiful balloons touched the ceiling.",
    zh_example: "漂亮的氣球碰到了天花板。"
  },
  {
    id: "4",
    word: "Servants",
    ipa: "/ˈsɜːrvənts/",
    zh: "僕人 / 助手",
    emoji: "🧑‍🍳",
    explanation: "在皇宮裡辛勤工作，幫忙擦桌子、擺鮮花、做美味食物的好幫手！🧹",
    en_example: "Servants were putting flowers on the tables.",
    zh_example: "僕人們正在把鮮花擺到桌子上。"
  },
  {
    id: "5",
    word: "Peeked",
    ipa: "/piːkt/",
    zh: "偷看 / 探頭看",
    emoji: "👀",
    explanation: "小聲地、悄悄地從某個地方探出小腦袋，瞇著眼睛偷看！🙈",
    en_example: "Cat peeked out of Tom's pocket.",
    zh_example: "貓咪從湯姆的口袋裡探出頭來偷看。"
  },
  {
    id: "6",
    word: "Pocket",
    ipa: "/ˈpɒkɪt/",
    zh: "口袋",
    emoji: "🧥",
    explanation: "衣服或褲子上面，可以用來裝糖果、小鑰匙或是小寵物的小袋子！🍬",
    en_example: "Tom had a cute kitten in his jacket pocket.",
    zh_example: "湯姆的外套口袋裡有一隻可愛的小貓。"
  },
  {
    id: "7",
    word: "Appeared",
    ipa: "/əˈpɪərd/",
    zh: "突然出現 / 冒出來",
    emoji: "🌟",
    explanation: "本來沒看見，突然間咻地一下出現在眼睛前面！🧙‍♂️",
    en_example: "Just then Dirk appeared.",
    zh_example: "就在那時候，德克突然出現了。"
  },
  {
    id: "8",
    word: "Fool",
    ipa: "/fuːl/",
    zh: "傻瓜 / 笨蛋",
    emoji: "🤪",
    explanation: "德克用來開玩笑或生氣時叫人笨手笨腳的詞。小讀者不要亂學喔！🤐",
    en_example: "\"There you are, fool!\" Dirk snapped.",
    zh_example: "「你這傻瓜，原來你在這！」德克厲聲說。"
  },
  {
    id: "9",
    word: "Snapped",
    ipa: "/snæpt/",
    zh: "厲聲說 / 兇巴巴地說",
    emoji: "🗣️",
    explanation: "說話口氣又快又兇，一聽就知道他現在正在大發脾氣！⚡",
    en_example: "\"Come with me!\" he snapped at Tom.",
    zh_example: "「跟我來！」他粗魯地朝湯姆嚷嚷。"
  },
  {
    id: "10",
    word: "At once",
    ipa: "/æt wʌns/",
    zh: "立刻 / 馬上",
    emoji: "⚡",
    explanation: "一秒鐘都不能等，要火速、趕快去做！🏃‍♂️💨",
    en_example: "The queen wants to see you at once.",
    zh_example: "女王想要立刻見你。"
  },
  {
    id: "11",
    word: "Throne Room",
    ipa: "/θroʊn ruːm/",
    zh: "覲見大廳 / 王座廳",
    emoji: "👑",
    explanation: "城堡裡最華麗、最高的房間，國王和女王坐在亮晶晶的王座上接見客人的地方！💎",
    en_example: "Tom hurried after Dirk to the Throne Room.",
    zh_example: "湯姆急忙跟著德克走進王座廳。"
  },
  {
    id: "12",
    word: "Sneeze",
    ipa: "/sniːz/",
    zh: "打噴嚏",
    emoji: "🤧",
    explanation: "鼻子吸到灰塵或貓毛，忍不住「哈啾——！」大聲噴氣的動作！🌫️",
    en_example: "Cat might make the queen sneeze.",
    zh_example: "貓咪可能會讓女王打噴嚏。"
  },
  {
    id: "13",
    word: "Wriggled",
    ipa: "/ˈrɪɡəld/",
    zh: "扭動 / 抽動",
    emoji: "🐛",
    explanation: "像毛毛蟲一樣，左右歪歪扭扭地動來動去，非常俏皮！🐶",
    en_example: "The queen's nose wriggled.",
    zh_example: "女王的鼻子扭了扭（感到癢癢的）。"
  },
  {
    id: "14",
    word: "Handkerchief",
    ipa: "/ˈhæŋkərtʃɪf/",
    zh: "手帕",
    emoji: "🧼",
    explanation: "打噴嚏或擦眼淚時，隨身攜帶、軟綿綿的小手帕！👃",
    en_example: "She pulled out her handkerchief.",
    zh_example: "她掏出她的手帕。"
  },
  {
    id: "15",
    word: "Majesty",
    ipa: "/ˈmædʒəsti/",
    zh: "陛下 (對國王/女王尊稱)",
    emoji: "👑",
    explanation: "跟女王或國王講話時，最恭敬、最崇高的招呼詞！🏰",
    en_example: "\"Good morning, Your Majesty,\" said Tom.",
    zh_example: "「早安，女王陛下，」湯姆說。"
  },
  {
    id: "16",
    word: "Gift",
    ipa: "/ɡɪft/",
    zh: "生日禮物",
    emoji: "🎁",
    explanation: "在好朋友生日或聖誕節，用紙盒精心包裝、送給他帶來驚喜的小驚喜！🎉",
    en_example: "I need a special gift for Prince Eric.",
    zh_example: "我需要送給艾瑞克王子一份特別的禮物。"
  },
  {
    id: "17",
    word: "Hiss",
    ipa: "/hɪs/",
    zh: "發出生氣嘶叫聲",
    emoji: "🐱⚡",
    explanation: "貓咪生氣、毛豎起來的時候，喉嚨裡發出「噓——」的高聲警告！😾",
    en_example: "A loud hiss came from Tom's pocket.",
    zh_example: "湯姆的口袋裡傳來了一聲響亮的貓咪嘶哈聲。"
  },
  {
    id: "18",
    word: "Claws",
    ipa: "/klɔːz/",
    zh: "尖銳的爪子",
    emoji: "🐾",
    explanation: "貓咪腳掌掌下面，藏著可以伸出來、尖尖的、用來抓人或抓沙發的小指甲！😼",
    en_example: "Tom felt Cat's sharp claws in his pocket.",
    zh_example: "湯姆感覺到口袋裡貓咪那銳利的爪子。"
  }
];

export const FULL_STORY_PARAGRAPHS = [
  {
    id: 1,
    en: "Tom looked in the {Royal Ballroom}. Streamers hung from the {ceiling}. Servants were putting flowers on the tables. \"What's going on?\" Tom asked.",
    zh: "湯姆朝皇家宴會廳裡望去。彩帶從天花板上掛下來。僕人們正在桌上擺放鮮花。「發生了什麼事？」湯姆問道。"
  },
  {
    id: 2,
    en: "Cat {peeked} out of Tom's {pocket}. \"There's a birthday party tomorrow,\" she said. \"I heard Cook talking about it.\"",
    zh: "貓咪從湯姆的口袋裡探出頭來偷看。「明天有一場生日派對，」她說，「我聽到廚師在談論這件事。」"
  },
  {
    id: 3,
    en: "\"Whose birthday is it?\" Tom asked. \"Prince Eric's,\" Cat said.",
    zh: "「是誰的生日呀？」湯姆問。「艾瑞克王子的，」貓咪說。"
  },
  {
    id: 4,
    en: "Just then Dirk {appeared}. \"There you are, {fool}!\" he {snapped} at Tom. \"The queen wants to see you {at once}. Come with me!\"",
    zh: "就在那時，德克出現了。「你這傻瓜，原來你在這！」他兇巴巴地對湯姆說。「女王要立刻見你。跟我來！」"
  },
  {
    id: 5,
    en: "Tom hurried after Dirk to the {Throne Room}. Cat was still in his {pocket}. \"Uh-oh,\" Tom thought. \"Cat might make the queen {sneeze}.\"",
    zh: "湯姆急忙跟著德克前往王座廳。貓咪還在他的口袋裡。「噢不，」湯姆想，「貓咪可能會讓女王打噴嚏。」"
  },
  {
    id: 6,
    en: "The queen sat on her throne. Tom bowed. \"Good morning, Your {Majesty}.\" The queen's nose {wriggled}. She pulled out her {handkerchief}.",
    zh: "女王坐在她的王座上。湯姆鞠躬。「早安，女王陛下。」女王的鼻子扭了扭。她掏出了手帕。"
  },
  {
    id: 7,
    en: "\"Ah-choo!\" The queen {sneezed}. \"Tom, I need your help again,\" she said. \"Anything, Your {Majesty},\" Tom said.",
    zh: "「哈——啾！」女王打了個噴嚏。「湯姆，我再次需要你的幫忙，」她說。「樂意效勞，女王陛下，」湯姆回答。"
  },
  {
    id: 8,
    en: "The queen blew her nose. \"Prince Eric's birthday is tomorrow,\" she said. \"And I need a special {gift} for him.\"",
    zh: "女王擦了擦鼻子。「明天就是艾瑞克王子的生日了，」她說，「而且我需要送給他一份特別的禮物。」"
  },
  {
    id: 9,
    en: "\"What does Prince Eric want?\" Tom asked. \"Prince Eric loves animals,\" the queen said. \"He wants a pet. I want to get him a dog.\"",
    zh: "「艾瑞克王子想要什麼呢？」湯姆問。「艾瑞克王子熱愛動物，」女王說，「他想要一隻寵物。我打算送他一隻狗。」"
  },
  {
    id: 10,
    en: "\"A dog?\" Tom repeated. {Hiss}! A loud sound came from Tom's {pocket}. Then he felt something sharp—Cat's {claws}!",
    zh: "「一隻狗？」湯姆重複了一遍。嘶——！一聲響亮的嘶哈聲從湯姆的口袋裡傳了出來。接著，他感覺到一陣尖銳的刺痛——是貓咪的爪子！"
  }
];

export const LITTLE_FOX_QUESTIONS: QuizQuestion[] = [
  {
    question: "Who wanted to see Tom?",
    zh_translation: "誰想要見湯姆？",
    options: ["Princess Mary", "the queen", "Prince Eric"],
    answer: "the queen",
    hint: "提示：Dirk snapped that THIS person wanted to see Tom at once in the Throne Room! 👑"
  },
  {
    question: "Which is true?",
    zh_translation: "下面哪一個敘述是真的？",
    options: [
      "The queen wants to give Prince Eric a cat.",
      "Cat hissed when she heard about a dog.",
      "Dirk took Tom to the Royal Ballroom."
    ],
    answer: "Cat hissed when she heard about a dog.",
    hint: "提示：Cats famously do NOT like dogs! She made a loud sound from Tom's pocket! 😾"
  },
  {
    question: "What did Tom feel in his pocket?",
    zh_translation: "湯姆在口袋裡感覺到了什麼？",
    options: ["Cat's tail", "Cat's teeth", "Cat's claws"],
    answer: "Cat's claws",
    hint: "提示：Ouch! It was something sharp! Cat has very sharp nails. 🐾"
  },
  {
    question: "Whose birthday party were the servants getting ready for?",
    zh_translation: "僕人們正在為誰的生日派對做準備？",
    options: ["the king's", "Prince Eric's", "the queen's"],
    answer: "Prince Eric's",
    hint: "提示：A birthday party tomorrow for the animal lover! 🎂"
  },
  {
    question: "What does Prince Eric love?",
    zh_translation: "艾瑞克王子熱愛什麼？",
    options: ["streamers", "flowers", "animals"],
    answer: "animals",
    hint: "提示：The queen said he loves these, wants a pet, and wants a dog! 🐶🐱🐰"
  }
];

export const USEFUL_SENTENCES = [
  {
    id: 1,
    sentence: "What's going on?",
    zh: "發生了什麼事？ / 怎麼了？",
    context: "課文情境：湯姆看到宴會廳在熱鬧地佈置，好奇地問「發生了什麼事？」。💭",
    examples: [
      "看到同學圍在一起吵鬧或看東西時，你可以走過去問：\"What's going on?\"",
      "回到家發現客廳亂七八糟、到處都是紙屑時，你可以問媽媽：\"What's going on?\""
    ]
  },
  {
    id: 2,
    sentence: "Come with me!",
    zh: "跟我來！ / 跟我一起走！",
    context: "課文情境：德克叫湯姆立刻去見女王，對他說「跟我來！」。🏃‍♂️",
    examples: [
      "在學校下課時，你想叫朋友一起去福利社或圖書館，可以對他說：\"Come with me!\"",
      "在公園玩耍，你想帶弟弟妹妹去看一隻漂亮的蝴蝶，可以說：\"Come with me!\""
    ]
  },
  {
    id: 3,
    sentence: "I need your help.",
    zh: "我需要你的幫忙。",
    context: "課文情境：女王一見到湯姆，就急忙對他說「我需要你的幫忙」。🤝",
    examples: [
      "寫作業遇到不會的題目，你可以對老師或爸爸媽媽說：\"I need your help.\"",
      "力氣太小打不開水壺蓋子，你可以把水壺拿給同學說：\"I need your help.\""
    ]
  }
];

export const USEFUL_SENTENCES_QUIZ = [
  {
    situation: "你在學校操場，看到好多同學聚在一起興奮地圍觀著，你想過去問發生了什麼事，你應該說：",
    options: ["I need your help.", "What's going on?", "Come with me!"],
    answer: "What's going on?",
  },
  {
    situation: "你正在摺一隻高難度的紙飛機，怎麼也摺不好，你想對爸爸說你需要幫助，你應該說：",
    options: ["What's going on?", "Come with me!", "I need your help."],
    answer: "I need your help.",
  },
  {
    situation: "下課鐘聲響了，你急著想帶你的好朋友去看你剛在花圃發現的可愛小金龜子，你會對他說：",
    options: ["Come with me!", "I need your help.", "What's going on?"],
    answer: "Come with me!",
  }
];

export const LADDER_QUESTIONS_BANK: LadderQuestion[] = [
  {
    zh_question: "皇家宴會廳 🏰",
    options: ["Throne Room", "Royal Ballroom", "Ceiling", "Pocket"],
    answer: "Royal Ballroom",
    emoji: "🏰"
  },
  {
    zh_question: "五彩裝飾彩帶 🎗️",
    options: ["Streamers", "Gift", "Servants", "Claws"],
    answer: "Streamers",
    emoji: "🎗️"
  },
  {
    zh_question: "偷看 / 探頭窺視 👀",
    options: ["Sneeze", "Snapped", "Peeked", "Wriggled"],
    answer: "Peeked",
    emoji: "👀"
  },
  {
    zh_question: "天花板 🏠",
    options: ["Ceiling", "Pocket", "Throne Room", "Gift"],
    answer: "Ceiling",
    emoji: "🏠"
  },
  {
    zh_question: "跟我來！ 🏃‍♂️💨",
    options: ["What's going on?", "Come with me!", "I need your help.", "Play with me!"],
    answer: "Come with me!",
    emoji: "🏃‍♂️💨"
  },
  {
    zh_question: "貓咪尖銳的爪子 🐾",
    options: ["Servants", "Claws", "Hiss", "Sneeze"],
    answer: "Claws",
    emoji: "🐾"
  },
  {
    zh_question: "衣服的口袋 🧥",
    options: ["Streamers", "Gift", "Pocket", "Handkerchief"],
    answer: "Pocket",
    emoji: "🧥"
  },
  {
    zh_question: "我需要你的幫忙。 🤝",
    options: ["What's going on?", "I need your help.", "Come with me!", "Thank you."],
    answer: "I need your help.",
    emoji: "🤝"
  },
  {
    zh_question: "打噴嚏 哈啾！ 🤧",
    options: ["Sneeze", "Wriggled", "Snapped", "Peeked"],
    answer: "Sneeze",
    emoji: "🤧"
  },
  {
    zh_question: "生日禮物 🎁",
    options: ["Royal Ballroom", "Streamers", "Gift", "Claws"],
    answer: "Gift",
    emoji: "🎁"
  }
];

export const WORKSHEET_DATA = {
  multipleChoice: [
    {
      id: 1,
      question: "Why are there decorations in the ballroom?",
      zh_question: "為什麼宴會廳裡有裝飾品？",
      options: [
        "(A) For a magic show.",
        "(B) For Prince Eric's birthday party.",
        "(C) For Dirk's party."
      ],
      answer: "(B) For Prince Eric's birthday party.",
      emoji: "🎈"
    },
    {
      id: 2,
      question: "Why does the Queen sneeze?",
      zh_question: "為什麼女王打噴嚏？",
      options: [
        "(A) She is sick.",
        "(B) The room is cold.",
        "(C) Cat is in Tom's pocket."
      ],
      answer: "(C) Cat is in Tom's pocket.",
      emoji: "🤧"
    }
  ],
  trueFalse: [
    {
      id: 1,
      question: "Prince Eric likes animals.",
      zh_question: "艾瑞克王子熱愛動物。",
      answer: "True",
      emoji: "🐰"
    },
    {
      id: 2,
      question: "Cat is happy to hear about the dog.",
      zh_question: "貓咪聽到要養狗的消息很高興。",
      answer: "False",
      emoji: "😾"
    }
  ],
  shortAnswer: {
    question: "The Queen wants to get a dog. Does Cat like dogs? (Yes or No)",
    zh_question: "女王想要一隻狗。貓咪喜歡狗嗎？(請選 Yes 或 No)",
    options: ["Yes", "No"],
    answer: "No",
    emoji: "🐈🐕"
  }
};
