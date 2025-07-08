// PDF에서 이미지 추출하는 모듈
import fs from "fs-extra";
import path from "path";
import { createCanvas } from "canvas";
import * as pdfjsLib from "pdfjs-dist";

/**
 * PDF 파일에서 각 페이지를 이미지(PNG)로 저장합니다.
 * @param {string} pdfPath - PDF 파일 경로
 * @param {string} outputDir - 저장할 이미지 디렉토리
 * @returns {Promise<string[]>} 저장된 이미지 경로 리스트
 */
export async function extractImagesFromPdf(pdfPath, outputDir) {
  await fs.ensureDir(outputDir);

  const rawData = new Uint8Array(fs.readFileSync(pdfPath));
  const pdf = await pdfjsLib.getDocument({ data: rawData }).promise;

  const savedImages = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext("2d");

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;

    const imagePath = path.join(outputDir, `page_${pageNum}.png`);
    const out = fs.createWriteStream(imagePath);
    const stream = canvas.createPNGStream();

    await new Promise((resolve) => {
      stream.pipe(out);
      out.on("finish", resolve);
    });

    console.log(`저장 완료: ${imagePath}`);
    savedImages.push(imagePath);
  }

  return savedImages;
}
