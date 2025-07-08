// gpt 호출용 모듈

import { ChatOpenAI } from "langchain_openai";

const llm = new ChatOpenAI({ model: "gpt-4o" });

export async function getAnswer(prompt) {
  const response = await llm.invoke(prompt);
  return response;
}
