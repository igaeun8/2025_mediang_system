# pdf에서 image를 추출하는 코드
# 하나의 이미지도 여러 개의 이미지로 인식하여 불완전한 코드

"""
pip install pymupdf
"""

import fitz  # PyMuPDF
import os

def extract_images_from_pdf(pdf_path, output_dir):
    # 출력 폴더가 없으면 생성
    os.makedirs(output_dir, exist_ok=True)

    # PDF 파일 열기
    pdf = fitz.open(pdf_path)
    image_index = 1
 
    for i, page in enumerate(pdf):
        images = page.get_images(full=True)

        if not images:
            print(f"페이지 {i + 1}에서 이미지를 찾을 수 없습니다.")
            continue
        print(f"페이지 {i + 1}에서 {len(images)}개의 이미지를 찾았습니다.")

        # 각 이미지 추출 및 저장
        for img in images:
            xref = img[0]  # 이미지의 참조 ID
            img_info = pdf.extract_image(xref)  # 이미지 데이터 추출
            img_bytes = img_info["image"]
            img_ext = img_info["ext"]
            
            # 저장할 파일 경로 생성
            img_path = os.path.join(output_dir, f"image_{image_index}.{img_ext}")

            # 이미지 파일 저장
            with open(img_path, "wb") as f:
                f.write(img_bytes)

            print(f"이미지를 {img_path}에 저장했습니다.")
            image_index += 1
    pdf.close()

pdf_input = "메뉴얼(이미지포함).pdf" 
output_path = "c:/Users/User/Downloads/output_images"  

images_from_pdf(pdf_input, output_path)
