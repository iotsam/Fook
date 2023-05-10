from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette import status

# from api.board import question_schema, question_crud
from database import get_db
from models import Questionboard
from api.board.question_schema import QuestionCreate


router = APIRouter(
    prefix="/api/board",
)


@router.post("/{username}/createboard", status_code=status.HTTP_200_OK)
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


# @router.get("/detail/{question_id}", response_model=question_schema.Question)
# def question_detail(question_id: int, db: Session = Depends(get_db)):
#     question = question_crud.get_question(db, question_id=question_id)
#     return question
