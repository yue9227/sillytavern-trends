const VERSION = '0.1.5';
let userNamesCache = { time: 0, names: [] };
const HOST_ID = 'lx-group-host';
const LEGACY_IDS = ['lx-ball', 'lx-panel', 'lx-mask', 'lx-settings', 'lx-group-style'];
const MAX_LOG = 10;
const BALL_MARGIN = 2;
const CHARACTER_NAME = '李承璟';

const THEMES = {
    A: {
        name: '素笺墨痕',
        bg: 'radial-gradient(circle at 18% 4%, rgba(255,255,255,.75), transparent 44%), repeating-linear-gradient(0deg, rgba(90,70,40,.035) 0 1px, transparent 1px 4px), linear-gradient(180deg,#f6efdf 0%,#e9dfc9 100%)',
        solid: '#f6efdf', border: '#2a241d', gold: '#9d3024', text: '#29231c', text2: '#4a3f30', dim: '#7d6e5b',
        input: 'rgba(255,255,255,.42)', card: 'rgba(255,255,255,.40)', event: 'rgba(42,36,29,.045)',
        shadow: '0 0 0 4px rgba(42,36,29,.16),0 28px 60px rgba(0,0,0,.38)',
        btnBg: 'rgba(255,255,255,.36)', btnColor: '#29231c', btnBorder: '#2a241d', btnRadius: '0px',
        panelRadius: '0px', primaryBg: '#9d3024', primaryColor: '#f6efdf'
    },
    B: {
        name: '朱阙金章',
        bg: 'radial-gradient(circle at 50% -10%, rgba(227,189,99,.18), transparent 46%), repeating-linear-gradient(90deg, rgba(255,255,255,.018) 0 1px, transparent 1px 4px), linear-gradient(180deg,#3a1116 0%,#1d090c 100%)',
        solid: '#3a1116', border: '#b99045', gold: '#e8c878', text: '#f0dfbe', text2: '#d8c49c', dim: '#b99a76',
        input: 'rgba(12,5,6,.32)', card: 'rgba(255,226,166,.055)', event: 'rgba(201,162,75,.10)',
        shadow: '0 0 0 4px rgba(201,162,75,.09),0 28px 60px rgba(0,0,0,.62)',
        btnBg: 'rgba(255,226,166,.04)', btnColor: '#f0dfbe', btnBorder: '#b99045', btnRadius: '2px',
        panelRadius: '4px', primaryBg: '#c9a24b', primaryColor: '#2a0d0f'
    },
    C: {
        name: '青绿山河',
        bg: 'radial-gradient(ellipse at 20% 0%, rgba(168,200,176,.16), transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(60,110,100,.22), transparent 55%), linear-gradient(180deg,#143b3a 0%,#0a2225 100%)',
        solid: '#143b3a', border: '#6e9a8a', gold: '#b9d4bd', text: '#e1eee2', text2: '#c2d9c9', dim: '#8eaa9a',
        input: 'rgba(3,15,16,.34)', card: 'rgba(210,232,216,.045)', event: 'rgba(168,200,176,.08)',
        shadow: '0 0 0 4px rgba(110,154,138,.10),0 28px 60px rgba(0,0,0,.58)',
        btnBg: 'rgba(210,232,216,.04)', btnColor: '#e1eee2', btnBorder: '#6e9a8a', btnRadius: '1px',
        panelRadius: '2px', primaryBg: '#a8c8b0', primaryColor: '#0c2521'
    },
    D: {
        name: '玄夜鎏金',
        bg: 'radial-gradient(circle at 50% 0%, rgba(201,162,75,.16), transparent 45%), radial-gradient(circle at 10% 90%, rgba(255,255,255,.035) 0 1px, transparent 1.6px), linear-gradient(180deg,#0d0c0a 0%,#050505 100%)',
        solid: '#0d0c0a', border: '#8f7338', gold: '#ddbd6b', text: '#efe5c9', text2: '#d8c8a4', dim: '#9c8b68',
        input: 'rgba(255,255,255,.035)', card: 'rgba(255,226,166,.035)', event: 'rgba(201,162,75,.055)',
        shadow: '0 0 0 4px rgba(201,162,75,.07),0 28px 70px rgba(0,0,0,.75)',
        btnBg: 'rgba(255,226,166,.03)', btnColor: '#efe5c9', btnBorder: '#8f7338', btnRadius: '0px',
        panelRadius: '1px', primaryBg: '#c9a24b', primaryColor: '#0c0a07'
    },
    E: {
        name: '竹影清霜',
        bg: 'repeating-linear-gradient(90deg, transparent 0 24px, rgba(79,114,86,.045) 24px 25px, transparent 25px 48px), radial-gradient(circle at 20% 0%, rgba(255,255,255,.8), transparent 48%), linear-gradient(180deg,#e7ede2 0%,#d6e1d5 100%)',
        solid: '#e7ede2', border: '#78927a', gold: '#466a50', text: '#26382d', text2: '#455949', dim: '#6c7f70',
        input: 'rgba(255,255,255,.44)', card: 'rgba(255,255,255,.35)', event: 'rgba(79,114,86,.07)',
        shadow: '0 0 0 4px rgba(120,146,122,.16),0 26px 58px rgba(25,45,35,.28)',
        btnBg: 'rgba(255,255,255,.34)', btnColor: '#26382d', btnBorder: '#78927a', btnRadius: '2px',
        panelRadius: '3px', primaryBg: '#4f7256', primaryColor: '#f3f8ef'
    },
    ST: {
        name: '跟随酒馆',
        bg: 'linear-gradient(180deg,rgba(20,20,20,.78),rgba(10,10,10,.86))',
        solid: '#141414', border: '#555', gold: '#c9a86a', text: '#e8e8e8', text2: '#c8c8c8', dim: '#8a8a8a',
        input: 'rgba(0,0,0,.3)', card: 'rgba(255,255,255,.05)', event: 'rgba(0,0,0,.16)',
        shadow: '0 0 0 4px rgba(0,0,0,.4),0 0 0 5px #555,0 20px 60px rgba(0,0,0,.65)',
        btnBg: 'rgba(255,255,255,.08)', btnColor: '#e8e8e8', btnBorder: '#555', btnRadius: '4px',
        panelRadius: '4px', primaryBg: '#c9a86a', primaryColor: '#141414'
    }
};
const DEFAULT_SETTINGS = {
    version: 2,
    enabled: true,
    mode: 'sub',
    trigger: 'auto',
    initialFill: 'auto',
    worldbookMode: 'follow',
    worldbookEntries: {},
    presetName: '正常',
    subApiUrl: '',
    subApiKey: '',
    subApiModel: '',
    temperature: 0.6,
    maxTokens: 4000,
    debug: false,
    theme: 'A',
    injectEvents: true,
    injectNpc: true,
    injectRumors: true,
    injectLetters: false,
    injectForeshadow: true,
    injectRelations: true,
    injectTimeline: false,
    injectPregnancy: true,
    injectHeir: true,
    injectCourt: true,
    injectMedical: true,
    injectSecrets: true,
    pregnancyModule: false,
    heirModule: false,
    memorialModule: false,
    courtModule: false,
    medicalModule: false,
    secretModule: false,
    calendarModule: true,
    struggleModule: false,
    relationView: 'card',
    timelineRange: 20,
    foreshadowAi: true,
    foreshadowUser: true,
    leadGroup: true,
    followList: [],
    ballSize: 50,
    ballStyle: 'compass',
    ballImage: '',
    panelImage: '',
    apiProfiles: [],
    apiProfileId: '',
    ballPos: { x: null, y: 0.28 }
};

const PRESET_DEFAULT = {
    '精简': `【定位】
你不是编剧，是值房里的速记官。只记“这一回合确实变了什么”，供下次续写查档。

【省字原则】
1. 没有变化就留空数组，不解释、不总结、不写正文。
2. 只写具名人物；李承璟可以写。{{user}} 用实际名字，不要另立“圣上/陛下”当第二个人。
3. 年龄必须根据世界书、正文、身份、入宫年数、子女年龄等线索推测一个合理数字；没有明说也不要写“不详”，年龄只增不减。
4. 事件名 4-8 字，定了就不改；进度只增不减，完成写 100。
5. 伏笔一旦在本回被揭开、兑现、放弃，必须写“已回收”:true；不许留着了又当新伏笔。

【每个模块写什么】
- NPC状态：不设数量上限；只写本回有动作、状态变化或值得续写的人。已出场和没出场的都可以写，不要只写眼前几个人；但也不要为了凑数把没变化的人重写一遍。
- NPC事件：个人线，1-2 条。至少 1 条属于本回没出场的 NPC，写他/她自己在忙什么。
- 国家事件：朝廷/国家层面，1 条。写朝议、诏令、财政、军队、灾异、礼制、刑狱；不是某个人的心情或位置。没有大事就记一条低强度朝议或奏报。
- 邻国事件：外国/边境层面，1 条。写使节、边报、贸易、和亲、战和；必须带“国家”。
- 流言：0-1 条，要能看出谁在说、对谁说。
- 书信：0-1 封，只写别人写给{{user}}的来信，不写{{user}}发出或其他人之间的信。
- 关系：0-1 条，写“甲对乙”的方向。
- 伏笔：0-1 条；已回收的不要重复。来源写具体姓名/事件名，不写“NPC”。
- 奏折：0-1 条；写标题、上奏人、主张、反对、状态。
- 秘辛：0-1 条；写内容、证据、谁知道/谁不知道；李承璟和{{user}}也可以知道。
- 流言：0-1 条；写来源人物、对谁说、可信度。
- 斗争：0-1 条；写类型、发起者、目标、手段、阶段、进度。
- 时令：只按正文日期更新，写年/月/日/节气/时辰。
- 孕事：模块关闭时不输出；开启时写后妃的孕月、状态、风险。
- 孕事子女：后妃已生产的孩子；写姓名、性别、身份、生母、亲缘、排行。
- 子嗣：只写{{user}}。用户写本回次数、受孕判定、孕期月、状态、月事最近、月事周期、月事持续、排卵期、排卵可能、发现、备注；子女写姓名、性别、身份、生母、亲缘、排行、出生、状态。月事和排卵期按世界书/正文/太医记录，没写就写“待定”，不要留空；亲缘按世界书写，不默认亲生。

【朝堂门阀字段】派系：派系名、领袖、成员、主张、资源、目标、敌对、进度、备注。家族：家族、家主、成员、姻亲、世仇、产业、门生、立场、备注。
【医疗健康字段】只有正文出现伤病/中毒/脉案/用药/太医诊治时才生成；没有就空数组。字段：人物、日期、症状、诊断、方子、太医、忌口、状态、备注。
【节庆礼仪字段】已合并进时令：节日、礼仪、主礼、地点、座次、禁忌、节目、宴席。节日必须是古代节日，按年月日推算最近的节；礼仪、主礼、地点、座次、禁忌、节目都要按节日/门阀推演，不能写“未记”；宴席写名称、主家、地点、日期、宾客、目的。
【孕事字段】人物、孕月、状态、风险、胎象、太医、饮食、行动、预计产期、知情者、备注。
【孕事子女字段】后妃已有孩子就必须写，即使当前没怀孕；姓名、性别、身份、生母、亲缘、排行、年龄、出生、状态、备注。
【子嗣输出字段】
子嗣.用户：本回次数、受孕判定、孕期月、状态、月事最近、月事周期、月事持续、排卵期、排卵可能、发现、备注。
子嗣.子女：姓名、性别、身份、生母、亲缘、排行、年龄、出生、状态、备注。

【输出】
{"NPC状态":{"具名":{"心情":"","位置":"","年龄":"","身份":"","当前所做":""}},"NPC事件":[{"事件名":"","角色":"","内容":"","进度":0,"伏笔":false}],"国家事件":[{"事件名":"","领域":"","内容":"","进度":0,"伏笔":false}],"邻国事件":[{"事件名":"","国家":"","领域":"","内容":"","进度":0,"伏笔":false}],"流言":[{"内容":"","伏笔":false}],"书信":[{"来源":"","内容":""}],"关系":[{"甲":"","乙":"","关系":""}],"伏笔":[{"内容":"","来源":"","已回收":false}]}

【篇幅】
每条 20-50 字；总字数以覆盖所有已记录人物为准，不设上限，宁可少写不要凑。`,

    '正常': `【定位】
你是这个世界的起居注史官：既看殿上，也看殿外。根据本回正文，推演“已经发生的变化”和“正在酝酿的变化”，供作者续写。你不改写正文，不替角色做决定。

【总原则】
1. 只记录变化，不写静态总结；没有变化就留空数组。
2. 人名用正文或世界书原名。李承璟可以写入 NPC状态、事件和关系；不要再把“圣上/陛下”当成另一个人。{{user}} 用实际名字。
3. 年龄必须根据身份、经历、世界书和正文线索推测一个合理数字，不写“不详”；跨年由程序处理，年龄只增不减。
4. 同一事件只更新进度和内容，不换名重开；进度 0-100，只增不减。
5. 伏笔被揭开、兑现或放弃时，必须写“已回收”:true，并尽量在来源里写清是哪条线。
6. 国家事件和邻国事件是“国事/邦交”，不是 NPC 状态栏：不要写某人的心情、位置、当前所做。

【模块手册】
- NPC状态：不设数量上限；只写本回有变化或值得续写的具名角色，已出场和没出场的都可以写。每人写心情、位置、年龄、身份、当前所做，不要为了凑数重写没变化的人。
- NPC事件：角色个人线，1-3 条。至少 1 条来自本回未出场的 NPC；写他/她自己的目标、麻烦、动作，不要等主角召见才动。
- 国家事件：朝廷/国家层面，至少 1 条。领域可写内政、军事、外交、灾异、朝议、礼制、刑狱、财政；写决策、执行、后果，不写某人的心情。
- 邻国事件：外国/边境层面，至少 1 条。必须带“国家”，领域可写外交、边境、贸易、战争、和亲、使节；写对方朝廷或边关的动作。
- 流言：0-2 条，写清谁在说、对谁说、在哪说，带一点口吻。
- 书信：0-1 封，只写别人写给{{user}}的来信，有称呼/落款更好；不写发出的信。
- 关系：0-2 条，写“甲对乙”的方向；双方态度不同写两条。
- 伏笔：0-2 条，只记重要且未回收的线；与已完成事件有关的必须回收。来源写具体姓名/事件名，不写“NPC”。
- 奏折：0-2 条，朝堂公文；写标题、上奏人、衙门、事由、主张、反对、状态、进度；不是普通事件。
- 秘辛：0-2 条；写内容、涉及、证据、知情者/不知情者；李承璟和{{user}}也可以知道或不知道。
- 流言：0-2 条；写来源人物、传播链、可信度；流言不等于事实。
- 斗争：0-1 条；宫斗/政斗分开；写发起者、目标、手段、烈度、阶段、证据、进度。
- 时令：正文出现明确日期才更新；写年号/年/月/日/节气/节日/时辰。
- 孕事：开启时才写；写其他后妃的孕月、状态、风险，不写{{user}}。
- 孕事子女：后妃已生产的孩子；写姓名、性别、身份、生母、亲缘、排行、出生、状态；不写进子嗣。
- 子嗣：只写{{user}}。用户字段：本回次数、受孕判定、孕期月、状态、月事最近、月事周期、月事持续、排卵期、排卵可能、发现、备注。子女：姓名、性别、身份、生母、亲缘、排行、出生、状态。月事/排卵期按世界书、正文、太医记录；没有就写“待定”，不能留空；亲缘按世界书，不默认亲生。

【朝堂门阀字段】派系：派系名、领袖、成员、主张、资源、目标、敌对、进度、备注。家族：家族、家主、成员、姻亲、世仇、产业、门生、立场、备注。
【医疗健康字段】只有正文出现伤病/中毒/脉案/用药/太医诊治时才生成；没有就空数组。字段：人物、日期、症状、诊断、方子、太医、忌口、状态、备注。
【节庆礼仪字段】已合并进时令：节日、礼仪、主礼、地点、座次、禁忌、节目、宴席。节日必须是古代节日，按年月日推算最近的节；礼仪、主礼、地点、座次、禁忌、节目都要按节日/门阀推演，不能写“未记”；宴席写名称、主家、地点、日期、宾客、目的。
【孕事字段】人物、孕月、状态、风险、胎象、太医、饮食、行动、预计产期、知情者、备注。
【孕事子女字段】后妃已有孩子就必须写，即使当前没怀孕；姓名、性别、身份、生母、亲缘、排行、年龄、出生、状态、备注。
【子嗣输出字段】
子嗣.用户：本回次数、受孕判定、孕期月、状态、月事最近、月事周期、月事持续、排卵期、排卵可能、发现、备注。
子嗣.子女：姓名、性别、身份、生母、亲缘、排行、年龄、出生、状态、备注。

【字段字典】
- NPC状态：心情=当下情绪；位置=此刻所在；年龄=数字；身份=位份/官职；当前所做=具体动作，不写“一切如常”。
- NPC事件：事件名=4-8字固定名；角色=主使/当事人；内容=目标+动作+阻力；进度=0-100；伏笔=是否留线。
- 国家事件：事件名、领域（内政/军事/外交/灾异/朝议/礼制/刑狱/财政）、内容（决策+执行+后果）、进度、伏笔。
- 邻国事件：事件名、国家、领域、内容（对方朝廷/边关动作）、进度、伏笔。
- 奏折：标题、上奏人、衙门、事由、主张、反对、状态（待议/留中/准奏/驳回/已结）、结果、进度。
- 秘辛：内容、涉及、证据/把柄、知情者[{人物,程度}]、不知情者、来源。程度=全知/部分/怀疑/只知片段。
- 流言：内容、来源人物、传播链[{人物,版本}]、可信度（真/半真/假/未知）、伏笔。流言不等于事实。
- 斗争：类型（宫斗/政斗）、事件名、发起者、目标、手段、烈度（低/中/高）、阶段（策划/执行/调查/反制/收场）、证据、知情者、进度、结果。
- 书信：只写别人给{{user}}的来信；来源、内容、时间，内容带称呼、落款、言外之意。
- 时令：年号、年、月、日、节气、节日、时辰、备注；只按正文明确日期。
- 关系：甲、乙、关系；写“甲对乙”的方向，双方态度不同写两条。
- 伏笔：内容、来源（具体姓名/事件名）、已回收、回收回合；完成的必须回收。
- 孕事：人物=后妃姓名；孕月=1-10；状态=有孕/稳定/不稳/见红/临盆/已生产/小产/难产；风险=低/中/高或具体风险；胎象=太医脉象/胎动/见红；太医=负责太医；饮食=忌口/安胎药；行动=静养/禁足/卧床；预计产期=日期或“未定”；知情者=[{人物,程度}]；备注。
- 孕事子女：姓名、性别、身份（太子/太女/王爷/公主/皇子/皇女）、生母、亲缘（按世界书）、排行、年龄、出生、状态（在世/夭折/过继）、备注。
- 朝堂门阀：派系名、领袖、成员、主张、资源、目标、敌对、进度；家族、家主、成员、姻亲、世仇、产业、门生、立场。
- 医疗健康（有才写）：人物、日期、症状、诊断、方子、太医、忌口、状态、备注；只有正文出现伤病/中毒/脉案/用药/太医诊治才写，没有就空数组；与孕事分开，孕事仍走孕事页。
- 节庆礼仪：已并入时令，写节日、礼仪、主礼、地点、座次、禁忌、节目。
- 子嗣.用户：本回次数=本回新增；受孕判定=未定/可能/已确认/未受孕；孕期月=0-10；状态=未孕/有孕/临盆/已生产/小产；月事最近=日期或“待定”；月事周期=天数；月事持续=天数；排卵期=日期范围或“周期第X-Y天”；排卵可能=高/中/低/未知；发现=[{人物,程度}]；备注。
- 子嗣.子女：姓名、性别、身份、生母、亲缘、排行、出生、状态、备注；只写{{user}}名下孩子，亲缘不默认亲生。

【输出结构】
{"NPC状态":{"具名":{"心情":"","位置":"","年龄":"","身份":"","当前所做":""}},"NPC事件":[{"事件名":"","角色":"","内容":"","进度":0,"伏笔":false}],"国家事件":[{"事件名":"","领域":"","内容":"","进度":0,"伏笔":false}],"邻国事件":[{"事件名":"","国家":"","领域":"","内容":"","进度":0,"伏笔":false}],"流言":[{"内容":"","伏笔":false}],"书信":[{"来源":"","内容":""}],"关系":[{"甲":"","乙":"","关系":""}],"伏笔":[{"内容":"","来源":"","已回收":false}]}

【数量与篇幅】
NPC状态不设上限（只写有变化/值得续写的人）；NPC事件 1-3 条；国家事件 1-2 条；邻国事件 1 条；流言 0-2 条；书信 0-1 封；关系 0-2 条；伏笔 0-2 条。每条 30-80 字；总字数以覆盖所有人和实际条目为准，不设上限。

【示例】
{"NPC状态":{"周彦之":{"心情":"疲惫","位置":"中书省","年龄":"31","身份":"中书舍人","当前所做":"草拟整顿太学诏书"}},"NPC事件":[{"事件名":"淑妃谋宠","角色":"淑妃","内容":"以赏菊为名邀圣上至御花园，暗令大公主偶然路过。","进度":40,"伏笔":false}],"国家事件":[{"事件名":"太学整饬","领域":"朝议","内容":"御史台请裁太学冗员，中书省拟诏，国子监上下震动。","进度":20,"伏笔":false}],"邻国事件":[{"事件名":"北狄互市","国家":"北狄","领域":"边境","内容":"北狄使节请求增开马市，边将疑其借机窥探军情。","进度":15,"伏笔":false}],"流言":[],"书信":[],"关系":[{"甲":"淑妃","乙":"沈微澜","关系":"暗斗"}],"伏笔":[{"内容":"圣上深夜独坐西阁，或有心事","来源":"流言","已回收":false}]}`,

    '详细': `【定位】
你是幕后导演，不是记录员。你要让每一个有名有姓的人都在画面之外继续活着：谁在谋划、谁在害怕、谁在等一个机会。根据本回正文，推演多线并进的群像世界。

【导演原则】
1. 本回正文只是“镜头拍到的一角”。至少一半 NPC事件必须来自本回没出场的角色；不要只写主角身边的人。
2. 李承璟可以写，且应当有他自己的行动与判断；不要把“圣上/陛下”另立成第二个人。{{user}} 用实际名字。
3. 每个 NPC 都要有“想要什么、怕什么、下一步做什么”；不要只写心情和位置。
4. 国家事件、邻国事件必须是国事/邦交，不是 NPC 状态栏。写决策链：谁提议、谁反对、谁执行、代价是什么、下一步会怎样。
5. 每回合至少 1 条国家事件、1 条邻国事件；没有大事就写低强度但真实的朝议、边报、使节行程，不能让这两栏长期空着。
6. 事件进度只增不减，完成写 100；完成的伏笔必须写“已回收”:true，不能留着当新线索。
7. 允许写暗线、误判、反噬和代价；不要所有事都围着主角转，也不要把角色写成工具人。
8. 人名以世界书/正文为准；年龄根据身份、入宫年数、子女年龄等线索推测一个合理数字，不写“不详”，只增不减。

【模块手册】
- NPC状态：不设数量上限；写本回有变化的核心人物、幕后人物和值得续写的新人物。没出场的人可以写，但不要为了填满而重写所有人。
- NPC事件：2-4 条个人线。至少 2 条来自未出场 NPC；每条写清动机、动作、阻力、下一步，不要只写结果。
- 国家事件：1-2 条国家层面。领域：内政/军事/外交/灾异/朝议/礼制/刑狱/财政。写政策或事件的因果链，不写某人的心情。
- 邻国事件：1-2 条外国/边境。必须带“国家”；领域：外交/边境/贸易/战争/和亲/使节。写对方朝廷的算计与边关的反应。
- 流言：0-3 条，能看出传播路径与口吻；流言不等于事实。
- 书信：0-2 封，只写别人写给{{user}}的来信，含称呼、落款、言外之意；不写发出的信。
- 关系：0-3 条，写“甲对乙”的方向；态度变化要写清因为哪件事。
- 伏笔：0-3 条，只记重要未回收线；完成的必须回收，并写清回收方式。来源写具体姓名/事件名，不写“NPC”。
- 奏折：1-3 条，朝堂公文；写标题、上奏人、衙门、事由、主张、反对、状态、结果、进度；要能看出谁得利、谁反对。
- 秘辛：0-2 条；写内容、涉及、证据/把柄、知情者（全知/部分/怀疑/只知片段）、不知情者；李承璟和{{user}}也可以知道或不知道。
- 流言：0-3 条；写来源人物、传播链 2-4 人、版本变化、可信度；流言不等于事实。
- 斗争：0-2 条；宫斗/政斗分开；写类型、发起者、目标、手段、烈度、阶段、证据、知情者、进度、结果；没有动机不要硬造。
- 时令：只按正文明确日期更新；写年号/年/月/日/节气/节日/时辰/备注；不要自己推季节。
- 孕事：开启时才写；写其他后妃的孕月、状态、风险、太医/宫人反应；{{user}}的孕事不写这里。
- 孕事子女：后妃已生产的孩子；写姓名、性别、身份、生母、亲缘（按世界书）、排行、出生、状态；不写进子嗣。
- 子嗣：只写{{user}}。用户字段：本回次数（只写新增）、受孕判定、孕期月、状态、月事最近、月事周期、月事持续、排卵期、排卵可能、发现、备注；子女字段：姓名、性别、身份、生母、亲缘、排行、年龄、出生、状态、备注。月事/排卵期按世界书/正文/太医记录详细写，没有就写“待定”，不能留空；亲缘按世界书写亲生/养子/过继/庶出/嫡出/不详，不默认亲生。

【朝堂门阀字段】派系：派系名、领袖、成员、主张、资源、目标、敌对、进度、备注。家族：家族、家主、成员、姻亲、世仇、产业、门生、立场、备注。
【医疗健康字段】只有正文出现伤病/中毒/脉案/用药/太医诊治时才生成；没有就空数组。字段：人物、日期、症状、诊断、方子、太医、忌口、状态、备注。
【节庆礼仪字段】已合并进时令：节日、礼仪、主礼、地点、座次、禁忌、节目、宴席。节日必须是古代节日，按年月日推算最近的节；礼仪、主礼、地点、座次、禁忌、节目都要按节日/门阀推演，不能写“未记”；宴席写名称、主家、地点、日期、宾客、目的。
【孕事字段】人物、孕月、状态、风险、胎象、太医、饮食、行动、预计产期、知情者、备注。
【孕事子女字段】后妃已有孩子就必须写，即使当前没怀孕；姓名、性别、身份、生母、亲缘、排行、年龄、出生、状态、备注。
【子嗣输出字段】
子嗣.用户：本回次数、受孕判定、孕期月、状态、月事最近、月事周期、月事持续、排卵期、排卵可能、发现、备注。
子嗣.子女：姓名、性别、身份、生母、亲缘、排行、年龄、出生、状态、备注。

【字段字典】
- NPC状态：心情=当下情绪；位置=此刻所在；年龄=数字；身份=位份/官职；当前所做=具体动作，不写“一切如常”。
- NPC事件：事件名=4-8字固定名；角色=主使/当事人；内容=目标+动作+阻力；进度=0-100；伏笔=是否留线。
- 国家事件：事件名、领域（内政/军事/外交/灾异/朝议/礼制/刑狱/财政）、内容（决策+执行+后果）、进度、伏笔。
- 邻国事件：事件名、国家、领域、内容（对方朝廷/边关动作）、进度、伏笔。
- 奏折：标题、上奏人、衙门、事由、主张、反对、状态（待议/留中/准奏/驳回/已结）、结果、进度。
- 秘辛：内容、涉及、证据/把柄、知情者[{人物,程度}]、不知情者、来源。程度=全知/部分/怀疑/只知片段。
- 流言：内容、来源人物、传播链[{人物,版本}]、可信度（真/半真/假/未知）、伏笔。流言不等于事实。
- 斗争：类型（宫斗/政斗）、事件名、发起者、目标、手段、烈度（低/中/高）、阶段（策划/执行/调查/反制/收场）、证据、知情者、进度、结果。
- 书信：只写别人给{{user}}的来信；来源、内容、时间，内容带称呼、落款、言外之意。
- 时令：年号、年、月、日、节气、节日、时辰、备注；只按正文明确日期。
- 关系：甲、乙、关系；写“甲对乙”的方向，双方态度不同写两条。
- 伏笔：内容、来源（具体姓名/事件名）、已回收、回收回合；完成的必须回收。
- 孕事：人物=后妃姓名；孕月=1-10；状态=有孕/稳定/不稳/见红/临盆/已生产/小产/难产；风险=低/中/高或具体风险；胎象=太医脉象/胎动/见红；太医=负责太医；饮食=忌口/安胎药；行动=静养/禁足/卧床；预计产期=日期或“未定”；知情者=[{人物,程度}]；备注。
- 孕事子女：姓名、性别、身份（太子/太女/王爷/公主/皇子/皇女）、生母、亲缘（按世界书）、排行、年龄、出生、状态（在世/夭折/过继）、备注。
- 朝堂门阀：派系名、领袖、成员、主张、资源、目标、敌对、进度；家族、家主、成员、姻亲、世仇、产业、门生、立场。
- 医疗健康（有才写）：人物、日期、症状、诊断、方子、太医、忌口、状态、备注；只有正文出现伤病/中毒/脉案/用药/太医诊治才写，没有就空数组；与孕事分开，孕事仍走孕事页。
- 节庆礼仪：已并入时令，写节日、礼仪、主礼、地点、座次、禁忌、节目。
- 子嗣.用户：本回次数=本回新增；受孕判定=未定/可能/已确认/未受孕；孕期月=0-10；状态=未孕/有孕/临盆/已生产/小产；月事最近=日期或“待定”；月事周期=天数；月事持续=天数；排卵期=日期范围或“周期第X-Y天”；排卵可能=高/中/低/未知；发现=[{人物,程度}]；备注。
- 子嗣.子女：姓名、性别、身份、生母、亲缘、排行、出生、状态、备注；只写{{user}}名下孩子，亲缘不默认亲生。

【输出结构】
{"NPC状态":{"具名":{"心情":"","位置":"","年龄":"","身份":"","当前所做":""}},"NPC事件":[{"事件名":"","角色":"","内容":"","进度":0,"伏笔":false}],"国家事件":[{"事件名":"","领域":"","内容":"","进度":0,"伏笔":false}],"邻国事件":[{"事件名":"","国家":"","领域":"","内容":"","进度":0,"伏笔":false}],"流言":[{"内容":"","伏笔":false}],"书信":[{"来源":"","内容":""}],"关系":[{"甲":"","乙":"","关系":""}],"伏笔":[{"内容":"","来源":"","已回收":false}]}

【数量与篇幅】
NPC状态不设上限（只写有变化/值得续写的人）；NPC事件 2-4 条；国家事件 1-2 条；邻国事件 1-2 条；流言 0-3 条；书信 0-2 封；关系 0-3 条；伏笔 0-3 条。每条 40-120 字；总字数以覆盖所有人和实际条目为准，不设上限，不要为凑字数灌水。

【示例】
{"NPC状态":{"周彦之":{"心情":"疲惫","位置":"中书省","年龄":"31","身份":"中书舍人","当前所做":"草拟整顿太学诏书，暗中删去牵连旧友的一条"}},"NPC事件":[{"事件名":"淑妃谋宠","角色":"淑妃","内容":"以赏菊为名邀圣上至御花园，暗令大公主偶然路过；她真正想要的是让皇后先出手。","进度":40,"伏笔":true},{"事件名":"太学暗账","角色":"国子监祭酒","内容":"连夜烧掉三箱荐书，怕御史台从太学查到自家门生。","进度":25,"伏笔":true}],"国家事件":[{"事件名":"太学整饬","领域":"朝议","内容":"御史台请裁太学冗员，中书省拟诏，国子监上下震动；清流与旧党都在抢名单。","进度":20,"伏笔":false}],"邻国事件":[{"事件名":"北狄互市","国家":"北狄","领域":"边境","内容":"北狄使节请求增开马市，边将疑其借机窥探军情；使团里混着一名会说京话的书记官。","进度":15,"伏笔":true}],"流言":[{"内容":"御膳房有人说，圣上昨夜没动那道莲子羹。","伏笔":false}],"书信":[{"来源":"沈微澜","内容":"臣妾安好，勿念。唯长秋宫炭火不足，不知可否请内务府匀些。"}],"关系":[{"甲":"淑妃","乙":"沈微澜","关系":"暗斗"}],"伏笔":[{"内容":"圣上深夜独坐西阁，或有心事","来源":"流言","已回收":false}]}`
};

const state = {
    mounted: false,
    host: null,
    shadow: null,
    root: null,
    refs: {},
    settings: null,
    dataCache: { key: '', data: null },
    worldbookEntryCache: [],
    worldbookLoading: false,
    injection: null,
    injectionKey: '',
    logs: [],
    busy: false,
    pending: null,
    gen: 0,
    tavernGen: 0,
    bootTries: 0,
    processed: new Map(),
    searchQuery: '',
    searchTimer: 0,
    autoStartId: -1,
    initialTried: false,
    initialBootTried: false,
    swipedId: -1,
    swipeAt: 0,
    ui: {
        tab: 'NPC状态',
        settingsTab: 'basic',
        batchOn: false,
        batchKeys: new Set(),
        struggleFilter: '全部',
        panelOpen: false,
        settingsOpen: false,
        locked: false,
        prevOverflow: '',
        prevOverscroll: ''
    },
    ball: {
        x: null,
        y: 0.28,
        dragging: false,
        moved: false,
        pointerId: null,
        startX: 0,
        startY: 0,
        startLeft: 0,
        startTop: 0,
        suppressClick: false,
        pendingLeft: 0,
        pendingTop: 0,
        raf: 0
    },
    doc: null,
    win: null,
    pageHideBound: false,
    keydownBound: false,
    resizeBound: false,
    listeners: []
};

/* ------------------------------------------------------------------ */
/* 基础工具                                                           */
/* ------------------------------------------------------------------ */

function getDoc() {
    try {
        if (window.parent && window.parent !== window && window.parent.document) {
            return window.parent.document;
        }
    } catch (e) { /* ignore */ }
    return document;
}

function getWin() {
    try {
        if (window.parent && window.parent !== window) return window.parent;
    } catch (e) { /* ignore */ }
    return window;
}

function escapeHtml(value) {
    return String(value === undefined || value === null ? '' : value).replace(/[&<>"']/g, ch => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
}

function escapeAttr(value) {
    return escapeHtml(value);
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function toInt(value, fallback) {
    const n = Number(value);
    return Number.isFinite(n) ? Math.round(n) : fallback;
}

const NPC_TITLES = ['皇太后', '太后', '皇后', '贵妃', '淑妃', '德妃', '贤妃', '妃', '嫔', '贵人', '才人', '昭仪', '婕妤', '美人', '公主', '皇子', '王爷', '侯爷', '尚书', '侍郎', '将军', '太医', '御医', '大人', '陛下', '殿下'];

function normalizeNpcDisplayName(name) {
    let n = cleanName(name).replace(/[（(][^）)]*[）)]/g, '').trim();
    if (!n) return inventNpcName(name);
    if (/[·|｜\-—:：]/.test(n)) {
        const parts = n.split(/[·|｜\-—:：]/).map(s => s.trim()).filter(Boolean);
        n = parts.find(p => !NPC_TITLES.some(t => p === t)) || parts[0] || n;
    }
    // “沈微澜 淑妃”“沈微澜淑妃”“崔尚书” → 去掉尾部位份；只有一个姓时补全名。
    for (const title of NPC_TITLES) {
        if (n.length > title.length && n.endsWith(title)) {
            const prefix = n.slice(0, -title.length).trim();
            if (prefix.length >= 2) n = prefix;
            else if (prefix.length === 1) n = prefix + inventNpcName(prefix + name).slice(1);
            break;
        }
    }
    for (const title of NPC_TITLES) {
        if (n.length > title.length + 1 && n.startsWith(title)) {
            n = n.slice(title.length).trim();
            break;
        }
    }
    if (isGenericNpcName(n) || NPC_TITLES.includes(n)) return inventNpcName(name);
    return n;
}

function isGenericNpcName(name) {
    const n = String(name || '').trim();
    return !n || ['NPC', 'npc', '群像', '群像人物', '某NPC', '某npc', '无名', '未记名', '佚名'].includes(n);
}

function inventNpcName(seed) {
    const surnames = ['沈', '谢', '崔', '裴', '陆', '顾', '萧', '温', '姜', '宋', '卫', '许'];
    const given = ['清和', '明烛', '知微', '令仪', '景行', '子瑜', '含章', '云舒', '怀瑾', '映雪', '长宁', '文昭'];
    const h = Math.abs(hashString(String(seed || 'npc')));
    return surnames[h % surnames.length] + given[Math.floor(h / 7) % given.length];
}

function clone(value) {
    try { return JSON.parse(JSON.stringify(value)); } catch (e) { return {}; }
}

function hashString(text) {
    let h = 2166136261;
    const s = String(text || '');
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return (h >>> 0).toString(16);
}

function isPlainObject(value) {
    return !!value && typeof value === 'object' && !Array.isArray(value);
}

function isTrue(value) {
    return value === true || value === 'true' || value === 1 || value === '1';
}

function toast(kind, message) {
    try {
        const t = (typeof toastr !== 'undefined' && toastr) ? toastr : (getWin().toastr || null);
        if (t && typeof t[kind] === 'function') t[kind](String(message));
    } catch (e) { /* ignore */ }
}

function cleanName(name) {
    return String(name === undefined || name === null ? '' : name)
        .trim()
        .replace(/[（(][^（()）]*[)）]\s*$/, '')
        .replace(/^[【\[（(]+|[】\]）)]+$/g, '')
        .trim();
}

function isBlacklisted(name) {
    const n = cleanName(name);
    if (!n) return true;
    return ['圣上', '陛下', '我', '朕'].includes(n);
}

function getUserNames() {
    const now = Date.now();
    if (now - userNamesCache.time < 1200) return userNamesCache.names;
    const names = [];
    const add = value => {
        const name = cleanName(value || '');
        if (!name || name.includes('{{') || name === CHARACTER_NAME) return;
        if (!names.includes(name)) names.push(name);
    };
    try {
        const ctx = typeof getContext === 'function' ? getContext() : null;
        if (ctx) {
            add(ctx.name1);
            add(ctx.user_name);
            add(ctx.userName);
            add(ctx.persona);
            add(ctx.name);
            if (ctx.user && typeof ctx.user === 'object') add(ctx.user.name);
        }
    } catch (e) { /* ignore */ }
    try {
        const win = getWin();
        add(win.name1);
        add(win.user_name);
    } catch (e) { /* ignore */ }
    try {
        // 第一条用户消息的名字最可靠；有些酒馆 getContext().name1 仍返回 {{user}}。
        const msgs = getChatMessages('0-10');
        if (Array.isArray(msgs)) {
            msgs.forEach(msg => {
                if (msg && (msg.is_user || msg.role === 'user')) add(msg.name);
            });
        }
    } catch (e) { /* ignore */ }
    if (names.length) userNamesCache = { time: now, names };
    return names;
}

function getUserDisplayName() {
    const names = getUserNames();
    return names[0] || '{{user}}';
}

function isLeadName(name) {
    const n = cleanName(name);
    if (!n) return false;
    if (n === CHARACTER_NAME) return true;
    if (n.toLowerCase().includes('{{user}}')) return true;
    return getUserNames().some(user => n === user || n.startsWith(user + '·'));
}

function getProgressNum(item) {
    if (!item || item.进度 === undefined || item.进度 === null || item.进度 === '') return 0;
    let raw = item.进度;
    if (typeof raw === 'string') raw = raw.replace(/[%％\s]/g, '');
    const n = Number(raw);
    if (!Number.isFinite(n)) return 0;
    return clamp(Math.round(n), 0, 100);
}

function normalizeEvent(event) {
    const out = Object.assign({}, event || {});
    ['事件名', '角色', '内容', '国家', '领域'].forEach(key => {
        if (out[key] !== undefined && out[key] !== null) {
            out[key] = String(out[key]).trim();
        }
    });
    if (out.事件名) out.事件名 = out.事件名.slice(0, 24);
    if (out.角色) out.角色 = out.角色.slice(0, 40);
    if (out.内容) out.内容 = out.内容.slice(0, 600);
    if (out.国家) out.国家 = out.国家.slice(0, 20);
    if (out.领域) out.领域 = out.领域.slice(0, 12);
    out.进度 = getProgressNum(out);
    out.伏笔 = isTrue(out.伏笔);
    const round = toInt(out.回合, 0);
    out.回合 = round > 0 ? round : 0;
    const updated = toInt(out.更新回合, 0);
    out.更新回合 = updated > 0 ? updated : 0;
    return out;
}

function eventLooksFinished(event) {
    const text = [event && event.事件名, event && event.内容, event && event.结果].filter(Boolean).join(' ');
    return /(已结束|已收场|已了结|尘埃落定|伏诛|事败|功成|已死|已退位|已和离|已失势|已结)/.test(text);
}

function eventKey(event) {
    const name = String(event && event.事件名 ? event.事件名 : '').trim();
    if (name) return 'n:' + name;
    return 'c:' + String(event && event.内容 ? event.内容 : '').replace(/\s+/g, '').slice(0, 16);
}

function normalizeKnower(item) {
    if (typeof item === 'string') {
        const name = cleanName(item);
        return name ? { 人物: name, 程度: '知情' } : null;
    }
    if (!isPlainObject(item)) return null;
    const name = cleanName(item.人物 || item.角色 || item.姓名);
    if (!name) return null;
    return { 人物: name, 程度: String(item.程度 || item.知道 || '知情').trim().slice(0, 20) || '知情' };
}

function normalizeKnowers(list) {
    const map = new Map();
    (Array.isArray(list) ? list : []).forEach(item => {
        const knower = normalizeKnower(item);
        if (knower && !map.has(knower.人物)) map.set(knower.人物, knower);
    });
    return Array.from(map.values());
}

function normalizeChain(list) {
    const out = [];
    (Array.isArray(list) ? list : []).forEach(item => {
        if (typeof item === 'string') {
            const name = cleanName(item);
            if (name) out.push({ 人物: name, 版本: '' });
            return;
        }
        if (!isPlainObject(item)) return;
        const name = cleanName(item.人物 || item.角色 || item.姓名);
        if (!name) return;
        out.push({ 人物: name, 版本: String(item.版本 || item.说法 || '').trim().slice(0, 120) });
    });
    return out.slice(0, 12);
}

function normalizeRumor(item, round) {
    if (item === undefined || item === null) return null;
    if (typeof item === 'string') {
        const content = item.trim();
        if (!content) return null;
        return { 内容: content.slice(0, 600), 来源人物: '', 传播链: [], 可信度: '传闻', 伏笔: false, 回合: round || 0 };
    }
    if (!isPlainObject(item)) return null;
    const content = String(item.内容 || '').trim();
    if (!content) return null;
    return {
        内容: content.slice(0, 600),
        来源人物: cleanName(item.来源人物 || item.来源 || '').slice(0, 40),
        传播链: normalizeChain(item.传播链 || item.传播 || []),
        可信度: String(item.可信度 || item.真假 || '传闻').trim().slice(0, 12) || '传闻',
        伏笔: isTrue(item.伏笔),
        回合: toInt(item.回合, round || 0) || 0
    };
}

function normalizeMemorial(item, round) {
    if (!isPlainObject(item)) return null;
    const title = String(item.标题 || item.事由 || item.名称 || '').trim().slice(0, 60);
    if (!title) return null;
    const status = String(item.状态 || '待议').trim().slice(0, 10);
    return {
        标题: title,
        上奏人: String(item.上奏人 || item.官员 || '').trim().slice(0, 40),
        衙门: String(item.衙门 || item.部门 || '').trim().slice(0, 30),
        事由: String(item.事由 || item.内容 || '').trim().slice(0, 600),
        主张: String(item.主张 || item.请求 || '').trim().slice(0, 300),
        反对: String(item.反对 || item.阻力 || '').trim().slice(0, 300),
        状态: status || '待议',
        结果: String(item.结果 || '').trim().slice(0, 300),
        进度: getProgressNum(item),
        回合: toInt(item.回合, round || 0) || 0,
        更新回合: toInt(item.更新回合, round || 0) || 0
    };
}

function normalizeSecret(item, round) {
    if (!isPlainObject(item)) return null;
    const content = String(item.内容 || item.秘密 || '').trim().slice(0, 600);
    if (!content) return null;
    const known = normalizeKnowers(item.知情者 || item.知道 || []);
    const unknown = normalizeKnowers(item.不知情者 || item.不知道 || []);
    const knownNames = new Set(known.map(k => k.人物));
    return {
        内容: content,
        涉及: String(item.涉及 || item.人物 || '').trim().slice(0, 80),
        知情者: known,
        不知情者: unknown.filter(k => !knownNames.has(k.人物)),
        证据: String(item.证据 || item.把柄 || '').trim().slice(0, 300),
        来源: String(item.来源 || '').trim().slice(0, 30),
        回合: toInt(item.回合, round || 0) || 0
    };
}

function normalizeStruggle(item, round) {
    if (!isPlainObject(item)) return null;
    const name = String(item.事件名 || item.名称 || '').trim().slice(0, 40);
    if (!name) return null;
    const type = String(item.类型 || '').includes('政') ? '政斗' : '宫斗';
    const level = String(item.烈度 || item.等级 || '低');
    return {
        类型: type,
        事件名: name,
        发起者: String(item.发起者 || '').trim().slice(0, 40),
        目标: String(item.目标 || '').trim().slice(0, 80),
        手段: String(item.手段 || '').trim().slice(0, 200),
        烈度: /高/.test(level) ? '高' : /中/.test(level) ? '中' : '低',
        阶段: String(item.阶段 || '策划').trim().slice(0, 10),
        证据: String(item.证据 || '').trim().slice(0, 300),
        知情者: normalizeKnowers(item.知情者 || []),
        进度: getProgressNum(item),
        结果: String(item.结果 || '').trim().slice(0, 300),
        回合: toInt(item.回合, round || 0) || 0,
        更新回合: toInt(item.更新回合, round || 0) || 0
    };
}

function normalizeBanquet(item, round) {
    if (!isPlainObject(item)) return null;
    const name = String(item.名称 || item.宴名 || '').trim();
    if (!name) return null;
    return {
        名称: name.slice(0, 40),
        主家: String(item.主家 || item.主办 || '').trim().slice(0, 40),
        地点: String(item.地点 || '').trim().slice(0, 40),
        日期: String(item.日期 || item.时间 || '').trim().slice(0, 30),
        宾客: String(item.宾客 || '').trim().slice(0, 120),
        目的: String(item.目的 || '').trim().slice(0, 100),
        备注: String(item.备注 || '').trim().slice(0, 120),
        回合: toInt(item.回合, round || 0) || 0
    };
}

function mergeBanquets(oldList, newList, round) {
    const map = new Map();
    (Array.isArray(oldList) ? oldList : []).forEach(item => {
        const b = normalizeBanquet(item, 0);
        if (b) map.set(b.名称, b);
    });
    (Array.isArray(newList) ? newList : []).forEach(item => {
        const b = normalizeBanquet(item, round);
        if (!b) return;
        const old = map.get(b.名称);
        if (!old) { map.set(b.名称, b); return; }
        ['主家', '地点', '日期', '宾客', '目的', '备注'].forEach(k => { if (b[k]) old[k] = b[k]; });
    });
    return Array.from(map.values());
}

function normalizeTime(raw) {
    const t = isPlainObject(raw) ? raw : {};
    return {
        年号: String(t.年号 || '').trim().slice(0, 10),
        年: Math.max(0, toInt(t.年, 0)),
        月: clamp(toInt(t.月, 0), 0, 12),
        日: clamp(toInt(t.日, 0), 0, 31),
        节气: String(t.节气 || '').trim().slice(0, 10),
        节日: String(t.节日 || '').trim().slice(0, 20),
        礼仪: String(t.礼仪 || '').trim().slice(0, 30),
        主礼: String(t.主礼 || '').trim().slice(0, 40),
        地点: String(t.地点 || '').trim().slice(0, 40),
        座次: String(t.座次 || '').trim().slice(0, 80),
        禁忌: String(t.禁忌 || '').trim().slice(0, 80),
        节目: String(t.节目 || '').trim().slice(0, 120),
        宴席: (Array.isArray(t.宴席) ? t.宴席 : []).map(item => normalizeBanquet(item, 0)).filter(Boolean),
        时辰: String(t.时辰 || '').trim().slice(0, 10),
        备注: String(t.备注 || '').trim().slice(0, 120)
    };
}

function normalizeLetter(item, round) {
    if (item === undefined || item === null) return null;
    if (typeof item === 'string') {
        const content = item.trim();
        if (!content) return null;
        return { 方向: '收', 来源: '佚名', 内容: content.slice(0, 800), 回合: round || 0 };
    }
    if (!isPlainObject(item)) return null;
    const content = String(item.内容 || '').trim();
    if (!content) return null;
    const direction = (item.方向 === '发' || item.去向) ? '发' : '收';
    return {
        方向: direction,
        来源: direction === '收' ? String(item.来源 || '佚名').trim().slice(0, 40) : undefined,
        去向: direction === '发' ? String(item.去向 || item.来源 || '佚名').trim().slice(0, 40) : undefined,
        内容: content.slice(0, 800),
        回合: toInt(item.回合, round || 0) || 0
    };
}

function normalizeForeshadow(item, round) {
    if (item === undefined || item === null) return null;
    if (typeof item === 'string') {
        const content = item.trim();
        if (!content) return null;
        return { 内容: content.slice(0, 400), 来源: '手动', 已回收: false, 回合: round || 0 };
    }
    if (!isPlainObject(item)) return null;
    const content = String(item.内容 || '').trim();
    if (!content) return null;
    const recovered = isTrue(item.已回收);
    let source = String(item.来源人物 || item.人物 || item.来源 || '手动').trim().slice(0, 30);
    if (['NPC', 'npc', '群像', '剧情', 'NPC事件', '事件', '未记名'].includes(source)) source = inventNpcName(content);
    return {
        内容: content.slice(0, 400),
        来源: source,
        已回收: recovered,
        回收回合: recovered ? Math.max(1, toInt(item.回收回合, 0)) : 0,
        回合: toInt(item.回合, round || 0) || 0
    };
}

function parseChineseNumber(input) {
    const s = String(input || '').replace(/[^\d一二三四五六七八九十百零〇两廿卅]/g, '');
    if (!s) return 0;
    if (/^\d+$/.test(s)) return parseInt(s, 10) || 0;
    if (/[廿卅]/.test(s)) {
        const base = s.includes('卅') ? 30 : 20;
        const rest = s.replace(/[廿卅十]/g, '');
        return base + ({ 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 }[rest] || 0);
    }
    const digits = { 零: 0, 〇: 0, 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
    let total = 0;
    let section = 0;
    let num = 0;
    for (const ch of s) {
        if (digits[ch] !== undefined) {
            num = digits[ch];
        } else if (ch === '十') {
            section += (num || 1) * 10;
            num = 0;
        } else if (ch === '百') {
            section += (num || 1) * 100;
            num = 0;
            total += section;
            section = 0;
        }
    }
    return total + section + num;
}

function ageNumber(age) {
    const text = String(age || '');
    const match = text.match(/\d+/);
    if (match) return parseInt(match[0], 10) || 0;
    return parseChineseNumber(text);
}

function incrementAge(age, delta) {
    const text = String(age || '').trim();
    if (!text || text.includes('不详')) return text;
    if (/\d+/.test(text)) return text.replace(/\d+/, n => String(parseInt(n, 10) + delta));
    const n = parseChineseNumber(text);
    if (!n) return text;
    return text.replace(/[一二三四五六七八九十百零〇两]+/, String(n + delta));
}

function extractEra(text) {
    const match = String(text || '').match(/景衡\s*([0-9一二三四五六七八九十百零〇两]+)\s*年/);
    if (!match) return null;
    const year = parseChineseNumber(match[1]);
    return year ? { 年号: '景衡', 年: year } : null;
}

function extractCalendar(text) {
    const s = String(text || '');
    const monthMatch = s.match(/([一二三四五六七八九十百零〇两\d]+)\s*月/);
    const dayMatch = s.match(/(?:初|廿)([一二三四五六七八九十百零〇两\d]+)|([一二三四五六七八九十百零〇两\d]+)\s*[日号]/);
    const month = monthMatch ? parseChineseNumber(monthMatch[1]) : 0;
    const day = dayMatch ? parseChineseNumber(dayMatch[1] || dayMatch[2]) : 0;
    if (!month && !day) return null;
    return {
        月: clamp(month, 0, 12),
        日: clamp(day, 0, 31)
    };
}

async function advanceYearFromMessage(messageId, text) {
    const era = extractEra(text);
    const calendar = extractCalendar(text);
    if (!era && !calendar) return false;
    let data = getGroupData();
    if (!data) data = normalizeData({});
    const current = data.纪年 || { 年号: '', 年: 0 };
    let changed = false;

    if (era && (!current.年 || era.年 > current.年)) {
        if (current.年) {
            const delta = era.年 - current.年;
            Object.values(data.NPC状态 || {}).forEach(info => {
                if (info && info.年龄) info.年龄 = incrementAge(info.年龄, delta);
            });
        }
        data.纪年 = era;
        data.时令 = mergeTime(data.时令, { 年号: era.年号, 年: era.年 });
        changed = true;
    }

    if (calendar) {
        const year = era ? era : (data.纪年 || current);
        data.时令 = mergeTime(data.时令, {
            年号: year.年号 || '景衡',
            年: year.年 || 0,
            月: calendar.月,
            日: calendar.日
        });
        if (data.时令.年) data.纪年 = { 年号: data.时令.年号 || '景衡', 年: data.时令.年 };
        changed = true;
    }

    if (!changed) return false;
    await attachGroupData(messageId, data);
    try { renderAll(); } catch (e) { /* ignore */ }
    return true;
}

function normalizePregnancy(item, round) {
    if (!isPlainObject(item)) return null;
    const person = cleanName(item.人物 || item.角色 || item.姓名);
    if (isBlacklisted(person) || isLeadName(person)) return null;
    const month = clamp(toInt(item.孕月 !== undefined ? item.孕月 : item.月份, 0), 0, 12);
    const status = String(item.状态 || '').trim().slice(0, 30);
    const note = String(item.备注 || '').trim().slice(0, 160);
    const ended = isTrue(item.已结束) || /(已生产|小产|流产|结束|诞下|难产)/.test(status);
    return {
        人物: person,
        孕月: month,
        状态: status || (ended ? '已结束' : '有孕'),
        风险: String(item.风险 || item.稳不稳 || '').trim().slice(0, 20),
        胎象: String(item.胎象 || item.脉象 || '').trim().slice(0, 80),
        太医: String(item.太医 || item.医者 || '').trim().slice(0, 40),
        饮食: String(item.饮食 || '').trim().slice(0, 80),
        行动: String(item.行动 || item.行动限制 || '').trim().slice(0, 80),
        预计产期: String(item.预计产期 || item.产期 || '').trim().slice(0, 30),
        知情者: normalizeKnowers(item.知情者 || item.发现 || []),
        备注: note,
        已结束: ended,
        回合: toInt(item.回合, round || 0) || 0
    };
}

function normalizeNpcPatch(patch) {
    const allowed = ['心情', '位置', '年龄', '身份', '当前所做'];
    const out = {};
    if (!isPlainObject(patch)) return out;
    allowed.forEach(key => {
        const value = patch[key];
        if (value === undefined || value === null || value === '') return;
        if (typeof value === 'object') return;
        out[key] = String(value).trim().slice(0, 120);
    });
    return out;
}

function normalizeData(raw) {
    const out = isPlainObject(raw) ? clone(raw) : {};
    const npc = {};
    if (isPlainObject(out.NPC状态)) {
        Object.entries(out.NPC状态).forEach(([name, info]) => {
            let n = normalizeNpcDisplayName(name);
            if (isBlacklisted(n) || !isPlainObject(info)) return;
            const patch = normalizeNpcPatch(info);
            if (Object.keys(patch).length) {
                patch.更新回合 = Math.max(0, toInt(info.更新回合, 0));
                if (isGenericNpcName(n)) n = inventNpcName(n + JSON.stringify(patch));
                let candidate = n;
                let suffix = 0;
                while (npc[candidate]) candidate = n + ['', '·二', '·三', '·四'][++suffix] || n + '·' + (suffix + 1);
                npc[candidate] = patch;
            }
        });
    }
    out.NPC状态 = npc;

    ['NPC事件', '国家事件', '邻国事件'].forEach(key => {
        out[key] = (Array.isArray(out[key]) ? out[key] : [])
            .map(normalizeEvent)
            .filter(e => e.事件名 || e.内容);
        if (key === 'NPC事件') {
            out[key].forEach(e => {
                if (isGenericNpcName(e.角色)) e.角色 = inventNpcName((e.事件名 || '') + (e.内容 || ''));
            });
        }
    });

    out.流言 = (Array.isArray(out.流言) ? out.流言 : [])
        .map(item => normalizeRumor(item, 0))
        .filter(Boolean);

    out.书信 = (Array.isArray(out.书信) ? out.书信 : [])
        .map(item => normalizeLetter(item, 0))
        .filter(Boolean);

    out.关系 = (Array.isArray(out.关系) ? out.关系 : [])
        .map(r => {
            if (!isPlainObject(r)) return null;
            const a = cleanName(r.甲);
            const b = cleanName(r.乙);
            if (isBlacklisted(a) || isBlacklisted(b)) return null;
            const relation = String(r.关系 || '').trim().slice(0, 40);
            return { 甲: a, 乙: b, 关系: relation };
        })
        .filter(Boolean);

    out.奏折 = (Array.isArray(out.奏折) ? out.奏折 : [])
        .map(item => normalizeMemorial(item, 0))
        .filter(Boolean);
    out.秘辛 = (Array.isArray(out.秘辛) ? out.秘辛 : [])
        .map(item => normalizeSecret(item, 0))
        .filter(Boolean);
    out.斗争 = (Array.isArray(out.斗争) ? out.斗争 : [])
        .map(item => normalizeStruggle(item, 0))
        .filter(Boolean);
    out.时令 = normalizeTime(out.时令);

    out.伏笔 = dedupeForeshadow(Array.isArray(out.伏笔) ? out.伏笔 : []);

    out.孕事 = (Array.isArray(out.孕事) ? out.孕事 : [])
        .map(item => normalizePregnancy(item, 0))
        .filter(Boolean);
    out.孕事子女 = (Array.isArray(out.孕事子女) ? out.孕事子女 : [])
        .map(item => normalizeChild(item, 0))
        .filter(Boolean);

    out.朝堂门阀 = normalizeCourt(out.朝堂门阀, 0);
    out.医疗健康 = (Array.isArray(out.医疗健康) ? out.医疗健康 : [])
        .map(item => normalizeHealth(item, 0))
        .filter(Boolean);

    out.子嗣 = normalizeHeir(out.子嗣, 0);

    const era = isPlainObject(out.纪年) ? out.纪年 : {};
    out.纪年 = { 年号: String(era.年号 || '').trim().slice(0, 10), 年: Math.max(0, toInt(era.年, 0)) };

    out.最后更新回合 = Math.max(0, toInt(out.最后更新回合, 0));
    out.子嗣 = deriveChildAges(out.子嗣, out.时令);
    out.孕事子女 = deriveChildAges({ 用户: {}, 子女: out.孕事子女 }, out.时令).子女;
    const knownNames = Object.keys(out.NPC状态 || {}).filter(name => !isBlacklisted(name));
    (out.伏笔 || []).forEach(item => {
        const source = cleanName(item.来源);
        if (source && !['手动', '未记名', 'NPC', '群像', '剧情'].includes(source)) return;
        const hit = knownNames.find(name => String(item.内容 || '').includes(name));
        item.来源 = hit || knownNames[0] || inventNpcName(item.内容 || '伏笔');
    });
    out.版本 = 2;
    return out;
}

function hasContent(fresh) {
    if (!isPlainObject(fresh)) return false;
    if (isPlainObject(fresh.NPC状态)) {
        const usable = Object.keys(fresh.NPC状态).some(name => !isBlacklisted(cleanName(name)));
        if (usable) return true;
    }
    if (isPlainObject(fresh.时令) && Object.values(fresh.时令).some(value => value)) return true;
    if (isPlainObject(fresh.子嗣)) {
        const user = fresh.子嗣.用户 || {};
        if (user.本回次数 || user.内射次数 || user.受孕判定 || user.孕期月 || user.月事最近 || user.排卵期 || user.状态 && user.状态 !== '未孕') return true;
        if (Array.isArray(fresh.子嗣.子女) && fresh.子嗣.子女.length) return true;
    }
    if (isPlainObject(fresh.朝堂门阀) && ((fresh.朝堂门阀.派系 || []).length || (fresh.朝堂门阀.家族 || []).length)) return true;
    return ['NPC事件', '国家事件', '邻国事件', '流言', '书信', '关系', '伏笔', '孕事', '孕事子女', '奏折', '秘辛', '斗争', '医疗健康']
        .some(key => Array.isArray(fresh[key]) && fresh[key].length > 0);
}

/* ------------------------------------------------------------------ */
/* 设置与预设                                                         */
/* ------------------------------------------------------------------ */

function normalizeApiProfiles(raw) {
    const list = Array.isArray(raw) ? raw : [];
    const seen = new Set();
    return list.map((item, index) => {
        if (!isPlainObject(item)) return null;
        const name = String(item.name || item.名称 || '').trim().slice(0, 30);
        const url = String(item.url || item.地址 || '').trim().slice(0, 300);
        if (!name || !url) return null;
        let id = String(item.id || '').trim().slice(0, 40);
        if (!id) id = 'api_' + hashString(name + '|' + url + '|' + index);
        if (seen.has(id)) id = id + '_' + index;
        seen.add(id);
        return {
            id,
            name,
            url,
            key: String(item.key || item.密钥 || '').trim().slice(0, 400),
            model: String(item.model || item.模型 || '').trim().slice(0, 160)
        };
    }).filter(Boolean).slice(0, 20);
}

function normalizeSettings(raw) {
    const out = Object.assign({}, DEFAULT_SETTINGS, isPlainObject(raw) ? raw : {});
    const previousSettingsVersion = toInt(out.version, 0);
    out.version = 4;
    if (previousSettingsVersion < 4) {
        // 默认不注入；旧设置也不要强行打开。
        out.injectLetters = false;
        out.injectTimeline = false;
    }
    out.enabled = out.enabled !== false;
    out.mode = out.mode === 'main' ? 'main' : 'sub';
    out.trigger = out.trigger === 'manual' ? 'manual' : 'auto';
    out.initialFill = out.initialFill === 'manual' ? 'manual' : 'auto';
    out.worldbookMode = ['follow', 'on', 'off'].includes(out.worldbookMode) ? out.worldbookMode : 'follow';
    out.worldbookEntries = isPlainObject(out.worldbookEntries) ? out.worldbookEntries : {};
    out.presetName = String(out.presetName || '正常');
    out.subApiUrl = String(out.subApiUrl || '').trim();
    out.subApiKey = String(out.subApiKey || '').trim();
    out.subApiModel = String(out.subApiModel || '').trim();
    out.temperature = clamp(Number(out.temperature) || 0, 0, 2);
    out.maxTokens = clamp(toInt(out.maxTokens, 4000), 200, 8000);
    out.debug = isTrue(out.debug);
    out.theme = THEMES[out.theme] ? out.theme : 'A';
    ['injectEvents', 'injectNpc', 'injectRumors', 'injectLetters', 'injectForeshadow', 'injectRelations', 'injectTimeline', 'pregnancyModule', 'heirModule', 'foreshadowAi', 'foreshadowUser', 'leadGroup', 'memorialModule', 'courtModule', 'medicalModule', 'secretModule', 'calendarModule', 'struggleModule', 'injectPregnancy', 'injectHeir', 'injectCourt', 'injectMedical', 'injectSecrets'].forEach(key => {
        out[key] = out[key] !== false;
    });
    out.ballSize = clamp(toInt(out.ballSize, 50), 36, 84);
    out.ballStyle = ['compass','lantern','seal','mirror','bamboo'].includes(out.ballStyle) ? out.ballStyle : 'compass';
    out.ballImage = typeof out.ballImage === 'string' && /^data:image\//.test(out.ballImage) ? out.ballImage.slice(0, 2000000) : '';
    out.panelImage = typeof out.panelImage === 'string' && /^data:image\//.test(out.panelImage) ? out.panelImage.slice(0, 3000000) : '';
    out.apiProfiles = normalizeApiProfiles(out.apiProfiles);
    out.apiProfileId = String(out.apiProfileId || '').trim();
    if (out.apiProfileId && !out.apiProfiles.some(item => item.id === out.apiProfileId)) out.apiProfileId = '';
    out.relationView = out.relationView === 'graph' ? 'graph' : 'card';
    out.timelineRange = clamp(toInt(out.timelineRange, 20), 0, 9999);
    const pos = isPlainObject(out.ballPos) ? out.ballPos : {};
    out.ballPos = {
        x: (pos.x === null || pos.x === undefined || pos.x === '' || !Number.isFinite(Number(pos.x))) ? null : clamp(Number(pos.x), 0, 1),
        y: (pos.y === null || pos.y === undefined || pos.y === '' || !Number.isFinite(Number(pos.y))) ? 0.28 : clamp(Number(pos.y), 0, 1)
    };
    out.followList = Array.isArray(out.followList) ? out.followList.map(cleanName).filter(Boolean).slice(0, 30) : [];
    return out;
}

function getSettings() {
    if (state.settings) return state.settings;
    let raw = {};
    try {
        const vars = getVariables({ type: 'global' }) || {};
        raw = vars.群像设置 || {};
    } catch (e) { /* ignore */ }
    state.settings = normalizeSettings(raw);
    return state.settings;
}

function getBallSize() {
    return clamp(toInt(getSettings().ballSize, 50), 36, 84);
}

function mergeSettingsPatch(base, patch) {
    const safePatch = patch || {};
    const next = Object.assign({}, base || {}, safePatch);
    if (isPlainObject(safePatch.ballPos)) {
        next.ballPos = Object.assign({}, (base && base.ballPos) || {}, safePatch.ballPos);
    }
    return normalizeSettings(next);
}

function saveSettings(patch) {
    const next = mergeSettingsPatch(getSettings(), patch);
    state.settings = next;
    try {
        updateVariablesWith(vars => {
            const current = isPlainObject(vars.群像设置) ? vars.群像设置 : {};
            vars.群像设置 = mergeSettingsPatch(current, patch);
            return vars;
        }, { type: 'global' });
    } catch (e) {
        console.warn('[群像志] 保存设置失败', e);
    }
}

const PRESET_REVISION = 5;
const BUILTIN_PRESETS = ['精简', '正常', '详细'];

function getPresets() {
    let custom = {};
    try {
        const vars = getVariables({ type: 'global' }) || {};
        custom = isPlainObject(vars.群像预设) ? vars.群像预设 : {};
        // 旧版把内置三档也存进自定义，导致新提示词永远被旧文案覆盖。
        // 升级到第 2 版时清掉内置档的旧覆盖，只保留用户自己另存的名字。
        if (toInt(vars.群像预设版本, 0) !== PRESET_REVISION) {
            const next = Object.assign({}, custom);
            BUILTIN_PRESETS.forEach(name => { delete next[name]; });
            custom = next;
            try {
                updateVariablesWith(v => {
                    v.群像预设 = next;
                    v.群像预设版本 = PRESET_REVISION;
                    return v;
                }, { type: 'global' });
            } catch (e) { /* ignore */ }
        }
    } catch (e) { /* ignore */ }
    const out = Object.assign({}, PRESET_DEFAULT);
    Object.entries(custom).forEach(([name, content]) => {
        if (typeof content === 'string' && content.trim()) out[name] = content;
    });
    return out;
}

function savePreset(name, content) {
    const key = String(name || '').trim().slice(0, 20);
    if (!key || typeof content !== 'string' || !content.trim()) return false;
    try {
        updateVariablesWith(vars => {
            if (!isPlainObject(vars.群像预设)) vars.群像预设 = {};
            vars.群像预设[key] = content;
            return vars;
        }, { type: 'global' });
        return true;
    } catch (e) {
        console.warn('[群像志] 保存预设失败', e);
        return false;
    }
}

function deletePreset(name) {
    if (name === '正常' || name === '详细' || name === '精简') return false;
    try {
        updateVariablesWith(vars => {
            if (isPlainObject(vars.群像预设) && vars.群像预设[name]) delete vars.群像预设[name];
            return vars;
        }, { type: 'global' });
        return true;
    } catch (e) { return false; }
}

function getLogs() {
    try {
        const vars = getVariables({ type: 'global' }) || {};
        if (Array.isArray(vars.群像调试)) return vars.群像调试.slice(0, MAX_LOG);
    } catch (e) { /* ignore */ }
    return state.logs.slice(0, MAX_LOG);
}

function appendLog(entry) {
    if (!getSettings().debug) return;
    const item = Object.assign({
        时间: new Date().toTimeString().slice(0, 8),
        消息ID: '-',
        模式: '-',
        标签: '-',
        原始: '',
        结果: ''
    }, entry || {});
    state.logs.unshift(item);
    state.logs = state.logs.slice(0, MAX_LOG);
    try {
        updateVariablesWith(vars => {
            const arr = Array.isArray(vars.群像调试) ? vars.群像调试 : [];
            arr.unshift(item);
            vars.群像调试 = arr.slice(0, MAX_LOG);
            return vars;
        }, { type: 'global' });
    } catch (e) { /* ignore */ }
}

function clearLogs() {
    state.logs = [];
    try {
        updateVariablesWith(vars => { vars.群像调试 = []; return vars; }, { type: 'global' });
    } catch (e) { /* ignore */ }
}

/* ------------------------------------------------------------------ */
/* 数据读取与写回                                                     */
/* ------------------------------------------------------------------ */

function getChatStamp() {
    try {
        const last = getLastMessageId();
        const msg = getChatMessages(last)[0];
        return last + ':' + (msg ? String(msg.message || '').length : 0);
    } catch (e) { return ''; }
}

function readGroupDataFromMessage(msg) {
    if (!msg || msg.role !== 'assistant' || !msg.data || !msg.data.群像) return null;
    let raw = msg.data.群像;
    if (typeof raw === 'string') {
        try { raw = JSON.parse(raw); } catch (e) { return null; }
    }
    return normalizeData(raw);
}

function getGroupData() {
    try {
        const stamp = getChatStamp();
        if (state.dataCache.key === stamp) return state.dataCache.data;
        const lastId = getLastMessageId();
        if (lastId < 0) return null;

        // 群像数据总挂在最近一条 AI 楼层上，向前找几十楼足够；
        // 逐楼读取比一次性取全聊天更省内存，也能兼容超长聊天。
        const stop = Math.max(0, lastId - 80);
        for (let i = lastId; i >= stop; i--) {
            const msgs = getChatMessages(i);
            if (!msgs || !msgs.length) continue;
            const data = readGroupDataFromMessage(msgs[0]);
            if (data) {
                state.dataCache = { key: stamp, data };
                return data;
            }
        }

        // 最近 80 楼没有，再一次性回看更早的楼层；避免脚本中途启用时找不到旧数据。
        if (stop > 0) {
            const older = getChatMessages('0-' + (stop - 1));
            if (Array.isArray(older)) {
                for (let i = older.length - 1; i >= 0; i--) {
                    const data = readGroupDataFromMessage(older[i]);
                    if (data) {
                        state.dataCache = { key: stamp, data };
                        return data;
                    }
                }
            }
        }
        state.dataCache = { key: stamp, data: null };
    } catch (e) { /* ignore */ }
    return null;
}

function invalidateData() {
    state.dataCache = { key: '', data: null };
}

function getPrevGroupData(id) {
    if (id <= 0) return null;
    try {
        const stop = Math.max(0, id - 81);
        for (let i = id - 1; i >= stop; i--) {
            const msgs = getChatMessages(i);
            if (!msgs || !msgs.length) continue;
            const data = readGroupDataFromMessage(msgs[0]);
            if (data) return data;
        }
        if (stop > 0) {
            const older = getChatMessages('0-' + (stop - 1));
            if (Array.isArray(older)) {
                for (let i = older.length - 1; i >= 0; i--) {
                    const data = readGroupDataFromMessage(older[i]);
                    if (data) return data;
                }
            }
        }
    } catch (e) { /* ignore */ }
    return null;
}

async function clearGroupDataFromMessage(messageId) {
    try {
        const msgs = getChatMessages(messageId);
        if (!msgs || !msgs.length) return false;
        const msg = msgs[0];
        if (!msg || !msg.data || !Object.prototype.hasOwnProperty.call(msg.data, '群像')) return false;
        // 酒馆的 setChatMessages 对 data 可能做浅合并；只 delete 有时删不掉，
        // 这里同时写 null，读取端会把 null 当作没有群像数据。
        const nextData = Object.assign({}, msg.data, { 群像: null });
        await setChatMessages([{ message_id: messageId, data: nextData }], { refresh: 'none' });
        invalidateData();
        return true;
    } catch (e) {
        console.warn('[群像志] 清理楼层群像数据失败', e);
        return false;
    }
}

async function attachGroupData(messageId, data) {
    try {
        const msgs = getChatMessages(messageId);
        if (!msgs || !msgs.length) return false;
        const msg = msgs[0];
        const newData = Object.assign({}, msg.data || {}, { 群像: data });
        await setChatMessages([{ message_id: messageId, data: newData }], { refresh: 'none' });
        state.dataCache = { key: '', data: normalizeData(data) };
        return true;
    } catch (e) {
        console.warn('[群像志] 写入楼层数据失败', e);
        return false;
    }
}

function getLatestAssistantId() {
    try {
        const lastId = getLastMessageId();
        if (lastId < 0) return -1;
        const stop = Math.max(0, lastId - 40);
        for (let i = lastId; i >= stop; i--) {
            const m = getChatMessages(i)[0];
            if (m && m.role === 'assistant' && !m.is_hidden) return i;
        }
    } catch (e) { /* ignore */ }
    return -1;
}

/* ------------------------------------------------------------------ */
/* 合并（纯逻辑）                                                     */
/* ------------------------------------------------------------------ */

function mergeEvents(oldList, newList, round) {
    const map = new Map();
    (Array.isArray(oldList) ? oldList : []).forEach(item => {
        const event = normalizeEvent(item);
        const key = eventKey(event);
        if (!key || (!event.事件名 && !event.内容)) return;
        map.set(key, event);
    });
    (Array.isArray(newList) ? newList : []).forEach(item => {
        const event = normalizeEvent(item);
        const key = eventKey(event);
        if (!key || (!event.事件名 && !event.内容)) return;
        const old = map.get(key);
        if (!old) {
            event.回合 = round;
            event.更新回合 = round;
            if (eventLooksFinished(event)) event.进度 = 100;
            map.set(key, event);
            return;
        }
        const merged = Object.assign({}, old, event);
        merged.事件名 = old.事件名 || event.事件名;
        merged.角色 = event.角色 || old.角色;
        merged.回合 = old.回合 || round;
        merged.更新回合 = round;
        merged.伏笔 = old.伏笔 || event.伏笔;
        const oldProgress = getProgressNum(old);
        if (oldProgress >= 100) {
            merged.进度 = 100;
            merged.内容 = old.内容 || event.内容;
        } else {
            merged.进度 = Math.max(oldProgress, getProgressNum(event));
        }
        if (eventLooksFinished(merged)) merged.进度 = 100;
        map.set(key, merged);
    });
    return Array.from(map.values());
}

function mergeRumors(oldList, newList, round) {
    const out = [];
    const seen = new Set();
    (Array.isArray(oldList) ? oldList : []).forEach(item => {
        const rumor = normalizeRumor(item, 0);
        if (!rumor) return;
        const key = rumor.内容.replace(/\s+/g, '').slice(0, 30);
        if (seen.has(key)) return;
        seen.add(key);
        out.push(rumor);
    });
    (Array.isArray(newList) ? newList : []).forEach(item => {
        const rumor = normalizeRumor(item, round);
        if (!rumor) return;
        const key = rumor.内容.replace(/\s+/g, '').slice(0, 30);
        if (seen.has(key)) {
            const old = out.find(r => r.内容.replace(/\s+/g, '').slice(0, 30) === key);
            if (old) {
                if (rumor.伏笔) old.伏笔 = true;
                old.来源人物 = old.来源人物 || rumor.来源人物;
                old.传播链 = mergeChain(old.传播链, rumor.传播链);
                old.可信度 = rumor.可信度 && rumor.可信度 !== '传闻' ? rumor.可信度 : old.可信度;
            }
            return;
        }
        seen.add(key);
        out.push(rumor);
    });
    return out.slice(-30);
}

function mergeLetters(oldList, newList, round) {
    const out = [];
    const seen = new Set();
    (Array.isArray(oldList) ? oldList : []).forEach(item => {
        const letter = normalizeLetter(item, 0);
        if (!letter) return;
        const key = (letter.方向 || '收') + '|' + letter.内容.replace(/\s+/g, '').slice(0, 30);
        if (seen.has(key)) return;
        seen.add(key);
        out.push(letter);
    });
    (Array.isArray(newList) ? newList : []).forEach(item => {
        const letter = normalizeLetter(item, round);
        if (!letter) return;
        const key = (letter.方向 || '收') + '|' + letter.内容.replace(/\s+/g, '').slice(0, 30);
        if (seen.has(key)) return;
        seen.add(key);
        out.push(letter);
    });
    return out.slice(-30);
}

function mergeChain(oldChain, newChain) {
    const map = new Map();
    (Array.isArray(oldChain) ? oldChain : []).forEach(item => {
        if (item && item.人物) map.set(item.人物, item);
    });
    (Array.isArray(newChain) ? newChain : []).forEach(item => {
        if (!item || !item.人物) return;
        const old = map.get(item.人物);
        map.set(item.人物, { 人物: item.人物, 版本: item.版本 || (old && old.版本) || '' });
    });
    return Array.from(map.values());
}

function mergeMemorials(oldList, newList, round) {
    const map = new Map();
    (Array.isArray(oldList) ? oldList : []).forEach(item => {
        const record = normalizeMemorial(item, 0);
        if (record) map.set(record.标题, record);
    });
    (Array.isArray(newList) ? newList : []).forEach(item => {
        const record = normalizeMemorial(item, round);
        if (!record) return;
        const old = map.get(record.标题);
        if (!old) {
            record.回合 = record.回合 || round;
            record.更新回合 = round;
            map.set(record.标题, record);
            return;
        }
        const merged = Object.assign({}, old, record);
        merged.回合 = old.回合 || round;
        merged.更新回合 = round;
        merged.进度 = Math.max(getProgressNum(old), getProgressNum(record));
        merged.状态 = record.状态 || old.状态;
        merged.结果 = record.结果 || old.结果;
        map.set(record.标题, merged);
    });
    return Array.from(map.values());
}

function mergeSecrets(oldList, newList, round) {
    const map = new Map();
    (Array.isArray(oldList) ? oldList : []).forEach(item => {
        const record = normalizeSecret(item, 0);
        if (record) map.set(foreshadowKey(record.内容), record);
    });
    (Array.isArray(newList) ? newList : []).forEach(item => {
        const record = normalizeSecret(item, round);
        if (!record) return;
        const key = foreshadowKey(record.内容);
        const old = map.get(key);
        if (!old) {
            record.回合 = record.回合 || round;
            map.set(key, record);
            return;
        }
        const known = new Map(old.知情者.map(k => [k.人物, k]));
        record.知情者.forEach(k => known.set(k.人物, k));
        const knownNames = new Set(known.keys());
        const unknown = new Map();
        old.不知情者.concat(record.不知情者).forEach(k => {
            if (!knownNames.has(k.人物)) unknown.set(k.人物, k);
        });
        old.知情者 = Array.from(known.values());
        old.不知情者 = Array.from(unknown.values());
        old.证据 = record.证据 || old.证据;
        old.涉及 = record.涉及 || old.涉及;
        old.回合 = old.回合 || round;
        map.set(key, old);
    });
    return Array.from(map.values());
}

function mergeStruggles(oldList, newList, round) {
    const map = new Map();
    (Array.isArray(oldList) ? oldList : []).forEach(item => {
        const record = normalizeStruggle(item, 0);
        if (record) map.set(record.类型 + '|' + record.事件名, record);
    });
    (Array.isArray(newList) ? newList : []).forEach(item => {
        const record = normalizeStruggle(item, round);
        if (!record) return;
        const key = record.类型 + '|' + record.事件名;
        const old = map.get(key);
        if (!old) {
            record.回合 = record.回合 || round;
            record.更新回合 = round;
            map.set(key, record);
            return;
        }
        const merged = Object.assign({}, old, record);
        merged.回合 = old.回合 || round;
        merged.更新回合 = round;
        merged.进度 = Math.max(getProgressNum(old), getProgressNum(record));
        merged.知情者 = normalizeKnowers(old.知情者.concat(record.知情者 || []));
        merged.阶段 = record.阶段 || old.阶段;
        merged.结果 = record.结果 || old.结果;
        map.set(key, merged);
    });
    return Array.from(map.values());
}

function mergeTime(oldTime, freshTime) {
    const old = normalizeTime(oldTime);
    const fresh = normalizeTime(freshTime);
    const out = Object.assign({}, old);
    Object.entries(fresh).forEach(([key, value]) => {
        if (value !== '' && value !== 0 && value !== null && value !== undefined) out[key] = value;
    });
    if (fresh.年 && fresh.年 !== old.年) out.年 = fresh.年;
    out.宴席 = mergeBanquets(old.宴席, fresh.宴席);
    return out;
}

function mergeRelations(oldList, newList) {
    const map = new Map();
    const add = (item, overwrite) => {
        if (!isPlainObject(item)) return;
        const a = cleanName(item.甲);
        const b = cleanName(item.乙);
        if (isBlacklisted(a) || isBlacklisted(b)) return;
        const key = [a, b].sort().join('|');
        const relation = String(item.关系 || '').trim().slice(0, 40);
        if (map.has(key)) {
            if (overwrite) map.get(key).关系 = relation || map.get(key).关系;
        } else {
            map.set(key, { 甲: a, 乙: b, 关系: relation });
        }
    };
    (Array.isArray(oldList) ? oldList : []).forEach(item => add(item, false));
    (Array.isArray(newList) ? newList : []).forEach(item => add(item, true));
    return Array.from(map.values());
}

function foreshadowKey(content) {
    return String(content || '').replace(/[\s，。！？、；：""''（）()【】\[\]]/g, '').slice(0, 40);
}

function dedupeForeshadow(list) {
    const map = new Map();
    (Array.isArray(list) ? list : []).forEach(item => {
        const f = normalizeForeshadow(item, 0);
        if (!f) return;
        const key = foreshadowKey(f.内容);
        if (!key) return;
        const old = map.get(key);
        if (!old) {
            map.set(key, f);
            return;
        }
        if (f.已回收 && !old.已回收) {
            old.已回收 = true;
            old.回收回合 = f.回收回合 || old.回合 || 0;
        }
        if (!old.来源 || old.来源 === '手动') old.来源 = f.来源 || old.来源;
        if (!old.回合 && f.回合) old.回合 = f.回合;
    });
    return Array.from(map.values());
}

function mergeForeshadow(oldList, newList) {
    const map = new Map();
    (Array.isArray(oldList) ? oldList : []).forEach(item => {
        const f = normalizeForeshadow(item, 0);
        if (!f) return;
        map.set(foreshadowKey(f.内容), f);
    });
    (Array.isArray(newList) ? newList : []).forEach(item => {
        const f = normalizeForeshadow(item, 0);
        if (!f) return;
        const key = foreshadowKey(f.内容);
        const old = map.get(key);
        if (!old) {
            map.set(key, f);
            return;
        }
        if (f.已回收 && !old.已回收) {
            old.已回收 = true;
            old.回收回合 = f.回收回合 || 0;
        }
        if (!old.来源 || old.来源 === '手动') old.来源 = f.来源 || old.来源;
        if (!old.回合 && f.回合) old.回合 = f.回合;
    });
    return Array.from(map.values());
}

function mergePregnancies(oldList, newList, round) {
    const map = new Map();
    (Array.isArray(oldList) ? oldList : []).forEach(item => {
        const record = normalizePregnancy(item, 0);
        if (record) map.set(record.人物, record);
    });
    (Array.isArray(newList) ? newList : []).forEach(item => {
        const record = normalizePregnancy(item, round);
        if (!record) return;
        const old = map.get(record.人物);
        if (!old) {
            record.回合 = round;
            map.set(record.人物, record);
            return;
        }
        old.孕月 = Math.max(old.孕月 || 0, record.孕月 || 0);
        old.状态 = record.状态 || old.状态;
        ['风险', '胎象', '太医', '饮食', '行动', '预计产期', '备注'].forEach(key => {
            if (record[key]) old[key] = record[key];
        });
        if (record.知情者 && record.知情者.length) {
            old.知情者 = normalizeKnowers((old.知情者 || []).concat(record.知情者));
        }
        old.已结束 = old.已结束 || record.已结束;
        old.回合 = old.回合 || round;
        map.set(record.人物, old);
    });
    return Array.from(map.values());
}

function normalizeNameList(value) {
    if (Array.isArray(value)) return value.map(v => cleanName(v)).filter(Boolean);
    return String(value || '').split(/[,，、\s]+/).map(cleanName).filter(Boolean);
}

function normalizeFaction(item, round) {
    if (!isPlainObject(item)) return null;
    const name = String(item.派系名 || item.名称 || '').trim();
    if (!name) return null;
    return {
        派系名: name.slice(0, 30),
        领袖: cleanName(item.领袖 || item.首领 || ''),
        成员: normalizeNameList(item.成员),
        主张: String(item.主张 || '').trim().slice(0, 100),
        资源: String(item.资源 || '').trim().slice(0, 80),
        目标: String(item.目标 || '').trim().slice(0, 100),
        敌对: normalizeNameList(item.敌对 || item.敌对派系),
        进度: clamp(toInt(item.进度, 0), 0, 100),
        备注: String(item.备注 || '').trim().slice(0, 160),
        回合: toInt(item.回合, round || 0) || 0
    };
}

function normalizeClan(item, round) {
    if (!isPlainObject(item)) return null;
    const name = String(item.家族 || item.名称 || '').trim();
    if (!name) return null;
    return {
        家族: name.slice(0, 30),
        家主: cleanName(item.家主 || ''),
        成员: normalizeNameList(item.成员),
        姻亲: String(item.姻亲 || '').trim().slice(0, 80),
        世仇: String(item.世仇 || '').trim().slice(0, 80),
        产业: String(item.产业 || '').trim().slice(0, 100),
        门生: normalizeNameList(item.门生),
        立场: String(item.立场 || '').trim().slice(0, 60),
        备注: String(item.备注 || '').trim().slice(0, 160),
        回合: toInt(item.回合, round || 0) || 0
    };
}

function normalizeCourt(raw, round) {
    const obj = isPlainObject(raw) ? raw : {};
    return {
        派系: (Array.isArray(obj.派系) ? obj.派系 : []).map(item => normalizeFaction(item, round)).filter(Boolean),
        家族: (Array.isArray(obj.家族) ? obj.家族 : []).map(item => normalizeClan(item, round)).filter(Boolean)
    };
}

function normalizeHealth(item, round) {
    if (!isPlainObject(item)) return null;
    const person = cleanName(item.人物 || item.姓名 || '');
    if (!person) return null;
    return {
        人物: person,
        日期: String(item.日期 || item.时间 || '').trim().slice(0, 30),
        症状: String(item.症状 || item.病情 || '').trim().slice(0, 100),
        诊断: String(item.诊断 || item.脉案 || '').trim().slice(0, 120),
        方子: String(item.方子 || item.药方 || '').trim().slice(0, 120),
        太医: cleanName(item.太医 || item.医者 || ''),
        忌口: String(item.忌口 || '').trim().slice(0, 80),
        状态: String(item.状态 || '在治').trim().slice(0, 20),
        备注: String(item.备注 || '').trim().slice(0, 160),
        回合: toInt(item.回合, round || 0) || 0
    };
}

function parseBirthYear(text) {
    const s = String(text || '');
    const arabic = s.match(/(?:^|\D)(\d{3,4})\s*年/);
    if (arabic) return Number(arabic[1]);
    const cn = s.match(/([一二三四五六七八九十百零〇两]+)\s*年/);
    if (cn) return parseChineseNumber(cn[1]);
    return 0;
}

function deriveChildAges(heir, calendar) {
    const data = heir && heir.用户 ? heir : normalizeHeir(heir, 0);
    const curYear = toInt(calendar && calendar.年, 0);
    if (!curYear) return data;
    (data.子女 || []).forEach(child => {
        const birthYear = parseBirthYear(child.出生);
        if (birthYear) {
            child.年龄 = Math.max(0, curYear - birthYear);
        } else {
            child.年龄 = child.年龄 || 1;
            child.年龄基准年 = child.年龄基准年 || curYear;
            child.年龄 += Math.max(0, curYear - child.年龄基准年);
        }
        child.年龄基准年 = curYear;
    });
    return data;
}

function normalizeHeirUser(raw, round) {
    const user = isPlainObject(raw) ? raw : {};
    const status = String(user.状态 || '未孕').trim().slice(0, 12);
    const month = clamp(toInt(user.孕期月 !== undefined ? user.孕期月 : user.孕月, 0), 0, 10);
    return {
        内射次数: Math.max(0, toInt(user.内射次数 !== undefined ? user.内射次数 : user.累计次数, 0)),
        本回次数: Math.max(0, toInt(user.本回次数 !== undefined ? user.本回次数 : user.本回, 0)),
        受孕判定: String(user.受孕判定 || user.受孕 || '未定').trim().slice(0, 12),
        孕期月: month,
        状态: status || '未孕',
        月事最近: String((isPlainObject(user.月事) ? user.月事.最近 : user.月事最近) || '').trim().slice(0, 40),
        月事自定义: String(user.月事自定义 || '').trim().slice(0, 20),
        月事来源: String(user.月事来源 || '推演').trim().slice(0, 10),
        月事周期: clamp(toInt((isPlainObject(user.月事) ? user.月事.周期 : user.月事周期), 0), 0, 60),
        月事持续: clamp(toInt((isPlainObject(user.月事) ? user.月事.持续 : user.月事持续), 0), 0, 15),
        排卵期: String((isPlainObject(user.排卵期) ? user.排卵期.日期 : user.排卵期) || '').trim().slice(0, 60),
        排卵可能: String((isPlainObject(user.排卵期) ? user.排卵期.可能 : user.排卵可能) || '').trim().slice(0, 20),
        发现: normalizeKnowers(user.发现 || user.知情者 || []),
        备注: String(user.备注 || '').trim().slice(0, 300),
        回合: toInt(user.回合, round || 0) || 0
    };
}

function normalizeChild(item, round) {
    if (!isPlainObject(item)) return null;
    const name = String(item.姓名 || item.名字 || item.称呼 || '').trim().slice(0, 40);
    if (!name) return null;
    const gender = /女/.test(String(item.性别 || '')) ? '女' : '男';
    const identity = String(item.身份 || item.位份 || (gender === '女' ? '皇女' : '皇子')).trim().slice(0, 20);
    return {
        姓名: name,
        性别: gender,
        身份: identity,
        生母: String(item.生母 || item.母亲 || '').trim().slice(0, 40),
        亲缘: String(item.亲缘 || item.血缘 || '不详').trim().slice(0, 20),
        年龄: Math.max(0, toInt(item.年龄, 0)),
        年龄基准年: Math.max(0, toInt(item.年龄基准年, 0)),
        排行: Math.max(0, toInt(item.排行 || item.序齿, 0)),
        出生: String(item.出生 || item.生辰 || '').trim().slice(0, 60),
        状态: String(item.状态 || '在世').trim().slice(0, 20),
        备注: String(item.备注 || '').trim().slice(0, 200),
        回合: toInt(item.回合, round || 0) || 0
    };
}

function normalizeHeir(raw, round) {
    const obj = isPlainObject(raw) ? raw : {};
    return {
        用户: normalizeHeirUser(obj.用户 || obj.user || {}, round),
        子女: (Array.isArray(obj.子女) ? obj.子女 : [])
            .map(item => normalizeChild(item, round))
            .filter(Boolean)
    };
}

function parseMonthDay(text) {
    const s = String(text || '');
    let m = s.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
    if (m) return { month: Number(m[2]), day: Number(m[3]) };
    m = s.match(/(\d{1,2})\s*月\s*(\d{1,2})\s*日?/);
    if (m) return { month: Number(m[1]), day: Number(m[2]) };
    m = s.match(/([一二三四五六七八九十廿卅]+)\s*月\s*(?:初)?([一二三四五六七八九十廿卅]+)\s*日?/);
    if (m) return { month: parseChineseNumber(m[1]), day: parseChineseNumber(m[2]) };
    return null;
}

function deriveMenstrualCycle(heir, calendar) {
    const data = heir && heir.用户 ? heir : normalizeHeir(heir, 0);
    const user = data.用户;
    const cur = calendar || {};
    const curMonth = toInt(cur.月, 0);
    const curDay = toInt(cur.日, 0);
    let last = parseMonthDay(user.月事自定义 || user.月事最近);
    if (!last && curMonth && curDay) {
        last = { month: curMonth, day: curDay };
        if (!user.月事最近) user.月事最近 = `${curMonth}月${curDay}日`;
        user.月事来源 = '推演';
    }
    if (user.月事自定义) {
        user.月事来源 = '手动';
        user.月事最近 = user.月事自定义;
    }
    user.月事最近 = user.月事最近 || '待定';
    user.月事周期 = user.月事周期 || 28;
    user.月事持续 = user.月事持续 || 5;
    if (!last || !curMonth || !curDay) {
        user.排卵期 = user.排卵期 || '待定';
        user.排卵可能 = user.排卵可能 || '未知';
        return data;
    }
    const cycle = clamp(toInt(user.月事周期, 28) || 28, 20, 45);
    const year = toInt(cur.年, 0) || 2026;
    const lastDate = Date.UTC(year, last.month - 1, last.day);
    let curDate = Date.UTC(year, curMonth - 1, curDay);
    if (curDate < lastDate) curDate = Date.UTC(year + 1, curMonth - 1, curDay);
    const diff = Math.floor((curDate - lastDate) / 86400000);
    if (diff < 0) return data;
    const day = (diff % cycle) + 1;
    const ovStart = Math.max(1, cycle - 15);
    const ovEnd = Math.min(cycle, cycle - 10);
    user.排卵期 = `周期第${ovStart}-${ovEnd}天`;
    user.排卵可能 = day >= ovStart && day <= ovEnd ? '高' : (day <= 5 ? '低' : '中');
    return data;
}

function mergeCourt(oldCourt, freshCourt, round) {
    const old = normalizeCourt(oldCourt, 0);
    const fresh = normalizeCourt(freshCourt, round);
    const mergeList = (oldList, newList, keyName) => {
        const map = new Map();
        oldList.forEach(item => map.set(item[keyName], item));
        newList.forEach(item => {
            const key = item[keyName];
            const prev = map.get(key);
            if (!prev) { item.回合 = item.回合 || round; map.set(key, item); return; }
            ['领袖', '主张', '资源', '目标', '立场', '备注'].forEach(k => { if (item[k]) prev[k] = item[k]; });
            prev.成员 = Array.from(new Set([...(prev.成员 || []), ...(item.成员 || [])]));
            prev.敌对 = Array.from(new Set([...(prev.敌对 || []), ...(item.敌对 || [])]));
            prev.门生 = Array.from(new Set([...(prev.门生 || []), ...(item.门生 || [])]));
            ['姻亲', '世仇', '产业'].forEach(k => { if (item[k]) prev[k] = item[k]; });
            prev.进度 = Math.max(prev.进度 || 0, item.进度 || 0);
        });
        return Array.from(map.values());
    };
    return {
        派系: mergeList(old.派系, fresh.派系, '派系名'),
        家族: mergeList(old.家族, fresh.家族, '家族')
    };
}

function mergeHealth(oldList, newList, round) {
    const map = new Map();
    (Array.isArray(oldList) ? oldList : []).forEach(item => {
        const record = normalizeHealth(item, 0);
        if (record) map.set(record.人物 + '|' + record.日期 + '|' + record.症状, record);
    });
    (Array.isArray(newList) ? newList : []).forEach(item => {
        const record = normalizeHealth(item, round);
        if (!record) return;
        const key = record.人物 + '|' + record.日期 + '|' + record.症状;
        const old = map.get(key);
        if (!old) { record.回合 = round; map.set(key, record); return; }
        ['诊断', '方子', '太医', '忌口', '状态', '备注'].forEach(k => { if (record[k]) old[k] = record[k]; });
    });
    return Array.from(map.values());
}

function mergePregnancyChildren(oldList, newList, round) {
    const map = new Map();
    (Array.isArray(oldList) ? oldList : []).forEach(item => {
        const record = normalizeChild(item, 0);
        if (record) map.set(record.姓名 + '|' + (record.生母 || ''), record);
    });
    (Array.isArray(newList) ? newList : []).forEach(item => {
        const record = normalizeChild(item, round);
        if (!record) return;
        const key = record.姓名 + '|' + (record.生母 || '');
        const old = map.get(key);
        if (!old) {
            record.回合 = record.回合 || round;
            map.set(key, record);
        } else {
            Object.assign(old, record);
        }
    });
    return Array.from(map.values());
}

function mergeHeir(oldHeir, freshHeir, round) {
    const old = normalizeHeir(oldHeir, 0);
    const fresh = normalizeHeir(freshHeir, round);
    const user = Object.assign({}, old.用户);
    const add = fresh.用户.本回次数 || 0;
    user.内射次数 = Math.max(old.用户.内射次数 + add, fresh.用户.内射次数);
    user.本回次数 = add;
    if (fresh.用户.受孕判定 && fresh.用户.受孕判定 !== '未定') user.受孕判定 = fresh.用户.受孕判定;
    if (fresh.用户.孕期月) user.孕期月 = Math.max(user.孕期月 || 0, fresh.用户.孕期月);
    if (fresh.用户.状态 && fresh.用户.状态 !== '未孕') user.状态 = fresh.用户.状态;
    ['月事最近', '排卵期', '排卵可能'].forEach(key => {
        if (fresh.用户[key]) user[key] = fresh.用户[key];
    });
    if (fresh.用户.月事自定义) {
        user.月事自定义 = fresh.用户.月事自定义;
        user.月事来源 = '手动';
    } else if (fresh.用户.月事来源) {
        user.月事来源 = fresh.用户.月事来源;
    }
    if (fresh.用户.月事周期) user.月事周期 = fresh.用户.月事周期;
    if (fresh.用户.月事持续) user.月事持续 = fresh.用户.月事持续;
    if (fresh.用户.备注) user.备注 = fresh.用户.备注;
    user.发现 = normalizeKnowers(old.用户.发现.concat(fresh.用户.发现));
    user.回合 = old.用户.回合 || round;

    const map = new Map();
    old.子女.forEach(item => map.set(item.姓名 + '|' + (item.生母 || ''), item));
    fresh.子女.forEach(item => {
        const key = item.姓名 + '|' + (item.生母 || '');
        const prev = map.get(key);
        if (!prev) {
            item.回合 = item.回合 || round;
            map.set(key, item);
            return;
        }
        Object.assign(prev, item);
    });
    return { 用户: user, 子女: Array.from(map.values()) };
}

function derivePregnancies(npcState, list, round) {
    const map = new Map();
    (Array.isArray(list) ? list : []).forEach(item => {
        const record = normalizePregnancy(item, 0);
        if (record) map.set(record.人物, record);
    });
    Object.entries(npcState || {}).forEach(([name, info]) => {
        if (isBlacklisted(name) || isLeadName(name) || !isPlainObject(info)) return;
        const text = [info.当前所做, info.心情, info.位置, info.身份].filter(Boolean).join(' ');
        const match = text.match(/孕\s*([0-9一二三四五六七八九十百零〇两]+)\s*月|有孕|怀孕|身怀六甲/);
        if (!match) return;
        const month = match[1] ? parseChineseNumber(match[1]) : 1;
        if (map.has(name)) {
            const old = map.get(name);
            if (!old.孕月 && month) old.孕月 = month;
            return;
        }
        map.set(name, {
            人物: name,
            孕月: month || 1,
            状态: '有孕（自动补录）',
            备注: '从 NPC 状态识别，可在孕事页修改',
            已结束: false,
            回合: round
        });
    });
    return Array.from(map.values());
}

function recoverForeshadows(list, events, round) {
    const completed = (Array.isArray(events) ? events : []).filter(event => getProgressNum(event) >= 100);
    if (!completed.length) return list;
    (Array.isArray(list) ? list : []).forEach(foreshadow => {
        if (!foreshadow || foreshadow.已回收) return;
        const content = String(foreshadow.内容 || '');
        const hit = completed.some(event => {
            const name = String(event.事件名 || '');
            const text = String(event.内容 || '');
            if (name && (content.includes(name) || name.includes(content.slice(0, Math.min(8, content.length))))) return true;
            const head = text.slice(0, 16);
            return !!head && (content.includes(head) || head.includes(content.slice(0, 12)));
        });
        if (hit) {
            foreshadow.已回收 = true;
            foreshadow.回收回合 = round;
        }
    });
    return list;
}

function mergeGroupData(oldData, fresh) {
    const out = normalizeData(oldData || {});
    if (!hasContent(fresh)) return out;
    const round = Math.max(0, toInt(out.最后更新回合, 0)) + 1;

    if (isPlainObject(fresh.NPC状态)) {
        Object.entries(fresh.NPC状态).forEach(([rawName, patch]) => {
            const name = normalizeNpcDisplayName(rawName);
            if (isBlacklisted(name)) return;
            const clean = normalizeNpcPatch(patch);
            if (!Object.keys(clean).length) return;
            const oldInfo = out.NPC状态[name] || {};
            const mergedInfo = Object.assign({}, oldInfo, clean);
            if (oldInfo.年龄 && (!clean.年龄 || /不详|未知/.test(clean.年龄))) {
                mergedInfo.年龄 = oldInfo.年龄;
            } else if (oldInfo.年龄 && clean.年龄) {
                const oldAge = ageNumber(oldInfo.年龄);
                const newAge = ageNumber(clean.年龄);
                if (oldAge && newAge && newAge < oldAge) mergedInfo.年龄 = oldInfo.年龄;
            }
            mergedInfo.更新回合 = round;
            out.NPC状态[name] = mergedInfo;
        });
    }

    ['NPC事件', '国家事件', '邻国事件'].forEach(key => {
        out[key] = mergeEvents(out[key], fresh[key], round);
    });

    out.流言 = mergeRumors(out.流言, fresh.流言, round);
    out.奏折 = mergeMemorials(out.奏折, fresh.奏折, round);
    out.秘辛 = mergeSecrets(out.秘辛, fresh.秘辛, round);
    out.斗争 = mergeStruggles(out.斗争, fresh.斗争, round);
    out.时令 = mergeTime(out.时令, fresh.时令);
    out.书信 = mergeLetters(out.书信, fresh.书信, round);
    out.关系 = mergeRelations(out.关系, fresh.关系);
    out.伏笔 = mergeForeshadow(out.伏笔, fresh.伏笔);
    // 伏笔来源不要只写“NPC”：能从已知人物名里认出来的，补成具体姓名。
    const knownNames = Object.keys(out.NPC状态 || {}).filter(name => !isBlacklisted(name));
    out.伏笔.forEach(item => {
        if (item.来源 && !['未记名', '手动', 'NPC', '群像', '剧情'].includes(item.来源)) return;
        const hit = knownNames.find(name => name.length >= 2 && String(item.内容 || '').includes(name));
        if (hit) item.来源 = hit;
        else item.来源 = inventNpcName(item.内容 || '伏笔');
    });
    out.孕事 = mergePregnancies(out.孕事, fresh.孕事, round);
    out.孕事子女 = mergePregnancyChildren(out.孕事子女, fresh.孕事子女, round);
    out.朝堂门阀 = mergeCourt(out.朝堂门阀, fresh.朝堂门阀, round);
    out.医疗健康 = mergeHealth(out.医疗健康, fresh.医疗健康, round);
    if (getSettings().pregnancyModule) {
        out.孕事 = derivePregnancies(out.NPC状态, out.孕事, round);
    }
    out.子嗣 = mergeHeir(out.子嗣, fresh.子嗣, round);
    out.子嗣 = deriveMenstrualCycle(out.子嗣, out.时令);
    out.子嗣 = deriveChildAges(out.子嗣, out.时令);
    out.孕事子女 = deriveChildAges({ 用户: {}, 子女: out.孕事子女 }, out.时令).子女;

    if (getSettings().foreshadowAi) {
        const auto = [];
        ['NPC事件', '国家事件', '邻国事件'].forEach(key => {
            (Array.isArray(fresh[key]) ? fresh[key] : []).forEach(item => {
                if (item && isTrue(item.伏笔)) {
                    auto.push({
                        内容: String(item.内容 || item.事件名 || '').slice(0, 400),
                        来源: key.replace('事件', ''),
                        已回收: false,
                        回合: round
                    });
                }
            });
        });
        (Array.isArray(fresh.流言) ? fresh.流言 : []).forEach(item => {
            if (isPlainObject(item) && isTrue(item.伏笔)) {
                auto.push({
                    内容: String(item.内容 || '').slice(0, 400),
                    来源: '流言',
                    已回收: false,
                    回合: round
                });
            }
        });
        out.伏笔 = mergeForeshadow(out.伏笔, auto);
    }

    (out.伏笔 || []).forEach(item => {
        if (item.已回收 && !item.回收回合) item.回收回合 = round;
    });
    out.伏笔 = recoverForeshadows(out.伏笔, []
        .concat(out.NPC事件 || [], out.国家事件 || [], out.邻国事件 || []), round);

    out.最后更新回合 = round;
    out.版本 = 2;
    return out;
}

/* ------------------------------------------------------------------ */
/* 提示词                                                             */
/* ------------------------------------------------------------------ */

function buildEventContext() {
    const s = getSettings();
    const data = getGroupData() || {};
    const lines = [];
    const push = line => {
        if (lines.length >= 160) return;
        if (line && !lines.includes(line)) lines.push(line);
    };

    if (data.纪年 && data.纪年.年) {
        push(`[纪年] ${data.纪年.年号 || ''}${data.纪年.年}年`);
    }
    if (data.时令 && (data.时令.月 || data.时令.节气 || data.时令.节日)) {
        const t = data.时令;
        const date = [t.年号 && t.年 ? t.年号 + t.年 + '年' : '', t.月 ? t.月 + '月' : '', t.日 ? t.日 + '日' : ''].filter(Boolean).join('');
        push(`[时令] ${date}${t.节气 ? '·' + t.节气 : ''}${t.节日 ? '·' + t.节日 : ''}${t.礼仪 ? '·' + t.礼仪 : ''}${t.主礼 ? '·主礼' + t.主礼 : ''}${t.时辰 ? '·' + t.时辰 : ''}`);
    }
    if (s.injectEvents) {
        ['NPC事件', '国家事件', '邻国事件'].forEach(key => {
            (Array.isArray(data[key]) ? data[key] : []).forEach(event => {
                if (getProgressNum(event) >= 100) return;
                const name = event.事件名 || String(event.内容 || '').slice(0, 10);
                const domain = event.领域 ? '·' + event.领域 : '';
                if (name) push(`[${key.replace('事件', '')}${domain}] ${name}（${getProgressNum(event)}%）`);
            });
        });
    }
    if (s.injectEvents) {
        (Array.isArray(data.奏折) ? data.奏折 : []).filter(m => !['准奏', '驳回', '已结'].includes(m.状态)).forEach(m => {
            if (m.标题) push(`[奏折·待议] ${m.标题}${m.上奏人 ? '（' + m.上奏人 + '）' : ''}`);
        });
        (Array.isArray(data.斗争) ? data.斗争 : []).filter(x => getProgressNum(x) < 100).forEach(x => {
            if (x.事件名) push(`[${x.类型 || '斗争'}] ${x.事件名}（${x.阶段 || '进行中'}）`);
        });
    }
    if (s.courtModule && s.injectCourt) {
        ((data.朝堂门阀 && data.朝堂门阀.派系) || []).forEach(item => {
            if (item.派系名) push(`[朝堂派系] ${item.派系名}：领袖${item.领袖 || '未记'}，${item.主张 || ''}`);
        });
        ((data.朝堂门阀 && data.朝堂门阀.家族) || []).forEach(item => {
            if (item.家族) push(`[门阀] ${item.家族}：家主${item.家主 || '未记'}，${item.立场 || ''}`);
        });
    }
    if (s.medicalModule && s.injectMedical) {
        (Array.isArray(data.医疗健康) ? data.医疗健康 : []).slice(-6).forEach(item => {
            if (item.人物) push(`[医疗] ${item.人物}：${item.症状 || ''}${item.诊断 ? '，' + item.诊断 : ''}`);
        });
    }
    if (s.injectTimeline) {
        const maxRound = data.最后更新回合 || 0;
        const recent = [];
        ['NPC事件', '国家事件', '邻国事件'].forEach(key => {
            (Array.isArray(data[key]) ? data[key] : []).forEach(event => {
                if (event.回合 && event.回合 > maxRound - 4) {
                    recent.push({ 回合: event.回合, 文本: `${event.事件名 || '事件'}：${String(event.内容 || '').slice(0, 40)}` });
                }
            });
        });
        (Array.isArray(data.流言) ? data.流言 : []).forEach(item => {
            if (item.回合 && item.回合 > maxRound - 4) recent.push({ 回合: item.回合, 文本: `流言：${String(item.内容 || '').slice(0, 40)}` });
        });
        (Array.isArray(data.书信) ? data.书信 : []).forEach(item => {
            if (item.回合 && item.回合 > maxRound - 4) recent.push({ 回合: item.回合, 文本: `书信：${String(item.内容 || '').slice(0, 40)}` });
        });
        (Array.isArray(data.伏笔) ? data.伏笔 : []).forEach(item => {
            if (item.回合 && item.回合 > maxRound - 4) recent.push({ 回合: item.回合, 文本: `伏笔：${String(item.内容 || '').slice(0, 40)}` });
        });
        recent.sort((a, b) => b.回合 - a.回合);
        recent.slice(0, 10).forEach(item => push(`[时间线·第${item.回合}回] ${item.文本}`));
    }
    if (s.injectNpc) {
        Object.entries(data.NPC状态 || {}).forEach(([name, info]) => {
            if (isBlacklisted(name)) return;
            const parts = [
                info.身份 && `身份${info.身份}`,
                info.年龄 && `年龄${info.年龄}`,
                info.位置 && `位置${info.位置}`,
                info.心情,
                info.当前所做
            ].filter(Boolean).join('·');
            if (parts) push(`[NPC] ${name}：${parts}`);
        });
    }
    if (s.injectRumors) {
        (Array.isArray(data.流言) ? data.流言 : []).slice(-5).forEach(item => {
            if (item && item.内容) push(`[流言] ${item.内容}`);
        });
    }
    if (s.injectLetters) {
        (Array.isArray(data.书信) ? data.书信 : []).filter(item => item && item.方向 !== '发').slice(-3).forEach(item => {
            if (!item || !item.内容) return;
            push(`[书信·来自${item.来源 || '佚名'}] ${String(item.内容).slice(0, 60)}`);
        });
    }
    if (s.injectForeshadow) {
        (Array.isArray(data.伏笔) ? data.伏笔 : []).filter(f => !f.已回收).forEach(f => {
            if (f.内容) push(`[伏笔·${f.来源 || '未记名'}] ${f.内容}`);
        });
    }
    if (s.injectRelations) {
        (Array.isArray(data.关系) ? data.关系 : []).forEach(r => {
            if (isBlacklisted(r.甲) || isBlacklisted(r.乙)) return;
            push(`[关系] ${r.甲}↔${r.乙}：${r.关系 || ''}`);
        });
    }
    if (s.pregnancyModule && s.injectPregnancy) {
        (Array.isArray(data.孕事) ? data.孕事 : []).filter(p => !p.已结束).forEach(p => {
            push(`[孕事] ${p.人物}：孕 ${p.孕月 || '?'} 月，${p.状态 || '有孕'}`);
        });
        (Array.isArray(data.孕事子女) ? data.孕事子女 : []).forEach(child => {
            push(`[孕事子女] ${child.生母 || '后妃'}所出：${child.姓名}，${child.性别 || ''}，${child.身份 || ''}，亲缘${child.亲缘 || '不详'}`);
        });
    }
    if (s.heirModule && s.injectHeir) {
        const h = data.子嗣 && data.子嗣.用户 ? data.子嗣.用户 : {};
        if (h.状态 || h.受孕判定 || h.孕期月 || h.月事最近 || h.排卵期) {
            const cycle = [
                h.月事最近 && `月事最近${h.月事最近}`,
                h.月事周期 && `周期${h.月事周期}日`,
                h.月事持续 && `持续${h.月事持续}日`,
                h.排卵期 && `排卵期${h.排卵期}`,
                h.排卵可能 && `排卵可能${h.排卵可能}`
            ].filter(Boolean).join('，');
            push(`[子嗣·主线] ${h.状态 || '未孕'}，受孕${h.受孕判定 || '未定'}，孕期${h.孕期月 || 0}月${cycle ? '；' + cycle : ''}`);
        }
        (Array.isArray(data.子嗣 && data.子嗣.子女) ? data.子嗣.子女 : []).forEach(child => {
            push(`[子嗣·子女] ${child.姓名}，${child.性别 || ''}，${child.身份 || ''}，生母${child.生母 || '不详'}，亲缘${child.亲缘 || '不详'}`);
        });
    }
    if (s.secretModule && s.injectSecrets) {
        (Array.isArray(data.秘辛) ? data.秘辛 : []).slice(-6).forEach(item => {
            if (item && item.内容) {
                const known = (item.知情者 || []).map(k => `${k.人物}${k.程度 ? '(' + k.程度 + ')' : ''}`).join('、');
                push(`[秘辛] ${String(item.内容).slice(0, 80)}${known ? '；知情：' + known : ''}`);
            }
        });
    }

    if (!lines.length) return '';
    return `\n\n【当前剧情线索】（第 ${data.最后更新回合 || 0} 回，仅供续写参考；没有变化可忽略）\n${lines.join('\n')}`;
}

function buildExtraModulesPrompt() {
    const s = getSettings();
    const off = [];
    if (!s.memorialModule) off.push('奏折');
    if (!s.secretModule) off.push('秘辛');
    if (!s.calendarModule) off.push('时令');
    if (!s.struggleModule) off.push('斗争');
    if (!s.courtModule) off.push('朝堂门阀');
    if (!s.medicalModule) off.push('医疗健康');
    if (!s.pregnancyModule) off.push('孕事/孕事子女');
    if (!s.heirModule) off.push('子嗣');

    return `\n\n【扩展模块：和上面的 JSON 合并，不是另起一个对象】
- 奏折（1-3 条）：朝堂公文，不是普通事件。写清标题、上奏人、衙门、事由、主张、反对、状态（待议/留中/准奏/驳回/已结）。没有就写空数组。
- 秘辛（0-2 条）：只记值得藏的 secret。内容、涉及谁、证据/把柄。知情者写“谁、知道多少”（全知/部分/怀疑/只知片段）；不知情者写“谁还不知道”。**李承璟和{{user}}也可以知道或不知道，照实写进知情者/不知情者，不要漏掉他们。**
- 流言（0-2 条）：除了内容，还要写来源人物、传播链（谁传给谁、版本变成什么）、可信度（真/半真/假/未知）。传播链 2-4 人即可。
- 孕事：只记后妃/其他 NPC 的有孕月份与状态；{{user}} 的孕事写在“子嗣.用户”里，不要混进孕事。后妃已经生产、世界书里已有孩子的，必须写进“孕事子女”；生母写后妃名，亲缘按世界书写（亲生/养子/过继/庶出/嫡出/不详），不要默认亲生。
- 伏笔：来源必须写具体姓名或具体事件名，例如“淑妃”“太学暗账”；不要写“NPC”“群像”“剧情”这种分类。来源确实不明写“未记名”。
- 时令（含节庆礼仪）：只有正文出现明确日期、节气、节日、时辰、礼仪时才更新。写年号、年、月、日、节气、节日、礼仪、主礼、地点、座次、禁忌、节目、宴席、时辰、备注；节日必须是古代节日（元日/上元/上巳/寒食/端阳/七夕/中元/中秋/重阳/腊八/祭灶/除夕等），按日期推算最近的节日；礼仪、主礼、地点、座次、禁忌、节目必须推演，不能写“未记”；没有日期就留空对象。节庆礼仪合并在这里，不另开模块。
- 宴席：写名称（如“崔氏上元宴”）、主家、地点、日期、宾客、目的、备注。正文没有明确宴席时，可依据时令和已知门阀/宫廷制造一场古代宴席，不要写现代宴会。
- 斗争（0-2 条）：宫斗或政斗。只在有明确动机、利益冲突、行动条件时记录；不要每回硬造。写类型（宫斗/政斗）、事件名、发起者、目标、手段、烈度（低/中/高）、阶段（策划/执行/调查/反制/收场）、证据、知情者、进度、结果。结果开放，不保证成功；不替{{user}}决定中计、受伤、失宠或站队；信息有限，不知道的人不要写成知道。
- 朝堂门阀：分「派系」和「家族」两段。派系写派系名、领袖、成员、主张、资源、目标、敌对、进度；家族写家族、家主、成员、姻亲、世仇、产业、门生、立场。没有变化可省略，但已有派系/家族被提到时要更新。
- 医疗健康（**有才生成**）：只有正文出现伤病、中毒、脉案、用药、太医诊治、孕产异常时才写；没有就留空数组，不要每回硬编。写人物、日期、症状、诊断、方子、太医、忌口、状态、备注。普通心情、普通请安不算医案；孕事仍走孕事页。
- 子嗣（仅在模块开启时）：{{user}} 是玩家，在酒馆里会自动替换成人设名字；不管正文用什么名字，子嗣.用户 始终是玩家本人。模块开启时这个对象必须出现；没有变化就照抄当前累计/孕期/状态，不要漏掉。
- 用户字段：本回次数（只写本回新增，累计由程序加）、受孕判定（未定/可能/已确认/未受孕）、孕期月（0-10）、状态（未孕/有孕/临盆/已生产/小产）、月事最近（日期/“未记”）、月事周期（天，世界书没写就 0）、月事持续（天，没写就 0）、排卵期（日期范围或“未记”）、排卵可能（高/中/低/未知）、发现（谁逐渐知道、知道多少）、备注。月事和排卵期按世界书、正文或太医记录写，不要自己编固定周期。
- 子女：只写记在{{user}}名下的孩子，只在出生后写。是否亲生、养子、过继、庶出、嫡出按世界书/正文写进“亲缘”，不要默认亲生。字段：姓名、性别、身份（太子/太女/王爷/公主/皇子/皇女）、生母、亲缘、排行、年龄、出生、状态（在世/夭折/过继）、备注；不要提前写未出生孩子的性别和封号。后妃所出的孩子写到“孕事子女”，不要写进子嗣。
  · 孕月建议只作参考：1-3 月防不稳，4-6 月显怀与安胎，7-8 月备产，9-10 月临盆；不要写成医学诊断。
  · 宫斗烈度：低=口舌、份例、礼仪刁难；中=收买宫人、造谣、栽赃；高=皇嗣、巫蛊、谋逆，必须有充分铺垫。
  · 政斗烈度：低=朝议分歧、考核、调任；中=弹劾、财政亏空、边境摩擦；高=战争、谋逆、继承危机，必须符合国力与权限。
  · 调查只能通过宫人、记录、物证、太医院、御史等合理渠道；不保证查明，也不保证定错人。

【连续性锁定】
- 角色已经走到终点（死亡、退位、登基、成婚、失势、离场、结局已定）就保持终点状态，不得写回中途，不得让他重新经历已经走完的剧情。
- 事件进度已经 100、已收场或已结束，就只写余波、后果和旁人反应；不要换一个名字重新开局，也不要把终局内容改回进行中。
- 同一事件继续用同一个事件名；进度只增不减。已经完成的伏笔必须回收，不能重新变成未解。
- 剧情已经走完的 NPC事件 / 国家事件 / 邻国事件，进度必须写 100，并写清结果；不要留在进行中。
- 如果正文是回忆/倒叙，只把它当回忆，不改当前时间线的终点状态。

【扩展字段】
"奏折":[{"标题":"","上奏人":"","衙门":"","事由":"","主张":"","反对":"","状态":"待议","结果":"","进度":0}],
"秘辛":[{"内容":"","涉及":"","知情者":[{"人物":"","程度":"部分"}],"不知情者":[""],"证据":"","来源":""}],
"流言":[{"内容":"","来源人物":"","传播链":[{"人物":"","版本":""}],"可信度":"未知","伏笔":false}],
"时令":{"年号":"","年":0,"月":0,"日":0,"节气":"","节日":"","礼仪":"","主礼":"","地点":"","座次":"","禁忌":"","节目":"","宴席":[{"名称":"","主家":"","地点":"","日期":"","宾客":"","目的":"","备注":""}],"时辰":"","备注":""},
"斗争":[{"类型":"宫斗","事件名":"","发起者":"","目标":"","手段":"","烈度":"低","阶段":"策划","证据":"","知情者":[{"人物":"","程度":"部分"}],"进度":0,"结果":""}],
"朝堂门阀":{"派系":[{"派系名":"","领袖":"","成员":[],"主张":"","资源":"","目标":"","敌对":[],"进度":0,"备注":""}],"家族":[{"家族":"","家主":"","成员":[],"姻亲":"","世仇":"","产业":"","门生":[],"立场":"","备注":""}]},
"医疗健康":[{"人物":"","日期":"","症状":"","诊断":"","方子":"","太医":"","忌口":"","状态":"在治","备注":""}],
"孕事子女":[{"姓名":"","性别":"男/女","身份":"","生母":"","亲缘":"不详","排行":1,"年龄":0,"出生":"","状态":"在世","备注":""}],
"子嗣":{"用户":{"本回次数":0,"受孕判定":"未定","孕期月":0,"状态":"未孕","月事最近":"","月事自定义":"","月事来源":"推演","月事周期":28,"月事持续":5,"排卵期":"","排卵可能":"","发现":[{"人物":"","程度":""}],"备注":""},"子女":[{"姓名":"","性别":"男","身份":"皇子","生母":"","亲缘":"不详","排行":1,"年龄":0,"出生":"","状态":"在世","备注":""}]}
${off.length ? '【本回关闭】' + off.join('、') + ' 对应字段留空，不要输出。' : ''}`;
}

function buildEnabledModulesPrompt() {
    const s = getSettings();
    const on = [];
    if (s.pregnancyModule) on.push('孕事 + 孕事子女');
    if (s.heirModule) on.push('子嗣（用户 + 子女）');
    if (s.courtModule) on.push('朝堂门阀');
    if (!on.length) return '';
    const medicalNote = s.medicalModule
        ? '\n医疗健康是条件模块：只有正文出现伤病、中毒、脉案、用药、太医诊治时才写；没有就留空数组，不要硬编。'
        : '';
    return `\n\n【命名硬性】所有人名必须写全名（姓+名），禁止只写姓氏、封号、职位、NPC、未记名；姓名只写姓名，位份/职位写进“身份”字段，不要写成“姓名·职位”或“姓氏+职位”；李承璟和{{user}}用原名。\n【禁止空话】有要求的字段不能写“无”“未记”“不详”，必须根据世界书、正文和时间线推演具体内容；实在没有信息就写合理推测，不要省略整块。\n【本回必须输出】${on.join('、')}。对应字段即使没有变化也必须出现；没有内容就输出空数组/当前状态，不要整块省略。${medicalNote}\n`;
}

function buildModuleHandbook() {
    const level = getSettings().presetName || '正常';
    if (level === '精简') {
        return `\n\n【模块补充】NPC状态不设上限，只写有变化的人；事件要有名有进度；奏折写主张/反对/状态；秘辛写知情与不知情；流言写来源/传播/可信度；斗争写动机/手段/阶段；时令只按正文日期；关系写方向；伏笔未回收；孕事写后妃孕月/状态/孕事子女；子嗣只写{{user}}，月事/排卵按世界书，亲缘不默认亲生。`;
    }
    const fieldDict = level === '详细' ? `\n【字段字典】
- NPC状态：心情=当下情绪；位置=此刻所在；年龄=数字；身份=位份/官职；当前所做=具体动作，不写“一切如常”。
- NPC事件：事件名=4-8字固定名；角色=主使/当事人；内容=目标+动作+阻力；进度=0-100；伏笔=是否留线。
- 国家事件：事件名、领域（内政/军事/外交/灾异/朝议/礼制/刑狱/财政）、内容（决策+执行+后果）、进度、伏笔。
- 邻国事件：事件名、国家、领域、内容（对方朝廷/边关动作）、进度、伏笔。
- 奏折：标题、上奏人、衙门、事由、主张、反对、状态（待议/留中/准奏/驳回/已结）、结果、进度。
- 秘辛：内容、涉及、证据/把柄、知情者[{人物,程度}]、不知情者、来源。程度=全知/部分/怀疑/只知片段。
- 流言：内容、来源人物、传播链[{人物,版本}]、可信度（真/半真/假/未知）、伏笔。流言不等于事实。
- 斗争：类型（宫斗/政斗）、事件名、发起者、目标、手段、烈度（低/中/高）、阶段（策划/执行/调查/反制/收场）、证据、知情者、进度、结果。
- 书信：只写别人给{{user}}的来信；来源、内容、时间，内容带称呼、落款、言外之意。
- 时令：年号、年、月、日、节气、节日、时辰、备注；只按正文明确日期。
- 关系：甲、乙、关系；写“甲对乙”的方向，双方态度不同写两条。
- 伏笔：内容、来源（具体姓名/事件名）、已回收、回收回合；完成的必须回收。
- 孕事：人物=后妃姓名；孕月=1-10；状态=有孕/稳定/不稳/见红/临盆/已生产/小产/难产；风险=低/中/高或具体风险；胎象=太医脉象/胎动/见红；太医=负责太医；饮食=忌口/安胎药；行动=静养/禁足/卧床；预计产期=日期或“未定”；知情者=[{人物,程度}]；备注。
- 孕事子女：姓名、性别、身份（太子/太女/王爷/公主/皇子/皇女）、生母、亲缘（按世界书）、排行、年龄、出生、状态（在世/夭折/过继）、备注。
- 朝堂门阀：派系名、领袖、成员、主张、资源、目标、敌对、进度；家族、家主、成员、姻亲、世仇、产业、门生、立场。
- 医疗健康（有才写）：人物、日期、症状、诊断、方子、太医、忌口、状态、备注；只有正文出现伤病/中毒/脉案/用药/太医诊治才写，没有就空数组；与孕事分开，孕事仍走孕事页。
- 节庆礼仪：已并入时令，写节日、礼仪、主礼、地点、座次、禁忌、节目。
- 子嗣.用户：本回次数=本回新增；受孕判定=未定/可能/已确认/未受孕；孕期月=0-10；状态=未孕/有孕/临盆/已生产/小产；月事最近=日期或“待定”；月事周期=天数；月事持续=天数；排卵期=日期范围或“周期第X-Y天”；排卵可能=高/中/低/未知；发现=[{人物,程度}]；备注。
- 子嗣.子女：姓名、性别、身份、生母、亲缘、排行、出生、状态、备注；只写{{user}}名下孩子，亲缘不默认亲生。` : (level === '正常' ? `\n【字段】每个模块按“人物/时间/状态/证据/进度”落到具体字段；孕事写风险、胎象、太医、饮食、行动、预计产期、知情者；子嗣写月事、周期、持续、排卵期、排卵可能、亲缘。` : `\n【字段】每个模块至少填人物、时间、状态、进度；孕事写全风险/胎象/太医/饮食/行动/产期/知情者；子嗣写全月事/排卵/亲缘。`);
    const detail = level === '详细' ? `\n【详细档额外要求】
- NPC状态每个人至少写：心情、位置、年龄、身份、当前所做，并说明与主线的关系；没出场的人写他此刻在做什么。
- NPC事件每条写：目标、动作、阻力、下一步、进度；至少一条来自未出场 NPC。
- 奏折写：上奏人、衙门、事由、主张、反对、当前状态；不要写成普通事件。
- 秘辛写：内容、涉及、证据、知情者/不知情者；李承璟和{{user}}也可以知道。
- 流言写：来源人物、传播链 2-4 人、版本变化、可信度；流言不等于事实。
- 斗争写：类型、发起者、目标、手段、烈度、阶段、证据、知情者、进度；没有动机不要硬造。
- 书信写：称呼、落款、言外之意；时令写：年号/年/月/日/节气/节日/时辰。
- 关系写方向；伏笔写来源/回收；孕事写后妃孕月、风险、已生产子女。
- 子嗣写用户月事/周期/持续/排卵期/排卵可能/受孕判定/孕期/状态；子女写姓名/性别/身份/生母/亲缘/排行/出生/状态；亲缘按世界书，不要默认亲生。` : `\n【正常档要求】每个模块至少落到人、时间、状态；没有变化就留空数组/当前状态，不要整块省略。`;
    return `\n\n【模块补充手册】
- 命名：所有人名写全名（姓+名），禁止只写姓氏/封号/职位/NPC/未记名；李承璟、{{user}}用原名。
- NPC状态：不设上限；只写本回有变化/值得续写的人；已出场和未出场都可写，不要重写全部。
- NPC事件：角色个人线，写目标、动作、阻力、进度；至少一条来自未出场 NPC。
- 国家事件：朝议/诏令/财政/军队/灾异/礼制/刑狱，不写私人心情。
- 邻国事件：使节/边报/贸易/战和，必须带国家名。
- 奏折：公文，写标题、上奏人、衙门、事由、主张、反对、状态、进度。
- 秘辛：内容、涉及、证据、知情者/不知情者；{{user}}和李承璟也可能知道。
- 流言：来源、传播链、可信度；不要写成事实。
- 斗争：类型、发起者、目标、手段、烈度、阶段、证据、进度。
- 朝堂门阀：派系（领袖/成员/主张/资源/目标/敌对/进度）、家族（家主/成员/姻亲/世仇/产业/门生/立场）。
- 医疗健康（有才写）：伤病/中毒/脉案/用药/太医诊治才生成；没有就空数组。人物、日期、症状、诊断、方子、太医、忌口、状态；孕事仍走孕事页。
- 时令/节庆礼仪：日期、节气、节日、礼仪、主礼、地点、座次、禁忌、节目、宴席、时辰；节日用古代节日并按日期推算最近的节；礼仪/主礼/地点/座次/禁忌/节目必须推演，不能写“未记”；宴席写名称/主家/地点/日期/宾客/目的，可用已知门阀制造一场古代宴席。
- 书信：称呼、落款、言外之意；时令：日期、节气、节日、时辰。
- 关系：甲对乙的方向；伏笔：未回收/已回收。
- 孕事：只写其他后妃的孕月、状态、风险；已出生子女写“孕事子女”。
- 子嗣：只写{{user}}；月事、周期、持续、排卵期、排卵可能按世界书/正文/太医记录；亲缘按世界书，不默认亲生。${fieldDict}${detail}`;
}

function wrapSubPrompt(core) {
    return buildEnabledModulesPrompt() + core + buildExtraModulesPrompt() + buildPregnancyPrompt() + buildModuleHandbook() + buildEventContext();
}

function setupInjection(force) {
    const s = getSettings();
    const uninject = () => {
        if (!state.injection) return;
        try { state.injection.uninject(); } catch (e) { /* ignore */ }
        state.injection = null;
        state.injectionKey = '';
    };

    if (!s.enabled) {
        uninject();
        return;
    }

    const context = buildEventContext();
    if (!context) {
        uninject();
        return;
    }
    const content = context + '\n\n（以上线索仅供续写参考。不要在正文里复述、解释或输出任何标签/JSON。）';
    const key = hashString(content);
    if (!force && state.injection && state.injectionKey === key) return;

    uninject();
    try {
        state.injection = injectPrompts([{
            id: 'lx-group-main-prompt',
            position: 'in_chat',
            depth: 4,
            role: 'system',
            content,
            should_scan: false
        }], { once: false });
        state.injectionKey = key;
    } catch (e) {
        console.warn('[群像志] 注入提示词失败', e);
    }
}

/* ------------------------------------------------------------------ */
/* JSON 解析与副 API                                                  */
/* ------------------------------------------------------------------ */

function extractJson(text) {
    if (!text) return null;
    let s = String(text).trim();
    s = s.replace(/^```[a-zA-Z0-9_-]*\s*/, '').replace(/```\s*$/, '').trim();
    const start = s.indexOf('{');
    if (start < 0) return null;
    let depth = 0;
    let inString = false;
    let escaped = false;
    for (let i = start; i < s.length; i++) {
        const ch = s[i];
        if (inString) {
            if (escaped) escaped = false;
            else if (ch === '\\') escaped = true;
            else if (ch === '"') inString = false;
            continue;
        }
        if (ch === '"') { inString = true; continue; }
        if (ch === '{') depth++;
        else if (ch === '}') {
            depth--;
            if (depth === 0) return s.slice(start, i + 1);
        }
    }
    return null;
}

function repairJson(text) {
    let s = String(text || '');
    s = s.replace(/,\s*([}\]])/g, '$1');
    s = s.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
    return s;
}

function parseJsonLoose(text) {
    const json = extractJson(text);
    if (!json) return { __error: '未找到 JSON', __raw: String(text || '').slice(0, 600) };
    const unwrap = parsed => {
        if (Array.isArray(parsed)) {
            return parsed.find(item => isPlainObject(item)) || { __error: 'JSON 数组为空' };
        }
        if (isPlainObject(parsed)) return parsed;
        return { __error: 'JSON 不是对象' };
    };
    try {
        return unwrap(JSON.parse(json));
    } catch (firstError) {
        try {
            return unwrap(JSON.parse(repairJson(json)));
        } catch (secondError) {
            return { __error: secondError.message || firstError.message, __raw: json.slice(0, 600) };
        }
    }
}

function parseGroupBlock(text) {
    if (!text || typeof text !== 'string') return null;
    const match = text.match(/<群像\s*>([\s\S]*?)<\/群像\s*>/i);
    if (!match) return null;
    const raw = match[1].trim();
    const parsed = parseJsonLoose(raw);
    if (parsed && parsed.__error) {
        parsed.__raw = raw.slice(0, 600);
    }
    return parsed;
}

function stripGroupBlock(text) {
    return String(text || '').replace(/<群像\s*>[\s\S]*?<\/群像\s*>/gi, '').trim();
}

function buildPregnancyPrompt() {
    if (!getSettings().pregnancyModule) return '';
    return `

【后妃孕事与子女】（本模块已开启，只记录其他后妃/ NPC；{{user}} 的孕事在“子嗣.用户”，不要混进来）
- 只写身份为后妃、嫔御、贵人、才人、皇后等的具名女子；不要写{{user}}、李承璟、陛下、圣上。
- 字段完整解释：
  · 人物：后妃姓名，不用封号代替姓名。
  · 孕月：1-10 的整数，按正文时间推进，只增不减。
  · 状态：有孕/稳定/不稳/见红/临盆/已生产/小产/难产。
  · 风险：低/中/高，或“胎位不正”“气血两亏”等具体风险。
  · 胎象：太医诊出的脉象、胎动、见红、腹痛等。
  · 太医：负责的太医姓名或“太医院”。
  · 饮食：忌口、安胎药、饮食异常。
  · 行动：静养/禁足/可走动/卧床等限制。
  · 预计产期：正文或太医给出的日期；没有写“未定”。
  · 知情者：谁已经知道、知道多少（全知/部分/怀疑）。
  · 备注：其他线索。
- 已生产、小产、流产的孕事要写清楚状态和胎象，程序会自动归入“已结束”。
- 后妃生产后，子女写到“孕事子女”：姓名、性别、身份（太子/太女/王爷/公主/皇子/皇女）、生母、亲缘（按世界书写亲生/养子/过继/庶出/嫡出/不详）、排行、出生、状态；不要写进“子嗣”。
- **只要后妃已经有孩子，即使她当前没有怀孕，也必须写进“孕事子女”**；世界书或正文提到过一次就要补录，不能因为当前孕事为空就整块省略。没有孩子的后妃才不写。
- 没有孕事就输出空数组，不要编造。
格式：
"孕事": [{"人物":"", "孕月":0, "状态":"", "风险":"", "胎象":"", "太医":"", "饮食":"", "行动":"", "预计产期":"", "知情者":[{"人物":"","程度":"部分"}], "备注":""}],
"孕事子女": [{"姓名":"","性别":"男/女","身份":"","生母":"","亲缘":"不详","排行":1,"年龄":0,"出生":"","状态":"在世","备注":""}]`;
}

let worldbookCache = { time: 0, key: '', text: '' };

function isStWorldbookEnabled() {
    try {
        const ctx = typeof getContext === 'function' ? getContext() : null;
        if (!ctx) return true;
        if ('world_info_enabled' in ctx) return !!ctx.world_info_enabled;
        if ('world_info_activated' in ctx) return !!ctx.world_info_activated;
        if ('world_info' in ctx) return !!ctx.world_info;
    } catch (e) { /* ignore */ }
    return true;
}

function getWorldbookNamesForPrompt() {
    const mode = getSettings().worldbookMode || 'follow';
    if (mode === 'off') return [];
    if (mode === 'follow' && !isStWorldbookEnabled()) return [];
    const names = new Set();
    const add = value => {
        if (!value) return;
        if (Array.isArray(value)) { value.forEach(add); return; }
        if (typeof value === 'object') {
            ['primary', 'additional', 'worldbook', 'name'].forEach(key => add(value[key]));
            return;
        }
        if (typeof value === 'string') names.add(value.trim());
    };
    // 只读当前角色卡绑定的世界书，不读全局世界书。
    try {
        if (typeof getCharWorldbookNames === 'function') add(getCharWorldbookNames('current'));
    } catch (e) { /* ignore */ }
    return Array.from(names).filter(Boolean);
}

function worldbookEntryId(bookName, entry, index) {
    const title = String(entry && (entry.comment || entry.name || entry.标题) || '').trim();
    return String(bookName || '') + '::' + (title || 'entry-' + index);
}

function getBoundWorldbookNames() {
    const books = new Set();
    const addBook = value => {
        if (!value) return;
        if (Array.isArray(value)) { value.forEach(addBook); return; }
        if (typeof value === 'object') {
            ['primary', 'additional', 'worldbook', 'name'].forEach(k => addBook(value[k]));
            return;
        }
        if (typeof value === 'string' && value.trim()) books.add(value.trim());
    };
    try {
        if (typeof getCharWorldbookNames === 'function') addBook(getCharWorldbookNames('current'));
    } catch (e) { /* ignore */ }
    return Array.from(books);
}

async function loadWorldbookEntries() {
    if (state.worldbookLoading) return state.worldbookEntryCache;
    state.worldbookLoading = true;
    const out = [];
    try {
        for (const bookName of getBoundWorldbookNames()) {
            let list = null;
            try {
                if (typeof getWorldbook === 'function') list = await getWorldbook(bookName);
            } catch (e) { /* ignore */ }
            if (!list) {
                try {
                    if (typeof getLorebookEntries === 'function') list = await getLorebookEntries(bookName);
                } catch (e) { /* ignore */ }
            }
            if (!Array.isArray(list)) list = list && Array.isArray(list.entries) ? list.entries : [];
            list.forEach((entry, index) => {
                if (!entry) return;
                const content = String(entry.content || entry.内容 || '').trim();
                const title = String(entry.name || entry.comment || entry.标题 || '').trim();
                if (!content && !title) return;
                const keys = [].concat((entry.strategy && entry.strategy.keys) || [], entry.key || [], entry.keys || entry.关键字 || [])
                    .flatMap(x => String(x).split(/[,，、\s]+/)).filter(Boolean).slice(0, 12);
                out.push({
                    book: bookName,
                    id: worldbookEntryId(bookName, entry, index),
                    title: title || `条目 ${index + 1}`,
                    keys,
                    content,
                    enabled: entry.enabled !== false && entry.disabled !== true
                });
            });
        }
    } finally {
        state.worldbookLoading = false;
        state.worldbookEntryCache = out;
    }
    return out;
}

function isWorldbookEntryEnabled(id) {
    const map = getSettings().worldbookEntries || {};
    return map[id] !== false;
}

async function collectWorldbookContext(haystack) {
    const context = String(haystack || '').toLowerCase();
    const mode = getSettings().worldbookMode || 'follow';
    if (mode === 'off') return '';
    if (mode === 'follow' && !isStWorldbookEnabled()) return '';
    const now = Date.now();
    const cacheKey = hashString(mode + '|' + context.slice(0, 4000));
    if (worldbookCache.text && worldbookCache.key === cacheKey && now - worldbookCache.time < 30000) return worldbookCache.text;
    const chunks = [];
    const seen = new Set();
    const addEntries = (list, bookName) => {
        if (!Array.isArray(list)) list = list && Array.isArray(list.entries) ? list.entries : [];
        list.forEach((entry, index) => {
            if (!entry || entry.enabled === false || entry.disabled === true) return;
            if (!isWorldbookEntryEnabled(worldbookEntryId(bookName, entry, index))) return;
            const content = String(entry.content || entry.内容 || '').trim();
            if (!content) return;
            const title = String(entry.comment || entry.name || entry.标题 || '').trim();
            const rawKeys = [].concat((entry.strategy && entry.strategy.keys) || [], entry.key || [], entry.keys || entry.关键字 || []);
            const keys = rawKeys.flatMap(item => String(item).split(/[,，、\s]+/)).filter(k => k.length >= 2);
            const matched = !!context && (keys.some(k => context.includes(k.toLowerCase())) || (title.length >= 2 && context.includes(title.toLowerCase())));
            // 只读相关条目，不把整本世界书塞进提示词。
            if (!matched) return;
            const key = title + '\u0000' + content.slice(0, 80);
            if (seen.has(key)) return;
            seen.add(key);
            chunks.push((title ? `【${title}】` : '') + content);
        });
    };
    for (const name of getWorldbookNamesForPrompt()) {
        let list = null;
        try {
            if (typeof getWorldbook === 'function') list = await getWorldbook(name);
        } catch (e) { /* try next API */ }
        if (!list) {
            try {
                if (typeof getLorebookEntries === 'function') list = await getLorebookEntries(name);
            } catch (e) { /* ignore */ }
        }
        addEntries(list, name);
        if (chunks.join('\n').length > 8000) break;
    }
    const text = chunks.join('\n').slice(0, 8000);
    if (text) worldbookCache = { time: now, key: cacheKey, text };
    return text;
}

function buildPersonaPrompt() {
    const parts = [];
    try {
        const ctx = typeof getContext === 'function' ? getContext() : null;
        if (ctx) {
            const personas = ctx.personas || {};
            const key = ctx.persona || ctx.user_persona || '';
            let persona = personas && personas[key];
            if (!persona && Array.isArray(personas)) persona = personas.find(p => p && (p.name === key || p.id === key));
            const userText = [
                persona && (persona.description || persona.text || persona.content),
                ctx.user_persona && typeof ctx.user_persona === 'string' ? ctx.user_persona : ''
            ].filter(Boolean).join('\n').trim();
            if (userText) parts.push(`【{{user}}人设】\n${userText.slice(0, 3000)}`);

            const chid = ctx.characterId !== undefined ? ctx.characterId : ctx.chid;
            const chars = ctx.characters;
            const char = Array.isArray(chars) ? (chars[chid] || chars[Number(chid)]) : null;
            if (char) {
                const charText = [
                    char.description && `描述：${char.description}`,
                    char.personality && `性格：${char.personality}`,
                    char.scenario && `场景：${char.scenario}`,
                    char.system_prompt && `系统提示：${char.system_prompt}`
                ].filter(Boolean).join('\n').trim();
                if (charText) parts.push(`【${char.name || ctx.name2 || '李承璟'}人设】\n${charText.slice(0, 3000)}`);
            }
        }
    } catch (e) { /* ignore */ }
    return parts.length ? '\n\n【人物设定（以这里为准，不要改写）】\n' + parts.join('\n\n') : '';
}

async function buildWorldbookPrompt(haystack) {
    const text = await collectWorldbookContext(haystack);
    return text ? `\n\n【世界书资料】（只取与当前人物/剧情相关的条目；人物关系、已有子女、孕事、位份以此为准，没写的不要编）\n${text}` : '';
}

async function buildPromptPreview() {
    const s = getSettings();
    const presets = getPresets();
    const core = presets[s.presetName] || presets['正常'];
    const baseline = getGroupData() || {};
    const tid = getLatestAssistantId();
    let ctx = '';
    try {
        const msg = tid >= 0 ? getChatMessages(tid)[0] : null;
        if (msg && msg.role === 'assistant') ctx = stripGroupBlock(msg.message);
    } catch (e) { /* ignore */ }
    const baselineText = JSON.stringify(baseline, null, 2).slice(0, 18000);
    const worldbookText = await buildWorldbookPrompt(ctx + '\n' + baselineText);
    return wrapSubPrompt(core)
        + buildPersonaPrompt()
        + worldbookText
        + `\n\n【当前群像状态】\n` + baselineText
        + `\n\n【本回正文】\n` + ctx.slice(0, 12000)
        + `\n\n【输出格式（必须遵守）】\n只输出一个合法 JSON 对象，不要输出解释、前后缀或 Markdown 代码块。`;
}

async function generateSub(settings, options) {
    const opts = options || {};
    const s = settings || getSettings();
    const presets = getPresets();
    const core = presets[s.presetName] || presets['正常'];
    const baseline = opts.baseline || getGroupData() || {};
    const messageId = opts.messageId !== undefined ? opts.messageId : getLatestAssistantId();
    let ctx = '';
    if (opts.initial) {
        try {
            const last = getLastMessageId();
            const msgs = last >= 0 ? getChatMessages('0-' + last) : [];
            ctx = (Array.isArray(msgs) ? msgs : []).slice(0, 12).map(m => {
                const who = m.name || (m.role === 'user' || m.is_user ? getUserDisplayName() : 'assistant');
                return `${who}：${stripGroupBlock(m.message || '')}`;
            }).join('\n');
        } catch (e) { /* ignore */ }
    } else {
        try {
            const msg = messageId >= 0 ? getChatMessages(messageId)[0] : null;
            if (msg && msg.role === 'assistant') {
                ctx = stripGroupBlock(msg.message);
            }
        } catch (e) { /* ignore */ }
    }

    const baselineText = JSON.stringify(baseline, null, 2).slice(0, 18000);
    const worldbookText = await buildWorldbookPrompt(ctx + '\n' + baselineText + '\n' + (opts.instruction || ''));
    const prompt = wrapSubPrompt(core)
        + buildPersonaPrompt()
        + worldbookText
        + (opts.initial ? '\n\n【开局补全】这是第一次补全：结合世界书、人设、开场白和最初几层对话，建立所有已出现和世界书提到的 NPC、国家事件、时令与线索；不要只写眼前几个人。' : '')
        + (opts.instruction ? `\n\n【本次重roll要求】\n${opts.instruction}` : '')
        + `\n\n【当前群像状态】\n` + baselineText
        + `\n\n【本回正文】\n` + ctx.slice(0, 12000)
        + `\n\n【输出格式（必须遵守）】\n只输出一个合法 JSON 对象，不要输出解释、前后缀或 Markdown 代码块。`;

    const config = {
        user_input: prompt,
        should_silence: true,
        max_chat_history: 0,
        ordered_prompts: [
            { role: 'system', content: '你是严谨的 JSON 生成器。只输出一个合法 JSON 对象，不输出解释、前后缀或 Markdown 代码块。' },
            { role: 'user', content: prompt }
        ]
    };

    if (s.mode === 'sub' && s.subApiUrl && s.subApiKey && s.subApiModel) {
        config.custom_api = {
            apiurl: s.subApiUrl,
            key: s.subApiKey,
            model: s.subApiModel,
            source: 'openai',
            temperature: s.temperature,
            max_tokens: s.maxTokens
        };
    }

    try {
        const result = await generateRaw(config);
        const text = typeof result === 'string'
            ? result
            : (result && (result.content || result.text) ? (result.content || result.text) : '');
        return parseJsonLoose(text);
    } catch (e) {
        return { __error: e && e.message ? e.message : String(e), __raw: '' };
    }
}

/* ------------------------------------------------------------------ */
/* 消息处理                                                           */
/* ------------------------------------------------------------------ */

function markProcessed(key) {
    state.processed.set(key, Date.now());
    const now = Date.now();
    state.processed.forEach((time, k) => {
        if (now - time > 120000) state.processed.delete(k);
    });
}

async function handleAiMessage(messageId, type) {
    if (state.busy) {
        state.pending = { messageId, type };
        return;
    }
    const s = getSettings();
    if (!s.enabled) return;
    if (type === 'quiet' || type === 'extension') return;

    const gen = state.gen;
    let msg = null;
    try { msg = getChatMessages(messageId)[0]; } catch (e) { /* ignore */ }
    if (!msg || msg.role !== 'assistant' || msg.is_hidden) return;
    // 打开角色卡/切换聊天时，已有的开场白和旧楼层不自动推演；
    // 只有载入后新生成的楼层，或手动点“生成”，才会调用 API。
    // 但刚刚滑动/重roll 的那一层必须放行，否则它会正好等于 autoStartId 而被误判成旧楼层。
    const recentSwipe = state.swipedId === messageId && (Date.now() - state.swipeAt) < 8000;
    if (messageId <= state.autoStartId && type !== 'swipe' && !recentSwipe) return;

    const noData = !getGroupData();
    const initialWindow = noData && !state.initialTried && messageId <= 3;
    if (initialWindow) {
        if (s.initialFill !== 'auto') return;
        state.initialTried = true;
    } else if (s.trigger !== 'auto') {
        return;
    }

    await advanceYearFromMessage(messageId, msg.message);

    const fingerprint = messageId + ':' + hashString(msg.message || '');
    // 重roll 后正文可能先被读到旧文本；不能再被上一次生成留下的 fingerprint 拦住。
    if (type !== 'swipe' && !recentSwipe && state.processed.has(fingerprint)) return;
    markProcessed(fingerprint);

    let fresh = null;
    const logEntry = {
        消息ID: messageId,
        模式: s.mode === 'main' ? '主API静默' : '副API',
        标签: '生成中',
        原始: '',
        结果: ''
    };

    state.busy = true;
    setBusyUI(true);
    try {
        const parsed = await generateSub(s, { messageId, initial: initialWindow });
        if (parsed && parsed.__error) {
            logEntry.标签 = s.mode === 'main' ? '主API失败' : '副API失败';
            logEntry.原始 = parsed.__raw || '';
            logEntry.结果 = parsed.__error;
            appendLog(logEntry);
            if (initialWindow) { state.initialTried = false; updateInitialButton(); }
            return;
        }
        logEntry.标签 = '解析成功';
        logEntry.原始 = JSON.stringify(parsed || {}).slice(0, 600);
        fresh = parsed;
    } finally {
        state.busy = false;
        setBusyUI(false);
        const pending = state.pending;
        state.pending = null;
        if (pending) setTimeout(() => handleAiMessage(pending.messageId, pending.type), 0);
    }

    if (gen !== state.gen) return;
    if (!fresh) return;
    if (!hasContent(fresh)) {
        logEntry.结果 = '没有可记录的变化';
        appendLog(logEntry);
        if (initialWindow) { state.initialTried = false; updateInitialButton(); }
        return;
    }

    const old = getGroupData() || {};
    const merged = mergeGroupData(old, fresh);
    const ok = await attachGroupData(messageId, merged);
    invalidateData();
    renderAll();
    setupInjection();
    markNewData();

    const npcCount = Object.keys(merged.NPC状态 || {}).filter(n => !isBlacklisted(n)).length;
    const activeCount = ['NPC事件', '国家事件', '邻国事件']
        .reduce((sum, key) => sum + (merged[key] || []).filter(e => getProgressNum(e) < 100).length, 0);
    logEntry.结果 = (ok ? '' : '写入失败；') + `NPC ${npcCount} 人，进行中事件 ${activeCount} 条`;
    appendLog(logEntry);
}

async function manualGenerate() {
    if (state.busy) { toast('warning', '正在生成中，请稍候'); return; }
    const s = getSettings();
    if (!s.enabled) { toast('warning', '群像系统未启用'); return; }
    const tid = getLatestAssistantId();
    if (tid < 0) { toast('error', '还没有 AI 消息'); return; }

    const gen = state.gen;
    try { const latest = getChatMessages(tid)[0]; if (latest) await advanceYearFromMessage(tid, latest.message); } catch (e) { /* ignore */ }
    state.busy = true;
    setBusyUI(true);
    toast('info', '群像生成中…');
    const logEntry = { 消息ID: tid + '(手动)', 模式: '手动', 标签: '', 原始: '', 结果: '' };
    try {
        const parsed = await generateSub(s, { messageId: tid });
        if (gen !== state.gen) return;
        if (parsed && parsed.__error) {
            logEntry.标签 = '解析失败';
            logEntry.原始 = parsed.__raw || '';
            logEntry.结果 = parsed.__error;
            appendLog(logEntry);
            toast('error', '失败：' + parsed.__error);
            return;
        }
        if (!hasContent(parsed)) {
            logEntry.标签 = '无变化';
            logEntry.结果 = '没有可记录的变化';
            appendLog(logEntry);
            toast('warning', '本回合没有可记录的变化');
            return;
        }
        logEntry.标签 = '解析成功';
        logEntry.原始 = JSON.stringify(parsed).slice(0, 600);
        const merged = mergeGroupData(getGroupData() || {}, parsed);
        const ok = await attachGroupData(tid, merged);
        invalidateData();
        renderAll();
        setupInjection();
        markNewData();
        logEntry.结果 = ok ? '已更新' : '写入失败';
        appendLog(logEntry);
        toast('success', ok ? '群像已更新' : '数据写入失败');
    } finally {
        state.busy = false;
        setBusyUI(false);
    }
}

async function rerollGroup(instruction) {
    if (state.busy) { toast('warning', '正在生成中，请稍候'); return; }
    const s = getSettings();
    if (!s.enabled) { toast('warning', '群像系统未启用'); return; }
    const tid = getLatestAssistantId();
    if (tid < 0) { toast('error', '还没有 AI 消息'); return; }

    const gen = state.gen;
    try { const latest = getChatMessages(tid)[0]; if (latest) await advanceYearFromMessage(tid, latest.message); } catch (e) { /* ignore */ }
    // 重roll 是重做这一层：先清掉旧群像，避免失败/中断时残留上一版。
    await clearGroupDataFromMessage(tid);
    invalidateData();
    renderAll();
    state.busy = true;
    setBusyUI(true);
    toast('info', '重新推演中…');
    const logEntry = { 消息ID: tid + '(重roll)', 模式: '重roll', 标签: '', 原始: '', 结果: '' };
    try {
        const baseline = getPrevGroupData(tid) || {};
        const parsed = await generateSub(s, { messageId: tid, baseline, instruction: String(instruction || '').trim().slice(0, 500) });
        if (gen !== state.gen) return;
        if (parsed && parsed.__error) {
            logEntry.标签 = '解析失败';
            logEntry.原始 = parsed.__raw || '';
            logEntry.结果 = parsed.__error;
            appendLog(logEntry);
            toast('error', '失败：' + parsed.__error);
            return;
        }
        if (!hasContent(parsed)) {
            logEntry.标签 = '无变化';
            logEntry.结果 = '没有可记录的变化';
            appendLog(logEntry);
            toast('warning', '本回合没有可记录的变化');
            return;
        }
        logEntry.标签 = '解析成功';
        logEntry.原始 = JSON.stringify(parsed).slice(0, 600);
        const merged = mergeGroupData(baseline, parsed);
        const ok = await attachGroupData(tid, merged);
        invalidateData();
        renderAll();
        setupInjection();
        markNewData();
        logEntry.结果 = ok ? '已重roll' : '写入失败';
        appendLog(logEntry);
        toast('success', ok ? '重roll 完成' : '数据写入失败');
    } finally {
        state.busy = false;
        setBusyUI(false);
    }
}

async function handleSwipe(messageId) {
    // 正文重roll/滑动：这一层正文换了，旧群像必须一起清掉，避免残留上一版。
    let id = Number(messageId);
    if (!Number.isFinite(id) || id < 0) {
        try { id = getLatestAssistantId(); } catch (e) { id = -1; }
    }
    // 事件和轮询可能同时发现同一次重roll，1.5 秒内只处理一次。
    if (Number.isFinite(id) && id >= 0 && state.swipedId === id && (Date.now() - state.swipeAt) < 1500) return;
    if (Number.isFinite(id) && id >= 0) {
        state.swipedId = id;
        state.swipeAt = Date.now();
        await clearGroupDataFromMessage(id);
    }
    if (!getGroupData()) state.initialTried = false;
    invalidateData();
    renderAll();
    setupInjection();
    const s = getSettings();
    if (s.enabled && s.trigger === 'auto' && Number.isFinite(id) && id >= 0) {
        await handleAiMessage(id, 'swipe');
    }
}

async function handleEdited() {
    invalidateData();
    renderAll();
    setupInjection();
}


/* ------------------------------------------------------------------ */
/* 样式                                                               */
/* ------------------------------------------------------------------ */

const CSS = `
#lx-root {
    --lx-bg: linear-gradient(180deg,#1a1612 0%,#0d0b08 100%);
    --lx-bg-solid: #1a1612;
    --lx-border: #6b5d42;
    --lx-gold: #d4af37;
    --lx-text: #e8d9a0;
    --lx-text2: #c9c0a8;
    --lx-dim: #8a7d66;
    --lx-input-bg: rgba(0,0,0,0.35);
    --lx-card-bg: rgba(212,175,55,0.03);
    --lx-event-bg: rgba(0,0,0,0.15);
    --lx-shadow: 0 0 0 4px rgba(0,0,0,0.6),0 0 0 5px #6b5d42,0 20px 60px rgba(0,0,0,0.75);
    --lx-vh: 100dvh;
    --lx-vw: 100vw;
    --lx-vv-top: 0px;
    --lx-vv-left: 0px;
    position: absolute;
    inset: 0;
    z-index: 2147483600;
    pointer-events: none;
    font-family: "Noto Serif SC", "Songti SC", "STSong", "SimSun", serif;
    color: var(--lx-text);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
}
#lx-root *, #lx-root *::before, #lx-root *::after { box-sizing: border-box; }
#lx-root button, #lx-root input, #lx-root textarea, #lx-root select { font: inherit; }
#lx-root button { -webkit-tap-highlight-color: transparent; }

/* 悬浮球：纯 CSS 罗盘，无文字 */
#lx-ball {
    position: absolute;
    right: 14px;
    top: 28%;
    width: var(--lx-ball-size, 50px);
    height: var(--lx-ball-size, 50px);
    border-radius: 50%;
    display: block;
    padding: 0;
    margin: 0;
    border: none;
    background:
        radial-gradient(circle at 30% 23%, rgba(255,255,255,0.20), transparent 36%),
        radial-gradient(circle at 50% 55%, #4a3620 0%, #2a1c10 42%, #120c07 72%, #050403 100%);
    box-shadow:
        0 2px 7px rgba(0,0,0,0.45),
        0 10px 26px rgba(0,0,0,0.42),
        inset 0 1px 1px rgba(255,255,255,0.18),
        inset 0 -10px 18px rgba(0,0,0,0.62);
    cursor: grab;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    z-index: 7;
    pointer-events: auto;
    outline: none;
    transition: transform 0.18s ease, box-shadow 0.3s ease, opacity 0.18s ease, left 0.18s ease, top 0.18s ease;
    will-change: left, top, transform;
}
#lx-ball::before {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: 50%;
    border: 1px solid rgba(212,175,55,0.42);
    border-left-color: transparent;
    border-bottom-color: transparent;
    transform: rotate(22deg);
    pointer-events: none;
}
#lx-ball::after {
    content: "";
    position: absolute;
    inset: 2px;
    border-radius: 50%;
    background: linear-gradient(150deg, rgba(255,255,255,0.24), transparent 38%, rgba(0,0,0,0.12) 70%);
    pointer-events: none;
}
.lx-ball-halo {
    position: absolute;
    inset: calc(var(--lx-ball-size, 50px) * -0.14);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(212,175,55,0.22), transparent 66%);
    filter: blur(6px);
    animation: lx-halo 4.8s ease-in-out infinite;
    pointer-events: none;
}
.lx-ball-ring {
    position: absolute;
    inset: calc(var(--lx-ball-size, 50px) * 0.10);
    border-radius: 50%;
    background: repeating-conic-gradient(from 0deg, rgba(232,200,106,0.9) 0deg 1.3deg, transparent 1.3deg 30deg);
    -webkit-mask: radial-gradient(circle, transparent 59%, #000 60%, #000 69%, transparent 70%);
    mask: radial-gradient(circle, transparent 59%, #000 60%, #000 69%, transparent 70%);
    animation: lx-spin 38s linear infinite;
    opacity: 0.82;
    pointer-events: none;
}
.lx-ball-core {
    position: absolute;
    inset: calc(var(--lx-ball-size, 50px) * 0.24);
    border-radius: 50%;
    border: 1px solid rgba(232,200,106,0.45);
    background: radial-gradient(circle at 36% 30%, #72522a, #2d1f12 56%, #120c07 100%);
    box-shadow:
        inset 0 1px 2px rgba(255,255,255,0.24),
        inset 0 -4px 9px rgba(0,0,0,0.6);
    pointer-events: none;
}
.lx-ball-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    display: none;
    z-index: 1;
    pointer-events: none;
}
#lx-ball.has-custom-image { background: #120c07; }
#lx-ball.has-custom-image .lx-ball-image { display: block; }
#lx-ball.has-custom-image .lx-ball-halo,
#lx-ball.has-custom-image .lx-ball-ring,
#lx-ball.has-custom-image .lx-ball-core,
#lx-ball.has-custom-image .lx-ball-gem { display: none; }
#lx-ball.has-custom-image::before,
#lx-ball.has-custom-image::after { display: none; }
#lx-ball.has-custom-image {
    clip-path: none !important;
    border-radius: 50% !important;
    border: 0 !important;
    background: #120c07;
}
.lx-ball-tassel, .lx-ball-spark { position: absolute; display: none; pointer-events: none; z-index: 2; }
#lx-ball.has-custom-image .lx-ball-tassel,
#lx-ball.has-custom-image .lx-ball-spark { display: none !important; }

/* 悬浮球外观：罗盘 / 宫灯 / 玉玺 / 铜镜 / 竹简 */
#lx-ball.style-lantern:not(.has-custom-image) {
    border-radius: 0;
    clip-path: polygon(50% 0, 92% 22%, 92% 78%, 50% 100%, 8% 78%, 8% 22%);
    background: linear-gradient(180deg, #a4472f, #6e211c 45%, #3a0f10);
    filter: drop-shadow(0 0 10px rgba(230,150,70,.35));
}
#lx-ball.style-lantern::before {
    inset: 4px; border: 1px solid rgba(240,200,120,.55); border-radius: 0;
    background: repeating-linear-gradient(90deg, rgba(240,200,120,.16) 0 1px, transparent 1px 9px);
    transform: none; opacity: .8;
}
#lx-ball.style-lantern::after { inset: 0; background: linear-gradient(180deg, rgba(255,220,150,.18), transparent 40%, rgba(0,0,0,.28)); }
#lx-ball.style-lantern .lx-ball-ring { display: none; }
#lx-ball.style-lantern .lx-ball-core {
    inset: 28%; border-radius: 50%; border: 0;
    background: radial-gradient(ellipse at 50% 40%, #ffe6a8, #e2a44f 55%, #9b4f23);
    box-shadow: 0 0 18px rgba(255,200,110,.7);
}
#lx-ball.style-lantern .lx-ball-gem { display: none; }
#lx-ball.style-lantern .lx-ball-halo { background: radial-gradient(circle, rgba(230,140,70,.32), transparent 68%); }

#lx-ball.style-seal:not(.has-custom-image) {
    border-radius: 4px;
    clip-path: none;
    border: 2px solid #d6c38d;
    background: linear-gradient(135deg, #b9d6b0, #7fa786 38%, #4d7257 70%, #33513d);
    box-shadow: 0 8px 20px rgba(0,0,0,.5), inset 0 2px 4px rgba(255,255,255,.4), inset 0 -8px 16px rgba(0,0,0,.25);
}
#lx-ball.style-seal::before {
    content: ""; position: absolute; left: 50%; top: -10px; width: 16px; height: 12px;
    transform: translateX(-50%);
    border: 1px solid #e6d39b; border-radius: 5px 5px 2px 2px;
    background: linear-gradient(135deg, #d9c28f, #9c7c43);
    opacity: 1;
}
#lx-ball.style-seal::after {
    left: 5px; right: 5px; bottom: 5px; top: auto; height: 14px;
    transform: none; border: 1px solid #9d3a2a; border-radius: 1px;
    background: repeating-linear-gradient(90deg, rgba(157,58,42,.18) 0 2px, transparent 2px 5px);
    opacity: .9;
}
#lx-ball.style-seal .lx-ball-ring,
#lx-ball.style-seal .lx-ball-core,
#lx-ball.style-seal .lx-ball-gem { display: none; }
#lx-ball.style-seal .lx-ball-halo { background: radial-gradient(circle, rgba(120,190,140,.28), transparent 68%); }

#lx-ball.style-mirror:not(.has-custom-image) {
    border-radius: 50%;
    border: 2px solid #d4b16b;
    background: radial-gradient(circle at 36% 28%, #f2dfb0, #c69a56 30%, #7b5128 64%, #3a2816 100%);
    box-shadow: 0 8px 22px rgba(0,0,0,.55), inset 0 0 0 4px rgba(70,45,20,.32), inset 0 2px 8px rgba(255,255,255,.35);
}
#lx-ball.style-mirror::before {
    inset: 7px; border: 1px solid rgba(68,44,20,.55); background: transparent;
    transform: none; opacity: 1; box-shadow: inset 0 0 10px rgba(255,240,200,.18);
}
#lx-ball.style-mirror::after {
    content: ""; position: absolute; left: 50%; top: 86%; width: 8px; height: 18px;
    transform: translateX(-50%);
    border: 1px solid #e0c07a; border-radius: 2px 2px 5px 5px;
    background: linear-gradient(90deg, #6f4b25, #d4b16b 45%, #6f4b25);
}
#lx-ball.style-mirror .lx-ball-ring { display: none; }
#lx-ball.style-mirror .lx-ball-core {
    inset: 38%; border: 0; border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, #3c2814, #1e1209);
    box-shadow: 0 0 0 2px rgba(60,40,20,.35);
}
#lx-ball.style-mirror .lx-ball-gem { display: none; }
#lx-ball.style-mirror .lx-ball-halo { background: radial-gradient(circle, rgba(212,175,55,.22), transparent 68%); }

#lx-ball.style-bamboo:not(.has-custom-image) {
    border-radius: 3px;
    clip-path: none;
    border: 2px solid #6f8a5c;
    background:
        repeating-linear-gradient(90deg, #d8c486 0 2px, #8f9e62 2px 3px, #c7b877 3px 7px, transparent 7px 9px),
        linear-gradient(180deg, #d9c98c, #8a925c);
    box-shadow: 0 8px 20px rgba(0,0,0,.48), inset 0 2px 4px rgba(255,255,255,.3);
}
#lx-ball.style-bamboo::before {
    content: ""; position: absolute; left: -2px; right: -2px; top: 10px; height: 2px;
    border: 0; border-radius: 0; transform: none; opacity: 1;
    background: #6b3f2d; box-shadow: 0 22px 0 #6b3f2d;
}
#lx-ball.style-bamboo::after {
    content: ""; position: absolute; left: 50%; top: -8px; width: 12px; height: 8px;
    transform: translateX(-50%);
    border: 2px solid #b28e55; border-bottom: none; border-radius: 8px 8px 0 0;
    background: transparent;
}
#lx-ball.style-bamboo .lx-ball-ring,
#lx-ball.style-bamboo .lx-ball-core,
#lx-ball.style-bamboo .lx-ball-gem { display: none; }
#lx-ball.style-bamboo .lx-ball-halo { background: radial-gradient(circle, rgba(130,160,110,.25), transparent 68%); }

/* 华丽动效：宫灯 / 玉玺 / 铜镜 / 竹简 */
#lx-ball.style-lantern .lx-ball-ring {
    display: block;
    inset: 3px;
    border-radius: 0;
    background: repeating-linear-gradient(90deg, rgba(240,200,120,.40) 0 1px, transparent 1px 7px);
    -webkit-mask: none;
    mask: none;
    animation: lx-lantern-slats 4s ease-in-out infinite;
    opacity: .55;
}
#lx-ball.style-lantern .lx-ball-core {
    animation: lx-flame 2.4s ease-in-out infinite;
    transform-origin: 50% 55%;
}
#lx-ball.style-lantern .lx-ball-halo { animation: lx-lantern-glow 3.2s ease-in-out infinite; }
#lx-ball.style-lantern .lx-ball-tassel {
    display: block;
    left: 50%;
    bottom: 0;
    width: 2px;
    height: 12px;
    margin-left: -1px;
    background: linear-gradient(180deg, #f0c878, #8a3d1d 60%, transparent);
    box-shadow: 0 0 4px rgba(240,190,100,.55);
    transform-origin: 50% 0;
    animation: lx-tassel 3s ease-in-out infinite;
}
#lx-ball.style-lantern::after { animation: lx-lantern-surface 5s ease-in-out infinite; }

#lx-ball.style-seal .lx-ball-ring {
    display: block;
    inset: 7px;
    border: 1px solid rgba(226,205,145,.42);
    border-radius: 1px;
    background: transparent;
    -webkit-mask: none;
    mask: none;
    animation: lx-seal-ring 3.6s ease-in-out infinite;
}
#lx-ball.style-seal .lx-ball-spark {
    display: block;
    width: 3px; height: 3px;
    right: 7px; top: 7px;
    border-radius: 50%;
    background: #fff6d2;
    box-shadow: 0 0 5px #f5e0a2;
    animation: lx-spark 2.8s ease-in-out infinite;
}
#lx-ball.style-seal .lx-ball-halo { animation: lx-seal-glow 3.6s ease-in-out infinite; }
#lx-ball.style-seal::before { animation: lx-knob 3.6s ease-in-out infinite; }

#lx-ball.style-mirror .lx-ball-ring {
    display: block;
    inset: 10%;
    border: 1px dashed rgba(255,236,190,.42);
    background: transparent;
    -webkit-mask: none;
    mask: none;
    animation: lx-mirror-spin 16s linear infinite;
}
#lx-ball.style-mirror .lx-ball-spark {
    display: block;
    width: 4px; height: 4px;
    right: 8px; top: 8px;
    border-radius: 50%;
    background: #fffdf0;
    box-shadow: 0 0 6px #fff2b0, 0 0 12px rgba(255,240,180,.6);
    animation: lx-spark 3.4s ease-in-out infinite;
}
#lx-ball.style-mirror .lx-ball-core { animation: lx-mirror-knob 4.4s ease-in-out infinite; }
#lx-ball.style-mirror .lx-ball-halo { animation: lx-mirror-glow 4.4s ease-in-out infinite; }

#lx-ball.style-bamboo .lx-ball-ring {
    display: block;
    inset: 0;
    border-radius: 2px;
    background: linear-gradient(180deg, transparent 0%, rgba(255,245,190,.30) 40%, transparent 78%);
    -webkit-mask: none;
    mask: none;
    animation: lx-bamboo-light 4.8s ease-in-out infinite;
}
#lx-ball.style-bamboo .lx-ball-tassel {
    display: block;
    left: 50%;
    bottom: 0;
    width: 2px;
    height: 10px;
    margin-left: -1px;
    background: linear-gradient(180deg, #d9b46a, #6b3f2d 70%, transparent);
    transform-origin: 50% 0;
    animation: lx-tassel 4s ease-in-out infinite;
}
#lx-ball.style-bamboo .lx-ball-spark {
    display: block;
    width: 2px; height: 2px;
    left: 9px; bottom: 10px;
    border-radius: 50%;
    background: #fff6d2;
    box-shadow: 0 0 5px #e8d38a;
    animation: lx-spark 4.6s ease-in-out infinite;
}
#lx-ball.style-bamboo .lx-ball-halo { animation: lx-bamboo-glow 4.8s ease-in-out infinite; }

@keyframes lx-lantern-slats {
    0%, 100% { opacity: .42; background-position: 0 0; }
    50% { opacity: .72; background-position: 2px 0; }
}
@keyframes lx-flame {
    0%, 100% { transform: scale(.92); box-shadow: 0 0 12px rgba(255,190,90,.55); }
    50% { transform: scale(1.06); box-shadow: 0 0 26px rgba(255,210,110,.9); }
}
@keyframes lx-lantern-glow {
    0%, 100% { opacity: .55; transform: scale(.96); }
    50% { opacity: 1; transform: scale(1.08); }
}
@keyframes lx-lantern-surface {
    0%, 100% { opacity: .65; }
    50% { opacity: 1; }
}
@keyframes lx-tassel {
    0%, 100% { transform: rotate(-5deg); }
    50% { transform: rotate(5deg); }
}
@keyframes lx-seal-ring {
    0%, 100% { box-shadow: inset 0 0 0 1px rgba(255,240,190,.12); opacity: .55; }
    50% { box-shadow: inset 0 0 8px rgba(255,240,190,.32); opacity: 1; }
}
@keyframes lx-spark {
    0%, 100% { opacity: 0; transform: scale(.5); }
    45% { opacity: 1; transform: scale(1.2); }
    60% { opacity: .35; transform: scale(.8); }
}
@keyframes lx-seal-glow {
    0%, 100% { opacity: .45; transform: scale(.96); }
    50% { opacity: .9; transform: scale(1.05); }
}
@keyframes lx-knob {
    0%, 100% { filter: brightness(1); }
    50% { filter: brightness(1.3); }
}
@keyframes lx-mirror-spin { to { transform: rotate(360deg); } }
@keyframes lx-mirror-knob {
    0%, 100% { box-shadow: 0 0 0 2px rgba(60,40,20,.35), 0 0 8px rgba(255,230,170,.18); }
    50% { box-shadow: 0 0 0 2px rgba(60,40,20,.35), 0 0 18px rgba(255,240,190,.55); }
}
@keyframes lx-mirror-glow {
    0%, 100% { opacity: .5; transform: scale(.96); }
    50% { opacity: 1; transform: scale(1.06); }
}
@keyframes lx-bamboo-light {
    0%, 100% { background-position: 0 -20px; opacity: .35; }
    50% { background-position: 0 35px; opacity: .9; }
}
@keyframes lx-bamboo-glow {
    0%, 100% { opacity: .5; transform: scale(.97); }
    50% { opacity: .9; transform: scale(1.05); }
}

.lx-ball-style-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; }
.lx-ball-style-item {
    padding: 6px 2px; border: 1px solid var(--lx-border); background: var(--lx-event-bg);
    text-align: center; cursor: pointer; font-size: 9.5px; color: var(--lx-muted, var(--lx-dim));
}
.lx-ball-style-item.active { border-color: var(--lx-gold); color: var(--lx-gold); box-shadow: inset 0 0 0 1px var(--lx-gold); }
.lx-ball-thumb { display: block; width: 30px; height: 30px; margin: 0 auto 4px; position: relative; }
.thumb-compass { border-radius: 50%; background: radial-gradient(circle at 35% 30%, #6b4d2a, #120c07); border: 1px solid #d4af37; box-shadow: inset 0 0 0 4px rgba(212,175,55,.18); }
.thumb-lantern { background: linear-gradient(180deg, #a4472f, #3a0f10); clip-path: polygon(50% 0, 92% 22%, 92% 78%, 50% 100%, 8% 78%, 8% 22%); border: 1px solid #d9b46a; }
.thumb-seal { width: 26px; height: 26px; background: linear-gradient(135deg, #b9d6b0, #4d7257); border: 1px solid #d6c38d; border-radius: 3px; }
.thumb-mirror { border-radius: 50%; background: radial-gradient(circle at 35% 30%, #f2dfb0, #7b5128 70%); border: 1px solid #d4b16b; }
.thumb-mirror::after { content: ""; position: absolute; left: 50%; top: 80%; width: 4px; height: 9px; transform: translateX(-50%); background: #b28e55; }
.thumb-bamboo { width: 22px; height: 28px; background: repeating-linear-gradient(90deg, #d8c486 0 2px, #8f9e62 2px 3px, #c7b877 3px 6px); border: 1px solid #6f8a5c; border-radius: 2px; }
.lx-ball-gem {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(var(--lx-ball-size, 50px) * 0.18);
    height: calc(var(--lx-ball-size, 50px) * 0.18);
    border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, #fff2c4, #d4af37 46%, #8a5a1e 100%);
    box-shadow: 0 0 8px rgba(232,200,106,0.8), 0 0 18px rgba(212,175,55,0.35);
    pointer-events: none;
}
.lx-ball-dot { display: none !important; }
.lx-ball-badge {
    position: absolute;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #c0392b;
    border: 1.5px solid #17110b;
    box-shadow: 0 0 7px rgba(192,57,43,0.8);
    display: none;
    z-index: 100001;
    pointer-events: none;
}
.lx-ball-badge.show { display: block; animation: lx-pulse 1.8s ease-in-out infinite; }
#lx-ball:active { transform: scale(0.93); }
#lx-ball.is-hidden { opacity: 0; pointer-events: none; transform: scale(0.82); }
#lx-ball.dragging {
    transition: none;
    cursor: grabbing;
    transform: scale(1.07);
    box-shadow:
        0 3px 12px rgba(0,0,0,0.5),
        0 14px 32px rgba(0,0,0,0.48),
        0 0 0 3px rgba(212,175,55,0.18),
        inset 0 1px 1px rgba(255,255,255,0.18),
        inset 0 -10px 18px rgba(0,0,0,0.62);
}
#lx-ball:focus-visible {
    box-shadow:
        0 0 0 3px rgba(212,175,55,0.85),
        0 10px 26px rgba(0,0,0,0.45),
        inset 0 1px 1px rgba(255,255,255,0.18);
}
@media (hover: hover) {
    #lx-ball:hover { transform: translateY(-1px) scale(1.06); }
    #lx-ball:hover .lx-ball-ring { opacity: 1; }
    #lx-ball:hover .lx-ball-gem { box-shadow: 0 0 12px rgba(255,230,150,0.95), 0 0 24px rgba(212,175,55,0.5); }
}
@keyframes lx-spin { to { transform: rotate(360deg); } }
@keyframes lx-halo { 0%, 100% { opacity: 0.55; transform: scale(0.96); } 50% { opacity: 0.9; transform: scale(1.04); } }
@keyframes lx-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.35); opacity: 0.65; }
}

/* 遮罩 */
#lx-mask {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.56);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    display: none;
    z-index: 8;
    pointer-events: auto;
    touch-action: none;
}
#lx-mask.show { display: block; }

/* 重roll 要求弹窗 */
.lx-reroll-mask {
    position: absolute;
    inset: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18px;
    background: rgba(0,0,0,.58);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    pointer-events: auto;
}
.lx-reroll-dialog {
    width: min(88vw, 380px);
    max-height: calc(100dvh - 24px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid var(--lx-border);
    background: var(--lx-bg);
    color: var(--lx-text);
    box-shadow: var(--lx-shadow);
    padding: 14px;
}
.lx-reroll-title { color: var(--lx-gold); font-size: 13px; letter-spacing: 2px; margin-bottom: 6px; }
.lx-reroll-hint { color: var(--lx-dim); font-size: 10px; line-height: 1.6; margin-bottom: 8px; }
.lx-reroll-input {
    width: 100%;
    flex: 1 1 auto;
    min-height: 160px;
    max-height: calc(100dvh - 170px);
    overflow: auto;
    resize: vertical;
    padding: 8px;
    border: 1px solid var(--lx-border);
    background: var(--lx-input-bg);
    color: var(--lx-text);
    font: inherit;
    font-size: 12px;
    line-height: 1.6;
}
.lx-reroll-actions { display: flex; gap: 6px; justify-content: flex-end; margin-top: 10px; }

/* 主面板 / 设置面板 */
#lx-panel, #lx-settings {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0.96);
    width: min(92vw, 470px);
    height: min(84vh, 640px);
    height: min(84dvh, 640px);
    display: none;
    flex-direction: column;
    background: var(--lx-bg);
    border: 1px solid var(--lx-border);
    border-radius: 6px;
    box-shadow: var(--lx-shadow);
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.18s ease, transform 0.18s ease;
    color: var(--lx-text);
}
#lx-panel { z-index: 9; }
#lx-settings { z-index: 10; }
#lx-panel.show, #lx-settings.show {
    display: flex;
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, -50%) scale(1);
}

.lx-header {
    flex: 0 0 auto;
    padding: 12px 14px;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    border-bottom: 1px solid var(--lx-border);
    background: var(--lx-card-bg);
}
.lx-title {
    font-size: 15px;
    line-height: 1.2;
    letter-spacing: 5px;
    color: var(--lx-gold);
    font-weight: 700;
    white-space: nowrap;
}
.lx-initial-btn {
    display: none;
    margin-left: auto;
    margin-right: 6px;
    padding: 4px 9px;
    border: 1px solid var(--lx-border);
    border-radius: var(--lx-btn-radius, 2px);
    background: var(--lx-btn-bg, transparent);
    color: var(--lx-accent, var(--lx-gold));
    font-family: inherit;
    font-size: 10px;
    letter-spacing: 1px;
    cursor: pointer;
}
.lx-initial-btn.show { display: inline-flex; align-items: center; }
.lx-batch-btn {
    margin-left: auto;
    padding: 4px 8px;
    border: 1px solid var(--lx-border);
    background: var(--lx-btn-bg, transparent);
    color: var(--lx-dim);
    font: inherit;
    font-size: 10px;
    cursor: pointer;
}
.lx-batch-btn.on { border-color: var(--lx-gold); color: var(--lx-gold); }
.lx-batch-bar {
    display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
    margin: 0 0 8px; padding: 6px 8px; border: 1px solid var(--lx-gold);
    background: var(--lx-event-bg); color: var(--lx-gold); font-size: 10px;
}
.lx-batch-check { width: 14px; height: 14px; accent-color: var(--lx-gold); margin-right: 5px; vertical-align: middle; }
.lx-follow-btn { margin-left: 6px; padding: 0 3px; border: 1px solid var(--lx-border); background: transparent; color: var(--lx-dim); font: inherit; font-size: 8px; line-height: 1.4; cursor: pointer; vertical-align: middle; }
.lx-follow-btn.on { border-color: var(--lx-gold); color: var(--lx-gold); }
.lx-npc-card.followed { border-left-color: var(--lx-gold); box-shadow: inset 3px 0 0 var(--lx-gold); }
.lx-icon-btn {
    flex: 0 0 auto;
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border: 1px solid transparent;
    border-radius: 50%;
    background: transparent;
    color: var(--lx-dim);
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
    padding: 0;
    transition: color 0.15s, background 0.15s, border-color 0.15s;
}
.lx-icon-btn:hover { color: var(--lx-gold); background: var(--lx-card-bg); border-color: var(--lx-border); }

/* 页签 */
.lx-tabs {
    flex: 0 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-bottom: 1px solid var(--lx-border);
    background: var(--lx-event-bg);
}
.lx-tab {
    position: relative;
    padding: 9px 4px;
    text-align: center;
    font-size: 11.5px;
    line-height: 1.25;
    letter-spacing: 1px;
    color: var(--lx-dim);
    cursor: pointer;
    border-right: 1px solid var(--lx-border);
    border-bottom: 1px solid var(--lx-border);
    transition: color 0.15s, background 0.15s;
    user-select: none;
    white-space: nowrap;
}
.lx-tab:nth-child(4n) { border-right: none; }
.lx-tab:nth-child(n+11) { border-bottom: none; }
.lx-tab:last-child { border-right: none; }
.lx-tab:hover { color: var(--lx-gold); }
.lx-tab.active { color: var(--lx-gold); background: var(--lx-card-bg); font-weight: 700; }
.lx-tab.active::after {
    content: "";
    position: absolute;
    left: 24%;
    right: 24%;
    bottom: -1px;
    height: 2px;
    background: var(--lx-gold);
}
.lx-tab-num {
    display: inline-block;
    min-width: 1.2em;
    margin-left: 2px;
    padding: 0 3px;
    border-radius: 7px;
    background: var(--lx-card-bg);
    color: var(--lx-gold);
    font-size: 9px;
    line-height: 1.5;
    vertical-align: 1px;
}
.lx-tab-num:empty { display: none; }

/* 搜索 */
.lx-search {
    flex: 0 0 auto;
    display: flex;
    gap: 6px;
    padding: 7px 10px;
    border-bottom: 1px solid var(--lx-border);
    background: var(--lx-card-bg);
}
.lx-search .lx-input { flex: 1; min-width: 0; padding: 7px 9px; font-size: 12px; }
.lx-search .lx-mini-btn { flex: 0 0 auto; }

/* 内容区 */
.lx-content {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 14px;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-color: var(--lx-border) transparent;
}
.lx-content::-webkit-scrollbar, .lx-settings-body::-webkit-scrollbar, .lx-debug-log::-webkit-scrollbar { width: 6px; }
.lx-content::-webkit-scrollbar-thumb, .lx-settings-body::-webkit-scrollbar-thumb, .lx-debug-log::-webkit-scrollbar-thumb { background: var(--lx-border); border-radius: 3px; }
.lx-panel-tab { display: none; }
.lx-panel-tab.active { display: block; }

.lx-empty {
    text-align: center;
    color: var(--lx-dim);
    padding: 36px 10px;
    font-size: 12.5px;
    letter-spacing: 3px;
    font-style: italic;
}

/* NPC */
.lx-year {
    color: var(--lx-gold);
    font-size: 11.5px;
    letter-spacing: 2px;
    padding: 0 0 8px;
    margin-bottom: 4px;
    border-bottom: 1px dashed var(--lx-border);
}
.lx-npc-card {
    padding: 11px 13px;
    border: 1px solid var(--lx-border);
    border-left: 3px solid var(--lx-gold);
    background: var(--lx-card-bg);
    margin-bottom: 9px;
    border-radius: 3px;
}
.lx-npc-group-title {
    margin: 10px 0 6px;
    padding: 4px 8px;
    border: 1px solid var(--lx-border);
    border-radius: 2px;
    background: var(--lx-event-bg);
    color: var(--lx-gold);
    font-size: 11px;
    letter-spacing: 2px;
}
.lx-npc-group-title:first-child { margin-top: 0; }
.lx-npc-subtitle {
    margin: 8px 0 5px;
    color: var(--lx-dim);
    font-size: 10.5px;
    letter-spacing: 1px;
}
.lx-npc-subtitle.current { color: var(--lx-gold); }
.lx-npc-card.current { border-color: var(--lx-gold); }
.lx-npc-now {
    margin-left: 6px;
    padding: 0 4px;
    border: 1px solid var(--lx-gold);
    color: var(--lx-gold);
    font-size: 9px;
    letter-spacing: 0;
    vertical-align: middle;
}.lx-npc-name {
    color: var(--lx-gold);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 6px;
    word-break: break-word;
}
.lx-npc-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 12px;
    font-size: 12px;
    line-height: 1.5;
    color: var(--lx-text2);
}
.lx-npc-meta span { word-break: break-word; }
.lx-npc-meta span::before { content: "· "; color: var(--lx-border); }

/* 事件 */
.lx-event {
    padding: 9px 11px 11px;
    border-left: 2px solid var(--lx-border);
    margin-bottom: 9px;
    font-size: 13px;
    line-height: 1.7;
    color: var(--lx-text2);
    background: var(--lx-event-bg);
    border-radius: 3px;
    word-break: break-word;
}
.lx-event .lx-role { color: var(--lx-gold); font-weight: 700; margin-right: 5px; }
.lx-event-domain {
    margin-left: 5px;
    padding: 0 4px;
    border: 1px solid var(--lx-border);
    color: var(--lx-dim);
    font-size: 9px;
    letter-spacing: 0;
    font-weight: 400;
}.lx-event-title {
    color: var(--lx-gold);
    font-size: 12px;
    letter-spacing: 1px;
    margin-bottom: 4px;
    font-weight: 700;
}
.lx-event-progress { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
.lx-progress-bar { flex: 1; height: 4px; background: var(--lx-card-bg); border-radius: 2px; overflow: hidden; }
.lx-progress-fill { height: 100%; background: var(--lx-gold); transition: width 0.4s ease; }
.lx-progress-num { color: var(--lx-gold); font-size: 10.5px; min-width: 34px; text-align: right; }
.lx-event.done { opacity: 0.62; border-left-color: #4a8a4a; }

/* 折叠：已完成 / 设置项 */
.lx-completed, .lx-fold {
    margin-top: 14px;
    border: 1px solid var(--lx-border);
    border-radius: 3px;
    overflow: hidden;
}
.lx-fold { margin: 0 0 14px; }
.lx-completed > summary, .lx-fold > summary {
    list-style: none;
    cursor: pointer;
    padding: 10px 12px;
    background: var(--lx-event-bg);
    color: var(--lx-dim);
    font-size: 11.5px;
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    user-select: none;
}
.lx-fold > summary { color: var(--lx-gold); background: var(--lx-card-bg); }
.lx-completed > summary::-webkit-details-marker, .lx-fold > summary::-webkit-details-marker { display: none; }
.lx-completed > summary::before, .lx-fold > summary::before {
    content: "▸";
    display: inline-block;
    margin-right: 6px;
    font-size: 10px;
    transition: transform 0.15s;
}
.lx-completed[open] > summary::before, .lx-fold[open] > summary::before { transform: rotate(90deg); }
.lx-completed > summary:hover { color: var(--lx-gold); }
.lx-completed-body { padding: 8px 10px 2px; border-top: 1px solid var(--lx-border); }

/* 流言 */
.lx-rumor {
    position: relative;
    padding: 9px 12px;
    margin-bottom: 8px;
    font-size: 13px;
    line-height: 1.7;
    color: var(--lx-text2);
    font-style: italic;
    border-left: 2px solid var(--lx-gold);
    background: var(--lx-card-bg);
    border-radius: 2px;
    word-break: break-word;
}
.lx-rumor::before { content: "「"; color: var(--lx-gold); margin-right: 2px; }
.lx-rumor::after { content: "」"; color: var(--lx-gold); margin-left: 2px; }

/* 书信：仿信笺卡片 */
.lx-letter { margin: 4px 0 15px; position: relative; }
.lx-letter-sheet {
    position: relative;
    padding: 14px 16px 13px;
    border: 1px solid #b99a68;
    background-color: #f1e3c6;
    background-image:
        radial-gradient(rgba(92,65,35,.055) .6px, transparent .6px),
        repeating-linear-gradient(180deg, transparent 0 25px, rgba(120,90,50,.13) 25px 26px),
        linear-gradient(180deg, #f7ecd6, #e8d6b4);
    background-size: 4px 4px, auto, auto;
    color: #3b2c1c;
    box-shadow: 0 10px 24px rgba(0,0,0,.22), inset 0 0 24px rgba(120,85,40,.10);
    transform: rotate(-.35deg);
    transform-origin: 50% 0;
    overflow: hidden;
}
.lx-letter.sent .lx-letter-sheet { transform: rotate(.35deg); background-image:
    radial-gradient(rgba(92,65,35,.05) .6px, transparent .6px),
    repeating-linear-gradient(180deg, transparent 0 25px, rgba(120,90,50,.12) 25px 26px),
    linear-gradient(180deg, #f8ead6, #ecd8bc); }
.lx-letter-sheet::before {
    content: "";
    position: absolute; left: 50%; top: 0; bottom: 0; width: 1px;
    background: linear-gradient(180deg, transparent, rgba(120,85,40,.16) 15%, rgba(120,85,40,.16) 85%, transparent);
    transform: rotate(2.5deg); transform-origin: 50% 0; opacity: .55;
}
.lx-letter-sheet::after {
    content: "";
    position: absolute; left: 0; right: 0; top: 0; height: 3px;
    background: linear-gradient(90deg, transparent, rgba(120,85,40,.22), transparent);
}
.lx-letter-head {
    position: relative; display: flex; align-items: baseline; gap: 5px;
    padding-bottom: 7px; margin-bottom: 8px; border-bottom: 1px dashed rgba(100,72,38,.35);
}
.lx-letter-direction { color: #8d5b36; font-size: 9px; letter-spacing: 2px; }
.lx-letter-name { color: #6f2e22; font-size: 13px; font-weight: 700; letter-spacing: 1px; }
.lx-letter-date { margin-left: auto; color: #8a7355; font-size: 9.5px; white-space: nowrap; }
.lx-letter-body { position: relative; z-index: 1; color: #3b2c1c; font-size: 13px; line-height: 26px; white-space: pre-wrap; word-break: break-word; text-align: justify; }
.lx-letter-sign { position: relative; z-index: 1; margin-top: 8px; padding-right: 30px; text-align: right; color: #6b4d32; font-size: 11px; letter-spacing: 1px; }
.lx-letter-seal {
    position: absolute; right: 14px; bottom: 13px; z-index: 2;
    width: 25px; height: 25px; display: grid; place-items: center;
    border: 2px solid #a43b2b; color: #a43b2b; font-size: 11px; font-weight: 700;
    transform: rotate(-8deg); opacity: .82; box-shadow: inset 0 0 0 2px rgba(164,59,43,.12);
}
.lx-letter-actions { margin-top: 5px; display: flex; gap: 7px; justify-content: flex-end; }
.lx-letter-actions .lx-mini-btn { border-color: rgba(185,154,104,.45); color: var(--lx-dim); }

/* 按钮 */
.lx-btn, .lx-mini-btn {
    background: transparent;
    border: 1px solid var(--lx-border);
    border-radius: 3px;
    color: var(--lx-gold);
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, color 0.15s, transform 0.1s;
    user-select: none;
    white-space: nowrap;
}
.lx-btn:hover, .lx-mini-btn:hover { background: var(--lx-card-bg); border-color: var(--lx-gold); }
.lx-btn:active, .lx-mini-btn:active { transform: scale(0.97); }
.lx-btn:disabled, .lx-mini-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.lx-btn.danger { color: #c86b5a; border-color: rgba(200,107,90,0.45); }
.lx-btn.danger:hover { color: #e08a78; border-color: #c86b5a; background: rgba(200,107,90,0.08); }
.lx-btn { flex: 1 1 0; min-width: 0; padding: 8px 3px; font-size: 11.5px; letter-spacing: 1px; }
.lx-mini-btn { padding: 5px 9px; font-size: 11px; }

/* 底部 */
.lx-footer {
    flex: 0 0 auto;
    padding: 9px 8px;
    padding-bottom: calc(9px + env(safe-area-inset-bottom));
    border-top: 1px solid var(--lx-border);
    display: flex;
    gap: 5px;
    background: var(--lx-event-bg);
}

/* 设置 */
.lx-settings-tabs {
    flex: 0 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-bottom: 1px solid var(--lx-border);
    background: var(--lx-event-bg);
}
.lx-settings-tab {
    position: relative;
    padding: 10px 4px;
    text-align: center;
    font-size: 11.5px;
    letter-spacing: 1.5px;
    color: var(--lx-dim);
    cursor: pointer;
    border-right: 1px solid var(--lx-border);
    transition: color 0.15s, background 0.15s;
    user-select: none;
}
.lx-settings-tab:last-child { border-right: none; }
.lx-settings-tab:hover { color: var(--lx-gold); }
.lx-settings-tab.active { color: var(--lx-gold); font-weight: 700; background: var(--lx-card-bg); }
.lx-settings-tab.active::after {
    content: "";
    position: absolute;
    left: 24%;
    right: 24%;
    bottom: -1px;
    height: 2px;
    background: var(--lx-gold);
}
.lx-settings-body {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    padding: 15px 16px;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-color: var(--lx-border) transparent;
}
.lx-settings-panel { display: none; }
.lx-settings-panel.active { display: block; }

.lx-field { margin-bottom: 15px; }
.lx-field-label {
    display: block;
    color: var(--lx-gold);
    font-size: 11.5px;
    letter-spacing: 1.5px;
    margin-bottom: 7px;
    font-weight: 700;
}
.lx-field-hint { color: var(--lx-dim); font-size: 10.5px; font-style: italic; margin-top: 5px; line-height: 1.5; }
.lx-wb-list { max-height: 260px; overflow: auto; margin-top: 7px; border: 1px solid var(--lx-border); background: var(--lx-event-bg); }
.lx-wb-item { display: block; padding: 7px 8px; border-bottom: 1px solid var(--lx-border); cursor: pointer; }
.lx-wb-item:last-child { border-bottom: 0; }
.lx-wb-item input { width: 13px; height: 13px; accent-color: var(--lx-gold); vertical-align: middle; margin-right: 5px; }
.lx-wb-title { color: var(--lx-gold); font-size: 11px; }
.lx-wb-book { margin-left: 6px; color: var(--lx-dim); font-size: 9px; }
.lx-wb-keys { display: block; margin: 3px 0 0 18px; color: var(--lx-text2); font-size: 9px; }
.lx-wb-preview { display: block; margin: 3px 0 0 18px; color: var(--lx-dim); font-size: 9.5px; line-height: 1.55; }
.lx-input, .lx-textarea, .lx-select {
    width: 100%;
    padding: 8px 10px;
    background: var(--lx-input-bg);
    border: 1px solid var(--lx-border);
    border-radius: 3px;
    color: var(--lx-text);
    font-family: inherit;
    font-size: 12.5px;
    outline: none;
    transition: border-color 0.15s;
}
.lx-input:focus, .lx-textarea:focus, .lx-select:focus { border-color: var(--lx-gold); }
.lx-textarea { min-height: 140px; height: min(40dvh, 340px); max-height: 40dvh; resize: vertical; line-height: 1.6; font-size: 12px; overflow: auto; }
.lx-select { appearance: none; -webkit-appearance: none; }
.lx-select option { background: var(--lx-bg-solid); color: var(--lx-text); }

.lx-radio-group { display: flex; gap: 7px; flex-wrap: wrap; }
.lx-radio {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: var(--lx-text2);
    font-size: 12px;
    cursor: pointer;
    padding: 6px 10px;
    border: 1px solid var(--lx-border);
    border-radius: 3px;
    transition: border-color 0.15s, background 0.15s, color 0.15s;
    user-select: none;
}
.lx-radio:hover { border-color: var(--lx-gold); }
.lx-radio input { accent-color: var(--lx-gold); cursor: pointer; margin: 0; }
.lx-radio.checked { border-color: var(--lx-gold); background: var(--lx-card-bg); color: var(--lx-gold); }
.lx-range-row { display: flex; align-items: center; gap: 10px; }
.lx-range { flex: 1; accent-color: var(--lx-gold); cursor: pointer; }
.lx-range-val { width: 48px; text-align: right; color: var(--lx-gold); font-size: 12.5px; font-weight: 700; }
.lx-inline { display: flex; gap: 6px; align-items: center; }
.lx-inline .lx-input { flex: 1; min-width: 0; }

.lx-preset-row { display: flex; gap: 6px; align-items: center; margin-bottom: 8px; flex-wrap: wrap; }
.lx-preset-row .lx-select { flex: 1 1 120px; min-width: 110px; }

.lx-theme-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; }
.lx-theme-item {
    padding: 8px 6px;
    border: 2px solid var(--lx-border);
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    font-size: 10.5px;
    transition: border-color 0.15s, box-shadow 0.15s;
    user-select: none;
}
.lx-theme-item.active { border-color: var(--lx-gold); box-shadow: 0 0 8px var(--lx-gold); }
.lx-theme-swatch { width: 100%; height: 22px; border-radius: 2px; margin-bottom: 5px; }

.lx-fold-body { padding: 10px; border-top: 1px solid var(--lx-border); }
.lx-fold-head-actions { display: inline-flex; gap: 5px; }

/* 调试日志 */
.lx-debug-log {
    max-height: 320px;
    overflow-y: auto;
    border: 1px solid var(--lx-border);
    border-radius: 3px;
    background: var(--lx-input-bg);
    padding: 7px;
    font-size: 10.5px;
    line-height: 1.55;
    font-family: "SF Mono", Consolas, "Cascadia Mono", monospace;
}
.lx-debug-item {
    padding: 7px;
    margin-bottom: 5px;
    border-left: 3px solid var(--lx-dim);
    background: var(--lx-card-bg);
    border-radius: 2px;
    word-break: break-all;
}
.lx-debug-item.ok { border-left-color: #4a8b4a; }
.lx-debug-item.warn { border-left-color: #b89040; }
.lx-debug-item.err { border-left-color: #b84b4b; }
.lx-debug-head { color: var(--lx-gold); font-weight: 700; margin-bottom: 3px; }
.lx-debug-row { color: var(--lx-text2); }
.lx-debug-row.raw {
    color: var(--lx-dim);
    font-size: 9.5px;
    max-height: 90px;
    overflow: auto;
    padding: 4px;
    margin-top: 4px;
    background: var(--lx-event-bg);
    border-radius: 2px;
    white-space: pre-wrap;
}

/* 时间线 */
.lx-timeline-item { margin-bottom: 13px; padding-left: 11px; border-left: 2px solid var(--lx-border); }
.lx-timeline-round { color: var(--lx-gold); font-size: 11.5px; font-weight: 700; letter-spacing: 2px; margin-bottom: 5px; }
.lx-timeline-row { font-size: 12px; line-height: 1.6; color: var(--lx-text2); padding: 3px 0; word-break: break-word; }
.lx-timeline-tag {
    display: inline-block;
    padding: 0 5px;
    border: 1px solid var(--lx-border);
    color: var(--lx-gold);
    font-size: 9.5px;
    line-height: 1.6;
    margin-right: 5px;
    border-radius: 2px;
    vertical-align: 1px;
}

/* 关系 */
.lx-rel-card {
    padding: 9px 11px;
    border: 1px solid var(--lx-border);
    border-left: 3px solid var(--lx-gold);
    background: var(--lx-card-bg);
    margin-bottom: 7px;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
}
.lx-rel-text { flex: 1; font-size: 12.5px; line-height: 1.6; color: var(--lx-text2); word-break: break-word; }
.lx-rel-text .lx-rel-a { color: var(--lx-gold); font-weight: 700; }
.lx-rel-graph { display: block; width: 100%; height: auto; border: 1px solid var(--lx-border); background: var(--lx-event-bg); border-radius: 3px; }
.lx-rel-line { stroke: var(--lx-border); stroke-width: 1; }
.lx-rel-node { fill: var(--lx-gold); stroke: var(--lx-bg-solid); stroke-width: 1.5; }
.lx-rel-node-text { fill: var(--lx-bg-solid); font-size: 10px; font-weight: 700; text-anchor: middle; dominant-baseline: central; pointer-events: none; }
.lx-rel-label {
    fill: var(--lx-gold);
    font-size: 9px;
    text-anchor: middle;
    paint-order: stroke;
    stroke: var(--lx-bg-solid);
    stroke-width: 3px;
    stroke-linejoin: round;
}

/* 伏笔 */
.lx-fp-summary {
    margin-bottom: 7px;
    color: var(--lx-dim);
    font-size: 10.5px;
    letter-spacing: 0.5px;
}.lx-foreshadow-item {
    padding: 9px 11px;
    border-left: 3px solid var(--lx-gold);
    background: var(--lx-card-bg);
    margin-bottom: 7px;
    border-radius: 2px;
}
.lx-foreshadow-item.recovered { opacity: 0.5; border-left-color: #4a8a4a; }
.lx-foreshadow-content { font-size: 12.5px; color: var(--lx-text2); line-height: 1.6; margin-bottom: 5px; word-break: break-word; }
.lx-foreshadow-meta { font-size: 10.5px; color: var(--lx-dim); display: flex; justify-content: space-between; align-items: center; gap: 6px; }

/* 孕事 */
.lx-preg-card {
    padding: 11px 13px;
    border: 1px solid var(--lx-border);
    border-left: 3px solid var(--lx-gold);
    background: var(--lx-card-bg);
    border-radius: 3px;
    margin-bottom: 8px;
}
.lx-preg-card.ended { opacity: 0.55; border-left-color: #4a8a4a; }
.lx-preg-name { color: var(--lx-gold); font-weight: 700; font-size: 13.5px; letter-spacing: 1px; }
.lx-preg-month { color: var(--lx-gold); font-size: 12px; margin-left: 8px; }
.lx-preg-status { color: var(--lx-text2); font-size: 12px; margin-top: 4px; }
.lx-preg-note { color: var(--lx-dim); font-size: 11px; margin-top: 3px; line-height: 1.5; }
.lx-heir-user {
    padding: 11px 12px;
    margin-bottom: 10px;
    border: 1px solid var(--lx-border);
    border-left: 3px solid var(--lx-gold);
    background: var(--lx-card-bg);
}
.lx-heir-title {
    display: inline-block;
    padding: 2px 8px;
    margin-bottom: 8px;
    border: 1px solid var(--lx-border);
    color: var(--lx-gold);
    font-size: 11px;
    letter-spacing: 2px;
}
.lx-cycle-editor { display: flex; flex-wrap: wrap; align-items: center; gap: 5px; margin: 0 0 8px; padding: 6px; border: 1px solid var(--lx-border); background: var(--lx-event-bg); }
.lx-cycle-label { color: var(--lx-gold); font-size: 10px; }
.lx-cycle-date { flex: 1; min-width: 110px; padding: 3px 5px; border: 1px solid var(--lx-border); background: var(--lx-input-bg); color: var(--lx-text); font-size: 10px; }
.lx-cycle-source { color: var(--lx-dim); font-size: 9px; }
.lx-heir-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; }
.lx-heir-stats div { padding: 6px 5px; border: 1px solid var(--lx-border); background: var(--lx-event-bg); text-align: center; }
.lx-heir-stats span { display: block; color: var(--lx-dim); font-size: 9px; }
.lx-heir-stats b { display: block; margin-top: 2px; color: var(--lx-gold); font-size: 14px; font-weight: 400; }
.lx-heir-status { margin-top: 7px; color: var(--lx-gold); font-size: 12px; letter-spacing: 1px; }
.lx-heir-line { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; margin-top: 6px; font-size: 11px; color: var(--lx-text2); }
.lx-heir-line b { margin-right: 4px; color: var(--lx-gold); font-weight: 400; }
.lx-heir-tip { margin-top: 8px; padding-top: 7px; border-top: 1px dashed var(--lx-border); color: var(--lx-dim); font-size: 10.5px; line-height: 1.6; }
.lx-heir-child {
    padding: 9px 11px;
    margin-bottom: 7px;
    border: 1px solid var(--lx-border);
    border-left: 3px solid var(--lx-gold);
    background: var(--lx-card-bg);
}
.lx-heir-child-head { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
.lx-heir-child-name { color: var(--lx-gold); font-size: 13px; letter-spacing: 1px; }
.lx-heir-child-title { padding: 0 5px; border: 1px solid var(--lx-border); color: var(--lx-text2); font-size: 9.5px; }

/* 搜索命中/无结果 */
.lx-search-empty { text-align: center; color: var(--lx-dim); font-size: 12px; padding: 28px 10px; font-style: italic; }

/* 模块关闭时隐藏页签和面板 */
.lx-module-hidden { display: none !important; }

/* 方正、双线框、标题带框的外观 */
#lx-root {
    font-family: var(--lx-font, "Noto Serif SC", "Songti SC", "STSong", "SimSun", serif);
}
#lx-panel, #lx-settings {
    border-radius: var(--lx-panel-radius, 4px);
    border: 1px solid var(--lx-border);
    background-color: var(--lx-bg-solid);
    background-image:
        var(--lx-bg-image, none),
        linear-gradient(180deg, var(--lx-card-bg), transparent 28%),
        var(--lx-bg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow:
        inset 0 0 0 1px rgba(255,255,255,0.35),
        0 0 0 4px var(--lx-card-bg),
        var(--lx-shadow);
}
#lx-panel::before, #lx-settings::before {
    content: "";
    position: absolute;
    inset: 5px;
    border: 1px solid var(--lx-border);
    border-radius: 2px;
    opacity: 0.55;
    pointer-events: none;
}

/* 华丽主题装饰：不加金线，只加暗纹、雾光、星点、竹影 */
#lx-root[data-theme="B"] #lx-panel::after,
#lx-root[data-theme="B"] #lx-settings::after {
    content: ""; position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background:
        radial-gradient(ellipse at 50% 105%, rgba(197,92,40,.24), transparent 58%),
        radial-gradient(ellipse at 8% 12%, rgba(235,190,100,.10), transparent 28%),
        radial-gradient(circle at 80% 20%, rgba(255,220,150,.08) 0 1px, transparent 1.5px),
        radial-gradient(circle at 72% 66%, rgba(255,220,150,.07) 0 1px, transparent 1.5px);
    opacity: .9;
}
#lx-root[data-theme="C"] #lx-panel::after,
#lx-root[data-theme="C"] #lx-settings::after {
    content: ""; position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background:
        radial-gradient(ellipse at 50% 108%, rgba(30,100,85,.34), transparent 62%),
        radial-gradient(ellipse at 82% 20%, rgba(170,210,185,.08), transparent 32%),
        repeating-linear-gradient(115deg, transparent 0 24px, rgba(190,220,200,.03) 24px 25px);
    opacity: .85;
}
#lx-root[data-theme="D"] #lx-panel::after,
#lx-root[data-theme="D"] #lx-settings::after {
    content: ""; position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background:
        radial-gradient(circle at 16% 22%, rgba(230,200,130,.55) 0 1px, transparent 1.6px),
        radial-gradient(circle at 76% 16%, rgba(230,200,130,.40) 0 1px, transparent 1.6px),
        radial-gradient(circle at 62% 72%, rgba(230,200,130,.35) 0 1px, transparent 1.6px),
        radial-gradient(circle at 34% 86%, rgba(230,200,130,.30) 0 1px, transparent 1.6px),
        radial-gradient(ellipse at 50% 100%, rgba(92,70,150,.18), transparent 55%);
    opacity: .9;
}
#lx-root[data-theme="E"] #lx-panel::after,
#lx-root[data-theme="E"] #lx-settings::after {
    content: ""; position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background:
        linear-gradient(100deg, transparent 18%, rgba(70,100,70,.08) 18.5%, transparent 19.5%),
        linear-gradient(80deg, transparent 62%, rgba(70,100,70,.06) 62.5%, transparent 63.5%),
        radial-gradient(ellipse at 55% 100%, rgba(140,170,140,.16), transparent 60%),
        radial-gradient(circle at 18% 24%, rgba(255,255,255,.5) 0 1px, transparent 1.5px);
    opacity: .9;
}
#lx-root[data-theme="B"] .lx-header,
#lx-root[data-theme="C"] .lx-header,
#lx-root[data-theme="D"] .lx-header,
#lx-root[data-theme="E"] .lx-header {
    box-shadow: inset 0 -8px 18px rgba(0,0,0,.08);
}
#lx-root[data-theme="B"] .lx-title,
#lx-root[data-theme="C"] .lx-title,
#lx-root[data-theme="D"] .lx-title,
#lx-root[data-theme="E"] .lx-title {
    text-shadow: 0 0 12px var(--lx-card-bg);
}
.lx-theme-seal, .lx-theme-cloud { display: none; pointer-events: none; }
#lx-root[data-theme="B"] .lx-theme-seal,
#lx-root[data-theme="C"] .lx-theme-seal,
#lx-root[data-theme="D"] .lx-theme-seal,
#lx-root[data-theme="E"] .lx-theme-seal {
    display: grid; place-items: center; position: absolute; right: 18px; bottom: 54px;
    width: 26px; height: 26px; z-index: 2; transform: rotate(-7deg);
    border: 1px solid currentColor; color: var(--lx-gold); font-size: 11px; opacity: .8;
}
#lx-root[data-theme="B"] .lx-theme-seal::before { content: "朱"; }
#lx-root[data-theme="C"] .lx-theme-seal::before { content: "山"; }
#lx-root[data-theme="D"] .lx-theme-seal::before { content: "夜"; }
#lx-root[data-theme="E"] .lx-theme-seal::before { content: "竹"; }
#lx-root[data-theme="B"] .lx-theme-cloud,
#lx-root[data-theme="C"] .lx-theme-cloud,
#lx-root[data-theme="D"] .lx-theme-cloud,
#lx-root[data-theme="E"] .lx-theme-cloud {
    display: block; position: absolute; left: 14px; top: 66px; width: 130px; height: 52px;
    z-index: 1; opacity: .28;
    background:
        radial-gradient(ellipse at 20% 70%, var(--lx-gold) 0 7%, transparent 8%),
        radial-gradient(ellipse at 45% 38%, var(--lx-gold) 0 9%, transparent 10%),
        radial-gradient(ellipse at 68% 68%, var(--lx-gold) 0 7%, transparent 8%);
}
.lx-header {
    padding: 10px 12px;
    border-bottom: 1px solid var(--lx-border);
    background: linear-gradient(180deg, var(--lx-card-bg), transparent);
}
.lx-title {
    display: inline-block;
    padding: 4px 12px;
    border: 1px solid var(--lx-border);
    border-radius: 2px;
    background: var(--lx-card-bg);
    font-size: 14px;
    letter-spacing: 4px;
    line-height: 1.4;
}
.lx-initial-btn {
    display: none;
    margin-left: auto;
    margin-right: 6px;
    padding: 4px 9px;
    border: 1px solid var(--lx-border);
    border-radius: var(--lx-btn-radius, 2px);
    background: var(--lx-btn-bg, transparent);
    color: var(--lx-accent, var(--lx-gold));
    font-family: inherit;
    font-size: 10px;
    letter-spacing: 1px;
    cursor: pointer;
}
.lx-initial-btn.show { display: inline-flex; align-items: center; }
.lx-batch-btn {
    margin-left: auto;
    padding: 4px 8px;
    border: 1px solid var(--lx-border);
    background: var(--lx-btn-bg, transparent);
    color: var(--lx-dim);
    font: inherit;
    font-size: 10px;
    cursor: pointer;
}
.lx-batch-btn.on { border-color: var(--lx-gold); color: var(--lx-gold); }
.lx-batch-bar {
    display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
    margin: 0 0 8px; padding: 6px 8px; border: 1px solid var(--lx-gold);
    background: var(--lx-event-bg); color: var(--lx-gold); font-size: 10px;
}
.lx-batch-check { width: 14px; height: 14px; accent-color: var(--lx-gold); margin-right: 5px; vertical-align: middle; }
.lx-follow-btn { margin-left: 6px; padding: 0 3px; border: 1px solid var(--lx-border); background: transparent; color: var(--lx-dim); font: inherit; font-size: 8px; line-height: 1.4; cursor: pointer; vertical-align: middle; }
.lx-follow-btn.on { border-color: var(--lx-gold); color: var(--lx-gold); }
.lx-npc-card.followed { border-left-color: var(--lx-gold); box-shadow: inset 3px 0 0 var(--lx-gold); }
.lx-icon-btn {
    width: 30px;
    height: 30px;
    border-radius: 2px;
    border: 1px solid var(--lx-border);
    background: var(--lx-card-bg);
    font-size: 20px;
}
.lx-tabs {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0;
    padding: 0;
    border-bottom: 1px solid var(--lx-border);
    background: var(--lx-event-bg);
}
.lx-tab {
    border: none !important;
    border-right: 1px solid var(--lx-border) !important;
    border-bottom: 1px solid var(--lx-border) !important;
    border-radius: 0;
    padding: 7px 1px;
    margin: 0;
    font-size: 10.5px;
    letter-spacing: 0;
    background: transparent;
}
.lx-tab:nth-child(5n) { border-right: none !important; }
.lx-tab:nth-child(n+11) { border-bottom: none !important; }
.lx-tab.active {
    background: var(--lx-card-bg);
    color: var(--lx-gold);
    font-weight: 700;
    box-shadow: inset 0 0 0 1px var(--lx-gold), inset 0 -2px 0 var(--lx-gold);
}
.lx-tab.active::after { display: none; }
.lx-tab-num { background: transparent; color: inherit; }
.lx-search {
    padding: 7px 10px;
    border-bottom: 1px solid var(--lx-border);
    background: var(--lx-card-bg);
}
.lx-search .lx-input {
    border-radius: 2px;
    padding: 7px 9px;
}
.lx-content { padding: 10px 12px 14px; }
.lx-section-head {
    position: sticky;
    top: 0;
    z-index: 2;
    display: block;
    padding: 5px 10px;
    margin-bottom: 9px;
    border: 1px solid var(--lx-border);
    border-radius: 2px;
    background: var(--lx-bg-solid);
    color: var(--lx-gold);
    font-size: 11.5px;
    letter-spacing: 3px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.25);
}
.lx-npc-card {
    position: relative;
    border: 1px solid var(--lx-border);
    border-left: 3px solid var(--lx-gold);
    border-radius: 2px;
    padding: 10px 12px;
    background: var(--lx-card-bg);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.25);
}
.lx-npc-group-title {
    margin: 10px 0 6px;
    padding: 4px 8px;
    border: 1px solid var(--lx-border);
    border-radius: 2px;
    background: var(--lx-event-bg);
    color: var(--lx-gold);
    font-size: 11px;
    letter-spacing: 2px;
}
.lx-npc-group-title:first-child { margin-top: 0; }
.lx-npc-subtitle {
    margin: 8px 0 5px;
    color: var(--lx-dim);
    font-size: 10.5px;
    letter-spacing: 1px;
}
.lx-npc-subtitle.current { color: var(--lx-gold); }
.lx-npc-card.current { border-color: var(--lx-gold); }
.lx-npc-now {
    margin-left: 6px;
    padding: 0 4px;
    border: 1px solid var(--lx-gold);
    color: var(--lx-gold);
    font-size: 9px;
    letter-spacing: 0;
    vertical-align: middle;
}.lx-npc-name {
    display: inline-block;
    padding: 1px 8px;
    margin-bottom: 7px;
    border: 1px solid var(--lx-border);
    border-radius: 2px;
    background: var(--lx-event-bg);
    font-size: 13px;
    letter-spacing: 2px;
}
.lx-npc-meta { gap: 4px 10px; font-size: 11.5px; }
.lx-npc-meta span {
    background: transparent;
    border-radius: 0;
    padding: 0;
    font-size: inherit;
}
.lx-npc-meta span::before { content: "· "; color: var(--lx-border); }
.lx-event {
    position: relative;
    border: 1px solid var(--lx-border);
    border-left: 3px solid var(--lx-gold);
    border-radius: 2px;
    background: var(--lx-card-bg);
    padding: 9px 11px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.22);
}
.lx-event-domain {
    margin-left: 5px;
    padding: 0 4px;
    border: 1px solid var(--lx-border);
    color: var(--lx-dim);
    font-size: 9px;
    letter-spacing: 0;
    font-weight: 400;
}.lx-event-title {
    display: inline-block;
    padding: 0 6px;
    border: 1px solid var(--lx-border);
    border-radius: 2px;
    background: var(--lx-event-bg);
    font-size: 11px;
    margin-bottom: 5px;
}
.lx-progress-bar { height: 5px; border-radius: 0; background: var(--lx-event-bg); border: 1px solid var(--lx-border); }
.lx-progress-fill { border-radius: 0; }
.lx-completed, .lx-fold { border-radius: 2px; }
.lx-rumor { border-radius: 2px; background: var(--lx-card-bg); border-left: 3px solid var(--lx-gold); }
.lx-rumor::before, .lx-rumor::after { content: none; }
.lx-letter { border-radius: 3px; background: var(--lx-card-bg); }
.lx-rumor-content { line-height: 1.8; }
.lx-rumor-meta { display: flex; flex-wrap: wrap; gap: 4px 10px; margin-top: 5px; color: var(--lx-dim); font-size: 10.5px; }
.lx-rumor-chain { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; margin-top: 6px; padding-top: 6px; border-top: 1px dashed var(--lx-border); }
.lx-rumor-node { padding: 1px 6px; border: 1px solid var(--lx-border); background: var(--lx-event-bg); font-size: 10.5px; }
.lx-rumor-node small { display: block; color: var(--lx-dim); font-size: 9px; }
.lx-rumor-arrow { color: var(--lx-gold); }
.lx-memorial, .lx-secret, .lx-struggle {
    position: relative;
    border: 1px solid var(--lx-border);
    border-left: 3px solid var(--lx-gold);
    border-radius: 2px;
    background: var(--lx-card-bg);
    padding: 10px 12px;
    margin-bottom: 9px;
}
.lx-memorial.done { opacity: 0.78; }
.lx-memorial-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
.lx-memorial-title { font-weight: 700; color: var(--lx-gold); }
.lx-memorial-status { flex: none; padding: 1px 6px; border: 1px solid var(--lx-gold); color: var(--lx-gold); font-size: 10px; }
.lx-memorial-meta { display: flex; flex-wrap: wrap; gap: 4px 10px; margin: 5px 0; color: var(--lx-dim); font-size: 10.5px; }
.lx-memorial-body { line-height: 1.75; }
.lx-memorial-grid { display: grid; gap: 4px; margin-top: 6px; font-size: 11.5px; }
.lx-memorial-grid b, .lx-secret-line b, .lx-struggle-line b { display: inline-block; min-width: 32px; margin-right: 5px; color: var(--lx-gold); font-weight: 400; }
.lx-memorial-result, .lx-secret-evidence, .lx-struggle-result { margin-top: 5px; color: var(--lx-text2); font-size: 11px; }
.lx-memorial-actions { display: flex; gap: 5px; margin-top: 7px; }
.lx-secret-content { line-height: 1.8; }
.lx-secret-line { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; margin-top: 6px; font-size: 11.5px; }
.lx-secret-chip { padding: 1px 6px; border: 1px solid var(--lx-border); background: var(--lx-event-bg); font-size: 10.5px; }
.lx-secret-chip.known { border-color: var(--lx-gold); color: var(--lx-gold); }
.lx-secret-none { color: var(--lx-dim); }
.lx-court-card, .lx-health-card { padding: 8px; margin-bottom: 7px; border: 1px solid var(--lx-border); border-left: 2px solid var(--lx-gold); background: var(--lx-event-bg); }
.lx-court-card.clan { border-left-color: var(--lx-accent, var(--lx-gold)); }
.lx-court-head, .lx-health-head { display: flex; justify-content: space-between; align-items: center; gap: 6px; margin-bottom: 4px; }
.lx-court-name, .lx-health-name { color: var(--lx-gold); font-size: 13px; }
.lx-court-meta, .lx-health-date { color: var(--lx-dim); font-size: 10px; }
.lx-court-line { margin-top: 4px; color: var(--lx-text2); font-size: 11px; line-height: 1.6; }
.lx-court-line b { color: var(--lx-gold); font-weight: 400; margin-right: 4px; }
.lx-court-note { margin-top: 4px; color: var(--lx-dim); font-size: 10px; line-height: 1.6; }
.lx-health-status { display: inline-block; margin-top: 5px; padding: 1px 6px; border: 1px solid var(--lx-border); color: var(--lx-gold); font-size: 9px; }
.lx-struggle-filter { display: flex; gap: 5px; margin-bottom: 8px; }
.lx-struggle-filter .lx-mini-btn.active { border-color: var(--lx-gold); color: var(--lx-gold); }
.lx-struggle-head { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.lx-struggle-type { padding: 1px 6px; border: 1px solid var(--lx-gold); color: var(--lx-gold); font-size: 10px; }
.lx-struggle-name { font-weight: 700; }
.lx-struggle-level { margin-left: auto; color: var(--lx-dim); font-size: 10px; }
.lx-struggle.level-高 { border-left-color: #c0392b; }
.lx-struggle.level-中 { border-left-color: #c98b2e; }
.lx-struggle-line { display: flex; flex-wrap: wrap; align-items: center; gap: 3px; margin-top: 5px; font-size: 11.5px; }
.lx-struggle .lx-arrow { color: var(--lx-gold); }
.lx-calendar-stack { display: flex; flex-direction: column; gap: 9px; }
.lx-time-card, .lx-festival-card { padding: 9px; border: 1px solid var(--lx-border); background: var(--lx-card-bg); }
.lx-time-card-title { margin-bottom: 6px; color: var(--lx-gold); font-size: 10px; letter-spacing: 3px; }
.lx-festival-card { background: linear-gradient(180deg, var(--lx-card-bg), transparent); }
.lx-banquet-card { padding: 9px; border: 1px solid var(--lx-border); background: var(--lx-card-bg); }
.lx-banquet-item { margin-top: 6px; padding: 7px 8px; border: 1px solid var(--lx-border); background: var(--lx-event-bg); }
.lx-banquet-name { color: var(--lx-gold); font-size: 12px; letter-spacing: 1px; }
.lx-banquet-line { margin-top: 3px; color: var(--lx-text2); font-size: 10px; line-height: 1.6; }
.lx-banquet-line b { color: var(--lx-gold); font-weight: 400; margin-right: 4px; }
.lx-time-big { padding: 10px 12px; border: 1px solid var(--lx-border); background: var(--lx-event-bg); color: var(--lx-gold); font-size: 14px; letter-spacing: 2px; text-align: center; }
.lx-time-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; margin-top: 8px; }
.lx-time-cell { padding: 8px 10px; border: 1px solid var(--lx-border); background: var(--lx-card-bg); }
.lx-time-cell span { display: block; color: var(--lx-dim); font-size: 10px; }
.lx-time-cell b { font-weight: 400; font-size: 12px; }
.lx-time-hint { margin-top: 10px; color: var(--lx-dim); font-size: 11px; text-align: center; }
.lx-footer {
    padding: 9px 8px calc(9px + env(safe-area-inset-bottom));
    gap: 5px;
    border-top: 1px solid var(--lx-border);
    background: var(--lx-card-bg);
}
.lx-btn {
    border-radius: var(--lx-btn-radius, 2px);
    padding: 8px 3px;
    font-size: 11.5px;
    font-weight: 600;
    background: var(--lx-btn-bg, linear-gradient(180deg, var(--lx-card-bg), transparent));
    color: var(--lx-btn-color, var(--lx-text));
    border-color: var(--lx-btn-border, var(--lx-border));
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.25);
}
.lx-footer .lx-btn:first-child {
    background: var(--lx-btn-primary-bg, var(--lx-gold));
    color: var(--lx-btn-primary-color, var(--lx-bg-solid));
    border-color: var(--lx-btn-border, var(--lx-gold));
    border-radius: var(--lx-btn-radius, 2px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.25);
}
.lx-mini-btn { border-radius: var(--lx-btn-radius, 2px); background: var(--lx-btn-bg, transparent); color: var(--lx-btn-color, var(--lx-text)); border-color: var(--lx-btn-border, var(--lx-border)); }
.lx-field {
    border: 1px solid var(--lx-border);
    border-radius: 2px;
    background: var(--lx-card-bg);
    padding: 9px 11px;
}
.lx-field-label {
    display: inline-block;
    padding: 1px 7px;
    border: 1px solid var(--lx-border);
    border-radius: 2px;
    background: var(--lx-event-bg);
    margin-bottom: 7px;
    font-size: 10.5px;
    letter-spacing: 1px;
}
.lx-input, .lx-textarea, .lx-select { border-radius: 2px; }
.lx-settings-tabs {
    padding: 0;
    gap: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background: var(--lx-event-bg);
    border-bottom: 1px solid var(--lx-border);
}
.lx-settings-tab {
    border: none;
    border-right: 1px solid var(--lx-border);
    border-radius: 0;
    padding: 9px 4px;
    font-size: 11px;
}
.lx-settings-tab:last-child { border-right: none; }
.lx-settings-tab.active {
    background: var(--lx-card-bg);
    color: var(--lx-gold);
    box-shadow: inset 0 -2px 0 var(--lx-gold);
}
.lx-settings-tab.active::after { display: none; }
.lx-settings-body { padding: 10px 12px 14px; }
.lx-theme-item { border-width: 1px; border-radius: 2px; }
.lx-theme-item.active { box-shadow: 0 0 0 1px var(--lx-gold); border-color: var(--lx-gold); }
.lx-rel-card, .lx-foreshadow-item, .lx-preg-card { border-radius: 2px; background: var(--lx-card-bg); }
/* 手机 / 窄屏：仍然是有边距的悬浮窗，不铺满全屏 */
@media (max-width: 640px), (max-height: 520px) {
    #lx-ball { width: 50px; height: 50px; }
    #lx-mask { backdrop-filter: none; -webkit-backdrop-filter: none; }
    /* 不用 dvh，直接用 JS 量出来的 visualViewport 尺寸，安卓 WebView 更稳 */
    #lx-panel, #lx-settings {
        left: calc(var(--lx-vv-left, 0px) + 14px);
        top: calc(var(--lx-vv-top, 0px) + 28px);
        width: calc(100% - 28px);
        max-width: 520px;
        height: calc(100% - 56px);
        max-height: 760px;
        transform: none;
        border-radius: var(--lx-panel-radius, 4px);
        border: 1px solid var(--lx-border);
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
    }
    #lx-panel.show, #lx-settings.show { transform: none; }
    .lx-header { padding-top: 10px; min-height: 48px; }
    .lx-tabs {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        overflow: visible;
    }
    .lx-tab {
        padding: 7px 1px;
        font-size: 11px;
        border-right: 1px solid var(--lx-border);
        border-bottom: 1px solid var(--lx-border);
    }
    .lx-tab:nth-child(5n) { border-right: none; }
    .lx-tab:nth-child(n+11) { border-bottom: none; }
    .lx-tab:last-child { border-right: none; }
    .lx-tab.active::after { left: 18%; right: 18%; bottom: -1px; }
    .lx-content { padding: 10px; }
    .lx-footer { gap: 4px; padding-left: 5px; padding-right: 5px; }
    .lx-btn { font-size: 10.5px; padding: 9px 2px; }
    .lx-input, .lx-textarea, .lx-select { font-size: 16px; }
    .lx-textarea { font-size: 13px; }
    .lx-settings-body { padding: 12px; }
    .lx-settings-tabs { position: sticky; top: 0; z-index: 1; }
    .lx-theme-grid { grid-template-columns: repeat(3, 1fr); }
}
/* 安卓 iframe 兜底：不依赖媒体查询，按 visualViewport 宽度加 .lx-compact */
#lx-root.lx-compact #lx-panel,
#lx-root.lx-compact #lx-settings {
    left: calc(var(--lx-vv-left, 0px) + 14px);
    top: calc(var(--lx-vv-top, 0px) + 28px);
    width: calc(100% - 28px);
    max-width: 520px;
    height: calc(100% - 56px);
    max-height: 760px;
    transform: none;
    border-radius: var(--lx-panel-radius, 4px);
    border: 1px solid var(--lx-border);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
}
#lx-root.lx-compact #lx-panel.show,
#lx-root.lx-compact #lx-settings.show { transform: none; }
#lx-root.lx-compact .lx-header { padding-top: 10px; min-height: 48px; }
#lx-root.lx-compact .lx-tabs {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 4px;
    padding: 8px 10px;
}
#lx-root.lx-compact .lx-tab { padding: 7px 1px; font-size: 10.5px; }
#lx-root.lx-compact .lx-content { padding: 10px 12px 14px; }
#lx-root.lx-compact .lx-search { padding: 0 10px 8px; }
#lx-root.lx-compact .lx-input,
#lx-root.lx-compact .lx-select { font-size: 16px; }
#lx-root.lx-compact .lx-textarea { font-size: 13px; }
#lx-root.lx-compact .lx-footer { padding: 10px 10px calc(10px + env(safe-area-inset-bottom)); }
#lx-root.lx-compact .lx-btn { font-size: 10.5px; padding: 9px 2px; }
#lx-root.lx-compact .lx-settings-body { padding: 12px; }
#lx-root.lx-compact .lx-settings-tabs { position: sticky; top: 0; z-index: 1; }
@media (prefers-reduced-motion: reduce) {
    #lx-root *, #lx-root *::before, #lx-root *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
    }
}
`;

const SHELL_HTML = `
<div id="lx-root">
    <div id="lx-ball" role="button" tabindex="0" aria-label="打开群像志">
        <img class="lx-ball-image" id="lx-ball-image" alt="">
        <span class="lx-ball-halo"></span>
        <span class="lx-ball-ring"></span>
        <span class="lx-ball-core"></span>
        <span class="lx-ball-gem"></span>
        <span class="lx-ball-tassel" aria-hidden="true"></span>
        <span class="lx-ball-spark" aria-hidden="true"></span>
        <span class="lx-ball-dot" aria-hidden="true"></span>
    </div>
    <span id="lx-ball-badge" class="lx-ball-badge" aria-hidden="true"></span>
    <div id="lx-mask" aria-hidden="true"></div>
    <div id="lx-panel" role="dialog" aria-modal="true" aria-label="群像志">
        <div class="lx-header">
            <span class="lx-title">群 像 志</span>
            <button type="button" class="lx-batch-btn" data-action="batch-mode" aria-label="批量选择">批量</button>
            <button type="button" class="lx-initial-btn" data-action="initial-fill" aria-label="补全开局">补全</button>
            <button type="button" class="lx-icon-btn" data-action="close" aria-label="关闭">×</button>
        </div>
        <span class="lx-theme-seal" aria-hidden="true">印</span>
        <span class="lx-theme-cloud" aria-hidden="true"></span>
        <div class="lx-tabs" role="tablist">
            <div class="lx-tab active" role="tab" aria-selected="true" data-tab="NPC状态">NPC状态<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="NPC事件">NPC事件<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="国家事件">国家事件<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="邻国事件">邻国事件<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="奏折">奏折<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="秘辛">秘辛<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="流言">流言<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="斗争">斗争<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="朝堂门阀">朝堂门阀<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="医疗健康">医疗健康<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="书信">书信<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="时令">时令<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="时间线">时间线<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="关系图">关系图<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="伏笔">伏笔<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="孕事">孕事<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="子嗣">子嗣<span class="lx-tab-num"></span></div>

        </div>
        <div class="lx-search">
            <input id="lx-search-input" class="lx-input" type="search" placeholder="搜索人物 / 事件 / 秘辛 / 奏折…" autocomplete="off">
            <button type="button" class="lx-mini-btn" data-action="search-clear">清除</button>
        </div>
        <div class="lx-content">
            <div class="lx-panel-tab active" role="tabpanel" data-panel="NPC状态"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="NPC事件"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="国家事件"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="邻国事件"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="奏折"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="秘辛"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="流言"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="斗争"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="朝堂门阀"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="医疗健康"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="书信"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="时令"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="时间线"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="关系图"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="伏笔"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="孕事"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="子嗣"></div>

        </div>
        <div class="lx-footer">
            <button type="button" class="lx-btn" data-action="gen">生成</button>
            <button type="button" class="lx-btn" data-action="reroll">重roll</button>
            <button type="button" class="lx-btn" data-action="refresh">刷新</button>
            <button type="button" class="lx-btn" data-action="settings">设置</button>
        </div>
    </div>
    <div id="lx-settings" role="dialog" aria-modal="true" aria-label="群像设置"></div>
</div>
`;

/* ------------------------------------------------------------------ */
/* 主题与悬浮球定位                                                   */
/* ------------------------------------------------------------------ */

function readStTheme() {
    const doc = state.doc || getDoc();
    const win = state.win || getWin();
    let bodyStyle = null;
    let rootStyle = null;
    try { bodyStyle = win.getComputedStyle(doc.body); } catch (e) { /* ignore */ }
    try { rootStyle = win.getComputedStyle(doc.documentElement); } catch (e) { /* ignore */ }
    const read = name => {
        try {
            return ((bodyStyle && bodyStyle.getPropertyValue(name)) || (rootStyle && rootStyle.getPropertyValue(name)) || '').trim();
        } catch (e) { return ''; }
    };
    const text = read('--SmartThemeBodyColor') || '#e8e8e8';
    const accent = read('--SmartThemeEmColor') || read('--SmartThemeQuoteColor') || '#c9a86a';
    const border = read('--SmartThemeBorderColor') || 'rgba(255,255,255,0.18)';
    const tint = read('--SmartThemeBlurTintColor') || 'rgba(20,20,20,0.78)';
    let bodyBg = '';
    let font = '';
    try { bodyBg = bodyStyle && bodyStyle.backgroundColor && bodyStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' ? bodyStyle.backgroundColor : ''; } catch (e) { /* ignore */ }
    try { font = (bodyStyle && bodyStyle.fontFamily) || ''; } catch (e) { /* ignore */ }

    // 背景图优先从聊天区/消息区找，很多酒馆主题把图放在 #chat 或 .mes 上，而不是 body。
    let bgImage = 'none';
    const candidates = [doc.body, doc.querySelector('#bg1'), doc.querySelector('#bg2'), doc.querySelector('#background'), doc.querySelector('#chat'), doc.querySelector('#sheld'), doc.querySelector('.mes'), doc.querySelector('#top-bar')];
    for (const el of candidates) {
        if (!el) continue;
        try {
            const style = win.getComputedStyle(el);
            const image = style && style.backgroundImage;
            if (image && image !== 'none' && image !== 'initial') { bgImage = image; break; }
        } catch (e) { /* ignore */ }
    }

    // 按钮跟酒馆的按钮样式：底色/渐变、文字色、边框、圆角。
    let btnBg = 'rgba(255,255,255,0.08)';
    let btnColor = text;
    let btnBorder = border;
    let btnRadius = '4px';
    try {
        const btn = doc.querySelector('#send_but, .menu_button, button');
        if (btn) {
            const bs = win.getComputedStyle(btn);
            const bg = bs.backgroundColor && bs.backgroundColor !== 'rgba(0, 0, 0, 0)' ? bs.backgroundColor : '';
            const bgImg = bs.backgroundImage && bs.backgroundImage !== 'none' ? bs.backgroundImage : '';
            btnBg = bgImg || bg || btnBg;
            btnColor = bs.color || btnColor;
            btnBorder = bs.borderColor || btnBorder;
            btnRadius = bs.borderRadius || btnRadius;
        }
    } catch (e) { /* ignore */ }

    let cardBg = 'rgba(255,255,255,0.05)';
    let inputBg = 'rgba(0,0,0,0.3)';
    let panelRadius = '4px';
    try {
        const mes = doc.querySelector('.mes');
        if (mes) {
            const ms = win.getComputedStyle(mes);
            if (ms.backgroundColor && ms.backgroundColor !== 'rgba(0, 0, 0, 0)') cardBg = ms.backgroundColor;
            if (ms.borderRadius && ms.borderRadius !== '0px') panelRadius = ms.borderRadius;
        }
        const input = doc.querySelector('#send_textarea, textarea');
        if (input) {
            const is = win.getComputedStyle(input);
            if (is.backgroundColor && is.backgroundColor !== 'rgba(0, 0, 0, 0)') inputBg = is.backgroundColor;
        }
    } catch (e) { /* ignore */ }

    // 酒馆的 tint 可能是半透明甚至全透明；叠一层底色 + 背景图，避免面板透出聊天文字。
    const base = bodyBg || '#141414';
    const tintLayer = tint.includes('gradient') ? tint : `linear-gradient(180deg, ${tint}, ${tint})`;
    const backgroundImage = bgImage !== 'none' ? `${tintLayer}, ${bgImage}` : 'none';
    return {
        name: '跟随酒馆',
        bg: `${tintLayer}, ${base}`,
        solid: base,
        border,
        gold: accent,
        text,
        text2: text,
        dim: border,
        input: inputBg,
        card: cardBg,
        event: 'rgba(0,0,0,0.16)',
        shadow: `0 0 0 4px rgba(0,0,0,0.35),0 0 0 5px ${border},0 20px 60px rgba(0,0,0,0.55)`,
        image: backgroundImage,
        font: font || '',
        btnBg,
        btnColor,
        btnBorder,
        btnRadius,
        panelRadius,
        primaryBg: accent,
        primaryColor: base
    };
}

function applyTheme() {
    if (!state.root) return;
    const s = getSettings();
    const themeKey = s.theme;
    const theme = themeKey === 'ST' ? readStTheme() : (THEMES[themeKey] || THEMES.A);
    let bgImage = theme.image || 'none';
    if (s.panelImage) {
        const light = themeKey === 'A' || themeKey === 'E';
        const shade = light
            ? 'linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,.30))'
            : 'linear-gradient(180deg, rgba(0,0,0,.24), rgba(0,0,0,.34))';
        bgImage = `${shade}, url("${s.panelImage}")`;
    }
    const map = {
        '--lx-bg': theme.bg,
        '--lx-bg-solid': theme.solid,
        '--lx-border': theme.border,
        '--lx-gold': theme.gold,
        '--lx-text': theme.text,
        '--lx-text2': theme.text2,
        '--lx-dim': theme.dim,
        '--lx-input-bg': theme.input,
        '--lx-card-bg': theme.card,
        '--lx-event-bg': theme.event,
        '--lx-shadow': theme.shadow,
        '--lx-bg-image': bgImage,
        '--lx-panel-radius': theme.panelRadius || '4px',
        '--lx-btn-bg': theme.btnBg || 'rgba(255,255,255,.08)',
        '--lx-btn-color': theme.btnColor || theme.text,
        '--lx-btn-border': theme.btnBorder || theme.border,
        '--lx-btn-radius': theme.btnRadius || '2px',
        '--lx-btn-primary-bg': theme.primaryBg || theme.gold,
        '--lx-btn-primary-color': theme.primaryColor || theme.solid,
        '--lx-font': theme.font || '"Noto Serif SC", "Songti SC", "STSong", "SimSun", serif'
    };
    Object.entries(map).forEach(([key, value]) => state.root.style.setProperty(key, value));
    try { state.root.setAttribute('data-theme', themeKey || 'A'); } catch (e) { /* ignore */ }
    applyBallAppearance();
}

function applyBallAppearance() {
    const s = getSettings();
    if (state.root) state.root.style.setProperty('--lx-ball-size', getBallSize() + 'px');
    const ball = state.refs.ball;
    if (!ball) return;
    const img = ball.querySelector('#lx-ball-image');
    const hasImage = !!s.ballImage;
    ball.classList.remove('style-compass', 'style-lantern', 'style-seal', 'style-mirror', 'style-bamboo');
    ball.classList.add('style-' + (s.ballStyle || 'compass'));
    ball.classList.toggle('has-custom-image', hasImage);
    if (img) {
        if (hasImage) {
            img.src = s.ballImage;
            img.style.display = 'block';
        } else {
            img.removeAttribute('src');
            img.style.display = 'none';
        }
    }
    positionBall();
}

function viewportSize() {
    const win = state.win || getWin();
    const vv = win.visualViewport;
    const width = vv && vv.width ? vv.width : (win.innerWidth || 360);
    const height = vv && vv.height ? vv.height : (win.innerHeight || 640);
    return {
        width: Math.max(280, width),
        height: Math.max(280, height),
        offsetLeft: vv && vv.offsetLeft ? vv.offsetLeft : 0,
        offsetTop: vv && vv.offsetTop ? vv.offsetTop : 0
    };
}

function syncViewportVars() {
    if (!state.root) return;
    const vp = viewportSize();
    const win = state.win || getWin();
    let layoutWidth = vp.width;
    let layoutHeight = vp.height;
    let screenWidth = vp.width;
    let innerWidth = vp.width;
    let innerHeight = vp.height;
    try { layoutWidth = win.document.documentElement.clientWidth || vp.width; } catch (e) { /* ignore */ }
    try { layoutHeight = win.document.documentElement.clientHeight || vp.height; } catch (e) { /* ignore */ }
    try { screenWidth = win.screen && win.screen.width ? win.screen.width : vp.width; } catch (e) { /* ignore */ }
    try { innerWidth = win.innerWidth || vp.width; } catch (e) { /* ignore */ }
    try { innerHeight = win.innerHeight || vp.height; } catch (e) { /* ignore */ }

    // 酒馆助手的脚本 iframe 没有 viewport meta，安卓上 CSS 媒体查询可能仍按 980px 桌面宽度算。
    // 取 visualViewport / inner / 布局视口 / 屏幕里最小的尺寸，防止面板比屏幕还大被裁掉。
    const compactWidth = Math.min(vp.width, layoutWidth, screenWidth, innerWidth);
    const compactHeight = Math.min(vp.height, layoutHeight, innerHeight);
    state.root.style.setProperty('--lx-vw', compactWidth + 'px');
    state.root.style.setProperty('--lx-vh', compactHeight + 'px');
    state.root.style.setProperty('--lx-vv-top', vp.offsetTop + 'px');
    state.root.style.setProperty('--lx-vv-left', vp.offsetLeft + 'px');
    // 宿主也用真实像素尺寸，避免安卓把 100% 解析成布局视口（980px）或 0。
    if (state.host) {
        state.host.style.width = compactWidth + 'px';
        state.host.style.height = compactHeight + 'px';
    }
    let coarse = false;
    try { coarse = !!(win.matchMedia && win.matchMedia('(pointer: coarse)').matches); } catch (e) { /* ignore */ }
    state.root.classList.toggle('lx-compact', compactWidth <= 640 || compactHeight <= 520 || (coarse && compactWidth <= 1024));
}

function positionBall() {
    const ball = state.refs.ball;
    if (!ball) return;
    const vp = viewportSize();
    const pos = getSettings().ballPos;
    const minLeft = vp.offsetLeft + BALL_MARGIN;
    const minTop = vp.offsetTop + BALL_MARGIN;
    const size = getBallSize();
    const maxLeft = Math.max(minLeft, vp.offsetLeft + vp.width - size - BALL_MARGIN);
    const maxTop = Math.max(minTop, vp.offsetTop + vp.height - size - BALL_MARGIN);
    let left;
    let top;
    if (pos.x === null) {
        left = maxLeft;
        top = minTop + pos.y * Math.max(0, maxTop - minTop);
    } else {
        left = minLeft + pos.x * Math.max(0, maxLeft - minLeft);
        top = minTop + pos.y * Math.max(0, maxTop - minTop);
    }
    left = clamp(left, minLeft, maxLeft);
    top = clamp(top, minTop, maxTop);
    ball.style.left = Math.round(left) + 'px';
    ball.style.top = Math.round(top) + 'px';
    ball.style.right = 'auto';
    const badge = state.refs.badge;
    if (badge) {
        badge.style.left = Math.round(left + size - 7) + 'px';
        badge.style.top = Math.round(top - 2) + 'px';
    }
    state.ball.currentLeft = left;
    state.ball.currentTop = top;
}

function snapBallToEdge() {
    const ball = state.refs.ball;
    if (!ball) return;
    const vp = viewportSize();
    const size = getBallSize();
    const left = parseFloat(ball.style.left) || 0;
    const top = parseFloat(ball.style.top) || 0;
    const minLeft = vp.offsetLeft + BALL_MARGIN;
    const maxLeft = Math.max(minLeft, vp.offsetLeft + vp.width - size - BALL_MARGIN);
    // 松手后始终吸附到最近的一侧屏幕边缘，而不是只在“接近边缘”时吸附。
    const target = (left + size / 2) <= (vp.offsetLeft + vp.width / 2) ? minLeft : maxLeft;
    ball.classList.add('snapping');
    setBallPosition(target, top);
    setTimeout(() => ball.classList.remove('snapping'), 220);
}

function saveBallPosition() {
    const ball = state.refs.ball;
    if (!ball) return;
    const vp = viewportSize();
    const size = getBallSize();
    const left = parseFloat(ball.style.left) || 0;
    const top = parseFloat(ball.style.top) || 0;
    const minLeft = vp.offsetLeft + BALL_MARGIN;
    const minTop = vp.offsetTop + BALL_MARGIN;
    const maxLeft = Math.max(minLeft, vp.offsetLeft + vp.width - size - BALL_MARGIN);
    const maxTop = Math.max(minTop, vp.offsetTop + vp.height - size - BALL_MARGIN);
    const x = maxLeft > minLeft ? clamp((left - minLeft) / (maxLeft - minLeft), 0, 1) : null;
    const y = maxTop > minTop ? clamp((top - minTop) / (maxTop - minTop), 0, 1) : 0.28;
    saveSettings({ ballPos: { x, y } });
}

function markNewData() {
    if (state.ui.panelOpen) return;
    if (state.refs.ball) state.refs.ball.classList.add('has-new');
    if (state.refs.badge) state.refs.badge.classList.add('show');
}

function clearNewData() {
    if (state.refs.ball) state.refs.ball.classList.remove('has-new');
    if (state.refs.badge) state.refs.badge.classList.remove('show');
}

/* ------------------------------------------------------------------ */
/* 渲染                                                               */
/* ------------------------------------------------------------------ */

function panelFor(name) {
    return state.refs.panels ? state.refs.panels[name] : null;
}

function setPanel(name, html) {
    const panel = panelFor(name);
    if (!panel) return;
    panel.innerHTML = `<div class="lx-section-head">${escapeHtml(name)}</div>` + html;
}

function textMatch(...parts) {
    const query = String(state.searchQuery || '').trim().toLowerCase();
    if (!query) return true;
    return parts.filter(Boolean).join(' ').toLowerCase().includes(query);
}

function emptyText(defaultText) {
    const query = String(state.searchQuery || '').trim();
    if (!query) return `<div class="lx-empty">${defaultText}</div>`;
    return `<div class="lx-search-empty">没有匹配「${escapeHtml(query)}」</div>`;
}

async function deleteBatchSelection() {
    const data = normalizeData(getGroupData() || {});
    state.ui.batchKeys.forEach(key => {
        const parts = String(key).split('|');
        if (parts[0] === 'npc' && parts[1]) delete data.NPC状态[parts[1]];
        if (parts[0] === 'event' && parts[1] && parts[2]) {
            data[parts[1]] = (data[parts[1]] || []).filter(item => item.事件名 !== parts[2]);
        }
    });
    const tid = getLatestAssistantId();
    if (tid >= 0) await attachGroupData(tid, data);
    state.ui.batchKeys.clear();
    state.ui.batchOn = false;
    if (state.refs.batch) state.refs.batch.classList.remove('on');
    invalidateData();
    renderAll();
    toast('success', '已删除选中项');
}

function batchBar() {
    if (!state.ui.batchOn) return '';
    return `<div class="lx-batch-bar"><span>已选 ${state.ui.batchKeys.size} 项</span><button type="button" class="lx-mini-btn" data-action="batch-clear">清空</button><button type="button" class="lx-mini-btn" data-action="batch-delete">删除选中</button></div>`;
}

function renderNpc(data) {
    const timeText = formatTime(data);
    const year = timeText ? `<div class="lx-year">时令：${escapeHtml(timeText)}</div>` : '';
    const maxRound = toInt(data.最后更新回合, 0);
    const entries = Object.entries(data.NPC状态 || {})
        .filter(([name]) => !isBlacklisted(name))
        .filter(([name, info]) => textMatch(name, info.身份, info.年龄, info.位置, info.心情, info.当前所做));
    if (!entries.length) {
        setPanel('NPC状态', year + emptyText('尚无记录'));
        return;
    }

    const card = ([name, info]) => {
        const current = maxRound > 0 && toInt(info.更新回合, 0) === maxRound;
        const meta = [
            '身份：' + (info.身份 || '不详'),
            '年龄：' + (info.年龄 || '不详'),
            '位置：' + (info.位置 || '不详'),
            info.心情 && '心情：' + info.心情,
            info.当前所做 && '所事：' + info.当前所做
        ].filter(Boolean).map(text => `<span>${escapeHtml(text)}</span>`).join('');
        const check = state.ui.batchOn
            ? `<input type="checkbox" class="lx-batch-check" data-action="batch-toggle" data-key="npc|${escapeAttr(name)}" ${state.ui.batchKeys.has('npc|' + name) ? 'checked' : ''}>`
            : '';
        const followed = getSettings().followList.includes(name);
        return `<div class="lx-npc-card${current ? ' current' : ''}${followed ? ' followed' : ''}">
            <div class="lx-npc-name">${check}${escapeHtml(name)}${current ? '<span class="lx-npc-now">本轮</span>' : ''}<button type="button" class="lx-follow-btn${followed ? ' on' : ''}" data-action="follow-toggle" data-name="${escapeAttr(name)}">${followed ? '已关注' : '关注'}</button></div>
            <div class="lx-npc-meta">${meta}</div>
        </div>`;
    };

    const group = (title, list) => {
        if (!list.length) return '';
        const current = list.filter(([, info]) => maxRound > 0 && toInt(info.更新回合, 0) === maxRound);
        const older = list.filter(([, info]) => !(maxRound > 0 && toInt(info.更新回合, 0) === maxRound));
        let html = `<div class="lx-npc-group-title">${escapeHtml(title)}</div>`;
        if (current.length) {
            html += `<div class="lx-npc-subtitle current">本轮更新 · ${current.length}</div>`;
            html += current.map(card).join('');
        }
        if (older.length) {
            html += `<div class="lx-npc-subtitle">上轮及更早 · ${older.length}</div>`;
            html += older.map(card).join('');
        }
        return html;
    };

    const settings = getSettings();
    let html = '';
    if (settings.leadGroup) {
        const leads = entries.filter(([name]) => isLeadName(name));
        const others = entries.filter(([name]) => !isLeadName(name));
        html += group('主线人物 · 李承璟 / ' + getUserDisplayName(), leads);
        html += group('群像人物', others);
    } else {
        html += group('全部人物', entries);
    }
    setPanel('NPC状态', batchBar() + year + html);
}

function renderEventItem(event, roleField, isDone, panelName) {
    const role = roleField && event[roleField]
        ? `<span class="lx-role">${escapeHtml(event[roleField])}</span>` : '';
    const domain = event.领域 ? `<span class="lx-event-domain">${escapeHtml(event.领域)}</span>` : '';
    const key = 'event|' + (panelName || '') + '|' + (event.事件名 || '');
    const check = state.ui.batchOn && event.事件名
        ? `<input type="checkbox" class="lx-batch-check" data-action="batch-toggle" data-key="${escapeAttr(key)}" ${state.ui.batchKeys.has(key) ? 'checked' : ''}>`
        : '';
    const title = event.事件名 ? `<div class="lx-event-title">${check}${escapeHtml(event.事件名)}${domain}</div>` : '';
    const progress = getProgressNum(event);
    return `<div class="lx-event ${isDone ? 'done' : ''}">
        ${title}
        <div>${role}${escapeHtml(event.内容 || '')}</div>
        <div class="lx-event-progress">
            <div class="lx-progress-bar"><div class="lx-progress-fill" style="width:${progress}%"></div></div>
            <span class="lx-progress-num">${progress}%</span>
        </div>
    </div>`;
}

function renderEventList(panelName, list, roleField) {
    const arr = (Array.isArray(list) ? list : [])
        .filter(event => textMatch(event.事件名, event.角色, event.内容, event.国家));
    const byRound = (a, b) => (toInt(b.更新回合, 0) || toInt(b.回合, 0)) - (toInt(a.更新回合, 0) || toInt(a.回合, 0));
    const active = arr.filter(event => getProgressNum(event) < 100).sort(byRound);
    const done = arr.filter(event => getProgressNum(event) >= 100).sort(byRound);
    if (!arr.length) {
        setPanel(panelName, emptyText('风平浪静'));
        return;
    }
    let html = '';
    if (!active.length) {
        html += '<div class="lx-empty" style="padding:18px 0;">暂无进行中的事件</div>';
    } else {
        html += active.map(event => renderEventItem(event, roleField, false, panelName)).join('');
    }
    if (done.length) {
        html += `<details class="lx-completed">
            <summary><span>已完成 (${done.length})</span><span>点击展开</span></summary>
            <div class="lx-completed-body">${done.map(event => renderEventItem(event, roleField, true, panelName)).join('')}</div>
        </details>`;
    }
    setPanel(panelName, batchBar() + html);
}

function renderRumors(list) {
    const arr = (Array.isArray(list) ? list : []).filter(item => {
        if (typeof item === 'string') return textMatch(item);
        return textMatch(item.内容, item.来源人物, item.可信度, ...(item.传播链 || []).map(x => x.人物 + ' ' + x.版本));
    });
    if (!arr.length) {
        setPanel('流言', emptyText('风平无议'));
        return;
    }
    const html = arr.slice(-10).reverse().map(item => {
        if (typeof item === 'string') return `<div class="lx-rumor">${escapeHtml(item)}</div>`;
        const chain = (item.传播链 || []).map((node, index) =>
            `<span class="lx-rumor-node">${escapeHtml(node.人物)}${node.版本 ? `<small>${escapeHtml(node.版本)}</small>` : ''}</span>${index < item.传播链.length - 1 ? '<span class="lx-rumor-arrow">→</span>' : ''}`
        ).join('');
        return `<div class="lx-rumor">
            <div class="lx-rumor-content">${escapeHtml(item.内容 || '')}</div>
            <div class="lx-rumor-meta">
                ${item.来源人物 ? `<span>源头：${escapeHtml(item.来源人物)}</span>` : ''}
                <span>可信度：${escapeHtml(item.可信度 || '未知')}</span>
            </div>
            ${chain ? `<div class="lx-rumor-chain">${chain}</div>` : ''}
        </div>`;
    }).join('');
    setPanel('流言', html);
}

function renderLetters(list) {
    const arr = Array.isArray(list) ? list : [];
    const rows = arr.map((item, index) => ({ item, index }))
        .filter(({ item }) => item.方向 !== '发' && textMatch(item.来源, item.内容));
    if (!rows.length) {
        setPanel('书信', emptyText('尚无来信'));
        return;
    }
    const html = rows.slice().reverse().map(({ item, index }) => {
        const isSent = false;
        const person = item.来源 || '佚名';
        const signer = item.来源 || '佚名';
        const date = item.日期 || item.时间 || (item.回合 ? `第 ${item.回合} 回` : '');
        const cls = 'lx-letter received';
        const action = `<button type="button" class="lx-mini-btn" data-action="letter-del" data-idx="${index}">删除</button>`;
        return `<div class="${cls}">
            <div class="lx-letter-sheet">
                <div class="lx-letter-head">
                    <span class="lx-letter-direction">${isSent ? '寄往' : '来自'}</span>
                    <span class="lx-letter-name">${escapeHtml(person)}</span>
                    ${date ? `<span class="lx-letter-date">${escapeHtml(date)}</span>` : ''}
                </div>
                <div class="lx-letter-body">${escapeHtml(item.内容 || '')}</div>
                <div class="lx-letter-sign">—— ${escapeHtml(signer)}${isSent ? ' 手书' : ''}</div>
                <span class="lx-letter-seal">${isSent ? '寄' : '笺'}</span>
            </div>
            <div class="lx-letter-actions">${action}</div>
        </div>`;
    }).join('');
    setPanel('书信', html);
}

function chineseNumber(value) {
    const n = toInt(value, 0);
    if (n <= 0) return '';
    const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    if (n < 10) return digits[n];
    if (n === 10) return '十';
    if (n < 20) return '十' + digits[n - 10];
    if (n === 20) return '二十';
    if (n < 30) return '廿' + digits[n - 20];
    return String(n);
}

function chineseDay(value) {
    const n = toInt(value, 0);
    if (!n) return '';
    if (n <= 10) return '初' + chineseNumber(n);
    if (n < 20) return '十' + chineseNumber(n - 10);
    if (n === 20) return '二十';
    if (n < 30) return '廿' + chineseNumber(n - 20);
    return String(n);
}

function formatTime(data) {
    const t = (data && data.时令) || {};
    const year = t.年 || (data && data.纪年 && data.纪年.年) || 0;
    const era = t.年号 || (data && data.纪年 && data.纪年.年号) || '';
    const date = [year ? `${era}${chineseNumber(year)}年` : '', t.月 ? `${chineseNumber(t.月)}月` : '', t.日 ? chineseDay(t.日) : ''].filter(Boolean).join('·');
    return [date, t.节气, t.节日, t.时辰].filter(Boolean).join(' · ');
}

const SOLAR_TERMS = [
    [1, 6, '小寒'], [1, 20, '大寒'], [2, 4, '立春'], [2, 19, '雨水'],
    [3, 6, '惊蛰'], [3, 21, '春分'], [4, 5, '清明'], [4, 20, '谷雨'],
    [5, 6, '立夏'], [5, 21, '小满'], [6, 6, '芒种'], [6, 21, '夏至'],
    [7, 7, '小暑'], [7, 23, '大暑'], [8, 8, '立秋'], [8, 23, '处暑'],
    [9, 8, '白露'], [9, 23, '秋分'], [10, 8, '寒露'], [10, 23, '霜降'],
    [11, 7, '立冬'], [11, 22, '小雪'], [12, 7, '大雪'], [12, 22, '冬至']
];

function inferSolarTerm(month, day) {
    const m = toInt(month, 0);
    const d = toInt(day, 0);
    if (!m || !d) return '待推';
    const exact = SOLAR_TERMS.find(([sm, sd]) => sm === m && sd === d);
    if (exact) return exact[2];
    const value = m * 31 + d;
    const next = SOLAR_TERMS.slice().sort((a, b) => a[0] * 31 + a[1] - (b[0] * 31 + b[1])).find(([sm, sd]) => sm * 31 + sd >= value) || SOLAR_TERMS[0];
    return next[2];
}

const FESTIVALS = [
    [1, 1, '元日'], [1, 7, '人日'], [1, 15, '上元'], [2, 2, '龙抬头'],
    [3, 3, '上巳'], [4, 4, '寒食'], [5, 5, '端阳'], [7, 7, '七夕'],
    [7, 15, '中元'], [8, 15, '中秋'], [9, 9, '重阳'], [12, 8, '腊八'],
    [12, 23, '祭灶'], [12, 30, '除夕']
];

function deriveFestival(month, day) {
    const m = toInt(month, 0);
    const d = toInt(day, 0);
    if (!m || !d) return { name: '待推算', date: '', inferred: true };
    const exact = FESTIVALS.find(([fm, fd]) => fm === m && fd === d);
    if (exact) return { name: exact[2], date: `${m}月${d}日`, inferred: false };
    const sorted = FESTIVALS.slice().sort((a, b) => a[0] * 31 + a[1] - (b[0] * 31 + b[1]));
    const next = sorted.find(([fm, fd]) => fm * 31 + fd > m * 31 + d) || sorted[0];
    return { name: next[2], date: `${next[0]}月${next[1]}日`, inferred: true };
}

const RITUAL_MAP = {
    元日: { 礼仪: '祭祖、朝贺、赐宴', 节目: '大傩、乐舞、百戏', 禁忌: '忌说不吉、忌打碎器物' },
    人日: { 礼仪: '剪彩、登高、赐宴', 节目: '剪彩胜、赋诗', 禁忌: '忌刑罚、忌远行' },
    上元: { 礼仪: '张灯、观灯、赐宴', 节目: '灯舞、百戏、猜谜', 禁忌: '忌熄灯、忌口角' },
    龙抬头: { 礼仪: '祭龙、引龙、食龙须面', 节目: '舞龙、社火', 禁忌: '忌动针线' },
    上巳: { 礼仪: '祓禊、临水、曲水流觞', 节目: '水戏、赋诗', 禁忌: '忌下水失仪' },
    寒食: { 礼仪: '禁火、祭扫、冷食', 节目: '踏青、秋千', 禁忌: '忌生火、忌荤食' },
    端阳: { 礼仪: '祭屈原、系五彩、赐扇', 节目: '竞渡、食粽、斗草', 禁忌: '忌说“翻”、忌送药' },
    七夕: { 礼仪: '乞巧、拜织女、陈瓜果', 节目: '穿针、投针、观星', 禁忌: '忌不敬牛女' },
    中元: { 礼仪: '祭祖、放河灯、设醮', 节目: '河灯、法事', 禁忌: '忌夜行、忌拍肩' },
    中秋: { 礼仪: '拜月、赏桂、赐月饼', 节目: '赏月、听曲、猜谜', 禁忌: '忌指月、忌失约' },
    重阳: { 礼仪: '登高、赏菊、赐糕', 节目: '登高、插茱萸、赋诗', 禁忌: '忌说“重”不吉' },
    腊八: { 礼仪: '祭祖、熬粥、施粥', 节目: '施粥、祭灶前奏', 禁忌: '忌浪费、忌争吵' },
    祭灶: { 礼仪: '祭灶、扫尘、备年', 节目: '祭灶、写春联', 禁忌: '忌说灶王坏话' },
    除夕: { 礼仪: '守岁、祭祖、赐宴', 节目: '守岁、爆竹、宴饮', 禁忌: '忌倒垃圾、忌说不吉' },
    花朝节: { 礼仪: '赏花、祭花神、赐宴', 节目: '赏花、扑蝶、赋诗', 禁忌: '忌折花枝、忌失仪' }
};

function inferRitual(data, festival, t, banquet) {
    const name = festival.name || '节庆';
    const map = RITUAL_MAP[name] || { 礼仪: '祭祖、宴饮、受贺', 节目: '乐舞、宴饮、投壶', 禁忌: '忌失礼、忌喧哗' };
    const host = (banquet && banquet.主家) || '宫中';
    const inPalace = host === '宫中';
    return {
        礼仪: t.礼仪 || map.礼仪,
        主礼: t.主礼 || (inPalace ? (typeof CHARACTER_NAME === 'string' ? CHARACTER_NAME : '帝后') : `${host}家主`),
        地点: t.地点 || (banquet && banquet.地点) || (inPalace ? '承极殿' : `${host}正堂`),
        座次: t.座次 || (inPalace ? '按位份入席，宗亲居前' : '按辈分入席，家主居中'),
        禁忌: t.禁忌 || map.禁忌,
        节目: t.节目 || map.节目
    };
}

function inferBanquets(data, festival) {
    const clans = (data && data.朝堂门阀 && data.朝堂门阀.家族) || [];
    const factions = (data && data.朝堂门阀 && data.朝堂门阀.派系) || [];
    const host = (clans[0] && clans[0].家族) || (factions[0] && factions[0].领袖) || '宫中';
    const location = clans[0] ? `${host}府` : '宫中';
    const guests = clans[0] ? (clans[0].成员 || []).slice(0, 5).join('、') || '宗亲、近臣' : '宗亲、近臣';
    const saved = (data && data.时令 && data.时令.宴席) || [];
    const fill = b => ({
        ...b,
        主家: b.主家 || host,
        地点: b.地点 || location,
        日期: b.日期 || festival.date || '本月',
        宾客: b.宾客 || guests,
        目的: b.目的 || '节庆宴饮，联络人情',
        备注: b.备注 || '由时令与门阀推演'
    });
    if (Array.isArray(saved) && saved.length) return saved.map(fill);
    const name = /宴$/.test(festival.name) ? `${host}${festival.name}` : `${host}${festival.name}宴`;
    return [fill({ 名称: name, 主家: host, 地点: location, 日期: festival.date || '本月', 宾客: guests, 目的: '节庆宴饮，联络人情', 备注: '由时令与门阀推演' })];
}

function renderCalendar(data) {
    const t = (data && data.时令) || {};
    const date = formatTime(data);
    if (!date && !t.礼仪 && !t.节日 && !t.节气) {
        setPanel('时令', emptyText('时令未记') + '<div class="lx-time-hint">正文出现「景衡 X 年」「三月初八」等日期时，会自动记录。</div>');
        return;
    }
    const year = t.年 || (data.纪年 && data.纪年.年) || 0;
    const era = t.年号 || (data.纪年 && data.纪年.年号) || '景衡';
    const festival = deriveFestival(t.月, t.日);
    const rawFestival = String(t.节日 || '').trim();
    const festivalName = rawFestival && !['未记', '无', '不详'].includes(rawFestival) ? rawFestival : festival.name;
    const timeCells = [
        ['纪年', year ? `${era}${chineseNumber(year)}年` : '待推'],
        ['月日', `${t.月 ? chineseNumber(t.月) + '月' : '待推'}${t.日 ? chineseDay(t.日) : ''}`],
        ['节气', t.节气 || inferSolarTerm(t.月, t.日)],
        ['时辰', t.时辰 || '未时'],
        ['备注', t.备注 || '——']
    ];
    const festivalView = Object.assign({}, festival, { name: festivalName });
    const banquets = inferBanquets(data, festivalView);
    const ritual = inferRitual(data, festivalView, t, banquets[0]);
    const festivalCells = [
        ['节日', festivalName + (festival.inferred && !t.节日 ? `（推算 · ${festival.date}）` : '')],
        ['礼仪', ritual.礼仪],
        ['主礼', ritual.主礼],
        ['地点', ritual.地点],
        ['座次', ritual.座次],
        ['禁忌', ritual.禁忌],
        ['节目', ritual.节目]
    ];
    const cell = c => `<div class="lx-time-cell"><span>${escapeHtml(c[0])}</span><b>${escapeHtml(String(c[1]))}</b></div>`;
    const banquetHtml = banquets.length ? `<div class="lx-banquet-card">
        <div class="lx-time-card-title">宴席</div>
        ${banquets.map(b => `<div class="lx-banquet-item">
            <div class="lx-banquet-name">${escapeHtml(b.名称)}</div>
            <div class="lx-banquet-line"><b>主家</b>${escapeHtml(b.主家 || '未记')}　<b>地点</b>${escapeHtml(b.地点 || '未记')}</div>
            <div class="lx-banquet-line"><b>日期</b>${escapeHtml(b.日期 || '待定')}　<b>宾客</b>${escapeHtml(b.宾客 || '未记')}</div>
            ${b.目的 ? `<div class="lx-banquet-line"><b>目的</b>${escapeHtml(b.目的)}</div>` : ''}
        </div>`).join('')}
    </div>` : '';
    const html = `<div class="lx-calendar-stack">
        <div class="lx-time-card">
            <div class="lx-time-card-title">时令</div>
            <div class="lx-time-big">${escapeHtml(date || '时令未记')}</div>
            <div class="lx-time-grid">${timeCells.map(cell).join('')}</div>
        </div>
        <div class="lx-festival-card">
            <div class="lx-time-card-title">节庆 · 礼仪</div>
            <div class="lx-time-grid">${festivalCells.map(cell).join('')}</div>
        </div>
        ${banquetHtml}
    </div>`;
    setPanel('时令', html);
}

function renderMemorials(list) {
    const arr = (Array.isArray(list) ? list : []).filter(item => textMatch(item.标题, item.上奏人, item.衙门, item.事由, item.主张, item.状态));
    if (!arr.length) {
        setPanel('奏折', emptyText('案上无折'));
        return;
    }
    const done = item => ['准奏', '驳回', '已结'].includes(item.状态);
    const active = arr.filter(item => !done(item));
    const finished = arr.filter(done);
    const card = item => `<div class="lx-memorial ${done(item) ? 'done' : ''}">
        <div class="lx-memorial-head"><span class="lx-memorial-title">${escapeHtml(item.标题)}</span><span class="lx-memorial-status">${escapeHtml(item.状态 || '待议')}</span></div>
        <div class="lx-memorial-meta">${[item.上奏人 && '上奏：' + item.上奏人, item.衙门 && '衙门：' + item.衙门].filter(Boolean).map(x => `<span>${escapeHtml(x)}</span>`).join('')}</div>
        ${item.事由 ? `<div class="lx-memorial-body">${escapeHtml(item.事由)}</div>` : ''}
        <div class="lx-memorial-grid">
            ${item.主张 ? `<div><b>主张</b>${escapeHtml(item.主张)}</div>` : ''}
            ${item.反对 ? `<div><b>反对</b>${escapeHtml(item.反对)}</div>` : ''}
        </div>
        ${item.结果 ? `<div class="lx-memorial-result">结果：${escapeHtml(item.结果)}</div>` : ''}
        <div class="lx-event-progress"><div class="lx-progress-bar"><div class="lx-progress-fill" style="width:${getProgressNum(item)}%"></div></div><span class="lx-progress-num">${getProgressNum(item)}%</span></div>
        ${!done(item) ? `<div class="lx-memorial-actions">
            <button type="button" class="lx-mini-btn" data-action="memorial-status" data-status="准奏" data-title="${escapeAttr(item.标题)}">准奏</button>
            <button type="button" class="lx-mini-btn" data-action="memorial-status" data-status="留中" data-title="${escapeAttr(item.标题)}">留中</button>
            <button type="button" class="lx-mini-btn" data-action="memorial-status" data-status="驳回" data-title="${escapeAttr(item.标题)}">驳回</button>
        </div>` : ''}
    </div>`;
    let html = active.map(card).join('') || '<div class="lx-empty" style="padding:14px 0;">暂无待议奏折</div>';
    if (finished.length) {
        html += `<details class="lx-completed"><summary><span>已结 (${finished.length})</span><span>点击展开</span></summary><div class="lx-completed-body">${finished.map(card).join('')}</div></details>`;
    }
    setPanel('奏折', html);
}

function renderSecrets(list) {
    const arr = (Array.isArray(list) ? list : []).filter(item => textMatch(item.内容, item.涉及, item.证据, ...(item.知情者 || []).map(k => k.人物)));
    if (!arr.length) {
        setPanel('秘辛', emptyText('暂无秘辛'));
        return;
    }
    const html = arr.slice().reverse().map(item => {
        const know = item.知情者 || [];
        const unknown = item.不知情者 || [];
        return `<div class="lx-secret">
            <div class="lx-secret-content">${escapeHtml(item.内容 || '')}</div>
            ${item.涉及 ? `<div class="lx-secret-line"><b>涉及</b>${escapeHtml(item.涉及)}</div>` : ''}
            <div class="lx-secret-line"><b>知情</b>${know.length ? know.map(k => `<span class="lx-secret-chip known">${escapeHtml(k.人物)}·${escapeHtml(k.程度)}</span>`).join('') : '<span class="lx-secret-none">无人</span>'}</div>
            <div class="lx-secret-line"><b>不知情</b>${unknown.length ? unknown.map(k => `<span class="lx-secret-chip">${escapeHtml(k.人物)}</span>`).join('') : '<span class="lx-secret-none">——</span>'}</div>
            ${item.证据 ? `<div class="lx-secret-evidence">证据/把柄：${escapeHtml(item.证据)}</div>` : ''}
        </div>`;
    }).join('');
    setPanel('秘辛', html);
}

function renderStruggles(list) {
    const filter = state.ui.struggleFilter || '全部';
    const arr = (Array.isArray(list) ? list : [])
        .filter(item => filter === '全部' || item.类型 === filter)
        .filter(item => textMatch(item.事件名, item.发起者, item.目标, item.手段, item.阶段, item.结果));
    const tabs = ['全部', '宫斗', '政斗'].map(name =>
        `<button type="button" class="lx-mini-btn ${filter === name ? 'active' : ''}" data-action="struggle-filter" data-filter="${name}">${name}</button>`
    ).join('');
    if (!arr.length) {
        setPanel('斗争', `<div class="lx-struggle-filter">${tabs}</div>` + emptyText('暂无斗争'));
        return;
    }
    const card = item => `<div class="lx-struggle level-${escapeAttr(item.烈度 || '低')}">
        <div class="lx-struggle-head"><span class="lx-struggle-type">${escapeHtml(item.类型 || '宫斗')}</span><span class="lx-struggle-name">${escapeHtml(item.事件名)}</span><span class="lx-struggle-level">${escapeHtml(item.烈度 || '低')}烈度</span></div>
        <div class="lx-struggle-line"><b>发起</b>${escapeHtml(item.发起者 || '不详')} <span class="lx-arrow">→</span> ${escapeHtml(item.目标 || '不详')}</div>
        ${item.手段 ? `<div class="lx-struggle-line"><b>手段</b>${escapeHtml(item.手段)}</div>` : ''}
        <div class="lx-struggle-line"><b>阶段</b>${escapeHtml(item.阶段 || '策划')}</div>
        <div class="lx-event-progress"><div class="lx-progress-bar"><div class="lx-progress-fill" style="width:${getProgressNum(item)}%"></div></div><span class="lx-progress-num">${getProgressNum(item)}%</span></div>
        ${item.知情者 && item.知情者.length ? `<div class="lx-struggle-line"><b>知情</b>${item.知情者.map(k => `<span class="lx-secret-chip known">${escapeHtml(k.人物)}</span>`).join('')}</div>` : ''}
        ${item.证据 ? `<div class="lx-struggle-line"><b>证据</b>${escapeHtml(item.证据)}</div>` : ''}
        ${item.结果 ? `<div class="lx-struggle-result">${escapeHtml(item.结果)}</div>` : ''}
    </div>`;
    setPanel('斗争', `<div class="lx-struggle-filter">${tabs}</div>` + arr.slice().reverse().map(card).join(''));
}

function renderCourt(raw) {
    const data = normalizeCourt(raw, 0);
    const factions = data.派系.filter(item => textMatch(item.派系名, item.领袖, item.主张, item.目标, item.资源, item.备注));
    const clans = data.家族.filter(item => textMatch(item.家族, item.家主, item.姻亲, item.世仇, item.产业, item.立场, item.备注));
    if (!factions.length && !clans.length) {
        setPanel('朝堂门阀', emptyText('暂无朝堂派系或门阀记录'));
        return;
    }
    let html = '';
    if (factions.length) {
        html += `<div class="lx-npc-group-title">朝堂派系 · ${factions.length}</div>`;
        html += factions.map(item => `<div class="lx-court-card">
            <div class="lx-court-head"><span class="lx-court-name">${escapeHtml(item.派系名)}</span><span class="lx-court-meta">${escapeHtml(item.领袖 || '领袖未记')}</span></div>
            <div class="lx-court-line"><b>成员</b>${escapeHtml((item.成员 || []).join('、') || '未记')}</div>
            <div class="lx-court-line"><b>主张</b>${escapeHtml(item.主张 || '未记')}</div>
            <div class="lx-court-line"><b>资源</b>${escapeHtml(item.资源 || '未记')}　<b>目标</b>${escapeHtml(item.目标 || '未记')}</div>
            ${(item.敌对 || []).length ? `<div class="lx-court-line"><b>敌对</b>${escapeHtml(item.敌对.join('、'))}</div>` : ''}
            <div class="lx-event-progress"><div class="lx-progress-bar"><div class="lx-progress-fill" style="width:${getProgressNum(item)}%"></div></div><span class="lx-progress-num">${getProgressNum(item)}%</span></div>
            ${item.备注 ? `<div class="lx-court-note">${escapeHtml(item.备注)}</div>` : ''}
        </div>`).join('');
    }
    if (clans.length) {
        html += `<div class="lx-npc-group-title">门阀家族 · ${clans.length}</div>`;
        html += clans.map(item => `<div class="lx-court-card clan">
            <div class="lx-court-head"><span class="lx-court-name">${escapeHtml(item.家族)}</span><span class="lx-court-meta">${escapeHtml(item.家主 || '家主未记')}</span></div>
            <div class="lx-court-line"><b>成员</b>${escapeHtml((item.成员 || []).join('、') || '未记')}</div>
            <div class="lx-court-line"><b>姻亲</b>${escapeHtml(item.姻亲 || '未记')}　<b>世仇</b>${escapeHtml(item.世仇 || '未记')}</div>
            <div class="lx-court-line"><b>产业</b>${escapeHtml(item.产业 || '未记')}</div>
            <div class="lx-court-line"><b>门生</b>${escapeHtml((item.门生 || []).join('、') || '未记')}　<b>立场</b>${escapeHtml(item.立场 || '未记')}</div>
            ${item.备注 ? `<div class="lx-court-note">${escapeHtml(item.备注)}</div>` : ''}
        </div>`).join('');
    }
    setPanel('朝堂门阀', html);
}

function renderMedical(list) {
    const arr = (Array.isArray(list) ? list : [])
        .filter(item => textMatch(item.人物, item.日期, item.症状, item.诊断, item.方子, item.太医, item.状态, item.备注));
    if (!arr.length) {
        setPanel('医疗健康', emptyText('暂无医案记录'));
        return;
    }
    const html = arr.slice().reverse().map(item => `<div class="lx-health-card">
        <div class="lx-health-head"><span class="lx-health-name">${escapeHtml(item.人物)}</span><span class="lx-health-date">${escapeHtml(item.日期 || '日期未记')}</span></div>
        <div class="lx-court-line"><b>症状</b>${escapeHtml(item.症状 || '未记')}</div>
        <div class="lx-court-line"><b>诊断</b>${escapeHtml(item.诊断 || '未记')}</div>
        <div class="lx-court-line"><b>方子</b>${escapeHtml(item.方子 || '未记')}</div>
        <div class="lx-court-line"><b>太医</b>${escapeHtml(item.太医 || '未记')}　<b>忌口</b>${escapeHtml(item.忌口 || '未记')}</div>
        <div class="lx-health-status">${escapeHtml(item.状态 || '在治')}</div>
        ${item.备注 ? `<div class="lx-court-note">${escapeHtml(item.备注)}</div>` : ''}
    </div>`).join('');
    setPanel('医疗健康', html);
}

function renderTimeline(data, range) {
    const items = [];
    ['NPC事件', '国家事件', '邻国事件'].forEach(key => {
        (Array.isArray(data[key]) ? data[key] : []).forEach(event => {
            const round = toInt(event.回合, 0);
            items.push({
                round,
                type: key.replace('事件', ''),
                text: event.事件名 ? `${event.事件名}：${event.内容 || ''}` : (event.内容 || '')
            });
        });
    });
    (Array.isArray(data.奏折) ? data.奏折 : []).forEach(item => {
        items.push({ round: toInt(item.回合, 0), type: '奏折', text: `${item.标题 || ''}：${item.事由 || ''}` });
    });
    (Array.isArray(data.斗争) ? data.斗争 : []).forEach(item => {
        items.push({ round: toInt(item.回合, 0), type: item.类型 || '斗争', text: `${item.事件名 || ''}：${item.手段 || ''}` });
    });
    (Array.isArray(data.流言) ? data.流言 : []).forEach(item => {
        items.push({ round: toInt(item.回合, 0), type: '流言', text: item.内容 || '' });
    });
    (Array.isArray(data.书信) ? data.书信 : []).forEach(item => {
        const dir = item.方向 === '发' ? `致${item.去向 || '佚名'}` : `来自${item.来源 || '佚名'}`;
        items.push({ round: toInt(item.回合, 0), type: '书信', text: `${dir}：${item.内容 || ''}` });
    });
    (Array.isArray(data.伏笔) ? data.伏笔 : []).forEach(item => {
        items.push({ round: toInt(item.回合, 0), type: '伏笔', text: item.内容 || '' });
    });

    items.sort((a, b) => b.round - a.round);
    let filtered = items.filter(item => textMatch(item.type, item.text));
    if (range > 0 && filtered.length) {
        const max = Math.max.apply(null, filtered.map(item => item.round));
        filtered = filtered.filter(item => item.round === 0 || item.round > max - range);
    }
    if (!filtered.length) {
        setPanel('时间线', emptyText('时光未动'));
        return;
    }
    const groups = {};
    filtered.forEach(item => {
        const key = String(item.round);
        if (!groups[key]) groups[key] = [];
        groups[key].push(item);
    });
    const order = Object.keys(groups).map(Number).sort((a, b) => {
        if (a === 0) return 1;
        if (b === 0) return -1;
        return b - a;
    });
    const html = order.map(round => {
        const list = groups[String(round)];
        return `<div class="lx-timeline-item">
            <div class="lx-timeline-round">${round > 0 ? '第 ' + round + ' 回' : '早期记录'}</div>
            ${list.map(item => `<div class="lx-timeline-row"><span class="lx-timeline-tag">${escapeHtml(item.type)}</span>${escapeHtml(String(item.text).slice(0, 120))}</div>`).join('')}
        </div>`;
    }).join('');
    setPanel('时间线', html);
}

function renderRelationGraph(rows) {
    const names = [];
    rows.forEach(({ relation: r }) => {
        if (r.甲 && !names.includes(r.甲)) names.push(r.甲);
        if (r.乙 && !names.includes(r.乙)) names.push(r.乙);
    });
    const n = names.length;
    const cx = 200;
    const cy = 170;
    const radius = n <= 4 ? 108 : n <= 8 ? 124 : 134;
    const nodeR = n > 12 ? 16 : n > 8 ? 19 : 22;
    const positions = {};
    names.forEach((name, index) => {
        if (n === 1) {
            positions[name] = { x: cx, y: cy };
            return;
        }
        const angle = (index / n) * Math.PI * 2 - Math.PI / 2;
        positions[name] = { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius };
    });

    let svg = `<svg class="lx-rel-graph" viewBox="0 0 400 340" role="img" aria-label="人物关系图">`;
    rows.forEach(({ relation: r }) => {
        const p1 = positions[r.甲];
        const p2 = positions[r.乙];
        if (!p1 || !p2) return;
        svg += `<line class="lx-rel-line" x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}"></line>`;
    });
    rows.forEach(({ relation: r }) => {
        const p1 = positions[r.甲];
        const p2 = positions[r.乙];
        if (!p1 || !p2 || !r.关系) return;
        svg += `<text class="lx-rel-label" x="${((p1.x + p2.x) / 2).toFixed(1)}" y="${((p1.y + p2.y) / 2 - 4).toFixed(1)}">${escapeHtml(r.关系)}</text>`;
    });
    names.forEach(name => {
        const p = positions[name];
        const maxChars = n > 12 ? 2 : 3;
        const short = name.length > maxChars ? name.slice(0, maxChars) : name;
        svg += `<g><title>${escapeHtml(name)}</title>
            <circle class="lx-rel-node" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${nodeR}"></circle>
            <text class="lx-rel-node-text" x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}">${escapeHtml(short)}</text>
        </g>`;
    });
    svg += '</svg>';
    setPanel('关系图', svg + '<div style="margin-top:10px;"><button type="button" class="lx-mini-btn" data-action="rel-add">+ 添加关系</button></div>');
}

function renderRelations(list, view) {
    const rows = (Array.isArray(list) ? list : []).map((relation, index) => ({ relation, index }))
        .filter(({ relation }) => {
            if (!isPlainObject(relation)) return false;
            const a = cleanName(relation.甲);
            const b = cleanName(relation.乙);
            return a && b && !isBlacklisted(a) && !isBlacklisted(b) && textMatch(a, b, relation.关系);
        });
    if (!rows.length) {
        setPanel('关系图', emptyText('关系未明') + '<div style="text-align:center;margin-top:10px;"><button type="button" class="lx-mini-btn" data-action="rel-add">+ 添加关系</button></div>');
        return;
    }
    if (view === 'graph') {
        renderRelationGraph(rows);
        return;
    }
    const html = rows.map(({ relation, index }) => `
        <div class="lx-rel-card">
            <div class="lx-rel-text">
                <span class="lx-rel-a">${escapeHtml(relation.甲)}</span> ↔ <span class="lx-rel-a">${escapeHtml(relation.乙)}</span>
                ${relation.关系 ? '：' + escapeHtml(relation.关系) : ''}
            </div>
            <button type="button" class="lx-mini-btn" data-action="rel-edit" data-idx="${index}">改</button>
        </div>
    `).join('');
    setPanel('关系图', html + '<div style="margin-top:10px;"><button type="button" class="lx-mini-btn" data-action="rel-add">+ 添加关系</button></div>');
}

function renderForeshadow(list) {
    const settings = getSettings();
    const rows = (Array.isArray(list) ? list : []).map((item, index) => ({ item, index }))
        .filter(({ item }) => textMatch(item.内容, item.来源));
    if (!rows.length) {
        setPanel('伏笔', emptyText('无伏笔') + (settings.foreshadowUser
            ? '<div style="text-align:center;margin-top:10px;"><button type="button" class="lx-mini-btn" data-action="fp-add">+ 添加伏笔</button></div>'
            : ''));
        return;
    }
    rows.sort((a, b) => (b.item.回合 || 0) - (a.item.回合 || 0));
    const pending = rows.filter(({ item }) => !item.已回收);
    const recovered = rows.filter(({ item }) => item.已回收);
    const itemHtml = ({ item, index }) => {
        const button = settings.foreshadowUser
            ? `<button type="button" class="lx-mini-btn" data-action="fp-toggle" data-idx="${index}">${item.已回收 ? '撤回回收' : '标记回收'}</button>`
            : `<span>${item.已回收 ? '已回收' : '未回收'}</span>`;
        const roundLabel = item.回合 ? `第 ${item.回合} 回` : '早期';
        const recoveredLabel = item.回收回合 ? ` · 第 ${item.回收回合} 回收` : '';
        return `<div class="lx-foreshadow-item ${item.已回收 ? 'recovered' : ''}">
            <div class="lx-foreshadow-content">${escapeHtml(item.内容 || '')}</div>
            <div class="lx-foreshadow-meta">
                <span>${roundLabel} · ${escapeHtml(item.来源 || '手动')}${recoveredLabel}</span>
                ${button}
            </div>
        </div>`;
    };
    let html = `<div class="lx-fp-summary">未回收 ${pending.length} 条 · 已回收 ${recovered.length} 条</div>`;
    if (pending.length) {
        html += pending.map(itemHtml).join('');
    } else {
        html += '<div class="lx-empty" style="padding:14px 0;">没有未回收的伏笔</div>';
    }
    if (recovered.length) {
        html += `<details class="lx-completed"><summary><span>已回收 (${recovered.length})</span><span>点击展开</span></summary>
            <div class="lx-completed-body">${recovered.map(itemHtml).join('')}</div>
        </details>`;
    }
    setPanel('伏笔', html + (settings.foreshadowUser
        ? '<div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap;"><button type="button" class="lx-mini-btn" data-action="fp-add">+ 添加伏笔</button><button type="button" class="lx-mini-btn" data-action="fp-auto">回收已完成事件相关</button></div>'
        : ''));
}

function logClass(label) {
    if (['未找到', '空响应'].includes(label)) return 'err';
    if (['解析失败', '找到但解析失败', '副API失败'].includes(label)) return 'warn';
    return 'ok';
}

function renderDebugLogs() {
    const logs = getLogs();
    if (!logs.length) return '<div class="lx-empty" style="padding:18px 0;">暂无日志</div>';
    return logs.map(log => `<div class="lx-debug-item ${logClass(log.标签 || '')}">
        <div class="lx-debug-head">[${escapeHtml(log.时间 || '')}] #${escapeHtml(log.消息ID || '')} · ${escapeHtml(log.模式 || '')}</div>
        <div class="lx-debug-row">状态：${escapeHtml(log.标签 || '')}</div>
        <div class="lx-debug-row">结果：${escapeHtml(log.结果 || '')}</div>
        ${log.原始 ? `<div class="lx-debug-row raw">${escapeHtml(log.原始)}</div>` : ''}
    </div>`).join('');
}

function renderPregnancy(list, children) {
    const rows = (Array.isArray(list) ? list : [])
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => !isBlacklisted(item.人物) && textMatch(item.人物, item.状态, item.备注));
    const kids = (Array.isArray(children) ? children : [])
        .filter(item => textMatch(item.姓名, item.性别, item.身份, item.生母, item.亲缘, item.状态, item.备注));
    if (!rows.length && !kids.length) {
        setPanel('孕事', emptyText('暂无孕事') + '<div style="text-align:center;margin-top:10px;"><button type="button" class="lx-mini-btn" data-action="preg-add">+ 添加孕事</button></div>');
        return;
    }
    rows.sort((a, b) => {
        if (a.item.已结束 !== b.item.已结束) return a.item.已结束 ? 1 : -1;
        return (b.item.孕月 || 0) - (a.item.孕月 || 0);
    });
    let html = '';
    if (kids.length) {
        html += `<div class="lx-npc-group-title">后妃所出子女 · ${kids.length}</div>`;
        html += kids.map(item => `<div class="lx-heir-child">
            <div class="lx-heir-child-head"><span class="lx-heir-child-name">${escapeHtml(item.姓名)}</span><span class="lx-heir-child-title">${escapeHtml(item.身份 || (item.性别 === '女' ? '皇女' : '皇子'))}</span></div>
            <div class="lx-heir-line"><b>性别</b>${escapeHtml(item.性别)}　<b>生母</b>${escapeHtml(displayPersonName(item.生母) || '不详')}　<b>排行</b>${item.排行 ? '第' + item.排行 : '未序'}　<b>年龄</b>${item.年龄 !== undefined && item.年龄 !== null ? item.年龄 + '岁' : '待推'}</div>
            <div class="lx-heir-line"><b>亲缘</b>${escapeHtml(item.亲缘 || '不详')}　<b>出生</b>${escapeHtml(item.出生 || '未记')}　<b>状态</b>${escapeHtml(item.状态 || '在世')}</div>
            ${item.备注 ? `<div class="lx-preg-note">${escapeHtml(item.备注)}</div>` : ''}
        </div>`).join('');
    }
    html += rows.map(({ item, index }) => {
        const cls = item.已结束 ? 'lx-preg-card ended' : 'lx-preg-card';
        return `<div class="${cls}">
            <div><span class="lx-preg-name">${escapeHtml(item.人物)}</span><span class="lx-preg-month">${item.孕月 ? '孕 ' + item.孕月 + ' 月' : '孕月未录'}</span></div>
            <div class="lx-preg-status">${escapeHtml(item.状态 || '有孕')}${item.已结束 ? ' · 已结束' : ''}</div>
            ${item.风险 ? `<div class="lx-preg-note">风险：${escapeHtml(item.风险)}</div>` : ''}
            ${item.胎象 ? `<div class="lx-preg-note">胎象：${escapeHtml(item.胎象)}</div>` : ''}
            ${item.太医 ? `<div class="lx-preg-note">太医：${escapeHtml(item.太医)}</div>` : ''}
            ${item.饮食 ? `<div class="lx-preg-note">饮食：${escapeHtml(item.饮食)}</div>` : ''}
            ${item.行动 ? `<div class="lx-preg-note">行动：${escapeHtml(item.行动)}</div>` : ''}
            ${item.预计产期 ? `<div class="lx-preg-note">预计产期：${escapeHtml(item.预计产期)}</div>` : ''}
            ${(item.知情者 || []).length ? `<div class="lx-preg-note">知情者：${(item.知情者 || []).map(k => escapeHtml(k.人物) + (k.程度 ? '·' + escapeHtml(k.程度) : '')).join('、')}</div>` : ''}
            ${item.备注 ? `<div class="lx-preg-note">${escapeHtml(item.备注)}</div>` : ''}
            <div class="lx-preg-note">${escapeHtml(pregnancyTip(item.孕月))}</div>
            <div style="text-align:right;margin-top:6px;"><button type="button" class="lx-mini-btn" data-action="preg-edit" data-idx="${index}">改</button></div>
        </div>`;
    }).join('');
    setPanel('孕事', html + '<div style="margin-top:10px;"><button type="button" class="lx-mini-btn" data-action="preg-add">+ 添加孕事</button></div>');
}

function pregnancyTip(month) {
    const m = toInt(month, 0);
    if (!m) return '尚未进入孕期。记录只作剧情参考，不是医学判断。';
    if (m <= 3) return '孕 1-3 月：最容易不稳，宜静养、避舟车与寒凉；知道的人通常还很少。';
    if (m <= 6) return '孕 4-6 月：开始显怀，安胎与饮食是重点；身边人可能逐渐察觉。';
    if (m <= 8) return '孕 7-8 月：需要备产、稳胎与安排产房；宫中眼线最容易在这时动手。';
    return '孕 9-10 月：临盆在即，产房、稳婆、太医与名分都要提前落定。';
}

async function saveHeirCycle(date) {
    const data = normalizeData(getGroupData() || {});
    data.子嗣 = normalizeHeir(data.子嗣, 0);
    data.子嗣.用户.月事自定义 = String(date || '').trim();
    data.子嗣.用户.月事来源 = date ? '手动' : '推演';
    if (!date) data.子嗣.用户.月事最近 = '';
    data.子嗣 = deriveMenstrualCycle(data.子嗣, data.时令);
    const tid = getLatestAssistantId();
    if (tid >= 0) await attachGroupData(tid, data);
    invalidateData();
    renderAll();
}

function displayPersonName(name) {
    const n = cleanName(name);
    if (!n) return '';
    return isLeadName(n) ? getUserDisplayName() : n;
}

function renderHeir(heir) {
    const data = normalizeHeir(heir, 0);
    const user = data.用户;
    const kids = data.子女.filter(item => textMatch(item.姓名, item.性别, item.身份, item.生母, item.亲缘, item.状态, item.备注));
    const userMatch = textMatch('{{user}}', user.受孕判定, user.状态, user.备注, user.月事最近, user.排卵期, ...(user.发现 || []).map(k => k.人物));
    const hasUser = user.内射次数 || user.孕期月 || (user.状态 && user.状态 !== '未孕') || user.受孕判定 !== '未定' || user.月事最近 || user.排卵期;
    if (!hasUser && !kids.length) {
        setPanel('子嗣', emptyText('尚无子嗣记录') + '<div class="lx-time-hint">开启子嗣模块后，生成一次才会开始记录 {{user}} 的孕事与子女。</div>');
        return;
    }

    let html = '';
    if (userMatch) {
        const known = user.发现 || [];
        html += `<div class="lx-heir-user">
            <div class="lx-heir-title">主线 · ${escapeHtml(getUserDisplayName())}</div>
            <div class="lx-cycle-editor">
                <span class="lx-cycle-label">月事起始</span>
                <select id="lx-cycle-date" class="lx-cycle-date">
                    ${(() => {
                        const gd = getGroupData() || {};
                        const month = toInt(gd.时令 && gd.时令.月, 1) || 1;
                        const picked = parseMonthDay(user.月事自定义 || user.月事最近);
                        const selectedDay = picked ? picked.day : 0;
                        return Array.from({ length: 30 }, (_, i) => i + 1).map(day =>
                            `<option value="${month}月${chineseDay(day)}" ${day === selectedDay ? 'selected' : ''}>${chineseNumber(month)}月${chineseDay(day)}</option>`
                        ).join('');
                    })()}
                </select>
                <button type="button" class="lx-mini-btn" data-action="cycle-save">保存</button>
                <button type="button" class="lx-mini-btn" data-action="cycle-clear">清除</button>
                <span class="lx-cycle-source">${user.月事自定义 ? '手动' : '推演'}</span>
            </div>
            <div class="lx-heir-stats">
                <div><span>累计次数</span><b>${user.内射次数 || 0}</b></div>
                <div><span>本回</span><b>${user.本回次数 ? '+' + user.本回次数 : '—'}</b></div>
                <div><span>受孕判定</span><b>${escapeHtml(user.受孕判定 || '未定')}</b></div>
                <div><span>孕期</span><b>${user.孕期月 ? user.孕期月 + ' 月' : '—'}</b></div>
            </div>
            <div class="lx-heir-status">${escapeHtml(user.状态 || '未孕')}</div>
            <div class="lx-heir-line"><b>月事</b>${escapeHtml(user.月事最近 || '未记')}${user.月事周期 ? `　周期 ${user.月事周期} 日` : ''}${user.月事持续 ? `　持续 ${user.月事持续} 日` : ''}</div>
            <div class="lx-heir-line"><b>排卵期</b>${escapeHtml(user.排卵期 || '未记')}${user.排卵可能 ? `　${escapeHtml(user.排卵可能)}` : ''}</div>
            <div class="lx-heir-line"><b>谁知道</b>${known.length ? known.map(k => `<span class="lx-secret-chip known">${escapeHtml(k.人物)}·${escapeHtml(k.程度)}</span>`).join('') : '<span class="lx-secret-none">尚未有人察觉</span>'}</div>
            ${user.备注 ? `<div class="lx-preg-note">${escapeHtml(user.备注)}</div>` : ''}
            <div class="lx-heir-tip">${escapeHtml(pregnancyTip(user.孕期月))}</div>
        </div>`;
    }

    if (kids.length) {
        html += `<div class="lx-npc-group-title">子女 · ${kids.length}</div>`;
        html += kids.map(item => `<div class="lx-heir-child">
            <div class="lx-heir-child-head"><span class="lx-heir-child-name">${escapeHtml(item.姓名)}</span><span class="lx-heir-child-title">${escapeHtml(item.身份 || (item.性别 === '女' ? '皇女' : '皇子'))}</span></div>
            <div class="lx-heir-line"><b>性别</b>${escapeHtml(item.性别)}　<b>生母</b>${escapeHtml(displayPersonName(item.生母) || '不详')}　<b>排行</b>${item.排行 ? '第' + item.排行 : '未序'}　<b>年龄</b>${item.年龄 !== undefined && item.年龄 !== null ? item.年龄 + '岁' : '待推'}</div>
            <div class="lx-heir-line"><b>亲缘</b>${escapeHtml(item.亲缘 || '不详')}　<b>出生</b>${escapeHtml(item.出生 || '未记')}　<b>状态</b>${escapeHtml(item.状态 || '在世')}</div>
            ${item.备注 ? `<div class="lx-preg-note">${escapeHtml(item.备注)}</div>` : ''}
        </div>`).join('');
    } else {
        html += '<div class="lx-empty" style="padding:14px 0;">尚无子女出生</div>';
    }
    setPanel('子嗣', html);
}

function updateModuleVisibility() {
    const s = getSettings();
    const visibility = {
        '孕事': s.pregnancyModule,
        '子嗣': s.heirModule,
        '奏折': s.memorialModule,
        '秘辛': s.secretModule,
        '时令': s.calendarModule,
        '斗争': s.struggleModule,
        '朝堂门阀': s.courtModule,
        '医疗健康': s.medicalModule
    };
    Object.entries(visibility).forEach(([name, visible]) => {
        ['tab', 'panel'].forEach(kind => {
            const map = kind === 'tab' ? state.refs.tabs : state.refs.panels;
            const el = map && map[name];
            if (el) el.classList.toggle('lx-module-hidden', !visible);
        });
        if (!visible && state.ui.tab === name) switchTab('NPC状态');
    });
}

function updateTabCounts(data) {
    const counts = {
        'NPC状态': Object.keys(data.NPC状态 || {}).length,
        'NPC事件': (data.NPC事件 || []).filter(e => getProgressNum(e) < 100).length,
        '国家事件': (data.国家事件 || []).filter(e => getProgressNum(e) < 100).length,
        '邻国事件': (data.邻国事件 || []).filter(e => getProgressNum(e) < 100).length,
        '奏折': (data.奏折 || []).filter(e => !['准奏', '驳回', '已结'].includes(e.状态)).length,
        '秘辛': (data.秘辛 || []).length,
        '流言': (data.流言 || []).length,
        '斗争': (data.斗争 || []).filter(e => getProgressNum(e) < 100).length,
        '朝堂门阀': ((data.朝堂门阀 && data.朝堂门阀.派系) || []).length + ((data.朝堂门阀 && data.朝堂门阀.家族) || []).length,
        '医疗健康': (data.医疗健康 || []).length,
        '书信': (data.书信 || []).length,
        '时令': data.时令 && (data.时令.月 || data.时令.节气 || data.时令.节日 || data.时令.礼仪) ? 1 : 0,
        '关系图': (data.关系 || []).length,
        '伏笔': (data.伏笔 || []).filter(f => !f.已回收).length,
        '孕事': (data.孕事 || []).filter(p => !p.已结束).length + (data.孕事子女 || []).length,
        '子嗣': (data.子嗣 && data.子嗣.子女 ? data.子嗣.子女.length : 0) + (data.子嗣 && data.子嗣.用户 && /有孕|临盆/.test(data.子嗣.用户.状态 || '') ? 1 : 0)
    };
    Object.entries(state.refs.tabs || {}).forEach(([name, tab]) => {
        const num = tab.querySelector('.lx-tab-num');
        if (num) num.textContent = counts[name] ? String(counts[name]) : '';
    });
}

function isInitialFillAvailable() {
    if (state.initialTried) return false;
    try { if (getGroupData()) return false; } catch (e) { /* ignore */ }
    try {
        const last = getLastMessageId();
        // 0 层也要能看到按钮；有些酒馆此时 last 是 -1，要用最新 AI 楼层兜底。
        if (last >= 0 && last > 3) return false;
        return getLatestAssistantId() >= 0;
    } catch (e) { return false; }
}

function updateInitialButton() {
    const btn = state.refs.initial;
    if (!btn) return;
    btn.classList.toggle('show', isInitialFillAvailable());
}

function renderAll() {
    if (!state.root) return;
    const data = getGroupData() || normalizeData({});
    renderNpc(data);
    renderEventList('NPC事件', data.NPC事件, '角色');
    renderEventList('国家事件', data.国家事件);
    renderEventList('邻国事件', data.邻国事件, '国家');
    renderMemorials(data.奏折);
    renderSecrets(data.秘辛);
    renderRumors(data.流言);
    renderStruggles(data.斗争);
    renderCourt(data.朝堂门阀);
    renderMedical(data.医疗健康);
    renderLetters(data.书信);
    renderCalendar(data);
    renderTimeline(data, getSettings().timelineRange);
    renderRelations(data.关系, getSettings().relationView);
    renderForeshadow(data.伏笔);
    renderPregnancy(data.孕事, data.孕事子女);
    renderHeir(data.子嗣);
    updateModuleVisibility();
    updateTabCounts(data);
    updateInitialButton();
}


/* ------------------------------------------------------------------ */
/* 设置面板                                                           */
/* ------------------------------------------------------------------ */

function radioRow(name, value, current, label) {
    const checked = current === value;
    return `<label class="lx-radio ${checked ? 'checked' : ''}"><input type="radio" name="${name}" value="${value}" ${checked ? 'checked' : ''}>${label}</label>`;
}

function checkRow(id, checked, label) {
    return `<label class="lx-radio ${checked ? 'checked' : ''}"><input type="checkbox" id="${id}" ${checked ? 'checked' : ''}>${label}</label>`;
}

function worldbookSettingsHTML() {
    if (state.worldbookLoading || !state.worldbookLoaded) return '<div class="lx-field-hint">正在读取当前角色卡绑定的世界书…</div>';
    const entries = state.worldbookEntryCache || [];
    if (!entries.length) return '<div class="lx-field-hint">当前角色卡没有绑定可读世界书，或酒馆世界书已关闭。</div>';
    return entries.slice(0, 80).map(entry => `<label class="lx-wb-item">
        <input type="checkbox" data-action="wb-toggle" data-wb-id="${escapeAttr(entry.id)}" ${isWorldbookEntryEnabled(entry.id) ? 'checked' : ''}>
        <span class="lx-wb-title">${escapeHtml(entry.title)}</span>
        <span class="lx-wb-book">${escapeHtml(entry.book)}</span>
        ${entry.keys.length ? `<span class="lx-wb-keys">${escapeHtml(entry.keys.join(' / '))}</span>` : ''}
        <span class="lx-wb-preview">${escapeHtml((entry.content || '').slice(0, 220))}</span>
    </label>`).join('');
}

function buildSettingsHTML() {
    const s = getSettings();
    const presets = getPresets();
    const presetNames = Object.keys(presets);
    const activePreset = presets[s.presetName] ? s.presetName : '正常';
    const currentContent = presets[activePreset] || '';
    const presetOptions = presetNames.map(name =>
        `<option value="${escapeAttr(name)}" ${name === activePreset ? 'selected' : ''}>${escapeHtml(name)}</option>`
    ).join('');
    const apiProfileOptions = (s.apiProfiles || []).map(item =>
        `<option value="${escapeAttr(item.id)}" ${item.id === s.apiProfileId ? 'selected' : ''}>${escapeHtml(item.name)} · ${escapeHtml(item.model || '未填模型')}</option>`
    ).join('');
    const ballStyleItems = [
        ['compass', '罗盘'], ['lantern', '宫灯'], ['seal', '玉玺'], ['mirror', '铜镜'], ['bamboo', '竹简']
    ].map(([key, label]) => `
        <div class="lx-ball-style-item ${s.ballStyle === key ? 'active' : ''}" data-action="ball-style" data-style="${key}">
            <span class="lx-ball-thumb thumb-${key}"></span>${label}
        </div>
    `).join('');
    const themeItems = Object.keys(THEMES).map(key => `
        <div class="lx-theme-item ${s.theme === key ? 'active' : ''}" data-action="theme" data-theme="${key}">
            <div class="lx-theme-swatch" style="background:${THEMES[key].solid};border:2px solid ${THEMES[key].gold};"></div>
            <div>${escapeHtml(THEMES[key].name)}</div>
        </div>
    `).join('');

    return `
    <div class="lx-header">
        <span class="lx-title">群 像 设 置</span>
        <button type="button" class="lx-icon-btn" data-action="cancel-settings" aria-label="关闭">×</button>
    </div>
    <div class="lx-settings-tabs" role="tablist">
        <div class="lx-settings-tab ${state.ui.settingsTab === 'basic' ? 'active' : ''}" role="tab" data-stab="basic">基本设置</div>
        <div class="lx-settings-tab ${state.ui.settingsTab === 'api' ? 'active' : ''}" role="tab" data-stab="api">API</div>
        <div class="lx-settings-tab ${state.ui.settingsTab === 'appearance' ? 'active' : ''}" role="tab" data-stab="appearance">外观</div>
        <div class="lx-settings-tab ${state.ui.settingsTab === 'prompt' ? 'active' : ''}" role="tab" data-stab="prompt">提示词</div>
    </div>
    <div class="lx-settings-body">
        <div class="lx-settings-panel ${state.ui.settingsTab === 'basic' ? 'active' : ''}" data-spanel="basic">
            <div class="lx-field">
                <label class="lx-field-label">启用群像系统</label>
                <div class="lx-radio-group">
                    ${radioRow('lx-enabled', 'true', s.enabled ? 'true' : 'false', '启用')}
                    ${radioRow('lx-enabled', 'false', s.enabled ? 'true' : 'false', '关闭')}
                </div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">生成方式</label>
                <div class="lx-radio-group">
                    ${radioRow('lx-mode', 'main', s.mode, '主 API')}
                    ${radioRow('lx-mode', 'sub', s.mode, '副 API')}
                </div>
                <div class="lx-field-hint">两种模式都不改正文、不写标签。主 API：用酒馆当前 API/模型再发一次静默请求（会额外计费）；副 API：在「API」页填写地址/模型，可保存多套并切换。想省钱可把触发时机改成“手动”。</div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">触发时机（副 API 有效）</label>
                <div class="lx-radio-group">
                    ${radioRow('lx-trigger', 'auto', s.trigger, '自动')}
                    ${radioRow('lx-trigger', 'manual', s.trigger, '手动')}
                </div>
            </div>

            <div class="lx-field">
                <label class="lx-field-label">开局补全</label>
                <div class="lx-radio-group">
                    ${radioRow('lx-initial', 'auto', s.initialFill, '自动补全')}
                    ${radioRow('lx-initial', 'manual', s.initialFill, '手动补全')}
                </div>
                <div class="lx-field-hint">第一次对话时自动读取开局上下文补一次；手动则在标题右侧出现「补全」按钮，只在第一条消息附近显示。</div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">世界书注入</label>
                <select id="lx-worldbook-mode" class="lx-select">
                    <option value="follow" ${s.worldbookMode === 'follow' ? 'selected' : ''}>跟随酒馆世界书开关（默认）</option>
                    <option value="on" ${s.worldbookMode === 'on' ? 'selected' : ''}>强制读取当前角色卡世界书</option>
                    <option value="off" ${s.worldbookMode === 'off' ? 'selected' : ''}>关闭世界书注入</option>
                </select>
                <div class="lx-field-hint">只读取当前角色卡绑定的世界书，不读全局；跟随酒馆时，酒馆世界书关闭则不注入。</div>
                <div class="lx-wb-list">${worldbookSettingsHTML()}</div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">提示词预览</label>
                <div class="lx-inline">
                    <button type="button" class="lx-mini-btn" data-action="prompt-preview">群像补全提示词（只读）</button>
                    <button type="button" class="lx-mini-btn" data-action="injection-preview">正文注入预览（会影响正文）</button>
                    <button type="button" class="lx-mini-btn" data-action="data-edit">编辑当前数据</button>
                </div>
                <div class="lx-field-hint">补全提示词只发给群像生成器，不写进正文；正文注入会作为上下文发给主模型，影响正文但不会写入正文。</div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">温度</label>
                <div class="lx-range-row">
                    <input class="lx-range" id="lx-temp" type="range" min="0" max="1.5" step="0.1" value="${s.temperature}">
                    <span class="lx-range-val" id="lx-temp-val">${s.temperature}</span>
                </div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">最大 tokens</label>
                <div class="lx-range-row">
                    <input class="lx-range" id="lx-maxtok" type="range" min="200" max="6000" step="100" value="${s.maxTokens}">
                    <span class="lx-range-val" id="lx-maxtok-val">${s.maxTokens}</span>
                </div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">调试模式</label>
                <div class="lx-radio-group">
                    ${radioRow('lx-debug', 'true', s.debug ? 'true' : 'false', '开启')}
                    ${radioRow('lx-debug', 'false', s.debug ? 'true' : 'false', '关闭')}
                </div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">主线人物分组</label>
                <div class="lx-radio-group">
                    ${checkRow('lx-lead-group', s.leadGroup, '李承璟 / {{user}} 单独分组')}
                </div>
                <div class="lx-field-hint">开启后 NPC 状态页先显示主线人物，再显示群像人物；关闭则全部混在一起。</div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">扩展模块</label>
                <div class="lx-radio-group">
                    ${checkRow('lx-memorial-module', s.memorialModule, '朝堂奏折')}
                    ${checkRow('lx-secret-module', s.secretModule, '秘辛 / 把柄')}
                    ${checkRow('lx-calendar-module', s.calendarModule, '时令日历')}
                    ${checkRow('lx-struggle-module', s.struggleModule, '宫斗 / 政斗')}
                    ${checkRow('lx-court-module', s.courtModule, '朝堂门阀')}
                    ${checkRow('lx-medical-module', s.medicalModule, '医疗健康')}
                </div>
                <div class="lx-field-hint">关闭后对应页签隐藏，提示词也会要求本回不输出该模块。</div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">后妃孕事模块</label>
                <div class="lx-radio-group">
                    ${checkRow('lx-preg-module', s.pregnancyModule, '开启孕事页签与推演')}
                </div>
                <div class="lx-field-hint">默认关闭。开启后多一个「孕事」页签，记录后妃的有孕月份、状态，以及后妃所出的子女（孕事子女）。</div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">子嗣模块</label>
                <div class="lx-radio-group">
                    ${checkRow('lx-heir-module', s.heirModule, '开启 {{user}} 孕事与子女记录')}
                </div>
                <div class="lx-field-hint">记录 {{user}} 的累计次数、受孕判定、孕期、月事、排卵期、谁知道，以及出生后的子女性别/身份/亲缘/排行；默认关闭。</div>
            </div>
            <details class="lx-fold">
                <summary>注入范围（AI 可见）</summary>
                <div class="lx-fold-body">
                    <div class="lx-radio-group">
                        ${checkRow('lx-inj-events', s.injectEvents, '进行中事件')}
                        ${checkRow('lx-inj-npc', s.injectNpc, 'NPC 状态')}
                        ${checkRow('lx-inj-rumors', s.injectRumors, '流言')}
                        ${checkRow('lx-inj-letters', s.injectLetters, '书信')}
                        ${checkRow('lx-inj-fp', s.injectForeshadow, '未回收伏笔')}
                        ${checkRow('lx-inj-rel', s.injectRelations, '关系')}
                        ${checkRow('lx-inj-timeline', s.injectTimeline, '时间线')}
                        ${checkRow('lx-inj-preg', s.injectPregnancy, '孕事 / 孕事子女')}
                        ${checkRow('lx-inj-heir', s.injectHeir, '子嗣')}
                        ${checkRow('lx-inj-court', s.injectCourt, '朝堂门阀')}
                        ${checkRow('lx-inj-medical', s.injectMedical, '医疗健康')}
                        ${checkRow('lx-inj-secrets', s.injectSecrets, '秘辛')}
                    </div>
                    <div class="lx-field-hint" style="margin-top:8px;">注入越多，主模型越容易延续暗线，但也会占上下文。</div>
                </div>
            </details>
            <details class="lx-fold" ${s.debug ? 'open' : ''}>
                <summary>调试日志</summary>
                <div class="lx-fold-body">
                    <div class="lx-inline" style="justify-content:flex-end;margin-bottom:7px;">
                        <button type="button" class="lx-mini-btn" data-action="log-copy">复制</button>
                        <button type="button" class="lx-mini-btn" data-action="log-clear">清空</button>
                    </div>
                    <div class="lx-debug-log" id="lx-debug-content">${renderDebugLogs()}</div>
                </div>
            </details>
        </div>

        <div class="lx-settings-panel ${state.ui.settingsTab === 'api' ? 'active' : ''}" data-spanel="api">
            <div class="lx-field">
                <label class="lx-field-label">已保存的 API 配置</label>
                <div class="lx-inline">
                    <select class="lx-select" id="lx-api-profile">
                        <option value="">当前配置（未保存）</option>
                        ${apiProfileOptions}
                    </select>
                    <button type="button" class="lx-mini-btn" data-action="api-switch">切换</button>
                    <button type="button" class="lx-mini-btn" data-action="api-del">删除</button>
                </div>
                <div class="lx-inline" style="margin-top:6px;">
                    <input class="lx-input" id="lx-api-profile-name" type="text" placeholder="给当前 API 起个名字">
                    <button type="button" class="lx-mini-btn" data-action="api-save">保存当前</button>
                </div>
                <div class="lx-field-hint">保存会记住地址、密钥、模型；之后可一键切换。只存本机全局变量。</div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">副 API 地址</label>
                <input class="lx-input" id="lx-api-url" type="text" placeholder="https://api.example.com/v1" value="${escapeAttr(s.subApiUrl)}">
                <div class="lx-field-hint">留空则使用酒馆当前 API；填写后仅群像生成走这个地址。</div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">副 API 密钥</label>
                <div class="lx-inline">
                    <input class="lx-input" id="lx-api-key" type="password" placeholder="sk-..." value="${escapeAttr(s.subApiKey)}">
                    <button type="button" class="lx-mini-btn" data-action="toggle-key">显示</button>
                </div>
                <div class="lx-field-hint">保存在全局变量里，只存在本机；请勿在公共设备上填写。</div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">副 API 模型</label>
                <div class="lx-inline">
                    <input class="lx-input" id="lx-api-model" type="text" placeholder="可手填或拉取" value="${escapeAttr(s.subApiModel)}">
                    <button type="button" class="lx-mini-btn" data-action="fetch-models">拉取</button>
                </div>
                <select class="lx-select" id="lx-model-list" style="margin-top:6px;display:none;"></select>
            </div>
        </div>

        <div class="lx-settings-panel ${state.ui.settingsTab === 'appearance' ? 'active' : ''}" data-spanel="appearance">
            <div class="lx-field">
                <label class="lx-field-label">配色方案</label>
                <div class="lx-theme-grid">${themeItems}</div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">面板背景图</label>
                <div class="lx-inline">
                    <label class="lx-mini-btn" style="cursor:pointer;">上传背景
                        <input type="file" id="lx-panel-file" accept="image/*" style="display:none;">
                    </label>
                    <button type="button" class="lx-mini-btn" data-action="panel-image-reset">恢复主题背景</button>
                </div>
                <div class="lx-field-hint">支持 PNG/JPG/WebP，只存本机；会叠在主题色之上，文字仍可读。</div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">悬浮球外观</label>
                <div class="lx-ball-style-grid">${ballStyleItems}</div>
                <div class="lx-field-hint">五种完全不同的轮廓；上传图片后会优先显示你的图片。</div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">悬浮球大小</label>
                <div class="lx-range-row">
                    <input class="lx-range" id="lx-ball-size" type="range" min="36" max="84" step="1" value="${s.ballSize}">
                    <span class="lx-range-val" id="lx-ball-size-val">${s.ballSize}px</span>
                </div>
                <div class="lx-field-hint">手机端拖动到左右边缘会自动吸附；大小立即预览。</div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">悬浮球图片</label>
                <div class="lx-inline">
                    <label class="lx-mini-btn" style="cursor:pointer;">上传图片
                        <input type="file" id="lx-ball-file" accept="image/*" style="display:none;">
                    </label>
                    <button type="button" class="lx-mini-btn" data-action="ball-image-reset">恢复默认</button>
                </div>
                <div class="lx-field-hint">支持 PNG/JPG/GIF/WebP，建议正方形；图片只保存在本机。</div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">关系图样式</label>
                <div class="lx-radio-group">
                    ${radioRow('lx-relview', 'card', s.relationView, '卡片')}
                    ${radioRow('lx-relview', 'graph', s.relationView, '关系图')}
                </div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">时间线范围（回合）</label>
                <div class="lx-inline">
                    <input class="lx-input" id="lx-timeline-range" type="number" min="0" max="9999" value="${s.timelineRange}">
                    <span style="color:var(--lx-dim);font-size:11px;white-space:nowrap;">0 = 全部</span>
                </div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">伏笔来源</label>
                <div class="lx-radio-group">
                    ${checkRow('lx-fp-ai', s.foreshadowAi, 'AI 自动标记')}
                    ${checkRow('lx-fp-user', s.foreshadowUser, '允许手动标记')}
                </div>
            </div>
        </div>

        <div class="lx-settings-panel ${state.ui.settingsTab === 'prompt' ? 'active' : ''}" data-spanel="prompt">
            <div class="lx-field">
                <label class="lx-field-label">提示词预设</label>
                <div class="lx-preset-row">
                    <select class="lx-select" id="lx-preset-select">${presetOptions}</select>
                    <button type="button" class="lx-mini-btn" data-action="preset-save">另存</button>
                    <button type="button" class="lx-mini-btn" data-action="preset-del">删除</button>
                    <button type="button" class="lx-mini-btn" data-action="preset-reset">重置</button>
                </div>
                <textarea class="lx-textarea" id="lx-preset-content" spellcheck="false">${escapeHtml(currentContent)}</textarea>
                <div class="lx-field-hint">这里只写推演规则与 JSON 结构。正文不会出现标签，群像数据只存楼层 data。</div>
            </div>
        </div>
    </div>
    <div class="lx-footer">
        <button type="button" class="lx-btn" data-action="save-settings">保 存</button>
        <button type="button" class="lx-btn danger" data-action="reset-all">重 置</button>
        <button type="button" class="lx-btn" data-action="cancel-settings">取 消</button>
    </div>`;
}

async function refreshWorldbookEntries(force) {
    if (state.worldbookLoading) return;
    if (state.worldbookLoaded && !force) return;
    if (force) {
        state.worldbookLoaded = false;
        state.worldbookEntryCache = [];
    }
    const entries = await loadWorldbookEntries();
    state.worldbookEntryCache = entries;
    state.worldbookLoaded = true;
    if (state.ui.settingsOpen) openSettings();
}

function openSettings() {
    if (!state.refs.settings) return;
    state.refs.settings.innerHTML = buildSettingsHTML();
    syncViewportVars();
    state.refs.settings.classList.add('show');
    state.refs.settings.tabIndex = -1;
    state.ui.settingsOpen = true;
    applyTheme();
    syncBodyLock();
    refreshWorldbookEntries();
    try { state.refs.settings.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
}

function closeSettings() {
    if (!state.refs.settings) return;
    state.refs.settings.classList.remove('show');
    state.ui.settingsOpen = false;
    syncBodyLock();
}

function openPanel() {
    if (!state.refs.panel) return;
    renderAll();
    applyTheme();
    syncViewportVars();
    state.refs.mask.classList.add('show');
    state.refs.panel.classList.add('show');
    state.refs.panel.tabIndex = -1;
    if (state.refs.ball) state.refs.ball.classList.add('is-hidden');
    state.ui.panelOpen = true;
    clearNewData();
    syncBodyLock();
    try { state.refs.panel.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
}

function closeAll() {
    if (state.refs.mask) state.refs.mask.classList.remove('show');
    if (state.refs.panel) state.refs.panel.classList.remove('show');
    if (state.refs.settings) state.refs.settings.classList.remove('show');
    if (state.refs.ball) state.refs.ball.classList.remove('is-hidden');
    state.ui.panelOpen = false;
    state.ui.settingsOpen = false;
    syncBodyLock();
    try { if (state.refs.ball) state.refs.ball.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
}

function switchTab(tabName) {
    const tab = state.refs.tabs[tabName];
    const panel = state.refs.panels[tabName];
    if (!tab || !panel) return;
    state.ui.tab = tabName;
    Object.values(state.refs.tabs).forEach(el => {
        const active = el === tab;
        el.classList.toggle('active', active);
        el.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    Object.values(state.refs.panels).forEach(el => el.classList.toggle('active', el === panel));
    try { tab.scrollIntoView({ block: 'nearest' }); } catch (e) { /* ignore */ }
}

function switchSettingsTab(tabName) {
    state.ui.settingsTab = tabName;
    if (!state.refs.settings) return;
    state.refs.settings.querySelectorAll('.lx-settings-tab').forEach(el => {
        el.classList.toggle('active', el.dataset.stab === tabName);
    });
    state.refs.settings.querySelectorAll('.lx-settings-panel').forEach(el => {
        el.classList.toggle('active', el.dataset.spanel === tabName);
    });
}

function syncBodyLock() {
    const shouldLock = state.ui.panelOpen || state.ui.settingsOpen;
    if (shouldLock === state.ui.locked) return;
    const doc = state.doc || getDoc();
    try {
        if (shouldLock) {
            state.ui.prevOverflow = doc.body.style.overflow;
            state.ui.prevOverscroll = doc.documentElement.style.overscrollBehavior;
            doc.body.style.overflow = 'hidden';
            doc.documentElement.style.overscrollBehavior = 'none';
            state.ui.locked = true;
        } else {
            doc.body.style.overflow = state.ui.prevOverflow || '';
            doc.documentElement.style.overscrollBehavior = state.ui.prevOverscroll || '';
            state.ui.locked = false;
        }
    } catch (e) {
        state.ui.locked = shouldLock;
    }
}

function setBusyUI(busy) {
    if (!state.refs.panel) return;
    state.refs.panel.classList.toggle('lx-busy', !!busy);
    state.refs.panel.querySelectorAll('.lx-footer button').forEach(button => {
        button.disabled = !!busy;
    });
}

/* ------------------------------------------------------------------ */
/* 设置保存与 API 拉取                                                */
/* ------------------------------------------------------------------ */

function saveSettingsFromForm() {
    const root = state.refs.settings;
    if (!root) return;
    const q = selector => root.querySelector(selector);
    const val = selector => {
        const el = q(selector);
        return el ? el.value : '';
    };
    const checked = selector => {
        const el = q(selector);
        return !!(el && el.checked);
    };
    const radio = selector => {
        const el = q(selector + ':checked');
        return el ? el.value : '';
    };

    const presetName = val('#lx-preset-select') || '正常';
    const presetContent = val('#lx-preset-content');
    if (presetContent.trim()) savePreset(presetName, presetContent);

    saveSettings({
        enabled: radio('input[name="lx-enabled"]') !== 'false',
        mode: radio('input[name="lx-mode"]') === 'sub' ? 'sub' : 'main',
        trigger: radio('input[name="lx-trigger"]') === 'manual' ? 'manual' : 'auto',
        initialFill: radio('input[name="lx-initial"]') === 'manual' ? 'manual' : 'auto',
        worldbookMode: ['follow', 'on', 'off'].includes(val('#lx-worldbook-mode')) ? val('#lx-worldbook-mode') : 'follow',
        presetName,
        subApiUrl: val('#lx-api-url').trim(),
        subApiKey: val('#lx-api-key').trim(),
        subApiModel: val('#lx-api-model').trim(),
        temperature: clamp(Number(val('#lx-temp')) || 0, 0, 2),
        maxTokens: clamp(toInt(val('#lx-maxtok'), 3200), 200, 8000),
        debug: radio('input[name="lx-debug"]') === 'true',
        injectEvents: checked('#lx-inj-events'),
        injectNpc: checked('#lx-inj-npc'),
        injectRumors: checked('#lx-inj-rumors'),
        injectLetters: checked('#lx-inj-letters'),
        injectForeshadow: checked('#lx-inj-fp'),
        injectRelations: checked('#lx-inj-rel'),
        injectTimeline: checked('#lx-inj-timeline'),
        injectPregnancy: checked('#lx-inj-preg'),
        injectHeir: checked('#lx-inj-heir'),
        injectCourt: checked('#lx-inj-court'),
        injectMedical: checked('#lx-inj-medical'),
        injectSecrets: checked('#lx-inj-secrets'),
        leadGroup: checked('#lx-lead-group'),
        memorialModule: checked('#lx-memorial-module'),
        secretModule: checked('#lx-secret-module'),
        calendarModule: checked('#lx-calendar-module'),
        struggleModule: checked('#lx-struggle-module'),
        courtModule: checked('#lx-court-module'),
        medicalModule: checked('#lx-medical-module'),
        ballSize: clamp(toInt(val('#lx-ball-size'), 50), 36, 84),
        pregnancyModule: checked('#lx-preg-module'),
        heirModule: checked('#lx-heir-module'),
        relationView: radio('input[name="lx-relview"]') === 'graph' ? 'graph' : 'card',
        timelineRange: clamp(toInt(val('#lx-timeline-range'), 20), 0, 9999),
        foreshadowAi: checked('#lx-fp-ai'),
        foreshadowUser: checked('#lx-fp-user')
    });

    setupInjection();
    applyTheme();
    renderAll();
    closeSettings();
    toast('success', '设置已保存');
}

async function fetchModelsFromForm() {
    const root = state.refs.settings;
    if (!root) return;
    const url = root.querySelector('#lx-api-url').value.trim();
    const key = root.querySelector('#lx-api-key').value.trim();
    if (!url) { toast('warning', '请先填写副 API 地址'); return; }
    const button = root.querySelector('[data-action="fetch-models"]');
    if (button) button.disabled = true;
    toast('info', '拉取模型中…');
    try {
        const list = await getModelList({ apiurl: url, key });
        if (!Array.isArray(list) || !list.length) { toast('error', '没有获取到模型'); return; }
        const names = list.map(item => {
            if (typeof item === 'string') return item;
            if (item && (item.id || item.name)) return String(item.id || item.name);
            return String(item);
        }).filter(Boolean);
        if (!names.length) { toast('error', '没有可用的模型名'); return; }
        const select = root.querySelector('#lx-model-list');
        select.innerHTML = names.map(name => `<option value="${escapeAttr(name)}">${escapeHtml(name)}</option>`).join('');
        select.style.display = 'block';
        select.onchange = () => { root.querySelector('#lx-api-model').value = select.value; };
        root.querySelector('#lx-api-model').value = names[0];
        toast('success', `获取 ${names.length} 个模型`);
    } catch (e) {
        toast('error', '拉取失败：' + (e && e.message ? e.message : e));
    } finally {
        if (button) button.disabled = false;
    }
}

async function copyLogs() {
    const logs = getLogs();
    const text = logs.map(log =>
        `[${log.时间 || ''}] #${log.消息ID || ''} ${log.模式 || ''} | ${log.标签 || ''} | ${log.结果 || ''}\n${log.原始 || ''}`
    ).join('\n\n');
    if (!text) { toast('warning', '暂无日志'); return; }
    try {
        const nav = (state.win || getWin()).navigator;
        if (nav && nav.clipboard && nav.clipboard.writeText) {
            await nav.clipboard.writeText(text);
            toast('success', '已复制');
            return;
        }
    } catch (e) { /* fallback */ }
    try {
        const doc = state.doc || getDoc();
        const textarea = doc.createElement('textarea');
        textarea.value = text;
        textarea.style.cssText = 'position:fixed;left:-9999px;top:0;';
        doc.body.appendChild(textarea);
        textarea.select();
        doc.execCommand('copy');
        textarea.remove();
        toast('success', '已复制');
    } catch (e) {
        toast('error', '复制失败');
    }
}

/* ------------------------------------------------------------------ */
/* 手动编辑                                                           */
/* ------------------------------------------------------------------ */

function ask(message, defaultValue) {
    try { return (state.win || getWin()).prompt(message, defaultValue); } catch (e) { return null; }
}

function askConfirm(message) {
    try { return (state.win || getWin()).confirm(message); } catch (e) { return false; }
}

async function writeNewLetter() {
    const data = getGroupData() || normalizeData({});
    const npcs = Object.keys(data.NPC状态 || {}).filter(name => !isBlacklisted(name));
    const existing = (data.书信 || []).map(item => item.方向 === '发' ? item.去向 : item.来源).filter(Boolean).filter(name => !isBlacklisted(name));
    const candidates = Array.from(new Set([CHARACTER_NAME, ...npcs, ...existing]));
    const hint = candidates.length ? `（可选：${candidates.slice(0, 6).join('、')}…）` : '';
    const to = ask(`致谁？${hint}`);
    if (!to || !to.trim()) return;
    const content = ask(`致 ${to.trim()}：`);
    if (!content || !content.trim()) return;
    data.书信 = Array.isArray(data.书信) ? data.书信 : [];
    data.书信.push({
        方向: '发',
        去向: to.trim().slice(0, 40),
        内容: content.trim().slice(0, 800),
        回合: data.最后更新回合 || 0
    });
    const tid = getLatestAssistantId();
    if (tid < 0) { toast('error', '还没有 AI 消息'); return; }
    await attachGroupData(tid, data);
    renderAll();
    toast('success', '已发出');
}

async function replyLetter(idx) {
    const data = getGroupData() || normalizeData({});
    const letters = Array.isArray(data.书信) ? data.书信 : [];
    const letter = letters[idx];
    if (!letter) return;
    const content = ask(`回信给 ${letter.来源 || '佚名'}：`);
    if (!content || !content.trim()) return;
    letters.push({
        方向: '发',
        去向: letter.来源 || '佚名',
        内容: content.trim().slice(0, 800),
        回合: data.最后更新回合 || 0
    });
    data.书信 = letters;
    const tid = getLatestAssistantId();
    if (tid < 0) return;
    await attachGroupData(tid, data);
    renderAll();
    toast('success', '已发出');
}

async function deleteLetter(idx) {
    const data = getGroupData() || normalizeData({});
    const letters = Array.isArray(data.书信) ? data.书信 : [];
    if (!letters[idx]) return;
    if (!askConfirm('删除这封去信？')) return;
    letters.splice(idx, 1);
    data.书信 = letters;
    const tid = getLatestAssistantId();
    if (tid < 0) return;
    await attachGroupData(tid, data);
    renderAll();
    toast('success', '已删除');
}

async function editRelation(idx) {
    const data = getGroupData() || normalizeData({});
    const list = Array.isArray(data.关系) ? data.关系 : [];
    const relation = list[idx];
    if (!relation) return;
    const value = ask(`${relation.甲} ↔ ${relation.乙} 的关系：`, relation.关系 || '');
    if (value === null) return;
    relation.关系 = value.trim().slice(0, 40);
    data.关系 = list;
    const tid = getLatestAssistantId();
    if (tid < 0) return;
    await attachGroupData(tid, data);
    renderAll();
}

async function addRelation() {
    const data = getGroupData() || normalizeData({});
    const a = ask('甲：');
    if (!a || !a.trim()) return;
    if (isBlacklisted(a.trim())) { toast('warning', '该名称被禁用'); return; }
    const b = ask('乙：');
    if (!b || !b.trim()) return;
    if (isBlacklisted(b.trim())) { toast('warning', '该名称被禁用'); return; }
    const value = ask('关系：', '相识');
    data.关系 = Array.isArray(data.关系) ? data.关系 : [];
    data.关系.push({ 甲: a.trim().slice(0, 40), 乙: b.trim().slice(0, 40), 关系: String(value || '').trim().slice(0, 40) });
    const tid = getLatestAssistantId();
    if (tid < 0) return;
    await attachGroupData(tid, data);
    renderAll();
}

async function toggleForeshadow(idx) {
    const data = getGroupData() || normalizeData({});
    const list = Array.isArray(data.伏笔) ? data.伏笔 : [];
    if (!list[idx]) return;
    list[idx].已回收 = !list[idx].已回收;
    list[idx].回收回合 = list[idx].已回收 ? Math.max(1, toInt(data.最后更新回合, 1)) : 0;
    data.伏笔 = list;
    const tid = getLatestAssistantId();
    if (tid < 0) return;
    await attachGroupData(tid, data);
    renderAll();
}

async function setMemorialStatus(title, status) {
    const data = getGroupData() || normalizeData({});
    const item = (data.奏折 || []).find(row => row.标题 === title);
    if (!item) return;
    item.状态 = status || '待议';
    item.更新回合 = Math.max(1, toInt(data.最后更新回合, 1));
    if (['准奏', '驳回', '已结'].includes(item.状态)) item.进度 = 100;
    if (!item.结果) {
        if (item.状态 === '准奏') item.结果 = '已准奏，进入执行。';
        else if (item.状态 === '驳回') item.结果 = '已驳回，原议作罢。';
        else if (item.状态 === '留中') item.结果 = '留中不发，暂不处置。';
    }
    const tid = getLatestAssistantId();
    if (tid < 0) return;
    await attachGroupData(tid, data);
    renderAll();
    toast('success', '奏折状态：' + item.状态);
}

async function autoRecoverForeshadow() {
    const data = getGroupData() || normalizeData({});
    const before = (data.伏笔 || []).filter(item => !item.已回收).length;
    data.伏笔 = recoverForeshadows(
        Array.isArray(data.伏笔) ? data.伏笔 : [],
        []
            .concat(data.NPC事件 || [], data.国家事件 || [], data.邻国事件 || []),
        Math.max(1, toInt(data.最后更新回合, 1))
    );
    const after = (data.伏笔 || []).filter(item => !item.已回收).length;
    const tid = getLatestAssistantId();
    if (tid < 0) return;
    await attachGroupData(tid, data);
    renderAll();
    toast(after === before ? 'info' : 'success', after === before ? '没有匹配到已完成事件' : `已回收 ${before - after} 条`);
}

async function addForeshadow() {
    const data = getGroupData() || normalizeData({});
    const content = ask('伏笔内容：');
    if (!content || !content.trim()) return;
    data.伏笔 = Array.isArray(data.伏笔) ? data.伏笔 : [];
    const key = foreshadowKey(content);
    if (data.伏笔.some(item => foreshadowKey(item.内容) === key)) {
        toast('warning', '这条伏笔已经存在');
        return;
    }
    data.伏笔.push({
        回合: data.最后更新回合 || 0,
        内容: content.trim().slice(0, 400),
        来源: '手动',
        已回收: false
    });
    const tid = getLatestAssistantId();
    if (tid < 0) return;
    await attachGroupData(tid, data);
    renderAll();
}

async function editPregnancy(idx) {
    const data = getGroupData() || normalizeData({});
    const list = Array.isArray(data.孕事) ? data.孕事 : [];
    const item = list[idx];
    if (!item) return;
    const month = ask(`${item.人物} 孕几月？（0=不详）`, String(item.孕月 || 0));
    if (month === null) return;
    const status = ask('状态（稳定/不稳/临盆/小产/已生产）', item.状态 || '稳定');
    if (status === null) return;
    const note = ask('备注（可空）', item.备注 || '');
    if (note === null) return;
    item.孕月 = clamp(toInt(month, 0), 0, 10);
    item.状态 = status.trim().slice(0, 30);
    item.备注 = note.trim().slice(0, 160);
    item.已结束 = /(已生产|小产|流产|结束|诞下|难产)/.test(item.状态);
    const tid = getLatestAssistantId();
    if (tid < 0) return;
    await attachGroupData(tid, data);
    renderAll();
}

async function addPregnancy() {
    const data = getGroupData() || normalizeData({});
    const person = ask('人物：');
    if (!person || !person.trim() || isBlacklisted(person.trim())) { if (person) toast('warning', '该名称被禁用'); return; }
    const month = ask('孕几月？（1-10）', '1');
    if (month === null) return;
    const status = ask('状态', '稳定');
    if (status === null) return;
    data.孕事 = Array.isArray(data.孕事) ? data.孕事 : [];
    data.孕事.push({
        人物: person.trim().slice(0, 40),
        孕月: clamp(toInt(month, 1), 1, 10),
        状态: (status || '稳定').trim().slice(0, 30),
        备注: '',
        已结束: /(已生产|小产|流产|结束|诞下|难产)/.test(status || ''),
        回合: data.最后更新回合 || 0
    });
    const tid = getLatestAssistantId();
    if (tid < 0) return;
    await attachGroupData(tid, data);
    renderAll();
}

function resetAllSettings() {
    if (!askConfirm('确定重置所有设置吗？')) return;
    if (!askConfirm('再确认一次：设置和自定义预设会恢复默认；API 地址/密钥/模型保留，群像数据不清空。')) return;
    const s = getSettings();
    const reset = normalizeSettings(Object.assign({}, DEFAULT_SETTINGS, {
        subApiUrl: s.subApiUrl,
        subApiKey: s.subApiKey,
        subApiModel: s.subApiModel,
        apiProfiles: s.apiProfiles,
        apiProfileId: s.apiProfileId
    }));
    state.settings = reset;
    state.searchQuery = '';
    const searchInput = state.shadow && state.shadow.querySelector('#lx-search-input');
    if (searchInput) searchInput.value = '';
    try {
        updateVariablesWith(vars => {
            vars.群像设置 = reset;
            delete vars.群像预设;
            vars.群像调试 = [];
            return vars;
        }, { type: 'global' });
    } catch (e) {
        console.warn('[群像志] 重置失败', e);
    }
    closeSettings();
    setupInjection(true);
    applyTheme();
    renderAll();
    toast('success', '已重置；API 配置保留');
}

function readApiForm() {
    const root = state.refs.settings;
    if (!root) return { url: '', key: '', model: '' };
    const val = selector => {
        const el = root.querySelector(selector);
        return el ? el.value.trim() : '';
    };
    return { url: val('#lx-api-url'), key: val('#lx-api-key'), model: val('#lx-api-model') };
}

function saveApiProfile() {
    const root = state.refs.settings;
    if (!root) return;
    const data = readApiForm();
    if (!data.url || !data.model) { toast('warning', '至少填写地址和模型'); return; }
    const nameInput = root.querySelector('#lx-api-profile-name');
    const name = (nameInput && nameInput.value.trim()) || ask('给这套 API 起个名字：');
    if (!name || !name.trim()) return;
    const s = getSettings();
    const profiles = (s.apiProfiles || []).slice();
    const existing = profiles.find(item => item.name === name.trim());
    const id = existing ? existing.id : 'api_' + hashString(name.trim() + '|' + data.url + '|' + Date.now());
    const record = { id, name: name.trim().slice(0, 30), url: data.url, key: data.key, model: data.model };
    if (existing) Object.assign(existing, record);
    else profiles.push(record);
    saveSettings({ mode: 'sub', apiProfiles: profiles, apiProfileId: id, subApiUrl: data.url, subApiKey: data.key, subApiModel: data.model });
    openSettings();
    toast('success', 'API 配置已保存');
}

function switchApiProfile() {
    const root = state.refs.settings;
    if (!root) return;
    const select = root.querySelector('#lx-api-profile');
    const id = select ? select.value : '';
    const profile = (getSettings().apiProfiles || []).find(item => item.id === id);
    if (!profile) { toast('warning', '先选择一个已保存的配置'); return; }
    saveSettings({
        mode: 'sub',
        apiProfileId: profile.id,
        subApiUrl: profile.url,
        subApiKey: profile.key,
        subApiModel: profile.model
    });
    openSettings();
    toast('success', '已切换：' + profile.name);
}

function deleteApiProfile() {
    const root = state.refs.settings;
    if (!root) return;
    const select = root.querySelector('#lx-api-profile');
    const id = select ? select.value : '';
    const s = getSettings();
    const profile = (s.apiProfiles || []).find(item => item.id === id);
    if (!profile) { toast('warning', '先选择一个已保存的配置'); return; }
    if (!askConfirm(`删除 API 配置“${profile.name}”？`)) return;
    saveSettings({
        apiProfiles: (s.apiProfiles || []).filter(item => item.id !== id),
        apiProfileId: s.apiProfileId === id ? '' : s.apiProfileId
    });
    openSettings();
    toast('success', '已删除');
}

function startSwipeWatcher() {
    if (state.watchTimer) clearInterval(state.watchTimer);
    state.watchLastId = -1;
    state.watchLastHash = '';
    state.watchTimer = setInterval(async () => {
        try {
            const id = getLatestAssistantId();
            if (id < 0) return;
            const msg = getChatMessages(id)[0];
            if (!msg || msg.is_generating) return;
            const hash = hashString(msg.message || '');
            if (state.watchLastId === id && state.watchLastHash && hash !== state.watchLastHash) {
                clearTimeout(state.watchSettle);
                state.watchSettle = setTimeout(() => handleSwipe(id), 320);
            }
            state.watchLastId = id;
            state.watchLastHash = hash;
        } catch (e) { /* ignore */ }
    }, 700);
}

async function maybeFirstUserAuto() {
    if (state.initialBootTried) return;
    const s = getSettings();
    if (!s.enabled || s.initialFill !== 'auto' || state.initialTried) return;
    try { if (getGroupData()) return; } catch (e) { return; }
    const id = getLatestAssistantId();
    if (id < 0) return;
    let hasUser = false;
    try {
        const last = getLastMessageId();
        hasUser = (getChatMessages('0-' + last) || []).some(m => m && (m.is_user || m.role === 'user'));
    } catch (e) { /* ignore */ }
    if (!hasUser) return;
    state.initialBootTried = true;
    await handleAiMessage(id, 'swipe');
    if (!getGroupData() && !state.busy) updateInitialButton();
}

async function initialFill() {
    if (!isInitialFillAvailable()) {
        toast('warning', '当前不是第一条消息，或已有群像数据');
        return;
    }
    state.initialTried = true;
    updateInitialButton();
    await manualGenerate({ initial: true });
    if (!getGroupData() && !state.busy) {
        state.initialTried = false;
        updateInitialButton();
    }
}

async function openPromptPreview() {
    if (!state.root) return;
    const old = state.root.querySelector('.lx-reroll-mask');
    if (old) old.remove();
    const doc = state.doc || getDoc();
    const text = await buildPromptPreview();
    const mask = doc.createElement('div');
    mask.className = 'lx-reroll-mask';
    mask.innerHTML = `<div class="lx-reroll-dialog" style="width:min(92vw,560px);">
        <div class="lx-reroll-title">本次提示词预览</div>
        <div class="lx-reroll-hint">共 ${text.length} 字符。只读，不会发送。</div>
        <textarea class="lx-reroll-input" readonly style="min-height:320px;font-family:monospace;font-size:10px;">${escapeHtml(text)}</textarea>
        <div class="lx-reroll-actions"><button type="button" class="lx-mini-btn" data-preview-close>关闭</button><button type="button" class="lx-mini-btn lx-btn-primary" data-preview-copy>复制</button></div>
    </div>`;
    state.root.appendChild(mask);
    const close = () => mask.remove();
    mask.querySelector('[data-preview-close]').addEventListener('click', close);
    mask.addEventListener('click', event => { if (event.target === mask) close(); });
    mask.querySelector('[data-preview-copy]').addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(text);
            toast('success', '提示词已复制');
        } catch (e) {
            const area = mask.querySelector('textarea');
            area.select();
            document.execCommand('copy');
            toast('success', '提示词已复制');
        }
    });
}

function openDataEditor() {
    if (!state.root) return;
    const old = state.root.querySelector('.lx-reroll-mask');
    if (old) old.remove();
    const doc = state.doc || getDoc();
    const data = normalizeData(getGroupData() || {});
    const mask = doc.createElement('div');
    mask.className = 'lx-reroll-mask';
    mask.innerHTML = `<div class="lx-reroll-dialog" style="width:min(94vw,640px);">
        <div class="lx-reroll-title">编辑当前群像数据</div>
        <div class="lx-reroll-hint">直接改 JSON。保存后会写回当前楼层；改错可能影响后续推演。</div>
        <textarea class="lx-reroll-input" style="min-height:360px;font-family:monospace;font-size:10px;">${escapeHtml(JSON.stringify(data, null, 2))}</textarea>
        <div class="lx-reroll-actions"><button type="button" class="lx-mini-btn" data-edit-cancel>取消</button><button type="button" class="lx-mini-btn lx-btn-primary" data-edit-save>保存</button></div>
    </div>`;
    state.root.appendChild(mask);
    const close = () => mask.remove();
    mask.querySelector('[data-edit-cancel]').addEventListener('click', close);
    mask.addEventListener('click', event => { if (event.target === mask) close(); });
    mask.querySelector('[data-edit-save]').addEventListener('click', async () => {
        try {
            const parsed = JSON.parse(mask.querySelector('textarea').value);
            if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('必须是 JSON 对象');
            const tid = getLatestAssistantId();
            if (tid < 0) throw new Error('还没有 AI 消息');
            await attachGroupData(tid, normalizeData(parsed));
            invalidateData();
            close();
            renderAll();
            setupInjection(true);
            toast('success', '数据已保存');
        } catch (e) {
            toast('error', '保存失败：' + (e.message || e));
        }
    });
}

function openInjectionPreview() {
    if (!state.root) return;
    const old = state.root.querySelector('.lx-reroll-mask');
    if (old) old.remove();
    const doc = state.doc || getDoc();
    const context = buildEventContext() || '（当前没有可注入的群像线索）';
    const text = context + '\n\n（以上线索仅供续写参考，不会写进正文。）';
    const mask = doc.createElement('div');
    mask.className = 'lx-reroll-mask';
    mask.innerHTML = `<div class="lx-reroll-dialog" style="width:min(92vw,560px);">
        <div class="lx-reroll-title">正文注入预览</div>
        <div class="lx-reroll-hint">这些内容会作为上下文发给主模型，影响正文；不会写进正文本身。</div>
        <textarea class="lx-reroll-input" readonly style="min-height:320px;font-family:monospace;font-size:10px;">${escapeHtml(text)}</textarea>
        <div class="lx-reroll-actions"><button type="button" class="lx-mini-btn" data-preview-close>关闭</button><button type="button" class="lx-mini-btn lx-btn-primary" data-preview-copy>复制</button></div>
    </div>`;
    state.root.appendChild(mask);
    const close = () => mask.remove();
    mask.querySelector('[data-preview-close]').addEventListener('click', close);
    mask.addEventListener('click', event => { if (event.target === mask) close(); });
    mask.querySelector('[data-preview-copy]').addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(text); toast('success', '注入内容已复制'); }
        catch (e) { const area = mask.querySelector('textarea'); area.select(); document.execCommand('copy'); toast('success', '注入内容已复制'); }
    });
}

function openRerollDialog() {
    if (state.busy) { toast('warning', '正在生成中，请稍候'); return; }
    if (!state.root) return;
    const old = state.root.querySelector('.lx-reroll-mask');
    if (old) old.remove();
    const doc = state.doc || getDoc();
    const mask = doc.createElement('div');
    mask.className = 'lx-reroll-mask';
    mask.innerHTML = `<div class="lx-reroll-dialog">
        <div class="lx-reroll-title">重roll 要求</div>
        <div class="lx-reroll-hint">可以写这次重roll要偏重什么，例如「多写淑妃的孩子」「让孕事更明显」「这一楼不要新增人物」。留空则正常重roll。</div>
        <textarea class="lx-reroll-input" placeholder="例如：重roll时把淑妃已有孩子写进孕事子女；子嗣月事按世界书推演。"></textarea>
        <div class="lx-reroll-actions">
            <button type="button" class="lx-mini-btn" data-reroll-cancel>取消</button>
            <button type="button" class="lx-mini-btn lx-btn-primary" data-reroll-ok>开始重roll</button>
        </div>
    </div>`;
    state.root.appendChild(mask);
    const input = mask.querySelector('.lx-reroll-input');
    const close = () => mask.remove();
    mask.querySelector('[data-reroll-cancel]').addEventListener('click', close);
    mask.addEventListener('click', event => { if (event.target === mask) close(); });
    mask.querySelector('[data-reroll-ok]').addEventListener('click', () => {
        const instruction = String(input.value || '').trim();
        close();
        rerollGroup(instruction);
    });
}

/* ------------------------------------------------------------------ */
/* 事件委托                                                           */
/* ------------------------------------------------------------------ */

async function handleAction(action, element) {
    switch (action) {
        case 'close':
            closeAll();
            return;
        case 'settings':
            openSettings();
            return;
        case 'cancel-settings':
            closeSettings();
            return;
        case 'save-settings':
            saveSettingsFromForm();
            return;
        case 'reset-all':
            resetAllSettings();
            return;
        case 'gen':
            await manualGenerate();
            return;
        case 'initial-fill':
            await initialFill();
            return;
        case 'prompt-preview':
            openPromptPreview();
            return;
        case 'injection-preview':
            openInjectionPreview();
            return;
        case 'data-edit':
            openDataEditor();
            return;
        case 'wb-toggle': {
            const id = element.dataset.wbId || '';
            if (!id) return;
            const map = Object.assign({}, getSettings().worldbookEntries || {});
            map[id] = !isWorldbookEntryEnabled(id);
            saveSettings({ worldbookEntries: map });
            openSettings('basic');
            return;
        }
        case 'follow-toggle': {
            const name = element.dataset.name || '';
            if (!name) return;
            const list = getSettings().followList.slice();
            const idx = list.indexOf(name);
            if (idx >= 0) list.splice(idx, 1); else list.push(name);
            saveSettings({ followList: list });
            renderAll();
            toast('success', idx >= 0 ? '已取消关注' : '已关注 ' + name);
            return;
        }
        case 'batch-mode':
            state.ui.batchOn = !state.ui.batchOn;
            if (!state.ui.batchOn) state.ui.batchKeys.clear();
            if (state.refs.batch) state.refs.batch.classList.toggle('on', state.ui.batchOn);
            renderAll();
            return;
        case 'batch-toggle': {
            if (!state.ui.batchOn) return;
            const key = element.dataset.key || '';
            if (!key) return;
            if (state.ui.batchKeys.has(key)) state.ui.batchKeys.delete(key);
            else state.ui.batchKeys.add(key);
            renderAll();
            return;
        }
        case 'batch-clear':
            state.ui.batchKeys.clear();
            renderAll();
            return;
        case 'batch-delete':
            if (!state.ui.batchKeys.size) { toast('warning', '还没有选中项'); return; }
            await deleteBatchSelection();
            return;
        case 'cycle-save': {
            const input = state.shadow && state.shadow.querySelector('#lx-cycle-date');
            await saveHeirCycle(input ? input.value : '');
            toast('success', input && input.value ? '月事日期已保存' : '已清空自定义日期');
            return;
        }
        case 'cycle-clear':
            await saveHeirCycle('');
            toast('success', '已清空自定义日期');
            return;
        case 'reroll':
            openRerollDialog();
            return;
        case 'write':
            await writeNewLetter();
            return;
        case 'refresh':
            invalidateData();
            renderAll();
            toast('success', '已刷新');
            return;
        case 'theme': {
            const theme = element.dataset.theme;
            if (!THEMES[theme]) return;
            saveSettings({ theme });
            applyTheme();
            if (state.refs.settings) {
                state.refs.settings.querySelectorAll('.lx-theme-item').forEach(el => {
                    el.classList.toggle('active', el.dataset.theme === theme);
                });
            }
            return;
        }
        case 'toggle-key': {
            const input = state.refs.settings && state.refs.settings.querySelector('#lx-api-key');
            if (!input) return;
            const visible = input.type === 'text';
            input.type = visible ? 'password' : 'text';
            element.textContent = visible ? '显示' : '隐藏';
            return;
        }
        case 'fetch-models':
            await fetchModelsFromForm();
            return;
        case 'api-save':
            saveApiProfile();
            return;
        case 'api-switch':
            switchApiProfile();
            return;
        case 'api-del':
            deleteApiProfile();
            return;
        case 'ball-style': {
            const style = ['compass', 'lantern', 'seal', 'mirror', 'bamboo'].includes(element.dataset.style) ? element.dataset.style : 'compass';
            saveSettings({ ballStyle: style });
            applyBallAppearance();
            if (state.refs.settings) {
                state.refs.settings.querySelectorAll('.lx-ball-style-item').forEach(el => {
                    el.classList.toggle('active', el.dataset.style === style);
                });
            }
            return;
        }
        case 'panel-image-reset':
            saveSettings({ panelImage: '' });
            applyTheme();
            toast('success', '已恢复主题背景');
            return;
        case 'ball-image-reset':
            saveSettings({ ballImage: '' });
            applyBallAppearance();
            toast('success', '已恢复默认悬浮球');
            return;
        case 'preset-save': {
            const content = state.refs.settings.querySelector('#lx-preset-content').value;
            const name = ask('新预设名称：');
            if (!name || !name.trim()) return;
            const key = name.trim().slice(0, 20);
            if (getPresets()[key] && !askConfirm(`"${key}" 已存在，覆盖？`)) return;
            if (!savePreset(key, content)) { toast('error', '保存失败'); return; }
            saveSettings({ presetName: key });
            setupInjection(true);
            openSettings();
            toast('success', '预设已保存');
            return;
        }
        case 'preset-del': {
            const select = state.refs.settings.querySelector('#lx-preset-select');
            const name = select.value;
            if (['正常', '详细', '精简'].includes(name)) { toast('warning', '内置预设不可删除'); return; }
            if (!askConfirm(`删除"${name}"？`)) return;
            deletePreset(name);
            saveSettings({ presetName: '正常' });
            setupInjection(true);
            openSettings();
            return;
        }
        case 'preset-reset': {
            const select = state.refs.settings.querySelector('#lx-preset-select');
            const name = select.value;
            if (!PRESET_DEFAULT[name]) { toast('warning', '该预设没有默认值'); return; }
            if (!askConfirm(`重置"${name}"？`)) return;
            savePreset(name, PRESET_DEFAULT[name]);
            state.refs.settings.querySelector('#lx-preset-content').value = PRESET_DEFAULT[name];
            if (name === getSettings().presetName) setupInjection(true);
            toast('success', '已重置');
            return;
        }
        case 'log-copy':
            await copyLogs();
            return;
        case 'log-clear':
            if (!askConfirm('清空日志？')) return;
            clearLogs();
            if (state.refs.settings) {
                const box = state.refs.settings.querySelector('#lx-debug-content');
                if (box) box.innerHTML = renderDebugLogs();
            }
            return;
        case 'letter-del':
            await deleteLetter(Number(element.dataset.idx));
            return;
        case 'letter-reply':
            await replyLetter(Number(element.dataset.idx));
            return;
        case 'rel-edit':
            await editRelation(Number(element.dataset.idx));
            return;
        case 'rel-add':
            await addRelation();
            return;
        case 'fp-toggle':
            await toggleForeshadow(Number(element.dataset.idx));
            return;
        case 'fp-add':
            await addForeshadow();
            return;
        case 'fp-auto':
            await autoRecoverForeshadow();
            return;
        case 'memorial-status':
            await setMemorialStatus(element.dataset.title, element.dataset.status);
            return;
        case 'struggle-filter':
            state.ui.struggleFilter = element.dataset.filter || '全部';
            renderAll();
            return;
        case 'preg-edit':
            await editPregnancy(Number(element.dataset.idx));
            return;
        case 'preg-add':
            await addPregnancy();
            return;
        case 'search-clear': {
            state.searchQuery = '';
            const input = state.shadow && state.shadow.querySelector('#lx-search-input');
            if (input) input.value = '';
            renderAll();
            return;
        }
        default:
            return;
    }
}

function onClick(event) {
    const target = event.target;
    if (!target || typeof target.closest !== 'function') return;
    const actionEl = target.closest('[data-action]');
    if (actionEl && state.shadow.contains(actionEl)) {
        event.preventDefault();
        Promise.resolve(handleAction(actionEl.dataset.action, actionEl)).catch(error => {
            console.error('[群像志]', error);
            toast('error', error && error.message ? error.message : '操作失败');
        });
        return;
    }
    const tab = target.closest('.lx-tab[data-tab]');
    if (tab) { switchTab(tab.dataset.tab); return; }
    const settingsTab = target.closest('.lx-settings-tab[data-stab]');
    if (settingsTab) switchSettingsTab(settingsTab.dataset.stab);
}

function onChange(event) {
    const target = event.target;
    if (!target || !target.matches || !state.refs.settings) return;
    if (target.matches('input[type="radio"]')) {
        const name = target.name;
        if (!name) return;
        state.refs.settings.querySelectorAll(`input[name="${name}"]`).forEach(input => {
            const label = input.closest('.lx-radio');
            if (label) label.classList.toggle('checked', input.checked);
        });
        return;
    }
    if (target.matches('input[type="checkbox"]')) {
        const label = target.closest('.lx-radio');
        if (label) label.classList.toggle('checked', target.checked);
        return;
    }
    if (target.id === 'lx-preset-select') {
        const content = getPresets()[target.value] || '';
        const textarea = state.refs.settings.querySelector('#lx-preset-content');
        if (textarea) textarea.value = content;
        return;
    }
    if (target.id === 'lx-model-list') {
        const input = state.refs.settings.querySelector('#lx-api-model');
        if (input) input.value = target.value;
    }
    if (target.id === 'lx-panel-file') {
        const file = target.files && target.files[0];
        if (!file) return;
        if (!/^image\//.test(file.type)) { toast('warning', '请选择图片文件'); return; }
        if (file.size > 2 * 1024 * 1024) { toast('warning', '背景图太大，请小于 2MB'); return; }
        const Reader = (state.win && state.win.FileReader) || FileReader;
        const reader = new Reader();
        reader.onload = () => {
            const result = String(reader.result || '');
            if (!/^data:image\//.test(result)) return;
            saveSettings({ panelImage: result });
            applyTheme();
            toast('success', '面板背景已更新');
        };
        reader.readAsDataURL(file);
        return;
    }
    if (target.id === 'lx-ball-file') {
        const file = target.files && target.files[0];
        if (!file) return;
        if (!/^image\//.test(file.type)) { toast('warning', '请选择图片文件'); return; }
        if (file.size > 800 * 1024) { toast('warning', '图片太大，请小于 800KB'); return; }
        const Reader = (state.win && state.win.FileReader) || FileReader;
        const reader = new Reader();
        reader.onload = () => {
            const result = String(reader.result || '');
            if (!/^data:image\//.test(result)) return;
            saveSettings({ ballImage: result });
            applyBallAppearance();
            toast('success', '悬浮球图片已更新');
        };
        reader.readAsDataURL(file);
    }
}

function onInput(event) {
    const target = event.target;
    if (!target || !target.id) return;
    if (target.id === 'lx-search-input') {
        state.searchQuery = target.value;
        clearTimeout(state.searchTimer);
        state.searchTimer = setTimeout(renderAll, 120);
        return;
    }
    if (!state.refs.settings) return;
    if (target.id === 'lx-temp') {
        const label = state.refs.settings.querySelector('#lx-temp-val');
        if (label) label.textContent = target.value;
    } else if (target.id === 'lx-maxtok') {
        const label = state.refs.settings.querySelector('#lx-maxtok-val');
        if (label) label.textContent = target.value;
    } else if (target.id === 'lx-ball-size') {
        const value = clamp(toInt(target.value, 50), 36, 84);
        const label = state.refs.settings.querySelector('#lx-ball-size-val');
        if (label) label.textContent = value + 'px';
        saveSettings({ ballSize: value });
        applyBallAppearance();
    }
}

function onFocusIn(event) {
    const target = event.target;
    if (!target || !target.matches) return;
    if (!target.matches('input, textarea, select')) return;
    if (target.type === 'range' || target.type === 'radio' || target.type === 'checkbox') return;
    setTimeout(() => {
        try { target.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) { /* ignore */ }
    }, 260);
}

function onKeydown(event) {
    if (event.key !== 'Escape') return;
    if (state.ui.settingsOpen) {
        closeSettings();
        return;
    }
    if (state.ui.panelOpen) closeAll();
}

function onResize() {
    syncViewportVars();
    if (!state.ball.dragging) positionBall();
}

function onPageHide() {
    unmount();
}

/* ------------------------------------------------------------------ */
/* 悬浮球拖动                                                         */
/* ------------------------------------------------------------------ */

function setBallPosition(left, top) {
    const ball = state.refs.ball;
    if (!ball) return;
    const vp = viewportSize();
    const size = getBallSize();
    const minLeft = vp.offsetLeft + BALL_MARGIN;
    const minTop = vp.offsetTop + BALL_MARGIN;
    const maxLeft = Math.max(minLeft, vp.offsetLeft + vp.width - size - BALL_MARGIN);
    const maxTop = Math.max(minTop, vp.offsetTop + vp.height - size - BALL_MARGIN);
    ball.style.left = Math.round(clamp(left, minLeft, maxLeft)) + 'px';
    ball.style.top = Math.round(clamp(top, minTop, maxTop)) + 'px';
    ball.style.right = 'auto';
}

function onBallPointerDown(event) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (event.isPrimary === false) return;
    const ball = state.refs.ball;
    if (!ball) return;
    state.ball.pointerId = event.pointerId;
    state.ball.startX = event.clientX;
    state.ball.startY = event.clientY;
    const rect = ball.getBoundingClientRect();
    state.ball.startLeft = rect.left;
    state.ball.startTop = rect.top;
    state.ball.dragging = false;
    state.ball.moved = false;
    state.ball.suppressClick = false;
    try { ball.setPointerCapture(event.pointerId); } catch (e) { /* ignore */ }
}

function onBallPointerMove(event) {
    if (state.ball.pointerId !== event.pointerId) return;
    if (!state.ball.dragging) {
        const dx = event.clientX - state.ball.startX;
        const dy = event.clientY - state.ball.startY;
        if (dx * dx + dy * dy < 36) return;
        state.ball.dragging = true;
        state.ball.moved = true;
        if (state.refs.ball) state.refs.ball.classList.add('dragging');
    }
    event.preventDefault();
    setBallPosition(
        state.ball.startLeft + event.clientX - state.ball.startX,
        state.ball.startTop + event.clientY - state.ball.startY
    );
}

function finishBallDrag(event) {
    if (event && event.pointerId !== undefined && state.ball.pointerId !== event.pointerId) return;
    const ball = state.refs.ball;
    if (ball) {
        ball.classList.remove('dragging');
        try { ball.releasePointerCapture(state.ball.pointerId); } catch (e) { /* ignore */ }
    }
    if (state.ball.dragging) {
        snapBallToEdge();
        saveBallPosition();
        state.ball.suppressClick = true;
        setTimeout(() => { state.ball.suppressClick = false; }, 450);
    }
    state.ball.pointerId = null;
    state.ball.dragging = false;
    state.ball.moved = false;
}

function onBallClick(event) {
    if (state.ball.suppressClick) {
        event.preventDefault();
        event.stopPropagation();
        return;
    }
    openPanel();
}

function bindFallbackTouchDrag(ball) {
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;
    let dragging = false;
    let moved = false;

    ball.addEventListener('touchstart', event => {
        if (event.touches.length !== 1) return;
        const touch = event.touches[0];
        const rect = ball.getBoundingClientRect();
        startX = touch.clientX;
        startY = touch.clientY;
        startLeft = rect.left;
        startTop = rect.top;
        dragging = false;
        moved = false;
        state.ball.suppressClick = false;
    }, { passive: true });

    ball.addEventListener('touchmove', event => {
        if (event.touches.length !== 1) return;
        const touch = event.touches[0];
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        if (!dragging) {
            if (dx * dx + dy * dy < 36) return;
            dragging = true;
            moved = true;
            ball.classList.add('dragging');
        }
        event.preventDefault();
        setBallPosition(startLeft + dx, startTop + dy);
    }, { passive: false });

    const end = () => {
        ball.classList.remove('dragging');
        if (dragging) {
            snapBallToEdge();
            saveBallPosition();
            state.ball.suppressClick = true;
            setTimeout(() => { state.ball.suppressClick = false; }, 450);
        }
        if (moved) {
            setTimeout(() => { state.ball.suppressClick = false; }, 450);
        }
        dragging = false;
        moved = false;
    };
    ball.addEventListener('touchend', end);
    ball.addEventListener('touchcancel', end);
}

function bindBallDrag(ball) {
    const win = state.win || getWin();
    if ('PointerEvent' in win) {
        ball.addEventListener('pointerdown', onBallPointerDown);
        ball.addEventListener('pointermove', onBallPointerMove);
        ball.addEventListener('pointerup', finishBallDrag);
        ball.addEventListener('pointercancel', finishBallDrag);
        ball.addEventListener('lostpointercapture', finishBallDrag);
    } else {
        bindFallbackTouchDrag(ball);
    }
    ball.addEventListener('click', onBallClick);
    ball.addEventListener('contextmenu', event => event.preventDefault());
    ball.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openPanel();
        }
    });
}

/* ------------------------------------------------------------------ */
/* 挂载 / 卸载                                                        */
/* ------------------------------------------------------------------ */

function getIframeId() {
    try {
        return window.__TH_IFRAME_ID || window.name || (window.frameElement && window.frameElement.id) || '';
    } catch (e) {
        return '';
    }
}

function cleanupLegacy(doc) {
    LEGACY_IDS.concat([HOST_ID]).forEach(id => {
        const el = doc.getElementById(id);
        if (el) el.remove();
    });
}

function collectRefs(root) {
    const refs = {
        ball: root.querySelector('#lx-ball'),
        badge: root.querySelector('#lx-ball-badge'),
        initial: root.querySelector('.lx-initial-btn'),
        batch: root.querySelector('.lx-batch-btn'),
        mask: root.querySelector('#lx-mask'),
        panel: root.querySelector('#lx-panel'),
        settings: root.querySelector('#lx-settings'),
        panels: {},
        tabs: {}
    };
    root.querySelectorAll('.lx-panel-tab').forEach(el => {
        if (el.dataset.panel) refs.panels[el.dataset.panel] = el;
    });
    root.querySelectorAll('.lx-tab').forEach(el => {
        if (el.dataset.tab) refs.tabs[el.dataset.tab] = el;
    });
    return refs;
}

function bindEvents() {
    if (!state.shadow || !state.refs.ball) return;
    state.shadow.addEventListener('click', onClick);
    state.shadow.addEventListener('change', onChange);
    state.shadow.addEventListener('input', onInput);
    state.shadow.addEventListener('focusin', onFocusIn);
    state.refs.mask.addEventListener('click', closeAll);
    bindBallDrag(state.refs.ball);

    const win = state.win || getWin();
    const doc = state.doc || getDoc();
    doc.addEventListener('keydown', onKeydown);
    win.addEventListener('resize', onResize);
    win.addEventListener('orientationchange', onResize);
    if (win.visualViewport) {
        win.visualViewport.addEventListener('resize', onResize);
        win.visualViewport.addEventListener('scroll', onResize);
    }
    win.addEventListener('pagehide', onPageHide);
    // 脚本被禁用时，酒馆助手会移除脚本 iframe；iframe 自身的 pagehide 也要清理，
    // 否则面板打开时留下的 body overflow:hidden 会把酒馆页面锁死。
    try { window.addEventListener('pagehide', onPageHide); } catch (e) { /* ignore */ }
}

function bindTavernEvents() {
    if (typeof eventOn !== 'function' || typeof tavern_events === 'undefined') {
        console.warn('[群像志] 未找到酒馆事件接口，自动推演可能不会触发');
        return;
    }
    state.tavernGen = (state.tavernGen || 0) + 1;
    const gen = state.tavernGen;
    const guard = handler => (...args) => {
        if (!state.mounted || gen !== state.tavernGen) return;
        try {
            const result = handler(...args);
            if (result && typeof result.catch === 'function') {
                result.catch(error => console.error('[群像志] 事件处理失败', error));
            }
        } catch (error) {
            console.error('[群像志] 事件处理失败', error);
        }
    };
    const on = (event, handler) => {
        if (!event) return;
        eventOn(event, guard(handler));
    };

    on(tavern_events.MESSAGE_RECEIVED, (messageId, type) => handleAiMessage(messageId, type));
    on(tavern_events.MESSAGE_SENT || 'message_sent', () => setTimeout(maybeFirstUserAuto, 300));
    on(tavern_events.MESSAGE_SWIPED, messageId => handleSwipe(messageId));
    on(tavern_events.MESSAGE_EDITED, messageId => handleEdited(messageId));
    on(tavern_events.MESSAGE_DELETED, () => {
        // 删楼后旧楼层数据不能再作为当前基线；同时让正在跑的生成本轮作废。
        state.gen++;
        state.processed.clear();
        state.initialTried = false;
        state.initialBootTried = false;
        invalidateData();
        renderAll();
        setupInjection(true);
    });
    on(tavern_events.CHAT_CHANGED, () => {
        state.gen++;
        state.processed.clear();
        state.pending = null;
        state.initialTried = false;
        state.initialBootTried = false;
        state.worldbookLoaded = false;
        state.worldbookEntryCache = [];
        refreshWorldbookEntries(true);
        userNamesCache = { time: 0, names: [] };
        state.searchQuery = '';
        const search = state.shadow && state.shadow.querySelector('#lx-search-input');
        if (search) search.value = '';
        invalidateData();
        try { state.autoStartId = getLastMessageId(); } catch (e) { state.autoStartId = -1; }
        closeAll();
        setupInjection(true);
        renderAll();
    
    });
}

function mount() {
    if (state.mounted) return;
    const doc = getDoc();
    const win = getWin();
    if (!doc || !doc.body) {
        setTimeout(mount, 150);
        return;
    }
    state.doc = doc;
    state.win = win;

    cleanupLegacy(doc);

    const host = doc.createElement('div');
    host.id = HOST_ID;
    const iframeId = getIframeId();
    if (iframeId) host.setAttribute('data-th-iframe-id', iframeId);
    host.style.cssText = 'position:fixed;left:0;top:0;width:100%;height:100%;z-index:2147483600;pointer-events:none;';
    doc.body.appendChild(host);

    let shadow = null;
    let root = null;
    try {
        shadow = host.attachShadow({ mode: 'open' });
        shadow.innerHTML = `<style>${CSS}</style>${SHELL_HTML}`;
        root = shadow.getElementById('lx-root');
    } catch (e) {
        host.innerHTML = `<style>${CSS}</style>${SHELL_HTML}`;
        shadow = host;
        root = host.querySelector('#lx-root');
    }
    if (!root) throw new Error('群像志界面创建失败');

    state.host = host;
    state.shadow = shadow;
    state.root = root;
    state.refs = collectRefs(shadow);
    try { state.autoStartId = getLastMessageId(); } catch (e) { state.autoStartId = -1; }

    bindEvents();
    bindTavernEvents();
    startSwipeWatcher();
    refreshWorldbookEntries(true);
    applyTheme();
    syncViewportVars();
    positionBall();
    renderAll();
    setupInjection();

    state.mounted = true;
    console.log('[群像志] v' + VERSION + ' 已加载');
}

function unmount() {
    if (!state.mounted && !state.host) return;
    state.gen++;
    state.tavernGen++;
    if (state.watchTimer) { clearInterval(state.watchTimer); state.watchTimer = null; }
    if (state.watchSettle) { clearTimeout(state.watchSettle); state.watchSettle = null; }
    if (state.injection) {
        try { state.injection.uninject(); } catch (e) { /* ignore */ }
        state.injection = null;
        state.injectionKey = '';
    }
    try {
        if (state.host) state.host.remove();
    } catch (e) { /* ignore */ }
    state.host = null;
    state.shadow = null;
    state.root = null;
    state.refs = {};
    state.mounted = false;
    state.busy = false;
    state.pending = null;
    state.ui.panelOpen = false;
    state.ui.settingsOpen = false;
    syncBodyLock();

    const win = state.win || getWin();
    const doc = state.doc || getDoc();
    try {
        doc.removeEventListener('keydown', onKeydown);
        win.removeEventListener('resize', onResize);
        win.removeEventListener('orientationchange', onResize);
        win.removeEventListener('pagehide', onPageHide);
        try { window.removeEventListener('pagehide', onPageHide); } catch (e) { /* ignore */ }
        if (win.visualViewport) {
            win.visualViewport.removeEventListener('resize', onResize);
            win.visualViewport.removeEventListener('scroll', onResize);
        }
    } catch (e) { /* ignore */ }
}

/* ------------------------------------------------------------------ */
/* 对外 API 与启动                                                    */
/* ------------------------------------------------------------------ */

const API = {
    版本: VERSION,
    获取数据: getGroupData,
    设置数据: attachGroupData,
    渲染: renderAll,
    打开: openPanel,
    关闭: closeAll,
    生成: manualGenerate,
    重roll: rerollGroup,
    获取设置: getSettings,
    保存设置: saveSettings,
    获取预设: getPresets,
    保存预设: savePreset,
    日志: getLogs,
    清空日志: clearLogs,
    重建: () => {
        unmount();
        setTimeout(mount, 50);
    }
};

function boot() {
    if (typeof document === 'undefined' || typeof window === 'undefined') return;
    if (typeof getVariables !== 'function' || typeof getChatMessages !== 'function') {
        state.bootTries += 1;
        if (state.bootTries < 40) setTimeout(boot, 250);
        else console.warn('[群像志] 酒馆助手接口未就绪，脚本未启动');
        return;
    }
    try {
        mount();
        window.群像系统 = API;
        window.__LX_GROUP_VERSION__ = VERSION;
        try { getWin().群像系统 = API; } catch (e) { /* ignore */ }
    } catch (e) {
        console.error('[群像志] 初始化失败', e);
    }
}

if (typeof document !== 'undefined') {
    boot();
}

/* 供 Node 做纯逻辑测试；在酒馆助手的 module 脚本里 export 会被忽略 */
export const __test = {
    VERSION,
    PRESET_DEFAULT,
    normalizeSettings,
    normalizeData,
    parseGroupBlock,
    parseJsonLoose,
    extractJson,
    stripGroupBlock,
    mergeGroupData,
    mergeEvents,
    mergeRelations,
    mergeForeshadow,
    normalizeEvent,
    normalizeHeir,
    mergeHeir,
    getProgressNum,
    parseChineseNumber,
    deriveMenstrualCycle,
    incrementAge,
    extractEra,
    extractCalendar,
    isBlacklisted,
    escapeHtml,
    wrapSubPrompt,
    buildSettingsHTML
};
