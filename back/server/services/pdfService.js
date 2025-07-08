# pdf 텍스트 + 이미지 OCR 추출 모듈
import { PyMuPDFLoader } from "langchain_community/document_loaders";
import { TesseractBlobParser } from "langchain_community/document_loaders/parsers";

export async function loadPdfWithOcr(filePath) {
  const loader = new PyMuPDFLoader(filePath, {
    mode: "page",
    images_inner_format: "html-img",
    images_parser: new TesseractBlobParser(),
  });
  return await loader.load();
}
