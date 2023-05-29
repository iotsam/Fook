from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from starlette import status
from database import get_db
from models import User, Noticeboard
from api.board.admin_schema import (
    NoticeCreate,
    NoticeUpdate,
)


router = APIRouter(
    prefix="/api/admin",
)


@router.post("/{username}/createboard", tags=["Notice"], status_code=status.HTTP_200_OK)
def create_notice(
    username: str, recipe_Create: NoticeCreate, db: Session = Depends(get_db)
):
    db_notice = Noticeboard(
        username=username,
        subject=recipe_Create.subject,
        content=recipe_Create.content,
        create_date=recipe_Create.create_date,
    )
    db.add(db_notice)
    db.commit()


@router.get("/getboard", tags=["Notice"])
def get_notice(db: Session = Depends(get_db)):
    db_notice = db.query(Noticeboard).all()
    return db_notice


@router.get("/detail/{username}", tags=["UserInfo"], status_code=status.HTTP_200_OK)
def my_detail(username: str, db: Session = Depends(get_db)):
    detail = db.query(Noticeboard).filter(Noticeboard.username == username).all()
    return detail


@router.patch(
    "/update/{username}/{id}", tags=["Notice"], status_code=status.HTTP_200_OK
)
def notice_update(
    username: str,
    id: int,
    notice_update: NoticeUpdate,
    db: Session = Depends(get_db),
):
    notice = (
        db.query(Noticeboard)
        .filter(Noticeboard.username == username, Noticeboard.id == id)
        .first()
    )

    if not notice:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Question not found"
        )

    update_data = notice_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(notice, key, value)

    db.commit()
    db.refresh(notice)
    return {"message": "Successfully updated question"}


# 게시물 삭제기능
@router.delete("/delete/{id}", tags=["Notice"])
def delete_notice(id: int, db: Session = Depends(get_db)):
    notice = db.query(Noticeboard).filter(Noticeboard.id == id).first()
    if not notice:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    db.delete(notice)
    db.commit()
