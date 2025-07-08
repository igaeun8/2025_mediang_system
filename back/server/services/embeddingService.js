// 문단 임베딩 생성 모듈
import { OpenAIEmbeddings } from "langchain_openai";

const embeddings = new OpenAIEmbeddings({ model: "text-embedding-3-large" });

export async function embedDocuments(documents) {
  return await embeddings.embedDocuments(documents);
}

export default embeddings;
