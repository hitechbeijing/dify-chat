import { baseRequest } from './base-request';

interface IUserInputForm {
  'text-input': {
    default: string;
    label: string;
    required: boolean;
    variable: string;
  };
}

export interface IGetAppParametersResponse {
  user_input_form: IUserInputForm[];
}

interface IConversationItem {
  created_at: number;
  id: string;
  inputs: Record<string, string>;
  introduction: string;
  name: string;
  status: 'normal';
  updated_at: number;
}

interface IGetConversationListRequest {
  /**
   * 返回条数
   */
  limit: number
}

interface IGetConversationListResponse {
  data: IConversationItem[];
}

interface IMessageItem {
  id: string;
  conversation_id: string;
  inputs: Record<string, string>;
  query: string;
  answer: string;
  message_files: [];
  feedback?: {
    rating: 'like' | 'dislike';
  };
}

interface IGetConversationHistoryResponse {
  data: IMessageItem[];
}

interface IDifyApiOptions {
  /**
   * 用户
   */
  user: string;
}

export interface IGetAppInfoResponse {
  name: string;
  description: string;
  tags: string[];
}

export interface IGetAppMetaResponse {
  tool_icons: {
    dalle2: string;
    api_tool: {
      background: string;
      content: string;
    };
  };
}

/**
 * Dify API 类
 */
export class DifyApi {
  constructor(options: IDifyApiOptions) {
    this.options = options;
  }

  options: IDifyApiOptions;

  /**
   * 获取应用基本信息
   */
  async getAppInfo(): Promise<IGetAppInfoResponse> {
    return baseRequest.get('/info');
  }

  /**
   * 获取应用 Meta 信息
   */
  async getAppMeta(): Promise<IGetAppMetaResponse> {
    return baseRequest.get('/meta');
  }

  /**
   * 获取应用参数
   */
  getAppParameters = (): Promise<IGetAppParametersResponse> => {
    return baseRequest.get('/parameters');
  };

  /**
   * 获取当前用户的会话列表（默认返回最近20条）
   */
  getConversationList(params?: IGetConversationListRequest): Promise<IGetConversationListResponse> {
    return baseRequest.get('/conversations', {
      user: this.options.user,
      limit: params?.limit || 100
    });
  }

  /**
   * 获取会话历史消息
   */
  getConversationHistory = (
    conversation_id: string,
  ): Promise<IGetConversationHistoryResponse> => {
    return baseRequest.get(`/messages`, {
      user: this.options.user,
      conversation_id,
    });
  };

  /**
   * 发送对话消息
   */
  sendMessage(params: {
    /**
     * 对话 ID
     */
    conversation_id?: string;
    /**
     * 输入参数
     */
    inputs: Record<string, string>;
    /**
     * 附件
     */
    files: [];
    /**
     * 用户
     */
    user: string;
    /**
     * 响应模式
     */
    response_mode: 'streaming';
    /**
     * 问题
     */
    query: string;
  }) {
    return baseRequest.baseRequest('/chat-messages', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json', 
      }
    });
  }
}

/**
 * 创建 Dify API 实例
 */
export const createDifyApiInstance = (options: IDifyApiOptions) => {
  return new DifyApi(options);
};
