from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from starlette import status
from database import get_db
from models import Questionboard, User, Like
from api.board.question_schema import (
    QuestionCreate,
    QuestionUpdate,
    QuestionLike,
)


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


@router.patch(
    "/update/{username}/{id}", tags=["QAboard"], status_code=status.HTTP_200_OK
)
def question_update(
    username: str,
    id: int,
    question_update: QuestionUpdate,
    db: Session = Depends(get_db),
):
    question = (
        db.query(Questionboard)
        .filter(Questionboard.username == username, Questionboard.id == id)
        .first()
    )

    if not question:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Question not found"
        )

    update_data = question_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(question, key, value)

    db.commit()
    db.refresh(question)
    return {"message": "Successfully updated question"}


# 게시물 삭제기능
@router.delete("/delete/{id}", tags=["QAboard"])
def delete_board(id: int, db: Session = Depends(get_db)):
    question = db.query(Questionboard).filter(Questionboard.id == id).first()
    if not question:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    all_remove_like(db, question)
    db.delete(question)
    db.commit()


def all_remove_like(db: Session, question: Questionboard):
    # Find all likes associated with the given question
    likes = db.query(Like).filter(Like.question_id == question.id).all()

    # Remove each like from the database
    for like_entry in likes:
        db.delete(like_entry)

    # Update the like count of the question to reflect the removal of likes
    question.like_count = 0

    # Commit the changes to the database
    db.commit()


# 게시물 좋아요 기능
@router.post("/like", tags=["Like"], status_code=status.HTTP_200_OK)
def question_like(
    user_id: int, question_like: QuestionLike, db: Session = Depends(get_db)
):
    question = (
        db.query(Questionboard)
        .filter(Questionboard.id == question_like.question_id)
        .first()
    )
    if not question:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="데이터를 찾을 수 없습니다."
        )
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="사용자를 찾을 수 없습니다."
        )

    add_like(db, question, user)


def add_like(db: Session, question: Questionboard, user: User):
    question.liked_likes.append(user)
    question.like_count = len(question.likes)
    db.commit()


# 게시물 좋아요 해제 기능
@router.delete("/removelike", tags=["Like"], status_code=status.HTTP_200_OK)
def question_unlike(
    user_id: int, question_like: QuestionLike, db: Session = Depends(get_db)
):
    question = (
        db.query(Questionboard)
        .filter(Questionboard.id == question_like.question_id)
        .first()
    )
    if not question:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="데이터를 찾을 수 없습니다."
        )
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="사용자를 찾을 수 없습니다."
        )

    remove_like(db, question, user)


def remove_like(db: Session, question: Questionboard, user: User):
    question.liked_likes.remove(user)
    question.like_count = len(question.likes)
    db.commit()


# 게시물 카운터
@router.get("/likeCount", tags=["Like"], status_code=status.HTTP_200_OK)
def get_like_count(question_id: int, db: Session = Depends(get_db)):
    question = db.query(Questionboard).filter(Questionboard.id == question_id).first()
    if not question:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="데이터를 찾을 수 없습니다."
        )
    return {"likeCount": question.like_count}


#
