from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status
from database import get_db
import requests, time
from pydantic import BaseModel

router = APIRouter(
    prefix="/api/ai",
)


AI_SERVER_URL = "http://192.168.0.42:8001"


@router.post("/predict", tags=["AI"], status_code=status.HTTP_202_ACCEPTED)
async def predict(input_data: dict):
    # AI 서버로 데이터 전송
    ai_server_response = None
    try:
        ai_server_response = requests.post(AI_SERVER_URL + "/predict", json=input_data)
        print(input_data)
    except Exception as e:  # 예외 처리
        print("에러 발생:", e)
        time.sleep(1)

    # AI 서버에서 받은 결과 반환
    if ai_server_response:
        return ai_server_response.text
    else:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="AI 서버 응답 없음"
        )
