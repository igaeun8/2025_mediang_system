# image에서 텍스트를 추출하는 코드

"""
pip install opencv-python
pip install pytesseract
그리고 pytesseract.exe 파일도 다운로드하고 환경변수 세팅을 해야 한다.  
"""

import cv2
import pytesseract

# 이미지 불러오기
img = cv2.imread("example_image.png")

# 텍스트 추출
text = pytesseract.image_to_string(img)
# text = pytesseract.image_to_string(img, lang='kor') 한국어 텍스트 추출

print(text)

