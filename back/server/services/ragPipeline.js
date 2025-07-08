// 질문 전처리 -> 유사 문서 검색 -> GPT 답변 생성
import { getAnswer } from "./openaiService.js";
import { loadVectorStore } from "./vectorStore.js";
import { ChatPromptTemplate } from "langchain_core/prompts";
import { StrOutputParser } from "langchain_core/output_parsers";

const dictionary = [
  "사람을 나타내는 표현 -> 사업자 or 공급자",
  "농부 -> 공급자 or 농가",
  "계정 -> 사용자 계정",
  "권한 부여 -> 접근 권한 설정",
];

const promptTemplate = ChatPromptTemplate.fromTemplate(`
  사용자의 질문을 보고, 우리의 사전을 참고해서 사용자의 질문을 변경해주세요.
  만약 변경할 필요가 없다고 판단된다면, 사용자의 질문을 변경하지 않아도 됩니다. 

  사전: ${dictionary}
  사용자의 질문: {question}
`);

const parser = new StrOutputParser();

export async function runRagPipeline(query) {
  const vectorStore = await loadVectorStore();
  const retriever = vectorStore.asRetriever({ search_kwargs: { k: 3 } });

  const rephrasedQuestion = await parser.invoke(await getAnswer(promptTemplate.format({ question: query })));
  const docs = await retriever.invoke(rephrasedQuestion);

  const context = docs.map(doc => doc.page_content).join("\n\n");
  const finalPrompt = `문맥: ${context}\n\n질문: ${rephrasedQuestion}`;

  const finalAnswer = await getAnswer(finalPrompt);
  return finalAnswer;
}
