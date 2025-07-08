// chroma 벡터 저장 및 검색 모듈

import { Chroma } from "langchain_chroma";
import embeddings from "./embeddingService.js";

const persistDirectory = "./chroma";
const collectionName = "chroma-menual";

export async function initVectorStore(documents) {
  return await Chroma.fromDocuments({
    documents,
    embedding: embeddings,
    collectionName,
    persistDirectory,
  });
}

export async function loadVectorStore() {
  return new Chroma({
    collectionName,
    persistDirectory,
    embeddingFunction: embeddings,
  });
}
