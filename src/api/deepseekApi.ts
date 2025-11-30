import axios from "axios";

const API_KEY = "sk-749495b62f9d4c04a0d7a6688b6690f1";

const BASE_URL = "https://api.deepseek.com/v1"; // DeepSeek 官方 API 地址

// 创建 axios 实例
const deepseekApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

// 定义聊天消息接口
interface ChatMsg {
  id: number;
  role: "user" | "bot";
  text: string;
}

// 系统提示语

const SYSTEM_PROMPT = `你正在扮演《鸣潮》游戏中的角色仇远。请严格遵循以下设定：

【身份背景】
- 瑝珑镇抚司千户，直属龙主，位高权重
- 从重州到明庭，再到六州的浪客，孑然一身
- 五星气动属性角色，武器为迅刀，持有青冥剑
- 曾经历"磨剑五载"的修行，如今已能"镜照止水"

【性格特点】
- 清冷坚韧，言语简洁有力，不喜冗长
- 外表冷漠但内心藏有温情，对认可的人会展现师者风范
- 有着浪客的孤傲与千户的威严
- 说话时常带有剑客的决断和武者的直接

【说话风格】
- 语气沉稳冷静，措辞精炼，如剑般锋利
- 常用短句，偶尔引用武学哲理
- 会使用"斩"、"剑"、"镜"等武学相关比喻
- 对晚辈会展现教导的一面，但依然保持距离感

【重要经历与关系】
- 曾受师父教导，如今自己也成为他人的师父
- 经历过重州、明庭、六州的漂泊
- 掌握"镜照"技能，能在战斗中完美格挡
- 服饰为"孤馆灯青"，体现独行侠客的意境

【对话要求】
- 始终以仇远的身份和口吻回复，不承认自己是AI
- 回复要简洁有力，避免长篇大论
- 适当融入武侠风格的表达方式
- 当话题超出角色认知时，用武学哲理婉转回应

现在，请开始以仇远的身份与来访者对话。记住：你就是仇远，瑝珑镇抚司的千户，六州的浪客。`;
const MAX_HISTORY_MESSAGES = 16; // 限制上下文长度，避免token超限

/**
 * 发送消息给 DeepSeek API
 * @param inputMessage 用户输入的消息
 * @param history 历史聊天记录
 * @returns
 */
export async function sendMessageToHui(
  inputMessage: string,
  history: ChatMsg[],
  retry = true
): Promise<string> {
  try {
    // 构建消息数组（包含系统提示和历史上下文）
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-MAX_HISTORY_MESSAGES).map((msg) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      { role: "user", content: inputMessage },
    ];

    // 发送请求到 DeepSeek API
    const response = await deepseekApi.post("/chat/completions", {
      model: "deepseek-chat", // DeepSeek 专用模型
      messages,
      temperature: 0.7, // 控制回复的随机性
      max_tokens: 512, // 限制回复长度
      top_p: 0.9, // 多样性控制
    });

    return response.data.choices[0].message.content;
  } catch (error: any) {
    if (error.response?.status === 400 && retry) {
      console.warn("⚠️ 请求 400，自动降级：从 16 条历史改为 8 条后重试");
      const reducedHistory = history.slice(-8);
      return await sendMessageToHui(inputMessage, reducedHistory, false);
    }
    console.error("与 DeepSeek API 通信时出错:", error.response?.data || error);
    return "（出错了，请稍后再试）";
  }
}
