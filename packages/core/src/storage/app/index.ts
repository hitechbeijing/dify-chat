/**
 * 应用配置 Item
 */
export interface IDifyAppItem {
	/**
	 * 唯一标识
	 */
	id: string
	/**
	 * Dify 应用基本信息
	 */
	info: {
		/**
		 * 应用名称
		 */
		name: string
		/**
		 * 应用描述
		 */
		description: string
		/**
		 * 应用标签
		 */
		tags: string[]
	}
	/**
	 * 请求配置
	 */
	requestConfig: {
		/**
		 * 请求地址
		 */
		apiBase: string
		/**
		 * Dify APP API 密钥
		 */
		apiKey: string
	}
}

/**
 * 抽象类，定义 Dify APP 的 CRUD 接口
 */
export abstract class DifyAppStore {
	/**
	 * 获取 App 列表
	 */
	abstract getApps(): Promise<IDifyAppItem[]>
	/**
	 * 通过 id 获取 App 详情
	 */
	abstract getApp(id: string): Promise<IDifyAppItem | undefined>
	/**
	 * 新增 App
	 */
	abstract addApp(app: IDifyAppItem): Promise<void>
	/**
	 * 更新 App
	 */
	abstract updateApp(app: IDifyAppItem): Promise<void>
	/**
	 * 删除 App
	 */
	abstract deleteApp(id: string): Promise<void>
}
