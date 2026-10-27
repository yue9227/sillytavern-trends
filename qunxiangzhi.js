const VERSION = '2.1.0';
const HOST_ID = 'lx-group-host';
const LEGACY_IDS = ['lx-ball', 'lx-panel', 'lx-mask', 'lx-settings', 'lx-group-style'];
const MAX_LOG = 10;
const BALL_SIZE = 50;
const BALL_MARGIN = 8;
const CHARACTER_NAME = '李承璟';
const NAME_BLACKLIST = ['{{user}}', CHARACTER_NAME, '圣上', '陛下', '我', '朕'];

const THEMES = {
    A: { name: '宣纸米黄', bg: 'linear-gradient(160deg,#fcf8f0 0%,#f4ead9 100%)', solid: '#fbf6ec', border: '#d8c3a0', gold: '#a56a2f', text: '#2b2218', text2: '#5a4a36', dim: '#8f7c63', input: 'rgba(255,255,255,0.72)', card: 'rgba(255,255,255,0.55)', event: 'rgba(176,122,63,0.07)', shadow: '0 24px 80px rgba(80,50,20,0.22),0 2px 10px rgba(80,50,20,0.10)' },
    B: { name: '青瓷', bg: 'linear-gradient(180deg,#eef5f0 0%,#f8fbf8 100%)', solid: '#eef5f0', border: '#9fb9aa', gold: '#3f7f6a', text: '#1f3029', text2: '#41584d', dim: '#7f998c', input: 'rgba(255,255,255,0.78)', card: 'rgba(63,127,106,0.06)', event: 'rgba(30,60,45,0.04)', shadow: '0 0 0 4px rgba(255,255,255,0.55),0 0 0 5px #9fb9aa,0 20px 60px rgba(20,50,35,0.22)' },
    C: { name: '玄墨银', bg: 'linear-gradient(180deg,#171a20 0%,#0b0d11 100%)', solid: '#171a20', border: '#3b4450', gold: '#c2cfdf', text: '#e8eef7', text2: '#aeb9c8', dim: '#6d7888', input: 'rgba(0,0,0,0.38)', card: 'rgba(194,207,223,0.05)', event: 'rgba(0,0,0,0.22)', shadow: '0 0 0 4px rgba(0,0,0,0.62),0 0 0 5px #3b4450,0 20px 60px rgba(0,0,0,0.78)' },
    D: { name: '绛宫', bg: 'linear-gradient(180deg,#2a1215 0%,#150a0c 100%)', solid: '#2a1215', border: '#6e3a3d', gold: '#e0b07a', text: '#f2ddd2', text2: '#cfa99d', dim: '#8f6a62', input: 'rgba(0,0,0,0.36)', card: 'rgba(224,176,122,0.05)', event: 'rgba(0,0,0,0.2)', shadow: '0 0 0 4px rgba(0,0,0,0.62),0 0 0 5px #6e3a3d,0 20px 60px rgba(0,0,0,0.8)' },
    E: { name: '藕荷紫', bg: 'linear-gradient(180deg,#f2edf7 0%,#fbf8fd 100%)', solid: '#f2edf7', border: '#c4b2d6', gold: '#7d5a9e', text: '#31283b', text2: '#544764', dim: '#9c8aad', input: 'rgba(255,255,255,0.76)', card: 'rgba(125,90,158,0.05)', event: 'rgba(40,20,60,0.035)', shadow: '0 0 0 4px rgba(255,255,255,0.55),0 0 0 5px #c4b2d6,0 20px 60px rgba(50,20,80,0.2)' },
    F: { name: '竹影', bg: 'linear-gradient(180deg,#10231a 0%,#08130e 100%)', solid: '#10231a', border: '#3f6b52', gold: '#a8d5a2', text: '#dcefe2', text2: '#a9c9b4', dim: '#688b74', input: 'rgba(0,0,0,0.36)', card: 'rgba(168,213,162,0.045)', event: 'rgba(0,0,0,0.2)', shadow: '0 0 0 4px rgba(0,0,0,0.62),0 0 0 5px #3f6b52,0 20px 60px rgba(0,0,0,0.78)' },
    ST: { name: '跟随酒馆', bg: 'linear-gradient(180deg,rgba(20,20,20,.78),rgba(10,10,10,.86))', solid: '#141414', border: '#555', gold: '#c9a86a', text: '#e8e8e8', text2: '#c8c8c8', dim: '#8a8a8a', input: 'rgba(0,0,0,0.3)', card: 'rgba(255,255,255,0.05)', event: 'rgba(0,0,0,0.16)', shadow: '0 0 0 4px rgba(0,0,0,0.4),0 0 0 5px #555,0 20px 60px rgba(0,0,0,0.65)' }
};

const DEFAULT_SETTINGS = {
    version: 2,
    enabled: true,
    mode: 'sub',
    trigger: 'auto',
    presetName: '正常',
    subApiUrl: '',
    subApiKey: '',
    subApiModel: '',
    temperature: 0.6,
    maxTokens: 1500,
    debug: false,
    theme: 'A',
    injectEvents: true,
    injectNpc: false,
    injectRumors: false,
    injectLetters: false,
    injectForeshadow: false,
    injectRelations: false,
    injectTimeline: false,
    pregnancyModule: false,
    relationView: 'card',
    timelineRange: 20,
    foreshadowAi: true,
    foreshadowUser: true,
    ballPos: { x: null, y: 0.28 }
};

const PRESET_DEFAULT = {
    '精简': `【角色】
你是《李承璟》世界的幕后推演者。根据本回合正文，只记录“发生了变化”的群像信息，供续写参考。

【原则】
1. 只写变化，没有变化就留空；不要编造。
2. 人名必须与正文一致。禁止把{{user}}、李承璟、陛下、圣上、我、朕写成 NPC 或关系端点；NPC状态中每个角色必须写年龄、身份、位置，不确定才写“不详”；年龄要取世界书/正文的具体数字，跨年按纪年自动+1。
3. 事件名 4-8 字，保持稳定；进度 0-100 整数，只增不减。
4. 关系写“甲对乙”的方向；伏笔只记重要且未回收的线索。
5. 不要输出正文、解释或 Markdown 代码块。

【输出结构】
{"NPC状态":{"具名角色":{"心情":"","位置":"","当前所做":""}},"NPC事件":[{"事件名":"","角色":"","内容":"","进度":0,"伏笔":false}],"国家事件":[],"邻国事件":[],"流言":[{"内容":"","伏笔":false}],"书信":[],"关系":[{"甲":"","乙":"","关系":""}],"伏笔":[{"内容":"","来源":"","已回收":false}]}

【数量】
NPC状态 0-3 人；事件各 0-2 条；流言 0-2 条；书信 0-1 封；关系 0-1 条；伏笔 0-1 条。每条 20-50 字；总字数以实际条目为准，约 120-300 字。`,

    '正常': `【角色】
你是《李承璟》世界的幕后推演者。根据本回合正文，推演未出场人物与势力的动向，记录“变化”，供作者续写参考。你不改写正文，不替角色做决定。

【推演原则】
1. 只记录本回合发生变化的内容；没有变化就留空数组，不要为了填满而编造。
2. 人名必须与正文一致。禁止把{{user}}、李承璟、陛下、圣上、我、朕写成 NPC 名或关系端点；NPC状态中每个角色必须写年龄、身份、位置，不确定才写“不详”；年龄要取世界书/正文的具体数字，跨年按纪年自动+1。
3. 事件名 4-8 字，确定后保持不变；同一事件只更新进度与内容，不要换名重开。
4. 进度是 0-100 的整数，只增不减；完成写 100。
5. 关系写“甲对乙”的方向；若双方态度不同，写两条。
6. 伏笔只记重要且未回收的线索；已回收的不要重复。
7. 流言要能看出“谁在说、对谁说、在哪说”。
8. 书信只在剧情需要时出现，没有就留空数组。
9. 不要输出正文、解释、Markdown 代码块。

【输出结构】
{
  "NPC状态": {"具名角色": {"心情":"", "位置":"", "年龄":"", "身份":"", "当前所做":""}},
  "NPC事件": [{"事件名":"", "角色":"", "内容":"", "进度":0, "伏笔":false}],
  "国家事件": [{"事件名":"", "角色":"", "内容":"", "进度":0, "伏笔":false}],
  "邻国事件": [{"事件名":"", "角色":"", "内容":"", "进度":0, "伏笔":false, "国家":""}],
  "流言": [{"内容":"", "伏笔":false}],
  "书信": [{"来源":"", "内容":""}],
  "关系": [{"甲":"", "乙":"", "关系":""}],
  "伏笔": [{"内容":"", "来源":"", "已回收":false}]
}

【数量与字数】
NPC状态 0-5 人；NPC事件、国家事件、邻国事件各 0-3 条；流言 0-2 条；书信 0-1 封；关系 0-2 条；伏笔 0-2 条。
每条 30-80 字；总字数以实际条目为准，约 300-900 字，不要为凑字数灌水。

【示例】
{"NPC状态":{"周彦之":{"心情":"疲惫","位置":"中书省","当前所做":"草拟整顿太学诏书"}},"NPC事件":[{"事件名":"淑妃谋宠","角色":"淑妃","内容":"以赏菊为名邀圣上至御花园，暗令大公主偶然路过。","进度":40,"伏笔":false}],"国家事件":[],"邻国事件":[],"流言":[],"书信":[],"关系":[],"伏笔":[]}`,

    '详细': `【角色】
你是《李承璟》世界的幕后叙事者。根据本回合正文，推演不在场人物与势力的动向，关注暗线、权力博弈与因果链。你只做记录与推演，不改写正文。

【推演原则】
1. 只写本回合发生变化的内容；没有变化就留空，不要凑数。
2. 人名必须与正文或世界书一致。禁止把{{user}}、李承璟、陛下、圣上、我、朕写成 NPC 名或关系端点；NPC状态中每个角色必须写年龄、身份、位置，不确定才写“不详”；年龄要取世界书/正文的具体数字，跨年按纪年自动+1。
3. 事件名 4-8 字，确定后保持不变；同一事件只更新进度与内容，不换名重开。
4. 进度 0-100 整数，只增不减；完成写 100。
5. 每条事件尽量写清：谁在做、为什么做、做到哪一步、下一步可能是什么。
6. 关系写“甲对乙”的方向；双方态度不同就写两条。
7. 伏笔只记重要、未回收的线索，尽量标注来源。
8. 流言要能看出“谁在说、对谁说、在哪说”，带一点口吻。
9. 书信只在剧情需要时出现，含称呼与落款；没有就留空。
10. 不要输出正文、解释、Markdown 代码块。

【输出结构】
{
  "NPC状态": {"具名角色": {"心情":"", "位置":"", "年龄":"", "身份":"", "当前所做":""}},
  "NPC事件": [{"事件名":"", "角色":"", "内容":"", "进度":0, "伏笔":false}],
  "国家事件": [{"事件名":"", "角色":"", "内容":"", "进度":0, "伏笔":false}],
  "邻国事件": [{"事件名":"", "角色":"", "内容":"", "进度":0, "伏笔":false, "国家":""}],
  "流言": [{"内容":"", "伏笔":false}],
  "书信": [{"来源":"", "内容":""}],
  "关系": [{"甲":"", "乙":"", "关系":""}],
  "伏笔": [{"内容":"", "来源":"", "已回收":false}]
}

【数量与字数】
NPC状态 0-8 人，每人至少 2 个字段；事件各 0-4 条；流言 0-3 条；书信 0-2 封；关系 0-3 条；伏笔 0-3 条。
每条 50-120 字；总字数以实际条目为准，约 700-1600 字，不要为凑字数灌水。

【示例】
{"NPC状态":{"周彦之":{"心情":"疲惫","位置":"中书省","身份":"中书舍人","当前所做":"草拟整顿太学诏书"}},"NPC事件":[{"事件名":"淑妃谋宠","角色":"淑妃","内容":"八月末以赏菊为名，暗令大公主李嘉华出现在圣上常走的路径上，欲借女儿唤回圣上对合欢宫的眷顾。","进度":35,"伏笔":false}],"国家事件":[],"邻国事件":[],"流言":[],"书信":[],"关系":[{"甲":"淑妃","乙":"沈微澜","关系":"暗斗"}],"伏笔":[{"内容":"圣上深夜独坐西阁，或有心事","来源":"流言","已回收":false}]}`
};

const state = {
    mounted: false,
    host: null,
    shadow: null,
    root: null,
    refs: {},
    settings: null,
    dataCache: { key: '', data: null },
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
    ui: {
        tab: 'NPC状态',
        settingsTab: 'basic',
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
    if (n.includes('{{user}}')) return true;
    return ['李承璟', '圣上', '陛下', '我', '朕'].includes(n);
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
    ['事件名', '角色', '内容', '国家'].forEach(key => {
        if (out[key] !== undefined && out[key] !== null) {
            out[key] = String(out[key]).trim();
        }
    });
    if (out.事件名) out.事件名 = out.事件名.slice(0, 24);
    if (out.角色) out.角色 = out.角色.slice(0, 40);
    if (out.内容) out.内容 = out.内容.slice(0, 600);
    if (out.国家) out.国家 = out.国家.slice(0, 20);
    out.进度 = getProgressNum(out);
    out.伏笔 = isTrue(out.伏笔);
    const round = toInt(out.回合, 0);
    out.回合 = round > 0 ? round : 0;
    const updated = toInt(out.更新回合, 0);
    out.更新回合 = updated > 0 ? updated : 0;
    return out;
}

function eventKey(event) {
    const name = String(event && event.事件名 ? event.事件名 : '').trim();
    if (name) return 'n:' + name;
    return 'c:' + String(event && event.内容 ? event.内容 : '').replace(/\s+/g, '').slice(0, 16);
}

function normalizeRumor(item, round) {
    if (item === undefined || item === null) return null;
    if (typeof item === 'string') {
        const content = item.trim();
        if (!content) return null;
        return { 内容: content.slice(0, 600), 伏笔: false, 回合: round || 0 };
    }
    if (!isPlainObject(item)) return null;
    const content = String(item.内容 || '').trim();
    if (!content) return null;
    return {
        内容: content.slice(0, 600),
        伏笔: isTrue(item.伏笔),
        回合: toInt(item.回合, round || 0) || 0
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
    return {
        内容: content.slice(0, 400),
        来源: String(item.来源 || '手动').trim().slice(0, 30),
        已回收: isTrue(item.已回收),
        回合: toInt(item.回合, round || 0) || 0
    };
}

function parseChineseNumber(input) {
    const s = String(input || '').replace(/[^\d一二三四五六七八九十百零〇两]/g, '');
    if (!s) return 0;
    if (/^\d+$/.test(s)) return parseInt(s, 10) || 0;
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

async function advanceYearFromMessage(messageId, text) {
    const era = extractEra(text);
    if (!era) return false;
    let data = getGroupData();
    if (!data) data = normalizeData({});
    const current = data.纪年 || { 年号: '', 年: 0 };
    if (current.年 && era.年 <= current.年) return false;
    if (current.年) {
        const delta = era.年 - current.年;
        Object.values(data.NPC状态 || {}).forEach(info => {
            if (info && info.年龄) info.年龄 = incrementAge(info.年龄, delta);
        });
    }
    data.纪年 = era;
    await attachGroupData(messageId, data);
    try { renderAll(); } catch (e) { /* ignore */ }
    return true;
}

function normalizePregnancy(item, round) {
    if (!isPlainObject(item)) return null;
    const person = cleanName(item.人物 || item.角色 || item.姓名);
    if (isBlacklisted(person)) return null;
    const month = clamp(toInt(item.孕月 !== undefined ? item.孕月 : item.月份, 0), 0, 12);
    const status = String(item.状态 || '').trim().slice(0, 30);
    const note = String(item.备注 || '').trim().slice(0, 160);
    const ended = isTrue(item.已结束) || /(已生产|小产|流产|结束|诞下|难产)/.test(status);
    return {
        人物: person,
        孕月: month,
        状态: status || (ended ? '已结束' : '有孕'),
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
            const n = cleanName(name);
            if (isBlacklisted(n) || !isPlainObject(info)) return;
            const patch = normalizeNpcPatch(info);
            if (Object.keys(patch).length) npc[n] = patch;
        });
    }
    out.NPC状态 = npc;

    ['NPC事件', '国家事件', '邻国事件'].forEach(key => {
        out[key] = (Array.isArray(out[key]) ? out[key] : [])
            .map(normalizeEvent)
            .filter(e => e.事件名 || e.内容);
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

    out.伏笔 = dedupeForeshadow(Array.isArray(out.伏笔) ? out.伏笔 : []);

    out.孕事 = (Array.isArray(out.孕事) ? out.孕事 : [])
        .map(item => normalizePregnancy(item, 0))
        .filter(Boolean);

    const era = isPlainObject(out.纪年) ? out.纪年 : {};
    out.纪年 = { 年号: String(era.年号 || '').trim().slice(0, 10), 年: Math.max(0, toInt(era.年, 0)) };

    out.最后更新回合 = Math.max(0, toInt(out.最后更新回合, 0));
    out.版本 = 2;
    return out;
}

function hasContent(fresh) {
    if (!isPlainObject(fresh)) return false;
    if (isPlainObject(fresh.NPC状态)) {
        const usable = Object.keys(fresh.NPC状态).some(name => !isBlacklisted(cleanName(name)));
        if (usable) return true;
    }
    return ['NPC事件', '国家事件', '邻国事件', '流言', '书信', '关系', '伏笔', '孕事']
        .some(key => Array.isArray(fresh[key]) && fresh[key].length > 0);
}

/* ------------------------------------------------------------------ */
/* 设置与预设                                                         */
/* ------------------------------------------------------------------ */

function normalizeSettings(raw) {
    const out = Object.assign({}, DEFAULT_SETTINGS, isPlainObject(raw) ? raw : {});
    out.version = 2;
    out.enabled = out.enabled !== false;
    out.mode = out.mode === 'main' ? 'main' : 'sub';
    out.trigger = out.trigger === 'manual' ? 'manual' : 'auto';
    out.presetName = String(out.presetName || '正常');
    out.subApiUrl = String(out.subApiUrl || '').trim();
    out.subApiKey = String(out.subApiKey || '').trim();
    out.subApiModel = String(out.subApiModel || '').trim();
    out.temperature = clamp(Number(out.temperature) || 0, 0, 2);
    out.maxTokens = clamp(toInt(out.maxTokens, 1500), 200, 8000);
    out.debug = isTrue(out.debug);
    out.theme = THEMES[out.theme] ? out.theme : 'A';
    ['injectEvents', 'injectNpc', 'injectRumors', 'injectLetters', 'injectForeshadow', 'injectRelations', 'injectTimeline', 'pregnancyModule', 'foreshadowAi', 'foreshadowUser'].forEach(key => {
        out[key] = out[key] !== false;
    });
    out.relationView = out.relationView === 'graph' ? 'graph' : 'card';
    out.timelineRange = clamp(toInt(out.timelineRange, 20), 0, 9999);
    const pos = isPlainObject(out.ballPos) ? out.ballPos : {};
    out.ballPos = {
        x: (pos.x === null || pos.x === undefined || pos.x === '' || !Number.isFinite(Number(pos.x))) ? null : clamp(Number(pos.x), 0, 1),
        y: (pos.y === null || pos.y === undefined || pos.y === '' || !Number.isFinite(Number(pos.y))) ? 0.28 : clamp(Number(pos.y), 0, 1)
    };
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

function getPresets() {
    let custom = {};
    try {
        const vars = getVariables({ type: 'global' }) || {};
        custom = isPlainObject(vars.群像预设) ? vars.群像预设 : {};
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
            if (old && rumor.伏笔) old.伏笔 = true;
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
        old.已回收 = old.已回收 || f.已回收;
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
        old.已回收 = old.已回收 || f.已回收;
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
        old.备注 = record.备注 || old.备注;
        old.已结束 = old.已结束 || record.已结束;
        old.回合 = old.回合 || round;
        map.set(record.人物, old);
    });
    return Array.from(map.values());
}

function derivePregnancies(npcState, list, round) {
    const map = new Map();
    (Array.isArray(list) ? list : []).forEach(item => {
        const record = normalizePregnancy(item, 0);
        if (record) map.set(record.人物, record);
    });
    Object.entries(npcState || {}).forEach(([name, info]) => {
        if (isBlacklisted(name) || !isPlainObject(info)) return;
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

function mergeGroupData(oldData, fresh) {
    const out = normalizeData(oldData || {});
    if (!hasContent(fresh)) return out;
    const round = Math.max(0, toInt(out.最后更新回合, 0)) + 1;

    if (isPlainObject(fresh.NPC状态)) {
        Object.entries(fresh.NPC状态).forEach(([rawName, patch]) => {
            const name = cleanName(rawName);
            if (isBlacklisted(name)) return;
            const clean = normalizeNpcPatch(patch);
            if (!Object.keys(clean).length) return;
            const oldInfo = out.NPC状态[name] || {};
            const mergedInfo = Object.assign({}, oldInfo, clean);
            if (oldInfo.年龄 && clean.年龄) {
                const oldAge = ageNumber(oldInfo.年龄);
                const newAge = ageNumber(clean.年龄);
                if (oldAge && newAge && newAge < oldAge) mergedInfo.年龄 = oldInfo.年龄;
            }
            out.NPC状态[name] = mergedInfo;
        });
    }

    ['NPC事件', '国家事件', '邻国事件'].forEach(key => {
        out[key] = mergeEvents(out[key], fresh[key], round);
    });

    out.流言 = mergeRumors(out.流言, fresh.流言, round);
    out.书信 = mergeLetters(out.书信, fresh.书信, round);
    out.关系 = mergeRelations(out.关系, fresh.关系);
    out.伏笔 = mergeForeshadow(out.伏笔, fresh.伏笔);
    out.孕事 = mergePregnancies(out.孕事, fresh.孕事, round);
    if (getSettings().pregnancyModule) {
        out.孕事 = derivePregnancies(out.NPC状态, out.孕事, round);
    }

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
        if (lines.length >= 60) return;
        if (line && !lines.includes(line)) lines.push(line);
    };

    if (data.纪年 && data.纪年.年) {
        push(`[纪年] ${data.纪年.年号 || ''}${data.纪年.年}年`);
    }
    if (s.injectEvents) {
        ['NPC事件', '国家事件', '邻国事件'].forEach(key => {
            (Array.isArray(data[key]) ? data[key] : []).forEach(event => {
                if (getProgressNum(event) >= 100) return;
                const name = event.事件名 || String(event.内容 || '').slice(0, 10);
                if (name) push(`[${key.replace('事件', '')}] ${name}（${getProgressNum(event)}%）`);
            });
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
        (Array.isArray(data.书信) ? data.书信 : []).slice(-3).forEach(item => {
            if (!item || !item.内容) return;
            const dir = item.方向 === '发' ? `致${item.去向 || '佚名'}` : `来自${item.来源 || '佚名'}`;
            push(`[书信·${dir}] ${String(item.内容).slice(0, 60)}`);
        });
    }
    if (s.injectForeshadow) {
        (Array.isArray(data.伏笔) ? data.伏笔 : []).filter(f => !f.已回收).forEach(f => {
            if (f.内容) push(`[伏笔] ${f.内容}`);
        });
    }
    if (s.injectRelations) {
        (Array.isArray(data.关系) ? data.关系 : []).forEach(r => {
            if (isBlacklisted(r.甲) || isBlacklisted(r.乙)) return;
            push(`[关系] ${r.甲}↔${r.乙}：${r.关系 || ''}`);
        });
    }
    if (s.pregnancyModule) {
        (Array.isArray(data.孕事) ? data.孕事 : []).filter(p => !p.已结束).forEach(p => {
            push(`[孕事] ${p.人物}：孕 ${p.孕月 || '?'} 月，${p.状态 || '有孕'}`);
        });
    }

    if (!lines.length) return '';
    return `\n\n【当前剧情线索】（第 ${data.最后更新回合 || 0} 回，仅供续写参考；没有变化可忽略）\n${lines.join('\n')}`;
}

function wrapSubPrompt(core) {
    return core + buildEventContext() + `\n\n【输出格式（必须遵守）】
只输出一个合法 JSON 对象，不要输出解释、前后缀或 Markdown 代码块。`;
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

【后妃孕事】（本模块已开启，只记录有孕的后妃；每个有孕后妃必须出现在这里，不能只写在 NPC状态）
- 只写身份为后妃、嫔御、贵人、才人、皇后等的具名女子；不要写{{user}}、李承璟、陛下、圣上。
- 字段：人物、孕月（1-10 的整数）、状态（稳定/不稳/临盆/小产/已生产 等）、备注（可选）。
- 已生产、小产、流产的孕事要写清楚状态，程序会自动归入“已结束”。
- 没有孕事就输出空数组，不要编造。
格式：
"孕事": [{"人物":"", "孕月":0, "状态":"", "备注":""}]`;
}

async function generateSub(settings, options) {
    const opts = options || {};
    const s = settings || getSettings();
    const presets = getPresets();
    const core = presets[s.presetName] || presets['正常'];
    const baseline = opts.baseline || getGroupData() || {};
    const messageId = opts.messageId !== undefined ? opts.messageId : getLatestAssistantId();
    let ctx = '';
    try {
        const msg = messageId >= 0 ? getChatMessages(messageId)[0] : null;
        if (msg && msg.role === 'assistant') {
            ctx = stripGroupBlock(msg.message);
        }
    } catch (e) { /* ignore */ }

    const baselineText = JSON.stringify(baseline, null, 2).slice(0, 6000);
    const prompt = wrapSubPrompt(core)
        + buildPregnancyPrompt()
        + `\n\n【当前群像状态】\n` + baselineText
        + `\n\n【本回正文】\n` + ctx.slice(0, 4000);

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
    if (s.trigger !== 'auto') return;

    const gen = state.gen;
    let msg = null;
    try { msg = getChatMessages(messageId)[0]; } catch (e) { /* ignore */ }
    if (!msg || msg.role !== 'assistant' || msg.is_hidden) return;
    // 打开角色卡/切换聊天时，已有的开场白和旧楼层不自动推演；
    // 只有载入后新生成的楼层，或手动点“生成”，才会调用 API。
    if (messageId <= state.autoStartId) return;

    await advanceYearFromMessage(messageId, msg.message);

    const fingerprint = messageId + ':' + hashString(msg.message || '');
    if (state.processed.has(fingerprint)) return;
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
        const parsed = await generateSub(s, { messageId });
        if (parsed && parsed.__error) {
            logEntry.标签 = s.mode === 'main' ? '主API失败' : '副API失败';
            logEntry.原始 = parsed.__raw || '';
            logEntry.结果 = parsed.__error;
            appendLog(logEntry);
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

async function rerollGroup() {
    if (state.busy) { toast('warning', '正在生成中，请稍候'); return; }
    const s = getSettings();
    if (!s.enabled) { toast('warning', '群像系统未启用'); return; }
    const tid = getLatestAssistantId();
    if (tid < 0) { toast('error', '还没有 AI 消息'); return; }

    const gen = state.gen;
    try { const latest = getChatMessages(tid)[0]; if (latest) await advanceYearFromMessage(tid, latest.message); } catch (e) { /* ignore */ }
    state.busy = true;
    setBusyUI(true);
    toast('info', '重新推演中…');
    const logEntry = { 消息ID: tid + '(重roll)', 模式: '重roll', 标签: '', 原始: '', 结果: '' };
    try {
        const baseline = getPrevGroupData(tid) || {};
        const parsed = await generateSub(s, { messageId: tid, baseline });
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

async function handleSwipe() {
    // 群像数据挂在楼层 data 上，不依赖正文标签；滑动只需重读并重绘。
    invalidateData();
    renderAll();
    setupInjection();
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
    position: fixed;
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
    position: fixed;
    right: 14px;
    top: 28%;
    width: 50px;
    height: 50px;
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
    transition: transform 0.18s ease, box-shadow 0.3s ease, opacity 0.18s ease;
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
    inset: -7px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(212,175,55,0.22), transparent 66%);
    filter: blur(6px);
    animation: lx-halo 4.8s ease-in-out infinite;
    pointer-events: none;
}
.lx-ball-ring {
    position: absolute;
    inset: 5px;
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
    inset: 12px;
    border-radius: 50%;
    border: 1px solid rgba(232,200,106,0.45);
    background: radial-gradient(circle at 36% 30%, #72522a, #2d1f12 56%, #120c07 100%);
    box-shadow:
        inset 0 1px 2px rgba(255,255,255,0.24),
        inset 0 -4px 9px rgba(0,0,0,0.6);
    pointer-events: none;
}
.lx-ball-gem {
    position: absolute;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, #fff2c4, #d4af37 46%, #8a5a1e 100%);
    box-shadow: 0 0 8px rgba(232,200,106,0.8), 0 0 18px rgba(212,175,55,0.35);
    pointer-events: none;
}
.lx-ball-dot {
    position: absolute;
    top: 0;
    right: 0;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #c0392b;
    border: 1.5px solid #17110b;
    box-shadow: 0 0 7px rgba(192,57,43,0.8);
    display: none;
    z-index: 2;
}
#lx-ball.has-new .lx-ball-dot { display: block; animation: lx-pulse 1.8s ease-in-out infinite; }
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
    position: fixed;
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

/* 主面板 / 设置面板 */
#lx-panel, #lx-settings {
    position: fixed;
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
.lx-tab:nth-child(n+9) { border-bottom: none; }
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
.lx-npc-name {
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
.lx-event-title {
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

/* 书信 */
.lx-letter {
    padding: 13px;
    border: 1px solid var(--lx-border);
    background: var(--lx-card-bg);
    margin-bottom: 11px;
    position: relative;
    border-radius: 3px;
}
.lx-letter::before {
    content: "笺";
    position: absolute;
    top: -9px;
    left: 11px;
    background: var(--lx-bg-solid);
    color: var(--lx-gold);
    padding: 0 5px;
    font-size: 10px;
    letter-spacing: 2px;
}
.lx-letter.sent { border-left: 3px solid var(--lx-gold); }
.lx-letter-from { color: var(--lx-gold); font-size: 11.5px; margin-bottom: 7px; font-weight: 700; letter-spacing: 1px; }
.lx-letter-body { color: var(--lx-text2); font-size: 13px; line-height: 1.75; white-space: pre-wrap; word-break: break-word; }
.lx-letter-actions { margin-top: 9px; display: flex; gap: 7px; justify-content: flex-end; }

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
.lx-textarea { min-height: 140px; resize: vertical; line-height: 1.6; font-size: 12px; }
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
.lx-foreshadow-item {
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

/* 搜索命中/无结果 */
.lx-search-empty { text-align: center; color: var(--lx-dim); font-size: 12px; padding: 28px 10px; font-style: italic; }

/* 模块关闭时隐藏页签和面板 */
.lx-module-hidden { display: none !important; }

/* 现代界面覆盖 */
#lx-root { font-family: "Inter", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif; }
#lx-panel, #lx-settings {
    border-radius: 16px;
    border: 1px solid var(--lx-border);
    box-shadow: var(--lx-shadow);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
}
.lx-header {
    padding: 14px 16px 10px;
    border-bottom: none;
    background: linear-gradient(180deg, var(--lx-card-bg), transparent);
}
.lx-title { font-family: inherit; font-size: 15px; letter-spacing: 2px; font-weight: 700; }
.lx-icon-btn { width: 32px; height: 32px; background: var(--lx-card-bg); border: 1px solid var(--lx-border); }
.lx-tabs {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 4px;
    padding: 8px 10px;
    border-bottom: 1px solid var(--lx-border);
    background: transparent;
}
.lx-tab {
    border: none !important;
    border-radius: 9px;
    padding: 7px 2px;
    margin: 0;
    font-size: 10.5px;
    letter-spacing: 0;
    background: transparent;
}
.lx-tab:nth-child(n) { border: none !important; }
.lx-tab.active { background: var(--lx-gold); color: var(--lx-bg-solid); font-weight: 700; }
.lx-tab.active::after { display: none; }
.lx-tab-num { background: rgba(0,0,0,0.10); color: inherit; }
.lx-tab.active .lx-tab-num { background: rgba(0,0,0,0.14); }
.lx-search { padding: 0 10px 8px; border-bottom: none; background: transparent; }
.lx-search .lx-input { border-radius: 10px; padding: 8px 11px; }
.lx-content { padding: 10px 12px 14px; }
.lx-npc-card {
    border: 1px solid var(--lx-border);
    border-left: none;
    border-radius: 12px;
    padding: 12px 14px;
    background: linear-gradient(180deg, var(--lx-card-bg), transparent);
    box-shadow: 0 3px 12px rgba(0,0,0,0.05);
}
.lx-npc-name { font-size: 14px; letter-spacing: 1px; }
.lx-npc-meta { gap: 6px; }
.lx-npc-meta span { background: var(--lx-event-bg); border-radius: 999px; padding: 2px 8px; font-size: 11px; }
.lx-npc-meta span::before { content: none; }
.lx-event {
    border: 1px solid var(--lx-border);
    border-left: 3px solid var(--lx-gold);
    border-radius: 11px;
    background: var(--lx-card-bg);
    padding: 10px 12px;
}
.lx-progress-bar { height: 5px; border-radius: 999px; background: var(--lx-event-bg); }
.lx-progress-fill { border-radius: 999px; }
.lx-completed, .lx-fold { border-radius: 10px; }
.lx-rumor { border-radius: 10px; background: var(--lx-card-bg); border-left: 3px solid var(--lx-gold); }
.lx-letter { border-radius: 12px; background: var(--lx-card-bg); }
.lx-footer {
    padding: 10px 10px calc(10px + env(safe-area-inset-bottom));
    gap: 6px;
    background: linear-gradient(0deg, var(--lx-card-bg), transparent);
}
.lx-btn { border-radius: 10px; padding: 9px 4px; font-weight: 600; background: var(--lx-card-bg); }
.lx-footer .lx-btn:first-child { background: var(--lx-gold); color: var(--lx-bg-solid); border-color: var(--lx-gold); }
.lx-footer .lx-btn:first-child:hover { filter: brightness(1.05); background: var(--lx-gold); }
.lx-mini-btn { border-radius: 8px; }
.lx-field {
    border: 1px solid var(--lx-border);
    border-radius: 12px;
    background: var(--lx-card-bg);
    padding: 10px 12px;
}
.lx-field-label { margin-bottom: 6px; font-size: 11px; letter-spacing: 1px; }
.lx-input, .lx-textarea, .lx-select { border-radius: 9px; }
.lx-settings-tabs {
    padding: 8px 10px;
    gap: 4px;
    display: flex;
    background: transparent;
    border-bottom: 1px solid var(--lx-border);
}
.lx-settings-tab { flex: 1; border: none; border-radius: 9px; padding: 8px 4px; font-size: 11px; }
.lx-settings-tab.active { background: var(--lx-gold); color: var(--lx-bg-solid); }
.lx-settings-tab.active::after { display: none; }
.lx-settings-body { padding: 10px 12px 14px; }
.lx-theme-item { border-width: 1px; border-radius: 11px; }
.lx-theme-item.active { box-shadow: 0 0 0 2px var(--lx-gold); border-color: var(--lx-gold); }
.lx-rel-card, .lx-foreshadow-item, .lx-preg-card { border-radius: 11px; background: var(--lx-card-bg); }
/* 手机 / 窄屏：仍然是有边距的悬浮窗，不铺满全屏 */
@media (max-width: 640px), (max-height: 520px) {
    #lx-ball { width: 50px; height: 50px; }
    #lx-mask { backdrop-filter: none; -webkit-backdrop-filter: none; }
    /* 不用 dvh，直接用 JS 量出来的 visualViewport 尺寸，安卓 WebView 更稳 */
    #lx-panel, #lx-settings {
        left: calc(var(--lx-vv-left, 0px) + 14px);
        top: calc(var(--lx-vv-top, 0px) + 28px);
        width: calc(var(--lx-vw, 100vw) - 28px);
        height: calc(var(--lx-vh, 100dvh) - 56px);
        max-height: none;
        transform: none;
        border-radius: 16px;
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
    .lx-tab:nth-child(n+6) { border-bottom: none; }
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
    width: calc(var(--lx-vw, 100vw) - 28px);
    height: calc(var(--lx-vh, 100dvh) - 56px);
    max-height: none;
    transform: none;
    border-radius: 16px;
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
        <span class="lx-ball-halo"></span>
        <span class="lx-ball-ring"></span>
        <span class="lx-ball-core"></span>
        <span class="lx-ball-gem"></span>
        <span class="lx-ball-dot" aria-hidden="true"></span>
    </div>
    <div id="lx-mask" aria-hidden="true"></div>
    <div id="lx-panel" role="dialog" aria-modal="true" aria-label="群像志">
        <div class="lx-header">
            <span class="lx-title">群 像 志</span>
            <button type="button" class="lx-icon-btn" data-action="close" aria-label="关闭">×</button>
        </div>
        <div class="lx-tabs" role="tablist">
            <div class="lx-tab active" role="tab" aria-selected="true" data-tab="NPC状态">NPC状态<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="NPC事件">NPC事件<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="国家事件">国家事件<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="邻国事件">邻国事件<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="流言">流言<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="书信">书信<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="时间线">时间线<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="关系图">关系图<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="伏笔">伏笔<span class="lx-tab-num"></span></div>
            <div class="lx-tab" role="tab" aria-selected="false" data-tab="孕事">孕事<span class="lx-tab-num"></span></div>

        </div>
        <div class="lx-search">
            <input id="lx-search-input" class="lx-input" type="search" placeholder="搜索人物 / 事件 / 流言…" autocomplete="off">
            <button type="button" class="lx-mini-btn" data-action="search-clear">清除</button>
        </div>
        <div class="lx-content">
            <div class="lx-panel-tab active" role="tabpanel" data-panel="NPC状态"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="NPC事件"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="国家事件"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="邻国事件"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="流言"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="书信"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="时间线"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="关系图"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="伏笔"></div>
            <div class="lx-panel-tab" role="tabpanel" data-panel="孕事"></div>

        </div>
        <div class="lx-footer">
            <button type="button" class="lx-btn" data-action="gen">生成</button>
            <button type="button" class="lx-btn" data-action="reroll">重roll</button>
            <button type="button" class="lx-btn" data-action="write">写信</button>
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
    try { bodyBg = bodyStyle && bodyStyle.backgroundColor && bodyStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' ? bodyStyle.backgroundColor : ''; } catch (e) { /* ignore */ }
    // 酒馆的 tint 可能是半透明甚至全透明；叠一层底色，避免面板透出后面的聊天文字。
    const base = bodyBg || '#141414';
    const tintLayer = tint.includes('gradient') ? tint : `linear-gradient(180deg, ${tint}, ${tint})`;
    return {
        name: '跟随酒馆',
        bg: `${tintLayer}, ${base}`,
        solid: base,
        border,
        gold: accent,
        text,
        text2: text,
        dim: border,
        input: 'rgba(0,0,0,0.3)',
        card: 'rgba(255,255,255,0.05)',
        event: 'rgba(0,0,0,0.16)',
        shadow: `0 0 0 4px rgba(0,0,0,0.35),0 0 0 5px ${border},0 20px 60px rgba(0,0,0,0.55)`
    };
}

function applyTheme() {
    if (!state.root) return;
    const theme = getSettings().theme === 'ST' ? readStTheme() : (THEMES[getSettings().theme] || THEMES.A);
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
        '--lx-shadow': theme.shadow
    };
    Object.entries(map).forEach(([key, value]) => state.root.style.setProperty(key, value));
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
    const maxLeft = Math.max(minLeft, vp.offsetLeft + vp.width - BALL_SIZE - BALL_MARGIN);
    const maxTop = Math.max(minTop, vp.offsetTop + vp.height - BALL_SIZE - BALL_MARGIN);
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
    state.ball.currentLeft = left;
    state.ball.currentTop = top;
}

function saveBallPosition() {
    const ball = state.refs.ball;
    if (!ball) return;
    const vp = viewportSize();
    const left = parseFloat(ball.style.left) || 0;
    const top = parseFloat(ball.style.top) || 0;
    const minLeft = vp.offsetLeft + BALL_MARGIN;
    const minTop = vp.offsetTop + BALL_MARGIN;
    const maxLeft = Math.max(minLeft, vp.offsetLeft + vp.width - BALL_SIZE - BALL_MARGIN);
    const maxTop = Math.max(minTop, vp.offsetTop + vp.height - BALL_SIZE - BALL_MARGIN);
    const x = maxLeft > minLeft ? clamp((left - minLeft) / (maxLeft - minLeft), 0, 1) : null;
    const y = maxTop > minTop ? clamp((top - minTop) / (maxTop - minTop), 0, 1) : 0.28;
    saveSettings({ ballPos: { x, y } });
}

function markNewData() {
    if (state.ui.panelOpen) return;
    if (state.refs.ball) state.refs.ball.classList.add('has-new');
}

function clearNewData() {
    if (state.refs.ball) state.refs.ball.classList.remove('has-new');
}

/* ------------------------------------------------------------------ */
/* 渲染                                                               */
/* ------------------------------------------------------------------ */

function panelFor(name) {
    return state.refs.panels ? state.refs.panels[name] : null;
}

function setPanel(name, html) {
    const panel = panelFor(name);
    if (panel) panel.innerHTML = html;
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

function renderNpc(data) {
    const year = data.纪年 && data.纪年.年 ? `<div class="lx-year">纪年：${escapeHtml(data.纪年.年号 || '')}${data.纪年.年}年</div>` : '';
    const entries = Object.entries(data.NPC状态 || {})
        .filter(([name]) => !isBlacklisted(name))
        .filter(([name, info]) => textMatch(name, info.身份, info.年龄, info.位置, info.心情, info.当前所做));
    if (!entries.length) {
        setPanel('NPC状态', year + emptyText('尚无记录'));
        return;
    }
    const html = entries.map(([name, info]) => {
        const meta = [
            '身份：' + (info.身份 || '不详'),
            '年龄：' + (info.年龄 || '不详'),
            '位置：' + (info.位置 || '不详'),
            info.心情 && '心情：' + info.心情,
            info.当前所做 && '所事：' + info.当前所做
        ].filter(Boolean).map(text => `<span>${escapeHtml(text)}</span>`).join('');
        return `<div class="lx-npc-card">
            <div class="lx-npc-name">${escapeHtml(name)}</div>
            <div class="lx-npc-meta">${meta}</div>
        </div>`;
    }).join('');
    setPanel('NPC状态', year + html);
}

function renderEventItem(event, roleField, isDone) {
    const role = roleField && event[roleField]
        ? `<span class="lx-role">${escapeHtml(event[roleField])}</span>` : '';
    const title = event.事件名 ? `<div class="lx-event-title">${escapeHtml(event.事件名)}</div>` : '';
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
        html += active.map(event => renderEventItem(event, roleField, false)).join('');
    }
    if (done.length) {
        html += `<details class="lx-completed">
            <summary><span>已完成 (${done.length})</span><span>点击展开</span></summary>
            <div class="lx-completed-body">${done.map(event => renderEventItem(event, roleField, true)).join('')}</div>
        </details>`;
    }
    setPanel(panelName, html);
}

function renderRumors(list) {
    const arr = (Array.isArray(list) ? list : []).filter(item => textMatch(typeof item === 'string' ? item : item.内容));
    if (!arr.length) {
        setPanel('流言', emptyText('风平无议'));
        return;
    }
    const html = arr.slice(-10).reverse().map(item => {
        const content = typeof item === 'string' ? item : (item && item.内容) || '';
        return `<div class="lx-rumor">${escapeHtml(content)}</div>`;
    }).join('');
    setPanel('流言', html);
}

function renderLetters(list) {
    const arr = Array.isArray(list) ? list : [];
    const rows = arr.map((item, index) => ({ item, index }))
        .filter(({ item }) => textMatch(item.来源, item.去向, item.内容));
    if (!rows.length) {
        setPanel('书信', emptyText('尚无来信'));
        return;
    }
    const html = rows.slice().reverse().map(({ item, index }) => {
        const isSent = item.方向 === '发';
        const from = isSent ? `致 ${item.去向 || '佚名'}` : `来自 ${item.来源 || '佚名'}`;
        const cls = isSent ? 'lx-letter sent' : 'lx-letter';
        const action = isSent
            ? `<button type="button" class="lx-mini-btn" data-action="letter-del" data-idx="${index}">删除</button>`
            : `<button type="button" class="lx-mini-btn" data-action="letter-reply" data-idx="${index}">回信</button>`;
        return `<div class="${cls}">
            <div class="lx-letter-from">—— ${escapeHtml(from)}</div>
            <div class="lx-letter-body">${escapeHtml(item.内容 || '')}</div>
            <div class="lx-letter-actions">${action}</div>
        </div>`;
    }).join('');
    setPanel('书信', html);
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
    rows.sort((a, b) => {
        if (a.item.已回收 !== b.item.已回收) return a.item.已回收 ? 1 : -1;
        return (b.item.回合 || 0) - (a.item.回合 || 0);
    });
    const html = rows.map(({ item, index }) => {
        const cls = item.已回收 ? 'lx-foreshadow-item recovered' : 'lx-foreshadow-item';
        const button = settings.foreshadowUser
            ? `<button type="button" class="lx-mini-btn" data-action="fp-toggle" data-idx="${index}">${item.已回收 ? '已回收' : '标记回收'}</button>`
            : `<span>${item.已回收 ? '已回收' : '未回收'}</span>`;
        const roundLabel = item.回合 ? `第 ${item.回合} 回` : '早期';
        return `<div class="${cls}">
            <div class="lx-foreshadow-content">${escapeHtml(item.内容 || '')}</div>
            <div class="lx-foreshadow-meta">
                <span>${roundLabel} · ${escapeHtml(item.来源 || '手动')}</span>
                ${button}
            </div>
        </div>`;
    }).join('');
    setPanel('伏笔', html + (settings.foreshadowUser
        ? '<div style="margin-top:10px;"><button type="button" class="lx-mini-btn" data-action="fp-add">+ 添加伏笔</button></div>'
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

function renderPregnancy(list) {
    const rows = (Array.isArray(list) ? list : [])
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => !isBlacklisted(item.人物) && textMatch(item.人物, item.状态, item.备注));
    if (!rows.length) {
        setPanel('孕事', emptyText('暂无孕事') + '<div style="text-align:center;margin-top:10px;"><button type="button" class="lx-mini-btn" data-action="preg-add">+ 添加孕事</button></div>');
        return;
    }
    rows.sort((a, b) => {
        if (a.item.已结束 !== b.item.已结束) return a.item.已结束 ? 1 : -1;
        return (b.item.孕月 || 0) - (a.item.孕月 || 0);
    });
    const html = rows.map(({ item, index }) => {
        const cls = item.已结束 ? 'lx-preg-card ended' : 'lx-preg-card';
        return `<div class="${cls}">
            <div><span class="lx-preg-name">${escapeHtml(item.人物)}</span><span class="lx-preg-month">${item.孕月 ? '孕 ' + item.孕月 + ' 月' : '孕月未录'}</span></div>
            <div class="lx-preg-status">${escapeHtml(item.状态 || '有孕')}${item.已结束 ? ' · 已结束' : ''}</div>
            ${item.备注 ? `<div class="lx-preg-note">${escapeHtml(item.备注)}</div>` : ''}
            <div style="text-align:right;margin-top:6px;"><button type="button" class="lx-mini-btn" data-action="preg-edit" data-idx="${index}">改</button></div>
        </div>`;
    }).join('');
    setPanel('孕事', html + '<div style="margin-top:10px;"><button type="button" class="lx-mini-btn" data-action="preg-add">+ 添加孕事</button></div>');
}

function updateModuleVisibility() {
    const showPregnancy = getSettings().pregnancyModule;
    ['tab', 'panel'].forEach(kind => {
        const map = kind === 'tab' ? state.refs.tabs : state.refs.panels;
        const el = map && map['孕事'];
        if (el) el.classList.toggle('lx-module-hidden', !showPregnancy);
    });
    if (!showPregnancy && state.ui.tab === '孕事') switchTab('NPC状态');
}

function updateTabCounts(data) {
    const counts = {
        'NPC状态': Object.keys(data.NPC状态 || {}).length,
        'NPC事件': (data.NPC事件 || []).filter(e => getProgressNum(e) < 100).length,
        '国家事件': (data.国家事件 || []).filter(e => getProgressNum(e) < 100).length,
        '邻国事件': (data.邻国事件 || []).filter(e => getProgressNum(e) < 100).length,
        '流言': (data.流言 || []).length,
        '书信': (data.书信 || []).length,
        '关系图': (data.关系 || []).length,
        '伏笔': (data.伏笔 || []).filter(f => !f.已回收).length,
        '孕事': (data.孕事 || []).filter(p => !p.已结束).length
    };
    Object.entries(state.refs.tabs || {}).forEach(([name, tab]) => {
        const num = tab.querySelector('.lx-tab-num');
        if (num) num.textContent = counts[name] ? String(counts[name]) : '';
    });
}

function renderAll() {
    if (!state.root) return;
    const data = getGroupData() || normalizeData({});
    renderNpc(data);
    renderEventList('NPC事件', data.NPC事件, '角色');
    renderEventList('国家事件', data.国家事件);
    renderEventList('邻国事件', data.邻国事件, '国家');
    renderRumors(data.流言);
    renderLetters(data.书信);
    renderTimeline(data, getSettings().timelineRange);
    renderRelations(data.关系, getSettings().relationView);
    renderForeshadow(data.伏笔);
    renderPregnancy(data.孕事);
    updateModuleVisibility();
    updateTabCounts(data);
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

function buildSettingsHTML() {
    const s = getSettings();
    const presets = getPresets();
    const presetNames = Object.keys(presets);
    const activePreset = presets[s.presetName] ? s.presetName : '正常';
    const currentContent = presets[activePreset] || '';
    const presetOptions = presetNames.map(name =>
        `<option value="${escapeAttr(name)}" ${name === activePreset ? 'selected' : ''}>${escapeHtml(name)}</option>`
    ).join('');
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
                <div class="lx-field-hint">两种模式都不改正文、不写标签。主 API：用酒馆当前 API/模型再发一次静默请求（会额外计费）；副 API：用下面单独填写的地址/模型。想省钱可把触发时机改成“手动”。</div>
            </div>
            <div class="lx-field">
                <label class="lx-field-label">触发时机（副 API 有效）</label>
                <div class="lx-radio-group">
                    ${radioRow('lx-trigger', 'auto', s.trigger, '自动')}
                    ${radioRow('lx-trigger', 'manual', s.trigger, '手动')}
                </div>
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
                <label class="lx-field-label">后妃孕事模块</label>
                <div class="lx-radio-group">
                    ${checkRow('lx-preg-module', s.pregnancyModule, '开启孕事页签与推演')}
                </div>
                <div class="lx-field-hint">默认关闭。开启后多一个「孕事」页签，只记录后妃的有孕月份与状态。</div>
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
                        ${checkRow('lx-inj-timeline', s.injectTimeline, '时间线（默认关）')}
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

        <div class="lx-settings-panel ${state.ui.settingsTab === 'appearance' ? 'active' : ''}" data-spanel="appearance">
            <div class="lx-field">
                <label class="lx-field-label">配色方案</label>
                <div class="lx-theme-grid">${themeItems}</div>
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

function openSettings() {
    if (!state.refs.settings) return;
    state.refs.settings.innerHTML = buildSettingsHTML();
    syncViewportVars();
    state.refs.settings.classList.add('show');
    state.refs.settings.tabIndex = -1;
    state.ui.settingsOpen = true;
    applyTheme();
    syncBodyLock();
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
        presetName,
        subApiUrl: val('#lx-api-url').trim(),
        subApiKey: val('#lx-api-key').trim(),
        subApiModel: val('#lx-api-model').trim(),
        temperature: clamp(Number(val('#lx-temp')) || 0, 0, 2),
        maxTokens: clamp(toInt(val('#lx-maxtok'), 1500), 200, 8000),
        debug: radio('input[name="lx-debug"]') === 'true',
        injectEvents: checked('#lx-inj-events'),
        injectNpc: checked('#lx-inj-npc'),
        injectRumors: checked('#lx-inj-rumors'),
        injectLetters: checked('#lx-inj-letters'),
        injectForeshadow: checked('#lx-inj-fp'),
        injectRelations: checked('#lx-inj-rel'),
        injectTimeline: checked('#lx-inj-timeline'),
        pregnancyModule: checked('#lx-preg-module'),
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
    data.伏笔 = list;
    const tid = getLatestAssistantId();
    if (tid < 0) return;
    await attachGroupData(tid, data);
    renderAll();
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
        subApiModel: s.subApiModel
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
        case 'reroll':
            await rerollGroup();
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
    const minLeft = vp.offsetLeft + BALL_MARGIN;
    const minTop = vp.offsetTop + BALL_MARGIN;
    const maxLeft = Math.max(minLeft, vp.offsetLeft + vp.width - BALL_SIZE - BALL_MARGIN);
    const maxTop = Math.max(minTop, vp.offsetTop + vp.height - BALL_SIZE - BALL_MARGIN);
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
    on(tavern_events.MESSAGE_SWIPED, messageId => handleSwipe(messageId));
    on(tavern_events.MESSAGE_EDITED, messageId => handleEdited(messageId));
    on(tavern_events.MESSAGE_DELETED, () => {
        invalidateData();
        renderAll();
        setupInjection(true);
    });
    on(tavern_events.CHAT_CHANGED, () => {
        state.gen++;
        state.processed.clear();
        state.pending = null;
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
    host.style.cssText = 'position:fixed;left:0;top:0;width:0;height:0;z-index:2147483600;pointer-events:none;';
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
    getProgressNum,
    parseChineseNumber,
    incrementAge,
    extractEra,
    isBlacklisted,
    escapeHtml,
    wrapSubPrompt,
    buildSettingsHTML
};
