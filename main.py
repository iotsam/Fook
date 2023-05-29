import os

import uvicorn
from fastapi import FastAPI, Depends
from sqlalchemy.orm import sessionmaker
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
from api.user import user_router
from api.board import question_router
from api.board import recipe_router
from api.board import admin_router
from api.ai import ai_router
from api.comment import comment_router
from api.comment import recipe_comment_router
from api.image import image_router
from database import engineconn
from pydantic import BaseModel
from database import get_db
from models import Like, RecipeLike


app = FastAPI()

engine = engineconn()
Session = sessionmaker(bind=engineconn)
session = Session()


origins = ["http://localhost", "http://1.252.156.171/:3000", "http://localhost:3002"]
# 프론트의 react 주소를 알려줌.

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_content = CryptContext(schemes=["bcrypt"], deprecated="auto")


@app.get("/likes")
def get_likes(user_id: int, db: Session = Depends(get_db)):
    # Like 테이블에서 해당 사용자의 좋아요한 항목을 가져옴
    likes = db.query(Like).filter(Like.user_id == user_id).all()

    # RecipeLike 테이블에서 해당 사용자의 좋아요한 레시피를 가져옴
    recipe_likes = db.query(RecipeLike).filter(RecipeLike.user_id == user_id).all()

    # 좋아요한 항목을 JSON 형태로 반환
    data = {
        "likes": [like.question_id for like in likes],
        "recipe_likes": [recipe_like.recipe_id for recipe_like in recipe_likes],
    }
    return data


app.include_router(user_router.router)
app.include_router(question_router.router)
app.include_router(recipe_router.router)
app.include_router(ai_router.router)
app.include_router(comment_router.router)
app.include_router(recipe_comment_router.router)
app.include_router(image_router.router)
app.include_router(admin_router.router)

if __name__ == "__main__":
    port = os.getenv("PORT")
    if not port:
        port = 8080
    uvicorn.run(app, host="0.0.0.0", port=8080)
