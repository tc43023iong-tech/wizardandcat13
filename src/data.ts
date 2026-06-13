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
    explanation: "A beautiful big hall in a castle for grand parties and dancing! (城堡裡舉辦盛大派對和跳舞的漂亮大廳！✨)",
    en_example: "Tom looked in the Royal Ballroom.",
    zh_example: "湯姆朝皇家宴會廳裡面看去。"
  },
  {
    id: "2",
    word: "Streamers",
    ipa: "/ˈstriːmərz/",
    zh: "五彩裝飾彩帶",
    emoji: "🎗️",
    explanation: "Long colored paper strips hung from the ceiling to decorate parties. (用來佈置派對、掛在天花板上的彩色長條紙帶！🎈)",
    en_example: "Streamers hung from the ceiling.",
    zh_example: "彩帶從天花板上掛了下來。"
  },
  {
    id: "3",
    word: "Ceiling",
    ipa: "/ˈsiːlɪŋ/",
    zh: "天花板",
    emoji: "🏠",
    explanation: "The top surface of a room, opposite to the floor. (房間最上方、與地板相對的頂部天花板！🚪)",
    en_example: "Beautiful balloons touched the ceiling.",
    zh_example: "漂亮的氣球碰到了天花板。"
  },
  {
    id: "4",
    word: "Servants",
    ipa: "/ˈsɜːrvənts/",
    zh: "僕人 / 助手",
    emoji: "🧑‍🍳",
    explanation: "Helpers who work hard in the palace to set up flowers and prepare food. (在皇宮裡辛勤工作、幫忙佈置鮮花與食物的幫手！🧹)",
    en_example: "Servants were putting flowers on the tables.",
    zh_example: "僕人們正在把鮮花擺到桌子上。"
  },
  {
    id: "5",
    word: "Peeked",
    ipa: "/piːkt/",
    zh: "偷看 / 探頭看",
    emoji: "👀",
    explanation: "Looking secretly and quickly from somewhere. (小聲地、悄悄地從某個地方探出小腦袋偷看！🙈)",
    en_example: "Cat peeked out of Tom's pocket.",
    zh_example: "貓咪從湯姆的口袋裡探出頭來偷看。"
  },
  {
    id: "6",
    word: "Pocket",
    ipa: "/ˈpɒkɪt/",
    zh: "口袋",
    emoji: "🧥",
    explanation: "A small bag on clothes to keep candies, keys, or small pets! (衣服外套上的小袋子，用來裝糖果、鑰匙或小貓咪！🍬)",
    en_example: "Tom had a cute kitten in his jacket pocket.",
    zh_example: "湯姆的外套口袋裡有一隻可愛的小貓。"
  },
  {
    id: "7",
    word: "Appeared",
    ipa: "/əˈpɪərd/",
    zh: "突然出現",
    emoji: "🌟",
    explanation: "Coming into view suddenly when not seen before. (本來沒看見，突然間咻地一下出現在眼睛前面！🧙‍♂️)",
    en_example: "Just then Dirk appeared.",
    zh_example: "就在那時候，德克突然出現了。"
  },
  {
    id: "9",
    word: "Snapped",
    ipa: "/snæpt/",
    zh: "厲聲說 / 兇巴巴地說",
    emoji: "🗣️",
    explanation: "Speaking quickly and angrily in a loud voice. (說話速度又快又兇，一聽就知道正在生氣！⚡)",
    en_example: "\"Come with me!\" he snapped at Tom.",
    zh_example: "「跟我來！」他粗魯地朝湯姆嚷嚷。"
  },
  {
    id: "10",
    word: "At once",
    ipa: "/æt wʌns/",
    zh: "立刻 / 馬上",
    emoji: "⚡",
    explanation: "Right now without a second of waiting; very fast! (一秒鐘都不能等，要火速、趕快去做！🏃‍♂️💨)",
    en_example: "The queen wants to see you at once.",
    zh_example: "女王想要立刻見你。"
  },
  {
    id: "11",
    word: "Throne Room",
    ipa: "/θroʊn ruːm/",
    zh: "覲見大廳 / 王座廳",
    emoji: "👑",
    explanation: "The most grand room in a castle where the king or queen sits on their throne. (城堡裡最華麗的房間，女王坐在寶座上接見大家的地方！💎)",
    en_example: "Tom hurried after Dirk to the Throne Room.",
    zh_example: "湯姆急忙跟著德克走進王座廳。"
  },
  {
    id: "12",
    word: "Sneeze",
    ipa: "/sniːz/",
    zh: "打噴嚏",
    emoji: "🤧",
    explanation: "Making a sudden loud 'Ah-choo!' when dust or cat hair gets in your nose. (鼻子吸到灰塵而大聲噴氣的動作「哈啾」！🌫️)",
    en_example: "Cat might make the queen sneeze.",
    zh_example: "貓咪可能會讓女王打噴嚏。"
  },
  {
    id: "13",
    word: "Wriggled",
    ipa: "/ˈrɪɡəld/",
    zh: "扭動 / 抽動",
    emoji: "🐛",
    explanation: "Moving from side to side like a little worm; very cute! (像小蟲子或狗狗鼻子，左右歪歪扭扭地動來動去！🐶)",
    en_example: "The queen's nose wriggled.",
    zh_example: "女王的鼻子扭了扭。"
  },
  {
    id: "14",
    word: "Handkerchief",
    ipa: "/ˈhæŋkərtʃɪf/",
    zh: "手帕",
    emoji: "🧼",
    explanation: "A soft cloth carried with you to wipe your nose or tears. (隨身攜帶、打噴嚏或擦眼淚用的軟綿飾小手帕！👃)",
    en_example: "She pulled out her handkerchief.",
    zh_example: "她掏出她的手帕。"
  },
  {
    id: "15",
    word: "Majesty",
    ipa: "/ˈmædʒəsti/",
    zh: "陛下",
    emoji: "👑",
    explanation: "A grand title used when speaking politely to a king or queen. (與國王或女王說話時，最恭敬的稱呼「陛下」！🏰)",
    en_example: "\"Good morning, Your Majesty,\" said Tom.",
    zh_example: "「早安，女王陛下，」湯姆說。"
  },
  {
    id: "17",
    word: "Hiss",
    ipa: "/hɪs/",
    zh: "生氣嘶叫",
    emoji: "🐱⚡",
    explanation: "An angry warning sound made by cats when they are upset. (貓咪生氣憤怒時，喉嚨裡發出的「噓——」聲警告！😾)",
    en_example: "A loud hiss came from Tom's pocket.",
    zh_example: "湯姆的口袋裡傳來了一聲響亮的貓咪嘶聲。"
  },
  {
    id: "18",
    word: "Claws",
    ipa: "/klɔːz/",
    zh: "尖銳的爪子",
    emoji: "🐾",
    explanation: "Specific sharp nails on a cat or animal's paws. (貓咪或動物腳掌掌心收納的尖尖細細指甲！😼)",
    en_example: "Tom felt Cat's sharp claws in his pocket.",
    zh_example: "湯姆感覺到口袋裡貓咪那銳利的爪子。"
  },
  {
    id: "102",
    word: "hung",
    ipa: "/hʌŋ/",
    zh: "掛著",
    emoji: "🎗️",
    explanation: "To be suspended from above. (彩帶或物件垂吊掛在上面！)",
    en_example: "Balloons hung on the wall.",
    zh_example: "氣球掛在牆壁上。"
  },
  {
    id: "107",
    word: "tomorrow",
    ipa: "/təˈmɒroʊ/",
    zh: "明天",
    emoji: "📅",
    explanation: "The day after today. (今天的下一個日子，睡一覺醒來就是囉！)",
    en_example: "My birthday is tomorrow.",
    zh_example: "我的生日是明天。"
  },
  {
    id: "109",
    word: "heard",
    ipa: "/hɜːrd/",
    zh: "聽到",
    emoji: "👂",
    explanation: "To receive sound with ears. (雙耳接收到別人的説話聲或周圍發出的聲音！)",
    en_example: "Tom heard a loud noise.",
    zh_example: "湯姆聽到了一聲吵雜的噪聲。"
  },
  {
    id: "117",
    word: "hurried",
    ipa: "/ˈhʌrid/",
    zh: "趕忙 / 急忙",
    emoji: "🏃‍♂️💨",
    explanation: "Moving or acting with great haste or speed. (腳步走得特別快，急著去某個地方！)",
    en_example: "They hurried home.",
    zh_example: "他們急忙趕回家。"
  },
  {
    id: "118",
    word: "was still",
    ipa: "/wɒz stɪl/",
    zh: "依然在 / 還在",
    emoji: "⏳",
    explanation: "Remaining in the same place without moving. (一直留在原處，沒有移動位置！)",
    en_example: "Cat was still in his pocket.",
    zh_example: "貓咪還待在他的口袋裡。"
  },
  {
    id: "119",
    word: "thought",
    ipa: "/θɔːt/",
    zh: "想 / 心想",
    emoji: "💡",
    explanation: "Created ideas or opinions in your mind, thinking quietly. (在小腦瓜袋裡，安靜地盤算思考！)",
    en_example: "\"This is fun,\" Tom thought.",
    zh_example: "「這真好玩，」湯姆想著。"
  },
  {
    id: "120",
    word: "might",
    ipa: "/maɪt/",
    zh: "也許 / 可能",
    emoji: "🤷‍♂️",
    explanation: "Used to show that something is possible but not 100% sure. (很有可能發生這樣的事情，但現在還不百分百肯定！)",
    en_example: "It might rain today.",
    zh_example: "今天也許會下雨。"
  },
  {
    id: "123",
    word: "throne",
    ipa: "/θroʊn/",
    zh: "王座 / 漂亮的龍椅",
    emoji: "👑",
    explanation: "The special royal chair for a king or queen. (城堡內專供國王、女王坐的，最豪華高貴的大椅子！)",
    en_example: "The King is on his throne.",
    zh_example: "國王坐在他的王座上。"
  },
  {
    id: "124",
    word: "bowed",
    ipa: "/baʊd/",
    zh: "鞠躬 / 彎腰敬禮",
    emoji: "🙇‍♂️",
    explanation: "Bending the body forward to show politeness and respect. (彎下上半身，來向別人表示禮貌與尊敬！)",
    en_example: "He bowed to the audience.",
    zh_example: "他向全體觀眾彎腰鞠躬敬禮。"
  },
  {
    id: "126",
    word: "pulled out",
    ipa: "/pʊld aʊt/",
    zh: "掏出 / 拿出來",
    emoji: "🎒",
    explanation: "Taking something out from a pocket, bag, or drawer. (把手伸進口袋，取出裡面裝著的物品！)",
    en_example: "She pulled out a pen.",
    zh_example: "她掏出了一支原子筆。"
  },
  {
    id: "127",
    word: "need",
    ipa: "/niːd/",
    zh: "需要",
    emoji: "🥤",
    explanation: "To require something that is very important or wanted. (必須得到或急需某個對你很重要的東西！)",
    en_example: "I need some milk.",
    zh_example: "我需要一些牛奶。"
  },
  {
    id: "129",
    word: "blew",
    ipa: "/bluː/",
    zh: "擤 / 吹",
    emoji: "🤧",
    explanation: "Clearing your nose with pressure into a tissue or cloth. (用力憋氣用手帕捂住鼻子噴氣，好把鼻子清理乾淨！)",
    en_example: "The queen blew her nose.",
    zh_example: "女王擦了擦鼻子。"
  },
  {
    id: "130",
    word: "special",
    ipa: "/ˈspeʃəl/",
    zh: "特別的",
    emoji: "🌟",
    explanation: "Better or different from normal, very precious. (和一般普通的食物或東西不一樣，格外珍貴、少見！)",
    en_example: "This is a special bag.",
    zh_example: "這是一個特別的袋子。"
  },
  {
    id: "137",
    word: "repeated",
    ipa: "/rɪˈpiːtɪd/",
    zh: "重複說 / 跟著說",
    emoji: "🦜",
    explanation: "Saying or doing something again after someone else. (別人剛說完，自己也立刻跟著把相同的話說一次！)",
    en_example: "\"A cat?\" Tom repeated.",
    zh_example: "「一隻貓？」湯姆跟著重複說。"
  },
  {
    id: "138",
    word: "loud",
    ipa: "/laʊd/",
    zh: "大聲的",
    emoji: "📢",
    explanation: "Having a high volume of sound that is easy to hear. (聲音的分貝特別大，在很遠的地方也能清楚聽見！)",
    en_example: "There is a loud music playing.",
    zh_example: "正在播放大聲的音樂。"
  },
  {
    id: "139",
    word: "sound",
    ipa: "/saʊnd/",
    zh: "聲音",
    emoji: "🎵",
    explanation: "Anything that can be heard by ears. (雙耳能聽到的一切聲響特徵！)",
    en_example: "He heard a funny sound.",
    zh_example: "他聽到了一個好笑的聲音。"
  },
  {
    id: "142",
    word: "sharp",
    ipa: "/ʃɑːrp/",
    zh: "尖銳的 / 刺痛的",
    emoji: "🔪",
    explanation: "Having a thin edge or point that could hurt slightly. (戳到或碰觸時，會感覺刺刺痛痛或是很銳利的！)",
    en_example: "Watch out for the sharp needle.",
    zh_example: "小心那根尖銳的針。"
  },
  {
    id: "cook",
    word: "cook",
    ipa: "/kʊk/",
    zh: "廚師",
    emoji: "🧑‍🍳",
    explanation: "A person who prepares and cooks delicious food in the kitchen. (在大廚房裡負責烹飪與調配美味佳餚美味的專業廚師！🍳🍕)",
    en_example: "I heard Cook talking about it.",
    zh_example: "我聽到廚師正在談論這件事。"
  },
  {
    id: "whose",
    word: "whose",
    ipa: "/huːz/",
    zh: "誰的",
    emoji: "❓",
    explanation: "Used to ask which person owns or has something. (用來發問某個東西或是生日是屬於「誰的」！🔍)",
    en_example: "Whose birthday is it?",
    zh_example: "那是誰的生日呢？"
  }
];

export const FULL_STORY_PARAGRAPHS = [
  {
    id: 1,
    en: "Tom looked inside the {Royal Ballroom}. {Streamers} {hung} from the {ceiling}. {Servants} were putting flowers on the tables. \"What's going on?\" Tom asked.",
    zh: "湯姆往皇家宴會廳裡望去。五彩裝飾彩帶從天花板上掛下來。僕人們正把鮮花擺在桌上。「發生了什麼事？」湯姆問。"
  },
  {
    id: 2,
    en: "Cat {peeked} out of Tom's {pocket}. \"There's a birthday party {tomorrow},\" she said. \"I {heard} {Cook} talking about it.\"",
    zh: "貓咪從湯姆的口袋裡探出頭來偷看。「明天有一場生日派對，」她說，「我聽到廚師正在談論這件事。」"
  },
  {
    id: 3,
    en: "\"{Whose} birthday is it?\" Tom asked. \"Prince Eric's,\" Cat said.",
    zh: "「那是誰的生日呢？」湯姆問。「艾瑞克王子的，」貓咪說。"
  },
  {
    id: 4,
    en: "Just then Dirk {appeared}. \"There you are, fool!\" he {snapped} at Tom. \"The queen wants to see you {at once}. Come with me!\"",
    zh: "就在這時，德克突然出現了。「你這傻瓜，原來你在這！」他嚴厲地對湯姆說。「女王要立刻見你。跟我來！」"
  },
  {
    id: 5,
    en: "Tom {hurried} after Dirk to the {Throne Room}. Cat {was still} in his {pocket}. \"Uh-oh,\" Tom {thought}. \"Cat {might} make the queen {sneeze}.\"",
    zh: "湯姆急忙跟著德克前去覲見大廳。貓咪還在他的口袋裡。「噢不，」湯姆心心想，「貓咪可能會讓女王打噴嚏。」"
  },
  {
    id: 6,
    en: "The queen sat on her {throne}. Tom {bowed}. \"Good morning, Your {Majesty}.\" The queen's nose {wriggled}. She {pulled out} her {handkerchief}.",
    zh: "女王坐在自己的王座上。湯姆彎腰敬禮。「早安，女王陛下。」女王的鼻子動了動。她拿出了手帕。"
  },
  {
    id: 7,
    en: "\"Ah-choo!\" The queen {sneezed}. \"Tom, I {need} your help again,\" she said. \"Anything, Your {Majesty},\" Tom said.",
    zh: "「哈——啾！」女王打了個噴嚏。「湯姆，我再次需要你的幫忙，」她說。「樂意至極，女王陛下，」湯姆說。"
  },
  {
    id: 8,
    en: "The queen {blew} her nose. \"Prince Eric's birthday is {tomorrow},\" she said. \"And I {need} a {special} gift for him.\"",
    zh: "女王擦了擦鼻子。「明天是艾瑞克王子的生日，」她說，「而且我需要為他準備一份特別的禮物。」"
  },
  {
    id: 9,
    en: "\"What does Prince Eric want?\" Tom asked. \"Prince Eric loves animals,\" the queen said. \"He wants a pet. I want to get him a dog.\"",
    zh: "「艾瑞克王子想要什麼呢？」湯姆問。「艾瑞克王子最喜歡動物，」女王說，「他想要一隻寵物。我想要送他一隻狗。」"
  },
  {
    id: 10,
    en: "\"A dog?\" Tom {repeated}. {Hiss}! A {loud} {sound} came from Tom's {pocket}. Then he felt something {sharp}—Cat's {claws}!\"",
    zh: "「一隻狗？」湯姆重複道。嘶——！一聲大聲的生氣叫聲從湯姆口袋裡傳出。接著，他感覺到一陣尖刺——是貓咪的爪子！"
  }
];

export const LITTLE_FOX_QUESTIONS: QuizQuestion[] = [
  {
    question: "Who wanted to see Tom?",
    zh_translation: "誰想要見湯姆？",
    options: ["Princess Mary", "the queen", "Prince Eric"],
    answer: "the queen",
    hint: "Hint: Dirk snapped that the grand lady in the Throne Room wanted to see Tom at once! 👑"
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
    hint: "Hint: Cats are afraid of dogs! She made a very loud angry sound from the pocket! 😾"
  },
  {
    question: "What did Tom feel in his pocket (口袋)?",
    zh_translation: "湯姆在口袋裡感覺到了什麼？",
    options: ["Cat's tail (尾巴)", "Cat's teeth (牙齒)", "Cat's claws"],
    answer: "Cat's claws",
    hint: "Hint: Ouch! Cat has sharp nails on her feet that hurt when she is angry! 🐾"
  },
  {
    question: "Whose (誰的) birthday party were the servants getting ready for (為...做準備)?",
    zh_translation: "僕人們正在為誰的生日派對做準備？",
    options: ["the king's", "Prince Eric's", "the queen's"],
    answer: "Prince Eric's",
    hint: "Hint: The big birthday party tomorrow is for the Queen's dear son! 🎂"
  },
  {
    question: "What does Prince Eric love?",
    zh_translation: "艾瑞克王子熱愛什麼？",
    options: ["streamers", "flowers", "animals"],
    answer: "animals",
    hint: "Hint: The Queen says her son wants a dog pet because he loves these forest friends! 🐕🐱🐹"
  }
];

export const USEFUL_SENTENCES = [
  {
    id: 1,
    sentence: "What's going on?",
    zh: "發生了什麼事？ / 怎麼了？",
    image: "/assets/images/quiz_img_1_1781343661578.jpg",
    context: "Ask this when you see something happening (事情發生) and feel curious (好奇的).",
    examples: [
      "If you see a lot of friends whispering (低語) and laughing together: \"What's going on?\"",
      "If you walk home (走回家) and find your room is completely messy (零亂的): \"What's going on?\""
    ]
  },
  {
    id: 2,
    sentence: "Come with me!",
    zh: "跟我來！ / 跟我一起走！",
    image: "/assets/images/quiz_img_3_1781343695777.jpg",
    context: "Say this when you want someone to follow (跟隨) you.",
    examples: [
      "If you want your friends to go play on the school playground (遊戲場): \"Come with me!\"",
      "If you find (找到) a beautiful butterfly (蝴蝶) and want to show your sister: \"Come with me!\""
    ]
  },
  {
    id: 3,
    sentence: "I need your help.",
    zh: "我需要你的幫忙。",
    image: "/assets/images/quiz_img_2_1781343680990.jpg",
    context: "Say this when you cannot do something alone (獨自) and want some assistance (協助).",
    examples: [
      "If you meet a very difficult (困難的) homework question in class: \"I need your help.\"",
      "If you are too small or weak to open (打開) a tight (緊的) water bottle: \"I need your help.\""
    ]
  }
];

export const USEFUL_SENTENCES_QUIZ: QuizQuestion[] = [
  {
    question: "You see a big group of animal friends laughing and talking in the school hallway. You want to walk over and ask what is happening. You say:",
    options: ["I need your help.", "What's going on?", "Come with me!"],
    answer: "What's going on?",
    image: "/assets/images/quiz_img_1_1781343661578.jpg"
  },
  {
    question: "You are sitting at your little desk and cannot solve a very difficult math question on your worksheet. You want to ask for assistance. You say:",
    options: ["What's going on?", "Come with me?", "I need your help."],
    answer: "I need your help.",
    image: "/assets/images/quiz_img_2_1781343680990.jpg"
  },
  {
    question: "You just found a beautiful glowing butterfly in the garden! You want your best friend to follow you to see it. You say:",
    options: ["Come with me!", "I need your help.", "What's going on?"],
    answer: "Come with me!",
    image: "/assets/images/quiz_img_3_1781343695777.jpg"
  },
  {
    question: "Your schoolbag is too heavy and you cannot carry it by yourself. You want your teacher or friend to assist you. You say:",
    options: ["Come with me!", "I need your help.", "What's going on?"],
    answer: "I need your help.",
    image: "/assets/images/quiz_img_4_1781343708494.jpg"
  },
  {
    question: "You walk into your empty classroom and see colorful balloons, streamers, and a giant birthday cake on the desk, but nobody is there. You ask:",
    options: ["I need your help.", "What's going on?", "Come with me!"],
    answer: "What's going on?",
    image: "/assets/images/quiz_img_5_1781343720626.jpg"
  },
  {
    question: "You have a super cool new red toy car and you want your puppy classmate to come over and play with you. You tell them:",
    options: ["What's going on?", "I need your help.", "Come with me!"],
    answer: "Come with me!",
    image: "/assets/images/quiz_img_6_1781343734928.jpg"
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
    options: ["Streamers", "Majesty", "Servants", "Claws"],
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
    options: ["Ceiling", "Pocket", "Throne Room", "Servants"],
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
    options: ["Streamers", "Throne Room", "Pocket", "Handkerchief"],
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
    zh_question: "發生了什麼事？ / 怎麼了？ ❓",
    options: ["What's going on?", "I need your help.", "Come with me!", "Good morning."],
    answer: "What's going on?",
    emoji: "❓"
  }
];

export const WORKSHEET_DATA = {
  multipleChoice: [
    {
      id: 1,
      question: "Why are there decorations (裝飾物) in the ballroom (宴會廳)?",
      options: [
        "(A) For a magic show (魔術表演).",
        "(B) For Prince Eric's birthday party.",
        "(C) For Dirk's party."
      ],
      answer: "(B) For Prince Eric's birthday party.",
      emoji: "🎈"
    },
    {
      id: 2,
      question: "Why does the Queen sneeze (打噴嚏)?",
      options: [
        "(A) She is sick (生病).",
        "(B) The room is cold (寒冷的).",
        "(C) Cat is in Tom's pocket (口袋)."
      ],
      answer: "(C) Cat is in Tom's pocket (口袋).",
      emoji: "🤧"
    }
  ],
  trueFalse: [
    {
      id: 1,
      question: "Prince Eric likes animals.",
      answer: "True",
      emoji: "🐰"
    },
    {
      id: 2,
      question: "Cat is happy to hear (聽說) about the dog.",
      answer: "False",
      emoji: "😾"
    }
  ],
  shortAnswer: {
    question: "The Queen wants to get (獲得) a dog. Does Cat like dogs? (Yes, it does. or No, it does not.)",
    options: ["Yes, it does.", "No, it does not."],
    answer: "No, it does not.",
    emoji: "🐈🐕"
  }
};
