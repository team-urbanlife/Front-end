import { Block } from './HomePostDetailType'
//게시글을 생성할 때 서버에 보낼 데이터 타입
export interface PostHomeType {
  title: string
  contents: Block[]
}
