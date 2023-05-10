from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from database import get_db
from models import Questionboard
from api.board.question_schema import QuestionCreate


router = APIRouter(
    prefix="/api/board",
)


@router.post(
    "/{username}/createboard", tags=["QAboard"], status_code=status.HTTP_200_OK
)
def create_question(
    username: str, question_Create: QuestionCreate, db: Session = Depends(get_db)
):
    db_createboard = Questionboard(
        username=username,
        subject=question_Create.subject,
        content=question_Create.content,
        create_date=question_Create.create_date,
    )
    db.add(db_createboard)
    db.commit()


@router.get("/getboard", tags=["QAboard"])
def get_question(db: Session = Depends(get_db)):
    db_board = db.query(Questionboard).all()
    return db_board


@router.get("/detail/{username}", tags=["UserInfo"], status_code=status.HTTP_200_OK)
def my_detail(username: str, db: Session = Depends(get_db)):
    detail = db.query(Questionboard).filter(Questionboard.username == username).all()
    return detail
