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
  },
  {
    id: "101",
    word: "looked",
    ipa: "/lʊkt/",
    zh: "看",
    emoji: "👀",
    explanation: "眼神朝著某個方向看過去",
    en_example: "Tom looked in the ballroom.",
    zh_example: "湯姆朝宴會廳裡看。"
  },
  {
    id: "102",
    word: "hung",
    ipa: "/hʌŋ/",
    zh: "掛著",
    emoji: "🎗️",
    explanation: "彩帶或裝飾品垂吊掛在上面",
    en_example: "Balloons hung on the wall.",
    zh_example: "氣球掛在牆壁上。"
  },
  {
    id: "103",
    word: "were putting",
    ipa: "/wɜːr ˈpʊtɪŋ/",
    zh: "正在擺放",
    emoji: "🧑‍🍳",
    explanation: "手裡拿著東西，把它們放到桌上或指定位置",
    en_example: "They were putting books on shelves.",
    zh_example: "他們正在把書放到書架上。"
  },
  {
    id: "104",
    word: "flowers",
    ipa: "/ˈflaʊərz/",
    zh: "鮮花",
    emoji: "🌸",
    explanation: "植物開出的美麗花朵，聞起來香香甜甜的！",
    en_example: "The flowers look sweet.",
    zh_example: "這些鮮花看起來很甜美。"
  },
  {
    id: "105",
    word: "tables",
    ipa: "/ˈteɪbəlz/",
    zh: "桌子",
    emoji: "🪑",
    explanation: "用來寫功課或吃晚餐、喝茶的平整桌子",
    en_example: "Books are on the tables.",
    zh_example: "書本在桌子上。"
  },
  {
    id: "106",
    word: "asked",
    ipa: "/æskt/",
    zh: "詢問 / 問",
    emoji: "❓",
    explanation: "心裡有不懂的事，向別人開口提出問題",
    en_example: "\"Where is it?\" Tom asked.",
    zh_example: "「它在哪裡？」湯姆問。"
  },
  {
    id: "107",
    word: "tomorrow",
    ipa: "/təˈmɒroʊ/",
    zh: "明天",
    emoji: "📅",
    explanation: "今天的下一個日子，睡一覺醒來就是明天啦！",
    en_example: "My birthday is tomorrow.",
    zh_example: "我的生日是明天。"
  },
  {
    id: "108",
    word: "she said",
    ipa: "/ʃiː sed/",
    zh: "她說",
    emoji: "🗣️",
    explanation: "代替一位女生或女性角色口中說出來的話",
    en_example: "\"I love school,\" she said.",
    zh_example: "「我愛學校，」她說。"
  },
  {
    id: "109",
    word: "heard",
    ipa: "/hɜːrd/",
    zh: "聽到",
    emoji: "👂",
    explanation: "耳朵裡收到別人的說話聲、敲門聲或是小動物叫聲",
    en_example: "Tom heard a loud noise.",
    zh_example: "湯姆聽到了一聲吵雜的噪聲。"
  },
  {
    id: "110",
    word: "Cook",
    ipa: "/kʊk/",
    zh: "廚師 / 廚房阿姨",
    emoji: "🧑‍🍳",
    explanation: "城堡廚房裡，負責煮出美味三餐和蛋糕的神奇大師！",
    en_example: "Cook is baking a bread.",
    zh_example: "廚師正在烤麵包。"
  },
  {
    id: "111",
    word: "talking",
    ipa: "/ˈtɔːkɪŋ/",
    zh: "談論 / 聊天",
    emoji: "💬",
    explanation: "兩個人或好幾個人在一起，用嘴巴説笑和溝通",
    en_example: "They are talking about books.",
    zh_example: "他們正在聊關於書本的事。"
  },
  {
    id: "112",
    word: "birthday",
    ipa: "/ˈbɜːrθdeɪ/",
    zh: "生日",
    emoji: "🎂",
    explanation: "出生的那一天，每年這一天都可以吃蛋糕唱生日歌喔！",
    en_example: "Happy birthday to you!",
    zh_example: "祝你生日快樂！"
  },
  {
    id: "113",
    word: "said",
    ipa: "/sed/",
    zh: "說",
    emoji: "💬",
    explanation: "發出聲音講出某些話或表示意見",
    en_example: "\"Hello,\" said Tom.",
    zh_example: "「你好，」湯姆說。"
  },
  {
    id: "114",
    word: "there you are",
    ipa: "/ðer juː ɑːr/",
    zh: "你原來在這裡",
    emoji: "🎯",
    explanation: "找了很久，突然在某個地方看見那個要找的人",
    en_example: "\"Oh, there you are!\" Mom said.",
    zh_example: "「哦，你原來在這裡！」媽媽說。"
  },
  {
    id: "115",
    word: "wants",
    ipa: "/wɒnts/",
    zh: "想要",
    emoji: "🎁",
    explanation: "腦袋裡盼望得到某個東西，或是想做某件事",
    en_example: "The baby wants candy.",
    zh_example: "小嬰兒想要糖果。"
  },
  {
    id: "116",
    word: "see",
    ipa: "/siː/",
    zh: "看見 / 見面",
    emoji: "👁️",
    explanation: "用明亮的雙眼看清楚東西，或者和某人聚首",
    en_example: "I can see the queen.",
    zh_example: "我看見女王了。"
  },
  {
    id: "117",
    word: "hurried",
    ipa: "/ˈhʌrid/",
    zh: "趕忙 / 急忙",
    emoji: "🏃‍♂️💨",
    explanation: "步子邁得特別急、小跑步走得飛快，怕去太晚了",
    en_example: "They hurried home.",
    zh_example: "他們急忙趕回家。"
  },
  {
    id: "118",
    word: "was still",
    ipa: "/wɒz stɪl/",
    zh: "依然在 / 還在",
    emoji: "⏳",
    explanation: "維持原來的樣子不變，依然留在那裡沒有動",
    en_example: "Cat was still in his pocket.",
    zh_example: "貓咪還待在他的口袋裡。"
  },
  {
    id: "119",
    word: "thought",
    ipa: "/θɔːt/",
    zh: "想 / 心想",
    emoji: "💡",
    explanation: "在小腦袋瓜裡轉來轉去，默默地思考和猜測",
    en_example: "\"This is fun,\" Tom thought.",
    zh_example: "「這真好玩，」湯姆想著。"
  },
  {
    id: "120",
    word: "might",
    ipa: "/maɪt/",
    zh: "也許 / 可能",
    emoji: "🤷‍♂️",
    explanation: "說不定、或許會發生這樣的事，但還不能百分百確定",
    en_example: "It might rain today.",
    zh_example: "今天也許會下雨。"
  },
  {
    id: "121",
    word: "make",
    ipa: "/meɪk/",
    zh: "使 / 讓",
    emoji: "🪄",
    explanation: "做某些事，導致別人產生了某種動作或者反應",
    en_example: "You make me happy.",
    zh_example: "你讓我感到很快樂。"
  },
  {
    id: "122",
    word: "sat",
    ipa: "/sæt/",
    zh: "坐著",
    emoji: "🪑",
    explanation: "屁股穩穩地貼在椅子或王座上，不用站著",
    en_example: "She sat on the floor.",
    zh_example: "她坐在地板上。"
  },
  {
    id: "123",
    word: "throne",
    ipa: "/θroʊn/",
    zh: "王座 / 漂亮的龍椅",
    emoji: "👑",
    explanation: "城堡裡專門給國王、女王坐的，亮金晶的、最豪華的椅子",
    en_example: "The King is on his throne.",
    zh_example: "國王坐在他的王座上。"
  },
  {
    id: "124",
    word: "bowed",
    ipa: "/baʊd/",
    zh: "鞠躬 / 彎腰敬禮",
    emoji: "🙇‍♂️",
    explanation: "把上半身向前向下彎，用來表示對別人的禮貌和尊敬",
    en_example: "He bowed to the audience.",
    zh_example: "他朝著觀眾鞠躬敬禮。"
  },
  {
    id: "125",
    word: "nose",
    ipa: "/noʊz/",
    zh: "鼻子",
    emoji: "👃",
    explanation: "臉部中間用來聞花香、呼吸，感冒時會塞住的器官",
    en_example: "Pinch your nose to sneeze.",
    zh_example: "捏住你的鼻子來忍耐噴嚏。"
  },
  {
    id: "126",
    word: "pulled out",
    ipa: "/pʊld aʊt/",
    zh: "掏出 / 拿出來",
    emoji: "🎒",
    explanation: "把手伸進口袋或包包，夾出裡頭放的小手帕或紙條",
    en_example: "She pulled out a pen.",
    zh_example: "她掏出了一支原子筆。"
  },
  {
    id: "127",
    word: "need",
    ipa: "/niːd/",
    zh: "需要",
    emoji: "🥤",
    explanation: "肚子餓了需要吃，口渴了需要水喝那樣，非常渴求得到幫忙",
    en_example: "I need some milk.",
    zh_example: "我需要一些牛奶。"
  },
  {
    id: "128",
    word: "help",
    ipa: "/help/",
    zh: "幫忙 / 協助",
    emoji: "🤝",
    explanation: "伸出小手去給別人力量，或者接受別人的照顧和指引",
    en_example: "Thank you for your help.",
    zh_example: "謝謝你的幫忙。"
  },
  {
    id: "129",
    word: "blew",
    ipa: "/bluː/",
    zh: "擦 / 擤",
    emoji: "🤧",
    explanation: "用手帕或衛生紙摀住鼻子用力噴氣，擦乾爭鼻涕",
    en_example: "The queen blew her nose.",
    zh_example: "女王擦了擦鼻子。"
  },
  {
    id: "130",
    word: "special",
    ipa: "/ˈspeʃəl/",
    zh: "特別的",
    emoji: "🌟",
    explanation: "跟一般普通的不一樣，格外珍貴、讓人眼睛一亮的",
    en_example: "This is a special bag.",
    zh_example: "這是一個特別的袋子。"
  },
  {
    id: "131",
    word: "does",
    ipa: "/dʌz/",
    zh: "單詞助動詞",
    emoji: "⚙️",
    explanation: "在問問題的時候，放在第三人稱前面當小助手的助動詞",
    en_example: "Does he play tennis?",
    zh_example: "他打網球嗎？"
  },
  {
    id: "132",
    word: "loves",
    ipa: "/lʌvz/",
    zh: "喜愛 / 熱愛",
    emoji: "❤️",
    explanation: "比喜歡還要更深刻、超級無敵喜歡，付出滿滿愛心的感覺！",
    en_example: "He loves cute bunnies.",
    zh_example: "他熱愛可愛的小兔子。"
  },
  {
    id: "133",
    word: "animals",
    ipa: "/ˈænɪməlz/",
    zh: "動物們",
    emoji: "🐱🦮🐰",
    explanation: "小狗、小貓、大象、老虎等等，所有會呼吸會跑跑跳跳的有生命寶貝",
    en_example: "We saw many animals in the zoo.",
    zh_example: "我們在動物園看到了很多動物。"
  },
  {
    id: "134",
    word: "pet",
    ipa: "/pet/",
    zh: "寵物",
    emoji: "🐕",
    explanation: "養在家裡當作最親愛小家人的貓、狗、黃金鼠等小寶貝",
    en_example: "I want a smart pet.",
    zh_example: "我想要一隻聰明的寵物。"
  },
  {
    id: "135",
    word: "want",
    ipa: "/wɒnt/",
    zh: "想要",
    emoji: "🎈",
    explanation: "希望可以獲取、希望擁有的想法",
    en_example: "They want a shiny ball.",
    zh_example: "他們想要一個亮亮球。"
  },
  {
    id: "136",
    word: "get",
    ipa: "/ɡet/",
    zh: "買給 / 弄到一隻",
    emoji: "🎁",
    explanation: "去花錢買，或者尋找到一個好東西送給別人",
    en_example: "I will get you a book.",
    zh_example: "我會買一本書給你。"
  },
  {
    id: "137",
    word: "repeated",
    ipa: "/rɪˈpiːtɪd/",
    zh: "重複說 / 跟著說",
    emoji: "🦜",
    explanation: "別人剛講完一句，自己也跟著把一樣的話再重播一遍",
    en_example: "\"A cat?\" Tom repeated.",
    zh_example: "「一隻貓？」湯姆跟著重複說。"
  },
  {
    id: "138",
    word: "loud",
    ipa: "/laʊd/",
    zh: "大聲的",
    emoji: "📢",
    explanation: "音量很大，震耳朵、在好遠的地方都能聽得到的聲音",
    en_example: "There is a loud music playing.",
    zh_example: "正在播放大聲的音樂。"
  },
  {
    id: "139",
    word: "sound",
    ipa: "/saʊnd/",
    zh: "聲音",
    emoji: "🎵",
    explanation: "傳入耳朵的所有動聽或奇怪的聲響特徵",
    en_example: "He heard a funny sound.",
    zh_example: "他聽到了一個好笑的聲音。"
  },
  {
    id: "140",
    word: "came",
    ipa: "/keɪm/",
    zh: "傳來 / 突然來",
    emoji: "🚪",
    explanation: "聲音從某個地方朝你的方向傳播過來",
    en_example: "A noise came from outside.",
    zh_example: "外面傳來一陣聲響。"
  },
  {
    id: "141",
    word: "felt",
    ipa: "/felt/",
    zh: "感覺到 / 覺得",
    emoji: "🧠",
    explanation: "手指、皮膚或是心靈觸碰到、感受到刺痛、溫暖、害怕等反應",
    en_example: "He felt the sharp pain.",
    zh_example: "他感受到了鋒利的刺痛。"
  },
  {
    id: "142",
    word: "sharp",
    ipa: "/ʃɑːrp/",
    zh: "尖銳的 / 刺痛的",
    emoji: "🔪",
    explanation: "像針頭、碎玻璃或者貓咪指甲那樣，戳下去會麻麻癢癢痛感很顯著的",
    en_example: "Watch out for the sharp needle.",
    zh_example: "小心那根尖銳的針。"
  },
  {
    id: "143",
    word: "party",
    ipa: "/ˈpɑːrti/",
    zh: "生日派對 / 茶會",
    emoji: "🎉",
    explanation: "為了過生日或者一起慶祝特別的事，大家穿上新衣服吃點心唱歌的聚會",
    en_example: "Welcome to my party!",
    zh_example: "歡迎來我的派對！"
  },
  {
    id: "144",
    word: "The queen",
    ipa: "/ðə kwiːn/",
    zh: "女王",
    emoji: "👑",
    explanation: "住在王宮裡、戴著亮亮皇冠、穿大披風統治城堡的高貴女性元首",
    en_example: "The queen wants to see you.",
    zh_example: "女王想要見你。"
  },
  {
    id: "145",
    word: "Good morning",
    ipa: "/ɡʊd ˈmɔːrnɪŋ/",
    zh: "早安",
    emoji: "🌅",
    explanation: "早上起床出門、或者去學校見到同桌夥伴時打的溫馨招呼語",
    en_example: "Good morning, Tom!",
    zh_example: "早安，湯姆！"
  },
  {
    id: "146",
    word: "There's",
    ipa: "/ðerz/",
    zh: "有 / 那裡有",
    emoji: "👉",
    explanation: "那裡存在著什麼。There is 的可愛縮寫形式",
    en_example: "There's a cute kitten here.",
    zh_example: "這裡有一隻可愛的小貓咪。"
  },
  {
    id: "147",
    word: "Good morning, Your",
    ipa: "/ɡʊd ˈmɔːrnɪŋ jɔːr/",
    zh: "早安，您的",
    emoji: "👑",
    explanation: "早安，您的... 常用敬稱前置句",
    en_example: "Good morning, Your Majesty.",
    zh_example: "早安，女王陛下。"
  },
  {
    id: "148",
    word: "dog",
    ipa: "/dɔːɡ/",
    zh: "小狗",
    emoji: "🐶",
    explanation: "毛茸茸的、愛搖尾巴、會汪汪叫和玩丟球遊戲的小動物",
    en_example: "I have a cute dog.",
    zh_example: "我有一隻可愛的小狗。"
  }
];

export const FULL_STORY_PARAGRAPHS = [
  {
    id: 1,
    en: "Tom {looked} in the {Royal Ballroom}. {Streamers} {hung} from the {ceiling}. {Servants} {were putting} {flowers} on the {tables}. \"What's going on?\" Tom {asked}.",
    zh: "湯姆往皇家宴會廳裡望去。五彩裝飾彩帶從天花板上掛下來。僕人們正把鮮花擺在桌上。「發生了什麼事？」湯姆問。"
  },
  {
    id: 2,
    en: "Cat {peeked} out of Tom's {pocket}. \"{There's} a {birthday} {party} {tomorrow},\" {she said}. \"I {heard} {Cook} {talking} about it.\"",
    zh: "貓咪從湯姆的口袋裡探出頭來偷看。「明天有一場生日派對，」她說，「我聽到廚師正在談論這件事。」"
  },
  {
    id: 3,
    en: "\"Whose {birthday} is it?\" Tom {asked}. \"Prince Eric's,\" Cat {said}.",
    zh: "「那是誰的生日呢？」湯姆問。「艾瑞克王子的，」貓咪說。"
  },
  {
    id: 4,
    en: "Just then Dirk {appeared}. \"There you are, {fool}!\" he {snapped} at Tom. \"{The queen} {wants} to {see} you {at once}. {Come with me}!\"",
    zh: "就在這時，德克突然出現了。「你這傻瓜，原來你在這！」他嚴厲地對湯姆說。「女王要立刻見你。跟我來！」"
  },
  {
    id: 5,
    en: "Tom {hurried} after Dirk to the {Throne Room}. Cat {was still} in his {pocket}. \"Uh-oh,\" Tom {thought}. \"Cat {might} {make} the queen {sneeze}.\"",
    zh: "湯姆急忙跟著德克前去覲見大廳。貓咪還在他的口袋裡。「噢不，」湯姆心想，「貓咪可能會讓女王打噴嚏。」"
  },
  {
    id: 6,
    en: "The queen {sat} on her {throne}. Tom {bowed}. \"{Good morning, Your} {Majesty}.\" The queen's {nose} {wriggled}. She {pulled out} her {handkerchief}.",
    zh: "女王坐在自己的王座上。湯姆彎腰敬禮。「早安，女王陛下。」女王的鼻子動了動。她拿出了手帕。"
  },
  {
    id: 7,
    en: "\"Ah-choo!\" The queen {sneezed}. \"Tom, I {need} your {help} again,\" {she said}. \"Anything, Your {Majesty},\" Tom {said}.",
    zh: "「哈——啾！」女王打了個噴嚏。「湯姆，我再次需要你的幫忙，」她說。「樂意至極，女王陛下，」湯姆說。"
  },
  {
    id: 8,
    en: "The queen {blew} her {nose}. \"Prince Eric's {birthday} is {tomorrow},\" {she said}. \"And I {need} a {special} {gift} for him.\"",
    zh: "女王擦了擦鼻子。「明天是艾瑞克王子的生日，」她說，「而且我需要為他準備一份特別的禮物。」"
  },
  {
    id: 9,
    en: "\"What {does} Prince Eric {want}?\" Tom {asked}. \"Prince Eric {loves} {animals},\" the queen {said}. \"He {wants} a {pet}. I {want} to {get} him a {dog}.\"",
    zh: "「艾瑞克王子想要什麼呢？」湯姆問。「艾瑞克王子最喜歡動物，」女王說，「他想要一隻寵物。我想要送他一隻狗。」"
  },
  {
    id: 10,
    en: "\"A {dog}?\" Tom {repeated}. {Hiss}! A {loud} {sound} {came} from Tom's {pocket}. Then he {felt} something {sharp}—Cat's {claws}!\"",
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
    question: "What did Tom feel in his pocket?",
    zh_translation: "湯姆在口袋裡感覺到了什麼？",
    options: ["Cat's tail", "Cat's teeth", "Cat's claws"],
    answer: "Cat's claws",
    hint: "Hint: Ouch! Cat has sharp nails on her feet that hurt when she is angry! 🐾"
  },
  {
    question: "Whose birthday party were the servants getting ready for?",
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
    context: "Simple explanation: Use this question when you see something happening (事情發生) in front of you and feel curious (好奇的).",
    examples: [
      "If you see a lot of friends whispering (低語) and laughing together: \"What's going on?\"",
      "If you walk home (走回家) and find your room is completely messy (零亂的): \"What's going on?\""
    ]
  },
  {
    id: 2,
    sentence: "Come with me!",
    zh: "跟我來！ / 跟我一起走！",
    context: "Simple explanation: Use this command (命令) when you want someone to follow (追隨) you to a cool place.",
    examples: [
      "If you want your friends to go play on the school playground (遊戲場) together: \"Come with me!\"",
      "If you find (找到) a beautiful glowing butterfly in the park and want to show your sister: \"Come with me!\""
    ]
  },
  {
    id: 3,
    sentence: "I need your help.",
    zh: "我需要你的幫忙。",
    context: "Simple explanation: Use this polite phrase (禮貌句型) when you cannot do something alone (獨自) and want some assistance (協助).",
    examples: [
      "If you meet a very difficult (困難的) homework question in class: \"I need your help.\"",
      "If you are too small or weak to open (打開) a tight water bottle: \"I need your help.\""
    ]
  }
];

export const USEFUL_SENTENCES_QUIZ: QuizQuestion[] = [
  {
    question: "You see a big group of animal friends laughing and talking in the school hallway (走廊). You want to walk over and ask what is happening. You say:",
    options: ["I need your help.", "What's going on?", "Come with me!"],
    answer: "What's going on?",
    image: "/src/assets/images/quiz_img_1_1781279086209.jpg"
  },
  {
    question: "You are sitting at your little desk and cannot solve (解答) a very difficult math question on your worksheet. You want to ask for assistance (協助). You say:",
    options: ["What's going on?", "Come with me?", "I need your help."],
    answer: "I need your help.",
    image: "/src/assets/images/quiz_img_2_1781279110797.jpg"
  },
  {
    question: "You just found a beautiful glowing butterfly (蝴蝶) in the pastel garden! You want your best friend to follow (跟隨) you to see it. You say:",
    options: ["Come with me!", "I need your help.", "What's going on?"],
    answer: "Come with me!",
    image: "/src/assets/images/quiz_img_3_1781279129066.jpg"
  },
  {
    question: "Your schoolbag is too heavy (重的) and you cannot carry (搬運) it by yourself. You want your teacher or friend to assist (幫忙) you. You say:",
    options: ["Come with me!", "I need your help.", "What's going on?"],
    answer: "I need your help.",
    image: "/src/assets/images/quiz_img_4_1781279146552.jpg"
  },
  {
    question: "You walk into your empty (空的) classroom and see colorful balloons (氣球), streamers, and a giant birthday cake on the desk, but nobody is there. You ask:",
    options: ["I need your help.", "What's going on?", "Come with me!"],
    answer: "What's going on?",
    image: "/src/assets/images/quiz_img_5_1781279165511.jpg"
  },
  {
    question: "You have a super cool new red toy car (玩具車) and you want your puppy classmate to come over and play with you. You tell them:",
    options: ["What's going on?", "I need your help.", "Come with me!"],
    answer: "Come with me!",
    image: "/src/assets/images/quiz_img_6_1781279180777.jpg"
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
      question: "Why are there decorations (裝飾物) in the ballroom (宴會廳)?",
      options: [
        "(A) For a magic show (魔術表演).",
        "(B) For Prince Eric's birthday party (生日派對).",
        "(C) For Dirk's party."
      ],
      answer: "(B) For Prince Eric's birthday party (生日派對).",
      emoji: "🎈"
    },
    {
      id: 2,
      question: "Why does the Queen sneeze (打噴嚏)?",
      options: [
        "(A) She is sick (生病).",
        "(B) The room is cold (寒冷的).",
        "(C) Cat (貓咪) is in Tom's pocket (口袋)."
      ],
      answer: "(C) Cat (貓咪) is in Tom's pocket (口袋).",
      emoji: "🤧"
    }
  ],
  trueFalse: [
    {
      id: 1,
      question: "Prince Eric likes (喜愛) animals (動物).",
      answer: "True",
      emoji: "🐰"
    },
    {
      id: 2,
      question: "Cat (貓咪) is happy (高興) to hear (聽說) about the dog (狗).",
      answer: "False",
      emoji: "😾"
    }
  ],
  shortAnswer: {
    question: "The Queen wants to get (獲得) a dog (狗). Does Cat like dogs? (Yes, it does. or No, it does not.)",
    options: ["Yes, it does.", "No, it does not."],
    answer: "No, it does not.",
    emoji: "🐈🐕"
  }
};
