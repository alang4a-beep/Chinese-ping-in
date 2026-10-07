/**
 * Polyphone dictionary with definitions and common phonetic variations
 * Based on Taiwan Ministry of Education (MOE) Dictionary Standard
 */
export interface PolyphoneData {
  default: string;
  readings: {
    zhuyin: string;
    meaning?: string;
    examples?: string[];
  }[];
}

export const POLYPHONE_DICT: Record<string, PolyphoneData> = {
  '跑': {
    default: 'ㄆㄠˇ',
    readings: [
      { zhuyin: 'ㄆㄠˇ', meaning: '奔馳、快走', examples: ['跑步', '快跑', '賽跑'] },
      { zhuyin: 'ㄆㄠˊ', meaning: '走動、搖晃', examples: ['跑野馬', '跑堂'] }
    ]
  },
  '步': {
    default: 'ㄅㄨˋ',
    readings: [
      { zhuyin: 'ㄅㄨˋ', meaning: '腳步、步伐', examples: ['跑步', '漫步', '進步'] }
    ]
  },
  '行': {
    default: 'ㄒㄧㄥˊ',
    readings: [
      { zhuyin: 'ㄒㄧㄥˊ', meaning: '走動、行為、可以', examples: ['行走', '旅行', '行為', '不行'] },
      { zhuyin: 'ㄏㄤˊ', meaning: '排、職業門路、商行', examples: ['銀行', '行業', '行家', '排行'] },
      { zhuyin: 'ㄒㄧㄥˋ', meaning: '品行、德行', examples: ['品行', '操行', '德行'] }
    ]
  },
  '著': {
    default: 'ㄓㄜ˙',
    readings: [
      { zhuyin: 'ㄓㄜ˙', meaning: '動詞後表示動作持續', examples: ['看著', '聽著', '走著'] },
      { zhuyin: 'ㄓㄨˋ', meaning: '著作、明顯', examples: ['著名', '著作', '顯著'] },
      { zhuyin: 'ㄓㄠˊ', meaning: '接觸、受到、燃燒', examples: ['著火', '著急', '睡著了'] },
      { zhuyin: 'ㄓㄨㄛˊ', meaning: '穿戴、附著、處置', examples: ['著手', '穿著', '著落'] }
    ]
  },
  '樂': {
    default: 'ㄌㄜˋ',
    readings: [
      { zhuyin: 'ㄌㄜˋ', meaning: '歡喜、快活', examples: ['快樂', '歡樂', '樂觀'] },
      { zhuyin: 'ㄩㄝˋ', meaning: '聲樂、音律', examples: ['音樂', '樂器', '國樂'] },
      { zhuyin: 'ㄧㄠˋ', meaning: '喜好、欣賞（文言）', examples: ['智者樂水', '仁者樂山'] }
    ]
  },
  '長': {
    default: 'ㄔㄤˊ',
    readings: [
      { zhuyin: 'ㄔㄤˊ', meaning: '長度、長遠', examples: ['長短', '長江', '漫長'] },
      { zhuyin: 'ㄓㄤˇ', meaning: '生長、年長、首領', examples: ['長大', '校長', '市長', '長輩'] }
    ]
  },
  '得': {
    default: 'ㄉㄜˊ',
    readings: [
      { zhuyin: 'ㄉㄜˊ', meaning: '獲取、滿意', examples: ['得到', '獲得', '洋洋得意'] },
      { zhuyin: '˙ㄉㄜ', meaning: '助詞，用在動詞或形容詞後', examples: ['跑得快', '說得好', '美得很'] },
      { zhuyin: 'ㄉㄟˇ', meaning: '必須、需要', examples: ['得去', '非得', '總得'] }
    ]
  },
  '地': {
    default: 'ㄉㄧˋ',
    readings: [
      { zhuyin: 'ㄉㄧˋ', meaning: '土地、地方、地面', examples: ['地球', '土地', '目的地'] },
      { zhuyin: '˙ㄉㄜ', meaning: '助詞，接在副詞後修飾動詞', examples: ['慢慢地', '高興地', '靜靜地'] }
    ]
  },
  '重': {
    default: 'ㄓㄨㄥˋ',
    readings: [
      { zhuyin: 'ㄓㄨㄥˋ', meaning: '分量大、主要、深刻', examples: ['重要', '重量', '重大', '沉重'] },
      { zhuyin: 'ㄔㄨㄥˊ', meaning: '再、疊加、層次', examples: ['重複', '重來', '重逢', '重重'] }
    ]
  },
  '好': {
    default: 'ㄏㄠˇ',
    readings: [
      { zhuyin: 'ㄏㄠˇ', meaning: '優良、友愛、完畢', examples: ['好人', '良好', '修好', '很好'] },
      { zhuyin: 'ㄏㄠˋ', meaning: '喜愛、愛慕', examples: ['愛好', '好奇', '好學', '好客'] }
    ]
  },
  '會': {
    default: 'ㄏㄨㄟˋ',
    readings: [
      { zhuyin: 'ㄏㄨㄟˋ', meaning: '聚合、理解、將要', examples: ['開會', '學會', '會見', '機會'] },
      { zhuyin: 'ㄎㄨㄞˋ', meaning: '計算、總計', examples: ['會計', '財會'] }
    ]
  },
  '還': {
    default: 'ㄏㄞˊ',
    readings: [
      { zhuyin: 'ㄏㄞˊ', meaning: '依然、更加、尚且', examples: ['還有', '還是', '還沒'] },
      { zhuyin: 'ㄏㄨㄢˊ', meaning: '返回、歸還', examples: ['還原', '歸還', '還鄉'] }
    ]
  },
  '數': {
    default: 'ㄕㄨˋ',
    readings: [
      { zhuyin: 'ㄕㄨˋ', meaning: '數目、數字、命運', examples: ['數學', '數量', '氣數'] },
      { zhuyin: 'ㄕㄨˇ', meaning: '計算、列舉', examples: ['數數', '數一數二', '不可勝數'] },
      { zhuyin: 'ㄕㄨㄛˋ', meaning: '頻繁、屢次', examples: ['數見不鮮'] }
    ]
  },
  '降': {
    default: 'ㄐㄧㄤˋ',
    readings: [
      { zhuyin: 'ㄐㄧㄤˋ', meaning: '由高到低、落下', examples: ['降落', '下降', '降雨', '升降'] },
      { zhuyin: 'ㄒㄧㄤˊ', meaning: '投降、歸順、制伏', examples: ['投降', '降伏', '招降'] }
    ]
  },
  '差': {
    default: 'ㄔㄚ',
    readings: [
      { zhuyin: 'ㄔㄚ', meaning: '不同、缺少', examples: ['差別', '差異', '差點'] },
      { zhuyin: 'ㄔㄚˋ', meaning: '不夠、不好', examples: ['差不多', '差勁', '差一點'] },
      { zhuyin: 'ㄔㄞ', meaning: '派遣、差役', examples: ['出差', '差事', '使差'] },
      { zhuyin: 'ㄘ', meaning: '不齊、參差', examples: ['參差不齊'] }
    ]
  },
  '參': {
    default: 'ㄘㄢ',
    readings: [
      { zhuyin: 'ㄘㄢ', meaning: '加入、參與、檢驗', examples: ['參加', '參觀', '參考', '參賽'] },
      { zhuyin: 'ㄕㄣ', meaning: '植物名，如人參；星宿名', examples: ['人參', '花旗參', '參商'] },
      { zhuyin: 'ㄘㄣ', meaning: '長短不齊', examples: ['參差'] }
    ]
  },
  '假': {
    default: 'ㄐㄧㄚˇ',
    readings: [
      { zhuyin: 'ㄐㄧㄚˇ', meaning: '不真、借用、假如', examples: ['真假', '假如', '假裝', '假借'] },
      { zhuyin: 'ㄐㄧㄚˋ', meaning: '休假、假期', examples: ['放假', '請假', '暑假', '假日'] }
    ]
  },
  '藏': {
    default: 'ㄘㄤˊ',
    readings: [
      { zhuyin: 'ㄘㄤˊ', meaning: '隱蔽、儲存', examples: ['捉迷藏', '收藏', '隱藏'] },
      { zhuyin: 'ㄗㄤˋ', meaning: '寶庫、經典、地名', examples: ['寶藏', '西藏', '道藏'] }
    ]
  },
  '應': {
    default: 'ㄧㄥ',
    readings: [
      { zhuyin: 'ㄧㄥ', meaning: '該、應當', examples: ['應該', '應當', '應許'] },
      { zhuyin: 'ㄧㄥˋ', meaning: '回答、承受、反應', examples: ['答應', '反應', '適應', '應用'] }
    ]
  },
  '轉': {
    default: 'ㄓㄨㄢˇ',
    readings: [
      { zhuyin: 'ㄓㄨㄢˇ', meaning: '改換方向、運送', examples: ['轉彎', '轉換', '轉移', '轉交'] },
      { zhuyin: 'ㄓㄨㄢˋ', meaning: '繞圈旋轉、環繞', examples: ['旋轉', '轉動', '公轉', '轉圈'] }
    ]
  },
  '少': {
    default: 'ㄕㄠˇ',
    readings: [
      { zhuyin: 'ㄕㄠˇ', meaning: '數量不多、缺少', examples: ['多少', '減少', '很少'] },
      { zhuyin: 'ㄕㄠˋ', meaning: '年幼、年輕', examples: ['少年', '少女', '少爺', '少小'] }
    ]
  },
  '空': {
    default: 'ㄎㄨㄥ',
    readings: [
      { zhuyin: 'ㄎㄨㄥ', meaning: '天空、空無一物', examples: ['天空', '空中', '空間', '空虛'] },
      { zhuyin: 'ㄎㄨㄥˋ', meaning: '閒暇、空位', examples: ['有空', '空白', '空地', '空隙'] }
    ]
  },
  '便': {
    default: 'ㄅㄧㄢˋ',
    readings: [
      { zhuyin: 'ㄅㄧㄢˋ', meaning: '便利、即、排泄物', examples: ['方便', '便當', '隨便', '大便'] },
      { zhuyin: 'ㄆㄧㄢˊ', meaning: '物價廉、安適', examples: ['便宜', '占便宜'] }
    ]
  },
  '傳': {
    default: 'ㄔㄨㄢˊ',
    readings: [
      { zhuyin: 'ㄔㄨㄢˊ', meaning: '轉交、遞送、播散', examples: ['傳說', '傳達', '傳統', '宣傳'] },
      { zhuyin: 'ㄓㄨㄢˋ', meaning: '人物生平記述', examples: ['傳記', '自傳', '水滸傳'] }
    ]
  },
  '答': {
    default: 'ㄉㄚˊ',
    readings: [
      { zhuyin: 'ㄉㄚˊ', meaning: '回答、回報', examples: ['回答', '答案', '報答', '答辯'] },
      { zhuyin: 'ㄉㄚ', meaning: '配合、答應', examples: ['答應', '答理'] }
    ]
  },
  '漂': {
    default: 'ㄆㄧㄠ',
    readings: [
      { zhuyin: 'ㄆㄧㄠ', meaning: '浮在水面、流浪', examples: ['漂流', '漂浮', '漂泊'] },
      { zhuyin: 'ㄆㄧㄠˇ', meaning: '用水沖洗、漂白', examples: ['漂白', '漂洗'] },
      { zhuyin: 'ㄆㄧㄠˋ', meaning: '好看、出色', examples: ['漂亮', '幹得漂亮'] }
    ]
  },
  '結': {
    default: 'ㄐㄧㄝˊ',
    readings: [
      { zhuyin: 'ㄐㄧㄝˊ', meaning: '締結、結束、堅固', examples: ['結束', '結果', '結實', '結婚'] },
      { zhuyin: 'ㄐㄧㄝ', meaning: '植物結出果實、說話頓挫', examples: ['結巴', '結實纍纍', '開花結果'] }
    ]
  },
  '的': {
    default: '˙ㄉㄜ',
    readings: [
      { zhuyin: '˙ㄉㄜ', meaning: '結構助詞，表示所有、屬性', examples: ['我的', '美麗的', '跑步的'] },
      { zhuyin: 'ㄉㄧˊ', meaning: '真實、確切', examples: ['的確', '的當'] },
      { zhuyin: 'ㄉㄧˋ', meaning: '目標、中心箭靶', examples: ['目的', '有的放矢', '中標的'] }
    ]
  },
  '了': {
    default: '˙ㄌㄜ',
    readings: [
      { zhuyin: '˙ㄌㄜ', meaning: '助詞，表示完成或變化', examples: ['走了', '來了', '太好了'] },
      { zhuyin: 'ㄌㄧㄠˇ', meaning: '結束、明白、完全', examples: ['了解', '了結', '不了了之', '不得了'] }
    ]
  },
  '和': {
    default: 'ㄏㄜˊ',
    readings: [
      { zhuyin: 'ㄏㄜˊ', meaning: '平和、和睦、連詞', examples: ['和平', '和氣', '我和你'] },
      { zhuyin: 'ㄏㄜˋ', meaning: '跟著唱、照著做', examples: ['附和', '曲高和寡', '唱和'] },
      { zhuyin: 'ㄏㄨㄛˋ', meaning: '攪拌、混合', examples: ['和藥', '和泥', '攪和'] },
      { zhuyin: 'ㄏㄨㄛˊ', meaning: '揉粉成團', examples: ['和麵'] },
      { zhuyin: 'ㄏㄢˋ', meaning: '台灣常用連詞「和」口語讀音', examples: ['我和他', '鉛筆和橡皮擦'] }
    ]
  },
  '教': {
    default: 'ㄐㄧㄠˋ',
    readings: [
      { zhuyin: 'ㄐㄧㄠˋ', meaning: '教育、教授、宗教', examples: ['教育', '教室', '佛教', '指教'] },
      { zhuyin: 'ㄐㄧㄠ', meaning: '傳授知識、技能', examples: ['教書', '教學生', '教導'] }
    ]
  },
  '覺': {
    default: 'ㄐㄩㄝˊ',
    readings: [
      { zhuyin: 'ㄐㄩㄝˊ', meaning: '感受、明白、醒悟', examples: ['感覺', '覺得', '發覺', '知覺'] },
      { zhuyin: 'ㄐㄧㄠˋ', meaning: '睡眠', examples: ['睡覺', '午覺'] }
    ]
  },
  '背': {
    default: 'ㄅㄟˋ',
    readings: [
      { zhuyin: 'ㄅㄟˋ', meaning: '人體背部、反面、背誦', examples: ['背後', '背景', '背書', '背光'] },
      { zhuyin: 'ㄅㄟ', meaning: '用背部或肩膀馱負', examples: ['背書包', '背負', '背包'] }
    ]
  },
  '倒': {
    default: 'ㄉㄠˇ',
    readings: [
      { zhuyin: 'ㄉㄠˇ', meaning: '傾倒、摔倒、失敗', examples: ['跌倒', '倒塌', '倒閉', '推倒'] },
      { zhuyin: 'ㄉㄠˋ', meaning: '翻轉、倒退、傾瀉', examples: ['倒車', '倒茶', '倒立', '倒數'] }
    ]
  },
  '落': {
    default: 'ㄌㄨㄛˋ',
    readings: [
      { zhuyin: 'ㄌㄨㄛˋ', meaning: '掉下、停留、聚落', examples: ['落下', '降落', '部落', '落花'] },
      { zhuyin: 'ㄌㄠˋ', meaning: '病痛留存', examples: ['落枕', '落痕'] },
      { zhuyin: 'ㄌㄚˋ', meaning: '遺漏、丟掉', examples: ['丟三落四', '落了一本書'] }
    ]
  },
  '當': {
    default: 'ㄉㄤ',
    readings: [
      { zhuyin: 'ㄉㄤ', meaning: '擔任、主持、應當、正值', examples: ['當然', '當選', '當時', '當老師'] },
      { zhuyin: 'ㄉㄤˋ', meaning: '合適、抵押、視為', examples: ['恰當', '當作', '上當', '典當'] }
    ]
  },
  '盛': {
    default: 'ㄕㄥˋ',
    readings: [
      { zhuyin: 'ㄕㄥˋ', meaning: '繁茂、盛大、豐盛', examples: ['盛大', '盛開', '旺盛', '盛情'] },
      { zhuyin: 'ㄔㄥˊ', meaning: '裝載、容納', examples: ['盛飯', '盛水', '盛滿'] }
    ]
  },
  '量': {
    default: 'ㄌㄧㄤˋ',
    readings: [
      { zhuyin: 'ㄌㄧㄤˋ', meaning: '限度、數量、器量', examples: ['力量', '數量', '容量', '分量'] },
      { zhuyin: 'ㄌㄧㄤˊ', meaning: '測度、商酌', examples: ['測量', '量身', '商量', '丈量'] }
    ]
  },
  '省': {
    default: 'ㄕㄥˇ',
    readings: [
      { zhuyin: 'ㄕㄥˇ', meaning: '節儉、行政區劃', examples: ['節省', '省錢', '台灣省'] },
      { zhuyin: 'ㄒㄧㄥˇ', meaning: '察看、領悟、探望', examples: ['反省', '省察', '省悟', '歸省'] }
    ]
  },
  '分': {
    default: 'ㄈㄣ',
    readings: [
      { zhuyin: 'ㄈㄣ', meaning: '劃分、分散、時間計量', examples: ['分鐘', '分開', '分別', '分享'] },
      { zhuyin: 'ㄈㄣˋ', meaning: '職責、身分、組成部分', examples: ['身分', '本分', '過分', '成分'] }
    ]
  },
  '興': {
    default: 'ㄒㄧㄥ',
    readings: [
      { zhuyin: 'ㄒㄧㄥ', meaning: '起立、旺盛、開始', examples: ['興奮', '復興', '興旺', '興建'] },
      { zhuyin: 'ㄒㄧㄥˋ', meaning: '興趣、興致', examples: ['高興', '興致', '掃興', '雅興'] }
    ]
  },
  '看': {
    default: 'ㄎㄢˋ',
    readings: [
      { zhuyin: 'ㄎㄢˋ', meaning: '用眼睛察看、訪視', examples: ['看見', '看書', '觀看', '看護'] },
      { zhuyin: 'ㄎㄢ', meaning: '守候、照顧', examples: ['看門', '看家', '看守'] }
    ]
  },
  '彈': {
    default: 'ㄊㄢˊ',
    readings: [
      { zhuyin: 'ㄊㄢˊ', meaning: '撥動、敲擊、糾舉', examples: ['彈琴', '彈性', '彈跳', '彈劾'] },
      { zhuyin: 'ㄉㄢˋ', meaning: '子彈、彈丸', examples: ['子彈', '炸彈', '砲彈', '彈頭'] }
    ]
  },
  '塞': {
    default: 'ㄙㄞ',
    readings: [
      { zhuyin: 'ㄙㄞ', meaning: '填滿、堵塞', examples: ['塞車', '塞住', '瓶塞'] },
      { zhuyin: 'ㄙㄜˋ', meaning: '閉塞、搪塞', examples: ['閉塞', '阻塞', '搪塞'] },
      { zhuyin: 'ㄙㄞˋ', meaning: '險要邊關', examples: ['邊塞', '要塞', '塞翁失馬'] }
    ]
  },
  '處': {
    default: 'ㄔㄨˋ',
    readings: [
      { zhuyin: 'ㄔㄨˋ', meaning: '地方、部門', examples: ['到處', '好處', '教務處', '長處'] },
      { zhuyin: 'ㄔㄨˇ', meaning: '居住、交往、置身、懲治', examples: ['處理', '相處', '處罰', '設身處地'] }
    ]
  },
  '載': {
    default: 'ㄗㄞˋ',
    readings: [
      { zhuyin: 'ㄗㄞˋ', meaning: '裝乘、承受、充滿', examples: ['載客', '裝載', '載重', '怨聲載道'] },
      { zhuyin: 'ㄗㄞˇ', meaning: '年、記錄刊印', examples: ['千載難逢', '三年五載', '刊載', '轉載'] }
    ]
  },
  '宿': {
    default: 'ㄙㄨˋ',
    readings: [
      { zhuyin: 'ㄙㄨˋ', meaning: '過夜、住所、陳舊', examples: ['住宿', '宿舍', '宿願', '宿敵'] },
      { zhuyin: 'ㄒㄧㄡˇ', meaning: '量詞，夜', examples: ['住一宿', '整宿'] },
      { zhuyin: 'ㄒㄧㄡ', meaning: '星宿', examples: ['二十八宿', '星宿'] }
    ]
  },
  '扇': {
    default: 'ㄕㄢˋ',
    readings: [
      { zhuyin: 'ㄕㄢˋ', meaning: '扇子、門扇、量詞', examples: ['扇子', '電風扇', '一扇門'] },
      { zhuyin: 'ㄕㄢ', meaning: '搖動扇子、撲打', examples: ['扇風', '扇動', '扇耳光'] }
    ]
  },
  '朝': {
    default: 'ㄔㄠˊ',
    readings: [
      { zhuyin: 'ㄔㄠˊ', meaning: '朝代、向著、拜見', examples: ['朝代', '朝向', '王朝', '朝聖'] },
      { zhuyin: 'ㄓㄠ', meaning: '早晨、日', examples: ['朝陽', '朝夕', '今朝', '朝氣'] }
    ]
  },
  '校': {
    default: 'ㄒㄧㄠˋ',
    readings: [
      { zhuyin: 'ㄒㄧㄠˋ', meaning: '學校、學府', examples: ['學校', '校長', '校園', '母校'] },
      { zhuyin: 'ㄐㄧㄠˋ', meaning: '查對、訂正、較量', examples: ['校對', '校正', '校訂', '校勘'] }
    ]
  },
  '角': {
    default: 'ㄐㄧㄠˇ',
    readings: [
      { zhuyin: 'ㄐㄧㄠˇ', meaning: '角落、牛羊角、角度', examples: ['角落', '直角', '羊角', '號角'] },
      { zhuyin: 'ㄐㄩㄝˊ', meaning: '角色、較量、戲曲行當', examples: ['角色', '主角', '角逐', '名角'] }
    ]
  },
  '圈': {
    default: 'ㄑㄩㄢ',
    readings: [
      { zhuyin: 'ㄑㄩㄢ', meaning: '圓形、環繞、範圍', examples: ['圓圈', '圈子', '花圈', '圈套'] },
      { zhuyin: 'ㄐㄩㄢ', meaning: '限制、關閉', examples: ['圈養', '圈禁'] },
      { zhuyin: 'ㄐㄩㄢˋ', meaning: '養禽獸的棚圈', examples: ['豬圈', '羊圈'] }
    ]
  },
  '中': {
    default: 'ㄓㄨㄥ',
    readings: [
      { zhuyin: 'ㄓㄨㄥ', meaning: '中央、內部、中間', examples: ['中文', '中間', '中心', '中國'] },
      { zhuyin: 'ㄓㄨㄥˋ', meaning: '擊中、符合、遭受', examples: ['中獎', '看中', '擊中', '中暑'] }
    ]
  },
  '種': {
    default: 'ㄓㄨㄥˇ',
    readings: [
      { zhuyin: 'ㄓㄨㄥˇ', meaning: '種類、種子、品種', examples: ['種子', '物種', '種類', '各種'] },
      { zhuyin: 'ㄓㄨㄥˋ', meaning: '播種、栽植', examples: ['種田', '種植', '種花', '耕種'] }
    ]
  },
  '曲': {
    default: 'ㄑㄩ',
    readings: [
      { zhuyin: 'ㄑㄩ', meaning: '彎曲、不直', examples: ['彎曲', '曲折', '委曲', '曲棍球'] },
      { zhuyin: 'ㄑㄩˇ', meaning: '樂曲、韻文體裁', examples: ['歌曲', '名曲', '戲曲', '作曲'] }
    ]
  },
  '切': {
    default: 'ㄑㄧㄝ',
    readings: [
      { zhuyin: 'ㄑㄧㄝ', meaning: '用刀分割', examples: ['切菜', '切開', '切斷', '剪切'] },
      { zhuyin: 'ㄑㄧㄝˋ', meaning: '親近、急迫、全部', examples: ['親切', '一切', '迫切', '急切'] }
    ]
  },
  '相': {
    default: 'ㄒㄧㄤ',
    readings: [
      { zhuyin: 'ㄒㄧㄤ', meaning: '交互、彼此', examples: ['相互', '相信', '相聚', '相同'] },
      { zhuyin: 'ㄒㄧㄤˋ', meaning: '相貌、輔佐大臣、相片', examples: ['照相', '長相', '丞相', '首相'] }
    ]
  },
  '泊': {
    default: 'ㄅㄛˊ',
    readings: [
      { zhuyin: 'ㄅㄛˊ', meaning: '停船、停留', examples: ['停泊', '漂泊', '淡泊'] },
      { zhuyin: 'ㄆㄛ', meaning: '湖沼', examples: ['湖泊', '梁山泊', '血泊'] }
    ]
  },
  '難': {
    default: 'ㄋㄢˊ',
    readings: [
      { zhuyin: 'ㄋㄢˊ', meaning: '不容易、使為難', examples: ['困難', '難得', '難道', '難題'] },
      { zhuyin: 'ㄋㄢˋ', meaning: '災患、仇恨', examples: ['災難', '患難', '避難', '難民'] }
    ]
  }
};
