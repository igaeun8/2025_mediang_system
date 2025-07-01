# pdf에서 텍스트를 추출하는 코드

""" 
pip install langchain langchain-community
pip install pypdf
pip install pymupdf 
"""

from langchain_community.document_loaders import PyPDFLoader

pdf_filepath = '메뉴얼(이미지포함).pdf'
loader = PyPDFLoader(pdf_filepath)
pages = loader.load()

# print(len(pages)) 페이지 수 출력
print(pages[2]) 
