import { FileJpgOutlined, FileTextOutlined } from '@ant-design/icons'
import { IMessageFileItem } from '@dify-chat/api'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'

import { formatSize } from '../../message-sender/utils'

interface IMessageFileListProps {
	/**
	 * 消息附件列表
	 */
	files?: IMessageFileItem[]
}

/**
 * 消息附件列表展示组件
 */
export default function MessageFileList(props: IMessageFileListProps) {
	const { files } = props

	if (!files?.length) {
		return null
	}

	const isAllImages = files.every(item => item.type === 'image')

	// 如果所有文件都是图片，则直接展示图片列表
	if (isAllImages) {
		return (
			<div className="flex flex-wrap">
				{files.map((item: IMessageFileItem) => {
					return (
						<PhotoProvider key={item.id}>
							<PhotoView src={item.url}>
								<img
									src={item.url}
									key={item.id}
									alt={item.filename}
									className="w-24 h-24 cursor-zoom-in mr-2 rounded-lg"
									style={{
										objectFit: 'cover',
									}}
								/>
							</PhotoView>
						</PhotoProvider>
					)
				})}
			</div>
		)
	}

	// 如果存在非图片文件，则展示文件列表
	return (
		<>
			{files.map((item: IMessageFileItem) => {
				return (
					<a
						title="点击下载文件"
						href={item.url}
						target="_blank"
						rel="noreferrer"
						key={item.id}
						className="p-3 bg-gray-50 rounded-lg w-60 flex items-center cursor-pointer no-underline mb-2"
					>
						{item.type === 'image' ? (
							<FileJpgOutlined className="text-3xl text-gray-400 mr-2" />
						) : (
							<FileTextOutlined className="text-3xl text-gray-400 mr-2" />
						)}
						<div className="overflow-hidden">
							<div className="text-default truncate">{item.filename}</div>
							{item.size ? <div className="text-desc truncate">{formatSize(item.size)}</div> : null}
						</div>
					</a>
				)
			})}
		</>
	)
}
