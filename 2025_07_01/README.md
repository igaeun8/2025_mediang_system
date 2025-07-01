

# 2025년 7월 1일

## pdf에서 텍스트/이미지 추출

---

### 1. PDF에서 텍스트 추출

설치 명령어:

* `pip install langchain langchain-community`
* `pip install pypdf`

---

### 2. 이미지에서 텍스트 추출 (OCR)

설치 명령어:

* `pip install opencv-python`
* `pip install pytesseract`

⚠️ Tesseract-OCR.exe 설치 후 환경변수 등록 필요
(예: `C:\Program Files\Tesseract-OCR` 경로를 시스템 환경변수 `Path`에 추가)

---

### 3. PDF에서 이미지 추출

설치 명령어:

* `pip install pymupdf`

⚠️ 빨간 체크 박스 등도 이미지로 인식되므로, 이미지 조각이 다수 추출되어 **불완전한 코드**입니다.

---

## 📌 요약

| 기능         | 주요 라이브러리                   | 출력 형태          |
| ---------- | -------------------------- | -------------- |
| PDF 텍스트 추출 | langchain-community, pypdf | 페이지별 텍스트       |
| 이미지 텍스트 추출 | opencv-python, pytesseract | 문자열 텍스트        |
| PDF 이미지 추출 | pymupdf                    | 이미지 파일(.png 등) |

